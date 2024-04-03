'use strict';
(function () {
    describe('ConfigurableItemSelectionCommand', function () {

        var facade,
            command;

        describe('Class should exist ', function () {

            it('should instance ConfigurableItemSelectionCommand', function () {
                expect(command).not.to.be(undefined);
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createCommand() {
            command = new bmc.controller.command.ConfigurableItemSelectionCommand();
        }

        function getDependencies() {
            return [
                'controller/command/ConfigurableItemSelectionCommand',
                'model/proxy/ActiveConfigurationProxy'
            ];
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createCommand();
                done();
            });
        });

    });
})();
