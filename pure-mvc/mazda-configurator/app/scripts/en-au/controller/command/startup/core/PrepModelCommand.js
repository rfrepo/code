define([
    '../../../../../core/controller/command/startup/core/PrepModelCommand',
    'model/proxy/data/DisclaimerProxy',
    'model/proxy/PriceDisplayProxy'
], function () {
    'use strict';
    var PrepModelCommand = arguments[0],
        DisclaimerProxy = arguments[1],
        PriceDisplayProxy = arguments[2];

    return puremvc.define({
            name: 'bmc.controller.command.startup.core.PrepModelCommand',
            parent: PrepModelCommand
        },
        {
            execute: function () {
                var parent = PrepModelCommand.prototype;

                parent.execute.call(this);
                this.facade.registerProxy(new DisclaimerProxy());
                this.facade.registerProxy(new PriceDisplayProxy());
            }
        }
    );
});