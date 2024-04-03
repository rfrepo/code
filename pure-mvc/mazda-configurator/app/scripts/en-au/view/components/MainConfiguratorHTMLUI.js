define([
    'jquery',
    'jqueryui',
    'easing',
    'support/HTMLAttributes',
    '../../../core/view/components/MainConfiguratorHTMLUI',
    'view/components/support/AusPostcodeFinderEvents'
], function () {
    'use strict';

    var HTMLAttributes = arguments[3],
        MainConfiguratorHTMLUI = arguments[4],
        AusPostcodeFinderEvents = arguments[5];

    return puremvc.define({
            name: 'bmc.view.components.MainConfiguratorHTMLUI',
            parent: MainConfiguratorHTMLUI
        },
        {
            postRenderJqueryCalls: function () {
                if (!this.jQueryMethodsCalled) {
                    jQuery(' #' + HTMLAttributes.NAVIGATION_CONTAINER_ID).tabs();
                    AusPostcodeFinderEvents.initilise();
                    this.jQueryMethodsCalled = true;
                }
            }
        });
});
