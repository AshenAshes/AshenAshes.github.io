function lazy () {
  $(".lazy").lazyload();
}
function dowmdiv () {
  document.body.scrollHeight > window.innerHeight ? ($("#bottom-outer").css({ position: "relative" }), $("#top-button").css({ display: "block" })) : ($(".up").css({ display: "none" }), $("#bottom-outer").css({ position: "absolute", bottom: 0, left: 0 }));
}
function toc () {
  $(".post-toc-btn").click(function () {
    $(".post-toc").exist() ? $(".post-toc-box").fadeToggle() : $(".post-toc-none").fadeToggle();
  });
  var t = $("html, body");
  $(".post-toc-link").click(function () {
    return t.animate({ scrollTop: $($.attr(this, "href")).offset().top }, 500), !1;
  });
}
function links () {
  var t = $(".post-author-link");
  $(".post-author-button").click(function () {
    "none" === t.css("display")
      ? t.css({ display: "block" }).animate({ right: "60px", opacity: 1 }, 500)
      : (t.animate({ opacity: 0 }, 500),
        setTimeout(function () {
          t.css({ display: "none", right: "100px" });
        }, 500));
  });
}
function menu () {
  var t = window.location.href,
    e = /[-:\\\/.][1-9][0-9][0-9][0-9][-:\\\/.][0-9][0-9][-:\\\/.][0-9][0-9][-:\\\/.]/,
    n = $(".nav-btn"),
    i = $("#menu");
  document.getElementById("menu").dataset.home;
  e.test(t)
    ? (i.unbind(),
      n.addClass("back"),
      i.on("click", function () {
        window.history.length <= 2 ? i.attr("href", "/") : (i.attr("href", "javascript:void(0)"), window.history.back());
      }))
    : (n.removeClass("back"),
      i.unbind(),
      setTimeout(function () {
        i.sideNav({ menuWidth: 250, edge: "left", closeOnClick: !1, draggable: !0 });
      }));
}
!(function (t, e) {
  "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? (module.exports = e()) : (t.NProgress = e());
})(this, function () {
  function t (t, e, n) {
    return t < e ? e : t > n ? n : t;
  }
  function e (t) {
    return 100 * (-1 + t);
  }
  function n (t, n, i) {
    var a;
    return (a = "translate3d" === l.positionUsing ? { transform: "translate3d(" + e(t) + "%,0,0)" } : "translate" === l.positionUsing ? { transform: "translate(" + e(t) + "%,0)" } : { "margin-left": e(t) + "%" }), (a.transition = "all " + n + "ms " + i), a;
  }
  function i (t, e) {
    return ("string" == typeof t ? t : o(t)).indexOf(" " + e + " ") >= 0;
  }
  function a (t, e) {
    var n = o(t),
      a = n + e;
    i(n, e) || (t.className = a.substring(1));
  }
  function r (t, e) {
    var n,
      a = o(t);
    i(t, e) && ((n = a.replace(" " + e + " ", " ")), (t.className = n.substring(1, n.length - 1)));
  }
  function o (t) {
    return (" " + (t.className || "") + " ").replace(/\s+/gi, " ");
  }
  function s (t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  var c = {};
  c.version = "0.2.0";
  var l = (c.settings = { minimum: 0.08, easing: "ease", positionUsing: "", speed: 200, trickle: !0, trickleRate: 0.02, trickleSpeed: 800, showSpinner: !0, barSelector: '[role="bar"]', spinnerSelector: '[role="spinner"]', parent: "body", template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>' });
  (c.configure = function (t) {
    var e, n;
    for (e in t) void 0 !== (n = t[e]) && t.hasOwnProperty(e) && (l[e] = n);
    return this;
  }),
    (c.status = null),
    (c.set = function (e) {
      var i = c.isStarted();
      (e = t(e, l.minimum, 1)), (c.status = 1 === e ? null : e);
      var a = c.render(!i),
        r = a.querySelector(l.barSelector),
        o = l.speed,
        s = l.easing;
      return (
        a.offsetWidth,
        h(function (t) {
          "" === l.positionUsing && (l.positionUsing = c.getPositioningCSS()),
            u(r, n(e, o, s)),
            1 === e
              ? (u(a, { transition: "none", opacity: 1 }),
                a.offsetWidth,
                setTimeout(function () {
                  u(a, { transition: "all " + o + "ms linear", opacity: 0 }),
                    setTimeout(function () {
                      c.remove(), t();
                    }, o);
                }, o))
              : setTimeout(t, o);
        }),
        this
      );
    }),
    (c.isStarted = function () {
      return "number" == typeof c.status;
    }),
    (c.start = function () {
      c.status || c.set(0);
      var t = function () {
        setTimeout(function () {
          c.status && (c.trickle(), t());
        }, l.trickleSpeed);
      };
      return l.trickle && t(), this;
    }),
    (c.done = function (t) {
      return t || c.status ? c.inc(0.3 + 0.5 * Math.random()).set(1) : this;
    }),
    (c.inc = function (e) {
      var n = c.status;
      return n ? ("number" != typeof e && (e = (1 - n) * t(Math.random() * n, 0.1, 0.95)), (n = t(n + e, 0, 0.994)), c.set(n)) : c.start();
    }),
    (c.trickle = function () {
      return c.inc(Math.random() * l.trickleRate);
    }),
    (function () {
      var t = 0,
        e = 0;
      c.promise = function (n) {
        return n && "resolved" !== n.state()
          ? (0 === e && c.start(),
            t++,
            e++,
            n.always(function () {
              e--, 0 === e ? ((t = 0), c.done()) : c.set((t - e) / t);
            }),
            this)
          : this;
      };
    })(),
    (c.render = function (t) {
      if (c.isRendered()) return document.getElementById("nprogress");
      a(document.documentElement, "nprogress-busy");
      var n = document.createElement("div");
      (n.id = "nprogress"), (n.innerHTML = l.template);
      var i,
        r = n.querySelector(l.barSelector),
        o = t ? "-100" : e(c.status || 0),
        h = document.querySelector(l.parent);
      return u(r, { transition: "all 0 linear", transform: "translate3d(" + o + "%,0,0)" }), l.showSpinner || ((i = n.querySelector(l.spinnerSelector)) && s(i)), h != document.body && a(h, "nprogress-custom-parent"), h.appendChild(n), n;
    }),
    (c.remove = function () {
      r(document.documentElement, "nprogress-busy"), r(document.querySelector(l.parent), "nprogress-custom-parent");
      var t = document.getElementById("nprogress");
      t && s(t);
    }),
    (c.isRendered = function () {
      return !!document.getElementById("nprogress");
    }),
    (c.getPositioningCSS = function () {
      var t = document.body.style,
        e = "WebkitTransform" in t ? "Webkit" : "MozTransform" in t ? "Moz" : "msTransform" in t ? "ms" : "OTransform" in t ? "O" : "";
      return e + "Perspective" in t ? "translate3d" : e + "Transform" in t ? "translate" : "margin";
    });
  var h = (function () {
    function t () {
      var n = e.shift();
      n && n(t);
    }
    var e = [];
    return function (n) {
      e.push(n), 1 == e.length && t();
    };
  })(),
    u = (function () {
      function t (t) {
        return t.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (t, e) {
          return e.toUpperCase();
        });
      }
      function e (t) {
        var e = document.body.style;
        if (t in e) return t;
        for (var n, i = a.length, r = t.charAt(0).toUpperCase() + t.slice(1); i--;) if ((n = a[i] + r) in e) return n;
        return t;
      }
      function n (n) {
        return (n = t(n)), r[n] || (r[n] = e(n));
      }
      function i (t, e, i) {
        (e = n(e)), (t.style[e] = i);
      }
      var a = ["Webkit", "O", "Moz", "ms"],
        r = {};
      return function (t, e) {
        var n,
          a,
          r = arguments;
        if (2 == r.length) for (n in e) void 0 !== (a = e[n]) && e.hasOwnProperty(n) && i(t, n, a);
        else i(t, r[1], r[2]);
      };
    })();
  return c;
}),
  (function (t) {
    function e (e, i, a) {
      return (
        (a = m(i, a)),
        this.on("click.pjax", e, function (e) {
          var i = a;
          i.container || ((i = t.extend({}, a)), (i.container = t(this).attr("data-pjax"))), n(e, i);
        })
      );
    }
    function n (e, n, i) {
      i = m(n, i);
      var r = e.currentTarget,
        o = t(r);
      if ("A" !== r.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
      if (!(e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== r.protocol || location.hostname !== r.hostname || (r.href.indexOf("#") > -1 && p(r) == p(location)) || e.isDefaultPrevented())) {
        var s = { url: r.href, container: o.attr("data-pjax"), target: r },
          c = t.extend({}, s, i),
          l = t.Event("pjax:click");
        o.trigger(l, [c]), l.isDefaultPrevented() || (a(c), e.preventDefault(), o.trigger("pjax:clicked", [c]));
      }
    }
    function i (e, n, i) {
      i = m(n, i);
      var r = e.currentTarget,
        o = t(r);
      if ("FORM" !== r.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
      var s = { type: (o.attr("method") || "GET").toUpperCase(), url: o.attr("action"), container: o.attr("data-pjax"), target: r };
      if ("GET" !== s.type && void 0 !== window.FormData) (s.data = new FormData(r)), (s.processData = !1), (s.contentType = !1);
      else {
        if (o.find(":file").length) return;
        s.data = o.serializeArray();
      }
      a(t.extend({}, s, i)), e.preventDefault();
    }
    function a (e) {
      function n (n, i, a) {
        a || (a = {}), (a.relatedTarget = e.target);
        var r = t.Event(n, a);
        return s.trigger(r, i), !r.isDefaultPrevented();
      }
      (e = t.extend(!0, {}, t.ajaxSettings, a.defaults, e)), t.isFunction(e.url) && (e.url = e.url());
      var i = d(e.url).hash,
        r = t.type(e.container);
      if ("string" !== r) throw "expected string value for 'container' option; got " + r;
      var s = (e.context = t(e.container));
      if (!s.length) throw "the container selector '" + e.container + "' did not match anything";
      e.data || (e.data = {}), t.isArray(e.data) ? e.data.push({ name: "_pjax", value: e.container }) : (e.data._pjax = e.container);
      var c;
      (e.beforeSend = function (t, a) {
        if (("GET" !== a.type && (a.timeout = 0), t.setRequestHeader("X-PJAX", "true"), t.setRequestHeader("X-PJAX-Container", e.container), !n("pjax:beforeSend", [t, a]))) return !1;
        a.timeout > 0 &&
          ((c = setTimeout(function () {
            n("pjax:timeout", [t, e]) && t.abort("timeout");
          }, a.timeout)),
            (a.timeout = 0));
        var r = d(a.url);
        i && (r.hash = i), (e.requestUrl = f(r));
      }),
        (e.complete = function (t, i) {
          c && clearTimeout(c), n("pjax:complete", [t, i, e]), n("pjax:end", [t, e]);
        }),
        (e.error = function (t, i, a) {
          var r = v("", t, e),
            s = n("pjax:error", [t, i, a, e]);
          "GET" == e.type && "abort" !== i && s && o(r.url);
        }),
        (e.success = function (r, c, l) {
          var u = a.state,
            f = "function" == typeof t.pjax.defaults.version ? t.pjax.defaults.version() : t.pjax.defaults.version,
            p = l.getResponseHeader("X-PJAX-Version"),
            m = v(r, l, e),
            _ = d(m.url);
          if ((i && ((_.hash = i), (m.url = _.href)), f && p && f !== p)) return void o(m.url);
          if (!m.contents) return void o(m.url);
          if (((a.state = { id: e.id || h(), url: m.url, title: m.title, container: e.container, fragment: e.fragment, timeout: e.timeout }), (e.push || e.replace) && window.history.replaceState(a.state, m.title, m.url), t.contains(s, document.activeElement)))
            try {
              document.activeElement.blur();
            } catch (t) { }
          m.title && (document.title = m.title), n("pjax:beforeReplace", [m.contents, e], { state: a.state, previousState: u }), s.html(m.contents);
          var g = s.find("input[autofocus], textarea[autofocus]").last()[0];
          g && document.activeElement !== g && g.focus(), y(m.scripts);
          var b = e.scrollTo;
          if (i) {
            var w = decodeURIComponent(i.slice(1)),
              x = document.getElementById(w) || document.getElementsByName(w)[0];
            x && (b = t(x).offset().top);
          }
          "number" == typeof b && t(window).scrollTop(b), n("pjax:success", [r, c, l, e]);
        }),
        a.state || ((a.state = { id: h(), url: window.location.href, title: document.title, container: e.container, fragment: e.fragment, timeout: e.timeout }), window.history.replaceState(a.state, document.title)),
        l(a.xhr),
        (a.options = e);
      var p = (a.xhr = t.ajax(e));
      return p.readyState > 0 && (e.push && !e.replace && (b(a.state.id, [e.container, u(s)]), window.history.pushState(null, "", e.requestUrl)), n("pjax:start", [p, e]), n("pjax:send", [p, e])), a.xhr;
    }
    function r (e, n) {
      var i = { url: window.location.href, push: !1, replace: !0, scrollTo: !1 };
      return a(t.extend(i, m(e, n)));
    }
    function o (t) {
      window.history.replaceState(null, "", a.state.url), window.location.replace(t);
    }
    function s (e) {
      $ || l(a.xhr);
      var n,
        i = a.state,
        r = e.state;
      if (r && r.container) {
        if ($ && E == r.url) return;
        if (i) {
          if (i.id === r.id) return;
          n = i.id < r.id ? "forward" : "back";
        }
        var s = k[r.id] || [],
          c = s[0] || r.container,
          h = t(c),
          f = s[1];
        if (h.length) {
          i && w(n, i.id, [c, u(h)]);
          var d = t.Event("pjax:popstate", { state: r, direction: n });
          h.trigger(d);
          var p = { id: r.id, url: r.url, container: c, push: !1, fragment: r.fragment, timeout: r.timeout, scrollTo: !1 };
          if (f) {
            h.trigger("pjax:start", [null, p]), (a.state = r), r.title && (document.title = r.title);
            var m = t.Event("pjax:beforeReplace", { state: r, previousState: i });
            h.trigger(m, [f, p]), h.html(f), h.trigger("pjax:end", [null, p]);
          } else a(p);
          h[0].offsetHeight;
        } else o(location.href);
      }
      $ = !1;
    }
    function c (e) {
      var n = t.isFunction(e.url) ? e.url() : e.url,
        i = e.type ? e.type.toUpperCase() : "GET",
        a = t("<form>", { method: "GET" === i ? "GET" : "POST", action: n, style: "display:none" });
      "GET" !== i && "POST" !== i && a.append(t("<input>", { type: "hidden", name: "_method", value: i.toLowerCase() }));
      var r = e.data;
      if ("string" == typeof r)
        t.each(r.split("&"), function (e, n) {
          var i = n.split("=");
          a.append(t("<input>", { type: "hidden", name: i[0], value: i[1] }));
        });
      else if (t.isArray(r))
        t.each(r, function (e, n) {
          a.append(t("<input>", { type: "hidden", name: n.name, value: n.value }));
        });
      else if ("object" == typeof r) {
        var o;
        for (o in r) a.append(t("<input>", { type: "hidden", name: o, value: r[o] }));
      }
      t(document.body).append(a), a.submit();
    }
    function l (e) {
      e && e.readyState < 4 && ((e.onreadystatechange = t.noop), e.abort());
    }
    function h () {
      return new Date().getTime();
    }
    function u (e) {
      var n = e.clone();
      return (
        n.find("script").each(function () {
          this.src || t._data(this, "globalEval", !1);
        }),
        n.contents()
      );
    }
    function f (t) {
      return (t.search = t.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, "")), t.href.replace(/\?($|#)/, "$1");
    }
    function d (t) {
      var e = document.createElement("a");
      return (e.href = t), e;
    }
    function p (t) {
      return t.href.replace(/#.*/, "");
    }
    function m (e, n) {
      return e && n ? ((n = t.extend({}, n)), (n.container = e), n) : t.isPlainObject(e) ? e : { container: e };
    }
    function _ (t, e) {
      return t.filter(e).add(t.find(e));
    }
    function g (e) {
      return t.parseHTML(e, document, !0);
    }
    function v (e, n, i) {
      var a = {},
        r = /<html/i.test(e),
        o = n.getResponseHeader("X-PJAX-URL");
      a.url = o ? f(d(o)) : i.requestUrl;
      var s, c;
      if (r) {
        c = t(g(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        var l = e.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
        s = null != l ? t(g(l[0])) : c;
      } else s = c = t(g(e));
      if (0 === c.length) return a;
      if (((a.title = _(s, "title").last().text()), i.fragment)) {
        var h = c;
        "body" !== i.fragment && (h = _(h, i.fragment).first()), h.length && ((a.contents = "body" === i.fragment ? h : h.contents()), a.title || (a.title = h.attr("title") || h.data("title")));
      } else r || (a.contents = c);
      return (
        a.contents &&
        ((a.contents = a.contents.not(function () {
          return t(this).is("title");
        })),
          a.contents.find("title").remove(),
          (a.scripts = _(a.contents, "script[src]").remove()),
          (a.contents = a.contents.not(a.scripts))),
        a.title && (a.title = t.trim(a.title)),
        a
      );
    }
    function y (e) {
      if (e) {
        var n = t("script[src]");
        e.each(function () {
          var e = this.src;
          if (
            !n.filter(function () {
              return this.src === e;
            }).length
          ) {
            var i = document.createElement("script"),
              a = t(this).attr("type");
            a && (i.type = a), (i.src = t(this).attr("src")), document.head.appendChild(i);
          }
        });
      }
    }
    function b (t, e) {
      (k[t] = e), C.push(t), x(O, 0), x(C, a.defaults.maxCacheLength);
    }
    function w (t, e, n) {
      var i, r;
      (k[e] = n), "forward" === t ? ((i = C), (r = O)) : ((i = O), (r = C)), i.push(e), (e = r.pop()), e && delete k[e], x(i, a.defaults.maxCacheLength);
    }
    function x (t, e) {
      for (; t.length > e;) delete k[t.shift()];
    }
    function j () {
      return t("meta")
        .filter(function () {
          var e = t(this).attr("http-equiv");
          return e && "X-PJAX-VERSION" === e.toUpperCase();
        })
        .attr("content");
    }
    function A () {
      (t.fn.pjax = e), (t.pjax = a), (t.pjax.enable = t.noop), (t.pjax.disable = T), (t.pjax.click = n), (t.pjax.submit = i), (t.pjax.reload = r), (t.pjax.defaults = { timeout: 650, push: !0, replace: !1, type: "GET", dataType: "html", scrollTo: 0, maxCacheLength: 20, version: j }), t(window).on("popstate.pjax", s);
    }
    function T () {
      (t.fn.pjax = function () {
        return this;
      }),
        (t.pjax = c),
        (t.pjax.enable = A),
        (t.pjax.disable = t.noop),
        (t.pjax.click = t.noop),
        (t.pjax.submit = t.noop),
        (t.pjax.reload = function () {
          window.location.reload();
        }),
        t(window).off("popstate.pjax", s);
    }
    var $ = !0,
      E = window.location.href,
      S = window.history.state;
    S && S.container && (a.state = S), "state" in window.history && ($ = !1);
    var k = {},
      O = [],
      C = [];
    t.event.props && t.inArray("state", t.event.props) < 0 ? t.event.props.push("state") : "state" in t.Event.prototype || t.event.addProp("state"), (t.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)), t.support.pjax ? A() : T();
  })(jQuery),
  (function (k) {
    for (var d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], g = 0; g < h.length; g++) void 0 !== l[h[g]] && (d = h[g]);
    d && ((f = d.replace(/[tT]ransform/, "TransformOrigin")), "T" == f[0] && (f[0] = "t")),
      eval('IE = "v"=="\v"'),
      jQuery.fn.extend({
        rotate: function (t) {
          if (0 !== this.length && void 0 !== t) {
            "number" == typeof t && (t = { angle: t });
            for (var e = [], n = 0, i = this.length; n < i; n++) {
              var a = this.get(n);
              if (a.Wilq32 && a.Wilq32.PhotoEffect) a.Wilq32.PhotoEffect._handleRotation(t);
              else {
                var r = k.extend(!0, {}, t),
                  a = new Wilq32.PhotoEffect(a, r)._rootObj;
                e.push(k(a));
              }
            }
            return e;
          }
        },
        getRotateAngle: function () {
          for (var t = [], e = 0, n = this.length; e < n; e++) {
            var i = this.get(e);
            i.Wilq32 && i.Wilq32.PhotoEffect && (t[e] = i.Wilq32.PhotoEffect._angle);
          }
          return t;
        },
        stopRotate: function () {
          for (var t = 0, e = this.length; t < e; t++) {
            var n = this.get(t);
            n.Wilq32 && n.Wilq32.PhotoEffect && clearTimeout(n.Wilq32.PhotoEffect._timer);
          }
        },
      }),
      (Wilq32 = window.Wilq32 || {}),
      (Wilq32.PhotoEffect = (function () {
        return d
          ? function (t, e) {
            (t.Wilq32 = { PhotoEffect: this }), (this._img = this._rootObj = this._eventObj = t), this._handleRotation(e);
          }
          : function (t, e) {
            if (((this._img = t), (this._onLoadDelegate = [e]), (this._rootObj = document.createElement("span")), (this._rootObj.style.display = "inline-block"), (this._rootObj.Wilq32 = { PhotoEffect: this }), t.parentNode.insertBefore(this._rootObj, t), t.complete)) this._Loader();
            else {
              var n = this;
              jQuery(this._img).bind("load", function () {
                n._Loader();
              });
            }
          };
      })()),
      (Wilq32.PhotoEffect.prototype = {
        _setupParameters: function (t) {
          (this._parameters = this._parameters || {}), "number" != typeof this._angle && (this._angle = 0), "number" == typeof t.angle && (this._angle = t.angle), (this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle), (this._parameters.step = t.step || this._parameters.step || null), (this._parameters.easing = t.easing || this._parameters.easing || this._defaultEasing), (this._parameters.duration = t.duration || this._parameters.duration || 1e3), (this._parameters.callback = t.callback || this._parameters.callback || this._emptyFunction), (this._parameters.center = t.center || this._parameters.center || ["50%", "50%"]), (this._rotationCenterX = "string" == typeof this._parameters.center[0] ? (parseInt(this._parameters.center[0], 10) / 100) * this._imgWidth * this._aspectW : this._parameters.center[0]), (this._rotationCenterY = "string" == typeof this._parameters.center[1] ? (parseInt(this._parameters.center[1], 10) / 100) * this._imgHeight * this._aspectH : this._parameters.center[1]), t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind);
        },
        _emptyFunction: function () { },
        _defaultEasing: function (t, e, n, i, a) {
          return -i * ((e = e / a - 1) * e * e * e - 1) + n;
        },
        _handleRotation: function (t, e) {
          d || this._img.complete || e ? (this._setupParameters(t), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(t);
        },
        _BindEvents: function (t) {
          if (t && this._eventObj) {
            if (this._parameters.bind) {
              var e,
                n = this._parameters.bind;
              for (e in n) n.hasOwnProperty(e) && jQuery(this._eventObj).unbind(e, n[e]);
            }
            this._parameters.bind = t;
            for (e in t) t.hasOwnProperty(e) && jQuery(this._eventObj).bind(e, t[e]);
          }
        },
        _Loader: (function () {
          return IE
            ? function () {
              var t = this._img.width,
                e = this._img.height;
              for (this._imgWidth = t, this._imgHeight = e, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = e + "px", this._vimage.style.width = t + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = t, this._container.style.height = e, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", t - 1 + "," + (e - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = t + "px", this._rootObj.style.height = e + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj; (t = this._onLoadDelegate.shift());) this._handleRotation(t, !0);
            }
            : function () {
              this._rootObj.setAttribute("id", this._img.getAttribute("id")), (this._rootObj.className = this._img.className), (this._imgWidth = this._img.naturalWidth), (this._imgHeight = this._img.naturalHeight);
              var t = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
              for (this._width = 3 * t, this._height = 3 * t, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"); (t = this._onLoadDelegate.shift());) this._handleRotation(t, !0);
            };
        })(),
        _animateStart: function () {
          this._timer && clearTimeout(this._timer), (this._animateStartTime = +new Date()), (this._animateStartAngle = this._angle), this._animate();
        },
        _animate: function () {
          var t = +new Date(),
            e = t - this._animateStartTime > this._parameters.duration;
          if (e && !this._parameters.animatedGif) clearTimeout(this._timer);
          else {
            (this._canvas || this._vimage || this._img) && ((t = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration)), this._rotate(~~(10 * t) / 10)), this._parameters.step && this._parameters.step(this._angle);
            var n = this;
            this._timer = setTimeout(function () {
              n._animate.call(n);
            }, 10);
          }
          this._parameters.callback && e && ((this._angle = this._parameters.animateTo), this._rotate(this._angle), this._parameters.callback.call(this._rootObj));
        },
        _rotate: (function () {
          var t = Math.PI / 180;
          return IE
            ? function (t) {
              (this._angle = t), (this._container.style.rotation = (t % 360) + "deg"), (this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px"), (this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px"), (this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px"), (this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px");
            }
            : d
              ? function (t) {
                (this._angle = t), (this._img.style[d] = "rotate(" + (t % 360) + "deg)"), (this._img.style[f] = this._parameters.center.join(" "));
              }
              : function (e) {
                (this._angle = e), (e = (e % 360) * t), (this._canvas.width = this._width), (this._canvas.height = this._height), this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(e), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0);
              };
        })(),
      }),
      IE &&
      (Wilq32.PhotoEffect.prototype.createVMLNode = (function () {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
          return (
            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
            function (t) {
              return document.createElement("<rvml:" + t + ' class="rvml">');
            }
          );
        } catch (t) {
          return function (t) {
            return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
          };
        }
      })());
  })(jQuery),
  (function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery || window.Zepto);
  })(function (t, e) {
    function n () { }
    function i (t, e) {
      return (e._$container == f ? ("innerHeight" in u ? u.innerHeight : f.height()) + f.scrollTop() : e._$container.offset().top + e._$container.height()) <= t.offset().top - e.threshold;
    }
    function a (e, n) {
      return (n._$container == f ? f.width() + (t.fn.scrollLeft ? f.scrollLeft() : u.pageXOffset) : n._$container.offset().left + n._$container.width()) <= e.offset().left - n.threshold;
    }
    function r (t, e) {
      return (e._$container == f ? f.scrollTop() : e._$container.offset().top) >= t.offset().top + e.threshold + t.height();
    }
    function o (e, n) {
      return (n._$container == f ? (t.fn.scrollLeft ? f.scrollLeft() : u.pageXOffset) : n._$container.offset().left) >= e.offset().left + n.threshold + e.width();
    }
    function s (t, e) {
      var n = 0;
      t.each(function (s, c) {
        function l () {
          h.trigger("_lazyload_appear"), (n = 0);
        }
        var h = t.eq(s);
        if (!((h.width() <= 0 && h.height() <= 0) || "none" === h.css("display")))
          if (e.vertical_only)
            if (r(h, e));
            else if (i(h, e)) {
              if (++n > e.failure_limit) return !1;
            } else l();
          else if (r(h, e) || o(h, e));
          else if (i(h, e) || a(h, e)) {
            if (++n > e.failure_limit) return !1;
          } else l();
      });
    }
    function c (t) {
      return t.filter(function (e, n) {
        return !t.eq(e)._lazyload_loadStarted;
      });
    }
    function l (t, e) {
      function n () {
        (o = 0), (s = +new Date()), (r = t.apply(i, a)), (i = null), (a = null);
      }
      var i,
        a,
        r,
        o,
        s = 0;
      return function () {
        (i = this), (a = arguments);
        var t = new Date() - s;
        return o || (t >= e ? n() : (o = setTimeout(n, e - t))), r;
      };
    }
    var h,
      u = window,
      f = t(u),
      d = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", effect_params: null, container: u, data_attribute: "original", data_srcset_attribute: "original-srcset", skip_invisible: !0, appear: n, load: n, vertical_only: !1, check_appear_throttle_time: 300, url_rewriter_fn: n, no_fake_img_loader: !1, placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC", placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png" };
    (h = (function () {
      var t = Object.prototype.toString;
      return function (e) {
        return t.call(e).replace("[object ", "").replace("]", "");
      };
    })()),
      t.fn.hasOwnProperty("lazyload") ||
      (t.fn.lazyload = function (e) {
        var i,
          a,
          r,
          o = this;
        return (
          t.isPlainObject(e) || (e = {}),
          t.each(d, function (n, i) {
            -1 != t.inArray(n, ["threshold", "failure_limit", "check_appear_throttle_time"]) ? ("String" == h(e[n]) ? (e[n] = parseInt(e[n], 10)) : (e[n] = i)) : "container" == n ? (e.hasOwnProperty(n) ? (e[n] == u || e[n] == document ? (e._$container = f) : (e._$container = t(e[n]))) : (e._$container = f), delete e.container) : !d.hasOwnProperty(n) || (e.hasOwnProperty(n) && h(e[n]) == h(d[n])) || (e[n] = i);
          }),
          (i = "scroll" == e.event),
          (r = 0 == e.check_appear_throttle_time ? s : l(s, e.check_appear_throttle_time)),
          (a = i || "scrollstart" == e.event || "scrollstop" == e.event),
          o.each(function (i, r) {
            var s = this,
              l = o.eq(i),
              h = l.attr("src"),
              u = l.attr("data-" + e.data_attribute),
              f = e.url_rewriter_fn == n ? u : e.url_rewriter_fn.call(s, l, u),
              d = l.attr("data-" + e.data_srcset_attribute),
              p = l.is("img");
            return 1 == l._lazyload_loadStarted || h == f
              ? ((l._lazyload_loadStarted = !0), void (o = c(o)))
              : ((l._lazyload_loadStarted = !1),
                p &&
                !h &&
                l
                  .one("error", function () {
                    l.attr("src", e.placeholder_real_img);
                  })
                  .attr("src", e.placeholder_data_img),
                l.one("_lazyload_appear", function () {
                  function i () {
                    a && l.hide(), p ? (d && l.attr("srcset", d), f && l.attr("src", f)) : l.css("background-image", 'url("' + f + '")'), a && l[e.effect].apply(l, r ? e.effect_params : []), (o = c(o));
                  }
                  var a,
                    r = t.isArray(e.effect_params);
                  l._lazyload_loadStarted ||
                    ((a = "show" != e.effect && t.fn[e.effect] && (!e.effect_params || (r && 0 == e.effect_params.length))),
                      e.appear != n && e.appear.call(s, l, o.length, e),
                      (l._lazyload_loadStarted = !0),
                      e.no_fake_img_loader || d
                        ? (e.load != n &&
                          l.one("load", function () {
                            e.load.call(s, l, o.length, e);
                          }),
                          i())
                        : t("<img />")
                          .one("load", function () {
                            i(), e.load != n && e.load.call(s, l, o.length, e);
                          })
                          .attr("src", f));
                }),
                void (
                  a ||
                  l.on(e.event, function () {
                    l._lazyload_loadStarted || l.trigger("_lazyload_appear");
                  })
                ));
          }),
          a &&
          e._$container.on(e.event, function () {
            r(o, e);
          }),
          f.on("resize load", function () {
            r(o, e);
          }),
          t(function () {
            r(o, e);
          }),
          this
        );
      });
  }),
  toc(),
  (function () {
    $("#top-button").click(function () {
      $("html,body").animate({ scrollTop: 0 }, 500);
    });
    var t = $(".up");
    window.onscroll = function () {
      var e = $(window).scrollTop(),
        n = $(window).height(),
        i = $(document).height() - e - n;
      e >= n - 400 ? (i <= 90 ? (t.removeClass("upinbody"), t.addClass("upinfoot")) : (t.removeClass("upinfoot"), t.addClass("upinbody")), t.fadeIn(100)) : e <= n - 400 && t.fadeOut(500);
    };
  })(),
  (function () {
    $(".button-collapse").sideNav({ menuWidth: 250, edge: "left", closeOnClick: !1, draggable: !0 }),
      $(document).on("pjax:end", function () {
        $(".button-collapse").sideNav("hide");
      });
  })(),
  (function () {
    $(".dropdown-btn").click(function () {
      "none" == $(this).next().css("display") ? ($(this).next().slideDown(), $(this).find(".dropdown-ico").rotate({ animateTo: 180 })) : ($(this).next().slideUp(), $(this).find(".dropdown-ico").rotate({ animateTo: 0 }));
    });
  })(),
  (function () {
    var t = $("body").width();
    t <= 768
      ? $(function () {
        function e () {
          var e = 0,
            n = (t - 250) / 2 + "px";
          $(".friends-link").each(function () {
            var t = $(this),
              i = 200 * e;
            e++,
              setTimeout(function () {
                t.animate({ "margin-left": n, opacity: 1 }, 300);
              }, i);
          });
        }
        $(document).on("pjax:end", function () {
          e();
        }),
          (window.onload = e());
      })
      : $(function () {
        function t () {
          var t = 0;
          $(".friends-link").each(function () {
            var e = $(this);
            t++;
            var n = 200 * t;
            setTimeout(function () {
              e.animate({ "margin-left": "150px", opacity: 1 }, 300);
            }, n);
          });
        }
        $(document).on("pjax:end", function () {
          t();
        }),
          (window.onload = t());
      });
  })();
var searchFunc = function (t, e, n) {
  "use strict";
  $.ajax({
    url: t,
    dataType: "xml",
    success: function (t) {
      var i = $("entry", t)
        .map(function () {
          return { title: $("title", this).text(), content: $("content", this).text(), url: $("url", this).text() };
        })
        .get(),
        a = document.getElementById(e),
        r = document.getElementById(n);
      a.addEventListener("input", function () {
        var t = '<ul class="search-result-list">',
          e = this.value
            .trim()
            .toLowerCase()
            .split(/[\s\-]+/);
        (r.innerHTML = ""),
          this.value.trim().length <= 0 ||
          (i.forEach(function (n) {
            var i = !0,
              a = n.title.trim().toLowerCase(),
              r = n.content
                .trim()
                .replace(/<[^>]+>/g, "")
                .toLowerCase(),
              o = n.url,
              s = -1,
              c = -1,
              l = -1;
            if (
              ("" != a &&
                "" != r &&
                e.forEach(function (t, e) {
                  (s = a.indexOf(t)), (c = r.indexOf(t)), s < 0 && c < 0 ? (i = !1) : (c < 0 && (c = 0), 0 == e && (l = c));
                }),
                i)
            ) {
              t += "<li><a href='" + o + "' class='search-result-title' target='_blank'>" + a;
              var h = n.content.trim().replace(/<[^>]+>/g, "");
              if (l >= 0) {
                var u = l - 6,
                  f = l + 6;
                u < 0 && (u = 0), 0 == u && (f = 10), f > h.length && (f = h.length);
                var d = h.substr(u, f);
                e.forEach(function (t) {
                  var e = new RegExp(t, "gi");
                  d = d.replace(e, '<em class="search-keyword">' + t + "</em>");
                }),
                  (t += '<p class="search-result">' + d + "...</p></a>");
              }
            }
          }),
            (r.innerHTML = t));
      });
    },
  });
},
  inputArea = document.querySelector("#local-search-input"),
  getSearchFile = function () {
    searchFunc("/search.xml", "local-search-input", "local-search-result");
  };
(inputArea.onfocus = function () {
  getSearchFile();
}),
  (inputArea.onkeydown = function () {
    if (13 == event.keyCode) return !1;
  }),
  $("#local-search-result").bind("DOMNodeRemoved DOMNodeInserted", function (t) {
    $(t.target).text() ? $(".no-result").hide() : $(".no-result").show();
  }),
  (function (t) {
    t.fn.exist = function () {
      return t(this).length >= 1;
    };
  })(jQuery);
