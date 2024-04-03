define([
    'support/ConfigurableType',
    'model/vo/data/ConfigurableItemVO'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        ConfigurableItemVO = arguments[1];


    puremvc.define({
            name: 'bmc.model.vo.data.ColourVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(ConfigurableType.COLOUR);
            }
        },
        {
            setProperties: function () {

                var superClass = ConfigurableItemVO.prototype;
                superClass.setProperties.call(this);
                this.taxable = this.data.taxable;
            },

            setTaxable: function (value) {
                this.taxable = value;
            },
            getTaxable: function () {
                return this.taxable;
            },
            setDisplayPrice: function (value) {
                this.displayPrice = value;
            },
            getDisplayPrice: function () {
                return this.displayPrice;
            }
        });
});