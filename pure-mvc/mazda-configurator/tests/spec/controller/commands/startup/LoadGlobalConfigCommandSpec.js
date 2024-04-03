(function () {
    'use strict';

    describe('load global config data', function () {

        var loadGlobalConfigCommand,
            facade,
        //SEND_NOTIFICATION = 'sendNotification',
            NOTIFICATION_GLOBAL_CONFIG_LOADED = 'global-config-loaded',
            commandExecuteMethodWasCalled,
            expectedModelsData;
//            jsonData = {
//                "MODEL_DATA_LOCATION": {
//                    "path": "resources/data/",
//                    "extension": ".json"
//                },
//                "VEHICLE_PARTS": {
//                    "BODYSTYLE": "bodystyle",
//                    "GRADE": "grade",
//                    "ENGINE": "engine",
//                    "COLOUR": "colour",
//                    "WHEELS": "wheel",
//                    "OPTIONPACKS": "optionpacks",
//                    "ACCESSORIES": "accessories"
//                }
//            },
//            globalConfigPopulated = false;

        beforeEach(function (done) {
            require(['controller/command/startup/LoadGlobalConfigCommand'], function () {
                createFacade();
                createLoadGlobalConfigCommand();
                done();
            });
        });


        describe('command should exist and be available', function () {
            it('should be available for creating a new instance', function () {
                expect(loadGlobalConfigCommand).not.to.be(undefined);
            });
        });

//        describe('load global config data', function () {
//            it('should send a complete handler once data loaded from JSON object', function () {
//                //facade.registerCommand(NOTIFICATION_GLOBAL_CONFIG_LOADED, createMockCommand);
//
//                loadGlobalConfigCommand.handleComplete(jsonData);
//
//                expect(globalConfigPopulated).to.be(true);
//
//                var eventName,
//                    eventData,
//                    spy = sinon.spy(loadGlobalConfigCommand, SEND_NOTIFICATION);
//
//                loadGlobalConfigCommand.handleComplete(NOTIFICATION_GLOBAL_CONFIG_LOADED, {});
//
//                eventName = spy.args[0][0];
//                eventData = spy.args[0][1];
//
//                expect(eventName).to.equal(NOTIFICATION_GLOBAL_CONFIG_LOADED);
//                expect(eventData).not.to.be(undefined);
//
//                loadGlobalConfigCommand.sendNotification.restore();
//                spy = null;
//            });
//        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
            facade.registerCommand(NOTIFICATION_GLOBAL_CONFIG_LOADED, createMockCommand);
        }

        function createLoadGlobalConfigCommand() {
            loadGlobalConfigCommand = new bmc.controller.command.LoadGlobalConfigCommand();
            loadGlobalConfigCommand.initializeNotifier(new Date().getTime());
            loadGlobalConfigCommand.facade = facade;
            //facade.registerCommand('', bmc.controller.command.LoadGlobalConfigCommand);
        }

        function createMockCommand() {

            function Command() {
            }

            Command.prototype.execute = function (note) {
                commandExecuteMethodWasCalled = true;
                expectedModelsData = note.getBody();
            };

            Command.prototype.initializeNotifier = function () {
            };

            return Command;
        }

    });
})();