'use strict';
(function () {
    describe('CreateConflictPriceCommandSpec', function () {

            var facade,
                command,
                dataBuilder,
                priceConflictVO;

            describe('Class should exist ', function () {

                it('should instance CreateConflictPriceCommand', function () {
                    expect(command).not.to.be(undefined);
                });
            });

            describe('execute', function () {

                it('should populate a price conflict vo', function () {

                    var note = createNote(),
                        conflict = note.getBody()[0];

                    command.execute(note);

                    expect(conflict.getPreviousValue()).not.to.be(undefined);
                    expect(conflict.getCurrentValue()).not.to.be(undefined);
                });
            });

            beforeEach(function (done) {

                require(getDependencies(), function () {

                    createFacade();
                    createPriceConflictVO();
                    createPopulatedActiveConfigurationProxy();
                    createCalculationProxy();
                    createCommand();
                    done();
                });
            });

            before(function (done) {

                require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                    dataBuilder = new bmc.support.data.DataBuilder();
                    done();
                });
            });

            function createNote() {

                return {
                    getBody: function () {
                        return [priceConflictVO];
                    }
                };
            }

            function createPriceConflictVO() {

                priceConflictVO = new bmc.model.vo.ConflictVO();
                priceConflictVO.setType(bmc.support.GlobalConstants.PRICE);
            }

            function createCalculationProxy() {
                var proxy = new bmc.model.proxy.PriceCalculationProxy();
                facade.registerProxy(proxy);
            }

            function createPopulatedActiveConfigurationProxy() {

                var proxy = new bmc.model.proxy.ActiveConfigurationProxy();
                facade.registerProxy(proxy);

                proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                proxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
            }

            function createFacade() {
                facade = puremvc.Facade.getInstance(new Date().getTime());
            }

            function createCommand() {
                command = new bmc.controller.command.CreateConflictPriceCommand();
                command.facade = facade;
            }

            function getDependencies() {
                return [
                    'controller/command/CreateConflictPriceCommand',
                    'model/proxy/ActiveConfigurationProxy',
                    'model/proxy/PriceCalculationProxy',
                    'support/GlobalConstants',
                    'model/vo/ConflictVO'
                ];
            }
        }
    );
})();
