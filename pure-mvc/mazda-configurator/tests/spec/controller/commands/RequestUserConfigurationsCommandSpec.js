(function () {
    'use strict';
    describe('RequestUserConfigurationsCommand', function () {

        var command,
            facadeStub,
            userConfigurationsProxy;

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        function setupFacade(facade) {
            userConfigurationsProxy = new bmc.model.proxy.UserConfigurationsProxy();

            facade.registerProxy(userConfigurationsProxy);
        }

        beforeEach(function (done) {
            require([
                'support/NotificationNames',
                'model/proxy/UserConfigurationsProxy',
                'view/mediators/RecentConfigurationsMediator',
                'controller/command/RequestUserConfigurationsCommand'
            ], function () {
                command = new bmc.controller.command.RequestUserConfigurationsCommand();
                facadeStub = sinon.stub(command, 'getFacade');
                facadeStub.returns(createFacade());

                setupFacade(command.getFacade());

                done();
            });
        });

        afterEach(function () {
            facadeStub.restore();
        });

        describe('initializing', function () {
            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {
            it('should request all configurations from the proxy and send to the mediator', function () {
                sinon.spy(userConfigurationsProxy, 'load');

                command.execute();

                sinon.assert.called(userConfigurationsProxy.load);

                userConfigurationsProxy.load.restore();
            });
        });
    });
})();
