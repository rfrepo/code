(function () {
    'use strict';
    describe('SelectItemStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            SET_CONFIGURABLE_ITEM_VO = 'setConfigurableItemVO';

        describe('class should exist ', function () {

            it('should instanced SelectItemStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            it('should set wheelVO on the proxy', function () {

                var wheelVO = dataBuilder.WHEEL_1_VO(),
                    spy = spyOnDelegatehandleItemSelected(wheelVO);

                sinon.assert.calledWith(spy, wheelVO.getType(), wheelVO);
            });

            it('should not set colorVO on the proxy because it is the same', function () {

                var spy,
                    wheelVO = dataBuilder.WHEEL_1_VO();
                getActiveConfigurationProxy().setConfigurableItemVO(wheelVO.getType(), wheelVO);
                spy = spyOnDelegatehandleItemSelected(wheelVO);

                expect(spy.called).to.be(false);
            });
        });

        function spyOnDelegatehandleItemSelected(itemVO) {

            var activeConfigurationProxy = getActiveConfigurationProxy(),
                spy = sinon.spy(activeConfigurationProxy, SET_CONFIGURABLE_ITEM_VO);

            delegate.handleItemSelected(itemVO);

            activeConfigurationProxy[SET_CONFIGURABLE_ITEM_VO].restore();
            return spy;
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createActiveConfigurationProxy() {
            facade.registerProxy(new bmc.model.proxy.ActiveConfigurationProxy());
        }

        function getActiveConfigurationProxy() {
            return facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
        }

        function createChangeColourDelegate() {
            delegate = new bmc.controller.support.ConfigurableItemSelection.SelectItemStrategy(facade);
        }

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createActiveConfigurationProxy();
                createChangeColourDelegate();
                done();
            });
        });

        function getDependencies() {
            return [

                'model/proxy/ActiveConfigurationProxy',
                'support/ConfigurableType',
                'controller/support/ConfigurableItemSelection/SelectItemStrategy'
            ];
        }
    });
})();
