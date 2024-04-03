define([ 'model/proxy/ActiveConfigurationProxy',
    'controller/command/ActiveConfigurationChangeCommand',
    'controller/command/UpdateVehiclePresentationCommand',
    'controller/command/PrepareSectionCarouselContentCommand'
], function () {
    'use strict';
    var ActiveConfigurationChangeCommand = arguments[1],
        UpdateVehiclePresentationCommand = arguments[2],
        PrepareSectionCarouselContentCommand = arguments[3];


    return puremvc.define({
            name: 'bmc.controller.command.OnActiveConfigurationChangeCommand',
            parent: puremvc.MacroCommand
        },
        {
            initializeMacroCommand: function () {
                this.addSubCommand(ActiveConfigurationChangeCommand);
                this.addSubCommand(PrepareSectionCarouselContentCommand);
                this.addSubCommand(UpdateVehiclePresentationCommand);
            }
        }
    );
});