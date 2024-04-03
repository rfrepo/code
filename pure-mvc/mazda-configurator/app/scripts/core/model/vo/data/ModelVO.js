define([], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.model.vo.data.ModelVO'
        },
        {
            getModelId: function () {
                return this.modelId;
            },

            setModelId: function (value) {
                this.modelId = value;
            },

            getBodyStyle: function () {
                return this.bodyStyle;
            },

            setBodyStyle: function (value) {
                this.bodyStyle = value;
            }
        });
});