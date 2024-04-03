define([], function () {
    'use strict';
    puremvc.define({
            name: 'bmc.model.support.sectionData.GradeStandardFeaturesData',
            constructor: function (vehicleVOs) {

                this.setBaseVehicleVOs(vehicleVOs);
                this.setGradeId(vehicleVOs[0].getGradeVO().getId());

                this.listOfAllBaseVehicleStandardFeatureIds =
                    this.extractStandardFeaturesIdsFromVehicleVOs();
                this.gradeStandardFeatureIdsCommonToAllBaseVehicles =
                    this.getAllTheStandardFeatureIdsCommonToAllBaseVehicleVOs();
                this.standardFeatureIdsNotCommonToAllBaseVehicles =
                    this.getAllTheStandardFeatureIdsNotCommonToAllBaseVehicleVOs();
            }
        },
        {
            extractStandardFeaturesIdsFromVehicleVOs: function () {

                var baseVehicleVOStandardFeatures = [],
                    globalConfig = bmc.support.GlobalConfig.getInstance();

                _.each(this.getBaseVehicleVOs(), function (baseVehicleVO) {
                    if (globalConfig.getBodyStyleVO().getId() === baseVehicleVO.getBodyStyleVO().getId()) {
                        baseVehicleVOStandardFeatures.push(baseVehicleVO.getStandardFeatureIds());
                    }
                });

                return baseVehicleVOStandardFeatures;
            },

            getAllTheStandardFeatureIdsCommonToAllBaseVehicleVOs: function () {

                return  _.intersection.apply(this, this.listOfAllBaseVehicleStandardFeatureIds);
            },

            getAllTheStandardFeatureIdsNotCommonToAllBaseVehicleVOs: function () {

                var allBaseVehicleStandardFeatureIds = _.union.apply(
                    this, this.listOfAllBaseVehicleStandardFeatureIds);

                return  _.difference(
                    allBaseVehicleStandardFeatureIds, this.gradeStandardFeatureIdsCommonToAllBaseVehicles);
            },

            setGradeId: function (value) {
                this.gradeId = value;
            },

            getGradeId: function () {
                return this.gradeId;
            },

            setBaseVehicleVOs: function (value) {
                this.baseVehicleVOs = value;
            },

            getBaseVehicleVOs: function () {
                return this.baseVehicleVOs;
            },

            isFeatureStandardOnGradeVehicles: function (standardFeatureId) {
                return _.indexOf(this.gradeStandardFeatureIdsCommonToAllBaseVehicles, standardFeatureId) !== -1;
            },

            isFeatureOptionalOnGradeVehicles: function (standardFeatureId) {
                return _.indexOf(this.standardFeatureIdsNotCommonToAllBaseVehicles, standardFeatureId) !== -1;
            },

            isFeatureAvailableOnGradeVehicles: function (standardFeatureId) {

                return (this.isFeatureStandardOnGradeVehicles(standardFeatureId)) ||
                    (this.isFeatureOptionalOnGradeVehicles(standardFeatureId));
            }

        });
});