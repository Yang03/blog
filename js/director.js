/*
* inspired
*https://github.com/visionmedia/page.js
* */
~ function(w) {
    var reference = "director",
        oldReference = w[reference],
        decode = window.decodeURIComponent;

    var director = function(path, fn) {
        if(typeof fn == 'function') {
            director.on.apply(director, arguments);
        }else {
            throw new Error('argument[1] type must function');
        }
    }

    director.running = false;
    director.next = null;
    director.context = null;
    director.contexts = [];
    director.handlers = [];

    function normalize(path) {

        path = path.replace(/^#!?/, '').replace(/#.*/, '');
        path = (path.length > 0 && path[0] !== '/') ? '/' + path : path;
        return path;
    }

    function parseSearch(search) {
        var query = search.indexOf('?') === 0 ? search.slice(1) : search,
            pairs = query.length > 0 ? query.split('&') : [],
            params = {};
            for (var j = 0, len = pairs.length; j < len; j++){
                var pair = pairs[j].replace(/\+/g, '%20');
                var i = pair.indexOf('='),
                    key = ~i ? pair.slice(0, i) : pair,
                    value = ~i ? pair.slice(i + 1) : '';
                try {
                    key = decode(key);
                    value = decode(value);
                } catch (e) {}

                params[key] = value;
            }
        return params;
    }


    function Context(path) {
        var hashStr = (location.hash.length === 0) || /^#!/.test(location.hash);
        this.path = normalize(path);
        path = this.path;
        this.target = path ? '#' + (hashStr ? '!' : '') + path : path;

        var i = path.indexOf('?');
        this.pathname = ~i ? path.slice(0, i) : path;
        this.search = ~i ? path.slice(i) : '';
        this.queries = parseSearch(this.search);
        this.params = {};
        this.dispatch = true;
    }


    function onhashchange() {
        var ctx = director.contexts.pop(); //the first

        if (!ctx) {
            ctx = new Context(location.hash);
        }
        director.context = ctx;

        if (ctx.dispatch === false) {
            return;
        }
        director.dispatch(ctx);
    }

    director.run = function () {
        if (this.running) {
            return;
        }
        this.running = true;
        if ('addEventListener' in window) {
            window.addEventListener('hashchange', onhashchange, false);
        } else {
            window.attachEvent('onhashchange', 'onhashchange', false);
        }
        onhashchange();
    };

    director.stop = function() {
        if ('addEventListener' in window) {
            window.removeEventListener('hashchange', onhashchange, false);
        } else {
            window.detachEvent('onhashchange', 'onhashchange', false);
        }
        this.running = false;
    }

    /*
    * pattern  arguments[0]===> path
    * */
    director.on = function(pattern) {
        var handlers = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, len = handlers.length; i < len; i++) {
            this.handlers.push(this.middleware(pattern, handlers[i]))
        }
    }

    /*
    * return function
    * */
    director.middleware = function(pattern, handler) {
        var self = this;
        function middleware(ctx, next) {
            if(self.match(pattern, ctx.pathname, ctx.params)) {
                // 这里只能把next往下传了，不能保证同步
                handler(ctx, next);
            } else {
                next();
            }
        }
        return middleware;
    }

    director.match = function (pattern, pathname, params) {
        var keys = [];
        //取出参数
        pattern = pattern.replace(/:(\w+)/g, function (value, key) {
            keys.push(key);
            return '([^\/]+)';
        }).replace(/\*/g, '(.*)') || '';
        pattern = '^' + pattern + '$';

        var match = pathname.match(new RegExp(pattern));
        if (!match) {
            return false;
        }
        //此处 修改了对象，通过修改对象传值
        for (var i = 0, len = keys.length; i < len; i++) {
            params[keys[i]] = match[i + 1];
        }
        return true;
    };

    director.dispatch = function(ctx) {
        var handlers = this.handlers;
        function next() {
            var handler = handlers[next.index++];
            if (handler) {
                handler(ctx, next);
            }
        }
        if (this.next) {
            this.next.index = handlers.length;
        }
        this.next = next;
        next.index = 0;
        next();
    }

    director.redirectTo = function(url) {
        window.location.hash = url;
    }

    /*
    * keep director
    * */
    director.noConflict = function() {
        w[reference] = oldReference;
        return director;
    };
    w[reference] = director;

}(window)


