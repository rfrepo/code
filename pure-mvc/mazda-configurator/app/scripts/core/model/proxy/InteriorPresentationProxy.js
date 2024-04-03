define([], function () {
    'use strict';
    puremvc.define({
            name: 'bmc.model.proxy.InteriorPresentationProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                this.imageToLoad = undefined;

                puremvc.Proxy.call(this, bmc.model.proxy.InteriorPresentationProxy.NAME);
            }
        },
        {
            getHTML: function (vo) {
                this.setImageToLoad(vo);
                this.preLoadImage(this.imageToLoad);
            },

            setImageToLoad: function (vo) {
                if (this.hasSpecificImage()) {
                    this.setImageFromDependencies(vo);
                }
                else {
                    this.setImageFromActiveConfiguration(vo);
                }
            },

            hasSpecificImage: function () {
                return false;
            },

            setImageFromDependencies: function (vo) {
                var dependencies = vo.trim.dependencies;
                String(dependencies);//to be extended with specific image case
                this.imageToLoad = null;
            },

            setImageFromActiveConfiguration: function (vo) {
                var transmissionType = vo.engine.transmission,
                    grade = vo.grade.id,
                    trim = vo.trim.id,

                    imagePrePath = bmc.support.GlobalConfig.getInstance().INTERIOR_IMAGES_LOCATION,
                    imageFileName = (grade + '_' + trim + '_' + transmissionType + '.jpg').toLowerCase();
                this.imageToLoad = (imagePrePath + imageFileName);
            },

            preLoadImage: function (imageFilenameString) {
                var image = new Image(),
                    self = this;
                image.src = urlExtractor.getResourcesUrl() + imageFilenameString;
                image.onload = function () {
                    self.imageReady(this.src, self);
                };
            },

            loadedImageIsStillNeeded: function (imagePathAndName, self) {
                return (self.imageToLoad && imagePathAndName);
            },

            imageReady: function (imagePathAndName, self) {
                if (this.loadedImageIsStillNeeded(imagePathAndName, self)) {
                    this.drawImageHTML();
                }
            },

            drawImageHTML: function () {
                this.sendNotification(bmc.support.NotificationNames.INTERIOR_IMAGE_AVAILABLE,
                    urlExtractor.getResourcesUrl() + this.imageToLoad);
            }

        },
        {
            NAME: 'InteriorPresentationProxy'
        }
    );
});