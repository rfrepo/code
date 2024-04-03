define([
    'view/mediators/RecentConfigurationsMediator',
    'model/proxy/UserConfigurationsProxy'
],
    function () {
        'use strict';
        var UserConfigurationsProxy = arguments[1];


        puremvc.define({
                name: 'bmc.controller.command.RequestUserConfigurationsCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function () {
                    var userConfigProxy = this.getFacade().retrieveProxy(
                        UserConfigurationsProxy.NAME
                    );

                    if (userConfigProxy) {
                        userConfigProxy.load();
                    }
                }
            }
        );
    });