$(function () {
    $('<div></div>').addClass("view").html('<hr/><a href="#view-source">显示代码</a>').appendTo('body');
});
window.addEventListener("click", function (e) {
    var event = (e || window.event);
    if (event.target.hash != '#view-source') return;
    var ipre = $("#precode");
    if (event.target.innerHTML == '显示代码') {
        if (ipre.length) ipre.show(); else {
            ipre = $('<pre></pre>').attr('id', 'precode').appendTo("body");
            var b = ('<head>' + document.head.innerHTML + "</head>\r\n<body>" + ihtml + "\r\n</body>").replace(/[<>]/g, function (m) { return { '<': '&lt;', '>': '&gt;' }[m] }).replace(/var ihtml = document.body.innerHTML;/, '');
            var c = b.replace(/(".*?")/g, '<span style="color:blue;">$1</span>').replace(/&lt;(\w+\b)|\b(\w+)&gt;/g, function (a, b, c, d) {
                if (b) {
                    var _0 = new RegExp(b);
                    return a.replace(_0, '<span style="color:#800000;">' + b + '</span>');
                }
                if (c) {
                    var _1 = new RegExp(c);
                    return a.replace(_1, '<span style="color:#800000;">' + c + '</span>');
                }
            }).replace(/\b(\w+)=/g, function (a, b, c, d) {
                if (b && b != 'style') {
                    var _0 = new RegExp(b);
                    return a.replace(_0, '<span style="color:red;">' + b + '</span>');
                }
                if (c && c != 'color') {
                    var _1 = new RegExp(c);
                    return a.replace(_1, '<span style="color:red;">' + c + '</span>');
                }
            });
            ipre.html(c).show();
        }
        event.target.innerHTML = "隐藏代码";
    }
    else {
        event.target.innerHTML = "显示代码";
        ipre.hide();
    }
});