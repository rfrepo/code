define(['support/HTMLAttributes'], function () {
    'use strict';
    var HTMLAttributes = arguments[0];

    return puremvc.define({ name: 'bmc.support.CanvasCapture' },
        {},
        {
            getDataUrlForVehicleThumbnail: function () {
                var canvas = document.createElement('canvas'),
                    context,
                    url = '',
                    self = this;

                canvas.width = HTMLAttributes.VEHICLE_THUMB_IMAGE_WIDTH;
                canvas.height = HTMLAttributes.VEHICLE_THUMB_IMAGE_HEIGHT;

                if (canvas.getContext && canvas.getContext('2d')) {
                    context = canvas.getContext('2d');

                    jQuery('.reel-container .reel-cached').each(function (index, img) {
                        if (img) {
                            self.downscaleImage(context, img);
                        }
                    });

                    url = canvas.toDataURL();
                }

                return url;
            },

            downscaleImage: function (liveContext, img) {
                var workingCanvas = document.createElement('canvas'),
                    clonedWorkingCanvas = document.createElement('canvas'),
                    ctx = workingCanvas.getContext('2d'),
                    ctx2 = clonedWorkingCanvas.getContext('2d'),
                    scale = 2,
                    runningHeight = HTMLAttributes.VEHICLE_IMAGE_HEIGHT,
                    runningWidth = HTMLAttributes.VEHICLE_IMAGE_WIDTH;

                workingCanvas.width = clonedWorkingCanvas.width = HTMLAttributes.VEHICLE_IMAGE_WIDTH;
                workingCanvas.height = clonedWorkingCanvas.height =  HTMLAttributes.VEHICLE_IMAGE_HEIGHT;

                ctx.drawImage(img, HTMLAttributes.VEHICLE_THUMB_CROP_X, HTMLAttributes.VEHICLE_THUMB_CROP_Y,
                    runningWidth, runningHeight, 0, 0, runningWidth, runningHeight);

                while ((runningWidth / scale) > HTMLAttributes.VEHICLE_THUMB_IMAGE_WIDTH ||
                    (runningHeight / scale) > HTMLAttributes.VEHICLE_THUMB_IMAGE_HEIGHT) {

                    ctx2.drawImage(workingCanvas, 0, 0, HTMLAttributes.VEHICLE_IMAGE_WIDTH,
                        HTMLAttributes.VEHICLE_IMAGE_HEIGHT);
                    ctx.clearRect(0, 0, HTMLAttributes.VEHICLE_IMAGE_WIDTH, HTMLAttributes.VEHICLE_IMAGE_HEIGHT);
                    ctx.drawImage(clonedWorkingCanvas, 0, 0, runningWidth, runningHeight, 0, 0,
                        runningWidth = runningWidth / scale, runningHeight = runningHeight / scale);
                    ctx2.clearRect(0, 0, HTMLAttributes.VEHICLE_IMAGE_WIDTH, HTMLAttributes.VEHICLE_IMAGE_HEIGHT);
                }

                liveContext.drawImage(workingCanvas, 0, 0, runningWidth, runningHeight, 0, 0,
                    HTMLAttributes.VEHICLE_THUMB_IMAGE_WIDTH, HTMLAttributes.VEHICLE_THUMB_IMAGE_HEIGHT);
            }
        }
    );
});
