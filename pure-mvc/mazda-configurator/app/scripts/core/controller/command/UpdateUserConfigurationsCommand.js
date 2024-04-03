define([
    'model/proxy/UserConfigurationsProxy',
    'model/proxy/ActiveConfigurationProxy'
],
    function () {
        'use strict';

        return puremvc.define({
                name: 'bmc.controller.command.UpdateUserConfigurationsCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function () {
                    var self = this,
                        proxies = bmc.model.proxy,
                        activeConfigProxy = self.getFacade().retrieveProxy(proxies.ActiveConfigurationProxy.NAME),
                        userConfigProxy = self.getFacade().retrieveProxy(proxies.UserConfigurationsProxy.NAME);

                    userConfigProxy.save(activeConfigProxy.getSimplified());
                }
            }
        );
    });