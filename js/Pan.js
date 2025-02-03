var chart = 0;
$.ns("P.Url");
$.ns("P.Cr");
$.ns("P.Nfo");
$.ns("P.LftNv");
$.ns("P.Prf");
$.ns("P.Ln");
$.ns("P.Lyt");
$.ns("P.Tlbx");
$.ns("P.WgrTypRls");
$.ns("P.Tckt");
$.ns("P.TcktHlpr");
$.ns("P.TcktUtils");
$.ns("P.TcktHndlr");
$.ns("P.Cron");
$.ns("Pan.Casino");
$.ns("P.LiveBetting");
$.ns("P.WagerReport");
$.ns("P.Poker");
$.ns("P.Pp");
P.Cr = {
    init: function() {
        P.Bskt.Tmp.wgrGrp = P.Tlbx.NewTmpWgrGrp();
        P.Prf.init();
        P.Nfo.init();
        P.LftNv.init();
        P.Lyt.init();
        P.Ln.init();
        P.Tlbx.init();
        P.Tckt.init();
        P.TcktHlpr.init();
        P.TcktUtils.init();
        P.TcktHndlr.init();
        P.WagerReport.init();
        P.Poker.init();
        P.Pp.init();
        var b = P.Stngs.btStngs;
        var a = P.Stngs.tsrStngs;
        P.TcktHlpr.ResetConfigureTicket(P.Bskt.Tckt);
        P.TcktHlpr.ConfigureTicket(P.Bskt.Tckt, b, a);
        P.TcktUtils.RenderNoOfWager();
        $("body").click(function() {
            if (self != parent) {
                if (self == parent) {
                    return false
                }
                var c = document.getElementById("sportsbookBody").scrollHeight + 10;
                if (c < 1000) {
                    c = 1000
                }
                parent.document.getElementById("ngbpframe").style.height = c
            }
        });
        P.Cron.init()
    },
    pingBack: function() {
        if (self != parent) {
            if (self == parent) {
                return false
            }
        }
        try {
            if (parent.pingBack) {
                parent.pingBack()
            }
        } catch (a) {
            alert(a)
        }
    }
};
$(document).ready(function() {
    P.Cr.init()
});
P.Cron = {
    init: function() {
        this.lineAutoRefresh.start(1e3 * P.Stngs.btStngs.rfrshIntrvl)
    },
    lineAutoRefresh: {
        id: 0,
        countMax: 0,
        count: 0,
        start: function(t) {
            var n = this;
            this.countMax = P.Stngs.btStngs.cntToLfMnRfrsh,
            this.id = $.interval(function() {
                n.count++,
                isAutoRefresh = !0,
                n.count >= n.countMax ? (n.count = 0,
                P.LftNv.LoadLeftMenuData()) : P.Ln.LoadDelta()
            }, t)
        },
        stop: function() {
            $.clear(this.id)
        }
    }
};
P.Nfo = {
    Tps: {
        init: function() {
            this.eventinfo = $.template('<div class="detWrapper"><div class="detHeader">${lt}<br />${rt}</div><div class="detBody">${cmts}</div></div>').compile();
            var t = '<div class="detWrapper"><div class="detHeader"><font color="blue">' + P.In.slip_tooltip_error_header + '</font></div><div class="detBody">${det}</div></div>';
            this.errormsg = $.template(t).compile();
            var e = '<div class="detWrapper"><div class="detHeader"><font color="blue">' + P.In.slip_tooltip_help_header + '</font></div><div class="detBody">${det}</div></div>';
            this.help = $.template(e).compile();
            this.tooltip = $.template('<div class="detWrapper"><div class="detBody">${det}</div></div>').compile();
            this.oddsformathelp = $.template('<div class="detWrapper"><div class="detHeader"><font color="blue">${title}</font></div><div class="detBody">${det}</div></div>').compile();
            this.linesortoptionhelp = $.template('<div class="detWrapper"><div class="detHeader"><font color="blue">${title}</font></div><div class="detBody">${det}</div></div>').compile()
        }
    },
    init: function() {
        this.Tps.init(),
        this.initHeaderNavToolTips()
    },
    AttachTooltipHandler: function(t) {
        var e = this;
        t.find("div.tooltipdiv").tooltip({
            bodyHandler: function() {
                var t = $(this)
                  , i = $.decode(t.attr("cfg"));
                if ("eventinfo" == i.type) {
                    var d = $(t.children("#lt"))
                      , l = $(t.children("#rt"))
                      , o = $(t.children("#cmts"));
                    return e.Tps[i.type].apply({
                        lt: d.html(),
                        rt: l.html(),
                        cmts: o.html()
                    })
                }
                if ("errormsg" == i.type) {
                    var p = $(t.children("span"));
                    return e.Tps[i.type].apply({
                        det: p.html()
                    })
                }
                if ("help" == i.type)
                    return e.Tps[i.type].apply({
                        det: P.In[i.msg]
                    });
                if ("tooltip" == i.type)
                    return i.msg;
                if ("oddsformathelp" == i.type) {
                    var r = $("#oddsFormatSelect").val().toLowerCase()
                      , s = P.In["help_" + r + "_oddsformat_title"]
                      , a = P.In["help_" + r + "_oddsformat_content"];
                    return e.Tps[i.type].apply({
                        title: s,
                        det: a
                    })
                }
                if ("linesortoptionhelp" == i.type) {
                    var n = $("#linesSortOptionSelect").val().toLowerCase()
                      , s = P.In["help_" + n + "_sortlineoption_title"]
                      , a = P.In["help_" + n + "_sortlineoption_content"];
                    return e.Tps[i.type].apply({
                        title: s,
                        det: a
                    })
                }
            }
        })
    },
    initHeaderNavToolTips: function() {
        $(".site-nav li a[title]").navtip({
            tip: "#header-nav-tooltip",
            effect: "slide",
            fadeOutSpeed: 100,
            predelay: 700,
            position: "bottom",
            offset: [20, -100],
            relative: !0
        })
    }
};
P.LftNv = {
    init: function() {
        this.AttachHandler()
    },
    LoadLeftMenuData: function() {
        var a = P.Ln.CreateDeltaParam()
          , s = this;
        $.post(P.Url.RetrieveLeftMenuData, $.postify({
            param: a
        }), function(a) {
            0 != (a = $.trim(a)).length && ($("#contentArea").mask(),
            $("#nav").mask(),
            $("#nav").empty(),
            $("#nav").append(a),
            s.AttachHandler(),
            $("#contentArea").unmask(),
            $("#nav").unmask())
        })
    },
    AttachHandler: function() {
        this.ActivateCombo(),
        this.Top10Action(),
        this.TopNavAction(),
        this.SubNavAction(),
        this.SubSportNavTog(),
        this.UsefulLinksAction(),
        this.ScheduleNavAction()
    },
    ActivateCombo: function() {
        var d = this;
        $(".rotNoSelect").sexyCombo({
            emptyText: "All",
            triggerSelected: !0,
            listWrapperContainer: $("#combocont"),
            listItemHeight: 20,
            monitorScroll: $(".dynNav"),
            hideListCallback: function() {
                var a = $(this.selectbox)
                  , s = $(a.parents("div.subNav").find("a.subNavA"))
                  , e = $(this.selectbox);
                if (s.hasClass("selected")) {
                    var l = $.decode(s.attr("cfg"));
                    l.type = "h2h",
                    l.rotNo = e.val(),
                    d.MenuClick(l)
                } else
                    s.click()
            }
        })
    },
    Top10Action: function() {
        var l = this;
        $(".top10").click(function(a) {
            var s = $(a.currentTarget ? a.currentTarget : a.target);
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded"),
            $("#nav .selected").removeClass("selected");
            var e = $.decode(s.attr("cfg"));
            s.addClass("selected"),
            l.MenuClick(e)
        })
    },
    ScheduleNavAction: function() {
        $("tbody.date").live("click", function(a) {
            var s = $(this);
            if (!s.hasClass("noSubSport"))
                if (s.hasClass("expanded")) {
                    s.removeClass("expanded"),
                    s.addClass("collapsed");
                    for (var e = $(s.next("tbody")); e.hasClass("event"); )
                        e.hide(),
                        e = $(e.next())
                } else if (s.hasClass("collapsed")) {
                    s.addClass("expanded"),
                    s.removeClass("collapsed"),
                    s.next(".event").show();
                    for (e = $(s.next("tbody")); e.hasClass("event"); )
                        e.show(),
                        e = $(e.next())
                }
        })
    },
    TopNavAction: function() {
        var a = $(".collapsed.topNavA.expanded").parent("div.topNav").next("div");
        for (a.hasClass("subNav Top") && a.hasClass("subNav Other") || ($(".subSportNavTogTop").hasClass("collapsed") && $(".subNavTogTop").hasClass("collapsed") && ($(".subSportNavTogTop").removeClass("collapsed"),
        $(".subSportNavTogTop").addClass("expanded"),
        $(".subNavTogTop").removeClass("collapsed"),
        $(".subNavTogTop").addClass("expanded")),
        $(".subSportNavTogOther").hasClass("collapsed") && $(".subtNavTogOther").hasClass("collapsed") && ($(".subSportNavTogOther").removeClass("collapsed"),
        $(".subSportNavTogOther").addClass("expanded"),
        $(".subtNavTogOther").removeClass("collapsed"),
        $(".subtNavTogOther").addClass("expanded"))); a.hasClass("subNav"); )
            a.show(),
            a = $(a.next());
        if (null != P.Param.paramCollection) {
            "todaygames" == P.Param.paramCollection[0].H2HParam.AltConf.toLowerCase() && $("#todaygames").addClass("selected")
        }
        $(".topNavA").click(function(a) {
            var s = $(a.currentTarget ? a.currentTarget : a.target);
            if (!s.hasClass("noSubSport"))
                if (s.hasClass("expanded")) {
                    s.removeClass("expanded");
                    $.decode(s.attr("cfg"));
                    for (var e = $(s.parent("div.topNav").next("div")); e.hasClass("subNav"); )
                        e.hide(),
                        e = $(e.next())
                } else {
                    $(".subNav").hide(),
                    $(".topNavA").removeClass("expanded"),
                    $(".ulHeaderA").hasClass("expanded") && ($(".ulHeaderA").removeClass("expanded"),
                    $(".usefulLinks").hide(),
                    $(".ulHeaderA").addClass("collapsed"),
                    $(".usefulLinks").addClass("collapsed")),
                    s.addClass("expanded"),
                    s.next(".subNav").show();
                    $.decode(s.attr("cfg"));
                    for ((e = $(s.parent("div.topNav").next("div"))).hasClass("subNav Top") && e.hasClass("subNav Other") || ($(".subSportNavTogTop").hasClass("collapsed") && $(".subNavTogTop").hasClass("collapsed") && ($(".subSportNavTogTop").removeClass("collapsed"),
                    $(".subSportNavTogTop").addClass("expanded"),
                    $(".subNavTogTop").removeClass("collapsed"),
                    $(".subNavTogTop").addClass("expanded")),
                    $(".subSportNavTogOther").hasClass("collapsed") && $(".subtNavTogOther").hasClass("collapsed") && ($(".subSportNavTogOther").removeClass("collapsed"),
                    $(".subSportNavTogOther").addClass("expanded"),
                    $(".subtNavTogOther").removeClass("collapsed"),
                    $(".subtNavTogOther").addClass("expanded"))); e.hasClass("subNav"); )
                        e.show(),
                        e = $(e.next())
                }
        })
    },
    UsefulLinksAction: function() {
        $(".otherSportsLinks").hide(),
        $(".contests").hide(),
        $(".futuresPropsLinks").hide(),
        $(".usefulLinks").hide(),
        $(".gamePropsLinks").hide(),
        $(".futuresSpecialsLinks").hide(),
        $(".mainSportsLinks").removeClass("collapsed"),
        $(".ulHeaderAMS").addClass("expanded"),
        $(".ulHeaderAOS").addClass("collapsed"),
        $(".ulHeaderAC").addClass("collapsed"),
        $(".ulHeaderAFP").addClass("collapsed"),
        $(".ulHeaderA").addClass("collapsed"),
        $(".ulHeaderAGP").addClass("collapsed"),
        $(".ulHeaderAFS").addClass("collapsed"),
        $(".ulHeaderMS").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAMS")
              , s = $(".mainSportsLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeaderOS").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAOS")
              , s = $(".otherSportsLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeaderC").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAC")
              , s = $(".contests")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeaderFP").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAFP")
              , s = $(".futuresPropsLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeader").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderA")
              , s = $(".usefulLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeaderGP").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAGP")
              , s = $(".gamePropsLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        }),
        $(".ulHeaderFS").click(function() {
            $(".subNav").hide(),
            $(".topNavA").removeClass("expanded");
            var a = $(".ulHeaderAFS")
              , s = $(".futuresSpecialsLinks")
              , e = $(".topNavA");
            null != s && (s.hasClass("collapsed") ? (s.show(),
            s.removeClass("collapsed"),
            a.removeClass("collapsed"),
            a.addClass("expanded"),
            e.removeClass("collapsedIn"),
            e.addClass("collapsedOut")) : (s.addClass("collapsed"),
            s.hide(),
            a.addClass("collapsed"),
            a.removeClass("expanded"),
            e.removeClass("collapsedOut"),
            e.addClass("collapsedIn")))
        })
    },
    SubNavAction: function() {
        var t = this;
        $(".subNavA").click(function(a) {
            var s = $(a.currentTarget ? a.currentTarget : a.target);
            if (!s.attr("disabled") && !s.hasClass("selected")) {
                $("#nav .selected").removeClass("selected"),
                s.addClass("selected");
                var e = $.decode(s.attr("cfg"));
                if (null != e) {
                    "Bet Boost" == e.level1 ? $("#BetBoostSection").show() : $("#BetBoostSection").hide();
                    var l = $(s.parent("div.name").next("div.slctCont").find("select"));
                    e.rotNo = l.val(),
                    t.MenuClick(e)
                }
                var d = e.level1
                  , o = e.level2;
                null == e.level2 && (o = d,
                d = "futures-and-props"),
                buildURL(d.toLowerCase(), o.toLowerCase())
            }
            P.Ln.PlayerPropsWidgetArray = []
        })
    },
    SubSportNavTog: function() {
        $(".subNavTogTop").click(function(a) {
            var s = $(a.currentTarget ? a.currentTarget : a.target);
            s.hasClass("noSubSport") || (s.hasClass("expanded") ? (s.removeClass("expanded"),
            $("#Top").removeClass("expanded"),
            $("#Top").addClass("collapsed"),
            s.addClass("collapsed"),
            $(".Top").hide()) : ($(".Top").show(),
            $("#Top").removeClass("collapsed"),
            $("#Top").addClass("expanded"),
            s.removeClass("collapsed"),
            s.addClass("expanded")))
        }),
        $(".subtNavTogOther").click(function(a) {
            var s = $(a.currentTarget ? a.currentTarget : a.target);
            s.hasClass("noSubSport") || (s.hasClass("expanded") ? ($("#Other").removeClass("expanded"),
            $("#Other").addClass("collapsed"),
            s.removeClass("expanded"),
            s.addClass("collapsed"),
            $(".Other").hide()) : ($(".Other").show(),
            $("#Other").removeClass("collapsed"),
            $("#Other").addClass("expanded"),
            s.removeClass("collapsed"),
            s.addClass("expanded")))
        })
    },
    MenuClick: function(a) {
        "tutVidId" != a.type && (P.Bskt.Tckt.notsync = !0,
        $("div.window-container:visible").find("div.window-closeButton").click(),
        P.Ln.LoadData(a))
    }
};
P.Ln = {
    init: function() {
        if (this.UnderlineLink(0),
        this.Tps.init(),
        this.AttachHandler({}, $("#contentBody")),
        $("#searchBtn").click(function() {
            P.Ln.SearchCompetitorOrRotation(0, "", "", !1)
        }),
        $("#linesSortOptionSelect").change(function() {
            P.Ln.SortLinesByOption(this.value)
        }),
        null != P.Param.paramCollection) {
            if ("todaygames" == P.Param.paramCollection[0].H2HParam.AltConf.toLowerCase()) {
                P.ParamType = "collection",
                this.ViewSelectedOptions = [];
                for (var e = 0; e < P.Param.paramCollection.length; e++) {
                    for (var t = {
                        AltConf: P.Param.paramCollection[e].H2HParam.AltConf,
                        level1: P.Param.paramCollection[e].H2HParam.Lv1,
                        level2: P.Param.paramCollection[e].H2HParam.Lv2,
                        rotNo: P.Param.paramCollection[e].H2HParam.RotNo,
                        type: P.Param.paramCollection[e].Type.toLowerCase()
                    }, a = !1, s = 0; s < this.ViewSelectedOptions.length; s++)
                        this.ViewSelectedOptions[s].level2 === t.level2 && (a = !0);
                    a || this.ViewSelectedOptions.push(t)
                }
                P.Param.paramCollection = void 0
            } else
                P.Param = P.Param.paramCollection[0]
        }
        this.PlayerPropsWidgetArray = []
    },
    ReloadQueueNo: 0,
    LoadDeltaQueueNo: 0,
    ViewSelectedOptions: [],
    ViewSelectedCurrentLevel2: "",
    RotNumberSearchParam: -1,
    PeriodsSelected: [],
    PlayerPropsWidgetArray: [],
    DisableDeltaUpdates: function(e) {
        return 1 == e
    },
    Tps: {
        init: function() {
            this.tooltip = $.template('<div class="detWrapper"><div class="detHeader">${lt}<br />${rt}</div><div class="detBody">${cmts}</div></div>').compile()
        }
    },
    LoadData: function(e, t) {
        P.Cr.pingBack(),
        $("#contentArea").mask(P.In.loading),
        $("#nav").mask(),
        this.ReloadQueueNo++,
        this.PunchDeltaTime();
        var a = this;
        "viewSelected" != e.type && "clearSelected" != e.type && "prop" != e.type && (a.ViewSelectedOptions = [],
        a.ViewSelectedCurrentLevel2 = ""),
        a.RotNumberSearchParam = -1,
        "clearSelected" == e.type ? this.ClearAllChecked() : "viewSelected" == e.type ? this.LoadSelectedGames(e, t) : "top10upc" == e.type ? this.LoadTop10Upc(e, t) : "top10fav" == e.type ? this.LoadTop10Fav(e, t) : "h2h" == e.type ? this.LoadH2H(e, t) : "cntst" == e.type ? this.LoadContest(e, t) : "prop" == e.type && this.LoadPropositionMarket(e, t)
    },
    LoadSuccess: function(e, t, a) {
        var s = this;
        if (a = $.trim(a) + "",
        null != t && null != t && 0 == a.length) {
            for (var i = $(t).parent().parent().parent().parent(), n = $("#contentBody").children(), r = 0; r < n.length; r++) {
                var l = $(n[r]);
                l[0] != i[0] && l.remove()
            }
            $("#noeventmsg").length <= 0 && $("#contentBody").append("<div id='noeventmsg'>" + P.In.noevent + "</div>")
        } else
            $("#contentBody").empty(),
            0 == a.length ? $("#noeventmsg").length <= 0 && $("#contentBody").append("<div id='noeventmsg'>" + P.In.noevent + "</div>") : ($("#contentBody").append(a),
            s.UnderlineLink(e)),
            this.AttachHandler(e, $("#contentBody"));
        P.Bskt.Tckt.notsync = void 0,
        $("#contentArea").unmask(),
        $("#nav").unmask(),
        this.IgnoreDelta = !1,
        s.ResizeCreditIframe(),
        null != e.level2 ? document.title = e.level2 + " Betting Odds & Lines at BetOnline.ag Sportbook" : null != e.level1 && (document.title = e.level1 + " Betting Odds & Lines at BetOnline.ag Sportbook"),
        s.HightligthPicksSelected(),
        !$.cookie("PlayerPropsIsActive") && 1 != $("#playerPropsFrame").length || P.Pp.HidePlayerProps(),
        !$.cookie("SportSimsIsActive") && 1 != $("#sportSimsFrame").length || P.Ss.HideSportSims()
    },
    HightligthPicksSelected: function() {
        if (hightligthPicksEnabled)
            for (var e = 0; e < currentSelectedPicks.length; e++)
                P.TcktHndlr.AddOrRemoveHighlight(currentSelectedPicks[e])
    },
    ClearAllChecked: function() {
        var e = $(".subNav").find("input:checked");
        if (0 < e.length)
            for (var t = 0; t < e.length; t++)
                $(e[t]).attr("checked", !1);
        if (0 < (e = $(".subNavCnts").find("input:checked")).length)
            for (t = 0; t < e.length; t++)
                $(e[t]).attr("checked", !1);
        $("#contentArea").unmask(),
        $("#nav").unmask(),
        P.ParamType = void 0
    },
    LoadSelectedGames: function(t, a) {
        var e, s, i = this;
        null == t.periodChange || 1 != t.periodChange ? (s = $(".subNav").find("input:checked"),
        e = $(".subNavCnts").find("input:checked"),
        0 == s.length && 0 == e.length ? ($.prompt(P.In.validation_no_items_selected),
        $("#contentArea").unmask(),
        $("#nav").unmask()) : $.post(P.Url.RetrieveSelected, this.CreateSelectedJsonParam(t, !1), function(e) {
            i.LoadSuccess(t, a, e)
        })) : ($.post(P.Url.RetrieveSelected, this.CreateSelectedGameChangeParam(t), function(e) {
            i.LoadSuccess(t, a, e)
        }),
        0 == (s = $(".subNav").find("input:checked")).length && (P.ParamType = void 0))
    },
    LoadTop10Upc: function(t, a) {
        var s = this;
        $.post(P.Url.RetrieveTop10Upcoming, this.CreatePostParam(t, !1), function(e) {
            s.LoadSuccess(t, a, e)
        })
    },
    LoadTop10Fav: function(t, a) {
        var s = this;
        $.post(P.Url.RetrieveTop10Favorite, this.CreatePostParam(t, !1), function(e) {
            s.LoadSuccess(t, a, e)
        })
    },
    LoadH2H: function(t, a) {
        var s = this;
        void 0 === t.PrdNo && (t.PrdNo = 0),
        "todaygames" == t.level2.toLowerCase() ? $.post(P.Url.RetrieveSelected, this.CreateSoccerTodayGamesJsonParam(t, !1), function(e) {
            s.LoadSuccess(t, a, e)
        }) : $.post(P.Url.RetrieveH2HLine, this.CreatePostParam(t, !1), function(e) {
            s.LoadSuccess(t, a, e)
        }),
        this.ClearAllChecked()
    },
    LoadContest: function(t, a) {
        var s = this;
        $.post(P.Url.RetrieveContestLine, this.CreatePostParam(t, !1), function(e) {
            s.LoadSuccess(t, a, e)
        })
    },
    LoadPropositionMarket: function(t) {
        var a = this;
        $.post(P.Url.RetrievePropLine, this.CreatePostParam(t, !1), function(e) {
            e = $.trim(e),
            t.$addMktTd.empty(),
            0 != e.length && $(e).appendTo(t.$addMktTd),
            a.AttachHandler(t, t.$addMktTd),
            $("#contentArea").unmask(),
            $("#nav").unmask()
        })
    },
    ParseConfig: function(e, t) {
        var a = {
            param: {}
        };
        return a.param.SortOption = $("#linesSortOptionSelect option:selected").val(),
        a.param.PrdNo = void 0 === e.PrdNo ? -1 : e.PrdNo,
        "top10upc" == e.type ? ($.extend(a.param, {
            Type: "Top10Upc",
            RequestType: t ? "Delta" : "Normal"
        }),
        e.periodChange && (a.param.Top10Param = {
            Lv1: e.level1
        }),
        P.Param = a.param) : "top10fav" == e.type ? ($.extend(a.param, {
            Type: "Top10Fav",
            RequestType: t ? "Delta" : "Normal"
        }),
        e.periodChange && (a.param.Top10Param = {
            Lv1: e.level1
        }),
        P.Param = a.param) : "h2h" == e.type ? ($.extend(a.param, {
            Type: "H2H",
            RequestType: t ? "Delta" : "Normal"
        }),
        a.param.H2HParam = {
            Lv1: e.level1,
            Lv2: e.level2,
            RotNo: e.rotNo,
            AltConf: e.AltConf
        },
        P.Param = a.param) : "cntst" == e.type ? ($.extend(a.param, {
            Type: "Cntst",
            RequestType: t ? "Delta" : "Normal",
            IsFuturesSpecials: e.DisplayIsFuture
        }),
        a.param.CntstParam = {
            Lv1: e.level1
        },
        P.Param = a.param) : "prop" == e.type && ($.extend(a.param, {
            Type: "Prop",
            RequestType: t ? "Delta" : "Normal"
        }),
        a.param.PropParams = [{
            CrId: e.rqData.crid
        }],
        a.param.CntstParam = {
            Lv1: e.rqData.lv1
        },
        a.param.GameNum = e.$trgt.attr("id")),
        a
    },
    CreatePostParam: function(e, t) {
        var a = this.ParseConfig(e, t);
        return $.postify(a)
    },
    CreateSelectedGameChangeParam: function(e) {
        for (var t = {
            paramCollection: []
        }, a = 0; a < this.ViewSelectedOptions.length; a++)
            this.ViewSelectedOptions[a].level1 == e.level1 && null != e.level2 && this.ViewSelectedOptions[a].level2 == e.level2 && (this.ViewSelectedOptions[a].periodChange = !0,
            this.ViewSelectedOptions[a].PrdNo = e.PrdNo,
            this.ViewSelectedOptions[a].rotNo = e.rotNo),
            t.paramCollection.push(this.ParseConfig(this.ViewSelectedOptions[a], !1));
        return P.Param = t.paramCollection,
        P.ParamType = "collection",
        JSON2.stringify(t)
    },
    CreateSelectedJsonParam: function(e, t) {
        var a = {
            paramCollection: []
        }
          , s = $(".subNav").find("input:checked").parent().parent().find(".subNavA")
          , i = $(".subNavCnts").find("input:checked").parent().parent().find(".subNavA");
        if (this.ViewSelectedOptions = [],
        0 < s.length)
            for (var n = 0; n < s.length; n++) {
                var r = $.decode($(s[n]).attr("cfg"));
                this.ViewSelectedOptions.push(r),
                a.paramCollection.push(this.ParseConfig(r, t))
            }
        if (0 < i.length)
            for (n = 0; n < i.length; n++) {
                r = $.decode($(i[n]).attr("cfg"));
                this.ViewSelectedOptions.push(r),
                a.paramCollection.push(this.ParseConfig(r, t))
            }
        return P.Param = a.paramCollection,
        P.ParamType = "collection",
        JSON2.stringify(a)
    },
    CreateSoccerTodayGamesJsonParam: function(e, t) {
        var a = {
            paramCollection: []
        }
          , s = $(".subNav").find("input").parent().parent().find(".subNavA");
        if (0 < s.length)
            for (var i = 0; i < s.length; i++) {
                var n = $.decode($(s[i]).attr("cfg"));
                "soccer" == n.level1.toLowerCase() && ($.extend(n, {
                    AltConf: e.level2
                }),
                e.periodChange && $.extend(n, {
                    periodChange: !0,
                    gamePeriodNo: e.gamePeriodNo,
                    rotNo: e.rotNo
                }),
                this.ViewSelectedOptions.push(n),
                a.paramCollection.push(this.ParseConfig(n, t)))
            }
        return e.type = "viewSelected",
        P.Param = a.paramCollection,
        P.ParamType = "collection",
        JSON2.stringify(a)
    },
    CollapsedGroups: function() {
        for (i = 0; i < P.Ln.idsCollapsed.length; i++)
            $("tbody[id=" + P.Ln.idsCollapsed[i] + "]").trigger("click")
    },
    VerifyCollapsedGroups: function() {
        P.Ln.idsCollapsed = [],
        $("tbody.collapsed").each(function() {
            P.Ln.idsCollapsed.push($(this).attr("id"))
        })
    },
    LoadDelta: function() {
        var e, a, s, t = null;
        0 < this.PlayerPropsWidgetArray.length && (t = 1),
        0 < $("div.refresh:visible").length && 1 != this.DisableDeltaUpdates(t) && (P.Ln.VerifyCollapsedGroups(),
        e = ++this.ReloadQueueNo,
        this.LoadDeltaQueueNo = e,
        a = this.CreateDeltaParam(),
        (s = this).PunchDeltaTime(),
        isAutoRefresh = !0,
        "collection" != P.ParamType && (a.RequestType = "Delta",
        a.DeltaPeriod = P.DeltaTime.Tick),
        $("div.refresh").hide(),
        $("div.refreshloading").show(),
        $("td.delta").each(function(e, t) {
            $(t).removeClass("delta")
        }),
        "RotNumSeach" == P.ParamType && null != P.Param && null != P.Param.H2HParam ? (s.SearchCompetitorOrRotation(P.Param.PrdNo, P.Param.H2HParam.Lv1, P.Param.H2HParam.Lv2, !0),
        $("div.refresh").show(),
        $("div.refreshloading").hide(),
        P.Ln.CollapsedGroups()) : "collection" != P.ParamType ? $.post(P.Url.RetrieveLineDeltaData, $.postify({
            param: a
        }), function(e) {
            if (s.ReloadQueueNo == s.LoadDeltaQueueNo && 0 != (e = $.trim(e)).length && ($("#contentArea").mask(),
            $("#nav").mask(),
            s.LoadSuccess(a, null, e)),
            1 == isSelectAll)
                P.Ln.CheckedAllQuickAccess(),
                $("#contestDetailTable").find(".cntstNm").css("display", "table-row-group"),
                $("#contestDetailTable").find(".event").css("display", "table-row-group"),
                $("#contestDetailTable").find(".date").css("display", "table-row-group");
            else if (0 < qAccess.length) {
                for (var t = 0; t < qAccess.length; t++)
                    0 == t && ($("#contestDetailTable").find(".cntstNm").css("display", "none"),
                    $("#contestDetailTable").find(".event").css("display", "none"),
                    $("#contestDetailTable").find(".date").css("display", "none")),
                    document.getElementById(qAccess[t].AccessN).checked = !0,
                    P.Ln.QuickAccessCloseSelection(qAccess[t].AccessN);
                P.Ln.SetValueTextQuickAccess()
            }
            $("div.refresh").show(),
            $("div.refreshloading").hide(),
            $("#oddsFormatSelect").trigger("change"),
            P.Ln.CollapsedGroups()
        }) : $.post(P.Url.RetrieveSelectedDelta, JSON2.stringify({
            paramCollection: a
        }), function(e) {
            s.ReloadQueueNo == s.LoadDeltaQueueNo && 0 != (e = $.trim(e)).length && ($("#contentArea").mask(),
            $("#nav").mask(),
            s.LoadSuccess(a, null, e)),
            $("div.refresh").show(),
            $("div.refreshloading").hide(),
            $("#oddsFormatSelect").trigger("change"),
            "" != $.trim(e) && P.Ln.CollapsedGroups()
        }),
        s.HightligthPicksSelected())
    },
    PunchDeltaTime: function() {
        var e = P.DeltaTime.Time;
        P.DeltaTime.Time = new Date;
        var t = P.DeltaTime.Time - e;
        P.DeltaTime.Tick = Math.ceil(t / 3e3)
    },
    CreateDeltaParam: function() {
        var e;
        if (1 < P.Param.length && null == P.ParamType && (P.ParamType = "collection"),
        e = "collection" == P.ParamType ? [] : {},
        $.extend(e, P.Param),
        "collection" == P.ParamType)
            for (var t = 0; t < P.Param.length; t++)
                this.AddDeltaParamSequences(e[t].param);
        else
            this.AddDeltaParamSequences(e);
        return e
    },
    AddDeltaParamSequences: function(s) {
        if (s.H2HLastSeq = 0,
        s.CntstLastSeq = 0,
        s.RequestType = "Delta",
        null != s.H2HParam && (s.H2HParam.LastSeq = 0),
        null != s.CntstParam && (s.CntstParam.LastSeq = 0),
        "Top10Upc" == s.Type || "Top10Fav" == s.Type ? ($(".h2hSeq").each(function(e, t) {
            var a = $(t);
            Number(a.attr("seq")) > s.H2HLastSeq && (s.H2HLastSeq = Number(a.attr("seq")))
        }),
        $(".cntstSeq").each(function(e, t) {
            var a = $(t);
            Number(a.attr("seq")) > s.CntstLastSeq && (s.CntstLastSeq = Number(a.attr("seq")))
        }),
        null == s.Top10Param || null == s.Top10Param ? s.Top10Param = {
            Top10CacheTimeStamp: $("#top10cacheTimestamp").text()
        } : s.Top10Param.Top10CacheTimeStamp = $("#top10cacheTimestamp").text()) : "H2H" == s.Type || "DefaultSports" == s.Type || "collection" == s.Type || "RotNumSeach" == s.Type ? $(".h2hSeq").each(function(e, t) {
            var a = $(t);
            Number(a.attr("seq")) > s.H2HParam.LastSeq && (s.H2HParam.LastSeq = Number(a.attr("seq")))
        }) : "Cntst" == s.Type && $(".cntstSeq").each(function(e, t) {
            var a = $(t);
            Number(a.attr("seq")) > s.CntstParam.LastSeq && (s.CntstParam.LastSeq = Number(a.attr("seq")))
        }),
        "Top10Upc" == s.Type || "Top10Fav" == s.Type || "H2H" == s.Type) {
            var i = {};
            for (var e in $(".propSeq").each(function(e, t) {
                var a = $(t);
                null == i[a.attr("crId")] && (i[a.attr("crId")] = 0),
                Number(a.attr("seq")) > i[a.attr("crId")] && (i[a.attr("crId")] = Number(a.attr("seq")))
            }),
            s.PropParams = [],
            i)
                s.PropParams.push({
                    CrId: e,
                    LastSeq: i[e]
                })
        }
    },
    SortLinesByOption: function(e) {
        var t, a = "";
        0 < P.Ln.ViewSelectedOptions.length && P.Ln.ViewSelectedOptions[0].AltConf && (a = P.Ln.ViewSelectedOptions[0].AltConf.toLowerCase()),
        "S" != e && ("collection" == P.ParamType && "todaygames" != a ? (t = {
            type: "viewSelected"
        },
        P.Ln.LoadData(t)) : "RotNumSeach" == P.ParamType && "todaygames" != a ? P.Ln.SearchCompetitorOrRotation(0, "", "", !1) : $($("div.subNav").find("a.subNavA")).each(function() {
            var e, t = $(this);
            !t.hasClass("selected") || "cntst" != (e = $.decode(t.attr("cfg"))).type && (0 < P.Ln.PeriodsSelected.length && (e.PrdNo = P.Ln.PeriodsSelected[0].slice(P.Ln.PeriodsSelected[0].lastIndexOf("-") + 1, P.Ln.PeriodsSelected[0].lastIndexOf("-") + 2)),
            P.Ln.LoadData(e))
        }))
    },
    SearchCompetitorOrRotation: function(s, e, t, a) {
        var i, n, r = $("#searchInputId").val(), l = this;
        null != r && null != r && 0 != r.length ? ((i = {}).PrdNo = s,
        i.SortOption = $("#linesSortOptionSelect option:selected").val(),
        i.Type = "H2H",
        i.RequestType = null == a || a ? "Delta" : "Normal",
        i.H2HParam = {},
        i.H2HParam.Lv1 = e,
        i.H2HParam.Lv2 = t,
        isNaN(r) || 0 == r.length ? $.prompt(P.In.validation_invalid_rotation_num) : ($("#contentArea").mask(),
        $("#nav").mask(),
        i.H2HParam.RotNo = r,
        n = $.postify(i),
        this.ViewSelectedOptions = [],
        $.post(P.Url.RetrieveH2HLine, n, function(e) {
            P.Param = i,
            P.ParamType = "RotNumSeach";
            var t = {};
            t.PrdNo = s;
            var a = $.decode($("select.gameperiod").attr("cfg"));
            null != a && (t.level1 = a.level1,
            t.level2 = a.level2),
            t.rotNo = r,
            l.RotNumberSearchParam = r,
            t.type = "",
            l.LoadSuccess(t, null, e)
        }))) : $.prompt(P.In.validation_invalid_rotation_num)
    },
    AttachHandler: function(e, t) {
        t.find("input.oddsselection:disabled").each(function(e, t) {
            $(t).attr("disabled", !1)
        }),
        this.AttachGamePeriodHandler(e, t),
        P.Tlbx.PreSelectWagerSelection(t),
        P.Tlbx.WagerSelectionAttachHandler(t),
        P.Tlbx.WagerTypeActivatorHandler(t),
        this.AttachLoadPropMarketHandler(e, t)
    },
    AttachGamePeriodHandler: function(e, t) {
        var r = this;
        t.find(".periodMktUn").click(function(e) {
            var t, a, s, i, n = $.decode(e.currentTarget.attributes.cfg.value);
            0 < r.RotNumberSearchParam ? (t = n.prdNo,
            r.SearchCompetitorOrRotation(t, n.level1, n.level2, !1)) : (i = (P.Ln.ViewSelectedOptions.length < 1 ? ((a = {
                type: "h2h",
                periodChange: !0
            }).PrdNo = n.prdNo,
            a.level1 = n.level1,
            null != n.level2 ? (a.level2 = n.level2,
            r.ViewSelectedCurrentLevel2 = n.level2) : a.level2 = r.ViewSelectedCurrentLevel2) : ((a = {
                type: "viewSelected",
                periodChange: !0
            }).PrdNo = n.prdNo,
            s = n,
            a.level1 = s.level1,
            null != s.level2 ? (a.level2 = s.level2,
            r.ViewSelectedCurrentLevel2 = s.level2) : a.level2 = r.ViewSelectedCurrentLevel2),
            $("#searchBoxTd")),
            a.rotNo = i.val(),
            r.LoadData(a, this))
        }),
        P.Nfo.AttachTooltipHandler(t)
    },
    AttachLoadPropMarketHandler: function(e, t) {
        var a = this;
        null != t && null != t.context.className && t.context.className.includes("expanded") && 1 == e.rqData.ismapped && P.Pp.LoadDstWidgetProps(e, t),
        t.find(".propMkt").click(function(e) {
            isAutoRefresh = !1,
            isOriginalEvent = !0;
            var t = $(e.currentTarget ? e.currentTarget : e.target);
            a.DisplayOrHiePropSection(t)
        })
    },
    DisplayOrHiePropSection: function(e) {
        $trgt = e;
        var t, a, s = $($trgt.parents("tbody.event").find("tr.addMkt td"));
        $trgt.hasClass("collapsed") ? ($trgt.removeClass("collapsed"),
        $trgt.addClass("expanded"),
        (t = {}).$trgt = $trgt,
        t.$addMktTd = s,
        t.type = "prop",
        t.rqData = $.decode($trgt.attr("cfg")),
        this.AddToPropArray($trgt.attr("id")),
        this.LoadData(t)) : $trgt.hasClass("expanded") && ($trgt.removeClass("expanded"),
        $trgt.addClass("collapsed"),
        s.empty(),
        this.RemovePropArray($trgt.attr("id")),
        -1 < (a = this.PlayerPropsWidgetArray.indexOf($trgt.attr("id"))) && this.PlayerPropsWidgetArray.splice(a, 1))
    },
    ResizeCreditIframe: function() {
        if (self != parent) {
            if (self == parent)
                return !1;
            var e = document.getElementById("sportsbookBody").scrollHeight + 10;
            e < 1e3 && (e = 1e3),
            parent.document.getElementById("ngbpframe").style.height = e
        }
    },
    OpenIdMarket: function() {},
    AddToPropArray: function(e) {
        0 == idMarketOpen.length && idMarketOpen.push(e)
    },
    RemovePropArray: function(e) {
        var t = idMarketOpen.indexOf(e);
        -1 < t && idMarketOpen.splice(t, 1)
    },
    ClickIdMarket: function() {
        if (1 == isAutoRefresh && 0 == isOriginalEvent && 0 < idMarketOpen.length)
            for (var e = 0; e < idMarketOpen.length; e++) {
                var t = $("#" + idMarketOpen[e]);
                this.DisplayOrHiePropSection(t)
            }
        isAutoRefresh = !1,
        isOriginalEvent = !1
    },
    QuickAccessCloseSelection: function(e) {
        e = $.browser.msie ? e.toString().replace(/^\s+|\s+$/g, "") : e.trim(),
        P.Ln.FilterContestByQuickAcces(e.toLowerCase())
    },
    FilterContestByQuickAcces: function(l) {
        $(".cntstNm").each(function(e, t) {
            var a, s = $(this).find(".ctsDesc").text(), i = $(this).find(".ctsDesc").attr("id");
            a = $.browser.msie ? (a = s.toString().replace(/^\s+|\s+$/g, "")).toLowerCase() : s.trim().toLowerCase();
            var n, r = "#" + this.id.toString().substring(0, 1);
            "%" == l.substring(l.length - 1) && "%" == l.substring(0, 1) ? (n = l.substring(1, l.length - 1),
            -1 < a.indexOf(n) && ($(r + "-date").css("display", "table-row-group"),
            $(this).css("display", "table-row-group"),
            $(this).next().css("display", "table-row-group"))) : i == l && ($(r + "-date").css("display", "table-row-group"),
            $(this).css("display", "table-row-group"),
            $(this).next().css("display", "table-row-group"))
        })
    },
    ShowQuickAccessList: function() {
        var e, t, a;
        "block" == $("#quickAccessDiv").css("display") ? P.Ln.SearchQuickAccess() : (t = (e = $("#text-quickAccess").position()).top + 32,
        a = e.left + 10,
        $("#quickAccessDiv").css("display", "block"),
        $("#quickAccessDiv").css("top", t + "px"),
        $("#quickAccessDiv").css("left", a + "px"))
    },
    SearchQuickAccess: function() {
        $("#quickAccessDiv").css("display", "none")
    },
    AddCriteria: function(e) {
        var t = "";
        if (isSelectAll = !1,
        e.checked)
            if ("SelectAll" == e.id)
                isSelectAll = !0,
                P.Ln.CheckedAllQuickAccess();
            else {
                t = $.browser.msie ? (t = window.document.getElementById(e.id).parentNode.innerText).toString().replace(/^\s+|\s+$/g, "") : e.parentNode.textContent.trim();
                for (var a = qAccess.length; a--; )
                    "SelectAll" === qAccess[a].AccessN && qAccess.splice(a, 1);
                qAccess.push({
                    AccessN: e.id,
                    Criteria: t
                });
                for (a = 0; a < qAccess.length; a++)
                    0 == a && ($("#contestDetailTable").find(".cntstNm").css("display", "none"),
                    $("#contestDetailTable").find(".event").css("display", "none"),
                    $("#contestDetailTable").find(".date").css("display", "none")),
                    P.Ln.QuickAccessCloseSelection(qAccess[a].AccessN);
                P.Ln.SetValueTextQuickAccess()
            }
        else if ("SelectAll" == e.id) {
            qAccess = [];
            var s = document.getElementById("listQ");
            $(s).find("input:checkbox").each(function() {
                $(this)[0].checked = !1
            }),
            $("#textBoxQuickAccess").val("Please Select one of the available values")
        } else {
            var i = document.getElementById("SelectAll");
            $(i)[0].checked = !1;
            var n = [];
            for (var a in qAccess)
                if (qAccess[a].AccessN == e.id) {
                    n.push(qAccess[a]);
                    break
                }
            if (P.Ln.RemoveQuickAccessSelected(qAccess, n),
            0 < qAccess.length)
                for (a = 0; a < qAccess.length; a++)
                    0 == a && ($("#contestDetailTable").find(".cntstNm").css("display", "none"),
                    $("#contestDetailTable").find(".event").css("display", "none"),
                    $("#contestDetailTable").find(".date").css("display", "none")),
                    P.Ln.QuickAccessCloseSelection(qAccess[a].AccessN);
            P.Ln.SetValueTextQuickAccess()
        }
        0 == qAccess.length && 0 == isSelectAll && ($("#textBoxQuickAccess").val("Please Select one of the available values"),
        $("#contestDetailTable").find(".cntstNm").css("display", "table-row-group"),
        $("#contestDetailTable").find(".event").css("display", "table-row-group"),
        $("#contestDetailTable").find(".date").css("display", "table-row-group"))
    },
    SetValueTextQuickAccess: function() {
        var e = "";
        "Please Select one of the available values" == $("#textBoxQuickAccess").val() && $("#textBoxQuickAccess").val(""),
        P.Ln.CleanQuickAccessList();
        for (var t = 0; t < qAccess.length; t++)
            e += "," + qAccess[t].Criteria;
        "," == e[0] && (e = e.substring(1)),
        $("#textBoxQuickAccess").val(e)
    },
    CleanQuickAccessList: function() {
        var e = document.getElementById("listQ")
          , t = "";
        $("#textBoxQuickAccess").val(""),
        qAccess = [],
        $(e).find("input:checkbox").each(function() {
            var e = ""
              , e = $.browser.mozilla ? $(this)[0].parentNode.textContent.trim() : $(this)[0].parentNode.innerText.toString().replace(/^\s+|\s+$/g, "");
            1 == $(this)[0].checked && (t += "," + e,
            qAccess.push({
                AccessN: $(this)[0].id,
                Criteria: e
            }))
        }),
        "," == t[0] && (t = t.substring(1)),
        $("#textBoxQuickAccess").val(t)
    },
    RemoveQuickAccessSelected: function(e, t) {
        for (var a = e.length; a--; )
            e[a].AccessN === t[0].AccessN && e.splice(a, 1);
        1 == e.length && "SelectAll" == e[0].AccessN && (e.splice(0, 1),
        $("#textBoxQuickAccess").val("Please Select one of the available values"))
    },
    CheckedAllQuickAccess: function() {
        var e = document.getElementById("listQ")
          , t = "";
        $("#textBoxQuickAccess").val(""),
        qAccess = [],
        $(e).find("input:checkbox").each(function() {
            $(this)[0].checked = !0;
            var e = "";
            "Select All" != (e = $.browser.mozilla ? $(this)[0].parentNode.textContent.trim() : $(this)[0].parentNode.innerText.toString().replace(/^\s+|\s+$/g, "")) && (t += "," + e,
            qAccess.push({
                AccessN: $(this)[0].id,
                Criteria: e
            }))
        }),
        "," == t[0] && (t = t.substring(1)),
        $("#textBoxQuickAccess").val("Show All"),
        $("#contestDetailTable").find(".cntstNm").css("display", "table-row-group"),
        $("#contestDetailTable").find(".event").css("display", "table-row-group"),
        $("#contestDetailTable").find(".date").css("display", "table-row-group")
    },
    UnderlineLink: function(e) {
        var a, t;
        t = null != e.level2 && null != e.level1 ? (a = e.level1.replace(" ", "") + "-" + e.level2.replace(" ", ""),
        e.level1.replace(" ", "") + "-" + e.level2.replace(" ", "") + "-" + e.PrdNo) : (a = e.level1 + "-" + e.level2,
        e.level1 + "-" + e.level2 + "-" + e.PrdNo),
        "viewSelected" == e.type && null == e.level1 && (P.Ln.PeriodsSelected = []),
        e.level1 && (jQuery.each(P.Ln.PeriodsSelected, function(e, t) {
            null != t && 0 <= t.indexOf(a) && P.Ln.PeriodsSelected.splice(e, 1)
        }),
        P.Ln.PeriodsSelected.push(t)),
        jQuery.each(P.Ln.PeriodsSelected, function(e, t) {
            $("." + t).removeClass("periodMktUn"),
            $("." + t).addClass("periodMkt")
        }),
        $(".periodMktPrincipal").each(function() {
            var e, t = !1;
            $(this).children().each(function() {
                $(this).hasClass("periodMkt") && (t = !0)
            }),
            t || (e = $(this).find(".periodMkt_0"),
            $(e).removeClass("periodMktUn"),
            $(e).addClass("periodMkt"))
        })
    },
    ClearAllSelected: function() {
        var e = $(".subNavA.selected");
        if (0 < e.length)
            for (var t = 0; t < e.length; t++)
                $(e[t]).removeClass("subNavA selected"),
                $(e[t]).addClass("subNavA");
        $("#contentArea").unmask(),
        $("#nav").unmask(),
        P.ParamType = void 0
    }
};
P.Lyt = {
    topHeight: 95,
    init: function() {
        this.MonitorScroll()
    },
    MonitorScroll: function() {
        var a = this;
        $(window).scroll(function() {
            a.Scroll()
        })
    },
    Scroll: function() {
        var a = this;
        $.idle(function() {
            a.topHeight = $("#center").offset().top;
            var b = $(document).scrollTop();
        }, 200)
    }
};
P.Prf = {
    init: function() {
        $(".prefSelect").sexyCombo({
            emptyText: "All",
            triggerSelected: !0
        }),
        $(".lineSortSelect").sexyCombo({
            showListCallback: function() {
                this.listItems.each(function() {
                    "sortlinesby" == $(this).text().replace(/ /g, "").toLowerCase() && ($(this).css({
                        color: "#808080"
                    }),
                    $(this).unbind())
                })
            }
        }),
        $("#langSelect").change(function(t) {
            var e = $(t.currentTarget ? t.currentTarget : t.target);
            if (void 0 == e.attr("prevVal") || e.attr("prevVal") != e.val()) {
                var a = P.Ln.CreateDeltaParam();
                $("#appbody").mask(P.In.loading),
                $.post(P.Url.preUpdateLanguage, $.postify({
                    param: a
                }), function(t) {
                    window.location.href = P.Url.updateLanguage + "?languageCode=" + e.val()
                })
            }
        }),
        $("#oddsFormatSelect").change(function(t) {
            var e = $(t.currentTarget ? t.currentTarget : t.target);
            void 0 != e.attr("prevVal") && e.attr("prevVal") == e.val() || ($("#appbody").mask(P.In.loading),
            $.post(P.Url.updateOddsFormat, {
                oddsFormatCode: e.val()
            }, function(t) {
                var e = $("#oddsFormatSelect").val();
                try {
                    $(".displayOdds").each(function(t, a) {
                        $elem = $(a);
                        var l = $.decode($elem.attr("cfg"));
                        "A" == e ? $elem.html(P.TcktUtils.ToDisplayAmerican(l.a)) : "D" == e ? $elem.html(P.TcktUtils.ToDisplayDecimal(l.a)) : $elem.html(P.TcktUtils.ToDisplayFractional(l.a))
                    }),
                    $("td.col_odds").each(function(t, a) {
                        $elem = $(a);
                        var l = $.decode($elem.attr("cfg"));
                        "A" == e ? $elem.html(P.TcktUtils.ToDisplayAmerican(l.a)) : "D" == e ? $elem.html(P.TcktUtils.ToDisplayDecimal(l.a)) : $elem.html(P.TcktUtils.ToDisplayFractional(l.a)),
                        $risk = $($elem.parents("tr.itemlist").find("input.risk"));
                        var i = $.decode($risk.attr("cfg"));
                        if ($win = $($elem.parents("tr.itemlist").find("input.win")),
                        $win.length > 0) {
                            var n = $risk.val();
                            $win.val(P.TcktUtils.CalculateWin(n, l)),
                            P.TcktHndlr.UpdateRiskAndWinAmount(i, n, $win.val())
                        }
                    }),
                    $("select.pointbuys option").each(function(t, a) {
                        $elem = $(a);
                        var l = $.decode($elem.attr("cfg"));
                        "A" == e ? $elem.html(l.dh + " (" + P.TcktUtils.ToDisplayAmerican(l.a) + ")") : "D" == e ? $elem.html(l.dh + " (" + P.TcktUtils.ToDisplayDecimal(l.a) + ")") : $elem.html(l.dh + " (" + P.TcktUtils.ToDisplayFractional(l.a) + ")"),
                        $risk = $($elem.parents("tr.itemlist").find("input.risk"));
                        var i = $.decode($risk.attr("cfg"));
                        if ($win = $($elem.parents("tr.itemlist").find("input.win")),
                        $win.length > 0) {
                            var n = $risk.val();
                            $win.val(P.TcktUtils.CalculateWin(n, l)),
                            P.TcktHndlr.UpdateRiskAndWinAmount(i, n, $win.val())
                        }
                    })
                } catch (t) {}
                $("#appbody").unmask()
            }))
        }),
        P.Nfo.AttachTooltipHandler($("#contentHeader"))
    }
};
P.Tckt = {
    init: function() {
        $(window).scroll(function(t) {
            var e = 0
              , i = $("#more-info-bar");
            "block" == i.css("display") && (e = i.height());
            var s = $(window).height() - 93
              , n = $("div.balance_top_wrap").height()
              , r = $("div #hdiv").height() + e
              , a = ($("div #footer").height(),
            n + r + 5)
              , c = $("#right");
            c.removeClass("betSlipFloat");
            var l = $(".window-content");
            if ($(window).width() > 1200) {
                var h = $(this).scrollTop();
                if (h >= a + 10) {
                    var o = $(document).height();
                    h + $("#right").height() + Number($("#MainBjDiv").height()) + Number($("#miniLiveBetting").height()) + 4 <= o - $("div #footer").height() && (c.addClass("betSlipFloat"),
                    l.css("max-height", s))
                } else
                    c.removeClass("betSlipFloat"),
                    l.css("max-height", s - n - r)
            } else
                c.removeClass("betSlipFloat"),
                l.css("max-height", s - n - r)
        })
    },
    InitBasketTckt: function() {
        P.Bskt.Tckt = {
            seq: 0,
            shwCnfrm: !0,
            isscs: !0,
            isbet: !1,
            tcktno: 0,
            risk: 0,
            win: 0,
            freePlyCrdt: !1,
            freeplaybal: 0,
            wgrGrps: new Array,
            instantAction: ""
        },
        P.Bskt.TcktConf = {}
    },
    GetFreePlayBalance: function() {},
    Add: function(t, e) {
        var i = P.Bskt.Tckt
          , s = P.TcktUtils
          , n = P.TcktHlpr
          , r = P.Stngs.btStngs
          , a = P.Stngs.tsrStngs;
        Object(!0);
        i.isbet && (this.InitBasketTckt(),
        i = P.Bskt.Tckt);
        var c = 0 == P.Bskt.Tckt.wgrGrps.length
          , l = c ? "upselmain" : "normal";
        if (!n.IsDuplicateSelection(t, e, i)) {
            var h = s.NewTcktWgrGrp(t, e, l, !0);
            this.InternalAdd(h),
            c && n.CreateUpSelWagers(t, r, a, e),
            n.ConfigureTicket(i, r, a),
            P.TcktHndlr.SyncTicket()
        }
    },
    InternalAdd: function(t) {
        P.Bskt.Tckt.wgrGrps.push(t)
    }
};
P.Tckt = {
    init: function() {
        $(window).scroll(function(t) {
            var e = 0
              , i = $("#more-info-bar");
            "block" == i.css("display") && (e = i.height());
            var s = $(window).height() - 93
              , n = $("div.balance_top_wrap").height()
              , r = $("div #hdiv").height() + e
              , a = ($("div #footer").height(),
            n + r + 5)
              , c = $("#right");
            c.removeClass("betSlipFloat");
            var l = $(".window-content");
            if ($(window).width() > 1200) {
                var h = $(this).scrollTop();
                if (h >= a + 10) {
                    var o = $(document).height();
                    h + $("#right").height() + Number($("#MainBjDiv").height()) + Number($("#miniLiveBetting").height()) + 4 <= o - $("div #footer").height() && (c.addClass("betSlipFloat"),
                    l.css("max-height", s))
                } else
                    c.removeClass("betSlipFloat"),
                    l.css("max-height", s - n - r)
            } else
                c.removeClass("betSlipFloat"),
                l.css("max-height", s - n - r)
        })
    },
    InitBasketTckt: function() {
        P.Bskt.Tckt = {
            seq: 0,
            shwCnfrm: !0,
            isscs: !0,
            isbet: !1,
            tcktno: 0,
            risk: 0,
            win: 0,
            freePlyCrdt: !1,
            freeplaybal: 0,
            wgrGrps: new Array,
            instantAction: ""
        },
        P.Bskt.TcktConf = {}
    },
    GetFreePlayBalance: function() {},
    Add: function(t, e) {
        var i = P.Bskt.Tckt
          , s = P.TcktUtils
          , n = P.TcktHlpr
          , r = P.Stngs.btStngs
          , a = P.Stngs.tsrStngs;
        Object(!0);
        i.isbet && (this.InitBasketTckt(),
        i = P.Bskt.Tckt);
        var c = 0 == P.Bskt.Tckt.wgrGrps.length
          , l = c ? "upselmain" : "normal";
        if (!n.IsDuplicateSelection(t, e, i)) {
            var h = s.NewTcktWgrGrp(t, e, l, !0);
            this.InternalAdd(h),
            c && n.CreateUpSelWagers(t, r, a, e),
            n.ConfigureTicket(i, r, a),
            P.TcktHndlr.SyncTicket()
        }
    },
    InternalAdd: function(t) {
        P.Bskt.Tckt.wgrGrps.push(t)
    }
};
function pushEventPlacedInDataLayer(a, t) {
    window.dataLayer = window.dataLayer || [],
    window.dataLayer.push({
        event: "bet_placed",
        bet_amount: t,
        transaction_id: `${a}`,
        currency: "USD",
        product: "sports"
    })
}
function updateCustomerBalance() {
    $.getJSON(P.Url.UpdateCustomerBalance, null, function(t) {
        null == t.redirect_url && (self == parent ? ($("#CurrentBalance").html(formatCurrency(t.AvailableBalance)),
        $("#PendingWagerBalance").html(formatCurrency(t.PendingWagerBalance)),
        $("#FreePlayBalance").html(formatCurrency(t.FreePlayBalance)),
        null != $("#messageCount") && null != $("#messageCount") && $("#messageCount").html(t.NewMessageCount),
        0 == t.NewMessageCount ? $("#mailIcon").hide() : $("#mailIcon").show()) : parent.updateBalance())
    })
}
function HandleAjaxRedirect(t) {
    null != t.redirect_url && (window.location = t.redirect_url)
}
function UnHightLightById(e) {
    var t;
    hightligthPicksEnabled && ((t = $("#contentArea input").filter(function() {
        return this.value == e
    })).parent().next().next().removeClass("highlightBackground"),
    t.parent().next().removeClass("highlightBackground"),
    t.parent().removeClass("highlightBackground"),
    "S" == e.split("|")[7] || "straight" == e.split("|")[7] || "E" == e.split("|")[7] ? t.parent().next().next().next().removeClass("highlightBackground") : "L" == e.split("|")[7] ? (t.parent().next().next().next().removeClass("highlightBackground"),
    t.parent().next().next().next().next().removeClass("highlightBackground")) : "C" != e.split("|")[7] && "CT" != e.split("|")[7] && "CS" != e.split("|")[7] || t.parent().prev().removeClass("highlightBackground"),
    currentSelectedPicks = currentSelectedPicks.filter(function(t) {
        return t != e
    }))
}
function CreateSelId(t) {
    var e = "no object";
    return null != t && (e = t.gt + "|" + t.lv1 + "|" + t.lv2 + "|" + t.prd + "|" + t.str + "|" + t.prf + "|" + t.gnum + "|" + t.mkt + "|" + t.selTyp + "|" + t.tmId),
    e
}
function checkIfExist(t) {
    for (var e = 0; currentSelectedPicks.length > e; e++)
        if (currentSelectedPicks[e] === t)
            return !0;
    return !1
}
P.TcktHndlr = {
    freePlayBalance: 0,
    init: function() {
        $(document).ready(function() {
            $("#balance-refresh").click(function() {
                $("#balance-refresh").attr("disabled", "disabled"),
                $("#balance-refresh").html("Loading..."),
                updateCustomerBalance(),
                $("#balance-refresh").removeAttr("disabled"),
                $("#balance-refresh").html("Refresh Balance")
            })
        })
    },
    AttachSlipHandler: function(w) {
        var m = this
          , k = P.TcktUtils;
        P.TcktHlpr;
        w.find(".wagerselection").click(function(t) {
            var e, r = $(t.currentTarget ? t.currentTarget : t.target), i = $.decode(r.attr("cfg")), n = P.Bskt.Tckt, s = !1, a = r.attr("checked");
            if (a)
                for (var l = 0; l < n.wgrGrps.length; l++) {
                    if ((d = n.wgrGrps[l]).intId == i.wgrGrpIntId) {
                        d.nbl = !0;
                        for (var g = 0; g < d.wgrs.length; g++)
                            d.wgrs[g].nbl = !0
                    }
                }
            else
                for (var d, l = 0; l < n.wgrGrps.length; l++) {
                    if ((d = n.wgrGrps[l]).intId == i.wgrGrpIntId) {
                        d.nbl = !1;
                        for (g = 0; g < d.wgrs.length; g++)
                            d.wgrs[g].nbl = !1,
                            e = d.wgrs[g];
                        1 < d.wgrs.length && (s = !0,
                        e = d.wgrs)
                    }
                }
            k.RenderNoOfWager(),
            m.RePaintSlip(w);
            var c = !1;
            if ($.each($(".betslip tbody"), function(t, e) {
                30 <= $(this).height() && (c = !0)
            }),
            hightligthPicksEnabled && !c && !a)
                if (s)
                    for (g = 0; g < e.length; g++)
                        UnHightLightById(CreateSelId(e[g].wgrItms[0].selObj));
                else
                    for (var g = 0; g < e.wgrItms.length; g++)
                        UnHightLightById(CreateSelId(e.wgrItms[g].selObj))
        }),
        w.find("#slipRemoveAll").click(function(t) {
            $(t.currentTarget ? t.currentTarget : t.target).hasClass("disabled") || (P.Tckt.InitBasketTckt(),
            m.SyncTicket(),
            $(t.currentTarget ? t.currentTarget : t.target),
            $("#ticket").click(),
            $("#noofsel").hide(),
            $(".bdevtt2").removeClass("highlightBackground"),
            $(".hdcp").removeClass("highlightBackground"),
            $(".odds").removeClass("highlightBackground"),
            $(".info").removeClass("highlightBackground"),
            $(".mktdesc").removeClass("highlightBackground"),
            $(".smlhdcp").removeClass("highlightBackground"),
            $(".bdevtt").removeClass("highlightBackground"),
            $(".checkboxes").removeClass("highlightBackground")),
            $("button").addClass("disabled")
        });
        function v(t, e, r) {
            for (var i = 0; i < r.wgrGrps.length; i++) {
                var n = r.wgrGrps[i];
                if (n.wgrType != e && 1 == n.nbl)
                    for (var s = 0; s < n.wgrs.length; s++)
                        for (var a = n.wgrs[s], l = 0; l < a.wgrItms.length; l++) {
                            if (t == a.wgrItms[l].selId)
                                return P.TcktHndlr.AddOrRemoveHighlight(t),
                                1
                        }
            }
        }
        w.find(".cross").click(function(t) {
            for (var e = P.Bskt.Tckt, r = $(t.currentTarget ? t.currentTarget : t.target), i = $.decode(r.attr("cfg")), n = 0; n < e.wgrGrps.length; n++) {
                var s = e.wgrGrps[n];
                if (s.intId == i.wgrGrpIntId) {
                    for (var a = 0; a < s.wgrs.length; a++) {
                        var l = s.wgrs[a];
                        if (l.intId == i.wgrIntId) {
                            for (var g, d, c, o, h = 0; h < l.wgrItms.length; h++) {
                                var p, f, u = l.wgrItms[h];
                                u.intId == i.wgrItmIntId && (null == u.selId ? UnHightLightById(p = CreateSelId(u.selObj)) : UnHightLightById(p = u.selId),
                                f = l.wgrType,
                                l.wgrItms.splice(h, 1),
                                v(p, f, e))
                            }
                            l.wgrItms.length <= 0 ? s.wgrs.splice(a, 1) : "parlay" == s.wgrType ? (f = l.wgrType,
                            l.wgrItms.length < 2 && (UnHightLightById(p = CreateSelId(l.wgrItms[0].selObj)),
                            s.wgrs.splice(a, 1),
                            v(p, f, e)),
                            s.configured = !1) : "ifBet" == s.wgrType ? (p = l.wgrItms[a].selId,
                            f = l.wgrType,
                            l.wgrItms.length < 2 ? (UnHightLightById(p = CreateSelId(l.wgrItms[0].selObj)),
                            s.wgrs.splice(a, 1),
                            v(p, f, e)) : (o = {
                                ifBets: P.TcktHlpr.ConfigureIfBet()
                            },
                            l.wagerselectionchoice = o.ifBets[a].cd,
                            l.wagerselectionchoicename = o.ifBets[a].nm),
                            s.configured = !1) : "roundRobin" == s.wgrType ? (p = l.wgrItms[a].selId,
                            f = l.wgrType,
                            l.wgrItms.length < 3 ? (UnHightLightById(p = CreateSelId(l.wgrItms[0].selObj)),
                            s.wgrs.splice(a, 1),
                            v(p, f, e)) : (s.configured = !1,
                            o = {
                                rndRbns: P.TcktHlpr.ConfigureRoundRobin(l.wgrItms.length)
                            },
                            l.wagerselectionchoice = o.rndRbns[a].cd,
                            l.wagerselectionchoicename = o.rndRbns[a].nm,
                            l.rrcomb = o.rndRbns[a].comb)) : "reverse" == s.wgrType ? (p = l.wgrItms[a].selId,
                            f = l.wgrType,
                            l.wgrItms.length < 2 && (p = CreateSelId(l.wgrItms[0].selObj),
                            s.wgrs.splice(a, 1),
                            v(p, f, e)),
                            UnHightLightById(p),
                            s.configured = !1) : "birdCage" == s.wgrType ? (l.wgrItms.length < 3 && (P.Bskt.Tckt.wgrGrps[n].wgrType = "reverse",
                            P.Bskt.Tckt.wgrGrps[n].wgrs[a].wgrType = "reverse"),
                            s.configured = !1) : "teaser" == s.wgrType && (p = l.wgrItms[a].selId,
                            f = l.wgrType,
                            g = P.Stngs.btStngs,
                            d = P.Stngs.tsrStngs,
                            (c = P.WgrTypRls).IsPassNonStraightRules.event(l) && c.IsPassNonStraightRules.market(l) && c.IsPassNonStraightRules.twinOffer(l) && c.Teaser.IsPassTeaserRules(l, g, d) ? (o = {
                                tsrs: P.WgrTypRls.Teaser.FindEligibleTeasers(s.wgrs[a], g, d)
                            },
                            s.configured = !1,
                            l.wagerselectionchoice = o.tsrs[a].cd,
                            l.wagerselectionchoicename = o.tsrs[a].nm,
                            P.TcktHndlr.UpdateWagerItemTeaserPoint(l)) : (s.wgrs.splice(a, 1),
                            UnHightLightById(p = CreateSelId(l.wgrItms[0].selObj)),
                            v(p, f, e)))
                        }
                    }
                    s.wgrs.length <= 0 && e.wgrGrps.splice(n, 1)
                }
            }
            P.TcktHlpr.ConfigureTicket(e, P.Stngs.btStngs, P.Stngs.tsrStngs),
            e.wgrGrps.length <= 0 ? w.find("#slipRemoveAll").click() : (k.RenderNoOfWager(),
            m.RePaintSlipWheDelItem(w),
            m.RePaintSlip(w))
        }),
        w.find(".slip_up").click(function(t) {
            for (var e = P.Bskt.Tckt, r = $(t.currentTarget ? t.currentTarget : t.target), i = $.decode(r.attr("cfg")), n = !1, s = 0; s < e.wgrGrps.length; s++) {
                var a = e.wgrGrps[s];
                if (a.intId == i.wgrGrpIntId)
                    for (var l = 0; l < a.wgrs.length; l++) {
                        var g = a.wgrs[l];
                        if (g.intId == i.wgrIntId)
                            for (var d = 0; d < g.wgrItms.length; d++) {
                                var c = g.wgrItms[d];
                                if (c.intId == i.wgrItmIntId && 0 != d) {
                                    var o = g.wgrItms[d - 1];
                                    g.wgrItms[d] = o,
                                    g.wgrItms[d - 1] = c,
                                    n = !0;
                                    break
                                }
                            }
                    }
            }
            n && m.RePaintSlip(w)
        }),
        w.find(".slip_down").click(function(t) {
            for (var e = P.Bskt.Tckt, r = $(t.currentTarget ? t.currentTarget : t.target), i = $.decode(r.attr("cfg")), n = !1, s = 0; s < e.wgrGrps.length; s++) {
                var a = e.wgrGrps[s];
                if (a.intId == i.wgrGrpIntId)
                    for (var l = 0; l < a.wgrs.length; l++) {
                        var g = a.wgrs[l];
                        if (g.intId == i.wgrIntId)
                            for (var d = 0; d < g.wgrItms.length; d++) {
                                var c = g.wgrItms[d];
                                if (c.intId == i.wgrItmIntId && d != g.wgrItms.length - 1) {
                                    var o = g.wgrItms[d + 1];
                                    g.wgrItms[d + 1] = c,
                                    g.wgrItms[d] = o,
                                    n = !0;
                                    break
                                }
                            }
                    }
            }
            n && m.RePaintSlip(w)
        }),
        w.find(".wgrGrpCross").click(function(t) {
            for (var e = P.Bskt.Tckt, r = $(t.currentTarget ? t.currentTarget : t.target), i = $.decode(r.attr("cfg")), n = 0; n < e.wgrGrps.length; n++) {
                e.wgrGrps[n].intId == i.wgrGrpIntId && e.wgrGrps.splice(n, 1)
            }
            e.wgrGrps.length <= 0 ? w.find("#slipRemoveAll").click() : (k.RenderNoOfWager(),
            m.RePaintSlip(w))
        }),
        w.find(".pointbuys").change(function(t) {
            P.Bskt.Tckt;
            var e = $(t.currentTarget ? t.currentTarget : t.target)
              , r = $.decode(e.attr("cfg"))
              , i = e.val();
            m.ValidateFreePlay(r, i, e);
            for (var n = e.children(), s = 0; s < n.length; s++) {
                var a, l, g, d, c, o, h = $(n[s]);
                i == h.attr("value") && (a = $.decode(h.attr("cfg")),
                l = $(e.parents("tr.itemlist").find("td.col_odds")),
                g = $("#oddsFormatSelect").val(),
                d = "{d:" + a.d + ",a:" + a.a + "}",
                m.UpdatePointBuy(r, a),
                l.attr("cfg", d),
                "A" == g ? l.html(P.TcktUtils.ToDisplayAmerican(a.a)) : "D" == g ? l.html(P.TcktUtils.ToDisplayDecimal(a.a)) : l.html(P.TcktUtils.ToDisplayFractional(a.a)),
                c = $(e.parents("tr.itemlist")).attr("id"),
                $risk = $(e.parents("tr.itemlist").siblings("#" + c).find("input.risk")),
                o = $.decode($risk.attr("cfg")),
                $win = $(e.parents("tr.itemlist").siblings("#" + c).find("input.win")),
                0 < $win.length && (i = $risk.val(),
                $win.val(P.TcktUtils.CalculateWin(i, a)),
                P.TcktHndlr.UpdateRiskAndWinAmount(o, i, $win.val())))
            }
        }),
        w.find(".wgrAmt").blur(function(t) {
            P.Bskt.Tckt;
            var e = $(t.currentTarget ? t.currentTarget : t.target);
            if (null == e.attr("prevval") || null == e.attr("prevval") || e.attr("prevval") != e.val()) {
                var r = e.val();
                try {
                    if (r = Number(r).toFixed(2),
                    isNaN(r))
                        return;
                    e.val(r)
                } catch (t) {}
                e.attr("prevval", e.val());
                var i = $.decode(e.attr("cfg"));
                m.UpdateWagerAmt(i, e.val())
            }
        }),
        w.find(".risk").keyup(function(t) {
            m.RiskEventFired(t, !0)
        }),
        w.find(".risk").blur(function(t) {
            m.RiskEventFired(t, !1)
        }),
        w.find(".win").keyup(function(t) {
            m.WinEventFired(t, !0)
        }),
        w.find(".win").blur(function(t) {
            m.WinEventFired(t, !1)
        }),
        w.find("select.wagerselectionchoice").change(function(t) {
            P.Bskt.Tckt;
            var e = $(t.currentTarget ? t.currentTarget : t.target)
              , r = $.decode(e.attr("cfg"))
              , i = e.val()
              , n = $(e.children('option[value="' + i + '"]'));
            m.UpdateWagerSelectionChoice(r, n, i)
        }),
        w.find(".pchrs").change(function(t) {
            P.Bskt.Tckt;
            var e = $(t.currentTarget ? t.currentTarget : t.target)
              , r = $.decode(e.attr("cfg"))
              , i = e.val()
              , n = $.decode($(e.children("option[value='" + i + "']")).attr("cfg"));
            m.UpdatePchrsChoice(r, n)
        }),
        w.find("#showconfirmation").click(function(t) {
            var e = P.Bskt.Tckt;
            $(t.currentTarget ? t.currentTarget : t.target).attr("checked") ? e.shwCnfrm = !0 : e.shwCnfrm = !1
        }),
        w.find("#freePlyCrdt").click(function(t) {
            P.Bskt.Tckt;
            for (var e = $(t.currentTarget ? t.currentTarget : t.target), r = $.decode(e.attr("cfg")), i = [], n = 0; n < P.Bskt.Tckt.wgrGrps.length; n++) {
                if ((s = P.Bskt.Tckt.wgrGrps[n]).intId == r.wgrGrpIntId) {
                    i.push(s);
                    break
                }
            }
            if (null != i[0] && "straight" == i[0].wgrType)
                for (var s, n = 0; n < i[0].wgrs.length; n++) {
                    (s = i[0].wgrs[n]).intId == r.wgrIntId && (s.freeplayActive ? s.freeplayActive = !1 : s.freeplayActive = !0)
                }
        }),
        w.find("#slipSubmit").click(function(t) {
            var e = P.Bskt.Tckt;
            $(t.currentTarget ? t.currentTarget : t.target).hasClass("disabled") || (m.IsValidTicket(e, w) ? e.shwCnfrm ? m.ConfirmBet(w) : m.PlaceBet(w) : m.RePaintSlip(w))
        }),
        w.find(".riskMaxLimitLink").click(function(t) {
            w.find("div.errormsgs").remove();
            var e = $(t.currentTarget ? t.currentTarget : t.target)
              , r = $.decode(e.attr("cfg"))
              , i = t.currentTarget ? t.currentTarget.id : t.target.id
              , n = m.FilterTicketByWitemID(r);
            m.RiskMaxLimit(w, n, i)
        }),
        w.find("#slipSave").click(function(t) {
            $(t.currentTarget ? t.currentTarget : t.target).hasClass("disabled") || (P.Bskt.Tckt.errmsgs = null,
            m.SyncTicket())
        }),
        w.find("#slipCancel").click(function(t) {
            P.Bskt.Tckt.instantAction = "";
            $(t.currentTarget ? t.currentTarget : t.target);
            P.Bskt.Tckt.confirm = !1,
            m.RePaintSlip(w),
            m.ShowInitialSlipState(w)
        }),
        w.find("#slipConfirmBet").click(function(t) {
            P.Bskt.Tckt,
            $(t.currentTarget ? t.currentTarget : t.target);
            m.PlaceBet(w)
        }),
        w.find("#slipPrint").click(function(t) {
            P.Bskt.Tckt,
            $(t.currentTarget ? t.currentTarget : t.target),
            window.open(P.Url.PrintTicket, "", "width=600,height=600,scrollbars=yes,location=no,menubar=no,status=no,toolbar=no,resizable=no")
        }),
        w.find("#slipClose").click(function(t) {
            P.Tckt.InitBasketTckt(),
            m.SyncTicket(),
            $(t.currentTarget ? t.currentTarget : t.target).parents("div.window-container").find("div.window-closeButton").click(),
            $("#ticket").click(),
            $("#noofsel").hide(),
            $(".bdevtt2").removeClass("highlightBackground"),
            $(".hdcp").removeClass("highlightBackground"),
            $(".odds").removeClass("highlightBackground"),
            $(".info").removeClass("highlightBackground"),
            $(".mktdesc").removeClass("highlightBackground"),
            $(".smlhdcp").removeClass("highlightBackground"),
            $(".bdevtt").removeClass("highlightBackground"),
            $(".checkboxes").removeClass("highlightBackground")
        }),
        P.Nfo.AttachTooltipHandler(w)
    },
    RiskEventFired: function(t, e) {
        var r = P.TcktUtils
          , i = (P.TcktHlpr,
        P.Bskt.Tckt,
        $(t.currentTarget ? t.currentTarget : t.target));
        if (!e || null == i.attr("prevval") || null == i.attr("prevval") || i.attr("prevval") != i.val()) {
            var n = i.val();
            try {
                if (n = Number(n).toFixed(2),
                isNaN(n))
                    return void (e || i.val(""));
                e || i.val(n)
            } catch (t) {}
            i.attr("prevval", i.val());
            var s, a, l, g = $.decode(i.attr("cfg")), d = $(i.parents("td.col_wager_amt").find("input.win"));
            0 < d.length ? (s = $(i.parents("tr.itemlist")).attr("id"),
            a = i.parents("tr.itemlist").siblings("#" + s).find("td.col_odds"),
            l = $.decode(a.attr("cfg")),
            d.val(r.CalculateWin(n, l)),
            d.attr("prevval", d.val()),
            this.UpdateWagerAmt(g, null, n, d.val())) : this.UpdateWagerAmt(g, null, n)
        }
    },
    WinEventFired: function(t, e) {
        var r = P.TcktUtils
          , i = (P.TcktHlpr,
        P.Bskt.Tckt,
        $(t.currentTarget ? t.currentTarget : t.target));
        if (!e || null == i.attr("prevval") || null == i.attr("prevval") || i.attr("prevval") != i.val()) {
            var n = i.val();
            try {
                if (n = Number(n).toFixed(2),
                isNaN(n))
                    return void (e || i.val(""));
                e || i.val(n)
            } catch (t) {}
            i.attr("prevval", i.val());
            var s = $.decode(i.attr("cfg"))
              , a = $(i.parents("td.col_wager_amt").find("input.risk"))
              , l = $(i.parents("tr.itemlist")).attr("id")
              , g = i.parents("tr.itemlist").siblings("#" + l).find("td.col_odds")
              , d = $.decode(g.attr("cfg"));
            a.val(r.CalculateRisk(n, d)),
            a.attr("prevval", a.val()),
            this.UpdateWagerAmt(s, null, a.val(), n)
        }
    },
    ShowInitialSlipState: function(t) {
        P.Bskt.Tckt.isbet ? this.ShowPrintState(t) : (t.find("#slipConfirmBet").addClass("hidden"),
        t.find("#slipCancel").addClass("hidden"),
        t.find("#slipPrint").addClass("hidden"),
        t.find("#slipClose").addClass("hidden"),
        t.find("#slipRemoveAll").removeClass("hidden"),
        t.find("#slipSubmit").removeClass("hidden"),
        t.find("#slipSave").removeClass("hidden"),
        t.find("input").attr("disabled", !1),
        t.find("select").attr("disabled", !1),
        t.find("div.wgrGrpCross").removeClass("hidden"),
        t.find("div.cross").removeClass("hidden"),
        t.find("div.slip_up").removeClass("hidden"),
        t.find("div.slip_down").removeClass("hidden"),
        t.find("div.help").removeClass("hidden"))
    },
    ShowConfirmationSlipState: function(t) {
        for (var e, r = P.Bskt.Tckt.wgrGrps, i = 0; i < r.length; i++) {
            0 == r[i].nbl && (e = "tr#wgrGrp_" + r[i].intId + "_tr",
            t.find(e).addClass("hidden"))
        }
        t.find("#slipRemoveAll").addClass("hidden"),
        t.find("#slipSubmit").addClass("hidden"),
        t.find("#slipSave").addClass("hidden"),
        t.find("#slipPrint").addClass("hidden"),
        t.find("#slipCancel").addClass("hidden"),
        t.find("#slipConfirmBet").removeClass("hidden"),
        t.find("#slipCancel").removeClass("hidden"),
        t.find("input").attr("disabled", !0),
        t.find("select").attr("disabled", !0),
        t.find("div.wgrGrpCross").addClass("hidden"),
        t.find("div.cross").addClass("hidden"),
        t.find("div.slip_up").addClass("hidden"),
        t.find("div.slip_down").addClass("hidden"),
        t.find("div.help").addClass("hidden")
    },
    ShowPrintState: function(t) {
        P.Cr.pingBack();
        for (var e, r = P.Bskt.Tckt.wgrGrps, i = 0; i < r.length; i++) {
            0 == r[i].nbl && (e = "tr#wgrGrp_" + r[i].intId + "_tr",
            t.find(e).addClass("hidden"))
        }
        t.find("#slipRemoveAll").addClass("hidden"),
        t.find("#slipSubmit").addClass("hidden"),
        t.find("#slipSave").addClass("hidden"),
        t.find("#slipConfirmBet").addClass("hidden"),
        t.find("#slipCancel").addClass("hidden"),
        t.find("#slipPrint").removeClass("hidden"),
        t.find("#slipClose").removeClass("hidden"),
        t.find("input").attr("disabled", !0),
        t.find("select").attr("disabled", !0),
        t.find("div.wgrGrpCross").addClass("hidden"),
        t.find("div.cross").addClass("hidden"),
        t.find("div.slip_up").addClass("hidden"),
        t.find("div.slip_down").addClass("hidden"),
        t.find("div.help").addClass("hidden")
    },
    SyncTicket: function(t) {
        P.Cr.pingBack(),
        P.Bskt.Tckt.notsync || P.Bskt.Tckt.isbet || null != P.Bskt.Tckt.errmsgs && null != P.Bskt.Tckt.errmsgs && 0 < P.Bskt.Tckt.errmsgs.length || (null == t ? $("body").doubleheightmask(P.In.msg_saving_state) : $("body").doubleheightmask(t),
        $.post(P.Url.SyncTicket, {
            jsonStr: JSON2.stringify(P.Bskt.Tckt)
        }, function(t) {
            HandleAjaxRedirect(t),
            P.Bskt.Tckt.freeplaybal = t.freeplaybal,
            $("td.freePlay").show(),
            $("td.freePlay font.currnumber").html("$" + t.freeplaybal.toFixed(2) + " "),
            P.TcktHndlr.freePlayBalance = t.freeplaybal.toFixed(2),
            $("body").unmask();
            var e = $(window.$windowContainer).children(".window-content")
              , r = e.find("#betslipDiv");
            0 != r.height() && e.scrollTop(r.height())
        }, "json"))
    },
    ConfirmBet: function(e) {
        P.Cr.pingBack(),
        $("body").doubleheightmask(P.In.msg_confirm_bet);
        var t = JSON2.stringify(P.Bskt.Tckt)
          , r = this
          , i = {
            jsonStr: t
        };
        $.post(P.Url.ConfirmBet, i, function(t) {
            HandleAjaxRedirect(t),
            (P.Bskt.Tckt = t).isscs ? (P.Bskt.Tckt.confirm = !0,
            r.RePaintSlip(e),
            r.ShowConfirmationSlipState(e),
            r.RePaintMiniBlackjack(),
            r.RePaintMiniLiveBetting()) : (r.ReconfigureTicketOnError(P.Bskt.Tckt),
            r.RePaintSlip(e)),
            $("body").unmask()
        }, "json")
    },
    RiskMaxLimit: function(t, e, d) {
        var c = P.TcktUtils;
        P.Cr.pingBack(),
        $("body").doubleheightmask(P.In.msg_get_limit_byWitem),
        this.ResetErrMsgs(P.Bskt.Tckt);
        var r = JSON2.stringify(P.Bskt.Tckt)
          , o = this
          , h = d.split("-")[0];
        $.post(P.Url.RiskMaxLimitUrl, {
            jsonStr: r,
            wagerType: h,
            selectionId: e
        }, function(t) {
            HandleAjaxRedirect(t);
            var e, r, i, n, s, a, l = t.riskMaxLimit.toFixed(2), g = $("#" + d);
            "parlay" == h || "roundRobin" == h || "birdCage" == h ? ((r = g.parent().parent().find("input.risk")).val(l),
            r.attr("prevval", l),
            e = $.decode(r.attr("cfg")),
            o.UpdateWagerAmt(e, r.val(), r.val(), l)) : "teaser" == h || "reverse" == h ? ((r = g.parent().parent().find("input.wgrAmt")).val(l),
            r.attr("prevval", l),
            e = $.decode(r.attr("cfg")),
            o.UpdateWagerAmt(e, r.val(), r.val(), l)) : (r = g.parent().parent().find("input.risk"),
            i = g.parent().parent().find("input.win"),
            n = r.parents("tr.itemlist").attr("id"),
            s = r.parents("tr.itemlist").siblings("#" + n).find("td.col_odds"),
            0 <= (a = $.decode(s.attr("cfg"))).a ? (r.val(l),
            i.val(c.CalculateWin(l, a))) : (i.val(l),
            r.val(c.CalculateRisk(l, a))),
            i.attr("prevval", i.val()),
            r.attr("prevval", r.val()),
            o.UpdateWagerAmt($.decode(r.attr("cfg")), null, r.val(), i.val())),
            $("body").unmask()
        }, "json")
    },
    PlaceBet: function(e) {
        P.Cr.pingBack(),
        $("body").doubleheightmask(P.In.msg_place_bet);
        var t = JSON2.stringify(P.Bskt.Tckt)
          , r = this
          , i = P.Stngs.btStngs
          , n = {
            jsonStr: t
        };
        0 < i.cnfrmtnDly ? $.idle(function() {
            $.post(P.Url.PlaceBet, n, function(t) {
                HandleAjaxRedirect(t),
                (P.Bskt.Tckt = t).isscs ? (r.RePaintSlip(e),
                pushEventPlacedInDataLayer(P.Bskt.Tckt.tcktno, P.Bskt.Tckt.risk),
                r.ShowPrintState(e),
                P.TcktUtils.RenderNoOfWager(),
                r.ShowRebetMessage(t.isrebet, t.isLimitReached)) : (r.ReconfigureTicketOnError(P.Bskt.Tckt),
                r.RePaintSlip(e)),
                r.RePaintMiniBlackjack(),
                r.RePaintMiniLiveBetting(),
                updateCustomerBalance(),
                $("body").unmask()
            }, "json")
        }, 1e3 * i.cnfrmtnDly) : $.post(P.Url.PlaceBet, n, function(t) {
            HandleAjaxRedirect(t),
            (P.Bskt.Tckt = t).isscs ? (r.RePaintSlip(e),
            pushEventPlacedInDataLayer(P.Bskt.Tckt.tcktno, P.Bskt.Tckt.risk),
            r.ShowPrintState(e),
            P.TcktUtils.RenderNoOfWager(),
            r.ShowRebetMessage(t.isrebet, t.isLimitReached)) : (r.ReconfigureTicketOnError(P.Bskt.Tckt),
            r.RePaintSlip(e)),
            r.RePaintMiniBlackjack(),
            r.RePaintMiniLiveBetting(),
            updateCustomerBalance(),
            $("body").unmask()
        }, "json")
    },
    ReconfigureTicketOnError: function(t, e) {
        P.TcktHlpr.ResetConfigureTicket(t),
        P.TcktHlpr.ConfigureTicket(t, P.Stngs.btStngs, P.Stngs.tsrStngs),
        "true" == t.showPopUpQuickDeposit && $("#popup-bet-msg").css("display", "block")
    },
    IsValidTicket: function(t, e) {
        e.find("div.errormsgs").remove(),
        this.ResetErrMsgs(t);
        for (var r = !0, i = 0; i < t.wgrGrps.length; i++) {
            var n = t.wgrGrps[i];
            if (n.nbl)
                for (var s = 0; s < n.wgrs.length; s++) {
                    var a = n.wgrs[s];
                    if (a.nbl)
                        if ("straight" == a.wgrType)
                            this.IsValidWgrAmt(e, n, a, null, null, a.risk, a.win) || (r = !1);
                        else if ("ifBet" == a.wgrType)
                            for (var l = 0; l < a.wgrItms.length; l++) {
                                var g = a.wgrItms[l];
                                this.IsValidWgrAmt(e, n, a, g, null, g.risk, g.win) || (r = !1)
                            }
                        else
                            "parlay" == a.wgrType || "roundRobin" == a.wgrType || "birdCage" == a.wgrType ? this.IsValidWgrAmt(e, n, a, null, null, a.risk, null) || (r = !1) : "reverse" != a.wgrType && "teaser" != a.wgrType || this.IsValidWgrAmt(e, n, a, null, a.wgrAmt, null, null) || (r = !1)
                }
        }
        return r || (null == t.errmsgs && (t.errmsgs = []),
        t.errmsgs.push(P.In.validation_general_amount_error)),
        r
    },
    IsValidWgrAmt: function(t, e, r, i, n, s, a) {
        var l = /(^\d+$)|(^\d+\.\d{1}$)|(^\d+\.\d{2}$)/
          , g = !0;
        return null != n && (!l.test(n + "") || n <= 0) && (isNaN(n) || !isNaN(n) && Number(n) < 0 ? this.ShowAmountError(e, r, i, t, "NaN") : this.ShowAmountError(e, r, i, t, "NoWager"),
        g = !1),
        null != s && (!l.test(s + "") || s <= 0) && (isNaN(s) || !isNaN(s) && Number(s) < 0 ? this.ShowAmountError(e, r, i, t, "NaN") : this.ShowAmountError(e, r, i, t, "NoWager"),
        g = !1),
        null != a && (!l.test(a + "") || a <= 0) && (isNaN(a) || !isNaN(a) && Number(a) < 0 ? this.ShowAmountError(e, r, i, t, "NaN") : this.ShowAmountError(e, r, i, t, "NoWager"),
        g = !1),
        g
    },
    ResetErrMsgs: function(t) {
        t.errmsgs = [];
        for (var e = 0; e < t.wgrGrps.length; e++) {
            var r = t.wgrGrps[e];
            r.errmsgs = [];
            for (var i = 0; i < r.wgrs.length; i++) {
                var n = r.wgrs[i];
                n.errmsgs = [];
                for (var s = 0; s < n.wgrItms.length; s++)
                    n.wgrItms[s].errmsgs = []
            }
        }
    },
    ShowAmountError: function(t, e, r, i, n) {
        "straight" == t.wgrType ? (null == e.errmsgs && (e.errmsgs = []),
        "NaN" == n ? e.errmsgs.push(P.In.validation_amount_invalid) : e.errmsgs.push(P.In.validation_amount_error)) : "ifBet" == t.wgrType ? (null == r.errmsgs && (r.errmsgs = []),
        "NaN" == n ? r.errmsgs.push(P.In.validation_amount_invalid) : r.errmsgs.push(P.In.validation_amount_error)) : "parlay" != t.wgrType && "roundRobin" != t.wgrType && "birdCage" != t.wgrType && "reverse" != t.wgrType && "teaser" != t.wgrType || (null == t.errmsgs && (t.errmsgs = []),
        "NaN" == n ? t.errmsgs.push(P.In.validation_amount_invalid) : t.errmsgs.push(P.In.validation_amount_error))
    },
    UpdatePchrsChoice: function(t, e) {
        for (var r = P.Bskt.Tckt.wgrGrps, i = 0; i < r.length; i++)
            if (t.wgrGrpIntId == r[i].intId)
                for (var n = 0; n < r[i].wgrs.length; n++)
                    if (t.wgrIntId == r[i].wgrs[n].intId)
                        for (var s = 0; s < r[i].wgrs[n].wgrItms.length; s++) {
                            t.wgrItmIntId == r[i].wgrs[n].wgrItms[s].intId && (r[i].wgrs[n].wgrItms[s].pchrcond = e)
                        }
    },
    UpdateWagerSelectionChoice: function(t, e, r) {
        for (var i = P.Bskt.Tckt.wgrGrps, n = 0; n < i.length; n++)
            if (t.wgrGrpIntId == i[n].intId)
                for (var s, a = 0; a < i[n].wgrs.length; a++) {
                    t.wgrIntId == i[n].wgrs[a].intId && ((s = i[n].wgrs[a]).wagerselectionchoice = r,
                    s.wagerselectionchoicename = e.html(),
                    "roundRobin" == s.wgrType && (s.rrcomb = e.attr("comb")),
                    "teaser" == s.wgrType && (this.UpdateWagerItemTeaserPoint(s),
                    this.RePaintSlip($("div.window-container"))))
                }
    },
    UpdateWagerItemTeaserPoint: function(t) {
        for (var e = t.wagerselectionchoice, r = P.Stngs.tsrStngs.tsr[e], i = 0; i < t.wgrItms.length; i++) {
            var n = t.wgrItms[i]
              , s = n.lv1 + "_" + n.lv2 + "_" + n.selObj.mkt
              , a = r.specs[s];
            "S" == n.selObj.mkt ? (n.h = n.horg + a,
            n.dh = P.TcktUtils.ToDisplayHandicap(n.h, n.selObj.mkt)) : "L" == n.selObj.mkt && ("TTOV" == n.selObj.selTyp ? n.h = n.horg - a : n.h = n.horg + a,
            n.dh = P.TcktUtils.ToDisplayHandicap(n.h, n.selObj.mkt))
        }
    },
    UpdatePointBuy: function(t, e) {
        for (var r = P.Bskt.Tckt.wgrGrps, i = 0; i < r.length; i++)
            if (t.wgrGrpIntId == r[i].intId)
                for (var n = 0; n < r[i].wgrs.length; n++)
                    if (t.wgrIntId == r[i].wgrs[n].intId)
                        for (var s, a = 0; a < r[i].wgrs[n].wgrItms.length; a++) {
                            t.wgrItmIntId == r[i].wgrs[n].wgrItms[a].intId && ((s = r[i].wgrs[n].wgrItms[a]).a = e.a,
                            s.d = e.d,
                            s.h = e.h,
                            s.dh = e.dh)
                        }
    },
    ValidateFreePlay: function(t, e, r) {
        for (var i = P.Bskt.Tckt.wgrGrps, n = 0; n < i.length; n++)
            if (t.wgrGrpIntId == i[n].intId)
                for (var s = 0; s < i[n].wgrs.length; s++)
                    if (t.wgrIntId == i[n].wgrs[s].intId)
                        for (var a = 0; a < i[n].wgrs[s].wgrItms.length; a++)
                            i[n].wgrs[s].wgrItms[a].horg != e ? ($(r.parents("tr.itemlist").parent().find("tr.tr_freePlay_" + t.wgrIntId)).hide(),
                            i[n].wgrs[s].freeplayActive = "false",
                            $(".freePlyCrdt_" + t.wgrIntId).attr("checked", !1)) : $(r.parents("tr.itemlist").parent().find("tr.tr_freePlay_" + t.wgrIntId)).show()
    },
    UpdateRiskAmount: function(t, e) {
        for (var r = P.Bskt.Tckt.wgrGrps, i = 0; i < r.length; i++)
            if (t.wgrGrpIntId == r[i].intId)
                for (var n = 0; n < r[i].wgrs.length; n++)
                    t.wgrIntId == r[i].wgrs[n].intId && (r[i].wgrs[n].risk = Number(e))
    },
    UpdateRiskAndWinAmount: function(t, e, r) {
        for (var i = P.Bskt.Tckt.wgrGrps, n = 0; n < i.length; n++)
            if (t.wgrGrpIntId == i[n].intId)
                for (var s = 0; s < i[n].wgrs.length; s++)
                    t.wgrIntId == i[n].wgrs[s].intId && (i[n].wgrs[s].risk = Number(e),
                    i[n].wgrs[s].win = Number(r))
    },
    UpdateWagerAmt: function(t, e, r, i) {
        for (var n = P.Bskt.Tckt.wgrGrps, s = 0; s < n.length; s++)
            if (t.wgrGrpIntId == n[s].intId)
                for (var a = 0; a < n[s].wgrs.length; a++)
                    if (t.wgrIntId == n[s].wgrs[a].intId)
                        if ("ifBet" == n[s].wgrs[a].wgrType)
                            for (var l = 0; l < n[s].wgrs[a].wgrItms.length; l++)
                                t.wgrItmIntId == n[s].wgrs[a].wgrItms[l].intId && (n[s].wgrs[a].wgrItms[l].risk = Number(r),
                                n[s].wgrs[a].wgrItms[l].win = Number(i));
                        else
                            "parlay" == n[s].wgrs[a].wgrType || "roundRobin" == n[s].wgrs[a].wgrType || "birdCage" == n[s].wgrs[a].wgrType ? n[s].wgrs[a].risk = Number(r) : "reverse" == n[s].wgrs[a].wgrType || "teaser" == n[s].wgrs[a].wgrType ? n[s].wgrs[a].wgrAmt = Number(e) : "straight" == n[s].wgrs[a].wgrType && (n[s].wgrs[a].risk = Number(r),
                            n[s].wgrs[a].win = Number(i))
    },
    RePaintSlip: function(t) {
        P.Bskt.TcktConf,
        P.Stngs.btStngs,
        P.Stngs.tsrStngs,
        currentSelectedPicks;
        gameCounter = 0;
        var r, e = {
            tckt: P.Bskt.Tckt
        }, i = $("#betslipJQoteDiv"), n = i.find("#betslipDiv"), s = t.children(".window-content");
        n.empty(),
        $("#BetslipTemplateScript").jqote(e).appendTo(n),
        $("td.freePlay font.currnumber").html(P.TcktHndlr.freePlayBalance),
        n.find("font.currnumber").format(),
        $("td.freePlay font.currnumber").prepend("$"),
        $("td.freePlay font.currnumber-available").prepend(" "),
        null != i ? (s.html(i.html()),
        1 != P.Bskt.Tckt.confirm && 1 != P.Bskt.Tckt.isbet || $(".stLimit").hide(),
        r = !1,
        $.each($(".betslip tbody"), function(t, e) {
            30 <= $(this).height() && (r = !0)
        }),
        r || (currentSelectedPicks = []),
        this.AttachSlipHandler(t),
        this.ShowInitialSlipState(t),
        s.find("#betslipDiv"),
        s.css("min-height", "250px"),
        P.Bskt.Tckt.wgrGrps.length <= 0 ? $("button").addClass("disabled") : $("button").removeClass("disabled")) : window.location.reload(!0),
        "False" == $("#IsAuthenticated").val() && $("#betslipDiv").parent().parent().parent().append("<div class='joinFromBetSlip'><a href='/Join' class='joinBetslip-button'>Join Now!</a></div>"),
        this.RePaintMiniBlackjack(),
        this.RePaintMiniLiveBetting(),
        P.Ln.HightligthPicksSelected()
    },
    RePaintSlipWheDelItem: function(t) {
        var e, r, i, n, s, a;
        hightligthPicksEnabled && (P.Bskt.TcktConf,
        P.Stngs.btStngs,
        P.Stngs.tsrStngs,
        e = currentSelectedPicks,
        gameCounter = 0,
        r = {
            tckt: P.Bskt.Tckt
        },
        n = (i = $("#betslipJQoteDiv")).find("#betslipDiv"),
        s = t.children(".window-content"),
        n.empty(),
        $("#BetslipTemplateScript").jqote(r).appendTo(n),
        $("td.freePlay font.currnumber").html(P.TcktHndlr.freePlayBalance),
        n.find("font.currnumber").format(),
        $("td.freePlay font.currnumber").prepend("$"),
        null != i ? (s.html(i.html()),
        1 != P.Bskt.Tckt.confirm && 1 != P.Bskt.Tckt.isbet || $(".stLimit").hide(),
        0 != e.length && (currentSelectedPicks = e),
        a = !1,
        $.each($(".betslip tbody"), function(t, e) {
            30 <= $(this).height() && (a = !0)
        }),
        a || (currentSelectedPicks = []),
        this.AttachSlipHandler(t),
        this.ShowInitialSlipState(t),
        s.find("#betslipDiv"),
        s.css("min-height", "250px"),
        P.Bskt.Tckt.wgrGrps.length <= 0 ? $("button").addClass("disabled") : $("button").removeClass("disabled")) : window.location.reload(!0),
        "False" == $("#IsAuthenticated").val() && $("#betslipDiv").parent().parent().parent().append("<div class='joinFromBetSlip'><a href='/Join'><img class='header-logo' src='/sportsbook/Content/pan/css/images/SportsBetting-joinnow.png'></a></div>"),
        this.RePaintMiniBlackjack(),
        this.RePaintMiniLiveBetting(),
        P.Ln.HightligthPicksSelected())
    },
    ShowRebetMessage: function(t, e) {
        !t || e ? t && e ? $(".limitreached").show() : ($(".rebetmarketing").hide(),
        $(".limitreached").hide()) : $(".rebetmarketing").show()
    },
    RePaintMiniBlackjack: function() {
        var t;
        $("#right").height() != oldHeight && (oldHeight = $("#right").height(),
        t = $("#right").offset(),
        $("#MainBjDiv").css("top", t.top + $("#right").height() + 10),
        $("#MainBjDiv").css("left", t.left - 2))
    },
    RePaintMiniLiveBetting: function() {
        var t, e = $("div.balance_top_wrap").height() + $("div #hdiv").height() + 5, r = $(window).scrollTop(), i = $("#miniLiveBetting"), n = $("#MainBjDiv").height() + 100;
        t = e + 10 <= r ? $("#right").height() + r + n - 48 : $("#right").height() + e + n - 48,
        i.css("top", t + "px"),
        window_scroll()
    },
    AddOrRemoveHighlight: function(t) {
        var e;
        hightligthPicksEnabled && ((e = $("#contentArea input").filter(function() {
            return this.value == t
        })).parent().next().next().addClass("highlightBackground"),
        e.parent().next().addClass("highlightBackground"),
        e.parent().addClass("highlightBackground"),
        "S" == t.split("|")[7] || "straight" == t.split("|")[7] || "E" == t.split("|")[7] ? e.parent().next().next().next().addClass("highlightBackground") : "L" == t.split("|")[7] ? (e.parent().next().next().next().addClass("highlightBackground"),
        e.parent().next().next().next().next().addClass("highlightBackground")) : "C" != t.split("|")[7] && "CT" != t.split("|")[7] && "CS" != t.split("|")[7] || e.parent().prev().addClass("highlightBackground"))
    },
    FilterTicketByWitemID: function(t) {
        for (var e = [], r = "", i = 0; i < P.Bskt.Tckt.wgrGrps.length; i++) {
            if ((n = P.Bskt.Tckt.wgrGrps[i]).intId == t.wgrGrpIntId) {
                e.push(n);
                break
            }
        }
        if (null != e[0] && "straight" == e[0].wgrType)
            for (i = 0; i < e[0].wgrs.length; i++) {
                if ((n = e[0].wgrs[i]).intId == t.wgrIntId) {
                    if ("cntst" == n.wgrItms[0].type) {
                        r = n.wgrItms[0].selId;
                        break
                    }
                    r = CreateSelId(n.wgrItms[0].selObj);
                    break
                }
            }
        else
            for (var n, i = 0; i < e[0].wgrs[0].wgrItms.length; i++) {
                if ((n = e[0].wgrs[0].wgrItms[i]).intId == t.wgrItmIntId) {
                    r = CreateSelId(n.selObj);
                    break
                }
            }
        return r
    }
};
P.TcktHlpr = {
    init: function() {},
    CreateUpSelWagers: function(r, t, e, n) {
        var s = P.WgrTypRls
          , i = P.TcktUtils
          , l = P.Tckt;
        "straight" != n && s.IsPassMinMaxRules.straight(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "straight", "upselchoice", !1)),
        s.IsPassNonStraightRules.event(r) && s.IsPassNonStraightRules.market(r) && s.IsPassNonStraightRules.twinOffer(r) && (s.IsPassBtStngsRules.stBaseball(r, t) && s.IsPassBtStngsRules.stHockey(r, t) && s.IsPassBtStngsRules.stQuarterParlay(r, t) && s.IsPassBtStngsRules.quarterly(r, t) && s.IsPassNonStraightNonTeaserRules.ruleNo1(r, t) && s.IsPassNonStraightNonTeaserRules.ruleNo2(r, t) && ("parlay" != n && s.IsPassMinMaxRules.parlay(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "parlay", "upselchoice", !1)),
        "roundRobin" != n && s.IsPassMinMaxRules.roundRobin(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "roundRobin", "upselchoice", !1)),
        "ifBet" != n && s.IsPassMinMaxRules.ifBet(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "ifBet", "upselchoice", !1)),
        "reverse" != n && s.IsPassMinMaxRules.reverse(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "reverse", "upselchoice", !1)),
        "birdCage" != n && s.IsPassMinMaxRules.birdCage(r, t) && l.InternalAdd(i.NewTcktWgrGrp(r, "birdCage", "upselchoice", !1))),
        "teaser" != n && s.Teaser.IsPassTeaserRules(r, t, e) && l.InternalAdd(i.NewTcktWgrGrp(r, "teaser", "upselchoice", !1)))
    },
    ConfigureTicket: function(r, t, e) {
        for (var n = 0; n < r.wgrGrps.length; n++) {
            var s = r.wgrGrps[n];
            s.configured || (this.ConfigureIndividualWgrGrp(s),
            s.configured = !0)
        }
    },
    ResetConfigureTicket: function(r) {
        if (void 0 != r.wgrGrps)
            for (var t = 0; t < r.wgrGrps.length; t++)
                r.wgrGrps[t].configured = !1
    },
    ConfigureIndividualWgrGrp: function(r, t, e) {
        var n = P.Bskt.TcktConf
          , t = P.Stngs.btStngs
          , e = P.Stngs.tsrStngs;
        if ("straight" == r.wgrType)
            for (c = 0; c < r.wgrs.length; c++)
                for (var s = r.wgrs[c], i = 0; i < s.wgrItms.length; i++) {
                    var l = s.wgrItms[i]
                      , o = {
                        pchrs: this.ConfigurePitcher(l, r.wgrType, t.bsblActn),
                        pnts: this.ConfigurePointBuy(l)
                    };
                    n[l.intId + ""] = o
                }
        else {
            var a = {
                tsrs: "teaser" == r.wgrType ? P.WgrTypRls.Teaser.FindEligibleTeasers(r.wgrs[0], t, e) : [],
                ifBets: "ifBet" == r.wgrType ? this.ConfigureIfBet() : [],
                rndRbns: "roundRobin" == r.wgrType ? this.ConfigureRoundRobin(r.wgrs[0].wgrItms.length) : []
            };
            n[r.wgrs[0].intId + ""] = a,
            void 0 == r.wgrs[0].wagerselectionchoice && a.tsrs.length > 0 && (r.wgrs[0].wagerselectionchoice = a.tsrs[0].cd,
            r.wgrs[0].wagerselectionchoicename = a.tsrs[0].nm,
            P.TcktHndlr.UpdateWagerItemTeaserPoint(r.wgrs[0])),
            void 0 == r.wgrs[0].wagerselectionchoice && a.ifBets.length > 0 && (r.wgrs[0].wagerselectionchoice = a.ifBets[0].cd,
            r.wgrs[0].wagerselectionchoicename = a.ifBets[0].nm),
            void 0 == r.wgrs[0].wagerselectionchoice && a.rndRbns.length > 0 && (r.wgrs[0].wagerselectionchoice = a.rndRbns[0].cd,
            r.wgrs[0].wagerselectionchoicename = a.rndRbns[0].nm,
            r.wgrs[0].rrcomb = a.rndRbns[0].comb);
            for (var c = 0; c < r.wgrs.length; c++)
                for (var s = r.wgrs[c], i = 0; i < s.wgrItms.length; i++) {
                    var l = s.wgrItms[i]
                      , o = {
                        pchrs: this.ConfigurePitcher(l, r.wgrType, t.bsblActn),
                        pnts: "ifBet" == r.wgrType || "reverse" == r.wgrType || "birdCage" == r.wgrType ? this.ConfigurePointBuy(l) : []
                    };
                    n[l.intId + ""] = o
                }
        }
    },
    ConfigureIfBet: function() {
        var r = new Array;
        return r.push({
            nm: P.In.slip_ifbet_winonly,
            cd: "IWO"
        }),
        r.push({
            nm: P.In.slip_ifbet_winorpush,
            cd: "IWP"
        }),
        r
    },
    ConfigureRoundRobin: function(r) {
        var t = new Array
          , e = P.TcktUtils;
        return r > 2 && (t.push({
            cd: 1,
            nm: P.In.roundrobin_1 + " (" + e.RoundRobinComb(r, [2]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [2])
        }),
        t.push({
            cd: 2,
            nm: P.In.roundrobin_2 + " (" + e.RoundRobinComb(r, [2, 3]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [2, 3])
        })),
        r > 3 && t.push({
            cd: 3,
            nm: P.In.roundrobin_3 + " (" + e.RoundRobinComb(r, [2, 3, 4]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [2, 3, 4])
        }),
        r > 4 && t.push({
            cd: 4,
            nm: P.In.roundrobin_4 + " (" + e.RoundRobinComb(r, [2, 3, 4, 5]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [2, 3, 4, 5])
        }),
        r > 5 && t.push({
            cd: 5,
            nm: P.In.roundrobin_5 + " (" + e.RoundRobinComb(r, [2, 3, 4, 5, 6]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [2, 3, 4, 5, 6])
        }),
        r > 3 && (t.push({
            cd: 6,
            nm: P.In.roundrobin_6 + " (" + e.RoundRobinComb(r, [3]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [3])
        }),
        t.push({
            cd: 7,
            nm: P.In.roundrobin_7 + " (" + e.RoundRobinComb(r, [3, 4]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [3, 4])
        })),
        r > 4 && t.push({
            cd: 8,
            nm: P.In.roundrobin_8 + " (" + e.RoundRobinComb(r, [3, 4, 5]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [3, 4, 5])
        }),
        r > 5 && t.push({
            cd: 9,
            nm: P.In.roundrobin_9 + " (" + e.RoundRobinComb(r, [3, 4, 5, 6]) + " " + P.In.roundrobin_bets + ")",
            comb: e.RoundRobinComb(r, [3, 4, 5, 6])
        }),
        t
    },
    GetLastWord: function(r) {
        return ("" + r).replace(/[\s-]+$/, "").split(/[\s-]/).pop()
    },
    RemoveLastWord: function(r) {
        return r.replace(/\w*$/, "")
    },
    GetShortenName: function(r) {
        var t = r;
        if (t = t.replace("-L", ""),
        t = t.replace("- L", ""),
        t = t.replace("-R", ""),
        t = t.replace("- R", ""),
        0 == (t = t.replace(/^\s+|\s+$/g, "")).length)
            return t = r;
        var e = this.GetLastWord(t);
        if (t.length != e.length) {
            var n = this.RemoveLastWord(t)
              , s = n.match(/\b(\w)/g);
            return n.length > 0 ? s.join(". ") + ". " + e : e
        }
        return e
    },
    ConfigurePitcher: function(r, t, e) {
        var n = new Array;
        if ("G" == r.selObj.gt && "baseball" == r.selObj.lv1.toLowerCase() && (void 0 == r.ltmpchr || null == r.ltmpchr || "" == r.ltmpchr || void 0 == r.rtmpchr || null == r.rtmpchr || "" == r.rtmpchr ? n.push({
            nm: P.In.baseball_fixedodds,
            cd: "A",
            def: !0,
            ltmpchr: void 0 == r.ltmpchr || null == r.ltmpchr ? "" : r.ltmpchr,
            rtmpchr: void 0 == r.rtmpchr || null == r.rtmpchr ? "" : r.rtmpchr
        }) : "straight" == t || "ifBet" == t || "reverse" == t || "birdCage" == t ? "M" == r.selObj.mkt ? ("Listed" == e && (n.push({
            nm: P.In.baseball_action,
            cd: "A",
            def: !1,
            ltmpchr: "",
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !0,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " " + P.In.baseball_listed,
            cd: "LH",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LA",
            def: !1,
            ltmpchr: "",
            rtmpchr: r.rtmpchr
        })),
        "Action" == e && (n.push({
            nm: P.In.baseball_action,
            cd: "A",
            def: !0,
            ltmpchr: "",
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " " + P.In.baseball_listed,
            cd: "LH",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LA",
            def: !1,
            ltmpchr: "",
            rtmpchr: r.rtmpchr
        })),
        "Fixed" == e && (n.push({
            nm: P.In.baseball_action,
            cd: "A",
            def: !1,
            ltmpchr: "",
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        }),
        r.dltm == r.selObj.tmId && (n.push({
            nm: this.GetShortenName(r.dltmpchr) + " " + P.In.baseball_listed,
            cd: "LH",
            def: !0,
            ltmpchr: r.ltmpchr,
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LA",
            def: !1,
            ltmpchr: "",
            rtmpchr: r.rtmpchr
        })),
        r.drtm == r.selObj.tmId && (n.push({
            nm: this.GetShortenName(r.dltmpchr) + " " + P.In.baseball_listed,
            cd: "LH",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LA",
            def: !0,
            ltmpchr: "",
            rtmpchr: r.rtmpchr
        })))) : n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !0,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        }) : "M" == r.selObj.mkt ? ("Listed" == e && (n.push({
            nm: P.In.baseball_action,
            cd: "A",
            def: !1,
            ltmpchr: "",
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !0,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        })),
        "Action" != e && "Fixed" != e || (n.push({
            nm: P.In.baseball_action,
            cd: "A",
            def: !0,
            ltmpchr: "",
            rtmpchr: ""
        }),
        n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !1,
            ltmpchr: r.ltmpchr,
            rtmpchr: r.rtmpchr
        }))) : n.push({
            nm: this.GetShortenName(r.dltmpchr) + " and " + this.GetShortenName(r.drtmpchr) + " " + P.In.baseball_listed,
            cd: "LB",
            def: !0,
            ltmpchr: void 0 == r.ltmpchr || null == r.ltmpchr ? "" : r.ltmpchr,
            rtmpchr: void 0 == r.rtmpchr || null == r.rtmpchr ? "" : r.rtmpchr
        }),
        void 0 == r.pchrcond || null == r.pchrcond))
            for (var s = 0; s < n.length; s++)
                n[s].def && (r.pchrcond = n[s]);
        return n
    },
    ConfigurePointBuy: function(r) {
        var t = new Array
          , e = P.TcktUtils;
        if ("G" == r.selObj.gt) {
            var n = P.Stngs.pntStngs
              , s = null;
            if (void 0 != n[r.selObj.lv1 + "" + r.selObj.lv2] ? s = n[r.selObj.lv1 + "" + r.selObj.lv2] : void 0 != n[r.selObj.lv1] && (s = n[r.selObj.lv1]),
            !(r.prvntpntby || null == s || "S" != r.selObj.mkt && "L" != r.selObj.mkt || P.TcktUtils.IsTwinOffer(r.horg) || 0 != r.selObj.prd)) {
                var i = {
                    a: void 0 != r.av && null != r.av && 0 != r.av ? r.av : r.aorg,
                    d: void 0 != r.av && null != r.av && 0 != r.av ? r.dv : r.dorg,
                    h: r.horg,
                    dh: r.dhorg
                };
                t.push(i);
                var l = !1;
                if ("Y" == s.usePp) {
                    var o = {};
                    o.Chart = s.PpCn,
                    o.Sport = r.selObj.lv1,
                    o.League = r.selObj.lv2,
                    o.WagerType = r.selObj.mkt;
                    var a = {
                        jsonStr: JSON2.stringify(o)
                    };
                    $.ajax({
                        async: !1,
                        data: a,
                        url: P.Url.FetchProgressivePoints,
                        success: function(n) {
                            try {
                                var o = JSON2.parse(n);
                                l = void 0 != o && void 0 != o.pp && 0 != o.pp.length;
                                i.h < 0 && !0;
                                if ("S" == r.selObj.mkt)
                                    for (d = 1; d <= s.sprdByMx; d++) {
                                        for (var a = null, c = 0; c < o.pp.length; c++)
                                            null == a ? a = o.pp[c] : o.pp[c].EndingHalfPoint == d ? a = o.pp[c] : a.EndingHalfPoint < d && c > d && (a = o.pp[c]);
                                        var h = i.h + .5
                                          , p = i.a;
                                        -2.5 != h && 3.5 != h || 0 == a.Off3Ratio ? -3 != h && 3 != h || 0 == a.OnOff3Ratio ? -6.5 != h && 7.5 != h || 0 == a.Off7Ratio ? -7 != h && 7 != h || 0 == a.OnOff7Ratio ? p -= a.PricePerHalfPoint : p -= a.OnOff7Ratio * a.PricePerHalfPoint : p -= a.Off7Ratio * a.PricePerHalfPoint : p -= a.OnOff3Ratio * a.PricePerHalfPoint : p -= a.PricePerHalfPoint * a.Off3Ratio,
                                        p = e.SanitizeBuyPointsAmericanOdds(p);
                                        m = {
                                            h: h,
                                            dh: e.ToDisplayHandicap(h, r.selObj.mkt),
                                            a: p,
                                            d: e.ToDecimal(p)
                                        };
                                        t.push(m),
                                        i = m
                                    }
                                else if ("L" == r.selObj.mkt)
                                    for (var d = 1; d <= s.ttlByMx; d++) {
                                        for (var a = null, c = 0; c < o.pp.length; c++)
                                            null == a ? a = o.pp[c] : o.pp[c].EndingHalfPoint == d ? a = o.pp[c] : a.EndingHalfPoint < d && c > d && (a = o.pp[c]);
                                        var h = "TTOV" == r.selObj.selTyp ? i.h - .5 : i.h + .5
                                          , p = i.a;
                                        -2.5 != h && 3.5 != h || 0 == a.Off3Ratio ? -3 != h && 3 != h || 0 == a.OnOff3Ratio ? -6.5 != h && 7.5 != h || 0 == a.Off7Ratio ? -7 != h && 7 != h || 0 == a.OnOff7Ratio ? p -= a.PricePerHalfPoint : p -= a.PricePerHalfPoint * a.OnOff7Ratio : p -= a.PricePerHalfPoint * a.Off7Ratio : p -= a.PricePerHalfPoint * a.OnOff3Ratio : p -= a.PricePerHalfPoint * a.Off3Ratio,
                                        p = e.SanitizeBuyPointsAmericanOdds(p);
                                        var m = {
                                            h: h,
                                            dh: e.ToDisplayHandicap(h, r.selObj.mkt),
                                            a: p,
                                            d: e.ToDecimal(p)
                                        };
                                        t.push(m),
                                        i = m
                                    }
                            } catch (r) {}
                        }
                    })
                }
                if (0 == l)
                    if ("S" == r.selObj.mkt)
                        for (p = 1; p <= s.sprdByMx; p++) {
                            var c = i.h + .5
                              , h = i.a;
                            -2.5 != c && 3.5 != c || 0 == s.sprdByOff3 ? -3 != c && 3 != c || 0 == s.sprdByOn3 ? -6.5 != c && 7.5 != c || 0 == s.sprdByOff7 ? -7 != c && 7 != c || 0 == s.sprdByOn7 ? h -= s.sprdBy : h -= s.sprdByOn7 : h -= s.sprdByOff7 : h -= s.sprdByOn3 : h -= s.sprdByOff3,
                            h = e.SanitizeBuyPointsAmericanOdds(h);
                            d = {
                                h: c,
                                dh: e.ToDisplayHandicap(c, r.selObj.mkt),
                                a: h,
                                d: e.ToDecimal(h)
                            };
                            t.push(d),
                            i = d
                        }
                    else if ("L" == r.selObj.mkt)
                        for (var p = 1; p <= s.ttlByMx; p++) {
                            var c = "TTOV" == r.selObj.selTyp ? i.h - .5 : i.h + .5
                              , h = i.a - s.ttlBy;
                            h = e.SanitizeBuyPointsAmericanOdds(h);
                            var d = {
                                h: c,
                                dh: e.ToDisplayHandicap(c, r.selObj.mkt),
                                a: h,
                                d: e.ToDecimal(h)
                            };
                            t.push(d),
                            i = d
                        }
            }
        }
        return t
    },
    IsDuplicateSelection: function(r, t, e, n) {
        var s = !1;
        if ("straight" != t) {
            for (d = 0; d < e.wgrGrps.length && !s; d++)
                if ((m = e.wgrGrps[d]).wgrType == t) {
                    for (var i = 0, l = 0, o = r.wgrItms.length, a = 0; a < m.wgrs.length; a++)
                        for (var c = m.wgrs[a], h = 0; h < c.wgrItms.length; h++) {
                            b = c.wgrItms[h];
                            l++;
                            for (u = 0; u < r.wgrItms.length; u++) {
                                g = r.wgrItms[u];
                                b.selId == g.selId && i++
                            }
                        }
                    if (o > l && (l = o),
                    i == l && 0 != i && (s = !0,
                    !m.nbl)) {
                        m.nbl = !0;
                        for (f = 0; f < m.wgrs.length; f++)
                            m.wgrs[f].nbl = !0;
                        P.Tlbx.promptMsg = !1
                    }
                }
        } else
            for (var p = !1, d = 0; d < e.wgrGrps.length && !s && !p; d++) {
                var m = e.wgrGrps[d];
                if (m.wgrType == t) {
                    for (a = 0; a < m.wgrs.length && !p; a++)
                        for (var b = (c = m.wgrs[a]).wgrItms[0], u = 0; u < r.wgrItms.length && !p; u++) {
                            var g = r.wgrItms[u];
                            if (b.selId == g.selId) {
                                p = !0;
                                break
                            }
                        }
                    if (p && (s = !0,
                    !m.nbl)) {
                        m.nbl = !0;
                        for (var f = 0; f < m.wgrs.length; f++)
                            m.wgrs[f].nbl = !0;
                        P.Tlbx.promptMsg = !1
                    }
                }
            }
        return 0 == s && (P.Tlbx.promptMsg = !1),
        s
    },
    DisableFreePlay: function(r) {}
};
var chart = 0
  , currentSelectedPicks = [];
P.TcktUtils = {
    init: function() {},
    NextSeq: function() {
        return P.Bskt.Tckt.seq++
    },
    Display: {
        RenderTweetButton: function(t, e) {
            var r = "";
            r += "<div>&nbsp;</div>",
            r += "<div id='tweet'>",
            r += "<iframe allowtransparency='true' frameborder='0' scrolling='no' class='twitter-share-button' src='https://platform.twitter.com/widgets/tweet_button.html?url=none&count=none&size=large&text=#2' style='width:58px;height:20px;'>",
            r += "</iframe>",
            r += "</div>";
            var s = "";
            try {
                for (var n, i = window.variableTweet.split(","), o = t.tweeText, l = e.ltm.trim(), a = e.rtm.trim(), c = e.selid.trim(), d = c.toUpperCase() == l.toUpperCase() ? a : l, p = e.dcntstnm.trim(), g = e.dlv1.trim(), f = "." == e.dlv2.trim() ? g : e.dlv2.trim(), u = e.dnm.trim(), w = 0; w < t.wgrGrps.length; w++)
                    for (var h = t.wgrGrps[w], m = 0; m < h.wgrs.length; m++) {
                        var v, I, y, b = h.wgrs[m];
                        "ROUNDROBIN" == h.wgrType.trim().toUpperCase() && (v = b.rrcomb,
                        I = b.wagerselectionchoicename.indexOf("("),
                        y = (y = (y = b.wagerselectionchoicename.substring(0, I).trim()).replace("'", "&#39;")).replace("�", "&#146;"))
                    }
                n = o.replace(i[10], l).replace(i[11], a).replace(i[12], c).replace(i[13], d).replace("[contestsubcat]", p).replace(i[6], y).replace(i[9], f).replace("[contestcategories]", g).replace(i[8], u).replace(i[14], v).replace("�", "&#146;").replace("'", "&#39;").replace(" #", " %23"),
                s = r.replace("#2", n)
            } catch (t) {
                s = r.replace("#2", "RenderTweetButton error function.")
            }
            return s
        },
        RenderTicketNo: function(t) {
            var e = "";
            return e += "<div class='ticketno'>",
            e += P.In.slip_ticketno + " " + t.tcktno + " " + P.In.slip_accepted,
            e += "</div>"
        },
        RenderTotalAmount: function(t) {
            var e = "";
            return t.isscs && 0 < t.risk && 0 < t.win && (e += "<div class='totalamt'>",
            e += P.In.slip_total_risk + " : <font class='currnumber'>" + t.risk.toFixed(2) + "</font>",
            e += "<br />",
            e += P.In.slip_total_win + " : <font class='currnumber'>" + t.win.toFixed(2) + "</font>",
            e += "</div>"),
            e
        },
        RenderHeadError: function(t) {
            var e = [];
            "straight" != t.wgrType && null != t.errmsgs && (e = t.errmsgs);
            var r = "";
            if (0 < e.length) {
                if (r += "<div class='error errorGray errormsgs tooltipdiv' cfg=\"{type:'errormsg'}\">",
                r += "<span>",
                1 < e.length) {
                    r += "<ul>";
                    for (var s = 0; s < e.length; s++)
                        r += "<li>" + e[s] + "</li>";
                    r += "</ul>"
                } else
                    r += e[0];
                r += "</span>",
                r += "</div>"
            }
            return r
        },
        RenderMemberError: function(t, e) {
            var r = [];
            "straight" == t.wgrType ? (null != t.errmsgs && 0 < t.errmsgs.length && (r = r.union(t.errmsgs)),
            null != e.errmsgs && 0 < e.errmsgs.length && (r = r.union(e.errmsgs))) : null != e.errmsgs && 0 < e.errmsgs.length && (r = (r = r.union(e.errmsgs)).union(e.errmsgs));
            var s = "";
            if (0 < r.length) {
                if (s += "<div class='error errormsgs tooltipdiv' cfg=\"{type:'errormsg'}\">",
                s += "<span>",
                1 < r.length) {
                    s += "<ul>";
                    for (var n = 0; n < r.length; n++)
                        s += "<li>" + r[n] + "</li>";
                    s += "</ul>"
                } else
                    s += r[0];
                s += "</span>",
                s += "</div>"
            }
            return s
        },
        RenderTicketError: function(t) {
            var e = [];
            null != t.errmsgs && 0 < t.errmsgs.length && (e = e.union(t.errmsgs));
            var r = "";
            if (0 < e.length) {
                if (r += "<div class='tckterrormsgs errormsgs'>",
                1 < e.length) {
                    r += "<ul>";
                    for (var s = 0; s < e.length; s++)
                        r += "<li>" + e[s] + "</li>";
                    r += "</ul>"
                } else
                    r += e[0];
                r += "</div>"
            }
            return "true" == t.showPopUpQuickDeposit && $("#msgBetError").html(t.quickDepositErrorMessage),
            r
        },
        RenderWgrItmEventName: function(t) {
            var e = "";
            return "G" == t.selObj.gt ? (e += t.dltm,
            e += "" != t.dltmpchr ? "(" + t.dltmpchr + ")" : "",
            e += " " + P.In.slip_vs + " ",
            e += t.drtm,
            e += "" != t.drtmpchr ? "(" + t.drtmpchr + ")" : "") : "C" == t.selObj.gt && (e += null != t.dlv1 && "" != t.dlv1 && "." != t.dlv1 ? t.dlv1 : "",
            e += null != t.dlv2 && "" != t.dlv2 && "." != t.dlv2 ? "<br>" + t.dlv2 : "",
            e += null != t.dlv3 && "" != t.dlv3 && "." != t.dlv3 ? "<br>" + t.dlv3 : "",
            e += null != t.cntstnm && "" != t.cntstnm && "." != t.cntstnm ? "<br>" + t.cntstnm : ""),
            e
        },
        RenderWgrItmMarketName: function(t) {
            var e, r = "<br>";
            return "G" == t.selObj.gt && ("Football" != (e = t.selObj.lv1) && "Hockey" != e && "Soccer" != e && "Baseball" != e && "Basketball" != e && "Tennis" != e && (e = "Others"),
            r += P.In["mkt_" + e + "_" + t.selObj.mkt],
            r += " - (" + P.In["prd_" + e + "_" + t.selObj.prd] + ")"),
            r
        },
        RenderWgrItmOdds: function(t) {
            return this.RenderOdds(t.a)
        },
        RenderPntsOdds: function(t) {
            return this.RenderOdds(t)
        },
        RenderOdds: function(t) {
            var e = ""
              , r = $("#oddsFormatSelect").val();
            return e += "A" == r ? P.TcktUtils.ToDisplayAmerican(t) : "D" == r ? P.TcktUtils.ToDisplayDecimal(t) : P.TcktUtils.ToDisplayFractional(t)
        },
        RenderWgrItm: function(t, e, r, s) {
            var n = ""
              , i = null != s[r.intId + ""] ? s[r.intId + ""] : {
                pnts: [],
                pchrs: []
            };
            if ("G" == r.selObj.gt)
                if (!P.Bskt.Tckt.isbet && null != i.pnts && null != i.pnts && 0 < i.pnts.length) {
                    var o = ""
                      , l = "";
                    l += o = this.RenderH2HSelectionName(r.ltm, r.rtm, r.dltm, r.drtm, r.selObj),
                    l += " ",
                    "roundRobin" == t.wgrType || "reverse" == t.wgrType || "parlay" == t.wgrType || "birdCage" == t.wgrType || "teaser" == t.wgrType ? l += "</td><td class='col_selection bdb' style='width:100px'><select class='pointbuys' cfg='{wgrGrpIntId: " + t.intId + ", wgrIntId: " + e.intId + ", wgrItmIntId:" + r.intId + "}'>" : l += "</td><td class='col_selection' style='width:100px'><select class='pointbuys' cfg='{wgrGrpIntId: " + t.intId + ", wgrIntId: " + e.intId + ", wgrItmIntId:" + r.intId + "}'>";
                    for (var a = 0; a < i.pnts.length; a++) {
                        Math.abs(i.pnts[a].h - r.horg);
                        i.pnts[a].h == r.h ? l += "<option selected='true' value='" + i.pnts[a].h + "' cfg='{a:" + i.pnts[a].a + ", d:" + i.pnts[a].d + ", h:" + i.pnts[a].h + ', dh:"' + i.pnts[a].dh + "\"}'>" : l += "<option value='" + i.pnts[a].h + "' cfg='{a:" + i.pnts[a].a + ", d:" + i.pnts[a].d + ", h:" + i.pnts[a].h + ', dh:"' + i.pnts[a].dh + "\"}'>",
                        l += i.pnts[a].dh + " (" + this.RenderPntsOdds(i.pnts[a].a) + ")",
                        l += "</option>"
                    }
                    n = l += "</select>"
                } else {
                    o = "";
                    o = this.RenderH2HSelectionName(r.ltm, r.rtm, r.dltm, r.drtm, r.selObj),
                    "Baseball" == r.selObj.lv1 || "roundRobin" != t.wgrType && "reverse" != t.wgrType && "parlay" != t.wgrType && "birdCage" != t.wgrType && "teaser" != t.wgrType ? o += "</td><td class='col_selection' style='width:100px'>" : o += "</td><td class='col_selection bdb' style='width:100px'>",
                    "" != r.dh && (o += r.dh),
                    n = o
                }
            else {
                o = "";
                o += r.dnm + "</td><td class='col_selection' style='width:100px'>",
                "" != r.dh && (o += " " + r.dh + " " + r.unit + "</td>"),
                n = o
            }
            return (P.Bskt.Tckt.isbet || P.Bskt.Tckt.confirm) && null != e.frHlfPnt && null != e.frHlfPnt && e.frHlfPnt && (P.Bskt.Tckt.isbet ? n += "<br /><font color='blue'>" + P.In.slip_freehalfpoint + "</font>" : n += "<br /><font color='blue'>" + P.In.slip_eligiblefreehalfpoint + "</font>"),
            n
        },
        RenderWgrItmPchers: function(t, e, r, s) {
            var n, i;
            hightligthPicksEnabled && ($(".bdevtt2").removeClass("highlightBackground"),
            $(".hdcp").removeClass("highlightBackground"),
            $(".odds").removeClass("highlightBackground"),
            $(".info").removeClass("highlightBackground"),
            $(".mktdesc").removeClass("highlightBackground"),
            $(".smlhdcp").removeClass("highlightBackground"),
            $(".bdevtt").removeClass("highlightBackground"),
            $(".checkboxes").removeClass("highlightBackground"),
            i = CreateSelId(r.selObj),
            "C" == r.selObj.gt && null == (i = r.selId) && (i = (n = r.selObj).gt + "|" + n.cntstNo + "|" + n.cntstntNo + "|" + n.str + "|" + n.prf + "|" + n.mkt),
            t.nbl && (checkIfExist(i) || currentSelectedPicks.push(i)));
            var o = ""
              , l = null != s[r.intId + ""] ? s[r.intId + ""] : {
                pnts: [],
                pchrs: []
            };
            if (null != l.pchrs && null != l.pchrs && 0 < l.pchrs.length) {
                var a = "";
                if (1 < l.pchrs.length) {
                    "roundRobin" == t.wgrType || "reverse" == t.wgrType || "parlay" == t.wgrType || "birdCage" == t.wgrType || "teaser" == t.wgrType ? a += "<td class='bdb' /><td class='col_selection bdb' colspan='3'>" + r.dh + "<select class='pchrs' cfg='{wgrGrpIntId: " + t.intId + ", wgrIntId: " + e.intId + ", wgrItmIntId:" + r.intId + "}'>" : a += "<td /><td class='col_selection' colspan='3'>" + r.dh + "<select class='pchrs' cfg='{wgrGrpIntId: " + t.intId + ", wgrIntId: " + e.intId + ", wgrItmIntId:" + r.intId + "}'>";
                    for (var c = 0; c < l.pchrs.length; c++) {
                        var d = l.pchrs[c];
                        r.pchrcond.cd == d.cd ? a += "<option selected='true' value='" + d.cd + "' cfg='{cd:\"" + d.cd + '", ltmpchr:"' + d.ltmpchr + '", rtmpchr:"' + d.rtmpchr + '", nm:"' + d.nm + '", def:"' + d.def + "\"}'>" + d.nm + "</option>" : a += "<option value='" + d.cd + "' cfg='{cd:\"" + d.cd + '", ltmpchr:"' + d.ltmpchr + '", rtmpchr:"' + d.rtmpchr + '", nm:"' + d.nm + '", def:"' + d.def + "\"}'>" + d.nm + "</option>"
                    }
                    a += "</select></td>"
                } else
                    "roundRobin" == t.wgrType || "reverse" == t.wgrType || "parlay" == t.wgrType || "birdCage" == t.wgrType || "teaser" == t.wgrType ? a += "<td class='bdb' /><td class='col_selection bdb' colspan='3'>(" + l.pchrs[0].nm + ")</td>" : a += "<td /><td class='col_selection' colspan='3'>(" + l.pchrs[0].nm + ")</td>";
                o += a
            }
            return (P.Bskt.Tckt.isbet || P.Bskt.Tckt.confirm) && null != e.frHlfPnt && null != e.frHlfPnt && e.frHlfPnt && (P.Bskt.Tckt.isbet ? o += "<br /><font color='blue'>" + P.In.slip_freehalfpoint + "</font>" : o += "<br /><font color='blue'>" + P.In.slip_eligiblefreehalfpoint + "</font>"),
            o
        },
        RenderWgrSelectionChoice: function(wgrGrp, wgr, tcktConf) {
            var result = ""
              , teaserInfo = ""
              , conf = null != tcktConf[wgr.intId + ""] ? tcktConf[wgr.intId + ""] : {
                ifBets: [],
                tsrs: [],
                rndRbns: []
            };
            if (0 < conf.ifBets.length) {
                result += "<select class='wagerselectionchoice' cfg=\"{wgrType: 'ifBet', wgrGrpIntId: " + wgrGrp.intId + ", wgrIntId: " + wgr.intId + '}" >';
                for (var i = 0; i < conf.ifBets.length; i++)
                    "" != wgr.wagerselectionchoice && wgr.wagerselectionchoice == conf.ifBets[i].cd ? result += "<option selected='true' value='" + conf.ifBets[i].cd + "'>" + conf.ifBets[i].nm + "</option>" : result += "<option value='" + conf.ifBets[i].cd + "'>" + conf.ifBets[i].nm + "</option>";
                result += "</select>"
            } else if (0 < conf.rndRbns.length) {
                result += "<select class='wagerselectionchoice' cfg=\"{wgrType: 'roundRobin', wgrGrpIntId: " + wgrGrp.intId + ", wgrIntId: " + wgr.intId + '}">';
                for (var i = 0; i < conf.rndRbns.length; i++)
                    "" != wgr.wagerselectionchoice && wgr.wagerselectionchoice == conf.rndRbns[i].cd ? result += "<option selected='true' value='" + conf.rndRbns[i].cd + "' comb='" + conf.rndRbns[i].comb + "' >" + conf.rndRbns[i].nm + "</option>" : result += "<option value='" + conf.rndRbns[i].cd + "' comb='" + conf.rndRbns[i].comb + "' >" + conf.rndRbns[i].nm + "</option>";
                result += "</select>"
            } else if (0 < conf.tsrs.length) {
                result += "<div class='wagerselectionchoicestack'>",
                result += "<select class='wagerselectionchoice' cfg=\"{wgrType: 'teaser', wgrGrpIntId: " + wgrGrp.intId + ", wgrIntId: " + wgr.intId + '}">';
                for (var tsrs = null, i = 0; i < conf.tsrs.length; i++)
                    0 == i && (tsrs = conf.tsrs[i]),
                    "" != wgr.wagerselectionchoice && wgr.wagerselectionchoice == conf.tsrs[i].cd ? (result += "<option selected='true' value='" + conf.tsrs[i].cd + "'>" + conf.tsrs[i].nm + "</option>",
                    tsrs = conf.tsrs[i]) : result += "<option value='" + conf.tsrs[i].cd + "'>" + conf.tsrs[i].nm + "</option>";
                result += "</select>",
                result += "</div>",
                "upselchoice" == wgrGrp.type ? wgrGrp.nbl ? teaserInfo += "</span><div class='info tooltipdiv teaserinfo line' cfg='{type:\"eventinfo\"}'>" : teaserInfo += "</span><div class='info tooltipdiv teaserinfo line hide' cfg='{type:\"eventinfo\"}'>" : teaserInfo += "</span><div class='info tooltipdiv teaserinfo' cfg='{type:\"eventinfo\"}'>",
                teaserInfo += "<span id='lt'>" + tsrs.nm + "</span>",
                teaserInfo += "<span id='rt'></span>",
                teaserInfo += "<span id='cmts'>" + tsrs.desc;
                for (var gamesPicked = wgr.wgrItms.length, j = 0; j < tsrs.payCards.length; j++)
                    if (tsrs.payCards[j].gamesPicked == gamesPicked) {
                        var toBase = 0
                          , jsonResult = 0;
                        0 == chart && ($.ajax({
                            url: P.Url.GetChart,
                            type: "post",
                            async: !1,
                            success: function(t) {
                                jsonResult = t
                            }
                        }),
                        chart = eval("(" + jsonResult + ")"));
                        for (var totalCents = 0, moneyLine = 0, p = 0; p < wgr.wgrItms.length; p++)
                            var basePoints = P.TcktUtils.GetBasePoints(wgr.wgrItms[p])
                              , points = P.TcktUtils.GetPoints(wgr.wgrItms[p])
                              , totalCents = P.TcktUtils.GetGents(chart, basePoints, points, gamesPicked) + totalCents;
                        moneyLine = 1 != tsrs.payCards[j].moneyLine && 1 != tsrs.payCards[j].toBase ? (toBase = tsrs.payCards[j].toBase / tsrs.payCards[j].moneyLine,
                        toBase = P.TcktUtils.NRound(toBase, 2),
                        tsrs.payCards[j].moneyLine / tsrs.payCards[j].moneyLine) : (toBase = P.TcktUtils.GetTobase(tsrs.payCards[j].toBase),
                        P.TcktUtils.GetMoneyLine(tsrs.payCards[j].moneyLine)),
                        0 != totalCents && (toBase += totalCents),
                        teaserInfo += "<br />" + P.In.slip_teaser_pays + " " + P.TcktUtils.NRound(toBase, 2) + " " + P.In.slip_teaser_to + " " + moneyLine
                    }
                teaserInfo += "</span></div></td>",
                "upselchoice" == wgrGrp.type ? (teaserInfo += "<td class='col_wagerselectionchoice bdb' colspan='2'>",
                wgrGrp.nbl ? teaserInfo += "<div class='wagerselectionchoice nbl'>" : teaserInfo += "<div class='wagerselectionchoice nbl hide'>") : teaserInfo += "<td class='smplheadTd col_wagerselectionchoice' colspan='2'>"
            }
            return teaserInfo + result
        },
        RenderH2HSelectionName: function(t, e, r, s, n) {
            var i = "";
            return "S" == n.mkt ? i = t == n.tmId ? this.LastWord(r) : this.LastWord(s) : "M" == n.mkt ? i = "MLDR" == n.selTyp ? P.In.game_draw : t == n.tmId ? this.LastWord(r) : this.LastWord(s) : "L" == n.mkt ? i = "TTOV" == n.selTyp ? P.In.slip_over : P.In.slip_under : "E" == n.mkt ? (i = "LTTTOV" == n.selTyp || "LTTTUN" == n.selTyp ? this.LastWord(r) : this.LastWord(s),
            i += " ",
            "LTTTOV" == n.selTyp || "RTTTOV" == n.selTyp ? i += P.In.slip_over.substring(0, 2) : i += P.In.slip_under.substring(0, 2)) : i = t == n.tmId ? this.LastWord(r) : this.LastWord(s),
            i
        },
        LastWord: function(t) {
            return ("" + t).replace(/[\s-]+$/, "").split(/[\s-]/).pop()
        },
        RenderWgrGrpAmt: function(wgrGrp, tcktConf, isConfirm, isBet) {
            if ("ifBet" == wgrGrp.wgrType)
                return isBet || isConfirm ? P.In.slip_risk + " " + wgrGrp.wgrs[0].ttlrisk.toFixed(2) + " " + P.In.slip_towin + " " + wgrGrp.wgrs[0].win.toFixed(2) : "";
            if ("parlay" == wgrGrp.wgrType || "roundRobin" == wgrGrp.wgrType || "birdCage" == wgrGrp.wgrType) {
                if (isBet || isConfirm)
                    return P.In.slip_risk + " " + wgrGrp.wgrs[0].ttlrisk.toFixed(2) + " " + P.In.slip_towin + " " + wgrGrp.wgrs[0].win.toFixed(2);
                var value = 0 < wgrGrp.wgrs[0].risk ? "value='" + wgrGrp.wgrs[0].risk.toFixed(2) + "' prevval='" + wgrGrp.wgrs[0].risk.toFixed(2) + "'" : "";
                return P.In.slip_risk + " <input type='text' class='wageramt risk' cfg=\"{wgrGrpIntId:" + wgrGrp.intId + ", wgrIntId:" + wgrGrp.wgrs[0].intId + ", wgrItmIntId:" + wgrGrp.wgrs[0].wgrItms[0].intId + '}" ' + value + "/>"
            }
            if ("reverse" != wgrGrp.wgrType && "teaser" != wgrGrp.wgrType)
                return "straight" == wgrGrp.wgrType ? "" : void 0;
            if (isBet || isConfirm)
                return P.In.slip_risk + " " + wgrGrp.wgrs[0].ttlrisk.toFixed(2) + " " + P.In.slip_towin + " " + wgrGrp.wgrs[0].win.toFixed(2);
            var value = 0 < wgrGrp.wgrs[0].wgrAmt ? "value='" + wgrGrp.wgrs[0].wgrAmt.toFixed(2) + "' prevval='" + wgrGrp.wgrs[0].wgrAmt.toFixed(2) + "'" : ""
              , result = "Amount <input type='text' class='wageramt wgrAmt' cfg=\"{wgrGrpIntId:" + wgrGrp.intId + ", wgrIntId:" + wgrGrp.wgrs[0].intId + ", wgrItmIntId:" + wgrGrp.wgrs[0].wgrItms[0].intId + '}" ' + value + "/>";
            if ("teaser" == wgrGrp.wgrType) {
                var wgr = wgrGrp.wgrs[0]
                  , conf = null != tcktConf[wgr.intId + ""] ? tcktConf[wgr.intId + ""] : {
                    tsrs: []
                };
                if (0 < conf.tsrs.length) {
                    for (var tsrs = null, i = 0; i < conf.tsrs.length; i++)
                        0 == i && (tsrs = conf.tsrs[i]),
                        "" != wgr.wagerselectionchoice && wgr.wagerselectionchoice == conf.tsrs[i].cd && (tsrs = conf.tsrs[i]);
                    for (var gamesPicked = wgr.wgrItms.length, j = 0; j < tsrs.payCards.length; j++)
                        if (tsrs.payCards[j].gamesPicked == gamesPicked) {
                            var toBase = 0
                              , jsonResult = 0;
                            0 == chart && ($.ajax({
                                url: P.Url.GetChart,
                                type: "post",
                                async: !1,
                                success: function(t) {
                                    jsonResult = t
                                }
                            }),
                            chart = eval("(" + jsonResult + ")"));
                            for (var totalCents = 0, moneyLine = 0, p = 0; p < wgr.wgrItms.length; p++)
                                var basePoints = P.TcktUtils.GetBasePoints(wgr.wgrItms[p])
                                  , points = P.TcktUtils.GetPoints(wgr.wgrItms[p])
                                  , totalCents = P.TcktUtils.GetGents(chart, basePoints, points, gamesPicked) + totalCents;
                            moneyLine = 1 != tsrs.payCards[j].moneyLine && 1 != tsrs.payCards[j].toBase ? (toBase = tsrs.payCards[j].toBase / tsrs.payCards[j].moneyLine,
                            tsrs.payCards[j].moneyLine / tsrs.payCards[j].moneyLine) : (toBase = P.TcktUtils.GetTobase(tsrs.payCards[j].toBase),
                            P.TcktUtils.GetMoneyLine(tsrs.payCards[j].moneyLine)),
                            0 != totalCents && (toBase += totalCents),
                            result += " " + P.In.slip_teaser_pays + " " + P.TcktUtils.NRound(toBase, 2) + " " + P.In.slip_teaser_to + " " + moneyLine
                        }
                }
            }
            return result
        },
        RenderWgrItmAmt: function(t, e, r, s, n) {
            var i, o, l = 'cfg="{wgrGrpIntId:' + t.intId + ", wgrIntId:" + e.intId + ", wgrItmIntId:" + r.intId + '}"';
            {
                if (hightligthPicksEnabled && (o = CreateSelId(r.selObj),
                "C" == r.selObj.gt && null == (o = r.selId) && (o = (i = r.selObj).gt + "|" + i.cntstNo + "|" + i.cntstntNo + "|" + i.str + "|" + i.prf + "|" + i.mkt),
                t.nbl && (checkIfExist(o) || currentSelectedPicks.push(o))),
                "ifBet" == t.wgrType)
                    return n || s ? P.In.slip_risk + " " + r.risk.toFixed(2) + " " + P.In.slip_towin + " " + r.win.toFixed(2) : "Risk <input type='text' class='wageramt risk' " + l + " " + (0 < r.risk ? "value='" + r.risk.toFixed(2) + "' prevval='" + r.risk.toFixed(2) + "'" : "") + "/> To Win <input type='text' class='wageramt win' " + l + " " + (0 < r.win ? "value='" + r.win.toFixed(2) + "' prevval='" + r.win.toFixed(2) + "'" : "") + "/><div class='stLimit'><a href='#'  class='riskMaxLimitLink' id=" + t.wgrType + "-" + r.intId + " " + l + " ><strong>Risk Max Limit</strong></a></div>";
                if ("straight" == t.wgrType) {
                    return n || s ? P.In.slip_risk + " " + e.ttlrisk.toFixed(2) + " " + P.In.slip_towin + " " + e.win.toFixed(2) : "Risk <input type='text' class='wageramt risk' " + l + " " + (0 < e.risk ? "value='" + e.risk.toFixed(2) + "' prevval='" + e.risk.toFixed(2) + "'" : "") + "/> To Win <input type='text' class='wageramt win' " + l + " " + (0 < e.win ? "value='" + e.win.toFixed(2) + "' prevval='" + e.win.toFixed(2) + "'" : "") + "/><div class='stLimit'><a href='#'  class='riskMaxLimitLink' id=" + t.wgrType + "-" + e.intId + " " + l + " ><strong>Risk Max Limit</strong></a></div>"
                } else {
                    if ("reverse" == t.wgrType)
                        return n || s ? P.In.slip_risk + " " + r.risk.toFixed(2) + " " + P.In.slip_towin + " " + r.win.toFixed(2) : "";
                    if ("roundRobin" == t.wgrType || "parlay" == t.wgrType || "teaser" == t.wgrType || "birdCage" == t.wgrType)
                        return ""
                }
            }
        }
    },
    NewTcktWgrGrp: function(t, e, r, s) {
        var n = {};
        if (n.intId = this.NextSeq(),
        n.configured = !1,
        n.wgrType = e,
        n.type = r,
        n.nbl = s,
        n.wgrs = new Array,
        "straight" == e)
            for (var i = 0; i < t.wgrItms.length; i++) {
                var o, l = t.wgrItms[i];
                (o = {}).intId = this.NextSeq(),
                o.wgrType = e,
                o.type = r,
                o.nbl = s,
                o.wgrItms = new Array,
                o.win = 0,
                o.risk = 0,
                o.wgrAmt = 0,
                o.frHlfPnt = !1,
                o.freeplayActive = !1,
                null != (a = this.CloneWgrItm(l)).av && null != a.av && 0 != a.av && (a.a = a.av),
                null != a.dv && null != a.dv && 0 != a.dv && (a.d = a.dv),
                a.intId = this.NextSeq(),
                a.risk = 0,
                a.win = 0,
                o.wgrItms.push(a),
                n.wgrs.push(o)
            }
        else {
            (o = {}).intId = this.NextSeq(),
            o.wgrType = e,
            o.type = r,
            o.nbl = s,
            o.wgrItms = new Array,
            o.win = 0,
            o.risk = 0,
            o.wgrAmt = 0,
            o.frHlfPnt = !1,
            o.freeplayActive = !1;
            for (i = 0; i < t.wgrItms.length; i++) {
                var a, l = t.wgrItms[i];
                (a = this.CloneWgrItm(l)).intId = this.NextSeq(),
                a.av = 0,
                a.dv = 0,
                a.risk = 0,
                a.win = 0,
                o.wgrItms.push(a)
            }
            n.wgrs.push(o)
        }
        return n
    },
    CloneWgrItm: function(t) {
        var e = $.encode(t);
        return $.decode(e)
    },
    RenderNoOfWager: function() {
        for (var t = P.Bskt.Tckt.wgrGrps, e = 0, r = 0; r < t.length; r++) {
            var s = t[r];
            if (s.nbl)
                for (var n = 0; n < s.wgrs.length; n++) {
                    s.wgrs[n].nbl && (e += 1)
                }
        }
        0 == e ? ($("#noofsel").hide(),
        $("table.betslipbbar input").attr("disabled", !0)) : ($("table.betslipbbar input").removeAttr("disabled"),
        $("#ticket").show(),
        P.Bskt.Tckt.isbet ? $("#noofsel").hide() : ($("#noofsel").empty().append(e),
        $("#noofsel").show()))
    },
    Comb: function(t, e) {
        if (0 == e || e == t)
            return 1;
        if (t < e || e < 0)
            return 0;
        var r = e
          , s = t - e;
        if (r < s && (i = r,
        r = s,
        s = i),
        t < r)
            n = 0;
        else {
            for (var n = 1; 1 < s; )
                n *= s--;
            for (var o = 1; r < t; )
                o *= t--;
            n = o / n
        }
        return n
    },
    RoundRobinComb: function(t, e) {
        for (var r = 0, s = 0; s < e.length; s++)
            r += this.Comb(t, e[s]);
        return r
    },
    CalculateWin: function(t, e) {
        var r = 0;
        return 0 == (r = 0 < e.a ? (t * (e.a / 100)).toFixed(2) : (t * (100 / Math.abs(e.a))).toFixed(2)) ? "" : r
    },
    CalculateRisk: function(t, e) {
        var r = 0;
        return 0 == (r = 0 < e.a ? (t / (e.a / 100)).toFixed(2) : (t / (100 / Math.abs(e.a))).toFixed(2)) ? "" : r
    },
    ToDisplayHandicap: function(t, e) {
        var r = t < 0 ? Math.ceil(t) : Math.floor(t)
          , s = t - r;
        return .25 == s || -.25 == s || .75 == s || -.75 == s ? this.ToDisplayHandicapTwinOffer(r, s, e) : .5 == s || -.5 == s ? this.ToDisplayHandicapHalfPoint(r, s, e) : this.ToDisplayHandicapPoint(r, e)
    },
    ToDisplayHandicapTwinOffer: function(t, e, r) {
        var s, n = .25 == e || -.25 == e ? (s = this.ToDisplayHandicapPoint(t, r),
        this.ToDisplayHandicapHalfPoint(t, e, r)) : .75 == e ? (s = this.ToDisplayHandicapHalfPoint(t, e, r),
        this.ToDisplayHandicapPoint(t + 1, r)) : (s = this.ToDisplayHandicapHalfPoint(t, e, r),
        this.ToDisplayHandicapPoint(t - 1, r));
        return s + ", " + n
    },
    ToDisplayHandicapPoint: function(t, e) {
        return 0 == t ? "S" == e ? P.In.slip_pk : "0" : ("S" == e && 0 < t ? "+" : "") + t
    },
    ToDisplayHandicapHalfPoint: function(t, e, r) {
        return 0 == t ? (e < 0 ? "-" : "S" == r ? "+" : "") + "&frac12;" : ("S" == r && 0 < t ? "+" : "") + t + "&frac12;"
    },
    ToDisplayDecimal: function(t) {
        var e = 0
          , e = t < 0 ? 1 - 100 / t : 1 + t / 100;
        return e *= Math.pow(10, P.Stngs.btStngs.dcmlOddsPrcson),
        e = ((e = Math.floor(e)) / Math.pow(10, P.Stngs.btStngs.dcmlOddsPrcson)).toFixed(P.Stngs.btStngs.dcmlOddsPrcson)
    },
    ToDisplayFractional: function(t) {
        for (var e = 0, r = 0, s = 0, s = (r = t < 0 ? (e = 100,
        -1 * t) : (e = t,
        100)) < e ? r : e, n = 2; n <= s; n++)
            e % n == 0 && r % n == 0 && (e /= n,
            r /= n,
            n = 1);
        return e + "/" + r
    },
    ToDecimal: function(t) {
        var e = 0
          , e = t < 0 ? 1 - 100 / t : 1 + t / 100;
        return e *= Math.pow(10, P.Stngs.btStngs.tbDcmlOddsPrcson),
        e = ((e = Math.floor(e)) / Math.pow(10, P.Stngs.btStngs.tbDcmlOddsPrcson)).toFixed(P.Stngs.btStngs.tbDcmlOddsPrcson)
    },
    ToDisplayAmerican: function(t) {
        return t < 0 ? t + "" : "+" + t
    },
    SanitizeBuyPointsAmericanOdds: function(t) {
        return 0 < t && t < 100 ? t - 200 : t
    },
    IsTwinOffer: function(t) {
        null != t && null != t || (t = 0);
        var e = t - (t < 0 ? Math.ceil(t) : Math.floor(t));
        return .25 == e || -.25 == e || .75 == e || -.75 == e
    },
    TeaserRuleToPay: function(t, e) {
        return t + P.TcktUtils.ConvertCentsToMoney(e) * t
    },
    NRound: function(t, e) {
        return Number(t.toFixed(2))
    },
    GetTobase: function(t) {
        return t
    },
    GetMoneyLine: function(t) {
        return t
    },
    GetBasePoints: function(t) {
        var e = 0;
        return t && (e = t.horg),
        e
    },
    GetPoints: function(t) {
        var e = 0;
        return t && (e = t.h - t.horg),
        e
    },
    ConvertCentsToMoney: function(t) {
        var e = t.toString();
        return 1 == e.length ? e = "0.0" + e : 2 == e.length && (e = "0." + e),
        parseFloat(e)
    },
    GetGents: function(t, e, r, s) {
        for (var n = 0, i = 0; i < t.length; i++)
            if (t[i].BasePoint == e && t[i].Point == r && t[i].GamesPicked == s) {
                n = P.TcktUtils.ConvertCentsToMoney(t[i].Cents) + n;
                break
            }
        return n
    }
};
P.Tlbx = {
    init: function() {
        this.WagerTypeHandler(),
        $("div.refresh").show(),
        $("#ticket").click()
    },
    NewTmpWgrGrp: function() {
        return {
            wgrItms: []
        }
    },
    WagerTypeHandler: function() {
        var e = this;
        $("div.refresh").click(function(e) {
            $(e.currentTarget ? e.currentTarget : e.target);
            P.Ln.LoadDelta()
        }),
        P.Nfo.AttachTooltipHandler($(".toolbarTable"));
        var t = $("#contentBody").width() - 4
          , s = $(window).height() / 2 - 50
          , r = 38;
        null != $("#contentBody").offset() && (r = $("#contentBody").offset().top + r),
        $("#ticket").newWindow({
            windowTitle: P.In.slip_title,
            content: "",
            width: t,
            height: s,
            posy: r,
            resizeable: !1,
            minimizeButton: !1,
            maximizeButton: !1,
            draggable: !1,
            renderWindow: function(e) {
                P.TcktHndlr.RePaintSlip(e)
            },
            onCloseWindow: function(e) {
                P.Bskt.Tckt.isbet || (P.Bskt.Tckt.confirm = !1),
                P.TcktHndlr.SyncTicket(e)
            },
            onAjaxContentLoaded: function() {}
        }),
        $(".wagertype").click(function(t) {
            var s = $(t.currentTarget ? t.currentTarget : t.target)
              , r = P.Bskt.Tmp.wgrGrp
              , a = null
              , n = s.attr("id").replace("ALink", "")
              , i = null;
            if ("parlay" == n && P.Bskt.Tckt.wgrGrps.length > 0 ? $(".roundRobintd").hasClass("highlight") && (a = P.Bskt.Tmp.wgrGrp,
            i = "roundRobin") : "ifBet" == n && P.Bskt.Tckt.wgrGrps.length > 0 && ($(".reversetd").hasClass("highlight") && $("#reverseALink").hasClass("hide") ? (a = P.Bskt.Tmp.wgrGrp,
            i = "birdCage") : $(".reversetd").hasClass("highlight") && $("#birdCageALink").hasClass("hide") && (a = P.Bskt.Tmp.wgrGrp,
            i = "reverse")),
            $(".wagertype").each(function(e, t) {
                var s = $(t);
                s.hasClass("hide") || s.addClass("hide")
            }),
            $(".wagertypetd").each(function(e, t) {
                var s = $(t);
                s.hasClass("highlight") && s.removeClass("highlight")
            }),
            $("._wagertype").each(function(e, t) {
                var s = $(t);
                s.hasClass("hide") && s.removeClass("hide")
            }),
            P.Bskt.Tmp.wgrGrp = e.NewTmpWgrGrp(),
            $(":checkbox[checked=true]").each(function(e, t) {
                $(t).attr("checked", !1)
            }),
            P.Tlbx.promptMsg = !0,
            P.Tckt.Add(r, n),
            null != i && P.Tckt.Add(a, i),
            P.Tlbx.promptMsg)
                $.prompt(P.In.validation_duplicate_selection);
            else {
                var l = $("button#slipCancel");
                l.hasClass("hidden") || l.click(),
                e.ActivateTicket()
            }
        })
    },
    ActivateTicket: function() {
        P.TcktUtils.RenderNoOfWager(),
        void 0 != window.$windowContainer && "none" == window.$windowContainer.css("display") ? $("#ticket").click() : void 0 != window.$windowContainer && "none" != window.$windowContainer.css("display") && P.TcktHndlr.RePaintSlip($(window.$windowContainer))
    },
    PreSelectWagerSelection: function(e) {
        for (var t = P.Bskt.Tmp.wgrGrp, s = 0; s < t.wgrItms.length; s++) {
            var r = e.find(':checkbox[value="' + t.wgrItms[s].selId + '"]');
            if (r && r.length > 0) {
                r.attr("checked", !0);
                var a = $.decode(r.attr("cfg"))
                  , n = r.parents("tbody.event").children(".h2hSeq.firstline").children(".col_rotno.bdevtt")
                  , i = $.decode(n.attr("evcfg"));
                $.extend(a, i),
                "G" == a.selObj.gt && (a.selObj.lv1 = a.lv1,
                a.selObj.lv2 = a.lv2,
                a.selObj.prd = a.prd,
                a.selObj.gnum = a.gnum,
                a.seld = r.val()),
                t.wgrItms[s] = a;
                var l = a.selId;
                P.TcktHndlr.AddOrRemoveHighlight(l)
            }
        }
    },
    WagerSelectionAttachHandler: function(e) {
        var t = this;
        e.find(".oddsselection").click(function(e) {
            var s = P.Bskt.Tmp.wgrGrp.wgrItms
              , r = $(e.currentTarget ? e.currentTarget : e.target)
              , a = $.decode(r.attr("cfg"))
              , n = a.sts
              , i = r.parents("tbody.event").children(".h2hSeq.firstline").children(".col_rotno.bdevtt")
              , l = $.decode(i.attr("evcfg"));
            if ($.extend(a, l),
            "G" == a.selObj.gt && (a.selObj.lv1 = a.lv1,
            a.selObj.lv2 = a.lv2,
            a.selObj.prd = a.prd,
            a.selObj.gnum = a.gnum,
            a.seld = r.val()),
            "C" == a.selObj.gt && (a.sts = n),
            r.attr("checked")) {
                var d = !1
                  , o = (a.selObj.mkt,
                a.selId);
                P.TcktHndlr.AddOrRemoveHighlight(o);
                for (p = 0; p < s.length && !d; p++)
                    if (s[p].selId == a.selId) {
                        d = !0;
                        break
                    }
                d || s.push(a)
            } else {
                var o = a.selId
                  , c = $("#contentBody").find(':checkbox[value="' + r.val() + '"]')
                  , g = !1;
                if (c && c.length > 0)
                    for (p = 0; p < c.length && !g; p++)
                        if ($(c[p]).attr("checked")) {
                            g = !0;
                            break
                        }
                if (UnHightLightById(o),
                !g) {
                    for (var h = t.NewTmpWgrGrp(), p = 0; p < s.length; p++)
                        s[p].selId != a.selId && h.wgrItms.push(s[p]);
                    P.Bskt.Tmp.wgrGrp = h
                }
            }
            t.WagerTypeActivatorHandler()
        })
    },
    WagerTypeActivatorHandler: function() {
        $(".wagertype").each(function(e, t) {
            var s = $(t);
            s.hasClass("hide") || s.addClass("hide")
        }),
        $("._wagertype").each(function(e, t) {
            var s = $(t);
            s.hasClass("hide") && s.removeClass("hide")
        }),
        $(".wagertypetd").each(function(e, t) {
            var s = $(t);
            s.hasClass("highlight") && s.removeClass("highlight")
        });
        var e = P.WgrTypRls
          , t = P.Bskt.Tmp.wgrGrp
          , s = P.Stngs.btStngs
          , r = P.Stngs.tsrStngs;
        e.IsPassMinMaxRules.straight(t, s) && this.WagerTypeLinkActivatorHandler("straight"),
        e.IsPassNonStraightRules.event(t) && e.IsPassNonStraightRules.market(t) && e.IsPassNonStraightRules.twinOffer(t) && (e.IsPassBtStngsRules.stBaseball(t, s) && e.IsPassBtStngsRules.stHockey(t, s) && e.IsPassBtStngsRules.stQuarterParlay(t, s) && e.IsPassBtStngsRules.quarterly(t, s) && e.IsPassNonStraightNonTeaserRules.ruleNo1(t, s) && e.IsPassNonStraightNonTeaserRules.ruleNo2(t, s) && (e.IsPassMinMaxRules.parlay(t, s) && e.IsPassBtStngsRules.parlayRule(t) && this.WagerTypeLinkActivatorHandler("parlay"),
        e.IsPassMinMaxRules.roundRobin(t, s) && this.WagerTypeLinkActivatorHandler("roundRobin"),
        e.IsPassMinMaxRules.ifBet(t, s) && this.WagerTypeLinkActivatorHandler("ifBet"),
        e.IsPassMinMaxRules.reverse(t, s) && this.WagerTypeLinkActivatorHandler("reverse"),
        e.IsPassMinMaxRules.birdCage(t, s) && this.WagerTypeLinkActivatorHandler("birdCage")),
        e.Teaser.IsPassTeaserRules(t, s, r) && this.WagerTypeLinkActivatorHandler("teaser"))
    },
    WagerTypeLinkActivatorHandler: function(e) {
        $("#" + e + "ALink").removeClass("hide"),
        "birdCage" == e && ($("#_reverseALink").addClass("hide"),
        $(".reversetd").addClass("highlight")),
        $("#_" + e + "ALink").addClass("hide"),
        $("." + e + "td").addClass("highlight")
    }
};
P.WgrTypRls = {
    IsPassMinMaxRules: {
        straight: function(r, e) {
            return 0 < r.wgrItms.length
        },
        parlay: function(r, e) {
            return 1 < r.wgrItms.length && r.wgrItms.length <= e.mxPrlyPck
        },
        roundRobin: function(r, e) {
            return 2 < r.wgrItms.length && r.wgrItms.length <= e.mxRndRbnPck
        },
        ifBet: function(r, e) {
            return 1 < r.wgrItms.length && r.wgrItms.length <= e.mxIfBetPck
        },
        reverse: function(r, e) {
            return 1 < r.wgrItms.length && r.wgrItms.length <= e.mxReversePck
        },
        birdCage: function(r, e) {
            return 3 == r.wgrItms.length && r.wgrItms.length <= e.mxBirdCagePck
        }
    },
    IsPassBtStngsRules: {
        quarterly: function(r, e) {
            if (e.blkQtrPrlyFl)
                for (var t = 0; t < r.wgrItms.length; t++)
                    if (3 <= r.wgrItms[t].prd && r.wgrItms[t].prd <= 6)
                        return !1;
            return !0
        },
        parlayRule: function(r) {
            for (var e = 0; e < r.wgrItms.length; e++) {
                var t = r.wgrItms[e];
                if (("football" == t.lv1.toLowerCase() || "basketball" == t.lv1.toLowerCase()) && 3 == t.selObj.prd)
                    for (var s = 0; s < r.wgrItms.length; s++)
                        if (s != e && t.selObj.gnum == r.wgrItms[s].selObj.gnum && 3 == r.wgrItms[s].selObj.prd)
                            return !1
            }
            return !0
        },
        stBaseball: function(r, e) {
            if (e.blkStBsblFl)
                for (var t = 0; t < r.wgrItms.length; t++) {
                    var s = r.wgrItms[t];
                    if ("baseball" == s.lv1.toLowerCase())
                        for (var l = t + 1; l < r.wgrItms.length; l++) {
                            var n = r.wgrItms[l];
                            if ("baseball" == n.lv1.toLowerCase() && s.selObj.gnum == n.selObj.gnum && ("S" == s.selObj.mkt && "L" == n.selObj.mkt || "L" == s.selObj.mkt && "S" == n.selObj.mkt) && P.WgrTypRls.IsIntersectingPeriod(s.selObj.lv1, s.selObj.lv2, s.selObj.prd, n.selObj.prd))
                                return !1
                        }
                }
            return !0
        },
        stHockey: function(r, e) {
            if (e.blkStHckyFl)
                for (var t = 0; t < r.wgrItms.length; t++) {
                    var s = r.wgrItms[t];
                    if ("hockey" == s.lv1.toLowerCase())
                        for (var l = t + 1; l < r.wgrItms.length; l++) {
                            var n = r.wgrItms[l];
                            if ("hockey" == n.lv1.toLowerCase() && s.selObj.gnum == n.selObj.gnum && ("S" == s.selObj.mkt && "L" == n.selObj.mkt || "L" == s.selObj.mkt && "S" == n.selObj.mkt) && P.WgrTypRls.IsIntersectingPeriod(s.selObj.lv1, s.selObj.lv2, s.selObj.prd, n.selObj.prd))
                                return !1
                        }
                }
            return !0
        },
        stQuarterParlay: function(r, e) {
            if (e.blkStQtrPrlyFl)
                for (var t = 0; t < r.wgrItms.length; t++)
                    for (var s = r.wgrItms[t], l = t + 1; l < r.wgrItms.length; l++) {
                        var n = r.wgrItms[l];
                        if (s.selObj.gnum == n.selObj.gnum && 3 <= s.selObj.prd && s.selObj.prd <= 6 && 3 <= n.selObj.prd && n.selObj.prd <= 6 && s.selObj.prd == n.selObj.prd && ("S" == s.selObj.mkt && "L" == n.selObj.mkt || "L" == s.selObj.mkt && "S" == n.selObj.mkt))
                            return !1
                    }
            return !0
        }
    },
    IsPassNonStraightRules: {
        event: function(r) {
            for (var e = !0, t = 0; t < r.wgrItms.length && e; t++) {
                var s = r.wgrItms[t];
                if ("D" == s.prlres) {
                    e = !1;
                    break
                }
                if ("A" != s.prlres && "S" == s.prlres)
                    for (var l = t + 1; l < r.wgrItms.length && e; l++)
                        if (s.selObj.gnum == r.wgrItms[l].selObj.gnum) {
                            e = !1;
                            break
                        }
            }
            return e
        },
        market: function(r) {
            for (var e = !0, t = 0; t < r.wgrItms.length && e; t++) {
                var s = r.wgrItms[t];
                if ("G" != s.selObj.gt || "S" != s.selObj.mkt && "M" != s.selObj.mkt && "L" != s.selObj.mkt) {
                    e = !1;
                    break
                }
            }
            return e
        },
        twinOffer: function(r) {
            for (var e = !0, t = 0; t < r.wgrItms.length && e; t++) {
                var s = r.wgrItms[t];
                if (P.TcktUtils.IsTwinOffer(s.horg)) {
                    e = !1;
                    break
                }
            }
            return e
        }
    },
    IsPassNonStraightNonTeaserRules: {
        ruleNo1: function(r) {
            for (var e = 0; e < r.wgrItms.length; e++)
                for (var t = r.wgrItms[e], s = e + 1; s < r.wgrItms.length; s++) {
                    var l = r.wgrItms[s];
                    if (t.selObj.gnum == l.selObj.gnum && t.selObj.mkt == l.selObj.mkt && P.WgrTypRls.IsIntersectingPeriod(t.selObj.lv1, t.selObj.lv2, t.selObj.prd, l.selObj.prd))
                        return !1
                }
            return !0
        },
        ruleNo2: function(r) {
            for (var e = 0; e < r.wgrItms.length; e++)
                for (var t = r.wgrItms[e], s = e + 1; s < r.wgrItms.length; s++) {
                    var l = r.wgrItms[s];
                    if (t.selObj.gnum == l.selObj.gnum && ("S" == t.selObj.mkt && "M" == l.selObj.mkt || "M" == t.selObj.mkt && "S" == l.selObj.mkt) && P.WgrTypRls.IsIntersectingPeriod(t.selObj.lv1, t.selObj.lv2, t.selObj.prd, l.selObj.prd))
                        return !1
                }
            return !0
        }
    },
    Teaser: {
        IsPassTeaserRules: function(r, e, t) {
            for (var s = this.FindEligibleTeasers(r, e, t), l = null != s && 0 < s.length, n = 0; n < r.wgrItms.length && l; n++)
                "G" == r.wgrItms[n].selObj.gt && 0 != r.wgrItms[n].selObj.prd && (l = !1);
            return l
        },
        FilterSuperTeaser: function(r, e, t, s) {
            if (null != r && 0 != r.length && !P.WgrTypRls.Teaser.DenySameEventRule(e))
                for (var l = 0; l < r.length; l++) {
                    var n = r[l];
                    "BLS FT 21 Pts TEASER" != n.cd && "BLS FT 21 PTS TRS" != n.cd || (r.splice(l, 1),
                    l--)
                }
        },
        FilterSpTeaserMaxTotalsRuleFlag: function(r, e, t, s) {
            if (null != r && 0 != r.length && t.tsrMxTtlRlFl && this.IsTotalMoreThanOthers(e))
                for (var l = 0; l < r.length; l++) {
                    r[l].cd.startsWith("SP") && (r.splice(l, 1),
                    l--)
                }
        },
        IsTotalMoreThanOthers: function(r) {
            for (var e = 0, t = 0; t < r.wgrItms.length; t++)
                "L" == r.wgrItms[t].selObj.mkt && e++;
            return e > Math.floor(r.wgrItms.length / 2)
        },
        DenySameEventRule: function(r) {
            for (var e = !0, t = 0; t < r.wgrItms.length && e; t++)
                for (var s = r.wgrItms[t], l = t + 1; l < r.wgrItms.length && e; l++)
                    if (s.selObj.gnum == r.wgrItms[l].selObj.gnum) {
                        e = !1;
                        break
                    }
            return e
        },
        FindEligibleTeasers: function(r, e, t) {
            var s = null;
            if (r.wgrItms.length <= 1 || r.wgrItms.length > e.mxTsrPck)
                return s;
            for (var l = 0; l < r.wgrItms.length; l++) {
                var n = r.wgrItms[l]
                  , g = n.selObj.lv1 + "_" + n.selObj.lv2 + "_" + n.selObj.mkt;
                if (null == (s = null != t.conf[g] ? null == s ? t.conf[g] : s.intersection(t.conf[g]) : null) || s.length <= 0)
                    break
            }
            if (null != s && 0 < s.length) {
                for (var a = new Array, l = 0; l < s.length; l++)
                    r.wgrItms.length >= t.tsr[s[l]].min && r.wgrItms.length <= t.tsr[s[l]].max && a.push(t.tsr[s[l]]);
                s = a
            }
            return this.FilterSpTeaserMaxTotalsRuleFlag(s, r, e, t),
            this.FilterSuperTeaser(s, r, e, t),
            s
        }
    },
    IsEligibleForFreePlay: function(r, e) {
        for (var t = !1, s = P.Stngs.freePlyStngs, l = 0; l < r.wgrGrps.length && !t; l++) {
            var n = r.wgrGrps[l];
            if ("straight" == n.wgrType) {
                (null == e || "upselchoice" == e.type) && (n.nbl || (t = !0)),
                null != s.wagerType[n.wgrType] && null != s.wagerType[n.wgrType] || (t = !0);
                for (var g = 0; g < n.wgrs.length && !t; g++) {
                    var a = n.wgrs[g];
                    if (null != e && a.intId == e.intId) {
                        if (!a.nbl)
                            continue;
                        null != s.wagerType[a.wgrType] && null != s.wagerType[a.wgrType] || (t = !0);
                        for (var u = 0; u < a.wgrItms.length && !t; u++) {
                            "G" != a.wgrItms[u].selObj.gt && (t = !0)
                        }
                    }
                }
            }
        }
        return !t
    },
    SportIsPermitted: function(r) {
        if ("straight" == r.wgrType) {
            var e = r.wgrItms[0]
              , t = e.lv1.toLowerCase()
              , s = e.lv2.toUpperCase()
              , l = e.selObj.mkt;
            switch (t) {
            case "basketball":
            case "football":
            case "soccer":
            case "2022 world cup":
                if (e.aorg <= 125 && ("S" == l || "L" == l))
                    return !0;
                break;
            case "baseball":
            case "hockey":
                if ("M" == l && e.aorg <= 125)
                    return !0;
                if ("L" == l && e.aorg <= 125)
                    return !0;
                break;
            case "golf":
                if (e.aorg <= 125 && "M" == l)
                    return !0;
                break;
            case "tennis":
                if (e.aorg <= 125 && ("S" == l || "L" == l))
                    return !0;
                break;
            case "martial arts":
                switch (s) {
                case "MMA":
                    if ("M" == l && e.aorg <= 125 && -200 <= e.aorg)
                        return !0
                }
                break;
            case "boxing":
                if ("M" == l && e.aorg <= 125 && -200 <= e.aorg)
                    return !0;
                break;
            case "auto racing":
                switch (s) {
                case "NASCAR":
                    if (e.aorg <= 125 && "M" == l)
                        return !0
                }
                break;
            default:
                return !1
            }
        }
        return !1
    },
    IsIntersectingPeriod: function(r, e, t, s) {
        var l = P.Stngs.intrsctStngs;
        return t == s || (null == l[r] || null == l[r][e] || null != l[r][e][t + ""] && null != l[r][e][t + ""][s + ""])
    }
};
$(document).ready(function() {
    if (P.Url.IsCash != "False") {
        setTimeout("SetSurveyLinks();", 100)
    }
});
function SetSurveyLinks() {
    $("button").click(function() {
        survey = false
    });
    $("input").click(function() {
        survey = false
    });
    $("a").click(function() {
        survey = false
    });
    surveyLinksSet = true
}
var survey = true;
var surveyLinksSet = false;
window.onbeforeunload = function() {}
;
function UserNameBlur() {
    IsNotLogin() && "" == this.value && (this.value = "Username or Email...")
}
function UserNameFocus() {
    IsNotLogin() && "Username or Email..." == this.value && (this.value = "")
}
function PasswordFocus() {
    if (IsNotLogin() && "text" == this.type && "Password..." == this.value) {
        var s = replaceT(this, "password");
        s.value = "",
        $("#password").bind("focus", PasswordFocus),
        $("#password").bind("blur", PasswordBlur),
        $("#password").focus && setTimeout("$('#password').focus();", 2),
        $("#password").hasClass("txtBox") || $("#password").addClass("txtBox")
    }
}
function PasswordBlur() {
    if (IsNotLogin()) {
        if ("" != this.value && "Password..." != this.value || "password" != this.type)
            "" == this.value && ($("#password").value = "Password...");
        else {
            var s = replaceT(this, "text");
            s.value = "Password...",
            $("#password").bind("focus", PasswordFocus),
            $("#password").bind("blur", PasswordBlur)
        }
        $("#password").hasClass("txtBox") || $("#password").addClass("txtBox")
    }
}
function IsNotLogin() {
    return -1 == window.location.toString().toLowerCase().indexOf("login")
}
function replaceT(s, e) {
    var t = document.createElement("input");
    return t.setAttribute("type", e),
    t.setAttribute("name", s.getAttribute("name")),
    t.setAttribute("id", s.getAttribute("id")),
    t.setAttribute("value", s.getAttribute("value")),
    t.setAttribute("class", s.getAttribute("class")),
    s.parentNode.replaceChild(t, s),
    t
}
function SetupLogin() {
    try {
        void 0 != UserNameFocus && $("#username").focus(UserNameFocus),
        void 0 != UserNameBlur && $("#username").blur(UserNameBlur),
        void 0 != PasswordFocus && $("#password").focus(PasswordFocus),
        void 0 != PasswordBlur && $("#password").blur(PasswordBlur)
    } catch (s) {}
    $("#loginform").submit(function() {
        var s = $.trim($("#username").val())
          , e = $.trim($("#password").val());
        return "" == s || "" == e || "Username or Email..." == $("#username").val() || "Password..." == $("#password").val() ? ($.prompt("Please key in username & password"),
        !1) : !0
    })
}
function SetupRefreshAccountBalance(s) {
    setInterval("updateCustomerBalance()", s)
}
Pan.Casino = {
    launchCasinoGamePopup: function(b, c) {
        $("#sportsbookBody").mask();
        var a = $("#_view_state").attr("value");
        $.get(P.Url.RootUrl + "/casino/get-game-url?extGameid=" + b + "&providerId=" + c + "&bonusAccountId=1&vs=" + a, function(g) {
            var e = g.replace('"', "");
            var f = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=800,height=600";
            var d = window.open(e.substring(0, e.length - 1), "BetOnline", f);
            $("#sportsbookBody").unmask()
        })
    }
};
P.LiveBetting = {
    Init: function() {
        $(".get-score-button").click(function() {
            $.post(P.Url.BaseballLiveScores, "gameNum=" + $(this).attr("gnum"), function(e) {
                if (e.length > 2) {
                    $("#scoreboard-dialog").html(e);
                    for (var s = $("#baseball-score-numInnings").val(), a = 350, l = 186, o = 320, n = 9; s > n; n++)
                        a += 15,
                        l += 15,
                        o += 15;
                    var r = 0;
                    $(".score-table-team-name").each(function() {
                        var e = $(this).html();
                        e.length > r && (r = e.length)
                    });
                    var d = 120;
                    if (r > 22)
                        for (var n = 22; r > n; n++)
                            d += 5;
                    d > 120 && ($(".score-table-team-name").css("width", d),
                    a += d - 120,
                    l += d - 120,
                    o += d - 120),
                    $("#baseball-scoreboard").css("width", a),
                    $("#baseball-scoreboard-top").css("width", a),
                    $("#baseball-scoreboard-center").css("width", a),
                    $("#baseball-scoreboard-down").css("width", a),
                    $("#baseball-wrapper").css("width", a),
                    $("#table-scoreboard").css("width", o),
                    $("#baseball-inning").css("margin-left", l),
                    $("#baseball-inning-center").css("width", o),
                    $("#scoreboard-dialog").dialog("option", "width", a + 35),
                    $("#scoreboard-dialog").dialog("option", "height", 167),
                    $("#scoreboard-dialog").dialog("open")
                }
            })
        }),
        $("#scoreboard-dialog").dialog({
            autoOpen: !1
        })
    }
};
function leagueExpandToggle(e) {
    $sender = $(e),
    $sender.hasClass("collapsed") ? ($sender.removeClass("collapsed"),
    $sender.siblings("ul.game").show()) : ($sender.addClass("collapsed"),
    $sender.siblings("ul.game").hide())
}
function sportExpandToggle(e) {
    $sender = $(e),
    $sender.hasClass("collapsed") ? ($sender.removeClass("collapsed"),
    $sender.siblings("ul.league").show()) : ($sender.addClass("collapsed"),
    $sender.siblings("ul.league").hide())
}
function mouseOver(e) {
    $(e).addClass("over")
}
function mouseOut(e) {
    $(e).removeClass("over")
}
P.WagerReport = {
    init: function() {
        $("#wager-report-dialog").dialog({
            autoOpen: false
        });
        $("#wager-report-dialog").bind("dialogclose", function(a) {
            $("#wager-report-dialog").html("")
        });
        $("#view-pending-wagers").click(function() {
            P.WagerReport.disableEnabledQueryButtons(false);
            $.get(P.Url.RetrievePendingWagers, function(a) {
                $("#wager-report-dialog").dialog("option", "width", 750);
                $("#wager-report-dialog").dialog("option", "height", 650);
                $("#wager-report-dialog").dialog("option", "draggable", true);
                $("#wager-report-dialog").dialog("option", "resizable", false);
                $("#wager-report-dialog").html(a);
                $("#wager-report-dialog").dialog("open");
                P.WagerReport.attachTicketDetailHandler();
                P.WagerReport.disableEnabledQueryButtons(true)
            })
        });
        $("#view-graded-wagers").click(function() {
            P.WagerReport.disableEnabledQueryButtons(false);
            $.get(P.Url.RetrieveGradedWagers, function(a) {
                $("#wager-report-dialog").dialog("option", "width", 750);
                $("#wager-report-dialog").dialog("option", "height", 650);
                $("#wager-report-dialog").dialog("option", "draggable", true);
                $("#wager-report-dialog").dialog("option", "resizable", false);
                $("#wager-report-dialog").html(a);
                $("#wager-report-dialog").dialog("open");
                $("#wager-report-from-date").datepicker();
                $("#wager-report-to-date").datepicker();
                $("#wager-report-from-date").blur();
                P.WagerReport.disableEnabledQueryButtons(true);
                P.WagerReport.attachSubmitReportHandler()
            })
        })
    },
    attachTicketDetailHandler: function() {
        $(".wager-ticket-link").click(function() {
            var b = this;
            var e = $(b).attr("id");
            var a = e.substring(7, e.length);
            var d = "#wager-detail-" + a;
            if ($(d).html().length > 2) {
                var c = $(d).css("display");
                if (c == "none") {
                    $(d).show()
                } else {
                    $(d).hide()
                }
            } else {
                $.post(P.Url.RetrieveWagerDetails, "wagerIdentifier=" + a, function(f) {
                    $(d).html(f);
                    $(d).show()
                })
            }
        })
    },
    disableEnabledQueryButtons: function(a) {
        if (a == false) {
            $("#view-graded-wagers").html("Loading...");
            $("#view-pending-wagers").html("Loading...");
            $("#wager-report-submit").html("Loading...");
            $("#view-graded-wagers").attr("disabled", "disabled");
            $("#view-pending-wagers").attr("disabled", "disabled");
            $("#wager-report-submit").attr("disabled", "disabled")
        } else {
            $("#view-graded-wagers").removeAttr("disabled");
            $("#view-pending-wagers").removeAttr("disabled");
            $("#wager-report-submit").removeAttr("disabled");
            $("#view-graded-wagers").html("Graded Wagers");
            $("#view-pending-wagers").html("Pending Wagers");
            $("#wager-report-submit").html("Get Wagers")
        }
    },
    attachSubmitReportHandler: function() {
        $("#wager-report-submit").click(function() {
            var b = $("#wager-report-type").val();
            var d = P.Url.RetrievePendingWagers;
            var a = "";
            var c = false;
            if (b == "Graded" && ($("#wager-report-from-date").val() == "" || undefined) || ($("#wager-report-to-date").val() == "" || undefined)) {
                alert("Please enter a valid date range");
                c = true
            } else {
                if (b == "Graded") {
                    d = P.Url.RetrieveGradedWagers;
                    a = "fromDate=" + $("#wager-report-from-date").val() + "&toDate=" + $("#wager-report-to-date").val()
                }
            }
            if (c == false) {
                P.WagerReport.disableEnabledQueryButtons(false);
                $.post(d, a, function(e) {
                    $("#wager-list-container").html(e);
                    P.WagerReport.disableEnabledQueryButtons(true);
                    P.WagerReport.attachTicketDetailHandler()
                })
            }
        })
    }
};
P.Poker = {
    init: function() {
        $("#launch-poker-cashier").click(function() {
            P.Poker.launchPokerCashier()
        })
    },
    launchPokerCashier: function() {
        var g = $("#_view_state").val();
        var e = P.Stngs.pkrStngs.pkrUser;
        var d = P.Stngs.pkrStngs.pkrSesh;
        var f = P.Stngs.pkrStngs.pkrProvider;
        var c = P.Url.PokerCashier;
        c = c + "?vs=" + g + "&uid=" + e + "&sid=" + d + "&provider=" + f;
        var b = "menubar=no,width=450,height=370,toolbar=no,location=no,titlebar=no,resizable=no,scrollbars=no,status=no";
        var a = window.open(c, "", b)
    }
};
function gaSSDSLoad(e) {
    var c = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."), b, a;
    a = document.createElement("script");
    a.src = c + "google-analytics.com/ga.js";
    a.type = "text/javascript";
    a.async = true;
    a.onloadDone = false;
    function d() {
        b = _gat._getTracker(e);
        b._trackPageview()
    }
    a.onload = function() {
        a.onloadDone = true;
        d()
    }
    ;
    a.onreadystatechange = function() {
        if (("loaded" === a.readyState || "complete" === a.readyState) && !a.onloadDone) {
            a.onloadDone = true;
            d()
        }
    }
    ;
    document.getElementsByTagName("head")[0].appendChild(a)
}
;var path = ""
  , domain = ""
  , userId = ""
  , widgetPath = ""
  , widgetDomain = ""
  , sportsbook = ""
  , jwtToken = "";
P.Pp = {
    init: function() {},
    HidePlayerProps: function() {
        $("#center").show(),
        $("#rightTop").show(),
        $(".scroller").css("background", "#fff"),
        $(".clearfix").css("background", "#fff"),
        "True" == $("#IsAuthenticated").val() && ($("#MainBjDiv").show(),
        $("#miniLiveBetting").show()),
        $("#playerPropsFrame").hide(),
        P.Pp.SaveCookie(!1)
    },
    LoadPlayerProps: function() {
        try {
            function e(e) {
                e.origin === domain && (console.log(e.data),
                "ds:ready" == (e = e.data) && "" != $("#PlayerPropLinktoken").val() || "ds::login" == e[1] ? P.Pp.SendMessageLogin("pp") : "ds:scroll:toTop" == e ? P.Pp.ScrollTop() : 15 < e.length && P.Pp.SaveJSON(e))
            }
            P.Pp.GetUrl(),
            window.removeEventListener("message", e, !1),
            window.addEventListener("message", e, !1),
            window.history.pushState("", "", "/sportsbook/player-props"),
            P.Pp.SaveCookie(!0),
            P.Ln.ClearAllChecked(),
            P.Ln.ClearAllSelected(),
            $("#center").css("display", "none"),
            $("#rightTop").css("display", "none"),
            $("#sportSimsFrame").css("display", "none"),
            $(".scroller").css("background", "transparent"),
            $(".clearfix").css("background", "transparent"),
            $("#sportSimsFrame").remove(),
            "True" == $("#IsAuthenticated").val() ? (document.cookie = "tabsLoginRedirect=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",
            $("#MainBjDiv").css("display", "none"),
            $("#miniLiveBetting").css("display", "none"),
            "" == $("#PlayerPropLinktoken").val() ? $.getJSON(P.Url.GetPlayerPropsSession, function(e) {
                e.response && ($("#PlayerPropLinktoken").val(e.tokenOrig),
                userId = e.user,
                jwtToken = e.token,
                0 == $("#playerPropsFrame").length ? ($("#left").parent().append("<div id='playerPropsFrame'></div>"),
                $("#playerPropsFrame").append("<iframe style='display: block; width: 1040px; height: 825px; overflow: scroll;' src=" + P.Pp.path + "&jwtToken=" + jwtToken + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#playerPropsFrame").show())
            }) : 0 == $("#playerPropsFrame").length ? ($("#left").parent().append("<div id='playerPropsFrame'></div>"),
            $("#playerPropsFrame").append("<iframe style='display: block; width: 1040px; height: 825px; overflow: scroll;' src=" + P.Pp.path + "&jwtToken=" + jwtToken + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#playerPropsFrame").show()) : (saveTab("sportsbook/player-props"),
            0 == $("#playerPropsFrame").length ? ($("#left").parent().append("<div id='playerPropsFrame'></div>"),
            $("#playerPropsFrame").append("<iframe style='display: block; width: 1040px; height: 825px; overflow: scroll;' src=" + P.Pp.path + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#playerPropsFrame").show())
        } catch (e) {
            console.log(e)
        }
    },
    SendMessageLogin: function(e, r) {
        try {
            "True" == $("#IsAuthenticated").val() ? "pp" == e ? document.getElementsByName("builder")[0].contentWindow.postMessage("ds:login:" + userId + ":" + $("#token").val() + ":USD", P.Pp.path) : document.getElementById("builder" + r).contentWindow.window.postMessage(["response", "ds::" + r + "::login", "authorization", {
                username: userId,
                password: $("#token").val(),
                currency: "USD"
            }], "*") : (window.location.assign("/login"),
            $.prompt(P.In.not_logged_in),
            $("#playerPropsFrame").unmask())
        } catch (e) {
            console.log(e)
        }
    },
    ScrollTop: function() {
        try {
            $("html").animate({
                scrollTop: "0px"
            })
        } catch (e) {
            console.log(e)
        }
    },
    SaveJSON: function(e) {
        try {
            console.log("SaveJSON in progress: " + e)
        } catch (e) {
            console.log(e)
        }
    },
    SaveCookie: function(e) {
        var r = new Date;
        r.setTime(r.getTime() + 6e5);
        r = "expires=" + r.toUTCString();
        document.cookie = "PlayerPropsIsActive=" + e + ";" + r + "; Path=/;"
    },
    GetUrl: function(e) {
        $.ajax({
            url: P.Url.GetUrlIframePlayerProps,
            dataType: "json",
            async: !1,
            success: function(e) {
                e && (P.Pp.path = e.urlIframe,
                domain = e.urlDomain,
                sportsbook = e.sportsbook)
            }
        })
    },
    LoadDstWidgetProps: function(e, r) {
        P.Pp.GetUrl();
        var a = e.$trgt[0].id;
        widgetPath = domain + "/widgets?event=" + a + "&sb=" + sportsbook + "&widget=" + e.$trgt[0].id,
        window.addEventListener("message", function(e) {
            if (e.origin !== domain)
                return;
            var r = ""
              , o = e.data[1].split("::");
            "height" == o[2] && (r = e.data[3],
            e = "builder" + o[1],
            $("#" + e).css("height", r));
            "ready" == o[2] && "" != $("#token").val() && P.Pp.SendMessageLogin("wdg", a)
        }, !1),
        1 == e.rqData.ismapped && ("True" == $("#IsAuthenticated").val() ? "" == jwtToken ? $.getJSON(P.Url.GetPlayerPropsSession, {
            isWidgetRequest: !0
        }, function(e) {
            e.response && ($("#token").val(e.tokenOrig),
            jwtToken = e.token,
            userId = e.user,
            0 == $("#iframeWidget").length && (widgetPath = widgetPath + "&jwtToken=" + e.token,
            r.find("#playerPropsEvent").append("<div id='iframeWidget'><iframe style='display: block; width: 100%; overflow: scroll;' src=" + widgetPath + " id='builder" + a + "' name='builder' frameborder='0'></iframe></div>"),
            P.Ln.PlayerPropsWidgetArray.push(a)),
            $("#builder" + a)[0].contentWindow.postMessage(["response", "ds::" + a + "::login", "authorization", {
                username: userId,
                password: $("#token").val(),
                currency: "USD"
            }]))
        }) : (widgetPath = widgetPath + "&jwtToken=" + jwtToken,
        r.find("#playerPropsEvent").append("<div id='iframeWidget'><iframe style='display: block; width: 100%; overflow: scroll;' src=" + widgetPath + " id='builder" + a + "' name='builder' frameborder='0'></iframe></div>"),
        P.Ln.PlayerPropsWidgetArray.push(a)) : r.find("#playerPropsEvent").append("<div id='iframeWidget'><iframe style='display: block; width: 100%; overflow: scroll;' src=" + widgetPath + " id='builder" + a + "'  name='builder' frameborder='0'></iframe></div>"))
    }
},
$(document).ready(function() {
    0 <= document.location.href.indexOf("sportsbook/player-props") && ($.ajaxSetup({
        cache: !1
    }),
    P.Pp.LoadPlayerProps())
});
var widgetPath = ""
  , widgetDomain = ""
  , jwtToken = ""
  , path = ""
  , domain = ""
  , userId = ""
  , sportsbook = "";
P.Ss = {
    init: function() {},
    HideSportSims: function() {
        $("#center").show(),
        $("#rightTop").show(),
        "True" == $("#IsAuthenticated").val() && ($("#MainBjDiv").show(),
        $("#miniLiveBetting").show()),
        $("#sportSimsFrame").hide(),
        P.Ss.SaveCookie(!1)
    },
    LoadSportSims: function() {
        try {
            function e(e) {
                e.origin === P.Ss.domain && (console.log(e.data),
                "ds:ready" == (e = e.data) && "" != $("#token").val() || "ds:login" == e ? P.Ss.SendMessageLogin() : "ds:scroll:toTop" == e ? P.Ss.ScrollTop() : 15 < e.length && P.Ss.SaveJSON(e))
            }
            P.Ss.GetUrl(),
            window.removeEventListener("message", e, !1),
            window.addEventListener("message", e, !1),
            window.history.pushState("", "", "/sportsbook/game-sims"),
            P.Ss.SaveCookie(!0),
            P.Ln.ClearAllChecked(),
            P.Ln.ClearAllSelected(),
            $("#center").css("display", "none"),
            $("#rightTop").css("display", "none"),
            $("#playerPropsFrame").css("display", "none"),
            $("#playerPropsFrame").remove(),
            "True" == $("#IsAuthenticated").val() ? (document.cookie = "tabsLoginRedirect=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",
            $("#MainBjDiv").css("display", "none"),
            $("#miniLiveBetting").css("display", "none"),
            "" == $("#token").val() ? $.getJSON(P.Url.CreateSessionPlayerProps, function(e) {
                e.response && ($("#token").val(e.tokenOrig),
                P.Pp.userId = e.user,
                jwtToken = e.token,
                0 == $("#sportSimsFrame").length ? ($("#left").parent().append("<div id='sportSimsFrame'></div>"),
                $("#sportSimsFrame").append("<iframe style='width: 1010px; height: 825px; padding: 5px 5px 5px 0; float: left;' src=" + P.Ss.path + "&jwtToken=" + jwtToken + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#sportSimsFrame").show())
            }) : 0 == $("#sportSimsFrame").length ? ($("#left").parent().append("<div id='sportSimsFrame'></div>"),
            $("#sportSimsFrame").append("<iframe style='width: 1010px; height: 825px; padding: 5px 5px 5px 0; float: left;' src=" + P.Ss.path + "&jwtToken=" + jwtToken + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#sportSimsFrame").show()) : 0 == $("#sportSimsFrame").length ? ($("#left").parent().append("<div id='sportSimsFrame'></div>"),
            $("#sportSimsFrame").append("<iframe style='width: 1010px; height: 825px; padding: 5px 5px 5px 0; float: left;' src=" + P.Ss.path + " id='builder' name='builder' frameborder='0'></iframe>")) : $("#sportSimsFrame").show()
        } catch (e) {
            console.log(e)
        }
    },
    SendMessageLogin: function() {
        try {
            "True" == $("#IsAuthenticated").val() ? document.getElementsByName("builder")[0].contentWindow.postMessage("ds:login:" + P.Pp.userId + ":" + $("#token").val() + ":USD", P.Ss.path) : ($.prompt(P.In.not_logged_in),
            $("#sportSimsFrame").unmask())
        } catch (e) {
            console.log(e)
        }
    },
    ScrollTop: function() {
        try {
            $("html").animate({
                scrollTop: "0px"
            })
        } catch (e) {
            console.log(e)
        }
    },
    SaveJSON: function(e) {
        try {
            console.log("SaveJSON in progress: " + e)
        } catch (e) {
            console.log(e)
        }
    },
    SaveCookie: function(e) {
        var o = new Date;
        o.setTime(o.getTime() + 6e5);
        o = "expires=" + o.toUTCString();
        document.cookie = "SportSimsIsActive=" + e + ";" + o + "; Path=/;"
    },
    GetUrl: function(e) {
        $.ajax({
            url: P.Url.GetUrlIframeSportSims,
            dataType: "json",
            async: !1,
            success: function(e) {
                e && (P.Ss.path = e.urlIframe,
                P.Ss.domain = e.urlDomain,
                sportsbook = e.sportsbook)
            }
        })
    }
},
$(document).ready(function() {
    0 <= document.location.href.indexOf("sportsbook/game-sims") && P.Ss.LoadSportSims()
});
