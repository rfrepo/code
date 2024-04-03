define([ 'model/proxy/ActiveConfigurationProxy',
    'model/proxy/PriceCalculationProxy',
    'controller/command/UpdateVehiclePresentationCommand'
], function () {
    'use strict';
    var UpdateVehiclePresentationCommand = arguments[2];


    return puremvc.define({
            name: 'bmc.controller.command.ConfigurableItemUpdatedCommand',
            parent: puremvc.MacroCommand
        },
        {
            initializeMacroCommand: function () {
                this.addSubCommand(bmc.controller.command.RequestPriceUpdateCommand);
                this.addSubCommand(bmc.controller.command.PrepareSectionCarouselContentCommand);
                this.addSubCommand(UpdateVehiclePresentationCommand);
            }
        }
    );
});