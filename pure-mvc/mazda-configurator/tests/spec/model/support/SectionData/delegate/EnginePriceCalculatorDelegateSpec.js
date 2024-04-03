(function () {
    'use strict';
    describe('EnginePriceCalculatorDelegate', function () {

        var facade,
            delegate,
            dataBuilder,

            ENGINE_PRICE = 19595;


        describe('class should exist ', function () {

            it('should instance EnginePriceCalculatorDelegate', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('calculatePrice', function () {

            it('should set a price on engine vo', function () {

                delegate.setData(dataBuilder.engines);
                delegate.calculatePrice();
                expect(dataBuilder.engines[0].getPrice()).to.be(ENGINE_PRICE);
            });
        });


        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder', 'support/GlobalConfig'], function () {
                dataBuilder = new bmc.support.data.DataBuilder();
                bmc.support.GlobalConfig.instance = null;
                var globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.applyLocaleData('en-gb');
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createProxies();
                createGradePriceCalculatorDelegate();
                done();
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function getDependencies() {
            return [
                'model/support/SectionData/delegate/EnginePriceCalculatorDelegate',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/data/BaseVehiclesProxy',
                'support/ConfigurableType'
            ];
        }

        function createProxies() {

            createPopulatedActiveConfigurationProxy();
            createPopulatedBaseVehiclesProxy();
        }


        function createGradePriceCalculatorDelegate() {
            delegate = new bmc.model.support.sectionData.delegate.EnginePriceCalculatorDelegate({facade: facade});
        }


        function createPopulatedActiveConfigurationProxy() {

            var proxy = new bmc.model.proxy.ActiveConfigurationProxy();
            facade.registerProxy(proxy);
            proxy.setConfigurableItemVO(bmc.support.ConfigurableType.BODYSTYLE, dataBuilder.BODYSTYLE_2200_VO());
        }

        function createPopulatedBaseVehiclesProxy() {

            var proxy = new bmc.model.proxy.data.BaseVehiclesProxy();
            proxy.setData(dataBuilder.baseVehicles);
            facade.registerProxy(proxy);
        }
    });
})();
