define(['model/vo/data/StandardFeatureVO'], function () {
    'use strict';
    var StandardFeatureVO = arguments[0];

    return puremvc.define({
            name: 'bmc.model.proxy.data.StandardFeaturesProxy',
            parent: puremvc.Proxy
        },
        {
            parseData: function (data) {
                var i,
                    standardFeatureVO,
                    standardFeatures = data[this.constructor.DATA_KEY],
                    numOfStandardFeatures = standardFeatures.length;

                this.standardFeatures = [];

                for (i = 0; i < numOfStandardFeatures; i++) {

                    standardFeatureVO = new StandardFeatureVO(standardFeatures[i]);
                    this.standardFeatures.push(standardFeatureVO);
                }
            },

            getById: function (id) {
                var self = this,
                    i = 0,
                    standardFeatureVO,
                    items = self.standardFeatures.length;

                while (i < items) {
                    standardFeatureVO = self.standardFeatures[i];

                    if (standardFeatureVO.getId() === id) {
                        return standardFeatureVO;
                    }

                    i += 1;
                }
                return null;
            },

            getStandardFeatureVOs: function () {
                return this.standardFeatures;
            }
        },
        {
            NAME: 'StandardFeaturesProxy',
            DATA_KEY: 'standardFeatures'
        }
    );
});