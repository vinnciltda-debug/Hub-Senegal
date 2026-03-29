/* ==========================================
   FIREBASE-SYNC.JS — Cloud Database Persistence
   ========================================== */

(function () {
    'use strict';

    // REPLACE THIS WITH YOUR FIREBASE CONFIG FROM CONSOLE
    const firebaseConfig = {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_PROJETO.firebaseapp.com",
        projectId: "SEU_PROJETO_ID",
        storageBucket: "SEU_PROJETO.appspot.com",
        messagingSenderId: "SEU_SENDER_ID",
        appId: "SEU_APP_ID"
    };

    // Global variables
    let db = null;
    let initialized = false;

    // Initialize Firebase
    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            initialized = true;
            console.log('🔥 Firebase initialized successfully.');
        } catch (e) {
            console.error('❌ Firebase init failed:', e);
        }
    }

    /**
     * Saves data to Firestore. 
     * Uses a single document 'global_state' in 'senegal_data' collection.
     */
    async function saveToCloud(data) {
        if (!initialized || !db) {
            console.warn('⚠️ Firebase not ready.');
            return false;
        }

        console.log('☁️ Saving to Firebase Firestore...');
        try {
            // No need to worry about SHA or tokens, Firebase handles auth & write
            await db.collection('senegal_data').doc('global_state').set(data);
            console.log('✅ Firebase Cloud Sync success!');
            return true;
        } catch (err) {
            console.error('❌ Firebase save failed:', err);
            return false;
        }
    }

    /**
     * Loads data from Firestore.
     */
    async function loadFromCloud() {
        if (!initialized || !db) return null;

        try {
            const doc = await db.collection('senegal_data').doc('global_state').get();
            if (doc.exists) {
                console.log('📥 Data loaded from Firebase successfully.');
                return doc.data();
            }
        } catch (err) {
            console.warn('⚠️ Could not load from Firebase:', err);
        }
        return null;
    }

    // Expose to global namespace
    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.CloudSync = {
        save: saveToCloud,
        load: loadFromCloud,
        isReady: initialized
    };

})();
