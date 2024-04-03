define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.ConflictVO'
        },
        {
            setType: function (value) {
                this.type = value;
            },

            getType: function () {
                return this.type;
            },

            isMatch: function () {
                return this.getCurrentValue() === this.getPreviousValue();
            },

            setPreviousValue: function (value) {
                this.previousValue = value;
            },

            getPreviousValue: function () {
                return this.previousValue;
            },

            setCurrentValue: function (value) {
                this.currentValue = value;
            },

            getCurrentValue: function () {
                return this.currentValue;
            },

            getSectionType: function () {
                return this.sectionType;
            },

            setSectionType: function (value) {
                this.sectionType = value;
            }
        });
});