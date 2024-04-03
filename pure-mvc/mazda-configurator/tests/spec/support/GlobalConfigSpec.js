(function () {
    'use strict';

    describe('GlobalConfig', function () {

        var globalConfig,
            secondNewConfig;

        beforeEach(function (done) {
            require([], function () {
                globalConfig = bmc.support.GlobalConfig.getInstance();
                secondNewConfig = bmc.support.GlobalConfig.getInstance();

                setBurrowsApp();

                done();
            });
        });

        afterEach(function () {
            bmc.support.GlobalConfig.instance = null;
        });

        describe('retrieving data', function () {
            it('should be able to retrieve JSON', function () {
                var country = 'en-gb';

                globalConfig.applyLocaleData(country);

                expect(globalConfig.CURRENCY_SYMBOL).to.be('£');
                expect(secondNewConfig.CURRENCY_SYMBOL).to.be('£');

                expect(globalConfig.MODEL_DATA_LOCATION.extension).to.be('.json');
                expect(globalConfig.VEHICLE_IMAGES_LOCATION).to.be(
                    'resources/locale/en-gb/[[vehicleId]]/images/exterior/');
                expect(globalConfig.INTERIOR_IMAGES_LOCATION).to.be(
                    'resources/locale/en-gb/[[vehicleId]]/images/interior/');
                expect(globalConfig.globalConstants.SPRITE_SHEET_NAME).to.be('_spritesheet');
            });
        });

        function setBurrowsApp() {
            window.burrows = {
                app: {}
            };
            burrows.app.localeDataLoadedIntoGlobalConfig = function () {};
        }

    });
})();
