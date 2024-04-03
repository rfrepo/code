'use strict';
(function () {
    describe('ModelDataLoadedCommand', function () {

        var startupCommand;

        describe('initialize', function () {

            it('should add DistributeModelDataToProxiesForParsingCommand to the sub commands', function () {

                var command = bmc.controller.command.startup.DistributeModelDataToProxiesForParsingCommand;
                expect(startupCommand.subCommands).to.contain(command);
            });

            it('should add AssignConfigurableItemVOsToBaseVehicleVOCommand to the sub commands', function () {

                var command = bmc.controller.command.startup.AssignConfigurableItemVOsToBaseVehicleVOCommand;
                expect(startupCommand.subCommands).to.contain(command);
            });

            it('should add SetDefaultVehicleCommand to the sub commands', function () {

                var command = bmc.controller.command.startup.SetDefaultVehicleCommand;
                expect(startupCommand.subCommands).to.contain(command);
            });

            it('should add DispatchAllConfigurableItemDataCommand to the sub commands', function () {

                var command = bmc.controller.command.startup.DispatchAllConfigurableItemDataCommand;
                expect(startupCommand.subCommands).to.contain(command);
            });

        });

        beforeEach(function (done) {
            require([
                'controller/command/startup/DistributeModelDataToProxiesForParsingCommand',
                'controller/command/startup/AssignConfigurableItemVOsToBaseVehicleVOCommand',
                'controller/command/startup/SetDefaultVehicleCommand',
                'controller/command/startup/DispatchAllConfigurableItemDataCommand',
                'controller/command/startup/ModelDataLoadedCommand'
            ], function () {
                startupCommand = new bmc.controller.command.startup.ModelDataLoadedCommand();
                done();
            });
        });
    });
})();
