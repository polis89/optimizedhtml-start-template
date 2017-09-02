$(function() {

	// Custom JS



	// // Бургер с анимацией
	// $('.burger').on('click', function(){
	// 	$(this).toggleClass('active');
	// })

	// // По клику на бургер открывать меню
	// $('.burger').on('click', function(){
	// 	$('.nav-cont ul').slideToggle();
	// });

	// //Фикс выпадающего мен. при ресайзе
	// $(window).on('resize', function(){
	// 	if($(window).width() > 767){
	// 		$('.nav-cont ul').css('display', 'table-cell');
	// 	} else {
	// 		if(!$('.burger').hasClass('active')){
	// 			$('.nav-cont ul').css('display', 'none');
	// 		} 
	// 	}
	// });

	//On top button
	// $(".up").click(function() {
 //    $('html, body').animate({
 //        scrollTop: 0
 //    }, 1000);
	// });

});
$(function() {

	// Custom JS

	$('.comment .text').each(function(){
		if($(this).text().length > 101){
			$(this).text($(this).text().substring(0,102) + "...");
		}
	});

	// // Бургер с анимацией
	$('.burger').on('click', function(){
		$(this).toggleClass('active');
	});

	// По клику на бургер открывать меню
	$('.burger').on('click', function(){
		$('.menu-hid').slideToggle();
		$('.menu-hid').css('padding-left', $(this).offset().left + 'px');
		$('.black-cover').toggleClass('hidden');
		$('body').toggleClass('no-scroll');
		// $('.menu-hid').height( $(window).height() + 'px');
		// $('section').toggleClass('no-scroll');
		// $('footer').toggleClass('no-scroll');
	});

	$('.s-themes .column .h3').on('click', function(){
		if($(window).width() < 992){
			$(this).parent().find('.links').slideToggle();
			$(this).find('.fa-angle-down').toggleClass('hidden');
			$(this).find('.fa-angle-up').toggleClass('hidden')();
		}
	});
	$('.site-footer header').on('click', function(){
		if($(window).width() < 768){
			$(this).parent().find('.links').slideToggle();
			$(this).find('.fa-angle-down').toggleClass('hidden');
			$(this).find('.fa-angle-up').toggleClass('hidden')();
		}
	});
	$('.article header').on('click', function(){
		// if($(window).width() < 768){
			$(this).parent().find('.links').slideToggle();
			$(this).find('.fa-angle-down').toggleClass('hidden');
			$(this).find('.fa-angle-up').toggleClass('hidden')();
		// }
	});

	// //Фикс выпадающего мен. при ресайзе
	$(window).on('resize', function(){
		if($(window).width() > 991){
			$('.links').slideDown();
			$('.black-cover').addClass('hidden');
			$('.menu-hid').slideUp();
			$('.burger').removeClass('active');
			$('body').removeClass('no-scroll');
		}  else{
			$('.s-themes .column .links').slideUp();

		}
	});


	//On top button
	$(".up").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
	});

	$(".comm-cont").hover(function(){
			$(this).children(".bottom").addClass('show');
	},function(){
			$(this).children(".bottom").removeClass('show');
	});

	$('.info-block .close-btn').on('click', function(){
		$(this).parent().slideUp();
	});

	$('.in-block .as-select .current').on('click', function(){
		$(this).parent().find('.variants').slideToggle();
		$(this).parent().toggleClass('open');
	});

	$('.category .as-select .var').on('click', function(){
		$(this).parents('.as-select').find('.current').html($(this).html());
		$(this).parent().children().removeClass('active');
		$(this).addClass('active');
		$(this).parents('.as-select').find('.variants').slideUp();
		$(this).parents('.as-select').removeClass('open');
	});

	//Set data-id to vars in region select
	$('.region .as-select .var').each(function(){
		$(this).attr('data-id', $(this).text());

	});

	$('.region .as-select .var').on('click', function(){
		var asSelect = $(this).parents('.as-select');
		asSelect.find('.variants').slideUp();
		asSelect.find('.current').find('.text').html('');
		asSelect.find('.current-res').append('<span class="reg" data-id="' + $(this).text() + '">' + $(this).text() + ' <i class="fa fa-close"></i></span>');
		
		// //Runtime adding a handler to span.reg
		asSelect.find('.reg[data-id="' + $(this).text() + '"]').on('click', regClickHandler);
		$(this).addClass('active');

		$(this).parents('.as-select').removeClass('open');


	});

	var maxDescLength = 150;
	$('.desc-short .info .count').text(maxDescLength);
	$('#desc_short').bind('input propertychange', function() {
		var remain = maxDescLength - this.value.length;
		if(remain < 0){
			$('.desc-short .info').addClass('irre');
			$('.desc-short .info .count').text('');
			$('.desc-short .info .text').text('Вы превысили количество рекомендованных символов');
		}else{
			$('.desc-short .info').removeClass('irre');
			$('.desc-short .info .count').text(remain);
			$('.desc-short .info .text').text(' символов осталось до рекомендованного количества');
		}
	});	
});	

function regClickHandler(event){
	var data_id = $(this).attr('data-id');
	var asSelect = $(this).parents('.as-select');
	$('.as-select .var[data-id="' + data_id + '"]').removeClass('active');
	$(this).remove();
	if(asSelect.find('.current-res').children().length == 0){
		asSelect.find('.current').find('.text').html('Выберите регион');
	}
};;;;;