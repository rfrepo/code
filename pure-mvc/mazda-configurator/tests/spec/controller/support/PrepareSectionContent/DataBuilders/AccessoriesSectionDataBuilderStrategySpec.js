(function () {
    'use strict';
    describe('AccessoriesSectionDataBuilderStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            SEND_NOTIFICATION = 'sendNotification';

        describe('class should exist ', function () {

            it('should instance AccessoriesSectionDataBuilderStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('generateContent', function () {

            it('should send notification explaining absence of option packs and accessories', function () {

                var sentSectionDataVO,
                    notificationName,
                    spy = sinon.spy(delegate.host, SEND_NOTIFICATION);

                delegate.generateContent();

                sentSectionDataVO = spy.getCall(0).args[1];
                notificationName = spy.getCall(0).args[0];

                expect(notificationName).to.be(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE);
                expect(sentSectionDataVO.getSectionData()).to.have.property('message');
                expect(sentSectionDataVO.getSectionData().hasAccessoriesAndOptionPacks).to.be(false);

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
                createStrategy();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/OptionPackProxy',
                'model/proxy/data/AccessoriesProxy',
                'model/proxy/ActiveConfigurationProxy',
                'controller/support/PrepareSectionContent/DataBuilders/AccessoriesSectionDataBuilderStrategy'
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

            var optionPacksProxy = new bmc.model.proxy.data.OptionPackProxy(),
                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                accessoriesProxy = new bmc.model.proxy.data.AccessoriesProxy();

            facade.registerProxy(optionPacksProxy);
            facade.registerProxy(accessoriesProxy);
            facade.registerProxy(activeConfigurationProxy);

            optionPacksProxy.setData([]);
            accessoriesProxy.setData([]);
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
        }

        function createStrategy() {
            delegate =
                new bmc.controller.support.PrepareSectionContent.DataBuilders.AccessoriesSectionDataBuilderStrategy(
                    createConfigurationObject(), bmc.support.ConfigurableType.ACCESSORIES);

        }

        function createConfigurationObject() {
            return {
                facade: facade,
                sendNotification: function () {
                }
            };
        }
    });
})
    ();
