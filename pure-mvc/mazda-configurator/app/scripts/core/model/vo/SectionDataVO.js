define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.SectionDataVO'
        },
        {
            setCarouselLength: function () {
                this.carouselLength = this.configurableItemVOs.length;
            },

            setActiveElements: function (activeConfiguration) {
                var i = 0,
                    currentSection = this.configurableItemVOs[0].type;
                for (i; i < this.configurableItemVOs.length; i++) {
                    if (activeConfiguration[currentSection].id === this.configurableItemVOs[i].id) {
                        this.activeItemIndex = i;
                    }
                }
            },

            getActiveElements: function () {
                return this.activeItemIndex;
            },

            setConfigurableItemVOs: function (value) {
                this.configurableItemVOs = value;
                this.setCarouselLength();
            },

            getConfigurableItemVOs: function () {
                return this.configurableItemVOs;
            },

            setSectionData: function (value) {
                this.sectionData = value;
            },

            getSectionData: function () {
                return this.sectionData;
            },

            setSectionName: function (value) {
                this.sectionName = value;
            },

            getSectionName: function () {
                return this.sectionName;
            },

            setGradeIds: function (gradeVOs) {
                this.gradeIds = gradeVOs;
            },

            getGradeIds: function () {
                return this.gradeIds;
            },

            getDisclaimer: function () {
                return this.disclaimer;
            },

            setDisclaimer: function (value) {
                this.disclaimer = value;
            }
        });
});