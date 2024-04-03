(function () {
    'use strict';

    describe('ConfigurableItemCarouselMediator', function () {

        var facade,
            mediator,
            UPDATE_UI = 'updateUI',
            SET_DATA = 'setData',
            ITEM_SELECTED = 'carousel-item-selected',
            ON_ITEM_SELECTED = 'onItemSelected',
            ON_CAROUSEL_UPDATE = 'onCarouselUpdate',
            SEND_NOTIFICATION = 'sendNotification',
            CAROUSEL_UPDATED = 'carousel-position-updated',
            HANDLE_VIEW_COMPONENT_EVENTS = 'handleViewComponentEvents';

        describe('to use the mediator', function () {

            it('should be defined', function () {
                expect(getMediator()).not.to.be(undefined);
            });
        });

        describe('to use the mediator with its ConfigurableItemCarousel', function () {

            it('should have a view component that is an instance of ConfigurableItemCarousel', function () {

                var mediator = getMediator(),
                    configurableItemCarouselUI = new bmc.view.components.ConfigurableItemCarousel();

                mediator.setViewComponent(configurableItemCarouselUI);
                expect(mediator.getViewComponent()).not.to.be(bmc.view.components.ConfigurableItemCarousel);
            });
        });

        describe('addViewComponentListeners', function () {

            it('should add a callback for onItemSelected', function () {

                var spy = getSpyForPassedInComponentCallBack(ON_ITEM_SELECTED);
                expect(spy.called).to.be(true);
            });

            it('should add a callback for onCarouselUpdate', function () {

                var spy = getSpyForPassedInComponentCallBack(ON_CAROUSEL_UPDATE);
                expect(spy.called).to.be(true);
            });
        });

        describe('listNotificationInterests', function () {

            it('should be interested in CAROUSEL_REDRAW_DATA_AVAILABLE', function () {

                var allConfigurableItemData = bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE;
                expect(mediator.listNotificationInterests()).to.contain(allConfigurableItemData);
            });

            it('should be interested in CAROUSEL_UPDATE_DATA_AVAILABLE', function () {

                var allConfigurableItemData = bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE;
                expect(mediator.listNotificationInterests()).to.contain(allConfigurableItemData);
            });
        });

        describe('handleNotification', function () {

            it('should respond to CAROUSEL_REDRAW_DATA_AVAILABLE by calling setData on view component', function () {

                var spy,
                    viewComponent = mediator.getViewComponent();

                viewComponent.setData = function () {
                };
                spy = sinon.spy(viewComponent, SET_DATA);

                mediator.handleNotification(
                    createMockNotification(bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE));

                viewComponent[SET_DATA].restore();

                expect(spy.called).to.be(true);
            });

            it('should respond to CAROUSEL_UPDATE_DATA_AVAILABLE by calling updateUI on view component', function () {

                var spy,
                    viewComponent = mediator.getViewComponent();

                viewComponent.updateUI = function () {
                };
                spy = sinon.spy(viewComponent, UPDATE_UI);

                mediator.handleNotification(
                    createMockNotification(bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE));

                viewComponent[UPDATE_UI].restore();

                expect(spy.called).to.be(true);
            });
        });

        describe('handleViewComponentEvents', function () {

            it('should sending a notification when item is selected', function () {

                var spy = sinon.spy(mediator, SEND_NOTIFICATION);

                mediator.handleViewComponentEvents(createViewEvent(ITEM_SELECTED), {});

                mediator[SEND_NOTIFICATION].restore();

                expect(spy.args[0][0]).to.be(bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION);
                expect(spy.args[0][1]).not.to.be(undefined);
            });

            it('should sending a notification when carousel is updated', function () {

                var spy = sinon.spy(mediator, SEND_NOTIFICATION);

                mediator.handleViewComponentEvents(createViewEvent(CAROUSEL_UPDATED), {});

                mediator[SEND_NOTIFICATION].restore();

                expect(spy.args[0][0]).to.be(bmc.support.NotificationNames.CAROUSEL_UPDATED);
                expect(spy.args[0][1]).not.to.be(undefined);
            });

        });

        beforeEach(function (done) {
            require([
                'view/components/ConfigurableItemCarousel',
                'view/mediators/ConfigurableItemCarouselMediator',
                'support/HTMLAttributes',
                'support/NotificationNames',
                'model/proxy/ActiveConfigurationProxy'
            ], function () {

                setupDom();

                createFacade();
                setupGlobalConfig();
                createAndRegisterProxies();
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

        function setupDom() {
            var HTMLAttributes = bmc.support.HTMLAttributes,
                carouselEl = document.createElement('section'),
                carOptionEl = document.createElement('div'),
                itemsEl = document.createElement('ul');

            carouselEl.id = HTMLAttributes.CONFIGURABLE_ITEM_CAROUSEL_ID;
            carouselEl.classNames = HTMLAttributes.CONFIGURATOR_CAROUSEL_CLASS;

            carOptionEl.classNames = HTMLAttributes.CAR_OPTIONS_CLASS;

            itemsEl.classNames = HTMLAttributes.CAROUSEL_ITEMS_CLASS;

            carOptionEl.appendChild(itemsEl);
            carouselEl.appendChild(carOptionEl);

            document.body.appendChild(carouselEl);
        }

        function getMediator() {
            return facade.retrieveMediator(bmc.view.mediators.ConfigurableItemCarouselMediator.NAME);
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createMediator() {
            return new bmc.view.mediators.ConfigurableItemCarouselMediator();
        }

        function createAndRegisterMediator() {
            mediator = createMediator();
            facade.registerMediator(mediator);
        }

        function createAndRegisterProxies() {

            facade.registerProxy(new bmc.model.proxy.ActiveConfigurationProxy());
        }

        function createMockNotification(notificationName) {
            return {
                getName: function () {
                    return notificationName;
                },
                getBody: function () {
                    return {
                        getConfigurableItemVOs: function () {

                        }
                    };
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