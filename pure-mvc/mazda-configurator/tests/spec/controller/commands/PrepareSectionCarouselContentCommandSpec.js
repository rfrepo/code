(function () {
    'use strict';
    describe('PrepareSectionCarouselContentCommandSpec', function () {

            var command,
                facade,
                dataBuilder,
                navigationProxy,
                SEND_NOTIFICATION = 'sendNotification',
                TOTAL_CAROUSEL_ITEMS = 3,
                TOTAL_COLOURS = 7;

            describe('command class should exist ', function () {

                it('should instanced PrepareSectionCarouselContentCommand', function () {
                    expect(command).not.to.be(undefined);
                });
            });

            describe('execute', function () {

                it('should put the selected configurable item first in the array', function () {

                    var spy = getSpyFromSendNotification(
                        bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED, bmc.support.ConfigurableType.GRADE);

                    expect(spy.getCall(1).args[1][0].configurableItemVO).to.be(dataBuilder.GRADE_003_VO());

                });

                it('should send notification containing data for selection', function () {

                    var spy = getSpyFromSendNotification(
                        bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED, bmc.support.ConfigurableType.COLOUR);

                    expect(spy.getCall(1).args[1].length).to.be(TOTAL_COLOURS);
                });

                it('should send SET_PRICE_ON_CONFIGURABLE_ITEMS notification', function () {

                    var spy = getSpyFromSendNotification(
                        bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED, bmc.support.ConfigurableType.GRADE);

                    expect(spy.getCall(0).args[0]).to.be(bmc.support.NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS);
                    expect(spy.getCall(0).args[1].length).to.be(TOTAL_CAROUSEL_ITEMS);
                });

                it('should send CAROUSEL_REDRAW_DATA_AVAILABLE notification containing an array ' +
                    'of grade carousel item VOs', function () {

                    var spy = getSpyFromSendNotification(
                        bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED, bmc.support.ConfigurableType.GRADE);

                    expect(spy.getCall(1).args[0]).to.be(bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE);
                    expect(spy.getCall(1).args[1].length).to.be(TOTAL_CAROUSEL_ITEMS);
                });

                it('should send CAROUSEL_UPDATE_DATA_AVAILABLE notification containing an array ' +
                    'of grade carousel item VOs', function () {

                    var spy = getSpyFromSendNotification(
                        bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION, bmc.support.ConfigurableType.GRADE);

                    expect(spy.getCall(1).args[0]).to.be(bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE);
                    expect(spy.getCall(1).args[1].length).to.be(TOTAL_CAROUSEL_ITEMS);
                });

            });

            describe('Building carousel items', function () {

                it('should add "from" in front of price for grade and engine', function () {
                    var ConfigurableItemsVOs = [];

                    ConfigurableItemsVOs[0] = getSpyFromSendNotification(
                        bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                        bmc.support.ConfigurableType.GRADE);

                    ConfigurableItemsVOs[1] = getSpyFromSendNotification(
                        bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                        bmc.support.ConfigurableType.ENGINE);

                    expect(ConfigurableItemsVOs[0].getCall(1).args[0]).to.be(
                        bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE);
                    expect(ConfigurableItemsVOs[0].getCall(1).args[1][0].getFormattedPriceText()).to.contain(
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.FROM);

                    expect(ConfigurableItemsVOs[1].getCall(1).args[0]).to.be(
                        bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE);
                    expect(ConfigurableItemsVOs[1].getCall(1).args[1][0].getFormattedPriceText()).to.contain(
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.FROM);


                });
            });

            function getSpyFromSendNotification(notificationName, configurableType) {

                navigationProxy.activeSectionVO = createActiveSectionVO(configurableType);

                var spy = sinon.spy(command, SEND_NOTIFICATION);

                command.execute(createNotification(notificationName, configurableType));
                command[SEND_NOTIFICATION].restore();

                return spy;
            }

            function getDependencies() {
                return [
                    'support/NotificationNames',
                    'support/GlobalConfig',
                    'controller/command/PrepareSectionCarouselContentCommand',
                    'model/proxy/ActiveConfigurationProxy',
                    'model/proxy/data/StandardFeaturesProxy',
                    'model/proxy/data/ConfigurableItemProxy',
                    'model/proxy/data/BaseVehiclesProxy',
                    'support/ConfigurableType',
                    'model/proxy/NavigationProxy',
                    'model/vo/SimpleConfigurationVO'
                ];
            }

            function createNotification(notificationName, body) {

                return {
                    getBody: function () {
                        return {
                            type: body
                        };
                    },
                    getName: function () {
                        return notificationName;
                    }

                };
            }

            function createActiveSectionVO(currentSection) {
                return {
                    getType: function () {
                        return currentSection;
                    }
                };
            }

            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createPrepareSectionCarouselContentCommand() {
                command = new bmc.controller.command.PrepareSectionCarouselContentCommand();
                command.initializeNotifier(new Date().getTime());
                command.facade = facade;
            }

            function createAndPopulateProxies() {

                var colour = bmc.support.ConfigurableType.COLOUR,
                    gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.GRADE),
                    engineProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.ENGINE),
                    activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                    configurableItemProxy = new bmc.model.proxy.data.ConfigurableItemProxy(colour),
                    baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy(colour);

                navigationProxy = new bmc.model.proxy.NavigationProxy();

                facade.registerProxy(gradeProxy);
                facade.registerProxy(engineProxy);
                facade.registerProxy(navigationProxy);
                facade.registerProxy(baseVehiclesProxy);
                facade.registerProxy(configurableItemProxy);
                facade.registerProxy(activeConfigurationProxy);

                baseVehiclesProxy.setData(dataBuilder.baseVehicles);
                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
                gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
                engineProxy.data = [dataBuilder.ENGINE_1_VO(), dataBuilder.ENGINE_2_VO(), dataBuilder.ENGINE_3_VO()];
                configurableItemProxy.setData(setColourData());
            }

            function setColourData() {
                return [
                    dataBuilder.COLOUR_1_VO(),
                    dataBuilder.COLOUR_2_VO(),
                    dataBuilder.COLOUR_3_VO(),
                    dataBuilder.COLOUR_4_VO(),
                    dataBuilder.COLOUR_5_VO(),
                    dataBuilder.COLOUR_6_VO(),
                    dataBuilder.COLOUR_7_VO(),
                    dataBuilder.COLOUR_8_VO()
                ];
            }

            function resetGlobalConfig() {
                bmc.support.GlobalConfig.getInstance().instance = null;
                bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
                bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
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
                    createPrepareSectionCarouselContentCommand();
                    done();
                });
            });
        }

    )
    ;
})();
