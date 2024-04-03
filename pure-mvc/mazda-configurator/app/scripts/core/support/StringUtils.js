define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.StringUtils' },
        {},
        {
            truncate: function (string, maxChars) {
                var overflow = (!arguments[2]) ? '...' : arguments[2];

                if (string.length > maxChars) {
                    string = string.substr(0, maxChars) + overflow;
                }
                return string;
            },

            formatPrice: function (price) {
                price = (price) ? price : '0';
                var numberAsString = String(price),
                    globalConfig = bmc.support.GlobalConfig.getInstance(),
                    splitString = numberAsString.split('.'),
                    decimalAsString = '';

                numberAsString = splitString[0];

                if (Number(globalConfig.CURRENCY_PRECISION) > 0 && splitString[1]) {
                    decimalAsString = globalConfig.DECIMAL_DELIMINATOR +
                        this.roundUpToSignificantFigures(Number(globalConfig.CURRENCY_PRECISION), splitString[1]);
                }
                else if (Number(globalConfig.CURRENCY_PRECISION) > 0) {
                    decimalAsString = globalConfig.DECIMAL_DELIMINATOR +
                        this.createZerosSignificantFigures(Number(globalConfig.CURRENCY_PRECISION));
                }
                else if (Number(globalConfig.CURRENCY_PRECISION) === 0 && splitString[1]) {
                    if (this.roundUpToSignificantFigures(1, splitString[1]) > 5) {
                        numberAsString = String(Number(numberAsString) + 1);
                    }
                }

                numberAsString = this.applyThousandDeliminator(numberAsString, globalConfig);
                if (numberAsString.length === 0) {
                    numberAsString = '0';
                }
                return globalConfig.CURRENCY_SYMBOL + numberAsString + decimalAsString;
            },

            applyThousandDeliminator: function (numberAsString, globalConfig) {
                if (numberAsString.length > 3) {
                    numberAsString = numberAsString.splice(-3, 0, globalConfig.THOUSAND_DELIMINATOR);
                }
                return numberAsString;
            },

            createZerosSignificantFigures: function (decimalPlaces) {
                var output = '',
                    i = 0;

                for (i; i < decimalPlaces; i++) {
                    output += '0';
                }

                return output;
            },

            padNumberWithZeros: function (value, paddingAmount) {
                return this.createZerosSignificantFigures(paddingAmount - String(value).length) + value;
            },

            roundUpToSignificantFigures: function (decimalPlaces, value) {
                var roundedUpNumber = Math.round(Number(value) / Math.pow(10, value.length - decimalPlaces)),
                    missingPlaces;
                if (String(roundedUpNumber).length !== decimalPlaces) {
                    missingPlaces = decimalPlaces - String(roundedUpNumber).length;
                    roundedUpNumber = this.createZerosSignificantFigures(missingPlaces) + String(roundedUpNumber);
                }
                return roundedUpNumber;
            }

        }
    );
});
