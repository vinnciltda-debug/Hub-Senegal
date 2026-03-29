/* ==========================================
   FIREBASE-SYNC.JS — Cloud Database Persistence
   ========================================== */

(function () {
    'use strict';

    // ✅ CONFIGURAÇÃO OFICIAL DO SEU PROJETO SENEGAL-SITE
    const firebaseConfig = {
        apiKey: "AIzaSyBG6TqIgXHciC_cNWLeN-c9n2uvVouAMP0",
        authDomain: "senegal-site.firebaseapp.com",
        projectId: "senegal-site",
        storageBucket: "senegal-site.firebasestorage.app",
        messagingSenderId: "1029611933937",
        appId: "1:1029611933937:web:3e3cc1e0ea4ae56e321950",
        measurementId: "G-VE7NV82HHR"
    };

    // Global variables
    let db = null;
    let initialized = false;

    // Initialize Firebase (Compat mode para rodar direto sem servidor de build)
    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            initialized = true;
            console.log('🔥 Firebase Senegal-Site inicializado com sucesso.');
        } catch (e) {
            console.error('❌ Erro ao inicializar o Firebase:', e);
        }
    }

    /**
     * Salva os dados no Firestore (Modo Admin).
     */
    async function saveToCloud(data) {
        if (!initialized || !db) {
            console.warn('⚠️ Firebase não está pronto para salvar.');
            return false;
        }

        console.log('☁️ Sincronizando com Firebase Cloud...');
        try {
            await db.collection('senegal_data').doc('global_state').set(data);
            console.log('✅ Sincronização definitiva concluída!');
            return true;
        } catch (err) {
            console.error('❌ Falha ao salvar no Firestore:', err);
            return false;
        }
    }

    /**
     * Carrega os dados reais do Firestore para os visitantes.
     */
    async function loadFromCloud() {
        if (!initialized || !db) return null;

        try {
            const doc = await db.collection('senegal_data').doc('global_state').get();
            if (doc.exists) {
                console.log('📥 Dados da nuvem carregados com sucesso.');
                return doc.data();
            }
        } catch (err) {
            console.warn('⚠️ Não foi possível carregar os dados da nuvem:', err);
        }
        return null;
    }

    // Expor para o namespace global do SenegalApp
    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.CloudSync = {
        save: saveToCloud,
        load: loadFromCloud,
        isReady: initialized
    };

})();
