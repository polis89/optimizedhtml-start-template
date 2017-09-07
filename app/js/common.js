$(function() {
	// burger();
	// dropdownMenuFixResize();
	// toTopButton();
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