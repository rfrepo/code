(function () {

    /*
     html,body {
     margin: 0;
     font-size:100px;
     }
     #navbar.navbar_fixed {
     position:fixed;
     top:0px;
     width:100%;
     height:100px;
     background-color:#f00;
     opacity:.5;
     }
     #navbar.navbar_absolute {
     position:absolute;
     top:100px;
     width:100%;
     height:100px;
     background-color:#f00;
     opacity:.5;
     }
     </style>*/


    window.addEventListener("scroll", handleScrollerUpdated, false);
    console.log('sonic boom')

    var vehiclePresentationScrollLockPosition = 240,

        vehiclePresentationPosition,
        RELATIVE = 'relative',
        FIXED = 'fixed';

    function handleScrollerUpdated() {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            vehiclePresentation = jQuery('#tabs');
        console.log('scrollTop',scrollTop)
        if (scrollTop > vehiclePresentationScrollLockPosition && vehiclePresentationPosition !== FIXED) {
            vehiclePresentationPosition = FIXED;
            console.log('in',vehiclePresentation)
            vehiclePresentation.css('position', 'fixed')
        }
        else if (scrollTop < vehiclePresentationScrollLockPosition && vehiclePresentationPosition !== RELATIVE) {
            console.log('WHY ARE YOU HERE')
            vehiclePresentationPosition = RELATIVE;
            vehiclePresentation.css('position', 'relative')
        }
    }


})()