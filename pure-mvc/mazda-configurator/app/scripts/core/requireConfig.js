require.config({
    baseUrl: './scripts/core',
    waitSeconds: 15,
    paths: {
        jquery: '../../components/jquery/jquery',
        'jquery.reel': 'vendor/jquery.reel',
        jqueryui: 'vendor/jqueryui',
        easing: 'vendor/jquery.easing',
        carousel: 'vendor/jquery.carousel',
        staticCarousel: 'vendor/jquery.slides'

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
        }
    }
});