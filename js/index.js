require.config({
    paths: {
        foundation: 'foundation/foundation',
        scrollto: 'jquery.scrollto.min',
        localscroll: 'jquery.localscroll.min',
        modernizr: 'vendor/custom.modernizr'
    },
    shim: {
        scrollto: ['jquery'],
        localscroll: ['scrollto']
    }
});

require(['jquery', 'foundation', 'scrollto', 'localscroll', 'modernizr'], function($) {
    $(document).foundation();

    $(function() {
        var delay = 200;

        initializePatternToggle($('.togglePatterns'));
        initializeTOC($('.toc'), 500);

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

    function initializeTOC($parent, delay) {
        var $headers = $(':header').map(function() {
            var $e = $(this);
            var depth = parseInt($e.prop('tagName').slice(1), 10);

            if(depth == 1) return;

            var text = $e.text();
            var id = idfy(text);
            var $a = $('<a>', {'class': 'anchor', href: '#' + id}).html('&para;').appendTo($e);

            initializeAnimation($a);

            $e.attr('name', id);

            return {
                text: text,
                id: id,
                depth: parseInt($e.prop('tagName').slice(1), 10)
            };
        });
        var prevDepth = $headers[0].depth;
        var $parents = [$parent];
        var $prev;

        $headers.each(function(i, v) {
            if(v.depth > prevDepth) $parents.push($ul().appendTo($prev));
            else if(v.depth < prevDepth) $parents.pop();

            $prev = $li(v.text, v.id).appendTo(last($parents));

            prevDepth = v.depth;
        });

        initializeAnimation($parent);

        function initializeAnimation($e) {
            if(Modernizr.touch) return;

            var maxVal = 1.0;
            var minVal = 0.4;

            $e.css('opacity', minVal);

            $e.on('mouseenter', fadeIn.bind(undefined, $e, maxVal)).
                on('mouseleave', fadeOut.bind(undefined, $e, minVal));
        }

        function fadeIn($e, val) {
            $e.stop(true).delay(delay).animate({opacity: val});
        }

        function fadeOut($e, val) {
            $e.stop(true).delay(delay).animate({opacity: val});
        }

        function $ul() {
            return $('<ul>');
        }

        function $li(val, id) {
            var $e = $('<li>');
            $('<a>', {href: '#' + id}).text(val).appendTo($e);

            return $e;
        }

        function idfy(val) {
            return val.toLowerCase().replace(/[ \-]/g, '_');
        }

        function last(arr) {
            return arr[arr.length - 1];
        }
    }
});
