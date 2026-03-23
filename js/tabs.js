/* ================================
   TABS.JS — Tab Navigation
   ================================ */

(function () {
    'use strict';

    var currentTab = 'moodboard';
    var tabCallbacks = {};

    function initTabs() {
        var buttons = document.querySelectorAll('.tab-btn');
        var indicator = document.getElementById('tab-indicator');

        var hash = window.location.hash.replace('#', '');
        if (['moodboard', 'academic', 'credits'].indexOf(hash) !== -1) {
            switchTab(hash);
        } else {
            updateIndicator(indicator, document.querySelector('.tab-btn.active'));
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                switchTab(btn.dataset.tab);
            });
        });

        window.addEventListener('hashchange', function () {
            var tab = window.location.hash.replace('#', '');
            if (['moodboard', 'academic', 'credits'].indexOf(tab) !== -1) {
                switchTab(tab);
            }
        });

        window.addEventListener('resize', function () {
            var activeBtn = document.querySelector('.tab-btn.active');
            updateIndicator(document.getElementById('tab-indicator'), activeBtn);
        });
    }

    function switchTab(tabName) {
        currentTab = tabName;

        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        document.querySelectorAll('.tab-panel').forEach(function (panel) {
            panel.classList.toggle('active', panel.id === 'panel-' + tabName);
        });

        var activeBtn = document.querySelector('.tab-btn[data-tab="' + tabName + '"]');
        updateIndicator(document.getElementById('tab-indicator'), activeBtn);

        window.location.hash = tabName;

        if (tabCallbacks[tabName]) {
            tabCallbacks[tabName].forEach(function (cb) { cb(); });
        }
    }

    function updateIndicator(indicator, button) {
        if (!indicator || !button) return;
        var rect = button.getBoundingClientRect();
        var navRect = button.closest('.tab-bar').getBoundingClientRect();
        indicator.style.left = (rect.left - navRect.left) + 'px';
        indicator.style.width = rect.width + 'px';
    }

    function onTabActive(tabName, callback) {
        if (!tabCallbacks[tabName]) tabCallbacks[tabName] = [];
        tabCallbacks[tabName].push(callback);
    }

    function getCurrentTab() {
        return currentTab;
    }

    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.Tabs = {
        init: initTabs,
        switchTab: switchTab,
        onTabActive: onTabActive,
        getCurrentTab: getCurrentTab
    };
})();
