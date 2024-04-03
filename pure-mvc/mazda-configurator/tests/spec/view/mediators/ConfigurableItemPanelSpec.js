(function () {
    'use strict';

    describe('ConfigurableItemPanel', function () {

        var ui,
            dataBuilder,
            BODY = 'body',
            DEFAULT_TEXT_BUTTON_SWATCH_HMTL_SNIPPET = '<a class="button"></a>',
        /* LI_HTML = '',
         SELECTED_TEXT_BUTTON_SWATCH_HMTL_SNIPPET = 'selectedCarouselItem',
         DEFAULT_TEXT_IMAGE_SWATCH_HMTL_SNIPPET = '<img class="button',
         SELECTED_TEXT_IMAGE_SWATCH_HMTL_SNIPPET = '<div class="selected-indicator selectedCarouselItem"></div>',
         TEST_CALL_TO_ACTION_TEXT = 'test-call-to-action',*/
            CAROUSEL_TARGET_ID;

        describe('initialise', function () {

            it('should be defined', function () {
                expect(ui).not.to.be(undefined);
            });

            it('should set basic selector for this component', function () {
                expect(ui.getSelector()).to.equal('#' + CAROUSEL_TARGET_ID);
            });
        });

        describe('setData', function () {

            describe('should render configurable items to the dom', function () {

                describe('should render an accessory swatch', function () {

                    it('should render the default state', function () {

                        ui.setData([new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.ACCESSORY_1_VO())]);

                        var renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                        expect(renderedHTML).to.contain(DEFAULT_TEXT_BUTTON_SWATCH_HMTL_SNIPPET);
                    });

                    /*it('should render the selected state', function () {

                     var renderedHTML,
                     carouselData = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_001_VO());
                     carouselData.setSelected(true);

                     ui.setData([carouselData]);

                     renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();

                     expect(renderedHTML).to.contain(LI_HTML);
                     expect(renderedHTML).to.contain(SELECTED_TEXT_BUTTON_SWATCH_HMTL_SNIPPET);
                     });*/
                });
            });

        });

        describe('updateUI', function () {

            /* it('should update the current markup to reflect new in the updated vo', function () {



             ui.setData([new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.ENGINE_1_VO())]);
             ui.updateUI(createCarouselUpdateData());

             var renderedHTML = jQuery('#' + CAROUSEL_TARGET_ID).html();
             expect(renderedHTML).to.contain(TEST_CALL_TO_ACTION_TEXT);

             });*/
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
                ui = new bmc.view.components.ConfigurableItemPanel('#' + CAROUSEL_TARGET_ID);
                createListContainer();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + CAROUSEL_TARGET_ID).remove();
        });


        function createListContainer() {

            var ulHTML = '<ul id="' + CAROUSEL_TARGET_ID + '"' +
                'style="display:block; position: relative; ">' +
                '</ul>';

            jQuery(BODY).append(ulHTML);
        }

        function getDependencies() {

            return [
                'view/components/ConfigurableItemPanel',
                'support/GlobalConfig',
                'support/HTMLAttributes',
                'controller/vo/ConfigurableItemUIVO'
            ];
        }

        function setupGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

    });
})();