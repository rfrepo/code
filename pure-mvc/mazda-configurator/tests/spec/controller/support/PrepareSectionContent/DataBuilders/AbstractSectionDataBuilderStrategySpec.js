(function () {
    'use strict';
    describe('AbstractSectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            gradeProxy,
            dataBuilder;


        describe('class should exist', function () {

            it('should instance AbstractSectionDataBuilderStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });

            it('should create and instance of a section data vo', function () {
                expect(delegate.sectionDataVO).not.to.be(undefined);
            });
        });

        describe('getProxy', function () {

            it('should retrieve a proxy by name', function () {

                var proxy = delegate.getProxy(bmc.support.ConfigurableType.GRADE);
                expect(proxy.getType()).to.be(bmc.support.ConfigurableType.GRADE);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createAndRegisterProxies();
                createAbstractSectionDataBuilderStrategy();
                done();
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });


        function getDependencies() {
            return [
                'model/proxy/data/ConfigurableItemProxy',
                'model/proxy/ActiveConfigurationProxy',
                'support/ConfigurableType',
                'support/NotificationNames',
                'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAndRegisterProxies() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.GRADE);

            facade.registerProxy(gradeProxy);
            facade.registerProxy(activeConfigurationProxy);

            gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
        }

        function createAbstractSectionDataBuilderStrategy() {

            delegate = new bmc.controller.support.PrepareSectionContent.DataBuilders.AbstractSectionDataBuilderStrategy(
                {facade: facade, sendNotification: function () {}},
                bmc.support.ConfigurableType.GRADE
            );
        }
    });
})();
