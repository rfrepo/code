'use strict';
(function () {
    describe('StartupCommand', function () {

        var startupCommand,
            PrepViewCommand,
            PrepModelCommand,
            PrepControllerCommand;

        describe('initialize', function () {
            it('should add PrepModelCommand to the sub commands', function () {
                expect(startupCommand.subCommands).to.contain(PrepModelCommand);
            });

            it('should add PrepControllerCommand to the sub commands', function () {
                //var prepControllerCommand = bmc.controller.command.startup.core.PrepControllerCommand;
                expect(startupCommand.subCommands).to.contain(PrepControllerCommand);
            });

            it('should add PrepViewCommand to the sub commands', function () {
                expect(startupCommand.subCommands).to.contain(PrepViewCommand);
            });

        });

        beforeEach(function (done) {
            require([
                'controller/command/startup/StartupCommand',
                'controller/command/startup/core/PrepControllerCommand',
                'controller/command/startup/core/PrepControllerCommand',
                'controller/command/startup/core/PrepViewCommand'
            ], function () {

                PrepControllerCommand = arguments[1];
                PrepModelCommand = arguments[2];
                PrepViewCommand = arguments[3];

                startupCommand = new bmc.controller.command.startup.StartupCommand();
                done();
            });
        });
    });
})();
