;(function(){

    $('.navbar').headroom({
        "tolerance": 20,
        "offset": 450
    });

    if($('#main-portfolio')) {
        console.log('doscroll');
        new AnimOnScroll( document.getElementById( 'main-portfolio-list' ), {
            minDuration : 0.4,
            maxDuration : 0.7,
            viewportFactor : 0.2
        });
    }

    $('body').scrollspy({ target: '.categories' });

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top + 30)
                }, 500);
                return false;
            }
        }
    });

})(jQuery)
