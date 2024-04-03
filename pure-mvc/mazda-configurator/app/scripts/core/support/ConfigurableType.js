define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.ConfigurableType' }, {/*STATIC CLASS*/}, {
            BODYSTYLE: 'bodyStyle',
            GRADE: 'grade',
            ENGINE: 'engine',
            COLOUR: 'colour',
            WHEEL: 'wheel',
            TRIM: 'trim',
            ACCESSORIES: 'accessories',
            OPTIONPACK: 'optionPack',

            getTypes: function () {
                var ConfigurableType = bmc.support.ConfigurableType;

                return [
                    ConfigurableType.BODYSTYLE,
                    ConfigurableType.GRADE,
                    ConfigurableType.ENGINE,
                    ConfigurableType.COLOUR,
                    ConfigurableType.WHEEL,
                    ConfigurableType.TRIM
                ];
            },

            getBaseChangingTypes: function () {

                var ConfigurableType = bmc.support.ConfigurableType;

                return [
                    ConfigurableType.BODYSTYLE,
                    ConfigurableType.GRADE,
                    ConfigurableType.ENGINE,
                    ConfigurableType.COLOUR,
                    ConfigurableType.WHEEL,
                    ConfigurableType.TRIM
                ];
            },

            getDataKey: function (type) {
                return type + 's';
            },

            getTypeVO: function (type) {
                var cap = type[0].toUpperCase(),
                    capType = cap + type.substr(1);

                return capType + 'VO';
            },

            getTypeRawDataId: function (type) {
                return type + 'Id';
            }
        }
    );
});