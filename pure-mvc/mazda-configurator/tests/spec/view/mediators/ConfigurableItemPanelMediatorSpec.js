(function () {
    'use strict';

    describe('ConfigurableItemPanelMediator', function () {

        var facade,
            mediator,
            SET_DATA = 'setData',
            ITEM_SELECTED = 'carousel-item-selected',
            ON_ITEM_SELECTED = 'onItemSelected',
            SEND_NOTIFICATION = 'sendNotification',
            HANDLE_VIEW_COMPONENT_EVENTS = 'handleViewComponentEvents';

        describe('the mediator class should exist', function () {

            it('should instance ConfigurableItemPanelMediator', function () {
                expect(getMediator()).not.to.be(undefined);
            });
        });

        describe('to use the mediator with its ConfigurableItemCarousel', function () {

            it('should have a view component that is an instance of ConfigurableItemPanel', function () {

                var mediator = getMediator(),
                    configurableItemPanel = new bmc.view.components.ConfigurableItemPanel();

                mediator.setViewComponent(configurableItemPanel);
                expect(mediator.getViewComponent() instanceof bmc.view.components.ConfigurableItemPanel).to.be(true);
            });
        });

        describe('addViewComponentListeners', function () {

            it('should add a callback for onItemSelected', function () {

                var spy = getSpyForPassedInComponentCallBack(ON_ITEM_SELECTED);
                expect(spy.called).to.be(true);
            });
        });

        describe('listNotificationInterests', function () {

            it('should be interested in CAROUSEL_REDRAW_DATA_AVAILABLE', function () {

                var allConfigurableItemData = bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE;
                expect(mediator.listNotificationInterests()).to.contain(allConfigurableItemData);
            });

            it('should be interested in CAROUSEL_REDRAW_DATA_AVAILABLE', function () {

                var activeSectionUpdated = bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE;
                expect(mediator.listNotificationInterests()).to.contain(activeSectionUpdated);
            });
        });

        describe('handleNotification', function () {

            it('should respond to CAROUSEL_REDRAW_DATA_AVAILABLE by calling setData on view component', function () {

                var spy,
                    viewComponent = mediator.getViewComponent();

                viewComponent.setData = function () {
                };

                mediator.isSectionOfInterest = true;

                spy = sinon.spy(viewComponent, SET_DATA);

                mediator.handleNotification(
                    createMockNotification(bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE));

                viewComponent[SET_DATA].restore();

                expect(spy.called).to.be(true);
            });

          /*  it('should set isSectionOfInterest to true if current section is equal to accessories', function () {

                mediator.handleNotification(
                    createMockNotification(bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED));


                expect(mediator.isSectionOfInterest).to.be(true);
            });*/

        });

        describe('handleViewComponentEvents', function () {

            it('should sending a notification when item is selected', function () {

                var spy = sinon.spy(mediator, SEND_NOTIFICATION);

                mediator.handleViewComponentEvents(createViewEvent(ITEM_SELECTED), {});

                mediator[SEND_NOTIFICATION].restore();

                expect(spy.args[0][0]).to.be(bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION);
                expect(spy.args[0][1]).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {
            require([
                'view/components/ConfigurableItemPanel',
                'view/mediators/ConfigurableItemPanelMediator',
                'support/ConfigurableType',
                'support/HTMLAttributes',
                'support/NotificationNames',
                'model/proxy/ActiveConfigurationProxy'
            ], function () {

                createFacade();
                setupGlobalConfig();
                createAndRegisterMediator();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + bmc.support.HTMLAttributes.CONFIGURABLE_ITEM_CAROUSEL_ID).remove();
        });

        function getSpyForPassedInComponentCallBack(callBack) {

            mediator.handleViewComponentEvents = function () {
            };

            var spy = sinon.spy(mediator, HANDLE_VIEW_COMPONENT_EVENTS),
                viewComponent = mediator.getViewComponent();

            viewComponent[callBack]();

            mediator[HANDLE_VIEW_COMPONENT_EVENTS].restore();

            return spy;
        }

        function getMediator() {
            return facade.retrieveMediator(bmc.view.mediators.ConfigurableItemPanelMediator.NAME);
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createMediator() {
            return new bmc.view.mediators.ConfigurableItemPanelMediator();
        }

        function createAndRegisterMediator() {
            mediator = createMediator();
            facade.registerMediator(mediator);
        }

        function createMockNotification(notificationName) {
            return {
                getName: function () {
                    return notificationName;
                },
                getBody: function () {
                    return bmc.support.ConfigurableType.ACCESSORIES;
                }
            };
        }

        function createViewEvent(type) {
            return {
                type: type
            };
        }

        function setupGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

    });
})();