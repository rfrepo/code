define(['model/proxy/SessionProxy'], function () {
    'use strict';
    var SessionProxy = arguments[0];


    return puremvc.define({
            name: 'bmc.controller.command.ModelSelectedCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {
                var modelVO = note.getBody();
                this.getSessionProxy().setModelVO(modelVO);
            },

            getSessionProxy: function () {
                return this.facade.retrieveProxy(SessionProxy.NAME);
            }
        }
    );
});