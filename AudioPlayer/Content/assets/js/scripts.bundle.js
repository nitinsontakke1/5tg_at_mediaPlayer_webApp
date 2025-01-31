"use strict";
var Analytics = Analytics || {};
$(function () {
    (Analytics = {
        init: function () {
            Analytics.user(), Analytics.song(), Analytics.purchase(), Analytics.statistics();
        },
        user: function () {
            if (0 === $("#user").length) return !1;
            var t = document.getElementById("user").getContext("2d");
            new Chart(t, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [{ label: "Songs", data: [65, 59, 42, 73, 56, 55, 40], backgroundColor: "#f11717", borderColor: "#f11717", borderWidth: 3, pointBorderWidth: 0, pointRadius: 0 }],
                },
                options: { responsive: !0, legend: { display: !1 }, scales: { yAxes: [{ display: !1, ticks: { min: 0, max: 85 } }], xAxes: [{ display: !1 }] }, layout: { padding: 0, margin: 0 } },
            });
        },
        song: function () {
            if (0 === $("#songChart").length) return !1;
            var t = document.getElementById("songChart").getContext("2d");
            new Chart(t, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [{ label: "Songs", data: [65, 59, 42, 73, 56, 55, 40], backgroundColor: "#00c746", borderColor: "#00c746", borderWidth: 3, pointBorderWidth: 0, pointRadius: 0 }],
                },
                options: { responsive: !0, legend: { display: !1 }, scales: { yAxes: [{ display: !1, ticks: { min: 0, max: 85 } }], xAxes: [{ display: !1, barPercentage: 0.5 }] }, layout: { padding: 0, margin: 0 } },
            });
        },
        purchase: function () {
            if (0 === $("#purchase").length) return !1;
            var t = document.getElementById("purchase").getContext("2d");
            new Chart(t, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [{ label: "Songs", data: [65, 59, 42, 73, 56, 55, 40], backgroundColor: "transparent", borderColor: "#222629", borderWidth: 3, pointBorderWidth: 0, pointRadius: 0 }],
                },
                options: { responsive: !0, legend: { display: !1 }, scales: { yAxes: [{ display: !1, ticks: { min: 0, max: 85 } }], xAxes: [{ display: !1, barPercentage: 0.5 }] }, layout: { padding: 0, margin: 0 } },
            });
        },
        statistics: function () {
            if (0 === $("#userStatistics").length) return !1;
            var t = document.getElementById("userStatistics").getContext("2d");
            new Chart(t, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [{ label: "User", data: [65, 59, 42, 73, 56, 55, 40], backgroundColor: "#ad20d4", borderColor: "transparent", borderWidth: 3, pointBorderWidth: 0, pointRadius: 0 }],
                },
                options: { responsive: !0, legend: { display: !1 }, scales: { yAxes: [{ ticks: { min: 0, max: 80 } }], xAxes: [{ barPercentage: 0.3 }] }, layout: { padding: 0, margin: 0 } },
            });
        },
    }),
        $(document).ready(Analytics.init);
});
var AppConfig = AppConfig || {};
$(function () {
    AppConfig = {
        init: function () {
            AppConfig.appRouting(), AppConfig.initAppScrollbars(), AppConfig.langCheckedToApply(), AppConfig.search(), AppConfig.buttonClickEvents(), AppConfig.initTheme(), AppConfig.reInitFunction();
        },
        reInitFunction: function () {
            AppConfig.initSlickCarousel(), AppConfig.materialTab(), AppConfig.initCountdown(), AppConfig.addFavorite(), Analytics.init();
        },
        appRouting: function () {
            $(document).on("click", "a:not(.load-page):not(.external)", function (t) {
                t.preventDefault();
                var s = $(this),
                    e = "undefined" !== s.attr("href") ? s.attr("href") : null;
                e && AppConfig.filterLink(e) && AppConfig.ajaxLoading(e);
            });
        },
        filterLink: function (t) {
            return null !== t && "#" !== t.substr(0, 1) && !(t.length >= 10 && "javascript" === t.substr(0, 10).toLowerCase()) && !(t.length < 1);
        },
        ajaxLoading: function (t) {
            window.history.pushState("", "", t),
                $.ajax({ url: t, context: document.body })
                    .done(function (s) {
                        var e,
                            i,
                            a = $("<div>" + s + "</div>");
                        (e = a),
                            $("head title").html(e.find("title").html()),
                            (function (t) {
                                var s = $(".banner"),
                                    e = s.attr("class");
                                s.removeClass(e.split(" ")[1]), s.addClass(t.find(".banner").attr("class"));
                            })(a),
                            (function (t) {
                                $("#appRoute").html(t.find("#appRoute").html()), $("#wrapper").animate({ scrollTop: 0 }, "fast"), Analytics.init(), AppConfig.reInitFunction();
                            })(a),
                            (i = $("#sidebar .nav-link")).removeClass("active"),
                            i.each(function () {
                                debugger;
                                t === $(this).attr("href") && $(this).addClass("active");
                            });
                    })
                    .fail(function (t, s) {
                        return alert("Something went wrong. Please try again"), !1;
                    });
        },
        initTheme: function () {
            $("body").themeSettings();
        },
        langCheckedToApply: function () {
            var t = $("#lang .custom-control-input");
            t.on("change", function () {
                $("#langApply").prop("disabled", !t.filter(":checked").length);
            }).trigger("change");
        },
        initAppScrollbars: function () {
            $('[data-scrollable="true"]').each(function () {
                new PerfectScrollbar(this, { wheelSpeed: 0.5, swipeEasing: !0, wheelPropagation: !1, minScrollbarLength: 40, suppressScrollX: !0 });
            });
        },
        //slickCarousel: function (t, s, e, i, a) {
        //    $(t).slick({
        //        arrows: !0,
        //        dots: !1,
        //        infinite: !1,
        //        loop: !0,
        //        slidesToShow: s,
        //        slidesToScroll: 1,
        //        speed: 1e3,
        //        prevArrow: '<button class="btn-prev btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-left"></i></button>',
        //        nextArrow: '<button class="btn-next btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-right"></i></button>',
        //        autoplay: !0,
        //        responsive: [
        //            { breakpoint: 1440, settings: { slidesToShow: e } },
        //            { breakpoint: 1200, settings: { slidesToShow: i } },
        //            { breakpoint: 640, settings: { slidesToShow: a } },
        //            { breakpoint: 380, settings: { slidesToShow: 1, arrows: !1 } },
        //        ],
        //    });
        //},
        initSlickCarousel: function () {
                AppConfig.slickCarousel(".carousel-item-4", 4, 3, 2, 1),
                AppConfig.slickCarousel(".carousel-item-5", 5, 4, 3, 2),
                AppConfig.slickCarousel(".carousel-item-6", 6, 5, 4, 2);
        },
        buttonClickEvents: function () {
            $("#toggleSidebar").on("click", function () {
                t.toggleClass("iconic-sidebar");
            }),
                $("#openSidebar").on("click", function (i) {
                    i.stopPropagation(), t.removeClass("open-search"), t.addClass("open-sidebar"), e.addClass("show"), s.removeClass("show");
                }),
                $("#hideSidebar").on("click", function () {
                    t.removeClass("open-sidebar"), e.removeClass("show");
                }),
                $("#playList").on("click", function () {
                    t.toggleClass("open-right-sidebar");
                });
        },
        search: function () {
            $("#searchForm #searchInput").on("click", function (e) {
                e.stopPropagation(), t.addClass("open-search"), s.addClass("show");
            }),
                t.on("click", function () {
                    t.removeClass("open-search"), s.removeClass("show");
                });
        },
        materialTab: function () {
            var t = $(".line-tabs .nav-item .active"),
                s = $(".line-tabs .nav-item");
            $(".line-tabs").append("<span class='tabs-link-line'></span>");
            var e = t.position(),
                i = t.parent().width();
            $(".tabs-link-line").stop().css({ width: i }),
                s.on("click", function () {
                    (e = $(this).position()), (i = $(this).width()), $(this).parent().parent().find(".tabs-link-line").stop().css({ left: e.left, width: i });
                });
        },
        initCountdown: function () {
            var t = $(".countdown"),
                s = new Date();
            s.setDate(s.getDate() + 5),
                t.countdown(s, function (t) {
                    $(this).html(
                        t.strftime(
                            '<div class="timer-wrapper"><div class="timer-data">%D</div></div><span class="time-separate">:</span><div class="timer-wrapper"><div class="timer-data">%H</div></div><span class="time-separate">:</span><div class="timer-wrapper"><div class="timer-data">%M</div></div><span class="time-separate">:</span><div class="timer-wrapper"><div class="timer-data">%S</div></div>'
                        )
                    );
                });
        },
        addFavorite: function () {
            var t = $(".favorite"),
                s = '<li><span class="badge badge-pill badge-danger"><i class="la la-heart"></i></span></li>';
            t.on("click", function (t) {
                t.stopPropagation();
                var e = $(this).closest(".custom-card--info"),
                    i = e.find(".custom-card--labels");
                if (i.length && !e.find(".custom-card--labels li .la-heart").length) i.append(s);
                else {
                    e.prepend('<ul class="custom-card--labels d-flex"><li><span class="badge badge-pill badge-danger"><i class="la la-heart"></i></span></li></ul>');
                }
            });
        },
    };
    var t = $("body"),
        s = $(".header-backdrop"),
        e = $(".sidebar-backdrop");
    $(document).ready(AppConfig.init);
}),
    $(window).on("load", function () {
        $("#loading").fadeOut(1e3);
    }),
    $("#wrapper").on("scroll", function () {
        $("#header").toggleClass("scrolled", $(this).scrollTop() > 80);
    });
var AudioPlayer = AudioPlayer || {};
$(function () {
    (AudioPlayer = {
        init: function () {
            if (0 === $("#audioPlayer").length) return !1;
            AudioPlayer.initAudioPlayer(), AudioPlayer.volumeDropdownClick(), AudioPlayer.volumeIconClick(), AudioPlayer.addAudioInPlayer();
        },
        initAudioPlayer: function () {
            Amplitude.init({
                songs: [{ name: "I Love You Mummy", artist: "Arebica Luna", album: "Mummy", url: "../assets/audio/ringtone-1.mp3", cover_art_url: "../assets/images/cover/small/1.jpg" }],
                playlists: {
                    special: {
                        songs: [
                            { name: "I Love You Mummy", artist: "Arebica Luna", album: "Mummy", url: "../assets/audio/ringtone-1.mp3", cover_art_url: "../assets/images/cover/small/1.jpg" },
                            { name: "Shack Your Butty", artist: "Gerrina Linda", album: "Hot Shot", url: "../assets/audio/ringtone-2.mp3", cover_art_url: "../assets/images/cover/small/2.jpg" },
                            { name: "Do It Your Way(Female)", artist: "Zunira Willy & Nutty Nina", album: "Own Way", url: "../assets/audio/ringtone-3.mp3", cover_art_url: "../assets/images/cover/small/3.jpg" },
                            { name: "Say Yes", artist: "Johnny Marro", album: "Say Yes", url: "../assets/audio/ringtone-4.mp3", cover_art_url: "../assets/images/cover/small/4.jpg" },
                            { name: "Where Is Your Letter", artist: "Jina Moore & Lenisa Gory", album: "Letter", url: "../assets/audio/ringtone-5.mp3", cover_art_url: "../assets/images/cover/small/5.jpg" },
                            { name: "Hey Not Me", artist: "Rasomi Pelina", album: "Find Soul", url: "../assets/audio/ringtone-6.mp3", cover_art_url: "../assets/images/cover/small/6.jpg" },
                            { name: "Deep Inside", artist: "Pimila Holliwy", album: "Deep Inside", url: "../assets/audio/ringtone-7.mp3", cover_art_url: "../assets/images/cover/small/7.jpg" },
                        ],
                    },
                },
            });
        },
        volumeDropdownClick: function () {
            $(document).on("click", ".volume-dropdown-menu", function (t) {
                t.stopPropagation();
            });
        },
        volumeIconClick: function () {
            var t = $('.audio-volume input[type="range"]'),
                s = $(".audio-volume .btn");
            t.on("change", function () {
                var t = $(this),
                    e = parseInt(t.val(), 10);
                0 === e ? s.html('<i class="ion-md-volume-mute"></i>') : e > 0 && e < 70 ? s.html('<i class="ion-md-volume-low"></i>') : e > 70 && s.html('<i class="ion-md-volume-high"></i>');
            });
        },
        addAudioInPlayer: function () {
            $(document).on("click", "a[data-audio]", function () {
                var t = $(this).data("audio");
                Amplitude.removeSong(0), Amplitude.playNow(t);
            });
        },
    }),
        $(document).ready(AudioPlayer.init);
}),
    (function (t, s, e, i) {
        function a(e, i) {
            (this.$body = t("body")),
                (this.options = t.extend({}, a.Defaults, i)),
                (this.cookiesOptions = { themeDark: this.options.darkTheme, header: this.options.header, sidebar: this.options.sidebar, player: this.options.player }),
                null != t.cookie("themeSetting") &&
                !1 === i &&
                ((this.cookiesOptions = JSON.parse(t.cookie("themeSetting"))),
                    (this.options.darkTheme = this.cookiesOptions.themeDark),
                    (this.options.header = this.cookiesOptions.header),
                    (this.options.sidebar = this.cookiesOptions.sidebar),
                    (this.options.player = this.cookiesOptions.player)),
                (this.optionList = [{ text: "Dark Theme", value: this.options.darkTheme }]);
            var o = s.location.pathname.split("/").pop().split(".")[0],
                n = ["index", "error"].includes(o);
            o && !n && this.initialize();
        }
        (a.Defaults = {
            darkTheme: !1,
            header: 0,
            sidebar: 0,
            player: 0,
            themeClass: ["primary", "danger", "success", "warning", "info", "brand", "dark"],
            //settingsButton: "button",
            //settingsButtonId: "customSettings",
            //settingsButtonClass: "btn btn-pill btn-air btn-brand btn-icon-only",
            //settingIcon: '<i class="ion-md-settings"></i>',
            itemElement: "div",
            wrapperId: "settingsWrapper",
            listClass: "custom-list",
            listItemClass: "custom-list--item",
        }),
            (a.prototype.initialize = function () {
                var s = t("#header"),
                    e = t("#sidebar"),
                    i = t("#audioPlayer");
                this.options.darkTheme && this.$body.addClass("theme-dark"),
                    s.addClass("bg-" + this.options.themeClass[this.options.header]),
                    e.addClass("sidebar-" + this.options.themeClass[this.options.sidebar]),
                    i.addClass("player-" + this.options.themeClass[this.options.player]),
                    this.settingsButtonElement(),
                    this.skinClicks();
            }),
            (a.prototype.settingsButtonElement = function () {
                var t = { type: "button", id: this.options.settingsButtonId, className: this.options.settingsButtonClass },
                    s = e.createElement(this.options.settingsButton);
                Object.assign(s, t), (s.innerHTML = this.options.settingIcon), this.$body.append(s), this.themeOptions();
            }),
            (a.prototype.themeOptions = function () {
                var t = e.createElement(this.options.itemElement);
                t.setAttribute("id", this.options.wrapperId);
                for (var s = '<div class="theme-settings-body"><ul class="' + this.options.listClass + '">', i = 0; i < this.optionList.length; i++) {
                    var a = this.optionList[i].value ? "checked" : "";
                    s +=
                        '<li class="' +
                        this.options.listItemClass +
                        '"><label for="to' +
                        i +
                        '">' +
                        this.optionList[i].text +
                        '</label><div class="custom-control custom-checkbox ml-auto"><input type="checkbox" class="custom-control-input" id="to' +
                        i +
                        '" ' +
                        a +
                        '><label class="custom-control-label" for="to' +
                        i +
                        '"></label></div></li>';
                }
                s += '<li class="custom-list-group--item-separator"></li><li class="custom-list-group--item custom-list-group--item-header">Header Colors</li><li class="' + this.options.listItemClass + '">';
                for (var o = 0; o < this.options.themeClass.length; o++) {
                    var n = o === this.options.header ? "active" : "";
                    s += '<a href="javascript:void(0);" class="header-skin bg-' + this.options.themeClass[o] + " " + n + '" data-header-skin="' + o + '"></a>';
                }
                (s += "</li>"), (s += '<li class="custom-list-group--item-separator"></li><li class="custom-list-group--item custom-list-group--item-header">Sidebar Colors</li><li class="' + this.options.listItemClass + '">');
                for (var l = 0; l < this.options.themeClass.length; l++) {
                    var r = l === this.options.sidebar ? "active" : "";
                    s += '<a href="javascript:void(0);" class="sidebar-skin bg-' + this.options.themeClass[l] + " " + r + '" data-sidebar-skin="' + l + '"></a>';
                }
                (s += "</li>"), (s += '<li class="custom-list-group--item-separator"></li><li class="custom-list-group--item custom-list-group--item-header">Player Colors</li><li class="' + this.options.listItemClass + '">');
                for (var d = 0; d < this.options.themeClass.length; d++) {
                    var c = d === this.options.player ? "active" : "";
                    s += '<a href="javascript:void(0);" class="player-skin bg-' + this.options.themeClass[d] + " " + c + '" data-player-skin="' + d + '"></a>';
                }
                (s += "</li>"),
                    (s += "</ul></div>"),
                    (t.innerHTML = '<header><span class="title-bold font-md text-uppercase">Theme Settings</span><a href="javascript:void(0)" class="ml-auto"><i class="ion-md-close"></i></a></header>' + s),
                    this.$body.append(t);
            }),
            (a.prototype.skinClicks = function () {
                var s = this,
                    e = "#" + s.options.settingsButtonId,
                    i = t("#" + s.options.wrapperId),
                    a = t("#header"),
                    o = t("#sidebar"),
                    n = t("#audioPlayer"),
                    l = t(".header-skin"),
                    r = t(".sidebar-skin"),
                    d = t(".player-skin");
                this.$body.on("click", "#to0", function () {
                    var e = t(this);
                    (s.cookiesOptions.themeDark = e[0].checked), s.$body.toggleClass("theme-dark"), s.setCookies();
                }),
                    this.$body.on("click", ".header-skin", function () {
                        var e = t(this),
                            i = e.data("header-skin");
                        (s.cookiesOptions.header = i), a.removeClass(), a.addClass("bg-" + s.options.themeClass[i]), l.removeClass("active"), e.addClass("active"), s.setCookies();
                    }),
                    this.$body.on("click", ".sidebar-skin", function () {
                        var e = t(this),
                            i = e.data("sidebar-skin");
                        (s.cookiesOptions.sidebar = i), o.removeClass(), o.addClass("sidebar-" + s.options.themeClass[i]), r.removeClass("active"), e.addClass("active"), s.setCookies();
                    }),
                    this.$body.on("click", ".player-skin", function () {
                        var e = t(this),
                            i = e.data("player-skin");
                        (s.cookiesOptions.player = i), n.removeClass(), n.addClass("player-" + s.options.themeClass[i]), d.removeClass("active"), e.addClass("active"), s.setCookies();
                    }),
                    this.$body.on("click", e, function () {
                        i.toggleClass("open-settings");
                    }),
                    this.$body.on("click", "header a", function () {
                        i.removeClass("open-settings");
                    });
            }),
            (a.prototype.setCookies = function () {
                t.cookie("themeSetting", JSON.stringify(this.cookiesOptions), { expires: 7, path: "/" });
            }),
            (t.fn.themeSettings = function (s) {
                return this.each(function () {
                    t(this), new a(this, "object" == typeof s && s);
                });
            }),
            (t.fn.themeSettings.Constructor = a);
    })(jQuery, window, document);
//# sourceMappingURL=scripts.bundle.js.map
