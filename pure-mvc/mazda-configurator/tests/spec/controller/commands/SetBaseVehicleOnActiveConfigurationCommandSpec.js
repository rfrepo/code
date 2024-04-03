(function () {
    'use strict';
    describe('SetBaseVehicleOnActiveConfigurationCommand', function () {

        var command,
            facade,
            activeConfigurationProxy,
            SET_BASE_VEHICLE_METHOD = 'setBaseVehicleVO',
            ACTIVE_CONFIGURATION_PROXY_NAME = 'ActiveConfigurationProxy';


        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createMockActiveConfigurationProxy();
                createSetBaseVehicleOnActiveConfigurationCommand();
                done();
            });
        });

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute', function () {

            it('should set the new base vehicle on the active configuration', function () {
                var spy = sinon.spy(activeConfigurationProxy, SET_BASE_VEHICLE_METHOD);

                command.execute(createMockNotification());

                expect(spy.called).to.be(true);
                activeConfigurationProxy[SET_BASE_VEHICLE_METHOD].restore();
            });
        });


        function getDependencies() {
            return [
                'controller/command/SetBaseVehicleOnActiveConfigurationCommand'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createSetBaseVehicleOnActiveConfigurationCommand() {
            command = new bmc.controller.command.SetBaseVehicleOnActiveConfigurationCommand();
            command.facade = facade;
        }

        function createMockActiveConfigurationProxy() {

            activeConfigurationProxy = {};

            activeConfigurationProxy.getProxyName = function () {
                return ACTIVE_CONFIGURATION_PROXY_NAME;
            };
            activeConfigurationProxy.setBaseVehicleVO = activeConfigurationProxy.initializeNotifier =
                activeConfigurationProxy.onRegister = function () {};

            facade.registerProxy(activeConfigurationProxy);
        }

        function createMockNotification() {
            return  {
                getBody: function () {
                }
            };
        }
    });
})
    ();
