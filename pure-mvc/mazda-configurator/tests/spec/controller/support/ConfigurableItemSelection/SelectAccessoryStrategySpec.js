(function () {
    'use strict';
    describe('SelectAccessoryStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            ADD_ACESSORY_VO = 'addAccessoryVO';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(delegate).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            it('should add an accessory on the active configuration proxy', function () {

                var accessoryVO = dataBuilder.ACCESSORY_1_VO(),
                    spy = spyOnDelegatehandleItemSelected(accessoryVO);

                sinon.assert.calledWith(spy, accessoryVO);
            });

            it('should remove an accessory on the active configuration proxy', function () {

                delegate.handleItemSelected(dataBuilder.ACCESSORY_1_VO());
                delegate.handleItemSelected(dataBuilder.ACCESSORY_1_VO());

                expect(getActiveConfigurationProxy().getAccessoryVOs().length).to.be(0);
            });


            it('should, when adding an accessory, remove any other accessory with the same group name. ' +
                'Mutual exclusivity', function () {

                delegate.handleItemSelected(dataBuilder.ACCESSORY_1_VO());
                delegate.handleItemSelected(dataBuilder.ACCESSORY_2_VO());

                expect(getActiveConfigurationProxy().getAccessoryVOs().length).to.be(1);
                expect(getActiveConfigurationProxy().getAccessoryVOs()[0]).to.be(dataBuilder.ACCESSORY_2_VO());
            });
        });

        function spyOnDelegatehandleItemSelected(itemVO) {

            var activeConfigurationProxy = getActiveConfigurationProxy(),
                spy = sinon.spy(activeConfigurationProxy, ADD_ACESSORY_VO);

            delegate.handleItemSelected(itemVO);

            activeConfigurationProxy[ADD_ACESSORY_VO].restore();
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

        function createSelectAccessoryStrategy() {
            delegate = new bmc.controller.support.ConfigurableItemSelection.SelectAccessoryStrategy(facade);
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
                createSelectAccessoryStrategy();
                done();
            });
        });

        function getDependencies() {
            return [

                'model/proxy/ActiveConfigurationProxy',
                'support/ConfigurableType',
                'controller/support/ConfigurableItemSelection/SelectAccessoryStrategy'
            ];
        }
    });
})();
