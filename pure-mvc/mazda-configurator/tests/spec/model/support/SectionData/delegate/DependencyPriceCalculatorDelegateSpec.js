(function () {
    'use strict';
    describe('DependencyPriceCalculatorDelegate', function () {

        var facade,
            delegate,
            dataBuilder,
            globalConfig,

            TRIM_INDEX = 3,
            TRIM_PRICE = 200,
            COLOUR_WITH_TAX_INDEX = 0,
            COLOUR_WITH_NO_TAX_INDEX = 6,
            COLOUR_PRICE_WITH_TAX = 759,
            COLOUR_PRICE_WITH_NO_TAX = 0;

        describe('class should exist ', function () {

            it('should instance DependencyPriceCalculatorDelegate', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('calculatePrice', function () {

            describe('colour price', function () {

                it('should set a price with no tax on colour vo', function () {

                    delegate.setData(dataBuilder.colours);
                    var colourVO = delegate.dataVOs[COLOUR_WITH_TAX_INDEX];
                    delegate.calculatePrice();

                    expect(colourVO.getPrice()).to.be(COLOUR_PRICE_WITH_NO_TAX);
                });

                it('should set a price with tax on colour vo', function () {

                    delegate.setData(dataBuilder.colours);
                    var colourVO = delegate.dataVOs[COLOUR_WITH_NO_TAX_INDEX];
                    delegate.calculatePrice();

                    expect(colourVO.getPrice()).to.be(COLOUR_PRICE_WITH_TAX);
                });
            });

            it('should set a price with wheel vo', function () {

                delegate.setData(dataBuilder.wheels);
                delegate.calculatePrice();

                expect(delegate.dataVOs[0].getPrice()).to.be(0);
            });

            it('should set a price with trim vo', function () {

                delegate.setData(dataBuilder.trims);
                var trimVO = delegate.dataVOs[TRIM_INDEX];
                delegate.calculatePrice();

                expect(trimVO.getPrice()).to.be(TRIM_PRICE);
            });

            it('should set the price with wheel vo without any price dependencies', function () {
                var wheelVO = dataBuilder.wheels;

                wheelVO[0].dependencies.pricePreconditions = [];

                delegate.setData(wheelVO);
                delegate.calculatePrice();

                expect(delegate.dataVOs[0].getPrice()).to.be(0);
            });


        });


        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder', 'support/GlobalConfig'], function () {
                dataBuilder = new bmc.support.data.DataBuilder();
                globalConfig = bmc.support.GlobalConfig.getInstance();
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

        afterEach(function (done) {
            bmc.model.support.DependencyStepper.setFoundPreconditionVO(undefined);
            done();
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function getDependencies() {
            return [
                'model/support/SectionData/delegate/DependencyPriceCalculatorDelegate',
                'model/support/DependencyStepper',
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

            delegate = new bmc.model.support.sectionData.delegate.DependencyPriceCalculatorDelegate({facade: facade});
        }

        function createPopulatedActiveConfigurationProxy() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            facade.registerProxy(activeConfigurationProxy);
            activeConfigurationProxy.baseVehicle = dataBuilder.VEHICLE_1_VO();
            activeConfigurationProxy.extractMSCVOFromBaseVehicle();
        }

        function createPopulatedBaseVehiclesProxy() {

            var proxy = new bmc.model.proxy.data.BaseVehiclesProxy();
            proxy.setData(dataBuilder.baseVehicles);
            facade.registerProxy(proxy);
        }
    });
})();
