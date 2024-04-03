define([
    'controller/command/startup/core/PrepModelCommand',
    'controller/command/startup/core/PrepControllerCommand',
    'controller/command/startup/core/PrepViewCommand'
], function () {
    'use strict';
    var PrepModelCommand = arguments[0],
        PrepControllerCommand = arguments[1],
        PrepViewCommand = arguments[2];

    puremvc.define({
            name: 'bmc.controller.command.startup.StartupCommand',
            parent: puremvc.MacroCommand
        },
        {
            initializeMacroCommand: function () {
                
                this.addSubCommand(PrepControllerCommand);
                this.addSubCommand(PrepModelCommand);
                this.addSubCommand(PrepViewCommand);
            }
        }
    );
});