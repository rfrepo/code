(function () {
    'use strict';

    describe('DistributeModelDataToProxiesForParsingCommand', function () {

        var command,
            facade,
            ConfigurableType,
            PARSE_DATA = 'parseData';

        describe('initialize', function () {

            it('should be defined', function () {
                expect(command).to.not.be(undefined);
            });
        });

        describe('executing', function () {

            it('should call parseData on Bodystyle proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.BODYSTYLE);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on Grade proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.GRADE);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on Engine proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.ENGINE);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on Colour proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.COLOUR);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on Wheel proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.WHEEL);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on Trim proxy', function () {

                var spy = createSpyAndCallExecute(ConfigurableType.TRIM);
                expect(spy.called).to.be(true);
            });

            it('should call parseData on BaseVehiclesProxy', function () {

                var proxyName = bmc.model.proxy.data.BaseVehiclesProxy.NAME,
                    spy = createSpyAndCallExecute(proxyName);

                expect(spy.called).to.be(true);
            });

            it('should call parseData on BaseVehiclesDefaultsProxy', function () {

                var proxyName = bmc.model.proxy.data.BaseVehiclesDefaultsProxy.NAME,
                    spy = createSpyAndCallExecute(proxyName);

                expect(spy.called).to.be(true);
            });

            it('should call parseData on StandardFeaturesProxy', function () {

                var proxyName = bmc.model.proxy.data.StandardFeaturesProxy.NAME,
                    spy = createSpyAndCallExecute(proxyName);

                expect(spy.called).to.be(true);
            });

            it('should call parseData on AccessoriesProxy', function () {

                var proxyName = bmc.model.proxy.data.AccessoriesProxy.NAME,
                    spy = createSpyAndCallExecute(proxyName);

                expect(spy.called).to.be(true);
            });

            it('should call parseData on OptionPackProxy', function () {

                var proxyName = bmc.model.proxy.data.OptionPackProxy.NAME,
                    spy = createSpyAndCallExecute(proxyName);

                expect(spy.called).to.be(true);
            });
        });

        beforeEach(function (done) {

            require(['controller/command/startup/DistributeModelDataToProxiesForParsingCommand',
                'support/ConfigurableType',
                'model/proxy/data/ConfigurableItemProxy',
                'model/proxy/data/BaseVehiclesProxy',
                'model/proxy/data/BaseVehiclesDefaultsProxy',
                'model/proxy/data/AccessoriesProxy',
                'model/proxy/data/OptionPackProxy',
                'model/proxy/data/StandardFeaturesProxy',
                'support/GlobalConfig'
            ], function () {

                facade = puremvc.Facade.getInstance(new Date().getTime());

                command = new bmc.controller.command.startup.DistributeModelDataToProxiesForParsingCommand();
                command.facade = facade;

                ConfigurableType = bmc.support.ConfigurableType;

                resetGlobalConfig();

                createProxies();

                done();
            });
        });


        function createSpyAndCallExecute(proxyName) {

            var proxy = facade.retrieveProxy(proxyName),
                spy = sinon.spy(proxy, PARSE_DATA);

            command.execute(getMockNotification(getDataStub()));

            proxy[PARSE_DATA].restore();

            return spy;
        }

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

        function createProxies() {

            createUniqueProxies();
            createConfigurableTypeProxies();
        }

        function createUniqueProxies() {

            facade.registerProxy(new bmc.model.proxy.data.BaseVehiclesProxy());
            facade.registerProxy(new bmc.model.proxy.data.BaseVehiclesDefaultsProxy());
            facade.registerProxy(new bmc.model.proxy.data.StandardFeaturesProxy());
            facade.registerProxy(new bmc.model.proxy.data.AccessoriesProxy());
            facade.registerProxy(new bmc.model.proxy.data.OptionPackProxy());
        }

        function createConfigurableTypeProxies() {

            var ConfigurableType = bmc.support.ConfigurableType;

            createConfigurableTypeProxy(ConfigurableType.BODYSTYLE);
            createConfigurableTypeProxy(ConfigurableType.GRADE);
            createConfigurableTypeProxy(ConfigurableType.ENGINE);
            createConfigurableTypeProxy(ConfigurableType.COLOUR);
            createConfigurableTypeProxy(ConfigurableType.WHEEL);
            createConfigurableTypeProxy(ConfigurableType.TRIM);
        }

        function createConfigurableTypeProxy(type) {

            var ConfigurableType = bmc.support.ConfigurableType,
                ConfigurableItemProxyClass = bmc.model.proxy.data.ConfigurableItemProxy;

            facade.registerProxy(new ConfigurableItemProxyClass(type, ConfigurableType.getDataKey(type)));
        }

        function getDataStub() {
            return {
                baseVehicles: [],
                bodyStyles: [],
                grades: [],
                engines: [],
                colours: [],
                wheels: [],
                trims: [],
                baseVehicleDefaults: [],
                standardFeatures: [],
                accessories: [],
                optionPack: []
            };
        }

        function getMockNotification(body) {
            return {
                getBody: function () {
                    return body;
                }
            };
        }
    });
})();