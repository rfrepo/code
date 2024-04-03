(function () {
    'use strict';
    describe('ChangeBaseVehicleByTrimProxy', function () {

        var proxy,
            facade,
            dataBuilder,
            activeConfigurationVO,

            ENGINE = 'engine',
            GRADE = 'grade',
            BODYSTYLE = 'bodyStyle',
            SEND_NOTIFICATION_METHOD = 'sendNotification';

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('setBaseVehicleVO', function () {
            it('should not return undefined', function () {
                var baseVehicle;

                proxy.setSelectedTrimVO(dataBuilder.TRIM_3_VO());
                baseVehicle = proxy.setBaseVehicleVO();

                expect(baseVehicle).to.not.be(undefined);
            });
        });

        describe('updateBaseVehicleOrCurrentTrim', function () {

            describe('isSelectedTrimAvailableOnCurrentGrade if true', function () {

                it('should send a notification containing the selected trim', function () {

                    var spy = sinon.spy(proxy, SEND_NOTIFICATION_METHOD);

                    proxy.setSelectedTrimVO(dataBuilder.TRIM_1_VO());
                    proxy.updateBaseVehicleOrCurrentTrim();

                    expect(spy.called).to.be(true);
                    expect(spy.args[0][1]).to.be(dataBuilder.TRIM_1_VO());
                });
            });

            describe('isSelectedTrimAvailableOnCurrentGrade if false', function () {

                it('should send a notification containing new base vehicle and current engine choice', function () {

                    var spy = sinon.spy(proxy, SEND_NOTIFICATION_METHOD);

                    proxy.setSelectedTrimVO(dataBuilder.TRIM_2_VO());
                    proxy.updateBaseVehicleOrCurrentTrim();

                    expect(spy.called).to.be(true);
                    expect(spy.args[0][1]).to.be(dataBuilder.VEHICLE_5_VO());
                });

                it('should send a notification containing new base vehicle, current engine' +
                    'choice and selected trim', function () {

                    var spy = sinon.spy(proxy, SEND_NOTIFICATION_METHOD);

                    proxy.setSelectedTrimVO(dataBuilder.TRIM_2_VO());
                    proxy.updateBaseVehicleOrCurrentTrim();

                    expect(spy.called).to.be(true);
                    expect(spy.args[0][1]).to.be(dataBuilder.VEHICLE_5_VO());
                    expect(spy.getCall(1).args[1]).to.be(dataBuilder.TRIM_2_VO());
                });

                it('should send a notification containing new base vehicle, current engine' +
                    'choice and selected trim', function () {

                    var spy = sinon.spy(proxy, SEND_NOTIFICATION_METHOD);

                    proxy.setSelectedTrimVO(dataBuilder.TRIM_3_VO());
                    proxy.updateBaseVehicleOrCurrentTrim();

                    expect(spy.called).to.be(true);
                    expect(spy.args[0][1]).to.be(dataBuilder.VEHICLE_5_VO());
                    expect(spy.args[0][1].getDefaultsVO().getTrimVO()).to.be(dataBuilder.TRIM_3_VO());
                    expect(spy.getCall(1).args[1]).to.be(dataBuilder.TRIM_3_VO());
                });
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                setupActiveConfigurationVO();

                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createChangeBaseVehicleByTrimProxy();
                setupProxyWithVehicles();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/ChangeBaseVehicleByTrimProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createChangeBaseVehicleByTrimProxy() {
            proxy = new bmc.model.proxy.ChangeBaseVehicleByTrimProxy();
            proxy.setActiveConfigurationVO(activeConfigurationVO);
            facade.registerProxy(proxy);

        }

        function setupActiveConfigurationVO() {

            activeConfigurationVO = {
                getConfigurableItemVO: function (type) {
                    return this[type];
                }
            };

            activeConfigurationVO[ENGINE] = dataBuilder.ENGINE_5_VO();
            activeConfigurationVO[GRADE] = dataBuilder.GRADE_001_VO();
            activeConfigurationVO[BODYSTYLE] = dataBuilder.BODYSTYLE_2200_VO();
        }

        function setupProxyWithVehicles() {

            proxy.setBaseVehicles([
                dataBuilder.VEHICLE_1_VO(),
                dataBuilder.VEHICLE_2_VO(),
                dataBuilder.VEHICLE_3_VO(),
                dataBuilder.VEHICLE_4_VO(),
                dataBuilder.VEHICLE_5_VO(),
                dataBuilder.VEHICLE_6_VO()
            ]);
        }

    });
})();
