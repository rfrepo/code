(function () {
    'use strict';
    describe('ActiveConfigurationChangeCommand', function () {

        var command,
            facade,
            CHECK_FOR_CONFLICTS = 'checkForConflicts',
            CALCULATE = 'calculate',
            navigationProxy;

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('execute', function () {

            it('should call checkForConflicts on configurationConflictProxy', function () {

                var spy,
                    proxyName = bmc.model.proxy.ConfigurationConflictProxy.NAME,
                    spyMethodName = CHECK_FOR_CONFLICTS;

                spy = createSpyAndExecute(proxyName, spyMethodName);

                expect(spy.called).to.be(true);
            });


            it('should call calculate on priceCalculationProxy', function () {

                var spy,
                    proxyName = bmc.model.proxy.PriceCalculationProxy.NAME,
                    spyMethodName = CALCULATE;

                spy = createSpyAndExecute(proxyName, spyMethodName);

                expect(spy.called).to.be(true);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createProxies();
                stubProxyMethodsToBeTested();
                createActiveConfigurationChangeCommand();
                done();
            });
        });

        afterEach(function () {
            navigationProxy.getActiveSectionVO.restore();
        });

        function createSpyAndExecute(proxyName, spyMethodName) {

            var spy,
                proxy = facade.retrieveProxy(proxyName),
                originalMethod = proxy[spyMethodName];

            proxy[spyMethodName] = function () {
            };

            spy = sinon.spy(proxy, spyMethodName);

            command.execute(createMockNotification());

            proxy[spyMethodName].restore();
            proxy[spyMethodName] = originalMethod;

            return spy;

        }

        function getDependencies() {
            return [
                'controller/command/ActiveConfigurationChangeCommand',
                'model/proxy/ConfigurationConflictProxy',
                'model/proxy/NavigationProxy',
                'model/proxy/PriceCalculationProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createMockNotification() {
            return {
                getBody: function () {
                    return  {
                        getSimplified: function () {
                            return {};
                        },
                        getConfigurableItemVO: function () {
                            return {};
                        }
                    };
                }
            };
        }

        function createActiveConfigurationChangeCommand() {
            command = new bmc.controller.command.ActiveConfigurationChangeCommand();
            command.initializeNotifier(new Date().getTime());
            command.facade = facade;
        }

        function createProxies() {
            facade.registerProxy(new bmc.model.proxy.ConfigurationConflictProxy());
            facade.registerProxy(new bmc.model.proxy.PriceCalculationProxy());

            navigationProxy = new bmc.model.proxy.NavigationProxy();
            sinon.stub(navigationProxy, 'getActiveSectionVO').returns({});

            facade.registerProxy(navigationProxy);
        }

        function stubProxyMethodsToBeTested() {

            var stubFuntion = function () {},
                priceCalculationProxy = facade.retrieveProxy(bmc.model.proxy.PriceCalculationProxy.NAME),
                configurationConflictProxy = facade.retrieveProxy(bmc.model.proxy.ConfigurationConflictProxy.NAME);

            priceCalculationProxy[CALCULATE] = stubFuntion;
            configurationConflictProxy[CHECK_FOR_CONFLICTS] = stubFuntion;
        }
    });
})();
