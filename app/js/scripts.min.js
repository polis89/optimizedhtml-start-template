$(function() {
	burger();
	// dropdownMenuFixResize();
	// toTopButton();
	// activateSlickCarousel(); 
	// addWaypoints();
	// addScrollTo();
	// addMaskedInput();
});

function burger(){
	// Бургер с анимацией
	$('.burger').on('click', function(){
		$(this).toggleClass('active');
		$('.header__menu').slideToggle();
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
	$('a[data-scroll-to]').on('click',function(){
		var idToScroll = $(this).attr('data-scroll-to');
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