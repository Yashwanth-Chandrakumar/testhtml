;window.NREUM || (NREUM = {});
NREUM.init = {
    distributed_tracing: {
        enabled: true
    },
    privacy: {
        cookies_enabled: true
    },
    ajax: {
        deny_list: ["bam.nr-data.net"]
    }
};

;NREUM.loader_config = {
    accountID: "2120507",
    trustKey: "2120507",
    agentID: "1588885146",
    licenseKey: "98d3b5cc84",
    applicationID: "1588885146"
};
;NREUM.info = {
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    licenseKey: "98d3b5cc84",
    applicationID: "1588885146",
    sa: 1
};
;/*! For license information please see nr-loader-spa-1.246.1.min.js.LICENSE.txt */
( () => {
    "use strict";
    var e, t, r = {
        234: (e, t, r) => {
            r.d(t, {
                P_: () => g,
                Mt: () => v,
                C5: () => s,
                DL: () => A,
                OP: () => D,
                lF: () => N,
                Yu: () => x,
                Dg: () => m,
                CX: () => c,
                GE: () => w,
                sU: () => j
            });
            var n = r(8632)
              , i = r(9567);
            const o = {
                beacon: n.ce.beacon,
                errorBeacon: n.ce.errorBeacon,
                licenseKey: void 0,
                applicationID: void 0,
                sa: void 0,
                queueTime: void 0,
                applicationTime: void 0,
                ttGuid: void 0,
                user: void 0,
                account: void 0,
                product: void 0,
                extra: void 0,
                jsAttributes: {},
                userAttributes: void 0,
                atts: void 0,
                transactionName: void 0,
                tNamePlain: void 0
            }
              , a = {};
            function s(e) {
                if (!e)
                    throw new Error("All info objects require an agent identifier!");
                if (!a[e])
                    throw new Error("Info for ".concat(e, " was never set"));
                return a[e]
            }
            function c(e, t) {
                if (!e)
                    throw new Error("All info objects require an agent identifier!");
                a[e] = (0,
                i.D)(t, o),
                (0,
                n.Qy)(e, a[e], "info")
            }
            const u = e => {
                if (!e || "string" != typeof e)
                    return !1;
                try {
                    document.createDocumentFragment().querySelector(e)
                } catch {
                    return !1
                }
                return !0
            }
            ;
            var d = r(7056)
              , l = r(50);
            const f = () => {
                const e = {
                    mask_selector: "*",
                    block_selector: "[data-nr-block]",
                    mask_input_options: {
                        color: !1,
                        date: !1,
                        "datetime-local": !1,
                        email: !1,
                        month: !1,
                        number: !1,
                        range: !1,
                        search: !1,
                        tel: !1,
                        text: !1,
                        time: !1,
                        url: !1,
                        week: !1,
                        textarea: !1,
                        select: !1,
                        password: !0
                    }
                };
                return {
                    feature_flags: [],
                    proxy: {
                        assets: void 0,
                        beacon: void 0
                    },
                    privacy: {
                        cookies_enabled: !0
                    },
                    ajax: {
                        deny_list: void 0,
                        block_internal: !0,
                        enabled: !0,
                        harvestTimeSeconds: 10,
                        autoStart: !0
                    },
                    distributed_tracing: {
                        enabled: void 0,
                        exclude_newrelic_header: void 0,
                        cors_use_newrelic_header: void 0,
                        cors_use_tracecontext_headers: void 0,
                        allowed_origins: void 0
                    },
                    session: {
                        domain: void 0,
                        expiresMs: d.oD,
                        inactiveMs: d.Hb
                    },
                    ssl: void 0,
                    obfuscate: void 0,
                    jserrors: {
                        enabled: !0,
                        harvestTimeSeconds: 10,
                        autoStart: !0
                    },
                    metrics: {
                        enabled: !0,
                        autoStart: !0
                    },
                    page_action: {
                        enabled: !0,
                        harvestTimeSeconds: 30,
                        autoStart: !0
                    },
                    page_view_event: {
                        enabled: !0,
                        autoStart: !0
                    },
                    page_view_timing: {
                        enabled: !0,
                        harvestTimeSeconds: 30,
                        long_task: !1,
                        autoStart: !0
                    },
                    session_trace: {
                        enabled: !0,
                        harvestTimeSeconds: 10,
                        autoStart: !0
                    },
                    harvest: {
                        tooManyRequestsDelay: 60
                    },
                    session_replay: {
                        autoStart: !0,
                        enabled: !1,
                        harvestTimeSeconds: 60,
                        sampling_rate: 50,
                        error_sampling_rate: 50,
                        collect_fonts: !1,
                        inline_images: !1,
                        inline_stylesheet: !0,
                        mask_all_inputs: !0,
                        get mask_text_selector() {
                            return e.mask_selector
                        },
                        set mask_text_selector(t) {
                            u(t) ? e.mask_selector = t + ",[data-nr-mask]" : null === t ? e.mask_selector = t : (0,
                            l.Z)("An invalid session_replay.mask_selector was provided and will not be used", t)
                        },
                        get block_class() {
                            return "nr-block"
                        },
                        get ignore_class() {
                            return "nr-ignore"
                        },
                        get mask_text_class() {
                            return "nr-mask"
                        },
                        get block_selector() {
                            return e.block_selector
                        },
                        set block_selector(t) {
                            u(t) ? e.block_selector += ",".concat(t) : "" !== t && (0,
                            l.Z)("An invalid session_replay.block_selector was provided and will not be used", t)
                        },
                        get mask_input_options() {
                            return e.mask_input_options
                        },
                        set mask_input_options(t) {
                            t && "object" == typeof t ? e.mask_input_options = {
                                ...t,
                                password: !0
                            } : (0,
                            l.Z)("An invalid session_replay.mask_input_option was provided and will not be used", t)
                        }
                    },
                    spa: {
                        enabled: !0,
                        harvestTimeSeconds: 10,
                        autoStart: !0
                    }
                }
            }
              , h = {}
              , p = "All configuration objects require an agent identifier!";
            function g(e) {
                if (!e)
                    throw new Error(p);
                if (!h[e])
                    throw new Error("Configuration for ".concat(e, " was never set"));
                return h[e]
            }
            function m(e, t) {
                if (!e)
                    throw new Error(p);
                h[e] = (0,
                i.D)(t, f()),
                (0,
                n.Qy)(e, h[e], "config")
            }
            function v(e, t) {
                if (!e)
                    throw new Error(p);
                var r = g(e);
                if (r) {
                    for (var n = t.split("."), i = 0; i < n.length - 1; i++)
                        if ("object" != typeof (r = r[n[i]]))
                            return;
                    r = r[n[n.length - 1]]
                }
                return r
            }
            const b = {
                accountID: void 0,
                trustKey: void 0,
                agentID: void 0,
                licenseKey: void 0,
                applicationID: void 0,
                xpid: void 0
            }
              , y = {};
            function A(e) {
                if (!e)
                    throw new Error("All loader-config objects require an agent identifier!");
                if (!y[e])
                    throw new Error("LoaderConfig for ".concat(e, " was never set"));
                return y[e]
            }
            function w(e, t) {
                if (!e)
                    throw new Error("All loader-config objects require an agent identifier!");
                y[e] = (0,
                i.D)(t, b),
                (0,
                n.Qy)(e, y[e], "loader_config")
            }
            const x = (0,
            n.mF)().o;
            var E = r(385)
              , _ = r(6818);
            const T = {
                buildEnv: _.Re,
                customTransaction: void 0,
                disabled: !1,
                distMethod: _.gF,
                isolatedBacklog: !1,
                loaderType: void 0,
                maxBytes: 3e4,
                offset: Math.floor(E._A?.performance?.timeOrigin || E._A?.performance?.timing?.navigationStart || Date.now()),
                onerror: void 0,
                origin: "" + E._A.location,
                ptid: void 0,
                releaseIds: {},
                session: void 0,
                xhrWrappable: "function" == typeof E._A.XMLHttpRequest?.prototype?.addEventListener,
                version: _.q4,
                denyList: void 0
            }
              , S = {};
            function D(e) {
                if (!e)
                    throw new Error("All runtime objects require an agent identifier!");
                if (!S[e])
                    throw new Error("Runtime for ".concat(e, " was never set"));
                return S[e]
            }
            function j(e, t) {
                if (!e)
                    throw new Error("All runtime objects require an agent identifier!");
                S[e] = (0,
                i.D)(t, T),
                (0,
                n.Qy)(e, S[e], "runtime")
            }
            function N(e) {
                return function(e) {
                    try {
                        const t = s(e);
                        return !!t.licenseKey && !!t.errorBeacon && !!t.applicationID
                    } catch (e) {
                        return !1
                    }
                }(e)
            }
        }
        ,
        9567: (e, t, r) => {
            r.d(t, {
                D: () => i
            });
            var n = r(50);
            function i(e, t) {
                try {
                    if (!e || "object" != typeof e)
                        return (0,
                        n.Z)("Setting a Configurable requires an object as input");
                    if (!t || "object" != typeof t)
                        return (0,
                        n.Z)("Setting a Configurable requires a model to set its initial properties");
                    const r = Object.create(Object.getPrototypeOf(t), Object.getOwnPropertyDescriptors(t))
                      , o = 0 === Object.keys(r).length ? e : r;
                    for (let a in o)
                        if (void 0 !== e[a])
                            try {
                                Array.isArray(e[a]) && Array.isArray(t[a]) ? r[a] = Array.from(new Set([...e[a], ...t[a]])) : "object" == typeof e[a] && "object" == typeof t[a] ? r[a] = i(e[a], t[a]) : r[a] = e[a]
                            } catch (e) {
                                (0,
                                n.Z)("An error occurred while setting a property of a Configurable", e)
                            }
                    return r
                } catch (e) {
                    (0,
                    n.Z)("An error occured while setting a Configurable", e)
                }
            }
        }
        ,
        6818: (e, t, r) => {
            r.d(t, {
                Re: () => i,
                gF: () => o,
                lF: () => a,
                q4: () => n
            });
            const n = "1.246.1"
              , i = "PROD"
              , o = "CDN"
              , a = "2.0.0-alpha.11"
        }
        ,
        385: (e, t, r) => {
            r.d(t, {
                FN: () => s,
                IF: () => d,
                Nk: () => f,
                Tt: () => c,
                _A: () => o,
                cv: () => h,
                iS: () => a,
                il: () => n,
                ux: () => u,
                v6: () => i,
                w1: () => l
            });
            const n = "undefined" != typeof window && !!window.document
              , i = "undefined" != typeof WorkerGlobalScope && ("undefined" != typeof self && self instanceof WorkerGlobalScope && self.navigator instanceof WorkerNavigator || "undefined" != typeof globalThis && globalThis instanceof WorkerGlobalScope && globalThis.navigator instanceof WorkerNavigator)
              , o = n ? window : "undefined" != typeof WorkerGlobalScope && ("undefined" != typeof self && self instanceof WorkerGlobalScope && self || "undefined" != typeof globalThis && globalThis instanceof WorkerGlobalScope && globalThis)
              , a = Boolean("hidden" === o?.document?.visibilityState)
              , s = "" + o?.location
              , c = /iPad|iPhone|iPod/.test(o.navigator?.userAgent)
              , u = c && "undefined" == typeof SharedWorker
              , d = ( () => {
                const e = o.navigator?.userAgent?.match(/Firefox[/\s](\d+\.\d+)/);
                return Array.isArray(e) && e.length >= 2 ? +e[1] : 0
            }
            )()
              , l = Boolean(n && window.document.documentMode)
              , f = !!o.navigator?.sendBeacon
              , h = Math.floor(o?.performance?.timeOrigin || o?.performance?.timing?.navigationStart || Date.now())
        }
        ,
        1117: (e, t, r) => {
            r.d(t, {
                w: () => o
            });
            var n = r(50);
            const i = {
                agentIdentifier: "",
                ee: void 0
            };
            class o {
                constructor(e) {
                    try {
                        if ("object" != typeof e)
                            return (0,
                            n.Z)("shared context requires an object as input");
                        this.sharedContext = {},
                        Object.assign(this.sharedContext, i),
                        Object.entries(e).forEach((e => {
                            let[t,r] = e;
                            Object.keys(i).includes(t) && (this.sharedContext[t] = r)
                        }
                        ))
                    } catch (e) {
                        (0,
                        n.Z)("An error occured while setting SharedContext", e)
                    }
                }
            }
        }
        ,
        8e3: (e, t, r) => {
            r.d(t, {
                L: () => d,
                R: () => c
            });
            var n = r(8325)
              , i = r(1284)
              , o = r(4322)
              , a = r(3325);
            const s = {};
            function c(e, t) {
                const r = {
                    staged: !1,
                    priority: a.p[t] || 0
                };
                u(e),
                s[e].get(t) || s[e].set(t, r)
            }
            function u(e) {
                e && (s[e] || (s[e] = new Map))
            }
            function d() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "feature";
                if (u(e),
                !e || !s[e].get(t))
                    return a(t);
                s[e].get(t).staged = !0;
                const r = [...s[e]];
                function a(t) {
                    const r = e ? n.ee.get(e) : n.ee
                      , a = o.X.handlers;
                    if (r.backlog && a) {
                        var s = r.backlog[t]
                          , c = a[t];
                        if (c) {
                            for (var u = 0; s && u < s.length; ++u)
                                l(s[u], c);
                            (0,
                            i.D)(c, (function(e, t) {
                                (0,
                                i.D)(t, (function(t, r) {
                                    r[0].on(e, r[1])
                                }
                                ))
                            }
                            ))
                        }
                        delete a[t],
                        r.backlog[t] = null,
                        r.emit("drain-" + t, [])
                    }
                }
                r.every((e => {
                    let[t,r] = e;
                    return r.staged
                }
                )) && (r.sort(( (e, t) => e[1].priority - t[1].priority)),
                r.forEach((t => {
                    let[r] = t;
                    s[e].delete(r),
                    a(r)
                }
                )))
            }
            function l(e, t) {
                var r = e[1];
                (0,
                i.D)(t[r], (function(t, r) {
                    var n = e[0];
                    if (r[0] === n) {
                        var i = r[1]
                          , o = e[3]
                          , a = e[2];
                        i.apply(o, a)
                    }
                }
                ))
            }
        }
        ,
        8325: (e, t, r) => {
            r.d(t, {
                A: () => c,
                ee: () => u
            });
            var n = r(8632)
              , i = r(2210)
              , o = r(234);
            class a {
                constructor(e) {
                    this.contextId = e
                }
            }
            var s = r(3117);
            const c = "nr@context:".concat(s.a)
              , u = function e(t, r) {
                var n = {}
                  , s = {}
                  , d = {}
                  , f = !1;
                try {
                    f = 16 === r.length && (0,
                    o.OP)(r).isolatedBacklog
                } catch (e) {}
                var h = {
                    on: g,
                    addEventListener: g,
                    removeEventListener: function(e, t) {
                        var r = n[e];
                        if (!r)
                            return;
                        for (var i = 0; i < r.length; i++)
                            r[i] === t && r.splice(i, 1)
                    },
                    emit: function(e, r, n, i, o) {
                        !1 !== o && (o = !0);
                        if (u.aborted && !i)
                            return;
                        t && o && t.emit(e, r, n);
                        for (var a = p(n), c = m(e), d = c.length, l = 0; l < d; l++)
                            c[l].apply(a, r);
                        var f = b()[s[e]];
                        f && f.push([h, e, r, a]);
                        return a
                    },
                    get: v,
                    listeners: m,
                    context: p,
                    buffer: function(e, t) {
                        const r = b();
                        if (t = t || "feature",
                        h.aborted)
                            return;
                        Object.entries(e || {}).forEach((e => {
                            let[n,i] = e;
                            s[i] = t,
                            t in r || (r[t] = [])
                        }
                        ))
                    },
                    abort: l,
                    aborted: !1,
                    isBuffering: function(e) {
                        return !!b()[s[e]]
                    },
                    debugId: r,
                    backlog: f ? {} : t && "object" == typeof t.backlog ? t.backlog : {}
                };
                return h;
                function p(e) {
                    return e && e instanceof a ? e : e ? (0,
                    i.X)(e, c, ( () => new a(c))) : new a(c)
                }
                function g(e, t) {
                    n[e] = m(e).concat(t)
                }
                function m(e) {
                    return n[e] || []
                }
                function v(t) {
                    return d[t] = d[t] || e(h, t)
                }
                function b() {
                    return h.backlog
                }
            }(void 0, "globalEE")
              , d = (0,
            n.fP)();
            function l() {
                u.aborted = !0,
                u.backlog = {}
            }
            d.ee || (d.ee = u)
        }
        ,
        5546: (e, t, r) => {
            r.d(t, {
                E: () => n,
                p: () => i
            });
            var n = r(8325).ee.get("handle");
            function i(e, t, r, i, o) {
                o ? (o.buffer([e], i),
                o.emit(e, t, r)) : (n.buffer([e], i),
                n.emit(e, t, r))
            }
        }
        ,
        4322: (e, t, r) => {
            r.d(t, {
                X: () => o
            });
            var n = r(5546);
            o.on = a;
            var i = o.handlers = {};
            function o(e, t, r, o) {
                a(o || n.E, i, e, t, r)
            }
            function a(e, t, r, i, o) {
                o || (o = "feature"),
                e || (e = n.E);
                var a = t[o] = t[o] || {};
                (a[r] = a[r] || []).push([e, i])
            }
        }
        ,
        3239: (e, t, r) => {
            r.d(t, {
                bP: () => s,
                iz: () => c,
                m$: () => a
            });
            var n = r(385);
            let i = !1
              , o = !1;
            try {
                const e = {
                    get passive() {
                        return i = !0,
                        !1
                    },
                    get signal() {
                        return o = !0,
                        !1
                    }
                };
                n._A.addEventListener("test", null, e),
                n._A.removeEventListener("test", null, e)
            } catch (e) {}
            function a(e, t) {
                return i || o ? {
                    capture: !!e,
                    passive: i,
                    signal: t
                } : !!e
            }
            function s(e, t) {
                let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , n = arguments.length > 3 ? arguments[3] : void 0;
                window.addEventListener(e, t, a(r, n))
            }
            function c(e, t) {
                let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , n = arguments.length > 3 ? arguments[3] : void 0;
                document.addEventListener(e, t, a(r, n))
            }
        }
        ,
        3117: (e, t, r) => {
            r.d(t, {
                a: () => n
            });
            const n = (0,
            r(4402).Rl)()
        }
        ,
        4402: (e, t, r) => {
            r.d(t, {
                Ht: () => u,
                M: () => c,
                Rl: () => a,
                ky: () => s
            });
            var n = r(385);
            const i = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            function o(e, t) {
                return e ? 15 & e[t] : 16 * Math.random() | 0
            }
            function a() {
                const e = n._A?.crypto || n._A?.msCrypto;
                let t, r = 0;
                return e && e.getRandomValues && (t = e.getRandomValues(new Uint8Array(31))),
                i.split("").map((e => "x" === e ? o(t, ++r).toString(16) : "y" === e ? (3 & o() | 8).toString(16) : e)).join("")
            }
            function s(e) {
                const t = n._A?.crypto || n._A?.msCrypto;
                let r, i = 0;
                t && t.getRandomValues && (r = t.getRandomValues(new Uint8Array(31)));
                const a = [];
                for (var s = 0; s < e; s++)
                    a.push(o(r, ++i).toString(16));
                return a.join("")
            }
            function c() {
                return s(16)
            }
            function u() {
                return s(32)
            }
        }
        ,
        7056: (e, t, r) => {
            r.d(t, {
                Bq: () => n,
                Hb: () => o,
                oD: () => i
            });
            const n = "NRBA"
              , i = 144e5
              , o = 18e5
        }
        ,
        7894: (e, t, r) => {
            function n() {
                return Math.round(performance.now())
            }
            r.d(t, {
                z: () => n
            })
        }
        ,
        7243: (e, t, r) => {
            r.d(t, {
                e: () => i
            });
            var n = r(385);
            function i(e) {
                if (0 === (e || "").indexOf("data:"))
                    return {
                        protocol: "data"
                    };
                try {
                    const t = new URL(e,location.href)
                      , r = {
                        port: t.port,
                        hostname: t.hostname,
                        pathname: t.pathname,
                        search: t.search,
                        protocol: t.protocol.slice(0, t.protocol.indexOf(":")),
                        sameOrigin: t.protocol === n._A?.location?.protocol && t.host === n._A?.location?.host
                    };
                    return r.port && "" !== r.port || ("http:" === t.protocol && (r.port = "80"),
                    "https:" === t.protocol && (r.port = "443")),
                    r.pathname && "" !== r.pathname ? r.pathname.startsWith("/") || (r.pathname = "/".concat(r.pathname)) : r.pathname = "/",
                    r
                } catch (e) {
                    return {}
                }
            }
        }
        ,
        50: (e, t, r) => {
            function n(e, t) {
                "function" == typeof console.warn && (console.warn("New Relic: ".concat(e)),
                t && console.warn(t))
            }
            r.d(t, {
                Z: () => n
            })
        }
        ,
        2587: (e, t, r) => {
            r.d(t, {
                N: () => c,
                T: () => u
            });
            var n = r(8325)
              , i = r(5546)
              , o = r(3325);
            const a = {
                stn: [o.D.sessionTrace],
                err: [o.D.jserrors, o.D.metrics],
                ins: [o.D.pageAction],
                spa: [o.D.spa],
                sr: [o.D.sessionReplay, o.D.sessionTrace]
            }
              , s = new Set;
            function c(e, t) {
                const r = n.ee.get(t);
                e && "object" == typeof e && (s.has(t) || Object.entries(e).forEach((e => {
                    let[t,n] = e;
                    a[t] ? a[t].forEach((e => {
                        n ? (0,
                        i.p)("feat-" + t, [], void 0, e, r) : (0,
                        i.p)("block-" + t, [], void 0, e, r),
                        (0,
                        i.p)("rumresp-" + t, [Boolean(n)], void 0, e, r)
                    }
                    )) : n && (0,
                    i.p)("feat-" + t, [], void 0, void 0, r),
                    u[t] = Boolean(n)
                }
                )),
                Object.keys(a).forEach((e => {
                    void 0 === u[e] && (a[e]?.forEach((t => (0,
                    i.p)("rumresp-" + e, [!1], void 0, t, r))),
                    u[e] = !1)
                }
                )),
                s.add(t))
            }
            const u = {}
        }
        ,
        2210: (e, t, r) => {
            r.d(t, {
                X: () => i
            });
            var n = Object.prototype.hasOwnProperty;
            function i(e, t, r) {
                if (n.call(e, t))
                    return e[t];
                var i = r();
                if (Object.defineProperty && Object.keys)
                    try {
                        return Object.defineProperty(e, t, {
                            value: i,
                            writable: !0,
                            enumerable: !1
                        }),
                        i
                    } catch (e) {}
                return e[t] = i,
                i
            }
        }
        ,
        1284: (e, t, r) => {
            r.d(t, {
                D: () => n
            });
            const n = (e, t) => Object.entries(e || {}).map((e => {
                let[r,n] = e;
                return t(r, n)
            }
            ))
        }
        ,
        4351: (e, t, r) => {
            r.d(t, {
                P: () => o
            });
            var n = r(8325);
            const i = () => {
                const e = new WeakSet;
                return (t, r) => {
                    if ("object" == typeof r && null !== r) {
                        if (e.has(r))
                            return;
                        e.add(r)
                    }
                    return r
                }
            }
            ;
            function o(e) {
                try {
                    return JSON.stringify(e, i())
                } catch (e) {
                    try {
                        n.ee.emit("internal-error", [e])
                    } catch (e) {}
                }
            }
        }
        ,
        3960: (e, t, r) => {
            r.d(t, {
                K: () => a,
                b: () => o
            });
            var n = r(3239);
            function i() {
                return "undefined" == typeof document || "complete" === document.readyState
            }
            function o(e, t) {
                if (i())
                    return e();
                (0,
                n.bP)("load", e, t)
            }
            function a(e) {
                if (i())
                    return e();
                (0,
                n.iz)("DOMContentLoaded", e)
            }
        }
        ,
        8632: (e, t, r) => {
            r.d(t, {
                EZ: () => u,
                Qy: () => c,
                ce: () => o,
                fP: () => a,
                gG: () => d,
                mF: () => s
            });
            var n = r(7894)
              , i = r(385);
            const o = {
                beacon: "bam.nr-data.net",
                errorBeacon: "bam.nr-data.net"
            };
            function a() {
                return i._A.NREUM || (i._A.NREUM = {}),
                void 0 === i._A.newrelic && (i._A.newrelic = i._A.NREUM),
                i._A.NREUM
            }
            function s() {
                let e = a();
                return e.o || (e.o = {
                    ST: i._A.setTimeout,
                    SI: i._A.setImmediate,
                    CT: i._A.clearTimeout,
                    XHR: i._A.XMLHttpRequest,
                    REQ: i._A.Request,
                    EV: i._A.Event,
                    PR: i._A.Promise,
                    MO: i._A.MutationObserver,
                    FETCH: i._A.fetch
                }),
                e
            }
            function c(e, t, r) {
                let i = a();
                const o = i.initializedAgents || {}
                  , s = o[e] || {};
                return Object.keys(s).length || (s.initializedAt = {
                    ms: (0,
                    n.z)(),
                    date: new Date
                }),
                i.initializedAgents = {
                    ...o,
                    [e]: {
                        ...s,
                        [r]: t
                    }
                },
                i
            }
            function u(e, t) {
                a()[e] = t
            }
            function d() {
                return function() {
                    let e = a();
                    const t = e.info || {};
                    e.info = {
                        beacon: o.beacon,
                        errorBeacon: o.errorBeacon,
                        ...t
                    }
                }(),
                function() {
                    let e = a();
                    const t = e.init || {};
                    e.init = {
                        ...t
                    }
                }(),
                s(),
                function() {
                    let e = a();
                    const t = e.loader_config || {};
                    e.loader_config = {
                        ...t
                    }
                }(),
                a()
            }
        }
        ,
        7956: (e, t, r) => {
            r.d(t, {
                N: () => i
            });
            var n = r(3239);
            function i(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , r = arguments.length > 2 ? arguments[2] : void 0
                  , i = arguments.length > 3 ? arguments[3] : void 0;
                (0,
                n.iz)("visibilitychange", (function() {
                    if (t)
                        return void ("hidden" === document.visibilityState && e());
                    e(document.visibilityState)
                }
                ), r, i)
            }
        }
        ,
        1214: (e, t, r) => {
            r.d(t, {
                em: () => b,
                u5: () => D,
                QU: () => C,
                _L: () => I,
                Gm: () => H,
                Lg: () => L,
                BV: () => G,
                Kf: () => K
            });
            var n = r(8325)
              , i = r(3117);
            const o = "nr@original:".concat(i.a);
            var a = Object.prototype.hasOwnProperty
              , s = !1;
            function c(e, t) {
                return e || (e = n.ee),
                r.inPlace = function(e, t, n, i, o) {
                    n || (n = "");
                    const a = "-" === n.charAt(0);
                    for (let s = 0; s < t.length; s++) {
                        const c = t[s]
                          , u = e[c];
                        d(u) || (e[c] = r(u, a ? c + n : n, i, c, o))
                    }
                }
                ,
                r.flag = o,
                r;
                function r(t, r, n, s, c) {
                    return d(t) ? t : (r || (r = ""),
                    nrWrapper[o] = t,
                    function(e, t, r) {
                        if (Object.defineProperty && Object.keys)
                            try {
                                return Object.keys(e).forEach((function(r) {
                                    Object.defineProperty(t, r, {
                                        get: function() {
                                            return e[r]
                                        },
                                        set: function(t) {
                                            return e[r] = t,
                                            t
                                        }
                                    })
                                }
                                )),
                                t
                            } catch (e) {
                                u([e], r)
                            }
                        for (var n in e)
                            a.call(e, n) && (t[n] = e[n])
                    }(t, nrWrapper, e),
                    nrWrapper);
                    function nrWrapper() {
                        var o, a, d, l;
                        try {
                            a = this,
                            o = [...arguments],
                            d = "function" == typeof n ? n(o, a) : n || {}
                        } catch (t) {
                            u([t, "", [o, a, s], d], e)
                        }
                        i(r + "start", [o, a, s], d, c);
                        try {
                            return l = t.apply(a, o)
                        } catch (e) {
                            throw i(r + "err", [o, a, e], d, c),
                            e
                        } finally {
                            i(r + "end", [o, a, l], d, c)
                        }
                    }
                }
                function i(r, n, i, o) {
                    if (!s || t) {
                        var a = s;
                        s = !0;
                        try {
                            e.emit(r, n, i, t, o)
                        } catch (t) {
                            u([t, r, n, i], e)
                        }
                        s = a
                    }
                }
            }
            function u(e, t) {
                t || (t = n.ee);
                try {
                    t.emit("internal-error", e)
                } catch (e) {}
            }
            function d(e) {
                return !(e && "function" == typeof e && e.apply && !e[o])
            }
            var l = r(2210)
              , f = r(385);
            const h = {}
              , p = f._A.XMLHttpRequest
              , g = "addEventListener"
              , m = "removeEventListener"
              , v = "nr@wrapped:".concat(n.A);
            function b(e) {
                var t = function(e) {
                    return (e || n.ee).get("events")
                }(e);
                if (h[t.debugId]++)
                    return t;
                h[t.debugId] = 1;
                var r = c(t, !0);
                function i(e) {
                    r.inPlace(e, [g, m], "-", o)
                }
                function o(e, t) {
                    return e[1]
                }
                return "getPrototypeOf"in Object && (f.il && y(document, i),
                y(f._A, i),
                y(p.prototype, i)),
                t.on(g + "-start", (function(e, t) {
                    var n = e[1];
                    if (null !== n && ("function" == typeof n || "object" == typeof n)) {
                        var i = (0,
                        l.X)(n, v, (function() {
                            var e = {
                                object: function() {
                                    if ("function" != typeof n.handleEvent)
                                        return;
                                    return n.handleEvent.apply(n, arguments)
                                },
                                function: n
                            }[typeof n];
                            return e ? r(e, "fn-", null, e.name || "anonymous") : n
                        }
                        ));
                        this.wrapped = e[1] = i
                    }
                }
                )),
                t.on(m + "-start", (function(e) {
                    e[1] = this.wrapped || e[1]
                }
                )),
                t
            }
            function y(e, t) {
                let r = e;
                for (; "object" == typeof r && !Object.prototype.hasOwnProperty.call(r, g); )
                    r = Object.getPrototypeOf(r);
                for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
                    i[o - 2] = arguments[o];
                r && t(r, ...i)
            }
            var A = "fetch-"
              , w = A + "body-"
              , x = ["arrayBuffer", "blob", "json", "text", "formData"]
              , E = f._A.Request
              , _ = f._A.Response
              , T = "prototype";
            const S = {};
            function D(e) {
                const t = function(e) {
                    return (e || n.ee).get("fetch")
                }(e);
                if (!(E && _ && f._A.fetch))
                    return t;
                if (S[t.debugId]++)
                    return t;
                function r(e, r, i) {
                    var o = e[r];
                    "function" == typeof o && (e[r] = function() {
                        var e, r = [...arguments], a = {};
                        t.emit(i + "before-start", [r], a),
                        a[n.A] && a[n.A].dt && (e = a[n.A].dt);
                        var s = o.apply(this, r);
                        return t.emit(i + "start", [r, e], s),
                        s.then((function(e) {
                            return t.emit(i + "end", [null, e], s),
                            e
                        }
                        ), (function(e) {
                            throw t.emit(i + "end", [e], s),
                            e
                        }
                        ))
                    }
                    )
                }
                return S[t.debugId] = 1,
                x.forEach((e => {
                    r(E[T], e, w),
                    r(_[T], e, w)
                }
                )),
                r(f._A, "fetch", A),
                t.on(A + "end", (function(e, r) {
                    var n = this;
                    if (r) {
                        var i = r.headers.get("content-length");
                        null !== i && (n.rxSize = i),
                        t.emit(A + "done", [null, r], n)
                    } else
                        t.emit(A + "done", [e], n)
                }
                )),
                t
            }
            const j = {}
              , N = ["pushState", "replaceState"];
            function C(e) {
                const t = function(e) {
                    return (e || n.ee).get("history")
                }(e);
                return !f.il || j[t.debugId]++ || (j[t.debugId] = 1,
                c(t).inPlace(window.history, N, "-")),
                t
            }
            var O = r(3239);
            const P = {}
              , R = ["appendChild", "insertBefore", "replaceChild"];
            function I(e) {
                const t = function(e) {
                    return (e || n.ee).get("jsonp")
                }(e);
                if (!f.il || P[t.debugId])
                    return t;
                P[t.debugId] = !0;
                var r = c(t)
                  , i = /[?&](?:callback|cb)=([^&#]+)/
                  , o = /(.*)\.([^.]+)/
                  , a = /^(\w+)(\.|$)(.*)$/;
                function s(e, t) {
                    if (!e)
                        return t;
                    const r = e.match(a)
                      , n = r[1];
                    return s(r[3], t[n])
                }
                return r.inPlace(Node.prototype, R, "dom-"),
                t.on("dom-start", (function(e) {
                    !function(e) {
                        if (!e || "string" != typeof e.nodeName || "script" !== e.nodeName.toLowerCase())
                            return;
                        if ("function" != typeof e.addEventListener)
                            return;
                        var n = (a = e.src,
                        c = a.match(i),
                        c ? c[1] : null);
                        var a, c;
                        if (!n)
                            return;
                        var u = function(e) {
                            var t = e.match(o);
                            if (t && t.length >= 3)
                                return {
                                    key: t[2],
                                    parent: s(t[1], window)
                                };
                            return {
                                key: e,
                                parent: window
                            }
                        }(n);
                        if ("function" != typeof u.parent[u.key])
                            return;
                        var d = {};
                        function l() {
                            t.emit("jsonp-end", [], d),
                            e.removeEventListener("load", l, (0,
                            O.m$)(!1)),
                            e.removeEventListener("error", f, (0,
                            O.m$)(!1))
                        }
                        function f() {
                            t.emit("jsonp-error", [], d),
                            t.emit("jsonp-end", [], d),
                            e.removeEventListener("load", l, (0,
                            O.m$)(!1)),
                            e.removeEventListener("error", f, (0,
                            O.m$)(!1))
                        }
                        r.inPlace(u.parent, [u.key], "cb-", d),
                        e.addEventListener("load", l, (0,
                        O.m$)(!1)),
                        e.addEventListener("error", f, (0,
                        O.m$)(!1)),
                        t.emit("new-jsonp", [e.src], d)
                    }(e[0])
                }
                )),
                t
            }
            const k = {};
            function H(e) {
                const t = function(e) {
                    return (e || n.ee).get("mutation")
                }(e);
                if (!f.il || k[t.debugId])
                    return t;
                k[t.debugId] = !0;
                var r = c(t)
                  , i = f._A.MutationObserver;
                return i && (window.MutationObserver = function(e) {
                    return this instanceof i ? new i(r(e, "fn-")) : i.apply(this, arguments)
                }
                ,
                MutationObserver.prototype = i.prototype),
                t
            }
            const z = {};
            function L(e) {
                const t = function(e) {
                    return (e || n.ee).get("promise")
                }(e);
                if (z[t.debugId])
                    return t;
                z[t.debugId] = !0;
                var r = t.context
                  , i = c(t)
                  , a = f._A.Promise;
                return a && function() {
                    function e(r) {
                        var n = t.context()
                          , o = i(r, "executor-", n, null, !1);
                        const s = Reflect.construct(a, [o], e);
                        return t.context(s).getCtx = function() {
                            return n
                        }
                        ,
                        s
                    }
                    f._A.Promise = e,
                    Object.defineProperty(e, "name", {
                        value: "Promise"
                    }),
                    e.toString = function() {
                        return a.toString()
                    }
                    ,
                    Object.setPrototypeOf(e, a),
                    ["all", "race"].forEach((function(r) {
                        const n = a[r];
                        e[r] = function(e) {
                            let i = !1;
                            [...e || []].forEach((e => {
                                this.resolve(e).then(a("all" === r), a(!1))
                            }
                            ));
                            const o = n.apply(this, arguments);
                            return o;
                            function a(e) {
                                return function() {
                                    t.emit("propagate", [null, !i], o, !1, !1),
                                    i = i || !e
                                }
                            }
                        }
                    }
                    )),
                    ["resolve", "reject"].forEach((function(r) {
                        const n = a[r];
                        e[r] = function(e) {
                            const r = n.apply(this, arguments);
                            return e !== r && t.emit("propagate", [e, !0], r, !1, !1),
                            r
                        }
                    }
                    )),
                    e.prototype = a.prototype;
                    const n = a.prototype.then;
                    a.prototype.then = function() {
                        var e = this
                          , o = r(e);
                        o.promise = e;
                        for (var a = arguments.length, s = new Array(a), c = 0; c < a; c++)
                            s[c] = arguments[c];
                        s[0] = i(s[0], "cb-", o, null, !1),
                        s[1] = i(s[1], "cb-", o, null, !1);
                        const u = n.apply(this, s);
                        return o.nextPromise = u,
                        t.emit("propagate", [e, !0], u, !1, !1),
                        u
                    }
                    ,
                    a.prototype.then[o] = n,
                    t.on("executor-start", (function(e) {
                        e[0] = i(e[0], "resolve-", this, null, !1),
                        e[1] = i(e[1], "resolve-", this, null, !1)
                    }
                    )),
                    t.on("executor-err", (function(e, t, r) {
                        e[1](r)
                    }
                    )),
                    t.on("cb-end", (function(e, r, n) {
                        t.emit("propagate", [n, !0], this.nextPromise, !1, !1)
                    }
                    )),
                    t.on("propagate", (function(e, r, n) {
                        this.getCtx && !r || (this.getCtx = function() {
                            if (e instanceof Promise)
                                var r = t.context(e);
                            return r && r.getCtx ? r.getCtx() : this
                        }
                        )
                    }
                    ))
                }(),
                t
            }
            const M = {}
              , F = "setTimeout"
              , B = "setInterval"
              , U = "clearTimeout"
              , Z = "-start"
              , V = "-"
              , q = [F, "setImmediate", B, U, "clearImmediate"];
            function G(e) {
                const t = function(e) {
                    return (e || n.ee).get("timer")
                }(e);
                if (M[t.debugId]++)
                    return t;
                M[t.debugId] = 1;
                var r = c(t);
                return r.inPlace(f._A, q.slice(0, 2), F + V),
                r.inPlace(f._A, q.slice(2, 3), B + V),
                r.inPlace(f._A, q.slice(3), U + V),
                t.on(B + Z, (function(e, t, n) {
                    e[0] = r(e[0], "fn-", null, n)
                }
                )),
                t.on(F + Z, (function(e, t, n) {
                    this.method = n,
                    this.timerDuration = isNaN(e[1]) ? 0 : +e[1],
                    e[0] = r(e[0], "fn-", this, n)
                }
                )),
                t
            }
            var W = r(50);
            const X = {}
              , Q = ["open", "send"];
            function K(e) {
                var t = e || n.ee;
                const r = function(e) {
                    return (e || n.ee).get("xhr")
                }(t);
                if (X[r.debugId]++)
                    return r;
                X[r.debugId] = 1,
                b(t);
                var i = c(r)
                  , o = f._A.XMLHttpRequest
                  , a = f._A.MutationObserver
                  , s = f._A.Promise
                  , u = f._A.setInterval
                  , d = "readystatechange"
                  , l = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"]
                  , h = []
                  , p = f._A.XMLHttpRequest = function(e) {
                    const t = new o(e)
                      , n = r.context(t);
                    try {
                        r.emit("new-xhr", [t], n),
                        t.addEventListener(d, (a = n,
                        function() {
                            var e = this;
                            e.readyState > 3 && !a.resolved && (a.resolved = !0,
                            r.emit("xhr-resolved", [], e)),
                            i.inPlace(e, l, "fn-", w)
                        }
                        ), (0,
                        O.m$)(!1))
                    } catch (e) {
                        (0,
                        W.Z)("An error occurred while intercepting XHR", e);
                        try {
                            r.emit("internal-error", [e])
                        } catch (e) {}
                    }
                    var a;
                    return t
                }
                ;
                function g(e, t) {
                    i.inPlace(t, ["onreadystatechange"], "fn-", w)
                }
                if (function(e, t) {
                    for (var r in e)
                        t[r] = e[r]
                }(o, p),
                p.prototype = o.prototype,
                i.inPlace(p.prototype, Q, "-xhr-", w),
                r.on("send-xhr-start", (function(e, t) {
                    g(e, t),
                    function(e) {
                        h.push(e),
                        a && (m ? m.then(A) : u ? u(A) : (v = -v,
                        y.data = v))
                    }(t)
                }
                )),
                r.on("open-xhr-start", g),
                a) {
                    var m = s && s.resolve();
                    if (!u && !s) {
                        var v = 1
                          , y = document.createTextNode(v);
                        new a(A).observe(y, {
                            characterData: !0
                        })
                    }
                } else
                    t.on("fn-end", (function(e) {
                        e[0] && e[0].type === d || A()
                    }
                    ));
                function A() {
                    for (var e = 0; e < h.length; e++)
                        g(0, h[e]);
                    h.length && (h = [])
                }
                function w(e, t) {
                    return t
                }
                return r
            }
        }
        ,
        7825: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.ajax
        }
        ,
        6660: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.jserrors
        }
        ,
        3081: (e, t, r) => {
            r.d(t, {
                gF: () => o,
                mY: () => i,
                t9: () => n,
                vz: () => s,
                xS: () => a
            });
            const n = r(3325).D.metrics
              , i = "sm"
              , o = "cm"
              , a = "storeSupportabilityMetrics"
              , s = "storeEventMetrics"
        }
        ,
        4649: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.pageAction
        }
        ,
        7633: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.pageViewEvent
        }
        ,
        9251: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.pageViewTiming
        }
        ,
        7144: (e, t, r) => {
            r.d(t, {
                t: () => n
            });
            const n = r(3325).D.sessionReplay
        }
        ,
        3614: (e, t, r) => {
            r.d(t, {
                BST_RESOURCE: () => i,
                END: () => s,
                FEATURE_NAME: () => n,
                FN_END: () => u,
                FN_START: () => c,
                PUSH_STATE: () => d,
                RESOURCE: () => o,
                START: () => a
            });
            const n = r(3325).D.sessionTrace
              , i = "bstResource"
              , o = "resource"
              , a = "-start"
              , s = "-end"
              , c = "fn" + a
              , u = "fn" + s
              , d = "pushState"
        }
        ,
        7836: (e, t, r) => {
            r.d(t, {
                BODY: () => x,
                CB_END: () => E,
                CB_START: () => u,
                END: () => w,
                FEATURE_NAME: () => i,
                FETCH: () => T,
                FETCH_BODY: () => v,
                FETCH_DONE: () => m,
                FETCH_START: () => g,
                FN_END: () => c,
                FN_START: () => s,
                INTERACTION: () => f,
                INTERACTION_API: () => d,
                INTERACTION_EVENTS: () => o,
                JSONP_END: () => b,
                JSONP_NODE: () => p,
                JS_TIME: () => _,
                MAX_TIMER_BUDGET: () => a,
                REMAINING: () => l,
                SPA_NODE: () => h,
                START: () => A,
                originalSetTimeout: () => y
            });
            var n = r(234);
            const i = r(3325).D.spa
              , o = ["click", "submit", "keypress", "keydown", "keyup", "change"]
              , a = 999
              , s = "fn-start"
              , c = "fn-end"
              , u = "cb-start"
              , d = "api-ixn-"
              , l = "remaining"
              , f = "interaction"
              , h = "spaNode"
              , p = "jsonpNode"
              , g = "fetch-start"
              , m = "fetch-done"
              , v = "fetch-body-"
              , b = "jsonp-end"
              , y = n.Yu.ST
              , A = "-start"
              , w = "-end"
              , x = "-body"
              , E = "cb" + w
              , _ = "jsTime"
              , T = "fetch"
        }
        ,
        5938: (e, t, r) => {
            r.d(t, {
                W: () => i
            });
            var n = r(8325);
            class i {
                constructor(e, t, r) {
                    this.agentIdentifier = e,
                    this.aggregator = t,
                    this.ee = n.ee.get(e),
                    this.featureName = r,
                    this.blocked = !1
                }
            }
        }
        ,
        7530: (e, t, r) => {
            r.d(t, {
                j: () => b
            });
            var n = r(3325)
              , i = r(234)
              , o = r(5546)
              , a = r(8325)
              , s = r(7894)
              , c = r(8e3)
              , u = r(3960)
              , d = r(385)
              , l = r(50)
              , f = r(3081)
              , h = r(8632);
            function p() {
                const e = (0,
                h.gG)();
                ["setErrorHandler", "finished", "addToTrace", "addRelease", "addPageAction", "setCurrentRouteName", "setPageViewName", "setCustomAttribute", "interaction", "noticeError", "setUserId", "setApplicationVersion", "start"].forEach((t => {
                    e[t] = function() {
                        for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
                            n[i] = arguments[i];
                        return function(t) {
                            for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
                                n[i - 1] = arguments[i];
                            let o = [];
                            return Object.values(e.initializedAgents).forEach((e => {
                                e.exposed && e.api[t] && o.push(e.api[t](...n))
                            }
                            )),
                            o.length > 1 ? o : o[0]
                        }(t, ...n)
                    }
                }
                ))
            }
            var g = r(2587);
            const m = e => {
                const t = e.startsWith("http");
                e += "/",
                r.p = t ? e : "https://" + e
            }
            ;
            let v = !1;
            function b(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , b = arguments.length > 2 ? arguments[2] : void 0
                  , y = arguments.length > 3 ? arguments[3] : void 0
                  , {init: A, info: w, loader_config: x, runtime: E={
                    loaderType: b
                }, exposed: _=!0} = t;
                const T = (0,
                h.gG)();
                w || (A = T.init,
                w = T.info,
                x = T.loader_config),
                (0,
                i.Dg)(e, A || {}),
                (0,
                i.GE)(e, x || {}),
                w.jsAttributes ??= {},
                d.v6 && (w.jsAttributes.isWorker = !0),
                (0,
                i.CX)(e, w);
                const S = (0,
                i.P_)(e)
                  , D = [w.beacon, w.errorBeacon];
                v || (v = !0,
                S.proxy.assets && (m(S.proxy.assets),
                D.push(S.proxy.assets)),
                S.proxy.beacon && D.push(S.proxy.beacon)),
                E.denyList = [...S.ajax.deny_list || [], ...S.ajax.block_internal ? D : []],
                (0,
                i.sU)(e, E),
                p();
                const j = function(e, t) {
                    t || (0,
                    c.R)(e, "api");
                    const h = {};
                    var p = a.ee.get(e)
                      , g = p.get("tracer")
                      , m = "api-"
                      , v = m + "ixn-";
                    function b(t, r, n, o) {
                        const a = (0,
                        i.C5)(e);
                        return null === r ? delete a.jsAttributes[t] : (0,
                        i.CX)(e, {
                            ...a,
                            jsAttributes: {
                                ...a.jsAttributes,
                                [t]: r
                            }
                        }),
                        w(m, n, !0, o || null === r ? "session" : void 0)(t, r)
                    }
                    function y() {}
                    ["setErrorHandler", "finished", "addToTrace", "addRelease"].forEach((e => {
                        h[e] = w(m, e, !0, "api")
                    }
                    )),
                    h.addPageAction = w(m, "addPageAction", !0, n.D.pageAction),
                    h.setCurrentRouteName = w(m, "routeName", !0, n.D.spa),
                    h.setPageViewName = function(t, r) {
                        if ("string" == typeof t)
                            return "/" !== t.charAt(0) && (t = "/" + t),
                            (0,
                            i.OP)(e).customTransaction = (r || "http://custom.transaction") + t,
                            w(m, "setPageViewName", !0)()
                    }
                    ,
                    h.setCustomAttribute = function(e, t) {
                        let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        if ("string" == typeof e) {
                            if (["string", "number", "boolean"].includes(typeof t) || null === t)
                                return b(e, t, "setCustomAttribute", r);
                            (0,
                            l.Z)("Failed to execute setCustomAttribute.\nNon-null value must be a string, number or boolean type, but a type of <".concat(typeof t, "> was provided."))
                        } else
                            (0,
                            l.Z)("Failed to execute setCustomAttribute.\nName must be a string type, but a type of <".concat(typeof e, "> was provided."))
                    }
                    ,
                    h.setUserId = function(e) {
                        if ("string" == typeof e || null === e)
                            return b("enduser.id", e, "setUserId", !0);
                        (0,
                        l.Z)("Failed to execute setUserId.\nNon-null value must be a string type, but a type of <".concat(typeof e, "> was provided."))
                    }
                    ,
                    h.setApplicationVersion = function(e) {
                        if ("string" == typeof e || null === e)
                            return b("application.version", e, "setApplicationVersion", !1);
                        (0,
                        l.Z)("Failed to execute setApplicationVersion. Expected <String | null>, but got <".concat(typeof e, ">."))
                    }
                    ,
                    h.start = e => {
                        try {
                            const t = e ? "defined" : "undefined";
                            (0,
                            o.p)(f.xS, ["API/start/".concat(t, "/called")], void 0, n.D.metrics, p);
                            const r = Object.values(n.D);
                            if (void 0 === e)
                                e = r;
                            else {
                                if ((e = Array.isArray(e) && e.length ? e : [e]).some((e => !r.includes(e))))
                                    return (0,
                                    l.Z)("Invalid feature name supplied. Acceptable feature names are: ".concat(r));
                                e.includes(n.D.pageViewEvent) || e.push(n.D.pageViewEvent)
                            }
                            e.forEach((e => {
                                p.emit("".concat(e, "-opt-in"))
                            }
                            ))
                        } catch (e) {
                            (0,
                            l.Z)("An unexpected issue occurred", e)
                        }
                    }
                    ,
                    h.interaction = function() {
                        return (new y).get()
                    }
                    ;
                    var A = y.prototype = {
                        createTracer: function(e, t) {
                            var r = {}
                              , i = this
                              , a = "function" == typeof t;
                            return (0,
                            o.p)(v + "tracer", [(0,
                            s.z)(), e, r], i, n.D.spa, p),
                            function() {
                                if (g.emit((a ? "" : "no-") + "fn-start", [(0,
                                s.z)(), i, a], r),
                                a)
                                    try {
                                        return t.apply(this, arguments)
                                    } catch (e) {
                                        throw g.emit("fn-err", [arguments, this, e], r),
                                        e
                                    } finally {
                                        g.emit("fn-end", [(0,
                                        s.z)()], r)
                                    }
                            }
                        }
                    };
                    function w(e, t, r, i) {
                        return function() {
                            return (0,
                            o.p)(f.xS, ["API/" + t + "/called"], void 0, n.D.metrics, p),
                            i && (0,
                            o.p)(e + t, [(0,
                            s.z)(), ...arguments], r ? null : this, i, p),
                            r ? void 0 : this
                        }
                    }
                    function x() {
                        r.e(111).then(r.bind(r, 7438)).then((t => {
                            let {setAPI: r} = t;
                            r(e),
                            (0,
                            c.L)(e, "api")
                        }
                        )).catch(( () => (0,
                        l.Z)("Downloading runtime APIs failed...")))
                    }
                    return ["actionText", "setName", "setAttribute", "save", "ignore", "onEnd", "getContext", "end", "get"].forEach((e => {
                        A[e] = w(v, e, void 0, n.D.spa)
                    }
                    )),
                    h.noticeError = function(e, t) {
                        "string" == typeof e && (e = new Error(e)),
                        (0,
                        o.p)(f.xS, ["API/noticeError/called"], void 0, n.D.metrics, p),
                        (0,
                        o.p)("err", [e, (0,
                        s.z)(), !1, t], void 0, n.D.jserrors, p)
                    }
                    ,
                    d.il ? (0,
                    u.b)(( () => x()), !0) : x(),
                    h
                }(e, y);
                return (0,
                h.Qy)(e, j, "api"),
                (0,
                h.Qy)(e, _, "exposed"),
                (0,
                h.EZ)("activatedFeatures", g.T),
                j
            }
        }
        ,
        3325: (e, t, r) => {
            r.d(t, {
                D: () => n,
                p: () => i
            });
            const n = {
                ajax: "ajax",
                jserrors: "jserrors",
                metrics: "metrics",
                pageAction: "page_action",
                pageViewEvent: "page_view_event",
                pageViewTiming: "page_view_timing",
                sessionReplay: "session_replay",
                sessionTrace: "session_trace",
                spa: "spa"
            }
              , i = {
                [n.pageViewEvent]: 1,
                [n.pageViewTiming]: 2,
                [n.metrics]: 3,
                [n.jserrors]: 4,
                [n.ajax]: 5,
                [n.sessionTrace]: 6,
                [n.pageAction]: 7,
                [n.spa]: 8,
                [n.sessionReplay]: 9
            }
        }
    }, n = {};
    function i(e) {
        var t = n[e];
        if (void 0 !== t)
            return t.exports;
        var o = n[e] = {
            exports: {}
        };
        return r[e](o, o.exports, i),
        o.exports
    }
    i.m = r,
    i.d = (e, t) => {
        for (var r in t)
            i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    i.f = {},
    i.e = e => Promise.all(Object.keys(i.f).reduce(( (t, r) => (i.f[r](e, t),
    t)), [])),
    i.u = e => ({
        111: "nr-spa",
        164: "nr-spa-compressor",
        433: "nr-spa-recorder"
    }[e] + "-1.246.1.min.js"),
    i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    e = {},
    t = "NRBA-1.246.1.PROD:",
    i.l = (r, n, o, a) => {
        if (e[r])
            e[r].push(n);
        else {
            var s, c;
            if (void 0 !== o)
                for (var u = document.getElementsByTagName("script"), d = 0; d < u.length; d++) {
                    var l = u[d];
                    if (l.getAttribute("src") == r || l.getAttribute("data-webpack") == t + o) {
                        s = l;
                        break
                    }
                }
            s || (c = !0,
            (s = document.createElement("script")).charset = "utf-8",
            s.timeout = 120,
            i.nc && s.setAttribute("nonce", i.nc),
            s.setAttribute("data-webpack", t + o),
            s.src = r),
            e[r] = [n];
            var f = (t, n) => {
                s.onerror = s.onload = null,
                clearTimeout(h);
                var i = e[r];
                if (delete e[r],
                s.parentNode && s.parentNode.removeChild(s),
                i && i.forEach((e => e(n))),
                t)
                    return t(n)
            }
              , h = setTimeout(f.bind(null, void 0, {
                type: "timeout",
                target: s
            }), 12e4);
            s.onerror = f.bind(null, s.onerror),
            s.onload = f.bind(null, s.onload),
            c && document.head.appendChild(s)
        }
    }
    ,
    i.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.p = "https://js-agent.newrelic.com/",
    ( () => {
        var e = {
            801: 0,
            92: 0
        };
        i.f.j = (t, r) => {
            var n = i.o(e, t) ? e[t] : void 0;
            if (0 !== n)
                if (n)
                    r.push(n[2]);
                else {
                    var o = new Promise(( (r, i) => n = e[t] = [r, i]));
                    r.push(n[2] = o);
                    var a = i.p + i.u(t)
                      , s = new Error;
                    i.l(a, (r => {
                        if (i.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0),
                        n)) {
                            var o = r && ("load" === r.type ? "missing" : r.type)
                              , a = r && r.target && r.target.src;
                            s.message = "Loading chunk " + t + " failed.\n(" + o + ": " + a + ")",
                            s.name = "ChunkLoadError",
                            s.type = o,
                            s.request = a,
                            n[1](s)
                        }
                    }
                    ), "chunk-" + t, t)
                }
        }
        ;
        var t = (t, r) => {
            var n, o, [a,s,c] = r, u = 0;
            if (a.some((t => 0 !== e[t]))) {
                for (n in s)
                    i.o(s, n) && (i.m[n] = s[n]);
                if (c)
                    c(i)
            }
            for (t && t(r); u < a.length; u++)
                o = a[u],
                i.o(e, o) && e[o] && e[o][0](),
                e[o] = 0
        }
          , r = self["webpackChunk:NRBA-1.246.1.PROD"] = self["webpackChunk:NRBA-1.246.1.PROD"] || [];
        r.forEach(t.bind(null, 0)),
        r.push = t.bind(null, r.push.bind(r))
    }
    )(),
    ( () => {
        var e = i(50);
        class t {
            addPageAction(t, r) {
                (0,
                e.Z)("Call to agent api addPageAction failed. The page action feature is not currently initialized.")
            }
            setPageViewName(t, r) {
                (0,
                e.Z)("Call to agent api setPageViewName failed. The page view feature is not currently initialized.")
            }
            setCustomAttribute(t, r, n) {
                (0,
                e.Z)("Call to agent api setCustomAttribute failed. The js errors feature is not currently initialized.")
            }
            noticeError(t, r) {
                (0,
                e.Z)("Call to agent api noticeError failed. The js errors feature is not currently initialized.")
            }
            setUserId(t) {
                (0,
                e.Z)("Call to agent api setUserId failed. The js errors feature is not currently initialized.")
            }
            setApplicationVersion(t) {
                (0,
                e.Z)("Call to agent api setApplicationVersion failed. The agent is not currently initialized.")
            }
            setErrorHandler(t) {
                (0,
                e.Z)("Call to agent api setErrorHandler failed. The js errors feature is not currently initialized.")
            }
            finished(t) {
                (0,
                e.Z)("Call to agent api finished failed. The page action feature is not currently initialized.")
            }
            addRelease(t, r) {
                (0,
                e.Z)("Call to agent api addRelease failed. The js errors feature is not currently initialized.")
            }
            start(t) {
                (0,
                e.Z)("Call to agent api addRelease failed. The agent is not currently initialized.")
            }
        }
        var r = i(3325)
          , n = i(234);
        const o = Object.values(r.D);
        function a(e) {
            const t = {};
            return o.forEach((r => {
                t[r] = function(e, t) {
                    return !1 !== (0,
                    n.Mt)(t, "".concat(e, ".enabled"))
                }(r, e)
            }
            )),
            t
        }
        var s = i(7530);
        var c = i(8e3)
          , u = i(5938)
          , d = i(3960)
          , l = i(385);
        class f extends u.W {
            constructor(e, t, r) {
                let i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                super(e, t, r),
                this.auto = i,
                this.abortHandler = void 0,
                this.featAggregate = void 0,
                this.onAggregateImported = void 0,
                !1 === (0,
                n.Mt)(this.agentIdentifier, "".concat(this.featureName, ".autoStart")) && (this.auto = !1),
                this.auto && (0,
                c.R)(e, r)
            }
            importAggregator() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.featAggregate)
                    return;
                if (!this.auto)
                    return void this.ee.on("".concat(this.featureName, "-opt-in"), ( () => {
                        (0,
                        c.R)(this.agentIdentifier, this.featureName),
                        this.auto = !0,
                        this.importAggregator()
                    }
                    ));
                const r = l.il && !0 === (0,
                n.Mt)(this.agentIdentifier, "privacy.cookies_enabled");
                let o;
                this.onAggregateImported = new Promise((e => {
                    o = e
                }
                ));
                const a = async () => {
                    let n;
                    try {
                        if (r) {
                            const {setupAgentSession: e} = await i.e(111).then(i.bind(i, 3228));
                            n = e(this.agentIdentifier)
                        }
                    } catch (t) {
                        (0,
                        e.Z)("A problem occurred when starting up session manager. This page will not start or extend any session.", t)
                    }
                    try {
                        if (!this.shouldImportAgg(this.featureName, n))
                            return (0,
                            c.L)(this.agentIdentifier, this.featureName),
                            void o(!1);
                        const {lazyFeatureLoader: e} = await i.e(111).then(i.bind(i, 8582))
                          , {Aggregate: r} = await e(this.featureName, "aggregate");
                        this.featAggregate = new r(this.agentIdentifier,this.aggregator,t),
                        o(!0)
                    } catch (t) {
                        (0,
                        e.Z)("Downloading and initializing ".concat(this.featureName, " failed..."), t),
                        this.abortHandler?.(),
                        (0,
                        c.L)(this.agentIdentifier, this.featureName),
                        o(!1)
                    }
                }
                ;
                l.il ? (0,
                d.b)(( () => a()), !0) : a()
            }
            shouldImportAgg(e, t) {
                return e !== r.D.sessionReplay || !!n.Yu.MO && (!1 !== (0,
                n.Mt)(this.agentIdentifier, "session_trace.enabled") && (!!t?.isNew || !!t?.state.sessionReplayMode))
            }
        }
        var h = i(7633);
        class p extends f {
            static featureName = h.t;
            constructor(e, t) {
                let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, h.t, r),
                this.importAggregator()
            }
        }
        var g = i(1117)
          , m = i(1284);
        class v extends g.w {
            constructor(e) {
                super(e),
                this.aggregatedData = {}
            }
            store(e, t, r, n, i) {
                var o = this.getBucket(e, t, r, i);
                return o.metrics = function(e, t) {
                    t || (t = {
                        count: 0
                    });
                    return t.count += 1,
                    (0,
                    m.D)(e, (function(e, r) {
                        t[e] = b(r, t[e])
                    }
                    )),
                    t
                }(n, o.metrics),
                o
            }
            merge(e, t, r, n, i) {
                var o = this.getBucket(e, t, n, i);
                if (o.metrics) {
                    var a = o.metrics;
                    a.count += r.count,
                    (0,
                    m.D)(r, (function(e, t) {
                        if ("count" !== e) {
                            var n = a[e]
                              , i = r[e];
                            i && !i.c ? a[e] = b(i.t, n) : a[e] = function(e, t) {
                                if (!t)
                                    return e;
                                t.c || (t = y(t.t));
                                return t.min = Math.min(e.min, t.min),
                                t.max = Math.max(e.max, t.max),
                                t.t += e.t,
                                t.sos += e.sos,
                                t.c += e.c,
                                t
                            }(i, a[e])
                        }
                    }
                    ))
                } else
                    o.metrics = r
            }
            storeMetric(e, t, r, n) {
                var i = this.getBucket(e, t, r);
                return i.stats = b(n, i.stats),
                i
            }
            getBucket(e, t, r, n) {
                this.aggregatedData[e] || (this.aggregatedData[e] = {});
                var i = this.aggregatedData[e][t];
                return i || (i = this.aggregatedData[e][t] = {
                    params: r || {}
                },
                n && (i.custom = n)),
                i
            }
            get(e, t) {
                return t ? this.aggregatedData[e] && this.aggregatedData[e][t] : this.aggregatedData[e]
            }
            take(e) {
                for (var t = {}, r = "", n = !1, i = 0; i < e.length; i++)
                    t[r = e[i]] = A(this.aggregatedData[r]),
                    t[r].length && (n = !0),
                    delete this.aggregatedData[r];
                return n ? t : null
            }
        }
        function b(e, t) {
            return null == e ? function(e) {
                e ? e.c++ : e = {
                    c: 1
                };
                return e
            }(t) : t ? (t.c || (t = y(t.t)),
            t.c += 1,
            t.t += e,
            t.sos += e * e,
            e > t.max && (t.max = e),
            e < t.min && (t.min = e),
            t) : {
                t: e
            }
        }
        function y(e) {
            return {
                t: e,
                min: e,
                max: e,
                sos: e * e,
                c: 1
            }
        }
        function A(e) {
            return "object" != typeof e ? [] : (0,
            m.D)(e, w)
        }
        function w(e, t) {
            return t
        }
        var x = i(8632)
          , E = i(4402)
          , _ = i(4351);
        var T = i(5546)
          , S = i(7956)
          , D = i(3239)
          , j = i(7894)
          , N = i(9251);
        class C extends f {
            static featureName = N.t;
            constructor(e, t) {
                let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, N.t, r),
                l.il && ((0,
                S.N)(( () => (0,
                T.p)("docHidden", [(0,
                j.z)()], void 0, N.t, this.ee)), !0),
                (0,
                D.bP)("pagehide", ( () => (0,
                T.p)("winPagehide", [(0,
                j.z)()], void 0, N.t, this.ee))),
                this.importAggregator())
            }
        }
        var O = i(3081);
        class P extends f {
            static featureName = O.t9;
            constructor(e, t) {
                let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, O.t9, r),
                this.importAggregator()
            }
        }
        var R = i(6660);
        class I {
            constructor(e, t, r, n) {
                this.name = "UncaughtError",
                this.message = e,
                this.sourceURL = t,
                this.line = r,
                this.column = n
            }
        }
        class k extends f {
            static featureName = R.t;
            #e = new Set;
            constructor(e, t) {
                let n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, R.t, n);
                try {
                    this.removeOnAbort = new AbortController
                } catch (e) {}
                this.ee.on("fn-err", ( (e, t, n) => {
                    this.abortHandler && !this.#e.has(n) && (this.#e.add(n),
                    (0,
                    T.p)("err", [this.#t(n), (0,
                    j.z)()], void 0, r.D.jserrors, this.ee))
                }
                )),
                this.ee.on("internal-error", (e => {
                    this.abortHandler && (0,
                    T.p)("ierr", [this.#t(e), (0,
                    j.z)(), !0], void 0, r.D.jserrors, this.ee)
                }
                )),
                l._A.addEventListener("unhandledrejection", (e => {
                    this.abortHandler && (0,
                    T.p)("err", [this.#r(e), (0,
                    j.z)(), !1, {
                        unhandledPromiseRejection: 1
                    }], void 0, r.D.jserrors, this.ee)
                }
                ), (0,
                D.m$)(!1, this.removeOnAbort?.signal)),
                l._A.addEventListener("error", (e => {
                    this.abortHandler && (this.#e.has(e.error) ? this.#e.delete(e.error) : (0,
                    T.p)("err", [this.#n(e), (0,
                    j.z)()], void 0, r.D.jserrors, this.ee))
                }
                ), (0,
                D.m$)(!1, this.removeOnAbort?.signal)),
                this.abortHandler = this.#i,
                this.importAggregator()
            }
            #i() {
                this.removeOnAbort?.abort(),
                this.#e.clear(),
                this.abortHandler = void 0
            }
            #t(e) {
                return e instanceof Error ? e : void 0 !== e?.message ? new I(e.message,e.filename || e.sourceURL,e.lineno || e.line,e.colno || e.col) : new I("string" == typeof e ? e : (0,
                _.P)(e))
            }
            #r(e) {
                let t = "Unhandled Promise Rejection: ";
                if (e?.reason instanceof Error)
                    try {
                        return e.reason.message = t + e.reason.message,
                        e.reason
                    } catch (t) {
                        return e.reason
                    }
                if (void 0 === e.reason)
                    return new I(t);
                const r = this.#t(e.reason);
                return r.message = t + r.message,
                r
            }
            #n(e) {
                return e.error instanceof Error ? e.error : new I(e.message,e.filename,e.lineno,e.colno)
            }
        }
        var H = i(2210);
        let z = 1;
        const L = "nr@id";
        function M(e) {
            const t = typeof e;
            return !e || "object" !== t && "function" !== t ? -1 : e === l._A ? 0 : (0,
            H.X)(e, L, (function() {
                return z++
            }
            ))
        }
        function F(e) {
            if ("string" == typeof e && e.length)
                return e.length;
            if ("object" == typeof e) {
                if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer && e.byteLength)
                    return e.byteLength;
                if ("undefined" != typeof Blob && e instanceof Blob && e.size)
                    return e.size;
                if (!("undefined" != typeof FormData && e instanceof FormData))
                    try {
                        return (0,
                        _.P)(e).length
                    } catch (e) {
                        return
                    }
            }
        }
        var B = i(1214)
          , U = i(7243);
        class Z {
            constructor(e) {
                this.agentIdentifier = e
            }
            generateTracePayload(e) {
                if (!this.shouldGenerateTrace(e))
                    return null;
                var t = (0,
                n.DL)(this.agentIdentifier);
                if (!t)
                    return null;
                var r = (t.accountID || "").toString() || null
                  , i = (t.agentID || "").toString() || null
                  , o = (t.trustKey || "").toString() || null;
                if (!r || !i)
                    return null;
                var a = (0,
                E.M)()
                  , s = (0,
                E.Ht)()
                  , c = Date.now()
                  , u = {
                    spanId: a,
                    traceId: s,
                    timestamp: c
                };
                return (e.sameOrigin || this.isAllowedOrigin(e) && this.useTraceContextHeadersForCors()) && (u.traceContextParentHeader = this.generateTraceContextParentHeader(a, s),
                u.traceContextStateHeader = this.generateTraceContextStateHeader(a, c, r, i, o)),
                (e.sameOrigin && !this.excludeNewrelicHeader() || !e.sameOrigin && this.isAllowedOrigin(e) && this.useNewrelicHeaderForCors()) && (u.newrelicHeader = this.generateTraceHeader(a, s, c, r, i, o)),
                u
            }
            generateTraceContextParentHeader(e, t) {
                return "00-" + t + "-" + e + "-01"
            }
            generateTraceContextStateHeader(e, t, r, n, i) {
                return i + "@nr=0-1-" + r + "-" + n + "-" + e + "----" + t
            }
            generateTraceHeader(e, t, r, n, i, o) {
                if (!("function" == typeof l._A?.btoa))
                    return null;
                var a = {
                    v: [0, 1],
                    d: {
                        ty: "Browser",
                        ac: n,
                        ap: i,
                        id: e,
                        tr: t,
                        ti: r
                    }
                };
                return o && n !== o && (a.d.tk = o),
                btoa((0,
                _.P)(a))
            }
            shouldGenerateTrace(e) {
                return this.isDtEnabled() && this.isAllowedOrigin(e)
            }
            isAllowedOrigin(e) {
                var t = !1
                  , r = {};
                if ((0,
                n.Mt)(this.agentIdentifier, "distributed_tracing") && (r = (0,
                n.P_)(this.agentIdentifier).distributed_tracing),
                e.sameOrigin)
                    t = !0;
                else if (r.allowed_origins instanceof Array)
                    for (var i = 0; i < r.allowed_origins.length; i++) {
                        var o = (0,
                        U.e)(r.allowed_origins[i]);
                        if (e.hostname === o.hostname && e.protocol === o.protocol && e.port === o.port) {
                            t = !0;
                            break
                        }
                    }
                return t
            }
            isDtEnabled() {
                var e = (0,
                n.Mt)(this.agentIdentifier, "distributed_tracing");
                return !!e && !!e.enabled
            }
            excludeNewrelicHeader() {
                var e = (0,
                n.Mt)(this.agentIdentifier, "distributed_tracing");
                return !!e && !!e.exclude_newrelic_header
            }
            useNewrelicHeaderForCors() {
                var e = (0,
                n.Mt)(this.agentIdentifier, "distributed_tracing");
                return !!e && !1 !== e.cors_use_newrelic_header
            }
            useTraceContextHeadersForCors() {
                var e = (0,
                n.Mt)(this.agentIdentifier, "distributed_tracing");
                return !!e && !!e.cors_use_tracecontext_headers
            }
        }
        var V = i(7825)
          , q = ["load", "error", "abort", "timeout"]
          , G = q.length
          , W = n.Yu.REQ
          , X = n.Yu.XHR;
        class Q extends f {
            static featureName = V.t;
            constructor(e, t) {
                let i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (super(e, t, V.t, i),
                (0,
                n.OP)(e).xhrWrappable) {
                    this.dt = new Z(e),
                    this.handler = (e, t, r, n) => (0,
                    T.p)(e, t, r, n, this.ee);
                    try {
                        const e = {
                            xmlhttprequest: "xhr",
                            fetch: "fetch",
                            beacon: "beacon"
                        };
                        l._A?.performance?.getEntriesByType("resource").forEach((t => {
                            if (t.initiatorType in e && 0 !== t.responseStatus) {
                                const n = {
                                    status: t.responseStatus
                                }
                                  , i = {
                                    rxSize: t.transferSize,
                                    duration: Math.floor(t.duration),
                                    cbTime: 0
                                };
                                K(n, t.name),
                                this.handler("xhr", [n, i, t.startTime, t.responseEnd, e[t.initiatorType]], void 0, r.D.ajax)
                            }
                        }
                        ))
                    } catch (e) {}
                    (0,
                    B.u5)(this.ee),
                    (0,
                    B.Kf)(this.ee),
                    function(e, t, i, o) {
                        function a(e) {
                            var t = this;
                            t.totalCbs = 0,
                            t.called = 0,
                            t.cbTime = 0,
                            t.end = x,
                            t.ended = !1,
                            t.xhrGuids = {},
                            t.lastSize = null,
                            t.loadCaptureCalled = !1,
                            t.params = this.params || {},
                            t.metrics = this.metrics || {},
                            e.addEventListener("load", (function(r) {
                                E(t, e)
                            }
                            ), (0,
                            D.m$)(!1)),
                            l.IF || e.addEventListener("progress", (function(e) {
                                t.lastSize = e.loaded
                            }
                            ), (0,
                            D.m$)(!1))
                        }
                        function s(e) {
                            this.params = {
                                method: e[0]
                            },
                            K(this, e[1]),
                            this.metrics = {}
                        }
                        function c(t, r) {
                            var i = (0,
                            n.DL)(e);
                            i.xpid && this.sameOrigin && r.setRequestHeader("X-NewRelic-ID", i.xpid);
                            var a = o.generateTracePayload(this.parsedOrigin);
                            if (a) {
                                var s = !1;
                                a.newrelicHeader && (r.setRequestHeader("newrelic", a.newrelicHeader),
                                s = !0),
                                a.traceContextParentHeader && (r.setRequestHeader("traceparent", a.traceContextParentHeader),
                                a.traceContextStateHeader && r.setRequestHeader("tracestate", a.traceContextStateHeader),
                                s = !0),
                                s && (this.dt = a)
                            }
                        }
                        function u(e, r) {
                            var n = this.metrics
                              , i = e[0]
                              , o = this;
                            if (n && i) {
                                var a = F(i);
                                a && (n.txSize = a)
                            }
                            this.startTime = (0,
                            j.z)(),
                            this.body = i,
                            this.listener = function(e) {
                                try {
                                    "abort" !== e.type || o.loadCaptureCalled || (o.params.aborted = !0),
                                    ("load" !== e.type || o.called === o.totalCbs && (o.onloadCalled || "function" != typeof r.onload) && "function" == typeof o.end) && o.end(r)
                                } catch (e) {
                                    try {
                                        t.emit("internal-error", [e])
                                    } catch (e) {}
                                }
                            }
                            ;
                            for (var s = 0; s < G; s++)
                                r.addEventListener(q[s], this.listener, (0,
                                D.m$)(!1))
                        }
                        function d(e, t, r) {
                            this.cbTime += e,
                            t ? this.onloadCalled = !0 : this.called += 1,
                            this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof r.onload || "function" != typeof this.end || this.end(r)
                        }
                        function f(e, t) {
                            var r = "" + M(e) + !!t;
                            this.xhrGuids && !this.xhrGuids[r] && (this.xhrGuids[r] = !0,
                            this.totalCbs += 1)
                        }
                        function h(e, t) {
                            var r = "" + M(e) + !!t;
                            this.xhrGuids && this.xhrGuids[r] && (delete this.xhrGuids[r],
                            this.totalCbs -= 1)
                        }
                        function p() {
                            this.endTime = (0,
                            j.z)()
                        }
                        function g(e, r) {
                            r instanceof X && "load" === e[0] && t.emit("xhr-load-added", [e[1], e[2]], r)
                        }
                        function m(e, r) {
                            r instanceof X && "load" === e[0] && t.emit("xhr-load-removed", [e[1], e[2]], r)
                        }
                        function v(e, t, r) {
                            t instanceof X && ("onload" === r && (this.onload = !0),
                            ("load" === (e[0] && e[0].type) || this.onload) && (this.xhrCbStart = (0,
                            j.z)()))
                        }
                        function b(e, r) {
                            this.xhrCbStart && t.emit("xhr-cb-time", [(0,
                            j.z)() - this.xhrCbStart, this.onload, r], r)
                        }
                        function y(e) {
                            var t, r = e[1] || {};
                            if ("string" == typeof e[0] ? 0 === (t = e[0]).length && l.il && (t = "" + l._A.location.href) : e[0] && e[0].url ? t = e[0].url : l._A?.URL && e[0] && e[0]instanceof URL ? t = e[0].href : "function" == typeof e[0].toString && (t = e[0].toString()),
                            "string" == typeof t && 0 !== t.length) {
                                t && (this.parsedOrigin = (0,
                                U.e)(t),
                                this.sameOrigin = this.parsedOrigin.sameOrigin);
                                var n = o.generateTracePayload(this.parsedOrigin);
                                if (n && (n.newrelicHeader || n.traceContextParentHeader))
                                    if (e[0] && e[0].headers)
                                        s(e[0].headers, n) && (this.dt = n);
                                    else {
                                        var i = {};
                                        for (var a in r)
                                            i[a] = r[a];
                                        i.headers = new Headers(r.headers || {}),
                                        s(i.headers, n) && (this.dt = n),
                                        e.length > 1 ? e[1] = i : e.push(i)
                                    }
                            }
                            function s(e, t) {
                                var r = !1;
                                return t.newrelicHeader && (e.set("newrelic", t.newrelicHeader),
                                r = !0),
                                t.traceContextParentHeader && (e.set("traceparent", t.traceContextParentHeader),
                                t.traceContextStateHeader && e.set("tracestate", t.traceContextStateHeader),
                                r = !0),
                                r
                            }
                        }
                        function A(e, t) {
                            this.params = {},
                            this.metrics = {},
                            this.startTime = (0,
                            j.z)(),
                            this.dt = t,
                            e.length >= 1 && (this.target = e[0]),
                            e.length >= 2 && (this.opts = e[1]);
                            var r, n = this.opts || {}, i = this.target;
                            "string" == typeof i ? r = i : "object" == typeof i && i instanceof W ? r = i.url : l._A?.URL && "object" == typeof i && i instanceof URL && (r = i.href),
                            K(this, r);
                            var o = ("" + (i && i instanceof W && i.method || n.method || "GET")).toUpperCase();
                            this.params.method = o,
                            this.body = n.body,
                            this.txSize = F(n.body) || 0
                        }
                        function w(e, t) {
                            var n;
                            this.endTime = (0,
                            j.z)(),
                            this.params || (this.params = {}),
                            this.params.status = t ? t.status : 0,
                            "string" == typeof this.rxSize && this.rxSize.length > 0 && (n = +this.rxSize);
                            var o = {
                                txSize: this.txSize,
                                rxSize: n,
                                duration: (0,
                                j.z)() - this.startTime
                            };
                            i("xhr", [this.params, o, this.startTime, this.endTime, "fetch"], this, r.D.ajax)
                        }
                        function x(e) {
                            var t = this.params
                              , n = this.metrics;
                            if (!this.ended) {
                                this.ended = !0;
                                for (var o = 0; o < G; o++)
                                    e.removeEventListener(q[o], this.listener, !1);
                                t.aborted || (n.duration = (0,
                                j.z)() - this.startTime,
                                this.loadCaptureCalled || 4 !== e.readyState ? null == t.status && (t.status = 0) : E(this, e),
                                n.cbTime = this.cbTime,
                                i("xhr", [t, n, this.startTime, this.endTime, "xhr"], this, r.D.ajax))
                            }
                        }
                        function E(e, t) {
                            e.params.status = t.status;
                            var r = function(e, t) {
                                var r = e.responseType;
                                return "json" === r && null !== t ? t : "arraybuffer" === r || "blob" === r || "json" === r ? F(e.response) : "text" === r || "" === r || void 0 === r ? F(e.responseText) : void 0
                            }(t, e.lastSize);
                            if (r && (e.metrics.rxSize = r),
                            e.sameOrigin) {
                                var n = t.getResponseHeader("X-NewRelic-App-Data");
                                n && (e.params.cat = n.split(", ").pop())
                            }
                            e.loadCaptureCalled = !0
                        }
                        t.on("new-xhr", a),
                        t.on("open-xhr-start", s),
                        t.on("open-xhr-end", c),
                        t.on("send-xhr-start", u),
                        t.on("xhr-cb-time", d),
                        t.on("xhr-load-added", f),
                        t.on("xhr-load-removed", h),
                        t.on("xhr-resolved", p),
                        t.on("addEventListener-end", g),
                        t.on("removeEventListener-end", m),
                        t.on("fn-end", b),
                        t.on("fetch-before-start", y),
                        t.on("fetch-start", A),
                        t.on("fn-start", v),
                        t.on("fetch-done", w)
                    }(e, this.ee, this.handler, this.dt),
                    this.importAggregator()
                }
            }
        }
        function K(e, t) {
            var r = (0,
            U.e)(t)
              , n = e.params || e;
            n.hostname = r.hostname,
            n.port = r.port,
            n.protocol = r.protocol,
            n.host = r.hostname + ":" + r.port,
            n.pathname = r.pathname,
            e.parsedOrigin = r,
            e.sameOrigin = r.sameOrigin
        }
        var Y = i(3614);
        const {BST_RESOURCE: J, RESOURCE: ee, START: te, END: re, FEATURE_NAME: ne, FN_END: ie, FN_START: oe, PUSH_STATE: ae} = Y;
        var se = i(7144);
        class ce extends f {
            static featureName = se.t;
            constructor(e, t) {
                let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, se.t, r),
                this.importAggregator()
            }
        }
        var ue = i(7836);
        const {FEATURE_NAME: de, START: le, END: fe, BODY: he, CB_END: pe, JS_TIME: ge, FETCH: me, FN_START: ve, CB_START: be, FN_END: ye} = ue;
        var Ae = i(4649);
        class we extends f {
            static featureName = Ae.t;
            constructor(e, t) {
                let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                super(e, t, Ae.t, r),
                this.importAggregator()
            }
        }
        new class extends t {
            constructor(t) {
                let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0,
                E.ky)(16);
                super(),
                l._A ? (this.agentIdentifier = r,
                this.sharedAggregator = new v({
                    agentIdentifier: this.agentIdentifier
                }),
                this.features = {},
                this.desiredFeatures = new Set(t.features || []),
                this.desiredFeatures.add(p),
                Object.assign(this, (0,
                s.j)(this.agentIdentifier, t, t.loaderType || "agent")),
                this.run()) : (0,
                e.Z)("Failed to initial the agent. Could not determine the runtime environment.")
            }
            get config() {
                return {
                    info: (0,
                    n.C5)(this.agentIdentifier),
                    init: (0,
                    n.P_)(this.agentIdentifier),
                    loader_config: (0,
                    n.DL)(this.agentIdentifier),
                    runtime: (0,
                    n.OP)(this.agentIdentifier)
                }
            }
            run() {
                const t = "features";
                try {
                    const n = a(this.agentIdentifier)
                      , i = [...this.desiredFeatures];
                    i.sort(( (e, t) => r.p[e.featureName] - r.p[t.featureName])),
                    i.forEach((t => {
                        if (n[t.featureName] || t.featureName === r.D.pageViewEvent) {
                            const i = function(e) {
                                switch (e) {
                                case r.D.ajax:
                                    return [r.D.jserrors];
                                case r.D.sessionTrace:
                                    return [r.D.ajax, r.D.pageViewEvent];
                                case r.D.sessionReplay:
                                    return [r.D.sessionTrace];
                                case r.D.pageViewTiming:
                                    return [r.D.pageViewEvent];
                                default:
                                    return []
                                }
                            }(t.featureName);
                            i.every((e => n[e])) || (0,
                            e.Z)("".concat(t.featureName, " is enabled but one or more dependent features has been disabled (").concat((0,
                            _.P)(i), "). This may cause unintended consequences or missing data...")),
                            this.features[t.featureName] = new t(this.agentIdentifier,this.sharedAggregator)
                        }
                    }
                    )),
                    (0,
                    x.Qy)(this.agentIdentifier, this.features, t)
                } catch (r) {
                    (0,
                    e.Z)("Failed to initialize all enabled instrument classes (agent aborted) -", r);
                    for (const e in this.features)
                        this.features[e].abortHandler?.();
                    const n = (0,
                    x.fP)();
                    return delete n.initializedAgents[this.agentIdentifier]?.api,
                    delete n.initializedAgents[this.agentIdentifier]?.[t],
                    delete this.sharedAggregator,
                    n.ee?.abort(),
                    delete n.ee?.get(this.agentIdentifier),
                    !1
                }
            }
            addToTrace(t) {
                (0,
                e.Z)("Call to agent api addToTrace failed. The session trace feature is not currently initialized.")
            }
            setCurrentRouteName(t) {
                (0,
                e.Z)("Call to agent api setCurrentRouteName failed. The spa feature is not currently initialized.")
            }
            interaction() {
                (0,
                e.Z)("Call to agent api interaction failed. The spa feature is not currently initialized.")
            }
        }
        ({
            features: [Q, p, C, class extends f {
                static featureName = ne;
                constructor(e, t) {
                    if (super(e, t, ne, !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]),
                    !l.il)
                        return;
                    const n = this.ee;
                    let i;
                    (0,
                    B.QU)(n),
                    this.eventsEE = (0,
                    B.em)(n),
                    this.eventsEE.on(oe, (function(e, t) {
                        this.bstStart = (0,
                        j.z)()
                    }
                    )),
                    this.eventsEE.on(ie, (function(e, t) {
                        (0,
                        T.p)("bst", [e[0], t, this.bstStart, (0,
                        j.z)()], void 0, r.D.sessionTrace, n)
                    }
                    )),
                    n.on(ae + te, (function(e) {
                        this.time = (0,
                        j.z)(),
                        this.startPath = location.pathname + location.hash
                    }
                    )),
                    n.on(ae + re, (function(e) {
                        (0,
                        T.p)("bstHist", [location.pathname + location.hash, this.startPath, this.time], void 0, r.D.sessionTrace, n)
                    }
                    ));
                    try {
                        i = new PerformanceObserver((e => {
                            const t = e.getEntries();
                            (0,
                            T.p)(J, [t], void 0, r.D.sessionTrace, n)
                        }
                        )),
                        i.observe({
                            type: ee,
                            buffered: !0
                        })
                    } catch (e) {}
                    this.importAggregator({
                        resourceObserver: i
                    })
                }
            }
            , ce, P, we, k, class extends f {
                static featureName = de;
                constructor(e, t) {
                    if (super(e, t, de, !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]),
                    !l.il)
                        return;
                    if (!(0,
                    n.OP)(e).xhrWrappable)
                        return;
                    try {
                        this.removeOnAbort = new AbortController
                    } catch (e) {}
                    let r, i = 0;
                    const o = this.ee.get("tracer")
                      , a = (0,
                    B._L)(this.ee)
                      , s = (0,
                    B.Lg)(this.ee)
                      , c = (0,
                    B.BV)(this.ee)
                      , u = (0,
                    B.Kf)(this.ee)
                      , d = this.ee.get("events")
                      , f = (0,
                    B.u5)(this.ee)
                      , h = (0,
                    B.QU)(this.ee)
                      , p = (0,
                    B.Gm)(this.ee);
                    function g(e, t) {
                        h.emit("newURL", ["" + window.location, t])
                    }
                    function m() {
                        i++,
                        r = window.location.hash,
                        this[ve] = (0,
                        j.z)()
                    }
                    function v() {
                        i--,
                        window.location.hash !== r && g(0, !0);
                        var e = (0,
                        j.z)();
                        this[ge] = ~~this[ge] + e - this[ve],
                        this[ye] = e
                    }
                    function b(e, t) {
                        e.on(t, (function() {
                            this[t] = (0,
                            j.z)()
                        }
                        ))
                    }
                    this.ee.on(ve, m),
                    s.on(be, m),
                    a.on(be, m),
                    this.ee.on(ye, v),
                    s.on(pe, v),
                    a.on(pe, v),
                    this.ee.buffer([ve, ye, "xhr-resolved"], this.featureName),
                    d.buffer([ve], this.featureName),
                    c.buffer(["setTimeout" + fe, "clearTimeout" + le, ve], this.featureName),
                    u.buffer([ve, "new-xhr", "send-xhr" + le], this.featureName),
                    f.buffer([me + le, me + "-done", me + he + le, me + he + fe], this.featureName),
                    h.buffer(["newURL"], this.featureName),
                    p.buffer([ve], this.featureName),
                    s.buffer(["propagate", be, pe, "executor-err", "resolve" + le], this.featureName),
                    o.buffer([ve, "no-" + ve], this.featureName),
                    a.buffer(["new-jsonp", "cb-start", "jsonp-error", "jsonp-end"], this.featureName),
                    b(f, me + le),
                    b(f, me + "-done"),
                    b(a, "new-jsonp"),
                    b(a, "jsonp-end"),
                    b(a, "cb-start"),
                    h.on("pushState-end", g),
                    h.on("replaceState-end", g),
                    window.addEventListener("hashchange", g, (0,
                    D.m$)(!0, this.removeOnAbort?.signal)),
                    window.addEventListener("load", g, (0,
                    D.m$)(!0, this.removeOnAbort?.signal)),
                    window.addEventListener("popstate", (function() {
                        g(0, i > 1)
                    }
                    ), (0,
                    D.m$)(!0, this.removeOnAbort?.signal)),
                    this.abortHandler = this.#i,
                    this.importAggregator()
                }
                #i() {
                    this.removeOnAbort?.abort(),
                    this.abortHandler = void 0
                }
            }
            ],
            loaderType: "spa"
        })
    }
    )()
}
)();
