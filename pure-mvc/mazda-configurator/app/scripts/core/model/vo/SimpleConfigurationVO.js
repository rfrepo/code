define(['support/ConfigurableType'], function () {
    'use strict';
    var ConfigurableType = arguments[0];


    return puremvc.define({
            name: 'bmc.model.vo.SimpleConfigurationVO',
            constructor: function () {
                this.accessoryVOs = [];
                this.optionPackVOs = [];
            }
        },
        {
            getId: function () {
                return this.id;
            },

            setId: function (value) {
                this.id = value;
            },

            getVehicleId: function () {
                return this.vehicleId;
            },

            setVehicleId: function (value) {
                this.vehicleId = value;
            },

            getLocale: function () {
                return this.locale;
            },

            setLocale: function (value) {
                this.locale = value;
            },

            getImageUrl: function () {
                return this.imageUrl;
            },

            setImageUrl: function (value) {
                this.imageUrl = value;
            },

            addConfigurableItemVO: function (type, vo) {
                this[type] = vo;
            },

            getConfigurableItemVO: function (type) {
                return this[type];
            },

            setBaseVehicleVO: function (value) {

                this.baseVehicleVO = value;

                if (this.baseVehicleVO) {
                    this[ConfigurableType.GRADE] = this.baseVehicleVO[ConfigurableType.GRADE + 'VO'];
                    this[ConfigurableType.ENGINE] = this.baseVehicleVO[ConfigurableType.ENGINE + 'VO'];
                }
            },

            getBaseVehicleVO: function () {
                return this.baseVehicleVO;
            },

            setPreviousConfigurationVO: function (value) {
                this.previousConfigurationVO = value;
            },

            getPreviousConfigurationVO: function () {
                return this.previousConfigurationVO;
            },

            getAccessoryVOs: function () {
                return this.accessoryVOs;
            },

            getOptionPackVOs: function () {
                return this.optionPackVOs;
            },

            getBodyStyle: function () {
                return this.bodyStyle.id;
            },

            getTypeIdValuePairObjectFromCurrentItemVOs: function () {

                var i = 0,
                    configurableTypeVO,
                    type,
                    valuePairActiveConfiguration = {},
                    configurableTypes = ConfigurableType.getTypes(),
                    numOfConfigurableTypes = configurableTypes.length;

                for (i; i < numOfConfigurableTypes; i += 1) {

                    type = configurableTypes[i];
                    configurableTypeVO = this.getConfigurableItemVO(type);

                    if (configurableTypeVO) {
                        valuePairActiveConfiguration[type] = configurableTypeVO.getId();
                    }
                }

                valuePairActiveConfiguration.msc = this.baseVehicleVO.getId();

                return valuePairActiveConfiguration;
            }

        });
});