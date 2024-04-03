(function () {
    'use strict';
    describe('ChangeItemStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            SET_CONFIGURABLE_ITEM_VO = 'setConfigurableItemVO';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            it('should set colorVO on the proxy', function () {

                var colourVO = dataBuilder.COLOUR_1_VO(),
                    spy = spyOnDelegatehandleItemSelected(colourVO);

                sinon.assert.calledWith(spy, colourVO.getType(), colourVO);
            });

            it('should set colorVO on the proxy and set trim to default', function () {

                var colourVO = dataBuilder.COLOUR_1_VO(),
                    spy = spyOnDelegatehandleItemSelected(colourVO);

                sinon.assert.calledWith(spy, colourVO.getType(), colourVO);
            });


            it('should not set colorVO on the proxy because it is the same', function () {

                var spy,
                    colourVO = dataBuilder.COLOUR_1_VO();
                getActiveConfigurationProxy().setConfigurableItemVO(colourVO.getType(), colourVO);
                spy = spyOnDelegatehandleItemSelected(colourVO);

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
            delegate = new bmc.controller.support.ConfigurableItemSelection.ChangeColourStrategy(facade);
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
                'controller/support/ConfigurableItemSelection/ChangeColourStrategy'
            ];
        }
    });
})();
