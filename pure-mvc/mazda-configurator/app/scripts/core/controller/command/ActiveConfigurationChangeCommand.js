define([
    'model/proxy/ConfigurationConflictProxy',
    'model/proxy/data/ConfigurableItemProxy',
    'model/proxy/NavigationProxy',
    'model/proxy/PriceCalculationProxy',
    'support/NotificationNames'
], function () {
    'use strict';
    var ConfigurationConflictProxy = arguments[0],
        NavigationProxy = arguments[2],
        PriceCalculationProxy = arguments[3],
        NotificationNames = arguments[4];


    return puremvc.define({
            name: 'bmc.controller.command.ActiveConfigurationChangeCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var activeConfigurationVO = note.getBody(),
                    priceCalculationProxy = this.getProxy(PriceCalculationProxy.NAME),
                    navigationProxy = this.getProxy(NavigationProxy.NAME),
                    configurationConflictProxy = this.getProxy(ConfigurationConflictProxy.NAME);

                this.checkWheelColourTrimVOsOnActiveConfigurationHaveAPrice(activeConfigurationVO);

                configurationConflictProxy.checkForConflicts(activeConfigurationVO,
                    navigationProxy.getActiveSectionVO());

                this.sendNotification(NotificationNames.PRICE_UPDATED,
                    priceCalculationProxy.calculate(activeConfigurationVO));
            },

            checkWheelColourTrimVOsOnActiveConfigurationHaveAPrice: function (activeConfigurationVO) {

                var configurableItemVO,
                    configurableItemTypes = [bmc.support.ConfigurableType.WHEEL, bmc.support.ConfigurableType.COLOUR,
                        bmc.support.ConfigurableType.TRIM],
                    configurableItemsWithNoPrice = [];

                _.each(configurableItemTypes, function (type) {

                    configurableItemVO = activeConfigurationVO.getConfigurableItemVO(type);
                    configurableItemsWithNoPrice.push(configurableItemVO);
                });

                this.sendNotification(
                    NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS, configurableItemsWithNoPrice);
            },

            getProxy: function (type) {
                return this.facade.retrieveProxy(type);
            }

        }
    );
});