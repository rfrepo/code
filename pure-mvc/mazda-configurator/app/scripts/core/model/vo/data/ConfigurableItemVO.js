define(['model/support/DependencyDataParser',
    'support/StringUtils'
], function () {
    'use strict';
    var DependencyDataParser = arguments[0];

    return puremvc.define({
            name: 'bmc.model.vo.data.ConfigurableItemVO',
            constructor: function (data) {
                this.data = data;
                this.setProperties();
                this.data = null;
            }
        },
        {
            setProperties: function () {
                var self = this;

                self.id = String(self.data.id).replace(/ /g, '_');
                self.name = self.data.name;
                self.gradeIds = self.convertStringToArray(self.data.gradeIds);
                self.imageFileName = String(self.data.thumbnail).replace(/ /g, '_');
                self.disclaimer = self.data.disclaimer;

                if (self.data.dependencies) {
                    self.dependencies = self.createDependenciesStructure(self.data.dependencies);
                }
            },

            createDependenciesStructure: function (value) {
                var dependencyDataParser = new DependencyDataParser();
                return dependencyDataParser.extractDependencies(value);
            },

            convertStringToArray: function (value) {
                if (value) {
                    value = value.split();
                }
                return value;
            },

            setActive: function (bool) {
                this.active = bool;
            },

            getActive: function () {
                return this.active;
            },

            setId: function (value) {
                this.id = value;
            },

            getId: function () {
                return this.id;
            },

            setType: function (value) {
                this.type = value;
            },

            getType: function () {
                return this.type;
            },

            setName: function (value) {
                this.name = value;
            },

            getName: function () {
                return this.name;
            },

            setGradeIds: function (value) {
                this.gradeIds = value;
            },

            getGradeIds: function () {
                return this.gradeIds;
            },

            setImageFileName: function (value) {
                this.imageFileName = value;
            },

            getImageFileName: function () {
                return this.imageFileName;
            },

            setDisclaimer: function (value) {
                this.disclaimer = value;
            },

            getDisclaimer: function () {
                return this.disclaimer;
            },

            getDependencies: function () {
                return this.dependencies;
            },

            setDependencies: function (value) {
                this.dependencies = value;
            },

            setPrice: function (value) {
                this.price = value;
            },

            getPrice: function () {
                return this.price;
            },

            getThumbnail: function () {
                return this.imageFileName;
            }
        });
});