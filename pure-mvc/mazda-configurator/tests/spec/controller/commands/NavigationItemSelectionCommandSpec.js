(function () {
    'use strict';
    describe('NavigationItemSelectionCommand', function () {

        var command,
            facade,
            UPDATE_ACTIVE_SECTION_VO = 'updateActiveSectionVO';

        function getDependencies() {
            return [
                'controller/command/NavigationItemSelectionCommand',
                'model/proxy/NavigationProxy',
                'support/NotificationNames',
                'support/tracking/TrackingService',
                'support/tracking/SophusTrackingId',
                'support/tracking/SophusTrackingSerializer',
                'support/tracking/SophusTrackingMethod'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createNavigationProxy() {
            facade.registerProxy(new bmc.model.proxy.NavigationProxy());
        }

        function getNavigationProxy() {
            return facade.retrieveProxy(bmc.model.proxy.NavigationProxy.NAME);
        }

        function createNavigationItemSelectionCommand() {
            command = new bmc.controller.command.NavigationItemSelectionCommand();
            command.facade = facade;
        }

        function createMockNotification(type) {
            return {
                getBody: function () {
                    return {
                        type: type,
                        getType: function () {
                            return type;
                        }
                    };
                }
            };
        }

        function createTracking() {
            var tracking = new bmc.support.tracking.TrackingService(
                bmc.support.tracking.SophusTrackingId,
                bmc.support.tracking.SophusTrackingSerializer,
                bmc.support.tracking.SophusTrackingMethod
            );
            tracking.setEnabled(false);

            window.burrows = {
                app: {
                    tracking: tracking
                }
            };
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createNavigationProxy();
                createNavigationItemSelectionCommand();
                createTracking();
                done();
            });
        });

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute ', function () {

            it('should set the selected navigation vo to the navigation proxy', function () {

                var proxy = getNavigationProxy(),
                    spy = sinon.spy(proxy, UPDATE_ACTIVE_SECTION_VO);

                command.execute(createMockNotification('engine'));

                expect(spy.called).to.be(true);

                proxy[UPDATE_ACTIVE_SECTION_VO].restore();
            });
        });


    });
})();
