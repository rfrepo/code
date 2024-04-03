describe('EN-AU - DistributeModelDataToProxiesForParsingCommand', function () {
    'use strict';

    var DistributeModelDataToProxiesForParsingCommand,
        command;

    beforeEach(function (done) {
        require([
            '../en-au/' + 'controller/command/startup/DistributeModelDataToProxiesForParsingCommand'
        ], function () {

            DistributeModelDataToProxiesForParsingCommand = arguments[0];
            done();
        });
    });

    describe('initialisation', function () {
        it('should not be undefined', function () {
            expect(DistributeModelDataToProxiesForParsingCommand).to.not.be(undefined);
        });
    });

    describe('unique proxy names', function () {

        beforeEach(function () {
            var facade = puremvc.Facade.getInstance(new Date().getTime());

            command = new DistributeModelDataToProxiesForParsingCommand();
            command.facade = facade;
        });

        it('should have disclaimer proxy in the proxy list ', function () {
            var data;

            data = command.getUniqueProxyNames();

            expect(data).to.contain('DisclaimerProxy');
        });
    });
});