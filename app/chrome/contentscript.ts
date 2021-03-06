/// <reference path='../../typings/chrome/chrome.d.ts'/>
/// <reference path='../../typings/es6-shim/es6-shim.d.ts'/>
/// <reference path='../options/providers/OptionsProvider.ts'/>


'use strict';
window.addEventListener('message', function (event) {
    if (event.data.sc_ext_enabled) {
        if (event.data.sc_ext_seticon_request) {
            chrome.runtime.sendMessage({
                newIconPath: 'chrome/images/icon-128.png',
                modulesCount: event.data.sc_ext_badgetext
            });
        }

        if (event.data.sc_ext_options_request) {
            if (chrome.storage) {
                var provider = new SitecoreExtensions.Options.OptionsProvider();
                provider.getOptions((optionsWrapper) => {
                    window.postMessage({
                        sc_ext_enabled: true,
                        sc_ext_options_response: true,
                        payload: optionsWrapper,
                    }, '*');
                });
            } else {
                window.postMessage({
                    sc_ext_enabled: true,
                    sc_ext_options_response: true,
                    payload: null,
                }, '*');
            }
        }
    }
});

function createScriptElement(src: string): HTMLScriptElement {
    var script = <HTMLScriptElement> document.createElement("script");
    script.src = chrome.extension.getURL(src);
    return script;
}

function injectScripts(scripts: HTMLScriptElement[]) {
    if (scripts.length > 0) {
        var otherScripts = scripts.slice(1);
        var script = scripts[0];
        var onload = function () {
            script.parentNode.removeChild(script);
            injectScripts(otherScripts);
        };
        if (script.src != "") {
            script.onload = onload;
            document.head.appendChild(script);
        } else {
            document.head.appendChild(script);
            onload();
        }
    }
}

injectScripts([
    createScriptElement("/common/optionsProvider.js"),
    createScriptElement("/sc_ext/Application.js"),
]);