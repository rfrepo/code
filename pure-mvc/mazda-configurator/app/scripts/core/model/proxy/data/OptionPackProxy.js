define(['model/vo/data/OptionPackVO'], function (AccessoryVO) {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.proxy.data.OptionPackProxy',
            parent: puremvc.Proxy
        },
        {
            parseData: function (data) {
                this.createDataVOs(data);
            },

            createDataVOs: function (data) {

                var self = this,
                    accessories = data[this.constructor.DATA_KEY];

                this.data = [];

                _.each(accessories, function (accessoryData) {
                    self.data.push(new AccessoryVO(accessoryData));
                });
            },

            getById: function (optionPackId) {
                return _.findWhere(this.data, {id: optionPackId});
            }
        },
        {
            NAME: 'OptionPackProxy',
            DATA_KEY: 'optionPack'
        }
    );
});