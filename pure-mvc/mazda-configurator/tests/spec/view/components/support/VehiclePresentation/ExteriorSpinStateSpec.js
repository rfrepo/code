(function () {
    'use strict';
    describe('ExteriorSpinState', function () {

        var state,
            vehiclePresentation;

        describe('class should exist ', function () {

            it('should instance ExteriorSpinState', function () {
                expect(state).not.to.be(undefined);
            });
        });

        describe('Creating and rendering the car spin', function () {

            it('should create the car base image ', function () {

                vehiclePresentation.updateView(baseVehiclePresentationVO());

                expect(state).not.to.be(undefined);
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                setupGlobalConfig();
                setupDom();
                createStateThroughCreatingVehiclePresentation();
                done();
            });
        });

        afterEach(function () {
            jQuery('#vehicleDisplay').remove();
        });

        function getDependencies() {
            return [ 'view/components/VehiclePresentationUI'];
        }

        function createStateThroughCreatingVehiclePresentation() {

            vehiclePresentation = new bmc.view.components.VehiclePresentationUI();
            state = vehiclePresentation.exteriorState.spinState;
        }

        function baseVehiclePresentationVO() {

            return [
                {
                    imageURL: 'CAR.PNG',
                    layer: 'base',
                    layerDataId: 'base',
                    section: 'accessories'
                }
            ];
        }

        function setupGlobalConfig() {

            var globalConfig = bmc.support.GlobalConfig.getInstance();
            globalConfig.applyLocaleData('en-gb');
            globalConfig.setVehicleId('m6');
        }


        function setupDom() {

            var html = '<div id="vehicleDisplay" clas="vehicleDisplay">' +
                '<div id="exterior">' +
                '<div id="base" class="configurable-item-layer" data-id="base">' +
                '<div class="reel-container"></div>' +
                '<div class="static-image"></div>' +
                '</div>' +
                '<div id="wheel" class="configurable-item-layer"  data-id="wheel">' +
                '<div class="reel-container"></div>' +
                '<div class="static-image"></div>' +
                '</div>' +
                '<div id="accessories">' +
                '</div>' +
                '<div id="spinIndicator"></div>' +
                '</div>' +
                '<div id="interior">' +
                '</div>' +
                '</div>';

            jQuery('body').append(html);
        }
    });
})();
