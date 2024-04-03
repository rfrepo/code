(function () {

    var self = this,
        leftArrow = $('#ArrowLeft'),
        rightArrow = $('#ArrowRight'),
        carouselContainer = $('#CarouselContainer'),

        containerPosition = 300;


    leftArrow.click(clickHandler);
    rightArrow.click(clickHandler);

    function clickHandler(e) {
        //console.log(e)
        var direction = (e.target === rightArrow[0]) ? 1 : -1;
        moveChildren(direction);
    }

    function moveChildren(direction) {

        var carouselitems = $('.carousel-item'),
            numChildrenOnDisplay = 3,
            viewableArea = numChildrenOnDisplay * $(carouselitems[0]).width();

        console.log('totalCarouselItems', viewableArea)

        carouselitems.each(function () {

            var item = $(this),
                itemOffset = item.position().left;
            moveToPosition = item.width() * direction;

            item.animate({
                left: '+=' + moveToPosition,
                opacity: (itemOffset + moveToPosition) >= viewableArea ? .5 : 1
            }, 500, "linear");

            console.log('MINE IS :',(itemOffset + moveToPosition))
        });

    }


})();
