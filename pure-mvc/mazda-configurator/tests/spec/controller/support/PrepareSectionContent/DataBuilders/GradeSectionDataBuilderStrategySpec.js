(function () {
    'use strict';
    describe('GradeSectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            TOTAL_STANDARD_FEATURES = 60,
            SEND_NOTIFICATION = 'sendNotification';

        describe('class should exist ', function () {

            it('should instance GradeSectionDataBuilderStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('generateContent', function () {

            it('should send notification containing data for selection', function () {

                var sentSectionDataVO,
                    notificationName,
                    spy = sinon.spy(delegate.host, SEND_NOTIFICATION);

                delegate.generateContent();

                sentSectionDataVO = spy.getCall(0).args[1];
                notificationName = spy.getCall(0).args[0];

                expect(notificationName).to.be(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE);
                expect(sentSectionDataVO.getSectionData().length).to.be(TOTAL_STANDARD_FEATURES);

                delegate.host[SEND_NOTIFICATION].restore();
            });

            it('should send notification containing just available data for selection', function () {
                var sentSectionDataVO,
                    notificationName,
                    spy = sinon.spy(delegate.host, SEND_NOTIFICATION),
                    gradeVOs = facade.retrieveProxy(bmc.support.ConfigurableType.GRADE).data;

                gradeVOs[0].dependencies.availabilityPreconditions.shift();

                delegate.generateContent();

                sentSectionDataVO = spy.getCall(0).args[1];
                notificationName = spy.getCall(0).args[0];

                expect(notificationName).to.be(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE);
                expect(sentSectionDataVO.getSectionData().length).to.be(TOTAL_STANDARD_FEATURES);
                expect(sentSectionDataVO.getGradeIds().length).to.be(2);

                delegate.host[SEND_NOTIFICATION].restore();
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
                resetGlobalConfig();
                createAndRegisterProxies();
                createdelegate();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/ConfigurableItemProxy',
                'support/ConfigurableType',
                'model/proxy/ActiveConfigurationProxy',
                'controller/support/PrepareSectionContent/DataBuilders/GradeSectionDataBuilderStrategy'
            ];
        }

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
            bmc.support.GlobalConfig.getInstance().setBodyStyleVO(dataBuilder.BODYSTYLE_2200_VO());
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAndRegisterProxies() {

            var gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.GRADE),
                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                standardFeatureProxy = new bmc.model.proxy.data.StandardFeaturesProxy(),
                baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy();

            facade.registerProxy(gradeProxy);
            facade.registerProxy(activeConfigurationProxy);
            facade.registerProxy(standardFeatureProxy);
            facade.registerProxy(baseVehiclesProxy);

            standardFeatureProxy.standardFeatures = dataBuilder.standardFeatures;
            baseVehiclesProxy.setData(dataBuilder.baseVehicles);
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
            gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
        }

        function createdelegate() {
            delegate = new bmc.controller.support.PrepareSectionContent.DataBuilders.GradeSectionDataBuilderStrategy({
                facade: facade,
                sendNotification: function () {
                }
            });
        }
    });
})();
