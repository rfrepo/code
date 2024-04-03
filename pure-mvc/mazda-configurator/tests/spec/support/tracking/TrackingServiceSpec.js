(function () {
    'use strict';
    describe('TrackingService', function () {

        var trackingService;

        beforeEach(function (done) {
            require([
                'support/tracking/TrackingService',
                'model/vo/SimpleConfigurationVO',
                'support/ConfigurableType'
            ], function () {
                trackingService = new bmc.support.tracking.TrackingService();

                done();
            });
        });

        describe('initializing TrackingService', function () {
            it('should be initialised', function () {
                expect(trackingService).to.not.be(undefined);
            });
        });

        describe('default values', function () {
            it('should be enabled', function () {
                expect(trackingService.getEnabled()).to.be(true);
            });
        });

        describe('tracking', function () {

            var trackingSpy, dataBuilder;

            function getSimpleConfigurationVO() {
                var simpleConfigurationVO = new bmc.model.vo.SimpleConfigurationVO();
                simpleConfigurationVO.setVehicleId('M3');
                simpleConfigurationVO.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                simpleConfigurationVO.addConfigurableItemVO(
                    bmc.support.ConfigurableType.COLOUR,
                    dataBuilder.COLOUR_1_VO()
                );
                simpleConfigurationVO.addConfigurableItemVO(
                    bmc.support.ConfigurableType.WHEEL,
                    dataBuilder.WHEEL_1_VO()
                );

                simpleConfigurationVO.addConfigurableItemVO(
                    bmc.support.ConfigurableType.TRIM,
                    dataBuilder.TRIM_1_VO()
                );

                return simpleConfigurationVO;
            }

            beforeEach(function () {
                dataBuilder = new bmc.support.data.DataBuilder();
                trackingSpy = sinon.spy();

                window[bmc.support.tracking.SophusTrackingMethod.TRACKING_METHOD] = trackingSpy;
            });

            describe('sophus', function () {
                beforeEach(function (done) {

                    require([
                        'support/tracking/SophusTrackingId',
                        'support/tracking/SophusTrackingSerializer',
                        'support/tracking/SophusTrackingMethod'
                    ], function () {
                        trackingService = new bmc.support.tracking.TrackingService(
                            bmc.support.tracking.SophusTrackingId,
                            bmc.support.tracking.SophusTrackingSerializer,
                            bmc.support.tracking.SophusTrackingMethod
                        );

                        done();
                    });
                });

                it('should track when up sell', function () {
                    trackingService.trackUpsellClick();

                    sinon.assert.calledWith(trackingSpy, 'Configurator/configuration_step/Upsell_clicked');
                });

                it('should track when up sell is accepted', function () {
                    trackingService.trackUpsellAccept();

                    sinon.assert.calledWith(trackingSpy, 'Configurator/configuration_step/Upsell_confirm_clicked');
                });

                it('should track when up sell is rejected', function () {
                    trackingService.trackUpsellReject();

                    sinon.assert.calledWith(trackingSpy, 'Configurator/configuration_step/Upsell_rejected_clicked');
                });

                it('should track configurable type bodystyle', function () {
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.BODYSTYLE);
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.GRADE);
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.ENGINE);
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.COLOUR);
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.WHEEL);
                    trackingService.trackConfigurableType(bmc.support.ConfigurableType.TRIM);

                    expect(trackingSpy.getCall(0).args[0], 'Configurator/Bodystyle');
                    expect(trackingSpy.getCall(1).args[0], 'Configurator/Grade');
                    expect(trackingSpy.getCall(2).args[0], 'Configurator/Engine');
                    expect(trackingSpy.getCall(3).args[0], 'Configurator/Colour');
                    expect(trackingSpy.getCall(4).args[0], 'Configurator/Wheels');
                    expect(trackingSpy.getCall(5).args[0], 'Configurator/Interior');
                });

                it('should track summary with current model', function () {
                    trackingService.trackSummary(getSimpleConfigurationVO());

                    sinon.assert.calledWith(trackingSpy,
                        'Configurator/Summary_NewCar?' +
                            'Model=M3' +
                            '&Body=Saloon' +
                            '&Grade=SE' +
                            '&Engine=2.0l 145ps Petrol Manual' +
                            '&Colour=Arctic White' +
                            '&Wheels=17" Alloy wheel' +
                            '&Interior=Black Cloth');
                });

                it('should track downloading a PDF', function () {
                    trackingService.trackPdfDownload(getSimpleConfigurationVO());

                    sinon.assert.calledWith(trackingSpy,
                        'Configurator/Summary_DownloadPDF_clicked?' +
                            'Model=M3' +
                            '&Body=Saloon' +
                            '&Grade=SE' +
                            '&Engine=2.0l 145ps Petrol Manual' +
                            '&Colour=Arctic White' +
                            '&Wheels=17" Alloy wheel' +
                            '&Interior=Black Cloth');
                });
            });
        });

    });
})();