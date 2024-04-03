(function () {
    'use strict';

    describe('ActiveConfigurationProxy', function () {

        var proxy,
            GET_ID = 'id',
            SEND_NOTIFICATION_METHOD = 'sendNotification',
            dataBuilder;

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        function createMockVO() {
            return {
                getId: function () {
                    return '001';
                }
            };
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                proxy = new bmc.model.proxy.ActiveConfigurationProxy();
                facade.registerProxy(proxy);
                done();
            });
        });

        describe('the proxy should be properly initialised', function () {

            it('should be initialised', function () {
                expect(proxy).to.not.be(undefined);
            });

            it('should generate a unique id', function () {
                var c1 = new bmc.model.proxy.ActiveConfigurationProxy(),
                    c2 = new bmc.model.proxy.ActiveConfigurationProxy();

                expect(c1.getId()).not.to.equal(c2.getId());
            });
        });

        describe('simplifying data', function () {

            function createVO(id) {
                return new bmc.model.vo.data.ConfigurableItemVO({
                    id: id
                });
            }

            it('should return a simplified version of the configuration', function () {

                var ConfigurableType = bmc.support.ConfigurableType,
                    bodystyleId = 'BB1',
                    bodystyleVO = createVO(bodystyleId),
                    gradeId = 'GG1',
                    gradeVO = createVO(gradeId),
                    colourId = 'CC1',
                    colourVO = createVO(colourId),
                    wheelId = 'WW1',
                    wheelVO = createVO(wheelId),
                    modelId = 'm6',
                    locale = 'en-GB',
                    simples;

                proxy.setVehicleId(modelId);
                proxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());
                proxy.setLocale(locale);
                proxy.setConfigurableItemVO(ConfigurableType.BODYSTYLE, bodystyleVO);
                proxy.setConfigurableItemVO(ConfigurableType.BODYSTYLE, bodystyleVO);
                proxy.setConfigurableItemVO(ConfigurableType.GRADE, gradeVO);
                proxy.setConfigurableItemVO(ConfigurableType.COLOUR, colourVO);
                proxy.setConfigurableItemVO(ConfigurableType.WHEEL, wheelVO);

                simples = proxy.getSimplified();

                expect(simples.getId()).to.equal(proxy.getId());
                expect(simples.getVehicleId()).to.equal(proxy.getVehicleId());
                expect(simples.getLocale()).to.equal(proxy.getLocale());
                expect(simples.getConfigurableItemVO(ConfigurableType.BODYSTYLE).getId()).to.equal(bodystyleId);
                expect(simples.getConfigurableItemVO(ConfigurableType.GRADE).getId()).to.equal(gradeId);
                expect(simples.getConfigurableItemVO(ConfigurableType.COLOUR).getId()).to.equal(colourId);
                expect(simples.getConfigurableItemVO(ConfigurableType.WHEEL).getId()).to.equal(wheelId);
                expect(simples.getAccessoryVOs()).to.contain(dataBuilder.ACCESSORY_1_VO());
            });
        });

        describe('the proxy should send a notification when a property is set', function () {

            it('sends notification containing the change vo', function () {

                var spy = sinon.spy(proxy, SEND_NOTIFICATION_METHOD),
                    configurableType = bmc.support.ConfigurableType.GRADE;

                proxy.setConfigurableItemVO(configurableType, createMockVO());

                expect(spy.args[0][2]).to.be(configurableType);
                expect(spy.args[0][1]).not.have.property(GET_ID);

                proxy[SEND_NOTIFICATION_METHOD].restore();
            });
        });

        describe('validate current configurations', function () {

            describe('Selected Colour validation', function () {

                it('should retain colour if it is compatible with base vehicle', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_4_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());

                    var colourVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.COLOUR);

                    expect(colourVO).to.be(dataBuilder.COLOUR_7_VO());
                });

                it('should replace colour to the base vehicle default', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());

                    var colourVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.COLOUR);

                    expect(colourVO.getId()).to.be(dataBuilder.COLOUR_8_ID());
                });
            });

            describe('Selected Wheel validation', function () {

                it('should retain wheel if it is compatible with base vehicle', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_4_VO());

                    var wheelVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.WHEEL);

                    expect(wheelVO.getId()).to.be(dataBuilder.WHEEL_1_ID());
                });

                it('should replace wheel to the base vehicle default', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
                    var wheelVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.WHEEL);
                    expect(wheelVO.getId()).to.be(dataBuilder.WHEEL_2_ID());

                });
            });

            describe('Selected Trim validation', function () {

                it('should retain trim if it is compatible with base vehicle', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_2_VO());

                    var trimVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.TRIM);

                    expect(trimVO.getId()).to.be(dataBuilder.TRIM_1_ID());
                });

                it('should replace wheel to the base vehicle default', function () {

                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    proxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());

                    var trimVO = proxy.getConfigurableItemVO(bmc.support.ConfigurableType.TRIM);

                    expect(trimVO.getId()).to.be(dataBuilder.TRIM_2_ID());
                });
            });

            describe('Accessories', function () {

                describe('addAccessoryVO) ', function () {

                    it('should store an accessoryVO in its accessoryVOs array', function () {

                        var spy = sinon.spy(proxy, 'sendChangeNotification');

                        proxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());
                        proxy.sendChangeNotification.restore();

                        expect(proxy.accessoryVOs).to.contain(dataBuilder.ACCESSORY_1_VO());
                        expect(spy.called).to.be(true);
                    });
                });

                describe('removeAccessoryVO) ', function () {

                    it('should remove accessoryVO from its accessoryVOs array', function () {

                        proxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());
                        proxy.addAccessoryVO(dataBuilder.ACCESSORY_2_VO());

                        var spy = sinon.spy(proxy, 'sendChangeNotification');
                        proxy.removeAccessoryVO(dataBuilder.ACCESSORY_1_VO());

                        expect(proxy.accessoryVOs).not.to.contain(dataBuilder.ACCESSORY_1_VO());
                        expect(proxy.accessoryVOs.length).to.be(1);
                        expect(spy.called).to.be(true);

                        proxy.sendChangeNotification.restore();
                    });
                });

                describe('getAccessoryVOById) ', function () {

                    it('should retrieve the accessoryVO by id', function () {

                        proxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());

                        var accessoryVO = proxy.getAccessoryVOById(dataBuilder.ACCESSORY_1_ID());

                        expect(accessoryVO).to.be(dataBuilder.ACCESSORY_1_VO());
                    });
                });
            });

            describe('OptionPack', function () {

                describe('getOptionPackVOs) ', function () {

                    it('should retrieve any optionPackVOs directly from the currently set base vehicle', function () {

                        proxy.setBaseVehicleVO(dataBuilder.VEHICLE_7_VO());
                        expect(proxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_1_VO());
                    });
                });
            });
        });

        function getDependencies() {
            return [
                'model/proxy/ActiveConfigurationProxy',
                'support/ConfigurableType',
                'model/vo/SimpleConfigurationVO',
                'model/vo/data/ConfigurableItemVO',
                'support/NotificationNames'
            ];
        }

    });
})();