(function () {
    'use strict';
    describe('UpdateUserConfigurationsCommand', function () {

        var command,
            facadeStub,
            userConfigurationsProxy,
            activeConfigurationsProxy;

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        function setupFacade(facade) {
            userConfigurationsProxy = new bmc.model.proxy.UserConfigurationsProxy();
            activeConfigurationsProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            facade.registerProxy(userConfigurationsProxy);
            facade.registerProxy(activeConfigurationsProxy);
        }

        beforeEach(function (done) {
            require([
                'support/NotificationNames',
                'model/proxy/UserConfigurationsProxy',
                'model/proxy/ActiveConfigurationProxy',
                'model/vo/SimpleConfigurationVO',
                'controller/command/UpdateUserConfigurationsCommand'
            ], function () {
                command = new bmc.controller.command.UpdateUserConfigurationsCommand();
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
            it('should gather a thumbnailURL and set it in the userConfigurationsProxy', function () {
                var simpleVO = new bmc.model.vo.SimpleConfigurationVO();

                BTesting.wrap(userConfigurationsProxy, 'save');
                sinon.spy(userConfigurationsProxy, 'save');
                sinon.stub(activeConfigurationsProxy, 'getSimplified').returns(simpleVO);

                command.execute();

                expect(userConfigurationsProxy.save.hasBeenCalled).to.be(true);
                sinon.assert.calledWith(userConfigurationsProxy.save, simpleVO);

                userConfigurationsProxy.save.restore();
                userConfigurationsProxy.save.restore();
            });
        });
    });
})();
