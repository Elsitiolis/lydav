

$(document).ready(function() {

	opacitySpeed = 500;

	imgHover();



	// FORMAT PRICE SWITCH
	if($('body').hasClass('lib_book-page') || $('body').hasClass('book-page')){

		$('#variant-selector').change(function() {

		    var $price = $(this).find(':selected').data('price');

		    var $vartitle = $(this).find(':selected').data('title');
		    

		    var $pricetag = $('span.num')



		    // GET CONVERSION
			$curCode = geoplugin_currencyCode();
			
			//visual/HTML representation of curSymbol
			$curSymbol = geoplugin_currencySymbol();
			$decCurSym = decodeHtml($curSymbol);
			
			//conversion of price to correct geoLoc
			$convertedPrice = geoplugin_currencyConverter($price, false);
			$convertedPrice = Math.round($convertedPrice);
			//update price (VISUAL)

			// $visprice = $price.toFixed(0);
			$visprice = $convertedPrice;

		    $pricetag.html($visprice);
		    $('h4.price').addClass('changed');

		    setTimeout(function () { 
			    $('h4.price').removeClass('changed');
			}, 250);

			// URL setup
			var $url = 'https://publicationstudio.foxycart.com/cart?';

		    $url += 'name=' +$title +' ';
			$url += $prefix;
			$url += $author
			$url += '&price=' + $convertedPrice + $curCode;
			$url += '&image=' + $cartimg;

			if($vartitle == 'DRM-Free Ebook'){
				$curCode = 'DRM'
			}
			
			$url += '&category=' + $curCode;
			$url += '&format=' + $vartitle;


			//testing with data-url
			// $('#swet').attr('data-href', $url);
			$('#swet').attr('href', $url);

			// console.log($url);
			// console.log('converted price: ' + $decCurSym + $convertedPrice + '(' + $curCode + ')');
			// console.log('original  price: ' + '$' + $price + '(USD)');


		});

	}


	if($('body').hasClass('library-page')){
		var scroller = {};
		scroller.e = document.getElementById("lib-books");

		if (scroller.e.addEventListener) {
		    scroller.e.addEventListener("mousewheel", MouseWheelHandler, false);
		    scroller.e.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		} else scroller.e.attachEvent("onmousewheel", MouseWheelHandler);
	}

	if($('body').hasClass('book-page')){
	
		$('[data-fancybox="book-gallery"]').fancybox({
			// Options will go here
			loop: true,
			protect: true,
			infobar: false,
			touch: { vertical : false },
		    clickContent: "next",
			buttons: [
		        "close"
    		],
    		btnTpl: {
    			 close:
		            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
		            '<span class="cross"><span class="line"></span><span class="line"></span></span>' +
		            "</button>",
    			// Arrows
		        arrowLeft:
		            '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left arrow-left arrow-wrapper" title="{{PREV}}" href="javascript:;">' +
		            '<div class="arrow left">' +
		            '<span class="head"></span>' + 
		            "</div>" +
		            "</a>",

		        arrowRight:
		            '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right arrow-right arrow-wrapper" title="{{NEXT}}" href="javascript:;">' +
					'<div class="arrow right">' +
		            '<span class="head"></span>' + 
		            "</div>" +
		            "</a>"
		    		}
		});

	}
	

	if($('body').hasClass('activity-page')){

		var sliderKey = 0;

		$('.instagram').imagesLoaded().progress(function() {
		  

			$('.js-carousel').not('.slick-initialized').each(function(key, item){

				// var $slider = $(this);
				var sliderIdName = 'slider' + sliderKey;
				this.id = sliderIdName;

				var sliderId = '#' + sliderIdName;

				$(sliderId).slick({
					dots: true,
					slide: '.js-slide',
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					mobileFirst: false,
					appendDots: $(sliderId + ' .nav-buttons')
				});

				sliderKey = sliderKey + 1;

			});

			$('.instagram').masonry({
				// options
				itemSelector: '.instagram-item',
				columnWidth: '.grid-sizer',
				percentPosition: true
				// horizontalOrder: true
			});
		});


		if($('body').hasClass('activity-page')){
			var ias = jQuery.ias({
				container:  '.instagram',
				item:       'a.instagram-item',
				pagination: '.MarkupPagerNav',
				next:       '.MarkupPagerNavNext a'
			});

			ias.extension(new IASSpinnerExtension({
			    html: '<div class="loadmore"><h4>Loading</h4></div>'
			}));

			ias.on('render', function(items) {
				// PREVENT GLITCH AT TOP
				$(items).css({ opacity: 0 });
			});	

			ias.on('rendered', function(items) {
				// msnry.appended(items);
				var $items = $( items );
				// add jQuery object
				$container = $('.instagram');


				$('.js-carousel').not('.slick-initialized').each(function(key, item){

					// var $slider = $(this);
					var sliderIdName = 'slider' + sliderKey;
					this.id = sliderIdName;

					var sliderId = '#' + sliderIdName;

					$(sliderId).slick({
						dots: true,
						slide: '.js-slide',
						speed: 300,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						mobileFirst: false,
						appendDots: $(sliderId + ' .nav-buttons')
					});

					sliderKey = sliderKey + 1;

				});

				$items.imagesLoaded(function(){
					
					$items.css({opacity:1});
					$container.masonry( 'appended', $items );
					$container.masonry('layout');

				});
		    });
		}
	}

	if($('body').hasClass('about-page')){
		$('.js-about-carousel').slick({
			infinite: true,
			slidesToShow: 1,
			speed: 1000,
			autoplay: true,
			slide: '.carousel-img',
			prevArrow: '.slick-prev.arrow-left',
			nextArrow: '.slick-next.arrow-right',
			dots: true	
		});
	}


	$('.js-studio-slider').slick({
		infinite: true,
		slidesToShow: 1,
		speed: 500,
		autoplay: true,
		arrows: false,
		dots: false,
		verticalSwiping: true,
		vertical:true
	});

	if($('body').hasClass('book-page')){
		// initialize slick
		$('.js-book-gallery').slick({
			infinite:true,
			autoplay:false,
			slidesToShow: 1,
	        slidesToScroll: 1,
	        arrows: false,
	        fade: true,
	        speed: 200
		});
		// click preview image -> show in center
		$(document).on('click', '.js-show-preview', function(e){
			var slideIndex = $(this).attr('data-gallery');
			$('.js-book-gallery').slick('slickGoTo', parseInt(slideIndex));

			$('.js-show-preview').not($(this)).removeClass('active');
			$(this).toggleClass('active');

		});

		$(document).on('click', '.js-toggle-m', function(e){
			$mbox = $('span.measurements');
			$isize = $('.book-details').attr('data-inpr');
			$msize = $('.book-details').attr('data-mmpr');

			if($mbox.hasClass('inch')){
				// console.log('inches');
				$mbox.removeClass('inch').addClass('mms');
				$mbox.html($msize);

			}else{
				// console.log('mms');
				$mbox.removeClass('mms').addClass('inch');
				$mbox.html($isize);
			}
		});
	}


	// RADIO INPUT TRIGGER CLICK
	$(document).on('click', 'input[type=radio]', function(e){
		e.preventDefault();
		$link = $(this).closest('a.option').attr('href');
		window.location = $link;
	});



	// MOBILE LIB-BOOK-PAGE
	$(document).on('click', 'span.login', function(e){

		e.preventDefault();
		
		$(this).toggleClass('hover');
		
		$(this).dblclick(function(){
			window.location = $(this).find('a').attr('href');
		});
		
		
	});


	// MOBILE LIB-BOOK-PAGE
	$(document).on('click', '.js-toggle-info', function(e){

		$(this).toggleClass('active');
		$(this).find('.head').toggleClass('active');
		$('.lib_wrapper').toggleClass('active');
	});


	$(document).on('click', '.js-toggle-events', function(e){

		$(this).toggleClass('active');
		// $(this).parent().find('.events-list').toggleClass('active');
		$(this).next('.events-list').toggleClass('active');
		$(this).find('.mobile-trigger').toggleClass('active');

	});

	$('.js-toggle-events').on('mouseenter mouseleave', function(e) {
	    $(this).find('.mobile-trigger').toggleClass('hover');
	});


	$(document).on('click', '.js-close-studio', function(e){
		
		if(!$('body').hasClass('studio-page')){
			e.preventDefault();	
		}
		
		

		$cont = $('.studio-container');
		
		$('.js-studio .inner').animate({
			'opacity' : 0
		}, opacitySpeed, function(){
			
			$cont.css('top', 'calc(100% + 32px)');
			$cont.removeClass('active');			
			$last = $cont.attr('data-last');
			$('.js-studio-slider').slick('slickPlay');
			window.location.hash = '';

		});
	});

	$(document).on('click', '.js-return-to-map', function(e){
		
		
		if(!$('body').hasClass('studio-page')){
			e.preventDefault();	
			$('.js-close-studio').trigger('click');
			$(this).removeAttr('style');
		}else{
			var href = $('.js-close-studio a').attr('href');
			window.location.href = href;
		}
	});

	// SHOW FILTER FOR BOOKS
	$(document).on('click', '.js-toggle-filter', function(e){
		
		// when opening....
		if(!$(this).hasClass('active')){
			$wh = $(window).height();
			$('.filter-bod').css('max-height', (Math.round($wh * 0.7)));

			filterOption();
		}

		$(this).toggleClass('active');
		$('.books').toggleClass('filter-open');
		$('.filter-icon').toggleClass('active');
	});


	if($('body').hasClass('books-page')){
		//check if FILTER needs to stay open
		if(urlParam('author') || urlParam('title') || urlParam('studio') || urlParam('tag')){

			if(Modernizr.mq('only screen and (min-width: 501px)')){
				$('.js-toggle-filter').trigger('click');
			}

			$('.option').removeClass('active');
			
			if(urlParam('author')){
				$input = urlParam('author');
				
			}else if(urlParam('title')){
				$input = urlParam('title');
				
			}else if(urlParam('studio')){
				$input = urlParam('studio');
				
			}else if(urlParam('tag')){
				$input = urlParam('tag');
				
			}

			if(urlParam('author') || urlParam('title')){
				if(urlParam('author')){
					$('.options-a').find($("input[value="+$input+"]")).parents('.option').addClass('active');
				}else{
					$('.options-t').find($("input[value="+$input+"]")).parents('.option').addClass('active');
				}
			}else{
				$("input[value="+$input+"]").parents('.option').addClass('active');
			}
		}
		
	}

	$(document).on('click', '.js-toggle-menu', function(e){
		$(this).toggleClass('active');
		$('nav').toggleClass('open');

		if($(this).hasClass('active')){
			setTimeout(function(){
		      $('nav').addClass('opened');
		   }, 250);
		}else{
			$('nav').removeClass('opened');
		}

		if(!$('body').hasClass('studios-page')){
			
			// if($('body').hasClass('home-page') || $('body').hasClass('activity-page') || $('body').hasClass('books-page')){
			// 	if($('body').hasClass('activity-page')){

			// 		console.log($('.activity-container').offset().top);
			// 	}
			// }

			$(window).trigger('resize');
		}
	});
	
	$(window).on('scroll touchmove', function() {
		
	});
	

	//used for function studioScroll!!	
	lastScrollTop = 0;


	$(window).bind('resize', function() {

		$('.js-studio-slider').slick('resize');

		if($('body').hasClass('books-page')){
			if($('.filter-function').hasClass('active')){
				$wh = $(window).height();
				$('.filter-bod').css('max-height', (Math.round($wh * 0.7)));
			}
		}


		$wh = $(window).height();

		if($('body').hasClass('home-page')){
			
			$navh = $('header').outerHeight() + parseInt($('header').css('margin-bottom'));
			$wp = parseInt($('.container').css('padding-top')) * 2;
			$th = $wh - $navh - $wp;

			$('.ps-animation').outerHeight($th);
		}

		if(!$('body').hasClass('home-page') || !$('body').hasClass('books-page') || !$('body').hasClass('activity-page')){
			
			$('.container').css('min-height',$wh);

			// setup for studio-container
			$navh = $('header').outerHeight() + parseInt($('header').css('margin-bottom'));
			$wp = parseInt($('.container').css('padding-top'));
			$th = $navh + $wp;

			// $stcont = $('.studio-container');
			$stcont = $('.js-res-cont');
			$stcont.attr('data-offset', $th);

			if($stcont.hasClass('active')){
				
				$offset = parseInt($stcont.attr('data-offset'));
				$stcont.css('top', $offset);

				// MAKE FIELD AVAILABLE TO RETURN TO MAP
				if($('body').hasClass('studios-page') || $('body').hasClass('studio-page')){
					$rtm = $('.js-return-to-map');
					$rtm.css('bottom', 'calc(100% - ' + $offset + 'px)');
				}

			}

		}

		
	});
	$(window).trigger('resize');

});  


function togglePreview(marker){
	var url = marker.url;


}

function toggleStudio(marker){
	$cont = $('.studio-container');

	if($cont.hasClass('active')){

	}else{
		$cont.addClass('active');
		// open container
		$offset = parseInt($cont.attr('data-offset'));
		$cont.css('top', $offset);
	}

	// get URL last part (location name)
	parts = marker.url.split('/'),
    last_part = parts[parts.length-2];
    // console.log(last_part);
    window.location.hash = '#'+last_part;

    var $output = $('.js-studio .inner');
    var url = marker.url;
    // console.log(marker.url);

	$.ajax({
		type: "GET",
		datatype: 'json',
		url: url,
			success: function(data){
			var source   = $("#studio-template").html();
			var template = Handlebars.compile(source);
			var html = template(data);
			$output.html(html)
			$output.css('opacity',0);

			$output.animate({
			'opacity' : 1
			}, opacitySpeed);
			imgHover();
		},
		error: function(data){
			console.log("[error]", data);
		}
	});
	$(window).trigger('resize');
}

function triggerBox(map, ib, ref){

	// Disable map Dragging when cursor enters infoBox div
    $(".infoBox").on("mouseenter", function(){
        map.setOptions( {draggable:false} ); 
    })
    $(".infoBox").on("mouseleave" , function(){
        map.setOptions( {draggable:true} ); 
        ib.close();
    });

    $('.infoBox').on('click', function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	toggleStudio(ref);
    	
    });
}

function imgHover(){

	var preloadImgs = [];

	if($('img.preview').length){

		if(!$('img.preview').hasClass('empty')){
			$('img.preview').each(function() {
		        var img = new Image();
		        
		        	img.src = $(this).data('hover');	
		        	preloadImgs.push(img);
		        
		    });		
		}
		
	}

	$('img.preview').mouseover(function(){
		$(this).attr('src', $(this).data('hover'));
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).attr('src', $(this).data('src'));
		$(this).removeClass('hover');
	});
}


function studioScroll(){
	$('.studio-container .inner').on('scroll touchmove', function() {
		
		if(Modernizr.mq('only screen and (min-width: 501px)')){	

			$sticky = $('.js-sticky');
			$colcon = $('.column.contact');
			$bot = $sticky.offset().top + $sticky.outerHeight();

			$sth = $sticky.height() + parseInt($sticky.css('margin-bottom')) + 20;
			$cch = Math.round($colcon.offset().top + $colcon.height());
			$closer = $('.close-button');
			
			var st = $(this).scrollTop();

			if (st > lastScrollTop){
				// downscroll code
				if(($cch - 15)< $bot){
					$sticky.addClass('fixed');
					$closer.addClass('fixed');
					$closer.css('bottom', $sth + 'px');

				}else{
					//keep track of offset BEFORE fixing
					$sticky.attr('data-offset', $bot);
				}
			} else {
				// upscroll code
				$check = $sticky.attr('data-offset');
				if($cch > $check){
					$sticky.removeClass('fixed');
					$closer.removeClass('fixed');
					$closer.css('bottom', '');
				}
			}
			lastScrollTop = st;
		}
	});
}

function filterOption(){
	// OPTIONS WITHIN FILTER

	$(document).on('click', '.js-reset-options', function(e){
		$('#options-form input[type=radio]').each(function(){
			$(this).prop('checked', false);
		});
		// $('#options-form').submit();
	});

	$(document).on('click', 'label.option input', function(e){
		
		e.stopPropagation();
		// $('#options-form').submit();


		//turn off other buttons (only styling!)
		if($(this).hasClass('active') && $(this).is(':checked')){
			$(this).prop('checked', false);
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
		
	});

	$(document).on('click', 'div.option input', function(e){
		
		e.stopPropagation();
		// $('#options-form').submit();


		//turn off other buttons (only styling!)
		if($(this).hasClass('active') && $(this).is(':checked')){
			$(this).prop('checked', false);
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
		
	});

	// $(document).on('click', '#options-form a', function(e){
		
	// 	e.stopPropagation();
	// 	// $('#options-form').submit();


	// 	//turn off other buttons (only styling!)
	// 	if($(this).hasClass('active') && $(this).is(':checked')){
	// 		$(this).prop('checked', false);
	// 		$(this).removeClass('active');
	// 	}else{
	// 		$(this).addClass('active');
	// 	}
		
	// });
}

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

function MouseWheelHandler(e) {

    // cross-browser wheel delta
    var e = window.event || e;
    var delta = - 20 * (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));

    var pst = $('#lib-books').scrollLeft() + delta;

    if (pst < 0) {
        pst = 0;
    } else if (pst > $('.books').width()) {
        pst = $('.books').width();
    }

    $('#lib-books').scrollLeft(pst);

    return false;
}



function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}





