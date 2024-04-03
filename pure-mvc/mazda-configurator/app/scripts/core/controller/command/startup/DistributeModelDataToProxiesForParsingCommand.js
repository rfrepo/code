define([
    'support/ConfigurableType',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/data/BaseVehiclesDefaultsProxy',
    'model/proxy/data/StandardFeaturesProxy',
    'model/proxy/data/AccessoriesProxy',
    'model/proxy/data/OptionPackProxy'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        BaseVehiclesProxy = arguments[1],
        BaseVehiclesDefaultsProxy = arguments[2],
        StandardFeaturesProxy = arguments[3],
        AccessoriesProxy = arguments[4],
        OptionPackProxy = arguments[5];

    return puremvc.define({
            name: 'bmc.controller.command.startup.DistributeModelDataToProxiesForParsingCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var data = note.getBody(),
                    proxyNames = ConfigurableType.getTypes();

                proxyNames = proxyNames.concat(this.getUniqueProxyNames());

                this.callParseOnAllProxies(proxyNames, data);
            },

            getUniqueProxyNames: function () {

                return [
                    BaseVehiclesProxy.NAME,
                    BaseVehiclesDefaultsProxy.NAME,
                    StandardFeaturesProxy.NAME,
                    AccessoriesProxy.NAME,
                    OptionPackProxy.NAME
                ];
            },

            callParseOnAllProxies: function (proxyNames, data) {

                var proxy,
                    self = this;

                _.each(proxyNames, function (proxyName) {
                    proxy = self.facade.retrieveProxy(proxyName);
                    if (proxy) {
                        proxy.parseData(data);
                    }
                });
            }
        }
    );
});
