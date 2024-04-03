(function () {
    'use strict';
    describe('ChangeBaseVehicleByEngineProxy', function () {

        var proxy,
            facade,
            dataBuilder,
            SEND_NOFICATION_METHOD = 'sendNotification';


        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createChangeBaseVehicleByEngineProxy();
                setupProxyWithVehicles();
                done();
            });
        });

        describe('command class should exist ', function () {

            it('should be instanced', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('updateBaseVehicle', function () {

            it('should have the cheapest base with the selected engine', function () {

                proxy.setCurrentGradeVO(dataBuilder.GRADE_001_VO());
                proxy.setSelectedEngineVO(dataBuilder.ENGINE_3_VO());
                proxy.updateBaseVehicle();

                expect(proxy.newBaseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
            });

            it('should send a notification containing the new base vehicle', function () {

                var spy = sinon.spy(proxy, SEND_NOFICATION_METHOD);

                proxy.setCurrentGradeVO(dataBuilder.GRADE_001_VO());
                proxy.setSelectedEngineVO(dataBuilder.ENGINE_1_VO());
                proxy.updateBaseVehicle();

                expect(spy.called).to.be(true);
                expect(spy.args[0][1]).not.have.property(dataBuilder.VEHICLE_1_ID());

                proxy.sendNotification.restore();
            });
        });


        function getDependencies() {
            return [
                'model/proxy/ChangeBaseVehicleByEngineProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createChangeBaseVehicleByEngineProxy() {
            proxy = new bmc.model.proxy.ChangeBaseVehicleByEngineProxy();
            facade.registerProxy(proxy);
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
