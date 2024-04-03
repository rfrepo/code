define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.proxy.SessionProxy',
            parent: puremvc.Proxy
        },
        {
            getModelVO: function () {
                return this.modelVO;
            },

            setModelVO: function (value) {
                this.modelVO = value;

                this.sendNotification(bmc.support.NotificationNames.CURRENT_MODEL_UPDATED, this.getCurrentModel());
            },

            getCurrentModel: function () {
                return this.getModelVO().getModelId();
            },

            getActiveBodyStyleId: function () {
                return this.getModelVO().getBodyStyle();
            }
        },
        {
            NAME: 'SessionProxy'
        }
    );
});