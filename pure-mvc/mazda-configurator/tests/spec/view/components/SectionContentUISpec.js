(function () {
    'use strict';

    describe('SectionContentUI', function () {

        var ui,

            BODY = 'body',
            DISPLAY = 'display',
            UNKNOWN_SECTION = 'unkown-section',
            DISCLAIMER_TEXT = 'test disclaimer text',
            SECTION_DISCLAIMER_ID = 'section-disclaimer',
            TEMPLATE_HTML = '<div id="section-disclaimer"></div>';


        describe('initialise', function () {

            it('should be defined', function () {
                expect(ui).not.to.be(undefined);
            });
        });

        describe('displayContent', function () {

            describe('displayMainSectionContent', function () {

                it('should create and cache a grade content strategy to display content', function () {

                    var sectionDataVO = createSectionDataVO(),
                        sectionName = sectionDataVO.getSectionName(),
                        gradeStrategyClass = bmc.view.components.support.SectionContent.GradeContentStrategy;
                    ui.displayContent(sectionDataVO);

                    expect(ui.contentDisplayStrategy instanceof gradeStrategyClass).to.be(true);
                    expect(ui.strategyCache[sectionName] instanceof gradeStrategyClass).to.be(true);
                });

                it('should call the display method on the contentDisplayStrategy', function () {

                    var spy = createAndCallMethod(DISPLAY);
                    expect(spy.called).to.be(true);
                });

                it('should create the a null content strategy in the event that there is no strategy ' +
                    'for the selected section', function () {

                    var sectionDataVO = createSectionDataVO(),
                        nullStrategyClass = bmc.view.components.support.SectionContent.NullContentStrategy;

                    sectionDataVO.getSectionName = function () {
                        return UNKNOWN_SECTION;
                    };

                    ui.displayContent(sectionDataVO);

                    expect(ui.contentDisplayStrategy instanceof nullStrategyClass).to.be(true);
                    expect(ui.strategyCache[UNKNOWN_SECTION] instanceof nullStrategyClass).to.be(true);
                });
            });

            describe('displayDisclaimerContent', function () {

                it('should render the section disclaimer text', function () {

                    var renderedHTML,
                        sectionVO = createSectionDataVO();

                    sectionVO.setDisclaimer(DISCLAIMER_TEXT);

                    ui.displayContent(sectionVO);

                    renderedHTML = jQuery('#' + SECTION_DISCLAIMER_ID).html();

                    expect(renderedHTML).to.contain(DISCLAIMER_TEXT);
                });
            });
        });

        beforeEach(function (done) {

            require([
                'view/components/SectionContentUI',
                'support/HTMLAttributes',
                'view/components/support/SectionContent/GradeContentStrategy'
            ], function () {

                createDomElements();

                ui = new bmc.view.components.SectionContentUI(
                    '#' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID);
                done();
            });
        });


        function createAndCallMethod(callBack) {

            ui.displayContent(createSectionDataVO());

            var spy = sinon.spy(ui.contentDisplayStrategy, callBack);

            ui.displayContent(createSectionDataVO());

            ui.contentDisplayStrategy[callBack].restore();

            return spy;
        }

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

        afterEach(function () {
            jQuery('#' + SECTION_DISCLAIMER_ID).remove();
        });

    });
})();