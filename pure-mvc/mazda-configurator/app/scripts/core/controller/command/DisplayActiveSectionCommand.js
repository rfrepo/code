define([
    'controller/command/PrepareSectionCarouselContentCommand',
    'controller/command/PrepareSectionContentCommand'
], function () {
    'use strict';
    var PrepareSectionCarouselContentCommand = arguments[0],
        PrepareSectionContentCommand = arguments[1];


    return puremvc.define({
            name: 'bmc.controller.command.DisplayActiveSectionCommand',
            parent: puremvc.MacroCommand
        },
        {
            initializeMacroCommand: function () {
                this.addSubCommand(PrepareSectionContentCommand);
                this.addSubCommand(PrepareSectionCarouselContentCommand);
            }
        }
    );
});