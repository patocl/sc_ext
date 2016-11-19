/// <reference path='../../../../typings/chrome/chrome.d.ts'/>
/// <reference path='../../../options/providers/OptionsProvider.ts'/>
/// <reference path='../../../options/models/LinkItem.ts'/>


'use strict';

document.getElementById('go-to-options').addEventListener('click', function () {
    window.open(chrome.runtime.getURL('options/options.html'));
});
document.getElementById('version').textContent = "v." + chrome.runtime.getManifest().version;

import LinkItem = SitecoreExtensions.Options.LinkItem;

class LinkItemViewModel extends LinkItem {
    constructor(linkItem: LinkItem) {
        super(linkItem.name, linkItem.url, linkItem.mode, linkItem.order);
    }

    public renderElement(): HTMLLIElement {
        let elLi = document.createElement("li") as HTMLLIElement;

        let elIcon = document.createElement('i') as HTMLPhraseElement;
        elIcon.innerHTML = '&#xe800;';
        elIcon.setAttribute("class", "fa icon-link");

        let elLinkName = document.createElement("span") as HTMLSpanElement;
        elLinkName.textContent = this.name;

        let elAnchor = document.createElement("a") as HTMLAnchorElement;
        elAnchor.setAttribute("href", "#");
        elAnchor.appendChild(elIcon);
        elAnchor.appendChild(elLinkName);

        elLi.appendChild(elAnchor);

        let connector = this.url.startsWith('/') ? "" : '/';
        let href = connector + this.url;
        let mode = this.mode;
        elLi.onclick = () => {
            chrome.tabs.getSelected(null, function (tab) {
                var tablink = tab.url;
                var origin = tablink.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
                if (mode == 'newtab') {
                    chrome.tabs.create({ url: origin + href });
                } else {
                    chrome.tabs.update(tab.id, { url: origin + href });
                }
            });
        };
        return elLi;
    }
}


new SitecoreExtensions.Options.OptionsProvider().getModuleOptions("Links", (options: SitecoreExtensions.Options.IModuleOptions) => {
    let links = options.model as Array<LinkItem>;
    links = links.sort((a: LinkItem, b: LinkItem) => a.order - b.order);

    let linkListNode = document.getElementById('links');
    for (let index = 0; index < links.length; index++) {
        let viewModel = new LinkItemViewModel(links[index]);
        let linkElement = viewModel.renderElement();
        linkListNode.appendChild(linkElement);
    }
});