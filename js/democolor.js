function exec(urlobj) {
    try {
        window.parent.showmenu.call(this, urlobj);
    }
    catch (e) {
        alert(" 该浏览器不支持文件的'跨域'操作,请布置到web服务器或选择其它浏览器（IE,FireFox）,或者从左边的树形菜单进入。");
    }
}

window.onload = function () {
    var a = document.getElementsByTagName('pre');
    for (var i = 0; i < a.length; i++) {
        //debugger;
        var b = a[i].innerHTML;
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
        //debugger;
        a[i].innerHTML = c;
    }
}