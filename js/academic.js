/* ================================
   ACADEMIC.JS — Tab 2: Academic Data Page
   ================================ */

(function () {
    'use strict';

    var Storage = null;
    var academicData = null;

    function initAcademic() {
        Storage = window.SenegalApp.Storage;
        academicData = Storage.load(Storage.KEYS.ACADEMIC, null);

        // Set date
        var dateEl = document.getElementById('paper-date');
        if (dateEl) {
            var now = new Date();
            var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            dateEl.textContent = months[now.getMonth()] + ' de ' + now.getFullYear();
        }

        // Load saved data
        if (academicData) {
            if (academicData.title) {
                document.getElementById('paper-title').textContent = academicData.title;
            }
            if (academicData.authors) {
                document.getElementById('paper-authors').textContent = academicData.authors;
            }
            if (academicData.sections && academicData.sections.length > 0) {
                renderSections(academicData.sections, academicData.images);
            }
        }

        // Save on edit
        var titleEl = document.getElementById('paper-title');
        var authorsEl = document.getElementById('paper-authors');

        titleEl.addEventListener('blur', function () {
            if (!academicData) academicData = {};
            academicData.title = titleEl.textContent;
            Storage.save(Storage.KEYS.ACADEMIC, academicData);
        });

        authorsEl.addEventListener('blur', function () {
            if (!academicData) academicData = {};
            academicData.authors = authorsEl.textContent;
            Storage.save(Storage.KEYS.ACADEMIC, academicData);
        });
    }

    function addFromPDF(pdfData) {
        if (!academicData) {
            academicData = {
                title: document.getElementById('paper-title').textContent,
                authors: document.getElementById('paper-authors').textContent,
                sections: [],
                images: []
            };
        }

        var extractSections = window.SenegalApp.PDFProcessor.extractSections;
        var newSections = extractSections(pdfData.fullText);

        var newImages = pdfData.images.map(function (img) {
            return {
                dataUrl: img.dataUrl,
                page: img.page,
                source: pdfData.fileName
            };
        });

        academicData.sections = (academicData.sections || []).concat(newSections);
        academicData.images = (academicData.images || []).concat(newImages);

        Storage.save(Storage.KEYS.ACADEMIC, academicData);
        renderSections(academicData.sections, academicData.images);
    }

    function renderSections(sections, images) {
        images = images || [];
        var body = document.getElementById('paper-body');
        var emptyState = document.getElementById('academic-empty');

        if (!sections || sections.length === 0) {
            if (emptyState) emptyState.style.display = '';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        // Clear previous
        body.querySelectorAll('.paper-section').forEach(function (s) { s.remove(); });

        sections.forEach(function (section, index) {
            var sectionEl = document.createElement('div');
            sectionEl.className = 'paper-section';

            var paragraphs = section.content
                .split(/\n+/)
                .filter(function (p) { return p.trim(); })
                .map(function (p) { return '<p>' + escapeHtml(p.trim()) + '</p>'; })
                .join('');

            var imageHtml = '';
            if (images[index]) {
                imageHtml =
                    '<div class="paper-image-container">' +
                    '<img class="paper-image" src="' + images[index].dataUrl + '" alt="Figura ' + (index + 1) + '" loading="lazy" />' +
                    '<p class="paper-image-caption">Figura ' + (index + 1) + ' — ' + escapeHtml(images[index].source || '') + ', p. ' + images[index].page + '</p>' +
                    '</div>';
            }

            sectionEl.innerHTML =
                '<h2 class="paper-section-title">' +
                '<span class="section-icon"></span>' +
                escapeHtml(section.title) +
                '</h2>' +
                '<div class="paper-section-content">' +
                paragraphs +
                imageHtml +
                '</div>';

            body.appendChild(sectionEl);
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.Academic = {
        init: initAcademic,
        addFromPDF: addFromPDF
    };
})();
