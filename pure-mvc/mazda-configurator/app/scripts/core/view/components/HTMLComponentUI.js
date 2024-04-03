define([
    'jquery',
    'support/HTMLAttributes',
    'support/HTMLTemplate'
], function () {
    'use strict';
    var HTMLTemplate = arguments[2];


    return puremvc.define({
            name: 'bmc.view.components.HTMLComponentUI',
            constructor: function (selector, parentSelector, templateUrl) {
                var self = this;

                self.selector = selector;
                self.parentSelector = parentSelector;

                if (templateUrl) {
                    self.addTemplateHTML(templateUrl);
                }
            }
        },
        {
            addTemplateHTML: function (url) {
                this.template = HTMLTemplate.getSynchronously(url);
            },

            getHTML: function () {
                return this.template || '';
            },

            getSelector: function () {
                return this.selector;
            },

            getParentSelector: function () {
                return this.parentSelector;
            },

            render: function (variables) {
                var self = this,
                    html = this.getHTML();

                self.appendToDOM(_.template(html, variables || {}));
            },

            appendToDOM: function (html) {
                jQuery(this.getParentSelector()).append(html);
            },

            remove: function () {
                jQuery(this.getSelector()).remove();
            }
        },
        {});
});