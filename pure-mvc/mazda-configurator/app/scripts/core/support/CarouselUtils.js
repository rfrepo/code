define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.CarouselUtils' },
        {},
        {
            getSwatchType: function (type) {
                var swatchType = bmc.support.GlobalConfig.getInstance().globalConstants.SWATCH_TYPE[type];
                if (swatchType) {
                    return swatchType;
                }
                return bmc.support.GlobalConfig.getInstance().globalConstants.DEFAULT_SWATCH;
            }
        }
    );
});
