(function () {
    'use strict';
    describe('GradeStandardFeaturesData', function () {

        var standardFeaturesDataGroupedByGrade,
            dataBuilder,

            FEATURE_ID_STANDARD_ON_GRADE_VEHICLES = '0003',
            FEATURE_ID_OPTIONAL_ON_GRADE_VEHICLES = '0001',
            FEATURE_ID_NOT_AVAILABLE_ON_GRADE_VEHICLES = 'AAAA';

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(standardFeaturesDataGroupedByGrade).not.to.be(undefined);
            });

            it('should set gradeStandardFeatureIdsCommonToAllBaseVehicles', function () {

                var totalGradeStandardFeatures =
                    standardFeaturesDataGroupedByGrade.gradeStandardFeatureIdsCommonToAllBaseVehicles.length;

                expect(totalGradeStandardFeatures).to.be(32);
            });

            it('should set standardFeatureIdsNotCommonToAllBaseVehicles ', function () {

                var totalGradeStandardFeatures =
                    standardFeaturesDataGroupedByGrade.standardFeatureIdsNotCommonToAllBaseVehicles.length;

                expect(totalGradeStandardFeatures).to.be(1);
            });
        });


        describe('isFeatureStandardOnGradeVehicles', function () {

            it('should return true if feature is contained within the standard feature list', function () {

                var isFeatureStandardOnGrade = standardFeaturesDataGroupedByGrade.isFeatureStandardOnGradeVehicles(
                    FEATURE_ID_STANDARD_ON_GRADE_VEHICLES);

                expect(isFeatureStandardOnGrade).to.be(true);
            });

            it('should be return false if feature is not contained within the standard feature list', function () {

                var isFeatureStandardOnGrade = standardFeaturesDataGroupedByGrade.isFeatureStandardOnGradeVehicles(
                    FEATURE_ID_OPTIONAL_ON_GRADE_VEHICLES);

                expect(isFeatureStandardOnGrade).to.be(false);
            });
        });

        describe('isFeatureOptionalOnGradeVehicles', function () {

            it('should be return true if feature is contained within the ' +
                'optional standard feature list', function () {

                var isFeatureOptionalOnGrade = standardFeaturesDataGroupedByGrade.isFeatureOptionalOnGradeVehicles(
                    FEATURE_ID_OPTIONAL_ON_GRADE_VEHICLES);

                expect(isFeatureOptionalOnGrade).to.be(true);
            });

            it('should be return false if feature is not contained within the ' +
                'optional standard feature list', function () {

                var isFeatureOptionalOnGrade = standardFeaturesDataGroupedByGrade.isFeatureOptionalOnGradeVehicles(
                    FEATURE_ID_STANDARD_ON_GRADE_VEHICLES);

                expect(isFeatureOptionalOnGrade).to.be(false);
            });
        });


        describe('isFeatureAvailableOnGradeVehicles', function () {

            it('should be return true if feature is contained within the ' +
                'optional standard feature or standard feature list', function () {

                var isFeatureAvailableOnGrade = standardFeaturesDataGroupedByGrade.isFeatureAvailableOnGradeVehicles(
                    FEATURE_ID_NOT_AVAILABLE_ON_GRADE_VEHICLES);

                expect(isFeatureAvailableOnGrade).to.be(false);
            });

            it('should be return false if feature is not contained within the ' +
                'optional standard feature or standard feature list', function () {

                var isFeatureAvailableOnGrade = standardFeaturesDataGroupedByGrade.isFeatureAvailableOnGradeVehicles(
                    FEATURE_ID_OPTIONAL_ON_GRADE_VEHICLES);

                expect(isFeatureAvailableOnGrade).to.be(true);
            });
        });


        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createGradeSectionDataBuilder();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/support/SectionData/GradeStandardFeaturesData'
            ];
        }

        function createGradeSectionDataBuilder() {

            standardFeaturesDataGroupedByGrade = new bmc.model.support.sectionData.GradeStandardFeaturesData([
                dataBuilder.VEHICLE_1_VO(), dataBuilder.VEHICLE_2_VO()
            ]);
        }
    });
})();
