define(['model/vo/UserJourneyVO'], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.NavigationItemVO',
            constructor: function (type) {
                this.type = type;
            }
        },
        {
            getType: function () {
                return this.type;
            },

            getPrintableType: function () {
                return bmc.support.GlobalConfig.getInstance().LANGUAGE[this.type];
            },

            getCarouselSectionJourneyDetails: function () {
                return '...';
            },

            getSelectedItemTitle: function () {
                return this.selectedItemTitle;
            },

            setPreviouslyActiveSection: function (sectionType) {
                this.previouslyActiveSection = sectionType;
            },

            getPreviouslyActiveSection: function () {
                return this.previouslyActiveSection;
            }
        });
});