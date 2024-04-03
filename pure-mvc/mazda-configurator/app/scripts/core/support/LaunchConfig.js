bmc.support.LaunchConfig = (function (global) {
    'use strict';
    var globalConfig, callback;

    function setupConfiguratorVariables() {
        globalConfig = bmc.support.GlobalConfig.getInstance();
        global.burrows = {
            app: undefined
        };
    }

    function launchAusConfigurator() {
        require(['jquery'], function () {
            jQuery(document).ready(function () {
                var newLocale = global.document.getElementById('serverData').getAttribute('data-state'),
                    postCodeBox;

                if (newLocale === '') {
                    postCodeBox =
                        '<div class="postCodeEntry"><div>' +
                            '<p>Enter your postcode to continue</p>' +
                            '<div class="postCodeForm"><form>' +
                            '<input type="text" name="postcodeCheck" id="postcodeCheck"/>' +
                            '<button type="submit">Continue</button>' +
                            '</form></div></div></div>';
                    jQuery('[data-module-type="html"]').append(postCodeBox);

                    jQuery('.postCodeEntry form').on('submit', function (e) {
                        e.preventDefault();
                        require(['core/mazda.services'], function (service) {
                            service.getLocalDealers(jQuery('#postcodeCheck').val(), function (e) {
                                if (e.Results[0].IsDesignatedDealer) {
                                    //update widget with details
                                    service.setPostcode(e.Results[0].Dealer.Region, e.Results[0].Dealer.Id);
                                    jQuery('.postCodeEntry').remove();
                                    launchConfigurator(getAusTerritory(e.Results[0].Dealer.Region));
                                } else {
                                    jQuery('#postcodeCheck').css('border', '1px solid #ff0000');
                                }
                            });
                        });
                    });
                } else {
                    launchConfigurator(getAusTerritory(newLocale));
                }
            });
        });
    }

    function setConfiguratorLocale() {
        var locale = urlExtractor.getLocale();

        if (locale === 'en-au') {
            launchAusConfigurator();
        } else {
            launchConfigurator(locale);
        }
    }

    function getAusTerritory(newLocale) {
        var locale = 'en-au';

        switch (newLocale.toLowerCase()) {
        case 'vic':
            locale += '-vc';
            break;
        case 'nsw':
            locale += '-sw';
            break;
        case 'qld':
            locale += '-qd';
            break;
        case 'act':
            locale += '-ct';
            break;
        case 'tas':
            locale += '-ts';
            break;
        default:
            locale += '-' + newLocale;
        }

        return locale;
    }

    function getElementsByClassName(className) {
        var matchingItems = [],
            allElements = document.getElementsByTagName('*'),
            i;

        for (i = 0; i < allElements.length; i++) {
            if (allElements[i].className.indexOf(className) > -1) {
                matchingItems.push(allElements[i]);
            }
        }

        return matchingItems;
    }

    function removeClassFromElementsWith(className) {
        var els = getElementsByClassName(className),
            numberOfEls = els.length,
            el;

        while (numberOfEls--) {
            el = els[numberOfEls];
            el.className = el.className.replace(className, '');
        }
    }

    function runDesktopLauncher() {
        var tabsNavUL = document.getElementById('tabsNavUL'),
            startupDescEl = document.getElementById('startupDescription'),
            mazdaLogoContainer = document.getElementById('mazdaLogoContainer'),
            imageLoader = document.getElementById('vehicleLoadIndicator'),
            imageLoaderHtml = imageLoader.innerHTML;

        imageLoader.innerHTML = bmc.support.GlobalConfig.getInstance().LANGUAGE.LOADING_IMAGE +
            imageLoaderHtml;

        removeClassFromElementsWith('desktop-hidden');

        tabsNavUL.className = tabsNavUL.className.replace('hidden', '');
        startupDescEl.className += ' hidden';
        mazdaLogoContainer.className += ' hidden';

        startupDescEl.parentNode.removeChild(startupDescEl);
        mazdaLogoContainer.parentNode.removeChild(mazdaLogoContainer);
    }

    function runMobile() {
        var imageLoader = document.getElementById('mobileVehicleLoadIndicator'),
            imageLoaderHtml = imageLoader.innerHTML;

        imageLoader.innerHTML = bmc.support.GlobalConfig.getInstance().LANGUAGE.LOADING_IMAGE +
            imageLoaderHtml;

        removeClassFromElementsWith('mobile-hidden');
    }

    function setupGlobalConfig(locale) {
        globalConfig.setVehicleId(urlExtractor.getVehicle());
        globalConfig.setBodyStyleId(urlExtractor.getBodyStyle());
        globalConfig.setConfigurationId(urlExtractor.getConfiguration());
        globalConfig.setDriveType(urlExtractor.getDriveType());
        globalConfig.applyLocaleData(locale);
    }

    function addVehicleIdToDOM() {
        document.getElementById('vehicle-container-id').className += ' ' + globalConfig.getVehicleId();
    }

    function callCallback() {
        if (callback) {
            callback();
        }
    }

    function addViewport() {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=1024, initial-scale=1, maximum-scale=1';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    function launchConfigurator(locale) {
        setupGlobalConfig(locale);
        addVehicleIdToDOM();

        if (!bmc.support.PlatformDetector.isMobile()) {
            runDesktopLauncher();
            addViewport();
        } else {
            runMobile();
        }

        callCallback();
    }

    function prepareConfigurator(cb) {
        callback = cb;

        setupConfiguratorVariables();
        setConfiguratorLocale();
    }

    return {
        'prepareConfigurator': prepareConfigurator
    };

}(window));
