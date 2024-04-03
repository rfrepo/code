define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.vo.data.BaseVehicleVO',
            constructor: function (data) {
                this.data = data;
                this.setProperties();
            }
        },
        {
            setProperties: function () {

                this.id = this.data.id;
                this.rank = this.data.rank;
                this.bodyStyleId = this.data.bodyStyleId;
                this.gradeId = this.data.gradeId;
                this.engineId = this.data.engineId;
                this.colourId = this.data.colourId;
                this.wheelId = this.data.wheelId;
                this.keyCriteriaIds = this.convertStringToArray(this.data.keyCriteriaIds);
                this.standardFeatureIds = this.convertStringToArray(this.data.standardFeatureIds);
                this.optionPackIds = this.convertStringToArray(this.data.optionPackIds);
                this.capCode = this.data.capCode;
                this.specPage = this.data.specPage;
                this.price = this.data.price;
                this.optionPackVOs = [];
            },

            convertStringToArray: function (value) {
                if (value) {
                    value = value.split(',');
                }
                return value;
            },

            getId: function () {
                return this.id;
            },

            getRank: function () {
                return this.rank;
            },

            getDefaultsVO: function () {
                return this.defaultsVO;
            },

            setDefaultsVO: function (value) {
                this.defaultsVO = value;
            },

            getBodyStyleVO: function () {
                return this.bodyStyleVO;
            },

            setBodyStyleVO: function (value) {
                this.bodyStyleVO = value;
            },

            getGradeVO: function () {
                return this.gradeVO;
            },

            setGradeVO: function (value) {
                this.gradeVO = value;
            },

            getEngineVO: function () {
                return this.engineVO;
            },

            setEngineVO: function (value) {
                this.engineVO = value;
            },

            getColourVO: function () {
                return this.defaultsVO.getColourVO();
            },

            setColourVO: function (value) {
                this.colourVO = value;
                console.warn('use defaultsVO not setColour');
            },

            getWheelVO: function () {
                return this.defaultsVO.getWheelVO();
            },

            setWheelVO: function (value) {
                this.wheelVO = value;
                console.warn('use defaultsVO not setWheel');
            },

            setTrimVO: function (value) {
                this.trimVO = value;
                console.warn('use defaultsVO not setTrim');
            },

            getTrimVO: function () {
                return this.defaultsVO.getTrimVO();
            },

            getOptionPackVOs: function () {
                return this.optionPackVOs;
            },

            setOptionPackVOs: function (optionPackVOs) {
                this.optionPackVOs = optionPackVOs;
            },

            getKeyCriteriaIds: function () {
                return this.keyCriteriaIds;
            },

            getStandardFeatureIds: function () {
                return this.standardFeatureIds;
            },

            getOptionPackIds: function () {
                return this.optionPackIds;
            },

            getCapCode: function () {
                return this.capCode;
            },

            getSpecPage: function () {
                return this.specPage;
            },

            getPrice: function () {
                return this.price;
            },

            setConfigurableItemVOByType: function (type, value) {
                this[type + 'VO'] = value;
            }
        }
    );
})
;