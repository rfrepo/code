(function () {
    'use strict';
    describe('SessionProxy', function () {

        var sessionProxy,
            CURRENT_MODEL = 'M6',
            SEND_NOTIFICATION = 'sendNotification',
            NOTIFICATION_CURRENT_MODEL_SELECTED = 'current-model-updated';

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                sessionProxy = new bmc.model.proxy.SessionProxy();
                facade.registerProxy(sessionProxy);
                done();
            });
        });

        describe('the proxy should be properly initialised', function () {

            it('should be initialised', function (done) {

                expect(sessionProxy).to.not.be(undefined);
                done();
            });
        });

        describe('the proxy should send a notification when the current model property is set', function () {

            it('should send a notification containing the current model', function () {

                var eventName,
                    eventData,
                    spy = sinon.spy(sessionProxy, SEND_NOTIFICATION),
                    modelVO = new bmc.model.vo.data.ModelVO();

                modelVO.setModelId('M6');
                modelVO.setBodyStyle('2200');

                sessionProxy.setModelVO(modelVO);

                eventName = spy.args[0][0];
                eventData = spy.args[0][1];

                expect(eventName).to.equal(NOTIFICATION_CURRENT_MODEL_SELECTED);
                expect(eventData).to.be(CURRENT_MODEL);

                sessionProxy.sendNotification.restore();
                spy = null;

            });
        });

        function getDependencies() {
            return [
                'model/proxy/SessionProxy',
                'model/vo/data/ModelVO',
                'support/NotificationNames'
            ];
        }

    });
})();
