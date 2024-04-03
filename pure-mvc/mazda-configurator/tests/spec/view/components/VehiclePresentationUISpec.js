(function () {
    'use strict';

    describe('VehiclePresentationUI', function () {

        var ui;

        describe('initialise', function () {

            it('should instance VehiclePresentationUI', function () {
                expect(ui).not.to.be(undefined);
            });
        });

        describe('UpdateView', function () {

            it('should call updateView on the current state instance', function () {

                var spy = sinon.spy(ui.state, 'updateView');

                ui.updateView({});

                ui.state.updateView.restore();

                expect(spy.called).to.be(true);
            });


            it('should ensure that the current state\'s UI is visible on first run ' +
                'executed through showStateOnFirstRun ',
                function () {

                    var spy = sinon.spy(ui.state, 'activate');

                    ui.updateView({layer: 'base'});

                    ui.state.activate.restore();

                    expect(spy.called).to.be(true);
                });

            it('should save any vehicle overly layer image urls executed through storeLatestDataForState', function () {

                var dataSet1 = [
                        {layer: 'base'}
                    ],
                    dataSet2 = [
                        {layer: 'trim'}
                    ],
                    dataSet3 = [
                        {layer: 'trim'}
                    ];

                ui.updateView(dataSet1);
                ui.updateView(dataSet2);
                ui.updateView(dataSet3);

                expect(ui.stateSwitchDataStore.exterior[0]).to.equal(dataSet1[0]);
                expect(ui.stateSwitchDataStore.interior[0]).to.equal(dataSet3[0]);

            });
        });

        describe('Exterior and Interior States', function () {

            it('should switch to Interior from Exterior state executed through updateState', function () {

                var InteriorState = bmc.view.components.support.VehiclePresentation.InteriorState;
                ui.updateState({type: bmc.support.ConfigurableType.TRIM});

                expect(ui.state instanceof InteriorState).to.be(true);
            });

            it('should switch to Exterior from Interior state executed through updateState', function () {

                var ExteriorState = bmc.view.components.support.VehiclePresentation.ExteriorState;
                ui.updateState({type: bmc.support.ConfigurableType.TRIM});
                ui.updateState({type: bmc.support.ConfigurableType.GRADE});

                expect(ui.state instanceof ExteriorState).to.be(true);
            });
        });

        describe('Changing the size of the Interior and Exterior vehicle image', function () {

            it('should shrink the vehiclePresentation ui executed through scaleImage', function () {

                ui.scaleImage(bmc.view.components.VerticalScrollLocker.VIEW_LOCKED);
                expect(jQuery('#vehicleDisplay').attr('class')).to.contain(ui.constructor.LOCKED_IMAGE_CSS);
            });

            it('should unshrink the vehiclePresentation ui executed through scaleImage', function () {

                ui.scaleImage(bmc.view.components.VerticalScrollLocker.VIEW_UNLOCKED);
                expect(jQuery('#vehicleDisplay').attr('class')).to.contain(ui.constructor.UNLOCKED_IMAGE_CSS);
            });
        });


        describe('Changing the color of vehicle price and title text to ensure legibility on lighter trim images',
            function () {

                it('should apply a lighter colour to price and title text ', function () {

                    ui.lightenTextElements();
                    expect(jQuery('#vehicleDisplay p').attr('style')).to.contain('rgb(204, 204, 204)' || '#cccccc');
                });

                it('should apply a darker colour to price and title text ', function () {

                    ui.lightenTextElements();
                    ui.darkenTextElements();
                    expect(jQuery('#vehicleDisplay p').attr('style')).to.contain('rgb(46, 54, 57)' || '#cccccc');

                });
            });


        describe('Show and Hide preloader',
            function () {

                it('should hide preloader ', function (done) {

                    ui.hideLoader();

                    setTimeout(function () {
                        expect(ui.loader.is(':visible')).to.be(false);
                        done();
                    }, 650);

                });

                it('should show preloader', function (done) {

                    ui.showLoader();

                    setTimeout(function () {
                        expect(ui.loader.is(':visible')).to.be(true);
                        done();
                    }, 650);
                });
            });


        beforeEach(function (done) {

            require([
                'view/components/VehiclePresentationUI',
                'support/HTMLAttributes',
                'support/ConfigurableType',
                'view/components/VerticalScrollLocker',
                'view/components/support/VehiclePresentation/InteriorState',
                'view/components/support/VehiclePresentation/ExteriorState'
            ], function () {

                setupDom();

                ui = new bmc.view.components.VehiclePresentationUI(
                    '#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID);

                ui.interiorState.updateView =
                    ui.exteriorState.updateView = function () {};

                done();
            });
        });

        afterEach(function () {
            jQuery('#vehicleDisplay').remove();
        });

        function setupDom() {
            jQuery('body').append('<div id="vehicleDisplay">' +
                '<div class="image-loading-container"></div>' +
                '<div id="vehiclePricing"><p></p></div>' +
                '<div id=".vehicle-title"><p></p></div>' +
                '</div>');
        }


    });
})();