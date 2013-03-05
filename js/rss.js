define(['jquery', 'utils'], function($, utils) {
    function widget($parent, feeds, amount) {
        var parsedData = [];

        $.each(feeds, function(i, url) {
            parseRSS(url, function(data) {
                parsedData.push(data);

                if(parsedData.length == feeds.length) {
                    var entries = orderRSSEntries(parsedData, amount);

                    constructRSSUI($parent, entries);
                }
            });
        });
    }

    function parseRSS(url, callback) {
        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
            dataType: 'json',
            success: function(data) {
                callback(data.responseData? data.responseData.feed: {
                    author: null,
                    entries: []
                });
            }
        });
    }

    // TODO: might want to decompose postsPerFeed and publishedDate
    // thingy out of this
    function orderRSSEntries(data, amount, postsPerFeed) {
        postsPerFeed = postsPerFeed || 1;

        return utils.orderEntries($.map(data, function(v) {
            var author = v.author;
            var url = v.link;

            return $.map(v.entries.slice(0, postsPerFeed), function(v) {
                v.author = v.author || author;
                v.url = url;
                v.publishedDate = new Date(v.publishedDate);

                return v;
            });
        }), amount);
    }

    function constructRSSUI($parent, entries) {
        var $dl = $('<dl>').appendTo($parent);

        $.each(entries, function(i, k) {
            $('<dt>').append('<span class="date">' + utils.ISODateString(k.publishedDate) + '</span>').
                append('<span class="author"><a href="' + k.url + '">' + k.author + '</a></span>').appendTo($dl);
            $('<dd>').attr('title', utils.htmlDecode(k.contentSnippet)).append('<a href="' + k.link + '"><span class="title">' + k.title + '</span></a>').appendTo($dl);
        });
    }

    return {
        widget: widget
    };
});

