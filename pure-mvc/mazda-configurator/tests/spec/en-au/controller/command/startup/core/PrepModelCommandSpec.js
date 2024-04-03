'use strict';
(function () {
    describe('EN-AU - PrepModelCommand', function () {
        var command,
            facade;

        describe('initializing PrepModelCommand', function () {
            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {

            it('should contain disclaimer proxy in the facade', function () {
                command.execute();

                expect(facade.retrieveProxy(bmc.model.proxy.PriceDisplayProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.data.DisclaimerProxy.NAME)).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {
            require([
                '../en-au/' + 'controller/command/startup/core/PrepModelCommand',
                'support/GlobalConfig'
            ], function () {

                resetGlobalConfig();

                facade = puremvc.Facade.getInstance(new Date().getTime());
                command = new bmc.controller.command.startup.core.PrepModelCommand();
                command.facade = facade;

                done();
            });
        });

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

    });
})();
