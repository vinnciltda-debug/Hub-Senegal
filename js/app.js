/* ================================
   APP.JS — Senegal Project v4
   Node Graph Moodboard + 3D Star + Lateral Navigation
   ================================ */

(function () {
    'use strict';

    /* ─── TOPIC DATA (A-F) ─── */
    var TOPICS = [
        {
            id: 'topic-a', letter: 'A', tag: 'Dados Demográficos',
            title: 'Perfil de um País Jovem e em Crescimento',
            text: 'Senegal é marcado por uma estrutura etária predominantemente jovem, com apenas um quarto da população acima de 30 anos. A idade mediana é de aproximadamente 23,6 anos (dados de 2025). Com uma taxa de crescimento de 2,28% ao ano, a população urbana representa cerca de 48-50%, liderada pelo polo de Dakar e grandes centros como Touba e M\'bour.',
            stats: [{ value: '23,6', label: 'Idade Mediana' }, { value: '2,28%', label: 'Crescimento Anual' }, { value: '102', label: 'Hab/km²' }],
            image: 'assets/senegal_demographics_1774208781562.png',
            pdfSource: 'parte a e e.pdf',
            qrLink: ''
        },
        {
            id: 'topic-b', letter: 'B', tag: 'Tamanho da População',
            title: 'Uma Nação de 18 Milhões de Almas',
            text: 'Em 2023, o Senegal atingiu a marca de 18.077.573 habitantes. Globalmente, posiciona-se como o 69º país mais populoso. Para efeito de comparação, sua densidade demográfica de 91,68 hab/km² reflete uma ocupação territorial significativa, embora concentrada em polos urbanos em expansão acelerada.',
            stats: [{ value: '18.1M', label: 'População 2023' }, { value: '69º', label: 'Ranking IBGE' }, { value: '91,68', label: 'Densidade' }],
            image: 'assets/senegal_population_crowd_1774208799106.png',
            pdfSource: 'parte b.pdf',
            qrLink: ''
        },
        {
            id: 'topic-c', letter: 'C', tag: 'Aspectos Culturais',
            title: 'Terra da Teraanga e da Négritude',
            text: 'A cultura senegalesa é definida pela "Teraanga" — generosidade de espírito e acolhimento. A língua Wolof domina o cotidiano, resistindo à imposição histórica do francês. Na música, o Mbalax funde Jazz, Soul e ritmos ancestrais. Dakar destaca-se como centro global de arte, abrigando a Bienal Dak\'Art e o imponente Museu das Civilizações Negras.',
            stats: [{ value: 'Wolof', label: 'Língua Nativa' }, { value: 'Mbalax', label: 'Ritmo Nacional' }, { value: "Dak'Art", label: 'Bienal de Arte' }],
            image: 'assets/senegal_culture_mbalax_1774208814214.png',
            pdfSource: 'parte c e d.pdf',
            qrLink: ''
        },
        {
            id: 'topic-d', letter: 'D', tag: 'Aspectos Sociais',
            title: 'Tradição, Fé e Paixão pelo Esporte',
            text: 'A sociedade é 95% muçulmana, vivendo sob um Estado Laico com alta tolerância religiosa. O esporte é uma paixão nacional inequívoca: da luta tradicional "Laamb", carregada de misticismo, à Seleção de Futebol (Leões de Teranga). Desafios como a desigualdade urbana e a precariedade de infraestrutura básica convivem com um forte senso de cuidado coletivo.',
            stats: [{ value: '95%', label: 'Muçulmanos' }, { value: 'Laamb', label: 'Luta Tradicional' }, { value: 'Teranga', label: 'Valores Sociais' }],
            image: 'assets/senegal_social_teranga_1774208829208.png',
            pdfSource: 'parte c e d.pdf',
            qrLink: ''
        },
        {
            id: 'topic-e', letter: 'E', tag: 'Aspectos Tecnológicos',
            title: 'Horizon 2034: A Soberania Digital',
            text: 'Com o lançamento do satélite GAINDESAT-1A em 2024, o Senegal iniciou uma nova era tecnológica. O "New Deal Technologique" visa digitalizar 90% dos serviços públicos até 2034, transformando o país em um hub regional com forte foco em infraestrutura de dados, cibersegurança e fomento a mais de 500 startups de tecnologia.',
            stats: [{ value: 'GAINDESAT', label: 'Primeiro Satélite' }, { value: '90%', label: 'Digitalização' }, { value: '15%', label: 'PIB Digital' }],
            image: 'assets/senegal_technology_satellite_1774208879529.png',
            pdfSource: 'parte a e e.pdf',
            qrLink: ''
        },
        {
            id: 'topic-f', letter: 'F', tag: 'Aspectos Ambientais',
            title: 'Economia Verde no Plano Senegal Emergente',
            text: 'O cenário ambiental apresenta contrastes entre o norte árido e o sul úmido. Enfrentando a desertificação e a perda de manguezais, o país destaca-se pelo programa de reflorestamento costeiro — um dos maiores do mundo. O Plano Senegal Emergente (PSE) reconhece a economia verde como motor essencial para o desenvolvimento sustentável.',
            stats: [{ value: '200M', label: 'Mudas de Mangue' }, { value: 'PSE', label: 'Visão Estratégica' }, { value: '46%', label: 'Solo Semiárido' }],
            image: 'assets/senegal_environment_mangroves_1774208904701.png',
            pdfSource: 'parte f.pdf',
            qrLink: ''
        }
    ];

    /* ─── MOODBOARD TILES ─── */
    var MOODBOARD_TILES = [
        { src: 'assets/senegal_demographics_1774208781562.png', tag: 'A. Demografia', label: 'Juventude e energia do futuro', size: 'lg', topic: 'a' },
        { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', tag: 'População', label: 'Multidão em Dakar', size: 'sm', topic: 'b' },
        { src: 'assets/senegal_population_crowd_1774208799106.png', tag: 'B. População', label: 'Crescimento urbano acelerado', size: 'md', topic: 'b' },
        { src: 'https://images.unsplash.com/photo-1590845947676-fa25d3941556?w=400&q=80', tag: 'Sociedade', label: 'Cenas do cotidiano', size: 'sm', topic: 'b' },
        { src: 'assets/senegal_culture_mbalax_1774208814214.png', tag: 'C. Cultura', label: 'Ritmo vibrante do Mbalax', size: 'lg', topic: 'c' },
        { src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=80', tag: 'Arte', label: 'Cores africanas', size: 'md', topic: 'c' },
        { src: 'https://images.unsplash.com/photo-1582213713374-4b5f4be8d32f?w=400&q=80', tag: 'Monumentos', label: 'Renascença Africana', size: 'md', topic: 'c' },
        { src: 'assets/senegal_social_teranga_1774208829208.png', tag: 'D. Social', label: 'Teraanga: A alma do Senegal', size: 'md', topic: 'd' },
        { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80', tag: 'Fé', label: 'Respeito e Tradição', size: 'lg', topic: 'd' },
        { src: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63f28?w=400&q=80', tag: 'Esporte', label: 'Paixão pelo Futebol', size: 'sm', topic: 'd' },
        { src: 'assets/senegal_technology_satellite_1774208879529.png', tag: 'E. Tecnologia', label: 'GAINDESAT-1A em órbita', size: 'lg', topic: 'e' },
        { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', tag: 'Digital', label: 'Horizonte 2034', size: 'md', topic: 'e' },
        { src: 'assets/senegal_environment_mangroves_1774208904701.png', tag: 'F. Ambiental', label: 'Restauração de Manguezais', size: 'lg', topic: 'f' },
        { src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80', tag: 'Natureza', label: 'Ecossistemas do Saara ao Sul', size: 'md', topic: 'f' },
        { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', tag: 'Savana', label: 'Biodiversidade preservada', size: 'sm', topic: 'f' }
    ];

    var PDF_FILES = [
        { name: 'parte a e e.pdf', label: 'Tópicos A & E — Demografia e Tecnologia' },
        { name: 'parte b.pdf', label: 'Tópico B — Tamanho da População' },
        { name: 'parte c e d.pdf', label: 'Tópicos C & D — Cultura e Sociedade' },
        { name: 'parte f.pdf', label: 'Tópico F — Aspectos Ambientais' }
    ];

    var DEFAULT_REFS = [
        'brasilescola.uol.com.br/geografia/senegal.htm',
        'www.unfpa.org/data/world-population/SN',
        'www.populationpyramid.net/pt/senegal/2025/',
        'datareportal.com/reports/digital-2025-senegal',
        'unep.org/pt-br/node/19395'
    ];

    var DEFAULT_TEAM = [
        { name: 'Integrante 1', role: 'Design & UX' },
        { name: 'Integrante 2', role: 'Pesquisa & Dados' },
        { name: 'Integrante 3', role: 'Desenvolvimento' }
    ];

    /* ─── STATE ─── */
    var isAdmin = document.body.classList.contains('admin-view');
    var currentSlideIndex = 0;
    var slideElements = [];
    var graphNodes = [];  // force simulation nodes
    var graphAnimId = null;
    var highlightTimer = null;

    /* ═══════════════════════════════════
       INIT
       ═══════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', function () {
        loadSavedData();
        renderNodeGraph();
        renderTopics();
        renderResearch();
        renderPDFs();
        renderRefs();
        renderTeam();
        initTabs();
        initSideNav();
        initPresentationControls();
        initParallax();
        initBackToTop();
        initScrollHint();
        init3DStars();

        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        if (isAdmin) {
            initEditable();
        }

        console.log('🌍 Senegal v4' + (isAdmin ? ' [Admin]' : ''));
    });

    /* ═══════════════════════════════════
       TABS
       ═══════════════════════════════════ */
    function initTabs() {
        var btns = document.querySelectorAll('.tab-btn');
        var panels = document.querySelectorAll('.tab-panel');
        var ctrl = document.getElementById('presentation-controls');
        var side = document.getElementById('side-nav');
        var prevArr = document.getElementById('prev-slide');
        var nextArr = document.getElementById('next-slide');

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.dataset.tab;
                btns.forEach(function (b) { b.classList.remove('active'); });
                panels.forEach(function (p) { p.classList.remove('active'); });
                btn.classList.add('active');
                var panel = document.getElementById('panel-' + target);
                if (panel) panel.classList.add('active');

                if (target === 'presentation') {
                    if (side) { side.style.opacity = '1'; side.style.pointerEvents = 'all'; }
                    if (window.scrollY > 200) {
                        if (ctrl) ctrl.classList.add('visible');
                        if (prevArr) prevArr.classList.add('visible');
                        if (nextArr) nextArr.classList.add('visible');
                    }
                } else {
                    if (ctrl) ctrl.classList.remove('visible');
                    if (prevArr) prevArr.classList.remove('visible');
                    if (nextArr) nextArr.classList.remove('visible');
                    if (side) { side.style.opacity = '0'; side.style.pointerEvents = 'none'; }
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }

                if (typeof AOS !== 'undefined') AOS.refresh();
            });
        });
    }

    /* ═══════════════════════════════════
       PARALLAX
       ═══════════════════════════════════ */
    function initParallax() {
        var layers = document.querySelectorAll('.parallax-layer');
        if (!layers.length) return;
        var speeds = [0.02, 0.015, 0.01, 0.005];
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            layers.forEach(function (layer, i) {
                layer.style.transform = 'translateY(' + (scrollY * (speeds[i] || 0.01) * -1) + 'px)';
            });
        }, { passive: true });
    }

    /* ═══════════════════════════════════
       PERSISTENCE
       ═══════════════════════════════════ */
    function loadSavedData() {
        try { var t = localStorage.getItem('sn3_topics'); if (t) TOPICS = JSON.parse(t); } catch (e) {}
        try { var m = localStorage.getItem('sn3_tiles'); if (m) MOODBOARD_TILES = JSON.parse(m); } catch (e) {}
    }
    function saveTopics() { localStorage.setItem('sn3_topics', JSON.stringify(TOPICS)); }
    function saveTiles() { localStorage.setItem('sn3_tiles', JSON.stringify(MOODBOARD_TILES)); }
    function getRefs() { try { var r = localStorage.getItem('sn3_refs'); return r ? JSON.parse(r) : DEFAULT_REFS.slice(); } catch (e) { return DEFAULT_REFS.slice(); } }
    function saveRefs(refs) { localStorage.setItem('sn3_refs', JSON.stringify(refs)); }
    function getTeam() { try { var t = localStorage.getItem('sn3_team'); return t ? JSON.parse(t) : DEFAULT_TEAM.slice(); } catch (e) { return DEFAULT_TEAM.slice(); } }
    function saveTeam(team) { localStorage.setItem('sn3_team', JSON.stringify(team)); }

    /* ═══════════════════════════════════
       NODE GRAPH MOODBOARD (Force-Directed)
       ═══════════════════════════════════ */
    function renderNodeGraph() {
        var container = document.getElementById('node-graph-container');
        var canvas = document.getElementById('node-graph-canvas');
        var nodesDiv = document.getElementById('node-graph-nodes');
        if (!container || !canvas || !nodesDiv) return;

        var ctx = canvas.getContext('2d');
        var W = container.offsetWidth;
        var H = container.offsetHeight;
        canvas.width = W;
        canvas.height = H;

        nodesDiv.innerHTML = '';
        graphNodes = [];

        var topicKeys = 'abcdef'.split('');
        var topicColors = { a: '#00853F', b: '#00a34d', c: '#FDEF42', d: '#ffe76a', e: '#E31B23', f: '#ff4d55' };
        var sizeMap = { lg: 95, md: 75, sm: 60 };

        // Attractor points (one for each topic)
        var attractors = topicKeys.map(function(k, idx) {
            var ang = (idx / topicKeys.length) * Math.PI * 2;
            return { x: W/2 + Math.cos(ang) * (W*0.25), y: H/2 + Math.sin(ang) * (H*0.25) };
        });

        // Create nodes
        MOODBOARD_TILES.forEach(function (tile, i) {
            var r = sizeMap[tile.size] || 75;
            var tIdx = topicKeys.indexOf(tile.topic);
            var att = attractors[tIdx] || { x: W/2, y: H/2 };
            
            var nx = att.x + (Math.random() - 0.5) * 100;
            var ny = att.y + (Math.random() - 0.5) * 100;

            var node = {
                x: nx, y: ny,
                vx: 0, vy: 0,
                r: r / 2,
                topic: tile.topic,
                tIdx: tIdx,
                color: topicColors[tile.topic] || '#00853F',
                idx: i
            };
            graphNodes.push(node);

            var el = document.createElement('div');
            el.className = 'graph-node';
            el.style.width = r + 'px';
            el.style.height = r + 'px';
            el.id = 'gnode-' + i;
            el.innerHTML =
                '<img src="' + tile.src + '" alt="' + esc(tile.label) + '" loading="lazy" />' +
                '<span class="graph-node__label">' + esc(tile.tag) + '</span>';

            el.addEventListener('click', function () {
                var idx = 'abcdef'.indexOf(tile.topic);
                if (idx >= 0) {
                    var t = document.getElementById('topic-' + 'abcdef'[idx]);
                    if (t) t.scrollIntoView({ behavior: 'smooth' });
                }
            });

            nodesDiv.appendChild(el);
        });

        // Build edges:
        // 1. All nodes in same topic are cluster-connected
        // 2. Sequential connection between topic "A" cluster and "B" cluster (meaningful flow)
        var edges = [];
        for (var i = 0; i < graphNodes.length; i++) {
            for (var j = i + 1; j < graphNodes.length; j++) {
                var a = graphNodes[i], b = graphNodes[j];
                // Direct topic connection
                if (a.topic === b.topic) {
                    edges.push({ from: i, to: j, type: 'same' });
                } else if (Math.abs(a.tIdx - b.tIdx) === 1) {
                    // Sequential bridge (but only 1 connection per pair of clusters to keep it clean)
                    if (Math.random() < 0.1) edges.push({ from: i, to: j, type: 'bridge' });
                }
            }
        }

        var dragNode = null, dragOffX = 0, dragOffY = 0;
        nodesDiv.addEventListener('pointerdown', function (e) {
            var nEl = e.target.closest('.graph-node'); if (!nEl) return;
            var idx = parseInt(nEl.id.replace('gnode-', ''));
            dragNode = graphNodes[idx];
            var rect = container.getBoundingClientRect();
            dragOffX = e.clientX - rect.left - dragNode.x;
            dragOffY = e.clientY - rect.top - dragNode.y;
            nEl.setPointerCapture(e.pointerId);
            e.preventDefault();
        });
        nodesDiv.addEventListener('pointermove', function (e) { if (!dragNode) return; var rect = container.getBoundingClientRect(); dragNode.x = e.clientX - rect.left - dragOffX; dragNode.y = e.clientY - rect.top - dragOffY; dragNode.vx = 0; dragNode.vy = 0; });
        nodesDiv.addEventListener('pointerup', function () { dragNode = null; });

        function simulate() {
            var damping = 0.94;
            var repulsion = 2200;
            var springK = 0.006;
            var clusterPull = 0.008;

            for (var i = 0; i < graphNodes.length; i++) {
                for (var j = i + 1; j < graphNodes.length; j++) {
                    var a = graphNodes[i], b = graphNodes[j];
                    var dx = b.x - a.x, dy = b.y - a.y;
                    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    var minDist = a.r + b.r + 30;
                    if (dist < minDist) {
                        var f = repulsion / (dist * dist);
                        a.vx -= (dx / dist) * f; a.vy -= (dy / dist) * f;
                        b.vx += (dx / dist) * f; b.vy += (dy / dist) * f;
                    }
                }
            }

            edges.forEach(function(e) {
                var a = graphNodes[e.from], b = graphNodes[e.to];
                var dx = b.x - a.x, dy = b.y - a.y;
                var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                var sLen = e.type === 'same' ? 120 : 250;
                var diff = dist - sLen;
                var f = diff * (e.type === 'same' ? springK : springK * 0.4);
                a.vx += (dx / dist) * f; a.vy += (dy / dist) * f;
                b.vx -= (dx / dist) * f; b.vy -= (dy / dist) * f;
            });

            graphNodes.forEach(function (n) {
                if (n === dragNode) return;
                var att = attractors[n.tIdx];
                n.vx += (att.x - n.x) * clusterPull;
                n.vy += (att.y - n.y) * clusterPull;
                n.vx *= damping; n.vy *= damping;
                n.x += n.vx; n.y += n.vy;
                n.x = Math.max(n.r, Math.min(W - n.r, n.x));
                n.y = Math.max(n.r, Math.min(H - n.r, n.y));
            });

            ctx.clearRect(0, 0, W, H);
            edges.forEach(function(e) {
                var a = graphNodes[e.from], b = graphNodes[e.to];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.lineWidth = e.type === 'same' ? 2 : 1;
                ctx.setLineDash(e.type === 'same' ? [] : [5, 5]);
                ctx.strokeStyle = hexToRgba(a.color, e.type === 'same' ? 0.2 : 0.08);
                ctx.stroke();
            });

            graphNodes.forEach(function (n) {
                var el = document.getElementById('gnode-' + n.idx);
                if (el) { el.style.left = (n.x - n.r) + 'px'; el.style.top = (n.y - n.r) + 'px'; }
            });
            graphAnimId = requestAnimationFrame(simulate);
        }
        simulate();

        var hlIdx = 0;
        if (highlightTimer) clearInterval(highlightTimer);
        highlightTimer = setInterval(function () {
            var prevEl = document.querySelector('.graph-node.highlighted'); if (prevEl) prevEl.classList.remove('highlighted');
            var el = document.getElementById('gnode-' + hlIdx); if (el) el.classList.add('highlighted');
            hlIdx = (hlIdx + 1) % graphNodes.length;
        }, 3000);
    }

    function hexToRgba(hex, alpha) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        var r = parseInt(hex.substring(0,2), 16);
        var g = parseInt(hex.substring(2,4), 16);
        var b = parseInt(hex.substring(4,6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    /* ═══════════════════════════════════
       TOPICS (A-F)
       ═══════════════════════════════════ */
    function renderTopics() {
        var container = document.getElementById('topics-container');
        if (!container) return;
        container.innerHTML = '';

        TOPICS.forEach(function (topic, i) {
            var section = document.createElement('section');
            section.className = 'topic-section';
            section.id = topic.id;

            var statsHtml = '<div class="topic-stats">';
            topic.stats.forEach(function (s, si) {
                statsHtml +=
                    '<div class="stat-item glass-light">' +
                      '<span class="stat-value" ' + (isAdmin ? 'contenteditable="true"' : '') + ' data-topic="' + i + '" data-stat="' + si + '" data-field="value">' + esc(s.value) + '</span>' +
                      '<span class="stat-label" ' + (isAdmin ? 'contenteditable="true"' : '') + ' data-topic="' + i + '" data-stat="' + si + '" data-field="label">' + esc(s.label) + '</span>' +
                    '</div>';
            });
            statsHtml += '</div>';

            var qrUrl = topic.qrLink || (window.location.href.split('#')[0] + '#' + topic.id);
            var qrHtml =
                '<div class="qr-area">' +
                  '<div class="three-canvas-wrap" id="star-canvas-' + i + '"></div>' +
                  '<div class="qr-area__code">' +
                    '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrUrl) + '&color=00853F" alt="QR" id="qr-img-' + i + '" />' +
                  '</div>' +
                  '<div class="qr-area__info">' +
                    '<div class="qr-area__label">Escaneie o QR Code</div>' +
                    '<div class="qr-area__desc">Acesse o conteúdo interativo sobre ' + esc(topic.tag) + '</div>' +
                    (isAdmin ? '<input type="text" class="form-control form-control-sm mt-2 bg-dark text-white border-secondary" placeholder="URL customizada do QR" value="' + esc(topic.qrLink || '') + '" data-topic="' + i + '" data-field="qrLink" />' : '') +
                  '</div>' +
                '</div>';

            var reverse = i % 2 === 1 ? ' flex-row-reverse' : '';

            section.innerHTML =
                '<div class="container h-100 d-flex align-items-center py-5">' +
                  '<div class="row w-100 g-5 align-items-center' + reverse + '">' +
                    '<div class="col-12 col-lg-6 topic-content" data-aos="fade-right" data-aos-delay="100">' +
                      '<div style="position:relative;">' +
                        '<span class="topic-letter">' + topic.letter + '</span>' +
                        '<span class="topic-tag badge bg-success text-white">' + esc(topic.tag) + '</span>' +
                      '</div>' +
                      '<h2 class="topic-title" ' + (isAdmin ? 'contenteditable="true"' : '') + ' data-topic="' + i + '" data-field="title">' + esc(topic.title) + '</h2>' +
                      '<p class="topic-text" ' + (isAdmin ? 'contenteditable="true"' : '') + ' data-topic="' + i + '" data-field="text">' + esc(topic.text) + '</p>' +
                      statsHtml +
                      '<div class="topic-source"><b>📎 Fonte:</b> <span ' + (isAdmin ? 'contenteditable="true"' : '') + ' data-topic="' + i + '" data-field="pdfSource">' + esc(topic.pdfSource) + '</span></div>' +
                      qrHtml +
                    '</div>' +
                    '<div class="col-12 col-lg-6" data-aos="fade-left" data-aos-delay="200">' +
                      '<div class="topic-image-wrapper">' +
                        '<img src="' + topic.image + '" alt="' + esc(topic.tag) + '" class="img-fluid" id="img-topic-' + i + '" />' +
                        (isAdmin ? '<button class="edit-image-btn" data-topic="' + i + '" title="Trocar Imagem"><i data-lucide="image" style="width:16px;height:16px;"></i></button>' : '') +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>';

            container.appendChild(section);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    /* ═══════════════════════════════════
       3D STAR (Three.js)
       ═══════════════════════════════════ */
    function init3DStars() {
        if (typeof THREE === 'undefined') return;

        TOPICS.forEach(function (topic, i) {
            var wrap = document.getElementById('star-canvas-' + i);
            if (!wrap) return;

            var w = 100, h = 100;
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
            camera.position.z = 3;

            var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            wrap.appendChild(renderer.domElement);

            // Star shape using ExtrudeGeometry
            var shape = new THREE.Shape();
            var outerR = 1, innerR = 0.4, points = 5;
            for (var p = 0; p < points * 2; p++) {
                var angle = (p * Math.PI) / points - Math.PI / 2;
                var r = p % 2 === 0 ? outerR : innerR;
                var sx = Math.cos(angle) * r;
                var sy = Math.sin(angle) * r;
                if (p === 0) shape.moveTo(sx, sy);
                else shape.lineTo(sx, sy);
            }
            shape.closePath();

            var extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 };
            var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geometry.center();

            var material = new THREE.MeshPhongMaterial({
                color: 0x00853F,
                emissive: 0x003318,
                shininess: 100,
                specular: 0xFDEF42
            });

            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Lights
            var light1 = new THREE.DirectionalLight(0xffffff, 1.2);
            light1.position.set(2, 2, 3);
            scene.add(light1);

            var light2 = new THREE.PointLight(0xFDEF42, 0.5, 10);
            light2.position.set(-2, -1, 2);
            scene.add(light2);

            scene.add(new THREE.AmbientLight(0x333333, 0.5));

            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.y += 0.012;
                mesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
                renderer.render(scene, camera);
            }
            animate();
        });
    }

    /* ═══════════════════════════════════
       TAB 2: RESEARCH, PDFS, REFS, TEAM
       ═══════════════════════════════════ */
    function renderResearch() {
        var grid = document.getElementById('research-grid');
        if (!grid) return;
        grid.innerHTML = '';
        TOPICS.forEach(function (topic, i) {
            var el = document.createElement('div');
            el.className = 'col-12 col-md-6 col-lg-4';
            el.innerHTML =
                '<div class="research-card" data-aos="fade-up" data-aos-delay="' + (i * 80) + '">' +
                  '<div class="research-card__letter">' + topic.letter + '</div>' +
                  '<div class="research-card__tag">' + esc(topic.tag) + '</div>' +
                  '<p class="research-card__text">' + esc(topic.text) + '</p>' +
                '</div>';
            grid.appendChild(el);
        });
    }

    function renderPDFs() {
        var grid = document.getElementById('pdf-grid');
        if (!grid) return;
        grid.innerHTML = '';
        PDF_FILES.forEach(function (pdf, i) {
            var el = document.createElement('div');
            el.className = 'col-12 col-md-6';
            el.innerHTML =
                '<a href="' + encodeURI(pdf.name) + '" target="_blank" class="pdf-card" data-aos="fade-up" data-aos-delay="' + (i * 80) + '">' +
                  '<div class="pdf-card__icon"><i data-lucide="file-text"></i></div>' +
                  '<div><div class="pdf-card__name">' + esc(pdf.name) + '</div><div class="pdf-card__size">' + esc(pdf.label) + '</div></div>' +
                '</a>';
            grid.appendChild(el);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderRefs() {
        var list = document.getElementById('references-list');
        if (!list) return;
        list.innerHTML = '';
        var refs = getRefs();
        refs.forEach(function (ref, i) {
            var el = document.createElement('div');
            el.className = 'col-12 col-md-6';
            el.innerHTML =
                '<div class="ref-item">' +
                   (isAdmin ? '<button class="btn btn-sm p-0 me-2" style="color:var(--sn-red);border:none;background:none;" onclick="SenegalApp.removeRef(' + i + ')"><i data-lucide="x" style="width:14px;height:14px;"></i></button>' : '') +
                   '<span>' + esc(ref) + '</span>' +
                '</div>';
            list.appendChild(el);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderTeam() {
        var grid = document.getElementById('team-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var team = getTeam();
        team.forEach(function (m, i) {
            var el = document.createElement('div');
            el.className = 'col-6 col-md-4 col-lg-3';
            el.innerHTML =
                '<div class="team-card" data-aos="zoom-in" data-aos-delay="' + (i * 100) + '">' +
                  '<div class="team-card__avatar">' + m.name.charAt(0) + '</div>' +
                  '<div class="team-card__name" ' + (isAdmin ? 'contenteditable="true" data-member="' + i + '" data-field="name"' : '') + '>' + esc(m.name) + '</div>' +
                  '<div class="team-card__role" ' + (isAdmin ? 'contenteditable="true" data-member="' + i + '" data-field="role"' : '') + '>' + esc(m.role) + '</div>' +
                  (isAdmin ? '<button class="btn btn-sm mt-2" style="color:var(--sn-red);border:none;background:none;" onclick="SenegalApp.removeMember(' + i + ')"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>' : '') +
                '</div>';
            grid.appendChild(el);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    /* ═══════════════════════════════════
       SIDE NAV + LATERAL SLIDE CONTROLS
       ═══════════════════════════════════ */
    function initSideNav() {
        var nav = document.getElementById('side-nav');
        if (!nav) return;
        nav.innerHTML = '';
        var sections = ['hero', 'moodboard-section'].concat(TOPICS.map(function (t) { return t.id; }));
        var labels = ['Início', 'Moodboard'].concat(TOPICS.map(function (t) { return t.letter + '. ' + t.tag; }));
        sections.forEach(function (id, idx) {
            var dot = document.createElement('a');
            dot.href = '#' + id;
            dot.className = 'nav-dot';
            dot.dataset.label = labels[idx];
            dot.title = labels[idx];
            dot.addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            });
            nav.appendChild(dot);
        });
    }

    function initPresentationControls() {
        var ctrl = document.getElementById('presentation-controls');
        var prev = document.getElementById('prev-slide');
        var next = document.getElementById('next-slide');
        var indicator = document.getElementById('slide-number');
        var prevSm = document.getElementById('prev-slide-sm');
        var nextSm = document.getElementById('next-slide-sm');
        if (!prev || !next) return;

        if (prevSm) prevSm.addEventListener('click', function() { prev.click(); });
        if (nextSm) nextSm.addEventListener('click', function() { next.click(); });

        slideElements = [document.getElementById('hero'), document.getElementById('moodboard-section')]
            .concat(Array.from(document.querySelectorAll('.topic-section')));

        window.addEventListener('scroll', function () {
            var activeBtn = document.querySelector('.tab-btn.active');
            if (!activeBtn || activeBtn.dataset.tab !== 'presentation') return;

            var closest = 0, minDiff = Infinity;
            var mid = window.scrollY + window.innerHeight / 2;

            slideElements.forEach(function (el, i) {
                if (!el) return;
                var d = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid);
                if (d < minDiff) { minDiff = d; closest = i; }
            });

            currentSlideIndex = closest;
            if (indicator) indicator.textContent = (closest + 1) + ' / ' + slideElements.length;

            var show = window.scrollY > 200;
            if (ctrl) ctrl.classList.toggle('visible', show);
            prev.classList.toggle('visible', show);
            next.classList.toggle('visible', show);

            // Sync dots
            document.querySelectorAll('.nav-dot').forEach(function (dot, idx) {
                dot.classList.toggle('active', idx === closest);
            });
        }, { passive: true });

        next.addEventListener('click', function () {
            if (currentSlideIndex < slideElements.length - 1)
                slideElements[currentSlideIndex + 1].scrollIntoView({ behavior: 'smooth' });
        });

        prev.addEventListener('click', function () {
            if (currentSlideIndex > 0)
                slideElements[currentSlideIndex - 1].scrollIntoView({ behavior: 'smooth' });
        });

        document.addEventListener('keydown', function (e) {
            var activeBtn = document.querySelector('.tab-btn.active');
            if (!activeBtn || activeBtn.dataset.tab !== 'presentation') return;
            if (e.target.contentEditable === 'true' || e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next.click(); }
            else if (e.key === 'ArrowLeft') { prev.click(); }
        });
    }

    /* ═══════════════════════════════════
       BACK TO TOP + SCROLL HINT
       ═══════════════════════════════════ */
    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function initScrollHint() {
        var hint = document.getElementById('scroll-hint');
        if (!hint) return;
        hint.addEventListener('click', function () {
            var mb = document.getElementById('moodboard-section');
            if (mb) mb.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ═══════════════════════════════════
       EDITABLE (Admin Only)
       ═══════════════════════════════════ */
    function initEditable() {
        document.querySelectorAll('[data-topic][data-field]').forEach(function (el) {
            if (el.tagName === 'INPUT') {
                el.addEventListener('input', function () {
                    var idx = parseInt(el.dataset.topic);
                    var field = el.dataset.field;
                    if (!isNaN(idx) && TOPICS[idx]) {
                        TOPICS[idx][field] = el.value;
                        saveTopics();
                        if (field === 'qrLink') {
                            var qrImg = document.getElementById('qr-img-' + idx);
                            var url = el.value || (window.location.href.split('#')[0] + '#' + TOPICS[idx].id);
                            if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url) + '&color=00853F';
                        }
                    }
                });
            } else {
                el.addEventListener('blur', function () {
                    var idx = parseInt(el.dataset.topic);
                    var field = el.dataset.field;
                    if (!isNaN(idx) && TOPICS[idx]) { TOPICS[idx][field] = el.innerText; saveTopics(); }
                });
            }
        });

        document.querySelectorAll('[data-topic][data-stat]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var idx = parseInt(el.dataset.topic);
                var si = parseInt(el.dataset.stat);
                var field = el.dataset.field;
                if (!isNaN(idx) && TOPICS[idx] && TOPICS[idx].stats[si]) { TOPICS[idx].stats[si][field] = el.innerText; saveTopics(); }
            });
        });

        document.querySelectorAll('[data-member][data-field]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var idx = parseInt(el.dataset.member);
                var field = el.dataset.field;
                var team = getTeam();
                if (team[idx]) { team[idx][field] = el.innerText; saveTeam(team); }
            });
        });

        ['hero-title', 'hero-subtitle'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('blur', function () { localStorage.setItem('sn3_' + id, el.innerText); });
            var saved = localStorage.getItem('sn3_' + id);
            if (saved) el.innerText = saved;
        });

        var fileInput = document.getElementById('admin-file-input') || createFileInput();
        var targetTopic = -1, targetTile = -1;

        document.querySelectorAll('.edit-image-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                targetTopic = btn.dataset.topic !== undefined ? parseInt(btn.dataset.topic) : -1;
                targetTile = btn.dataset.tile !== undefined ? parseInt(btn.dataset.tile) : -1;
                fileInput.click();
            });
        });

        fileInput.addEventListener('change', function () {
            if (!fileInput.files || !fileInput.files[0]) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                if (targetTopic !== -1) {
                    TOPICS[targetTopic].image = e.target.result;
                    var img = document.getElementById('img-topic-' + targetTopic);
                    if (img) img.src = e.target.result;
                    saveTopics();
                } else if (targetTile !== -1) {
                    MOODBOARD_TILES[targetTile].src = e.target.result;
                    saveTiles();
                }
                fileInput.value = '';
            };
            reader.readAsDataURL(fileInput.files[0]);
        });
    }

    function createFileInput() {
        var inp = document.createElement('input');
        inp.type = 'file'; inp.accept = 'image/*'; inp.hidden = true; inp.id = 'admin-file-input';
        document.body.appendChild(inp);
        return inp;
    }

    /* ═══════════════════════════════════
       ADMIN HELPERS
       ═══════════════════════════════════ */
    function removeTile(idx) { if (!confirm('Remover este bloco?')) return; MOODBOARD_TILES.splice(idx, 1); saveTiles(); renderNodeGraph(); }
    function addTile() { MOODBOARD_TILES.unshift({ src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400', tag: 'Novo Bloco', label: 'Descrição', size: 'md', topic: 'a' }); saveTiles(); renderNodeGraph(); }
    function removeRef(idx) { var refs = getRefs(); refs.splice(idx, 1); saveRefs(refs); renderRefs(); }
    function addRef() { var t = prompt('Nova referência:'); if (!t) return; var refs = getRefs(); refs.push(t); saveRefs(refs); renderRefs(); }
    function removeMember(idx) { if (!confirm('Remover?')) return; var team = getTeam(); team.splice(idx, 1); saveTeam(team); renderTeam(); if (typeof lucide !== 'undefined') lucide.createIcons(); }
    function addMember() { var n = prompt('Nome:'); if (!n) return; var r = prompt('Função:') || 'Membro'; var team = getTeam(); team.push({ name: n, role: r }); saveTeam(team); renderTeam(); if (typeof lucide !== 'undefined') lucide.createIcons(); }
    function resetAll() { if (!confirm('Resetar TODOS os dados?')) return; localStorage.clear(); window.location.reload(); }

    /* ──── UTILS ──── */
    function esc(text) { if (!text) return ''; var d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

    /* ──── PUBLIC API ──── */
    window.SenegalApp = { removeTile: removeTile, addTile: addTile, removeRef: removeRef, addRef: addRef, removeMember: removeMember, addMember: addMember, resetAll: resetAll };

})();
