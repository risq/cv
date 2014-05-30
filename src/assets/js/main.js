;(function(){
    NProgress.start();
    var imgLoad = imagesLoaded( 'img' );
    imgLoad.on( 'always', function( instance ) {
        NProgress.done();
    });
    imgLoad.on( 'progress', function( instance, image ) {
        NProgress.inc(0.2);
    });

    $('.navbar').headroom({
        "tolerance": 20,
        "offset": 450
    });

    if($('#main-portfolio')) {
        console.log('doscroll');
        new AnimOnScroll( document.getElementById( 'main-portfolio-list' ), {
            minDuration : 0.2,
            maxDuration : 0.5,
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

    $("#email").append('<a href="mailto:' + 'valentin.ledrapier' + '@' + 'gmail.com' + '">valentin.ledrapier' + '@' + 'gmail.com' + '</a>');

})(jQuery)
