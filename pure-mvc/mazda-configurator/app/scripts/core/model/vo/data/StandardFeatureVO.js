define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.data.StandardFeatureVO',
            constructor: function (data) {
                this.data = data;
                this.setProperties();
            }
        },
        {
            setProperties: function () {

                this.setId(this.data.id);
                this.setName(this.data.name);
                this.setCategory(this.data.Category);
            },

            setId: function (value) {
                this.id = value;
            },

            getId: function () {
                return this.id;
            },

            setName: function (value) {
                this.name = value;
            },

            getName: function () {
                return this.name;
            },

            setCategory: function (value) {
                this.category = value;
            },

            getCategory: function () {
                return this.category;
            },

            setStandardOnGrades: function (gradeId) {

                if (!this.standardOnGrades) {

                    this.standardOnGrades = {};
                }

                this.standardOnGrades[gradeId] = true;
            },

            isStandardOnGrades: function (gradeId) {
                return (this.standardOnGrades) ? Boolean(this.standardOnGrades[gradeId]) : false;
            },

            setOptionalOnGrades: function (gradeId) {

                if (!this.optionalOnGrades) {

                    this.optionalOnGrades = {};
                }
                this.optionalOnGrades[gradeId] = true;

            },

            isOptionalOnGrades: function (gradeId) {
                return (this.optionalOnGrades) ? Boolean(this.optionalOnGrades[gradeId]) : false;
            },

            setAvailableOnGrades: function (gradeId) {

                if (!this.availableOnGrades) {

                    this.availableOnGrades = {};
                }
                this.availableOnGrades[gradeId] = true;
            },

            isAvailableOnGrades: function (gradeId) {
                return (this.availableOnGrades) ? Boolean(this.availableOnGrades[gradeId]) : false;
            },

            setAvailableOnBodyStyle: function (bodyStyleId) {

                if (!this.availableOnBodyStyle) {

                    this.availableOnBodyStyle = {};
                }
                this.availableOnBodyStyle[bodyStyleId] = true;
            },

            isAvailableOnBodyStyle: function (bodyStyleId) {
                return (this.availableOnBodyStyle) ? Boolean(this.availableOnBodyStyle[bodyStyleId]) : false;
            }
        });
})
;