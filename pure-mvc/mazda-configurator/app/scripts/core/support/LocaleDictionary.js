bmc.support.LocaleDictionary = (function () {
    'use strict';

    function LocaleDictionary() {
        var availableLocales = [
                'en-gb',
                'de-de',
                'fr-fr',
                'de-at',
                'en-au',
                'nl-be',
                'nl-nl',
                'en-au-nt',
                'en-au-ct',
                'en-au-qd',
                'en-au-sw',
                'en-au-sa',
                'en-au-ts',
                'en-au-vc',
                'en-au-wa'
            ],
            numberOfLocales = availableLocales.length,
            locale;

        while (numberOfLocales--) {
            locale = availableLocales[numberOfLocales];

            this[locale] = locale;
        }
    }

    return LocaleDictionary;
}());