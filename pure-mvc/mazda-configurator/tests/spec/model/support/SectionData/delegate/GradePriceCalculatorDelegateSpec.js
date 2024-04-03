(function () {
    'use strict';
    describe('GradePriceCalculatorDelegate', function () {

        var facade,
            delegate,
            dataBuilder,

            GRADE_001_PRICE = 19595,
            GRADE_002_PRICE = 20395,
            GRADE_003_PRICE = 23515;


        describe('class should exist ', function () {

            it('should instance GradePriceCalculatorDelegate', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('calculatePrice', function () {

            it('should set a price on grade vo', function () {

                delegate.setData(dataBuilder.grades);
                delegate.calculatePrice();
                expect(dataBuilder.grades[0].getPrice()).to.be(GRADE_001_PRICE);
                expect(dataBuilder.grades[1].getPrice()).to.be(GRADE_002_PRICE);
                expect(dataBuilder.grades[2].getPrice()).to.be(GRADE_003_PRICE);
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
                'model/support/SectionData/delegate/GradePriceCalculatorDelegate',
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
            delegate = new bmc.model.support.sectionData.delegate.GradePriceCalculatorDelegate({facade: facade});
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
