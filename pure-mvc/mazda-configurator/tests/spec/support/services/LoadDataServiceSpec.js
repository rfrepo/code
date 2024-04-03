(function () {
    'use strict';
    describe('Load Data Service', function () {

        var loader,
            path = 'resources/locale/de-de/m6.json';

        beforeEach(function (done) {
            require(['support/services/LoadDataService'], function () {
                loader = new bmc.support.services.LoadDataService(path);

                done();
            });
        });

        describe('the data service should be initialised', function () {
            it('should initialise', function () {
                expect(loader).to.not.be(undefined);
            });
        });

    });
})();