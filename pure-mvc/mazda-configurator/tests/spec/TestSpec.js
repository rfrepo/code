/*global describe it */
'use strict';
(function () {
    describe('testing mocha', function () {
        describe('adding numbers', function () {
            it('should be equal to 2 when 1 is added to 1', function () {
                expect(1 + 1).to.equal(2);
            });
        });

        describe('async', function () {
            it('should pass test when require js module is loaded', function (done) {
                require(['myModule'], function (myModule) {
                    expect(myModule.addNumbers(1, 1)).to.equal(2);
                    done();
                });
            });
        });

    });
})();
