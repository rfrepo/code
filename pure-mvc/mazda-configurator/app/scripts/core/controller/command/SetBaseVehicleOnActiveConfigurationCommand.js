define(['model/proxy/ActiveConfigurationProxy'], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0];


    return puremvc.define({
            name: 'bmc.controller.command.SetBaseVehicleOnActiveConfigurationCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {
                var baseVehicle = note.getBody();
                this.getActiveConfigurationProxy().setBaseVehicleVO(baseVehicle);
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(ActiveConfigurationProxy.NAME);
            }
        }
    );
});
