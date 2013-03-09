require.config({
    paths: {
        foundation: 'foundation/foundation',
        jquery: 'vendor/jquery/jquery',
        scrollto: 'vendor/jquery.scrollTo/jquery.scrollTo.min',
        localscroll: 'vendor/jquery.localScroll/jquery.localScroll.min',
        modernizr: 'vendor/modernizr/modernizr',
        tokko: 'vendor/jquery.tokko.js/dist/jquery.tokko.min'
    },
    shim: {
        foundation: ['jquery'],
        tokko: ['jquery'],
        scrollto: ['jquery'],
        localscroll: ['scrollto']
    }
});

require(['jquery', 'foundation', 'scrollto', 'localscroll', 'tokko', 'modernizr'], function($) {
    $(document).foundation();

    $(function() {
        var delay = 200;

        initializePatternToggle($('.togglePatterns'));
        $('.toc').tokko();

        $('.toc, :header').localScroll({duration: delay, hash: true});
    });

    function initializePatternToggle($e) {
        var texEnabled = true;
        var bgImages = $('*').map(function() {
            var $e = $(this);

            return {
                $e: $e,
                bg: $e.css('background-image')
            };
        });

        $e.on('click', function(e) {
            e.preventDefault();

            texEnabled = !texEnabled;

            if(texEnabled) {
                bgImages.each(function(i, v) {
                    v.$e.css('background-image', v.bg);
                });
            }
            else {
                bgImages.each(function(i, v) {
                    v.$e.css('background-image', 'none');
                });
            }
        });
    }
});
