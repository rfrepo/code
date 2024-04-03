define([
    'easing',
    'support/HTMLAttributes',
    'support/HTMLTemplateURL',
    'view/components/HTMLComponentUI',
    'support/StringUtils',
    'support/ConfigurableType'
], function () {
    'use strict';
    var HTMLTemplateURL = arguments[2],
        HTMLComponentUI = arguments[3],
        ConfigurableType = arguments[5];

    return puremvc.define({
            name: 'bmc.view.components.ConfigurableItemPanel',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {

                HTMLComponentUI.call(this,
                    parentSelector,
                    parentSelector,
                    HTMLTemplateURL.ACCESSORY_ITEM_UI
                );

                this.configurableItemVOs = [];
                this.setupConfigurableItemListeners();
            }
        },
        {
            setupConfigurableItemListeners: function () {
                var self = this,
                    handleClick = function (event) {
                        self.dispatchItemSelected(event);
                    };
                jQuery(this.getParentSelector()).delegate('[data-vo-index]', 'click', handleClick);
            },

            setData: function (data) {

                if (data.length && this.hasTypesOfInterest(data[0].getType())) {

                    this.configurableItemVOs = data;
                    jQuery(this.getParentSelector()).empty();
                    this.render({ items: this.configurableItemVOs});
                }
            },

            hasTypesOfInterest: function (type) {
                return (type === ConfigurableType.ACCESSORIES || type === ConfigurableType.OPTIONPACK);
            },

            dispatchItemSelected: function (event) {

                var dataIndex = event.currentTarget.getAttribute('data-vo-index');

                if (this.onItemSelected) {
                    this.onItemSelected(event, this.configurableItemVOs[dataIndex].configurableItemVO);
                }
            },

            updateUI: function (configurableItemUIVOs) {

                var self = this;

                jQuery(this.getParentSelector()).find('.accessory-container').each(function () {
                    self.updateItemProperties(jQuery(this), configurableItemUIVOs);
                });
            },

            updateItemProperties: function (swatch, configurableItemUIVOs) {

                if (_.findWhere(configurableItemUIVOs, {id: swatch[0].getAttribute('data-id')})) {

                    swatch.addClass('selected');
                    swatch.find('a').html('Remove');
                } else {

                    swatch.removeClass('selected');
                    swatch.find('a').html('Add');
                }
            }
        },
        {
            ITEM_SELECTED: 'carousel-item-selected'
        });
});
