define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.view.vo.VehiclePresentationVO',
            constructor: function () {
                this.imageURL = undefined;
                this.layer = undefined;
                this.layerDataId = undefined;
                this.section = undefined;
                this.remove = false;
            }
        },
        {

        });
});