$(document).ready(function () {

    if (window.location.pathname == "/betonline-racebook-banners") {
        return;
    }

    function openLivePerson(e) {
        e.preventDefault(); // For not go to top the window
        $('[id^=LPMcontainer]').click();
    }
    $(".vocalcomChat").parent().append("<div id='chatliveimg'>&nbsp;</div>");
    $(".vocalcomChat").attr("href", "#");
    $(".vocalcomChat").click(openLivePerson);
    $(".vocalcomChat").removeClass("vocalcomChat");
    $(".live_support").remove();
    try { $('[alt^=Live Support]').remove(); } catch (e) { }
    $('[href*=liveperson]').removeAttr("onclick");
    $('[href*=liveperson]').click(openLivePerson);
    $('[href*=liveperson]').attr("href", "#");

    // For banking page
    $(".buttonLiveChat").parent().append("<div style='display:none' id='chatliveimg'>&nbsp;</div>");
    $(".buttonLiveChat").attr("href", "#");
    $(".buttonLiveChat").click(openLivePerson);
    // END LIVE PERSON JQUERY

    // BEGIN LivePerson Monitor.
    window.lpTag = window.lpTag || {}, "undefined" == typeof window.lpTag._tagCount ? (window.lpTag = { site: '90263191' || "", section: lpTag.section || "", tagletSection: lpTag.tagletSection || null, autoStart: lpTag.autoStart !== !1, ovr: lpTag.ovr || {}, _v: "1.8.0", _tagCount: 1, protocol: "https:", events: { bind: function (t, e, i) { lpTag.defer(function () { lpTag.events.bind(t, e, i) }, 0) }, trigger: function (t, e, i) { lpTag.defer(function () { lpTag.events.trigger(t, e, i) }, 1) } }, defer: function (t, e) { 0 == e ? (this._defB = this._defB || [], this._defB.push(t)) : 1 == e ? (this._defT = this._defT || [], this._defT.push(t)) : (this._defL = this._defL || [], this._defL.push(t)) }, load: function (t, e, i) { var n = this; setTimeout(function () { n._load(t, e, i) }, 0) }, _load: function (t, e, i) { var n = t; t || (n = this.protocol + "//" + (this.ovr && this.ovr.domain ? this.ovr.domain : "lptag.liveperson.net") + "/tag/tag.js?site=" + this.site); var a = document.createElement("script"); a.setAttribute("charset", e ? e : "UTF-8"), i && a.setAttribute("id", i), a.setAttribute("src", n), document.getElementsByTagName("head").item(0).appendChild(a) }, init: function () { this._timing = this._timing || {}, this._timing.start = (new Date).getTime(); var t = this; window.attachEvent ? window.attachEvent("onload", function () { t._domReady("domReady") }) : (window.addEventListener("DOMContentLoaded", function () { t._domReady("contReady") }, !1), window.addEventListener("load", function () { t._domReady("domReady") }, !1)), "undefined" == typeof window._lptStop && this.load() }, start: function () { this.autoStart = !0 }, _domReady: function (t) { this.isDom || (this.isDom = !0, this.events.trigger("LPT", "DOM_READY", { t: t })), this._timing[t] = (new Date).getTime() }, vars: lpTag.vars || [], dbs: lpTag.dbs || [], ctn: lpTag.ctn || [], sdes: lpTag.sdes || [], hooks: lpTag.hooks || [], ev: lpTag.ev || [] }, lpTag.init()) : window.lpTag._tagCount += 1;
    //<!-- END LivePerson Monitor. -->

    // SECTION
    if (window.location.pathname == "/come-back-soon") {
        window.lpTag.section = {};
    }
    else if ($("#visitorInfoLP-username").length > 0) {
        window.lpTag.section = ["section-engagement-attr-liveperson-bol"] || {};
        //lpTag.sdes.push({"type": "ctmrinfo", "info": { "userName": $("#visitorInfoLP-username").text(),"customerId": $("#visitorInfoLP-customerID").text()}});                                              
    }
    else {
        window.lpTag.section = ["section-engagement-attr-liveperson-logged-out-bol"] || {};
    }

    function createSurveyCookie(cookieName, result) {
        var date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        var expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + result.toString() + ";" + expires + "; Path=/;";
    }

    if (document.cookie.indexOf('DD-LINK-NAREDIRECT') >= 0) {
        if (document.cookie.indexOf('SHOWSURVEY') < 0) {
            lpTag.sdes = lpTag.sdes || [];
            lpTag.sdes.push({ "type": "error", "error": { "message": "Redirecting to classic BOL", "code": "activateSurvey" } });
            createSurveyCookie("SHOWSURVEY", true);
        }
    }
});