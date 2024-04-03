define([], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.model.vo.VehicleImageVO'
        },
        {
            setBaseImage: function (value) {
                this.baseImage = value;
            },
            getBaseImage: function (value) {
                if (value) {
                    return this.injectFrameNumberIntoFileName(this.baseImage, value);
                }

                return this.injectFrameNumberIntoFileName(this.baseImage, 1);
            },

            getBaseSpriteSheet: function () {
                return this.obtainSpriteSheetName(this.baseImage);
            },

            setWheelImage: function (value) {
                this.wheelImage = value;
            },
            getWheelImage: function (value) {
                if (value) {
                    return this.injectFrameNumberIntoFileName(this.wheelImage, value);
                }
                return this.injectFrameNumberIntoFileName(this.wheelImage, 1);
            },

            getWheelSpriteSheet: function () {
                return this.obtainSpriteSheetName(this.wheelImage);
            },

            obtainSpriteSheetName: function (imageName) {
                var toRemove = imageName.substr(imageName.length - 4),
                    globalConfig = bmc.support.GlobalConfig.getInstance(),
                    toAdd = globalConfig.getGlobalConstants().SPRITE_SHEET_NAME + toRemove;

                return imageName.split(toRemove).join(toAdd);
            },

            injectFrameNumberIntoFileName: function (imageName) {
                var frameNumber = '',
                    toRemove = imageName.substr(imageName.length - 4),
                    toAdd,
                    paddedNumber;

                function convertFrameNumberToZeroIndexValue(number) {
                    return number - 1;
                }

                if (arguments.length > 1) {
                    paddedNumber = bmc.support.StringUtils.padNumberWithZeros(
                        convertFrameNumberToZeroIndexValue(arguments[1]), 5);
                    frameNumber = '_' + paddedNumber;
                }

                toAdd = frameNumber + toRemove;
                return imageName.split(toRemove).join(toAdd);
            }
        });
});