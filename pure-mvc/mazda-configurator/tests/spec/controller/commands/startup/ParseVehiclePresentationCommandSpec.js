(function () {
    'use strict';
    describe('ParseVehiclePresentationCommand', function () {

        var command,
            facade;


        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createParseVehiclePresentationCommand();
                done();
            });
        });

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });


        function getDependencies() {
            return [
                'controller/command/startup/ParseVehiclePresentationCommand'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createParseVehiclePresentationCommand() {
            command = new bmc.controller.command.ParseVehiclePresentationCommand();
        }
    });
})();
