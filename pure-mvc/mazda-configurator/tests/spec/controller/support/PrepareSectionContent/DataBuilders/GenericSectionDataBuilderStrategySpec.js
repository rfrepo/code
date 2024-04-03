(function () {
    'use strict';
    describe('GenericSectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            dataBuilder;

        describe('class should exist ', function () {

            it('should instance GenericSectionDataBuilderStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {
                createFacade();
                createAndRegisterProxies();
                createdelegate(arguments[3]);
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/ConfigurableItemProxy',
                'support/ConfigurableType',
                'model/proxy/ActiveConfigurationProxy',
                'controller/support/PrepareSectionContent/DataBuilders/GenericSectionDataBuilderStrategy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAndRegisterProxies() {

            var wheelsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.WHEEL),
                trimsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.TRIM),
                engineProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.ENGINE),
                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            facade.registerProxy(trimsProxy);
            facade.registerProxy(wheelsProxy);
            facade.registerProxy(engineProxy);
            facade.registerProxy(activeConfigurationProxy);

            wheelsProxy.data = dataBuilder.wheels;
            trimsProxy.data = dataBuilder.trims;
            engineProxy.data = dataBuilder.engines;
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());

        }

        function createdelegate(GenericSectionDataBuilderStrategy) {
            delegate = new GenericSectionDataBuilderStrategy({
                facade: facade,
                sendNotification: function () {
                }
            });
        }
    });
})();
