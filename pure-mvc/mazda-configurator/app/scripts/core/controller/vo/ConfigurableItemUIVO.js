define([''], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.controller.vo.ConfigurableItemUIVO',
            constructor: function (configurableItemVO) {
                this.configurableItemVO = configurableItemVO;
            }
        },
        {
            getId: function () {
                return this.configurableItemVO.getId();
            },

            getType: function () {
                return this.configurableItemVO.getType();
            },

            getName: function () {
                return this.configurableItemVO.getName();
            },

            setAvailableOnGradeText: function (value) {
                this.availabelOnGradeText = value;
            },

            getAvailabelOnGradeText: function () {
                return this.availabelOnGradeText;
            },

            setCallToActionText: function (value) {
                this.callToActionText = value;
            },

            getCallToActionText: function () {
                return this.callToActionText;
            },

            setFormattedPriceText: function (value) {
                this.priceText = value;
            },

            getFormattedPriceText: function () {

                return this.priceText;
            },

            setThumbnailURL: function (value) {
                this.thumbnailURL = value;
            },

            getThumbnailURL: function () {
                return this.thumbnailURL;
            },

            setSelected: function (value) {
                this.isSelected = value;
            },

            getSelected: function () {
                return this.isSelected;
            },

            getConfigurableItemVO: function () {
                return this.configurableItemVO;
            }
        }
    );
});