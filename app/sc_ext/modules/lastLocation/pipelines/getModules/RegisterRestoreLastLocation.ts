/// <reference path='../../_all.ts'/>

namespace SitecoreExtensions.Modules.LastLocation.Pipelines.GetModules {
    export class RegisterRestoreLastLocation extends GetModulesProcessor {
        run(args: GetModulesArgs) {
            var lastLocation = new Modules.LastLocation.RestoreLastLocation("Restore Last Location", "Restores last opened item in Content Editor");
            args.addModule(lastLocation);

            this.onProcessed();
        }
    }
}

