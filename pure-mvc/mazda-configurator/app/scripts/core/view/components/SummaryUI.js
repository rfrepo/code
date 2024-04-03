define([
    'jquery',
    'support/HTMLTemplate',
    'support/HTMLTemplateURL',
    'support/HTMLAttributes',
    'support/StringUtils',
    'support/UrlBuilder',
    'view/components/HTMLComponentUI',
    'support/Accordion',
    'view/components/ConfigurableItemPanel'
], function () {
    'use strict';
    var HTMLTemplate = arguments[1],
        HTMLTemplateURL = arguments[2],
        HTMLAttributes = arguments[3],
        UrlBuilder = arguments[5],
        HTMLComponentUI = arguments[6],
        Accordion = arguments[7],
        ConfigurableItemPanel = arguments[8];

    return puremvc.define({
            name: 'bmc.view.components.SummaryUI',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {
                HTMLComponentUI.call(this,
                    '.' + HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS,
                    parentSelector,
                    HTMLTemplateURL.SUMMARY_UI);

                this.localiseAnchorText();
                this.disclaimerUI = jQuery('#' + bmc.support.HTMLAttributes.SECTION_DISCLAIMER_ID);
            }
        },
        {
            localiseAnchorText: function () {
                var summaryNavContainerSelector = '.' + HTMLAttributes.SUMMARY_NAV_CONTAINER_CLASS,
                    dictionary = bmc.support.GlobalConfig.getInstance().LANGUAGE;

                jQuery(' .' + HTMLAttributes.SUMMARY_TITLE_CLASS).html(dictionary.summary);

                jQuery(' .' + HTMLAttributes.SUMMARY_DOWNLOAD_BUTTON).html(dictionary.DOWNLOAD_PRINT_SAVE);

                jQuery(summaryNavContainerSelector + ' .' + HTMLAttributes.SUMMARY_OVERVIEW_CLASS).html(
                    dictionary.OVERVIEW);

                jQuery(summaryNavContainerSelector + ' .' + HTMLAttributes.SUMMARY_FEATURES_CLASS).html(
                    dictionary.STANDARD_FEATURES);

                jQuery(summaryNavContainerSelector + ' .' + HTMLAttributes.SUMMARY_TECHNICAL_CLASS).html(
                    dictionary.TECHNICAL_DATA);

                jQuery(summaryNavContainerSelector + ' .' + HTMLAttributes.SUMMARY_DEALER_CLASS).html(
                    dictionary.NEAREST_DEALER);
            },

            renderSections: function (summaryData) {

                var templateHTML = [
                    this.getOverviewHTML(),
                    this.getFeaturesHTML(),
                    this.getTechnicalHTML(summaryData.configuration.getBaseVehicleVO().getSpecPage()),
                    this.getDealerLocationHTML()
                ].join('');

                this.renderSummary(templateHTML, summaryData);
                this.createAccessoryComponents(summaryData.accessoryUIVOs);
                this.setupSubSectionPageScrollAnchoring();

                Accordion.setupAccordion();

                this.setupFinanceCalculatorModal();
                this.setupButtonClickEvents();
            },

            createAccessoryComponents: function (data) {

                if (data.length) {
                    this.createAccessoryNavigationItem();
                    this.createAccessoryView(data);
                }
            },

            createAccessoryNavigationItem: function () {

                var summaryNavContainerSelector = '.' + HTMLAttributes.SUMMARY_NAV_CONTAINER_CLASS;

                jQuery(summaryNavContainerSelector + ' .' + HTMLAttributes.SUMMARY_ACCESSORIES_CLASS).html(
                    bmc.support.GlobalConfig.getInstance().LANGUAGE.accessories);
            },

            createAccessoryView: function (data) {

                if (data.length) {

                    var accessoriesPanel = new ConfigurableItemPanel(this.getSelector());
                    accessoriesPanel.render({items: data});
                    this.repositionAccessoriesPanel();
                }
            },

            repositionAccessoriesPanel: function () {

                var summaryContianer = jQuery(this.getSelector()),

                    featureContainer = jQuery(summaryContianer.find('.' + HTMLAttributes.SUMMARY_FEATURES_CLASS)[0]),
                    optionPacksPanel = summaryContianer.find('.' + HTMLAttributes.OPTIONPACKS_CONTAINER_CLASS),
                    accessoriesPanel = summaryContianer.find('.' + HTMLAttributes.ACCESSORIES_CONTAINER_CLASS);

                featureContainer.before(optionPacksPanel);
                featureContainer.before(accessoriesPanel);
                accessoriesPanel.attr('id', 'accessories');

            },

            getOverviewHTML: function () {
                return HTMLTemplate.getSynchronously(HTMLTemplateURL.SUMMARY_OVERVIEW_UI);
            },

            getFeaturesHTML: function () {
                return HTMLTemplate.getSynchronously(HTMLTemplateURL.SUMMARY_FEATURES_UI);
            },

            getTechnicalHTML: function (specURL) {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    basicTemplate = HTMLTemplate.getSynchronously(
                        HTMLTemplateURL.SUMMARY_TECHNICAL_UI
                    ),
                    xmlTable, xmlTableArr;

                try {
                    xmlTable = HTMLTemplate.getSynchronously(
                        UrlBuilder.replacePlaceHolderVehicleId(
                            globalConfig.SPECIFICATION_LOCATION) + specURL
                    );
                }
                catch (e) {
                    return '';
                }

                xmlTableArr = xmlTable.split('<h3 ');
                xmlTableArr.splice(0, 1, '<h3 ');
                xmlTable = xmlTableArr.join('<h3 ');

                return basicTemplate.replace('[[specification-xml]]', xmlTable);
            },

            getDealerLocationHTML: function () {
                return HTMLTemplate.getSynchronously(HTMLTemplateURL.SUMMARY_LOCATE_DEALER_UI);
            },

            setupButtonClickEvents: function () {
                var self = this,
                    globalConfig = bmc.support.GlobalConfig.getInstance();

                jQuery('.' + HTMLAttributes.SUMMARY_DOWNLOAD_BUTTON).click(function () {
                    if (self.getPDF) {
                        document.getElementById('vehicleLoadIndicator').innerHTML =
                            bmc.support.GlobalConfig.getInstance().LANGUAGE.LOADING_PDF;
                        jQuery('.' + HTMLAttributes.IMAGE_LOADING_CLASS).show();
                        self.getPDF();
                    }
                });

                jQuery(
                    this.getSelector() + ' .' + HTMLAttributes.EDIT_CONFIGURATION_BUTTON
                ).click(function () {
                        if (self.onEditConfigurationButtonClick) {
                            self.onEditConfigurationButtonClick();
                        }
                    });

                jQuery(' .' + HTMLAttributes.FINANCE_CALCULATOR_BUTTON).click(function () {
                    jQuery('.finance-calculator-modal').removeClass(bmc.support.HTMLAttributes.HIDDEN_CLASS);
                    jQuery('.finance-calculator-modal iframe').attr('src', globalConfig.FINANCE_CALCULATOR_LINK);
                    jQuery('.finance-calculator-modal').dialog('open');
                    return false;
                });

                jQuery('.finance-calculator-modal .button').click(function () {
                    jQuery('.finance-calculator-modal').addClass(bmc.support.HTMLAttributes.HIDDEN_CLASS);
                    jQuery('.finance-calculator-modal iframe').attr('src', '');
                    jQuery('.finance-calculator-modal').dialog('close');
                    return false;
                });
            },

            setupFinanceCalculatorModal: function () {
                jQuery('.finance-calculator-modal').dialog({
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
                    width: 920
                });
            },

            setupSubSectionPageScrollAnchoring: function () {
                var self = this;

                jQuery('.summary-nav-container').on('click', 'a', function (el) {

                    var scrollPosition = self.getScrollPosition(),
                        contentSectionContainer,
                        contentSectionId = jQuery(this).attr('href');

                    self.toggleSelectedNavigation(el.target);

                    if (contentSectionId && contentSectionId.indexOf('#') !== -1 &&
                        contentSectionId.indexOf('#') !== contentSectionId.length - 1) {

                        contentSectionContainer = $(self.getSelector()).find(contentSectionId);

                        if (contentSectionContainer.length > 0) {
                            jQuery('html, body').animate(
                                {scrollTop: contentSectionContainer.offset().top - scrollPosition}, 400);
                            return false;
                        }
                    }
                });
            },

            getScrollPosition: function () {
                return (jQuery(window).scrollTop() < 243) ? 400 : 365;
            },

            toggleSelectedNavigation: function (clickedElement) {

                jQuery('a.anchor').each(function (index, el) {
                    jQuery(el).removeClass(HTMLAttributes.SELECTED_CLASS);
                });

                jQuery(clickedElement).addClass(HTMLAttributes.SELECTED_CLASS);
            },

            setupJQueryAccordion: function () {


                jQuery(this.getSelector() +
                    ' .' + HTMLAttributes.SUMMARY_FEATURES_CLASS +
                    ' .' + HTMLAttributes.ACCORDION_CLASS).accordion(
                    {
                        collapsible: true,
                        heightStyle: 'content',
                        active: false
                    }
                );
            },

            renderSummary: function (templateHtml, summaryData) {
                var $el = jQuery(this.getSelector()).empty();

                $el.append(
                    _.template(templateHtml, summaryData)
                );

                this.displayDisclaimerContent(summaryData);

            },

            displayDisclaimerContent: function (data) {

                this.disclaimerUI.parent().append(this.disclaimerUI);
                this.disclaimerUI.html(data.disclaimer);
            }
        },
        {});
});