define([
    'view/components/HTMLComponentUI',
    'support/HTMLAttributes',
    'support/HTMLTemplateURL'
], function () {
    'use strict';
    var HTMLComponentUI = arguments[0],
        HTMLAttributes = arguments[1],
        HTMLTemplateURL = arguments[2];


    return puremvc.define({
            name: 'bmc.view.components.NavigationContainer',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {

                HTMLComponentUI.call(this,
                    '#' + HTMLAttributes.NAVIGATION_CONTAINER_ID,
                    parentSelector,
                    HTMLTemplateURL.NAVIGATION_ITEM
                );

                this.navigationVOs = [];
                this.highestProgress = 0;
                this.setupListeners();
            }
        },
        {
            getType: function () {
                return this.type || bmc.support.ConfigurableType.GRADE;
            },

            appendToDOM: function (html) {
                jQuery(this.getSelector() +
                    ' .' + HTMLAttributes.NAVIGATION_CLASS
                ).append(html);
            },

            setupListeners: function () {

                var self = this,
                    handleClick = function (event) {
                        self.dispatchItemSelected(event);
                    };

                jQuery('.tabsNavUL').delegate('[data-nav-vo-index]', 'click', handleClick);
            },

            setData: function (data) {

                this.navigationVOs = data;
                this.prepareDataAndRender();
            },

            prepareDataAndRender: function () {
                this.render({ items: this.navigationVOs});
            },

            populateUpTo: function (noteContents, simplifiedActiveConfiguration) {
                var types = bmc.support.ConfigurableType.getTypes(),
                    i,
                    uptoCurrent = false,
                    currentActiveCssSelector,
                    progressSelector;

                types.push(bmc.support.ConfigurableType.ACCESSORIES);

                this.type = noteContents.type;

                jQuery('.tabsNavUL li').removeClass('ui-state-active');

                for (i = 1; i < (types.length + 1); i++) {
                    this.showWhereIAm(i, uptoCurrent);
                    this.setHighestProgression(i, uptoCurrent);
                    this.setNavigationItemValue(i, simplifiedActiveConfiguration, types[i]);

                    if (noteContents.type === types[i]) {
                        currentActiveCssSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + (i - 1) + ']';
                        jQuery(currentActiveCssSelector).addClass('ui-state-active');
                        uptoCurrent = true;

                    }
                    else if (noteContents.type === 'summary') {
                        currentActiveCssSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + (types.length - 1) + ']';
                        progressSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + (types.length - 1) + ']' +
                            ' a';
                        jQuery(currentActiveCssSelector).addClass('ui-state-active');
                        jQuery(progressSelector).addClass('progress-bar');
                    }
                }
            },

            showWhereIAm: function (currentMenuItem, uptoCurrent) {
                var progressSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + (currentMenuItem - 1) + ']' + ' a';

                if (!uptoCurrent) {
                    jQuery(progressSelector).addClass('progress-bar');
                }
            },

            setHighestProgression: function (currentMenuItem, uptoCurrent) {
                if (this.highestProgress < currentMenuItem && !uptoCurrent) {
                    this.highestProgress += 1;
                }
            },

            setNavigationItemValue: function (currentMenuItem, simplifiedActiveConfiguration, noteContents) {
                var ConfigurableType = bmc.support.ConfigurableType,
                    navigatorDataValueSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + (currentMenuItem - 1) + ']' +
                        ' a p.tabSelection',
                    value;
                if (this.highestProgress >= currentMenuItem) {
                    if (ConfigurableType.ACCESSORIES === noteContents) {
                        value = simplifiedActiveConfiguration.accessoryVOs.length +
                            simplifiedActiveConfiguration.optionPackVOs.length;
                    } else {
                        value = bmc.support.StringUtils.truncate(simplifiedActiveConfiguration[noteContents].name, 20);
                    }

                    jQuery(navigatorDataValueSelector).html(value);
                }
            },

            dispatchItemSelected: function (event) {

                var dataIndex = event.currentTarget.getAttribute('data-nav-vo-index');

                if (this.onItemSelected) {
                    this.onItemSelected(this.navigationVOs[dataIndex]);
                }
            },

            renderUserJourneyComponentCurrentSection: function (itemToShow, navigationProxy) {
                if (itemToShow.type === navigationProxy.getActiveSectionVO().type) {
                    var voIndex = this.getVOIndex(itemToShow.type),
                        navigatorDataValueSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + voIndex + ']' +
                            ' a p.tabSelection',
                        progressSelector = '.tabsNavUL ' + 'li[data-nav-vo-index=' + voIndex + ']' + ' a';
                    jQuery(navigatorDataValueSelector).html(bmc.support.StringUtils.truncate(itemToShow.name, 20));
                    jQuery(progressSelector).addClass('progress-bar');
                }
            },

            getVOIndex: function (currentType) {
                var types = bmc.support.ConfigurableType.getTypes(),
                    i;
                for (i = 0; i < types.length; i++) {
                    if (currentType === types[i]) {
                        return i - 1;
                    }
                }
                return null;
            }
        },
        {
            ITEM_SELECTED: 'item-selected'
        });
});
