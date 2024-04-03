(function () {
    'use strict';
    describe('AllConfigurableItemDataCommand', function () {

        var command,
            facade,
            GENERATE_NAVIGATION_DATA = 'generateNavigationData';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute', function () {

            it('should call the generateNavigationData on the navigationProxy', function () {

                var proxy = facade.retrieveProxy(bmc.model.proxy.NavigationProxy.NAME),
                    spy = sinon.spy(proxy, GENERATE_NAVIGATION_DATA);

                command.execute(createNotification());

                expect(spy.called).to.be(true);

                proxy[GENERATE_NAVIGATION_DATA].restore();

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
                'controller/command/startup/AllConfigurableItemDataCommand',
                'model/proxy/NavigationProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAllConfigurableItemDataCommand() {
            command = new bmc.controller.command.startup.AllConfigurableItemDataCommand();
            command.facade = facade;
        }

        function createNotification() {
            return { getBody: function () {
            }};
        }

        function createNavigationProxy() {
            facade.registerProxy(new bmc.model.proxy.NavigationProxy());
        }
    });
})();
