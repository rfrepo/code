define([
    'support/services/LoadDataService',
    'support/ModelFilePathCalculator',
    'support/NotificationNames'
], function () {
    'use strict';
    var LoadDataService = arguments[0],
        ModelFilePathCalculator = arguments[1],
        NotificationNames = arguments[2];

    return puremvc.define({
            name: 'bmc.controller.command.startup.LoadCurrentModelDataCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {
                var path = new ModelFilePathCalculator(note.getBody()),
                    loader = new LoadDataService(path.getPath()),
                    self = this;

                function callback(rawData) {
                    self.handleComplete(rawData);
                }

                loader.setOnCompleteHandler(callback);
                loader.load();
            },

            handleComplete: function (rawData) {
                this.sendNotification(NotificationNames.MODEL_DATA_LOADED, rawData);
            }
        }
    );
});
