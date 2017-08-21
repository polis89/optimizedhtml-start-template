	// Custom JS
	$('.mnu_btn').on('click', function(){
		$('#mnu_mob_top ul').slideToggle();
		$('.mnu_btn').toggleClass('active');
		if(!$('.mnu_btn').hasClass('active')){
			//removes hover after detach
			console.log('unbind');
			$('.mnu_btn').off('mouseenter mouseleave');
			$('.mnu_btn').off('focus');
		}
	});
	$('.mnu_btn2').on('click', function(){
		$('#mnu_mob_bot ul').slideToggle();
		$('.mnu_btn2').toggleClass('active');
	});