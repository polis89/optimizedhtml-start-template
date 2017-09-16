$(function() {
	// burger();
	// dropdownMenuFixResize();
	// toTopButton();
	// tabsHandler();
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