define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.tracking.GoogleTrackingMethod' },
        {},
        {
            sendTrackingValue: function (value, enabled) {
                if (enabled && require.defined('core/mazda.utils')) {
                    require(['core/mazda.utils'], function (utils) {
                        utils.tag({ module: 'configurator', event: 'click', data: value });
                    });
                } else {
                    if (navigator.userAgent.indexOf('Phantom') === -1) {
                        console.log('Tracking', { module: 'configurator', event: 'click', data: value });
                    }
                }
            }
        }
    );
});