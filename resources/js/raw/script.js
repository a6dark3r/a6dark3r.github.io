var fadeInElements;

function initializeHiding() {
	fadeInElements = [
		$('section.whoami'), $('section.whathedoes'), $('section.projects'), $('section.competitions *') // , $('section.moretocome-background')
	];

	for (var key in fadeInElements) {
		fadeInElements[key].addClass('noOpacity');
	} 
}

function navbarController() {
	if ($(window).scrollTop() == $('section.awesome-background').offset().top) {
		$('nav.navbar').removeClass('out');
		$('nav.navbar').addClass('top');
	}

	else {
		$('nav.navbar').removeClass('top');

		if ($(window).scrollTop() > $('section.awesome-background').offset().top) {
			$('nav.navbar').addClass('out');
		}

		if ($(window).scrollTop() < $('section.awesome-background').offset().top) {
			$('nav.navbar').removeClass('out');
		}
	}
}

$(document).ready(function() {
	if (new Date().getFullYear() != 2015) {
		$('section.endofpage p span.year').text('2015 - ' + new Date().getFullYear());
	}

	$('a.moreaboutme-toggle').click(function() {
		$(this).addClass('hidden');
		$('br.extra-breaking').addClass('hidden');
		$('section.moreaboutme').css('display', 'block');
		$('section.moreaboutme').animate({
			opacity: 1
		}, 300);
	});

	initializeHiding();

	$(window).scroll(function() {
		for (var i = 0; i < fadeInElements.length; i++) {
			if ($(window).scrollTop() > fadeInElements[i].offset().top-(window.innerHeight/1.5) && fadeInElements[i].hasClass('noOpacity')) {
				fadeInElements[i].animate({
					opacity: 1,
				}, 400, function() {
					fadeInElements[i].removeClass('noOpacity');
					fadeInElements.splice($.inArray(fadeInElements, fadeInElements[i]), 1);
				});
			}

			navbarController();
		}
	});

	navbarController();

	$('body').on('click', 'nav.navbar a', function(event) {
		if ($(this).data('href') === undefined) return true;

		event.preventDefault();
		
		$('body').animate({
			'scrollTop': $($(this).data('href')).offset().top-($('nav.navbar').height()*2)
		}, 300);
	});

	$('a.scrollTop').click(function() {
		$('body').animate({
			'scrollTop': 0
		}, 550, function() { initializeHiding(); });
	});
});