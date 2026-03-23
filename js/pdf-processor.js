/* ================================
   PDF-PROCESSOR.JS — Extract text & images from PDFs
   Uses Mozilla PDF.js loaded from CDN (global pdfjsLib)
   ================================ */

(function () {
    'use strict';

    var pdfjsLoaded = false;
    var pdfjsLib = null;

    /**
     * Ensure PDF.js is loaded and configured
     */
    function ensurePdfJs() {
        return new Promise(function (resolve, reject) {
            if (pdfjsLoaded && pdfjsLib) {
                resolve(pdfjsLib);
                return;
            }

            // Check if already available globally
            if (window.pdfjsLib) {
                pdfjsLib = window.pdfjsLib;
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                pdfjsLoaded = true;
                resolve(pdfjsLib);
                return;
            }

            // Load dynamically
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = function () {
                pdfjsLib = window.pdfjsLib;
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                pdfjsLoaded = true;
                resolve(pdfjsLib);
            };
            script.onerror = function () {
                reject(new Error('Não foi possível carregar a biblioteca de PDF.'));
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Process a single PDF file
     */
    function processPDF(file, onProgress) {
        onProgress = onProgress || function () { };

        return ensurePdfJs().then(function (pdfjs) {
            return file.arrayBuffer().then(function (arrayBuffer) {
                return pdfjs.getDocument({ data: arrayBuffer }).promise.then(function (pdf) {
                    var totalPages = pdf.numPages;
                    var result = {
                        fileName: file.name,
                        pageCount: totalPages,
                        textBlocks: [],
                        images: [],
                        fullText: ''
                    };

                    var allText = [];

                    function processPage(pageNum) {
                        if (pageNum > totalPages) {
                            result.fullText = allText.join('\n\n');
                            return result;
                        }

                        return pdf.getPage(pageNum).then(function (page) {
                            // Extract text
                            return page.getTextContent().then(function (textContent) {
                                var pageText = textContent.items
                                    .map(function (item) { return item.str; })
                                    .join(' ')
                                    .replace(/\s+/g, ' ')
                                    .trim();

                                if (pageText) {
                                    allText.push(pageText);
                                    result.textBlocks.push({
                                        page: pageNum,
                                        text: pageText,
                                        id: file.name + '-p' + pageNum + '-text'
                                    });
                                }

                                // Render page as image
                                var scale = 1.5;
                                var viewport = page.getViewport({ scale: scale });
                                var canvas = document.createElement('canvas');
                                var ctx = canvas.getContext('2d');
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
                                    var imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                    result.images.push({
                                        page: pageNum,
                                        dataUrl: imageDataUrl,
                                        width: viewport.width,
                                        height: viewport.height,
                                        id: file.name + '-p' + pageNum + '-img'
                                    });

                                    onProgress(Math.round((pageNum / totalPages) * 100));
                                    return processPage(pageNum + 1);
                                });
                            });
                        });
                    }

                    return processPage(1);
                });
            });
        });
    }

    /**
     * Process multiple PDF files
     */
    function processMultiplePDFs(files, onFileProgress, onOverallProgress) {
        onFileProgress = onFileProgress || function () { };
        onOverallProgress = onOverallProgress || function () { };

        var fileArray = Array.from(files).filter(function (f) {
            return f.type === 'application/pdf';
        });

        var results = [];
        var currentIndex = 0;

        function processNext() {
            if (currentIndex >= fileArray.length) {
                return Promise.resolve(results);
            }

            var file = fileArray[currentIndex];
            var idx = currentIndex;

            return processPDF(file, function (pageProgress) {
                onFileProgress(file.name, pageProgress);
                var overallProgress = Math.round(((idx + pageProgress / 100) / fileArray.length) * 100);
                onOverallProgress(overallProgress);
            }).then(function (result) {
                results.push(result);
                currentIndex++;
                return processNext();
            });
        }

        return processNext();
    }

    /**
     * Categorize a text based on keywords for Senegal
     */
    function suggestCategory(title, content) {
        var text = (title + ' ' + content).toLowerCase();
        
        if (text.match(/demogr[aá]fic|taxa|natalidade|mortalidade|fecundidade|idade/i)) return 'a';
        if (text.match(/popula[çc][ãa]o|habitantes|milh[õo]es|censo|densidade/i)) return 'b';
        if (text.match(/cultur|m[úu]sica|dan[çc]a|tradi[çc][ãa]o|arte|literatura|griots|boubou|gastronomia|thieboudienne/i)) return 'c';
        if (text.match(/soci|povo|etnia|wolof|serer|fula|sa[úu]de|educa[çc][ãa]o|teranga|hospitalidade/i)) return 'd';
        if (text.match(/tecnol[oó]gic|digital|sat[eé]lite|gaindesat|internet|moderniza[çc][ãa]o/i)) return 'e';
        if (text.match(/ambient|ecossistema|clima|manguezal|floresta|desmatamento|extra[çc][ãa]o|conserva[çc][ãa]o/i)) return 'f';
        
        return null;
    }

    /**
     * Extract structured sections from text
     */
    function extractSections(fullText) {
        var lines = fullText.split('\n').filter(function (l) { return l.trim(); });
        var sections = [];
        var currentSection = { title: 'Introdução', content: [] };

        var sectionPatterns = [
            /^(?:\d+[\.\)]\s*)?(?:introdu[çc][ãa]o)/i,
            /^(?:\d+[\.\)]\s*)?(?:hist[óo]ria)/i,
            /^(?:\d+[\.\)]\s*)?(?:cultura)/i,
            /^(?:\d+[\.\)]\s*)?(?:geografia)/i,
            /^(?:\d+[\.\)]\s*)?(?:economia)/i,
            /^(?:\d+[\.\)]\s*)?(?:pol[ií]tica)/i,
            /^(?:\d+[\.\)]\s*)?(?:religi[ãa]o)/i,
            /^(?:\d+[\.\)]\s*)?(?:educa[çc][ãa]o)/i,
            /^(?:\d+[\.\)]\s*)?(?:sa[úu]de)/i,
            /^(?:\d+[\.\)]\s*)?(?:conclus[ãa]o)/i,
            /^(?:\d+[\.\)]\s*)?(?:considera[çc][õo]es\s+finais)/i,
            /^(?:\d+[\.\)]\s*)?(?:refer[êe]ncias)/i,
            /^(?:\d+[\.\)]\s*)?(?:bibliografia)/i,
            /^(?:\d+[\.\)]\s*)?(?:desenvolvimento)/i,
        ];

        for (var i = 0; i < lines.length; i++) {
            var trimmed = lines[i].trim();
            var isHeader = sectionPatterns.some(function (p) { return p.test(trimmed); }) ||
                (trimmed.length < 60 && trimmed === trimmed.toUpperCase() && trimmed.length > 3);

            if (isHeader) {
                if (currentSection.content.length > 0 || sections.length === 0) {
                    var content = currentSection.content.join('\n');
                    sections.push({ 
                        title: currentSection.title, 
                        content: content,
                        category: suggestCategory(currentSection.title, content)
                    });
                }
                currentSection = { title: trimmed, content: [] };
            } else {
                currentSection.content.push(trimmed);
            }
        }

        if (currentSection.content.length > 0) {
            var content = currentSection.content.join('\n');
            sections.push({ 
                title: currentSection.title, 
                content: content,
                category: suggestCategory(currentSection.title, content)
            });
        }

        if (sections.length === 0) {
            sections.push({ 
                title: 'Conteúdo', 
                content: fullText, 
                category: suggestCategory('Conteúdo', fullText) 
            });
        }

        return sections;
    }

    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.PDFProcessor = {
        processPDF: processPDF,
        processMultiplePDFs: processMultiplePDFs,
        extractSections: extractSections,
        suggestCategory: suggestCategory
    };
})();
