(function () {
    'use strict';
    describe('GradeContentStrategy', function () {

        var strategy,
            dataBuilder,
            BODY = 'body',
            LEFT_POSITION = 237,
            CURRENT_INDEX = 1,
            SECTION_CONTENT_ID = 'section-content',
            TEMPLATE_HTML =
                '<div id="section-content" style="display: none; position:relative;">' +
                    '<section id="grade-content"></section>';

        describe('class should exist ', function () {

            it('should instance GradeContentStrategy', function () {
                expect(strategy).not.to.be(undefined);
            });
        });

        describe('display', function () {

            it('should set the sectionDataVO', function () {

                strategy.display(createSectionDataVO());
                expect(strategy.sectionDataVO).not.to.be(undefined);
            });

            it('should set the standardFeaturesVOs', function () {

                strategy.display(createSectionDataVO());
                expect(strategy.standardFeaturesVOs).not.to.be(undefined);
            });

            it('should sort standardFeaturesVOs into accenting lexicographical order', function () {

                var standardFeatureData;

                strategy.sectionDataVO = createSectionDataVO();
                strategy.standardFeaturesVOs = createSectionDataVO().getSectionData();
                standardFeatureData = strategy.getStandardFeaturesDataForTemplate();

                expect(standardFeatureData[0].features[0].name).to
                    .contain(dataBuilder.STANDARD_FEATURE_1_VO().getName());
                expect(standardFeatureData[0].features[1].name).to
                    .contain(dataBuilder.STANDARD_FEATURE_3_VO().getName());
                expect(standardFeatureData[0].features[2].name).to
                    .contain(dataBuilder.STANDARD_FEATURE_2_VO().getName());
            });

            it('should render the standardFeaturesVOs table', function () {

                strategy.display(createSectionDataVO());
                var renderedHTML = jQuery('#' + SECTION_CONTENT_ID).html();

                expect(renderedHTML).to.contain(dataBuilder.STANDARD_FEATURE_1_VO().getCategory());
            });

        });

        describe('cleanup', function () {

            it('should remove the html template markup from the dom', function () {

                strategy.cleanup();
                var html = jQuery('#' + SECTION_CONTENT_ID).html();
                expect(html).not.to.contain(strategy.getRawSelector());
            });

        });

        describe('updateView', function () {

            it('should update the position of the grade view element', function (done) {

                strategy.display(createSectionDataVO());
                strategy.updateView(createUpdateData());

                setTimeout(function () {

                    var html = jQuery('#' + SECTION_CONTENT_ID).html();

                    expect(html).to.contain(0);

                    done();

                }, 500);
            });

        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createDomElement();
                createGradeContentStrategy();
                setupGlobalConfig();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + SECTION_CONTENT_ID).remove();
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        function createUpdateData() {
            return { currentPosition: LEFT_POSITION, currentPositionIndex: CURRENT_INDEX };
        }

        function createDomElement() {
            jQuery(BODY).append(TEMPLATE_HTML);
        }

        function getDependencies() {
            return [
                'support/GlobalConfig',
                'view/components/support/SectionContent/GradeContentStrategy'
            ];
        }

        function createSectionDataVO() {

            return {

                getGradeIds: function () {

                    return [
                        dataBuilder.GRADE_001_VO().getId(),
                        dataBuilder.GRADE_002_VO().getId(),
                        dataBuilder.GRADE_003_VO().getId()
                    ];
                },

                getSectionData: function () {
                    return [
                        modifiyStandardFeatures(dataBuilder.STANDARD_FEATURE_1_VO()),
                        modifiyStandardFeatures(dataBuilder.STANDARD_FEATURE_2_VO()),
                        modifiyStandardFeatures(dataBuilder.STANDARD_FEATURE_3_VO())
                    ];
                },

                getConfigurableItemVOs: function () {
                    return [
                        {
                            getType: function () {
                                return 'grade';
                            }
                        }
                    ];
                }
            };
        }

        function createGradeContentStrategy() {
            strategy = new bmc.view.components.support.SectionContent.GradeContentStrategy();
        }

        function modifiyStandardFeatures(vo) {
            vo.category = vo.itemBelongsToSpecificationCategory;
            vo.standardOnGrades = {'001': true, '002': true, '003': true};
            vo.availableOnGrades = {'001': true, '002': true, '003': true};
            vo.availableOnBodyStyle = {'2200': true};
            return vo;
        }

        function setupGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
            bmc.support.GlobalConfig.getInstance().setBodyStyleVO(dataBuilder.BODYSTYLE_2200_VO());
        }
    });
})();
