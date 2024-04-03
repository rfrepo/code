(function () {
    'use strict';
    describe('EngineContentStrategy', function () {

        var strategy,
            dataBuilder,
            BODY = 'body',
            SECTION_CONTENT_ID,
            TEMPLATE_HTML = '<div id="section-content" style="display: none; position:relative;"></div>';

        describe('class should exist ', function () {

            it('should instance EngineContentStrategy', function () {
                expect(strategy).not.to.be(undefined);
            });
        });

        describe('display', function () {

            it('should collate all specifications', function () {
                var index, count = 0,
                    specNames;

                strategy.engineVOs = dataBuilder.engines;

                specNames = strategy.getAllSpecificationValues();

                for (index in specNames) {
                    if (specNames.hasOwnProperty(index)) {
                        count += 1;
                    }
                }

                expect(count).to.be(9);
            });


            it('should render the engineVOs table', function () {

                strategy.display(createSectionDataVO());

                var renderedHTML = jQuery('#' + SECTION_CONTENT_ID).html(),
                    engineC02 = dataBuilder.ENGINE_1_VO().getSpecifications().name;

                expect(renderedHTML).to.contain(engineC02);
            });

            it('should not render the engineVOs table if no specifications are available', function () {

                var sectionDataVO = createSectionDataVO();

                _.each(sectionDataVO.getSectionData(), function (sectionDataVO) {
                    sectionDataVO.specifications = undefined;
                });

                strategy.display(sectionDataVO);

                expect(strategy.specificationUI).to.be(undefined);
            });
        });

        describe('cleanup', function () {

            it('should call method on the specificationUI component - cleanup', function () {

                strategy.engineVOs = dataBuilder.engines;

                strategy.specificationUI.cleanup = function () {
                };

                var spy = sinon.spy(strategy.specificationUI, 'cleanup');

                strategy.cleanup();

                strategy.specificationUI.cleanup.restore();

                expect(spy.called).to.be(true);

            });

        });

        describe('updateView', function () {

            it('should call method on the specificationUI component - updateView', function () {

                strategy.engineVOs = dataBuilder.engines;

                strategy.specificationUI.scrollTo = function () {
                };

                var spy = sinon.spy(strategy.specificationUI, 'scrollTo');

                strategy.updateView({});

                strategy.specificationUI.scrollTo.restore();

                expect(spy.called).to.be(true);
            });

        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                SECTION_CONTENT_ID = bmc.support.HTMLAttributes.SECTION_CONTENT_ID;
                configureEngineVOsData();
                createDomElement();
                createEngineContentStrategy();
                setupGlobalConfig();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + SECTION_CONTENT_ID).remove();
        });

        function createDomElement() {
            jQuery(BODY).append(TEMPLATE_HTML);
        }

        function getDependencies() {
            return [
                '../../../' + 'test/spec/support/data/DataBuilder',
                'support/GlobalConfig',
                'view/components/support/SectionContent/EngineContentStrategy'
            ];
        }

        function configureEngineVOsData() {
            var specs;

            dataBuilder = new bmc.support.data.DataBuilder();

            _.each(dataBuilder.engines, function (engineVO) {

                specs = engineVO.getSpecifications();
                engineVO.setSpecifications(specs[0]);
            });
        }

        function createSectionDataVO() {

            return {
                getSectionData: function () {
                    return dataBuilder.engines;
                }
            };
        }

        function createEngineContentStrategy() {
            strategy = new bmc.view.components.support.SectionContent.EngineContentStrategy(SECTION_CONTENT_ID);
        }


        function setupGlobalConfig() {
            var globalConfig = bmc.support.GlobalConfig.getInstance();
            globalConfig.applyLocaleData('en-gb');
        }
    });
})();
