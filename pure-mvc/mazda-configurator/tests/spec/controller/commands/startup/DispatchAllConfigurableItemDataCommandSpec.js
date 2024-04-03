(function () {
    'use strict';
    describe('DispatchAllConfigurableItemDataCommand', function () {

        var command,
            facade,

            gradesProxy,
            trimsProxy,
            enginesProxy,
            wheelsProxy,
            coloursProxy,
            accessoryProxy,
            optionPackProxy,

            dataBuilder,
            SEND_NOTIFICATION = 'sendNotification';

        describe('initializing dispatch', function () {

            it('should be defined', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('executing', function () {

            it('should send all the data from each proxy', function () {

                var spy = sinon.spy(command, SEND_NOTIFICATION),
                    ConfigurableType = bmc.support.ConfigurableType;
                command.execute();

                expect(spy.called).to.be(true);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.GRADE);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.ENGINE);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.COLOUR);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.WHEEL);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.TRIM);
                expect(spy.args[0][1]).to.have.property(ConfigurableType.ACCESSORIES);

                command[SEND_NOTIFICATION].restore();
            });
        });


        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createCommand() {
            command = new bmc.controller.command.startup.DispatchAllConfigurableItemDataCommand();
            command.initializeNotifier(new Date().getTime());
            command.facade = facade;
        }

        function createProxies() {

            var ConfigurableType = bmc.support.ConfigurableType;

            trimsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.TRIM);
            trimsProxy.data = dataBuilder.trims;
            facade.registerProxy(trimsProxy);

            enginesProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.ENGINE);
            enginesProxy.data = dataBuilder.engines;
            facade.registerProxy(enginesProxy);

            wheelsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.WHEEL);
            wheelsProxy.data = dataBuilder.wheels;
            facade.registerProxy(wheelsProxy);

            coloursProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.COLOUR);
            coloursProxy.data = dataBuilder.colours;
            facade.registerProxy(coloursProxy);

            gradesProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.GRADE);
            gradesProxy.data = dataBuilder.grades;
            facade.registerProxy(gradesProxy);

            accessoryProxy = new bmc.model.proxy.data.AccessoriesProxy();
            accessoryProxy.data = dataBuilder.accessories;
            facade.registerProxy(accessoryProxy);

            optionPackProxy = new bmc.model.proxy.data.OptionPackProxy();
            optionPackProxy.data = dataBuilder.optionPacks;
            facade.registerProxy(optionPackProxy);
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
                createProxies();
                createCommand();
                done();
            });
        });

        function getDependencies() {
            return [
                'controller/command/startup/DispatchAllConfigurableItemDataCommand',
                'model/proxy/data/ConfigurableItemProxy',
                'support/ConfigurableType'
            ];
        }
    });
})();
