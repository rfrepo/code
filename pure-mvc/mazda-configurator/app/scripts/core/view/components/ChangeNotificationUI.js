define([
    'jqueryui',
    'support/StringUtils',
    'support/GlobalConstants',
    'support/HTMLAttributes',
    'support/HTMLTemplateURL',
    'support/HTMLTemplate',
    'view/components/HTMLComponentUI'
], function () {
    'use strict';
    var StringUtils = arguments[1],
        HTMLAttributes = arguments[3],
        HTMLTemplateURL = arguments[4],
        HTMLTemplate = arguments[5],
        HTMLComponentUI = arguments[6];


    return puremvc.define({
            name: 'bmc.view.components.ChangeNotificationUI',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {
                HTMLComponentUI.call(this,
                    '.' + HTMLAttributes.CHANGE_ALERT_CLASS,
                    parentSelector,
                    HTMLTemplateURL.CHANGE_NOTIFICATION_UI);


                this.isOpen = false;
            }
        },
        {
            setupListeners: function () {
                var self = this;

                jQuery(self.getSelector()).mouseover(function () {
                    self.stopAutoCloseTimer();
                });

                jQuery(self.getSelector()).mouseout(function () {
                    if (!self.isOpen) {
                        self.startAutoCloseTimer();
                    }
                });

                jQuery(self.getButtonSelector(HTMLAttributes.UNDO_CLASS)).click(function () {
                    if (self.onUndoClicked) {
                        self.onUndoClicked();
                        self.hide();
                    }
                });

                jQuery(self.getButtonSelector(HTMLAttributes.INFO_CLASS)).click(function () {
                    burrows.app.tracking.trackUpsellClick();
                    self.open();
                });

                jQuery(self.getButtonSelector(HTMLAttributes.ACCEPT_CLASS)).click(function () {
                    burrows.app.tracking.trackUpsellAccept();
                    self.hide();
                });
            },

            getButtonSelector: function (buttonClass) {
                return this.getSelector() + ' .' + buttonClass;
            },

            show: function (data) {

                this.isVisible = true;

                this.prepareJQueryView();

                this.formatPrice(data);

                this.renderData(data);

                jQuery(this.getSelector()).removeClass(bmc.support.HTMLAttributes.HIDDEN_CLASS);

                this.startAutoCloseTimer();
            },

            formatPrice: function (data) {
                var i,
                    conflictVO,
                    totalConflicts = data.length,
                    GlobalConstants = bmc.support.GlobalConstants;

                for (i = 0; i < totalConflicts; i++) {
                    conflictVO = data[i];
                    if (conflictVO.getType() === GlobalConstants.PRICE) {
                        conflictVO.setCurrentValue(StringUtils.formatPrice(conflictVO.getCurrentValue()));
                        conflictVO.setPreviousValue(StringUtils.formatPrice(conflictVO.getPreviousValue()));
                    }
                }
            },

            prepareJQueryView: function () {
                jQuery('.' + HTMLAttributes.MODAL_CLASS).dialog({
                    autoOpen: false,
                    show: {
                        effect: 'fade',
                        duration: 1000
                    },
                    hide: {
                        effect: 'fade',
                        duration: 500
                    },
                    resizable: 'false',
                    modal: 'true',
                    title: 'false',
                    draggable: 'false',
                    width: 500
                });
            },

            renderData: function (data) {

                this.renderMainConfigurationIssue(data);

                this.renderConfiguration(data,
                    HTMLAttributes.CURRENT_CONFIG_VALUES_CLASS,
                    HTMLTemplateURL.CHANGE_NOTIFICATION_CURRENT_VALUE_UI);

                this.renderConfiguration(data,
                    HTMLAttributes.CONFIG_TITLES_CLASS,
                    HTMLTemplateURL.CHANGE_NOTIFICATION_NAME_UI);

                this.renderConfiguration(data,
                    HTMLAttributes.NEW_CONFIG_VALUES_CLASS,
                    HTMLTemplateURL.CHANGE_NOTIFICATION_NEW_VALUE_UI);
            },

            renderMainConfigurationIssue: function (data) {
                var conflict,
                    numberOfConflicts = data.length,
                    i;

                for (i = 1; i < numberOfConflicts; i++) {
                    conflict = data[i];

                    if (conflict && conflict.getType() !== conflict.getSectionType()) {
                        jQuery(this.getPromptSelector()).html(this.getPromptString(conflict.getType(),
                            conflict.getCurrentValue()));

                        break;
                    }
                }
            },

            getPromptString: function (type, conflictValue) {
                var localeStr = bmc.support.GlobalConfig.getInstance().LANGUAGE.CONFLICT_PROMPT;
                localeStr = localeStr.replace(this.constructor.CONFLICT_PROMPT_TYPE, type);

                return localeStr.replace(this.constructor.CONFLICT_PROMPT_VALUE, conflictValue);
            },

            getPromptSelector: function () {

                return this.getSelector() + ' .' + HTMLAttributes.PROMPT_CLASS +
                    ' .' + HTMLAttributes.DESCRIPTION_CLASS;
            },

            renderConfiguration: function (data, type, tplUrl) {
                var currentConfigTpl = HTMLTemplate.getSynchronously(tplUrl),
                    currentConfigHtml = _.template(currentConfigTpl, { items: data });

                jQuery(
                    this.getConfigurationsSelector(type)
                ).html(currentConfigHtml);
            },

            getConfigurationsSelector: function (type) {
                return '.' + HTMLAttributes.NOTIFICATION_ALERT_DETAILS_CLASS + ' .' + type;
            },

            open: function () {
                jQuery(this.getSelector()).addClass(HTMLAttributes.HIDDEN_CLASS);
                jQuery('.' + HTMLAttributes.MODAL_CLASS).dialog('open');
                this.stopAutoCloseTimer();
                this.isOpen = true;
            },

            close: function () {

                try {
                    jQuery('.' + HTMLAttributes.MODAL_CLASS).dialog('close');
                }
                catch (error) {
                    this.prepareJQueryView();
                    jQuery('.' + HTMLAttributes.MODAL_CLASS).dialog('close');
                }

                this.isOpen = false;
            },

            render: function () {
                HTMLComponentUI.prototype.render.call(this);

                this.setupListeners();
                this.autoCloseTimer = undefined;
            },

            startAutoCloseTimer: function () {
                this.stopAutoCloseTimer();

                var self = this,
                    intervalCall = function () {
                        self.hide();
                    };

                self.autoCloseTimer = setInterval(intervalCall, this.constructor.AUTO_CLOSE_INTERVAL);
            },

            hide: function () {
                var self = this;

                if (self.isVisible) {
                    self.stopAutoCloseTimer();

                    jQuery(self.getSelector()).addClass(bmc.support.HTMLAttributes.HIDDEN_CLASS);
                    self.isVisible = false;
                    self.close();
                }
            },

            stopAutoCloseTimer: function () {
                clearInterval(this.autoCloseTimer);
            }
        },
        {
            CONFLICT_PROMPT_TYPE: '[[configurableType]]',
            CONFLICT_PROMPT_VALUE: '[[conflictValue]]',
            UNDO_SELECTED: 'undo-selected',
            FADE_ANIMATION_TIME: 1500,
            AUTO_CLOSE_INTERVAL: 5000
        });
})
;