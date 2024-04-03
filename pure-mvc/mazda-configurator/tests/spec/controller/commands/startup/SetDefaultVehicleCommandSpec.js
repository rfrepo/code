'use strict';
(function () {
    describe('SetDefaultVehicleCommand', function () {

        var MODEL_ID = 'M6',
            LOCALE = 'en-gb',
            command,
            facade,
            dataBuilder,
            userConfigurationsProxy,
            sessionProxy;

        function getDependencies() {
            return [
                'controller/command/startup/SetDefaultVehicleCommand',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/UserConfigurationsProxy',
                'model/proxy/data/BaseVehiclesProxy',
                'model/proxy/data/ConfigurableItemProxy',
                'model/proxy/SessionProxy',
                'model/vo/data/ConfigurableItemVO',
                'model/vo/data/ModelVO',
                'model/vo/SimpleConfigurationVO',
                'support/NotificationNames'
            ];
        }

        function createCommand() {
            command = new bmc.controller.command.startup.SetDefaultVehicleCommand();
            command.initializeNotifier(new Date().getTime());
        }

        function createFacade() {
            var modelVO = new bmc.model.vo.data.ModelVO();

            sessionProxy = new bmc.model.proxy.SessionProxy();
            BTesting.wrap(sessionProxy, 'sendNotification');

            modelVO.setModelId('M6');
            modelVO.setBodyStyle('2200');
            sessionProxy.setModelVO(modelVO);

            userConfigurationsProxy = new bmc.model.proxy.UserConfigurationsProxy();

            facade = puremvc.Facade.getInstance(String(new Date().getTime()));
            facade.registerProxy(new bmc.model.proxy.ActiveConfigurationProxy());
            facade.registerProxy(new bmc.model.proxy.data.BaseVehiclesProxy());
            facade.registerProxy(userConfigurationsProxy);
            facade.registerProxy(new bmc.model.proxy.data.ConfigurableItemProxy('colour'));
            facade.registerProxy(sessionProxy);

            command.facade = facade;
        }

        function getSimpleConfiguration(baseVehicleId, parts) {
            var simpleConfig = new bmc.model.vo.SimpleConfigurationVO();
            simpleConfig.setId('configuration-123456');
            simpleConfig.setBaseVehicleVO(
                new bmc.model.vo.data.BaseVehicleVO({
                    id: baseVehicleId
                })
            );

            parts = parts || {};

            simpleConfig.addConfigurableItemVO(
                bmc.support.ConfigurableType.COLOUR,
                new bmc.model.vo.data.ColourVO({
                    id: parts.colour
                })
            );
            simpleConfig.addConfigurableItemVO(
                bmc.support.ConfigurableType.WHEEL,
                new bmc.model.vo.data.WheelVO({
                    id: parts.wheel
                })
            );
            simpleConfig.addConfigurableItemVO(
                bmc.support.ConfigurableType.TRIM,
                new bmc.model.vo.data.TrimVO({
                    id: parts.trim
                })
            );

            return simpleConfig;
        }

        function populateDefaultVehicles() {
            var baseVehicleProxy = command.facade.retrieveProxy(bmc.model.proxy.data.BaseVehiclesProxy.NAME),
                globalConfig = bmc.support.GlobalConfig.getInstance();

            baseVehicleProxy.setData([dataBuilder.VEHICLE_1_VO()]);
            baseVehicleProxy.startupBaseVehicleId = dataBuilder.VEHICLE_1_ID();

            userConfigurationsProxy.save(getSimpleConfiguration('GHW8BAA', {
                colour: 'colour1'
            }));

            globalConfig.LOCALE_CODE = LOCALE;
        }

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createCommand();
                createFacade();
                populateDefaultVehicles();
                done();
            });
        });

        afterEach(function () {
            bmc.support.GlobalConfig.instance = undefined;
            sessionProxy.sendNotification.restore();
        });

        describe('initialize', function () {
            it('should not be undefined', function (done) {
                expect(command).to.not.be(undefined);
                done();
            });
        });

        describe('executing', function () {
            var globalConfig;

            beforeEach(function () {
                globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.locale = LOCALE;
                globalConfig.setVehicleId(MODEL_ID);
            });

            afterEach(function () {
                bmc.support.GlobalConfig.instance = null;
            });

            it('should set the default vehicle as the active configuration', function () {
                var activeConfigurationProxy = command.facade.retrieveProxy(
                    bmc.model.proxy.ActiveConfigurationProxy.NAME);

                command.execute();

                expect(activeConfigurationProxy.getVehicleId()).to.be(MODEL_ID);
                expect(activeConfigurationProxy.getLocale()).to.be(LOCALE);
                expect(activeConfigurationProxy.getBodyStyle().getId()).to.be(dataBuilder.BODYSTYLE_2200_ID());
                expect(activeConfigurationProxy.getGrade().getId()).to.be(dataBuilder.GRADE_001_ID());
            });

            it('should notify the application that the default vehicle has been set', function () {
                sinon.spy(command, 'sendNotification');

                command.execute();

                sinon.assert.calledWith(command.sendNotification,
                    bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                    sinon.match.instanceOf(bmc.model.vo.SimpleConfigurationVO));
            });

            it('should use the saved configuration if set in the global config', function () {
                var activeConfigurationProxy = command.facade.retrieveProxy(
                        bmc.model.proxy.ActiveConfigurationProxy.NAME),
                    vehicleId = 'M6',
                    configurationId = 'configuration-123456';

                globalConfig.setVehicleId(vehicleId);
                globalConfig.setConfigurationId(configurationId);

                command.execute();

                expect(activeConfigurationProxy.getId()).to.be(configurationId);
                expect(activeConfigurationProxy.getVehicleId()).to.be(MODEL_ID);
                expect(activeConfigurationProxy.getLocale()).to.be(LOCALE);
            });
        });
    });
})();
