define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.controller.command.LoadSavedConfigurationCommand',
            parent: puremvc.SimpleCommand,

            constructor: function () {
                this.globalScope = window;
            }
        },
        {
            execute: function (note) {
                var simpleConfig = note.getBody(),
                    baseUrl = urlExtractor.getResourcesUrl(),
                    locationString = './?' +
                        'locale=' + simpleConfig.getLocale() + '&' +
                        'vehicle=' + simpleConfig.getVehicleId() + '&' +
                        'savedConfigId=' + simpleConfig.getId();

                if (baseUrl !== './') {
                    locationString = locationString + '&baseUrl=' + baseUrl;
                }


                this.globalScope.location.href = locationString;

            }
        }
    );
});