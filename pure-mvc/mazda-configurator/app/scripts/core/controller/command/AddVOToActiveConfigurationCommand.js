define(['model/proxy/ActiveConfigurationProxy'], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0];


    return puremvc.define({
            name: 'bmc.controller.command.AddVOToActiveConfigurationCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {
                var itemVO = note.getBody(),
                    itemType = itemVO.getType();
                this.getActiveConfigurationProxy().setConfigurableItemVO(itemType, itemVO);
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(ActiveConfigurationProxy.NAME);
            }
        }
    );
});
