/* ================================
   ADMIN.JS — Auth & Admin Controls
   ================================ */

(function () {
    'use strict';

    var PASS = 'senegal2026';

    document.addEventListener('DOMContentLoaded', function () {
        initAuth();
        initControls();

        // Lucide icons for admin header
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });

    function initAuth() {
        var input = document.getElementById('admin-pass');
        var btn = document.getElementById('auth-btn');
        var error = document.getElementById('auth-error');

        // Check session
        if (sessionStorage.getItem('sn_admin') === '1') {
            unlock();
        }

        if (btn) btn.addEventListener('click', check);
        if (input) input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') check();
        });

        function check() {
            if (input.value === PASS) {
                unlock();
            } else {
                error.style.display = 'block';
                input.value = '';
                input.focus();
            }
        }
    }

    function unlock() {
        document.body.classList.remove('locked');
        document.body.classList.add('unlocked');
        sessionStorage.setItem('sn_admin', '1');
    }

    function initControls() {
        var addTileBtn = document.getElementById('add-tile-btn');
        var addSectionBtn = document.getElementById('add-section-btn');
        var addRefBtn = document.getElementById('add-ref-btn');
        var addMemberBtn = document.getElementById('add-member-btn');
        var resetBtn = document.getElementById('reset-data-btn');

        if (addTileBtn) addTileBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addTile();
        });

        if (addSectionBtn) addSectionBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addCustomSection();
        });

        if (addRefBtn) addRefBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addRef();
        });

        if (addMemberBtn) addMemberBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addMember();
        });

        if (resetBtn) resetBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.resetAll();
        });
    }

})();
