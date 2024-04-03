// http://tympanus.net/codrops/2011/08/16/circular-content-carousel/

(function($) {
	var	aux		= {
			// navigates left / right
			navigate	: function( dir, $el, $wrapper, opts, cache ) {
				
				var scroll		= opts.scroll,
				factor		= 1,
				idxClicked	= 0;

				if( cache.expanded ) {
					scroll		= 1; // scroll is always 1 in full mode
					factor		= 4; // the width of the expanded option will be 3 times bigger than 1 collapsed option	
					idxClicked	= cache.idxClicked; // the index of the clicked option
				}
				
				// clone the elements on the right / left and append / prepend them according to dir and scroll
				if( dir === 1 ) {
					$wrapper.find('li.option:lt(' + scroll + ')').each(function(i) {
						$(this).clone(true).css( 'left', ( cache.totaloptions - idxClicked + i ) * cache.optionW * factor + 'px' ).appendTo( $wrapper );
					});
				}
				else {
					var $first	= $wrapper.children().eq(0);
					
					$wrapper.find('li.option:gt(' + ( cache.totaloptions  - 1 - scroll ) + ')').each(function(i) {
						// insert before $first so they stay in the right order
						$(this).clone(true).css( 'left', - ( scroll - i + idxClicked ) * cache.optionW * factor + 'px' ).insertBefore( $first );
					});
				}
				
				// animate the left of each option
				// the calculations are dependent on dir and on the cache.expanded value
				$wrapper.find('li.option').each(function(i) {
					var $option	= $(this);
					$option.stop().animate({
						left	:  ( dir === 1 ) ? '-=' + ( cache.optionW * factor * scroll ) + 'px' : '+=' + ( cache.optionW * factor * scroll ) + 'px'
					}, opts.sliderSpeed, opts.sliderEasing, function() {
						if( ( dir === 1 && $option.position().left < - idxClicked * cache.optionW * factor ) || ( dir === -1 && $option.position().left > ( ( cache.totaloptions - 1 - idxClicked ) * cache.optionW * factor ) ) ) {
							// remove the option that was cloned
							$option.remove();
						}						
						cache.isAnimating	= false;
					});
				});
				
			},
			// opens an option (animation) -> opens all the others
			openoption	: function( $wrapper, $option, opts, cache ) {
				cache.idxClicked	= $option.index();
				// the option's position (1, 2, or 3) on the viewport (the visible options) 
				cache.winpos		= aux.getWinPos( $option.position().left, cache );
				$wrapper.find('li.option').not( $option ).hide();
				$option.find('ul.ca-content-wrapper').css( 'left', cache.optionW + 'px' ).stop().animate({
					width	: cache.optionW * 2 + 'px',
					left	: cache.optionW + 'px'
				}, opts.optionSpeed, opts.optionEasing)
				.end()
				.stop()
				.animate({
					left	: '0px'
				}, opts.optionSpeed, opts.optionEasing, function() {
					cache.isAnimating	= false;
					cache.expanded		= true;
					
					aux.openoptions( $wrapper, $option, opts, cache );
				});

			},
			// opens all the options
			openoptions	: function( $wrapper, $openedoption, opts, cache ) {
				var openedIdx	= $openedoption.index();
				
				$wrapper.find('li.option').each(function(i) {
					var $option	= $(this),
					idx		= $option.index();
					
					if( idx !== openedIdx ) {
						$option.css( 'left', - ( openedIdx - idx ) * ( cache.optionW * 3 ) + 'px' ).show().find('div.ca-content-wrapper').css({
							left	: cache.optionW + 'px',
							width	: cache.optionW * 2 + 'px'
						});
						
						// hide more link
						aux.toggleMore( $option, false );
					}
				});
			},

			// the current one is animated
			closeoptions	: function( $wrapper, $openedoption, opts, cache ) {
				var openedIdx	= $openedoption.index();
				
				$openedoption.find('ul.ca-content-wrapper').stop().animate({
					width	: '0px'
				}, opts.optionSpeed, opts.optionEasing)
				.end()
				.stop()
				.animate({
					left	: cache.optionW * ( cache.winpos - 1 ) + 'px'
				}, opts.optionSpeed, opts.optionEasing, function() {
					cache.isAnimating	= false;
					cache.expanded		= false;
				});
				
				// show more link
				aux.toggleMore( $openedoption, true );
				
				$wrapper.find('li.option').each(function(i) {
					var $option	= $(this),
					idx		= $option.index();
					
					if( idx !== openedIdx ) {
						$option.find('div.ca-content-wrapper').css({
							width	: '0px'
						})
						.end()
						.css( 'left', ( ( cache.winpos - 1 ) - ( openedIdx - idx ) ) * cache.optionW + 'px' )
						.show();
						
						// show more link
						aux.toggleMore( $option, true );
					}
				});
			},
			// gets the option's position (1, 2, or 3) on the viewport (the visible options)
			// val is the left of the option
			getWinPos	: function( val, cache ) {
				switch( val ) {
					case 0 					: return 1; break;
					case cache.optionW 		: return 2; break;
					case cache.optionW * 2 	: return 3; break;
				}
			}
		},
		methods = {
			init 		: function( options, adapter ) {

				if( this.length ) {
					
					var settings = {
						sliderSpeed		: 500,			// speed for the sliding animation
						sliderEasing	: 'easeOutExpo',// easing for the sliding animation
						optionSpeed		: 500,			// speed for the option animation (open / close)
						optionEasing		: 'easeOutExpo',// easing for the option animation (open / close)
						scroll			: 1				// number of options to scroll at a time
					};
					
					return this.each(function() {
						
						// if options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this),
						$wrapper		= $el.find('ul.ca-wrapper'),
						$options			= $wrapper.children('li.option'),
						cache			= {};
						
						// save the with of one option	
						cache.optionW			= $options.width();
						// save the number of total options
						cache.totaloptions	= $options.length;
						
						// add navigation buttons
						if( cache.totaloptions > 3 )
							$el.prepend('<div class="ca-nav"><span class="ca-nav-prev">Previous</span><span class="ca-nav-next">Next</span></div>')	
						
						// control the scroll value
						if( settings.scroll < 1 )
							settings.scroll = 1;
						else if( settings.scroll > 3 )
							settings.scroll = 3;	
						
						var $navPrev		= $el.find('span.ca-nav-prev'),
						$navNext		= $el.find('span.ca-nav-next');
						
						// hide the options except the first 3
						$wrapper.css( 'overflow', 'hidden' );
						
						// the options will have position absolute 
						// calculate the left of each option
						$options.each(function(i) {
							$(this).css({
								position	: 'absolute',
								left		: i * cache.optionW + 'px'
							});
						});
						
						// navigate left
						$navPrev.bind('click.contentcarousel', function( event ) {
							if( cache.isAnimating ) return false;
							cache.isAnimating	= true;
							aux.navigate( -1, $el, $wrapper, settings, cache );
						});
						
						// navigate right
						$navNext.bind('click.contentcarousel', function( event ) {
							if( cache.isAnimating ) return false;
							cache.isAnimating	= true;
							aux.navigate( 1, $el, $wrapper, settings, cache );
						});

                        // RICKY CLEGG - 26/9/13 - Creates public reference
                        adapter = adapter || {};
                        adapter['aux'] = aux;
                        adapter['element'] = $el;
                        adapter['wrapper'] = $wrapper;
                        adapter['settings'] = settings;
                        adapter['cache'] = cache;

						// adds events to the mouse - 
						// commented out as the UX was confusing
						
						// $el.bind('mousewheel.contentcarousel', function(e, delta) {
						// 	if(delta > 0) {
						// 		if( cache.isAnimating ) return false;
						// 		cache.isAnimating	= true;
						// 		aux.navigate( -1, $el, $wrapper, settings, cache );
						// 	}	
						// 	else {
						// 		if( cache.isAnimating ) return false;
						// 		cache.isAnimating	= true;
						// 		aux.navigate( 1, $el, $wrapper, settings, cache );
						// 	}	
						// 	return false;
						// });
						
					});
}
}
};

$.fn.contentcarousel = function(method) {
	if ( methods[method] ) {
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.contentcarousel' );
	}
};

})(jQuery);