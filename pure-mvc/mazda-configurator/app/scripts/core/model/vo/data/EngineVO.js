define(['support/ConfigurableType', 'model/vo/data/ConfigurableItemVO'], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        ConfigurableItemVO = arguments[1];

    puremvc.define({
            name: 'bmc.model.vo.data.EngineVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(ConfigurableType.ENGINE);
                this.imageFileName = '';
            }
        },
        {
            setProperties: function () {

                var superClass = ConfigurableItemVO.prototype;
                superClass.setProperties.call(this);

                this.taxIncrease = this.data.taxIncrease;
                this.setFuelType(this.data.fuelType);
                this.engineSize = this.data.engineSize;
                this.enginePower = this.data.enginePower;
                this.setTransmission(this.data.description);
                this.setSpecifications(this.data.performanceAndEconomy);
            },

            getSize: function () {

                return this.size;
            },

            setSize: function (value) {

                this.size = value;
            },

            getPower: function () {
                return this.power;
            },

            setPower: function (value) {
                this.power = value;
            },

            getTransmission: function () {
                return this.transmission;
            },

            setTransmission: function (value) {

                this.transmission = value;
            },

            getFuelType: function () {

                return this.fuelType;
            },

            setFuelType: function (value) {

                this.fuelType = value;
            },

            getEnginePower: function () {
                return this.enginePower;
            },

            getEngineSize: function () {
                return this.engineSize;
            },

            getTaxIncrease: function () {
                return this.taxIncrease;
            },

            setTaxIncrease: function (value) {
                this.taxIncrease = value;
            },

            getEmissions: function () {
                return this.emissions;
            },

            setEmissions: function (value) {
                this.emissions = value;
            },

            setPrice: function (value) {
                this.price = value;
            },

            getPrice: function () {
                return this.price;
            },

            getSpecifications: function () {
                return this.specifications;
            },

            setSpecifications: function (specs) {
                this.specifications = specs;
            }
        });
});
