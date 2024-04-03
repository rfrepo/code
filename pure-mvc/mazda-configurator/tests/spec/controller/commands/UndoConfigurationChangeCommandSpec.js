(function () {
    'use strict';
    describe('UndoConfigurationChangeCommand', function () {

        var command,
            facade,
            RESTORE_TO_PREVIOUS_CONFIGURATION = 'restoreToPreviousConfiguration';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute', function () {

            it('should call the restoreToPreviousConfiguration on the activeConfigurationProxy', function () {

                var spy,
                    proxy = facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME),
                    oldProxyMethod = proxy[RESTORE_TO_PREVIOUS_CONFIGURATION];

                proxy[RESTORE_TO_PREVIOUS_CONFIGURATION] = function () {
                };

                spy = sinon.spy(proxy, RESTORE_TO_PREVIOUS_CONFIGURATION);

                command.execute();

                proxy[RESTORE_TO_PREVIOUS_CONFIGURATION].restore();
                proxy[RESTORE_TO_PREVIOUS_CONFIGURATION] = oldProxyMethod;

                expect(spy.called).to.be(true);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createActiveConfigurationProxy();
                createAllConfigurableItemDataCommand();
                done();
            });
        });

        function getDependencies() {
            return [
                'controller/command/UndoConfigurationChangeCommand',
                'model/proxy/ActiveConfigurationProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAllConfigurableItemDataCommand() {
            command = new bmc.controller.command.UndoConfigurationChangeCommand();
            command.facade = facade;
        }

        function createActiveConfigurationProxy() {
            facade.registerProxy(new bmc.model.proxy.ActiveConfigurationProxy());
        }
    });
})();
