(function () {
    'use strict';
    describe('PriceCalculationProxy', function () {

        var proxy,
            facade,
            dataBuilder,

            PRICE = 24665,
            PRICE_INCLUDING_ACCESSORIES = 36900,
            TRIM_PRICE = 550;

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('caclulate', function () {

            it('should calculate the total price of an activeConfigurationVO', function () {

                var activeConfigurationVO = getActiveConfigurationProxy().getSimplified(),
                    price = proxy.calculate(activeConfigurationVO);

                expect(price).to.be(PRICE);
            });

            it('should calculate the total price of an activeConfigurationVO and accessories', function () {

                var price,
                    activeConfigurationVO = getActiveConfigurationProxy().getSimplified();

                activeConfigurationVO.accessoryVOs = dataBuilder.accessories;

                price = proxy.calculate(activeConfigurationVO);

                expect(price).to.be(PRICE_INCLUDING_ACCESSORIES);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createPriceCalculationProxy();
                createPopulatedActiveConfigurationProxy();
                done();
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder', 'support/StringUtils'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/PriceCalculationProxy',
                'model/proxy/ActiveConfigurationProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createPriceCalculationProxy() {
            proxy = new bmc.model.proxy.PriceCalculationProxy();
            facade.registerProxy(proxy);
        }

        function createPopulatedActiveConfigurationProxy() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            facade.registerProxy(activeConfigurationProxy);

            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.COLOUR, dataBuilder.COLOUR_6_VO());
            dataBuilder.COLOUR_6_VO().setPrice(TRIM_PRICE);
        }

        function getActiveConfigurationProxy() {
            return facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
        }
    });
})();
