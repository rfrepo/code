'use strict';
(function () {
    describe('ModelSelectedCommand', function () {
        var modelSelectedCommand,
            facade,
            MODEL_ID = 'M6',
            SESSION_PROXY = 'SessionProxy';

        beforeEach(function (done) {
            require(getDependencies(), function () {
                createFacade();
                facade.registerProxy(createSessionProxy());
                createModelSelectedCommand();
                done();
            });
        });

        describe('the command class should exist ', function () {

            it('should be instanced', function () {
                expect(modelSelectedCommand).not.to.be(undefined);
            });
        });


        describe('should execute set current model on session proxy', function () {

            it('should retrieve an instance of the sessionProxy proxies', function () {

                var sessionProxy = modelSelectedCommand.getSessionProxy();
                expect(sessionProxy).not.to.be(undefined);
            });

            it('should get selected model id form notification body' +
                ' (modelVO) and set current model on session proxy', function () {

                modelSelectedCommand.execute(createMockNotification());

                var sessionProxy = facade.retrieveProxy(SESSION_PROXY);

                expect(sessionProxy.getCurrentModel()).to.be(MODEL_ID);
            });
        });

        function getDependencies() {
            return [
                'controller/command/ModelSelectedCommand',
                'model/vo/data/ModelVO',
                'model/proxy/SessionProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createModelSelectedCommand() {
            modelSelectedCommand = new bmc.controller.command.ModelSelectedCommand();
            modelSelectedCommand.facade = facade;
        }

        function createSessionProxy() {
            return new bmc.model.proxy.SessionProxy();
        }


        function createMockNotification() {
            var modelVO = new bmc.model.vo.data.ModelVO();
            modelVO.setModelId('M6');
            modelVO.setBodyStyle('2200');

            return {
                getBody: function () {
                    return modelVO;
                }
            };
        }

    });
})();
