(function () {
    'use strict';
    describe('ModelFilePathCalculator', function () {


        beforeEach(function (done) {
            require(['support/ModelFilePathCalculator'], function () {
                setupBMCAPP();
                done();
            });
        });

        after(function () {
            bmc.support.GlobalConfig.instance = null;
            bmc.support.GlobalConfig.getInstance();
        });

        describe('full path return using both parts of global variable', function () {
            it('should return full file path', function () {
                var loaderString = new bmc.support.ModelFilePathCalculator('m6');
                expect(loaderString.getPath()).to.be('resources/data/m6.json');
            });
        });

        describe('test flexibility of input', function () {
            it('shouldn\'t be case sensitive', function () {
                bmc.support.GlobalConfig.MODEL_DATA_LOCATION = {'path': 'resources/data/', 'extension': '.json'};
                var loaderString = new bmc.support.ModelFilePathCalculator('M3');
                expect(loaderString.getPath()).to.be('resources/data/m3.json');
            });
        });

        function setupBMCAPP() {
            bmc.support.GlobalConfig.instance = null;
            var global = bmc.support.GlobalConfig.getInstance();
            global.applyLocaleData('en-gb');
            global.MODEL_DATA_LOCATION = {'path': 'resources/data/', 'extension': '.json'};

        }

    });
})();