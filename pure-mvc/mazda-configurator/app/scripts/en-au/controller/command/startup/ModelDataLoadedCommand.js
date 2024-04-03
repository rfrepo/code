define([
    'controller/command/startup/DistributeModelDataToProxiesForParsingCommand',
    'controller/command/startup/AssignConfigurableItemVOsToBaseVehicleVOCommand',
    'controller/command/startup/SetDefaultVehicleCommand',
    'controller/command/startup/DispatchAllConfigurableItemDataCommand',
    'controller/command/UpdateVehiclePresentationCommand',
    'controller/command/startup/FilterBaseVehicleVOsCommand'
], function () {
    'use strict';
    var DistributeModelDataToProxiesForParsingCommand = arguments[0],
        AssignConfigurableItemVOsToBaseVehicleVOCommand = arguments[1],
        SetDefaultVehicleCommand = arguments[2],
        DispatchAllConfigurableItemDataCommand = arguments[3],
        UpdateVehiclePresentationCommand = arguments[4],
        FilterBaseVehicleVOsCommand = arguments[5];


    return puremvc.define({
            name: 'bmc.controller.command.startup.ModelDataLoadedCommand',
            parent: puremvc.MacroCommand
        },
        {
            initializeMacroCommand: function () {
                this.addSubCommand(DistributeModelDataToProxiesForParsingCommand);
                this.addSubCommand(AssignConfigurableItemVOsToBaseVehicleVOCommand);
                this.addSubCommand(FilterBaseVehicleVOsCommand);
                this.addSubCommand(SetDefaultVehicleCommand);
                this.addSubCommand(DispatchAllConfigurableItemDataCommand);
                this.addSubCommand(UpdateVehiclePresentationCommand);
            }
        }
    );
});