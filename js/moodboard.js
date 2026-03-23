/* ================================
   MOODBOARD.JS — Tab 1: Grid + Timeline + Drag-and-Drop
   ================================ */

(function () {
    'use strict';

    var Storage = null;
    var cards = [];
    var sortableInstance = null;
    var currentView = 'grid';

    function initMoodboard() {
        Storage = window.SenegalApp.Storage;
        cards = Storage.load(Storage.KEYS.MOODBOARD, []);
        renderCards();

        document.getElementById('btn-add-card').addEventListener('click', openAddCardModal);
        document.getElementById('btn-toggle-view').addEventListener('click', toggleView);
        document.getElementById('btn-clear-moodboard').addEventListener('click', clearMoodboard);

        initSortable();
    }

    function addFromPDF(pdfData) {
        var newCards = [];
        var suggestCategory = window.SenegalApp.PDFProcessor.suggestCategory;

        for (var i = 0; i < pdfData.pageCount; i++) {
            var textBlock = pdfData.textBlocks.find(function (t) { return t.page === i + 1; });
            var image = pdfData.images.find(function (img) { return img.page === i + 1; });

            if (textBlock || image) {
                var text = textBlock ? textBlock.text : '';
                var titleMatch = text.match(/^[^.!?]+[.!?]?/);
                var title = titleMatch ? titleMatch[0].trim() : '';
                if (title.length > 80) title = title.substring(0, 77) + '...';
                if (!title) title = pdfData.fileName + ' — Página ' + (i + 1);

                var category = suggestCategory(title, text);
                var prefix = category ? category + '. ' : '';
                
                newCards.push({
                    id: 'card-' + Date.now() + '-' + i,
                    category: category,
                    title: prefix + title,
                    text: text.length > 300 ? text.substring(title.length).trim() : text,
                    image: image ? image.dataUrl : null,
                    source: pdfData.fileName,
                    page: i + 1,
                    order: cards.length + i
                });
            }
        }

        // Sort new cards by category if available
        newCards.sort(function(a, b) {
            if (!a.category) return 1;
            if (!b.category) return -1;
            return a.category.localeCompare(b.category);
        });

        cards = cards.concat(newCards);
        saveCards();
        renderCards();
        initSortable();

        return newCards.length;
    }

    function renderCards() {
        var grid = document.getElementById('moodboard-grid');
        var timeline = document.getElementById('timeline-container');
        var timelineItems = document.getElementById('timeline-items');
        var emptyState = document.getElementById('moodboard-empty');

        if (currentView === 'grid') {
            grid.hidden = false;
            timeline.hidden = true;
            renderGridView(grid, emptyState);
        } else {
            grid.hidden = true;
            timeline.hidden = false;
            renderTimelineView(timelineItems);
        }
    }

    function renderGridView(container, emptyState) {
        container.querySelectorAll('.mood-card').forEach(function (c) { c.remove(); });

        if (cards.length === 0) {
            emptyState.style.display = '';
            return;
        }

        emptyState.style.display = 'none';

        cards.forEach(function (card, index) {
            var el = document.createElement('div');
            el.className = 'mood-card';
            el.dataset.id = card.id;
            el.innerHTML =
                '<span class="card-badge">' + (index + 1) + '</span>' +
                (card.image
                    ? '<img class="card-image" src="' + card.image + '" alt="' + escapeHtml(card.title) + '" loading="lazy" />'
                    : '<div class="card-image-placeholder">📄</div>'
                ) +
                '<div class="card-body">' +
                '<div class="card-title">' + escapeHtml(card.title) + '</div>' +
                (card.text ? '<div class="card-text">' + escapeHtml(card.text) + '</div>' : '') +
                '<div class="card-meta">' +
                '<span class="card-source">📎 ' + escapeHtml(card.source || 'Manual') + '</span>' +
                '<div class="card-actions">' +
                '<button class="card-action-btn edit" title="Editar" data-id="' + card.id + '">✏️</button>' +
                '<button class="card-action-btn delete" title="Remover" data-id="' + card.id + '">🗑️</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            container.appendChild(el);
        });

        attachCardListeners(container);
    }

    function renderTimelineView(container) {
        container.innerHTML = '';

        if (cards.length === 0) {
            container.innerHTML =
                '<div class="empty-state">' +
                '<div class="empty-icon">📅</div>' +
                '<h3>Timeline vazia</h3>' +
                '<p>Adicione conteúdo ao moodboard para visualizar na timeline</p>' +
                '</div>';
            return;
        }

        cards.forEach(function (card) {
            var el = document.createElement('div');
            el.className = 'timeline-item';
            el.dataset.id = card.id;
            el.innerHTML =
                '<div class="timeline-dot"></div>' +
                '<div class="timeline-card">' +
                '<div class="card-title">' + escapeHtml(card.title) + '</div>' +
                (card.text ? '<div class="card-text">' + escapeHtml(card.text) + '</div>' : '') +
                (card.image ? '<img class="card-image" src="' + card.image + '" alt="' + escapeHtml(card.title) + '" loading="lazy" />' : '') +
                '<div class="card-actions">' +
                '<button class="card-action-btn edit" title="Editar" data-id="' + card.id + '">✏️</button>' +
                '<button class="card-action-btn delete" title="Remover" data-id="' + card.id + '">🗑️</button>' +
                '</div>' +
                '</div>';
            container.appendChild(el);
        });

        attachCardListeners(container);

        // Intersection Observer for scroll-triggered animations
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        container.querySelectorAll('.timeline-item').forEach(function (item) {
            item.style.animationPlayState = 'paused';
            observer.observe(item);
        });
    }

    function attachCardListeners(container) {
        container.querySelectorAll('.card-action-btn.edit').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                openEditCardModal(btn.dataset.id);
            });
        });

        container.querySelectorAll('.card-action-btn.delete').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                deleteCard(btn.dataset.id);
            });
        });
    }

    function initSortable() {
        if (sortableInstance) {
            sortableInstance.destroy();
            sortableInstance = null;
        }

        var container = currentView === 'grid'
            ? document.getElementById('moodboard-grid')
            : document.getElementById('timeline-items');

        if (!container || cards.length === 0) return;

        sortableInstance = new Sortable(container, {
            animation: 250,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: currentView === 'grid' ? '.mood-card' : '.timeline-card',
            filter: '.empty-state, .card-action-btn',
            preventOnFilter: false,
            onEnd: function (evt) {
                var movedCard = cards.splice(evt.oldIndex, 1)[0];
                cards.splice(evt.newIndex, 0, movedCard);
                cards.forEach(function (c, i) { c.order = i; });
                saveCards();
                renderCards();
                initSortable();
            }
        });
    }

    function toggleView() {
        var btn = document.getElementById('btn-toggle-view');
        if (currentView === 'grid') {
            currentView = 'timeline';
            btn.querySelector('span').textContent = 'Grid';
        } else {
            currentView = 'grid';
            btn.querySelector('span').textContent = 'Timeline';
        }
        renderCards();
        initSortable();
    }

    function openAddCardModal() {
        var modalBody = document.getElementById('modal-body');
        document.getElementById('modal-title').textContent = 'Adicionar Card';

        modalBody.innerHTML =
            '<div class="form-group">' +
            '<label for="card-title-input">Título</label>' +
            '<input type="text" id="card-title-input" class="form-input" placeholder="Título do card" />' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="card-text-input">Descrição</label>' +
            '<textarea id="card-text-input" class="form-textarea" placeholder="Descrição do conteúdo..."></textarea>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="card-image-input">Imagem (opcional)</label>' +
            '<input type="file" id="card-image-input" class="form-input" accept="image/*" />' +
            '</div>';

        showModal(function () {
            var title = document.getElementById('card-title-input').value.trim();
            var text = document.getElementById('card-text-input').value.trim();
            var fileInput = document.getElementById('card-image-input');

            if (!title) return;

            function addCard(imageData) {
                cards.push({
                    id: 'card-' + Date.now(),
                    title: title,
                    text: text,
                    image: imageData,
                    source: 'Manual',
                    page: null,
                    order: cards.length
                });
                saveCards();
                renderCards();
                initSortable();
                hideModal();
            }

            if (fileInput.files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (e) { addCard(e.target.result); };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                addCard(null);
            }
        });
    }

    function openEditCardModal(cardId) {
        var card = cards.find(function (c) { return c.id === cardId; });
        if (!card) return;

        var modalBody = document.getElementById('modal-body');
        document.getElementById('modal-title').textContent = 'Editar Card';

        modalBody.innerHTML =
            '<div class="form-group">' +
            '<label for="card-title-input">Título</label>' +
            '<input type="text" id="card-title-input" class="form-input" value="' + escapeHtml(card.title) + '" />' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="card-text-input">Descrição</label>' +
            '<textarea id="card-text-input" class="form-textarea">' + escapeHtml(card.text || '') + '</textarea>' +
            '</div>' +
            (card.image
                ? '<div class="form-group"><label>Imagem atual</label><img src="' + card.image + '" style="max-width:100%;max-height:200px;border-radius:8px;margin-top:4px;" /></div>'
                : '') +
            '<div class="form-group">' +
            '<label for="card-image-input">Nova imagem (opcional)</label>' +
            '<input type="file" id="card-image-input" class="form-input" accept="image/*" />' +
            '</div>';

        showModal(function () {
            card.title = document.getElementById('card-title-input').value.trim() || card.title;
            card.text = document.getElementById('card-text-input').value.trim();

            var fileInput = document.getElementById('card-image-input');
            if (fileInput.files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    card.image = e.target.result;
                    saveCards();
                    renderCards();
                    initSortable();
                    hideModal();
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                saveCards();
                renderCards();
                initSortable();
                hideModal();
            }
        });
    }

    function deleteCard(cardId) {
        cards = cards.filter(function (c) { return c.id !== cardId; });
        cards.forEach(function (c, i) { c.order = i; });
        saveCards();
        renderCards();
        initSortable();
    }

    function clearMoodboard() {
        if (cards.length === 0) return;
        if (!confirm('Tem certeza que deseja limpar todo o moodboard?')) return;
        cards = [];
        saveCards();
        renderCards();
    }

    function saveCards() {
        Storage.save(Storage.KEYS.MOODBOARD, cards);
    }

    function getCards() {
        return cards;
    }

    /* --- Modal helpers --- */
    var currentSaveCallback = null;

    function showModal(onSave) {
        currentSaveCallback = onSave;
        document.getElementById('modal-overlay').hidden = false;

        document.getElementById('modal-close').onclick = hideModal;
        document.getElementById('modal-cancel').onclick = hideModal;
        document.getElementById('modal-save').onclick = function () {
            if (currentSaveCallback) currentSaveCallback();
        };
        document.getElementById('modal-overlay').onclick = function (e) {
            if (e.target.id === 'modal-overlay') hideModal();
        };
    }

    function hideModal() {
        document.getElementById('modal-overlay').hidden = true;
        currentSaveCallback = null;
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.Moodboard = {
        init: initMoodboard,
        addFromPDF: addFromPDF,
        getCards: getCards
    };
})();
