(function () {
    'use strict';
    describe('PrepareSectionContentCommand', function () {

            var command,
                facade,
                SEND_NOTIFICATION = 'sendNotification',
                CREATE_DATA_BUILDER_DELEGATE_FACTORY = 'createStrategyFactory',
                dataBuilder;

            describe('command class should exist ', function () {

                it('should instanced PrepareSectionContentCommand', function () {
                    expect(command).not.to.be(undefined);
                });
            });

            describe('execute', function () {

                it('should send a PREPARING_SECTION_CONTENT notification', function () {

                    command[CREATE_DATA_BUILDER_DELEGATE_FACTORY] = createMockFunctionThatReturnMockFactory();

                    var currentSection = bmc.support.ConfigurableType.GRADE,
                        spy = sinon.spy(command, SEND_NOTIFICATION);

                    command.execute(createNotification(currentSection));

                    expect(spy.called).to.be(true);

                    command[SEND_NOTIFICATION].restore();
                });

                it('should create the appropriate section data delegate', function () {

                    command[CREATE_DATA_BUILDER_DELEGATE_FACTORY] = createMockFunctionThatReturnMockFactory();

                    var currentSection = bmc.support.ConfigurableType.GRADE,
                        spy = sinon.spy(command, CREATE_DATA_BUILDER_DELEGATE_FACTORY);

                    command.execute(createNotification(currentSection));

                    expect(spy.called).to.be(true);

                    command[CREATE_DATA_BUILDER_DELEGATE_FACTORY].restore();
                });
            });

            function createMockFunctionThatReturnMockFactory() {

                var mock = function () {
                    return {
                        createStrategy: function () {
                            return {
                                generateContent: function () {

                                }
                            };
                        }
                    };
                };

                return mock;
            }

            function getDependencies() {
                return [
                    'controller/command/PrepareSectionContentCommand',
                    'model/proxy/ActiveConfigurationProxy',
                    'model/proxy/data/StandardFeaturesProxy',
                    'model/proxy/data/ConfigurableItemProxy',
                    'model/proxy/data/BaseVehiclesProxy',
                    'support/ConfigurableType',
                    'model/vo/SimpleConfigurationVO'
                ];
            }

            function createNotification(type) {
                return {
                    getBody: function () {
                        return type;
                    }
                };
            }

            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createPrepareSectionContentCommand() {
                command = new bmc.controller.command.PrepareSectionContentCommand();
                command.facade = facade;
                command.initializeNotifier(new Date().getTime());
            }

            function createAndPopulateProxies() {

                var colour = bmc.support.ConfigurableType.COLOUR,
                    standardFeatureProxy = new bmc.model.proxy.data.StandardFeaturesProxy(),
                    activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                    configurableItemProxy = new bmc.model.proxy.data.ConfigurableItemProxy(colour),
                    baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy(colour);

                facade.registerProxy(standardFeatureProxy);
                facade.registerProxy(baseVehiclesProxy);
                facade.registerProxy(configurableItemProxy);
                facade.registerProxy(activeConfigurationProxy);

                standardFeatureProxy.standardFeatures = dataBuilder.standardFeatures;
                baseVehiclesProxy.setData(dataBuilder.baseVehicles);
                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                configurableItemProxy.setData(setColourData());
            }

            function setColourData() {
                return [
                    dataBuilder.COLOUR_1_VO(),
                    dataBuilder.COLOUR_2_VO(),
                    dataBuilder.COLOUR_3_VO(),
                    dataBuilder.COLOUR_4_VO(),
                    dataBuilder.COLOUR_5_VO(),
                    dataBuilder.COLOUR_6_VO()
                ];
            }

            before(function (done) {

                require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                    dataBuilder = new bmc.support.data.DataBuilder();
                    done();
                });
            });

            beforeEach(function (done) {

                require(getDependencies(), function () {

                    createFacade();
                    createAndPopulateProxies();
                    createPrepareSectionContentCommand();
                    done();
                });
            });
        }

    )
    ;
})();
