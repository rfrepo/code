require.config({
    baseUrl: './scripts/core',
    waitSeconds: 15,
    paths: {
        jquery: '../../components/jquery/jquery',
        'core/mazda.utils': 'vendor/syzygy/core.utils',
        'jquery.reel': 'vendor/jquery.reel',
        jqueryui: 'vendor/jqueryui',
        easing: 'vendor/jquery.easing',
        carousel: 'vendor/jquery.carousel',
        staticCarousel: 'vendor/jquery.slides',
        attrChange: 'vendor/attrchange',

        'view/components/support/AusPostcodeFinderEvents': '../en-au/view/components/support/AusPostcodeFinderEvents',
        'controller/support/PrepareSectionConfigurableItemUIVOs/CreateGradesConfigurableItemUIVOsStrategy':
            '../en-au/controller/support/PrepareSectionConfigurableItemUIVOs/' +
                'CreateGradesConfigurableItemUIVOsStrategy',
        'controller/command/startup/FilterBaseVehicleVOsCommand':
            '../en-au/controller/command/startup/FilterBaseVehicleVOsCommand',
        'model/proxy/data/DisclaimerProxy': '../en-au/model/proxy/data/DisclaimerProxy',
        'model/proxy/PriceDisplayProxy': '../en-au/model/proxy/PriceDisplayProxy',
        'model/vo/data/DisclaimerVO': '../en-au/model/vo/data/DisclaimerVO'
    },
    shim: {
        jqueryui: {
            deps: ['jquery'],
            exports: 'jQuery.ui'
        },
        'jquery.reel': {
            deps: ['jquery'],
            exports: 'jQuery.reel'
        },
        easing: {
            deps: ['jquery'],
            exports: 'jQuery.easing'
        },
        carousel: {
            deps: ['jquery'],
            exports: 'jQuery.fn.contentcarousel'
        },
        attrChange: {
            deps: ['jquery']
        }
    },

    map: {
        '*': {
            'Application': '../en-au/Application',

            'controller/command/startup/core/PrepModelCommand':
                '../en-au/controller/command/startup/core/PrepModelCommand',
            'controller/command/PrepareSectionCarouselContentCommand':
                '../en-au/controller/command/PrepareSectionCarouselContentCommand',
            'controller/command/startup/ModelDataLoadedCommand':
                '../en-au/controller/command/startup/ModelDataLoadedCommand',
            'controller/command/startup/DistributeModelDataToProxiesForParsingCommand':
                '../en-au/controller/command/startup/DistributeModelDataToProxiesForParsingCommand',
            'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy':
                '../en-au/controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy',
            'controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy'
                : '../en-au/controller/support/PrepareSectionConfigurableItemUIVOs/' +
                'AbstractCreateConfigurableItemUIVOsStrategy',

            'model/support/SectionData/delegate/DependencyPriceCalculatorDelegate':
                '../en-au/model/support/SectionData/delegate/DependencyPriceCalculatorDelegate',

            'view/components/SectionContentUI': '../en-au/view/components/SectionContentUI',
            'view/components/SummaryUI': '../en-au/view/components/SummaryUI',
            'view/components/MainConfiguratorHTMLUI': '../en-au/view/components/MainConfiguratorHTMLUI',
            'view/components/MobileUI': '../en-au/view/components/MobileUI'
        }
    }

});

