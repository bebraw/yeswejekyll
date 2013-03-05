require.config({
    paths: {
        foundation: 'foundation/foundation',
        magellan: 'foundation/foundation.magellan',
        scrollto: 'jquery.scrollto.min',
        localscroll: 'jquery.localscroll.min'
    },
    shim: {
        scrollto: ['jquery'],
        localscroll: ['scrollto']
    }
});

require(['jquery', 'foundation', 'scrollto', 'localscroll'], function($) {
    $(document).foundation();

    $(function() {
        var $toc = $('.toc');
        var delay = 200;

        initializeTOC($toc, 500);

        $($toc).localScroll({duration: delay});
    });

    function initializeTOC($parent, delay) {
        var $headers = $(':header').map(function() {
            var $e = $(this);
            var text = $e.text();
            var id = idfy(text);

            $e.attr('id', id);

            return {
                text: $e.text(),
                id: id,
                depth: parseInt($e.prop('tagName').slice(1), 10)
            };
        }).slice(1);
        var prevDepth = $headers[0].depth;
        var $parents = [$parent];
        var $prev;

        $headers.each(function(i, v) {
            if(v.depth > prevDepth) $parents.push($ul().appendTo($prev));
            else if(v.depth < prevDepth) $parents.pop();

            $prev = $li(v.text, v.id).appendTo(last($parents));

            prevDepth = v.depth;
        });

        initializeAnimation();

        function initializeAnimation() {
            fadeOut();

            $parent.on('mouseenter', fadeIn).on('mouseleave', fadeOut);
        }

        function fadeIn() {
            $parent.stop(true).delay(delay).animate({opacity: 1.0});
        }

        function fadeOut() {
            $parent.stop(true).delay(delay).animate({opacity: 0.4});
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
            return val.split(' ').join('');
        }

        function last(arr) {
            return arr[arr.length - 1];
        }
    }

    // TODO: modernizr
    // TODO: zepto (load conditionally)
    // TODO: construct TOC
    // TODO: smooth transitions

    // TODO: twitter + rss
});
