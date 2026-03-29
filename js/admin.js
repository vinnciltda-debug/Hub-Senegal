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
        var addRefBtn = document.getElementById('add-ref-btn');
        var addMemberBtn = document.getElementById('add-member-btn');
        var addSectionBtn = document.getElementById('add-section-btn');
        var syncBtn = document.getElementById('sync-cloud-btn');
        var resetBtn = document.getElementById('reset-data-btn');

        if (syncBtn) syncBtn.addEventListener('click', function () {
            if (window.SenegalApp && window.SenegalApp.GitSync) {
                syncBtn.innerHTML = '<i data-lucide="refresh-cw" class="spin" style="width:14px;height:14px;"></i> Publicando...';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                
                // Collect current state from app.js (updated TOPICS etc)
                const data = window.SenegalApp.collectCurrentState();
                
                window.SenegalApp.GitSync.save(data).then(ok => {
                    if (ok) {
                        syncBtn.innerHTML = '<i data-lucide="check" style="width:14px;height:14px;"></i> Publicado!';
                    } else {
                        syncBtn.innerHTML = '<i data-lucide="alert-circle" style="width:14px;height:14px;"></i> Erro ao Publicar';
                        syncBtn.classList.remove('btn-success');
                        syncBtn.classList.add('btn-danger');
                    }
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    setTimeout(() => {
                        syncBtn.innerHTML = '<i data-lucide="cloud-upload" style="width:14px;height:14px;"></i> Publicar Alterações';
                        syncBtn.classList.remove('btn-danger');
                        syncBtn.classList.add('btn-success');
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 3000);
                });
            }
        });

        if (addTileBtn) addTileBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addTile();
        });

        if (addRefBtn) addRefBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addRef();
        });

        if (addMemberBtn) addMemberBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addMember();
        });

        if (addSectionBtn) addSectionBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.addCustom();
        });

        if (resetBtn) resetBtn.addEventListener('click', function () {
            if (window.SenegalApp) window.SenegalApp.resetAll();
        });
    }

})();
