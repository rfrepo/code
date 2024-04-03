(function () {
    'use strict';
    describe('SummarySectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            SEND_NOTIFICATION = 'sendNotification';

        describe('class should exist ', function () {

            it('should instance SummarySectionContentDelegate', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('generateContent', function () {

            it('should send notification containing data for selection', function () {

                var spyCall,
                    summaryData,
                    notificationName;

                sinon.spy(delegate.host, SEND_NOTIFICATION);

                delegate.generateContent();

                spyCall = delegate.host[SEND_NOTIFICATION].getCall(1);

                summaryData = spyCall.args[1];
                notificationName = spyCall.args[0];

                expect(notificationName).to.be(bmc.support.NotificationNames.SHOW_SUMMARY_PAGE);
                expect(summaryData.configuration).not.to.be(undefined);
                expect(summaryData.standardFeatures.length).to.be(60);
                expect(summaryData.accessoryUIVOs.length).to.be(3);

                delegate.host[SEND_NOTIFICATION].restore();
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                resetGlobalConfig();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createAndRegisterProxies();
                createdelegate(arguments[2]);
                done();
            });
        });

        function getDependencies() {
            return [

                'support/ConfigurableType',
                'model/proxy/ActiveConfigurationProxy',
                'controller/support/PrepareSectionContent/DataBuilders/SummarySectionDataBuilderStrategy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAndRegisterProxies() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                standardFeatureProxy = new bmc.model.proxy.data.StandardFeaturesProxy();

            facade.registerProxy(activeConfigurationProxy);
            facade.registerProxy(standardFeatureProxy);

            standardFeatureProxy.standardFeatures = dataBuilder.standardFeatures;
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
            activeConfigurationProxy.accessoryVOs =
                [dataBuilder.ACCESSORY_1_VO(), dataBuilder.ACCESSORY_3_VO()];
        }

        function createdelegate(SummarySectionDataBuilderStrategy) {
            delegate = new SummarySectionDataBuilderStrategy({
                facade: facade,
                sendNotification: function () {

                }
            });
        }

        function resetGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }
    });
})();
