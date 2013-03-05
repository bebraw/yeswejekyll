require(['jquery', './foundation/foundation', './foundation/foundation.magellan'], function($) {
    $(document).foundation();

    $(function() {
        initializeTOC($('.toc'));
    });

    function initializeTOC($parent) {
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

        function $ul() {
            return $('<ul>');
        }

        function $li(val, id) {
            var $e = $('<li>').attr('data-magellan-arrival', id);
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
