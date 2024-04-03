//(function () {
//    'use strict';
//
//    describe('NavigationContainerMediator', function () {
//
//        var facade,
//            mediator,
//            realHTMLTemplate,
//            SET_DATA = 'setData',
//            SEND_NOTIFICATION = 'sendNotification',
//            activeConfigurationProxy,
//            vehiclePresentationProxy,
//            navigationProxy;
//
//        function createFacade() {
//            facade = puremvc.Facade.getInstance(new Date().getTime());
//        }
//
//        function mockHTMLTemplate() {
//            realHTMLTemplate = bmc.support.HTMLTemplate;
//            bmc.support.HTMLTemplate = {
//                getSynchronously: function () {
//                    return '';
//                }
//            };
//        }
//
//        function createMockNotification() {
//            return {
//                getName: function () {
//                    return bmc.support.NotificationNames.NAVIGATION_DATA_AVAILABLE;
//                },
//                getBody: function () {
//                    return {'type': 'engine'};
//                }
//            };
//        }
//
//        function populateActiveConfigurationProxy() {
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.BODYSTYLE,
//                {'id': '2200', 'name': 'hatchback', 'type': 'bodyStyle', getId: function () {return '2200'; }});
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.GRADE,
//                {'id': '001', 'name': 'se', 'type': 'grade', getId: function () {return '001'; }});
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.COLOUR,
//                {'id': 'A4D', 'name': 'red', 'type': 'colour', getId: function () {return 'A4D'; }});
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.wheel,
//                {'id': 'WHE_01', 'name': 'alloy', 'type': 'wheel', getId: function () {return 'WHE_01'; }});
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.ENGINE,
//                {'id': '600BMCXPE00', 'transmission': 'Manual', 'name': 'gearbox', 'type': 'engine'});
//            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.TRIM,
//                {'id': 'GN5', 'name': 'cloth', 'type': 'trim', getId: function () {return 'GN5'; }});
//        }
//
//        afterEach(function () {
//            bmc.support.HTMLTemplate = realHTMLTemplate;
//        });
//
//        beforeEach(function (done) {
//            require([
//                'view/components/NavigationContainer',
//                'view/mediators/NavigationContainerMediator',
//                'support/HTMLAttributes',
//                'support/HTMLTemplate',
//                'support/ConfigurableType'
//            ], function () {
//                mockHTMLTemplate();
//                createFacade();
//                mediator = new bmc.view.mediators.NavigationContainerMediator();
//                facade.registerMediator(mediator);
//
//                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
//                vehiclePresentationProxy = new bmc.model.proxy.VehiclePresentationProxy();
//                navigationProxy = new bmc.model.proxy.NavigationProxy();
//
//                facade.registerProxy(activeConfigurationProxy);
//                activeConfigurationProxy.facade = facade;
//
//                facade.registerProxy(vehiclePresentationProxy);
//                vehiclePresentationProxy.facade = facade;
//
//                populateActiveConfigurationProxy();
//
//                done();
//            });
//        });
//
//        describe('initializing NCM', function () {
//            it('should be defined', function () {
//                expect(mediator).not.to.be(undefined);
//            });
//
//            it('should have a view component', function () {
//                expect(mediator.getViewComponent()).not.to.be(undefined);
//            });
//        });
//
//        describe('listNotificationInterests', function () {
//            it('should be interested in NAVIGATION_DATA_AVAILABLE', function () {
//                var navigationDataAvailable = bmc.support.NotificationNames.NAVIGATION_DATA_AVAILABLE;
//                expect(mediator.listNotificationInterests()).to.contain(navigationDataAvailable);
//            });
//        });
//
//        describe('handleNotification', function () {
//            it('should respond to NAVIGATION_DATA_AVAILABLE by calling setData on view component', function () {
//                var viewComponent = mediator.getViewComponent(),
//                    spy = sinon.spy(viewComponent, SET_DATA);
//
//                mediator.handleNotification(createMockNotification());
//
//                expect(spy.called).to.be(true);
//
//                viewComponent[SET_DATA].restore();
//            });
//        });
//
//        describe('handling view component events', function () {
//            it('should send notification when nav dispatches the item clicked event', function () {
//                var spy = sinon.spy(mediator, SEND_NOTIFICATION);
//
//                mediator.getViewComponent().onItemSelected({type: 'mark'});
//
//                expect(spy.called).to.be(true);
//
//                mediator[SEND_NOTIFICATION].restore();
//            });
//        });
//    });
//})();
