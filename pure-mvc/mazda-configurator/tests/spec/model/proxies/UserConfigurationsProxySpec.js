(function () {
    'use strict';
    var USER_AGENT_WARNING = 'PLEASE RUN UserConfigurationProxySpec with grunt, not ' + navigator.userAgent;

    describe('UserConfigurationsProxy', function () {
        var proxy,
            facadeStub,
            canvasStub,
            MODEL_ID = 'M6',
            LOCALE = 'en-gb',
            IMG_DATA = 'data:image/png;base64,iVBORw0K';

        function getSimpleConfiguration(baseVehicleId, parts) {
            var simpleConfig = new bmc.model.vo.SimpleConfigurationVO();
            simpleConfig.setBaseVehicleVO(
                new bmc.model.vo.data.BaseVehicleVO({
                    id: baseVehicleId
                })
            );

            simpleConfig.setVehicleId(MODEL_ID);
            simpleConfig.setLocale(LOCALE);
            simpleConfig.setId(Math.floor(Math.random() * 9999999));
            simpleConfig.setImageUrl(IMG_DATA);

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

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        beforeEach(function (done) {
            require([
                'support/ConfigurableType',
                'support/NotificationNames',
                'model/vo/data/ConfigurableItemVO',
                'model/vo/data/BaseVehicleVO',
                'model/vo/data/ColourVO',
                'model/vo/data/WheelVO',
                'model/vo/data/TrimVO',
                'model/vo/SimpleConfigurationVO',
                'model/proxy/UserConfigurationsProxy'
            ], function () {
                var facade = createFacade();

                proxy = new bmc.model.proxy.UserConfigurationsProxy();

                facade.registerProxy(proxy);

                facadeStub = sinon.stub(proxy, 'getFacade').returns(facade);
                canvasStub = sinon.stub(bmc.support.CanvasCapture, 'getDataUrlForVehicleThumbnail').returns(IMG_DATA);

                done();
            });
        });

        afterEach(function () {
            bmc.support.Cookie.removeAll();

            facadeStub.restore();
            canvasStub.restore();
        });

        describe('initializing', function () {
            it('should be initialised', function () {
                expect(proxy).to.not.be(undefined);
            });
        });

        describe('saving', function () {
            function runCookieSavingTests() {
                function assetConfiguration(savedConfig, orginalConfig) {
                    expect(savedConfig).to.not.be(undefined);
                    expect(savedConfig.getLocale()).to.equal(LOCALE);
                    expect(savedConfig.getVehicleId()).to.equal(MODEL_ID);
                    expect(savedConfig.getBaseVehicleVO()).to.not.be(undefined);
                    expect(savedConfig.getBaseVehicleVO().getId()).to.equal(orginalConfig.getBaseVehicleVO().getId());
                    expect(canvasStub.called).to.be.ok();
                    expect(proxy.loadImageUrl(savedConfig)).to.equal(proxy.loadImageUrl(orginalConfig));

                }

                it('should save a base vehicle to retrieve', function () {
                    var simpleConfig = getSimpleConfiguration('vehicle1'),
                        configuration;

                    proxy.save(simpleConfig);

                    configuration = proxy.getAt(0);

                    assetConfiguration(configuration, simpleConfig);
                });

                it('should save 2 base vehicle to retrieve', function () {
                    var simpleConfig1 = getSimpleConfiguration('vehicle1'),
                        simpleConfig2 = getSimpleConfiguration('vehicle2'),
                        configuration1,
                        configuration2;

                    proxy.save(simpleConfig1);
                    proxy.save(simpleConfig2);

                    configuration1 = proxy.getAt(1);
                    configuration2 = proxy.getAt(0);

                    assetConfiguration(configuration1, simpleConfig1);
                    assetConfiguration(configuration2, simpleConfig2);
                });

                it('should remove the oldest configuration if a forth is added', function () {
                    var simpleConfig1 = getSimpleConfiguration('vehicle1'),
                        simpleConfig2 = getSimpleConfiguration('vehicle2'),
                        simpleConfig3 = getSimpleConfiguration('vehicle3'),
                        simpleConfig4 = getSimpleConfiguration('vehicle4'),
                        configuration1,
                        configuration2,
                        configuration3,
                        configuration4;

                    proxy.save(simpleConfig1);
                    proxy.save(simpleConfig2);
                    proxy.save(simpleConfig3);
                    proxy.save(simpleConfig4);

                    configuration1 = proxy.getAt(3);
                    configuration2 = proxy.getAt(2);
                    configuration3 = proxy.getAt(1);
                    configuration4 = proxy.getAt(0);

                    expect(configuration1).to.be(null);
                    assetConfiguration(configuration2, simpleConfig2);
                    assetConfiguration(configuration3, simpleConfig3);
                    assetConfiguration(configuration4, simpleConfig4);
                });

                it('should remove any configuration that has missing images', function () {
                    var simpleConfig1 = getSimpleConfiguration('vehicle1'),
                        simpleConfig2 = getSimpleConfiguration('vehicle2'),
                        simpleConfig3 = getSimpleConfiguration('vehicle3'),
                        configuration1,
                        configuration2,
                        configuration3;

                    proxy.save(simpleConfig1);
                    proxy.save(simpleConfig2);
                    proxy.save(simpleConfig3);

                    canvasStub.returns(undefined);

                    proxy.removeImageUrl(simpleConfig1);
                    proxy.removeImageUrl(simpleConfig2);

                    configuration1 = proxy.getAt(0);
                    configuration2 = proxy.getAt(1);
                    configuration3 = proxy.getAt(2);

                    assetConfiguration(configuration1, simpleConfig3);
                    expect(configuration2).to.be(null);
                    expect(configuration3).to.be(null);

                });

                it('should save a full simple configuration', function () {

                    var configurationParts = {
                            colour: 'colour1',
                            wheel: 'wheel1',
                            trim: 'trim1'
                        },
                        simpleConfig = getSimpleConfiguration('vehicle1', configurationParts),
                        configuration;

                    proxy.save(simpleConfig);

                    configuration = proxy.getAt(0);

                    expect(configuration.colour.getId()).to.equal(configurationParts.colour);
                    expect(configuration.wheel.getId()).to.equal(configurationParts.wheel);
                    expect(configuration.trim.getId()).to.equal(configurationParts.trim);
                });

                it('should dispatch a notification to the application when there is a change', function () {
                    var configurationParts = {
                            colour: 'colour1',
                            wheel: 'wheel1',
                            trim: 'trim1'
                        },
                        configs = [],
                        simpleConfig = getSimpleConfiguration('vehicle1', configurationParts);

                    BTesting.wrap(proxy, 'sendNotification');
                    sinon.stub(proxy, 'getAll').returns(configs);

                    proxy.save(simpleConfig);

                    expect(proxy.sendNotification.hasBeenCalled).to.be(true);
                    expect(proxy.sendNotification.calls[0][0]).to.be(
                        bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED);
                    expect(proxy.sendNotification.calls[0][1]).to.be(configs);

                    proxy.sendNotification.restore();
                    proxy.getAll.restore();
                });

                it('should update a configuration that already exists if it has a matching id', function () {
                    var configId = 'test1',
                        colourId = 'colour2',
                        simpleConfig1 = getSimpleConfiguration('vehicle1', {
                            colour: 'colour1'
                        }),
                        savedConfig;

                    simpleConfig1.setId(configId);

                    proxy.save(simpleConfig1);

                    savedConfig = proxy.getAt(0);

                    expect(savedConfig.colour.id).to.equal(savedConfig.colour.id);

                    simpleConfig1.colour.id = colourId;

                    proxy.save(simpleConfig1);

                    savedConfig = proxy.getAt(0);

                    expect(savedConfig.colour.id).to.equal(colourId);
                    expect(proxy.getAll().length).to.equal(1);
                });

                it('should push a newly changed config to the index 0', function () {
                    var configId1 = 'test1',
                        configId2 = 'test2',
                        simpleConfig1 = getSimpleConfiguration('vehicle1'),
                        simpleConfig2 = getSimpleConfiguration('vehicle2'),
                        savedConfig;

                    simpleConfig1.setId(configId1);
                    simpleConfig2.setId(configId2);

                    proxy.save(simpleConfig1);
                    proxy.save(simpleConfig2);

                    savedConfig = proxy.getAt(0);

                    expect(savedConfig.id).to.equal(configId2);

                    proxy.save(simpleConfig1);

                    savedConfig = proxy.getAt(0);

                    expect(savedConfig.id).to.equal(configId1);
                });
            }

            if (navigator.userAgent.indexOf('Phantom') === -1) {
                console.log(USER_AGENT_WARNING);
            }
            else {
                runCookieSavingTests();
            }
        });

        describe('retrieving', function () {
            function runCookieRetrievingTests() {
                it('should save a base vehicle to retrieve', function () {
                    var simpleConfig1 = getSimpleConfiguration('vehicle1'),
                        simpleConfig2 = getSimpleConfiguration('vehicle2'),
                        configurations;

                    proxy.save(simpleConfig1);
                    proxy.save(simpleConfig2);

                    configurations = proxy.getAll();

                    expect(configurations).to.not.be(undefined);
                    expect(configurations.length).to.equal(2);
                });
            }

            if (navigator.userAgent.indexOf('Phantom') === -1) {
                console.log(USER_AGENT_WARNING);
            }
            else {
                runCookieRetrievingTests();
            }
        });

        describe('loading', function () {
            it('should notify the application when data is available', function () {
                var configurations = [];

                sinon.stub(proxy, 'getAll').returns(configurations);
                sinon.spy(proxy, 'sendNotification');

                proxy.load();

                sinon.assert.calledWith(proxy.sendNotification,
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    configurations
                );

                proxy.getAll.restore();
                proxy.sendNotification.restore();
            });
        });
    });
}());
