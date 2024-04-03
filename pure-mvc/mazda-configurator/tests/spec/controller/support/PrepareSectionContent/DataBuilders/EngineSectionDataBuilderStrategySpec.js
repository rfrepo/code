(function () {
    'use strict';
    describe('EngineSectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            TOTAL_ENGINES = 7,
            SEND_NOTIFICATION = 'sendNotification';

        describe('class should exist ', function () {

            it('should instance EngineSectionContentDelegate', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('generateContent', function () {

            it('should send notification containing data for selection', function () {

                var sentSectionDataVO,
                    notificationName,
                    spy = sinon.spy(delegate.host, SEND_NOTIFICATION);

                delegate.generateContent();

                sentSectionDataVO = spy.getCall(1).args[1];
                notificationName = spy.getCall(1).args[0];

                expect(notificationName).to.be(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE);
                expect(sentSectionDataVO.getSectionData().length).to.be(TOTAL_ENGINES);
                expect(sentSectionDataVO.getSectionData()[0]).to.be(dataBuilder.ENGINE_3_VO());
                expect(sentSectionDataVO.getSectionData()[0].getSpecifications().bodyStyle).to.be(
                    dataBuilder.BODYSTYLE_2200_ID());

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
                'controller/support/PrepareSectionContent/DataBuilders/EngineSectionDataBuilderStrategy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createAndRegisterProxies() {

            var engineProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.ENGINE),
                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            facade.registerProxy(engineProxy);
            facade.registerProxy(activeConfigurationProxy);

            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
            engineProxy.data = dataBuilder.engines;
        }

        function createdelegate() {
            delegate = new bmc.controller.support.PrepareSectionContent.DataBuilders.EngineSectionDataBuilderStrategy({
                facade: facade,
                sendNotification: function () {
                }
            });
        }
    });
})();
