define(['model/proxy/NavigationProxy'], function () {
    'use strict';
    var NavigationProxy = arguments[0];


    return puremvc.define({
            name: 'bmc.controller.command.startup.AllConfigurableItemDataCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var navigationProxy = this.getSectionDataProxy();
                navigationProxy.generateNavigationData(note.getBody());
            },

            getSectionDataProxy: function () {
                return this.facade.retrieveProxy(NavigationProxy.NAME);
            }
        }
    );
});