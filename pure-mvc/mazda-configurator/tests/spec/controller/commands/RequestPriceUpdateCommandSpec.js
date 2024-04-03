(function () {
    'use strict';
    describe('RequestPriceUpdateCommand', function () {

        var command,
            facadeStub,
            simplifiedConfiguration = {},
            priceCalculationProxy,
            activeConfigurationProxy;

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        function setupFacade(facade) {
            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            priceCalculationProxy = new bmc.model.proxy.PriceCalculationProxy();

            facade.registerProxy(activeConfigurationProxy);
            facade.registerProxy(priceCalculationProxy);

            BTesting.wrap(priceCalculationProxy, 'calculate');
            sinon.stub(activeConfigurationProxy, 'getSimplified').returns(simplifiedConfiguration);
        }

        beforeEach(function (done) {
            require([
                'support/NotificationNames',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/PriceCalculationProxy',
                'controller/command/RequestPriceUpdateCommand'
            ], function () {
                command = new bmc.controller.command.RequestPriceUpdateCommand();
                facadeStub = sinon.stub(command, 'getFacade');
                facadeStub.returns(createFacade());

                setupFacade(command.getFacade());

                done();
            });
        });

        afterEach(function () {
            facadeStub.restore();
            activeConfigurationProxy.getSimplified.restore();
            priceCalculationProxy.calculate.restore();
        });

        describe('initializing', function () {
            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {
            it('should pass a new simplified configuration to the Price proxy', function () {
                sinon.spy(priceCalculationProxy, 'calculate');

                command.execute();

                sinon.assert.calledWith(priceCalculationProxy.calculate, simplifiedConfiguration);

                priceCalculationProxy.calculate.restore();
            });
        });
    });
})();
