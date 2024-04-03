(function () {
    'use strict';
    describe('UrlBuilder', function () {

        var UrlBuilder,
            activeConfigurationVO,
            activeConfigurationProxy,
            dataBuilder,
            EXPECTED_WHEEL_01_URL = 'whe_01',
            EXPECTED_WHEEL_02_URL = 'whe_02',
            EXPECTED_TRIM_URL = '2200_TRIM_IMAGE_URL',
            EXPECTED_ACCESSORY_URL = '2200_GHP9-V4-090';

        describe('Retrieving render image url from VO', function () {

            describe('Wheel url path', function () {

                it('should return an image url for wheel with a bodystyle precondition', function () {

                    var url = UrlBuilder.getWheelImageURL(activeConfigurationVO);
                    expect(url).to.contain(EXPECTED_WHEEL_01_URL);
                });

                it('should return an image url for wheel without preconditions', function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
                    activeConfigurationVO = activeConfigurationProxy.getSimplified();

                    var url = UrlBuilder.getWheelImageURL(activeConfigurationVO);
                    expect(url).to.contain(EXPECTED_WHEEL_02_URL);
                });

            });

            describe('Trim url path', function () {

                it('should return an image url for trim with bodystyle grade engine precondition', function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_4_VO());
                    activeConfigurationVO = activeConfigurationProxy.getSimplified();

                    var url = UrlBuilder.getTrimImageURL(activeConfigurationVO);
                    expect(url).to.contain(EXPECTED_TRIM_URL);
                });

            });

            describe('Accessories url path', function () {

                it('should return an image url for accessories', function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_4_VO());
                    activeConfigurationVO = activeConfigurationProxy.getSimplified();

                    var url = UrlBuilder.getAccessoryImageURL(dataBuilder.ACCESSORY_1_VO(), activeConfigurationVO);
                    expect(url).to.contain(EXPECTED_ACCESSORY_URL);
                });

            });
        });

        before(function (done) {

            require(getDependencies(), function () {

                dataBuilder = new bmc.support.data.DataBuilder();

                setupGlobalConfig();
                createActiveConfigurationVO();
                createUrlBuilder();

                done();
            });
        });

        function getDependencies() {
            return ['../../../' + 'test/spec/support/data/DataBuilder',
                'support/UrlBuilder',
                'model/proxy/ActiveConfigurationProxy'
            ];
        }

        function createUrlBuilder() {
            UrlBuilder = bmc.support.UrlBuilder;
        }

        function createActiveConfigurationVO() {
            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            activeConfigurationProxy.sendNotification = function () {
            };

            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
            activeConfigurationVO = activeConfigurationProxy.getSimplified();
        }

        function setupGlobalConfig() {

            var globalConfig = bmc.support.GlobalConfig.getInstance();
            globalConfig.applyLocaleData('en-gb');
            globalConfig.setVehicleId('m6');
        }

    });
})();
