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
        { name: 'Vinicius', role: 'Pesquisa Básica e Estruturação' },
        { name: 'Luana Bauler', role: 'Pesquisa: Tamanho da População' },
        { name: 'Juliana Da Costa', role: 'Pesquisa: Aspectos Ambientais' },
        { name: 'Isabella Archela', role: 'Pesquisa: Demografia e Tecnologia' },
        { name: 'Gabriel Ortega', role: 'Pesquisa: Cultura e Sociedade' }
    ];

    /* ─── STATE ─── */
    var isAdmin = document.body.classList.contains('admin-view');
    var currentSlideIndex = 0;
    var slideElements = [];
    var collageAnimStarted = false;

    /* ─── CUSTOM SECTIONS ─── */
    var CUSTOM_SECTIONS = [];

    /* ─── GOLDEN CIRCLE DATA ─── */
    var GOLDEN_CIRCLE = {
        why: {
            keyword: 'Porquê',
            title: 'Acreditamos na cultura',
            text: 'Porque a cultura africana merece ser conhecida, respeitada e celebrada globalmente. O Senegal é mais do que o que o mundo enxerga.'
        },
        how: {
            keyword: 'Como',
            title: 'Pesquisa + Imersão Visual',
            text: 'Através de pesquisa multidisciplinar (A-F) e uma apresentação visual impactante que conecta dados a emoções.'
        },
        what: {
            keyword: 'O Quê',
            title: 'Uma campanha que subverte',
            text: 'Uma campanha que desfaz estereótipos sobre o Senegal mostrando sua riqueza cultural, social, tecnológica e ambiental.'
        }
    };

    /* ─── PROBLEM DATA ─── */
    var PROBLEM_DATA = {
        tag: 'Problema Identificado',
        title: 'O mundo enxerga o Senegal com lentes estreitas',
        text: 'A percepção global sobre o Senegal é frequentemente reduzida a estereótipos de pobreza e subdesenvolvimento. A mídia internacional raramente mostra a vibração cultural, os avanços tecnológicos ou a riqueza social de um país jovem e em transformação acelerada. Essa visão limitada apaga a identidade real de uma nação que é berço da Négritude e da Teraanga.',
        missionTag: 'Nossa Missão',
        mission: 'Subverter essa narrativa. Apresentar o Senegal real através de dados concretos, cultura viva e um olhar que respeite a complexidade do país — provando que desenvolvimento começa e termina na cultura.'
    };

    /* ─── INSIGHTS DATA ─── */
    var INSIGHTS_DATA = {
        quote: {
            text: 'A cultura está no início e no fim de todo desenvolvimento.',
            author: 'Léopold Sédar Senghor — Poeta, intelectual e primeiro presidente do Senegal'
        },
        cards: [
            { icon: '🎶', title: 'Cultura como Motor', text: 'O Mbalax e a Teraanga não são folclore — são a base de uma identidade que impulsiona a modernização do país.' },
            { icon: '🚀', title: 'Tecnologia com Raízes', text: 'O GAINDESAT-1A e o New Deal Technologique nascem de um povo que valoriza o progresso sem esquecer suas origens.' },
            { icon: '🌿', title: 'Sustentabilidade Cultural', text: 'O reflorestamento de manguezais reflete a mesma filosofia Teraanga: cuidar do coletivo para garantir o futuro.' },
            { icon: '⚽', title: 'Esporte como Expressão', text: 'Da luta Laamb ao futebol, o esporte senegalês carrega misticismo e orgulho nacional em cada movimento.' }
        ]
    };

    /* ─── CREATIVE PROCESS DATA ─── */
    var PROCESS_STEPS = [
        { num: '01', title: 'Pesquisa', desc: 'Levantamento de dados demográficos, culturais, sociais, ambientais e tecnológicos' },
        { num: '02', title: 'Imersão Cultural', desc: 'Estudo aprofundado da cultura senegalesa, Teraanga e Négritude' },
        { num: '03', title: 'Ideação', desc: 'Conexão de insights com a palavra-chave de Senghor para construir a narrativa' },
        { num: '04', title: 'Conceito', desc: 'Definição da campanha: subverter estereótipos mostrando a riqueza real' },
        { num: '05', title: 'Campanha', desc: 'Produção de peças visuais e apresentação baseadas no moodboard' }
    ];

    /* ═══════════════════════════════════
       INIT
       ═══════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', function () {
        loadSavedData();
        renderTeamPresentation();
        renderTopics();
        renderGoldenCircle();
        renderProblem();
        renderMoodboardCollage();
        renderInsights();
        renderCreativeProcess();
        renderCustomSections();
        renderResearch();
        renderPDFs();
        renderRefs();
        renderTeam();
        restoreSectionOrder();
        initTabs();
        initSideNav();
        initPresentationControls();
        initParallax();
        initBackToTop();
        initScrollHint();
        init3DStars();
        initPDFDownload();

        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        if (isAdmin) {
            initEditable();
        }

        console.log('🌍 Senegal v5' + (isAdmin ? ' [Admin]' : ''));
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
       SCROLL ANIMATIONS & ORDER
       ═══════════════════════════════════ */
    function restoreSectionOrder() {
        var order = localStorage.getItem('sn3_section_order');
        if (!order) return;
        try {
            var ids = JSON.parse(order);
            var container = document.getElementById('panel-presentation');
            if (!container) return;
            ids.forEach(function (id) {
                var el = document.getElementById(id);
                if (el && el.parentElement === container) {
                    container.appendChild(el);
                }
            });
        } catch (e) {}
    }

    /* ═══════════════════════════════════
       PERSISTENCE
       ═══════════════════════════════════ */
    function loadSavedData() {
        try { var t = localStorage.getItem('sn3_topics'); if (t) TOPICS = JSON.parse(t); } catch (e) {}
        try { var m = localStorage.getItem('sn3_tiles'); if (m) MOODBOARD_TILES = JSON.parse(m); } catch (e) {}
        GOLDEN_CIRCLE = getGC();
        PROBLEM_DATA = getProblem();
        INSIGHTS_DATA = getInsights();
        PROCESS_STEPS = getProcess();
    }
    function saveTopics() { localStorage.setItem('sn3_topics', JSON.stringify(TOPICS)); }
    function saveTiles() { localStorage.setItem('sn3_tiles', JSON.stringify(MOODBOARD_TILES)); }
    function getRefs() { try { var r = localStorage.getItem('sn3_refs'); return r ? JSON.parse(r) : DEFAULT_REFS.slice(); } catch (e) { return DEFAULT_REFS.slice(); } }
    function saveRefs(refs) { localStorage.setItem('sn3_refs', JSON.stringify(refs)); }
    function getTeam() { try { var t = localStorage.getItem('sn3_team'); return t ? JSON.parse(t) : DEFAULT_TEAM.slice(); } catch (e) { return DEFAULT_TEAM.slice(); } }
    function saveTeam(team) { localStorage.setItem('sn3_team', JSON.stringify(team)); }
    
    function getGC() { try { var d = localStorage.getItem('sn3_gc'); return d ? JSON.parse(d) : GOLDEN_CIRCLE; } catch (e) { return GOLDEN_CIRCLE; } }
    function saveGC() { localStorage.setItem('sn3_gc', JSON.stringify(GOLDEN_CIRCLE)); }
    function getProblem() { try { var d = localStorage.getItem('sn3_problem'); return d ? JSON.parse(d) : PROBLEM_DATA; } catch (e) { return PROBLEM_DATA; } }
    function saveProblem() { localStorage.setItem('sn3_problem', JSON.stringify(PROBLEM_DATA)); }
    function getInsights() { try { var d = localStorage.getItem('sn3_insights'); return d ? JSON.parse(d) : INSIGHTS_DATA; } catch (e) { return INSIGHTS_DATA; } }
    function saveInsights() { localStorage.setItem('sn3_insights', JSON.stringify(INSIGHTS_DATA)); }
    function getProcess() { try { var d = localStorage.getItem('sn3_process'); return d ? JSON.parse(d) : PROCESS_STEPS; } catch (e) { return PROCESS_STEPS; } }
    function saveProcess() { localStorage.setItem('sn3_process', JSON.stringify(PROCESS_STEPS)); }
    function getCustomSections() { try { var d = localStorage.getItem('sn3_custom_sec'); return d ? JSON.parse(d) : []; } catch (e) { return []; } }
    function saveCustomSections() { localStorage.setItem('sn3_custom_sec', JSON.stringify(CUSTOM_SECTIONS)); }

    /* ─── MOODBOARD COLLAGE ─── */
    function renderMoodboardCollage() {
        var container = document.getElementById('moodboard-collage');
        if (!container) return;

        container.innerHTML = '';

        MOODBOARD_TILES.forEach(function (tile, i) {
            var el = document.createElement('div');
            el.className = 'moodboard-item';
            
            // Assign size classes based on tile.size
            if (tile.size === 'lg') el.classList.add('moodboard-item--lg');
            else if (tile.size === 'md') el.classList.add('moodboard-item--md');
            else if (tile.size === 'sm' && Math.random() > 0.5) el.classList.add('moodboard-item--wide');

            // Add organic rotation
            var rot = (Math.random() * 6 - 3).toFixed(2);
            el.style.setProperty('--rotation', rot + 'deg');
            
            // AOS animation
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (i * 50));

            el.innerHTML = 
                '<img src="' + tile.src + '" alt="' + esc(tile.label) + '" loading="lazy" />' +
                '<div class="moodboard-item__overlay">' +
                    '<div class="moodboard-item__tag">' + esc(tile.tag) + '</div>' +
                    '<div class="moodboard-item__label">' + esc(tile.label) + '</div>' +
                '</div>';

            el.addEventListener('click', function () {
                var idx = 'abcdef'.indexOf(tile.topic);
                if (idx >= 0) {
                    var t = document.getElementById('topic-' + 'abcdef'[idx]);
                    if (t) t.scrollIntoView({ behavior: 'smooth' });
                }
            });

            container.appendChild(el);
        });

        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ─── TEAM PRESENTATION (Tab 1) ─── */
    function renderTeamPresentation() {
        var grid = document.getElementById('team-presentation-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var team = getTeam();
        team.forEach(function (m, i) {
            var el = document.createElement('div');
            el.className = 'team-pres-card';
            el.setAttribute('data-aos', 'zoom-in');
            el.setAttribute('data-aos-delay', (i * 100));
            el.innerHTML =
                '<div class="team-pres-avatar">' + m.name.charAt(0).toUpperCase() + '</div>' +
                '<div class="team-pres-name">' + esc(m.name) + '</div>' +
                '<div class="team-pres-role">' + esc(m.role) + '</div>';
            grid.appendChild(el);
        });
    }

    /* ─── GOLDEN CIRCLE ─── */
    function renderGoldenCircle() {
        var container = document.getElementById('golden-circle-container');
        if (!container) return;
        container.innerHTML = '';
        var keys = ['why', 'how', 'what'];
        keys.forEach(function (key, i) {
            var data = GOLDEN_CIRCLE[key];
            var el = document.createElement('div');
            el.className = 'gc-ring gc-ring--' + key;
            el.setAttribute('data-aos', 'zoom-in');
            el.setAttribute('data-aos-delay', (i * 150));
            el.innerHTML =
                '<div class="gc-ring__keyword" ' + (isAdmin ? 'contenteditable="true" data-gc="' + key + '" data-field="keyword"' : '') + '>' + esc(data.keyword) + '</div>' +
                '<div class="gc-ring__title" ' + (isAdmin ? 'contenteditable="true" data-gc="' + key + '" data-field="title"' : '') + '>' + esc(data.title) + '</div>' +
                '<div class="gc-ring__text" ' + (isAdmin ? 'contenteditable="true" data-gc="' + key + '" data-field="text"' : '') + '>' + esc(data.text) + '</div>';
            container.appendChild(el);
        });
    }

    /* ─── PROBLEM ─── */
    function renderProblem() {
        var container = document.getElementById('problem-block');
        if (!container) return;
        container.innerHTML =
            '<div class="problem-card" data-aos="fade-up">' +
                '<div class="problem-card__tag" ' + (isAdmin ? 'contenteditable="true" data-problem="tag"' : '') + '>' + esc(PROBLEM_DATA.tag) + '</div>' +
                '<h2 class="problem-card__title" ' + (isAdmin ? 'contenteditable="true" data-problem="title"' : '') + '>' + esc(PROBLEM_DATA.title) + '</h2>' +
                '<p class="problem-card__text" ' + (isAdmin ? 'contenteditable="true" data-problem="text"' : '') + '>' + esc(PROBLEM_DATA.text) + '</p>' +
                '<div class="problem-mission">' +
                    '<div class="problem-mission__tag" ' + (isAdmin ? 'contenteditable="true" data-problem="missionTag"' : '') + '>' + esc(PROBLEM_DATA.missionTag) + '</div>' +
                    '<p class="problem-mission__text" ' + (isAdmin ? 'contenteditable="true" data-problem="mission"' : '') + '>' + esc(PROBLEM_DATA.mission) + '</p>' +
                '</div>' +
            '</div>';
    }

    /* ─── INSIGHTS ─── */
    function renderInsights() {
        var container = document.getElementById('insights-container');
        if (!container) return;

        var quoteHtml =
            '<div class="insights-quote" data-aos="fade-up">' +
                '<div class="insights-quote__text" ' + (isAdmin ? 'contenteditable="true" data-insight="quote" data-field="text"' : '') + '>' + esc(INSIGHTS_DATA.quote.text) + '</div>' +
                '<div class="insights-quote__author" ' + (isAdmin ? 'contenteditable="true" data-insight="quote" data-field="author"' : '') + '>&mdash; ' + esc(INSIGHTS_DATA.quote.author).replace(/^—\s*/, '') + '</div>' +
            '</div>';

        var cardsHtml = '<div class="insights-grid">';
        INSIGHTS_DATA.cards.forEach(function (card, i) {
            cardsHtml +=
                '<div class="insight-card" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
                    '<div class="insight-card__icon" ' + (isAdmin ? 'contenteditable="true" data-insight="' + i + '" data-field="icon"' : '') + '>' + card.icon + '</div>' +
                    '<div class="insight-card__title" ' + (isAdmin ? 'contenteditable="true" data-insight="' + i + '" data-field="title"' : '') + '>' + esc(card.title) + '</div>' +
                    '<div class="insight-card__text" ' + (isAdmin ? 'contenteditable="true" data-insight="' + i + '" data-field="text"' : '') + '>' + esc(card.text) + '</div>' +
                '</div>';
        });
        cardsHtml += '</div>';

        container.innerHTML = quoteHtml + cardsHtml;
    }

    /* ─── CREATIVE PROCESS ─── */
    function renderCreativeProcess() {
        var container = document.getElementById('creative-process-container');
        if (!container) return;

        var html = '<div class="text-center mb-4" data-aos="fade-up">' +
            '<h2 class="pres-title">Nosso Processo</h2>' +
            '<p class="pres-subtitle">As etapas que guiam a construção da campanha criativa</p>' +
            '</div>' +
            '<div class="process-timeline">';

        PROCESS_STEPS.forEach(function (step, i) {
            html +=
                '<div class="process-step" data-aos="fade-up" data-aos-delay="' + (i * 120) + '">' +
                    '<div class="process-step__number" ' + (isAdmin ? 'contenteditable="true" data-process="' + i + '" data-field="num"' : '') + '>' + step.num + '</div>' +
                    (i < PROCESS_STEPS.length - 1 ? '<div class="process-step__connector"></div>' : '') +
                    '<div class="process-step__title" ' + (isAdmin ? 'contenteditable="true" data-process="' + i + '" data-field="title"' : '') + '>' + esc(step.title) + '</div>' +
                    '<div class="process-step__desc" ' + (isAdmin ? 'contenteditable="true" data-process="' + i + '" data-field="desc"' : '') + '>' + esc(step.desc) + '</div>' +
                '</div>';
        });
        html += '</div>';

        container.innerHTML = html;
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
                  '<div class="row w-100 g-5 align-items-stretch' + reverse + '">' +
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
                    '<div class="col-12 col-lg-6 topic-image-col" data-aos="fade-left" data-aos-delay="200">' +
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
        var sections = ['hero', 'section-team']
            .concat(TOPICS.map(function (t) { return t.id; }))
            .concat(['section-golden-circle', 'section-problem', 'moodboard-section', 'section-insights', 'section-creative-process']);
        var labels = ['Início', 'Equipe']
            .concat(TOPICS.map(function (t) { return t.letter + '. ' + t.tag; }))
            .concat(['Metodologia', 'Problema', 'Moodboard', 'Insights', 'Processo']);
        sections.forEach(function (id, idx) {
            var dot = document.createElement('a');
            dot.href = '#' + id;
            dot.className = 'nav-dot';
            dot.dataset.label = labels[idx];
            dot.title = labels[idx];
            dot.addEventListener('click', function (e) {
                e.preventDefault();
                var el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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

        slideElements = [
            document.getElementById('hero'),
            document.getElementById('section-team')
        ].concat(Array.from(document.querySelectorAll('.topic-section'))).concat([
            document.getElementById('section-golden-circle'),
            document.getElementById('section-problem'),
            document.getElementById('moodboard-section'),
            document.getElementById('section-insights'),
            document.getElementById('section-creative-process')
        ]).filter(function(el) { return el !== null; });

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

        // Golden Circle Edits
        document.querySelectorAll('[data-gc][data-field]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var key = el.dataset.gc;
                var field = el.dataset.field;
                if (GOLDEN_CIRCLE[key]) { GOLDEN_CIRCLE[key][field] = el.innerText; saveGC(); }
            });
        });

        // Problem Edits
        document.querySelectorAll('[data-problem]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var field = el.dataset.problem;
                if (PROBLEM_DATA[field] !== undefined) { PROBLEM_DATA[field] = el.innerText; saveProblem(); }
            });
        });

        // Insights Edits
        document.querySelectorAll('[data-insight][data-field]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var key = el.dataset.insight;
                var field = el.dataset.field;
                if (key === 'quote') {
                    INSIGHTS_DATA.quote[field] = el.innerText;
                } else {
                    var idx = parseInt(key);
                    if (!isNaN(idx) && INSIGHTS_DATA.cards[idx]) { INSIGHTS_DATA.cards[idx][field] = el.innerText; }
                }
                saveInsights();
            });
        });

        // Creative Process Edits
        document.querySelectorAll('[data-process][data-field]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var idx = parseInt(el.dataset.process);
                var field = el.dataset.field;
                if (!isNaN(idx) && PROCESS_STEPS[idx]) { PROCESS_STEPS[idx][field] = el.innerText; saveProcess(); }
            });
        });

        // Setup SortableJS for Drag-and-Drop section reordering
        if (typeof Sortable !== 'undefined') {
            var presContainer = document.getElementById('panel-presentation');
            if (presContainer) {
                Sortable.create(presContainer, {
                    animation: 150,
                    filter: '#hero, #section-download',
                    preventOnFilter: false,
                    onEnd: function () {
                        var ids = [];
                        Array.from(presContainer.children).forEach(function (child) {
                            if (child.id) ids.push(child.id);
                        });
                        localStorage.setItem('sn3_section_order', JSON.stringify(ids));
                        
                        // Fix for AOS animations breaking on DOM reorder
                        if (typeof AOS !== 'undefined') {
                           setTimeout(function() { AOS.refresh(); }, 100);
                        }
                    }
                });
            }
        }


        // Custom Section Edits
        document.querySelectorAll('[data-custom][data-field]').forEach(function (el) {
            el.addEventListener('blur', function () {
                var idx = parseInt(el.dataset.custom);
                var field = el.dataset.field;
                if (!isNaN(idx) && CUSTOM_SECTIONS[idx]) { CUSTOM_SECTIONS[idx][field] = el.innerText; saveCustomSections(); }
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
       PDF EXPORT (ABNT)
       ═══════════════════════════════════ */
    function initPDFDownload() {
        var btn = document.getElementById('btn-download-pdf');
        if (!btn) return;
        btn.addEventListener('click', generateABNTPDF);
    }

    function generateABNTPDF() {
        if (typeof window.jspdf === 'undefined') { alert('Aguarde o carregamento do gerador de PDF.'); return; }
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF({ unit: 'mm', format: 'a4' });
        var pageW = 210, pageH = 297;
        var mL = 30, mR = 20, mT = 30, mB = 20;
        var contentW = pageW - mL - mR;
        var y = mT;
        var lineH = 6;
        var team = getTeam();
        var refs = getRefs();

        function checkPage(needed) {
            if (y + needed > pageH - mB) { doc.addPage(); y = mT; }
        }

        function addTitle(text, size) {
            checkPage(20);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(size || 14);
            doc.text(text.toUpperCase(), mL, y);
            y += lineH + 4;
        }

        function addText(text) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            var lines = doc.splitTextToSize(text, contentW);
            lines.forEach(function (line) {
                checkPage(lineH);
                doc.text(line, mL, y);
                y += lineH;
            });
            y += 4;
        }

        function addSpacing(px) { y += px || 8; }

        // === CAPA ===
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('PROJETO ACADÊMICO', pageW / 2, 80, { align: 'center' });
        doc.setFontSize(24);
        doc.text('SENEGAL', pageW / 2, 100, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('Análise Multidisciplinar', pageW / 2, 112, { align: 'center' });
        addSpacing(20);

        // Equipe na capa
        doc.setFontSize(12);
        var teamY = 150;
        team.forEach(function (m) {
            doc.text(m.name + ' — ' + m.role, pageW / 2, teamY, { align: 'center' });
            teamY += 8;
        });

        doc.text(new Date().getFullYear().toString(), pageW / 2, 270, { align: 'center' });

        // === SUMÁRIO ===
        doc.addPage(); y = mT;
        addTitle('SUMÁRIO', 16);
        addSpacing(4);
        var sumario = [
            '1. Equipe',
            '2. Aspectos Pesquisados (A-F)',
            '3. Metodologia — Círculo de Ouro',
            '4. Problema Identificado',
            '5. Moodboard',
            '6. Insights Criativos',
            '7. Processo Criativo',
            '8. Referências'
        ];
        sumario.forEach(function (item) {
            addText(item);
        });

        // === 1. EQUIPE ===
        doc.addPage(); y = mT;
        addTitle('1. EQUIPE');
        team.forEach(function (m) {
            addText(m.name + ': ' + m.role);
        });

        // === 2. TÓPICOS A-F ===
        addSpacing(8);
        addTitle('2. ASPECTOS PESQUISADOS');
        TOPICS.forEach(function (topic) {
            checkPage(40);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(topic.letter + '. ' + topic.tag + ' — ' + topic.title, mL, y);
            y += lineH + 2;
            addText(topic.text);
            if (topic.stats && topic.stats.length) {
                var statsLine = topic.stats.map(function (s) { return s.label + ': ' + s.value; }).join(' | ');
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(10);
                checkPage(lineH);
                doc.text(statsLine, mL, y);
                y += lineH;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
            }
            addSpacing(6);
        });

        // === 3. METODOLOGIA ===
        doc.addPage(); y = mT;
        addTitle('3. METODOLOGIA — CÍRCULO DE OURO (SIMON SINEK)');
        addText('Baseamos nossa abordagem no modelo do Círculo de Ouro proposto por Simon Sinek em "Start With Why", que organiza a comunicação em três níveis:');
        addSpacing(4);
        ['why', 'how', 'what'].forEach(function (key) {
            var data = GOLDEN_CIRCLE[key];
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            checkPage(lineH);
            doc.text(data.keyword.toUpperCase() + ': ' + data.title, mL, y);
            y += lineH + 2;
            addText(data.text);
        });

        // === 4. PROBLEMA ===
        addSpacing(6);
        addTitle('4. PROBLEMA IDENTIFICADO');
        addText(PROBLEM_DATA.title);
        addText(PROBLEM_DATA.text);
        addSpacing(4);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        checkPage(lineH);
        doc.text('MISSÃO:', mL, y);
        y += lineH + 2;
        addText(PROBLEM_DATA.mission);

        // === 5. MOODBOARD ===
        doc.addPage(); y = mT;
        addTitle('5. MOODBOARD');
        addText('O moodboard visual foi construído como uma collage que conecta os elementos pesquisados — cultura, sociedade, tecnologia, meio ambiente — em uma composição visual coesa que serve como referência estética para a campanha.');

        // === 6. INSIGHTS ===
        addSpacing(6);
        addTitle('6. INSIGHTS CRIATIVOS');
        addSpacing(2);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        var quoteLines = doc.splitTextToSize('"' + INSIGHTS_DATA.quote.text + '"', contentW);
        quoteLines.forEach(function (line) {
            checkPage(lineH);
            doc.text(line, mL, y);
            y += lineH;
        });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        checkPage(lineH);
        doc.text('— ' + INSIGHTS_DATA.quote.author, mL, y);
        y += lineH + 6;
        doc.setFontSize(12);

        INSIGHTS_DATA.cards.forEach(function (card) {
            doc.setFont('helvetica', 'bold');
            checkPage(lineH);
            doc.text(card.title, mL, y);
            y += lineH + 1;
            addText(card.text);
        });

        // === 7. PROCESSO CRIATIVO ===
        doc.addPage(); y = mT;
        addTitle('7. PROCESSO CRIATIVO');
        PROCESS_STEPS.forEach(function (step) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            checkPage(lineH);
            doc.text('Etapa ' + step.num + ': ' + step.title, mL, y);
            y += lineH + 1;
            addText(step.desc);
        });

        // === SEÇÕES CUSTOMIZADAS ===
        if (CUSTOM_SECTIONS.length > 0) {
            doc.addPage(); y = mT;
            addTitle('SEÇÕES ADICIONAIS');
            CUSTOM_SECTIONS.forEach(function (sec) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
                checkPage(lineH);
                doc.text(sec.title.toUpperCase(), mL, y);
                y += lineH + 2;
                addText(sec.text);
                addSpacing(4);
            });
        }

        // === 8. REFERÊNCIAS (ABNT) ===
        addSpacing(10);
        addTitle('8. REFERÊNCIAS');
        refs.forEach(function (ref) {
            addText('Disponível em: <' + ref + '>. Acesso em: ' + new Date().toLocaleDateString('pt-BR') + '.');
        });

        doc.save('Senegal_Projeto_Academico_ABNT.pdf');
    }

    /* ──── UTILS ──── */
    function esc(text) { if (!text) return ''; var d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

    function removeTile(idx) { if (!confirm('Remover este bloco?')) return; MOODBOARD_TILES.splice(idx, 1); saveTiles(); renderMoodboardCollage(); }
    function addTile() { MOODBOARD_TILES.unshift({ src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400', tag: 'Novo Bloco', label: 'Descrição', size: 'md', topic: 'a' }); saveTiles(); renderMoodboardCollage(); }
    function removeRef(idx) { var refs = getRefs(); refs.splice(idx, 1); saveRefs(refs); renderRefs(); }
    function addRef() { var t = prompt('Nova referência:'); if (!t) return; var refs = getRefs(); refs.push(t); saveRefs(refs); renderRefs(); }
    function removeMember(idx) { if (!confirm('Remover?')) return; var team = getTeam(); team.splice(idx, 1); saveTeam(team); renderTeam(); if (typeof lucide !== 'undefined') lucide.createIcons(); }
    function addMember() { var n = prompt('Nome:'); if (!n) return; var r = prompt('Função:') || 'Membro'; var team = getTeam(); team.push({ name: n, role: r }); saveTeam(team); renderTeam(); if (typeof lucide !== 'undefined') lucide.createIcons(); }
    function resetAll() { if (!confirm('Resetar TODOS os dados?')) return; localStorage.clear(); window.location.reload(); }

    function removeCustomSection(idx) {
        if (!confirm('Remover esta seção customizada?')) return;
        CUSTOM_SECTIONS.splice(idx, 1);
        saveCustomSections();
        window.location.reload(); 
    }
    
    function addCustomSection() {
        var t = prompt('Título da Seção Customizada:'); if (!t) return;
        var txt = prompt('Texto da Seção:'); if (!txt) return;
        CUSTOM_SECTIONS.push({ title: t, text: txt });
        saveCustomSections();
        window.location.reload(); 
    }

    /* ──── PUBLIC API ──── */
    window.SenegalApp = { removeTile: removeTile, addTile: addTile, removeRef: removeRef, addRef: addRef, removeMember: removeMember, addMember: addMember, resetAll: resetAll, addCustomSection: addCustomSection, removeCustomSection: removeCustomSection };

})();
