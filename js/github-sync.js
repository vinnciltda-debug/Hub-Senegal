/* ==========================================
   GITHUB-SYNC.JS — Cloud Persistence Logic
   ========================================== */

(function () {
    'use strict';

    var CONFIG = {
        owner: 'vinnciltda-debug',
        repo: 'Hub-Senegal',
        path: 'data.json'
    };

    // Token is entered by admin at runtime, never stored in code
    var _token = null;

    function setToken(token) {
        _token = token;
    }

    /**
     * Saves application data to GitHub repository (admin only)
     * @param {Object} data - The full state object to save
     */
    async function saveToCloud(data) {
        if (!_token) {
            // Prompt for token if not set
            _token = prompt('Digite o token GitHub para publicar:');
            if (!_token) return false;
        }

        console.log('☁️ Saving to GitHub...');
        var url = 'https://api.github.com/repos/' + CONFIG.owner + '/' + CONFIG.repo + '/contents/' + CONFIG.path;
        var headers = {
            'Authorization': 'token ' + _token,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        try {
            // 1. Get current file (needed for SHA)
            var sha = null;
            var getResponse = await fetch(url, { headers: headers });
            if (getResponse.ok) {
                var fileData = await getResponse.json();
                sha = fileData.sha;
            }

            // 2. Prepare content
            var content = b64EncodeUnicode(JSON.stringify(data, null, 2));

            var body = {
                message: 'Update data.json via Admin Panel [' + new Date().toLocaleString() + ']',
                content: content
            };
            if (sha) body.sha = sha;

            // 3. Push to GitHub
            var putResponse = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!putResponse.ok) {
                var error = await putResponse.json();
                throw new Error(error.message || 'Error saving to GitHub');
            }

            console.log('✅ Data synced to GitHub successfully!');
            return true;
        } catch (err) {
            console.error('❌ Cloud sync failed:', err);
            alert('Erro ao publicar: ' + err.message);
            return false;
        }
    }

    /**
     * Loads data from GitHub (public raw URL, no token needed)
     */
    async function loadFromCloud() {
        // Use raw URL with cache buster — no authentication needed
        var rawUrl = 'https://raw.githubusercontent.com/' + CONFIG.owner + '/' + CONFIG.repo + '/main/' + CONFIG.path + '?t=' + Date.now();

        try {
            var response = await fetch(rawUrl);
            if (response.ok) {
                var data = await response.json();
                console.log('📥 Data loaded from GitHub successfully.');
                return data;
            }
        } catch (err) {
            console.warn('⚠️ Could not load data from GitHub, falling back to local.', err);
        }
        return null;
    }

    // Unicode-safe Base64 encoding
    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    // Expose to global namespace
    window.SenegalApp = window.SenegalApp || {};
    window.SenegalApp.GitSync = {
        save: saveToCloud,
        load: loadFromCloud,
        setToken: setToken
    };

})();
