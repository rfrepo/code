define([
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/PriceCalculationProxy'
], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0],
        PriceCalculationProxy = arguments[1];


    return puremvc.define({
            name: 'bmc.controller.command.RequestPriceUpdateCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                var activeConfigurationVO = this.getProxy(ActiveConfigurationProxy.NAME),
                    priceCalculationProxy = this.getProxy(PriceCalculationProxy.NAME);

                this.sendNotification(bmc.support.NotificationNames.PRICE_UPDATED,
                    priceCalculationProxy.calculate(activeConfigurationVO.getSimplified()));
            },

            getProxy: function (type) {
                return this.getFacade().retrieveProxy(type);
            }
        }
    );
});