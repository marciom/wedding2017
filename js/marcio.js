$(document).ready(function(){
	var $hamburger = $('.hamburger'),
		$buttonLabel = $('.buttonLabel'),
		$buttonWrapper = $('.buttonWrapper'),
		$menu = $('.menu'),
		$rsvp = $('.rsvp'),
		$mainNav = $('.mainNav li'),
		$mainNavChildren = $mainNav.children('a');

		$hamburger.on('click', function(e){
		$hamburger.toggleClass('is-active');
		$buttonLabel.toggleClass('buttonLabelClose');

		if ($hamburger.hasClass('is-active')){
			$menu.addClass('menu-is-open');

			// Stagger animation for menu
			$mainNavChildren.each(function(i){
				$(this).stop(true, true).delay((i + 1) * 125).fadeIn('slow', 'swing');
			});

			/*
				Hides menu on link click but I'm still working out 
				on how to hide the menu after RSVP click
			*/
			$mainNavChildren.on('click', function(e){
				e.preventDefault();

				var hash = $(this.hash);

				$('html, body').animate({
					scrollTop: hash.offset().top - 25
				}, 450, function(){
					closeMenu();
					$hamburger.removeClass('is-active');
					$buttonLabel.removeClass('buttonLabelClose');
				});
			});

			$rsvp.fadeOut();
		} else{
			closeMenu();
		};

	});

	function closeMenu() {
		$menu.removeClass('menu-is-open');
		$mainNavChildren.stop(true, true).fadeOut();
		$rsvp.fadeIn();

	};

	//Controller for menu colour switch on scroll

	var waypoint = new Waypoint({
		element: $('#intro'),
		handler: function(direction){
			if (direction === "down"){
				$buttonWrapper.addClass('buttonWrapperBlack');
			} else{
				$buttonWrapper.removeClass('buttonWrapperBlack');
			}
		},
		offset: 75
	});

	//Deals with FAQ accordion
	$('.accordion').accordion({
	    "transitionSpeed": 400
	});
});

$(window).on('load', function(){
	$('.loader').hide().delay(2, function(){
		homeAnimation();
	})
});

var $ampersand = $('.ampersand'),
	$menuItems = $('.hamburger, .rsvp')
	$mouseScroll = $('.icon-scroll');


var tl = new TimelineMax();
tl.set($ampersand, {fill:"none", stroke: "#50E3C2", opacity: "1"}).set('.us', {autoAlpha:0}).set($menuItems, {autoAlpha:0}).set($mouseScroll, {autoAlpha:0});

function homeAnimation(){
	tl.to('.us', 2, {autoAlpha:1})
	.from('.marcio', 1, {opacity:0}, "+=0.7")
	.from($ampersand, 3, {drawSVG:0})
	.to($ampersand, 0.2, { fill: "#50E3C2", strokeWidth:0}, "-=1")
	.to($ampersand, 0.1, {opacity:"0.44"}, "-=1")
	.from('.michelle', 1, {opacity:0})
	.to($mouseScroll, 0.2, {autoAlpha:1})
	.to($menuItems, 0.2, {autoAlpha:1}, "+=0.2");
}





