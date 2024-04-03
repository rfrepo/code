(function () {
    'use strict';

    describe('SectionContentUIMediator', function () {

        var facade,
            mediator,
            DISPLAY_CONTENT = 'displayContent',
            REMOVE_PREVIOUS_CONTENT = 'removePreviousContent',
            realHTMLTemplate;

        describe('initializing', function () {

            it('should be defined SectionContentUIMediator', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('listNotificationInterests', function () {

            it('should be interested in SECTION_DATA_AVAILABLE', function () {

                var sectionDataAvailable = bmc.support.NotificationNames.SECTION_DATA_AVAILABLE;
                expect(mediator.listNotificationInterests()).to.contain(sectionDataAvailable);
            });

            it('should be interested in PREPARING_SECTION_CONTENT', function () {

                var sectionDataAvailable = bmc.support.NotificationNames.PREPARING_SECTION_CONTENT;
                expect(mediator.listNotificationInterests()).to.contain(sectionDataAvailable);
            });
        });

        describe('handleNotification', function () {

            it('should display new section content on SECTION_DATA_AVAILABLE', function () {

                mediator.viewComponent.displayContent = function () {
                };

                var spy = sinon.spy(mediator.viewComponent, DISPLAY_CONTENT);

                mediator.handleNotification(createNotification(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE));

                expect(spy.called).to.be(true);

                mediator.viewComponent[DISPLAY_CONTENT].restore();
            });

            it('should clear previous content on view component on PREPARING_SECTION_CONTENT', function () {

                mediator.viewComponent.removePreviousContent = function () {
                };

                var spy = sinon.spy(mediator.viewComponent, REMOVE_PREVIOUS_CONTENT);

                mediator.handleNotification(createNotification(bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED));

                expect(spy.called).to.be(true);

                mediator.viewComponent[REMOVE_PREVIOUS_CONTENT].restore();
            });
        });

        describe('registerSectionStrategyMediator', function () {

            it('should register the grade strategy mediator', function () {

                mediator.registerSectionStrategyMediator(bmc.support.ConfigurableType.GRADE);

                expect(facade.hasMediator(bmc.view.mediators.ConfigurableItemSpecificationsUIMediator.NAME)
                ).to.be(true);

            });
        });

        afterEach(function () {
            bmc.support.HTMLTemplate = realHTMLTemplate;
        });

        beforeEach(function (done) {
            require([
                'view/mediators/ConfigurableItemSpecificationsUIMediator',
                'view/mediators/SectionContentUIMediator',
                'support/HTMLTemplate',
                'support/ConfigurableType'
            ], function () {
                mockHTMLTemplate();
                createFacade();
                mediator = new bmc.view.mediators.SectionContentUIMediator();
                facade.registerMediator(mediator);

                done();
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function mockHTMLTemplate() {
            realHTMLTemplate = bmc.support.HTMLTemplate;
            bmc.support.HTMLTemplate = {
                getSynchronously: function () {
                    return '';
                }
            };
        }

        function createNotification(notificationName) {
            return {
                getName: function () {
                    return notificationName;
                },

                getBody: function () {
                    return {
                        getSectionName: function () {
                            return '';
                        }
                    };
                }
            };
        }
    });
})();
