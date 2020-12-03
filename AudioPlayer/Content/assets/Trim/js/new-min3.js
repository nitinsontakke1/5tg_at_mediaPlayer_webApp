function htmlEncode(a) {
    return jQuery("<div/>").text(a).html();
}
function htmlDecode(a) {
    return jQuery("<div/>").html(arg).text();
}
function is_ios() {
    return navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPod") != -1 || navigator.platform.indexOf("iPad") != -1;
}
function is_android() {
    var a = navigator.userAgent.toLowerCase();
    return a.indexOf("android") > -1;
}
function is_ie() {
    return navigator.appVersion.indexOf("MSIE") != -1;
}
function is_firefox() {
    return navigator.userAgent.indexOf("Firefox") != -1;
}
function is_opera() {
    return navigator.userAgent.indexOf("Opera") != -1;
}
function is_chrome() {
    return navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
}
function is_safari() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
}
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1]);
}
function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var a = new Number(RegExp.$1);
        return a;
    }
}
function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var a = new Number(RegExp.$1);
        return a;
    }
}
function is_ie8() {
    return !!(is_ie() && version_ie() < 9);
}
function is_ie9() {
    return !(!is_ie() || 9 != version_ie());
}
function can_play_mp3() {
    debugger;
    var a = document.createElement("audio");
    return !(!a.canPlayType || !a.canPlayType("audio/mpeg;").replace(/yes/, ""));
}
function formatTime(a) {
    var b = Math.round(a),
        c = 0;
    if (b > 0) {
        for (; b > 59;) c++, (b -= 60);
        return String((c < 10 ? "0" : "") + c + ":" + (b < 10 ? "0" : "") + b);
    }
    return "00:00";
}
var dzsap_list = [],
    dzsap_ytapiloaded = !1,
    dzsap_globalidind = 20,
    dzsap_list_for_sync_players = [],
    dzsap_list_for_sync_sw_build = !1,
    dzsap_list_for_sync_inter_build = 0;
(window.dzsap_audio_ctx = null),
    (window.dzsap_self_options = {}),
    (window.dzsap_generating_pcm = !1),
    (window.dzsap_player_index = 0),
    (function ($) {
        function hexToRgb(a, b) {
            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),
                d = "";
            if (c) {
                c = { r: parseInt(c[1], 16), g: parseInt(c[2], 16), b: parseInt(c[3], 16) };
                var e = 1;
                b && (e = b), (d = "rgba(" + c.r + "," + c.g + "," + c.b + "," + e + ")");
            }
            return d;
        }
        (window.dzsap_list_for_sync_build = function () { }),
            ($.fn.prependOnce = function (a, b) {
                var c = $(this);
                if ("undefined" == typeof b) {
                    var d = new RegExp('class="(.*?)"'),
                        e = d.exec(a);
                    "undefined" != typeof e[1] && (b = "." + e[1]);
                }
                return c.children(b).length < 1 && (c.prepend(a), !0);
            }),
            ($.fn.appendOnce = function (a, b) {
                var c = $(this);
                if ("undefined" == typeof b) {
                    var d = new RegExp('class="(.*?)"'),
                        e = d.exec(a);
                    "undefined" != typeof e[1] && (b = "." + e[1]);
                }
                return c.children(b).length < 1 && (c.append(a), !0);
            }),
            ($.fn.audioplayer = function (o) {
            debugger;
            var defaults = {

                    design_skin: "skin-default",
                    autoplay: "off",
                    cue: "on",
                    preload_method: "metadata",
                    loop: "off",
                    swf_location: "ap.swf",
                    swffull_location: "apfull.swf",
                    settings_backup_type: "light",
                    settings_extrahtml: "",
                    settings_extrahtml_in_float_left: "",
                    settings_extrahtml_in_float_right: "",
                    settings_extrahtml_before_play_pause: "",
                    settings_extrahtml_after_play_pause: "",
                    settings_trigger_resize: "0",
                    design_thumbh: "default",
                    design_thumbw: "200",
                    disable_volume: "default",
                    disable_scrub: "default",
                    disable_player_navigation: "off",
                    disable_timer: "default",
                    type: "audio",
                    enable_embed_button: "off",
                    embed_code: "",
                    skinwave_dynamicwaves: "off",
                    soundcloud_apikey: "",
                    parentgallery: null,
                    skinwave_enableSpectrum: "off",
                    skinwave_enableReflect: "on",
                    skinwave_place_thumb_after_volume: "off",
                    skinwave_place_metaartist_after_volume: "off",
                    settings_useflashplayer: "auto",
                    skinwave_spectrummultiplier: "1",
                    settings_php_handler: "",
                    php_retriever: "soundcloudretriever.php",
                    skinwave_mode: "normal",
                    skinwave_wave_mode: "normal",
                    change_media_animate_skinwave_mode_small: "off",
                    pcm_data_try_to_generate: "off",
                    skinwave_comments_links_to: "",
                    skinwave_comments_enable: "off",
                    skinwave_comments_playerid: "",
                    skinwave_comments_account: "none",
                    skinwave_comments_process_in_php: "on",
                    skinwave_comments_retrievefromajax: "off",
                    skinwave_preloader_code: "default",
                    skinwave_comments_displayontime: "on",
                    skinwave_comments_allow_post_if_not_logged_in: "on",
                    skinwave_timer_static: "off",
                    default_volume: "default",
                    volume_from_gallery: "",
                    design_menu_show_player_state_button: "off",
                    playfrom: "off",
                    scrubbar_tweak_overflow_hidden: "off",
                    design_animateplaypause: "default",
                    embedded: "off",
                    embedded_iframe_id: "",
                    sample_time_start: "0",
                    sample_time_end: "0",
                    sample_time_total: "0",
                    google_analytics_send_play_event: "off",
                    fakeplayer: null,
                    failsafe_repair_media_element: "",
                    action_audio_play: null,
                    action_audio_play2: null,
                    action_audio_end: null,
                    action_audio_comment: null,
                    action_audio_loaded_metadata: null,
                    type_audio_stop_buffer_on_unfocus: "off",
                    construct_player_list_for_sync: "off",
                    settings_exclude_from_list: "off",
                    design_wave_color_bg: "222222",
                    design_wave_color_progress: "ea8c52",
                    skin_minimal_button_size: "100",
                };
            if ("undefined" == typeof o && $(this).attr("data-options")) {
                debugger;
                    var aux = $(this).attr("data-options");
                    aux = "window.dzsap_self_options  = " + aux;
                    try {
                        eval(aux);
                    } catch (a) {
                        console.warn("eval error", a);
                    }
                    (o = $.extend({}, window.dzsap_self_options)), (window.window.dzsap_self_options = $.extend({}, {}));
                }
                (o = $.extend(defaults, o)),
                    this.each(function () {
                        function init() {
                            debugger;
                            "" == o.design_skin && (o.design_skin = "skin-default"),
                                cthis.attr("class").indexOf("skin-") == -1 && cthis.addClass(o.design_skin),
                                cthis.hasClass("skin-default") && (o.design_skin = "skin-default"),
                                cthis.hasClass("skin-wave") && (o.design_skin = "skin-wave"),
                                "on" == cthis.attr("data-viewsubmitted") && (ajax_view_submitted = "on"),
                                cthis.attr("data-userstarrating") && (starrating_alreadyrated = Number(cthis.attr("data-userstarrating"))),
                                "skin-default" == o.design_skin && "default" == o.design_thumbh && ((design_thumbh = cthis.height() - 40), (res_thumbh = !0)),
                                "skin-wave" == o.design_skin &&
                                (cthis.addClass("skin-wave-mode-" + o.skinwave_mode), "small" == o.skinwave_mode && "default" == o.design_thumbh && (design_thumbh = 80), cthis.addClass("skin-wave-wave-mode-" + o.skinwave_wave_mode)),
                                o.design_color_bg && (o.design_wave_color_bg = o.design_color_bg),
                                o.design_color_highlight && (o.design_wave_color_progress = o.design_color_highlight),
                                "skin-justthumbandbutton" == o.design_skin &&
                                ("default" == o.design_thumbh && (o.design_thumbh = ""), (o.disable_timer = "on"), (o.disable_volume = "on"), "default" == o.design_animateplaypause && (o.design_animateplaypause = "on")),
                                "skin-redlights" == o.design_skin && ((o.disable_timer = "on"), (o.disable_volume = "off"), "default" == o.design_animateplaypause && (o.design_animateplaypause = "on")),
                                "skin-steel" == o.design_skin &&
                                ("default" == o.disable_timer && (o.disable_timer = "off"),
                                    (o.disable_volume = "on"),
                                    "default" == o.design_animateplaypause && (o.design_animateplaypause = "on"),
                                    "default" == o.disable_scrub && (o.disable_scrub = "on")),
                                "skin-customcontrols" == o.design_skin &&
                                ("default" == o.disable_timer && (o.disable_timer = "on"),
                                    (o.disable_volume = "on"),
                                    "default" == o.design_animateplaypause && (o.design_animateplaypause = "on"),
                                    "default" == o.disable_scrub && (o.disable_scrub = "on")),
                                "off" == o.skinwave_enableReflect && cthis.addClass("skin-wave-no-reflect"),
                                "default" == o.design_thumbh && (design_thumbh = 200),
                                "" == o.embed_code && cthis.find("div.feed-embed-code").length > 0 && (o.embed_code = cthis.find("div.feed-embed-code").eq(0).html()),
                                "default" == o.design_animateplaypause && (o.design_animateplaypause = "off"),
                                "on" == o.design_animateplaypause && cthis.addClass("design-animateplaypause"),
                                "" == o.skinwave_comments_playerid
                                    ? ("undefined" != typeof cthis.attr("id") && (the_player_id = cthis.attr("id")), cthis.attr("data-playerid") && (the_player_id = cthis.attr("data-playerid")))
                                    : ((the_player_id = o.skinwave_comments_playerid), cthis.attr("id") || cthis.attr("id", the_player_id)),
                                "" == the_player_id && (o.skinwave_comments_enable = "off"),
                                "on" == o.construct_player_list_for_sync &&
                                0 == dzsap_list_for_sync_sw_build &&
                                ((dzsap_list_for_sync_players = []),
                                    (dzsap_list_for_sync_sw_build = !0),
                                    $(".audioplayer.is-single-player,.audioplayer-tobe.is-single-player").each(function () {
                                        var a = $(this);
                                        dzsap_list_for_sync_players.push(a);
                                    }),
                                    clearTimeout(dzsap_list_for_sync_inter_build),
                                    (dzsap_list_for_sync_inter_build = setTimeout(function () {
                                        dzsap_list_for_sync_sw_build = !1;
                                    }, 500))),
                                (playfrom = o.playfrom),
                                isValid(cthis.attr("data-playfrom")) && (playfrom = cthis.attr("data-playfrom")),
                                0 == isNaN(parseInt(playfrom, 10)) && (playfrom = parseInt(playfrom, 10)),
                                (pcm_identifier = the_player_id);
                            var a = null;
                            if (
                                (a && (a.attr("data-playerid") ? (pcm_identifier = a.attr("data-playerid")) : a.attr("data-source") && (pcm_identifier = a.attr("data-source"))),
                                    "" == type && (type = "audio"),
                                    (src_real_mp3 = cthis.attr("data-source")),
                                    "audio" == type && (src_real_mp3 = cthis.attr("data-source")),
                                    !cthis.hasClass("audioplayer"))
                            ) {
                                if (
                                    ((cthisId = void 0 != cthis.attr("id") ? cthis.attr("id") : "ap" + dzsap_globalidind++),
                                        is_ie8() && "off" == o.cue && (o.cue = "on"),
                                        cthis.removeClass("audioplayer-tobe"),
                                        cthis.addClass("audioplayer"),
                                        (is_ios() || is_android()) && ((o.autoplay = "off"), (o.disable_volume = "on"), "off" == o.cue && (o.cue = "on"), (o.cue = "on")),
                                        (data_source = cthis.attr("data-source")),
                                        ((0 == can_play_mp3() && void 0 == cthis.attr("data-sourceogg")) || is_ie8() || "on" == o.settings_useflashplayer) && (is_flashplayer = !0),
                                        setup_structure(),
                                        "on" == o.scrubbar_tweak_overflow_hidden ? cthis.addClass("scrubbar-tweak-overflow-hidden-on") : cthis.removeClass("scrubbar-tweak-overflow-hidden-on"),
                                        "on" == o.autoplay && "on" == o.cue && (increment_views = 1),
                                        "youtube" == type && is_ios())
                                )
                                    return (
                                        cthis.height() < 200 && cthis.height(200),
                                        (aux = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + data_source + '" frameborder="0" allowfullscreen></iframe>'),
                                        void cthis.html(aux)
                                    );
                                "on" == o.cue && "soundcloud" != type
                                    ? ((is_android() || is_ios()) && cthis.find(".playbtn").bind("click", play_media), setup_media())
                                    : (cthis.find(".playbtn").bind("click", click_for_setup_media), cthis.find(".scrubbar").bind("click", click_for_setup_media), handleResize()),
                                    setInterval(function () {
                                        debug_var = !0;
                                    }, 1e3),
                                    (cthis.get(0).api_destroy = destroy_it),
                                    (cthis.get(0).api_play = play_media),
                                    (cthis.get(0).api_get_last_vol = get_last_vol),
                                    (cthis.get(0).api_click_for_setup_media = click_for_setup_media),
                                    (cthis.get(0).api_handleResize = handleResize),
                                    (cthis.get(0).api_set_playback_speed = set_playback_speed),
                                    (cthis.get(0).api_seek_to_perc = seek_to_perc),
                                    (cthis.get(0).api_seek_to = seek_to),
                                    (cthis.get(0).api_seek_to_onlyvisual = seek_to_onlyvisual),
                                    (cthis.get(0).api_set_volume = set_volume),
                                    (cthis.get(0).api_visual_set_volume = visual_set_volume),
                                    (cthis.get(0).api_destroy_listeners = destroy_listeners),
                                    (cthis.get(0).api_pause_media = pause_media),
                                    (cthis.get(0).api_pause_media_visual = pause_media_visual),
                                    (cthis.get(0).api_play_media = play_media),
                                    (cthis.get(0).api_play_media_visual = play_media_visual),
                                    (cthis.get(0).api_change_visual_target = change_visual_target),
                                    (cthis.get(0).api_change_design_color_highlight = change_design_color_highlight),
                                    (cthis.get(0).api_get_time_curr = function () {
                                        return time_curr;
                                    }),
                                    (cthis.get(0).api_set_time_curr = function (a) {
                                        time_curr = a;
                                    }),
                                    (cthis.get(0).api_get_time_total = function () {
                                        return time_total;
                                    }),
                                    (cthis.get(0).api_set_time_total = function (a) {
                                        time_total = a;
                                    }),
                                    (cthis.get(0).api_set_action_audio_play = function (a) {
                                        action_audio_play = a;
                                    }),
                                    (cthis.get(0).api_set_action_audio_end = function (a) {
                                        action_audio_end = a;
                                    }),
                                    (cthis.get(0).api_set_action_audio_comment = function (a) {
                                        action_audio_comment = a;
                                    }),
                                    o.action_audio_play && (action_audio_play = o.action_audio_play),
                                    o.action_audio_play2 && (action_audio_play2 = o.action_audio_play2),
                                    o.action_audio_end && (action_audio_end = o.action_audio_end),
                                    cthis.on("click", ".dzsap-repeat-button,.dzsap-loop-button", handle_mouse),
                                    $(window).bind("resize", handleResize),
                                    handleResize(),
                                    _scrubbar.on("touchstart", function (a) {
                                        playing && (scrubbar_moving = !0);
                                    }),
                                    $(document).on("touchmove", function (a) {
                                        scrubbar_moving &&
                                            ((scrubbar_moving_x = a.originalEvent.touches[0].pageX),
                                                (aux3 = scrubbar_moving_x - _scrubbar.offset().left),
                                                aux3 < 0 && (aux3 = 0),
                                                aux3 > _scrubbar.width() && (aux3 = _scrubbar.width()),
                                                seek_to_perc(aux3 / _scrubbar.width()));
                                    }),
                                    $(document).on("touchend", function (a) {
                                        scrubbar_moving = !1;
                                    }),
                                    setTimeout(function () {
                                        handleResize();
                                    }, 100),
                                    cthis.find(".btn-menu-state").eq(0).bind("click", click_menu_state),
                                    cthis.on("click", ".prev-btn,.next-btn", handle_mouse);
                            }
                        }
                        function select_all(a) {
                            if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
                                var b = document.createRange();
                                b.selectNodeContents(a);
                                var c = window.getSelection();
                                c.removeAllRanges(), c.addRange(b);
                            } else if ("undefined" != typeof document.selection && "undefined" != typeof document.body.createTextRange) {
                                var d = document.body.createTextRange();
                                d.moveToElementText(a), d.select();
                            }
                        }
                        function change_visual_target(a, b) {
                            var c = {};
                            b && (c = $.extend(c, b)), (_feed_fakePlayer = a), playing && _feed_fakePlayer && _feed_fakePlayer.get(0) && _feed_fakePlayer.get(0).api_play_media_visual && _feed_fakePlayer.get(0).api_play_media_visual();
                        }
                        function change_design_color_highlight(a) {
                            o.design_wave_color_progress = a;
                        }
                        function destroy_listeners() {
                            return !destroyed && void (sw_suspend_enter_frame = !0);
                        }
                        function destroy_it() {
                            return !destroyed && (playing && pause_media(), cthis.remove(), (cthis = null), void (destroyed = !0));
                        }
                        function click_for_setup_media(a, b) {
                            var c = { do_not_autoplay: 1 };
                            b && (c = $.extend(c, b)),
                                cthis.find(".playbtn").unbind("click", click_for_setup_media),
                                cthis.find(".scrubbar").unbind("click", click_for_setup_media),
                                setup_media(c),
                                (is_android() || is_ios()) && play_media();
                        }
                        function click_menu_state(a) {
                            o.parentgallery && "undefined" != typeof o.parentgallery.get(0) && o.parentgallery.get(0).api_toggle_menu_state();
                        }
                        function check_yt_ready() {
                            1 != loaded &&
                                (_cmedia = new YT.Player("ytplayer_" + cthisId, {
                                    height: "200",
                                    width: "200",
                                    videoId: cthis.attr("data-source"),
                                    playerVars: { origin: "" },
                                    events: { onReady: check_yt_ready_phase_two, onStateChange: change_yt_state },
                                }));
                        }
                        function check_yt_ready_phase_two(a) {
                            init_loaded();
                        }
                        function change_yt_state(a) { }
                        function check_ready(a) {
                            var b = { do_not_autoplay: 1 };
                            a && (b = $.extend(b, a)),
                                "youtube" == type
                                    ? init_loaded(b)
                                    : "undefined" != typeof _cmedia &&
                                    ("AUDIO" != _cmedia.nodeName || "shoutcast" == o.type
                                        ? init_loaded(b)
                                        : is_safari()
                                            ? _cmedia.readyState >= 1 && (init_loaded(b), clearInterval(inter_checkReady), o.action_audio_loaded_metadata && o.action_audio_loaded_metadata(cthis))
                                            : _cmedia.readyState >= 2 && (init_loaded(b), clearInterval(inter_checkReady), o.action_audio_loaded_metadata && o.action_audio_loaded_metadata(cthis)));
                        }
                        function show_scrubbar() {
                            setTimeout(function () {
                                cthis.addClass("scrubbar-loaded");
                            }, 1e3);
                        }
                        function setup_structure() {
                            debugger;

                            cthis.append('<div class="audioplayer-inner"></div>'),
                                (_audioplayerInner = cthis.children(".audioplayer-inner")),
                                _audioplayerInner.append('<div class="the-media"></div>'),
                                "skin-customcontrols" != o.design_skin && _audioplayerInner.append('<div class="ap-controls"></div>'),
                                (_theMedia = _audioplayerInner.children(".the-media").eq(0)),
                                (_apControls = _audioplayerInner.children(".ap-controls").eq(0));
                            var a = '<div class="scrubbar">',
                                b = "";
                            (a += '<div class="scrub-bg"></div><div class="scrub-buffer"></div><div class="scrub-prog"></div><div class="scrubBox"></div><div class="scrubBox-prog"></div><div class="scrubBox-hover"></div>'),
                                "skin-wave" == o.design_skin && "on" == o.skinwave_enableReflect && ((a += '<div class="scrub-bg-reflect"></div>'), (a += '<div class="scrub-prog-reflect"></div>')),
                                "skin-wave" == o.design_skin && "on" != o.disable_timer && (a += '<div class="total-time">00:00</div><div class="curr-time">00:00</div>'),
                                sample_perc_start && (a += '<div class="sample-block-start" style="width: ' + 100 * sample_perc_start + '%"></div>'),
                                sample_perc_end && (a += '<div class="sample-block-end" style="left: ' + 100 * sample_perc_end + "%; width: " + (100 - 100 * sample_perc_end) + '%"></div>'),
                                (a += "</div>");
                            var d = "";
                            o.settings_extrahtml_before_play_pause && (d += o.settings_extrahtml_before_play_pause),
                                cthis.find(".feed-dzsap-before-playpause").length && ((d += cthis.find(".feed-dzsap-before-playpause").eq(0).html()), cthis.find(".feed-dzsap-before-playpause").remove()),
                                (d += '<div class="con-playpause">'),
                                (d += '<div class="playbtn"><div class="the-icon-bg"></div><div class="play-icon">'),
                                cthis.hasClass("button-aspect-noir") &&
                                (d +=
                                    '<svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>  '),
                                (d += "</div>"),
                                (d += "</div>"),
                                (d += '<div class="pausebtn" style="display:none"><div class="the-icon-bg"></div><div class="pause-icon"><div class="pause-part-1"></div><div class="pause-part-2"></div>'),
                                cthis.hasClass("button-aspect-noir") &&
                                (d +=
                                    ' <svg class="svg-icon" version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="13px" viewBox="0 0 13.415 16.333" enable-background="new 0 0 13.415 16.333" xml:space="preserve"> <path fill="#D2D6DB" d="M4.868,14.59c0,0.549-0.591,0.997-1.322,0.997H2.2c-0.731,0-1.322-0.448-1.322-0.997V1.618 c0-0.55,0.592-0.997,1.322-0.997h1.346c0.731,0,1.322,0.447,1.322,0.997V14.59z"/> <path fill="#D2D6DB" d="M12.118,14.59c0,0.549-0.593,0.997-1.324,0.997H9.448c-0.729,0-1.322-0.448-1.322-0.997V1.619 c0-0.55,0.593-0.997,1.322-0.997h1.346c0.731,0,1.324,0.447,1.324,0.997V14.59z"/> </svg>  '),
                                (d += "</div>"),
                                (d += "</div>"),
                                (d += ""),
                                "skin-wave" == o.design_skin && (d += o.skinwave_preloader_code),
                                (d += "</div>"),
                                cthis.find(".feed-dzsap-after-playpause").length && ((d += cthis.find(".feed-dzsap-after-playpause").eq(0).html()), cthis.find(".feed-dzsap-after-playpause").remove()),
                                (b += '<div class="con-controls"><div class="the-bg"></div>' + d),
                                o.settings_extrahtml_in_float_left && (b += o.settings_extrahtml_in_float_left),
                                "skin-wave" != o.design_skin && "on" != o.disable_timer && (b += '<div class="curr-time">00:00</div><div class="total-time">00:00</div>'),
                                ("skin-default" != o.design_skin && "skin-wave" != o.design_skin) ||
                                ((b += '<div class="ap-controls-right">'),
                                    "on" != o.disable_volume && (b += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>'),
                                    o.settings_extrahtml_in_float_right && (b += o.settings_extrahtml_in_float_right),
                                    (b += "</div>"),
                                    (b += '<div class="clear"></div>')),
                                (b += "</div>"),
                                "skin-wave" == o.design_skin && "small" == o.skinwave_mode
                                    ? ((b =
                                        '<div class="the-bg"></div><div class="ap-controls-left">' +
                                        d +
                                        "</div>" +
                                        a +
                                        '<div class="ap-controls-right"><div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div></div>'),
                                        _apControls.append(b))
                                    : "skin-aria" == o.design_skin ||
                                    "skin-silver" == o.design_skin ||
                                    "skin-redlights" == o.design_skin ||
                                    "skin-steel" == o.design_skin ||
                                    (cthis.hasClass("alternate-layout") ? _apControls.append(b + a) : _apControls.append(a + b)),
                                _apControls.find(".ap-controls-left").length > 0 && (_apControlsLeft = _apControls.find(".ap-controls-left").eq(0)),
                                _apControls.find(".ap-controls-right").length > 0 && (_apControlsRight = _apControls.find(".ap-controls-right").eq(0)),
                                "on" != o.disable_timer && ((_currTime = cthis.find(".curr-time").eq(0)), (_totalTime = cthis.find(".total-time").eq(0))),
                                Number(o.sample_time_total) > 0 && ((time_total = Number(o.sample_time_total)), _totalTime && _totalTime.html(formatTime(time_total))),
                                (_scrubbar = _apControls.find(".scrubbar").eq(0)),
                                (_conControls = _apControls.children(".con-controls")),
                                (_conPlayPause = cthis.find(".con-playpause").eq(0)),
                                (_controlsVolume = cthis.find(".controls-volume").eq(0)),
                                _metaArtistCon ||
                                (cthis.children(".meta-artist").length > 0 &&
                                    (cthis.hasClass("alternate-layout")
                                        ? (_conControls.children().last().hasClass("clear") && _conControls.children().last().remove(), _conControls.append(cthis.children(".meta-artist")))
                                        : _audioplayerInner.append(cthis.children(".meta-artist"))),
                                    _audioplayerInner.find(".meta-artist").eq(0).wrap('<div class="meta-artist-con"></div>'),
                                    (_metaArtistCon = _audioplayerInner.children(".meta-artist-con").eq(0)),
                                    "skin-wave" == o.design_skin &&
                                    (cthis.find(".dzsap-repeat-button").length
                                        ? cthis.find(".dzsap-repeat-button").after(_metaArtistCon)
                                        : cthis.find(".dzsap-loop-button").length
                                            ? cthis.find(".dzsap-loop-button").after(_metaArtistCon)
                                            : _conPlayPause.after(_metaArtistCon)),
                                    "skin-aria" == o.design_skin && _apControlsRight.prepend(_metaArtistCon),
                                    ("skin-redlights" != o.design_skin && "skin-steel" != o.design_skin) || (_apControlsRight.prepend('<div class="clear"></div>'), _apControlsRight.prepend(_metaArtistCon)),
                                    "skin-default" == o.design_skin && _apControlsRight.before(_metaArtistCon));
                            var e = "";
                            if (
                                ("" != design_thumbh && (e = " height:" + o.design_thumbh + "px;"),
                                    "on" == o.disable_volume && _controlsVolume.hide(),
                                    "off" == o.disable_volume && _controlsVolume.show(),
                                    "on" == o.disable_scrub && _scrubbar.hide(),
                                    "skin-wave" == o.design_skin &&
                                    o.parentgallery &&
                                    "undefined" != typeof o.parentgallery &&
                                    "on" == o.design_menu_show_player_state_button &&
                                    ("skin-wave" == o.design_skin
                                        ? _apControlsRight.appendOnce(
                                            '<div class="btn-menu-state"> <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div></div>'
                                        )
                                        : _audioplayerInner.appendOnce('<div class="btn-menu-state"></div>')),
                                    "on" == o.skinwave_place_metaartist_after_volume && _controlsVolume.before(_metaArtistCon),
                                    "on" == o.skinwave_place_thumb_after_volume && _controlsVolume.before(cthis.find(".the-thumb-con")),
                                    "skin-wave" == o.design_skin &&
                                    "" != o.embed_code &&
                                    ("skin-wave" == o.design_skin
                                        ? "on" == o.enable_embed_button &&
                                        _apControlsRight.appendOnce(
                                            '<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10.975px" height="14.479px" viewBox="0 0 10.975 14.479" enable-background="new 0 0 10.975 14.479" xml:space="preserve"> <g> <path d="M2.579,1.907c0.524-0.524,1.375-0.524,1.899,0l4.803,4.804c0.236-0.895,0.015-1.886-0.687-2.587L5.428,0.959 c-1.049-1.05-2.75-1.05-3.799,0L0.917,1.671c-1.049,1.05-1.049,2.751,0,3.801l3.167,3.166c0.7,0.702,1.691,0.922,2.587,0.686 L1.867,4.52c-0.524-0.524-0.524-1.376,0-1.899L2.579,1.907z M5.498,13.553c1.05,1.05,2.75,1.05,3.801,0l0.712-0.713 c1.05-1.05,1.05-2.75,0-3.8L6.843,5.876c-0.701-0.7-1.691-0.922-2.586-0.686l4.802,4.803c0.524,0.525,0.524,1.376,0,1.897 l-0.713,0.715c-0.523,0.522-1.375,0.522-1.898,0L1.646,7.802c-0.237,0.895-0.014,1.886,0.686,2.586L5.498,13.553z"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' +
                                            o.embed_code +
                                            "</span></span></div>"
                                        )
                                        : "on" == o.enable_embed_button &&
                                        _audioplayerInner.appendOnce(
                                            '<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" xml:space="preserve"> <g id="Layer_1"> <polygon fill="#E6E7E8" points="1.221,7.067 0.494,5.422 4.963,1.12 5.69,2.767 "/> <polygon fill="#E6E7E8" points="0.5,5.358 1.657,4.263 3.944,10.578 2.787,11.676 "/> <polygon fill="#E6E7E8" points="13.588,9.597 14.887,8.34 12.268,2.672 10.969,3.93 "/> <polygon fill="#E6E7E8" points="14.903,8.278 14.22,6.829 9.714,11.837 10.397,13.287 "/> </g> <g id="Layer_2"> <rect x="6.416" y="1.713" transform="matrix(0.9663 0.2575 -0.2575 0.9663 2.1699 -1.6329)" fill="#E6E7E8" width="1.805" height="11.509"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' +
                                            o.embed_code +
                                            "</span></span></div>"
                                        ),
                                        cthis.on("click", ".btn-embed-code-con, .btn-embed", function () {
                                            var a = $(this);
                                            select_all(a.find(".dzstooltip").get(0));
                                        })),
                                    "skin-wave" == o.design_skin)
                            ) {
                                "on" != o.skinwave_enableSpectrum
                                    ? (void 0 != cthis.attr("data-scrubbg") &&
                                        _scrubbar
                                            .children(".scrub-bg")
                                            .eq(0)
                                            .append('<img class="scrub-bg-img" src="' + cthis.attr("data-scrubbg") + '"/>'),
                                        _scrubbar.find(".scrub-bg-img").eq(0).css({}),
                                        _scrubbar
                                            .find(".scrub-prog-img")
                                            .eq(0)
                                            .css({ width: _scrubbar.children(".scrub-bg").width() }),
                                        "on" == o.skinwave_enableReflect &&
                                        _scrubbar
                                            .children(".scrub-bg-reflect")
                                            .eq(0)
                                            .append('<img class="scrub-bg-img-reflect" src="' + cthis.attr("data-scrubbg") + '"/>'))
                                    : setup_structure_scrub_canvas(),
                                    "on" == o.skinwave_timer_static && (_currTime && _currTime.addClass("static"), _totalTime && _totalTime.addClass("static")),
                                    _apControls.css({});
                                var f = new Image();
                                (f.onload = function (a) {
                                    cthis.addClass("scrubbar-loaded"), handleResize();
                                }),
                                    (f.src = cthis.attr("data-scrubbg")),
                                    setTimeout(function () {
                                        cthis.addClass("scrubbar-loaded");
                                    }, 2500);
                            }
                            cthis.children(".afterplayer").length > 0 && cthis.append(cthis.children(".afterplayer")), cthis.addClass("structure-setuped");
                        }
                        function setup_media(a) {
                            debugger;

                            var b = { do_not_autoplay: 1, call_from: "default" };
                            if (
                                (a && (b = $.extend(b, a)),
                                    "off" == o.cue && "auto" == ajax_view_submitted && ((increment_views = 1), (ajax_view_submitted = String(o.settings_extrahtml).indexOf("{{get_plays}}") > -1 ? "on" : "off")),
                                    1 != loaded)
                            ) {
                                var c = "",
                                    d = "",
                                    e = "";
                                if (
                                    (is_ios() && (o.preload_method = "metadata"),
                                        (c += "<audio"),
                                        (c += ' preload="' + o.preload_method + '"'),
                                        "on" == o.skinwave_enableSpectrum,
                                        is_ios() && "change_media" == b.call_from && (aux += " autoplay"),
                                        (c += ">"),
                                        (d = ""),
                                        cthis.attr("data-source") &&
                                        ((data_source = cthis.attr("data-source")),
                                            "fake" != data_source
                                                ? ((d += '<source src="' + data_source + '" type="audio/mpeg">'), void 0 != cthis.attr("data-sourceogg") && (d += '<source src="' + cthis.attr("data-sourceogg") + '" type="audio/ogg">'))
                                                : cthis.addClass("meta-loaded meta-fake")),
                                        (e += "</audio>"),
                                        is_ie8() && dzsap_list && dzsap_list.length > 0 && (str_ie8 = "&isie8=on"),
                                        is_flashplayer)
                                )
                                    if ("light" == o.settings_backup_type)
                                        (c =
                                            '<object type="application/x-shockwave-flash" data="' +
                                            o.swf_location +
                                            '" width="100" height="50" id="flashcontent_' +
                                            cthisId +
                                            '" allowscriptaccess="always" style="visibility: visible; "><param name="movie" value="ap.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="media=' +
                                            cthis.attr("data-source") +
                                            "&fvid=" +
                                            cthisId +
                                            str_ie8 +
                                            '"><embed src="' +
                                            o.swf_location +
                                            '" width="100" height="100" allowScriptAccess="always"></object>'),
                                            cthis.addClass("lightflashbackup");
                                    else {
                                        var f = "",
                                            g = "",
                                            h = "";
                                        o.parentgallery && "undefined" != typeof o.parentgallery && "on" != o.disable_player_navigation && (g = "&design_skip_buttons=on"),
                                            o.parentgallery && "undefined" != typeof o.parentgallery && "on" != o.design_menu_show_player_state_button && (h = "&design_menu_show_player_state_button=on"),
                                            "on" == o.disable_volume && (f += "&settings_enablevolume=off"),
                                            (c =
                                                '<object class="the-full-flash-backup" type="application/x-shockwave-flash" data="' +
                                                o.swffull_location +
                                                '" width="100%" height="100%" style="height:50px" id="flashcontent_' +
                                                cthisId +
                                                '" allowscriptaccess="always" style="visibility: visible; "><param name="movie" value="' +
                                                o.swffull_location +
                                                '"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="flashvars" value="media=' +
                                                cthis.attr("data-source") +
                                                "&fvid=" +
                                                cthisId +
                                                str_ie8 +
                                                f +
                                                "&autoplay=" +
                                                o.autoplay +
                                                "&skinwave_mode" +
                                                o.skinwave_mode +
                                                g +
                                                h),
                                            cthis.addClass("fullflashbackup"),
                                            "undefined" != typeof cthis.attr("data-scrubbg") && (c += "&scrubbg=" + cthis.attr("data-scrubbg")),
                                            "undefined" != typeof cthis.attr("data-scrubprog") && (c += "&scrubprog=" + cthis.attr("data-scrubprog")),
                                            "undefined" != typeof cthis.attr("data-thumb") && "" != cthis.attr("data-thumb") && (c += "&thumb=" + cthis.attr("data-thumb")),
                                            (c += "&settings_enablespectrum=" + o.skinwave_enableSpectrum),
                                            (c += "&skinwave_enablereflect=" + o.skinwave_enableReflect),
                                            (c += "&skin=" + o.design_skin),
                                            (c += "&settings_multiplier=" + o.skinwave_spectrummultiplier),
                                            (c += '">You need Flash Player.</object>'),
                                            _audioplayerInner.find(".the-thumb-con,.ap-controls,.the-media").remove(),
                                            _audioplayerInner.prepend(c),
                                            "skin-wave" == o.design_skin && _audioplayerInner.find(".the-full-flash-backup").css("height", 200),
                                            "undefined" != typeof cthis.attr("data-thumb") && "" != cthis.attr("data-thumb") && _audioplayerInner.find(".the-full-flash-backup").css("height", 200),
                                            (c = "");
                                    }
                                if (
                                    ((str_audio_element = c + d + e),
                                        "change_media" == b.call_from && (is_ios() || is_android())
                                            ? _cmedia &&
                                            ($(_cmedia).append(d),
                                                "change_media" == b.call_from &&
                                                _cmedia.addEventListener(
                                                    "loadedmetadata",
                                                    function (a) {
                                                        cthis.addClass("meta-loaded"), cthis.removeClass("meta-fake");
                                                    },
                                                    !0
                                                ),
                                                _cmedia.load && _cmedia.load())
                                            : (_theMedia.append(str_audio_element), (_cmedia = _theMedia.children("audio").get(0))),
                                        _cmedia &&
                                        _cmedia.addEventListener &&
                                        "fake" != cthis.attr("data-source") &&
                                        (_cmedia.addEventListener(
                                            "error",
                                            function (a) {
                                                console.info("errored out", this, this.audioElement, this.duration, a);
                                                var b = this.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
                                                b &&
                                                    (console.warn("could not load audio source - ", cthis.attr("data-source")),
                                                        cthis.addClass("errored-out"),
                                                        cthis.append('<div class="feedback-text">error - file does not exist.. </div>'),
                                                        setTimeout(function () {
                                                            console.info(_cmedia, _cmedia.src, cthis.attr("data-source")),
                                                                (_cmedia.src = ""),
                                                                setTimeout(function () {
                                                                    (_cmedia.src = cthis.attr("data-source")), _cmedia.load();
                                                                }, 1e3);
                                                        }, 1e3));
                                            },
                                            !0
                                        ),
                                            _cmedia.addEventListener(
                                                "loadedmetadata",
                                                function (a) {
                                                    cthis.addClass("meta-loaded"), cthis.removeClass("meta-fake"), "change_media" == b.call_from && 0 == cthis.hasClass("init-loaded") && init_loaded({ call_from: "force_reload_change_media" });
                                                },
                                                !0
                                            )),
                                        is_flashplayer &&
                                        "light" == o.settings_backup_type &&
                                        setTimeout(function () {
                                            _cmedia = _theMedia.find("object").eq(0).get(0);
                                        }, 500),
                                        cthis.addClass("media-setuped"),
                                        _conPlayPause.off("click"),
                                        _conPlayPause.on("click", click_playpause),
                                        "change_media" == b.call_from)
                                )
                                    return !1;
                                "fake" == cthis.attr("data-source") ||
                                    (is_ios() || is_ie8() || 1 == is_flashplayer
                                        ? "full" == o.settings_backup_type
                                            ? init_loaded(b)
                                            : setTimeout(function () {
                                                init_loaded(b);
                                            }, 1e3)
                                        : (inter_checkReady = setInterval(function () {
                                            check_ready(b);
                                        }, 50))),
                                    "none" == o.preload_method &&
                                    setTimeout(function () {
                                        _cmedia && $(_cmedia).attr("preload", "metadata");
                                    }, 12e3 * Number(window.dzsap_player_index)),
                                    "skin-customcontrols" == o.design_skin && (cthis.find(".custom-play-btn,.custom-pause-btn").off("click"), cthis.find(".custom-play-btn,.custom-pause-btn").on("click", click_playpause)),
                                    o.failsafe_repair_media_element &&
                                    (setTimeout(function () {
                                        if (_theMedia.children().eq(0).get(0) && "AUDIO" == _theMedia.children().eq(0).get(0).nodeName) return !1;
                                        _theMedia.html(""), _theMedia.append(str_audio_element);
                                        var a = playing;
                                        pause_media(),
                                            (_cmedia = _theMedia.children("audio").get(0)),
                                            is_flashplayer &&
                                            "light" == o.settings_backup_type &&
                                            setTimeout(function () {
                                                _cmedia = _theMedia.find("object").eq(0).get(0);
                                            }, 10),
                                            a &&
                                            ((a = !1),
                                                setTimeout(function () {
                                                    play_media();
                                                }, 20));
                                    }, o.failsafe_repair_media_element),
                                        (o.failsafe_repair_media_element = ""));
                            }
                        }
                        function destroy_media() {
                            pause_media(), _cmedia && (_cmedia.children, "audio" == o.type && ((_cmedia.innerHTML = ""), _cmedia.load())), is_ios() || is_android() || (_theMedia && (_theMedia.children().remove(), (loaded = !1)));
                        }
                        function setup_listeners() {
                            return (
                                _scrubbar.bind("mousemove", mouse_scrubbar),
                                _scrubbar.bind("mouseleave", mouse_scrubbar),
                                _scrubbar.bind("click", mouse_scrubbar),
                                _controlsVolume.find(".volumeicon").bind("click", click_mute),
                                "skin-redlights" == o.design_skin
                                    ? (_controlsVolume.bind("mousemove", mouse_volumebar),
                                        _controlsVolume.bind("mousedown", mouse_volumebar),
                                        $(document).undelegate(window, "mouseup", mouse_volumebar),
                                        $(document).delegate(window, "mouseup", mouse_volumebar))
                                    : (_controlsVolume.find(".volume_active").bind("click", mouse_volumebar), _controlsVolume.find(".volume_static").bind("click", mouse_volumebar)),
                                cthis.find(".playbtn").unbind("click"),
                                setTimeout(handleResize, 300),
                                setTimeout(handleResize, 2e3),
                                o.settings_trigger_resize > 0 && (inter_trigger_resize = setInterval(handleResize, o.settings_trigger_resize)),
                                cthis.addClass("listeners-setuped"),
                                !1
                            );
                        }
                        function get_last_vol() {
                            return last_vol;
                        }
                        function init_loaded(pargs) {
                            function generateFakeArray() {
                                console.info("generateFakeArray()");
                                for (var a = 256, b = [], c = 0; c < a; c++) b[c] = (a - c) / 2 + 100 * Math.random();
                                return b;
                            }
                            if (("apminimal" == cthis.attr("id"), !cthis.hasClass("dzsap-loaded"))) {
                                var margs = { do_not_autoplay: 1, call_from: "init" };
                                pargs && (margs = $.extend(margs, pargs)),
                                    console.groupCollapsed("init_loaded()"),
                                    console.info("", margs),
                                    console.groupEnd(),
                                    0 == is_flashplayer ||
                                    ("light" == o.settings_backup_type && "undefined" != typeof _cmedia && _cmedia.fn_getSoundDuration && eval("totalDuration = parseFloat(_cmedia.fn_getsoundduration" + cthisId + "())")),
                                    "undefined" != typeof _cmedia && "AUDIO" == _cmedia.nodeName && _cmedia.addEventListener("ended", handle_end),
                                    clearInterval(inter_checkReady),
                                    clearTimeout(inter_checkReady),
                                    setup_listeners(),
                                    is_ie8() && cthis.addClass("lte-ie8"),
                                    setTimeout(function () {
                                        _currTime && _currTime.outerWidth() > 0 && (currTime_outerWidth = _currTime.outerWidth());
                                    }, 1e3);
                                var createSeek = function () {
                                    var a = $("audio")[0].duration;
                                    $("#end").val(parseFloat(a).toFixed(4)),
                                        $("#begin").val("0"),
                                        $("#myslider").slider({
                                            value: 0,
                                            step: 0.01,
                                            orientation: "horizontal",
                                            range: "min",
                                            max: a,
                                            animate: 100,
                                            slide: function (a, b) {
                                                $("#begin").val(b.value), $.isNumeric($("#begin").val()) && $(b.value).val($("#begin").val());
                                            },
                                            stop: function (a, b) {
                                                seek_to(b.value);
                                            },
                                        }),
                                        $("#myslider2").slider({
                                            value: a,
                                            step: 0.01,
                                            orientation: "horizontal",
                                            range: "min",
                                            max: a,
                                            animate: 100,
                                            slide: function (a, b) {
                                                $("#end").val(b.value), $.isNumeric($("#end").val()) && $(b.value).val($("#end").val());
                                            },
                                            stop: function (a, b) {
                                                seek_to(b.value - parseFloat(1.5));
                                            },
                                        }),
                                        $("#begin").keyup(function () {
                                            $.isNumeric($("#begin").val()) && $("#myslider").slider("value", $(this).val());
                                        }),
                                        $("#end").keyup(function () {
                                            $.isNumeric($("#end").val()) && $("#myslider2").slider("value", $(this).val());
                                        });
                                };
                                if (
                                    (createSeek(),
                                        is_ie8() &&
                                        (Array.prototype.indexOf ||
                                            (Array.prototype.indexOf = function (a) {
                                                var b = this.length >>> 0,
                                                    c = Number(arguments[1]) || 0;
                                                for (c = c < 0 ? Math.ceil(c) : Math.floor(c), c < 0 && (c += b); c < b; c++) if (c in this && this[c] === a) return c;
                                                return -1;
                                            })),
                                        "fake" != type &&
                                        ("on" != o.settings_exclude_from_list && dzsap_list && dzsap_list.indexOf(cthis) == -1 && null == o.fakeplayer && dzsap_list.push(cthis),
                                            "on" == o.type_audio_stop_buffer_on_unfocus &&
                                            (cthis.data("type_audio_stop_buffer_on_unfocus", "on"),
                                                (cthis.get(0).api_destroy_for_rebuffer = function () {
                                                    "audio" == o.type && (playfrom = _cmedia.currentTime), destroy_media(), (destroyed_for_rebuffer = !0);
                                                }))),
                                        "skin-wave" == o.design_skin &&
                                        "on" == o.skinwave_enableSpectrum &&
                                        (console.info("USED AUDIO CONTEXT"),
                                            null == window.dzsap_audio_ctx
                                                ? "undefined" != typeof AudioContext
                                                    ? ((audioCtx = new AudioContext()), (window.dzsap_audio_ctx = audioCtx))
                                                    : "undefined" != typeof webkitAudioContext
                                                        ? ((audioCtx = new webkitAudioContext()), (window.dzsap_audio_ctx = audioCtx))
                                                        : (audioCtx = null)
                                                : (audioCtx = window.dzsap_audio_ctx),
                                            audioCtx))
                                )
                                    if (
                                        ("undefined" != typeof audioCtx.createJavaScriptNode && (javascriptNode = audioCtx.createJavaScriptNode(2048, 1, 1)),
                                            "undefined" != typeof audioCtx.createScriptProcessor && (javascriptNode = audioCtx.createScriptProcessor(4096, 1, 1)),
                                            is_android())
                                    ) {
                                        (analyser = audioCtx.createAnalyser()), (analyser.smoothingTimeConstant = 0.3), (analyser.fftSize = 512);
                                        var url = data_source;
                                        (javascriptNode.onaudioprocess = function (a) {
                                            var b = new Uint8Array(analyser.frequencyBinCount);
                                            analyser.getByteFrequencyData(b), (lastarray = b), playing && (lastarray = generateFakeArray());
                                        }),
                                            (webaudiosource = audioCtx.createMediaElementSource(_cmedia)),
                                            webaudiosource.connect(analyser),
                                            analyser.connect(audioCtx.destination),
                                            javascriptNode.connect(audioCtx.destination);
                                    } else if (javascriptNode) {
                                        (analyser = audioCtx.createAnalyser()), (analyser.smoothingTimeConstant = 0.3), (analyser.fftSize = 64);
                                        var url = data_source;
                                        (javascriptNode.onaudioprocess = function () {
                                            var a = new Uint8Array(analyser.frequencyBinCount);
                                            analyser.getByteFrequencyData(a), (lastarray = a), playing && is_ios() && (lastarray = generateFakeArray());
                                        }),
                                            "audio" == type &&
                                            ((webaudiosource = audioCtx.createMediaElementSource(_cmedia)), webaudiosource.connect(analyser), analyser.connect(audioCtx.destination), javascriptNode.connect(audioCtx.destination));
                                        var stopaudioprocessfordebug = !1;
                                        setTimeout(function () {
                                            stopaudioprocessfordebug = !0;
                                        }, 3e3);
                                    }
                                "auto" == ajax_view_submitted &&
                                    setTimeout(function () {
                                        "auto" == ajax_view_submitted && (ajax_view_submitted = "off");
                                    }, 1e3),
                                    (loaded = !0),
                                    cthis.addClass("dzsap-loaded"),
                                    "default" == o.default_volume && (defaultVolume = 1),
                                    0 == isNaN(Number(o.default_volume))
                                        ? (defaultVolume = Number(o.default_volume))
                                        : "last" == o.default_volume &&
                                        (defaultVolume = null != localStorage && the_player_id && localStorage.getItem("dzsap_last_volume_" + the_player_id) ? localStorage.getItem("dzsap_last_volume_" + the_player_id) : 1),
                                    o.volume_from_gallery && (defaultVolume = o.volume_from_gallery),
                                    set_volume(defaultVolume, { call_from: "from_init_loaded" }),
                                    isInt(playfrom) && seek_to(playfrom, { call_from: "from_playfrom" }),
                                    "last" == playfrom &&
                                    "undefined" != typeof Storage &&
                                    (setTimeout(function () {
                                        playfrom_ready = !0;
                                    }),
                                        "undefined" != typeof localStorage["dzsap_" + the_player_id + "_lastpos"] && seek_to(localStorage["dzsap_" + the_player_id + "_lastpos"], { call_from: "last_pos" })),
                                    1 != margs.do_not_autoplay && 0 == is_ie8() && "on" == o.autoplay && play_media(),
                                    _cmedia && _cmedia.duration && cthis.addClass("meta-loaded"),
                                    check_time(),
                                    setTimeout(function () {
                                        cthis.find(".wave-download").bind("click", handle_mouse);
                                    }, 500);
                            }
                        }
                        function isInt(a) {
                            return "number" == typeof a && Math.round(a) % 1 == 0;
                        }
                        function isValid(a) {
                            return "undefined" != typeof a && "" != a;
                        }
                        function handle_mouse(a) {
                            var b = $(this);
                            "click" == a.type &&
                                (b.hasClass("wave-download") && ajax_submit_download(),
                                    b.hasClass("prev-btn") && click_prev_btn(),
                                    b.hasClass("next-btn") && click_prev_btn(),
                                    b.hasClass("dzsap-repeat-button") && seek_to(0, { call_from: "repeat" }),
                                    b.hasClass("dzsap-loop-button") && (b.hasClass("active") ? (b.removeClass("active"), (loop_active = !1)) : (b.addClass("active"), (loop_active = !0)), console.info("loop_active - ", loop_active, cthis)));
                        }
                        function onError() { }
                        function onError(a) {
                            console.log(a);
                        }
                        function check_time(pargs) {
                            var margs = { fire_only_once: !1 };
                            if ((pargs && (margs = $.extend(margs, pargs)), "apminimal" == cthis.attr("id"), destroyed)) return !1;
                            if (sw_suspend_enter_frame) return !1;
                            ("audio" == type || ("fake" == type && o.fakeplayer)) &&
                                (1 == is_flashplayer
                                    ? "light" == o.settings_backup_type &&
                                    "" == str_ie8 &&
                                    "undefined" != typeof _cmedia &&
                                    (eval("if(typeof _cmedia.fn_getsoundduration" + cthisId + " != 'undefined'){time_total = parseFloat(_cmedia.fn_getsoundduration" + cthisId + "())};"),
                                        eval("if(typeof _cmedia.fn_getsoundcurrtime" + cthisId + " != 'undefined'){time_curr = parseFloat(_cmedia.fn_getsoundcurrtime" + cthisId + "())};"))
                                    : "shoutcast" != o.type &&
                                    (_cmedia && ((real_time_total = _cmedia.duration), _cmedia.duration, 0 == inter_audiobuffer_workaround_id && (real_time_curr = _cmedia.currentTime)),
                                        audioCtx && is_firefox(),
                                        "last" == playfrom && playfrom_ready && "undefined" != typeof Storage && (localStorage["dzsap_" + the_player_id + "_lastpos"] = time_curr))),
                                0 == cthis.hasClass("first-played") &&
                                ((cthis.attr("data-playfrom") && "0" != cthis.attr("data-playfrom")) ||
                                    ((real_time_curr = 0), $(_cmedia) && $(_cmedia).html() && $(_cmedia).html().indexOf("api.soundcloud.com") > -1 && 0 != _cmedia.currentTime && seek_to(0, { call_from: "first_played_false" }))),
                                (time_curr = real_time_curr),
                                (time_total = real_time_total),
                                sample_time_start > 0 && (time_curr = sample_time_start + real_time_curr),
                                sample_time_total > 0 && (time_total = sample_time_total),
                                cthis.hasClass("is-playing"),
                                (spos = (time_curr / time_total) * sw);
                            var beginpos = $("#begin").val(),
                                endpos = $("#end").val(),
                                bpos = (beginpos / time_total) * sw,
                                epos = (endpos / time_total) * sw,
                                cropwidth = epos - bpos;
                            if (
                                (isNaN(spos) && (spos = 0),
                                    spos > sw && (spos = sw),
                                    null == audioBuffer &&
                                    (_scrubbar.children(".scrub-prog").css({ width: cropwidth, "margin-left": bpos }),
                                        $("#kr").css({ width: cropwidth, "margin-left": bpos }),
                                        _scrubbar.find(".scrub-prog-img-reflect").eq(0).css({ left: -bpos, position: "relative" }),
                                        _scrubbar.children(".scrubBox-hover").css({ left: spos }),
                                        "on" == o.skinwave_enableReflect && _scrubbar.children(".scrub-prog-reflect").css({ width: cropwidth, "margin-left": bpos })),
                                    "skin-wave" == o.design_skin)
                            ) {
                                if ("on" == o.skinwave_enableSpectrum) {
                                    if ((debug_var && (debug_var = !1), last_lastarray))
                                        for (var i3 = 0; i3 < last_lastarray.length; i3++)
                                            (begin_viy = last_lastarray[i3]), (change_viy = lastarray[i3] - begin_viy), (duration_viy = 3), (lastarray[i3] = Math.easeIn(1, begin_viy, change_viy, duration_viy));
                                    lastarray && drawSpectrum(lastarray), lastarray && (last_lastarray = lastarray.slice());
                                }
                                _currTime &&
                                    "on" != o.skinwave_timer_static &&
                                    (_currTime.css({ left: spos }),
                                        spos > sw - currTime_outerWidth && _currTime.css({ left: sw - currTime_outerWidth }),
                                        spos > sw - 30 ? _totalTime.css({ opacity: 1 - (spos - (sw - 30)) / 30 }) : "1" != _totalTime.css("opacity") && _totalTime.css({ opacity: "" }));
                            }
                            _currTime && (_currTime.html(formatTime(time_curr)), _totalTime.html(formatTime(time_total))),
                                time_total > 0 && time_curr >= time_total - 0.07 && handle_end(),
                                time_curr > $("#end").val() && seek_to($("#begin").val()),
                                1 != margs.fire_only_once && requestAnimFrame(check_time);
                        }
                        function click_playpause(a) {
                            $(this);
                            if (cthis.hasClass("listeners-setuped"));
                            else {
                                $(_cmedia).attr("preload", "auto"), setup_listeners(), init_loaded();
                                var c = setInterval(function () {
                                    _cmedia &&
                                        _cmedia.duration &&
                                        0 == isNaN(_cmedia.duration) &&
                                        ((real_time_total = _cmedia.duration), (time_total = real_time_total), cthis.addClass("meta-loaded"), _totalTime && _totalTime.html(formatTime(time_total)), clearInterval(c));
                                }, 1e3);
                            }
                            0 == playing ? play_media() : pause_media();
                        }
                        function handle_end() {
                            return (
                                seek_to(0, { call_from: "handle_end" }),
                                "on" == o.loop || loop_active
                                    ? (play_media(), !1)
                                    : (pause_media(),
                                        o.parentgallery && "undefined" != typeof o.parentgallery && o.parentgallery.get(0).api_handle_end(),
                                        setTimeout(function () {
                                            if (cthis.hasClass("is-single-player") && dzsap_list_for_sync_players.length > 0)
                                                for (var a in dzsap_list_for_sync_players)
                                                    if (dzsap_list_for_sync_players[a].get(0) == cthis.get(0) && a < dzsap_list_for_sync_players.length - 1) {
                                                        a = parseInt(a, 10);
                                                        var b = dzsap_list_for_sync_players[a + 1].get(0);
                                                        b &&
                                                            b.api_play_media &&
                                                            setTimeout(function () {
                                                                b.api_play_media();
                                                            }, 200);
                                                    }
                                        }, 100),
                                        void setTimeout(function () {
                                            action_audio_end && action_audio_end(cthis);
                                        }, 200))
                            );
                        }
                        function handleResize(a, b) {
                            var c = {};
                            if (
                                (b && (c = $.extend(c, b)),
                                    (ww = $(window).width()),
                                    (tw = cthis.width()),
                                    (th = cthis.height()),
                                    tw <= 720 ? cthis.addClass("under-720") : cthis.removeClass("under-720"),
                                    tw <= 500 ? cthis.addClass("under-500") : cthis.removeClass("under-500"),
                                    (sw = tw),
                                    "skin-default" == o.design_skin && (sw = tw),
                                    "skin-pro" == o.design_skin && (sw = tw),
                                    "skin-justthumbandbutton" == o.design_skin && ((tw = cthis.children(".audioplayer-inner").outerWidth()), (sw = tw)),
                                    ("skin-redlights" != o.design_skin && "skin-steel" != o.design_skin) || (sw = _scrubbar.width()),
                                    "skin-wave" == o.design_skin && (sw = _scrubbar.outerWidth(!1)),
                                    1 == res_thumbh)
                            ) {
                                if ("skin-default" == o.design_skin) {
                                    void 0 != cthis.get(0) && "auto" == cthis.get(0).style.height && cthis.height(200);
                                    var d = _audioplayerInner.height();
                                    "undefined" == typeof cthis.attr("data-initheight") && "" != cthis.attr("data-initheight") ? cthis.attr("data-initheight", _audioplayerInner.height()) : (d = Number(cthis.attr("data-initheight"))),
                                        console.info("cthis_height - ", d, cthis.attr("data-initheight")),
                                        "default" == o.design_thumbh && (design_thumbh = d - 44);
                                }
                                _audioplayerInner.find(".the-thumb").eq(0).css({});
                            }
                            "none" != cthis.css("display") &&
                                (_scrubbar.find(".scrub-bg-img").eq(0).css({}),
                                    _scrubbar
                                        .find(".scrub-prog-img")
                                        .eq(0)
                                        .css({ width: _scrubbar.children(".scrub-bg").width() }),
                                    _scrubbar
                                        .find(".scrub-prog-img-reflect")
                                        .eq(0)
                                        .css({ width: _scrubbar.children(".scrub-bg").width() })),
                                cthis.removeClass("under-240 under-400"),
                                tw <= 240 && cthis.addClass("under-240"),
                                tw <= 400
                                    ? (cthis.addClass("under-400"), _controlsVolume && ("on" == o.disable_volume ? _controlsVolume.hide() : _controlsVolume.hide()))
                                    : "on" == o.disable_volume
                                        ? _controlsVolume.hide()
                                        : _controlsVolume.show();
                            if ("skin-wave" == o.design_skin) {
                                (controls_left_pos = 0), cthis.find(".the-thumb").length > 0 && (controls_left_pos += cthis.find(".the-thumb").width() + 20), (controls_left_pos += 70);
                                var f = _scrubbar.eq(0).height();
                                is_flashplayer && "full" == o.settings_backup_type && ((f = 140), (controls_left_pos = 280), tw <= 480 && (controls_left_pos = 180)),
                                    "small" == o.skinwave_mode && ((controls_left_pos -= 80), (f = 5), (controls_left_pos += 13), _conPlayPause.css({}), (controls_left_pos += _conPlayPause.outerWidth() + 10)),
                                    "small" == o.skinwave_mode && is_flashplayer && "full" == o.settings_backup_type && ((controls_left_pos = 140), cthis.find(".meta-artist-con").hide()),
                                    (controls_right_pos = 0),
                                    _controlsVolume && "none" != _controlsVolume.css("display") && (controls_right_pos += 55),
                                    "small" == o.skinwave_mode &&
                                    ((controls_left_pos += 10),
                                        _scrubbar.css({}),
                                        cthis.find(".btn-menu-state").eq(0).css({ bottom: "auto", top: 25 }),
                                        "on" == o.scrubbar_tweak_overflow_hidden && _scrubbar.css({ left: _apControlsLeft.width(), width: tw - _apControlsLeft.width() - _apControlsRight.outerWidth() }),
                                        (sw = _scrubbar.width()),
                                        "on" == o.scrubbar_tweak_overflow_hidden && (sw = tw - _apControlsLeft.width() - _apControlsRight.outerWidth()),
                                        (controls_right_pos += 10),
                                        _scrubbar.css({}));
                            }
                            if ("skin-default" == o.design_skin && _currTime) {
                                var g = parseInt(_metaArtistCon.css("left"), 10),
                                    h = _metaArtistCon.outerWidth();
                                "none" == _metaArtistCon.css("display") && (h = 0), isNaN(g) && (g = 20), _currTime.css({}), _totalTime.css({});
                            }
                            if ("on" == o.embedded && window.frameElement) {
                                var i = { height: cthis.outerHeight() };
                                o.embedded_iframe_id && (i.embedded_iframe_id = o.embedded_iframe_id);
                                var j = { name: "resizeIframe", params: i };
                                window.parent.postMessage(j, "*");
                            }
                        }
                        function mouse_volumebar(a) {
                            var b = $(this);
                            "mousemove" == a.type &&
                                volume_dragging &&
                                ((aux = (a.pageX - _controlsVolume.find(".volume_static").eq(0).offset().left) / _controlsVolume.find(".volume_static").eq(0).width()),
                                    b.parent().hasClass("volume-holder") || b.hasClass("volume-holder"),
                                    "skin-redlights" == o.design_skin && ((aux *= 10), (aux = Math.round(aux)), (aux /= 10)),
                                    set_volume(aux, { call_from: "set_by_mousemove" }),
                                    (muted = !1)),
                                "mouseleave" == a.type,
                                "click" == a.type &&
                                ((aux = (a.pageX - _controlsVolume.find(".volume_static").eq(0).offset().left) / _controlsVolume.find(".volume_static").eq(0).width()),
                                    b.parent().hasClass("volume-holder") && (aux = 1 - (a.pageY - _controlsVolume.find(".volume_static").eq(0).offset().top) / _controlsVolume.find(".volume_static").eq(0).height()),
                                    b.hasClass("volume-holder") && ((aux = 1 - (a.pageY - _controlsVolume.find(".volume_static").eq(0).offset().top) / _controlsVolume.find(".volume_static").eq(0).height()), console.info(aux)),
                                    set_volume(aux, { call_from: "set_by_mouseclick" }),
                                    (muted = !1)),
                                "mousedown" == a.type &&
                                ((volume_dragging = !0),
                                    cthis.addClass("volume-dragging"),
                                    (aux = (a.pageX - _controlsVolume.find(".volume_static").eq(0).offset().left) / _controlsVolume.find(".volume_static").eq(0).width()),
                                    b.parent().hasClass("volume-holder") && (aux = 1 - (a.pageY - _controlsVolume.find(".volume_static").eq(0).offset().top) / _controlsVolume.find(".volume_static").eq(0).height()),
                                    set_volume(aux, { call_from: "set_by_mousedown" }),
                                    (muted = !1)),
                                "mouseup" == a.type && ((volume_dragging = !1), cthis.removeClass("volume-dragging"));
                        }
                        function mouse_scrubbar(a) {
                            var b = a.pageX;
                            if ($(a.target).hasClass("sample-block-start") || $(a.target).hasClass("sample-block-end")) return !1;
                            if (("mousemove" == a.type && _scrubbar.children(".scrubBox-hover").css({ left: b - _scrubbar.offset().left }), "mouseleave" == a.type, "click" == a.type)) {
                                audioBuffer && (time_total = audioBuffer.duration);
                                var c = ((a.pageX - _scrubbar.offset().left) / sw) * time_total;
                                1 == is_flashplayer && (c = (a.pageX - _scrubbar.offset().left) / sw), sample_time_start > 0 && (c -= sample_time_start), seek_to(c, { call_from: "mouse_scrubbar" }), 0 == playing && play_media();
                            }
                        }
                        function seek_to_perc(a, b) {
                            seek_to(a * time_total, b);
                        }
                        function seek_to(arg, pargs) {
                            var margs = { call_from: "default", call_from_type: "default" };
                            if ((pargs && (margs = $.extend(margs, pargs)), "from_feeder_to_feed" == margs.call_from, "audio" == type))
                                if (null != audioBuffer)
                                    (lasttime_inseconds = arg), (audioCtx.currentTime = lasttime_inseconds), 0 != inter_audiobuffer_workaround_id && (time_curr = arg), pause_media({ audioapi_setlasttime: !1 }), play_media();
                                else {
                                    if (1 != is_flashplayer) return "skin-pro" == o.design_skin, _cmedia && _cmedia.currentTime && (_cmedia.currentTime = arg), !1;
                                    "light" == o.settings_backup_type && "" == str_ie8 && eval("_cmedia.fn_seek_to" + cthisId + "(" + arg + ")"), play_media();
                                }
                        }
                        function seek_to_onlyvisual(a) {
                            0 == time_total && _cmedia && _cmedia.duration && (time_total = _cmedia.duration), (time_curr = a * time_total);
                        }
                        function set_playback_speed(a) {
                            "audio" == type && 0 == is_flashplayer && (_cmedia.playbackRate = a);
                        }
                        function set_volume(arg, pargs) {
                            var margs = { call_from: "default" };
                            pargs && (margs = $.extend(margs, pargs)),
                                arg > 1 && (arg = 1),
                                arg < 0 && (arg = 0),
                                ("set_by_mouseclick" != margs.call_from && "set_by_mousemove" != margs.call_from) || (volume_set_by_user = !0),
                                "audio" == type &&
                                (1 == is_flashplayer
                                    ? "light" == o.settings_backup_type && "" == str_ie8 && eval("_cmedia.fn_volumeset" + cthisId + "(arg)")
                                    : _cmedia
                                        ? (_cmedia.volume = arg)
                                        : _cmedia && $(_cmedia).attr("preload", "metadata")),
                                visual_set_volume(arg, margs);
                        }
                        function visual_set_volume(a, b) {
                            _controlsVolume.hasClass("controls-volume-vertical")
                                ? _controlsVolume
                                    .find(".volume_active")
                                    .eq(0)
                                    .css({ height: _controlsVolume.find(".volume_static").eq(0).height() * a })
                                : _controlsVolume
                                    .find(".volume_active")
                                    .eq(0)
                                    .css({ width: _controlsVolume.find(".volume_static").eq(0).width() * a }),
                                "skin-wave" == o.design_skin &&
                                "on" == o.skinwave_dynamicwaves &&
                                (_scrubbar
                                    .find(".scrub-bg-img")
                                    .eq(0)
                                    .css({ transform: "scaleY(" + a + ")" }),
                                    _scrubbar
                                        .find(".scrub-prog-img")
                                        .eq(0)
                                        .css({ transform: "scaleY(" + a + ")" }),
                                    "on" == o.skinwave_enableReflect && (0 == a ? cthis.find(".scrub-bg-img-reflect").fadeOut("slow") : cthis.find(".scrub-bg-img-reflect").fadeIn("slow"))),
                                null != localStorage && the_player_id && localStorage.setItem("dzsap_last_volume_" + the_player_id, a),
                                (last_vol = a);
                        }
                        function click_mute() {
                            0 == muted ? ((last_vol_before_mute = last_vol), set_volume(0, { call_from: "from_mute" }), (muted = !0)) : (set_volume(last_vol_before_mute, { call_from: "from_unmute" }), (muted = !1));
                        }
                        function pause_media_visual() {
                            if ("on" != o.design_animateplaypause) _conPlayPause.children(".playbtn").css({ display: "block" }), _conPlayPause.children(".pausebtn").css({ display: "none" });
                            else {
                                if (0 == cthis.hasClass("is-playing")) return !1;
                                "skin-redlights" == o.design_skin || "skin-steel" == o.design_skin
                                    ? (_conPlayPause.children(".pausebtn").css("opacity", 1),
                                        _conPlayPause.children(".pausebtn").animate({ opacity: "0" }, { queue: !1, duration: 300 }),
                                        _conPlayPause.children(".playbtn").css({ opacity: 0, visibility: "visible", display: "block" }),
                                        _conPlayPause.children(".playbtn").animate({ opacity: "1" }, { queue: !1, duration: 300 }))
                                    : (_conPlayPause.children(".playbtn").stop().fadeIn("fast"), _conPlayPause.children(".pausebtn").stop().fadeOut("fast"));
                            }
                            _conPlayPause.removeClass("playing"), cthis.removeClass("is-playing"), (playing = !1);
                        }
                        function pause_media(pargs) {
                            var margs = { audioapi_setlasttime: !0, donot_change_media: !1 };
                            return (
                                !destroyed &&
                                (pargs && (margs = $.extend(margs, pargs)),
                                    pause_media_visual(),
                                    "audio" == type &&
                                    (null != audioBuffer
                                        ? "placeholder" != audioBuffer && (1 == margs.audioapi_setlasttime && (lasttime_inseconds = audioCtx.currentTime), webaudiosource.stop(0))
                                        : 1 == is_flashplayer && "light" == o.settings_backup_type && "none" != cthis.css("display")
                                            ? "light" == o.settings_backup_type && eval("_cmedia.fn_pausemedia" + cthisId + "()")
                                            : _cmedia && void 0 != _cmedia.pause && _cmedia.pause()),
                                    (playing = !1),
                                    void cthis.removeClass("is-playing"))
                            );
                        }
                        function play_media_visual(a) {
                            "on" != o.design_animateplaypause
                                ? (_conPlayPause.children(".playbtn").css({ display: "none" }), _conPlayPause.children(".pausebtn").css({ display: "block" }))
                                : "skin-redlights" == o.design_skin || "skin-steel" == o.design_skin
                                    ? (_conPlayPause.children(".playbtn").css("opacity", 1),
                                        _conPlayPause.children(".playbtn").animate({ opacity: "0" }, { queue: !1, duration: 600 }),
                                        _conPlayPause.children(".pausebtn").css({ opacity: 0, visibility: "visible", display: "block" }),
                                        _conPlayPause.children(".pausebtn").animate({ opacity: "1" }, { queue: !1, duration: 600 }))
                                    : (_conPlayPause.children(".playbtn").stop().fadeOut("fast"), _conPlayPause.children(".pausebtn").stop().fadeIn("fast")),
                                (playing = !0),
                                cthis.addClass("is-playing"),
                                cthis.addClass("first-played"),
                                _conPlayPause.addClass("playing"),
                                action_audio_play && action_audio_play(cthis),
                                action_audio_play2 && action_audio_play2(cthis);
                        }
                        function play_media(pargs) {
                            var margs = { api_report_play_media: !0, call_from: "default" };
                            if (
                                (pargs && (margs = $.extend(margs, pargs)),
                                    0 == cthis.hasClass("media-setuped") && console.info("warning: media not setuped, there might be issues", cthis.attr("id")),
                                    "feed_to_feeder" == margs.call_from && 0 == cthis.hasClass("dzsap-loaded"))
                            )
                                return (
                                    init_loaded(),
                                    setTimeout(function () {
                                        play_media(margs);
                                    }, 300),
                                    !1
                                );
                            for (i = 0; i < dzsap_list.length; i++)
                                is_ie8() ||
                                    "undefined" == typeof dzsap_list[i].get(0) ||
                                    "undefined" == typeof dzsap_list[i].get(0).api_pause_media ||
                                    dzsap_list[i].get(0) == cthis.get(0) ||
                                    (dzsap_list[i].data("type_audio_stop_buffer_on_unfocus") && "on" == dzsap_list[i].data("type_audio_stop_buffer_on_unfocus")
                                        ? dzsap_list[i].get(0).api_destroy_for_rebuffer()
                                        : dzsap_list[i].get(0).api_pause_media({ audioapi_setlasttime: !1 }));
                            if (
                                (destroyed_for_rebuffer && (setup_media(), isInt(playfrom) && seek_to(playfrom, { call_from: "destroyed_for_rebuffer_playfrom" }), (destroyed_for_rebuffer = !1)),
                                    "on" == o.google_analytics_send_play_event &&
                                    window._gaq &&
                                    0 == google_analytics_sent_play_event &&
                                    (window._gaq.push(["_trackEvent", "ZoomSounds Play", "Play", "zoomsounds play - " + cthis.attr("data-source")]), (google_analytics_sent_play_event = !0)),
                                    window.ga || (window.__gaTracker && (window.ga = window.__gaTracker)),
                                    "on" == o.google_analytics_send_play_event &&
                                    window.ga &&
                                    0 == google_analytics_sent_play_event &&
                                    (window.console && console.info("sent event"),
                                        (google_analytics_sent_play_event = !0),
                                        window.ga("send", { hitType: "event", eventCategory: "zoomsounds play - " + cthis.attr("data-source"), eventAction: "play", eventLabel: "zoomsounds play - " + cthis.attr("data-source") })),
                                    "normal" == type && (type = "audio"),
                                    "audio" == type)
                            )
                                if (null != audioBuffer) {
                                    if ("placeholder" == audioBuffer) return;
                                    (webaudiosource = audioCtx.createBufferSource()),
                                        (webaudiosource.buffer = audioBuffer),
                                        webaudiosource.connect(audioCtx.destination),
                                        webaudiosource.connect(analyser),
                                        webaudiosource.start(0, lasttime_inseconds);
                                } else 1 == is_flashplayer && "none" != cthis.css("display") ? "light" == o.settings_backup_type && eval("_cmedia.fn_playmedia" + cthisId + "()") : _cmedia && _cmedia.play && _cmedia.play();
                            play_media_visual(margs);
                        }
                        function formatTime(a) {
                            var b = Math.round(a),
                                c = 0;
                            if (b > 0) {
                                for (; b > 59 && b < 3e6 && isFinite(b);) c++, (b -= 60);
                                return String((c < 10 ? "0" : "") + c + ":" + (b < 10 ? "0" : "") + b);
                            }
                            return "00:00";
                        }
                        var cthis = $(this),
                            cchildren = cthis.children(),
                            cthisId = "ap1",
                            currNr = -1,
                            i = 0,
                            ww,
                            wh,
                            tw,
                            th,
                            cw,
                            ch,
                            sw = 0,
                            sh,
                            spos = 0,
                            _audioplayerInner,
                            _apControls = null,
                            _apControlsLeft = null,
                            _apControlsRight = null,
                            _conControls,
                            _conPlayPause,
                            _controlsVolume,
                            _scrubbar,
                            _scrubbarbg_canvas,
                            _scrubbarhover_canvas,
                            _scrubbarprog_canvas,
                            _theMedia,
                            _cmedia,
                            _theThumbCon,
                            _metaArtistCon,
                            _scrubBgReflect = null,
                            _scrubBgReflectCanvas = null,
                            _scrubBgReflectCtx = null,
                            _scrubProgReflect = null,
                            _scrubProgCanvasReflect = null,
                            _scrubProgCanvasReflectCtx = null,
                            _scrubBgCanvas = null,
                            _scrubBgCanvasCtx = null,
                            _scrubProgCanvas = null,
                            _scrubProgCanvasCtx = null,
                            _commentsHolder = null,
                            _commentsWriter = null,
                            _currTime = null,
                            _totalTime = null,
                            _feed_fakePlayer = null,
                            _feed_fakeButton = null,
                            busy = !1,
                            playing = !1,
                            muted = !1,
                            loaded = !1,
                            destroyed = !1,
                            google_analytics_sent_play_event = !1,
                            destroyed_for_rebuffer = !1,
                            loop_active = !1,
                            time_total = 0,
                            time_curr = 0,
                            real_time_curr = 0,
                            real_time_total = 0,
                            sample_time_start = 0,
                            sample_time_end = 0,
                            sample_time_total = 0,
                            sample_perc_start = 0,
                            sample_perc_end = 0,
                            currTime_outerWidth = 0,
                            index_extrahtml_toloads = 0,
                            last_vol = 1,
                            last_vol_before_mute = 1,
                            the_player_id = "",
                            pcm_identifier = "",
                            inter_check,
                            inter_checkReady,
                            inter_audiobuffer_workaround_id = 0,
                            inter_trigger_resize,
                            skin_minimal_canvasplay,
                            skin_minimal_canvaspause,
                            is_flashplayer = !1,
                            data_source = "",
                            src_real_mp3 = "",
                            id_real_mp3 = "",
                            original_real_mp3 = "",
                            res_thumbh = !1,
                            debug_var = !0,
                            volume_dragging = !1,
                            volume_set_by_user = !1,
                            pcm_is_real = !1,
                            pcm_try_to_generate = !0,
                            skin_minimal_button_size = parseInt(o.skin_minimal_button_size, 10),
                            scrubbar_moving = !1,
                            scrubbar_moving_x = 0,
                            aux3 = 0,
                            str_ie8 = "",
                            javascriptNode = null,
                            audioCtx = null,
                            audioBuffer = null,
                            sourceNode = null,
                            analyser = null,
                            lastarray = null,
                            last_lastarray = null,
                            webaudiosource = null,
                            canw = 100,
                            canh = 100,
                            barh = 100,
                            design_thumbh,
                            type = "",
                            sposarg = 0,
                            arr_the_comments = [],
                            str_audio_element = "",
                            lasttime_inseconds = 0,
                            controls_left_pos = 0,
                            controls_right_pos = 0,
                            ajax_view_submitted = "auto",
                            increment_views = 0,
                            type_for_fake_feed = "audio",
                            starrating_index = 0,
                            starrating_nrrates = 0,
                            starrating_alreadyrated = -1,
                            playfrom = "off",
                            playfrom_ready = !1,
                            waveform_peaks = [],
                            defaultVolume = 1,
                            currIp = "127.0.0.1",
                            action_audio_end = null,
                            action_audio_play = null,
                            action_audio_play2 = null,
                            action_audio_comment = null,
                            sw_suspend_enter_frame = !1,
                            animation_flip = !0,
                            animation_pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
                            animation_play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
                            duration_viy = 20,
                            target_viy = 0,
                            begin_viy = 0,
                            finish_viy = 0,
                            change_viy = 0;
                        if (
                            (0 == isNaN(parseInt(o.design_thumbh, 10)) && (o.design_thumbh = parseInt(o.design_thumbh, 10)),
                                String(o.design_thumbw).indexOf("%") == -1 && (o.design_thumbw = parseInt(o.design_thumbw, 10)),
                                window.dzsap_player_index++,
                                Number(o.sample_time_start) > 0 &&
                                ((sample_time_start = Number(o.sample_time_start)),
                                    Number(o.sample_time_end) > 0 &&
                                    ((sample_time_end = Number(o.sample_time_end)),
                                        Number(o.sample_time_total) > 0 &&
                                        ((sample_time_total = Number(o.sample_time_total)), (sample_perc_start = sample_time_start / sample_time_total), (sample_perc_end = sample_time_end / sample_time_total)))),
                                "on" == o.autoplay && "on" == o.cue && (o.preload_method = "auto"),
                                "default" == o.skinwave_preloader_code)
                        ) {
                            o.skinwave_preloader_code =
                                ' <svg class="loading-svg" width="30" height="30" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> </g> </svg>';
                            var heart_svg =
                                '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15"  viewBox="0 0 645 700" id="svg2"> <defs id="defs4" /> <g id="layer1"> <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="" /> <g transform="translate(129.28571,-64.285714)" id="g2221" /> </g> </svg> ';
                        }
                        return (
                            (o.settings_trigger_resize = parseInt(o.settings_trigger_resize, 10)),
                            init(),
                            (Math.easeOutQuart = function (a, b, c, d) {
                                return (a /= d), a--, -c * (a * a * a * a - 1) + b;
                            }),
                            (Math.easeOutQuad = function (a, b, c, d) {
                                return ((-c * a) / d) * (a / d - 2) + b;
                            }),
                            (Math.easeIn = function (a, b, c, d) {
                                return -c * (a /= d) * (a - 2) + b;
                            }),
                            (Math.easeOutQuad = function (a, b, c, d) {
                                return ((-c * a) / d) * (a / d - 2) + b;
                            }),
                            (Math.easeOutQuad_rev = function (a, b, c, d) {
                                return (c * d + d * Math.sqrt(c * (c + b - a))) / c;
                            }),
                            this
                        );
                    });
            }),
            (window.dzsap_init = function (a, b) {
                if ("undefined" != typeof b && "undefined" != typeof b.init_each && 1 == b.init_each) {
                    var c = 0;
                    for (var d in b) c++;
                    1 == c && (b = void 0),
                        $(a).each(function () {
                            var a = $(this);
                            a.audioplayer(b);
                        });
                } else $(a).audioplayer(b);
            }),
            (window.dzsag_init = function (a, b) {
                if ("undefined" != typeof b && "undefined" != typeof b.init_each && 1 == b.init_each) {
                    var c = 0;
                    for (var d in b) c++;
                    1 == c && (b = void 0),
                        $(a).each(function () {
                            var a = $(this);
                            a.audiogallery(b);
                        });
                } else $(a).audiogallery(b);
            });
    })(jQuery),
    jQuery(document).ready(function (a) {
        a("audio.zoomsounds-from-audio").each(function () {
            var b = a(this);
            b.after('<div class="audioplayer-tobe auto-init skin-silver" data-source="' + b.attr("src") + '"></div>'), b.remove();
        }),
            dzsap_init(".audioplayer-tobe.auto-init", { init_each: !0 }),
            dzsag_init(".audiogallery.auto-init", { init_each: !0 }),
            a(document).delegate(".audioplayer-song-changer", "click", function () {
                var b = a(this),
                    c = a(b.attr("data-target")).eq(0);
                return c && c.get(0) && c.get(0).api_change_media && c.get(0).api_change_media(b, { feeder_type: "button" }), !1;
            }),
            a(document).delegate(".dzsap-sticktobottom .icon-hide", "click", function () {
                var b = a(this);
                return a(".dzsap-sticktobottom .dzsap_footer").get(0).api_pause_media(), b.parent().parent().removeClass("audioplayer-loaded"), b.parent().parent().addClass("audioplayer-was-loaded"), !1;
            }),
            a(document).delegate(".dzsap-sticktobottom .icon-show", "click", function () {
                var b = a(this);
                return b.parent().parent().addClass("audioplayer-loaded"), b.parent().parent().removeClass("audioplayer-was-loaded"), !1;
            }),
            a(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").length > 0 &&
            setInterval(function () {
                a(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer").eq(0).hasClass("dzsap-loaded") &&
                    (a(".dzsap-sticktobottom-placeholder").eq(0).addClass("active"),
                        0 == a(".dzsap-sticktobottom").hasClass("audioplayer-was-loaded") && a(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").addClass("audioplayer-loaded"));
            }, 1e3);
    }),
    (jQuery.fn.textWidth = function () {
        var a = jQuery(this),
            b = a.html();
        "INPUT" == a[0].nodeName && (b = a.val());
        var c = '<span class="forcalc">' + b + "</span>";
        jQuery("body").append(c);
        var d = jQuery("span.forcalc").last();
        d.css({ "font-size": a.css("font-size"), "font-family": a.css("font-family") });
        var e = d.width();
        return d.remove(), e;
    }),
    (window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (a, b) {
                window.setTimeout(a, 1e3 / 60);
            }
        );
    })());
