/* ================================
   STORAGE.JS — LocalStorage persistence
   ================================ */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    MOODBOARD: 'senegal_moodboard_cards',
    ACADEMIC: 'senegal_academic_data',
    MEMBERS: 'senegal_team_members',
    REFERENCES: 'senegal_references',
    SETTINGS: 'senegal_settings'
  };

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function load(key, defaultValue) {
    defaultValue = defaultValue === undefined ? null : defaultValue;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      console.warn('Storage load failed:', e);
      return defaultValue;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage remove failed:', e);
    }
  }

  function clearAll() {
    Object.values(STORAGE_KEYS).forEach(function (key) { remove(key); });
  }

  // Expose to global namespace
  window.SenegalApp = window.SenegalApp || {};
  window.SenegalApp.Storage = {
    KEYS: STORAGE_KEYS,
    save: save,
    load: load,
    remove: remove,
    clearAll: clearAll
  };
})();
