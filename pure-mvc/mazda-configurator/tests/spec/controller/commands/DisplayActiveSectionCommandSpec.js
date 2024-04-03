'use strict';
(function () {
    describe('DisplayActiveSectionCommand', function () {

        var command;


        describe('command class should exist', function () {

            it('should instance DisplayActiveSectionCommand', function () {
                expect(command).not.to.be(undefined);

            });
        });

        describe('initializeMacroCommand', function () {

            it('should add PrepareSectionCarouselContentCommand to the sub commands', function () {
                expect(command.subCommands).to.contain(bmc.controller.command.PrepareSectionCarouselContentCommand);
            });

            it('should add PrepareSectionContentCommand to the sub commands', function () {
                expect(command.subCommands).to.contain(bmc.controller.command.PrepareSectionContentCommand);
            });
        });

        beforeEach(function (done) {

            require([
                'controller/command/PrepareSectionCarouselContentCommand',
                'controller/command/PrepareSectionContentCommand',
                'controller/command/DisplayActiveSectionCommand'
            ], function () {

                command = new bmc.controller.command.DisplayActiveSectionCommand();
                done();
            });
        });
    });
})();
