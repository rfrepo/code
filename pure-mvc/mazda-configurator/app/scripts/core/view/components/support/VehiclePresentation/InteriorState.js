define([], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.view.components.support.VehiclePresentation.InteriorState',
            constructor: function (vehiclePresentationUI) {
                this.vehiclePresentationUI = vehiclePresentationUI;
                this.targetLayer = jQuery('#interior');
                this.targetLayer.hide();
            }
        },
        {
            updateView: function () {
                var imageURL = this.getTrimURL(this.vehiclePresentationUI.vehiclePresentationVOs);

                if (imageURL) {
                    this.assetVO = this.createAssetVO(imageURL);
                    this.assetVO.image.src = imageURL;
                    this.vehiclePresentationUI.stateLoadStart(this);
                }
            },

            createAssetVO: function (imageURL) {

                var assetVO = {};

                assetVO.id = Math.random() * new Date().getTime();
                assetVO.imageURL = imageURL;
                assetVO.image = this.createImage(assetVO);

                return assetVO;
            },

            getTrimURL: function (vehiclePresentationVOs) {

                var imageURL;

                _.each(vehiclePresentationVOs, function (vehiclePresentationVO) {

                    if (vehiclePresentationVO.layer === bmc.support.ConfigurableType.TRIM) {
                        imageURL = vehiclePresentationVO.imageURL;
                    }
                });

                return imageURL;
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
                image.style.width = '100%';
                image.style.height = '100%';

                return image;
            },

            imageLoaded: function (loadedImageAssetVO) {

                if (this.assetVO.id === loadedImageAssetVO.id) {

                    this.addImageToDom(loadedImageAssetVO);
                    this.vehiclePresentationUI.stateLoadComplete(this);
                }
            },

            addImageToDom: function (assetVO) {

                this.targetLayer.prepend(assetVO.image);

                jQuery(assetVO.image).siblings().each(function () {

                    var oldImage = jQuery(this).fadeOut(800, function () {
                        oldImage.remove();
                    });
                });
            },

            imageLoadError: function (loadedImageAssetVO) {
                console.error('IMAGE LOAD FAILURE : ', loadedImageAssetVO.src);
            },

            activate: function () {
                this.targetLayer.fadeIn(500);
                this.vehiclePresentationUI.lightenTextElements();
            },

            deactivate: function () {
                this.targetLayer.fadeOut(500);
                this.vehiclePresentationUI.darkenTextElements();
            }
        },
        {
            FILE_EXTENSION: '.jpg'
        });
});
