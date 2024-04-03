define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.proxy.VehiclePresentationProxy',
            parent: puremvc.Proxy
        },
        {
            imagePathStores: {},

            storeImagePaths: function (id, url) {
                this.imagePathStores[id] = url;
            },

            getImagePathById: function (id) {
                return this.imagePathStores[id];
            }
        },
        {
            NAME: 'VehiclePresentationProxy'
        }
    );
});
