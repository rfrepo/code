define([
    'support/services/LoadSyncDataService'
], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.proxy.PriceDisplayProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                var GlobalConfig = bmc.support.GlobalConfig.getInstance(),
                    LoadSyncDataService = bmc.support.services.LoadSyncDataService,
                    loader = new LoadSyncDataService(GlobalConfig.MODEL_DATA_LOCATION.path + 'pricing.json');

                this.data = {};

                puremvc.Proxy.call(this, bmc.model.proxy.PriceDisplayProxy.NAME);

                this.setData(loader.load());
            }
        },
        {
            setData: function (data) {
                this.data = data;
            },

            getData: function () {
                return this.data;
            },

            getPrice: function (configurableItemVO, vehicleMSC) {

                var ModelData, price = 0;

                ModelData = _.find(this.getData().WebPriceList.Model, function (model) {
                    if (model.MSC === vehicleMSC) {
                        return true;
                    }
                });

                if (ModelData) {
                    _.each(ModelData.Colour, function (colourObj) {
                        if (colourObj['-Name'] === configurableItemVO.getName()) {
                            price = colourObj.ColourAdjustmentPrice;
                        }
                    });
                }

                return price;
            }
        },
        {
            NAME: 'PriceDisplayProxy'
        }
    );
});