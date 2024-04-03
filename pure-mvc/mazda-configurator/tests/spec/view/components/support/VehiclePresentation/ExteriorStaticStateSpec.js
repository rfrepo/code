(function () {
    'use strict';
    describe('ExteriorStaticState', function () {

        var state;

        describe('class should exist ', function () {

            it('should instance ExteriorStaticState', function () {
                expect(state).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createExteriorStaticState();
                done();
            });
        });

        function getDependencies() {
            return [
                'view/components/support/VehiclePresentation/ExteriorStaticState'
            ];
        }


        function createExteriorStaticState() {
            state = new bmc.view.components.support.VehiclePresentation.ExteriorStaticState();
        }
    });
})();
