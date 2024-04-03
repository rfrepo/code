(function () {
    'use strict';
    describe('VehiclePresentationProxy', function () {

        var proxy,
            ID = 'base',
            URL = './reseources/test_imge.jpg';

        describe('the proxy should exist', function () {

            it('should instantiate VehiclePresentationProxy', function (done) {

                expect(proxy).to.not.be(undefined);
                done();
            });
        });

        describe('should be able to store and retrieve values by id', function () {

            it('getImagePathById', function (done) {

                proxy.storeImagePaths(ID, URL);
                expect(proxy.getImagePathById(ID)).to.be(URL);
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                proxy = new bmc.model.proxy.VehiclePresentationProxy();
                facade.registerProxy(proxy);
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/VehiclePresentationProxy'
            ];
        }

    });
})();
