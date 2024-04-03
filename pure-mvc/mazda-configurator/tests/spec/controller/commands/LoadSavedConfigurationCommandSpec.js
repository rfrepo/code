(function () {
    'use strict';
    describe('LoadSavedConfigurationCommand', function () {

        var command, facadeStub;

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        beforeEach(function (done) {
            require([
                'support/NotificationNames',
                'controller/command/LoadSavedConfigurationCommand'
            ], function () {
                command = new bmc.controller.command.LoadSavedConfigurationCommand();
                facadeStub = sinon.stub(command, 'getFacade');
                facadeStub.returns(createFacade());
                done();
            });
        });

        afterEach(function () {
            facadeStub.restore();
        });

        describe('initializing', function () {
            it('should be an instance of LoadSavedConfigurationCommand', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {
            function getSimpleConfiguration(baseVehicleId, parts) {
                var simpleConfig = new bmc.model.vo.SimpleConfigurationVO();
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

            beforeEach(function () {
                command.globalScope = {
                    location: {
                        href: undefined
                    }
                };
            });

            it('should call window location with a configuration id', function () {
                var configId = 'configuration-123456',
                    locale = 'en-gb',
                    vehicleId = 'M6',
                    simpleConfig = getSimpleConfiguration('vehicle1');

                simpleConfig.setId(configId);
                simpleConfig.setLocale(locale);
                simpleConfig.setVehicleId(vehicleId);

                command.execute(new puremvc.Notification(
                    bmc.support.NotificationNames.LOAD_SAVED_CONFIGURATION,
                    simpleConfig
                ));

                expect(command.globalScope.location.href).to.equal(
                    './?' +
                        'locale=' + locale + '&' +
                        'vehicle=' + vehicleId + '&' +
                        'savedConfigId=' + configId);
            });

            it('should call window location with a configuration id and baseUrl', function () {
                var configId = 'configuration-987654',
                    locale = 'en-gb',
                    vehicleId = 'M2',
                    simpleConfig = getSimpleConfiguration('vehicle1'),
                    baseUrl = 'http://example.burrows.com/car-config-html5',
                    urlExtractorStub = sinon.stub(urlExtractor, 'getResourcesUrl');

                urlExtractorStub.returns(baseUrl);

                simpleConfig.setId(configId);
                simpleConfig.setLocale(locale);
                simpleConfig.setVehicleId(vehicleId);

                command.execute(new puremvc.Notification(
                    bmc.support.NotificationNames.LOAD_SAVED_CONFIGURATION,
                    simpleConfig
                ));

                expect(command.globalScope.location.href).to.equal(
                    './?' +
                        'locale=' + locale + '&' +
                        'vehicle=' + vehicleId + '&' +
                        'savedConfigId=' + configId + '&' +
                        'baseUrl=' + baseUrl);

                urlExtractorStub.restore();
            });
        });
    });

})();
