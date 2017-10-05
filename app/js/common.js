$(function() {
	// burger();
	// dropdownMenuFixResize();
	// toTopButton();
	// activateSlickCarousel(); 
	// carouselControls();
	// tabsHandler();
	// addWaypoints();
	// addScrollTo();
	// addMaskedInput();
	// addPopupBehavior();
});

function addPopupBehavior(){
	$('.header__btn').on('click', function(){
		$('.popup').addClass('active');
		$('.popup').animate({opacity: 1}, 500);
	});
	$('.popup__overlay, .popup__close').on('click', function(){
		$('.popup').animate({opacity: 0}, 500,
			function(){
				$('.popup').removeClass('active');
		});
	});

function burger(){
	// Бургер с анимацией
	$('.burger').on('click', function(){
		$(this).toggleClass('active');
		$('.nav-cont ul').slideToggle();
	})
}
function dropdownMenuFixResize(){
	$(window).on('resize', function(){
		if($(window).width() > 767){
			$('.nav-cont ul').css('display', 'table-cell');
		} else {
			if(!$('.burger').hasClass('active')){
				$('.nav-cont ul').css('display', 'none');
			} 
		}
	});	
}
function toTopButton(){
	$(".up").click(function() {
	   $('html, body').animate({
	       scrollTop: 0
	   }, 1000);
	});
}
function tabsHandler(){
	$(".tabs__controls-item").click(function() {
		const index = $(this).index();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var tabsContent = $(this).closest('.tabs').find('.tabs__content-item');
		tabsContent.removeClass('active');
		tabsContent.eq(index).addClass('active');
	});
}
function activateSlickCarousel(){
	$('.carousel').slick({
	  dots: false,
	  infinite: true,
	  autoplay: false,
	  speed: 500,
	  slidesToShow: 6,
	  slidesToScroll: 1,
	  arrows: false,
	  responsive: [
	    {
	      breakpoint: 1200,
	      settings: {
	        slidesToShow: 5,
	        slidesToScroll: 1,
	  			infinite: true,
	      }
	    },
	    {
	      breakpoint: 767,
	      settings: {
	        slidesToShow: 4,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 1
	      }
	    },
	    {
	      breakpoint: 420,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});
}
function carouselControls(){
	$('.carousel-cont .left').on('click', function(){
		$('.carousel').slick('slickPrev');
	});
	$('.carousel-cont .right').on('click', function(){
		$('.carousel').slick('slickNext');
	});
}
// require waypoints and animate.css(optional)
function addWaypoints(){
	if($(window).width() > 991){
		var waypoint = new Waypoint({
		  element: document.getElementById('animate-hand'),
		  handler: function() {
		    $('.hand--bottom .hand').addClass('animated fadeInUp');
		  },
		  offset: '100%',
		})
		var waypoint = new Waypoint({
		  element: document.getElementById('animate-line'),
		  handler: function() {
		    $('.choose .h2').addClass('animated zoomIn');
		  }
		})
		var waypoint = new Waypoint({
		  element: document.getElementById('animate-stages'),
		  handler: function() {
		    $('.stages__header').addClass('animated fadeInLeft');
		    setInterval(function(){
		    	$('.stages .stage:nth-child(2)').addClass('animated fadeInUp');
		    }, 800);
		    setInterval(function(){
		    	$('.stages .stage:nth-child(3)').addClass('animated fadeInUp');
		    }, 1200);
		    setInterval(function(){
		    	$('.stages .stage:nth-child(4)').addClass('animated fadeInUp');
		    }, 1600);
		    setInterval(function(){
		    	$('.stages__desc').addClass('animated fadeInRight');
		    }, 2100);
		  }
		})
	}
}
function addScrollTo(){
	$('a[data-scrollTo]').on('click',function(){
		var idToScroll = $(this).attr('data-scrollTo');
    $('html, body').animate({
    	scrollTop: $("#" + idToScroll).offset().top - 65
    }, 1000);
	});
}
function addMaskedInput(){
  // MaskedInput
  $(".data").mask("99/99/9999");
  $(".tel").mask("+ 7 (999) 999-99-99");
  $(".cpf").mask("999.999.999-99");
  $(".cnpj").mask("99.999.999/9999-99");
}
function fixRequiredSafari(){
	$("form").on('submit', function(e) {

    var ref = $(this).find("[required]");

    $(ref).each(function(){
        if ( $(this).val() == '' )
        {
            alert("Введите номер телефона");

            $(this).focus();

            e.preventDefault();
            return false;
        }
    });  return true;
	});
}

function removePlaceholdersOnClick(){
	$('textarea, input[type="text"], input[type="tel"]').on('focus', function(){
		$(this).addClass('hid-placeholder');
	});
	$('textarea, input[type="text"], input[type="tel"]').on('blur', function(){
		$(this).removeClass('hid-placeholder');
	});
}