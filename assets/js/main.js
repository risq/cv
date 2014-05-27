;(function(){

    // Menu settings
    $('#menuToggle, .menu-close').on('click', function(){
        $('#menuToggle').toggleClass('active');
        $('body').toggleClass('body-push-toleft');
        $('#theMenu').toggleClass('menu-open');
    });

    if($('#main-portfolio')) {
        console.log('doscroll');
        new AnimOnScroll( document.getElementById( 'main-portfolio-list' ), {
            minDuration : 0.4,
            maxDuration : 0.7,
            viewportFactor : 0.2
        });
    }


})(jQuery)
