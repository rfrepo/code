(function () {
    'use strict';
    describe('OnActiveConfigurationChangeCommand', function () {

        var command;

        describe('command class should exist', function () {

            it('should instance ConfigurableItemUpdatedCommand', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('initializeMacroCommand', function () {

            it('should add PrepareSectionCarouselContentCommand to the sub commands', function () {
                expect(command.subCommands).to.contain(bmc.controller.command.PrepareSectionCarouselContentCommand);
            });

            it('should add ActiveConfigurationChangeCommand to the sub commands', function () {
                expect(command.subCommands).to.contain(bmc.controller.command.ActiveConfigurationChangeCommand);
            });
        });

        beforeEach(function (done) {

            require([
                'controller/command/PrepareSectionCarouselContentCommand',
                'controller/command/ActiveConfigurationChangeCommand',
                'controller/command/OnActiveConfigurationChangeCommand'
            ], function () {

                command = new bmc.controller.command.OnActiveConfigurationChangeCommand();
                done();
            });
        });
    });
})();
