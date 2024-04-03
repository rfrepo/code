define(['view/components/support/VehiclePresentation/ExteriorState',
    'view/components/support/VehiclePresentation/InteriorState'
], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.view.components.VehiclePresentationUI',
            constructor: function () {

                this.createStates();
                this.state = this.exteriorState;
                this.loader = jQuery('.' + bmc.support.HTMLAttributes.IMAGE_LOADING_CLASS);
                this.stateSwitchDataStore = {};
                this.timer = undefined;
            }
        },
        {
            updateView: function (vehiclePresentationVOs) {

                this.vehiclePresentationVOs = vehiclePresentationVOs;
                this.state.updateView();
                this.showStateOnFirstRun();
                this.storeLatestDataForState(vehiclePresentationVOs);
            },

            switchToInteriorState: function () {

                if (this.state !== this.interiorState) {

                    this.vehiclePresentationVOs = this.stateSwitchDataStore[this.constructor.INTERIOR_STATE_DATA_KEY];
                    this.setState(this.interiorState);
                }
            },

            switchToExteriorState: function () {

                if (this.state !== this.exteriorState) {

                    this.vehiclePresentationVOs = this.stateSwitchDataStore[this.constructor.EXTERIOR_STATE_DATA_KEY];
                    this.setState(this.exteriorState);
                }
            },

            setState: function (state) {

                if (this.state) {
                    this.state.deactivate();
                }
                this.state = state;
                this.state.updateView();
                this.state.activate();
                this.clearTimer();
            },

            createStates: function () {

                var VehiclePresentation = bmc.view.components.support.VehiclePresentation;

                this.exteriorState = new VehiclePresentation.ExteriorState(this);
                this.interiorState = new VehiclePresentation.InteriorState(this);
            },

            updateState: function (section) {

                if (section.type !== bmc.support.ConfigurableType.TRIM) {
                    this.switchToExteriorState();
                } else {
                    this.switchToInteriorState();
                }
            },

            stateLoadComplete: function () {
                this.hideLoader();
            },

            stateLoadStart: function () {
                this.showLoader();
            },

            hideLoader: function () {
                this.loader.fadeOut(600);
            },

            showLoader: function () {
                this.loader.fadeIn(600);
            },

            scaleImage: function (showHide) {

                var uiComponent = jQuery('#vehicleDisplay');

                if (showHide === bmc.view.components.VerticalScrollLocker.VIEW_LOCKED) {
                    uiComponent.removeClass(this.constructor.UNLOCKED_IMAGE_CSS);
                    uiComponent.addClass(this.constructor.LOCKED_IMAGE_CSS);
                }
                else {
                    uiComponent.removeClass(this.constructor.LOCKED_IMAGE_CSS);
                    uiComponent.addClass(this.constructor.UNLOCKED_IMAGE_CSS);
                }
            },

            lightenTextElements: function () {
                this.changeTextElementColour('#CCCCCC');
            },

            darkenTextElements: function () {
                this.changeTextElementColour('#2e3639');
            },

            changeTextElementColour: function (color) {

                jQuery('#vehiclePricing').children().css('color', color);
                jQuery('.vehicle-title').children().css('color', color);
            },

            setTimer: function (callBack, scope, interval) {

                this.clearTimer();

                this.timer = setInterval(function () {
                    callBack.call(scope);
                }, interval);
            },

            clearTimer: function () {
                clearInterval(this.timer);
            },

            showStateOnFirstRun: function () {

                if (!this.state.targetLayer.is(':visible')) {
                    this.state.activate();
                }
            },

            storeLatestDataForState: function () {

                var exteriorData = [],
                    interiorData = [];

                _.each(this.vehiclePresentationVOs, function (vehiclePresentationVO) {

                    var dataStore = (vehiclePresentationVO.layer !== 'trim') ? exteriorData : interiorData;
                    dataStore[dataStore.length] = vehiclePresentationVO;
                });

                if (exteriorData.length) {
                    this.stateSwitchDataStore[this.constructor.EXTERIOR_STATE_DATA_KEY] = exteriorData;
                }

                if (interiorData.length) {
                    this.stateSwitchDataStore[this.constructor.INTERIOR_STATE_DATA_KEY] = interiorData;
                }
            }
        },
        {
            LOCKED_IMAGE_CSS: 'locked-image-shrunk',
            UNLOCKED_IMAGE_CSS: 'unlocked-image-normal',
            EXTERIOR_STATE_DATA_KEY: 'exterior',
            INTERIOR_STATE_DATA_KEY: 'interior',
            BASE_LAYER_NAME: 'base',
            TRIM_LAYER_NAME: 'trim',
            WHEL_LAYER_NAME: 'wheel'
        }
    );
})
;
