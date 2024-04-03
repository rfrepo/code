define([
    'model/vo/NavigationItemVO',
    'support/NotificationNames',
    'support/GlobalConstants',
    'support/ConfigurableType',
    'model/vo/UserJourneyVO'
], function () {
    'use strict';
    var NavigationItemVO = arguments[0],
        NotificationNames = arguments[1],
        ConfigurableType = arguments[3],
        UserJourneyVO = arguments[4];

    return puremvc.define({
            name: 'bmc.model.proxy.NavigationProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this);
                this.navigationVOs = [];
                this.activeSectionVO = undefined;
                this.userJourney = new UserJourneyVO();
                this.highestSectionVO = 0;
            }
        },
        {
            generateNavigationData: function (configurableItems) {
                this.createNavigationVOBasedOnConfigurableItemsWithData(configurableItems);
                this.createMandatoryNavigationVO();
                this.sendNotification(NotificationNames.NAVIGATION_DATA_AVAILABLE, this.navigationVOs);
                this.sendNotification(NotificationNames.NAVIGATION_ITEM_SELECTED,
                    this.navigationVOs[0]);
            },

            createNavigationVOBasedOnConfigurableItemsWithData: function (configurableItems) {

                var self = this,
                    configurableTypes = ConfigurableType.getTypes();
                configurableTypes.push(ConfigurableType.ACCESSORIES);

                _.each(configurableTypes, function (type) {

                    if (self.doesItemExistAndContainsData(type, configurableItems)) {
                        self.createAndStoreNavigationVO(type);
                    }
                });
            },

            createMandatoryNavigationVO: function () {
                var navigationVO = new NavigationItemVO('summary');
                this.navigationVOs.push(navigationVO);
            },


            doesItemExistAndContainsData: function (type, configurationItems) {
                return (configurationItems && configurationItems[type] && configurationItems[type].length);
            },

            createAndStoreNavigationVO: function (type) {
                var navigationVO = new NavigationItemVO(type);
                this.navigationVOs.push(navigationVO);
            },

            updateActiveSectionVO: function (navigationVO) {

                function getIndex(type) {

                    var types = ConfigurableType.getTypes(),
                        i;
                    for (i = 0; i < types.length; i++) {
                        if (type === types[i]) {
                            return i - 1;
                        }
                    }
                    return null;
                }

                if (getIndex(navigationVO.type) > getIndex(this.highestSectionVO.type)) {
                    this.highestSectionVO = navigationVO;
                }

                if (this.canChangeSection(navigationVO)) {
                    this.activeSectionVO = navigationVO;
                    this.sendNotification(NotificationNames.ACTIVE_SECTION_UPDATED, navigationVO);
                }
            },

            canChangeSection: function (navigationVO) {
                return this.getActiveSectionVO() !== navigationVO ||
                    navigationVO.type === bmc.support.GlobalConstants.SUMMARY;
            },

            getActiveSectionVO: function () {
                return this.activeSectionVO;
            },

            getHighestSectionVO: function () {
                return this.highestSectionVO;
            }
        },
        {
            NAME: 'NavigationProxy'
        }
    );
});