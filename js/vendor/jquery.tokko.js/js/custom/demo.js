$(function() {
    $('.toc').tokko();

    // this is totally optional. looks way better animated, though
    $('.toc, :header').localScroll({duration: 500, hash: true});
});
