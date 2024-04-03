(function () {
    'use strict';
    describe('SetPriceOnConfigurableItemsVOsCommand', function () {

            var command,
                facade,
                dataBuilder,
                ConfigurableType,
                globalConfig;

            describe('class should exist ', function () {

                it('should instanced SetPriceOnConfigurableItemsVOsCommand', function () {
                    expect(command).not.to.be(undefined);
                });
            });

            describe('execute', function () {

                it('should set the price on passed in item vos', function () {

                    command.execute(createNotification());
                    expect(dataBuilder.WHEEL_1_VO().getPrice()).to.be(0);
                });
            });

            before(function (done) {

                require(['../../../' + 'test/spec/support/data/DataBuilder', 'support/StringUtils'], function () {

                    globalConfig = bmc.support.GlobalConfig.getInstance();
                    globalConfig.applyLocaleData('en-gb');
                    dataBuilder = new bmc.support.data.DataBuilder();
                    done();
                });
            });

            after(function () {
                globalConfig.instance = undefined;
            });

            beforeEach(function (done) {

                require(getDependencies(), function () {

                    ConfigurableType = bmc.support.ConfigurableType;
                    createFacade();
                    createSetPricesOnConfigurableItemsVOsCommand();
                    createActiveConfigurationProxy();
                    done();
                });
            });

            function getDependencies() {
                return [
                    'controller/command/SetPriceOnConfigurableItemsVOsCommand',
                    'support/ConfigurableType'
                ];
            }

            function createNotification() {
                return {

                    getBody: function () {
                        return dataBuilder.WHEEL_1_VO();
                    }
                };
            }

            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createSetPricesOnConfigurableItemsVOsCommand() {
                command = new bmc.controller.command.SetPriceOnConfigurableItemsVOsCommand();
                command.facade = facade;
            }

            function createActiveConfigurationProxy() {

                var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
                facade.registerProxy(activeConfigurationProxy);

                activeConfigurationProxy.setConfigurableItemVO(
                    bmc.support.ConfigurableType.BODYSTYLE, dataBuilder.BODYSTYLE_2200_VO());

                activeConfigurationProxy.setConfigurableItemVO(
                    bmc.support.ConfigurableType.GRADE, dataBuilder.GRADE_001_VO());

                activeConfigurationProxy.setConfigurableItemVO(
                    bmc.support.ConfigurableType.ENGINE, dataBuilder.ENGINE_2_VO());

                activeConfigurationProxy.baseVehicle = dataBuilder.VEHICLE_6_VO();
            }
        }
    )
    ;
})();
