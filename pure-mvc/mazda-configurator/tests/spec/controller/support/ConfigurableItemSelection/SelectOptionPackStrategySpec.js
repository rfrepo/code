(function () {
    'use strict';
    describe('SelectOptionPackStrategy', function () {

        var delegate,
            facade,
            dataBuilder,
            activeConfigurationProxy;

        describe('strategy class should exist ', function () {

            it('should instance SelectOptionPackStrategy', function () {
                expect(delegate).not.to.be(undefined);
            });
        });


        describe('handleItemSelected', function () {

            it('should add an option pack on the active configuration proxy', function () {

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_5_VO());
                delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());

                expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_6_VO());
                expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_1_VO());
            });

            it('should handle adding two option packs in succession', function () {

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_5_VO());
                delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());
                delegate.handleItemSelected(dataBuilder.OPTIONPACK_2_VO());

                expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_7_VO());
                expect(activeConfigurationProxy.getOptionPackVOs().length).to.be(2);
            });

            it('should handle toggle option packs : eg white leather cannot co exist with black leather',
                function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_8_VO());
                    delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());

                    expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_6_VO());
                });
        });

        describe('removing', function () {

            it('should remove the existing option pack on the active configuration proxy', function () {

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
                delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());

                expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
                expect(activeConfigurationProxy.getOptionPackVOs().length).to.be(0);
            });
        });

        describe('selection dependencies', function () {

            it('should add an option pack on the active configuration proxy as well as the trim inside the selection' +
                ' dependency', function () {

                var TRIM = bmc.support.ConfigurableType.TRIM;

                activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_5_VO());

                delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());

                expect(activeConfigurationProxy.getConfigurableItemVO(TRIM)).to.be(dataBuilder.TRIM_2_VO());
                expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_1_VO());
            });

            /*
             it.skip('should remove option pack from the active configuration proxy and reset to the vehicles default
             trim',function () {

             var TRIM = bmc.support.ConfigurableType.TRIM;

             activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_5_VO());

             delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());
             delegate.handleItemSelected(dataBuilder.OPTIONPACK_1_VO());

             console.log(activeConfigurationProxy.baseVehicle);

             expect(activeConfigurationProxy.getConfigurableItemVO(TRIM)).to.be(dataBuilder.TRIM_1_VO());
             });*/
        });


        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
            facade.registerCommand(bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                bmc.controller.command.ConfigurableItemSelectionCommand);
        }

        function createActiveConfigurationProxy() {
            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            facade.registerProxy(activeConfigurationProxy);
        }

        function createBaseVehicleProxy() {

            var baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy();
            baseVehiclesProxy.data = dataBuilder.baseVehicles;
            facade.registerProxy(baseVehiclesProxy);
        }

        function createSelectAccessoryStrategy() {
            delegate = new bmc.controller.support.ConfigurableItemSelection.SelectOptionPackStrategy(facade);
        }

        function createTrimProxy() {
            var trimsProxy = new bmc.model.proxy.data.ConfigurableItemProxy(bmc.support.ConfigurableType.TRIM);
            trimsProxy.data = dataBuilder.trims;
            facade.registerProxy(trimsProxy);
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
                createTrimProxy();
                createBaseVehicleProxy();
                createSelectAccessoryStrategy();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/ActiveConfigurationProxy',
                'support/ConfigurableType',
                'model/proxy/data/ConfigurableItemProxy',
                'controller/command/ConfigurableItemSelectionCommand',
                'controller/support/ConfigurableItemSelection/SelectOptionPackStrategy'
            ];
        }
    });
})();
