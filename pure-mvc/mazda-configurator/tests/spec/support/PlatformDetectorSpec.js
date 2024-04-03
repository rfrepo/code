(function () {
    'use strict';

    describe('MobileDesktopDetector', function () {

        beforeEach(function (done) {
            require([], function () {
                done();
            });
        });

        describe('detect if browser is mobile', function () {
            it('should return true OR false', function () {
                var isMobile = bmc.support.PlatformDetector.isMobile();
                
                expect(isMobile).to.be(false);
            });
        });

    });
})();