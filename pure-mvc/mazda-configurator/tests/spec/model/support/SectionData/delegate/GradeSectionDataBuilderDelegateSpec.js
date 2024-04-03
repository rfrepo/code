(function () {
    'use strict';
    describe('GradeSectionDataBuilderDelegate', function () {

        var gradeSectionDataBuilder,
            dataBuilder,

            INDEX_OF_STANDARD_FEATURE_ID_0001 = 7,
            INDEX_OF_STANDARD_FEATURE_ID_0028 = 0;

        describe('class should exist ', function () {

            it('should instance GradeSectionDataBuilderDelegate', function () {
                expect(gradeSectionDataBuilder).not.to.be(undefined);
            });
        });

        describe('buildData ', function () {

            it('should return list of vehicles grouped by grade instanced', function () {

                gradeSectionDataBuilder.buildData();
                var numberOfVehicleGroups = gradeSectionDataBuilder.listOfGradeStandardFeaturesData.length,
                    firstVehicleVOGroupLength =
                        gradeSectionDataBuilder.listOfGradeStandardFeaturesData[0].getBaseVehicleVOs().length;

                expect(numberOfVehicleGroups).to.be(3);
                expect(firstVehicleVOGroupLength).to.be(2);
            });

            describe('modifyStandardFeatureVOs', function () {

                it('should set a StandardFeatureVOs not to be standard on grade but optional and available',
                    function () {

                        var gradeId = dataBuilder.GRADE_001_ID(),
                            standardFeatureVO = dataBuilder.standardFeatures[INDEX_OF_STANDARD_FEATURE_ID_0001];

                        expect(standardFeatureVO.isStandardOnGrades(gradeId)).to.be(false);
                        expect(standardFeatureVO.isOptionalOnGrades(gradeId)).to.be(true);
                        expect(standardFeatureVO.isAvailableOnGrades(gradeId)).to.be(true);

                    });

                it('should set a StandardFeatureVOs not to be standard on grade', function () {

                    var gradeId = dataBuilder.GRADE_001_ID(),
                        standardFeatureVO = dataBuilder.standardFeatures[INDEX_OF_STANDARD_FEATURE_ID_0028];

                    expect(standardFeatureVO.isStandardOnGrades(gradeId)).to.be(true);

                });

                it('should set a StandardFeatureVOs not to be standard or available on a grade', function () {

                    var gradeId = dataBuilder.GRADE_002_ID(),
                        standardFeatureVO = dataBuilder.standardFeatures[INDEX_OF_STANDARD_FEATURE_ID_0028];

                    expect(standardFeatureVO.isStandardOnGrades(gradeId)).to.be(false);
                    expect(standardFeatureVO.isAvailableOnGrades(gradeId)).to.be(false);

                });
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

                resetGlobalConfig();
                createGradeSectionDataBuilder();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/support/SectionData/delegate/GradeSectionDataBuilderDelegate'
            ];
        }

        function createGradeSectionDataBuilder() {

            gradeSectionDataBuilder = new bmc.model.support.sectionData.delegate.GradeSectionDataBuilderDelegate(
                createHost());
        }

        function createHost() {

            var host = {};

            host.standardFeatureVOs = dataBuilder.standardFeatures;
            host.baseVehicleVOs = dataBuilder.baseVehicles;
            host.getBaseVehicleVOs = function () {
                return this.baseVehicleVOs;
            };

            host.getStandardFeatureVOs = function () {
                return this.standardFeatureVOs;
            };

            return host;
        }

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
            bmc.support.GlobalConfig.getInstance().setBodyStyleVO(dataBuilder.BODYSTYLE_2200_VO());
        }
    });
})();
