(function () {
    'use strict';
    describe('InteriorState', function () {

        var state;


        describe('class should exist ', function () {

            it('should instance InteriorState', function () {
                expect(state).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createInteriorState();
                done();
            });
        });

        function getDependencies() {
            return [
                'view/components/support/VehiclePresentation/InteriorState'
            ];
        }

        function createInteriorState() {
            state = new bmc.view.components.support.VehiclePresentation.InteriorState();
        }
    });
})();
