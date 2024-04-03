(function () {
    'use strict';

    describe('NavigationProxy', function () {

        var proxy,
            dataBuilder,
            SEND_NOTIFICATION = 'sendNotification';

        describe('the proxy should be properly initialised', function () {

            it('should be initialised', function (done) {
                expect(proxy).to.not.be(undefined);
                done();
            });
        });

        describe('generateNavigationData', function () {

            it('should send a notification containing vos from data', function () {
                var spy = sinon.spy(proxy, SEND_NOTIFICATION);

                proxy.generateNavigationData(createMockData());

                expect(spy.called).to.be(true);
                expect(spy.args[0][1].length).to.be(3);

                proxy[SEND_NOTIFICATION].restore();
            });
        });

        describe('updateActiveSectionVO', function () {

            it('should send a notification containing the new vo', function () {
                var navigationVO = {},
                    notificationName = bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED,
                    spy = createSpyAndCallUpdateActiveSectionVO(navigationVO);

                expect(spy.calledWith(notificationName, sinon.match(navigationVO))).to.be(true);
            });

            it('should not send a notification if the vo being set is the same as the current vo', function () {

                proxy.updateActiveSectionVO({});
                var navigationVO = proxy.getActiveSectionVO(),
                    notificationName = bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED,
                    spy = createSpyAndCallUpdateActiveSectionVO(navigationVO);

                expect(spy.calledWith(notificationName, sinon.match(navigationVO))).to.be(false);
            });
        });

        function getDependencies() {
            return [
                'model/proxy/NavigationProxy',
                'support/ConfigurableType',
                'support/NotificationNames'
            ];
        }

        function createMockData() {
            var data = {};
            data[bmc.support.ConfigurableType.GRADE] = [1, 2, 3];
            data[bmc.support.ConfigurableType.ENGINE] = [1, 2, 3];
            return data;
        }

        function createSpyAndCallUpdateActiveSectionVO(data) {
            var spy = sinon.spy(proxy, SEND_NOTIFICATION);
            proxy.updateActiveSectionVO(data);
            proxy[SEND_NOTIFICATION].restore();
            return spy;
        }

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                proxy = new bmc.model.proxy.NavigationProxy();
                facade.registerProxy(proxy);
                done();
            });
        });

    });
})();