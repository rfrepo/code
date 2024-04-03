'use strict';
(function () {
    describe('PrepModelCommand', function () {
        var command,
            facade;

        describe('initializing PrepModelCommand', function () {
            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {

            it('should contain all mandatory proxies in the facade', function () {
                command.execute();

                expect(facade.retrieveProxy(bmc.model.proxy.ChangeBaseVehicleByEngineProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.ChangeBaseVehicleByGradeProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.ChangeBaseVehicleByTrimProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.SessionProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.data.BaseVehiclesProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.VehiclePresentationProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.NavigationProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.ConfigurationConflictProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.data.StandardFeaturesProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.UserConfigurationsProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.data.AccessoriesProxy.NAME)).not.to.be(undefined);
                expect(facade.retrieveProxy(bmc.model.proxy.data.OptionPackProxy.NAME)).not.to.be(undefined);
            });

            it('should contain all configurable item proxies in the facade', function () {

                var ConfigurableType = bmc.support.ConfigurableType,
                    types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    i;

                command.execute();

                for (i = 0; i < numberOfTypes; i += 1) {
                    expect(facade.retrieveProxy(types[i])).not.to.be(undefined);
                }
            });
        });

        beforeEach(function (done) {
            require([
                'controller/command/startup/core/PrepModelCommand',
                'support/ConfigurableType',
                'model/proxy/VehiclePresentationProxy',
                'model/proxy/ChangeBaseVehicleByEngineProxy',
                'model/proxy/ChangeBaseVehicleByGradeProxy',
                'model/proxy/ChangeBaseVehicleByTrimProxy',
                'model/proxy/NavigationProxy',
                'model/proxy/ConfigurationConflictProxy',
                'model/proxy/data/StandardFeaturesProxy',
                'model/proxy/data/AccessoriesProxy',
                'model/proxy/data/OptionPackProxy'
            ], function () {
                facade = puremvc.Facade.getInstance(new Date().getTime());
                command = new bmc.controller.command.startup.core.PrepModelCommand();
                command.facade = facade;
                done();
            });
        });

    });
})();
