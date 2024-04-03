(function () {
    'use strict';
    describe('ExteriorState', function () {

        var state;


        describe('class should exist ', function () {

            it('should instance ExteriorState', function () {
                expect(state).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createExteriorState();
                done();
            });
        });

        function getDependencies() {
            return [
                'view/components/support/VehiclePresentation/ExteriorState'
            ];
        }

        function createExteriorState() {
            state = new bmc.view.components.support.VehiclePresentation.ExteriorState();
        }
    });
})();
