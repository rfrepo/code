define([
    '../../../../core/controller/command/startup/DistributeModelDataToProxiesForParsingCommand',
    'model/proxy/data/DisclaimerProxy'
], function () {
    'use strict';
    var DistributeModelDataToProxiesForParsingCommand = arguments[0],
        DisclaimerProxy = arguments[1];

    return puremvc.define({
            name: 'bmc.controller.command.startup.DistributeModelDataToProxiesForParsingCommand',
            parent: DistributeModelDataToProxiesForParsingCommand
        },
        {
            getUniqueProxyNames: function () {
                var parent = DistributeModelDataToProxiesForParsingCommand.prototype,
                    proxies = parent.getUniqueProxyNames.call(this);

                proxies.push(DisclaimerProxy.NAME);

                return proxies;
            }
        }
    );
});
