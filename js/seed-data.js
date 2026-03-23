/* ================================
   SEED-DATA.JS — Pre-processed data for Senegal project
   ================================ */

(function () {
    'use strict';

    const SEED_CARDS = [
        {
            category: 'demographics',
            title: 'a. Dados Demográficos',
            text: 'A idade mediana no Senegal é de 19,8 anos em 2026. Aproximadamente 53% da população será urbana em 2026, com Dacar sendo a maior cidade. A densidade populacional é de 101 pessoas por km². A taxa de fertilidade total (TFT) é de 3,7 nascimentos por mulher, e a esperança de vida é de 69,4 anos.',
            image: 'assets/senegal_demographics_1774208781562.png',
            source: 'IA Analysis — Demographics',
            order: 0
        },
        {
            category: 'population',
            title: 'b. Tamanho da População',
            text: 'A população de Senegal é estimada em aproximadamente 19,30 milhões até o final de 2026, representando cerca de 0,23% da população mundial total (68ª posição global). O crescimento continua robusto com projeções indicando 19,50 milhões em 2027.',
            image: 'assets/senegal_population_crowd_1774208799106.png',
            source: 'IA Analysis — Population',
            order: 1
        },
        {
            category: 'culture',
            title: 'c. Aspectos Culturais',
            text: 'Rica tradição oral através de "Griots". O "Mbalax" é o gênero musical dominante (vibrante e dançante). Gastronomia famosa pelo "Thieboudienne" e pela hospitalidade "Teranga". O país possui uma forte cena literária em língua francesa e artes visuais vibrantes.',
            image: 'assets/senegal_culture_mbalax_1774208814214.png',
            source: 'IA Analysis — Culture',
            order: 2
        },
        {
            category: 'social',
            title: 'd. Aspectos Sociais',
            text: 'Sociedade multicultural com predominância dos Wolof, Fula e Serer. A "Teranga" não é apenas hospitalidade, mas um código social de harmonia. A democracia senegalesa é uma das mais estáveis da África, com transições pacíficas, embora persista o desafio em infraestrutura e serviços básicos.',
            image: 'assets/senegal_social_teranga_1774208829208.png',
            source: 'IA Analysis — Social',
            order: 3
        },
        {
            category: 'technology',
            title: 'e. Aspectos Tecnológicos',
            text: 'Senegal lançou seu primeiro satélite, o GAINDESAT-1A, em 2024 para gestão ambiental. A estratégia "Novo Acordo de Tecnologia" visa digitalizar 90% dos serviços públicos até 2034, buscando transformar o país em um hub digital na África Ocidental (10-15% do PIB).',
            image: 'assets/senegal_technology_satellite_1774208879529.png',
            source: 'IA Analysis — Technology',
            order: 4
        },
        {
            category: 'environment',
            title: 'f. Aspectos Ambientais',
            text: 'Clima tropical com ecossistemas diversos. Destaca-se a maior restauração de manguezais da África no Delta do Saloum (200 milhões de mudas). Desafios incluem o desmatamento pela monocultura e impactos da extração de petróleo e gás em áreas costeiras.',
            image: 'assets/senegal_environment_mangroves_1774208904701.png',
            source: 'IA Analysis — Environment',
            order: 5
        }
    ];

    function seedMoodboard() {
        const Storage = window.SenegalApp.Storage;
        let existingCards = Storage.load(Storage.KEYS.MOODBOARD, []);

        if (existingCards.length === 0) {
            console.log('🌱 Seeding moodboard with IA-analyzed data...');
            const cardsToSave = SEED_CARDS.map(card => ({
                id: 'seed-' + card.category,
                title: card.title,
                text: card.text,
                image: card.image,
                source: card.source,
                page: null,
                order: card.order
            }));

            Storage.save(Storage.KEYS.MOODBOARD, cardsToSave);
            
            // Populate Academic Data as well if empty
            let existingAcademic = Storage.load(Storage.KEYS.ACADEMIC, null);
            if (!existingAcademic) {
                const academicData = {
                    title: 'Senegal: Uma Análise Multidisciplinar',
                    authors: 'IA Antigravity — Senegal Synthesis',
                    sections: SEED_CARDS.map(card => ({
                        title: card.title,
                        content: card.text
                    })),
                    images: SEED_CARDS.map(card => ({
                        dataUrl: card.image,
                        page: 0,
                        source: card.source
                    }))
                };
                Storage.save(Storage.KEYS.ACADEMIC, academicData);
            }

            if (window.location.protocol !== 'file:') {
                 // In a real environment we might reload, but here we just notify
            }
        }
    }

    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.Seed = {
        seed: seedMoodboard,
        data: SEED_CARDS
    };

})();
