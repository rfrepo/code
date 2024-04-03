define(['model/support/SectionData/GradeStandardFeaturesData'], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.support.sectionData.delegate.GradeSectionDataBuilderDelegate',
            constructor: function (host) {
                this.host = host;
            }
        },
        {
            buildData: function () {

                this.setupListOfGradeStandardFeaturesData();
                this.modifyStandardFeatureVOs();
                return this.host.getStandardFeatureVOs();
            },

            setupListOfGradeStandardFeaturesData: function () {

                var listOfVehiclesGroupedByGrade = this.getListOfVehiclesGroupedByGrade();
                this.listOfGradeStandardFeaturesData =
                    this.createListOfGradeStandardFeaturesData(listOfVehiclesGroupedByGrade);
            },

            createListOfGradeStandardFeaturesData: function (listOfVehiclesGroupedByGrade) {

                var listOfGradeStandardFeaturesData = [];

                _.each(listOfVehiclesGroupedByGrade, function (vehicleGroup) {

                    listOfGradeStandardFeaturesData.push(
                        new bmc.model.support.sectionData.GradeStandardFeaturesData(vehicleGroup)
                    );
                });

                return listOfGradeStandardFeaturesData;
            },

            modifyStandardFeatureVOs: function () {

                var self = this;

                _.each(this.host.getStandardFeatureVOs(), function (standardFeatureVO) {
                    self.forEachGradeExtractAvailabilityTypesForStandardFeatureVO(standardFeatureVO);
                });

            },

            forEachGradeExtractAvailabilityTypesForStandardFeatureVO: function (standardFeatureVO) {

                var self = this,
                    gradeId;

                _.each(this.listOfGradeStandardFeaturesData, function (gradeStandardFeaturesData) {

                    gradeId = gradeStandardFeaturesData.getGradeId();

                    self.setAvailabilityTypesForStandardFeatureVO(
                        standardFeatureVO, gradeStandardFeaturesData, gradeId);
                });

            },

            setAvailabilityTypesForStandardFeatureVO: function (standardFeatureVO, gradeStandardFeaturesData, gradeId) {

                var standardFeatureId = standardFeatureVO.getId(),
                    bodyStyleId = bmc.support.GlobalConfig.getInstance().getBodyStyleVO().getId();

                if (gradeStandardFeaturesData.isFeatureStandardOnGradeVehicles(standardFeatureId)) {
                    standardFeatureVO.setStandardOnGrades(gradeId);
                }

                if (gradeStandardFeaturesData.isFeatureOptionalOnGradeVehicles(standardFeatureId)) {
                    standardFeatureVO.setOptionalOnGrades(gradeId);
                }

                if (gradeStandardFeaturesData.isFeatureAvailableOnGradeVehicles(standardFeatureId)) {
                    standardFeatureVO.setAvailableOnGrades(gradeId);
                }

                if (gradeStandardFeaturesData.isFeatureAvailableOnGradeVehicles(standardFeatureId)) {
                    standardFeatureVO.setAvailableOnBodyStyle(bodyStyleId);
                }
            },

            getListOfVehiclesGroupedByGrade: function () {

                var self = this,
                    vehicleVOStore = {};

                _.each(this.host.getBaseVehicleVOs(), function (baseVehicleVO) {
                    self.storeVehicleVOByGradeId(vehicleVOStore, baseVehicleVO);
                });

                return this.extractListOfBaseVehicleVOs(vehicleVOStore);
            },

            storeVehicleVOByGradeId: function (vehicleVOStore, baseVehicleVO) {

                var storageKey = baseVehicleVO.getGradeVO().getId();

                if (!vehicleVOStore[storageKey]) {
                    vehicleVOStore[storageKey] = [];
                }
                vehicleVOStore[storageKey].push(baseVehicleVO);
            },

            extractListOfBaseVehicleVOs: function (vehicleVOstore) {

                var storageKey,
                    listOfVehiclesGroupedByGrade = [];

                for (storageKey in vehicleVOstore) {

                    if (storageKey) {
                        listOfVehiclesGroupedByGrade.push(vehicleVOstore[storageKey]);
                    }
                }
                return  listOfVehiclesGroupedByGrade;
            }
        }
    );
});
