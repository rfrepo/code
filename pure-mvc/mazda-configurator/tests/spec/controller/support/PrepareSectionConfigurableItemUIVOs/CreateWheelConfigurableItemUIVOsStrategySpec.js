(function () {
    'use strict';
    describe('CreateWheelConfigurableItemUIVOsStrategy', function () {

            var strategy,
                facade,
                dataBuilder,

                SEND_NOTIFICATION = 'sendNotification';

            describe('class should exist ', function () {

                it('should instance CreateWheelConfigurableItemUIVOsStrategy', function () {
                    expect(strategy).not.to.be(undefined);
                });
            });

            describe('createAndDispatchConfigurableItemUIVOs', function () {

                it('should prevent the selected standard wheel\'s accessory equivalent from being included',
                    function () {

                        var spy = getSpyFromSentNotification();

                        expect(spy.getCall(1).args[1].length).to.be(1);
                        expect(spy.getCall(1).args[1][0].configurableItemVO).to.be(dataBuilder.WHEEL_1_VO());
                    });

                it('should prevent the selected accessory wheel\'s standard equivalent from being included',
                    function () {

                        setAccessoryWheelOnActiveConfigurationProxy();

                        var spy = getSpyFromSentNotification();
                        expect(spy.getCall(1).args[1].length).to.be(1);
                        expect(spy.getCall(1).args[1][0].configurableItemVO).to.be(dataBuilder.WHEEL_3_VO());
                    });
            });

            function getSpyFromSentNotification() {

                var spy = sinon.spy(strategy.host, SEND_NOTIFICATION);

                strategy.createAndDispatchConfigurableItemUIVOs();

                strategy.host[SEND_NOTIFICATION].restore();

                return spy;
            }

            function setAccessoryWheelOnActiveConfigurationProxy() {

                facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME)
                    .setConfigurableItemVO(bmc.support.ConfigurableType.WHEEL, dataBuilder.WHEEL_3_VO());
            }


            before(function (done) {

                require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                    dataBuilder = new bmc.support.data.DataBuilder();
                    done();
                });
            });

            beforeEach(function (done) {

                require(getDependencies(), function () {

                    resetGlobalConfig();
                    createFacade();
                    createAndPopulateProxies();
                    createCreateWheelConfigurableItemUIVOsStrategy();
                    done();
                });
            });


            function createAndPopulateProxies() {

                var wheel = bmc.support.ConfigurableType.WHEEL,
                    gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.GRADE),
                    activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                    configurableItemProxy = new bmc.model.proxy.data.ConfigurableItemProxy(wheel),
                    navigationProxy = new bmc.model.proxy.NavigationProxy();

                facade.registerProxy(gradeProxy);
                facade.registerProxy(navigationProxy);
                facade.registerProxy(configurableItemProxy);
                facade.registerProxy(activeConfigurationProxy);

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
                configurableItemProxy.setData(dataBuilder.wheels);
                navigationProxy.activeSectionVO = {
                    getType: function () {
                        return bmc.support.ConfigurableType.WHEEL;
                    }
                };
            }

            function getDependencies() {
                return [
                    'model/proxy/data/BaseVehiclesProxy',
                    'model/proxy/ActiveConfigurationProxy',
                    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateWheelConfigurableItemUIVOsStrategy'
                ];
            }


            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createCreateWheelConfigurableItemUIVOsStrategy() {

                var strategyPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;
                strategy = new strategyPackage.CreateWheelConfigurableItemUIVOsStrategy(
                    createHost(), createNotification());
            }

            function createHost() {

                return {
                    facade: facade,
                    sendNotification: function () {
                    }
                };
            }

            function createNotification() {

                return {
                    getName: function () {
                        return bmc.support.ConfigurableType.WHEEL;
                    }
                };
            }

            function resetGlobalConfig() {

                bmc.support.GlobalConfig.getInstance().instance = null;
                bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
                bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
            }
        }

    )
    ;
})();
