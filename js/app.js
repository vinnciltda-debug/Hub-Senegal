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
            pdfSource: 'assets/pdfs/parte a e e.pdf',
            qrLink: ''
        },
        {
            id: 'topic-b', letter: 'B', tag: 'Tamanho da População',
            title: 'Uma Nação de 18 Milhões de Almas',
            text: 'Em 2023, o Senegal atingiu a marca de 18.077.573 habitantes. Globalmente, posiciona-se como o 69º país mais populoso. Para efeito de comparação, sua densidade demográfica de 91,68 hab/km² reflete uma ocupação territorial significativa, embora concentrada em polos urbanos em expansão acelerada.',
            stats: [{ value: '18.1M', label: 'População 2023' }, { value: '69º', label: 'Ranking IBGE' }, { value: '91,68', label: 'Densidade' }],
            image: 'assets/senegal_population_crowd_1774208799106.png',
            pdfSource: 'assets/pdfs/parte b.pdf',
            qrLink: ''
        },
        {
            id: 'topic-c', letter: 'C', tag: 'Aspectos Culturais',
            title: 'Terra da Teraanga e da Négritude',
            text: 'A cultura senegalesa é definida pela "Teraanga" — generosidade de espírito e acolhimento. A língua Wolof domina o cotidiano, resistindo à imposição histórica do francês. Na música, o Mbalax funde Jazz, Soul e ritmos ancestrais. Dakar destaca-se como centro global de arte, abrigando a Bienal Dak\'Art e o imponente Museu das Civilizações Negras.',
            stats: [{ value: 'Wolof', label: 'Língua Nativa' }, { value: 'Mbalax', label: 'Ritmo Nacional' }, { value: "Dak'Art", label: 'Bienal de Arte' }],
            image: 'assets/senegal_culture_mbalax_1774208814214.png',
            pdfSource: 'assets/pdfs/parte c e d.pdf',
            qrLink: ''
        },
        {
            id: 'topic-d', letter: 'D', tag: 'Aspectos Sociais',
            title: 'Tradição, Fé e Paixão pelo Esporte',
            text: 'A sociedade é 95% muçulmana, vivendo sob um Estado Laico com alta tolerância religiosa. O esporte é uma paixão nacional inequívoca: da luta tradicional "Laamb", carregada de misticismo, à Seleção de Futebol (Leões de Teranga). Desafios como a desigualdade urbana e a precariedade de infraestrutura básica convivem com um forte senso de cuidado coletivo.',
            stats: [{ value: '95%', label: 'Muçulmanos' }, { value: 'Laamb', label: 'Luta Tradicional' }, { value: 'Teranga', label: 'Valores Sociais' }],
            image: 'assets/senegal_social_teranga_1774208829208.png',
            pdfSource: 'assets/pdfs/parte c e d.pdf',
            qrLink: ''
        },
        {
            id: 'topic-e', letter: 'E', tag: 'Aspectos Tecnológicos',
            title: 'Horizon 2034: A Soberania Digital',
            text: 'Com o lançamento do satélite GAINDESAT-1A em 2024, o Senegal iniciou uma nova era tecnológica. O "New Deal Technologique" visa digitalizar 90% dos serviços públicos até 2034, transformando o país em um hub regional com forte foco em infraestrutura de dados, cibersegurança e fomento a mais de 500 startups de tecnologia.',
            stats: [{ value: 'GAINDESAT', label: 'Primeiro Satélite' }, { value: '90%', label: 'Digitalização' }, { value: '15%', label: 'PIB Digital' }],
            image: 'assets/senegal_technology_satellite_1774208879529.png',
            pdfSource: 'assets/pdfs/parte a e e.pdf',
            qrLink: ''
        },
        {
            id: 'topic-f', letter: 'F', tag: 'Aspectos Ambientais',
            title: 'Economia Verde no Plano Senegal Emergente',
            text: 'O cenário ambiental apresenta contrastes entre o norte árido e o sul úmido. Enfrentando a desertificação e a perda de manguezais, o país destaca-se pelo programa de reflorestamento costeiro — um dos maiores do mundo. O Plano Senegal Emergente (PSE) reconhece a economia verde como motor essencial para o desenvolvimento sustentável.',
            stats: [{ value: '200M', label: 'Mudas de Mangue' }, { value: 'PSE', label: 'Visão Estratégica' }, { value: '46%', label: 'Solo Semiárido' }],
            image: 'assets/senegal_environment_mangroves_1774208904701.png',
            pdfSource: 'assets/pdfs/parte f.pdf',
            qrLink: ''
        }
    ];

    /* ─── MOODBOARD TILES ─── */
    var MOODBOARD_TILES = [
        { src: 'assets/african_future_1776055694398.png', tag: 'Identidade e Négritude', label: 'Juventude e energia do futuro', size: 'lg', topic: 'a' },
        { src: 'assets/dakar_market_1776055480119.png', tag: 'Cultura como Motor', label: 'Multidão em Dakar', size: 'sm', topic: 'b' },
        { src: 'assets/laamb_wrestling_1776055517088.png', tag: 'Esporte como Expressão', label: 'Luta Tradicional Laamb', size: 'md', topic: 'd' },
        { src: 'assets/baobab_sunset_1776055973939.png', tag: 'Sustentabilidade Cultural', label: 'Resistência e Natureza', size: 'sm', topic: 'f' },
        { src: 'https://loremflickr.com/800/1200/africa,music,culture?random=5', tag: 'Cultura como Motor', label: 'Ritmo vibrante do Mbalax', size: 'lg', topic: 'c' },
        { src: 'https://loremflickr.com/1000/800/art,senegal?random=6', tag: 'Cultura como Motor', label: 'Cores africanas', size: 'md', topic: 'c' },
        { src: 'https://loremflickr.com/1000/800/monument,dakar?random=7', tag: 'Sustentabilidade Cultural', label: 'Renascença Africana', size: 'md', topic: 'c' },
        { src: 'https://loremflickr.com/800/1000/africa,nature?random=8', tag: 'Sustentabilidade Cultural', label: 'Paisagem Natural', size: 'md', topic: 'f' },
        { src: 'https://loremflickr.com/1000/800/senegal,tradition?random=9', tag: 'Esporte como Expressão', label: 'Teraanga: A alma do Senegal', size: 'md', topic: 'd' },
        { src: 'https://loremflickr.com/800/1000/africa,faith?random=10', tag: 'Sustentabilidade Cultural', label: 'Respeito e Tradição', size: 'lg', topic: 'd' },
        { src: 'https://loremflickr.com/800/800/soccer,senegal?random=11', tag: 'Esporte como Expressão', label: 'Paixão pelo Futebol', size: 'sm', topic: 'd' },
        { src: 'https://loremflickr.com/800/800/sports,africa?random=12', tag: 'Esporte como Expressão', label: 'Movimento e Garra', size: 'sm', topic: 'd' },
        { src: 'https://loremflickr.com/800/1000/technology,africa?random=13', tag: 'Tecnologia com Raízes', label: 'Inovação e Crescimento', size: 'lg', topic: 'e' },
        { src: 'https://loremflickr.com/1000/800/africa,innovation?random=14', tag: 'Tecnologia com Raízes', label: 'Horizonte 2034', size: 'md', topic: 'e' },
        { src: 'https://loremflickr.com/800/800/digital,senegal?random=15', tag: 'Tecnologia com Raízes', label: 'Conexão Digital', size: 'sm', topic: 'e' },
        { src: 'https://loremflickr.com/800/1000/mangroves,africa?random=16', tag: 'Sustentabilidade Cultural', label: 'Restauração de Manguezais', size: 'lg', topic: 'f' },
        { src: 'https://loremflickr.com/1000/800/senegal,landscape?random=17', tag: 'Identidade e Négritude', label: 'Ecossistemas Preservados', size: 'md', topic: 'f' },
        { src: 'https://loremflickr.com/1000/800/africa,animals?random=18', tag: 'Sustentabilidade Cultural', label: 'Biodiversidade', size: 'md', topic: 'f' },
        { src: 'https://loremflickr.com/800/800/baobab,senegal?random=19', tag: 'Cultura como Motor', label: 'Eternidade e Resistência', size: 'sm', topic: 'f' }
    ];

    var PDF_FILES = [
        { name: 'assets/pdfs/parte a e e.pdf', label: 'Tópicos A & E — Demografia e Tecnologia' },
        { name: 'assets/pdfs/parte b.pdf', label: 'Tópico B — Tamanho da População' },
        { name: 'assets/pdfs/parte c e d.pdf', label: 'Tópicos C & D — Cultura e Sociedade' },
        { name: 'assets/pdfs/parte f.pdf', label: 'Tópico F — Aspectos Ambientais' }
    ];

    var DEFAULT_REFS = [
        'brasilescola.uol.com.br/geografia/senegal.htm',
        'www.unfpa.org/data/world-population/SN',
        'www.populationpyramid.net/pt/senegal/2025/',
        'datareportal.com/reports/digital-2025-senegal',
        'unep.org/pt-br/node/19395',
        'SINEK, Simon. Start With Why: How Great Leaders Inspire Everyone to Take Action. Portfolio/Penguin, 2009.',
        'BROWN, Tim. Design Thinking: Uma Metodologia Poderosa para Decretar o Fim das Velhas Ideias. Alta Books, 2010.'
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
        tag: 'O Desafio Curatorial',
        title: 'Para além dos Clichês',
        text: 'O Senegal autêntico é moldado pela juventude, hiperconectividade e uma economia vibrante impulsionada pelo Plano Senegal Emergente (PSE). A campanha subverte o imaginário limitado para posicionar o país não apenas como memória histórica, mas como um ator global central em inovação e sustentabilidade ativa.',
        missionTag: 'Nossa Missão Estratégica',
        mission: 'Desestabilizar a narrativa de déficit por meio de uma identidade visual dinâmica que projete a Négritude contemporânea para o mercado global.'
    };

    /* ─── INSIGHTS DATA ─── */
    var INSIGHTS_DATA = {
        tag: 'Insights & Processo',
        quote: '"A emoção é negra, como a razão é helênica." — Léopold Sédar Senghor',
        cards: [
            { icon: '🎶', title: 'Cultura como Motor', text: 'O Mbalax e a Teraanga não são folclore — são a base de uma identidade que impulsiona a modernização do país.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80' },
            { icon: '🚀', title: 'Tecnologia com Raízes', text: 'O GAINDESAT-1A e o New Deal Technologique nascem de um povo que valoriza o progresso sem esquecer suas origens.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
            { icon: '🌿', title: 'Sustentabilidade Cultural', text: 'O reflorestamento de manguezais reflete a mesma filosofia Teraanga: cuidar do coletivo para garantir o futuro.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
            { icon: '⚽', title: 'Esporte como Expressão', text: 'Da luta Laamb ao futebol, o esporte senegalês carrega misticismo e orgulho nacional em cada movimento.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80' },
            { icon: '🏛️', title: 'Identidade e Négritude', text: 'Léopold Sédar Senghor plantou as sementes da Négritude — um movimento que celebra a riqueza do ser africano e inspira gerações.', image: 'https://images.unsplash.com/photo-1582213713374-4b5f4be8d32f?w=600&q=80' }
        ]
    };

    /* ─── CREATIVE PROCESS DATA ─── */
    var PROCESS_STEPS = [
        { num: '01', title: 'Pesquisa', desc: 'Levantamento de dados demográficos, culturais, sociais, ambientais e tecnológicos' },
        { num: '02', title: 'Imersão Cultural', desc: 'Estudo aprofundado da cultura senegalesa, Teraanga e Négritude' },
        { num: '03', title: 'Design Thinking', desc: 'Aplicação da metodologia de Tim Brown para gerar soluções criativas centradas no ser humano' },
        { num: '04', title: 'Ideação', desc: 'Conexão de insights com a palavra-chave de Senghor para construir a narrativa' },
        { num: '05', title: 'Conceito', desc: 'Definição da campanha: subverter estereótipos mostrando a riqueza real' },
        { num: '06', title: 'Campanha', desc: 'Produção de peças visuais e apresentação baseadas no moodboard' }
    ];

    var CUSTOM_SECTIONS = [];

    /* ═══════════════════════════════════
       INIT
       ═══════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', function () {
        loadSavedData();
        renderAll();

        // APPLY ORDER NOW THAT ELEMENTS ARE IN DOM
        try {
            var so = localStorage.getItem('sn3_order');
            if (so) applySectionOrder(JSON.parse(so));
        } catch(e) {}

        initTabs();
        initPresentationControls();
        initBackToTop();
        initScrollHint();
        // Download section removed — the site IS the document

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
                    }
                } else {
                    if (ctrl) ctrl.classList.remove('visible');
                    if (side) { side.style.opacity = '0'; side.style.pointerEvents = 'none'; }
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }

                if (typeof AOS !== 'undefined') AOS.refresh();
            });
        });
    }



    /* ═══════════════════════════════════
       PERSISTENCE
       ═══════════════════════════════════ */
    function loadSavedData() {
        if (window.SenegalApp && window.SenegalApp.CloudSync) {
            if (!isAdmin) {
                // SITE PÚBLICO: escuta Firebase em tempo real (única fonte de verdade)
                window.SenegalApp.CloudSync.subscribe(function(cloudData) {
                    if (cloudData) {
                        syncLocalVariables(cloudData);
                        renderAll();
                    }
                });
            } else {
                // ADMIN: carrega do Firebase uma vez, depois usa localStorage como rascunho
                loadLocalDraft();
                window.SenegalApp.CloudSync.load().then(function(cloudData) {
                    if (cloudData) {
                        syncLocalVariables(cloudData);
                        renderAll();
                    }
                });
            }
        } else if (isAdmin) {
            // Fallback se Firebase não carregar
            loadLocalDraft();
        }
    }

    function loadLocalDraft() {
        try {
            var t = localStorage.getItem('sn3_topics'); if (t) TOPICS = JSON.parse(t);
            var m = localStorage.getItem('sn3_tiles'); if (m) MOODBOARD_TILES = JSON.parse(m);
            var gc = localStorage.getItem('sn3_gc'); if (gc) GOLDEN_CIRCLE = JSON.parse(gc);
            var pr = localStorage.getItem('sn3_prob'); if (pr) PROBLEM_DATA = JSON.parse(pr);
            var ins = localStorage.getItem('sn3_ins'); if (ins) INSIGHTS_DATA = JSON.parse(ins);
            var ps = localStorage.getItem('sn3_proc'); if (ps) PROCESS_STEPS = JSON.parse(ps);
            var cs = localStorage.getItem('sn3_custom'); if (cs) CUSTOM_SECTIONS = JSON.parse(cs);
        } catch (e) {}
    }

    function syncLocalVariables(cloudData) {
        if (!cloudData) return;
        if (cloudData.TOPICS) TOPICS = cloudData.TOPICS;
        // Firebase override desativado para forçar o uso do LoremFlickr (banco de dados dinâmico local)
        // if (cloudData.MOODBOARD_TILES) MOODBOARD_TILES = cloudData.MOODBOARD_TILES;
        if (cloudData.GOLDEN_CIRCLE) GOLDEN_CIRCLE = cloudData.GOLDEN_CIRCLE;
        if (cloudData.PROBLEM_DATA) PROBLEM_DATA = cloudData.PROBLEM_DATA;
        if (cloudData.INSIGHTS_DATA) INSIGHTS_DATA = cloudData.INSIGHTS_DATA;
        if (cloudData.PROCESS_STEPS) PROCESS_STEPS = cloudData.PROCESS_STEPS;
        if (cloudData.TEAM) DEFAULT_TEAM = cloudData.TEAM;
        if (cloudData.REFS) DEFAULT_REFS = cloudData.REFS;
        if (cloudData.CUSTOM_SECTIONS) CUSTOM_SECTIONS = cloudData.CUSTOM_SECTIONS;
        
        // Aplica a ordem das seções se vier do Cloud
        if (cloudData.SECTION_ORDER) {
            localStorage.setItem('sn3_order', JSON.stringify(cloudData.SECTION_ORDER));
            applySectionOrder(cloudData.SECTION_ORDER);
        }

        // Aplica hero title/subtitle do Cloud
        if (cloudData.HERO_TITLE) {
            var ht = document.getElementById('hero-title');
            if (ht) ht.innerText = cloudData.HERO_TITLE;
        }
        if (cloudData.HERO_SUBTITLE) {
            var hs = document.getElementById('hero-subtitle');
            if (hs) hs.innerText = cloudData.HERO_SUBTITLE;
        }
    }

    function renderAll() {
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
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        // Refresh slide segments and navigation after rendering
        if (typeof refreshSlideControls === 'function') {
            refreshSlideControls();
        }
    }
    function saveTopics() { localStorage.setItem('sn3_topics', JSON.stringify(TOPICS)); }
    function saveTiles() { localStorage.setItem('sn3_tiles', JSON.stringify(MOODBOARD_TILES)); }
    function saveGC() { localStorage.setItem('sn3_gc', JSON.stringify(GOLDEN_CIRCLE)); }
    function saveProb() { localStorage.setItem('sn3_prob', JSON.stringify(PROBLEM_DATA)); }
    function saveIns() { localStorage.setItem('sn3_ins', JSON.stringify(INSIGHTS_DATA)); }
    function saveProc() { localStorage.setItem('sn3_proc', JSON.stringify(PROCESS_STEPS)); }
    function saveCustom() { localStorage.setItem('sn3_custom', JSON.stringify(CUSTOM_SECTIONS)); }
    function saveOrder(order) { localStorage.setItem('sn3_order', JSON.stringify(order)); }

    function applySectionOrder(currentOrder) {
        var container = document.getElementById('panel-presentation');
        if (!container || !currentOrder || !currentOrder.length) return;
        
        var order = currentOrder.slice();
        if (order.indexOf('section-3d-models') === -1) {
            var mbIdx = order.indexOf('moodboard-section');
            if (mbIdx !== -1) order.splice(mbIdx + 1, 0, 'section-3d-models');
            else order.push('section-3d-models');
        }
        
        order.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) container.appendChild(el);
        });
    }

    function getRefs() { 
        var refsList = [];
        if (!isAdmin) {
            refsList = DEFAULT_REFS.slice();
        } else {
            try { 
                var r = localStorage.getItem('sn3_refs'); 
                refsList = r ? JSON.parse(r) : DEFAULT_REFS.slice(); 
            } catch (e) { 
                refsList = DEFAULT_REFS.slice(); 
            }
        }
        
        var forceRefs = [
            'SINEK, Simon. Start With Why: How Great Leaders Inspire Everyone to Take Action. Portfolio, 2009.',
            'BROWN, Tim. Design Thinking. Harvard Business Review, 2008.'
        ];
        
        forceRefs.forEach(function(reqRef) {
            var exists = refsList.some(function(r) { return r.toLowerCase().indexOf('brown, tim') !== -1 || r.toLowerCase().indexOf('sinek, simon') !== -1; });
            var exactlyExists = refsList.indexOf(reqRef) !== -1;
            
            // Simple check to ensure we don't duplicate if it exists slightly differently
            var missing = true;
            for(var i=0; i<refsList.length; i++) {
                if(reqRef.split('.')[0] === refsList[i].split('.')[0]) { missing = false; break; }
            }
            if (missing) {
                refsList.splice(1, 0, reqRef); // Insert near the top
            }
        });
        
        return refsList;
    }
    function saveRefs(refs) { localStorage.setItem('sn3_refs', JSON.stringify(refs)); }
    function getTeam() { if (!isAdmin) return DEFAULT_TEAM; try { var t = localStorage.getItem('sn3_team'); return t ? JSON.parse(t) : DEFAULT_TEAM.slice(); } catch (e) { return DEFAULT_TEAM.slice(); } }
    function saveTeam(team) { localStorage.setItem('sn3_team', JSON.stringify(team)); }

    /* ─── QR CODES DATA (3D Models) ─── */
    var QR_CODES_3D = [
        { title: 'Monumento Renascença Africana', desc: 'Escaneie para visualizar o modelo 3D do icônico monumento de 49m em Dakar — símbolo do despertar africano.', url: 'https://sketchfab.com/3d-models/african-renaissance-monument' },
        { title: 'Máscara Tradicional Senufo', desc: 'Explore em 3D a arte escultórica das máscaras cerimoniais senegalesas, utilizadas em rituais e danças.', url: 'https://sketchfab.com/3d-models/african-mask' },
        { title: 'Djembe — Tambor Africano', desc: 'Visualize o modelo 3D do Djembe, instrumento fundamental na música Mbalax e nas cerimônias tradicionais.', url: 'https://sketchfab.com/3d-models/djembe-drum' },
        { title: 'Mesquita de Touba', desc: 'Explore a arquitetura da Grande Mesquita de Touba — o coração espiritual do Mouridismo senegalês.', url: 'https://sketchfab.com/3d-models/mosque-touba' },
        { title: 'Baobá — Árvore da Vida', desc: 'Descubra em 3D o Baobá, árvore milenar sagrada que simboliza a resistência e sabedoria africana.', url: 'https://sketchfab.com/3d-models/baobab-tree' }
    ];

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

            container.appendChild(el);
        });

        // ─── TAGS & MOTIVADORES ───
        var tagsContainer = document.getElementById('moodboard-tags');
        if (tagsContainer) renderMoodboardTags(tagsContainer);

        // ─── QR CODES 3D ───
        var qrContainer = document.getElementById('moodboard-qrcodes');
        if (qrContainer) renderMoodboardQRCodes(qrContainer);

        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ─── MOODBOARD: TAGS & MOTIVADORES ─── */
    function renderMoodboardTags(container) {
        var tagsTitle = '<div class="moodboard-subsection-header" data-aos="fade-up">' +
            '<h3 class="moodboard-subsection-title">Tags & Motivadores</h3>' +
            '<p class="moodboard-subsection-desc">Os pilares criativos que guiam nossa narrativa sobre o Senegal</p>' +
            '</div>';

        var cardsHtml = '<div class="motivator-cards-grid">';
        INSIGHTS_DATA.cards.forEach(function(card, i) {
            cardsHtml +=
                '<div class="motivator-card" data-aos="fade-up" data-aos-delay="' + (i * 80) + '">' +
                    (card.image ? '<div class="motivator-card__image"><img src="' + card.image + '" alt="' + esc(card.title) + '" loading="lazy" /></div>' : '') +
                    '<div class="motivator-card__body">' +
                        '<div class="motivator-card__icon">' + card.icon + '</div>' +
                        '<h4 class="motivator-card__title">' + esc(card.title) + '</h4>' +
                        '<p class="motivator-card__text">' + esc(card.text) + '</p>' +
                    '</div>' +
                '</div>';
        });
        cardsHtml += '</div>';

        container.innerHTML = tagsTitle + cardsHtml;
    }

    /* ─── MOODBOARD: QR CODES 3D ─── */
    function renderMoodboardQRCodes(container) {
        var qrGrid = '<div class="qr-grid-moodboard">';
        QR_CODES_3D.forEach(function(qr, i) {
            var qrImgUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qr.url) + '&color=00853F';
            qrGrid +=
                '<div class="qr-card-3d" data-aos="zoom-in" data-aos-delay="' + (i * 100) + '">' +
                    '<div class="qr-card-3d__code">' +
                        '<img src="' + qrImgUrl + '" alt="QR ' + esc(qr.title) + '" loading="lazy" />' +
                    '</div>' +
                    '<div class="qr-card-3d__info">' +
                        '<div class="qr-card-3d__badge">🔮 Modelo 3D</div>' +
                        '<h4 class="qr-card-3d__title">' + esc(qr.title) + '</h4>' +
                        '<p class="qr-card-3d__desc">' + esc(qr.desc) + '</p>' +
                    '</div>' +
                '</div>';
        });
        qrGrid += '</div>';

        container.innerHTML = qrGrid;
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
                '<div class="team-pres-name" ' + (isAdmin ? 'contenteditable="true" data-member="' + i + '" data-field="name"' : '') + '>' + esc(m.name) + '</div>' +
                '<div class="team-pres-role" ' + (isAdmin ? 'contenteditable="true" data-member="' + i + '" data-field="role"' : '') + '>' + esc(m.role) + '</div>';
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
                '<div class="problem-card__tag" ' + (isAdmin ? 'contenteditable="true" data-prob="tag"' : '') + '>' + esc(PROBLEM_DATA.tag) + '</div>' +
                '<h2 class="problem-card__title" ' + (isAdmin ? 'contenteditable="true" data-prob="title"' : '') + '>' + esc(PROBLEM_DATA.title) + '</h2>' +
                '<p class="problem-card__text" ' + (isAdmin ? 'contenteditable="true" data-prob="text"' : '') + '>' + esc(PROBLEM_DATA.text) + '</p>' +
                '<div class="problem-mission">' +
                    '<div class="problem-mission__tag" ' + (isAdmin ? 'contenteditable="true" data-prob="missionTag"' : '') + '>' + esc(PROBLEM_DATA.missionTag) + '</div>' +
                    '<p class="problem-mission__text" ' + (isAdmin ? 'contenteditable="true" data-prob="mission"' : '') + '>' + esc(PROBLEM_DATA.mission) + '</p>' +
                '</div>' +
            '</div>';
    }

    /* ─── INSIGHTS ─── */
    function renderInsights() {
        var container = document.getElementById('insights-container');
        if (!container) return;

        var quoteHtml =
            '<div class="insights-quote" data-aos="fade-up">' +
                '<div class="insights-quote__text" ' + (isAdmin ? 'contenteditable="true" data-ins="quote" data-field="text"' : '') + '>' + esc(INSIGHTS_DATA.quote.text) + '</div>' +
                '<div class="insights-quote__author" ' + (isAdmin ? 'contenteditable="true" data-ins="quote" data-field="author"' : '') + '>— ' + esc(INSIGHTS_DATA.quote.author) + '</div>' +
            '</div>';

        var cardsHtml = '<div class="insights-grid">';
        INSIGHTS_DATA.cards.forEach(function (card, i) {
            cardsHtml +=
                '<div class="insight-card" data-aos="fade-up" data-aos-delay="' + (i * 100) + '">' +
                    '<div class="insight-card__icon" ' + (isAdmin ? 'contenteditable="true" data-ins-card="' + i + '" data-field="icon"' : '') + '>' + card.icon + '</div>' +
                    '<div class="insight-card__title" ' + (isAdmin ? 'contenteditable="true" data-ins-card="' + i + '" data-field="title"' : '') + '>' + esc(card.title) + '</div>' +
                    '<div class="insight-card__text" ' + (isAdmin ? 'contenteditable="true" data-ins-card="' + i + '" data-field="text"' : '') + '>' + esc(card.text) + '</div>' +
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
                    '<div class="process-step__number" ' + (isAdmin ? 'contenteditable="true" data-proc="' + i + '" data-field="num"' : '') + '>' + step.num + '</div>' +
                    (i < PROCESS_STEPS.length - 1 ? '<div class="process-step__connector"></div>' : '') +
                    '<div class="process-step__title" ' + (isAdmin ? 'contenteditable="true" data-proc="' + i + '" data-field="title"' : '') + '>' + esc(step.title) + '</div>' +
                    '<div class="process-step__desc" ' + (isAdmin ? 'contenteditable="true" data-proc="' + i + '" data-field="desc"' : '') + '>' + esc(step.desc) + '</div>' +
                '</div>';
        });
        html += '</div>';

        container.innerHTML = html;
    }

    /* ─── CUSTOM SECTIONS ─── */
    function renderCustomSections() {
        var container = document.getElementById('custom-sections');
        if (!container) return;
        container.innerHTML = '';
        CUSTOM_SECTIONS.forEach(function (sec, i) {
            var el = document.createElement('section');
            el.className = 'pres-section custom-section';
            el.id = 'custom-sec-' + i;
            el.innerHTML =
                '<div class="container">' +
                    '<div class="section-label">' +
                        '<span class="label-line"></span>' +
                        '<span class="label-text" ' + (isAdmin ? 'contenteditable="true" data-custom="' + i + '" data-field="label"' : '') + '>' + esc(sec.label) + '</span>' +
                        '<span class="label-line"></span>' +
                    '</div>' +
                    '<div class="text-center mb-4">' +
                        '<h2 class="pres-title" ' + (isAdmin ? 'contenteditable="true" data-custom="' + i + '" data-field="title"' : '') + '>' + esc(sec.title) + '</h2>' +
                    '</div>' +
                    '<div class="custom-content-box" style="max-width:800px;margin:0 auto;color:var(--text-secondary);line-height:1.8;font-size:1.1rem;text-align:center;" ' + (isAdmin ? 'contenteditable="true" data-custom="' + i + '" data-field="content"' : '') + '>' +
                        esc(sec.content) +
                    '</div>' +
                    (isAdmin ? '<div class="text-center mt-3"><button class="btn btn-sm btn-outline-danger" onclick="SenegalApp.removeCustom(' + i + ')">Remover Seção</button></div>' : '') +
                '</div>';
            container.appendChild(el);
        });
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
            section.className = 'topic-section pres-section';
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
        var prevSm = document.getElementById('prev-slide-sm');
        var nextSm = document.getElementById('next-slide-sm');

        // Initial population
        refreshSlideControls();

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
            var indicator = document.getElementById('slide-number');
            if (indicator) {
                var el = slideElements[closest];
                var tagText = '';
                if (el) {
                    var label = el.querySelector('.label-text');
                    var topicTag = el.querySelector('.topic-tag');
                    var ptTitle = el.querySelector('.pt-title');
                    
                    if (label) {
                        tagText = label.textContent;
                    } else if (topicTag) {
                        tagText = topicTag.textContent;
                    } else if (ptTitle) {
                        tagText = ptTitle.textContent;
                    } else if (el.id === 'section-hero') {
                        tagText = 'Capa';
                    } else if (el.id === 'team-section') {
                        tagText = 'Equipe';
                    }
                }
                var text = (closest + 1) + ' / ' + slideElements.length;
                if (tagText) {
                    text += ' <span style="opacity:0.6;font-size:0.85em;margin-left:8px;font-weight:400;">— ' + tagText + '</span>';
                    indicator.innerHTML = text;
                } else {
                    indicator.textContent = text;
                }
            }

            var show = window.scrollY > 200;
            if (ctrl) ctrl.classList.toggle('visible', show);

            // Sync dots
            document.querySelectorAll('.nav-dot').forEach(function (dot, idx) {
                dot.classList.toggle('active', idx === closest);
            });
            document.querySelectorAll('.pagination-dot').forEach(function (dot, idx) {
                dot.classList.toggle('active', idx === closest);
            });
        }, { passive: true });

        if (nextSm) {
            nextSm.addEventListener('click', function () {
                if (currentSlideIndex < slideElements.length - 1)
                    slideElements[currentSlideIndex + 1].scrollIntoView({ behavior: 'smooth' });
            });
        }

        if (prevSm) {
            prevSm.addEventListener('click', function () {
                if (currentSlideIndex > 0)
                    slideElements[currentSlideIndex - 1].scrollIntoView({ behavior: 'smooth' });
            });
        }

        document.addEventListener('keydown', function (e) {
            var activeBtn = document.querySelector('.tab-btn.active');
            if (!activeBtn || activeBtn.dataset.tab !== 'presentation') return;
            if (e.target.contentEditable === 'true' || e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (nextSm) nextSm.click(); }
            else if (e.key === 'ArrowLeft') { if (prevSm) prevSm.click(); }
        });
    }

    function refreshSlideControls() {
        var indicator = document.getElementById('slide-number');
        var pag = document.getElementById('slide-pagination');

        // Automatic discovery: Find all .pres-section elements and sort by their actual position
        // This includes Hero, Team, Topics A-F, Golden Circle, Problem, Moodboard, Insights, Process.
        slideElements = Array.from(document.querySelectorAll('.pres-section'))
            .filter(function(el) { 
                // Ignore empty containers (like topics-container)
                return el.id !== 'topics-container' && el.offsetHeight > 50; 
            })
            .sort(function(a, b) {
                return (a.offsetTop + a.offsetHeight/2) - (b.offsetTop + b.offsetHeight/2);
            });

        // Re-generate pagination dots
        if (pag) {
            pag.innerHTML = '';
            slideElements.forEach(function(el, i) {
                var dot = document.createElement('div');
                dot.className = 'pagination-dot';
                
                var tagText = '';
                if (el) {
                    var label = el.querySelector('.label-text');
                    var topicTag = el.querySelector('.topic-tag');
                    var ptTitle = el.querySelector('.pt-title');
                    
                    if (label) tagText = label.textContent;
                    else if (topicTag) tagText = topicTag.textContent;
                    else if (ptTitle) tagText = ptTitle.textContent;
                    else if (el.id === 'section-hero') tagText = 'Capa';
                    else if (el.id === 'team-section') tagText = 'Equipe';
                }
                
                if (tagText) {
                    dot.setAttribute('data-tooltip', tagText);
                } else {
                    dot.setAttribute('data-tooltip', 'Slide ' + (i + 1));
                }

                dot.addEventListener('click', function() {
                    slideElements[i].scrollIntoView({ behavior: 'smooth' });
                });
                pag.appendChild(dot);
            });
        }

        if (indicator) {
            indicator.textContent = (currentSlideIndex + 1) + ' / ' + slideElements.length;
        }

        // Also refresh side dots
        initSideNav();
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
            var target = document.getElementById('section-team');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ═══════════════════════════════════
       EDITABLE (Admin Only)
       ═══════════════════════════════════ */
    function initEditable() {
        ['hero-title', 'hero-subtitle'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('blur', function () {
                localStorage.setItem('sn3_' + id, el.innerText);
            });
            var saved = localStorage.getItem('sn3_' + id);
            if (saved) el.innerText = saved;
        });

        initSectionSorting();

        var fileInput = document.getElementById('admin-file-input') || createFileInput();
        var targetTopic = -1, targetTile = -1;

        // Utilizamos delegação de eventos no document.body para que novos elementos (gerados por renderAll) não percam os eventos
        document.body.addEventListener('input', function(e) {
            var el = e.target;
            if (el.contentEditable === 'true' || el.tagName === 'INPUT') {
                var field = el.dataset.field;
                
                // Topics Data
                if (el.hasAttribute('data-topic') && field) {
                    var idx = parseInt(el.dataset.topic);
                    if (!isNaN(idx) && TOPICS[idx]) {
                        TOPICS[idx][field] = (el.tagName === 'INPUT') ? el.value : el.innerText;
                        saveTopics();
                        if (field === 'qrLink') {
                            var qrImg = document.getElementById('qr-img-' + idx);
                            var url = el.value || (window.location.href.split('#')[0] + '#' + TOPICS[idx].id);
                            if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url) + '&color=00853F';
                        }
                    }
                }
                
                // Golden Circle Data (input on title, text, keyword)
                if (el.hasAttribute('data-gc') && field) {
                    var gcKey = el.dataset.gc;
                    if (GOLDEN_CIRCLE[gcKey]) {
                        GOLDEN_CIRCLE[gcKey][field] = el.innerText;
                        saveGC();
                    }
                }
                
                // Problem Data
                if (el.hasAttribute('data-prob')) {
                    var probField = el.dataset.prob;
                    if (PROBLEM_DATA[probField] !== undefined) {
                        PROBLEM_DATA[probField] = el.innerText;
                        saveProb();
                    } else if (probField === 'tag' || probField === 'title' || probField === 'text' || probField === 'missionTag' || probField === 'mission') {
                        PROBLEM_DATA[probField] = el.innerText;
                        saveProb();
                    }
                }

                // Insights Quote
                if (el.hasAttribute('data-ins') && field) {
                    INSIGHTS_DATA.quote[field] = el.innerText;
                    saveIns();
                }

                // Insights Cards
                if (el.hasAttribute('data-ins-card') && field) {
                    var insIdx = parseInt(el.dataset.insCard);
                    if (!isNaN(insIdx) && INSIGHTS_DATA.cards[insIdx]) {
                        INSIGHTS_DATA.cards[insIdx][field] = el.innerText;
                        saveIns();
                    }
                }

                // Creative Process
                if (el.hasAttribute('data-proc') && field) {
                    var procIdx = parseInt(el.dataset.proc);
                    if (!isNaN(procIdx) && PROCESS_STEPS[procIdx]) {
                        PROCESS_STEPS[procIdx][field] = el.innerText;
                        saveProc();
                    }
                }

                // Custom Sections
                if (el.hasAttribute('data-custom') && field) {
                    var cusIdx = parseInt(el.dataset.custom);
                    if (!isNaN(cusIdx) && CUSTOM_SECTIONS[cusIdx]) {
                        CUSTOM_SECTIONS[cusIdx][field] = el.innerText;
                        saveCustom();
                    }
                }
                
                // Team Members
                if (el.hasAttribute('data-member') && field) {
                    var memIdx = parseInt(el.dataset.member);
                    var team = getTeam();
                    if (!isNaN(memIdx) && team[memIdx]) {
                        team[memIdx][field] = el.innerText;
                        saveTeam(team);
                    }
                }

                // Topic Stats
                if (el.hasAttribute('data-topic') && el.hasAttribute('data-stat') && field) {
                    var tIdx = parseInt(el.dataset.topic);
                    var stIdx = parseInt(el.dataset.stat);
                    if (!isNaN(tIdx) && !isNaN(stIdx) && TOPICS[tIdx] && TOPICS[tIdx].stats[stIdx]) {
                        TOPICS[tIdx].stats[stIdx][field] = el.innerText;
                        saveTopics();
                    }
                }
            }
        });

        // Delegação de evento para os botões de edição de imagem
        document.body.addEventListener('click', function (e) {
            var btn = e.target.closest('.edit-image-btn');
            if (btn) {
                e.stopPropagation();
                targetTopic = btn.dataset.topic !== undefined ? parseInt(btn.dataset.topic) : -1;
                targetTile = btn.dataset.tile !== undefined ? parseInt(btn.dataset.tile) : -1;
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', function () {
            if (!fileInput.files || !fileInput.files[0]) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.onload = function() {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var MAX_WIDTH = 1000;
                    var MAX_HEIGHT = 1000;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    } else {
                        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    var dataUrl = canvas.toDataURL('image/jpeg', 0.85);

                    if (targetTopic !== -1) {
                        TOPICS[targetTopic].image = dataUrl;
                        var tImg = document.getElementById('img-topic-' + targetTopic);
                        if (tImg) tImg.src = dataUrl;
                        saveTopics();
                    } else if (targetTile !== -1) {
                        MOODBOARD_TILES[targetTile].src = dataUrl;
                        saveTiles();
                    }
                    fileInput.value = '';
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        });
    }

    function initSectionSorting() {
        if (!isAdmin || typeof Sortable === 'undefined') return;
        var container = document.getElementById('panel-presentation');
        if (!container) return;

        Sortable.create(container, {
            animation: 150,
            draggable: '.pres-section',
            onEnd: function() {
                var order = Array.from(container.children)
                    .filter(function(el) { return el.id; })
                    .map(function(el) { return el.id; });
                saveOrder(order);
                refreshSlideControls(); 
            }
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
        addTitle('3. METODOLOGIA — CÍRCULO DE OURO (SIMON SINEK) + DESIGN THINKING (TIM BROWN)');
        addText('Baseamos nossa abordagem no modelo do Círculo de Ouro proposto por Simon Sinek em "Start With Why" e na metodologia de Design Thinking de Tim Brown, que organiza a comunicação e a inovação centrada no ser humano:');
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
    function addCustom() { CUSTOM_SECTIONS.push({ label: 'Nova Seção', title: 'Título da Seção', content: 'Conteúdo da seção...' }); saveCustom(); renderCustomSections(); initEditable(); }
    function removeCustom(idx) { if (!confirm('Remover esta seção?')) return; CUSTOM_SECTIONS.splice(idx, 1); saveCustom(); renderCustomSections(); }
    function resetAll() { if (!confirm('Resetar TODOS os dados?')) return; localStorage.clear(); window.location.reload(); }

    /* ──── PUBLIC API ──── */
    window.SenegalApp = Object.assign(window.SenegalApp || {}, { removeTile: removeTile, addTile: addTile, removeRef: removeRef, addRef: addRef, removeMember: removeMember, addMember: addMember, addCustom: addCustom, removeCustom: removeCustom, resetAll: resetAll });

    window.SenegalApp.collectCurrentState = function() {
        var container = document.getElementById('panel-presentation');
        var order = [];
        if (container) {
            order = Array.from(container.children)
                .filter(function(el) { return el.id; })
                .map(function(el) { return el.id; });
        }

        // Captura hero title/subtitle do DOM
        var heroTitle = document.getElementById('hero-title');
        var heroSub = document.getElementById('hero-subtitle');

        return {
            TOPICS: TOPICS,
            MOODBOARD_TILES: MOODBOARD_TILES,
            GOLDEN_CIRCLE: GOLDEN_CIRCLE,
            PROBLEM_DATA: PROBLEM_DATA,
            INSIGHTS_DATA: INSIGHTS_DATA,
            PROCESS_STEPS: PROCESS_STEPS,
            TEAM: getTeam(),
            REFS: getRefs(),
            CUSTOM_SECTIONS: CUSTOM_SECTIONS,
            SECTION_ORDER: order,
            HERO_TITLE: heroTitle ? heroTitle.innerText : 'Senegal',
            HERO_SUBTITLE: heroSub ? heroSub.innerText : 'Projeto Acadêmico — Análise Multidisciplinar'
        };
    };

})();
