define([
    'view/components/support/VehiclePresentation/ExteriorStaticState',
    'view/components/support/VehiclePresentation/ExteriorSpinState',
    'support/ConfigurableType'
],
    function () {
        'use strict';

        var ConfigurableType = arguments[2];

        puremvc.define({
                name: 'bmc.view.components.support.VehiclePresentation.ExteriorState',
                constructor: function (vehiclePresentationUI) {

                    this.assetVOs = [];
                    this.createStates();
                    this.currentRotationFrame = 1;
                    this.reelFraction = 0;
                    this.vehiclePresentationUI = vehiclePresentationUI;
                    this.targetLayer = jQuery('#exterior');
                    this.targetLayer.hide();
                }
            },
            {
                updateView: function () {

                    var groupedVOs = this.groupVOsIntoUpdateOrRemove();

                    if (groupedVOs.VOsToRemove.length) {
                        this.removeItemsFromView(groupedVOs.VOsToRemove);
                    }

                    if (groupedVOs.VOsToUpdate.length) {

                        this.vehiclePresentationVOs = groupedVOs.VOsToUpdate;
                        this.staticState.initialiseRender();
                    }
                },

                removeItemsFromView: function (presentationVOs) {

                    var self = this;

                    _.each(presentationVOs, function (presentationVO) {
                        self.removeItemByLayerId(presentationVO);
                    });
                },

                removeItemByLayerId: function (presentationVO) {

                    this.spinState.removePreviousReel(presentationVO);
                    jQuery('#vehicleDisplay div[data-id=' + presentationVO.layerDataId + ']').remove();
                    this.spinState.synchronizeReels();

                },

                groupVOsIntoUpdateOrRemove: function () {

                    var groupedVOs = {
                        VOsToUpdate: [],
                        VOsToRemove: []
                    };

                    _.each(this.vehiclePresentationUI.vehiclePresentationVOs, function (vehiclePresentationVO) {

                        if (vehiclePresentationVO.remove) {
                            groupedVOs.VOsToRemove.push(vehiclePresentationVO);
                        } else if (vehiclePresentationVO.layer !== ConfigurableType.TRIM) {
                            groupedVOs.VOsToUpdate.push(vehiclePresentationVO);
                        }
                    });

                    return groupedVOs;
                },

                switchToStaticState: function () {
                    this.setState(this.staticState);
                },

                switchToInteriorState: function () {
                    this.vehiclePresentationUI.setState(this.vehiclePresentationUI.interiorState);
                },

                switchToExteriorState: function () {
                    this.vehiclePresentationUI.setState(this.vehiclePresentationUI.exteriorState);
                },

                createStates: function () {

                    var VehiclePresentation = bmc.view.components.support.VehiclePresentation;

                    this.staticState = new VehiclePresentation.ExteriorStaticState(this);
                    this.spinState = new VehiclePresentation.ExteriorSpinState(this);
                },

                getAppendExtension: function (layer) {

                    var zeros = (this.currentRotationFrame <= 10) ? '_0000' : '_000',
                        frame = this.currentRotationFrame - 1;
                    return zeros + frame + ((layer === 'base') ? '.jpg' : '.png');
                },

                setState: function (newState) {

                    var oldState;

                    if (this.state) {
                        oldState = this.state;
                    }

                    this.state = newState;
                    this.state.activate();

                    if (oldState) {
                        oldState.deactivate();
                    }
                },

                prepareSpinState: function () {

                    this.staticState.showAllStaticImages();
                    this.spinState.initialiseRender();
                },

                setImageHeightAndWidth: function (image) {

                    image.width = 960;
                    image.height = 388;
                },

                activate: function () {
                    this.targetLayer.fadeIn(500);
                },

                deactivate: function () {
                    this.targetLayer.fadeOut(500);
                }
            },
            {

            });
    });
