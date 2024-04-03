'use strict';
(function () {
    describe('PrepControllerCommand', function () {

        var facade,
            prepControllerCommand;

        function getDependencies() {
            return [
                'controller/command/startup/core/PrepControllerCommand',
                'support/NotificationNames'
            ];
        }

        function createNewFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createPrepControllerCommand() {
            prepControllerCommand = new bmc.controller.command.startup.core.PrepControllerCommand();
            prepControllerCommand.facade = facade;
        }

        function getNotificationNames() {

            return [
                'model-selected',
                'configurable-item-selection',
                'current-model-updated',
                'model-data-loaded',
                'new-base-vehicle-available',
                'all-configurable-item-data',
                'navigation-item-selected',
                'active-section-updated',
                'active-configuration-change',
                'undo-change',
                'request-price-update',
                'set-price-on-configurable-items',
                'on-conflicts-found'
            ];
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {
                createNewFacade();
                createPrepControllerCommand();

                done();
            });
        });

        describe('initialize', function () {

            it('should be defined', function () {
                expect(prepControllerCommand).not.to.be(undefined);
            });
        });

        describe('registering notification to commands', function () {

            var notificationNames = getNotificationNames(),
                i;

            function assertIt(notificationName) {
                it('should register ' + notificationName + ' notification to a command', function () {
                    prepControllerCommand.execute();
                    expect(facade.hasCommand(notificationName)).to.be(true);
                });
            }

            for (i = 0; i < notificationNames.length; i++) {
                assertIt(notificationNames[i]);
            }
        });


    });
})();
