define(['support/services/LoadDataService'], function () {
    'use strict';
    var LoadDataService = arguments[0];

    puremvc.define({
            name: 'bmc.controller.command.LoadGlobalConfigCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                var path = require.toUrl('resources/data/globalConfig.json'),
                    loader = new LoadDataService(path);

                loader.setOnCompleteHandler = this.handleComplete;
                loader.load();
            },
            handleComplete: function (configData) {
                //call global config setters with individual parts of configData
                this.sendNotification(bmc.support.NotificationNames.GLOBAL_CONFIG_LOADED, configData);
            }
        }
    );
});
