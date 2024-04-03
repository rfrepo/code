define(['support/ConfigurableType',
    'model/proxy/data/AccessoriesProxy',
    'support/NotificationNames',
    'model/proxy/data/OptionPackProxy'], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        AccessoriesProxy = arguments[1],
        NotificationNames = arguments[2],
        OptionPackProxy =  arguments[3];

    return puremvc.define({
            name: 'bmc.controller.command.startup.DispatchAllConfigurableItemDataCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {

                var data = {};
                data[ConfigurableType.GRADE] = this.getProxyData(ConfigurableType.GRADE);
                data[ConfigurableType.ENGINE] = this.getProxyData(ConfigurableType.ENGINE);
                data[ConfigurableType.WHEEL] = this.getProxyData(ConfigurableType.WHEEL);
                data[ConfigurableType.COLOUR] = this.getProxyData(ConfigurableType.COLOUR);
                data[ConfigurableType.TRIM] = this.getProxyData(ConfigurableType.TRIM);
                data[ConfigurableType.ACCESSORIES] = this.getProxyData(
                    AccessoriesProxy.NAME).concat(this.getProxyData(OptionPackProxy.NAME));

                this.sendNotification(NotificationNames.ALL_CONFIGURABLE_ITEM_DATA, data);
            },

            getProxyData: function (proxy) {
                return this.facade.retrieveProxy(proxy).getData();
            }
        }
    );
});
