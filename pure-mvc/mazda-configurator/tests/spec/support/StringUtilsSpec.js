(function () {
    'use strict';

    var globalConfig;

    describe('truncate', function () {

        before(function (done) {
            require(['support/StringUtils'  ], function () {
                bmc.support.GlobalConfig.instance = null;
                globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.applyLocaleData('en-gb');
                done();
            });
        });

        describe('simple reduction', function () {
            it('should shrink a string to 20 characters', function () {
                var testString = 'Keith and Ricky are nice guys, but Mark is the best one here.',
                    shrunkenString = bmc.support.StringUtils.truncate(testString, 20);

                expect(shrunkenString).to.be('Keith and Ricky are ...');
            });
        });

        describe('simple reduction', function () {
            it('should shrink a string to 40 characters', function () {
                var testString = 'Keith and Ricky are nice guys, but Mark is the best one here.',
                    shrunkenString = bmc.support.StringUtils.truncate(testString, 40);

                expect(shrunkenString).to.be('Keith and Ricky are nice guys, but Mark ...');
            });
        });

        describe('simple reduction with 3rd argument', function () {
            it('should shrink a string to 5 characters and append caveat', function () {
                var testString = 'Mark A R Smith',
                    shrunkenString = bmc.support.StringUtils.truncate(testString, 5, '<NAME OF USER>');

                expect(shrunkenString).to.be('Mark <NAME OF USER>');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 2 dp with en-gb style', function () {
                var testPrice = 21000.12;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.12');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 2 dp with en-gb style', function () {
                var testPrice = 21000.1255;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.13');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 2 dp with en-gb style', function () {
                var testPrice = 21000;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.00');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - empty string', function () {
                var testPrice = '';
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£0.00');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - undefined', function () {
                expect(bmc.support.StringUtils.formatPrice(undefined)).to.be('£0.00');
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 3 dp with en-gb style', function () {
                var testPrice = 21000.1235,
                backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 3;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.124');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 1 dp', function () {
                var testPrice = 21000.1235,
                    backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 1;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.1');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 0 dp remove', function () {
                var testPrice = 21000.1235,
                    backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 0;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 2 dp round up without losing 0s', function () {
                var testPrice = 21000.0050,
                    backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 2;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.01');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required - 2dp round down', function () {
                var testPrice = 21000.0001,
                    backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 2;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,000.00');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('simple price format', function () {
            it('should be able to present the price as required ' +
                '- round up from decimal to value when 0 sp', function () {
                var testPrice = 21000.9000,
                    backup = globalConfig.CURRENCY_PRECISION;
                globalConfig.CURRENCY_PRECISION = 0;
                expect(bmc.support.StringUtils.formatPrice(testPrice)).to.be('£21,001');
                globalConfig.CURRENCY_PRECISION = backup;
            });
        });

        describe('method to add leading zeros to a number', function () {
            it('should be able to make any single-digit number be 5 sig figs', function () {
                var testNumber = 1,
                    ammendedNumberAsString;

                ammendedNumberAsString = bmc.support.StringUtils.padNumberWithZeros(testNumber, 5);

                expect(ammendedNumberAsString).to.be('00001');
            });
        });

        describe('method to add leading zeros to a number', function () {
            it('should be able to make any double-digit number be 5 sig figs', function () {
                var testNumber = 12,
                    ammendedNumberAsString;

                ammendedNumberAsString = bmc.support.StringUtils.padNumberWithZeros(testNumber, 5);

                expect(ammendedNumberAsString).to.be('00012');
            });
        });

    });
})();