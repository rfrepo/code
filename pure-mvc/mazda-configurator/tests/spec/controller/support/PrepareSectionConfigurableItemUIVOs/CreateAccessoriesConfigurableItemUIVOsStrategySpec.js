(function () {
    'use strict';
    describe('CreateAccessoriesConfigurableItemUIVOsStrategy', function () {

            var strategy,
                facade,
                dataBuilder,

                SEND_NOTIFICATION = 'sendNotification';

            describe('class should exist ', function () {

                it('should instance CreateAccessoriesConfigurableItemUIVOsStrategy', function () {
                    expect(strategy).not.to.be(undefined);
                });
            });

            describe('createAndDispatchConfigurableItemUIVOs', function () {

                it('should include accessory vos and option packs', function () {

                    var spy = getSpyFromSentNotification();

                    expect(spy.getCall(1).args[1][0].configurableItemVO).to.be(dataBuilder.ACCESSORY_1_VO());
                    expect(spy.getCall(1).args[1][0].getSelected()).not.to.be(undefined);

                    expect(spy.getCall(1).args[1][1].configurableItemVO).to.be(dataBuilder.OPTIONPACK_1_VO());
                    expect(spy.getCall(1).args[1][1].getSelected()).not.to.be(undefined);
                });
            });

            function getSpyFromSentNotification() {

                var spy = sinon.spy(strategy.host, SEND_NOTIFICATION);

                strategy.createAndDispatchConfigurableItemUIVOs();

                strategy.host[SEND_NOTIFICATION].restore();

                return spy;
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

                var gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.GRADE),
                    activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                    accessoriesProxy = new bmc.model.proxy.data.AccessoriesProxy(),
                    optionPackProxy = new bmc.model.proxy.data.OptionPackProxy(),
                    navigationProxy = new bmc.model.proxy.NavigationProxy();

                facade.registerProxy(gradeProxy);
                facade.registerProxy(navigationProxy);
                facade.registerProxy(accessoriesProxy);
                facade.registerProxy(optionPackProxy);
                facade.registerProxy(activeConfigurationProxy);

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
                activeConfigurationProxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());

                gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
                accessoriesProxy.data = [dataBuilder.ACCESSORY_1_VO()];
                optionPackProxy.data = [dataBuilder.OPTIONPACK_1_VO()];

                navigationProxy.activeSectionVO = {
                    getType: function () {
                        return bmc.support.ConfigurableType.ACCESSORIES;
                    }
                };
            }

            function getDependencies() {
                return [
                    'model/proxy/data/AccessoriesProxy',
                    'model/proxy/data/OptionPackProxy',
                    'model/proxy/ActiveConfigurationProxy',
                    'controller/support/PrepareSectionConfigurableItemUIVOs/' +
                        'CreateAccessoriesConfigurableItemUIVOsStrategy'
                ];
            }


            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createCreateWheelConfigurableItemUIVOsStrategy() {

                var strategyPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;
                strategy = new strategyPackage.CreateAccessoriesConfigurableItemUIVOsStrategy(
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
