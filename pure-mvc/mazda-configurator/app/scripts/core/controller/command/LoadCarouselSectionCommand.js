define(['model/proxy/SessionProxy'], function () {
    'use strict';
    var SessionProxy = arguments[0];


    puremvc.define({
            name: 'bmc.controller.command.LoadCarouselSectionCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var modelVO = note.getBody();
                this.getSessionProxy().setCurrentModel(modelVO.getModelId());
            },

            getSessionProxy: function () {
                return this.facade.retrieveProxy(SessionProxy.NAME);
            }


        }
    );
});