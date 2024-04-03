define([
    'model/proxy/ActiveConfigurationProxy'
], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.command.UndoConfigurationChangeCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                this.facade.retrieveProxy(
                    ActiveConfigurationProxy.NAME).restoreToPreviousConfiguration();

                burrows.app.tracking.trackUpsellReject();
            }
        }
    );
});
