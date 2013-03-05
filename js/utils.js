define(function() {
    return {
        pick: function($e, alts) {
            $e.text(alts[Math.floor(Math.random() * alts.length)]);
        },
        ISODateString: function(d){
            function pad(n){
                return n<10 ? '0'+n : n;
            }
            
            return d.getUTCFullYear()+'-' +
                pad(d.getUTCMonth()+1)+'-'+
                pad(d.getUTCDate());
        },
        orderEntries: function(entries, limit, attr) {
            attr = attr || 'publishedDate';

            entries.sort(function(a, b) {
                return a[attr] < b[attr]? 1: -1;
            });

            return entries.slice(0, limit);
        },
        htmlDecode: function(input){
            var e = document.createElement('div');
            e.innerHTML = input;

            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        },
        attr: function(k, v) {
            // http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
            var target = localStorage;

            if(!target) {
                return null; // no support for localStorage :(
            }

            if(v !== undefined) {
                target.setItem(k, JSON.stringify(v));

                return null;
            }

            try {
                return JSON.parse(target.getItem(k));
            }
            catch(e) {}

            return target.getItem(k);
        },
        cache: function(cacheName, cachedCb, execCb) {
            var scope = this;
            var cache = this.attr(cacheName);
            var exec = true;

            if(cache) {
                var hour = 1000 * 60 * 60;
                var diff = (new Date().getTime() - cache.time) / hour;

                if(diff < 1) {
                    cachedCb(cache.entries);

                    exec = false;
                }
            }

            if(exec) {
                cache = {
                    time: new Date().getTime()
                };

                execCb(cache, finish);
            }

            function finish() {
                scope.attr(cacheName, cache);
            }
        }
    };
});
