(function () {
    'use strict';
    describe('ConfigurableItemUpdatedCommand', function () {

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

            it('should add RequestPriceUpdateCommand to the sub commands', function () {
                expect(command.subCommands).to.contain(bmc.controller.command.RequestPriceUpdateCommand);
            });
        });

        beforeEach(function (done) {

            require([
                'controller/command/PrepareSectionCarouselContentCommand',
                'controller/command/RequestPriceUpdateCommand',
                'controller/command/ConfigurableItemUpdatedCommand'
            ], function () {

                command = new bmc.controller.command.ConfigurableItemUpdatedCommand();
                done();
            });
        });
    });
})();
