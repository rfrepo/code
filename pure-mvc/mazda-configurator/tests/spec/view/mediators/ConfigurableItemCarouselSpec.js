(function () {
    'use strict';

    describe('ConfigurableItemCarousel', function () {

        var ui,
            dataBuilder,
            BODY = 'body',
            LI_HTML = '',
            DEFAULT_TEXT_BUTTON_SWATCH_HMTL_SNIPPET = '<a class="button"></a>',
            SELECTED_TEXT_BUTTON_SWATCH_HMTL_SNIPPET = 'selectedCarouselItem',
            DEFAULT_TEXT_IMAGE_SWATCH_HMTL_SNIPPET = '<img class="button',
            SELECTED_TEXT_IMAGE_SWATCH_HMTL_SNIPPET = '<div class="selected-indicator selectedCarouselItem"></div>',
            TEST_CALL_TO_ACTION_TEXT = 'test-call-to-action',
            CAROUSEL_TARGET_ID;

        describe('initialise', function () {

            it('should be defined', function () {
                expect(ui).not.to.be(undefined);
            });

            it('should set basic selector for this component', function () {
                expect(ui.getSelector()).to.equal('#' + CAROUSEL_TARGET_ID);
            });

            it('should create an instance of a carousel component', function () {
                expect(ui.carousel instanceof bmc.view.components.support.Carousel).to.be(true);
            });
        });

        describe('setData', function () {

            describe('should render configurable items to the dom', function () {

                describe('should render a text and button swatch', function () {

                    it('should render the default state', function () {

                        ui.carousel.initialise = function () {
                        };

                        ui.setData([new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_001_VO())]);

                        var renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                        expect(renderedHTML).to.contain(LI_HTML);
                        expect(renderedHTML).to.contain(DEFAULT_TEXT_BUTTON_SWATCH_HMTL_SNIPPET);
                    });

                    it('should render the selected state', function () {

                        ui.carousel.initialise = function () {
                        };

                        var renderedHTML,
                            carouselData = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_001_VO());
                        carouselData.setSelected(true);

                        ui.setData([carouselData]);

                        renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                        expect(renderedHTML).to.contain(LI_HTML);
                        expect(renderedHTML).to.contain(SELECTED_TEXT_BUTTON_SWATCH_HMTL_SNIPPET);
                    });
                });

                describe('should render a text and image swatch', function () {

                    it('should render the default state', function () {

                        ui.carousel.initialise = function () {
                        };

                        ui.setData([new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.TRIM_1_VO())]);

                        var renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                        expect(renderedHTML).to.contain(LI_HTML);
                        expect(renderedHTML).to.contain(DEFAULT_TEXT_IMAGE_SWATCH_HMTL_SNIPPET);
                    });

                    it('should render the selected state', function () {

                        ui.carousel.initialise = function () {
                        };

                        var renderedHTML,
                            carouselData = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.TRIM_1_VO());
                        carouselData.setSelected(true);

                        ui.setData([carouselData]);
                        renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                        expect(renderedHTML).to.contain(LI_HTML);
                        expect(renderedHTML).to.contain(SELECTED_TEXT_IMAGE_SWATCH_HMTL_SNIPPET);
                    });

                });
            });
        });

        describe('updateUI', function () {

            it('should update the current markup to reflect new in the updated vo', function () {

                ui.carousel.initialise = function () {
                };

                ui.setData([new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.ENGINE_1_VO())]);
                ui.updateUI(createCarouselUpdateData());

                var renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();
                expect(renderedHTML).to.contain(TEST_CALL_TO_ACTION_TEXT);

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

                setupGlobalConfig();
                CAROUSEL_TARGET_ID = bmc.support.HTMLAttributes.CONFIGURABLE_ITEM_CAROUSEL_ID;
                ui = new bmc.view.components.ConfigurableItemCarousel('#' + CAROUSEL_TARGET_ID);
                createListContainer();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + CAROUSEL_TARGET_ID).remove();
        });

        function createCarouselUpdateData() {

            var carouselData = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.ENGINE_1_VO());
            carouselData.setCallToActionText(TEST_CALL_TO_ACTION_TEXT);
            return [carouselData];
        }

        function createListContainer() {

            var ulHTML = '<ul id="' + CAROUSEL_TARGET_ID + '"' +
                'style="display:none; position: relative; ">' +
                '</ul>';

            jQuery(BODY).append(ulHTML);
        }

        function getDependencies() {

            return [
                'view/components/ConfigurableItemCarousel',
                'support/GlobalConfig',
                'support/HTMLAttributes',
                'view/components/support/Carousel',
                'controller/vo/ConfigurableItemUIVO'
            ];
        }

        function setupGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

    });
})();