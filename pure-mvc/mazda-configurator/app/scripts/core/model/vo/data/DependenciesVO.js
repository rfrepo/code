define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.data.DependenciesVO',
            constructor: function () {
                this.availabilityPreconditions = [];
                this.pricePreconditions = [];
                this.selectionPreconditions = [];
                this.renderPreconditions = [];
            }
        },
        {
            addAvailabilityPrecondition: function (preCondition) {
                this.availabilityPreconditions.push(preCondition);
            },
            getAvailabilityPrecondition: function () {
                return this.availabilityPreconditions;
            },

            addPricePrecondition: function (preCondition) {
                this.pricePreconditions.push(preCondition);
            },
            getPricePrecondition: function () {
                return this.pricePreconditions;
            },

            addSelectionPrecondition: function (preCondition) {
                this.selectionPreconditions.push(preCondition);
            },
            getSelectionPrecondition: function () {
                return this.selectionPreconditions;
            },

            addRenderPrecondition: function (preCondition) {
                this.renderPreconditions.push(preCondition);
            },

            getRenderPrecondition: function () {
                return this.renderPreconditions;
            }
        });
});