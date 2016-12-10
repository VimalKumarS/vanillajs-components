/*global eventHelper */

(function (navigation, logView, terminal, events) {

    var printTargets = [];

    loadLeftMenu();
    loadMainView();
    loadLogView();

    function loadLeftMenu() {
        var data = [
            'You',
            'might',
            '(not)',
            'need',
            'a',
            'JavaScript',
            'framework'
        ];

        navigation.render(data, function (el) {
            events.on('click', el.querySelectorAll('li'), [print, loadMainView]);
            document.querySelector('#left-menu').appendChild(el);
        });
    }

    function loadMainView(e) {
        var container = document.querySelector('#main');
        var data = 'vanilla components';

        if (e) {
            container.removeChild(container.firstChild);
            data = e.target.textContent;
        }

        terminal.render(data, function (el) {
            container.appendChild(el);
        });
    }

    function loadLogView() {
        var data = 'events:';

        logView.render(data, function (el) {
            printTargets.push(el.querySelector('.cursor'));
            document.querySelector('#vanilla-terminal').appendChild(el);
        });
    }

    function print(e) {
        var message = e.type + ' : ' + e.target.nodeName + ' : ' + e.target.innerHTML;

        printTargets.forEach(function (element) {
            element.innerHTML += '<br/>' + message;
        });
    }

}(vanilla.nav, vanilla.logView, vanilla.terminal, eventHelper));
