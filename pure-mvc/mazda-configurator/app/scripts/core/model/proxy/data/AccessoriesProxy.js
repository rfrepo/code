define(['model/vo/data/AccessoryVO'], function (AccessoryVO) {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.proxy.data.AccessoriesProxy',
            parent: puremvc.Proxy
        },
        {
            parseData: function (data) {

                this.createDataVOs(data);
                this.setDisclaimer(data);
            },

            createDataVOs: function (data) {

                var self = this,
                    accessories = data[this.constructor.DATA_KEY];

                this.data = [];

                _.each(accessories, function (accessoryData) {
                    self.data.push(new AccessoryVO(accessoryData));
                });
            },

            setDisclaimer: function (data) {

                if (data.disclaimers && data.disclaimers[this.constructor.DATA_KEY]) {
                    this.disclaimer = data.disclaimers[this.constructor.DATA_KEY];
                }
            },

            getDisclaimer: function () {
                return this.disclaimer;
            }
        },
        {
            NAME: 'accessories',
            DATA_KEY: 'accessories'
        }
    );
});