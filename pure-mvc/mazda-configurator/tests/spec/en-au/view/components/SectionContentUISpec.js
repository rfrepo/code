describe('EN-AU - SectionContentUI', function () {
    'use strict';
    var ui,

        BODY = 'body',
        DISCLAIMER_OBJECT = {},
        SECTION_DISCLAIMER_ID = 'section-disclaimer',
        TEMPLATE_HTML = '<div class="vehicle-details-container"><div id="vehiclePricing" class="vehicle-price">' +
            '<p class="otr"></p><div class="disclaimer disclaimer-hidden"><p></p></div>' +
            '</div><div id="section-disclaimer"></div></div>';

    function createSectionDataVO() {
        return {
            getSectionData: function () {
                return [];
            },

            getConfigurableItemVOs: function () {
                return [
                    {
                        getType: function () {
                            return 'grade';
                        }
                    }
                ];
            },

            getSectionName: function () {
                return 'grade';
            },

            getDisclaimer: function () {
                return this.disclaimer;
            },

            setDisclaimer: function (value) {
                this.disclaimer = value;
            }
        };
    }

    function createDomElements() {
        jQuery(BODY).append(TEMPLATE_HTML);
    }

    function buildDisclaimerObject() {
        var GlobalConstants = bmc.support.GlobalConstants;

        DISCLAIMER_OBJECT.section = ['test disclaimer section text'];
        DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.disclaimerHeader] = ['test disclaimer  header text'];
        DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.initialDisclaimer] = ['test disclaimer inital text'];
        DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.rdpDisclaimer] = ['test disclaimer RDP text'];
        DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.colourDisclaimer] = ['test disclaimer colour text'];
    }

    beforeEach(function (done) {

        require([
            '../en-au/' + 'view/components/SectionContentUI',
            'support/HTMLAttributes',
            'support/GlobalConstants'
        ], function () {

            createDomElements();
            buildDisclaimerObject();

            ui = new bmc.view.components.SectionContentUI(
                '#' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID);
            done();
        });
    });

    afterEach(function () {
        jQuery('.vehicle-details-container').remove();
    });

    describe('initialise', function () {

        it('should be defined', function () {
            expect(ui).not.to.be(undefined);
        });
    });

    describe('displayContent', function () {

        describe('displayDisclaimerContent', function () {

            it('should render the section disclaimer text', function () {

                var renderedHTML,
                    GlobalConstants = bmc.support.GlobalConstants,
                    sectionVO = createSectionDataVO();

                sectionVO.setDisclaimer(DISCLAIMER_OBJECT);

                ui.displayDisclaimerContent(sectionVO);

                renderedHTML = jQuery('#' + SECTION_DISCLAIMER_ID).html();

                expect(renderedHTML).to.contain(DISCLAIMER_OBJECT.section);
                expect(jQuery('.otr').html()).to
                    .contain(DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.disclaimerHeader]);
                expect(renderedHTML).to
                    .contain(DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.initialDisclaimer]);
                expect(jQuery('.vehicle-price').html()).to
                    .contain(DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.rdpDisclaimer]);
                expect(renderedHTML).to
                    .contain(DISCLAIMER_OBJECT[GlobalConstants.DISCLAIMER_TITLES.colourDisclaimer]);
            });
        });
    });
});
