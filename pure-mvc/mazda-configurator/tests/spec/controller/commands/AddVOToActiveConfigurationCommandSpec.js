(function () {
    'use strict';
    describe('AddVOtoActiveConfigurationCommandSpec', function () {

        var command,
            facade,
            SET_CONFIGURABLE_ITEMVO = 'setConfigurableItemVO';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute', function () {

            it('should call the generateNavigationData on the navigationProxy', function () {

                var proxy = facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME),
                    spy = sinon.spy(proxy, SET_CONFIGURABLE_ITEMVO);

                command.execute(createNotification());

                expect(spy.called).to.be(true);

                proxy[SET_CONFIGURABLE_ITEMVO].restore();

            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createNavigationProxy();
                createAllConfigurableItemDataCommand();
                done();
            });
        });

        function getDependencies() {
            return [
                'controller/command/AddVOToActiveConfigurationCommand',
                'model/proxy/ActiveConfigurationProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAllConfigurableItemDataCommand() {
            command = new bmc.controller.command.AddVOToActiveConfigurationCommand();
            command.facade = facade;
        }

        function createNotification() {

            var note = {};

            note.getBody = function () {
                return {
                    getType: function () {
                        return {};
                    }
                };
            };

            return note;
        }

        function createNavigationProxy() {
            facade.registerProxy(new bmc.model.proxy.ActiveConfigurationProxy());
        }
    });
})();
