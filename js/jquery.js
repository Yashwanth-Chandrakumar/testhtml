(function(a) {
    a.fn.bgIframe = a.fn.bgiframe = function(c) {
        if (a.browser.msie && /6.0/.test(navigator.userAgent)) {
            c = a.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, c || {});
            var d = function(e) {
                return e && e.constructor == Number ? e + "px" : e
            }
              , b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + c.src + '"style="display:block;position:absolute;z-index:-1;' + (c.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (c.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : d(c.top)) + ";left:" + (c.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : d(c.left)) + ";width:" + (c.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : d(c.width)) + ";height:" + (c.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : d(c.height)) + ';"/>';
            return this.each(function() {
                if (a("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(b), this.firstChild)
                }
            })
        }
        return this
    }
}
)(jQuery);
(function(a) {
    a.prompt = function(p, q) {
        q = a.extend({}, a.prompt.defaults, q);
        a.prompt.currentPrefix = q.prefix;
        var e = (a.browser.msie && a.browser.version < 7);
        var g = a(document.body);
        var c = a(window);
        var b = '<div class="' + q.prefix + 'box" id="' + q.prefix + 'box">';
        if (q.useiframe && ((a("object, applet").length > 0) || e)) {
            b += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="' + q.prefix + 'fade" id="' + q.prefix + 'fade"></iframe>'
        } else {
            if (e) {
                a("select").css("visibility", "hidden")
            }
            b += '<div class="' + q.prefix + 'fade" id="' + q.prefix + 'fade"></div>'
        }
        b += '<div class="' + q.prefix + '" id="' + q.prefix + '"><div class="' + q.prefix + 'container"><div class="';
        b += q.prefix + 'close">X</div><div id="' + q.prefix + 'states"></div>';
        b += "</div></div></div>";
        var o = a(b).appendTo(g);
        var l = o.children("#" + q.prefix);
        var m = o.children("#" + q.prefix + "fade");
        if (p.constructor == String) {
            p = {
                state0: {
                    html: p,
                    buttons: q.buttons,
                    focus: q.focus,
                    submit: q.submit
                }
            }
        }
        var n = "";
        a.each(p, function(s, r) {
            r = a.extend({}, a.prompt.defaults.state, r);
            p[s] = r;
            n += '<div id="' + q.prefix + "_state_" + s + '" class="' + q.prefix + '_state" style="display:none;"><div class="' + q.prefix + 'message">' + r.html + '</div><div class="' + q.prefix + 'buttons">';
            a.each(r.buttons, function(u, t) {
                n += '<button name="' + q.prefix + "_" + s + "_button" + u + '" id="' + q.prefix + "_" + s + "_button" + u + '" value="' + t + '">' + u + "</button>"
            });
            n += "</div></div>"
        });
        l.find("#" + q.prefix + "states").html(n).children("." + q.prefix + "_state:first").css("display", "block");
        l.find("." + q.prefix + "buttons:empty").css("display", "none");
        a.each(p, function(t, s) {
            var r = l.find("#" + q.prefix + "_state_" + t);
            r.children("." + q.prefix + "buttons").children("button").click(function() {
                var w = r.children("." + q.prefix + "message");
                var u = s.buttons[a(this).text()];
                var x = {};
                a.each(l.find("#" + q.prefix + "states :input").serializeArray(), function(y, z) {
                    if (x[z.name] === undefined) {
                        x[z.name] = z.value
                    } else {
                        if (typeof x[z.name] == Array || typeof x[z.name] == "object") {
                            x[z.name].push(z.value)
                        } else {
                            x[z.name] = [x[z.name], z.value]
                        }
                    }
                });
                var v = s.submit(u, w, x);
                if (v === undefined || v) {
                    d(true, u, w, x)
                }
            });
            r.find("." + q.prefix + "buttons button:eq(" + s.focus + ")").addClass(q.prefix + "defaultbutton")
        });
        var f = function() {
            o.css({
                top: c.scrollTop()
            })
        };
        var j = function() {
            if (q.persistent) {
                var s = 0;
                o.addClass(q.prefix + "warning");
                var r = setInterval(function() {
                    o.toggleClass(q.prefix + "warning");
                    if (s++ > 1) {
                        clearInterval(r);
                        o.removeClass(q.prefix + "warning")
                    }
                }, 100)
            } else {
                d()
            }
        };
        var h = function(u) {
            var t = (window.event) ? event.keyCode : u.keyCode;
            if (t == 27) {
                j()
            }
            if (t == 9) {
                var v = a(":input:enabled:visible", o);
                var s = !u.shiftKey && u.target == v[v.length - 1];
                var r = u.shiftKey && u.target == v[0];
                if (s || r) {
                    setTimeout(function() {
                        if (!v) {
                            return
                        }
                        var w = v[r === true ? v.length - 1 : 0];
                        if (w) {
                            w.focus()
                        }
                    }, 10);
                    return false
                }
            }
        };
        var i = function() {
            o.css({
                position: (e) ? "absolute" : "fixed",
                height: c.height(),
                width: "100%",
                top: (e) ? c.scrollTop() : 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            m.css({
                position: "absolute",
                height: c.height(),
                width: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            l.css({
                position: "absolute",
                top: q.top,
                left: "50%",
                marginLeft: ((l.outerWidth() / 2) * -1)
            })
        };
        var k = function() {
            m.css({
                zIndex: q.zIndex,
                display: "none",
                opacity: q.opacity
            });
            l.css({
                zIndex: q.zIndex + 1,
                display: "none"
            });
            o.css({
                zIndex: q.zIndex
            })
        };
        var d = function(t, s, u, r) {
            l.remove();
            if (e) {
                g.unbind("scroll", f)
            }
            c.unbind("resize", i);
            m.fadeOut(q.overlayspeed, function() {
                m.unbind("click", j);
                m.remove();
                if (t) {
                    q.callback(s, u, r)
                }
                o.unbind("keypress", h);
                o.remove();
                if (e && !q.useiframe) {
                    a("select").css("visibility", "visible")
                }
            })
        };
        i();
        k();
        if (e) {
            c.scroll(f)
        }
        m.click(j);
        c.resize(i);
        o.bind("keydown keypress", h);
        l.find("." + q.prefix + "close").click(d);
        m.fadeIn(q.overlayspeed);
        l[q.show](q.promptspeed, q.loaded);
        l.find("#" + q.prefix + "states ." + q.prefix + "_state:first ." + q.prefix + "defaultbutton").focus();
        if (q.timeout > 0) {
            setTimeout(a.prompt.close, q.timeout)
        }
        return o
    }
    ;
    a.prompt.defaults = {
        prefix: "jqi",
        buttons: {
            Ok: true
        },
        loaded: function() {},
        submit: function() {
            return true
        },
        callback: function() {},
        opacity: 0.6,
        zIndex: 999,
        overlayspeed: "slow",
        promptspeed: "fast",
        show: "fadeIn",
        focus: 0,
        useiframe: false,
        top: "15%",
        persistent: true,
        timeout: 0,
        state: {
            html: "",
            buttons: {
                Ok: true
            },
            focus: 0,
            submit: function() {
                return true
            }
        }
    };
    a.prompt.currentPrefix = a.prompt.defaults.prefix;
    a.prompt.setDefaults = function(b) {
        a.prompt.defaults = a.extend({}, a.prompt.defaults, b)
    }
    ;
    a.prompt.setStateDefaults = function(b) {
        a.prompt.defaults.state = a.extend({}, a.prompt.defaults.state, b)
    }
    ;
    a.prompt.getStateContent = function(b) {
        return a("#" + a.prompt.currentPrefix + "_state_" + b)
    }
    ;
    a.prompt.getCurrentState = function() {
        return a("." + a.prompt.currentPrefix + "_state:visible")
    }
    ;
    a.prompt.getCurrentStateName = function() {
        var b = a.prompt.getCurrentState().attr("id");
        return b.replace(a.prompt.currentPrefix + "_state_", "")
    }
    ;
    a.prompt.goToState = function(b) {
        a("." + a.prompt.currentPrefix + "_state").slideUp("slow");
        a("#" + a.prompt.currentPrefix + "_state_" + b).slideDown("slow", function() {
            a(this).find("." + a.prompt.currentPrefix + "defaultbutton").focus()
        })
    }
    ;
    a.prompt.nextState = function() {
        var b = a("." + a.prompt.currentPrefix + "_state:visible").next();
        a("." + a.prompt.currentPrefix + "_state").slideUp("slow");
        b.slideDown("slow", function() {
            b.find("." + a.prompt.currentPrefix + "defaultbutton").focus()
        })
    }
    ;
    a.prompt.prevState = function() {
        var b = a("." + a.prompt.currentPrefix + "_state:visible").prev();
        a("." + a.prompt.currentPrefix + "_state").slideUp("slow");
        b.slideDown("slow", function() {
            b.find("." + a.prompt.currentPrefix + "defaultbutton").focus()
        })
    }
    ;
    a.prompt.close = function() {
        a("#" + a.prompt.currentPrefix + "box").fadeOut("fast", function() {
            a(this).remove()
        })
    }
}
)(jQuery);
jQuery.cookie = function(b, j, m) {
    if (typeof j != "undefined") {
        m = m || {};
        if (j === null) {
            j = "";
            m.expires = -1
        }
        var e = "";
        if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
            var f;
            if (typeof m.expires == "number") {
                f = new Date();
                f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
            } else {
                f = m.expires
            }
            e = "; expires=" + f.toUTCString()
        }
        var l = m.path ? "; path=" + (m.path) : "";
        var g = m.domain ? "; domain=" + (m.domain) : "";
        var a = m.secure ? "; secure" : "";
        document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
    } else {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var k = document.cookie.split(";");
            for (var h = 0; h < k.length; h++) {
                var c = jQuery.trim(k[h]);
                if (c.substring(0, b.length + 1) == (b + "=")) {
                    d = decodeURIComponent(c.substring(b.length + 1));
                    break
                }
            }
        }
        return d
    }
}
;
(function(a) {
    a.fn.jclock = function(c) {
        var b = "2.3.0";
        var d = a.extend({}, a.fn.jclock.defaults, c);
        return this.each(function() {
            $this = a(this);
            $this.timerID = null;
            $this.running = false;
            $this.increment = 0;
            $this.lastCalled = new Date().getTime();
            var e = a.meta ? a.extend({}, d, $this.data()) : d;
            $this.format = e.format;
            $this.utc = e.utc;
            $this.utcOffset = (e.utc_offset != null) ? e.utc_offset : e.utcOffset;
            $this.seedTime = e.seedTime;
            $this.timeout = e.timeout;
            $this.css({
                fontFamily: e.fontFamily,
                fontSize: e.fontSize,
                backgroundColor: e.background,
                color: e.foreground
            });
            $this.daysAbbrvNames = new Array(7);
            $this.daysAbbrvNames[0] = P.In.day_abbr_0;
            $this.daysAbbrvNames[1] = P.In.day_abbr_1;
            $this.daysAbbrvNames[2] = P.In.day_abbr_2;
            $this.daysAbbrvNames[3] = P.In.day_abbr_3;
            $this.daysAbbrvNames[4] = P.In.day_abbr_4;
            $this.daysAbbrvNames[5] = P.In.day_abbr_5;
            $this.daysAbbrvNames[6] = P.In.day_abbr_6;
            $this.daysFullNames = new Array(7);
            $this.daysFullNames[0] = P.In.day_full_0;
            $this.daysFullNames[1] = P.In.day_full_1;
            $this.daysFullNames[2] = P.In.day_full_2;
            $this.daysFullNames[3] = P.In.day_full_3;
            $this.daysFullNames[4] = P.In.day_full_4;
            $this.daysFullNames[5] = P.In.day_full_5;
            $this.daysFullNames[6] = P.In.day_full_6;
            $this.monthsAbbrvNames = new Array(12);
            $this.monthsAbbrvNames[0] = P.In.month_abbr_0;
            $this.monthsAbbrvNames[1] = P.In.month_abbr_1;
            $this.monthsAbbrvNames[2] = P.In.month_abbr_2;
            $this.monthsAbbrvNames[3] = P.In.month_abbr_3;
            $this.monthsAbbrvNames[4] = P.In.month_abbr_4;
            $this.monthsAbbrvNames[5] = P.In.month_abbr_5;
            $this.monthsAbbrvNames[6] = P.In.month_abbr_6;
            $this.monthsAbbrvNames[7] = P.In.month_abbr_7;
            $this.monthsAbbrvNames[8] = P.In.month_abbr_8;
            $this.monthsAbbrvNames[9] = P.In.month_abbr_9;
            $this.monthsAbbrvNames[10] = P.In.month_abbr_10;
            $this.monthsAbbrvNames[11] = P.In.month_abbr_11;
            $this.monthsFullNames = new Array(12);
            $this.monthsFullNames[0] = P.In.month_full_0;
            $this.monthsFullNames[1] = P.In.month_full_1;
            $this.monthsFullNames[2] = P.In.month_full_2;
            $this.monthsFullNames[3] = P.In.month_full_3;
            $this.monthsFullNames[4] = P.In.month_full_4;
            $this.monthsFullNames[5] = P.In.month_full_5;
            $this.monthsFullNames[6] = P.In.month_full_6;
            $this.monthsFullNames[7] = P.In.month_full_7;
            $this.monthsFullNames[8] = P.In.month_full_8;
            $this.monthsFullNames[9] = P.In.month_full_9;
            $this.monthsFullNames[10] = P.In.month_full_10;
            $this.monthsFullNames[11] = P.In.month_full_11;
            a.fn.jclock.startClock($this)
        })
    }
    ;
    a.fn.jclock.startClock = function(b) {
        a.fn.jclock.stopClock(b);
        a.fn.jclock.displayTime(b)
    }
    ;
    a.fn.jclock.stopClock = function(b) {
        if (b.running) {
            clearTimeout(b.timerID)
        }
        b.running = false
    }
    ;
    a.fn.jclock.displayTime = function(b) {
        var c = a.fn.jclock.getTime(b);
        b.html(c);
        b.timerID = setTimeout(function() {
            a.fn.jclock.displayTime(b)
        }, b.timeout)
    }
    ;
    a.fn.jclock.getTime = function(c) {
        if (typeof (c.seedTime) == "undefined") {
            var b = new Date()
        } else {
            c.increment += new Date().getTime() - c.lastCalled;
            var b = new Date(c.seedTime + c.increment);
            c.lastCalled = new Date().getTime()
        }
        if (c.utc == true) {
            var e = b.getTime();
            var k = b.getTimezoneOffset() * 60000;
            var h = e + k;
            var l = h + (3600000 * c.utcOffset);
            b = new Date(l)
        }
        var f = "";
        var d = 0;
        var g = 0;
        while ((g = c.format.indexOf("%", d)) != -1) {
            f += c.format.substring(d, g);
            g++;
            var j = a.fn.jclock.getProperty(b, c, c.format.charAt(g));
            g++;
            f += j;
            d = g
        }
        f += c.format.substring(d);
        return f
    }
    ;
    a.fn.jclock.getProperty = function(d, c, e) {
        switch (e) {
        case "a":
            return (c.daysAbbrvNames[d.getDay()]);
        case "A":
            return (c.daysFullNames[d.getDay()]);
        case "b":
            return (c.monthsAbbrvNames[d.getMonth()]);
        case "B":
            return (c.monthsFullNames[d.getMonth()]);
        case "d":
            return ((d.getDate() < 10) ? "0" : "") + d.getDate();
        case "H":
            return ((d.getHours() < 10) ? "0" : "") + d.getHours();
        case "I":
            var b = (d.getHours() % 12 || 12);
            return ((b < 10) ? "0" : "") + b;
        case "m":
            return (((d.getMonth() + 1) < 10) ? "0" : "") + (d.getMonth() + 1);
        case "M":
            return ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
        case "p":
            return (d.getHours() < 12 ? P.In.small_am : P.In.small_pm);
        case "P":
            return (d.getHours() < 12 ? P.In.big_am : P.In.big_pm);
        case "S":
            return ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
        case "y":
            return d.getFullYear().toString().substring(2);
        case "Y":
            return (d.getFullYear());
        case "%":
            return "%"
        }
    }
    ;
    a.fn.jclock.defaults = {
        format: "%H:%M:%S",
        utcOffset: 0,
        utc: false,
        fontFamily: "",
        fontSize: "",
        foreground: "",
        background: "",
        seedTime: undefined,
        timeout: 1000
    }
}
)(jQuery);
(function(b) {
    var d = 0
      , a = {}
      , c = "@";
    b.fn.jqote = function(g, e) {
        var h = b([])
          , e = e || c
          , f = new RegExp("<" + e + "(.+?)" + e + ">","g");
        if (!b.isArray(g)) {
            g = [g]
        }
        b(this).each(function(k) {
            var l = (fn = a[b.data(this, "jqote")]) ? fn : a[b.data(this, "jqote", d++)] = new Function("i, j","var t=[]; t.push('" + b(this).html().replace(/\s*<!\[CDATA\[|\]\]>\s*/g, "").replace(/[\r\n\t]/g, "\\\n").replace(f, function(i) {
                return i.replace(/'/g, "\x1a")
            }).split("<" + e + "=").join("\x1a,").replace(f, "\x1a); $1 t.push(\x1a").split(e + ">").join(",\x1a").split("'").join("\\'").split("\x1a").join("'") + "'); return $(t.join(''));");
            for (j = 0; j < g.length; j++) {
                h.push(l.call(g[j], k, j))
            }
        });
        return h
    }
    ;
    b.jqote_tag = function(e) {
        c = e
    }
}
)(jQuery);
(function(a) {
    a.fn.mask = function(c) {
        this.unmask();
        if (this.css("position") == "static") {
            this.addClass("masked-relative")
        }
        this.addClass("masked");
        var d = a('<div class="loadmask"></div>');
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            d.height(this.height() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")));
            d.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")))
        }
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            this.find("select").addClass("masked-hidden")
        }
        this.append(d);
        if (typeof c == "string") {
            var b = a('<div class="loadmask-msg" style="display:none;"></div>');
            b.append("<div>" + c + "</div>");
            this.append(b);
            b.css("top", Math.round(this.height() / 2 - (b.height() - parseInt(b.css("padding-top")) - parseInt(b.css("padding-bottom"))) / 2) + "px");
            b.css("left", Math.round(this.width() / 2 - (b.width() - parseInt(b.css("padding-left")) - parseInt(b.css("padding-right"))) / 2) + "px");
            b.show()
        }
    }
    ;
    a.fn.doubleheightmask = function(c) {
        this.unmask();
        if (this.css("position") == "static") {
            this.addClass("masked-relative")
        }
        this.addClass("masked");
        var d = a('<div class="loadmask" style="height:250%;"></div>');
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            d.height((this.height() * 2) + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")));
            d.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")))
        }
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            this.find("select").addClass("masked-hidden")
        }
        this.append(d);
        if (typeof c == "string") {
            var b = a('<div class="loadmask-msg" style="display:none;"></div>');
            b.append("<div>" + c + "</div>");
            this.append(b);
            b.css("top", Math.round(this.height() / 2 - (b.height() - parseInt(b.css("padding-top")) - parseInt(b.css("padding-bottom"))) / 2) + "px");
            b.css("left", Math.round(this.width() / 2 - (b.width() - parseInt(b.css("padding-left")) - parseInt(b.css("padding-right"))) / 2) + "px");
            b.show()
        }
    }
    ;
    a.fn.unmask = function(b) {
        this.find(".loadmask-msg,.loadmask").remove();
        this.removeClass("masked");
        this.removeClass("masked-relative");
        this.find("select").removeClass("masked-hidden")
    }
}
)(jQuery);
(function(c) {
    var a = c.scrollTo = function(f, e, d) {
        c(window).scrollTo(f, e, d)
    }
    ;
    a.defaults = {
        axis: "xy",
        duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1
    };
    a.window = function(d) {
        return c(window)._scrollable()
    }
    ;
    c.fn._scrollable = function() {
        return this.map(function() {
            var e = this
              , d = !e.nodeName || c.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!d) {
                return e
            }
            var f = (e.contentWindow || e).document || e.ownerDocument || e;
            return c.browser.safari || f.compatMode == "BackCompat" ? f.body : f.documentElement
        })
    }
    ;
    c.fn.scrollTo = function(f, e, d) {
        if (typeof e == "object") {
            d = e;
            e = 0
        }
        if (typeof d == "function") {
            d = {
                onAfter: d
            }
        }
        if (f == "max") {
            f = 9000000000
        }
        d = c.extend({}, a.defaults, d);
        e = e || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            e /= 2
        }
        d.offset = b(d.offset);
        d.over = b(d.over);
        return this._scrollable().each(function() {
            var l = this, j = c(l), k = f, i, g = {}, m = j.is("html,body");
            switch (typeof k) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                    k = b(k);
                    break
                }
                k = c(k, this);
            case "object":
                if (k.is || k.style) {
                    i = (k = c(k)).offset()
                }
            }
            c.each(d.axis.split(""), function(q, r) {
                var s = r == "x" ? "Left" : "Top"
                  , u = s.toLowerCase()
                  , p = "scroll" + s
                  , o = l[p]
                  , n = a.max(l, r);
                if (i) {
                    g[p] = i[u] + (m ? 0 : o - j.offset()[u]);
                    if (d.margin) {
                        g[p] -= parseInt(k.css("margin" + s)) || 0;
                        g[p] -= parseInt(k.css("border" + s + "Width")) || 0
                    }
                    g[p] += d.offset[u] || 0;
                    if (d.over[u]) {
                        g[p] += k[r == "x" ? "width" : "height"]() * d.over[u]
                    }
                } else {
                    var t = k[u];
                    g[p] = t.slice && t.slice(-1) == "%" ? parseFloat(t) / 100 * n : t
                }
                if (/^\d+$/.test(g[p])) {
                    g[p] = g[p] <= 0 ? 0 : Math.min(g[p], n)
                }
                if (!q && d.queue) {
                    if (o != g[p]) {
                        h(d.onAfterFirst)
                    }
                    delete g[p]
                }
            });
            h(d.onAfter);
            function h(n) {
                j.animate(g, e, d.easing, n && function() {
                    n.call(this, f, d)
                }
                )
            }
        }).end()
    }
    ;
    a.max = function(j, i) {
        var h = i == "x" ? "Width" : "Height"
          , e = "scroll" + h;
        if (!c(j).is("html,body")) {
            return j[e] - c(j)[h.toLowerCase()]()
        }
        var g = "client" + h
          , f = j.ownerDocument.documentElement
          , d = j.ownerDocument.body;
        return Math.max(f[e], d[e]) - Math.min(f[g], d[g])
    }
    ;
    function b(d) {
        return typeof d == "object" ? d : {
            top: d,
            left: d
        }
    }
}
)(jQuery);
(function(a) {
    var b = a.serialScroll = function(c) {
        return a(window).serialScroll(c)
    }
    ;
    b.defaults = {
        duration: 1000,
        axis: "x",
        event: "click",
        start: 0,
        step: 1,
        lock: true,
        cycle: true,
        constant: true
    };
    a.fn.serialScroll = function(c) {
        return this.each(function() {
            var t = a.extend({}, b.defaults, c), s = t.event, i = t.step, r = t.lazy, e = t.target ? this : document, u = a(t.target || this, e), p = u[0], m = t.items, h = t.start, g = t.interval, k = t.navigation, l;
            if (!r) {
                m = d()
            }
            if (t.force) {
                f({}, h)
            }
            a(t.prev || [], e).bind(s, -i, q);
            a(t.next || [], e).bind(s, i, q);
            if (!p.ssbound) {
                u.bind("prev.serialScroll", -i, q).bind("next.serialScroll", i, q).bind("goto.serialScroll", f)
            }
            if (g) {
                u.bind("start.serialScroll", function(v) {
                    if (!g) {
                        o();
                        g = true;
                        n()
                    }
                }).bind("stop.serialScroll", function() {
                    o();
                    g = false
                })
            }
            u.bind("notify.serialScroll", function(x, w) {
                var v = j(w);
                if (v > -1) {
                    h = v
                }
            });
            p.ssbound = true;
            if (t.jump) {
                (r ? u : d()).bind(s, function(v) {
                    f(v, j(v.target))
                })
            }
            if (k) {
                k = a(k, e).bind(s, function(v) {
                    v.data = Math.round(d().length / k.length) * k.index(this);
                    f(v, this)
                })
            }
            function q(v) {
                v.data += h;
                f(v, this)
            }
            function f(B, z) {
                if (!isNaN(z)) {
                    B.data = z;
                    z = p
                }
                var C = B.data, v, D = B.type, A = t.exclude ? d().slice(0, -t.exclude) : d(), y = A.length, w = A[C], x = t.duration;
                if (D) {
                    B.preventDefault()
                }
                if (g) {
                    o();
                    l = setTimeout(n, t.interval)
                }
                if (!w) {
                    v = C < 0 ? 0 : y - 1;
                    if (h != v) {
                        C = v
                    } else {
                        if (!t.cycle) {
                            return
                        } else {
                            C = y - v - 1
                        }
                    }
                    w = A[C]
                }
                if (!w || t.lock && u.is(":animated") || D && t.onBefore && t.onBefore(B, w, u, d(), C) === false) {
                    return
                }
                if (t.stop) {
                    u.queue("fx", []).stop()
                }
                if (t.constant) {
                    x = Math.abs(x / i * (h - C))
                }
                u.scrollTo(w, x, t).trigger("notify.serialScroll", [C])
            }
            function n() {
                u.trigger("next.serialScroll")
            }
            function o() {
                clearTimeout(l)
            }
            function d() {
                return a(m, p)
            }
            function j(w) {
                if (!isNaN(w)) {
                    return w
                }
                var x = d(), v;
                while ((v = x.index(w)) == -1 && w != p) {
                    w = w.parentNode
                }
                return v
            }
        })
    }
}
)(jQuery);
(function(a) {
    a.fn.sexyCombo = function(d) {
        return this.each(function() {
            if ("SELECT" != this.tagName.toUpperCase()) {
                return
            }
            new b(this,d)
        })
    }
    ;
    var c = {
        skin: "sexy",
        suffix: "__sexyCombo",
        hiddenSuffix: "__sexyComboHidden",
        renameOriginal: false,
        initialHiddenValue: "",
        emptyText: "",
        autoFill: false,
        triggerSelected: true,
        filterFn: null,
        dropUp: false,
        separator: ",",
        key: "value",
        value: "text",
        showListCallback: null,
        hideListCallback: null,
        initCallback: null,
        initEventsCallback: null,
        changeCallback: null,
        textChangeCallback: null,
        checkWidth: true,
        listWrapperContainer: null,
        listItemHeight: null,
        monitorScroll: null
    };
    a.sexyCombo = function(e, h) {
        if (e.tagName.toUpperCase() != "SELECT") {
            return
        }
        this.config = a.extend({}, c, h || {});
        this.selectbox = a(e);
        this.options = this.selectbox.children().filter("option");
        this.wrapper = this.selectbox.wrap("<div>").hide().parent().addClass("combo").addClass(this.config.skin);
        this.input = a("<input type='text' />").appendTo(this.wrapper).attr("autocomplete", "off").attr("value", "").attr("name", this.selectbox.attr("name") + this.config.suffix);
        var g = this.selectbox.attr("name");
        var d = g + this.config.hiddenSuffix;
        if (this.config.renameOriginal) {
            this.selectbox.attr("name", d)
        }
        this.hidden = a("<input type='hidden' />").appendTo(this.wrapper).attr("autocomplete", "off").attr("value", this.config.initialHiddenValue).attr("name", this.config.renameOriginal ? g : d);
        this.icon = a("<div />").appendTo(this.wrapper).addClass("icon");
        this.listWrapper = a("<div />").appendTo((this.config.listWrapperContainer == null) ? this.wrapper : this.config.listWrapperContainer).addClass("list-wrapper");
        this.updateDrop();
        this.list = a("<ul />").appendTo(this.listWrapper);
        var f = this;
        var i = [];
        this.options.each(function() {
            var k = a.trim(a(this).text());
            if (f.config.checkWidth) {
                i.push(a("<li />").appendTo(f.list).html("<span>" + k + "</span>").addClass("visible").find("span").outerWidth())
            } else {
                a("<li />").appendTo(f.list).html("<span>" + k + "</span>").addClass("visible")
            }
        });
        this.listItems = this.list.children();
        if (i.length) {
            i = i.sort(function(l, k) {
                return l - k
            });
            var j = i[i.length - 1]
        }
        this.singleItemHeight = this.listItems.outerHeight();
        this.listWrapper.addClass("invisible");
        if (a.browser.opera) {
            this.wrapper.css({
                position: "relative",
                left: "0",
                top: "0"
            })
        }
        this.filterFn = ("function" == typeof (this.config.filterFn)) ? this.config.filterFn : this.filterFn;
        this.lastKey = null;
        this.multiple = this.selectbox.attr("multiple");
        var f = this;
        this.wrapper.data("sc:lastEvent", "click");
        this.overflowCSS = "overflowY";
        if ((this.config.checkWidth) && (this.listWrapper.innerWidth() < j)) {
            this.overflowCSS = "overflow"
        }
        this.selectbox.attr("prevVal", this.selectbox.val());
        this.notify("init");
        this.initEvents()
    }
    ;
    var b = a.sexyCombo;
    b.fn = b.prototype = {};
    b.fn.extend = b.extend = a.extend;
    b.fn.extend({
        initEvents: function() {
            var d = this;
            this.icon.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            this.input.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            this.wrapper.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            this.icon.bind("click", function() {
                if (d.input.attr("disabled")) {
                    d.input.attr("disabled", false)
                }
                d.wrapper.data("sc:lastEvent", "click");
                d.filter();
                d.iconClick()
            });
            this.listItems.bind("mouseover", function(f) {
                if ("LI" == f.target.nodeName.toUpperCase()) {
                    d.highlight(f.target)
                } else {
                    d.highlight(a(f.target).parent())
                }
            });
            this.listItems.bind("click", function(f) {
                d.listItemClick(a(f.target))
            });
            this.input.bind("keyup", function(f) {
                d.wrapper.data("sc:lastEvent", "key");
                d.keyUp(f)
            });
            this.input.bind("keypress", function(f) {
                if (b.KEY.RETURN == f.keyCode) {
                    f.preventDefault()
                }
                if (b.KEY.TAB == f.keyCode) {
                    f.preventDefault()
                }
            });
            a(document).bind("click", function(f) {
                if ((d.icon.get(0) == f.target) || (d.input.get(0) == f.target)) {
                    return
                }
                d.hideList()
            });
            this.triggerSelected();
            this.applyEmptyText();
            this.input.bind("click", function(f) {
                d.wrapper.data("sc:lastEvent", "click");
                d.icon.trigger("click")
            });
            this.wrapper.bind("click", function() {
                d.wrapper.data("sc:lastEvent", "click")
            });
            this.input.bind("keydown", function(f) {
                if (9 == f.keyCode) {
                    f.preventDefault()
                }
            });
            this.wrapper.bind("keyup", function(g) {
                var f = g.keyCode;
                for (key in b.KEY) {
                    if (b.KEY[key] == f) {
                        return
                    }
                }
                d.wrapper.data("sc:lastEvent", "key")
            });
            this.input.bind("click", function() {
                d.wrapper.data("sc:lastEvent", "click")
            });
            this.icon.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            this.input.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            this.wrapper.bind("click", function(f) {
                if (!d.wrapper.data("sc:positionY")) {
                    d.wrapper.data("sc:positionY", f.pageY)
                }
            });
            if (this.config.monitorScroll != null) {
                this.config.monitorScroll.scroll(function(e) {
                    d.hideList()
                })
            }
            this.notify("initEvents")
        },
        getTextValue: function() {
            return this.__getValue("input")
        },
        getCurrentTextValue: function() {
            return this.__getCurrentValue("input")
        },
        getHiddenValue: function() {
            return this.__getValue("hidden")
        },
        getCurrentHiddenValue: function() {
            return this.__getCurrentValue("hidden")
        },
        __getValue: function(h) {
            h = this[h];
            if (!this.multiple) {
                return a.trim(h.val())
            }
            var f = h.val().split(this.config.separator);
            var g = [];
            for (var e = 0, d = f.length; e < d; ++e) {
                g.push(a.trim(f[e]))
            }
            g = b.normalizeArray(g);
            return g
        },
        __getCurrentValue: function(d) {
            d = this[d];
            if (!this.multiple) {
                return a.trim(d.val())
            }
            return a.trim(d.val().split(this.config.separator).pop())
        },
        iconClick: function() {
            if (this.listVisible()) {
                this.hideList();
                this.input.blur()
            } else {
                this.showList();
                this.input.focus();
                if (this.input.val().length) {
                    this.selection(this.input.get(0), 0, this.input.val().length)
                }
            }
        },
        listVisible: function() {
            return this.listWrapper.hasClass("visible")
        },
        showList: function() {
            if (!this.listItems.filter(".visible").length) {
                return
            }
            this.listWrapper.removeClass("invisible").addClass("visible");
            this.wrapper.css("zIndex", "99999");
            this.listWrapper.css("zIndex", "99999");
            this.setListHeight();
            this.setListPosition();
            var e = this.listWrapper.height();
            var f = this.wrapper.height();
            var d = parseInt(this.wrapper.data("sc:positionY")) + f + e;
            var g = a(window).height() + a(document).scrollTop();
            if (d > g) {
                this.setDropUp(true)
            } else {
                this.setDropUp(false)
            }
            if ("" == a.trim(this.input.val())) {
                this.highlightFirst();
                this.listWrapper.scrollTop(0)
            } else {
                this.highlightSelected()
            }
            this.notify("showList")
        },
        hideList: function() {
            if (this.listWrapper.hasClass("invisible")) {
                return
            }
            this.listWrapper.removeClass("visible").addClass("invisible");
            this.wrapper.css("zIndex", "0");
            this.listWrapper.css("zIndex", "99999");
            if (this.selectbox.attr("prevVal") == undefined || this.selectbox.attr("prevVal") != this.selectbox.val()) {
                this.notify("hideList");
                this.selectbox.attr("prevVal", this.selectbox.val())
            }
        },
        getListItemsHeight: function() {
            var d = (this.config.listItemHeight == null) ? this.singleItemHeight : this.config.listItemHeight;
            return d * this.liLen()
        },
        setOverflow: function() {
            var d = this.getListMaxHeight();
            if (this.getListItemsHeight() > d) {
                this.listWrapper.css(this.overflowCSS, "scroll")
            } else {
                this.listWrapper.css(this.overflowCSS, "hidden")
            }
        },
        highlight: function(d) {
            if ((b.KEY.DOWN == this.lastKey) || (b.KEY.UP == this.lastKey)) {
                return
            }
            this.listItems.removeClass("active");
            a(d).addClass("active")
        },
        setComboValue: function(h, g, d) {
            var f = this.input.val();
            var e = "";
            if (this.multiple) {
                e = this.getTextValue();
                if (g) {
                    e.pop()
                }
                e.push(a.trim(h));
                e = b.normalizeArray(e);
                e = e.join(this.config.separator) + this.config.separator
            } else {
                e = a.trim(h)
            }
            this.input.val(e);
            this.setHiddenValue(h);
            this.filter();
            if (d) {
                this.hideList()
            }
            this.input.removeClass("empty");
            if (this.multiple) {
                this.input.focus()
            }
            if (this.input.val() != f) {
                this.notify("textChange")
            }
        },
        setHiddenValue: function(d) {
            var l = false;
            d = a.trim(d);
            var n = this.hidden.val();
            if (!this.multiple) {
                for (var g = 0, h = this.options.length; g < h; ++g) {
                    if (d == this.options.eq(g).text()) {
                        this.hidden.val(this.options.eq(g).val());
                        l = true;
                        break
                    }
                }
            } else {
                var k = this.getTextValue();
                var m = [];
                for (var g = 0, h = k.length; g < h; ++g) {
                    for (var f = 0, e = this.options.length; f < e; ++f) {
                        if (k[g] == this.options.eq(f).text()) {
                            m.push(this.options.eq(f).val())
                        }
                    }
                }
                if (m.length) {
                    l = true;
                    this.hidden.val(m.join(this.config.separator))
                }
            }
            if (!l) {
                this.hidden.val(this.config.initialHiddenValue)
            }
            if (n != this.hidden.val()) {
                this.notify("change")
            }
            this.selectbox.val(this.hidden.val());
            this.selectbox.trigger("change")
        },
        listItemClick: function(d) {
            this.setComboValue(d.text(), true, true);
            this.inputFocus()
        },
        filter: function() {
            if ("yes" == this.wrapper.data("sc:optionsChanged")) {
                var e = this;
                this.listItems.remove();
                this.options = this.selectbox.children().filter("option");
                this.options.each(function() {
                    var f = a.trim(a(this).text());
                    a("<li />").appendTo(e.list).text(f).addClass("visible")
                });
                this.listItems = this.list.children();
                this.listItems.bind("mouseover", function(f) {
                    e.highlight(f.target)
                });
                this.listItems.bind("click", function(f) {
                    e.listItemClick(a(f.target))
                });
                e.wrapper.data("sc:optionsChanged", "")
            }
            var d = this.input.val();
            var e = this;
            this.listItems.each(function() {
                var f = a(this);
                var g = f.text();
                if (e.filterFn.call(e, e.getCurrentTextValue(), g, e.getTextValue())) {
                    f.removeClass("invisible").addClass("visible")
                } else {
                    f.removeClass("visible").addClass("invisible")
                }
            });
            this.setOverflow();
            this.setListHeight()
        },
        filterFn: function(g, h, e) {
            if ("click" == this.wrapper.data("sc:lastEvent")) {
                return true
            }
            if (!this.multiple) {
                return h.toLowerCase().indexOf(g.toLowerCase()) == 0
            } else {
                for (var f = 0, d = e.length; f < d; ++f) {
                    if (h == e[f]) {
                        return false
                    }
                }
                return h.toLowerCase().search(g.toLowerCase()) == 0
            }
        },
        getListMaxHeight: function() {
            var d = parseInt(this.listWrapper.css("maxHeight"), 10);
            if (isNaN(d)) {
                d = this.singleItemHeight * 10
            }
            return d
        },
        setListHeight: function() {
            var d = this.getListItemsHeight();
            var f = this.getListMaxHeight();
            var e = this.listWrapper.height();
            if (d < e) {
                this.listWrapper.height(d);
                return d
            } else {
                if (d > e) {
                    this.listWrapper.height(Math.min(f, d));
                    return Math.min(f, d)
                }
            }
        },
        setListPosition: function() {
            if (this.config.listWrapperContainer != null) {
                this.listWrapper.css("left", this.wrapper.offset().left);
                this.listWrapper.css("top", this.wrapper.offset().top + this.wrapper.height());
                this.listWrapper.css("width", this.wrapper.width())
            }
        },
        getActive: function() {
            return this.listItems.filter(".active")
        },
        keyUp: function(f) {
            this.lastKey = f.keyCode;
            var d = b.KEY;
            switch (f.keyCode) {
            case d.RETURN:
            case d.TAB:
                this.setComboValue(this.getActive().text(), true, true);
                if (!this.multiple) {
                    break
                }
            case d.DOWN:
                this.highlightNext();
                break;
            case d.UP:
                this.highlightPrev();
                break;
            case d.ESC:
                this.hideList();
                break;
            default:
                this.inputChanged();
                break
            }
        },
        liLen: function() {
            return this.listItems.filter(".visible").length
        },
        inputChanged: function() {
            this.filter();
            if (this.liLen()) {
                this.showList();
                this.setOverflow();
                this.setListHeight()
            } else {
                this.hideList()
            }
            this.setHiddenValue(this.input.val());
            this.notify("textChange")
        },
        highlightFirst: function() {
            this.listItems.removeClass("active").filter(".visible:eq(0)").addClass("active");
            this.autoFill()
        },
        highlightSelected: function() {
            this.listItems.removeClass("active");
            var f = a.trim(this.input.val());
            try {
                this.listItems.each(function() {
                    var e = a(this);
                    if (e.text() == f) {
                        e.addClass("active");
                        self.listWrapper.scrollTop(0);
                        self.scrollDown()
                    }
                });
                this.highlightFirst()
            } catch (d) {}
        },
        highlightNext: function() {
            var d = this.getActive().next();
            while (d.hasClass("invisible") && d.length) {
                d = d.next()
            }
            if (d.length) {
                this.listItems.removeClass("active");
                d.addClass("active");
                this.scrollDown()
            }
        },
        scrollDown: function() {
            if ("scroll" != this.listWrapper.css(this.overflowCSS)) {
                return
            }
            var d = this.getActiveIndex() + 1;
            var e = this.listItems.outerHeight() * d - this.listWrapper.height();
            if (a.browser.msie) {
                e += d
            }
            if (this.listWrapper.scrollTop() < e) {
                this.listWrapper.scrollTop(e)
            }
        },
        highlightPrev: function() {
            var d = this.getActive().prev();
            while (d.length && d.hasClass("invisible")) {
                d = d.prev()
            }
            if (d.length) {
                this.getActive().removeClass("active");
                d.addClass("active");
                this.scrollUp()
            }
        },
        getActiveIndex: function() {
            return a.inArray(this.getActive().get(0), this.listItems.filter(".visible").get())
        },
        scrollUp: function() {
            if ("scroll" != this.listWrapper.css(this.overflowCSS)) {
                return
            }
            var d = this.getActiveIndex() * this.listItems.outerHeight();
            if (this.listWrapper.scrollTop() > d) {
                this.listWrapper.scrollTop(d)
            }
        },
        applyEmptyText: function() {
            if (!this.config.emptyText.length) {
                return
            }
            var d = this;
            this.input.bind("focus", function() {
                d.inputFocus()
            }).bind("blur", function() {
                d.inputBlur()
            });
            if ("" == this.input.val()) {
                this.input.addClass("empty").val(this.config.emptyText)
            }
        },
        inputFocus: function() {
            if (this.input.hasClass("empty")) {
                this.input.removeClass("empty").val("")
            }
        },
        inputBlur: function() {
            if ("" == this.input.val()) {
                this.input.addClass("empty").val(this.config.emptyText)
            }
        },
        triggerSelected: function() {
            if (!this.config.triggerSelected) {
                return
            }
            var d = this;
            try {
                this.options.each(function() {
                    if (a(this).attr("selected")) {
                        d.setComboValue(a(this).text(), false, true);
                        throw new Error()
                    }
                })
            } catch (f) {
                return
            }
            d.setComboValue(this.options.eq(0).text(), false, false)
        },
        autoFill: function() {
            if (!this.config.autoFill || (b.KEY.BACKSPACE == this.lastKey) || this.multiple) {
                return
            }
            var e = this.input.val();
            var d = this.getActive().text();
            this.input.val(d);
            this.selection(this.input.get(0), e.length, d.length)
        },
        selection: function(f, g, e) {
            if (f.createTextRange) {
                var d = f.createTextRange();
                d.collapse(true);
                d.moveStart("character", g);
                d.moveEnd("character", e);
                d.select()
            } else {
                if (f.setSelectionRange) {
                    f.setSelectionRange(g, e)
                } else {
                    if (f.selectionStart) {
                        f.selectionStart = g;
                        f.selectionEnd = e
                    }
                }
            }
        },
        updateDrop: function() {
            if (this.config.dropUp) {
                this.listWrapper.addClass("list-wrapper-up")
            } else {
                this.listWrapper.removeClass("list-wrapper-up")
            }
        },
        setDropUp: function(d) {
            this.config.dropUp = d;
            this.updateDrop()
        },
        notify: function(d) {
            if (!a.isFunction(this.config[d + "Callback"])) {
                return
            }
            this.config[d + "Callback"].call(this)
        }
    });
    b.extend({
        KEY: {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        },
        log: function(e) {
            var d = a("#log");
            d.html(d.html() + e + "<br />")
        },
        createSelectbox: function(e) {
            var j = a("<select />").appendTo(e.container).attr({
                name: e.name,
                id: e.id,
                size: "1"
            });
            if (e.multiple) {
                j.attr("multiple", true)
            }
            var h = e.data;
            var g = false;
            for (var f = 0, d = h.length; f < d; ++f) {
                g = h[f].selected || false;
                a("<option />").appendTo(j).attr("value", h[f][e.key]).text(h[f][e.value]).attr("selected", g)
            }
            return j.get(0)
        },
        create: function(e) {
            var f = {
                name: "",
                id: "",
                data: [],
                multiple: false,
                key: "value",
                value: "text",
                container: a(document),
                url: "",
                ajaxData: {}
            };
            e = a.extend({}, f, e || {});
            if (e.url) {
                return a.getJSON(e.url, e.ajaxData, function(g) {
                    delete e.url;
                    delete e.ajaxData;
                    e.data = g;
                    return b.create(e)
                })
            }
            e.container = a(e.container);
            var d = b.createSelectbox(e);
            return new b(d,e)
        },
        deactivate: function(d) {
            d = a(d);
            d.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return
                }
                var e = a(this);
                if (!e.parent().is(".combo")) {
                    return
                }
            })
        },
        activate: function(d) {
            d = a(d);
            d.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return
                }
                var e = a(this);
                if (!e.parent().is(".combo")) {
                    return
                }
                e.parent().find("input[type='text']").attr("disabled", false)
            })
        },
        changeOptions: function(d) {
            d = a(d);
            d.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return
                }
                var h = a(this);
                var g = h.parent();
                var i = g.find("input[type='text']");
                var f = g.find("ul").parent();
                f.removeClass("visible").addClass("invisible");
                g.css("zIndex", "0");
                f.css("zIndex", "99999");
                i.val("");
                g.data("sc:optionsChanged", "yes");
                var e = h;
                e.parent().find("input[type='text']").val(e.find("option:eq(0)").text());
                e.parent().data("sc:lastEvent", "click");
                e.find("option:eq(0)").attr("selected", "selected")
            })
        },
        normalizeArray: function(f) {
            var e = [];
            for (var g = 0, d = f.length; g < d; ++g) {
                if ("" == f[g]) {
                    continue
                }
                e.push(f[g])
            }
            return e
        }
    })
}
)(jQuery);
(function($) {
    $.template = function(html, options) {
        return new $.template.instance(html,options)
    }
    ;
    $.template.instance = function(html, options) {
        if (options && options.regx) {
            options.regx = this.regx[options.regx]
        }
        this.options = $.extend({
            compile: false,
            regx: this.regx.standard
        }, options || {});
        this.html = html;
        if (this.options.compile) {
            this.compile()
        }
        this.isTemplate = true
    }
    ;
    $.template.regx = $.template.instance.prototype.regx = {
        jsp: /\$\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        ext: /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        jtemplates: /\{\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}\}/g
    };
    $.template.regx.standard = $.template.regx.jsp;
    $.template.helpers = $.template.instance.prototype.helpers = {
        substr: function(value, start, length) {
            return String(value).substr(start, length)
        }
    };
    $.extend($.template.instance.prototype, {
        apply: function(values) {
            if (this.options.compile) {
                return this.compiled(values)
            } else {
                var tpl = this;
                var fm = this.helpers;
                var fn = function(m, name, format, args) {
                    if (format) {
                        if (format.substr(0, 5) == "this.") {
                            return tpl.call(format.substr(5), values[name], values)
                        } else {
                            if (args) {
                                var re = /^\s*['"](.*)["']\s*$/;
                                args = args.split(",");
                                for (var i = 0, len = args.length; i < len; i++) {
                                    args[i] = args[i].replace(re, "$1")
                                }
                                args = [values[name]].concat(args)
                            } else {
                                args = [values[name]]
                            }
                            return fm[format].apply(fm, args)
                        }
                    } else {
                        return values[name] !== undefined ? values[name] : ""
                    }
                };
                return this.html.replace(this.options.regx, fn)
            }
        },
        compile: function() {
            var sep = $.browser.mozilla ? "+" : ",";
            var fm = this.helpers;
            var fn = function(m, name, format, args) {
                if (format) {
                    args = args ? "," + args : "";
                    if (format.substr(0, 5) != "this.") {
                        format = "fm." + format + "("
                    } else {
                        format = 'this.call("' + format.substr(5) + '", ';
                        args = ", values"
                    }
                } else {
                    args = "";
                    format = "(values['" + name + "'] == undefined ? '' : "
                }
                return "'" + sep + format + "values['" + name + "']" + args + ")" + sep + "'"
            };
            var body;
            if ($.browser.mozilla) {
                body = "this.compiled = function(values){ return '" + this.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'").replace(this.options.regx, fn) + "';};"
            } else {
                body = ["this.compiled = function(values){ return ['"];
                body.push(this.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'").replace(this.options.regx, fn));
                body.push("'].join('');};");
                body = body.join("")
            }
            eval(body);
            return this
        }
    });
    var $_old = {
        domManip: $.fn.domManip,
        text: $.fn.text,
        html: $.fn.html
    };
    $.fn.domManip = function(args, table, reverse, callback) {
        if (args[0].isTemplate) {
            args[0] = args[0].apply(args[1]);
            delete args[1]
        }
        var r = $_old.domManip.apply(this, arguments);
        return r
    }
    ;
    $.fn.html = function(value, o) {
        if (value && value.isTemplate) {
            var value = value.apply(o)
        }
        var r = $_old.html.apply(this, [value]);
        return r
    }
    ;
    $.fn.text = function(value, o) {
        if (value && value.isTemplate) {
            var value = value.apply(o)
        }
        var r = $_old.text.apply(this, [value]);
        return r
    }
}
)(jQuery);
(function(a) {
    if (typeof a.timeout != "undefined") {
        return
    }
    a.extend({
        timeout: function(c, b) {
            if (typeof a.timeout.count == "undefined") {
                a.timeout.count = 0
            }
            if (typeof a.timeout.funcs == "undefined") {
                a.timeout.funcs = new Array()
            }
            if (typeof c == "string") {
                return setTimeout(c, b)
            }
            if (typeof c == "function") {
                a.timeout.count++;
                a.timeout.funcs[a.timeout.count] = c;
                return setTimeout("$.timeout.funcs['" + a.timeout.count + "']();", b)
            }
        },
        interval: function(c, b) {
            if (typeof a.interval.count == "undefined") {
                a.interval.count = 0
            }
            if (typeof a.interval.funcs == "undefined") {
                a.interval.funcs = new Array()
            }
            if (typeof c == "string") {
                return setInterval(c, b)
            }
            if (typeof c == "function") {
                a.interval.count++;
                a.interval.funcs[a.interval.count] = c;
                return setInterval("$.interval.funcs['" + a.interval.count + "']();", b)
            }
        },
        idle: function(c, b) {
            if (typeof a.idle.lasttimeout == "undefined") {
                a.idle.lasttimeout = null
            }
            if (typeof a.idle.lastfunc == "undefined") {
                a.idle.lastfunc = null
            }
            if (a.idle.timeout) {
                clearTimeout(a.idle.timeout);
                a.idle.timeout = null;
                a.idle.lastfunc = null
            }
            if (typeof (c) == "string") {
                a.idle.timeout = setTimeout(c, b);
                return a.idle.timeout
            }
            if (typeof (c) == "function") {
                a.idle.lastfunc = c;
                a.idle.timeout = setTimeout("$.idle.lastfunc();", b);
                return a.idle.timeout
            }
        },
        clear: function(b) {
            clearInterval(b);
            clearTimeout(b)
        }
    })
}
)(jQuery);
(function(e) {
    var b = {}, k, m, o, j = e.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent), a = false;
    e.tooltip = {
        blocked: false,
        defaults: {
            delay: 200,
            fade: false,
            showURL: true,
            extraClass: "",
            top: 15,
            left: 15,
            id: "tooltip"
        },
        block: function() {
            e.tooltip.blocked = !e.tooltip.blocked
        }
    };
    e.fn.extend({
        tooltip: function(p) {
            p = e.extend({}, e.tooltip.defaults, p);
            h(p);
            return this.each(function() {
                e.data(this, "tooltip", p);
                this.tOpacity = b.parent.css("opacity");
                this.tooltipText = this.title;
                e(this).removeAttr("title");
                this.alt = ""
            }).mouseover(l).mouseout(f).click(f)
        },
        fixPNG: j ? function() {
            return this.each(function() {
                var p = e(this).css("backgroundImage");
                if (p.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
                    p = RegExp.$1;
                    e(this).css({
                        backgroundImage: "none",
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + p + "')"
                    }).each(function() {
                        var q = e(this).css("position");
                        if (q != "absolute" && q != "relative") {
                            e(this).css("position", "relative")
                        }
                    })
                }
            })
        }
        : function() {
            return this
        }
        ,
        unfixPNG: j ? function() {
            return this.each(function() {
                e(this).css({
                    filter: "",
                    backgroundImage: ""
                })
            })
        }
        : function() {
            return this
        }
        ,
        hideWhenEmpty: function() {
            return this.each(function() {
                e(this)[e(this).html() ? "show" : "hide"]()
            })
        },
        url: function() {
            return this.attr("href") || this.attr("src")
        }
    });
    function h(p) {
        if (b.parent) {
            return
        }
        b.parent = e('<div id="' + p.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
        if (e.fn.bgiframe) {
            b.parent.bgiframe()
        }
        b.title = e("h3", b.parent);
        b.body = e("div.body", b.parent);
        b.url = e("div.url", b.parent)
    }
    function c(p) {
        return e.data(p, "tooltip")
    }
    function g(p) {
        if (c(this).delay) {
            o = setTimeout(n, c(this).delay)
        } else {
            n()
        }
        a = !!c(this).track;
        e(document.body).bind("mousemove", d);
        d(p)
    }
    function l() {
        if (e.tooltip.blocked || this == k || (!this.tooltipText && !c(this).bodyHandler)) {
            return
        }
        k = this;
        m = this.tooltipText;
        if (c(this).bodyHandler) {
            b.title.hide();
            var s = c(this).bodyHandler.call(this);
            if (s.nodeType || s.jquery) {
                b.body.empty().append(s)
            } else {
                b.body.html(s)
            }
            b.body.show()
        } else {
            if (c(this).showBody) {
                var r = m.split(c(this).showBody);
                b.title.html(r.shift()).show();
                b.body.empty();
                for (var q = 0, p; (p = r[q]); q++) {
                    if (q > 0) {
                        b.body.append("<br/>")
                    }
                    b.body.append(p)
                }
                b.body.hideWhenEmpty()
            } else {
                b.title.html(m).show();
                b.body.hide()
            }
        }
        if (c(this).showURL && e(this).url()) {
            b.url.html(e(this).url().replace("http://", "")).show()
        } else {
            b.url.hide()
        }
        b.parent.addClass(c(this).extraClass);
        if (c(this).fixPNG) {
            b.parent.fixPNG()
        }
        g.apply(this, arguments)
    }
    function n() {
        o = null;
        if ((!j || !e.fn.bgiframe) && c(k).fade) {
            if (b.parent.is(":animated")) {
                b.parent.stop().show().fadeTo(c(k).fade, k.tOpacity)
            } else {
                b.parent.is(":visible") ? b.parent.fadeTo(c(k).fade, k.tOpacity) : b.parent.fadeIn(c(k).fade)
            }
        } else {
            b.parent.show()
        }
        d()
    }
    function d(s) {
        if (e.tooltip.blocked) {
            return
        }
        if (s && s.target.tagName == "OPTION") {
            return
        }
        if (!a && b.parent.is(":visible")) {
            e(document.body).unbind("mousemove", d)
        }
        if (k == null) {
            e(document.body).unbind("mousemove", d);
            return
        }
        b.parent.removeClass("viewport-right").removeClass("viewport-bottom");
        var u = b.parent[0].offsetLeft;
        var t = b.parent[0].offsetTop;
        if (s) {
            u = s.pageX + c(k).left;
            t = s.pageY + c(k).top;
            var q = "auto";
            if (c(k).positionLeft) {
                q = e(window).width() - u;
                u = "auto"
            }
            b.parent.css({
                left: u,
                right: q,
                top: t
            })
        }
        var p = i()
          , r = b.parent[0];
        if (p.x + p.cx < r.offsetLeft + r.offsetWidth) {
            u -= r.offsetWidth + 20 + c(k).left;
            b.parent.css({
                left: u + "px"
            }).addClass("viewport-right")
        }
        if (p.y + p.cy < r.offsetTop + r.offsetHeight) {
            t -= r.offsetHeight + 20 + c(k).top;
            b.parent.css({
                top: t + "px"
            }).addClass("viewport-bottom")
        }
    }
    function i() {
        return {
            x: e(window).scrollLeft(),
            y: e(window).scrollTop(),
            cx: e(window).width(),
            cy: e(window).height()
        }
    }
    function f(r) {
        if (e.tooltip.blocked) {
            return
        }
        if (o) {
            clearTimeout(o)
        }
        k = null;
        var q = c(this);
        function p() {
            b.parent.removeClass(q.extraClass).hide().css("opacity", "")
        }
        if ((!j || !e.fn.bgiframe) && q.fade) {
            if (b.parent.is(":animated")) {
                b.parent.stop().fadeTo(q.fade, 0, p)
            } else {
                b.parent.stop().fadeOut(q.fade, p)
            }
        } else {
            p()
        }
        if (c(this).fixPNG) {
            b.parent.unfixPNG()
        }
    }
}
)(jQuery);
jQuery.extend({
    ns: function() {
        var b, a;
        $.each(arguments, function(c) {
            a = this.split(".");
            b = window[a[0]] = window[a[0]] || {};
            $.each(a.slice(1), function(d) {
                b = b[this] = b[this] || {}
            });
            return b
        })
    }
});
jQuery.extend({
    util: {
        USE_NATIVE_JSON: false,
        isEmpty: function(b, a) {
            return b === null || b === undefined || ((jQuery.util.isArray(b) && !b.length)) || (!a ? b === "" : false)
        },
        isArray: function(a) {
            return Object.prototype.toString.apply(a) === "[object Array]"
        },
        isDate: function(a) {
            return Object.prototype.toString.apply(a) === "[object Date]"
        },
        isObject: function(a) {
            return a && typeof a == "object"
        },
        isPrimitive: function(a) {
            return jQuery.util.isString(a) || jQuery.util.isNumber(a) || jQuery.util.isBoolean(a)
        },
        isFunction: function(a) {
            return Object.prototype.toString.apply(a) === "[object Function]"
        },
        isNumber: function(a) {
            return typeof a === "number" && isFinite(a)
        },
        isString: function(a) {
            return typeof a === "string"
        },
        isDefined: function(a) {
            return typeof a !== "undefined"
        },
        isBoolean: function(a) {
            return typeof a === "boolean"
        }
    }
});
jQuery.JSON = new (function() {
    var useHasOwn = !!{}.hasOwnProperty
      , isNative = function() {
        var useNative = null;
        return function() {
            if (useNative === null) {
                useNative = jQuery.util.USE_NATIVE_JSON && window.JSON && JSON.toString() == "[object JSON]"
            }
            return useNative
        }
    }()
      , pad = function(n) {
        return n < 10 ? "0" + n : n
    }
      , doDecode = function(json) {
        return eval("(" + json + ")")
    }
      , doEncode = function(o) {
        if (!jQuery.util.isDefined(o) || o === null) {
            return "null"
        } else {
            if (jQuery.util.isArray(o)) {
                return encodeArray(o)
            } else {
                if (jQuery.util.isDate(o)) {
                    return jQuery.JSON(o)
                } else {
                    if (jQuery.util.isString(o)) {
                        return encodeString(o)
                    } else {
                        if (typeof o == "number") {
                            return isFinite(o) ? String(o) : "null"
                        } else {
                            if (jQuery.util.isBoolean(o)) {
                                return String(o)
                            } else {
                                var a = ["{"], b, i, v;
                                for (i in o) {
                                    if (!useHasOwn || o.hasOwnProperty(i)) {
                                        v = o[i];
                                        switch (typeof v) {
                                        case "undefined":
                                        case "function":
                                        case "unknown":
                                            break;
                                        default:
                                            if (b) {
                                                a.push(",")
                                            }
                                            a.push(doEncode(i), ":", v === null ? "null" : doEncode(v));
                                            b = true
                                        }
                                    }
                                }
                                a.push("}");
                                return a.join("")
                            }
                        }
                    }
                }
            }
        }
    }
      , m = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }
      , encodeString = function(s) {
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if (c) {
                    return c
                }
                c = b.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
            }) + '"'
        }
        return '"' + s + '"'
    }
      , encodeArray = function(o) {
        var a = ["["], b, i, l = o.length, v;
        for (i = 0; i < l; i += 1) {
            v = o[i];
            switch (typeof v) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if (b) {
                    a.push(",")
                }
                a.push(v === null ? "null" : jQuery.JSON.encode(v));
                b = true
            }
        }
        a.push("]");
        return a.join("")
    };
    this.encodeDate = function(o) {
        return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
    }
    ;
    this.encode = function() {
        var ec;
        return function(o) {
            if (!ec) {
                ec = isNative() ? JSON.stringify : doEncode
            }
            return ec(o)
        }
    }();
    this.decode = function() {
        var dc;
        return function(json) {
            if (!dc) {
                dc = isNative() ? JSON.parse : doDecode
            }
            return dc(json)
        }
    }()
}
)();
jQuery.encode = jQuery.JSON.encode;
jQuery.decode = jQuery.JSON.decode;
if (!this.JSON2) {
    this.JSON2 = {}
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON2.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON2.parse !== "function") {
        JSON2.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON2.parse")
        }
    }
}());
$.postify = function(b) {
    var a = {};
    var c = function(d, f) {
        for (var e in d) {
            var g = isFinite(e) ? (f != "" ? f : "") + "[" + e + "]" : (f != "" ? f + "." : "") + e;
            switch (typeof (d[e])) {
            case "number":
            case "string":
            case "boolean":
                a[g] = d[e];
                break;
            case "object":
                if (d[e].toUTCString) {
                    a[g] = d[e].toUTCString().replace("UTC", "GMT")
                } else {
                    c(d[e], g != "" ? g : e)
                }
            }
        }
    };
    c(b, "");
    return a
}
;
(function(c) {
    function a(f, d, e) {
        this.dec = f;
        this.group = d;
        this.neg = e
    }
    function b(d) {
        var g = ".";
        var e = ",";
        var f = "-";
        if (d == "us" || d == "ae" || d == "eg" || d == "il" || d == "jp" || d == "sk" || d == "th" || d == "cn" || d == "hk" || d == "tw" || d == "au" || d == "ca" || d == "gb" || d == "in") {
            g = ".";
            e = ","
        } else {
            if (d == "de" || d == "vn" || d == "es" || d == "dk" || d == "at" || d == "gr" || d == "br") {
                g = ",";
                e = "."
            } else {
                if (d == "cz" || d == "fr" || d == "fi" || d == "ru" || d == "se") {
                    e = " ";
                    g = ","
                } else {
                    if (d == "ch") {
                        e = "'";
                        g = "."
                    }
                }
            }
        }
        return new a(g,e,f)
    }
    c.formatNumber = function(f, e) {
        var e = c.extend({}, c.fn.parse.defaults, e);
        var h = b(e.locale.toLowerCase());
        var j = h.dec;
        var g = h.group;
        var i = h.neg;
        var d = new String(f);
        d = d.replace(".", j).replace("-", i);
        return d
    }
    ;
    c.fn.parse = function(d) {
        var d = c.extend({}, c.fn.parse.defaults, d);
        var g = b(d.locale.toLowerCase());
        var j = g.dec;
        var f = g.group;
        var i = g.neg;
        var e = "1234567890.-";
        var h = [];
        this.each(function() {
            var o = new String(c(this).text());
            if (c(this).is(":input")) {
                o = new String(c(this).val())
            }
            o = o.replace(f, "").replace(j, ".").replace(i, "-");
            var n = "";
            var k = false;
            if (o.charAt(o.length - 1) == "%") {
                k = true
            }
            for (var l = 0; l < o.length; l++) {
                if (e.indexOf(o.charAt(l)) > -1) {
                    n = n + o.charAt(l)
                }
            }
            var m = new Number(n);
            if (k) {
                m = m / 100;
                m = m.toFixed(n.length - 1)
            }
            h.push(m)
        });
        return h
    }
    ;
    c.fn.format = function(d) {
        var d = c.extend({}, c.fn.format.defaults, d);
        var f = b(d.locale.toLowerCase());
        var i = f.dec;
        var e = f.group;
        var h = f.neg;
        var g = "0#-,.";
        return this.each(function() {
            var y = new String(c(this).text());
            if (c(this).is(":input")) {
                y = new String(c(this).val())
            }
            var r = "";
            var s = false;
            for (var p = 0; p < d.format.length; p++) {
                if (g.indexOf(d.format.charAt(p)) == -1) {
                    r = r + d.format.charAt(p)
                } else {
                    if (p == 0 && d.format.charAt(p) == "-") {
                        s = true;
                        continue
                    } else {
                        break
                    }
                }
            }
            var z = "";
            for (var p = d.format.length - 1; p >= 0; p--) {
                if (g.indexOf(d.format.charAt(p)) == -1) {
                    z = d.format.charAt(p) + z
                } else {
                    break
                }
            }
            d.format = d.format.substring(r.length);
            d.format = d.format.substring(0, d.format.length - z.length);
            var o = new Number(y.replace(e, "").replace(i, ".").replace(h, "-"));
            if (z == "%") {
                o = o * 100
            }
            var u = "";
            var l = o % 1;
            if (d.format.indexOf(".") > -1) {
                var k = i;
                var m = d.format.substring(d.format.lastIndexOf(".") + 1);
                var x = new String(l.toFixed(m.length));
                x = x.substring(x.lastIndexOf(".") + 1);
                for (var p = 0; p < m.length; p++) {
                    if (m.charAt(p) == "#" && x.charAt(p) != "0") {
                        k += x.charAt(p);
                        break
                    } else {
                        if (m.charAt(p) == "0") {
                            k += x.charAt(p)
                        }
                    }
                }
                u += k
            } else {
                o = Math.round(o)
            }
            var v = Math.floor(o);
            if (o < 0) {
                v = Math.ceil(o)
            }
            var t = "";
            if (v == 0) {
                t = "0"
            } else {
                var n = "";
                if (d.format.indexOf(".") == -1) {
                    n = d.format
                } else {
                    n = d.format.substring(0, d.format.indexOf("."))
                }
                var q = new String(v);
                var j = 9999;
                if (n.lastIndexOf(",") != -1) {
                    j = n.length - n.lastIndexOf(",") - 1
                }
                var w = 0;
                for (var p = q.length - 1; p > -1; p--) {
                    t = q.charAt(p) + t;
                    w++;
                    if (w == j && p != 0) {
                        t = e + t;
                        w = 0
                    }
                }
            }
            u = t + u;
            if (o < 0 && s && r.length > 0) {
                u = u.substring(1);
                r = h + r
            }
            u = r + u + z;
            if (c(this).is(":input")) {
                c(this).val(u)
            } else {
                c(this).text(u)
            }
        })
    }
    ;
    c.fn.parse.defaults = {
        locale: "us"
    };
    c.fn.format.defaults = {
        format: "#,###.00",
        locale: "us"
    }
}
)(jQuery);
Date.prototype.format = function(e) {
    var d = "";
    var c = Date.replaceChars;
    for (var b = 0; b < e.length; b++) {
        var a = e.charAt(b);
        if (c[a]) {
            d += c[a].call(this)
        } else {
            d += a
        }
    }
    return d
}
;
Date.replaceChars = {
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    longMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    d: function() {
        return (this.getDate() < 10 ? "0" : "") + this.getDate()
    },
    D: function() {
        return Date.replaceChars.shortDays[this.getDay()]
    },
    j: function() {
        return this.getDate()
    },
    l: function() {
        return Date.replaceChars.longDays[this.getDay()]
    },
    N: function() {
        return this.getDay() + 1
    },
    S: function() {
        return (this.getDate() % 10 == 1 && this.getDate() != 11 ? "st" : (this.getDate() % 10 == 2 && this.getDate() != 12 ? "nd" : (this.getDate() % 10 == 3 && this.getDate() != 13 ? "rd" : "th")))
    },
    w: function() {
        return this.getDay()
    },
    z: function() {
        return "Not Yet Supported"
    },
    W: function() {
        return "Not Yet Supported"
    },
    F: function() {
        return Date.replaceChars.longMonths[this.getMonth()]
    },
    m: function() {
        return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1)
    },
    M: function() {
        return Date.replaceChars.shortMonths[this.getMonth()]
    },
    n: function() {
        return this.getMonth() + 1
    },
    t: function() {
        return "Not Yet Supported"
    },
    L: function() {
        return "Not Yet Supported"
    },
    o: function() {
        return "Not Supported"
    },
    Y: function() {
        return this.getFullYear()
    },
    y: function() {
        return ("" + this.getFullYear()).substr(2)
    },
    a: function() {
        return this.getHours() < 12 ? "am" : "pm"
    },
    A: function() {
        return this.getHours() < 12 ? "AM" : "PM"
    },
    B: function() {
        return "Not Yet Supported"
    },
    g: function() {
        return this.getHours() % 12 || 12
    },
    G: function() {
        return this.getHours()
    },
    h: function() {
        return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12)
    },
    H: function() {
        return (this.getHours() < 10 ? "0" : "") + this.getHours()
    },
    i: function() {
        return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes()
    },
    s: function() {
        return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds()
    },
    e: function() {
        return "Not Yet Supported"
    },
    I: function() {
        return "Not Supported"
    },
    O: function() {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + (Math.abs(this.getTimezoneOffset() / 60)) + "00"
    },
    T: function() {
        var b = this.getMonth();
        this.setMonth(0);
        var a = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
        this.setMonth(b);
        return a
    },
    Z: function() {
        return -this.getTimezoneOffset() * 60
    },
    c: function() {
        return "Not Yet Supported"
    },
    r: function() {
        return this.toString()
    },
    U: function() {
        return this.getTime() / 1000
    }
};
Array.prototype.intersection = function(f) {
    var a = this;
    var d = {};
    var c = {};
    for (var b = 0; b < f.length; b++) {
        c[f[b]] = true
    }
    var e = [];
    for (var b = 0; b < a.length; b++) {
        if (!d[a[b]]) {
            d[a[b]] = true;
            if (c[a[b]]) {
                e.push(a[b])
            }
        }
    }
    return e
}
;
Array.prototype.union = function(e) {
    var a = this;
    var b = {};
    var d = [];
    for (var c = 0; c < a.length; c++) {
        if (!b[a[c]]) {
            d.push(a[c]);
            b[a[c]] = true
        }
    }
    for (var c = 0; c < e.length; c++) {
        if (!b[e[c]]) {
            d.push(e[c]);
            b[e[c]] = true
        }
    }
    return d
}
;
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(a) {
        return !this.indexOf(a)
    }
}
;var jqWindowsEngineZIndex = 100;
!function(t) {
    t.fn.newWindow = function(n) {
        var e = 0
          , i = 0
          , o = 3;
        null != t("#contentBody").offset() && (o = t("#contentBody").offset().left + o);
        var a = {
            windowTitle: "",
            content: "",
            ajaxURL: "",
            width: 200,
            height: 600,
            posx: o,
            posy: 50,
            onDragBegin: null,
            onDragEnd: null,
            onResizeBegin: null,
            onResizeEnd: null,
            onAjaxContentLoaded: null,
            onCloseWindow: null,
            renderWindow: null,
            statusBar: !0,
            minimizeButton: !0,
            minimizeIcon: "-",
            maximizeButton: !0,
            maximizeIcon: "",
            closeButton: !0,
            closeIcon: "X",
            draggable: !0,
            resizeable: !0,
            resizeIcon: "#",
            windowType: "standard"
        }
          , n = t.extend(a, n);
        $windowContainer = t('<div class="window-container"></div>'),
        $windowTitleBar = t('<div class="window-titleBar"></div>'),
        $windowMinimizeButton = t('<div class="window-minimizeButton"></div>'),
        $windowMaximizeButton = t('<div class="window-maximizeButton"></div>'),
        $windowCloseButton = t('<div class="window-closeButton"></div>'),
        $windowWagerTypeToolbar = t('<div class="window-wagerTypeToolbar"></div>'),
        $windowContent = t('<div class="window-content"></div>'),
        $windowStatusBar = t('<div class="window-statusBar"></div>'),
        $windowResizeIcon = t('<div class="window-resizeIcon"></div>'),
        "video" != n.windowType && "iframe" != n.windowType || $windowContent.css("overflow", "hidden");
        var d = function(t) {}
          , r = function(t, e, i) {
            e = parseInt(e),
            i = parseInt(i),
            t.attr("lastWidth", e).attr("lastHeight", i),
            e += "px",
            i += "px",
            t.css("width", "100%"),
            t.children(".window-content").css("max-height", p),
            "video" == n.windowType && (t.children(".window-content").children("embed").css("width", e).css("height", i),
            t.children(".window-content").children("object").css("width", e).css("height", i),
            t.children(".window-content").children().children("embed").css("width", e).css("height", i),
            t.children(".window-content").children().children("object").css("width", e).css("height", i)),
            "iframe" == n.windowType && t.children(".window-content").children("iframe").css("width", e).css("height", i)
        }
          , s = function(t, n, e) {
            n = parseInt(n),
            e = parseInt(e),
            t.attr("lastX", n).attr("lastY", e),
            n += "px",
            e += "px",
            t.css("left", n).css("top", e)
        }
          , w = function(t, o) {
            if (n.draggable) {
                t = t || window.event;
                var a = parseInt(o.css("left")) + (t.clientX - e)
                  , d = parseInt(o.css("top")) + (t.clientY - i);
                e = t.clientX,
                i = t.clientY,
                s(o, a, d)
            }
        }
          , l = function(t, n) {
            t = t || window.event;
            var o = parseInt(n.css("width"))
              , a = parseInt(n.css("height"));
            o = o < 100 ? 100 : o,
            a = a < 50 ? 50 : a;
            var d = o + (t.clientX - e)
              , s = a + (t.clientY - i);
            e = t.clientX,
            i = t.clientY,
            r(n, d, s)
        };
        $windowTitleBar.bind("mousedown", function(o) {
            $obj = t(o.target).parent(),
            d($obj),
            "normal" == $obj.attr("state") && (o = o || window.event,
            e = o.clientX,
            i = o.clientY,
            t(document).bind("mousemove", function(t) {
                w(t, $obj)
            }),
            t(document).bind("mouseup", function(e) {
                null != n.onDragEnd && n.onDragEnd(),
                t(document).unbind("mousemove"),
                t(document).unbind("mouseup")
            }),
            null != n.onDragBegin && n.onDragBegin())
        }),
        $windowResizeIcon.bind("mousedown", function(o) {
            $obj = t(o.target).parent().parent(),
            d($obj),
            "normal" == $obj.attr("state") && (o = o || window.event,
            e = o.clientX,
            i = o.clientY,
            t(document).bind("mousemove", function(t) {
                l(t, $obj)
            }),
            t(document).bind("mouseup", function(e) {
                null != n.onResizeEnd && n.onResizeEnd(),
                t(document).unbind("mousemove"),
                t(document).unbind("mouseup")
            }),
            null != n.onResizeBegin && n.onResizeBegin())
        }),
        $windowMinimizeButton.bind("click", function(n) {
            $obj = t(n.target).parent().parent(),
            d($obj),
            "normal" == $obj.attr("state") && t(n.target).parent().next().slideToggle("slow")
        }),
        $windowMaximizeButton.bind("click", function(e) {
            $obj = t(e.target).parent().parent(),
            d($obj),
            "normal" == $obj.attr("state") ? ("standard" == n.windowType ? $obj.animate({
                top: "5px",
                left: "5px",
                width: t(window).width() - 15
            }, "slow") : (tmpx = $obj.attr("lastX"),
            tmpy = $obj.attr("lastY"),
            tmpwidth = $obj.attr("lastWidth"),
            tmpheight = $obj.attr("lastHeight"),
            s($obj, 5, 5),
            r($obj, t(window).width() - 15, t(window).height() - 45),
            $obj.attr("lastX", tmpx),
            $obj.attr("lastY", tmpy),
            $obj.attr("lastWidth", tmpwidth),
            $obj.attr("lastHeight", tmpheight)),
            $obj.attr("state", "maximized")) : "maximized" == $obj.attr("state") && ("standard" == n.windowType ? $obj.animate({
                top: $obj.attr("lastY"),
                left: $obj.attr("lastX"),
                width: $obj.attr("lastWidth")
            }, "slow") : (r($obj, $obj.attr("lastWidth"), $obj.attr("lastHeight")),
            s($obj, $obj.attr("lastX"), $obj.attr("lastY"))),
            $obj.attr("state", "normal"))
        }),
        $windowCloseButton.bind("click", function(e) {
            t(e.target).parent().parent().parent().parent().parent().parent().fadeOut(),
            t(e.target).parent().parent().parent().parent().parent().parent().children(".window-content").html(""),
            null != n.onCloseWindow && n.onCloseWindow($windowContainer)
        }),
        $windowContent.click(function(n) {
            d(t(n.target).parent())
        }),
        $windowStatusBar.click(function(n) {
            d(t(n.target).parent())
        }),
        s($windowContainer, n.posx, n.posy),
        r($windowContainer, n.width, n.height),
        $windowContainer.attr("state", "normal");
        var c = "<table id='window-title-table'><tbody><tr><td class='leftTd'></td><td class='middleTd'>" + n.windowTitle + "</td><td id='buttonTd' class='rightTd'></td></tr></tbody></table>";
        $windowTitleBar.append(t(c));
        $windowTitleBar.find("#buttonTd");
        $windowWagerTypeToolbar.html("<div id='contentToolbar'><div id='toolbar' class='toolbar' style='position:relative; width: 100.8%; top:3px;'><div class='bg' style='width: 100%; left: 1px; background-color:#4B4B4B; background-image:none; border:1px solid #fff; height:36px;color:#fff;border-radius:4px;'><table class='toolbarTable' style='width: 100%;'<tbody><tr><td class='wagertypetd straighttd'><a id='_straightALink' class='straight _wagertype'>Straight<br/>Bet</a><a id='straightALink' href='#bet' class='straight wagertype hide'>Straight<br />Bet</a></td><td class='wagertypetd parlaytd'><a id='_parlayALink' class='parlay _wagertype'>Parlay &<br />Robin</a><a id='parlayALink' href='#bet' class='parlay wagertype hide'>Parlay &<br />Robin</a></td><td class='wagertypetd roundRobintd'><a id='_roundRobinALink' class='roundRobin _wagertype'>Round Robin</a><a id='roundRobinALink' href='#roundRobin' class='roundRobin wagertype hide'>Round Robin</a></td><td class='wagertypetd ifBettd'><a id='_ifBetALink' class='ifBet _wagertype'>IF Bet &<br />Reverse</a><a id='ifBetALink' href='#bet' class='ifBet wagertype hide'>IF Bet &<br />Reverse</a></td><td class='wagertypetd reversetd'><a  id='_reverseALink' class='reverse _wagertype'>Action Reverse</a><a  id='reverseALink' href='#bet' class='reverse wagertype hide'>Action Reverse</a><a  id='birdCageALink' href='#bet' class='birdCage wagertype hide'>Action Reverse</a></td><td class='wagertypetd teasertd'><a  id='_teaserALink' class='teaser _wagertype'>Teaser &<br />Pleaser</a><a  id='teaserALink' href='#bet' class='teaser wagertype hide'>Teaser &<br />Pleaser</a></td></tr></tbody></table></div></div></div>"),
        n.minimizeButton && $windowTitleBar.append($windowMinimizeButton),
        n.maximizeButton && $windowTitleBar.append($windowMaximizeButton),
        n.resizeable && $windowStatusBar.append($windowResizeIcon),
        $windowContainer.append($windowTitleBar),
        $windowContainer.append($windowWagerTypeToolbar),
        $windowContainer.append($windowContent);
        var p = t(window).height()
          , h = t("div.balance_top_wrap").height()
          , b = t("div #hdiv").height()
          , u = p - h - b - 93;
        return $windowContainer.children(".window-content").css("max-height", u),
        $windowContainer.children(".window-content").css("top", "6px"),
        n.statusBar && $windowContainer.append($windowStatusBar),
        $windowContainer.css("display", "block"),
        this.each(function(e) {
            var i = t(this);
            $windowMinimizeButton.html(n.minimizeIcon),
            $windowMaximizeButton.html(n.maximizeIcon),
            $windowCloseButton.html(n.closeIcon),
            $windowResizeIcon.html(n.resizeIcon),
            i.data("window", $windowContainer),
            $windowContainer.insertAfter("#center").wrap('<div id="rightTop"><div id="right"></div></div>'),
            i.click(function(e) {
                if (e.preventDefault(),
                $window = i.data("window"),
                "" != n.ajaxURL ? t.ajax({
                    type: "GET",
                    url: n.ajaxURL,
                    dataType: "html",
                    success: function(t) {
                        $window.children(".window-content").html(t),
                        null != n.onAjaxContentLoaded && n.onAjaxContentLoaded()
                    }
                }) : null != n.renderWindow && n.renderWindow($window),
                n.draggable || $window.children(".window-titleBar").css("cursor", "default"),
                "maximized" != $window.attr("state")) {
                    var o = 3;
                    null != t("#contentBody").offset() && (o = t("#contentBody").offset().left + o),
                    $window.css("left", o + "px"),
                    $window.attr("lastx", o)
                }
                $window.fadeIn(),
                d($window);
                $window.children(".window-content").find("#betslipDiv")
            })
        })
    }
}(jQuery);
(function(c) {
    var d = [];
    c.tools = c.tools || {};
    c.tools.navtip = {
        version: "1.1.3",
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            tip: null,
            predelay: 0,
            delay: 30,
            opacity: 1,
            lazy: undefined,
            position: ["top", "center"],
            offset: [0, 0],
            cancelDefault: true,
            relative: false,
            oneInstance: true,
            events: {
                def: "mouseover,mouseout",
                input: "focus,blur",
                widget: "focus mouseover,blur mouseout",
                tooltip: "mouseover,mouseout"
            },
            api: false
        },
        addEffect: function(e, g, f) {
            b[e] = [g, f]
        }
    };
    var b = {
        toggle: [function(e) {
            var f = this.getConf()
              , g = this.getTip()
              , h = f.opacity;
            if (h < 1) {
                g.css({
                    opacity: h
                })
            }
            g.show();
            e.call()
        }
        , function(e) {
            this.getTip().hide();
            e.call()
        }
        ],
        fade: [function(e) {
            this.getTip().fadeIn(this.getConf().fadeInSpeed, e)
        }
        , function(e) {
            this.getTip().fadeOut(this.getConf().fadeOutSpeed, e)
        }
        ]
    };
    function a(f, g) {
        var p = this
          , k = c(this);
        f.data("tooltip", p);
        var l = f.next();
        if (g.tip) {
            l = c(g.tip);
            if (l.length > 1) {
                l = f.nextAll(g.tip).eq(0);
                if (!l.length) {
                    l = f.parent().nextAll(g.tip).eq(0)
                }
            }
        }
        function o(u) {
            var t = g.relative ? f.position().top : f.offset().top
              , s = g.relative ? f.position().left : f.offset().left
              , v = g.position[0];
            t -= l.outerHeight() - g.offset[0];
            s += f.outerWidth() + g.offset[1];
            var q = l.outerHeight() + f.outerHeight();
            if (v == "center") {
                t += q / 2
            }
            if (v == "bottom") {
                t += q
            }
            v = g.position[1];
            var r = l.outerWidth() + f.outerWidth();
            if (v == "center") {
                s -= r / 2
            }
            if (v == "left") {
                s -= r
            }
            return {
                top: t,
                left: s
            }
        }
        var i = f.is(":input")
          , e = i && f.is(":checkbox, :radio, select, :button")
          , h = f.attr("type")
          , n = g.events[h] || g.events[i ? (e ? "widget" : "input") : "def"];
        n = n.split(/,\s*/);
        if (n.length != 2) {
            throw "Tooltip: bad events configuration for " + h
        }
        f.bind(n[0], function(r) {
            if (g.oneInstance) {
                c.each(d, function() {
                    this.hide()
                })
            }
            var q = l.data("trigger");
            if (q && q[0] != this) {
                l.hide().stop(true, true)
            }
            r.target = this;
            p.show(r);
            n = g.events.tooltip.split(/,\s*/);
            l.bind(n[0], function() {
                p.show(r)
            });
            if (n[1]) {
                l.bind(n[1], function() {
                    p.hide(r)
                })
            }
        });
        f.bind(n[1], function(q) {
            p.hide(q)
        });
        if (!c.browser.msie && !i && !g.predelay) {
            f.mousemove(function() {
                if (!p.isShown()) {
                    f.triggerHandler("mouseover")
                }
            })
        }
        if (g.opacity < 1) {
            l.css("opacity", g.opacity)
        }
        var m = 0
          , j = f.attr("title");
        if (j && g.cancelDefault) {
            f.removeAttr("title");
            f.data("title", j)
        }
        c.extend(p, {
            show: function(r) {
                if (r) {
                    f = c(r.target)
                }
                clearTimeout(l.data("timer"));
                if (l.is(":animated") || l.is(":visible")) {
                    return p
                }
                function q() {
                    l.data("trigger", f);
                    var t = o(r);
                    if (g.tip && j) {
                        l.html(f.data("title"))
                    }
                    r = r || c.Event();
                    r.type = "onBeforeShow";
                    k.trigger(r, [t]);
                    if (r.isDefaultPrevented()) {
                        return p
                    }
                    t = o(r);
                    l.css({
                        position: "absolute",
                        top: t.top,
                        left: t.left
                    });
                    var s = b[g.effect];
                    if (!s) {
                        throw 'Nonexistent effect "' + g.effect + '"'
                    }
                    s[0].call(p, function() {
                        r.type = "onShow";
                        k.trigger(r)
                    })
                }
                if (g.predelay) {
                    clearTimeout(m);
                    m = setTimeout(q, g.predelay)
                } else {
                    q()
                }
                return p
            },
            hide: function(r) {
                clearTimeout(l.data("timer"));
                clearTimeout(m);
                if (!l.is(":visible")) {
                    return
                }
                function q() {
                    r = r || c.Event();
                    r.type = "onBeforeHide";
                    k.trigger(r);
                    if (r.isDefaultPrevented()) {
                        return
                    }
                    b[g.effect][1].call(p, function() {
                        r.type = "onHide";
                        k.trigger(r)
                    })
                }
                if (g.delay && r) {
                    l.data("timer", setTimeout(q, g.delay))
                } else {
                    q()
                }
                return p
            },
            isShown: function() {
                return l.is(":visible, :animated")
            },
            getConf: function() {
                return g
            },
            getTip: function() {
                return l
            },
            getTrigger: function() {
                return f
            },
            bind: function(q, r) {
                k.bind(q, r);
                return p
            },
            onHide: function(q) {
                return this.bind("onHide", q)
            },
            onBeforeShow: function(q) {
                return this.bind("onBeforeShow", q)
            },
            onShow: function(q) {
                return this.bind("onShow", q)
            },
            onBeforeHide: function(q) {
                return this.bind("onBeforeHide", q)
            },
            unbind: function(q) {
                k.unbind(q);
                return p
            }
        });
        c.each(g, function(q, r) {
            if (c.isFunction(r)) {
                p.bind(q, r)
            }
        })
    }
    c.prototype.navtip = function(e) {
        var f = this.eq(typeof e == "number" ? e : 0).data("tooltip");
        if (f) {
            return f
        }
        var g = c.extend(true, {}, c.tools.navtip.conf);
        if (c.isFunction(e)) {
            e = {
                onBeforeShow: e
            }
        } else {
            if (typeof e == "string") {
                e = {
                    tip: e
                }
            }
        }
        e = c.extend(true, g, e);
        if (typeof e.position == "string") {
            e.position = e.position.split(/,?\s/)
        }
        if (e.lazy !== false && (e.lazy === true || this.length > 20)) {
            this.one("mouseover", function(h) {
                f = new a(c(this),e);
                f.show(h);
                d.push(f)
            })
        } else {
            this.each(function() {
                f = new a(c(this),e);
                d.push(f)
            })
        }
        return e.api ? f : this
    }
}
)(jQuery);
(function(b) {
    var a = b.tools.navtip;
    a.effects = a.effects || {};
    a.effects.slide = {
        version: "1.0.0"
    };
    b.extend(a.conf, {
        direction: "up",
        bounce: false,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !b.browser.msie
    });
    var c = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    b.tools.navtip.addEffect("slide", function(d) {
        var f = this.getConf()
          , g = this.getTip()
          , h = f.slideFade ? {
            opacity: f.opacity
        } : {}
          , e = c[f.direction] || c.up;
        h[e[1]] = e[0] + "=" + f.slideOffset;
        if (f.slideFade) {
            g.css({
                opacity: 0
            })
        }
        g.show().animate(h, f.slideInSpeed, d)
    }, function(e) {
        var g = this.getConf()
          , i = g.slideOffset
          , h = g.slideFade ? {
            opacity: 0
        } : {}
          , f = c[g.direction] || c.up;
        var d = "" + f[0];
        if (g.bounce) {
            d = d == "+" ? "-" : "+"
        }
        h[f[1]] = d + "=" + i;
        this.getTip().animate(h, g.slideOutSpeed, function() {
            b(this).hide();
            e.call()
        })
    })
}
)(jQuery);
(function(a) {
    a.prettyPhoto = {
        version: "2.5.6"
    };
    a.fn.prettyPhoto = function(u) {
        u = jQuery.extend({
            animationSpeed: "normal",
            opacity: 0.8,
            showTitle: true,
            allowresize: true,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "light_rounded",
            hideflash: false,
            wmode: "opaque",
            autoplay: true,
            modal: false,
            changepicturecallback: function() {},
            callback: function() {},
            markup: '<div class="pp_pic_holder">       <div class="pp_top">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>       <div class="pp_content_container">        <div class="pp_left">        <div class="pp_right">         <div class="pp_content">          <div class="pp_loadersIcon"></div>          <div class="pp_fade">           <a href="#" class="pp_expand" title="Expand the image">Expand</a>           <div class="pp_hoverContainer">            <a class="pp_next" href="#">next</a>            <a class="pp_previous" href="#">previous</a>           </div>           <div id="pp_full_res"></div>           <div class="pp_details clearfix">            <a class="pp_close" href="#">Close</a>            <p class="pp_description"></p>            <div class="pp_nav">             <a href="#" class="pp_arrow_previous">Previous</a>             <p class="currentTextHolder">0/0</p>             <a href="#" class="pp_arrow_next">Next</a>            </div>           </div>          </div>         </div>        </div>        </div>       </div>       <div class="pp_bottom">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>      </div>      <div class="pp_overlay"></div>      <div class="ppt"></div>',
            image_markup: '<img id="fullResImage" src="" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline clearfix">{content}</div>'
        }, u);
        if (a.browser.msie && parseInt(a.browser.version) == 6) {
            u.theme = "light_square"
        }
        if (a(".pp_overlay").size() == 0) {
            v()
        }
        var e = true, i = false, t, o, z, c, m, n, s, w, g = a(window).height(), y = a(window).width(), d = 0, r = f();
        a(window).scroll(function() {
            r = f();
            j();
            q()
        });
        a(window).resize(function() {
            j();
            q()
        });
        a(document).keydown(function(A) {
            if (o.is(":visible")) {
                switch (A.keyCode) {
                case 37:
                    a.prettyPhoto.changePage("previous");
                    break;
                case 39:
                    a.prettyPhoto.changePage("next");
                    break;
                case 27:
                    if (!u.modal) {
                        a.prettyPhoto.close()
                    }
                    break
                }
            }
        });
        a(this).each(function() {
            a(this).bind("click", function() {
                _self = this;
                theRel = a(this).attr("rel");
                galleryRegExp = /\[(?:.*)\]/;
                theGallery = galleryRegExp.exec(theRel);
                var A = new Array()
                  , C = new Array()
                  , B = new Array();
                if (theGallery) {
                    a("a[rel*=" + theGallery + "]").each(function(D) {
                        if (a(this)[0] === a(_self)[0]) {
                            d = D
                        }
                        A.push(a(this).attr("href"));
                        C.push(a(this).find("img").attr("alt"));
                        B.push(a(this).attr("title"))
                    })
                } else {
                    A = a(this).attr("href");
                    C = (a(this).find("img").attr("alt")) ? a(this).find("img").attr("alt") : "";
                    B = (a(this).attr("title")) ? a(this).attr("title") : ""
                }
                a.prettyPhoto.open2(A, C, B);
                return false
            })
        });
        a.prettyPhoto.open2 = function(C, B, A) {
            if (a.browser.msie && a.browser.version == 6) {
                a("select").css("visibility", "hidden")
            }
            if (u.hideflash) {
                a("object,embed").css("visibility", "hidden")
            }
            images = a.makeArray(C);
            titles = a.makeArray(B);
            descriptions = a.makeArray(A);
            image_set = (a(images).size() > 0) ? true : false;
            h(a(images).size());
            a(".pp_loaderIcon").show();
            c.show().fadeTo(u.animationSpeed, u.opacity);
            o.find(".currentTextHolder").text((d + 1) + u.counter_separator_label + a(images).size());
            if (descriptions[d]) {
                o.find(".pp_description").show().html(unescape(descriptions[d]))
            } else {
                o.find(".pp_description").hide().text("")
            }
            if (titles[d] && u.showTitle) {
                hasTitle = true;
                z.html(unescape(titles[d]))
            } else {
                hasTitle = false
            }
            movie_width = (parseFloat(b("width", images[d]))) ? b("width", images[d]) : u.default_width.toString();
            movie_height = (parseFloat(b("height", images[d]))) ? b("height", images[d]) : u.default_height.toString();
            if (movie_width.indexOf("%") != -1 || movie_height.indexOf("%") != -1) {
                movie_height = parseFloat((a(window).height() * parseFloat(movie_height) / 100) - 100);
                movie_width = parseFloat((a(window).width() * parseFloat(movie_width) / 100) - 100);
                i = true
            }
            o.fadeIn(function() {
                imgPreloader = "";
                switch (x(images[d])) {
                case "image":
                    imgPreloader = new Image();
                    nextImage = new Image();
                    if (image_set && d > a(images).size()) {
                        nextImage.src = images[d + 1]
                    }
                    prevImage = new Image();
                    if (image_set && images[d - 1]) {
                        prevImage.src = images[d - 1]
                    }
                    o.find("#pp_full_res")[0].innerHTML = u.image_markup;
                    o.find("#fullResImage").attr("src", images[d]);
                    imgPreloader.onload = function() {
                        t = k(imgPreloader.width, imgPreloader.height);
                        _showContent()
                    }
                    ;
                    imgPreloader.onerror = function() {
                        alert("Image cannot be loaded. Make sure the path is correct and image exist.");
                        a.prettyPhoto.close()
                    }
                    ;
                    imgPreloader.src = images[d];
                    break;
                case "youtube":
                    t = k(movie_width, movie_height);
                    movie = "http://www.youtube.com/v/" + b("v", images[d]);
                    if (u.autoplay) {
                        movie += "&autoplay=1"
                    }
                    toInject = u.flash_markup.replace(/{width}/g, t.width).replace(/{height}/g, t.height).replace(/{wmode}/g, u.wmode).replace(/{path}/g, movie);
                    break;
                case "vimeo":
                    t = k(movie_width, movie_height);
                    movie_id = images[d];
                    movie = "http://vimeo.com/moogaloop.swf?clip_id=" + movie_id.replace("http://vimeo.com/", "");
                    if (u.autoplay) {
                        movie += "&autoplay=1"
                    }
                    toInject = u.flash_markup.replace(/{width}/g, t.width).replace(/{height}/g, t.height).replace(/{wmode}/g, u.wmode).replace(/{path}/g, movie);
                    break;
                case "quicktime":
                    t = k(movie_width, movie_height);
                    t.height += 15;
                    t.contentHeight += 15;
                    t.containerHeight += 15;
                    toInject = u.quicktime_markup.replace(/{width}/g, t.width).replace(/{height}/g, t.height).replace(/{wmode}/g, u.wmode).replace(/{path}/g, images[d]).replace(/{autoplay}/g, u.autoplay);
                    break;
                case "flash":
                    t = k(movie_width, movie_height);
                    flash_vars = images[d];
                    flash_vars = flash_vars.substring(images[d].indexOf("flashvars") + 10, images[d].length);
                    filename = images[d];
                    filename = filename.substring(0, filename.indexOf("?"));
                    toInject = u.flash_markup.replace(/{width}/g, t.width).replace(/{height}/g, t.height).replace(/{wmode}/g, u.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                    break;
                case "iframe":
                    t = k(movie_width, movie_height);
                    frame_url = images[d];
                    frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
                    toInject = u.iframe_markup.replace(/{width}/g, t.width).replace(/{height}/g, t.height).replace(/{path}/g, frame_url);
                    break;
                case "inline":
                    myClone = a(images[d]).clone().css({
                        width: u.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline clearfix"></div></div>').appendTo(a("body"));
                    t = k(a(myClone).width(), a(myClone).height());
                    a(myClone).remove();
                    toInject = u.inline_markup.replace(/{content}/g, a(images[d]).html());
                    break
                }
                if (!imgPreloader) {
                    o.find("#pp_full_res")[0].innerHTML = toInject;
                    _showContent()
                }
            })
        }
        ;
        a.prettyPhoto.changePage = function(A) {
            if (A == "previous") {
                d--;
                if (d < 0) {
                    d = 0;
                    return
                }
            } else {
                if (a(".pp_arrow_next").is(".disabled")) {
                    return
                }
                d++
            }
            if (!e) {
                e = true
            }
            l(function() {
                a.prettyPhoto.open(images, titles, descriptions)
            });
            a("a.pp_expand,a.pp_contract").fadeOut(u.animationSpeed)
        }
        ;
        a.prettyPhoto.close = function() {
            o.find("object,embed").css("visibility", "hidden");
            a("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(u.animationSpeed);
            c.fadeOut(u.animationSpeed, function() {
                a("#pp_full_res").html("");
                o.attr("style", "").find("div:not(.pp_hoverContainer)").attr("style", "");
                j();
                if (a.browser.msie && a.browser.version == 6) {
                    a("select").css("visibility", "visible")
                }
                if (u.hideflash) {
                    a("object,embed").css("visibility", "visible")
                }
                d = 0;
                u.callback()
            });
            e = true
        }
        ;
        _showContent = function() {
            a(".pp_loaderIcon").hide();
            projectedTop = r.scrollTop + ((g / 2) - (t.containerHeight / 2));
            if (projectedTop < 0) {
                projectedTop = 0 + z.height()
            }
            o.find(".pp_content").animate({
                height: t.contentHeight
            }, u.animationSpeed);
            o.animate({
                top: projectedTop,
                left: (y / 2) - (t.containerWidth / 2),
                width: t.containerWidth
            }, u.animationSpeed, function() {
                o.find(".pp_hoverContainer,#fullResImage").height(t.height).width(t.width);
                o.find(".pp_fade").fadeIn(u.animationSpeed);
                if (image_set && x(images[d]) == "image") {
                    o.find(".pp_hoverContainer").show()
                } else {
                    o.find(".pp_hoverContainer").hide()
                }
                if (u.showTitle && hasTitle) {
                    z.css({
                        top: o.offset().top - 25,
                        left: o.offset().left + 20,
                        display: "none"
                    });
                    z.fadeIn(u.animationSpeed)
                }
                if (t.resized) {
                    a("a.pp_expand,a.pp_contract").fadeIn(u.animationSpeed)
                }
                u.changepicturecallback()
            })
        }
        ;
        function l(A) {
            o.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
            o.find(".pp_fade").fadeOut(u.animationSpeed, function() {
                a(".pp_loaderIcon").show();
                if (A) {
                    A()
                }
            });
            z.fadeOut(u.animationSpeed)
        }
        function h(A) {
            if (d == A - 1) {
                o.find("a.pp_next").css("visibility", "hidden");
                o.find("a.pp_arrow_next").addClass("disabled").unbind("click")
            } else {
                o.find("a.pp_next").css("visibility", "visible");
                o.find("a.pp_arrow_next.disabled").removeClass("disabled").bind("click", function() {
                    a.prettyPhoto.changePage("next");
                    return false
                })
            }
            if (d == 0) {
                o.find("a.pp_previous").css("visibility", "hidden");
                o.find("a.pp_arrow_previous").addClass("disabled").unbind("click")
            } else {
                o.find("a.pp_previous").css("visibility", "visible");
                o.find("a.pp_arrow_previous.disabled").removeClass("disabled").bind("click", function() {
                    a.prettyPhoto.changePage("previous");
                    return false
                })
            }
            if (A > 1) {
                a(".pp_nav").show()
            } else {
                a(".pp_nav").hide()
            }
        }
        function k(B, A) {
            hasBeenResized = false;
            p(B, A);
            imageWidth = B;
            imageHeight = A;
            if (((w > y) || (s > g)) && e && u.allowresize && !i) {
                hasBeenResized = true;
                notFitting = true;
                while (notFitting) {
                    if ((w > y)) {
                        imageWidth = (y - 200);
                        imageHeight = (A / B) * imageWidth
                    } else {
                        if ((s > g)) {
                            imageHeight = (g - 200);
                            imageWidth = (B / A) * imageHeight
                        } else {
                            notFitting = false
                        }
                    }
                    s = imageHeight;
                    w = imageWidth
                }
                p(imageWidth, imageHeight)
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(s),
                containerWidth: Math.floor(w) + 40,
                contentHeight: Math.floor(m),
                contentWidth: Math.floor(n),
                resized: hasBeenResized
            }
        }
        function p(B, A) {
            B = parseFloat(B);
            A = parseFloat(A);
            $pp_details = o.find(".pp_details");
            $pp_details.width(B);
            detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
            $pp_details = $pp_details.clone().appendTo(a("body")).css({
                position: "absolute",
                top: -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight;
            if (a.browser.msie && a.browser.version == 7) {
                detailsHeight += 8
            }
            $pp_details.remove();
            m = A + detailsHeight;
            n = B;
            s = m + z.height() + o.find(".pp_top").height() + o.find(".pp_bottom").height();
            w = B
        }
        function x(A) {
            if (A.match(/youtube\.com\/watch/i)) {
                return "youtube"
            } else {
                if (A.match(/vimeo\.com/i)) {
                    return "vimeo"
                } else {
                    if (A.indexOf(".mov") != -1) {
                        return "quicktime"
                    } else {
                        if (A.indexOf(".swf") != -1) {
                            return "flash"
                        } else {
                            if (A.indexOf("iframe") != -1) {
                                return "iframe"
                            } else {
                                if (A.substr(0, 1) == "#") {
                                    return "inline"
                                } else {
                                    return "image"
                                }
                            }
                        }
                    }
                }
            }
        }
        function j() {
            if (e) {
                titleHeight = z.height();
                contentHeight = o.height();
                contentwidth = o.width();
                projectedTop = (g / 2) + r.scrollTop - ((contentHeight + titleHeight) / 2);
                o.css({
                    top: projectedTop,
                    left: (y / 2) + r.scrollLeft - (contentwidth / 2)
                });
                z.css({
                    top: projectedTop - titleHeight,
                    left: (y / 2) + r.scrollLeft - (contentwidth / 2) + 20
                })
            }
        }
        function f() {
            if (self.pageYOffset) {
                return {
                    scrollTop: self.pageYOffset,
                    scrollLeft: self.pageXOffset
                }
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    return {
                        scrollTop: document.documentElement.scrollTop,
                        scrollLeft: document.documentElement.scrollLeft
                    }
                } else {
                    if (document.body) {
                        return {
                            scrollTop: document.body.scrollTop,
                            scrollLeft: document.body.scrollLeft
                        }
                    }
                }
            }
        }
        function q() {
            g = a(window).height();
            y = a(window).width();
            c.css({
                height: a(document).height()
            })
        }
        function v() {
            a("body").append(u.markup);
            o = a(".pp_pic_holder");
            z = a(".ppt");
            c = a("div.pp_overlay");
            o.attr("class", "pp_pic_holder " + u.theme);
            c.css({
                opacity: 0,
                height: a(document).height()
            }).bind("click", function() {
                if (!u.modal) {
                    a.prettyPhoto.close()
                }
            });
            a("a.pp_close").bind("click", function() {
                a.prettyPhoto.close();
                return false
            });
            a("a.pp_expand").bind("click", function() {
                $this = a(this);
                if ($this.hasClass("pp_expand")) {
                    $this.removeClass("pp_expand").addClass("pp_contract");
                    e = false
                } else {
                    $this.removeClass("pp_contract").addClass("pp_expand");
                    e = true
                }
                l(function() {
                    a.prettyPhoto.open(images, titles, descriptions)
                });
                o.find(".pp_fade").fadeOut(u.animationSpeed);
                return false
            });
            o.find(".pp_previous, .pp_arrow_previous").bind("click", function() {
                a.prettyPhoto.changePage("previous");
                return false
            });
            o.find(".pp_next, .pp_arrow_next").bind("click", function() {
                a.prettyPhoto.changePage("next");
                return false
            })
        }
        j()
    }
    ;
    function b(e, d) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var c = "[\\?&]" + e + "=([^&#]*)";
        var g = new RegExp(c);
        var f = g.exec(d);
        if (f == null) {
            return ""
        } else {
            return f[1]
        }
    }
}
)(jQuery);
(function(a, c) {
    a.ui = a.ui || {};
    if (a.ui.version) {
        return
    }
    a.extend(a.ui, {
        version: "1.8.7",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    });
    a.fn.extend({
        _focus: a.fn.focus,
        focus: function(d, e) {
            return typeof d === "number" ? this.each(function() {
                var f = this;
                setTimeout(function() {
                    a(f).focus();
                    if (e) {
                        e.call(f)
                    }
                }, d)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var d;
            if ((a.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                d = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(a.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                d = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !d.length ? a(document) : d
        },
        zIndex: function(g) {
            if (g !== c) {
                return this.css("zIndex", g)
            }
            if (this.length) {
                var e = a(this[0]), d, f;
                while (e.length && e[0] !== document) {
                    d = e.css("position");
                    if (d === "absolute" || d === "relative" || d === "fixed") {
                        f = parseInt(e.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) {
                            return f
                        }
                    }
                    e = e.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(d) {
                d.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    a.each(["Width", "Height"], function(f, d) {
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
          , g = d.toLowerCase()
          , j = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        function h(l, k, i, m) {
            a.each(e, function() {
                k -= parseFloat(a.curCSS(l, "padding" + this, true)) || 0;
                if (i) {
                    k -= parseFloat(a.curCSS(l, "border" + this + "Width", true)) || 0
                }
                if (m) {
                    k -= parseFloat(a.curCSS(l, "margin" + this, true)) || 0
                }
            });
            return k
        }
        a.fn["inner" + d] = function(i) {
            if (i === c) {
                return j["inner" + d].call(this)
            }
            return this.each(function() {
                a(this).css(g, h(this, i) + "px")
            })
        }
        ;
        a.fn["outer" + d] = function(i, k) {
            if (typeof i !== "number") {
                return j["outer" + d].call(this, i)
            }
            return this.each(function() {
                a(this).css(g, h(this, i, true, k) + "px")
            })
        }
    });
    function b(d) {
        return !a(d).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.extend(a.expr[":"], {
        data: function(f, e, d) {
            return !!a.data(f, d[3])
        },
        focusable: function(f) {
            var i = f.nodeName.toLowerCase()
              , d = a.attr(f, "tabindex");
            if ("area" === i) {
                var h = f.parentNode, g = h.name, e;
                if (!f.href || !g || h.nodeName.toLowerCase() !== "map") {
                    return false
                }
                e = a("img[usemap=#" + g + "]")[0];
                return !!e && b(e)
            }
            return (/input|select|textarea|button|object/.test(i) ? !f.disabled : "a" == i ? f.href || !isNaN(d) : !isNaN(d)) && b(f)
        },
        tabbable: function(e) {
            var d = a.attr(e, "tabindex");
            return (isNaN(d) || d >= 0) && a(e).is(":focusable")
        }
    });
    a(function() {
        var d = document.body
          , e = d.appendChild(e = document.createElement("div"));
        a.extend(e.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        a.support.minHeight = e.offsetHeight === 100;
        a.support.selectstart = "onselectstart"in e;
        d.removeChild(e).style.display = "none"
    });
    a.extend(a.ui, {
        plugin: {
            add: function(e, f, h) {
                var g = a.ui[e].prototype;
                for (var d in h) {
                    g.plugins[d] = g.plugins[d] || [];
                    g.plugins[d].push([f, h[d]])
                }
            },
            call: function(d, f, e) {
                var h = d.plugins[f];
                if (!h || !d.element[0].parentNode) {
                    return
                }
                for (var g = 0; g < h.length; g++) {
                    if (d.options[h[g][0]]) {
                        h[g][1].apply(d.element, e)
                    }
                }
            }
        },
        contains: function(e, d) {
            return document.compareDocumentPosition ? e.compareDocumentPosition(d) & 16 : e !== d && e.contains(d)
        },
        hasScroll: function(g, e) {
            if (a(g).css("overflow") === "hidden") {
                return false
            }
            var d = (e && e === "left") ? "scrollLeft" : "scrollTop"
              , f = false;
            if (g[d] > 0) {
                return true
            }
            g[d] = 1;
            f = (g[d] > 0);
            g[d] = 0;
            return f
        },
        isOverAxis: function(e, d, f) {
            return (e > d) && (e < (d + f))
        },
        isOver: function(i, e, h, g, d, f) {
            return a.ui.isOverAxis(i, h, d) && a.ui.isOverAxis(e, g, f)
        }
    })
}
)(jQuery);
(function(b, d) {
    if (b.cleanData) {
        var c = b.cleanData;
        b.cleanData = function(e) {
            for (var f = 0, g; (g = e[f]) != null; f++) {
                b(g).triggerHandler("remove")
            }
            c(e)
        }
    } else {
        var a = b.fn.remove;
        b.fn.remove = function(e, f) {
            return this.each(function() {
                if (!f) {
                    if (!e || b.filter(e, [this]).length) {
                        b("*", this).add([this]).each(function() {
                            b(this).triggerHandler("remove")
                        })
                    }
                }
                return a.call(b(this), e, f)
            })
        }
    }
    b.widget = function(f, h, e) {
        var g = f.split(".")[0], j;
        f = f.split(".")[1];
        j = g + "-" + f;
        if (!e) {
            e = h;
            h = b.Widget
        }
        b.expr[":"][j] = function(k) {
            return !!b.data(k, f)
        }
        ;
        b[g] = b[g] || {};
        b[g][f] = function(k, l) {
            if (arguments.length) {
                this._createWidget(k, l)
            }
        }
        ;
        var i = new h();
        i.options = b.extend(true, {}, i.options);
        b[g][f].prototype = b.extend(true, i, {
            namespace: g,
            widgetName: f,
            widgetEventPrefix: b[g][f].prototype.widgetEventPrefix || f,
            widgetBaseClass: j
        }, e);
        b.widget.bridge(f, b[g][f])
    }
    ;
    b.widget.bridge = function(f, e) {
        b.fn[f] = function(i) {
            var g = typeof i === "string"
              , h = Array.prototype.slice.call(arguments, 1)
              , j = this;
            i = !g && h.length ? b.extend.apply(null, [true, i].concat(h)) : i;
            if (g && i.charAt(0) === "_") {
                return j
            }
            if (g) {
                this.each(function() {
                    var k = b.data(this, f)
                      , l = k && b.isFunction(k[i]) ? k[i].apply(k, h) : k;
                    if (l !== k && l !== d) {
                        j = l;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var k = b.data(this, f);
                    if (k) {
                        k.option(i || {})._init()
                    } else {
                        b.data(this, f, new e(i,this))
                    }
                })
            }
            return j
        }
    }
    ;
    b.Widget = function(e, f) {
        if (arguments.length) {
            this._createWidget(e, f)
        }
    }
    ;
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(f, g) {
            b.data(g, this.widgetName, this);
            this.element = b(g);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), f);
            var e = this;
            this.element.bind("remove." + this.widgetName, function() {
                e.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(f, g) {
            var e = f;
            if (arguments.length === 0) {
                return b.extend({}, this.options)
            }
            if (typeof f === "string") {
                if (g === d) {
                    return this.options[f]
                }
                e = {};
                e[f] = g
            }
            this._setOptions(e);
            return this
        },
        _setOptions: function(f) {
            var e = this;
            b.each(f, function(g, h) {
                e._setOption(g, h)
            });
            return this
        },
        _setOption: function(e, f) {
            this.options[e] = f;
            if (e === "disabled") {
                this.widget()[f ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", f)
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(f, g, h) {
            var k = this.options[f];
            g = b.Event(g);
            g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
            h = h || {};
            if (g.originalEvent) {
                for (var e = b.event.props.length, j; e; ) {
                    j = b.event.props[--e];
                    g[j] = g.originalEvent[j]
                }
            }
            this.element.trigger(g, h);
            return !(b.isFunction(k) && k.call(this.element[0], g, h) === false || g.isDefaultPrevented())
        }
    }
}
)(jQuery);
(function(a, b) {
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function(d) {
                return c._mouseDown(d)
            }).bind("click." + this.widgetName, function(d) {
                if (true === a.data(d.target, c.widgetName + ".preventClickEvent")) {
                    a.removeData(d.target, c.widgetName + ".preventClickEvent");
                    d.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(e) {
            e.originalEvent = e.originalEvent || {};
            if (e.originalEvent.mouseHandled) {
                return
            }
            (this._mouseStarted && this._mouseUp(e));
            this._mouseDownEvent = e;
            var d = this
              , f = (e.which == 1)
              , c = (typeof this.options.cancel == "string" ? a(e.target).parents().add(e.target).filter(this.options.cancel).length : false);
            if (!f || c || !this._mouseCapture(e)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(e) && this._mouseDelayMet(e)) {
                this._mouseStarted = (this._mouseStart(e) !== false);
                if (!this._mouseStarted) {
                    e.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function(g) {
                return d._mouseMove(g)
            }
            ;
            this._mouseUpDelegate = function(g) {
                return d._mouseUp(g)
            }
            ;
            a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            e.preventDefault();
            e.originalEvent.mouseHandled = true;
            return true
        },
        _mouseMove: function(c) {
            if (a.browser.msie && !(document.documentMode >= 9) && !c.button) {
                return this._mouseUp(c)
            }
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault()
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, c) !== false);
                (this._mouseStarted ? this._mouseDrag(c) : this._mouseUp(c))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(c) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (c.target == this._mouseDownEvent.target) {
                    a.data(c.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(c)
            }
            return false
        },
        _mouseDistanceMet: function(c) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function(c) {
            return this.mouseDelayMet
        },
        _mouseStart: function(c) {},
        _mouseDrag: function(c) {},
        _mouseStop: function(c) {},
        _mouseCapture: function(c) {
            return true
        }
    })
}
)(jQuery);
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            (this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function() {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(c) {
            var d = this.options;
            if (this.helper || d.disabled || a(c.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(c);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function(c) {
            var d = this.options;
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            (d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt));
            if (d.containment) {
                this._setContainment()
            }
            if (this._trigger("start", c) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !d.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, c)
            }
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(c, true);
            return true
        },
        _mouseDrag: function(c, e) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!e) {
                var d = this._uiHash();
                if (this._trigger("drag", c, d) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, c)
            }
            return false
        },
        _mouseStop: function(d) {
            var e = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                e = a.ui.ddmanager.drop(this, d)
            }
            if (this.dropped) {
                e = this.dropped;
                this.dropped = false
            }
            if (!this.element[0] || !this.element[0].parentNode) {
                return false
            }
            if ((this.options.revert == "invalid" && !e) || (this.options.revert == "valid" && e) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, e))) {
                var c = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (c._trigger("stop", d) !== false) {
                        c._clear()
                    }
                })
            } else {
                if (this._trigger("stop", d) !== false) {
                    this._clear()
                }
            }
            return false
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(c) {
            var d = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == c.target) {
                    d = true
                }
            });
            return d
        },
        _createHelper: function(d) {
            var e = this.options;
            var c = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d])) : (e.helper == "clone" ? this.element.clone() : this.element);
            if (!c.parents("body").length) {
                c.appendTo((e.appendTo == "parent" ? this.element[0].parentNode : e.appendTo))
            }
            if (c[0] != this.element[0] && !(/(fixed|absolute)/).test(c.css("position"))) {
                c.css("position", "absolute")
            }
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") {
                c = c.split(" ")
            }
            if (a.isArray(c)) {
                c = {
                    left: +c[0],
                    top: +c[1] || 0
                }
            }
            if ("left"in c) {
                this.offset.click.left = c.left + this.margins.left
            }
            if ("right"in c) {
                this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
            }
            if ("top"in c) {
                this.offset.click.top = c.top + this.margins.top
            }
            if ("bottom"in c) {
                this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                c = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.element.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var f = this.options;
            if (f.containment == "parent") {
                f.containment = this.helper[0].parentNode
            }
            if (f.containment == "document" || f.containment == "window") {
                this.containment = [(f.containment == "document" ? 0 : a(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (f.containment == "document" ? 0 : a(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (f.containment == "document" ? 0 : a(window).scrollLeft()) + a(f.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (f.containment == "document" ? 0 : a(window).scrollTop()) + (a(f.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(f.containment) && f.containment.constructor != Array) {
                var d = a(f.containment)[0];
                if (!d) {
                    return
                }
                var e = a(f.containment).offset();
                var c = (a(d).css("overflow") != "hidden");
                this.containment = [e.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (c ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (c ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (f.containment.constructor == Array) {
                    this.containment = f.containment
                }
            }
        },
        _convertPositionTo: function(g, i) {
            if (!i) {
                i = this.position
            }
            var e = g == "absolute" ? 1 : -1;
            var f = this.options
              , c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , h = (/(html|body)/i).test(c[0].tagName);
            return {
                top: (i.top + this.offset.relative.top * e + this.offset.parent.top * e - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (h ? 0 : c.scrollTop())) * e)),
                left: (i.left + this.offset.relative.left * e + this.offset.parent.left * e - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : c.scrollLeft()) * e))
            }
        },
        _generatePosition: function(f) {
            var i = this.options
              , c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , j = (/(html|body)/i).test(c[0].tagName);
            var e = f.pageX;
            var d = f.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (f.pageX - this.offset.click.left < this.containment[0]) {
                        e = this.containment[0] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top < this.containment[1]) {
                        d = this.containment[1] + this.offset.click.top
                    }
                    if (f.pageX - this.offset.click.left > this.containment[2]) {
                        e = this.containment[2] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top > this.containment[3]) {
                        d = this.containment[3] + this.offset.click.top
                    }
                }
                if (i.grid) {
                    var h = this.originalPageY + Math.round((d - this.originalPageY) / i.grid[1]) * i.grid[1];
                    d = this.containment ? (!(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h : (!(h - this.offset.click.top < this.containment[1]) ? h - i.grid[1] : h + i.grid[1])) : h;
                    var g = this.originalPageX + Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0];
                    e = this.containment ? (!(g - this.offset.click.left < this.containment[0] || g - this.offset.click.left > this.containment[2]) ? g : (!(g - this.offset.click.left < this.containment[0]) ? g - i.grid[0] : g + i.grid[0])) : g
                }
            }
            return {
                top: (d - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : c.scrollTop())))),
                left: (e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : c.scrollLeft())))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(c, d, e) {
            e = e || this._uiHash();
            a.ui.plugin.call(this, c, [d, e]);
            if (c == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.Widget.prototype._trigger.call(this, c, d, e)
        },
        plugins: {},
        _uiHash: function(c) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.extend(a.ui.draggable, {
        version: "1.8.7"
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(d, f) {
            var e = a(this).data("draggable")
              , g = e.options
              , c = a.extend({}, f, {
                item: e.element
            });
            e.sortables = [];
            a(g.connectToSortable).each(function() {
                var h = a.data(this, "sortable");
                if (h && !h.options.disabled) {
                    e.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h._refreshItems();
                    h._trigger("activate", d, c)
                }
            })
        },
        stop: function(d, f) {
            var e = a(this).data("draggable")
              , c = a.extend({}, f, {
                item: e.element
            });
            a.each(e.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    e.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(d);
                    this.instance.options.helper = this.instance.options._helper;
                    if (e.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", d, c)
                }
            })
        },
        drag: function(d, g) {
            var f = a(this).data("draggable")
              , c = this;
            var e = function(j) {
                var p = this.offset.click.top
                  , n = this.offset.click.left;
                var h = this.positionAbs.top
                  , l = this.positionAbs.left;
                var k = j.height
                  , m = j.width;
                var q = j.top
                  , i = j.left;
                return a.ui.isOver(h + p, l + n, q, i, k, m)
            };
            a.each(f.sortables, function(h) {
                this.instance.positionAbs = f.positionAbs;
                this.instance.helperProportions = f.helperProportions;
                this.instance.offset.click = f.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(c).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return g.helper[0]
                        }
                        ;
                        d.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(d, true);
                        this.instance._mouseStart(d, true, true);
                        this.instance.offset.click.top = f.offset.click.top;
                        this.instance.offset.click.left = f.offset.click.left;
                        this.instance.offset.parent.left -= f.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= f.offset.parent.top - this.instance.offset.parent.top;
                        f._trigger("toSortable", d);
                        f.dropped = this.instance.element;
                        f.currentItem = f.element;
                        this.instance.fromOutside = f
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(d)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", d, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(d, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        f._trigger("fromSortable", d);
                        f.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function(d, e) {
            var c = a("body")
              , f = a(this).data("draggable").options;
            if (c.css("cursor")) {
                f._cursor = c.css("cursor")
            }
            c.css("cursor", f.cursor)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._cursor) {
                a("body").css("cursor", e._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function(c, d) {
            var e = a(this).data("draggable").options;
            a(e.iframeFix === true ? "iframe" : e.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            })
        },
        stop: function(c, d) {
            a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(d, e) {
            var c = a(e.helper)
              , f = a(this).data("draggable").options;
            if (c.css("opacity")) {
                f._opacity = c.css("opacity")
            }
            c.css("opacity", f.opacity)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._opacity) {
                a(d.helper).css("opacity", e._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function(d, e) {
            var c = a(this).data("draggable");
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                c.overflowOffset = c.scrollParent.offset()
            }
        },
        drag: function(e, f) {
            var d = a(this).data("draggable")
              , g = d.options
              , c = false;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!g.axis || g.axis != "x") {
                    if ((d.overflowOffset.top + d.scrollParent[0].offsetHeight) - e.pageY < g.scrollSensitivity) {
                        d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (e.pageY - d.overflowOffset.top < g.scrollSensitivity) {
                            d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                }
                if (!g.axis || g.axis != "y") {
                    if ((d.overflowOffset.left + d.scrollParent[0].offsetWidth) - e.pageX < g.scrollSensitivity) {
                        d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (e.pageX - d.overflowOffset.left < g.scrollSensitivity) {
                            d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                }
            } else {
                if (!g.axis || g.axis != "x") {
                    if (e.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        c = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (e.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            c = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                }
                if (!g.axis || g.axis != "y") {
                    if (e.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        c = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (e.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            c = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
            }
            if (c !== false && a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(d, e)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function(d, e) {
            var c = a(this).data("draggable")
              , f = c.options;
            c.snapElements = [];
            a(f.snap.constructor != String ? (f.snap.items || ":data(draggable)") : f.snap).each(function() {
                var h = a(this);
                var g = h.offset();
                if (this != c.element[0]) {
                    c.snapElements.push({
                        item: this,
                        width: h.outerWidth(),
                        height: h.outerHeight(),
                        top: g.top,
                        left: g.left
                    })
                }
            })
        },
        drag: function(u, p) {
            var g = a(this).data("draggable")
              , q = g.options;
            var y = q.snapTolerance;
            var x = p.offset.left
              , w = x + g.helperProportions.width
              , f = p.offset.top
              , e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left
                  , n = s + g.snapElements[v].width
                  , m = g.snapElements[v].top
                  , A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {
                            snapItem: g.snapElements[v].item
                        })))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n - g.helperProportions.width
                        }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {
                        snapItem: g.snapElements[v].item
                    })))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function(d, e) {
            var g = a(this).data("draggable").options;
            var f = a.makeArray(a(g.stack)).sort(function(i, h) {
                return (parseInt(a(i).css("zIndex"), 10) || 0) - (parseInt(a(h).css("zIndex"), 10) || 0)
            });
            if (!f.length) {
                return
            }
            var c = parseInt(f[0].style.zIndex) || 0;
            a(f).each(function(h) {
                this.style.zIndex = c + h
            });
            this[0].style.zIndex = c + f.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(d, e) {
            var c = a(e.helper)
              , f = a(this).data("draggable").options;
            if (c.css("zIndex")) {
                f._zIndex = c.css("zIndex")
            }
            c.css("zIndex", f.zIndex)
        },
        stop: function(c, d) {
            var e = a(this).data("draggable").options;
            if (e._zIndex) {
                a(d.helper).css("zIndex", e._zIndex)
            }
        }
    })
}
)(jQuery);
(function(a, b) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var d = this.options
              , c = d.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = a.isFunction(c) ? c : function(e) {
                return e.is(c)
            }
            ;
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[d.scope] = a.ui.ddmanager.droppables[d.scope] || [];
            a.ui.ddmanager.droppables[d.scope].push(this);
            (d.addClasses && this.element.addClass("ui-droppable"))
        },
        destroy: function() {
            var c = a.ui.ddmanager.droppables[this.options.scope];
            for (var d = 0; d < c.length; d++) {
                if (c[d] == this) {
                    c.splice(d, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function(c, d) {
            if (c == "accept") {
                this.accept = a.isFunction(d) ? d : function(e) {
                    return e.is(d)
                }
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(d) {
            var c = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            (c && this._trigger("activate", d, this.ui(c)))
        },
        _deactivate: function(d) {
            var c = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            (c && this._trigger("deactivate", d, this.ui(c)))
        },
        _over: function(d) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", d, this.ui(c))
            }
        },
        _out: function(d) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", d, this.ui(c))
            }
        },
        _drop: function(d, e) {
            var c = e || a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) {
                return false
            }
            var f = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var g = a.data(this, "droppable");
                if (g.options.greedy && !g.options.disabled && g.options.scope == c.options.scope && g.accept.call(g.element[0], (c.currentItem || c.element)) && a.ui.intersect(c, a.extend(g, {
                    offset: g.element.offset()
                }), g.options.tolerance)) {
                    f = true;
                    return false
                }
            });
            if (f) {
                return false
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", d, this.ui(c));
                return this.element
            }
            return false
        },
        ui: function(d) {
            return {
                draggable: (d.currentItem || d.element),
                helper: d.helper,
                position: d.position,
                offset: d.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.8.7"
    });
    a.ui.intersect = function(q, j, o) {
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left
          , d = e + q.helperProportions.width
          , n = (q.positionAbs || q.position.absolute).top
          , m = n + q.helperProportions.height;
        var g = j.offset.left
          , c = g + j.proportions.width
          , p = j.offset.top
          , k = p + j.proportions.height;
        switch (o) {
        case "fit":
            return (g <= e && d <= c && p <= n && m <= k);
            break;
        case "intersect":
            return (g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);
            break;
        case "pointer":
            var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left)
              , i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top)
              , f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);
            return f;
            break;
        case "touch":
            return ((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
            break;
        default:
            return false;
            break
        }
    }
    ;
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(f, h) {
            var c = a.ui.ddmanager.droppables[f.options.scope] || [];
            var g = h ? h.type : null;
            var k = (f.currentItem || f.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var e = 0; e < c.length; e++) {
                if (c[e].options.disabled || (f && !c[e].accept.call(c[e].element[0], (f.currentItem || f.element)))) {
                    continue
                }
                for (var d = 0; d < k.length; d++) {
                    if (k[d] == c[e].element[0]) {
                        c[e].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                c[e].visible = c[e].element.css("display") != "none";
                if (!c[e].visible) {
                    continue
                }
                c[e].offset = c[e].element.offset();
                c[e].proportions = {
                    width: c[e].element[0].offsetWidth,
                    height: c[e].element[0].offsetHeight
                };
                if (g == "mousedown") {
                    c[e]._activate.call(c[e], h)
                }
            }
        },
        drop: function(c, d) {
            var e = false;
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(c, this, this.options.tolerance)) {
                    e = e || this._drop.call(this, d)
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (c.currentItem || c.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, d)
                }
            });
            return e
        },
        drag: function(c, d) {
            if (c.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var f = a.ui.intersect(c, this, this.options.tolerance);
                var h = !f && this.isover == 1 ? "isout" : (f && this.isover == 0 ? "isover" : null);
                if (!h) {
                    return
                }
                var g;
                if (this.options.greedy) {
                    var e = this.element.parents(":data(droppable):eq(0)");
                    if (e.length) {
                        g = a.data(e[0], "droppable");
                        g.greedyChild = (h == "isover" ? 1 : 0)
                    }
                }
                if (g && h == "isover") {
                    g.isover = 0;
                    g.isout = 1;
                    g._out.call(g, d)
                }
                this[h] = 1;
                this[h == "isout" ? "isover" : "isout"] = 0;
                this[h == "isover" ? "_over" : "_out"].call(this, d);
                if (g && h == "isout") {
                    g.isout = 0;
                    g.isover = 1;
                    g._over.call(g, d)
                }
            })
        }
    }
}
)(jQuery);
(function(c, d) {
    c.widget("ui.resizable", c.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function() {
            var f = this
              , k = this.options;
            this.element.addClass("ui-resizable");
            c.extend(this, {
                _aspectRatio: !!(k.aspectRatio),
                aspectRatio: k.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: k.helper || k.ghost || k.animate ? k.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                if (/relative/.test(this.element.css("position")) && c.browser.opera) {
                    this.element.css({
                        position: "relative",
                        top: "auto",
                        left: "auto"
                    })
                }
                this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = k.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var l = this.handles.split(",");
                this.handles = {};
                for (var g = 0; g < l.length; g++) {
                    var j = c.trim(l[g])
                      , e = "ui-resizable-" + j;
                    var h = c('<div class="ui-resizable-handle ' + e + '"></div>');
                    if (/sw|se|ne|nw/.test(j)) {
                        h.css({
                            zIndex: ++k.zIndex
                        })
                    }
                    if ("se" == j) {
                        h.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[j] = ".ui-resizable-" + j;
                    this.element.append(h)
                }
            }
            this._renderAxis = function(q) {
                q = q || this.element;
                for (var n in this.handles) {
                    if (this.handles[n].constructor == String) {
                        this.handles[n] = c(this.handles[n], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var o = c(this.handles[n], this.element)
                          , p = 0;
                        p = /sw|ne|nw|se|n|s/.test(n) ? o.outerHeight() : o.outerWidth();
                        var m = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                        q.css(m, p);
                        this._proportionallyResize()
                    }
                    if (!c(this.handles[n]).length) {
                        continue
                    }
                }
            }
            ;
            this._renderAxis(this.element);
            this._handles = c(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!f.resizing) {
                    if (this.className) {
                        var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    f.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (k.autoHide) {
                this._handles.hide();
                c(this.element).addClass("ui-resizable-autohide").hover(function() {
                    c(this).removeClass("ui-resizable-autohide");
                    f._handles.show()
                }, function() {
                    if (!f.resizing) {
                        c(this).addClass("ui-resizable-autohide");
                        f._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var e = function(g) {
                c(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                e(this.element);
                var f = this.element;
                f.after(this.originalElement.css({
                    position: f.css("position"),
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: f.css("top"),
                    left: f.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            e(this.originalElement);
            return this
        },
        _mouseCapture: function(f) {
            var g = false;
            for (var e in this.handles) {
                if (c(this.handles[e])[0] == f.target) {
                    g = true
                }
            }
            return !this.options.disabled && g
        },
        _mouseStart: function(g) {
            var j = this.options
              , f = this.element.position()
              , e = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: c(document).scrollTop(),
                left: c(document).scrollLeft()
            };
            if (e.is(".ui-draggable") || (/absolute/).test(e.css("position"))) {
                e.css({
                    position: "absolute",
                    top: f.top,
                    left: f.left
                })
            }
            if (c.browser.opera && (/relative/).test(e.css("position"))) {
                e.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                })
            }
            this._renderProxy();
            var k = b(this.helper.css("left"))
              , h = b(this.helper.css("top"));
            if (j.containment) {
                k += c(j.containment).scrollLeft() || 0;
                h += c(j.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: k,
                top: h
            };
            this.size = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalSize = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalPosition = {
                left: k,
                top: h
            };
            this.sizeDiff = {
                width: e.outerWidth() - e.width(),
                height: e.outerHeight() - e.height()
            };
            this.originalMousePosition = {
                left: g.pageX,
                top: g.pageY
            };
            this.aspectRatio = (typeof j.aspectRatio == "number") ? j.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            var i = c(".ui-resizable-" + this.axis).css("cursor");
            c("body").css("cursor", i == "auto" ? this.axis + "-resize" : i);
            e.addClass("ui-resizable-resizing");
            this._propagate("start", g);
            return true
        },
        _mouseDrag: function(e) {
            var h = this.helper
              , g = this.options
              , m = {}
              , q = this
              , j = this.originalMousePosition
              , n = this.axis;
            var r = (e.pageX - j.left) || 0
              , p = (e.pageY - j.top) || 0;
            var i = this._change[n];
            if (!i) {
                return false
            }
            var l = i.apply(this, [e, r, p])
              , k = c.browser.msie && c.browser.version < 7
              , f = this.sizeDiff;
            if (this._aspectRatio || e.shiftKey) {
                l = this._updateRatio(l, e)
            }
            l = this._respectSize(l, e);
            this._propagate("resize", e);
            h.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            this._updateCache(l);
            this._trigger("resize", e, this.ui());
            return false
        },
        _mouseStop: function(h) {
            this.resizing = false;
            var i = this.options
              , m = this;
            if (this._helper) {
                var g = this._proportionallyResizeElements
                  , e = g.length && (/textarea/i).test(g[0].nodeName)
                  , f = e && c.ui.hasScroll(g[0], "left") ? 0 : m.sizeDiff.height
                  , k = e ? 0 : m.sizeDiff.width;
                var n = {
                    width: (m.size.width - k),
                    height: (m.size.height - f)
                }
                  , j = (parseInt(m.element.css("left"), 10) + (m.position.left - m.originalPosition.left)) || null
                  , l = (parseInt(m.element.css("top"), 10) + (m.position.top - m.originalPosition.top)) || null;
                if (!i.animate) {
                    this.element.css(c.extend(n, {
                        top: l,
                        left: j
                    }))
                }
                m.helper.height(m.size.height);
                m.helper.width(m.size.width);
                if (this._helper && !i.animate) {
                    this._proportionallyResize()
                }
            }
            c("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", h);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateCache: function(e) {
            var f = this.options;
            this.offset = this.helper.offset();
            if (a(e.left)) {
                this.position.left = e.left
            }
            if (a(e.top)) {
                this.position.top = e.top
            }
            if (a(e.height)) {
                this.size.height = e.height
            }
            if (a(e.width)) {
                this.size.width = e.width
            }
        },
        _updateRatio: function(h, g) {
            var i = this.options
              , j = this.position
              , f = this.size
              , e = this.axis;
            if (h.height) {
                h.width = (f.height * this.aspectRatio)
            } else {
                if (h.width) {
                    h.height = (f.width / this.aspectRatio)
                }
            }
            if (e == "sw") {
                h.left = j.left + (f.width - h.width);
                h.top = null
            }
            if (e == "nw") {
                h.top = j.top + (f.height - h.height);
                h.left = j.left + (f.width - h.width)
            }
            return h
        },
        _respectSize: function(l, g) {
            var j = this.helper
              , i = this.options
              , r = this._aspectRatio || g.shiftKey
              , q = this.axis
              , u = a(l.width) && i.maxWidth && (i.maxWidth < l.width)
              , m = a(l.height) && i.maxHeight && (i.maxHeight < l.height)
              , h = a(l.width) && i.minWidth && (i.minWidth > l.width)
              , s = a(l.height) && i.minHeight && (i.minHeight > l.height);
            if (h) {
                l.width = i.minWidth
            }
            if (s) {
                l.height = i.minHeight
            }
            if (u) {
                l.width = i.maxWidth
            }
            if (m) {
                l.height = i.maxHeight
            }
            var f = this.originalPosition.left + this.originalSize.width
              , p = this.position.top + this.size.height;
            var k = /sw|nw|w/.test(q)
              , e = /nw|ne|n/.test(q);
            if (h && k) {
                l.left = f - i.minWidth
            }
            if (u && k) {
                l.left = f - i.maxWidth
            }
            if (s && e) {
                l.top = p - i.minHeight
            }
            if (m && e) {
                l.top = p - i.maxHeight
            }
            var n = !l.width && !l.height;
            if (n && !l.left && l.top) {
                l.top = null
            } else {
                if (n && !l.top && l.left) {
                    l.left = null
                }
            }
            return l
        },
        _proportionallyResize: function() {
            var k = this.options;
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var g = this.helper || this.element;
            for (var f = 0; f < this._proportionallyResizeElements.length; f++) {
                var h = this._proportionallyResizeElements[f];
                if (!this.borderDif) {
                    var e = [h.css("borderTopWidth"), h.css("borderRightWidth"), h.css("borderBottomWidth"), h.css("borderLeftWidth")]
                      , j = [h.css("paddingTop"), h.css("paddingRight"), h.css("paddingBottom"), h.css("paddingLeft")];
                    this.borderDif = c.map(e, function(l, n) {
                        var m = parseInt(l, 10) || 0
                          , o = parseInt(j[n], 10) || 0;
                        return m + o
                    })
                }
                if (c.browser.msie && !(!(c(g).is(":hidden") || c(g).parents(":hidden").length))) {
                    continue
                }
                h.css({
                    height: (g.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (g.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function() {
            var f = this.element
              , i = this.options;
            this.elementOffset = f.offset();
            if (this._helper) {
                this.helper = this.helper || c('<div style="overflow:hidden;"></div>');
                var e = c.browser.msie && c.browser.version < 7
                  , g = (e ? 1 : 0)
                  , h = (e ? 2 : -1);
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + h,
                    height: this.element.outerHeight() + h,
                    position: "absolute",
                    left: this.elementOffset.left - g + "px",
                    top: this.elementOffset.top - g + "px",
                    zIndex: ++i.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(g, f, e) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function(h, f, e) {
                var j = this.options
                  , g = this.originalSize
                  , i = this.originalPosition;
                return {
                    left: i.left + f,
                    width: g.width - f
                }
            },
            n: function(h, f, e) {
                var j = this.options
                  , g = this.originalSize
                  , i = this.originalPosition;
                return {
                    top: i.top + e,
                    height: g.height - e
                }
            },
            s: function(g, f, e) {
                return {
                    height: this.originalSize.height + e
                }
            },
            se: function(g, f, e) {
                return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
            },
            sw: function(g, f, e) {
                return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
            },
            ne: function(g, f, e) {
                return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
            },
            nw: function(g, f, e) {
                return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
            }
        },
        _propagate: function(f, e) {
            c.ui.plugin.call(this, f, [e, this.ui()]);
            (f != "resize" && this._trigger(f, e, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    c.extend(c.ui.resizable, {
        version: "1.8.7"
    });
    c.ui.plugin.add("resizable", "alsoResize", {
        start: function(f, g) {
            var e = c(this).data("resizable")
              , i = e.options;
            var h = function(j) {
                c(j).each(function() {
                    var k = c(this);
                    k.data("resizable-alsoresize", {
                        width: parseInt(k.width(), 10),
                        height: parseInt(k.height(), 10),
                        left: parseInt(k.css("left"), 10),
                        top: parseInt(k.css("top"), 10),
                        position: k.css("position")
                    })
                })
            };
            if (typeof (i.alsoResize) == "object" && !i.alsoResize.parentNode) {
                if (i.alsoResize.length) {
                    i.alsoResize = i.alsoResize[0];
                    h(i.alsoResize)
                } else {
                    c.each(i.alsoResize, function(j) {
                        h(j)
                    })
                }
            } else {
                h(i.alsoResize)
            }
        },
        resize: function(g, i) {
            var f = c(this).data("resizable")
              , j = f.options
              , h = f.originalSize
              , l = f.originalPosition;
            var k = {
                height: (f.size.height - h.height) || 0,
                width: (f.size.width - h.width) || 0,
                top: (f.position.top - l.top) || 0,
                left: (f.position.left - l.left) || 0
            }
              , e = function(m, n) {
                c(m).each(function() {
                    var q = c(this)
                      , r = c(this).data("resizable-alsoresize")
                      , p = {}
                      , o = n && n.length ? n : q.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    c.each(o, function(s, v) {
                        var u = (r[v] || 0) + (k[v] || 0);
                        if (u && u >= 0) {
                            p[v] = u || null
                        }
                    });
                    if (c.browser.opera && /relative/.test(q.css("position"))) {
                        f._revertToRelativePosition = true;
                        q.css({
                            position: "absolute",
                            top: "auto",
                            left: "auto"
                        })
                    }
                    q.css(p)
                })
            };
            if (typeof (j.alsoResize) == "object" && !j.alsoResize.nodeType) {
                c.each(j.alsoResize, function(m, n) {
                    e(m, n)
                })
            } else {
                e(j.alsoResize)
            }
        },
        stop: function(g, h) {
            var f = c(this).data("resizable")
              , i = f.options;
            var e = function(j) {
                c(j).each(function() {
                    var k = c(this);
                    k.css({
                        position: k.data("resizable-alsoresize").position
                    })
                })
            };
            if (f._revertToRelativePosition) {
                f._revertToRelativePosition = false;
                if (typeof (i.alsoResize) == "object" && !i.alsoResize.nodeType) {
                    c.each(i.alsoResize, function(j) {
                        e(j)
                    })
                } else {
                    e(i.alsoResize)
                }
            }
            c(this).removeData("resizable-alsoresize")
        }
    });
    c.ui.plugin.add("resizable", "animate", {
        stop: function(i, n) {
            var p = c(this).data("resizable")
              , j = p.options;
            var h = p._proportionallyResizeElements
              , e = h.length && (/textarea/i).test(h[0].nodeName)
              , f = e && c.ui.hasScroll(h[0], "left") ? 0 : p.sizeDiff.height
              , l = e ? 0 : p.sizeDiff.width;
            var g = {
                width: (p.size.width - l),
                height: (p.size.height - f)
            }
              , k = (parseInt(p.element.css("left"), 10) + (p.position.left - p.originalPosition.left)) || null
              , m = (parseInt(p.element.css("top"), 10) + (p.position.top - p.originalPosition.top)) || null;
            p.element.animate(c.extend(g, m && k ? {
                top: m,
                left: k
            } : {}), {
                duration: j.animateDuration,
                easing: j.animateEasing,
                step: function() {
                    var o = {
                        width: parseInt(p.element.css("width"), 10),
                        height: parseInt(p.element.css("height"), 10),
                        top: parseInt(p.element.css("top"), 10),
                        left: parseInt(p.element.css("left"), 10)
                    };
                    if (h && h.length) {
                        c(h[0]).css({
                            width: o.width,
                            height: o.height
                        })
                    }
                    p._updateCache(o);
                    p._propagate("resize", i)
                }
            })
        }
    });
    c.ui.plugin.add("resizable", "containment", {
        start: function(f, r) {
            var u = c(this).data("resizable")
              , j = u.options
              , l = u.element;
            var g = j.containment
              , k = (g instanceof c) ? g.get(0) : (/parent/.test(g)) ? l.parent().get(0) : g;
            if (!k) {
                return
            }
            u.containerElement = c(k);
            if (/document/.test(g) || g == document) {
                u.containerOffset = {
                    left: 0,
                    top: 0
                };
                u.containerPosition = {
                    left: 0,
                    top: 0
                };
                u.parentData = {
                    element: c(document),
                    left: 0,
                    top: 0,
                    width: c(document).width(),
                    height: c(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var n = c(k)
                  , i = [];
                c(["Top", "Right", "Left", "Bottom"]).each(function(p, o) {
                    i[p] = b(n.css("padding" + o))
                });
                u.containerOffset = n.offset();
                u.containerPosition = n.position();
                u.containerSize = {
                    height: (n.innerHeight() - i[3]),
                    width: (n.innerWidth() - i[1])
                };
                var q = u.containerOffset
                  , e = u.containerSize.height
                  , m = u.containerSize.width
                  , h = (c.ui.hasScroll(k, "left") ? k.scrollWidth : m)
                  , s = (c.ui.hasScroll(k) ? k.scrollHeight : e);
                u.parentData = {
                    element: k,
                    left: q.left,
                    top: q.top,
                    width: h,
                    height: s
                }
            }
        },
        resize: function(g, q) {
            var u = c(this).data("resizable")
              , i = u.options
              , f = u.containerSize
              , p = u.containerOffset
              , m = u.size
              , n = u.position
              , r = u._aspectRatio || g.shiftKey
              , e = {
                top: 0,
                left: 0
            }
              , h = u.containerElement;
            if (h[0] != document && (/static/).test(h.css("position"))) {
                e = p
            }
            if (n.left < (u._helper ? p.left : 0)) {
                u.size.width = u.size.width + (u._helper ? (u.position.left - p.left) : (u.position.left - e.left));
                if (r) {
                    u.size.height = u.size.width / i.aspectRatio
                }
                u.position.left = i.helper ? p.left : 0
            }
            if (n.top < (u._helper ? p.top : 0)) {
                u.size.height = u.size.height + (u._helper ? (u.position.top - p.top) : u.position.top);
                if (r) {
                    u.size.width = u.size.height * i.aspectRatio
                }
                u.position.top = u._helper ? p.top : 0
            }
            u.offset.left = u.parentData.left + u.position.left;
            u.offset.top = u.parentData.top + u.position.top;
            var l = Math.abs((u._helper ? u.offset.left - e.left : (u.offset.left - e.left)) + u.sizeDiff.width)
              , s = Math.abs((u._helper ? u.offset.top - e.top : (u.offset.top - p.top)) + u.sizeDiff.height);
            var k = u.containerElement.get(0) == u.element.parent().get(0)
              , j = /relative|absolute/.test(u.containerElement.css("position"));
            if (k && j) {
                l -= u.parentData.left
            }
            if (l + u.size.width >= u.parentData.width) {
                u.size.width = u.parentData.width - l;
                if (r) {
                    u.size.height = u.size.width / u.aspectRatio
                }
            }
            if (s + u.size.height >= u.parentData.height) {
                u.size.height = u.parentData.height - s;
                if (r) {
                    u.size.width = u.size.height * u.aspectRatio
                }
            }
        },
        stop: function(f, n) {
            var q = c(this).data("resizable")
              , g = q.options
              , l = q.position
              , m = q.containerOffset
              , e = q.containerPosition
              , i = q.containerElement;
            var j = c(q.helper)
              , r = j.offset()
              , p = j.outerWidth() - q.sizeDiff.width
              , k = j.outerHeight() - q.sizeDiff.height;
            if (q._helper && !g.animate && (/relative/).test(i.css("position"))) {
                c(this).css({
                    left: r.left - e.left - m.left,
                    width: p,
                    height: k
                })
            }
            if (q._helper && !g.animate && (/static/).test(i.css("position"))) {
                c(this).css({
                    left: r.left - e.left - m.left,
                    width: p,
                    height: k
                })
            }
        }
    });
    c.ui.plugin.add("resizable", "ghost", {
        start: function(g, h) {
            var e = c(this).data("resizable")
              , i = e.options
              , f = e.size;
            e.ghost = e.originalElement.clone();
            e.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: f.height,
                width: f.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : "");
            e.ghost.appendTo(e.helper)
        },
        resize: function(f, g) {
            var e = c(this).data("resizable")
              , h = e.options;
            if (e.ghost) {
                e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            }
        },
        stop: function(f, g) {
            var e = c(this).data("resizable")
              , h = e.options;
            if (e.ghost && e.helper) {
                e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }
    });
    c.ui.plugin.add("resizable", "grid", {
        resize: function(e, m) {
            var p = c(this).data("resizable")
              , h = p.options
              , k = p.size
              , i = p.originalSize
              , j = p.originalPosition
              , n = p.axis
              , l = h._aspectRatio || e.shiftKey;
            h.grid = typeof h.grid == "number" ? [h.grid, h.grid] : h.grid;
            var g = Math.round((k.width - i.width) / (h.grid[0] || 1)) * (h.grid[0] || 1)
              , f = Math.round((k.height - i.height) / (h.grid[1] || 1)) * (h.grid[1] || 1);
            if (/^(se|s|e)$/.test(n)) {
                p.size.width = i.width + g;
                p.size.height = i.height + f
            } else {
                if (/^(ne)$/.test(n)) {
                    p.size.width = i.width + g;
                    p.size.height = i.height + f;
                    p.position.top = j.top - f
                } else {
                    if (/^(sw)$/.test(n)) {
                        p.size.width = i.width + g;
                        p.size.height = i.height + f;
                        p.position.left = j.left - g
                    } else {
                        p.size.width = i.width + g;
                        p.size.height = i.height + f;
                        p.position.top = j.top - f;
                        p.position.left = j.left - g
                    }
                }
            }
        }
    });
    var b = function(e) {
        return parseInt(e, 10) || 0
    };
    var a = function(e) {
        return !isNaN(parseInt(e, 10))
    }
}
)(jQuery);
(function(a, b) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var d;
            this.refresh = function() {
                d = a(c.options.filter, c.element[0]);
                d.each(function() {
                    var e = a(this);
                    var f = e.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: f.left,
                        top: f.top,
                        right: f.left + e.outerWidth(),
                        bottom: f.top + e.outerHeight(),
                        startselected: false,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }
            ;
            this.refresh();
            this.selectees = d.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function(e) {
            var c = this;
            this.opos = [e.pageX, e.pageY];
            if (this.options.disabled) {
                return
            }
            var d = this.options;
            this.selectees = a(d.filter, this.element[0]);
            this._trigger("start", e);
            a(d.appendTo).append(this.helper);
            this.helper.css({
                left: e.clientX,
                top: e.clientY,
                width: 0,
                height: 0
            });
            if (d.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function() {
                var f = a.data(this, "selectable-item");
                f.startselected = true;
                if (!e.metaKey) {
                    f.$element.removeClass("ui-selected");
                    f.selected = false;
                    f.$element.addClass("ui-unselecting");
                    f.unselecting = true;
                    c._trigger("unselecting", e, {
                        unselecting: f.element
                    })
                }
            });
            a(e.target).parents().andSelf().each(function() {
                var g = a.data(this, "selectable-item");
                if (g) {
                    var f = !e.metaKey || !g.$element.hasClass("ui-selected");
                    g.$element.removeClass(f ? "ui-unselecting" : "ui-selected").addClass(f ? "ui-selecting" : "ui-unselecting");
                    g.unselecting = !f;
                    g.selecting = f;
                    g.selected = f;
                    if (f) {
                        c._trigger("selecting", e, {
                            selecting: g.element
                        })
                    } else {
                        c._trigger("unselecting", e, {
                            unselecting: g.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function(j) {
            var d = this;
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var f = this.options;
            var e = this.opos[0]
              , i = this.opos[1]
              , c = j.pageX
              , h = j.pageY;
            if (e > c) {
                var g = c;
                c = e;
                e = g
            }
            if (i > h) {
                var g = h;
                h = i;
                i = g
            }
            this.helper.css({
                left: e,
                top: i,
                width: c - e,
                height: h - i
            });
            this.selectees.each(function() {
                var k = a.data(this, "selectable-item");
                if (!k || k.element == d.element[0]) {
                    return
                }
                var l = false;
                if (f.tolerance == "touch") {
                    l = (!(k.left > c || k.right < e || k.top > h || k.bottom < i))
                } else {
                    if (f.tolerance == "fit") {
                        l = (k.left > e && k.right < c && k.top > i && k.bottom < h)
                    }
                }
                if (l) {
                    if (k.selected) {
                        k.$element.removeClass("ui-selected");
                        k.selected = false
                    }
                    if (k.unselecting) {
                        k.$element.removeClass("ui-unselecting");
                        k.unselecting = false
                    }
                    if (!k.selecting) {
                        k.$element.addClass("ui-selecting");
                        k.selecting = true;
                        d._trigger("selecting", j, {
                            selecting: k.element
                        })
                    }
                } else {
                    if (k.selecting) {
                        if (j.metaKey && k.startselected) {
                            k.$element.removeClass("ui-selecting");
                            k.selecting = false;
                            k.$element.addClass("ui-selected");
                            k.selected = true
                        } else {
                            k.$element.removeClass("ui-selecting");
                            k.selecting = false;
                            if (k.startselected) {
                                k.$element.addClass("ui-unselecting");
                                k.unselecting = true
                            }
                            d._trigger("unselecting", j, {
                                unselecting: k.element
                            })
                        }
                    }
                    if (k.selected) {
                        if (!j.metaKey && !k.startselected) {
                            k.$element.removeClass("ui-selected");
                            k.selected = false;
                            k.$element.addClass("ui-unselecting");
                            k.unselecting = true;
                            d._trigger("unselecting", j, {
                                unselecting: k.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function(e) {
            var c = this;
            this.dragged = false;
            var d = this.options;
            a(".ui-unselecting", this.element[0]).each(function() {
                var f = a.data(this, "selectable-item");
                f.$element.removeClass("ui-unselecting");
                f.unselecting = false;
                f.startselected = false;
                c._trigger("unselected", e, {
                    unselected: f.element
                })
            });
            a(".ui-selecting", this.element[0]).each(function() {
                var f = a.data(this, "selectable-item");
                f.$element.removeClass("ui-selecting").addClass("ui-selected");
                f.selecting = false;
                f.selected = true;
                f.startselected = true;
                c._trigger("selected", e, {
                    selected: f.element
                })
            });
            this._trigger("stop", e);
            this.helper.remove();
            return false
        }
    });
    a.extend(a.ui.selectable, {
        version: "1.8.7"
    })
}
)(jQuery);
(function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function() {
            var c = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) {
                this.items[c].item.removeData("sortable-item")
            }
            return this
        },
        _setOption: function(c, d) {
            if (c === "disabled") {
                this.options[c] = d;
                this.widget()[d ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else {
                a.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function(f, g) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(f);
            var e = null
              , d = this
              , c = a(f.target).parents().each(function() {
                if (a.data(this, "sortable-item") == d) {
                    e = a(this);
                    return false
                }
            });
            if (a.data(f.target, "sortable-item") == d) {
                e = a(f.target)
            }
            if (!e) {
                return false
            }
            if (this.options.handle && !g) {
                var h = false;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    if (this == f.target) {
                        h = true
                    }
                });
                if (!h) {
                    return false
                }
            }
            this.currentItem = e;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(f, g, c) {
            var h = this.options
              , d = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(f);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: f.pageX - this.offset.left,
                    top: f.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(f);
            this.originalPageX = f.pageX;
            this.originalPageY = f.pageY;
            (h.cursorAt && this._adjustOffsetFromHelper(h.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (h.containment) {
                this._setContainment()
            }
            if (h.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", h.cursor)
            }
            if (h.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", h.opacity)
            }
            if (h.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", h.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", f, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!c) {
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    this.containers[e]._trigger("activate", f, d._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !h.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, f)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(f);
            return true
        },
        _mouseDrag: function(g) {
            this.position = this._generatePosition(g);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var h = this.options
                  , c = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - g.pageY < h.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + h.scrollSpeed
                    } else {
                        if (g.pageY - this.overflowOffset.top < h.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - h.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - g.pageX < h.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + h.scrollSpeed
                    } else {
                        if (g.pageX - this.overflowOffset.left < h.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - h.scrollSpeed
                        }
                    }
                } else {
                    if (g.pageY - a(document).scrollTop() < h.scrollSensitivity) {
                        c = a(document).scrollTop(a(document).scrollTop() - h.scrollSpeed)
                    } else {
                        if (a(window).height() - (g.pageY - a(document).scrollTop()) < h.scrollSensitivity) {
                            c = a(document).scrollTop(a(document).scrollTop() + h.scrollSpeed)
                        }
                    }
                    if (g.pageX - a(document).scrollLeft() < h.scrollSensitivity) {
                        c = a(document).scrollLeft(a(document).scrollLeft() - h.scrollSpeed)
                    } else {
                        if (a(window).width() - (g.pageX - a(document).scrollLeft()) < h.scrollSensitivity) {
                            c = a(document).scrollLeft(a(document).scrollLeft() + h.scrollSpeed)
                        }
                    }
                }
                if (c !== false && a.ui.ddmanager && !h.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, g)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e]
                  , d = f.item[0]
                  , j = this._intersectsWithPointer(f);
                if (!j) {
                    continue
                }
                if (d != this.currentItem[0] && this.placeholder[j == 1 ? "next" : "prev"]()[0] != d && !a.ui.contains(this.placeholder[0], d) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], d) : true)) {
                    this.direction = j == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) {
                        this._rearrange(g, f)
                    } else {
                        break
                    }
                    this._trigger("change", g, this._uiHash());
                    break
                }
            }
            this._contactContainers(g);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, g)
            }
            this._trigger("sort", g, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(d, e) {
            if (!d) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, d)
            }
            if (this.options.revert) {
                var c = this;
                var f = c.placeholder.offset();
                c.reverting = true;
                a(this.helper).animate({
                    left: f.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: f.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function() {
                    c._clear(d)
                })
            } else {
                this._clear(d, e)
            }
            return false
        },
        cancel: function() {
            var c = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[d].containerCache.over) {
                        this.containers[d]._trigger("out", null, c._uiHash(this));
                        this.containers[d].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            } else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function(e) {
            var c = this._getItemsAsjQuery(e && e.connected);
            var d = [];
            e = e || {};
            a(c).each(function() {
                var f = (a(e.item || this).attr(e.attribute || "id") || "").match(e.expression || (/(.+)[-=_](.+)/));
                if (f) {
                    d.push((e.key || f[1] + "[]") + "=" + (e.key && e.expression ? f[1] : f[2]))
                }
            });
            if (!d.length && e.key) {
                d.push(e.key + "=")
            }
            return d.join("&")
        },
        toArray: function(e) {
            var c = this._getItemsAsjQuery(e && e.connected);
            var d = [];
            e = e || {};
            c.each(function() {
                d.push(a(e.item || this).attr(e.attribute || "id") || "")
            });
            return d
        },
        _intersectsWith: function(m) {
            var e = this.positionAbs.left
              , d = e + this.helperProportions.width
              , k = this.positionAbs.top
              , j = k + this.helperProportions.height;
            var f = m.left
              , c = f + m.width
              , n = m.top
              , i = n + m.height;
            var o = this.offset.click.top
              , h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },
        _intersectsWithPointer: function(e) {
            var f = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height)
              , d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width)
              , h = f && d
              , c = this._getDragVerticalDirection()
              , g = this._getDragHorizontalDirection();
            if (!h) {
                return false
            }
            return this.floating ? (((g && g == "right") || c == "down") ? 2 : 1) : (c && (c == "down" ? 2 : 1))
        },
        _intersectsWithSides: function(f) {
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, f.top + (f.height / 2), f.height)
              , e = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, f.left + (f.width / 2), f.width)
              , c = this._getDragVerticalDirection()
              , g = this._getDragHorizontalDirection();
            if (this.floating && g) {
                return ((g == "right" && e) || (g == "left" && !e))
            } else {
                return c && ((c == "down" && d) || (c == "up" && !d))
            }
        },
        _getDragVerticalDirection: function() {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right" : "left")
        },
        refresh: function(c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function(c) {
            var m = this;
            var h = [];
            var f = [];
            var k = this._connectWith();
            if (k && c) {
                for (var e = k.length - 1; e >= 0; e--) {
                    var l = a(k[e]);
                    for (var d = l.length - 1; d >= 0; d--) {
                        var g = a.data(l[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g])
                        }
                    }
                }
            }
            f.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var e = f.length - 1; e >= 0; e--) {
                f[e][0].each(function() {
                    h.push(this)
                })
            }
            return a(h)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(sortable-item)");
            for (var d = 0; d < this.items.length; d++) {
                for (var c = 0; c < e.length; c++) {
                    if (e[c] == this.items[d].item[0]) {
                        this.items.splice(d, 1)
                    }
                }
            }
        },
        _refreshItems: function(c) {
            this.items = [];
            this.containers = [this];
            var k = this.items;
            var q = this;
            var g = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this]];
            var m = this._connectWith();
            if (m) {
                for (var f = m.length - 1; f >= 0; f--) {
                    var n = a(m[f]);
                    for (var e = n.length - 1; e >= 0; e--) {
                        var h = a.data(n[e], "sortable");
                        if (h && h != this && !h.options.disabled) {
                            g.push([a.isFunction(h.options.items) ? h.options.items.call(h.element[0], c, {
                                item: this.currentItem
                            }) : a(h.options.items, h.element), h]);
                            this.containers.push(h)
                        }
                    }
                }
            }
            for (var f = g.length - 1; f >= 0; f--) {
                var l = g[f][1];
                var d = g[f][0];
                for (var e = 0, o = d.length; e < o; e++) {
                    var p = a(d[e]);
                    p.data("sortable-item", l);
                    k.push({
                        item: p,
                        instance: l,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(c) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e];
                var d = this.options.toleranceElement ? a(this.options.toleranceElement, f.item) : f.item;
                if (!c) {
                    f.width = d.outerWidth();
                    f.height = d.outerHeight()
                }
                var g = d.offset();
                f.left = g.left;
                f.top = g.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    var g = this.containers[e].element.offset();
                    this.containers[e].containerCache.left = g.left;
                    this.containers[e].containerCache.top = g.top;
                    this.containers[e].containerCache.width = this.containers[e].element.outerWidth();
                    this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(e) {
            var c = e || this
              , f = c.options;
            if (!f.placeholder || f.placeholder.constructor == String) {
                var d = f.placeholder;
                f.placeholder = {
                    element: function() {
                        var g = a(document.createElement(c.currentItem[0].nodeName)).addClass(d || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!d) {
                            g.style.visibility = "hidden"
                        }
                        return g
                    },
                    update: function(g, h) {
                        if (d && !f.forcePlaceholderSize) {
                            return
                        }
                        if (!h.height()) {
                            h.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!h.width()) {
                            h.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            c.placeholder = a(f.placeholder.element.call(c.element, c.currentItem));
            c.currentItem.after(c.placeholder);
            f.placeholder.update(c, c.placeholder)
        },
        _contactContainers: function(c) {
            var e = null
              , l = null;
            for (var g = this.containers.length - 1; g >= 0; g--) {
                if (a.ui.contains(this.currentItem[0], this.containers[g].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[g].containerCache)) {
                    if (e && a.ui.contains(this.containers[g].element[0], e.element[0])) {
                        continue
                    }
                    e = this.containers[g];
                    l = g
                } else {
                    if (this.containers[g].containerCache.over) {
                        this.containers[g]._trigger("out", c, this._uiHash(this));
                        this.containers[g].containerCache.over = 0
                    }
                }
            }
            if (!e) {
                return
            }
            if (this.containers.length === 1) {
                this.containers[l]._trigger("over", c, this._uiHash(this));
                this.containers[l].containerCache.over = 1
            } else {
                if (this.currentContainer != this.containers[l]) {
                    var k = 10000;
                    var h = null;
                    var d = this.positionAbs[this.containers[l].floating ? "left" : "top"];
                    for (var f = this.items.length - 1; f >= 0; f--) {
                        if (!a.ui.contains(this.containers[l].element[0], this.items[f].item[0])) {
                            continue
                        }
                        var m = this.items[f][this.containers[l].floating ? "left" : "top"];
                        if (Math.abs(m - d) < k) {
                            k = Math.abs(m - d);
                            h = this.items[f]
                        }
                    }
                    if (!h && !this.options.dropOnEmpty) {
                        return
                    }
                    this.currentContainer = this.containers[l];
                    h ? this._rearrange(c, h, null, true) : this._rearrange(c, null, this.containers[l].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[l]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[l]._trigger("over", c, this._uiHash(this));
                    this.containers[l].containerCache.over = 1
                }
            }
        },
        _createHelper: function(d) {
            var e = this.options;
            var c = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d, this.currentItem])) : (e.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!c.parents("body").length) {
                a(e.appendTo != "parent" ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0])
            }
            if (c[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (c[0].style.width == "" || e.forceHelperSize) {
                c.width(this.currentItem.width())
            }
            if (c[0].style.height == "" || e.forceHelperSize) {
                c.height(this.currentItem.height())
            }
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") {
                c = c.split(" ")
            }
            if (a.isArray(c)) {
                c = {
                    left: +c[0],
                    top: +c[1] || 0
                }
            }
            if ("left"in c) {
                this.offset.click.left = c.left + this.margins.left
            }
            if ("right"in c) {
                this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
            }
            if ("top"in c) {
                this.offset.click.top = c.top + this.margins.top
            }
            if ("bottom"in c) {
                this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                c = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var f = this.options;
            if (f.containment == "parent") {
                f.containment = this.helper[0].parentNode
            }
            if (f.containment == "document" || f.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(f.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(f.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(f.containment)) {
                var d = a(f.containment)[0];
                var e = a(f.containment).offset();
                var c = (a(d).css("overflow") != "hidden");
                this.containment = [e.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (c ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (c ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(g, i) {
            if (!i) {
                i = this.position
            }
            var e = g == "absolute" ? 1 : -1;
            var f = this.options
              , c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , h = (/(html|body)/i).test(c[0].tagName);
            return {
                top: (i.top + this.offset.relative.top * e + this.offset.parent.top * e - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (h ? 0 : c.scrollTop())) * e)),
                left: (i.left + this.offset.relative.left * e + this.offset.parent.left * e - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : c.scrollLeft()) * e))
            }
        },
        _generatePosition: function(f) {
            var i = this.options
              , c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , j = (/(html|body)/i).test(c[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var e = f.pageX;
            var d = f.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (f.pageX - this.offset.click.left < this.containment[0]) {
                        e = this.containment[0] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top < this.containment[1]) {
                        d = this.containment[1] + this.offset.click.top
                    }
                    if (f.pageX - this.offset.click.left > this.containment[2]) {
                        e = this.containment[2] + this.offset.click.left
                    }
                    if (f.pageY - this.offset.click.top > this.containment[3]) {
                        d = this.containment[3] + this.offset.click.top
                    }
                }
                if (i.grid) {
                    var h = this.originalPageY + Math.round((d - this.originalPageY) / i.grid[1]) * i.grid[1];
                    d = this.containment ? (!(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h : (!(h - this.offset.click.top < this.containment[1]) ? h - i.grid[1] : h + i.grid[1])) : h;
                    var g = this.originalPageX + Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0];
                    e = this.containment ? (!(g - this.offset.click.left < this.containment[0] || g - this.offset.click.left > this.containment[2]) ? g : (!(g - this.offset.click.left < this.containment[0]) ? g - i.grid[0] : g + i.grid[0])) : g
                }
            }
            return {
                top: (d - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : c.scrollTop())))),
                left: (e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : c.scrollLeft())))
            }
        },
        _rearrange: function(h, g, d, f) {
            d ? d[0].appendChild(this.placeholder[0]) : g.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? g.item[0] : g.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var e = this
              , c = this.counter;
            window.setTimeout(function() {
                if (c == e.counter) {
                    e.refreshPositions(!f)
                }
            }, 0)
        },
        _clear: function(e, f) {
            this.reverting = false;
            var g = []
              , c = this;
            if (!this._noFinalSort && this.currentItem[0].parentNode) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var d in this._storedCSS) {
                    if (this._storedCSS[d] == "auto" || this._storedCSS[d] == "static") {
                        this._storedCSS[d] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !f) {
                g.push(function(h) {
                    this._trigger("receive", h, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !f) {
                g.push(function(h) {
                    this._trigger("update", h, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!f) {
                    g.push(function(h) {
                        this._trigger("remove", h, this._uiHash())
                    })
                }
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    if (a.ui.contains(this.containers[d].element[0], this.currentItem[0]) && !f) {
                        g.push((function(h) {
                            return function(i) {
                                h._trigger("receive", i, this._uiHash(this))
                            }
                        }
                        ).call(this, this.containers[d]));
                        g.push((function(h) {
                            return function(i) {
                                h._trigger("update", i, this._uiHash(this))
                            }
                        }
                        ).call(this, this.containers[d]))
                    }
                }
            }
            for (var d = this.containers.length - 1; d >= 0; d--) {
                if (!f) {
                    g.push((function(h) {
                        return function(i) {
                            h._trigger("deactivate", i, this._uiHash(this))
                        }
                    }
                    ).call(this, this.containers[d]))
                }
                if (this.containers[d].containerCache.over) {
                    g.push((function(h) {
                        return function(i) {
                            h._trigger("out", i, this._uiHash(this))
                        }
                    }
                    ).call(this, this.containers[d]));
                    this.containers[d].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!f) {
                    this._trigger("beforeStop", e, this._uiHash());
                    for (var d = 0; d < g.length; d++) {
                        g[d].call(this, e)
                    }
                    this._trigger("stop", e, this._uiHash())
                }
                return false
            }
            if (!f) {
                this._trigger("beforeStop", e, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!f) {
                for (var d = 0; d < g.length; d++) {
                    g[d].call(this, e)
                }
                this._trigger("stop", e, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(d) {
            var c = d || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: d ? d.element : null
            }
        }
    });
    a.extend(a.ui.sortable, {
        version: "1.8.7"
    })
}
)(jQuery);
jQuery.effects || (function(h, e) {
    h.effects = {};
    h.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(n, m) {
        h.fx.step[m] = function(o) {
            if (!o.colorInit) {
                o.start = l(o.elem, m);
                o.end = j(o.end);
                o.colorInit = true
            }
            o.elem.style[m] = "rgb(" + Math.max(Math.min(parseInt((o.pos * (o.end[0] - o.start[0])) + o.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((o.pos * (o.end[1] - o.start[1])) + o.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((o.pos * (o.end[2] - o.start[2])) + o.start[2], 10), 255), 0) + ")"
        }
    });
    function j(n) {
        var m;
        if (n && n.constructor == Array && n.length == 3) {
            return n
        }
        if (m = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) {
            return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)]
        }
        if (m = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) {
            return [parseFloat(m[1]) * 2.55, parseFloat(m[2]) * 2.55, parseFloat(m[3]) * 2.55]
        }
        if (m = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) {
            return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
        }
        if (m = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) {
            return [parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16), parseInt(m[3] + m[3], 16)]
        }
        if (m = /rgba\(0, 0, 0, 0\)/.exec(n)) {
            return a.transparent
        }
        return a[h.trim(n).toLowerCase()]
    }
    function l(o, m) {
        var n;
        do {
            n = h.curCSS(o, m);
            if (n != "" && n != "transparent" || h.nodeName(o, "body")) {
                break
            }
            m = "backgroundColor"
        } while (o = o.parentNode);
        return j(n)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    var f = ["add", "remove", "toggle"]
      , c = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    function g() {
        var p = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, q = {}, n, o;
        if (p && p.length && p[0] && p[p[0]]) {
            var m = p.length;
            while (m--) {
                n = p[m];
                if (typeof p[n] == "string") {
                    o = n.replace(/\-(\w)/g, function(r, s) {
                        return s.toUpperCase()
                    });
                    q[o] = p[n]
                }
            }
        } else {
            for (n in p) {
                if (typeof p[n] === "string") {
                    q[n] = p[n]
                }
            }
        }
        return q
    }
    function b(n) {
        var m, o;
        for (m in n) {
            o = n[m];
            if (o == null || h.isFunction(o) || m in c || (/scrollbar/).test(m) || (!(/color/i).test(m) && isNaN(parseFloat(o)))) {
                delete n[m]
            }
        }
        return n
    }
    function i(m, o) {
        var p = {
            _: 0
        }, n;
        for (n in o) {
            if (m[n] != o[n]) {
                p[n] = o[n]
            }
        }
        return p
    }
    h.effects.animateClass = function(m, n, p, o) {
        if (h.isFunction(p)) {
            o = p;
            p = null
        }
        return this.each(function() {
            h.queue(this, "fx", function() {
                var v = h(this), r = v.attr("style") || " ", x = b(g.call(this)), u, s = v.attr("className");
                h.each(f, function(y, z) {
                    if (m[z]) {
                        v[z + "Class"](m[z])
                    }
                });
                u = b(g.call(this));
                v.attr("className", s);
                v.animate(i(x, u), n, p, function() {
                    h.each(f, function(y, z) {
                        if (m[z]) {
                            v[z + "Class"](m[z])
                        }
                    });
                    if (typeof v.attr("style") == "object") {
                        v.attr("style").cssText = "";
                        v.attr("style").cssText = r
                    } else {
                        v.attr("style", r)
                    }
                    if (o) {
                        o.apply(this, arguments)
                    }
                });
                var q = h.queue(this)
                  , w = q.splice(q.length - 1, 1)[0];
                q.splice(1, 0, w);
                h.dequeue(this)
            })
        })
    }
    ;
    h.fn.extend({
        _addClass: h.fn.addClass,
        addClass: function(n, m, p, o) {
            return m ? h.effects.animateClass.apply(this, [{
                add: n
            }, m, p, o]) : this._addClass(n)
        },
        _removeClass: h.fn.removeClass,
        removeClass: function(n, m, p, o) {
            return m ? h.effects.animateClass.apply(this, [{
                remove: n
            }, m, p, o]) : this._removeClass(n)
        },
        _toggleClass: h.fn.toggleClass,
        toggleClass: function(o, n, m, q, p) {
            if (typeof n == "boolean" || n === e) {
                if (!m) {
                    return this._toggleClass(o, n)
                } else {
                    return h.effects.animateClass.apply(this, [(n ? {
                        add: o
                    } : {
                        remove: o
                    }), m, q, p])
                }
            } else {
                return h.effects.animateClass.apply(this, [{
                    toggle: o
                }, n, m, q])
            }
        },
        switchClass: function(m, o, n, q, p) {
            return h.effects.animateClass.apply(this, [{
                add: o,
                remove: m
            }, n, q, p])
        }
    });
    h.extend(h.effects, {
        version: "1.8.7",
        save: function(n, o) {
            for (var m = 0; m < o.length; m++) {
                if (o[m] !== null) {
                    n.data("ec.storage." + o[m], n[0].style[o[m]])
                }
            }
        },
        restore: function(n, o) {
            for (var m = 0; m < o.length; m++) {
                if (o[m] !== null) {
                    n.css(o[m], n.data("ec.storage." + o[m]))
                }
            }
        },
        setMode: function(m, n) {
            if (n == "toggle") {
                n = m.is(":hidden") ? "show" : "hide"
            }
            return n
        },
        getBaseline: function(n, o) {
            var p, m;
            switch (n[0]) {
            case "top":
                p = 0;
                break;
            case "middle":
                p = 0.5;
                break;
            case "bottom":
                p = 1;
                break;
            default:
                p = n[0] / o.height
            }
            switch (n[1]) {
            case "left":
                m = 0;
                break;
            case "center":
                m = 0.5;
                break;
            case "right":
                m = 1;
                break;
            default:
                m = n[1] / o.width
            }
            return {
                x: m,
                y: p
            }
        },
        createWrapper: function(m) {
            if (m.parent().is(".ui-effects-wrapper")) {
                return m.parent()
            }
            var n = {
                width: m.outerWidth(true),
                height: m.outerHeight(true),
                "float": m.css("float")
            }
              , o = h("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            m.wrap(o);
            o = m.parent();
            if (m.css("position") == "static") {
                o.css({
                    position: "relative"
                });
                m.css({
                    position: "relative"
                })
            } else {
                h.extend(n, {
                    position: m.css("position"),
                    zIndex: m.css("z-index")
                });
                h.each(["top", "left", "bottom", "right"], function(p, q) {
                    n[q] = m.css(q);
                    if (isNaN(parseInt(n[q], 10))) {
                        n[q] = "auto"
                    }
                });
                m.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            return o.css(n).show()
        },
        removeWrapper: function(m) {
            if (m.parent().is(".ui-effects-wrapper")) {
                return m.parent().replaceWith(m)
            }
            return m
        },
        setTransition: function(n, p, m, o) {
            o = o || {};
            h.each(p, function(r, q) {
                unit = n.cssUnit(q);
                if (unit[0] > 0) {
                    o[q] = unit[0] * m + unit[1]
                }
            });
            return o
        }
    });
    function d(n, m, o, p) {
        if (typeof n == "object") {
            p = m;
            o = null;
            m = n;
            n = m.effect
        }
        if (h.isFunction(m)) {
            p = m;
            o = null;
            m = {}
        }
        if (typeof m == "number" || h.fx.speeds[m]) {
            p = o;
            o = m;
            m = {}
        }
        if (h.isFunction(o)) {
            p = o;
            o = null
        }
        m = m || {};
        o = o || m.duration;
        o = h.fx.off ? 0 : typeof o == "number" ? o : o in h.fx.speeds ? h.fx.speeds[o] : h.fx.speeds._default;
        p = p || m.complete;
        return [n, m, o, p]
    }
    function k(m) {
        if (!m || typeof m === "number" || h.fx.speeds[m]) {
            return true
        }
        if (typeof m === "string" && !h.effects[m]) {
            return true
        }
        return false
    }
    h.fn.extend({
        effect: function(p, o, r, u) {
            var n = d.apply(this, arguments)
              , q = {
                options: n[1],
                duration: n[2],
                callback: n[3]
            }
              , s = q.options.mode
              , m = h.effects[p];
            if (h.fx.off || !m) {
                if (s) {
                    return this[s](q.duration, q.callback)
                } else {
                    return this.each(function() {
                        if (q.callback) {
                            q.callback.call(this)
                        }
                    })
                }
            }
            return m.call(this, q)
        },
        _show: h.fn.show,
        show: function(n) {
            if (k(n)) {
                return this._show.apply(this, arguments)
            } else {
                var m = d.apply(this, arguments);
                m[1].mode = "show";
                return this.effect.apply(this, m)
            }
        },
        _hide: h.fn.hide,
        hide: function(n) {
            if (k(n)) {
                return this._hide.apply(this, arguments)
            } else {
                var m = d.apply(this, arguments);
                m[1].mode = "hide";
                return this.effect.apply(this, m)
            }
        },
        __toggle: h.fn.toggle,
        toggle: function(n) {
            if (k(n) || typeof n === "boolean" || h.isFunction(n)) {
                return this.__toggle.apply(this, arguments)
            } else {
                var m = d.apply(this, arguments);
                m[1].mode = "toggle";
                return this.effect.apply(this, m)
            }
        },
        cssUnit: function(m) {
            var n = this.css(m)
              , o = [];
            h.each(["em", "px", "%", "pt"], function(p, q) {
                if (n.indexOf(q) > 0) {
                    o = [parseFloat(n), q]
                }
            });
            return o
        }
    });
    h.easing.jswing = h.easing.swing;
    h.extend(h.easing, {
        def: "easeOutQuad",
        swing: function(n, o, m, q, p) {
            return h.easing[h.easing.def](n, o, m, q, p)
        },
        easeInQuad: function(n, o, m, q, p) {
            return q * (o /= p) * o + m
        },
        easeOutQuad: function(n, o, m, q, p) {
            return -q * (o /= p) * (o - 2) + m
        },
        easeInOutQuad: function(n, o, m, q, p) {
            if ((o /= p / 2) < 1) {
                return q / 2 * o * o + m
            }
            return -q / 2 * ((--o) * (o - 2) - 1) + m
        },
        easeInCubic: function(n, o, m, q, p) {
            return q * (o /= p) * o * o + m
        },
        easeOutCubic: function(n, o, m, q, p) {
            return q * ((o = o / p - 1) * o * o + 1) + m
        },
        easeInOutCubic: function(n, o, m, q, p) {
            if ((o /= p / 2) < 1) {
                return q / 2 * o * o * o + m
            }
            return q / 2 * ((o -= 2) * o * o + 2) + m
        },
        easeInQuart: function(n, o, m, q, p) {
            return q * (o /= p) * o * o * o + m
        },
        easeOutQuart: function(n, o, m, q, p) {
            return -q * ((o = o / p - 1) * o * o * o - 1) + m
        },
        easeInOutQuart: function(n, o, m, q, p) {
            if ((o /= p / 2) < 1) {
                return q / 2 * o * o * o * o + m
            }
            return -q / 2 * ((o -= 2) * o * o * o - 2) + m
        },
        easeInQuint: function(n, o, m, q, p) {
            return q * (o /= p) * o * o * o * o + m
        },
        easeOutQuint: function(n, o, m, q, p) {
            return q * ((o = o / p - 1) * o * o * o * o + 1) + m
        },
        easeInOutQuint: function(n, o, m, q, p) {
            if ((o /= p / 2) < 1) {
                return q / 2 * o * o * o * o * o + m
            }
            return q / 2 * ((o -= 2) * o * o * o * o + 2) + m
        },
        easeInSine: function(n, o, m, q, p) {
            return -q * Math.cos(o / p * (Math.PI / 2)) + q + m
        },
        easeOutSine: function(n, o, m, q, p) {
            return q * Math.sin(o / p * (Math.PI / 2)) + m
        },
        easeInOutSine: function(n, o, m, q, p) {
            return -q / 2 * (Math.cos(Math.PI * o / p) - 1) + m
        },
        easeInExpo: function(n, o, m, q, p) {
            return (o == 0) ? m : q * Math.pow(2, 10 * (o / p - 1)) + m
        },
        easeOutExpo: function(n, o, m, q, p) {
            return (o == p) ? m + q : q * (-Math.pow(2, -10 * o / p) + 1) + m
        },
        easeInOutExpo: function(n, o, m, q, p) {
            if (o == 0) {
                return m
            }
            if (o == p) {
                return m + q
            }
            if ((o /= p / 2) < 1) {
                return q / 2 * Math.pow(2, 10 * (o - 1)) + m
            }
            return q / 2 * (-Math.pow(2, -10 * --o) + 2) + m
        },
        easeInCirc: function(n, o, m, q, p) {
            return -q * (Math.sqrt(1 - (o /= p) * o) - 1) + m
        },
        easeOutCirc: function(n, o, m, q, p) {
            return q * Math.sqrt(1 - (o = o / p - 1) * o) + m
        },
        easeInOutCirc: function(n, o, m, q, p) {
            if ((o /= p / 2) < 1) {
                return -q / 2 * (Math.sqrt(1 - o * o) - 1) + m
            }
            return q / 2 * (Math.sqrt(1 - (o -= 2) * o) + 1) + m
        },
        easeInElastic: function(n, q, m, w, v) {
            var r = 1.70158;
            var u = 0;
            var o = w;
            if (q == 0) {
                return m
            }
            if ((q /= v) == 1) {
                return m + w
            }
            if (!u) {
                u = v * 0.3
            }
            if (o < Math.abs(w)) {
                o = w;
                var r = u / 4
            } else {
                var r = u / (2 * Math.PI) * Math.asin(w / o)
            }
            return -(o * Math.pow(2, 10 * (q -= 1)) * Math.sin((q * v - r) * (2 * Math.PI) / u)) + m
        },
        easeOutElastic: function(n, q, m, w, v) {
            var r = 1.70158;
            var u = 0;
            var o = w;
            if (q == 0) {
                return m
            }
            if ((q /= v) == 1) {
                return m + w
            }
            if (!u) {
                u = v * 0.3
            }
            if (o < Math.abs(w)) {
                o = w;
                var r = u / 4
            } else {
                var r = u / (2 * Math.PI) * Math.asin(w / o)
            }
            return o * Math.pow(2, -10 * q) * Math.sin((q * v - r) * (2 * Math.PI) / u) + w + m
        },
        easeInOutElastic: function(n, q, m, w, v) {
            var r = 1.70158;
            var u = 0;
            var o = w;
            if (q == 0) {
                return m
            }
            if ((q /= v / 2) == 2) {
                return m + w
            }
            if (!u) {
                u = v * (0.3 * 1.5)
            }
            if (o < Math.abs(w)) {
                o = w;
                var r = u / 4
            } else {
                var r = u / (2 * Math.PI) * Math.asin(w / o)
            }
            if (q < 1) {
                return -0.5 * (o * Math.pow(2, 10 * (q -= 1)) * Math.sin((q * v - r) * (2 * Math.PI) / u)) + m
            }
            return o * Math.pow(2, -10 * (q -= 1)) * Math.sin((q * v - r) * (2 * Math.PI) / u) * 0.5 + w + m
        },
        easeInBack: function(n, o, m, r, q, p) {
            if (p == e) {
                p = 1.70158
            }
            return r * (o /= q) * o * ((p + 1) * o - p) + m
        },
        easeOutBack: function(n, o, m, r, q, p) {
            if (p == e) {
                p = 1.70158
            }
            return r * ((o = o / q - 1) * o * ((p + 1) * o + p) + 1) + m
        },
        easeInOutBack: function(n, o, m, r, q, p) {
            if (p == e) {
                p = 1.70158
            }
            if ((o /= q / 2) < 1) {
                return r / 2 * (o * o * (((p *= (1.525)) + 1) * o - p)) + m
            }
            return r / 2 * ((o -= 2) * o * (((p *= (1.525)) + 1) * o + p) + 2) + m
        },
        easeInBounce: function(n, o, m, q, p) {
            return q - h.easing.easeOutBounce(n, p - o, 0, q, p) + m
        },
        easeOutBounce: function(n, o, m, q, p) {
            if ((o /= p) < (1 / 2.75)) {
                return q * (7.5625 * o * o) + m
            } else {
                if (o < (2 / 2.75)) {
                    return q * (7.5625 * (o -= (1.5 / 2.75)) * o + 0.75) + m
                } else {
                    if (o < (2.5 / 2.75)) {
                        return q * (7.5625 * (o -= (2.25 / 2.75)) * o + 0.9375) + m
                    } else {
                        return q * (7.5625 * (o -= (2.625 / 2.75)) * o + 0.984375) + m
                    }
                }
            }
        },
        easeInOutBounce: function(n, o, m, q, p) {
            if (o < p / 2) {
                return h.easing.easeInBounce(n, o * 2, 0, q, p) * 0.5 + m
            }
            return h.easing.easeOutBounce(n, o * 2 - p, 0, q, p) * 0.5 + q * 0.5 + m
        }
    })
}
)(jQuery);
(function(a, b) {
    a.effects.blind = function(c) {
        return this.queue(function() {
            var e = a(this)
              , d = ["position", "top", "left"];
            var i = a.effects.setMode(e, c.options.mode || "hide");
            var h = c.options.direction || "vertical";
            a.effects.save(e, d);
            e.show();
            var k = a.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var f = (h == "vertical") ? "height" : "width";
            var j = (h == "vertical") ? k.height() : k.width();
            if (i == "show") {
                k.css(f, 0)
            }
            var g = {};
            g[f] = i == "show" ? j : 0;
            k.animate(g, c.duration, c.options.easing, function() {
                if (i == "hide") {
                    e.hide()
                }
                a.effects.restore(e, d);
                a.effects.removeWrapper(e);
                if (c.callback) {
                    c.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.bounce = function(c) {
        return this.queue(function() {
            var f = a(this)
              , m = ["position", "top", "left"];
            var l = a.effects.setMode(f, c.options.mode || "effect");
            var o = c.options.direction || "up";
            var d = c.options.distance || 20;
            var e = c.options.times || 5;
            var h = c.duration || 250;
            if (/show|hide/.test(l)) {
                m.push("opacity")
            }
            a.effects.save(f, m);
            f.show();
            a.effects.createWrapper(f);
            var g = (o == "up" || o == "down") ? "top" : "left";
            var q = (o == "up" || o == "left") ? "pos" : "neg";
            var d = c.options.distance || (g == "top" ? f.outerHeight({
                margin: true
            }) / 3 : f.outerWidth({
                margin: true
            }) / 3);
            if (l == "show") {
                f.css("opacity", 0).css(g, q == "pos" ? -d : d)
            }
            if (l == "hide") {
                d = d / (e * 2)
            }
            if (l != "hide") {
                e--
            }
            if (l == "show") {
                var j = {
                    opacity: 1
                };
                j[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(j, h / 2, c.options.easing);
                d = d / 2;
                e--
            }
            for (var k = 0; k < e; k++) {
                var p = {}
                  , n = {};
                p[g] = (q == "pos" ? "-=" : "+=") + d;
                n[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(p, h / 2, c.options.easing).animate(n, h / 2, c.options.easing);
                d = (l == "hide") ? d * 2 : d / 2
            }
            if (l == "hide") {
                var j = {
                    opacity: 0
                };
                j[g] = (q == "pos" ? "-=" : "+=") + d;
                f.animate(j, h / 2, c.options.easing, function() {
                    f.hide();
                    a.effects.restore(f, m);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                })
            } else {
                var p = {}
                  , n = {};
                p[g] = (q == "pos" ? "-=" : "+=") + d;
                n[g] = (q == "pos" ? "+=" : "-=") + d;
                f.animate(p, h / 2, c.options.easing).animate(n, h / 2, c.options.easing, function() {
                    a.effects.restore(f, m);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                })
            }
            f.queue("fx", function() {
                f.dequeue()
            });
            f.dequeue()
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.clip = function(c) {
        return this.queue(function() {
            var g = a(this)
              , k = ["position", "top", "left", "height", "width"];
            var j = a.effects.setMode(g, c.options.mode || "hide");
            var l = c.options.direction || "vertical";
            a.effects.save(g, k);
            g.show();
            var d = a.effects.createWrapper(g).css({
                overflow: "hidden"
            });
            var f = g[0].tagName == "IMG" ? d : g;
            var h = {
                size: (l == "vertical") ? "height" : "width",
                position: (l == "vertical") ? "top" : "left"
            };
            var e = (l == "vertical") ? f.height() : f.width();
            if (j == "show") {
                f.css(h.size, 0);
                f.css(h.position, e / 2)
            }
            var i = {};
            i[h.size] = j == "show" ? e : 0;
            i[h.position] = j == "show" ? 0 : e / 2;
            f.animate(i, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        g.hide()
                    }
                    a.effects.restore(g, k);
                    a.effects.removeWrapper(g);
                    if (c.callback) {
                        c.callback.apply(g[0], arguments)
                    }
                    g.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.drop = function(c) {
        return this.queue(function() {
            var f = a(this)
              , e = ["position", "top", "left", "opacity"];
            var j = a.effects.setMode(f, c.options.mode || "hide");
            var i = c.options.direction || "left";
            a.effects.save(f, e);
            f.show();
            a.effects.createWrapper(f);
            var g = (i == "up" || i == "down") ? "top" : "left";
            var d = (i == "up" || i == "left") ? "pos" : "neg";
            var k = c.options.distance || (g == "top" ? f.outerHeight({
                margin: true
            }) / 2 : f.outerWidth({
                margin: true
            }) / 2);
            if (j == "show") {
                f.css("opacity", 0).css(g, d == "pos" ? -k : k)
            }
            var h = {
                opacity: j == "show" ? 1 : 0
            };
            h[g] = (j == "show" ? (d == "pos" ? "+=" : "-=") : (d == "pos" ? "-=" : "+=")) + k;
            f.animate(h, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, e);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.explode = function(c) {
        return this.queue(function() {
            var l = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            var f = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            c.options.mode = c.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : c.options.mode;
            var k = a(this).show().css("visibility", "hidden");
            var m = k.offset();
            m.top -= parseInt(k.css("marginTop"), 10) || 0;
            m.left -= parseInt(k.css("marginLeft"), 10) || 0;
            var h = k.outerWidth(true);
            var d = k.outerHeight(true);
            for (var g = 0; g < l; g++) {
                for (var e = 0; e < f; e++) {
                    k.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -e * (h / f),
                        top: -g * (d / l)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: h / f,
                        height: d / l,
                        left: m.left + e * (h / f) + (c.options.mode == "show" ? (e - Math.floor(f / 2)) * (h / f) : 0),
                        top: m.top + g * (d / l) + (c.options.mode == "show" ? (g - Math.floor(l / 2)) * (d / l) : 0),
                        opacity: c.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: m.left + e * (h / f) + (c.options.mode == "show" ? 0 : (e - Math.floor(f / 2)) * (h / f)),
                        top: m.top + g * (d / l) + (c.options.mode == "show" ? 0 : (g - Math.floor(l / 2)) * (d / l)),
                        opacity: c.options.mode == "show" ? 1 : 0
                    }, c.duration || 500)
                }
            }
            setTimeout(function() {
                c.options.mode == "show" ? k.css({
                    visibility: "visible"
                }) : k.css({
                    visibility: "visible"
                }).hide();
                if (c.callback) {
                    c.callback.apply(k[0])
                }
                k.dequeue();
                a("div.ui-effects-explode").remove()
            }, c.duration || 500)
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.fade = function(c) {
        return this.queue(function() {
            var d = a(this)
              , e = a.effects.setMode(d, c.options.mode || "hide");
            d.animate({
                opacity: e
            }, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    (c.callback && c.callback.apply(this, arguments));
                    d.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.fold = function(c) {
        return this.queue(function() {
            var f = a(this)
              , l = ["position", "top", "left"];
            var i = a.effects.setMode(f, c.options.mode || "hide");
            var p = c.options.size || 15;
            var o = !(!c.options.horizFirst);
            var h = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(f, l);
            f.show();
            var e = a.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            var j = ((i == "show") != o);
            var g = j ? ["width", "height"] : ["height", "width"];
            var d = j ? [e.width(), e.height()] : [e.height(), e.width()];
            var k = /([0-9]+)%/.exec(p);
            if (k) {
                p = parseInt(k[1], 10) / 100 * d[i == "hide" ? 0 : 1]
            }
            if (i == "show") {
                e.css(o ? {
                    height: 0,
                    width: p
                } : {
                    height: p,
                    width: 0
                })
            }
            var n = {}
              , m = {};
            n[g[0]] = i == "show" ? d[0] : p;
            m[g[1]] = i == "show" ? d[1] : 0;
            e.animate(n, h, c.options.easing).animate(m, h, c.options.easing, function() {
                if (i == "hide") {
                    f.hide()
                }
                a.effects.restore(f, l);
                a.effects.removeWrapper(f);
                if (c.callback) {
                    c.callback.apply(f[0], arguments)
                }
                f.dequeue()
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.highlight = function(c) {
        return this.queue(function() {
            var e = a(this)
              , d = ["backgroundImage", "backgroundColor", "opacity"]
              , g = a.effects.setMode(e, c.options.mode || "show")
              , f = {
                backgroundColor: e.css("backgroundColor")
            };
            if (g == "hide") {
                f.opacity = 0
            }
            a.effects.save(e, d);
            e.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(f, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    (g == "hide" && e.hide());
                    a.effects.restore(e, d);
                    (g == "show" && !a.support.opacity && this.style.removeAttribute("filter"));
                    (c.callback && c.callback.apply(this, arguments));
                    e.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.pulsate = function(c) {
        return this.queue(function() {
            var e = a(this)
              , f = a.effects.setMode(e, c.options.mode || "show");
            times = ((c.options.times || 5) * 2) - 1;
            duration = c.duration ? c.duration / 2 : a.fx.speeds._default / 2,
            isVisible = e.is(":visible"),
            animateTo = 0;
            if (!isVisible) {
                e.css("opacity", 0).show();
                animateTo = 1
            }
            if ((f == "hide" && isVisible) || (f == "show" && !isVisible)) {
                times--
            }
            for (var d = 0; d < times; d++) {
                e.animate({
                    opacity: animateTo
                }, duration, c.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            e.animate({
                opacity: animateTo
            }, duration, c.options.easing, function() {
                if (animateTo == 0) {
                    e.hide()
                }
                (c.callback && c.callback.apply(this, arguments))
            });
            e.queue("fx", function() {
                e.dequeue()
            }).dequeue()
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.puff = function(c) {
        return this.queue(function() {
            var g = a(this)
              , h = a.effects.setMode(g, c.options.mode || "hide")
              , f = parseInt(c.options.percent, 10) || 150
              , e = f / 100
              , d = {
                height: g.height(),
                width: g.width()
            };
            a.extend(c.options, {
                fade: true,
                mode: h,
                percent: h == "hide" ? f : 100,
                from: h == "hide" ? d : {
                    height: d.height * e,
                    width: d.width * e
                }
            });
            g.effect("scale", c.options, c.duration, c.callback);
            g.dequeue()
        })
    }
    ;
    a.effects.scale = function(c) {
        return this.queue(function() {
            var h = a(this);
            var e = a.extend(true, {}, c.options);
            var k = a.effects.setMode(h, c.options.mode || "effect");
            var i = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : (k == "hide" ? 0 : 100));
            var j = c.options.direction || "both";
            var d = c.options.origin;
            if (k != "effect") {
                e.origin = d || ["middle", "center"];
                e.restore = true
            }
            var g = {
                height: h.height(),
                width: h.width()
            };
            h.from = c.options.from || (k == "show" ? {
                height: 0,
                width: 0
            } : g);
            var f = {
                y: j != "horizontal" ? (i / 100) : 1,
                x: j != "vertical" ? (i / 100) : 1
            };
            h.to = {
                height: g.height * f.y,
                width: g.width * f.x
            };
            if (c.options.fade) {
                if (k == "show") {
                    h.from.opacity = 0;
                    h.to.opacity = 1
                }
                if (k == "hide") {
                    h.from.opacity = 1;
                    h.to.opacity = 0
                }
            }
            e.from = h.from;
            e.to = h.to;
            e.mode = k;
            h.effect("size", e, c.duration, c.callback);
            h.dequeue()
        })
    }
    ;
    a.effects.size = function(c) {
        return this.queue(function() {
            var d = a(this)
              , o = ["position", "top", "left", "width", "height", "overflow", "opacity"];
            var n = ["position", "top", "left", "overflow", "opacity"];
            var k = ["width", "height", "overflow"];
            var q = ["fontSize"];
            var l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var g = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var h = a.effects.setMode(d, c.options.mode || "effect");
            var j = c.options.restore || false;
            var f = c.options.scale || "both";
            var p = c.options.origin;
            var e = {
                height: d.height(),
                width: d.width()
            };
            d.from = c.options.from || e;
            d.to = c.options.to || e;
            if (p) {
                var i = a.effects.getBaseline(p, e);
                d.from.top = (e.height - d.from.height) * i.y;
                d.from.left = (e.width - d.from.width) * i.x;
                d.to.top = (e.height - d.to.height) * i.y;
                d.to.left = (e.width - d.to.width) * i.x
            }
            var m = {
                from: {
                    y: d.from.height / e.height,
                    x: d.from.width / e.width
                },
                to: {
                    y: d.to.height / e.height,
                    x: d.to.width / e.width
                }
            };
            if (f == "box" || f == "both") {
                if (m.from.y != m.to.y) {
                    o = o.concat(l);
                    d.from = a.effects.setTransition(d, l, m.from.y, d.from);
                    d.to = a.effects.setTransition(d, l, m.to.y, d.to)
                }
                if (m.from.x != m.to.x) {
                    o = o.concat(g);
                    d.from = a.effects.setTransition(d, g, m.from.x, d.from);
                    d.to = a.effects.setTransition(d, g, m.to.x, d.to)
                }
            }
            if (f == "content" || f == "both") {
                if (m.from.y != m.to.y) {
                    o = o.concat(q);
                    d.from = a.effects.setTransition(d, q, m.from.y, d.from);
                    d.to = a.effects.setTransition(d, q, m.to.y, d.to)
                }
            }
            a.effects.save(d, j ? o : n);
            d.show();
            a.effects.createWrapper(d);
            d.css("overflow", "hidden").css(d.from);
            if (f == "content" || f == "both") {
                l = l.concat(["marginTop", "marginBottom"]).concat(q);
                g = g.concat(["marginLeft", "marginRight"]);
                k = o.concat(l).concat(g);
                d.find("*[width]").each(function() {
                    child = a(this);
                    if (j) {
                        a.effects.save(child, k)
                    }
                    var r = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: r.height * m.from.y,
                        width: r.width * m.from.x
                    };
                    child.to = {
                        height: r.height * m.to.y,
                        width: r.width * m.to.x
                    };
                    if (m.from.y != m.to.y) {
                        child.from = a.effects.setTransition(child, l, m.from.y, child.from);
                        child.to = a.effects.setTransition(child, l, m.to.y, child.to)
                    }
                    if (m.from.x != m.to.x) {
                        child.from = a.effects.setTransition(child, g, m.from.x, child.from);
                        child.to = a.effects.setTransition(child, g, m.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, c.duration, c.options.easing, function() {
                        if (j) {
                            a.effects.restore(child, k)
                        }
                    })
                })
            }
            d.animate(d.to, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (d.to.opacity === 0) {
                        d.css("opacity", d.from.opacity)
                    }
                    if (h == "hide") {
                        d.hide()
                    }
                    a.effects.restore(d, j ? o : n);
                    a.effects.removeWrapper(d);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    d.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.shake = function(c) {
        return this.queue(function() {
            var f = a(this)
              , m = ["position", "top", "left"];
            var l = a.effects.setMode(f, c.options.mode || "effect");
            var o = c.options.direction || "left";
            var d = c.options.distance || 20;
            var e = c.options.times || 3;
            var h = c.duration || c.options.duration || 140;
            a.effects.save(f, m);
            f.show();
            a.effects.createWrapper(f);
            var g = (o == "up" || o == "down") ? "top" : "left";
            var q = (o == "up" || o == "left") ? "pos" : "neg";
            var j = {}
              , p = {}
              , n = {};
            j[g] = (q == "pos" ? "-=" : "+=") + d;
            p[g] = (q == "pos" ? "+=" : "-=") + d * 2;
            n[g] = (q == "pos" ? "-=" : "+=") + d * 2;
            f.animate(j, h, c.options.easing);
            for (var k = 1; k < e; k++) {
                f.animate(p, h, c.options.easing).animate(n, h, c.options.easing)
            }
            f.animate(p, h, c.options.easing).animate(j, h / 2, c.options.easing, function() {
                a.effects.restore(f, m);
                a.effects.removeWrapper(f);
                if (c.callback) {
                    c.callback.apply(this, arguments)
                }
            });
            f.queue("fx", function() {
                f.dequeue()
            });
            f.dequeue()
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.slide = function(c) {
        return this.queue(function() {
            var f = a(this)
              , e = ["position", "top", "left"];
            var j = a.effects.setMode(f, c.options.mode || "show");
            var i = c.options.direction || "left";
            a.effects.save(f, e);
            f.show();
            a.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            var g = (i == "up" || i == "down") ? "top" : "left";
            var d = (i == "up" || i == "left") ? "pos" : "neg";
            var k = c.options.distance || (g == "top" ? f.outerHeight({
                margin: true
            }) : f.outerWidth({
                margin: true
            }));
            if (j == "show") {
                f.css(g, d == "pos" ? (isNaN(k) ? "-" + k : -k) : k)
            }
            var h = {};
            h[g] = (j == "show" ? (d == "pos" ? "+=" : "-=") : (d == "pos" ? "-=" : "+=")) + k;
            f.animate(h, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    if (j == "hide") {
                        f.hide()
                    }
                    a.effects.restore(f, e);
                    a.effects.removeWrapper(f);
                    if (c.callback) {
                        c.callback.apply(this, arguments)
                    }
                    f.dequeue()
                }
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.effects.transfer = function(c) {
        return this.queue(function() {
            var g = a(this)
              , i = a(c.options.to)
              , f = i.offset()
              , h = {
                top: f.top,
                left: f.left,
                height: i.innerHeight(),
                width: i.innerWidth()
            }
              , e = g.offset()
              , d = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({
                top: e.top,
                left: e.left,
                height: g.innerHeight(),
                width: g.innerWidth(),
                position: "absolute"
            }).animate(h, c.duration, c.options.easing, function() {
                d.remove();
                (c.callback && c.callback.apply(g[0], arguments));
                g.dequeue()
            })
        })
    }
}
)(jQuery);
(function(a, b) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var c = this
              , d = c.options;
            c.running = 0;
            c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            c.headers = c.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                if (d.disabled) {
                    return
                }
                a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function() {
                if (d.disabled) {
                    return
                }
                a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function() {
                if (d.disabled) {
                    return
                }
                a(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function() {
                if (d.disabled) {
                    return
                }
                a(this).removeClass("ui-state-focus")
            });
            c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (d.navigation) {
                var e = c.element.find("a").filter(d.navigationFilter).eq(0);
                if (e.length) {
                    var f = e.closest(".ui-accordion-header");
                    if (f.length) {
                        c.active = f
                    } else {
                        c.active = e.closest(".ui-accordion-content").prev()
                    }
                }
            }
            c.active = c._findActive(c.active || d.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            c.active.next().addClass("ui-accordion-content-active");
            c._createIcons();
            c.resize();
            c.element.attr("role", "tablist");
            c.headers.attr("role", "tab").bind("keydown.accordion", function(g) {
                return c._keydown(g)
            }).next().attr("role", "tabpanel");
            c.headers.not(c.active || "").attr({
                "aria-expanded": "false",
                tabIndex: -1
            }).next().hide();
            if (!c.active.length) {
                c.headers.eq(0).attr("tabIndex", 0)
            } else {
                c.active.attr({
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            }
            if (!a.browser.safari) {
                c.headers.find("a").attr("tabIndex", -1)
            }
            if (d.event) {
                c.headers.bind(d.event.split(" ").join(".accordion ") + ".accordion", function(g) {
                    c._clickHandler.call(c, g, this);
                    g.preventDefault()
                })
            }
        },
        _createIcons: function() {
            var c = this.options;
            if (c.icons) {
                a("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var d = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (c.autoHeight || c.fillHeight) {
                d.css("height", "")
            }
            return a.Widget.prototype.destroy.call(this)
        },
        _setOption: function(c, d) {
            a.Widget.prototype._setOption.apply(this, arguments);
            if (c == "active") {
                this.activate(d)
            }
            if (c == "icons") {
                this._destroyIcons();
                if (d) {
                    this._createIcons()
                }
            }
            if (c == "disabled") {
                this.headers.add(this.headers.next())[d ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
            }
        },
        _keydown: function(f) {
            if (this.options.disabled || f.altKey || f.ctrlKey) {
                return
            }
            var g = a.ui.keyCode
              , e = this.headers.length
              , c = this.headers.index(f.target)
              , d = false;
            switch (f.keyCode) {
            case g.RIGHT:
            case g.DOWN:
                d = this.headers[(c + 1) % e];
                break;
            case g.LEFT:
            case g.UP:
                d = this.headers[(c - 1 + e) % e];
                break;
            case g.SPACE:
            case g.ENTER:
                this._clickHandler({
                    target: f.target
                }, f.target);
                f.preventDefault()
            }
            if (d) {
                a(f.target).attr("tabIndex", -1);
                a(d).attr("tabIndex", 0);
                d.focus();
                return false
            }
            return true
        },
        resize: function() {
            var c = this.options, e;
            if (c.fillSpace) {
                if (a.browser.msie) {
                    var d = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                e = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", d)
                }
                this.headers.each(function() {
                    e -= a(this).outerHeight(true)
                });
                this.headers.next().each(function() {
                    a(this).height(Math.max(0, e - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else {
                if (c.autoHeight) {
                    e = 0;
                    this.headers.next().each(function() {
                        e = Math.max(e, a(this).height("").height())
                    }).height(e)
                }
            }
            return this
        },
        activate: function(c) {
            this.options.active = c;
            var d = this._findActive(c)[0];
            this._clickHandler({
                target: d
            }, d);
            return this
        },
        _findActive: function(c) {
            return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? a([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(c, f) {
            var k = this.options;
            if (k.disabled) {
                return
            }
            if (!c.target) {
                if (!k.collapsible) {
                    return
                }
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(k.icons.headerSelected).addClass(k.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next()
                  , e = {
                    options: k,
                    newHeader: a([]),
                    oldHeader: k.active,
                    newContent: a([]),
                    oldContent: h
                }
                  , d = (this.active = a([]));
                this._toggle(d, h, e);
                return
            }
            var g = a(c.currentTarget || f)
              , i = g[0] === this.active[0];
            k.active = k.collapsible && i ? false : this.headers.index(g);
            if (this.running || (!k.collapsible && i)) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(k.icons.headerSelected).addClass(k.icons.header);
            if (!i) {
                g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(k.icons.header).addClass(k.icons.headerSelected);
                g.next().addClass("ui-accordion-content-active")
            }
            var d = g.next()
              , h = this.active.next()
              , e = {
                options: k,
                newHeader: i && k.collapsible ? a([]) : g,
                oldHeader: this.active,
                newContent: i && k.collapsible ? a([]) : d,
                oldContent: h
            }
              , j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
            this.active = i ? a([]) : g;
            this._toggle(d, h, e, i, j);
            return
        },
        _toggle: function(c, i, g, j, k) {
            var m = this
              , n = m.options;
            m.toShow = c;
            m.toHide = i;
            m.data = g;
            var d = function() {
                if (!m) {
                    return
                }
                return m._completed.apply(m, arguments)
            };
            m._trigger("changestart", null, m.data);
            m.running = i.size() === 0 ? c.size() : i.size();
            if (n.animated) {
                var f = {};
                if (n.collapsible && j) {
                    f = {
                        toShow: a([]),
                        toHide: i,
                        complete: d,
                        down: k,
                        autoHeight: n.autoHeight || n.fillSpace
                    }
                } else {
                    f = {
                        toShow: c,
                        toHide: i,
                        complete: d,
                        down: k,
                        autoHeight: n.autoHeight || n.fillSpace
                    }
                }
                if (!n.proxied) {
                    n.proxied = n.animated
                }
                if (!n.proxiedDuration) {
                    n.proxiedDuration = n.duration
                }
                n.animated = a.isFunction(n.proxied) ? n.proxied(f) : n.proxied;
                n.duration = a.isFunction(n.proxiedDuration) ? n.proxiedDuration(f) : n.proxiedDuration;
                var l = a.ui.accordion.animations
                  , e = n.duration
                  , h = n.animated;
                if (h && !l[h] && !a.easing[h]) {
                    h = "slide"
                }
                if (!l[h]) {
                    l[h] = function(o) {
                        this.slide(o, {
                            easing: h,
                            duration: e || 700
                        })
                    }
                }
                l[h](f)
            } else {
                if (n.collapsible && j) {
                    c.toggle()
                } else {
                    i.hide();
                    c.show()
                }
                d(true)
            }
            i.prev().attr({
                "aria-expanded": "false",
                tabIndex: -1
            }).blur();
            c.prev().attr({
                "aria-expanded": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(c) {
            this.running = c ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (this.options.clearStyle) {
                this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                })
            }
            this.toHide.removeClass("ui-accordion-content-active");
            this._trigger("change", null, this.data)
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.8.7",
        animations: {
            slide: function(k, i) {
                k = a.extend({
                    easing: "swing",
                    duration: 300
                }, k, i);
                if (!k.toHide.size()) {
                    k.toShow.animate({
                        height: "show",
                        paddingTop: "show",
                        paddingBottom: "show"
                    }, k);
                    return
                }
                if (!k.toShow.size()) {
                    k.toHide.animate({
                        height: "hide",
                        paddingTop: "hide",
                        paddingBottom: "hide"
                    }, k);
                    return
                }
                var d = k.toShow.css("overflow"), h = 0, e = {}, g = {}, f = ["height", "paddingTop", "paddingBottom"], c;
                var j = k.toShow;
                c = j[0].style.width;
                j.width(parseInt(j.parent().width(), 10) - parseInt(j.css("paddingLeft"), 10) - parseInt(j.css("paddingRight"), 10) - (parseInt(j.css("borderLeftWidth"), 10) || 0) - (parseInt(j.css("borderRightWidth"), 10) || 0));
                a.each(f, function(l, n) {
                    g[n] = "hide";
                    var m = ("" + a.css(k.toShow[0], n)).match(/^([\d+-.]+)(.*)$/);
                    e[n] = {
                        value: m[1],
                        unit: m[2] || "px"
                    }
                });
                k.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show();
                k.toHide.filter(":hidden").each(k.complete).end().filter(":visible").animate(g, {
                    step: function(l, m) {
                        if (m.prop == "height") {
                            h = (m.end - m.start === 0) ? 0 : (m.now - m.start) / (m.end - m.start)
                        }
                        k.toShow[0].style[m.prop] = (h * e[m.prop].value) + e[m.prop].unit
                    },
                    duration: k.duration,
                    easing: k.easing,
                    complete: function() {
                        if (!k.autoHeight) {
                            k.toShow.css("height", "")
                        }
                        k.toShow.css({
                            width: c,
                            overflow: d
                        });
                        k.complete()
                    }
                })
            },
            bounceslide: function(c) {
                this.slide(c, {
                    easing: c.down ? "easeOutBounce" : "swing",
                    duration: c.down ? 1000 : 200
                })
            }
        }
    })
}
)(jQuery);
(function(a, b) {
    a.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        _create: function() {
            var c = this, e = this.element[0].ownerDocument, d;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function(f) {
                if (c.options.disabled || c.element.attr("readonly")) {
                    return
                }
                d = false;
                var g = a.ui.keyCode;
                switch (f.keyCode) {
                case g.PAGE_UP:
                    c._move("previousPage", f);
                    break;
                case g.PAGE_DOWN:
                    c._move("nextPage", f);
                    break;
                case g.UP:
                    c._move("previous", f);
                    f.preventDefault();
                    break;
                case g.DOWN:
                    c._move("next", f);
                    f.preventDefault();
                    break;
                case g.ENTER:
                case g.NUMPAD_ENTER:
                    if (c.menu.active) {
                        d = true;
                        f.preventDefault()
                    }
                case g.TAB:
                    if (!c.menu.active) {
                        return
                    }
                    c.menu.select(f);
                    break;
                case g.ESCAPE:
                    c.element.val(c.term);
                    c.close(f);
                    break;
                default:
                    clearTimeout(c.searching);
                    c.searching = setTimeout(function() {
                        if (c.term != c.element.val()) {
                            c.selectedItem = null;
                            c.search(null, f)
                        }
                    }, c.options.delay);
                    break
                }
            }).bind("keypress.autocomplete", function(f) {
                if (d) {
                    d = false;
                    f.preventDefault()
                }
            }).bind("focus.autocomplete", function() {
                if (c.options.disabled) {
                    return
                }
                c.selectedItem = null;
                c.previous = c.element.val()
            }).bind("blur.autocomplete", function(f) {
                if (c.options.disabled) {
                    return
                }
                clearTimeout(c.searching);
                c.closing = setTimeout(function() {
                    c.close(f);
                    c._change(f)
                }, 150)
            });
            this._initSource();
            this.response = function() {
                return c._response.apply(c, arguments)
            }
            ;
            this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", e)[0]).mousedown(function(f) {
                var g = c.menu.element[0];
                if (!a(f.target).closest(".ui-menu-item").length) {
                    setTimeout(function() {
                        a(document).one("mousedown", function(h) {
                            if (h.target !== c.element[0] && h.target !== g && !a.ui.contains(g, h.target)) {
                                c.close()
                            }
                        })
                    }, 1)
                }
                setTimeout(function() {
                    clearTimeout(c.closing)
                }, 13)
            }).menu({
                focus: function(g, h) {
                    var f = h.item.data("item.autocomplete");
                    if (false !== c._trigger("focus", g, {
                        item: f
                    })) {
                        if (/^key/.test(g.originalEvent.type)) {
                            c.element.val(f.value)
                        }
                    }
                },
                selected: function(h, i) {
                    var g = i.item.data("item.autocomplete")
                      , f = c.previous;
                    if (c.element[0] !== e.activeElement) {
                        c.element.focus();
                        c.previous = f;
                        setTimeout(function() {
                            c.previous = f;
                            c.selectedItem = g
                        }, 1)
                    }
                    if (false !== c._trigger("select", h, {
                        item: g
                    })) {
                        c.element.val(g.value)
                    }
                    c.term = c.element.val();
                    c.close(h);
                    c.selectedItem = g
                },
                blur: function(f, g) {
                    if (c.menu.element.is(":visible") && (c.element.val() !== c.term)) {
                        c.element.val(c.term)
                    }
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            if (a.fn.bgiframe) {
                this.menu.element.bgiframe()
            }
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            a.Widget.prototype.destroy.call(this)
        },
        _setOption: function(c, d) {
            a.Widget.prototype._setOption.apply(this, arguments);
            if (c === "source") {
                this._initSource()
            }
            if (c === "appendTo") {
                this.menu.element.appendTo(a(d || "body", this.element[0].ownerDocument)[0])
            }
        },
        _initSource: function() {
            var c = this, e, d;
            if (a.isArray(this.options.source)) {
                e = this.options.source;
                this.source = function(g, f) {
                    f(a.ui.autocomplete.filter(e, g.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    d = this.options.source;
                    this.source = function(g, f) {
                        if (c.xhr) {
                            c.xhr.abort()
                        }
                        c.xhr = a.ajax({
                            url: d,
                            data: g,
                            dataType: "json",
                            success: function(i, h, j) {
                                if (j === c.xhr) {
                                    f(i)
                                }
                                c.xhr = null
                            },
                            error: function(h) {
                                if (h === c.xhr) {
                                    f([])
                                }
                                c.xhr = null
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        },
        search: function(d, c) {
            d = d != null ? d : this.element.val();
            this.term = this.element.val();
            if (d.length < this.options.minLength) {
                return this.close(c)
            }
            clearTimeout(this.closing);
            if (this._trigger("search", c) === false) {
                return
            }
            return this._search(d)
        },
        _search: function(c) {
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: c
            }, this.response)
        },
        _response: function(c) {
            if (c && c.length) {
                c = this._normalize(c);
                this._suggest(c);
                this._trigger("open")
            } else {
                this.close()
            }
            this.element.removeClass("ui-autocomplete-loading")
        },
        close: function(c) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", c)
            }
        },
        _change: function(c) {
            if (this.previous !== this.element.val()) {
                this._trigger("change", c, {
                    item: this.selectedItem
                })
            }
        },
        _normalize: function(c) {
            if (c.length && c[0].label && c[0].value) {
                return c
            }
            return a.map(c, function(d) {
                if (typeof d === "string") {
                    return {
                        label: d,
                        value: d
                    }
                }
                return a.extend({
                    label: d.label || d.value,
                    value: d.value || d.label
                }, d)
            })
        },
        _suggest: function(c) {
            var d = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(d, c);
            this.menu.deactivate();
            this.menu.refresh();
            d.show();
            this._resizeMenu();
            d.position(a.extend({
                of: this.element
            }, this.options.position))
        },
        _resizeMenu: function() {
            var c = this.menu.element;
            c.outerWidth(Math.max(c.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function(e, d) {
            var c = this;
            a.each(d, function(f, g) {
                c._renderItem(e, g)
            })
        },
        _renderItem: function(c, d) {
            return a("<li></li>").data("item.autocomplete", d).append(a("<a></a>").text(d.label)).appendTo(c)
        },
        _move: function(d, c) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, c);
                return
            }
            if (this.menu.first() && /^previous/.test(d) || this.menu.last() && /^next/.test(d)) {
                this.element.val(this.term);
                this.menu.deactivate();
                return
            }
            this.menu[d](c)
        },
        widget: function() {
            return this.menu.element
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function(c) {
            return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function(e, c) {
            var d = new RegExp(a.ui.autocomplete.escapeRegex(c),"i");
            return a.grep(e, function(f) {
                return d.test(f.label || f.value || f)
            })
        }
    })
}(jQuery));
(function(a) {
    a.widget("ui.menu", {
        _create: function() {
            var b = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(c) {
                if (!a(c.target).closest(".ui-menu-item a").length) {
                    return
                }
                c.preventDefault();
                b.select(c)
            });
            this.refresh()
        },
        refresh: function() {
            var c = this;
            var b = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            b.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(d) {
                c.activate(d, a(this).parent())
            }).mouseleave(function() {
                c.deactivate()
            })
        },
        activate: function(e, d) {
            this.deactivate();
            if (this.hasScroll()) {
                var f = d.offset().top - this.element.offset().top
                  , b = this.element.attr("scrollTop")
                  , c = this.element.height();
                if (f < 0) {
                    this.element.attr("scrollTop", b + f)
                } else {
                    if (f >= c) {
                        this.element.attr("scrollTop", b + f - c + d.height())
                    }
                }
            }
            this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", e, {
                item: d
            })
        },
        deactivate: function() {
            if (!this.active) {
                return
            }
            this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
            this._trigger("blur");
            this.active = null
        },
        next: function(b) {
            this.move("next", ".ui-menu-item:first", b)
        },
        previous: function(b) {
            this.move("prev", ".ui-menu-item:last", b)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function(e, d, c) {
            if (!this.active) {
                this.activate(c, this.element.children(d));
                return
            }
            var b = this.active[e + "All"](".ui-menu-item").eq(0);
            if (b.length) {
                this.activate(c, b)
            } else {
                this.activate(c, this.element.children(d))
            }
        },
        nextPage: function(d) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(d, this.element.children(".ui-menu-item:first"));
                    return
                }
                var e = this.active.offset().top
                  , c = this.element.height()
                  , b = this.element.children(".ui-menu-item").filter(function() {
                    var f = a(this).offset().top - e - c + a(this).height();
                    return f < 10 && f > -10
                });
                if (!b.length) {
                    b = this.element.children(".ui-menu-item:last")
                }
                this.activate(d, b)
            } else {
                this.activate(d, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            }
        },
        previousPage: function(c) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(c, this.element.children(".ui-menu-item:last"));
                    return
                }
                var d = this.active.offset().top
                  , b = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function() {
                    var e = a(this).offset().top - d + b - a(this).height();
                    return e < 10 && e > -10
                });
                if (!result.length) {
                    result = this.element.children(".ui-menu-item:first")
                }
                this.activate(c, result)
            } else {
                this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            }
        },
        hasScroll: function() {
            return this.element.height() < this.element.attr("scrollHeight")
        },
        select: function(b) {
            this._trigger("selected", b, {
                item: this.active
            })
        }
    })
}(jQuery));
(function(e, h) {
    var c, b = "ui-button ui-widget ui-state-default ui-corner-all", g = "ui-state-hover ui-state-active ", f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", d = function(i) {
        e(":ui-button", i.target.form).each(function() {
            var j = e(this).data("button");
            setTimeout(function() {
                j.refresh()
            }, 1)
        })
    }, a = function(j) {
        var i = j.name
          , k = j.form
          , l = e([]);
        if (i) {
            if (k) {
                l = e(k).find("[name='" + i + "']")
            } else {
                l = e("[name='" + i + "']", j.ownerDocument).filter(function() {
                    return !this.form
                })
            }
        }
        return l
    };
    e.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", d);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = this.element.attr("disabled")
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var i = this
              , k = this.options
              , l = this.type === "checkbox" || this.type === "radio"
              , m = "ui-state-hover" + (!l ? " ui-state-active" : "")
              , j = "ui-state-focus";
            if (k.label === null) {
                k.label = this.buttonElement.html()
            }
            if (this.element.is(":disabled")) {
                k.disabled = true
            }
            this.buttonElement.addClass(b).attr("role", "button").bind("mouseenter.button", function() {
                if (k.disabled) {
                    return
                }
                e(this).addClass("ui-state-hover");
                if (this === c) {
                    e(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function() {
                if (k.disabled) {
                    return
                }
                e(this).removeClass(m)
            }).bind("focus.button", function() {
                e(this).addClass(j)
            }).bind("blur.button", function() {
                e(this).removeClass(j)
            });
            if (l) {
                this.element.bind("change.button", function() {
                    i.refresh()
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click.button", function() {
                    if (k.disabled) {
                        return false
                    }
                    e(this).toggleClass("ui-state-active");
                    i.buttonElement.attr("aria-pressed", i.element[0].checked)
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click.button", function() {
                        if (k.disabled) {
                            return false
                        }
                        e(this).addClass("ui-state-active");
                        i.buttonElement.attr("aria-pressed", true);
                        var n = i.element[0];
                        a(n).not(n).map(function() {
                            return e(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", false)
                    })
                } else {
                    this.buttonElement.bind("mousedown.button", function() {
                        if (k.disabled) {
                            return false
                        }
                        e(this).addClass("ui-state-active");
                        c = this;
                        e(document).one("mouseup", function() {
                            c = null
                        })
                    }).bind("mouseup.button", function() {
                        if (k.disabled) {
                            return false
                        }
                        e(this).removeClass("ui-state-active")
                    }).bind("keydown.button", function(n) {
                        if (k.disabled) {
                            return false
                        }
                        if (n.keyCode == e.ui.keyCode.SPACE || n.keyCode == e.ui.keyCode.ENTER) {
                            e(this).addClass("ui-state-active")
                        }
                    }).bind("keyup.button", function() {
                        e(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function(n) {
                            if (n.keyCode === e.ui.keyCode.SPACE) {
                                e(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", k.disabled)
        },
        _determineButtonType: function() {
            if (this.element.is(":checkbox")) {
                this.type = "checkbox"
            } else {
                if (this.element.is(":radio")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                this.buttonElement = this.element.parents().last().find("label[for=" + this.element.attr("id") + "]");
                this.element.addClass("ui-helper-hidden-accessible");
                var i = this.element.is(":checked");
                if (i) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.attr("aria-pressed", i)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function() {
            return this.buttonElement
        },
        destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(b + " " + g + " " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
            e.Widget.prototype.destroy.call(this)
        },
        _setOption: function(i, j) {
            e.Widget.prototype._setOption.apply(this, arguments);
            if (i === "disabled") {
                if (j) {
                    this.element.attr("disabled", true)
                } else {
                    this.element.removeAttr("disabled")
                }
            }
            this._resetButton()
        },
        refresh: function() {
            var i = this.element.is(":disabled");
            if (i !== this.options.disabled) {
                this._setOption("disabled", i)
            }
            if (this.type === "radio") {
                a(this.element[0]).each(function() {
                    if (e(this).is(":checked")) {
                        e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true)
                    } else {
                        e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true)
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
                    }
                }
            }
        },
        _resetButton: function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var l = this.buttonElement.removeClass(f)
              , k = e("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(l.empty()).text()
              , j = this.options.icons
              , i = j.primary && j.secondary;
            if (j.primary || j.secondary) {
                l.addClass("ui-button-text-icon" + (i ? "s" : (j.primary ? "-primary" : "-secondary")));
                if (j.primary) {
                    l.prepend("<span class='ui-button-icon-primary ui-icon " + j.primary + "'></span>")
                }
                if (j.secondary) {
                    l.append("<span class='ui-button-icon-secondary ui-icon " + j.secondary + "'></span>")
                }
                if (!this.options.text) {
                    l.addClass(i ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
                    if (!this.hasTitle) {
                        l.attr("title", k)
                    }
                }
            } else {
                l.addClass("ui-button-text-only")
            }
        }
    });
    e.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(i, j) {
            if (i === "disabled") {
                this.buttons.button("option", i, j)
            }
            e.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function() {
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        },
        destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            e.Widget.prototype.destroy.call(this)
        }
    })
}(jQuery));
(function($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.8.7"
        }
    });
    var PROP_NAME = "datepicker";
    var dpuuid = new Date().getTime();
    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function() {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                this.uuid += 1;
                target.id = "dp" + this.uuid
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst)
        },
        _attachments: function(input, inst) {
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (inst.append) {
                inst.append.remove()
            }
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append)
            }
            input.unbind("focus", this._showDatepicker);
            if (inst.trigger) {
                inst.trigger.remove()
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
                        $.datepicker._hideDatepicker()
                    } else {
                        $.datepicker._showDatepicker(input[0])
                    }
                    return false
                })
            }
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var date = new Date(2009,12 - 1,20);
                var dateFormat = this._get(inst, "dateFormat");
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function(names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i
                            }
                        }
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
                }
                inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            inst.dpDiv.show()
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == "string") {
                return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker()
                }
                var date = this._getDateDatepicker(target, true);
                extendRemove(inst.settings, settings);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDateDatepicker(target, date);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst, noDefault)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker();
                    handled = false;
                    break;
                case 13:
                    var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                    if (sel[0]) {
                        $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                    } else {
                        $.datepicker._hideDatepicker()
                    }
                    return false;
                    break;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 35:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._clearDate(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._gotoToday(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, -7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, +7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _doKeyUp: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst)
                    }
                } catch (event) {
                    $.datepicker.log(event)
                }
            }
            return true
        },
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                $.datepicker._curInst.dpDiv.stop(true, true)
            }
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.dpDiv.empty();
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim");
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function() {
                    $.datepicker._datepickerShowing = true;
                    var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                    if (!!cover.length) {
                        var borders = $.datepicker._getBorders(inst.dpDiv);
                        cover.css({
                            left: -borders[0],
                            top: -borders[1],
                            width: inst.dpDiv.outerWidth(),
                            height: inst.dpDiv.outerHeight()
                        })
                    }
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim || !duration) {
                    postProcess()
                }
                if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
                    inst.input.focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function(inst) {
            var self = this;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            inst.dpDiv.empty().append(this._generateHTML(inst));
            var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
            if (!!cover.length) {
                cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                })
            }
            inst.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function() {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover")
                }
            }).bind("mouseover", function() {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover")
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled")) {
                inst.input.focus()
            }
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function() {
                    if (origyearshtml === inst.yearshtml) {
                        inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
                    }
                    origyearshtml = inst.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function(elem) {
            var convert = function(value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[value] || value
            };
            return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset
        },
        _findPos: function(obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, "isRTL");
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj[isRTL ? "previousSibling" : "nextSibling"]
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function(input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, "showAnim");
                var duration = this._get(inst, "duration");
                var postProcess = function() {
                    $.datepicker._tidyDialog(inst);
                    this._curInst = null
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
                }
                if (!showAnim) {
                    postProcess()
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target);
            if ($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear) {
                setTimeout(function() {
                    inst.input.focus()
                }, 0)
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
        },
        _clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != "object") {
                    inst.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function(inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function(date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var getNumber = function(match) {
                var isDoubled = lookAhead(match);
                var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" && isDoubled ? 4 : (match == "o" ? 3 : 2))));
                var digits = new RegExp("^\\d{1," + size + "}");
                var num = value.substring(iValue).match(digits);
                if (!num) {
                    throw "Missing number at position " + iValue
                }
                iValue += num[0].length;
                return parseInt(num[0], 10)
            };
            var getName = function(match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1
                    }
                }
                throw "Unknown name at position " + iValue
            };
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue
                }
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        var date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral()
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        checkLiteral()
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year,month - 1,day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw "Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function(format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            };
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", (date.getTime() - new Date(date.getFullYear(),0,0).getTime()) / 86400000, 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += date.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function(format) {
            var chars = "";
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (lookAhead("'")) {
                            chars += "'"
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return
            }
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                dates = (noDefault ? "" : dates)
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {}
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                    case "d":
                    case "D":
                        day += parseInt(matches[1], 10);
                        break;
                    case "w":
                    case "W":
                        day += parseInt(matches[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        month += parseInt(matches[1], 10);
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break;
                    case "y":
                    case "Y":
                        year += parseInt(matches[1], 10);
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year,month,day)
            };
            var newDate = (date == null || date === "" ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == "Invalid Date" ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
            return startDate
        },
        _generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999,9,9) : new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1,maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear,drawMonth,1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear,drawMonth - stepMonths,1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear,drawMonth + stepMonths,1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, "showWeek");
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var selectOtherMonths = this._get(inst, "selectOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1) {
                            switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first";
                                cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += " ui-datepicker-group-last";
                                cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle";
                                cornerClass = "";
                                break
                            }
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
            }
            inst.yearshtml = "";
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var thisYear = new Date().getFullYear();
                var determineYear = function(value) {
                    var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                    return (isNaN(year) ? thisYear : year)
                };
                var year = determineYear(years[0]);
                var endYear = Math.max(year, determineYear(years[1] || ""));
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                inst.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                }
                inst.yearshtml += "</select>";
                if (!$.browser.mozilla) {
                    html += inst.yearshtml;
                    inst.yearshtml = null
                } else {
                    html += '<select class="ui-datepicker-year"><option value="' + drawYear + '" selected="selected">' + drawYear + "</option></select>"
                }
            }
            html += this._get(inst, "yearSuffix");
            if (showMonthAfterYear) {
                html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year,month,day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            var newDate = (minDate && date < minDate ? minDate : date);
            newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
            return newDate
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - new Date(year,month,32).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year,month,1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear,curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]),1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year,month,day))) : this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }
    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }
    $.fn.datepicker = function(options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function() {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    }
    ;
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.8.7";
    window["DP_jQuery_" + dpuuid] = $
}
)(jQuery);
(function(d, e) {
    var b = "ui-dialog ui-widget ui-widget-content ui-corner-all "
      , a = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }
      , c = {
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true
    };
    d.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(g) {
                    var f = d(this).css(g).offset().top;
                    if (f < 0) {
                        d(this).css("top", g.top - f)
                    }
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        },
        _create: function() {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") {
                this.originalTitle = ""
            }
            this.options.title = this.options.title || this.originalTitle;
            var n = this
              , o = n.options
              , l = o.title || "&#160;"
              , g = d.ui.dialog.getTitleId(n.element)
              , m = (n.uiDialog = d("<div></div>")).appendTo(document.body).hide().addClass(b + o.dialogClass).css({
                zIndex: o.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function(p) {
                if (o.closeOnEscape && p.keyCode && p.keyCode === d.ui.keyCode.ESCAPE) {
                    n.close(p);
                    p.preventDefault()
                }
            }).attr({
                role: "dialog",
                "aria-labelledby": g
            }).mousedown(function(p) {
                n.moveToTop(false, p)
            })
              , i = n.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(m)
              , h = (n.uiDialogTitlebar = d("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(m)
              , k = d('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                k.addClass("ui-state-hover")
            }, function() {
                k.removeClass("ui-state-hover")
            }).focus(function() {
                k.addClass("ui-state-focus")
            }).blur(function() {
                k.removeClass("ui-state-focus")
            }).click(function(p) {
                n.close(p);
                return false
            }).appendTo(h)
              , j = (n.uiDialogTitlebarCloseText = d("<span></span>")).addClass("ui-icon ui-icon-closethick").text(o.closeText).appendTo(k)
              , f = d("<span></span>").addClass("ui-dialog-title").attr("id", g).html(l).prependTo(h);
            if (d.isFunction(o.beforeclose) && !d.isFunction(o.beforeClose)) {
                o.beforeClose = o.beforeclose
            }
            h.find("*").add(h).disableSelection();
            if (o.draggable && d.fn.draggable) {
                n._makeDraggable()
            }
            if (o.resizable && d.fn.resizable) {
                n._makeResizable()
            }
            n._createButtons(o.buttons);
            n._isOpen = false;
            if (d.fn.bgiframe) {
                m.bgiframe()
            }
        },
        _init: function() {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        destroy: function() {
            var f = this;
            if (f.overlay) {
                f.overlay.destroy()
            }
            f.uiDialog.hide();
            f.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            f.uiDialog.remove();
            if (f.originalTitle) {
                f.element.attr("title", f.originalTitle)
            }
            return f
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(i) {
            var f = this, h, g;
            if (false === f._trigger("beforeClose", i)) {
                return
            }
            if (f.overlay) {
                f.overlay.destroy()
            }
            f.uiDialog.unbind("keypress.ui-dialog");
            f._isOpen = false;
            if (f.options.hide) {
                f.uiDialog.hide(f.options.hide, function() {
                    f._trigger("close", i)
                })
            } else {
                f.uiDialog.hide();
                f._trigger("close", i)
            }
            d.ui.dialog.overlay.resize();
            if (f.options.modal) {
                h = 0;
                d(".ui-dialog").each(function() {
                    if (this !== f.uiDialog[0]) {
                        g = d(this).css("z-index");
                        if (!isNaN(g)) {
                            h = Math.max(h, g)
                        }
                    }
                });
                d.ui.dialog.maxZ = h
            }
            return f
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(j, i) {
            var f = this, h = f.options, g;
            if ((h.modal && !j) || (!h.stack && !h.modal)) {
                return f._trigger("focus", i)
            }
            if (h.zIndex > d.ui.dialog.maxZ) {
                d.ui.dialog.maxZ = h.zIndex
            }
            if (f.overlay) {
                d.ui.dialog.maxZ += 1;
                f.overlay.$el.css("z-index", d.ui.dialog.overlay.maxZ = d.ui.dialog.maxZ)
            }
            g = {
                scrollTop: f.element.attr("scrollTop"),
                scrollLeft: f.element.attr("scrollLeft")
            };
            d.ui.dialog.maxZ += 1;
            f.uiDialog.css("z-index", d.ui.dialog.maxZ);
            f.element.attr(g);
            f._trigger("focus", i);
            return f
        },
        open: function() {
            if (this._isOpen) {
                return
            }
            var g = this
              , h = g.options
              , f = g.uiDialog;
            g.overlay = h.modal ? new d.ui.dialog.overlay(g) : null;
            g._size();
            g._position(h.position);
            f.show(h.show);
            g.moveToTop(true);
            if (h.modal) {
                f.bind("keypress.ui-dialog", function(k) {
                    if (k.keyCode !== d.ui.keyCode.TAB) {
                        return
                    }
                    var j = d(":tabbable", this)
                      , l = j.filter(":first")
                      , i = j.filter(":last");
                    if (k.target === i[0] && !k.shiftKey) {
                        l.focus(1);
                        return false
                    } else {
                        if (k.target === l[0] && k.shiftKey) {
                            i.focus(1);
                            return false
                        }
                    }
                })
            }
            d(g.element.find(":tabbable").get().concat(f.find(".ui-dialog-buttonpane :tabbable").get().concat(f.get()))).eq(0).focus();
            g._isOpen = true;
            g._trigger("open");
            return g
        },
        _createButtons: function(i) {
            var h = this
              , f = false
              , g = d("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix")
              , j = d("<div></div>").addClass("ui-dialog-buttonset").appendTo(g);
            h.uiDialog.find(".ui-dialog-buttonpane").remove();
            if (typeof i === "object" && i !== null) {
                d.each(i, function() {
                    return !(f = true)
                })
            }
            if (f) {
                d.each(i, function(k, m) {
                    m = d.isFunction(m) ? {
                        click: m,
                        text: k
                    } : m;
                    var l = d('<button type="button"></button>').attr(m, true).unbind("click").click(function() {
                        m.click.apply(h.element[0], arguments)
                    }).appendTo(j);
                    if (d.fn.button) {
                        l.button()
                    }
                });
                g.appendTo(h.uiDialog)
            }
        },
        _makeDraggable: function() {
            var f = this, i = f.options, j = d(document), h;
            function g(k) {
                return {
                    position: k.position,
                    offset: k.offset
                }
            }
            f.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(k, l) {
                    h = i.height === "auto" ? "auto" : d(this).height();
                    d(this).height(d(this).height()).addClass("ui-dialog-dragging");
                    f._trigger("dragStart", k, g(l))
                },
                drag: function(k, l) {
                    f._trigger("drag", k, g(l))
                },
                stop: function(k, l) {
                    i.position = [l.position.left - j.scrollLeft(), l.position.top - j.scrollTop()];
                    d(this).removeClass("ui-dialog-dragging").height(h);
                    f._trigger("dragStop", k, g(l));
                    d.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(k) {
            k = (k === e ? this.options.resizable : k);
            var g = this
              , j = g.options
              , f = g.uiDialog.css("position")
              , i = (typeof k === "string" ? k : "n,e,s,w,se,sw,ne,nw");
            function h(l) {
                return {
                    originalPosition: l.originalPosition,
                    originalSize: l.originalSize,
                    position: l.position,
                    size: l.size
                }
            }
            g.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: g.element,
                maxWidth: j.maxWidth,
                maxHeight: j.maxHeight,
                minWidth: j.minWidth,
                minHeight: g._minHeight(),
                handles: i,
                start: function(l, m) {
                    d(this).addClass("ui-dialog-resizing");
                    g._trigger("resizeStart", l, h(m))
                },
                resize: function(l, m) {
                    g._trigger("resize", l, h(m))
                },
                stop: function(l, m) {
                    d(this).removeClass("ui-dialog-resizing");
                    j.height = d(this).height();
                    j.width = d(this).width();
                    g._trigger("resizeStop", l, h(m));
                    d.ui.dialog.overlay.resize()
                }
            }).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var f = this.options;
            if (f.height === "auto") {
                return f.minHeight
            } else {
                return Math.min(f.minHeight, f.height)
            }
        },
        _position: function(g) {
            var h = [], i = [0, 0], f;
            if (g) {
                if (typeof g === "string" || (typeof g === "object" && "0"in g)) {
                    h = g.split ? g.split(" ") : [g[0], g[1]];
                    if (h.length === 1) {
                        h[1] = h[0]
                    }
                    d.each(["left", "top"], function(k, j) {
                        if (+h[k] === h[k]) {
                            i[k] = h[k];
                            h[k] = j
                        }
                    });
                    g = {
                        my: h.join(" "),
                        at: h.join(" "),
                        offset: i.join(" ")
                    }
                }
                g = d.extend({}, d.ui.dialog.prototype.options.position, g)
            } else {
                g = d.ui.dialog.prototype.options.position
            }
            f = this.uiDialog.is(":visible");
            if (!f) {
                this.uiDialog.show()
            }
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(d.extend({
                of: window
            }, g));
            if (!f) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function(i) {
            var g = this
              , f = {}
              , h = false;
            d.each(i, function(j, k) {
                g._setOption(j, k);
                if (j in a) {
                    h = true
                }
                if (j in c) {
                    f[j] = k
                }
            });
            if (h) {
                this._size()
            }
            if (this.uiDialog.is(":data(resizable)")) {
                this.uiDialog.resizable("option", f)
            }
        },
        _setOption: function(i, j) {
            var g = this
              , f = g.uiDialog;
            switch (i) {
            case "beforeclose":
                i = "beforeClose";
                break;
            case "buttons":
                g._createButtons(j);
                break;
            case "closeText":
                g.uiDialogTitlebarCloseText.text("" + j);
                break;
            case "dialogClass":
                f.removeClass(g.options.dialogClass).addClass(b + j);
                break;
            case "disabled":
                if (j) {
                    f.addClass("ui-dialog-disabled")
                } else {
                    f.removeClass("ui-dialog-disabled")
                }
                break;
            case "draggable":
                var h = f.is(":data(draggable)");
                if (h && !j) {
                    f.draggable("destroy")
                }
                if (!h && j) {
                    g._makeDraggable()
                }
                break;
            case "position":
                g._position(j);
                break;
            case "resizable":
                var k = f.is(":data(resizable)");
                if (k && !j) {
                    f.resizable("destroy")
                }
                if (k && typeof j === "string") {
                    f.resizable("option", "handles", j)
                }
                if (!k && j !== false) {
                    g._makeResizable(j)
                }
                break;
            case "title":
                d(".ui-dialog-title", g.uiDialogTitlebar).html("" + (j || "&#160;"));
                break
            }
            d.Widget.prototype._setOption.apply(g, arguments)
        },
        _size: function() {
            var j = this.options, g, i, f = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (j.minWidth > j.width) {
                j.width = j.minWidth
            }
            g = this.uiDialog.css({
                height: "auto",
                width: j.width
            }).height();
            i = Math.max(0, j.minHeight - g);
            if (j.height === "auto") {
                if (d.support.minHeight) {
                    this.element.css({
                        minHeight: i,
                        height: "auto"
                    })
                } else {
                    this.uiDialog.show();
                    var h = this.element.css("height", "auto").height();
                    if (!f) {
                        this.uiDialog.hide()
                    }
                    this.element.height(Math.max(h, i))
                }
            } else {
                this.element.height(Math.max(j.height - g, 0))
            }
            if (this.uiDialog.is(":data(resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }
    });
    d.extend(d.ui.dialog, {
        version: "1.8.7",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(f) {
            var g = f.attr("id");
            if (!g) {
                this.uuid += 1;
                g = this.uuid
            }
            return "ui-dialog-title-" + g
        },
        overlay: function(f) {
            this.$el = d.ui.dialog.overlay.create(f)
        }
    });
    d.extend(d.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: d.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(f) {
            return f + ".dialog-overlay"
        }).join(" "),
        create: function(g) {
            if (this.instances.length === 0) {
                setTimeout(function() {
                    if (d.ui.dialog.overlay.instances.length) {
                        d(document).bind(d.ui.dialog.overlay.events, function(h) {
                            if (d(h.target).zIndex() < d.ui.dialog.overlay.maxZ) {
                                return false
                            }
                        })
                    }
                }, 1);
                d(document).bind("keydown.dialog-overlay", function(h) {
                    if (g.options.closeOnEscape && h.keyCode && h.keyCode === d.ui.keyCode.ESCAPE) {
                        g.close(h);
                        h.preventDefault()
                    }
                });
                d(window).bind("resize.dialog-overlay", d.ui.dialog.overlay.resize)
            }
            var f = (this.oldInstances.pop() || d("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            if (d.fn.bgiframe) {
                f.bgiframe()
            }
            this.instances.push(f);
            return f
        },
        destroy: function(f) {
            var g = d.inArray(f, this.instances);
            if (g != -1) {
                this.oldInstances.push(this.instances.splice(g, 1)[0])
            }
            if (this.instances.length === 0) {
                d([document, window]).unbind(".dialog-overlay")
            }
            f.remove();
            var h = 0;
            d.each(this.instances, function() {
                h = Math.max(h, this.css("z-index"))
            });
            this.maxZ = h
        },
        height: function() {
            var g, f;
            if (d.browser.msie && d.browser.version < 7) {
                g = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                f = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (g < f) {
                    return d(window).height() + "px"
                } else {
                    return g + "px"
                }
            } else {
                return d(document).height() + "px"
            }
        },
        width: function() {
            var f, g;
            if (d.browser.msie && d.browser.version < 7) {
                f = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                g = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (f < g) {
                    return d(window).width() + "px"
                } else {
                    return f + "px"
                }
            } else {
                return d(document).width() + "px"
            }
        },
        resize: function() {
            var f = d([]);
            d.each(d.ui.dialog.overlay.instances, function() {
                f = f.add(this)
            });
            f.css({
                width: 0,
                height: 0
            }).css({
                width: d.ui.dialog.overlay.width(),
                height: d.ui.dialog.overlay.height()
            })
        }
    });
    d.extend(d.ui.dialog.overlay.prototype, {
        destroy: function() {
            d.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery));
(function(f, g) {
    f.ui = f.ui || {};
    var d = /left|center|right/
      , e = /top|center|bottom/
      , a = "center"
      , b = f.fn.position
      , c = f.fn.offset;
    f.fn.position = function(i) {
        if (!i || !i.of) {
            return b.apply(this, arguments)
        }
        i = f.extend({}, i);
        var m = f(i.of), l = m[0], o = (i.collision || "flip").split(" "), n = i.offset ? i.offset.split(" ") : [0, 0], k, h, j;
        if (l.nodeType === 9) {
            k = m.width();
            h = m.height();
            j = {
                top: 0,
                left: 0
            }
        } else {
            if (l.setTimeout) {
                k = m.width();
                h = m.height();
                j = {
                    top: m.scrollTop(),
                    left: m.scrollLeft()
                }
            } else {
                if (l.preventDefault) {
                    i.at = "left top";
                    k = h = 0;
                    j = {
                        top: i.of.pageY,
                        left: i.of.pageX
                    }
                } else {
                    k = m.outerWidth();
                    h = m.outerHeight();
                    j = m.offset()
                }
            }
        }
        f.each(["my", "at"], function() {
            var p = (i[this] || "").split(" ");
            if (p.length === 1) {
                p = d.test(p[0]) ? p.concat([a]) : e.test(p[0]) ? [a].concat(p) : [a, a]
            }
            p[0] = d.test(p[0]) ? p[0] : a;
            p[1] = e.test(p[1]) ? p[1] : a;
            i[this] = p
        });
        if (o.length === 1) {
            o[1] = o[0]
        }
        n[0] = parseInt(n[0], 10) || 0;
        if (n.length === 1) {
            n[1] = n[0]
        }
        n[1] = parseInt(n[1], 10) || 0;
        if (i.at[0] === "right") {
            j.left += k
        } else {
            if (i.at[0] === a) {
                j.left += k / 2
            }
        }
        if (i.at[1] === "bottom") {
            j.top += h
        } else {
            if (i.at[1] === a) {
                j.top += h / 2
            }
        }
        j.left += n[0];
        j.top += n[1];
        return this.each(function() {
            var s = f(this), v = s.outerWidth(), r = s.outerHeight(), u = parseInt(f.curCSS(this, "marginLeft", true)) || 0, q = parseInt(f.curCSS(this, "marginTop", true)) || 0, x = v + u + parseInt(f.curCSS(this, "marginRight", true)) || 0, y = r + q + parseInt(f.curCSS(this, "marginBottom", true)) || 0, w = f.extend({}, j), p;
            if (i.my[0] === "right") {
                w.left -= v
            } else {
                if (i.my[0] === a) {
                    w.left -= v / 2
                }
            }
            if (i.my[1] === "bottom") {
                w.top -= r
            } else {
                if (i.my[1] === a) {
                    w.top -= r / 2
                }
            }
            w.left = Math.round(w.left);
            w.top = Math.round(w.top);
            p = {
                left: w.left - u,
                top: w.top - q
            };
            f.each(["left", "top"], function(A, z) {
                if (f.ui.position[o[A]]) {
                    f.ui.position[o[A]][z](w, {
                        targetWidth: k,
                        targetHeight: h,
                        elemWidth: v,
                        elemHeight: r,
                        collisionPosition: p,
                        collisionWidth: x,
                        collisionHeight: y,
                        offset: n,
                        my: i.my,
                        at: i.at
                    })
                }
            });
            if (f.fn.bgiframe) {
                s.bgiframe()
            }
            s.offset(f.extend(w, {
                using: i.using
            }))
        })
    }
    ;
    f.ui.position = {
        fit: {
            left: function(h, i) {
                var k = f(window)
                  , j = i.collisionPosition.left + i.collisionWidth - k.width() - k.scrollLeft();
                h.left = j > 0 ? h.left - j : Math.max(h.left - i.collisionPosition.left, h.left)
            },
            top: function(h, i) {
                var k = f(window)
                  , j = i.collisionPosition.top + i.collisionHeight - k.height() - k.scrollTop();
                h.top = j > 0 ? h.top - j : Math.max(h.top - i.collisionPosition.top, h.top)
            }
        },
        flip: {
            left: function(i, k) {
                if (k.at[0] === a) {
                    return
                }
                var m = f(window)
                  , l = k.collisionPosition.left + k.collisionWidth - m.width() - m.scrollLeft()
                  , h = k.my[0] === "left" ? -k.elemWidth : k.my[0] === "right" ? k.elemWidth : 0
                  , j = k.at[0] === "left" ? k.targetWidth : -k.targetWidth
                  , n = -2 * k.offset[0];
                i.left += k.collisionPosition.left < 0 ? h + j + n : l > 0 ? h + j + n : 0
            },
            top: function(i, k) {
                if (k.at[1] === a) {
                    return
                }
                var m = f(window)
                  , l = k.collisionPosition.top + k.collisionHeight - m.height() - m.scrollTop()
                  , h = k.my[1] === "top" ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0
                  , j = k.at[1] === "top" ? k.targetHeight : -k.targetHeight
                  , n = -2 * k.offset[1];
                i.top += k.collisionPosition.top < 0 ? h + j + n : l > 0 ? h + j + n : 0
            }
        }
    };
    if (!f.offset.setOffset) {
        f.offset.setOffset = function(l, i) {
            if (/static/.test(f.curCSS(l, "position"))) {
                l.style.position = "relative"
            }
            var k = f(l)
              , n = k.offset()
              , h = parseInt(f.curCSS(l, "top", true), 10) || 0
              , m = parseInt(f.curCSS(l, "left", true), 10) || 0
              , j = {
                top: (i.top - n.top) + h,
                left: (i.left - n.left) + m
            };
            if ("using"in i) {
                i.using.call(l, j)
            } else {
                k.css(j)
            }
        }
        ;
        f.fn.offset = function(h) {
            var i = this[0];
            if (!i || !i.ownerDocument) {
                return null
            }
            if (h) {
                return this.each(function() {
                    f.offset.setOffset(this, h)
                })
            }
            return c.call(this)
        }
    }
}(jQuery));
(function(a, b) {
    a.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            a.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function(c) {
            if (c === b) {
                return this._value()
            }
            this._setOption("value", c);
            return this
        },
        _setOption: function(c, d) {
            if (c === "value") {
                this.options.value = d;
                this._refreshValue();
                if (this._value() === this.options.max) {
                    this._trigger("complete")
                }
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function() {
            var c = this.options.value;
            if (typeof c !== "number") {
                c = 0
            }
            return Math.min(this.options.max, Math.max(this.min, c))
        },
        _percentage: function() {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function() {
            var d = this.value();
            var c = this._percentage();
            if (this.oldValue !== d) {
                this.oldValue = d;
                this._trigger("change")
            }
            this.valueDiv.toggleClass("ui-corner-right", d === this.options.max).width(c.toFixed(0) + "%");
            this.element.attr("aria-valuenow", d)
        }
    });
    a.extend(a.ui.progressbar, {
        version: "1.8.7"
    })
}
)(jQuery);
(function(b, c) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var d = this
              , e = this.options;
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            if (e.disabled) {
                this.element.addClass("ui-slider-disabled ui-disabled")
            }
            this.range = b([]);
            if (e.range) {
                if (e.range === true) {
                    this.range = b("<div></div>");
                    if (!e.values) {
                        e.values = [this._valueMin(), this._valueMin()]
                    }
                    if (e.values.length && e.values.length !== 2) {
                        e.values = [e.values[0], e.values[0]]
                    }
                } else {
                    this.range = b("<div></div>")
                }
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (e.range === "min" || e.range === "max") {
                    this.range.addClass("ui-slider-range-" + e.range)
                }
                this.range.addClass("ui-widget-header")
            }
            if (b(".ui-slider-handle", this.element).length === 0) {
                b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
            }
            if (e.values && e.values.length) {
                while (b(".ui-slider-handle", this.element).length < e.values.length) {
                    b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
                }
            }
            this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(f) {
                f.preventDefault()
            }).hover(function() {
                if (!e.disabled) {
                    b(this).addClass("ui-state-hover")
                }
            }, function() {
                b(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (!e.disabled) {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                } else {
                    b(this).blur()
                }
            }).blur(function() {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(f) {
                b(this).data("index.ui-slider-handle", f)
            });
            this.handles.keydown(function(k) {
                var h = true, g = b(this).data("index.ui-slider-handle"), l, i, f, j;
                if (d.options.disabled) {
                    return
                }
                switch (k.keyCode) {
                case b.ui.keyCode.HOME:
                case b.ui.keyCode.END:
                case b.ui.keyCode.PAGE_UP:
                case b.ui.keyCode.PAGE_DOWN:
                case b.ui.keyCode.UP:
                case b.ui.keyCode.RIGHT:
                case b.ui.keyCode.DOWN:
                case b.ui.keyCode.LEFT:
                    h = false;
                    if (!d._keySliding) {
                        d._keySliding = true;
                        b(this).addClass("ui-state-active");
                        l = d._start(k, g);
                        if (l === false) {
                            return
                        }
                    }
                    break
                }
                j = d.options.step;
                if (d.options.values && d.options.values.length) {
                    i = f = d.values(g)
                } else {
                    i = f = d.value()
                }
                switch (k.keyCode) {
                case b.ui.keyCode.HOME:
                    f = d._valueMin();
                    break;
                case b.ui.keyCode.END:
                    f = d._valueMax();
                    break;
                case b.ui.keyCode.PAGE_UP:
                    f = d._trimAlignValue(i + ((d._valueMax() - d._valueMin()) / a));
                    break;
                case b.ui.keyCode.PAGE_DOWN:
                    f = d._trimAlignValue(i - ((d._valueMax() - d._valueMin()) / a));
                    break;
                case b.ui.keyCode.UP:
                case b.ui.keyCode.RIGHT:
                    if (i === d._valueMax()) {
                        return
                    }
                    f = d._trimAlignValue(i + j);
                    break;
                case b.ui.keyCode.DOWN:
                case b.ui.keyCode.LEFT:
                    if (i === d._valueMin()) {
                        return
                    }
                    f = d._trimAlignValue(i - j);
                    break
                }
                d._slide(k, g, f);
                return h
            }).keyup(function(g) {
                var f = b(this).data("index.ui-slider-handle");
                if (d._keySliding) {
                    d._keySliding = false;
                    d._stop(g, f);
                    d._change(g, f);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(f) {
            var g = this.options, j, l, e, h, n, k, m, i, d;
            if (g.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            j = {
                x: f.pageX,
                y: f.pageY
            };
            l = this._normValueFromMouse(j);
            e = this._valueMax() - this._valueMin() + 1;
            n = this;
            this.handles.each(function(o) {
                var p = Math.abs(l - n.values(o));
                if (e > p) {
                    e = p;
                    h = b(this);
                    k = o
                }
            });
            if (g.range === true && this.values(1) === g.min) {
                k += 1;
                h = b(this.handles[k])
            }
            m = this._start(f, k);
            if (m === false) {
                return false
            }
            this._mouseSliding = true;
            n._handleIndex = k;
            h.addClass("ui-state-active").focus();
            i = h.offset();
            d = !b(f.target).parents().andSelf().is(".ui-slider-handle");
            this._clickOffset = d ? {
                left: 0,
                top: 0
            } : {
                left: f.pageX - i.left - (h.width() / 2),
                top: f.pageY - i.top - (h.height() / 2) - (parseInt(h.css("borderTopWidth"), 10) || 0) - (parseInt(h.css("borderBottomWidth"), 10) || 0) + (parseInt(h.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(f, k, l)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function(d) {
            return true
        },
        _mouseDrag: function(f) {
            var d = {
                x: f.pageX,
                y: f.pageY
            }
              , e = this._normValueFromMouse(d);
            this._slide(f, this._handleIndex, e);
            return false
        },
        _mouseStop: function(d) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(d, this._handleIndex);
            this._change(d, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var d, h, g, f, i;
            if (this.orientation === "horizontal") {
                d = this.elementSize.width;
                h = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                d = this.elementSize.height;
                h = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            g = (h / d);
            if (g > 1) {
                g = 1
            }
            if (g < 0) {
                g = 0
            }
            if (this.orientation === "vertical") {
                g = 1 - g
            }
            f = this._valueMax() - this._valueMin();
            i = this._valueMin() + g * f;
            return this._trimAlignValue(i)
        },
        _start: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            return this._trigger("start", f, d)
        },
        _slide: function(h, g, f) {
            var d, e, i;
            if (this.options.values && this.options.values.length) {
                d = this.values(g ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((g === 0 && f > d) || (g === 1 && f < d))) {
                    f = d
                }
                if (f !== this.values(g)) {
                    e = this.values();
                    e[g] = f;
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f,
                        values: e
                    });
                    d = this.values(g ? 0 : 1);
                    if (i !== false) {
                        this.values(g, f, true)
                    }
                }
            } else {
                if (f !== this.value()) {
                    i = this._trigger("slide", h, {
                        handle: this.handles[g],
                        value: f
                    });
                    if (i !== false) {
                        this.value(f)
                    }
                }
            }
        },
        _stop: function(f, e) {
            var d = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                d.value = this.values(e);
                d.values = this.values()
            }
            this._trigger("stop", f, d)
        },
        _change: function(f, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var d = {
                    handle: this.handles[e],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    d.value = this.values(e);
                    d.values = this.values()
                }
                this._trigger("change", f, d)
            }
        },
        value: function(d) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(d);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function(e, h) {
            var g, d, f;
            if (arguments.length > 1) {
                this.options.values[e] = this._trimAlignValue(h);
                this._refreshValue();
                this._change(null, e)
            }
            if (arguments.length) {
                if (b.isArray(arguments[0])) {
                    g = this.options.values;
                    d = arguments[0];
                    for (f = 0; f < g.length; f += 1) {
                        g[f] = this._trimAlignValue(d[f]);
                        this._change(null, f)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(e)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function(e, f) {
            var d, g = 0;
            if (b.isArray(this.options.values)) {
                g = this.options.values.length
            }
            b.Widget.prototype._setOption.apply(this, arguments);
            switch (e) {
            case "disabled":
                if (f) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (d = 0; d < g; d += 1) {
                    this._change(null, d)
                }
                this._animateOff = false;
                break
            }
        },
        _value: function() {
            var d = this.options.value;
            d = this._trimAlignValue(d);
            return d
        },
        _values: function(d) {
            var g, f, e;
            if (arguments.length) {
                g = this.options.values[d];
                g = this._trimAlignValue(g);
                return g
            } else {
                f = this.options.values.slice();
                for (e = 0; e < f.length; e += 1) {
                    f[e] = this._trimAlignValue(f[e])
                }
                return f
            }
        },
        _trimAlignValue: function(f) {
            if (f <= this._valueMin()) {
                return this._valueMin()
            }
            if (f >= this._valueMax()) {
                return this._valueMax()
            }
            var d = (this.options.step > 0) ? this.options.step : 1
              , e = (f - this._valueMin()) % d;
            alignValue = f - e;
            if (Math.abs(e) * 2 >= d) {
                alignValue += (e > 0) ? d : (-d)
            }
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var g = this.options.range, f = this.options, m = this, e = (!this._animateOff) ? f.animate : false, h, d = {}, i, k, j, l;
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(o, n) {
                    h = (m.values(o) - m._valueMin()) / (m._valueMax() - m._valueMin()) * 100;
                    d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                    b(this).stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                    if (m.options.range === true) {
                        if (m.orientation === "horizontal") {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    left: h + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    width: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        } else {
                            if (o === 0) {
                                m.range.stop(1, 1)[e ? "animate" : "css"]({
                                    bottom: (h) + "%"
                                }, f.animate)
                            }
                            if (o === 1) {
                                m.range[e ? "animate" : "css"]({
                                    height: (h - i) + "%"
                                }, {
                                    queue: false,
                                    duration: f.animate
                                })
                            }
                        }
                    }
                    i = h
                })
            } else {
                k = this.value();
                j = this._valueMin();
                l = this._valueMax();
                h = (l !== j) ? (k - j) / (l - j) * 100 : 0;
                d[m.orientation === "horizontal" ? "left" : "bottom"] = h + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](d, f.animate);
                if (g === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        width: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "horizontal") {
                    this.range[e ? "animate" : "css"]({
                        width: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
                if (g === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[e ? "animate" : "css"]({
                        height: h + "%"
                    }, f.animate)
                }
                if (g === "max" && this.orientation === "vertical") {
                    this.range[e ? "animate" : "css"]({
                        height: (100 - h) + "%"
                    }, {
                        queue: false,
                        duration: f.animate
                    })
                }
            }
        }
    });
    b.extend(b.ui.slider, {
        version: "1.8.7"
    })
}(jQuery));
(function(d, f) {
    var c = 0
      , b = 0;
    function e() {
        return ++c
    }
    function a() {
        return ++b
    }
    d.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(true)
        },
        _setOption: function(g, h) {
            if (g == "selected") {
                if (this.options.collapsible && h == this.options.selected) {
                    return
                }
                this.select(h)
            } else {
                this.options[g] = h;
                this._tabify()
            }
        },
        _tabId: function(g) {
            return g.title && g.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
        },
        _sanitizeSelector: function(g) {
            return g.replace(/:/g, "\\:")
        },
        _cookie: function() {
            var g = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + a());
            return d.cookie.apply(null, [g].concat(d.makeArray(arguments)))
        },
        _ui: function(h, g) {
            return {
                tab: h,
                panel: g,
                index: this.anchors.index(h)
            }
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var g = d(this);
                g.html(g.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function(u) {
            var v = this
              , j = this.options
              , h = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = d(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function() {
                return d("a", this)[0]
            });
            this.panels = d([]);
            this.anchors.each(function(x, o) {
                var w = d(o).attr("href");
                var y = w.split("#")[0], z;
                if (y && (y === location.toString().split("#")[0] || (z = d("base")[0]) && y === z.href)) {
                    w = o.hash;
                    o.href = w
                }
                if (h.test(w)) {
                    v.panels = v.panels.add(v.element.find(v._sanitizeSelector(w)))
                } else {
                    if (w && w !== "#") {
                        d.data(o, "href.tabs", w);
                        d.data(o, "load.tabs", w.replace(/#.*$/, ""));
                        var B = v._tabId(o);
                        o.href = "#" + B;
                        var A = v.element.find("#" + B);
                        if (!A.length) {
                            A = d(j.panelTemplate).attr("id", B).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(v.panels[x - 1] || v.list);
                            A.data("destroy.tabs", true)
                        }
                        v.panels = v.panels.add(A)
                    } else {
                        j.disabled.push(x)
                    }
                }
            });
            if (u) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (j.selected === f) {
                    if (location.hash) {
                        this.anchors.each(function(w, o) {
                            if (o.hash == location.hash) {
                                j.selected = w;
                                return false
                            }
                        })
                    }
                    if (typeof j.selected !== "number" && j.cookie) {
                        j.selected = parseInt(v._cookie(), 10)
                    }
                    if (typeof j.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) {
                        j.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                    }
                    j.selected = j.selected || (this.lis.length ? 0 : -1)
                } else {
                    if (j.selected === null) {
                        j.selected = -1
                    }
                }
                j.selected = ((j.selected >= 0 && this.anchors[j.selected]) || j.selected < 0) ? j.selected : 0;
                j.disabled = d.unique(j.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function(w, o) {
                    return v.lis.index(w)
                }))).sort();
                if (d.inArray(j.selected, j.disabled) != -1) {
                    j.disabled.splice(d.inArray(j.selected, j.disabled), 1)
                }
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (j.selected >= 0 && this.anchors.length) {
                    v.element.find(v._sanitizeSelector(v.anchors[j.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(j.selected).addClass("ui-tabs-selected ui-state-active");
                    v.element.queue("tabs", function() {
                        v._trigger("show", null, v._ui(v.anchors[j.selected], v.element.find(v._sanitizeSelector(v.anchors[j.selected].hash))))
                    });
                    this.load(j.selected)
                }
                d(window).bind("unload", function() {
                    v.lis.add(v.anchors).unbind(".tabs");
                    v.lis = v.anchors = v.panels = null
                })
            } else {
                j.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
            }
            this.element[j.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            if (j.cookie) {
                this._cookie(j.selected, j.cookie)
            }
            for (var m = 0, s; (s = this.lis[m]); m++) {
                d(s)[d.inArray(m, j.disabled) != -1 && !d(s).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            if (j.cache === false) {
                this.anchors.removeData("cache.tabs")
            }
            this.lis.add(this.anchors).unbind(".tabs");
            if (j.event !== "mouseover") {
                var l = function(o, i) {
                    if (i.is(":not(.ui-state-disabled)")) {
                        i.addClass("ui-state-" + o)
                    }
                };
                var p = function(o, i) {
                    i.removeClass("ui-state-" + o)
                };
                this.lis.bind("mouseover.tabs", function() {
                    l("hover", d(this))
                });
                this.lis.bind("mouseout.tabs", function() {
                    p("hover", d(this))
                });
                this.anchors.bind("focus.tabs", function() {
                    l("focus", d(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function() {
                    p("focus", d(this).closest("li"))
                })
            }
            var g, n;
            if (j.fx) {
                if (d.isArray(j.fx)) {
                    g = j.fx[0];
                    n = j.fx[1]
                } else {
                    g = n = j.fx
                }
            }
            function k(i, o) {
                i.css("display", "");
                if (!d.support.opacity && o.opacity) {
                    i[0].style.removeAttribute("filter")
                }
            }
            var q = n ? function(i, o) {
                d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                o.hide().removeClass("ui-tabs-hide").animate(n, n.duration || "normal", function() {
                    k(o, n);
                    v._trigger("show", null, v._ui(i, o[0]))
                })
            }
            : function(i, o) {
                d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                o.removeClass("ui-tabs-hide");
                v._trigger("show", null, v._ui(i, o[0]))
            }
            ;
            var r = g ? function(o, i) {
                i.animate(g, g.duration || "normal", function() {
                    v.lis.removeClass("ui-tabs-selected ui-state-active");
                    i.addClass("ui-tabs-hide");
                    k(i, g);
                    v.element.dequeue("tabs")
                })
            }
            : function(o, i, w) {
                v.lis.removeClass("ui-tabs-selected ui-state-active");
                i.addClass("ui-tabs-hide");
                v.element.dequeue("tabs")
            }
            ;
            this.anchors.bind(j.event + ".tabs", function() {
                var o = this
                  , x = d(o).closest("li")
                  , i = v.panels.filter(":not(.ui-tabs-hide)")
                  , w = v.element.find(v._sanitizeSelector(o.hash));
                if ((x.hasClass("ui-tabs-selected") && !j.collapsible) || x.hasClass("ui-state-disabled") || x.hasClass("ui-state-processing") || v.panels.filter(":animated").length || v._trigger("select", null, v._ui(this, w[0])) === false) {
                    this.blur();
                    return false
                }
                j.selected = v.anchors.index(this);
                v.abort();
                if (j.collapsible) {
                    if (x.hasClass("ui-tabs-selected")) {
                        j.selected = -1;
                        if (j.cookie) {
                            v._cookie(j.selected, j.cookie)
                        }
                        v.element.queue("tabs", function() {
                            r(o, i)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else {
                        if (!i.length) {
                            if (j.cookie) {
                                v._cookie(j.selected, j.cookie)
                            }
                            v.element.queue("tabs", function() {
                                q(o, w)
                            });
                            v.load(v.anchors.index(this));
                            this.blur();
                            return false
                        }
                    }
                }
                if (j.cookie) {
                    v._cookie(j.selected, j.cookie)
                }
                if (w.length) {
                    if (i.length) {
                        v.element.queue("tabs", function() {
                            r(o, i)
                        })
                    }
                    v.element.queue("tabs", function() {
                        q(o, w)
                    });
                    v.load(v.anchors.index(this))
                } else {
                    throw "jQuery UI Tabs: Mismatching fragment identifier."
                }
                if (d.browser.msie) {
                    this.blur()
                }
            });
            this.anchors.bind("click.tabs", function() {
                return false
            })
        },
        _getIndex: function(g) {
            if (typeof g == "string") {
                g = this.anchors.index(this.anchors.filter("[href$=" + g + "]"))
            }
            return g
        },
        destroy: function() {
            var g = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function() {
                var h = d.data(this, "href.tabs");
                if (h) {
                    this.href = h
                }
                var i = d(this).unbind(".tabs");
                d.each(["href", "load", "cache"], function(j, k) {
                    i.removeData(k + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function() {
                if (d.data(this, "destroy.tabs")) {
                    d(this).remove()
                } else {
                    d(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }
            });
            if (g.cookie) {
                this._cookie(null, g.cookie)
            }
            return this
        },
        add: function(j, i, h) {
            if (h === f) {
                h = this.anchors.length
            }
            var g = this
              , l = this.options
              , n = d(l.tabTemplate.replace(/#\{href\}/g, j).replace(/#\{label\}/g, i))
              , m = !j.indexOf("#") ? j.replace("#", "") : this._tabId(d("a", n)[0]);
            n.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var k = g.element.find("#" + m);
            if (!k.length) {
                k = d(l.panelTemplate).attr("id", m).data("destroy.tabs", true)
            }
            k.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (h >= this.lis.length) {
                n.appendTo(this.list);
                k.appendTo(this.list[0].parentNode)
            } else {
                n.insertBefore(this.lis[h]);
                k.insertBefore(this.panels[h])
            }
            l.disabled = d.map(l.disabled, function(p, o) {
                return p >= h ? ++p : p
            });
            this._tabify();
            if (this.anchors.length == 1) {
                l.selected = 0;
                n.addClass("ui-tabs-selected ui-state-active");
                k.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function() {
                    g._trigger("show", null, g._ui(g.anchors[0], g.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[h], this.panels[h]));
            return this
        },
        remove: function(g) {
            g = this._getIndex(g);
            var i = this.options
              , j = this.lis.eq(g).remove()
              , h = this.panels.eq(g).remove();
            if (j.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(g + (g + 1 < this.anchors.length ? 1 : -1))
            }
            i.disabled = d.map(d.grep(i.disabled, function(l, k) {
                return l != g
            }), function(l, k) {
                return l >= g ? --l : l
            });
            this._tabify();
            this._trigger("remove", null, this._ui(j.find("a")[0], h[0]));
            return this
        },
        enable: function(g) {
            g = this._getIndex(g);
            var h = this.options;
            if (d.inArray(g, h.disabled) == -1) {
                return
            }
            this.lis.eq(g).removeClass("ui-state-disabled");
            h.disabled = d.grep(h.disabled, function(k, j) {
                return k != g
            });
            this._trigger("enable", null, this._ui(this.anchors[g], this.panels[g]));
            return this
        },
        disable: function(h) {
            h = this._getIndex(h);
            var g = this
              , i = this.options;
            if (h != i.selected) {
                this.lis.eq(h).addClass("ui-state-disabled");
                i.disabled.push(h);
                i.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[h], this.panels[h]))
            }
            return this
        },
        select: function(g) {
            g = this._getIndex(g);
            if (g == -1) {
                if (this.options.collapsible && this.options.selected != -1) {
                    g = this.options.selected
                } else {
                    return this
                }
            }
            this.anchors.eq(g).trigger(this.options.event + ".tabs");
            return this
        },
        load: function(j) {
            j = this._getIndex(j);
            var h = this
              , l = this.options
              , g = this.anchors.eq(j)[0]
              , i = d.data(g, "load.tabs");
            this.abort();
            if (!i || this.element.queue("tabs").length !== 0 && d.data(g, "cache.tabs")) {
                this.element.dequeue("tabs");
                return
            }
            this.lis.eq(j).addClass("ui-state-processing");
            if (l.spinner) {
                var k = d("span", g);
                k.data("label.tabs", k.html()).html(l.spinner)
            }
            this.xhr = d.ajax(d.extend({}, l.ajaxOptions, {
                url: i,
                success: function(n, m) {
                    h.element.find(h._sanitizeSelector(g.hash)).html(n);
                    h._cleanup();
                    if (l.cache) {
                        d.data(g, "cache.tabs", true)
                    }
                    h._trigger("load", null, h._ui(h.anchors[j], h.panels[j]));
                    try {
                        l.ajaxOptions.success(n, m)
                    } catch (o) {}
                },
                error: function(o, m, n) {
                    h._cleanup();
                    h._trigger("load", null, h._ui(h.anchors[j], h.panels[j]));
                    try {
                        l.ajaxOptions.error(o, m, j, g)
                    } catch (n) {}
                }
            }));
            h.element.dequeue("tabs");
            return this
        },
        abort: function() {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function(h, g) {
            this.anchors.eq(h).removeData("cache.tabs").data("load.tabs", g);
            return this
        },
        length: function() {
            return this.anchors.length
        }
    });
    d.extend(d.ui.tabs, {
        version: "1.8.7"
    });
    d.extend(d.ui.tabs.prototype, {
        rotation: null,
        rotate: function(i, k) {
            var g = this
              , l = this.options;
            var h = g._rotate || (g._rotate = function(m) {
                clearTimeout(g.rotation);
                g.rotation = setTimeout(function() {
                    var n = l.selected;
                    g.select(++n < g.anchors.length ? n : 0)
                }, i);
                if (m) {
                    m.stopPropagation()
                }
            }
            );
            var j = g._unrotate || (g._unrotate = !k ? function(m) {
                if (m.clientX) {
                    g.rotate(null)
                }
            }
            : function(m) {
                t = l.selected;
                h()
            }
            );
            if (i) {
                this.element.bind("tabsshow", h);
                this.anchors.bind(l.event + ".tabs", j);
                h()
            } else {
                clearTimeout(g.rotation);
                this.element.unbind("tabsshow", h);
                this.anchors.unbind(l.event + ".tabs", j);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
}
)(jQuery);
if (!this.JSON) {
    this.JSON = {}
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
