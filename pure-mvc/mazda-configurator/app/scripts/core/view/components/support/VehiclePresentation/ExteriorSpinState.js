define(['support/StringUtils',
    'jquery.reel',
    'support/HTMLAttributes'], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.view.components.support.VehiclePresentation.ExteriorSpinState',
            constructor: function (exteriorUI) {

                this.exterior = exteriorUI;
                this.spinIndicator = jQuery('#' + bmc.support.HTMLAttributes.SPIN_INDICATOR_ID);
                this.reelParentContainer = jQuery('#' + bmc.support.HTMLAttributes.VEHICLE_CONTAINER_EXTERIOR_ID);
            }
        },
        {
            initialiseRender: function () {

                var self = this;
                this.reelsToLoad = this.exterior.assetVOs.length;

                _.each(this.exterior.assetVOs, function (assetVO) {

                    self.removePreviousReel(assetVO);
                    self.initialiseReelCreation(assetVO);
                });
            },

            initialiseReelCreation: function (assetVO) {

                this.createImageForReelToAttach(assetVO);
                this.createReelComponent(assetVO);
            },

            createImageForReelToAttach: function (assetVO) {

                var reelStaticImage = jQuery(assetVO.image).clone(),
                    targetContainer =
                        jQuery('#vehicleDisplay div[data-id=' + assetVO.layerDataId + '] .' +
                            bmc.support.HTMLAttributes.REEL_CONTAINER_CLASS);

                reelStaticImage.attr('id', this.constructor.REEL + assetVO.layerDataId);

                targetContainer.empty().append(reelStaticImage);
            },

            createReelComponent: function (assetVO) {

                var self = this,
                    startFrame = this.exterior.currentRotationFrame,
                    reelInstance = jQuery('#' + this.constructor.REEL + assetVO.layerDataId).reel({
                        frames: 12,
                        frame: startFrame,
                        footage: 3,
                        premove: '_' + bmc.support.StringUtils.padNumberWithZeros(startFrame, 5),
                        suffix: bmc.support.GlobalConfig.getInstance().getGlobalConstants().SPRITE_SHEET_NAME,
                        loops: false,
                        klass: bmc.support.HTMLAttributes.CAR_PART_CLASS,
                        cursor: 'hand',
                        revolution: 350
                    });

                reelInstance.reel(this.constructor.REEL_EVENT_FRACTION, this.exterior.reelFraction);
                reelInstance.bind(this.constructor.REEL_EVENT_LOADED, function () {
                    self.reelLoaded();
                });
            },


            reelLoaded: function () {

                this.reelsToLoad -= 1;

                if (this.reelsToLoad === 0) {
                    this.synchronizeReels();
                    this.watchDomForReelChanges();
                }
            },

            watchDomForReelChanges: function () {

                var reelPreloaders,
                    self = this,
                    interval = 40,
                    callBack = function () {

                        reelPreloaders = self.reelParentContainer.find(this.constructor.REEL_PRELOADER_CLASS);

                        if (!reelPreloaders.length) {

                            self.exterior.vehiclePresentationUI.clearTimer();
                            self.domRedrawDelayTimer();
                        }
                    };

                self.exterior.vehiclePresentationUI.setTimer(callBack, self, interval);
            },

            domRedrawDelayTimer: function () {

                var self = this,
                    interval = 500,
                    callBack = function () {

                        self.exterior.vehiclePresentationUI.clearTimer();
                        self.exterior.setState(self);

                        if (self.exterior.vehiclePresentationUI.allImagesLoaded) {
                            self.exterior.vehiclePresentationUI.allImagesLoaded();
                        }
                    };

                self.exterior.vehiclePresentationUI.setTimer(callBack, self, interval);
            },

            synchronizeReels: function () {

                var self = this,
                    reelFraction,
                    reelInstance,
                    reelInstances = jQuery('#vehicleDisplay .reel'),
                    topMostReelInstance = jQuery(reelInstances[reelInstances.length - 1]);

                topMostReelInstance.unbind();

                topMostReelInstance.bind(self.constructor.REEL_EVENT_FRACTION_CHANGE, function () {

                    reelFraction = arguments[2];

                    reelInstances.each(function () {

                        reelInstance = jQuery(this);

                        if (reelInstance.context !== topMostReelInstance.context) {

                            reelInstance.unbind();
                            reelInstance.reel(self.constructor.REEL_EVENT_FRACTION, reelFraction);
                        }
                    });

                    self.exterior.reelFraction = reelFraction;
                });

                topMostReelInstance.bind(self.constructor.REEL_EVENT_FRAME_CHANGE, function () {
                    self.exterior.currentRotationFrame = arguments[2];
                });
            },

            removePreviousReel: function (presentationUIVO) {

                var previousReel = this.getReelLayerByDataId(presentationUIVO.layerDataId);

                if (previousReel) {
                    previousReel.trigger(this.constructor.REEL_EVENT_TEARDOWN);
                }
            },

            getReelLayerByDataId: function (layerDataId) {

                return jQuery('#vehicleDisplay div[data-id=' + layerDataId + '] .reel');
            },

            activate: function () {

                this.showAllReelContainers();
                this.showSpinIndicator();
                this.exterior.vehiclePresentationUI.stateLoadComplete();
            },

            deactivate: function () {
                this.hideVisualElements();
            },

            showAllReelContainers: function () {


                _.each(this.exterior.assetVOs, function (assetVO) {
                    jQuery('#reel' + assetVO.layerDataId + '_spritesheet').show();
                });

                //jQuery('.reel-container').css('visibility', 'visible');
            },

            hideAllReelContainers: function () {

                _.each(this.exterior.assetVOs, function (assetVO) {
                    jQuery('#reel' + assetVO.layerDataId + '_spritesheet').hide();
                });
                //jQuery('.reel-container').css('visibility', 'hidden');
            },

            showSpinIndicator: function () {
                this.spinIndicator.show();
            },

            hideSpinIndicator: function () {
                this.spinIndicator.hide();
            },

            hideVisualElements: function () {

                this.hideAllReelContainers();
                this.hideSpinIndicator();
            }


        },
        {
            REEL: 'reel',
            REEL_EVENT_LOADED: 'loaded',
            REEL_EVENT_FRACTION: 'fraction',
            REEL_EVENT_TEARDOWN: 'teardown',
            REEL_PRELOADER_CLASS: '.reel-preloader',
            REEL_EVENT_FRAME_CHANGE: 'frameChange',
            REEL_EVENT_FRACTION_CHANGE: 'fractionChange'
        });
})
;
