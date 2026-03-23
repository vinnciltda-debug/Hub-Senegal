/* ================================
   MAIN.JS — Application Entry Point
   ================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // Seed initial data if needed
        SenegalApp.Seed.seed();

        // Initialize all modules
        SenegalApp.Tabs.init();
        SenegalApp.Moodboard.init();
        SenegalApp.Academic.init();
        SenegalApp.Credits.init();
        initUpload();
        initDragDrop();

        console.log('🌍 Senegal Project initialized');
    });

    /* ---- PDF Upload handling ---- */
    function initUpload() {
        var input = document.getElementById('pdf-input');
        var overlay = document.getElementById('upload-overlay');
        var progress = document.getElementById('upload-progress');
        var progressFill = document.getElementById('progress-fill');
        var progressText = document.getElementById('progress-text');

        input.addEventListener('change', function () {
            var files = input.files;
            if (!files || files.length === 0) return;

            overlay.classList.add('active');
            progress.hidden = false;
            progressFill.style.width = '0%';
            progressText.textContent = 'Processando PDFs...';

            SenegalApp.PDFProcessor.processMultiplePDFs(
                files,
                function (fileName, pageProgress) {
                    progressText.textContent = 'Processando: ' + fileName + ' (' + pageProgress + '%)';
                },
                function (overallProgress) {
                    progressFill.style.width = overallProgress + '%';
                }
            ).then(function (results) {
                var totalCards = 0;
                for (var i = 0; i < results.length; i++) {
                    var pdfData = results[i];
                    totalCards += SenegalApp.Moodboard.addFromPDF(pdfData);
                    SenegalApp.Academic.addFromPDF(pdfData);
                    SenegalApp.Credits.addReferencesFromPDF(pdfData);
                }

                progressFill.style.width = '100%';
                progressText.textContent = '✅ ' + results.length + ' PDF(s) processado(s) — ' + totalCards + ' cards criados';

                showToast(results.length + ' PDF(s) processado(s) com sucesso!', 'success');

                setTimeout(function () {
                    overlay.classList.remove('active');
                    progress.hidden = true;
                }, 2000);
            }).catch(function (error) {
                console.error('PDF processing error:', error);
                progressText.textContent = '❌ Erro: ' + error.message;
                showToast('Erro ao processar PDF. Verifique o arquivo.', 'error');

                setTimeout(function () {
                    overlay.classList.remove('active');
                    progress.hidden = true;
                }, 3000);
            });

            input.value = '';
        });
    }

    /* ---- Drag & Drop files onto page ---- */
    function initDragDrop() {
        var overlay = document.getElementById('upload-overlay');
        var dragCounter = 0;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            document.body.addEventListener(eventName, function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        document.body.addEventListener('dragenter', function (e) {
            dragCounter++;
            if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf('Files') !== -1) {
                overlay.classList.add('active');
            }
        });

        document.body.addEventListener('dragleave', function () {
            dragCounter--;
            if (dragCounter <= 0) {
                dragCounter = 0;
                overlay.classList.remove('active');
            }
        });

        document.body.addEventListener('drop', function (e) {
            dragCounter = 0;
            var files = e.dataTransfer.files;

            if (files.length > 0) {
                var pdfFiles = Array.from(files).filter(function (f) {
                    return f.type === 'application/pdf';
                });
                if (pdfFiles.length > 0) {
                    var input = document.getElementById('pdf-input');
                    var dataTransfer = new DataTransfer();
                    pdfFiles.forEach(function (f) { dataTransfer.items.add(f); });
                    input.files = dataTransfer.files;
                    input.dispatchEvent(new Event('change'));
                } else {
                    overlay.classList.remove('active');
                    showToast('Por favor, envie apenas arquivos PDF.', 'error');
                }
            } else {
                overlay.classList.remove('active');
            }
        });
    }

    /* ---- Toast Notifications ---- */
    function showToast(message, type) {
        type = type || 'info';
        var container = document.getElementById('toast-container');

        var icons = { success: '✅', error: '❌', info: 'ℹ️' };

        var toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = '<span>' + (icons[type] || icons.info) + '</span><span>' + message + '</span>';
        container.appendChild(toast);

        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 300ms ease';
            setTimeout(function () { toast.remove(); }, 300);
        }, 4000);
    }

    // Make showToast available globally
    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.showToast = showToast;
})();
