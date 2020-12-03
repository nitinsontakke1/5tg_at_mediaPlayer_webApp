function display_error(e) {
    $("#loading_progress").html(e), $("#upload_btn").attr("disabled", !0);
}
function trim_it() {
    $("audio")[0].pause();
    var e = $("#track_url").val(),
        a = $("#track_name").val(),
        t = $("#track_ext").val(),
        o = $("#begin").val(),
        r = $("#end").val(),
        i = $("#folder").val(),
        n = $("#fadein").prop("checked"),
        s = $("#fadeout").prop("checked"),
        d = $("#mode").prop("checked"),
        l = $("#duration").val(),
        u = window.location.protocol + "//" + window.location.host;
    $("#trimming_progress").html('<img src="' + u + '/images/ajax-loader.gif"> Processing...'),
        $.ajax({
            url: "crop.php",
            type: "POST",
            data: { track_url: e, track_name: a, begin: o, end: r, track_ext: t, folder: i, fadein: n, fadeout: s, mode: d, duration: l },
            dataType: "json",
            success: function (e) {
                e.message
                    ? $("#trimming_progress").html('<span class="alert alert-danger">' + e.message + "</span>")
                    : ($("#crop").hide(), $("#download").show(), $("#down-btn").attr("href", "/download.php?date=" + e.date + "&file=" + e.file), $("html, body").animate({ scrollTop: 0 }, "slow"));
            },
            error: function (e) {
                $("#crop").hide(), $("#download").show(), $("#info").html("There has been an error processing your request.");
            },
        });
}
