define(['../lib/vendor/mustache.min.js'], function (Mustache) {

    var savedTemplates = {};

    function getAbsolutePath() {
        return window.location.protocol + '//' + window.location.host + window.location.pathname;
    }

    function httpGet(path, onSuccess, onError) {
        var request = new XMLHttpRequest();
        var url = getAbsolutePath() + path;

        request.open('GET', url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                onSuccess(this.response);
            } else {
                onError('We reached our target server, but it returned an error');
            }
        };

        request.onerror = function () {
            onError('There was a connection error of some sort');
        };

        request.send();
    }

    function saveTemplate(path, template) {
        savedTemplates[path] = template;
    }

    function getSavedTemplate(key, data) {
        return toNode(savedTemplates[key], data);
    }

    function toNode(template, data) {
        var container = document.createElement('div');
        container.innerHTML = Mustache.render(template, data);
        return container.children[0];
    }

    function loadTemplate(path, data, callback) {

        if (savedTemplates.hasOwnProperty(path)) {
            callback(getSavedTemplate(path, data));

            return;
        }

        httpGet(path, function (template) {
            saveTemplate(path, template);
            callback(getSavedTemplate(path, data));
        });
    }
    return {
        load: loadTemplate
    };

});
