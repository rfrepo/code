bmc.support.GlobalConstants = (function () {
    'use strict';

    function GlobalConstants() {
    }

    GlobalConstants.SUMMARY = 'summary';

    GlobalConstants.DRIVETYPE = 'driveType';

    GlobalConstants.SWATCH_TYPE = {
        'wheel': 'imageSwatch',
        'colour': 'imageSwatch',
        'trim': 'imageSwatch'
    };

    GlobalConstants.DEFAULT_SWATCH = 'normalSwatch';

    GlobalConstants.PRICE = 'price';

    GlobalConstants.SPRITE_SHEET_NAME = '_spritesheet';

    GlobalConstants.BASE_LAYER_NAME = 'base';

    GlobalConstants.TRIM_LAYER_NAME = 'trim';

    GlobalConstants.WHEL_LAYER_NAME = 'wheel';

    GlobalConstants.DISCLAIMER_TITLES = {
        disclaimerHeader: 'disclaimerHeader',
        initialDisclaimer: 'initialDisclaimer',
        rdpDisclaimer: 'rdpDisclaimer',
        promoDisclaimer: 'promoDisclaimer',
        colourDisclaimer: 'colourDisclaimer'
    };

    return GlobalConstants;
}());