'use strict';
(function () {

    describe('LoadCurrentModelDataCommand', function () {

        var loadCurrentModelDataCommand,
            facade,
            SEND_NOTIFICATION = 'sendNotification',
            NOTIFICATION_MODEL_DATA_LOADED = 'model-data-loaded';

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createLoadCurrentModelDataCommand();
                done();
            });
        });

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(loadCurrentModelDataCommand).not.to.be(undefined);
            });
        });

        describe('command should have a complete handler', function () {

            it('should have an complete handler that sends a model data loaded notification', function () {

                var eventName,
                    eventData,
                    spy = sinon.spy(loadCurrentModelDataCommand, SEND_NOTIFICATION);

                loadCurrentModelDataCommand.handleComplete(NOTIFICATION_MODEL_DATA_LOADED, {});

                eventName = spy.args[0][0];
                eventData = spy.args[0][1];

                expect(eventName).to.equal(NOTIFICATION_MODEL_DATA_LOADED);
                expect(eventData).not.to.be(undefined);

                loadCurrentModelDataCommand.sendNotification.restore();
                spy = null;

            });
        });


        function getDependencies() {
            return [

            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createLoadCurrentModelDataCommand() {
            loadCurrentModelDataCommand = new bmc.controller.command.startup.LoadCurrentModelDataCommand();
            loadCurrentModelDataCommand.initializeNotifier(new Date().getTime());
            loadCurrentModelDataCommand.facade = facade;
        }
    });
})();
