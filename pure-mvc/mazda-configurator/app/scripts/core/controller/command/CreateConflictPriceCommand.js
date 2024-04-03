define([
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/PriceCalculationProxy'
], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0],
        PriceCalculationProxy = arguments[1];


    return puremvc.define({
            name: 'bmc.controller.command.CreateConflictPriceCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var priceConflictVO = note.getBody()[0],
                    activeConfigurationVO = this.getActiveConfigurationVO(),
                    priceCalculationProxy = this.getProxy(PriceCalculationProxy.NAME),
                    currentPrice = priceCalculationProxy.calculate(activeConfigurationVO),
                    previousPrice = priceCalculationProxy.calculate(activeConfigurationVO.previousConfigurationVO);

                priceConflictVO.setCurrentValue(currentPrice);
                priceConflictVO.setPreviousValue(previousPrice);
            },

            getProxy: function (proxyName) {
                return this.facade.retrieveProxy(proxyName);
            },

            getActiveConfigurationVO: function () {
                return this.getProxy(ActiveConfigurationProxy.NAME).getSimplified();
            }
        }
    );
});