define(['support/UrlBuilder'], function () {
    'use strict';
    var UrlBuilder = arguments[0];

    puremvc.define({
            name: 'bmc.view.components.support.VehiclePresentation.ExteriorStaticState',
            constructor: function (exteriorUI) {

                this.exterior = exteriorUI;
                this.assetPaths = {};
                this.verifiedImages = 0;
                this.acccessoriesContainer = jQuery('#accessories');
            }
        },
        {
            initialiseRender: function () {

                var self = this;

                this.addRemoveLayers(this.exterior.vehiclePresentationVOs);

                _.each(this.exterior.assetVOs, function (assetVO) {
                    self.setSourceOnImage(assetVO);
                });

                if (this.exterior.assetVOs.length) {
                    self.exterior.vehiclePresentationUI.stateLoadStart(this);
                }
            },

            addRemoveLayers: function (vehiclePresentationVOs) {

                var self = this,
                    assetVOs = [];

                _.each(vehiclePresentationVOs, function (vehiclePresentationVO) {

                    if (vehiclePresentationVO.layer !== 'trim') {

                        assetVOs.push(self.createAssetVO(vehiclePresentationVO.layer,
                            vehiclePresentationVO.layerDataId,
                            self.extractURLFromData(vehiclePresentationVO)));
                    }
                });

                this.exterior.assetVOs = assetVOs;


            },

            extractURLFromData: function (vehiclePresentationVO) {
                return UrlBuilder.replacePlaceHolderVehicleId(vehiclePresentationVO.imageURL);
            },

            setSourceOnImage: function (assetVO) {

                var frameNumber = this.exterior.getAppendExtension(assetVO.layer);
                assetVO.image.src = assetVO.src.split(/\.jpg|\.png/i)[0] + frameNumber;
            },

            imageLoaded: function (loadedImageAssetVO) {

                if (this.verifyImagesLoadedMatchAssetVOs(loadedImageAssetVO)) {

                    var self = this;
                    self.verifiedImages = 0;

                    _.each(this.exterior.assetVOs, function (assetVO) {
                        self.addImageToDom(assetVO);
                    });

                    this.domRedrawDelayTimer();
                }
            },

            domRedrawDelayTimer: function () {

                var self = this,
                    interval = 500,
                    callBack = function () {

                        self.exterior.vehiclePresentationUI.clearTimer();
                        self.exterior.setState(self);
                        self.exterior.prepareSpinState();
                    };

                self.exterior.vehiclePresentationUI.setTimer(callBack, self, interval);
            },


            verifyImagesLoadedMatchAssetVOs: function (loadedImageAssetVO) {

                var self = this;

                _.each(this.exterior.assetVOs, function (assetVO) {

                    if (loadedImageAssetVO.id === assetVO.id) {
                        self.verifiedImages += 1;
                    }
                });

                return (this.verifiedImages === this.exterior.assetVOs.length);
            },

            addImageToDom: function (vehiclePresentationVO) {

                if (vehiclePresentationVO.layer.indexOf('accessories') !== -1) {
                    this.addMultiLayerImage(vehiclePresentationVO);
                } else {
                    this.addSingleLayerImage(vehiclePresentationVO);
                }
            },

            addSingleLayerImage: function (vehiclePresentationVO) {

                this.exterior.setImageHeightAndWidth(vehiclePresentationVO.image);
                var targetLayer = this.getStaticLayerByDataId(vehiclePresentationVO.layerDataId);
                targetLayer.empty();
                targetLayer.prepend(vehiclePresentationVO.image);
            },

            addMultiLayerImage: function (vehiclePresentationVO) {

                this.exterior.setImageHeightAndWidth(vehiclePresentationVO.image);

                var accessoryContainer = this.getAccessoryContainer(vehiclePresentationVO);

                accessoryContainer.append(vehiclePresentationVO.image);
            },

            getAccessoryContainer: function (vehiclePresentationVO) {

                var accessoryContainer =
                    this.acccessoriesContainer.find('div[data-id=' + vehiclePresentationVO.layerDataId + ']');

                if (accessoryContainer.length) {
                    accessoryContainer = accessoryContainer.find('.static-image').empty();
                } else {

                    this.acccessoriesContainer.append(
                        '<div data-id=' + vehiclePresentationVO.layerDataId + ' class="configurable-item-layer">' +
                            '<div class="reel-container"></div>' +
                            '<div class="static-image"></div>' +
                            '</div>');

                    accessoryContainer = this.getStaticLayerByDataId(vehiclePresentationVO.layerDataId);
                }

                return accessoryContainer;
            },

            imageLoadError: function () {

            },

            hideAllStaticImages: function () {

                var self = this,
                    assets = jQuery('.configurable-item-layer');

                assets.each(function (index, asset) {
                    if (jQuery(asset).find('.reel').length) {
                        self.getStaticLayerByDataId(jQuery(asset).attr('data-id')).hide();
                    }
                });
            },

            deactivate: function () {
                this.hideAllStaticImages();
            },

            showAllStaticImages: function () {

                var self = this;

                _.each(this.exterior.assetVOs, function (assetVO) {
                    self.getStaticLayerByDataId(assetVO.layerDataId).show();
                });
            },


            getStaticLayerByDataId: function (layerDataId) {
                return jQuery('#vehicleDisplay div[data-id=' + layerDataId + '] .static-image');
            },

            createAssetVO: function (layerName, layerDataId, imageURL) {

                var assetVO = {};

                assetVO.layerDataId = layerDataId;
                assetVO.id = Math.random() * new Date().getTime();
                assetVO.layer = layerName;
                assetVO.image = this.createImage(assetVO);
                assetVO.src = imageURL;

                return assetVO;
            },

            createImage: function (assetVO) {

                var self = this,
                    image = new Image();

                image.onload = function () {
                    self.imageLoaded(assetVO);
                };

                image.onerror = function () {
                    self.imageLoadError(assetVO);
                };

                image.style.position = 'absolute';

                return image;
            },

            activate: function () {

            }


        },
        {

        });
});
