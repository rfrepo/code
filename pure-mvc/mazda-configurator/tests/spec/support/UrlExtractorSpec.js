(function () {
    'use strict';

    describe('UrlExtractor', function () {

        var urlExtractor;

        beforeEach(function (done) {
            require([
                'support/UrlExtractor',
                'support/LocaleDictionary'
            ], function () {
                urlExtractor = new bmc.support.UrlExtractor(
                    new bmc.support.LocaleDictionary()
                );

                done();
            });
        });

        describe('intialised', function () {
            it('should initialise CountryValidator', function () {
                urlExtractor.urlString = '?&locale=engb';
                expect(urlExtractor).to.not.be(undefined);
            });
        });

        describe('valid country codes', function () {
            it('should not be fussy as long as is in dictionary DE-DE', function () {
                expect(urlLocaleValue('?&locale=DE-DE')).to.be('de-de');
            });
            it('should not be fussy as long as is in dictionary Fr_Fr', function () {
                expect(urlLocaleValue('?&locale=fr_fr')).to.be('fr-fr');
            });

            it('should not be fussy as long as is in dictionary DE-at', function () {
                expect(urlLocaleValue('?&locale=de-at')).to.be('de-at');
            });

            it('should not be fussy as long as is in dictionary fRfr', function () {
                expect(urlLocaleValue('?&locale=fRfr')).to.be('fr-fr');
            });

            it('should not be fussy as long as it is in the dictionary', function () {
                expect(urlLocaleValue('?&locale=en-au-ct')).to.be('en-au-ct');
            });

            it('should not be fussy as long as is in dictionary en_au_ct', function () {
                expect(urlLocaleValue('?&locale=en_au_ct')).to.be('en-au-ct');
            });

            it('should not be fussy as long as is in dictionary enauct', function () {
                expect(urlLocaleValue('?&locale=enauct')).to.be('en-au-ct');
            });
        });

        describe('invalid codes', function () {
            it('should return default value of en-gb', function () {
                expect(urlLocaleValue('?&locale=ab-ab')).to.be('en-gb');
            });

            it('should return default value of en-gb', function () {
                expect(urlLocaleValue('?&locale=ab-ab-a')).to.be('en-gb');
            });
        });

        describe('nothing is passed', function () {
            it('should return default ID if nothing is passed', function () {
                expect(urlLocaleValue('')).to.be('en-gb');
            });
        });

        describe('retrieving vehicle ids', function () {
            it('should return a default model if no vehicle was passed', function () {
                urlExtractor.urlString = '';

                expect(urlExtractor.getVehicle()).to.be(bmc.support.UrlExtractor.DEFAULT_VEHICLE);
            });

            it('should return the vehicle id in the string', function () {
                urlExtractor.urlString = '?vehicle=M6';

                expect(urlExtractor.getVehicle()).to.be('M6');
            });

            it('should return the vehicle id in the string when there are other values', function () {
                urlExtractor.urlString = '?locale="en-gb"&vehicle=M6';

                expect(urlExtractor.getVehicle()).to.be('M6');
            });
        });

        describe('retrieving configuration ids', function () {
            it('should return null if no vehicle was passes', function () {
                urlExtractor.urlString = '';

                expect(urlExtractor.getConfiguration()).to.be(null);
            });

            it('should return the vehicle id in the string when there are other values', function () {
                urlExtractor.urlString = '?locale=en-gb&vehicle=M6&savedConfigId=configuration-1377082536414631';

                expect(urlExtractor.getConfiguration()).to.be('configuration-1377082536414631');
            });
        });

        function urlLocaleValue(idString) {
            urlExtractor.urlString = idString;
            return urlExtractor.getLocale();
        }

    });
})();