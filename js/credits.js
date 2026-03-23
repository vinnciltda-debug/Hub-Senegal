/* ================================
   CREDITS.JS — Tab 3: Team Members & References
   ================================ */

(function () {
    'use strict';

    var Storage = null;
    var members = [];
    var references = [];

    function initCredits() {
        Storage = window.SenegalApp.Storage;
        members = Storage.load(Storage.KEYS.MEMBERS, []);
        references = Storage.load(Storage.KEYS.REFERENCES, []);

        renderMembers();
        renderReferences();

        document.getElementById('btn-add-member').addEventListener('click', openAddMemberModal);
        document.getElementById('btn-add-reference').addEventListener('click', openAddReferenceModal);
    }

    function addReferencesFromPDF(pdfData) {
        references.push({
            id: 'ref-' + Date.now(),
            text: pdfData.fileName.replace('.pdf', ''),
            type: 'pdf',
            source: pdfData.fileName
        });

        var refSection = pdfData.fullText.match(/(?:referências|bibliografia|fontes)[\s\S]*$/i);
        if (refSection) {
            var refLines = refSection[0].split('\n').filter(function (l) {
                return l.trim() && l.trim().length > 20;
            });
            refLines.slice(1).forEach(function (line, i) {
                var cleaned = line.trim().replace(/^\d+[\.\)]\s*/, '');
                if (cleaned.length > 15) {
                    references.push({
                        id: 'ref-' + Date.now() + '-' + i,
                        text: cleaned,
                        type: 'extracted',
                        source: pdfData.fileName
                    });
                }
            });
        }

        Storage.save(Storage.KEYS.REFERENCES, references);
        renderReferences();
    }

    /* ------- Members ------- */
    function renderMembers() {
        var grid = document.getElementById('members-grid');
        grid.innerHTML = '';

        if (members.length === 0) {
            grid.innerHTML =
                '<div class="empty-state" style="grid-column: 1/-1;">' +
                '<div class="empty-icon">👥</div>' +
                '<h3>Nenhum membro adicionado</h3>' +
                '<p>Adicione os integrantes do grupo</p>' +
                '</div>';
            return;
        }

        members.forEach(function (member) {
            var initials = member.name.split(' ').map(function (n) { return n[0]; }).join('').substring(0, 2).toUpperCase();

            var el = document.createElement('div');
            el.className = 'member-card';
            el.innerHTML =
                '<div class="member-avatar">' + initials + '</div>' +
                '<div class="member-info">' +
                '<div class="member-name">' + escapeHtml(member.name) + '</div>' +
                (member.role ? '<div class="member-role">' + escapeHtml(member.role) + '</div>' : '') +
                (member.contribution ? '<div class="member-contribution">' + escapeHtml(member.contribution) + '</div>' : '') +
                '</div>' +
                '<button class="member-delete" data-id="' + member.id + '" title="Remover membro">✕</button>';
            grid.appendChild(el);
        });

        grid.querySelectorAll('.member-delete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                members = members.filter(function (m) { return m.id !== btn.dataset.id; });
                Storage.save(Storage.KEYS.MEMBERS, members);
                renderMembers();
            });
        });
    }

    function openAddMemberModal() {
        var modalBody = document.getElementById('modal-body');
        document.getElementById('modal-title').textContent = 'Adicionar Membro';

        modalBody.innerHTML =
            '<div class="form-group">' +
            '<label for="member-name-input">Nome completo</label>' +
            '<input type="text" id="member-name-input" class="form-input" placeholder="Nome do integrante" />' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="member-role-input">Função</label>' +
            '<input type="text" id="member-role-input" class="form-input" placeholder="Ex: Pesquisa, Design, Apresentação..." />' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="member-contribution-input">Contribuição (opcional)</label>' +
            '<textarea id="member-contribution-input" class="form-textarea" placeholder="Descreva a contribuição..."></textarea>' +
            '</div>';

        showModal(function () {
            var name = document.getElementById('member-name-input').value.trim();
            var role = document.getElementById('member-role-input').value.trim();
            var contribution = document.getElementById('member-contribution-input').value.trim();

            if (!name) return;

            members.push({
                id: 'member-' + Date.now(),
                name: name,
                role: role,
                contribution: contribution
            });

            Storage.save(Storage.KEYS.MEMBERS, members);
            renderMembers();
            hideModal();
        });
    }

    /* ------- References ------- */
    function renderReferences() {
        var list = document.getElementById('references-list');
        list.innerHTML = '';

        if (references.length === 0) {
            list.innerHTML =
                '<div class="empty-state">' +
                '<div class="empty-icon">📚</div>' +
                '<h3>Nenhuma referência ainda</h3>' +
                '<p>Referências serão extraídas dos PDFs automaticamente ou adicionadas manualmente</p>' +
                '</div>';
            return;
        }

        references.forEach(function (ref, index) {
            var el = document.createElement('div');
            el.className = 'reference-item';
            el.innerHTML =
                '<span class="reference-number">[' + (index + 1) + ']</span>' +
                '<span class="reference-text">' + escapeHtml(ref.text) + '</span>' +
                '<button class="reference-delete" data-id="' + ref.id + '" title="Remover referência">✕</button>';
            list.appendChild(el);
        });

        list.querySelectorAll('.reference-delete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                references = references.filter(function (r) { return r.id !== btn.dataset.id; });
                Storage.save(Storage.KEYS.REFERENCES, references);
                renderReferences();
            });
        });
    }

    function openAddReferenceModal() {
        var modalBody = document.getElementById('modal-body');
        document.getElementById('modal-title').textContent = 'Adicionar Referência';

        modalBody.innerHTML =
            '<div class="form-group">' +
            '<label for="reference-text-input">Referência bibliográfica</label>' +
            '<textarea id="reference-text-input" class="form-textarea" placeholder="Ex: SOBRENOME, Nome. Título do livro. Editora, Ano."></textarea>' +
            '</div>';

        showModal(function () {
            var text = document.getElementById('reference-text-input').value.trim();
            if (!text) return;

            references.push({
                id: 'ref-' + Date.now(),
                text: text,
                type: 'manual',
                source: 'Manual'
            });

            Storage.save(Storage.KEYS.REFERENCES, references);
            renderReferences();
            hideModal();
        });
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
    window.SenegalApp.Credits = {
        init: initCredits,
        addReferencesFromPDF: addReferencesFromPDF
    };
})();
