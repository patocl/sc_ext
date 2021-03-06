/// <reference path='../../_all.ts'/>

namespace SitecoreExtensions.Modules.DatabaseName {
    export class DatabaseNameModule extends ModuleBase implements ISitecoreExtensionsModule {
        constructor(name: string, description: string, rawOptions: Options.ModuleOptionsBase) {
            super(name, description, rawOptions);
        }

        canExecute(): boolean {
            return this.options.enabled && Context.Database() != null && document.querySelector('.sc-globalHeader-loginInfo') != null;
        }

        initialize(): void {
            var dbName = Context.Database();
            if (dbName != null) {
                this.adDbNameToHeader(dbName.toUpperCase());
            }
        }

        adDbNameToHeader(dbName: string): void {
            var dbnameDiv = HTMLHelpers.createElement<HTMLDivElement>('div', { class: 'sc-ext-dbName' });
            dbnameDiv.innerText = dbName;

            let destination = document.querySelector('.sc-globalHeader');
            destination.insertBefore(dbnameDiv, destination.firstChild);
        }
    }
}
