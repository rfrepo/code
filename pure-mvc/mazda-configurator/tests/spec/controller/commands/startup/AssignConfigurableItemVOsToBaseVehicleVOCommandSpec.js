'use strict';
(function () {
    describe('AssignConfigurableItemVOsToBaseVehicleVOCommand', function () {

        var command,
            facade,

            baseVehiclesProxy,
            baseVehiclesDefaultsProxy,
            bodyStyleProxy,
            gradesProxy,
            trimsProxy,
            enginesProxy,
            wheelsProxy,
            coloursProxy,
            optionPackProxy,

            dataBuilder;

        describe('initializingVO', function () {

            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {

            it('should apply VO objects to base vehicle VO for all available types', function () {

                var vehicle = baseVehiclesProxy.data[6];

                command.execute();

                expect(vehicle.getBodyStyleVO()).not.to.be(null);
                expect(vehicle.getGradeVO()).not.to.be(null);
                expect(vehicle.getEngineVO()).not.to.be(null);
                expect(vehicle.getWheelVO()).not.to.be(null);
                expect(vehicle.getColourVO()).not.to.be(null);
                expect(vehicle.getTrimVO()).not.to.be(null);
                expect(vehicle.getOptionPackVOs().length).to.be(2);
            });
        });


        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createCommand() {
            command = new bmc.controller.command.startup.AssignConfigurableItemVOsToBaseVehicleVOCommand();
            command.facade = facade;
        }

        function createProxies() {

            var ConfigurableType = bmc.support.ConfigurableType;

            baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy();
            baseVehiclesProxy.data = dataBuilder.baseVehiclesWithOutDefaults;
            facade.registerProxy(baseVehiclesProxy);

            baseVehiclesDefaultsProxy = new bmc.model.proxy.data.BaseVehiclesDefaultsProxy();
            baseVehiclesDefaultsProxy.baseVehicleDefaults = dataBuilder.baseVehicleDefaults;
            facade.registerProxy(baseVehiclesDefaultsProxy);

            trimsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.TRIM);
            trimsProxy.data = dataBuilder.trims;
            facade.registerProxy(trimsProxy);

            bodyStyleProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.BODYSTYLE);
            bodyStyleProxy.data = dataBuilder.bodyStyles;
            facade.registerProxy(bodyStyleProxy);

            enginesProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.ENGINE);
            enginesProxy.data = dataBuilder.engines;
            facade.registerProxy(enginesProxy);

            wheelsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.WHEEL);
            wheelsProxy.data = dataBuilder.wheels;
            facade.registerProxy(wheelsProxy);

            coloursProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.COLOUR);
            coloursProxy.data = dataBuilder.colours;
            facade.registerProxy(coloursProxy);

            gradesProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.GRADE);
            gradesProxy.data = dataBuilder.grades;
            facade.registerProxy(gradesProxy);

            optionPackProxy = new bmc.model.proxy.data.OptionPackProxy();
            optionPackProxy.data = dataBuilder.optionPacks;
            facade.registerProxy(optionPackProxy);
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
                createProxies();
                createCommand();
                done();
            });
        });

        function getDependencies() {
            return [
                'controller/command/startup/AssignConfigurableItemVOsToBaseVehicleVOCommand',
                'model/proxy/data/BaseVehiclesProxy',
                'model/vo/data/ConfigurableItemVO',
                'model/proxy/data/BaseVehiclesDefaultsProxy',
                'model/proxy/data/OptionPackProxy',
                'model/proxy/data/ConfigurableItemProxy'
            ];
        }

    });
})();
