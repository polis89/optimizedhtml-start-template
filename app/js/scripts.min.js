$(function() {
	// customSelect();
	// addScrollTo();
	// popups();
	// toTopButton();
	// addWaypoints();
	// addMaskedInput();
	// activateSlickCarousel();
});

function popups() {
	$('.open-popup-link').magnificPopup({
		type: 'inline',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"><img class="mfp-close" src="./img/close.png" alt="alt"></button>',
		fixedContentPos: false, // Always set it to false
		midClick: true // Always set it to true
	});
	$('.mfp-close').on('click', function () {
		console.log('test');
		
		$.magnificPopup.close();
	})
	// var page = window.location.href.split('/').pop();
	// if (page == 'thanks.html') {
	// 	$.magnificPopup.open({
	// 		items: {
	// 			src: '#thanks'
	// 		},
	// 		fixedContentPos: false, // Always set it to false
	// 		midClick: true, // Always set it to true
	// 		type: 'inline'
	// 	});
	// } else if (page == 'thanks.html?call') {
	// 	$.magnificPopup.open({
	// 		items: {
	// 			src: '#thankscall'
	// 		},
	// 		fixedContentPos: false, // Always set it to false
	// 		midClick: true, // Always set it to true
	// 		type: 'inline'
	// 	});
	// }
}

function customSelect() {
	var x, i, j, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected init");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
				var y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						$(this).parents('.custom-select').find('.select-selected').removeClass("init");
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
		except the current select box:*/
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i);
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	/*if the user clicks anywhere outside the select box,
	then close all select boxes:*/
	document.addEventListener("click", closeAllSelect); 
}

function descriptionOpen() {
	$('.desc-open-btn').on('click', function () {
		$('.hidden-desc').slideToggle();
		$('.desc-open-btn').slideToggle();
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
		if ($("#" + idToScroll).length > 0){
			$('html, body').animate({
				scrollTop: $("#" + idToScroll).offset().top - 65
			}, 1000);
		}
	});
}
function addMaskedInput(){
  // MaskedInput
  $(".data").mask("99/99/9999");
  $(".tel").mask("+ 7 (999) 999-99-99");
  $(".cpf").mask("999.999.999-99");
  $(".cnpj").mask("99.999.999/9999-99");
}