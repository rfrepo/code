define([
    'jquery',
    'vendor/attrChange'
], function () {
    'use strict';

    return puremvc.define({
        name: 'bmc.view.components.support.AusPostcodeFinderEvents'
    }, {}, {
        initilise: function () {
            var GlobalConfig = bmc.support.GlobalConfig.getInstance(),
                currentLocale = GlobalConfig.getLocale(),
                newTerritoryCode, newPathString;

            jQuery('.dealer-info').css('display', 'block');
            jQuery('[data-module-type="calls-to-action"].module > div').wrapAll('<div class="docked fade"/>');

            jQuery('#serverData').attrchange({callback: function (e) {
                if (e.attributeName === 'data-state') {
                    newTerritoryCode = jQuery('#serverData').attr('data-state');

                    if (newTerritoryCode === 'vic') {
                        newTerritoryCode = 'vc';
                    } else if (newTerritoryCode === 'nsw') {
                        newTerritoryCode = 'sw';
                    } else if (newTerritoryCode === 'qld') {
                        newTerritoryCode = 'qd';
                    } else if (newTerritoryCode === 'act') {
                        newTerritoryCode = 'ct';
                    } else if (newTerritoryCode === 'tas') {
                        newTerritoryCode = 'ts';
                    }

                    newPathString = window.location.href.replace(currentLocale, currentLocale.slice(0, -2) +
                        newTerritoryCode);

                    window.location.href = newPathString;
                }
            }});
        }
    });
});