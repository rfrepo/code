define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.tracking.SophusTrackingMethod' },
        {},
        {
            sendTrackingValue: function (value, enabled) {
                if (enabled) {
                    window[this.TRACKING_METHOD](value);
                } else {
                    if (navigator.userAgent.indexOf('Phantom') === -1) {
                        console.log('Tracking', value);
                    }
                }
            },
            TRACKING_METHOD: 'tc_log'
        }
    );
});