define([
    'jquery',
    'view/components/HTMLComponentUI',
    'support/HTMLTemplateURL',
    'support/HTMLTemplate',
    'support/HTMLAttributes',
    'support/Accordion'
], function () {
    'use strict';

    var HTMLAttributes = arguments[4];

    puremvc.define({
            name: 'bmc.view.components.support.ConfigurableItemSpecificationsUI',
            parent: bmc.view.components.HTMLComponentUI,

            constructor: function (parentSelector) {

                bmc.view.components.HTMLComponentUI.call(this,
                    parentSelector,
                    parentSelector,
                    bmc.support.HTMLTemplateURL.TABLE_ACCORDION_UI);
            }
        },
        {
            setCellRendererTemplateURL: function (templateURL) {
                this.cellRenderTemplate = _.template(bmc.support.HTMLTemplate.getSynchronously(templateURL));
            },

            render: function (data) {

                this.setTemplatePropertyOnData(data);

                bmc.view.components.HTMLComponentUI.prototype.render.call(this, data);

                this.setInitialVariables();

                bmc.support.Accordion.setupAccordion({active: true});
            },

            setTemplatePropertyOnData: function (data) {

                if (!this.cellRenderTemplate) {
                    throw new Error(this.constructor.NO_TEMPLATE_ERROR_MESSAGE);
                }
                else {
                    data.cellRenderer = this.cellRenderTemplate;
                }
            },

            scrollTo: function (positionData) {

                var self = this;
                this.animationProperties.left = positionData.currentPosition - this.constructor.COLUMN_WITH;

                _.each(this.scrollTargets, function (scrollTarget) {

                    scrollTarget = jQuery(scrollTarget);

                    scrollTarget.stop(true, false);
                    scrollTarget.animate(self.animationProperties, 350);
                });
            },

            setInitialVariables: function () {

                this.scrollTargets = jQuery('.accordion .scroll-target');
                this.animationProperties = {left: 0};

                this.setHeightOfTitleRows();

            },

            setHeightOfTitleRows: function () {
                var titleRows = jQuery('.' + HTMLAttributes.CONFIGURABLE_ITEM_SPECIFICATION_CLASS + ' .' +
                        HTMLAttributes.TITLE_ACCORDION_TABLE + ' tr'),
                    bodyRows = jQuery('.' + HTMLAttributes.CONFIGURABLE_ITEM_SPECIFICATION_CLASS + ' .' +
                        HTMLAttributes.BODY_ACCORDION_TABLE + ' tr');

                titleRows.each(function (index) {
                    var bodyElem = jQuery(bodyRows[index]).children()[1];

                    jQuery(titleRows[index]).children().first().css('height',
                        jQuery(bodyElem).css('height'));
                });
            },

            cleanup: function () {
                jQuery('.' + HTMLAttributes.CONFIGURABLE_ITEM_SPECIFICATION_CLASS).empty();
            }
        },
        {
            NO_TEMPLATE_ERROR_MESSAGE: 'Cell Render template required',
            COLUMN_WITH: 237
        });
});