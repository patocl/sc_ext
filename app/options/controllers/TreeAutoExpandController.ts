/// <reference path='../_all.ts' />

module SitecoreExtensions.Options {
    'use strict';
    export class TreeAutoExpandController extends BaseOptionsController {
        constructor($scope: any, formlyVersion: string) {
            super($scope, formlyVersion, 'Tree Auto Expand');
            $scope.vm.title = 'Tree Auto Expand module';
        }

        getFields() {
            return [
                {
                    key: 'enabled',
                    type: 'checkbox',
                    defaultValue: true,
                    templateOptions: {
                        label: 'Enabled'
                    }
                },
            ];
        }
    }
}    