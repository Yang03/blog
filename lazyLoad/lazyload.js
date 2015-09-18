
window.onload = function() {
    void function (imports, exports) {

        //如果jQuery.expr[':'] 已经注册了in-viewport，就不重复执行
        if (!!imports.jQuery.expr[':']['in-viewport']) return;

        /**
         * viewport
         */
        (function ($) {
            $.belowthefold = function (element, settings) {
                var fold = $(imports).height() + $(imports).scrollTop();
                return fold <= $(element).offset().top - settings.threshold;
            };

            $.abovethetop = function (element, settings) {
                var top = $(imports).scrollTop();
                return top >= $(element).offset().top + $(element).height() - settings.threshold;
            };

            $.rightofscreen = function (element, settings) {
                var fold = $(imports).width() + $(imports).scrollLeft();
                return fold <= $(element).offset().left - settings.threshold;
            };

            $.leftofscreen = function (element, settings) {
                var left = $(imports).scrollLeft();
                return left >= $(element).offset().left + $(element).width() - settings.threshold;
            };

            $.inviewport = function (element, settings) {
                return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
            };

            $.extend($.expr[':'], {
                "below-the-fold": function (a, i, m) {
                    return $.belowthefold(a, {threshold: 0});
                },
                "above-the-top": function (a, i, m) {
                    return $.abovethetop(a, {threshold: 0});
                },
                "left-of-screen": function (a, i, m) {
                    return $.leftofscreen(a, {threshold: 0});
                },
                "right-of-screen": function (a, i, m) {
                    return $.rightofscreen(a, {threshold: 0});
                },
                "in-viewport": function (a, i, m) {
                    return $.inviewport(a, {threshold: 0});
                }
            });
        })(jQuery);

    }(window, window);


    /**
     * 图片实现lazyload
     */
    void function(imports, exports){
        var throttle, imgs, loadImages
            , win, hasBindLazyloadEvent;

        win = $(imports);

        /**
         * hasBindLazyloadEvent
         * window是否已经bind了scroll.lazyload
         */
        hasBindLazyloadEvent = (function() {
            var events, flag;
            events = $._data(win[0], 'events');
            flag = false;

            !!events && !!events.scroll && (function() {
                $.each(events.scroll, function(i, item) {
                    return !(item.namespace === 'lazyload' && (flag = true));
                });
            })();

            return flag;
        })();

        // 这里做个判断，如果bind了scroll.lazyload 则不重复bind了
        if (hasBindLazyloadEvent) return;

        imgs = $('.media:has(noscript.img)');
        // 没有需要lazyload的元素，也return掉
        if (imgs.length === 0) return;

        /**
         * 从underscore中抽取的throttle函数
         * 用于函数节流
         */
        throttle = (function() {
            //如果已经引用了underscore.js，则使用underscore.js 中的throttle方法
            if (imports._ && imports._.throttle) {
                return imports._.throttle;
            } else {
                return function(func, wait, options) {
                    var context, args, result;
                    var timeout = null;
                    var previous = 0;
                    if (!options) options = {};
                    var later = function() {
                        previous = options.leading === false ? 0 : new Date().getTime();
                        timeout = null;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    };
                    return function() {
                        var now = new Date().getTime();
                        if (!previous && options.leading === false) previous = now;
                        var remaining = wait - (now - previous);
                        context = this;
                        args = arguments;
                        if (remaining <= 0 || remaining > wait) {
                            if (timeout) {
                                clearTimeout(timeout);
                                timeout = null;
                            }
                            previous = now;
                            result = func.apply(context, args);
                            if (!timeout) context = args = null;
                        } else if (!timeout && options.trailing !== false) {
                            timeout = setTimeout(later, remaining);
                        }
                        return result;
                    };
                };
            }
        })();

        /**
         * 图片依赖加载的实现
         */
        loadImages = function() {
            var showImgs = imgs.filter(':in-viewport');
            showImgs.html(function(){
                var noscript = $(this).find('noscript');
               return '<img src="' + noscript.attr('src') + '" alt="' + noscript.attr('alt') + '">'
                //noscript.replaceWith(noscript.text() ||
                //'<img src="' + noscript.attr('src') + '" alt="' + noscript.attr('alt') + '">');
            });
            imgs = imgs.not(showImgs);
        };

        // 先手动触发一下，让当前视口的图片显示出来
        loadImages();

        win.on('scroll.lazyload', throttle(function() {
            loadImages();
        }, 150));

    }(window, window);

}