define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.support.ModelFilePathCalculator',
            constructor: function (modelName) {
                this.modelName = modelName;
            }
        },
        {
            getPath: function () {
                var fileLocationTemplate = bmc.support.GlobalConfig.getInstance().MODEL_DATA_LOCATION;

                return fileLocationTemplate.path + this.modelName.toLowerCase() + fileLocationTemplate.extension;
            }
        }
    );
});