var jgui_code_soure;
function code() {
    if (jgui_code_soure) opensource();
    else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = this.responseText.replace(/[<>]/g, function (m) { return { '<': '&lt;', '>': '&gt;' }[m] });
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
                jgui_code_soure = c;
                opensource();
            }
        };
        xhr.open("GET", window.location.href.replace(/#/,''), true);
        xhr.send();
    }

    function opensource() {
        jgui.open({
            header: '源码查看窗口',
            src: "/Examples/code",
            closed: false,
            fit: true,
            onstart: function () { this.setok(jgui_code_soure); }
        });
    }
}

function jgui_del(sendobj, fn, target) {
    jgui.confirm("确定删除记录？",
 function (action) {
     if (action) {
         jgui_update(sendobj, fn, target);
     }
 });
}

function jgui_update(sendobj, fn, target) {
    $.ajax({
        url: "/Data/update",
        data: { data: sendobj.data, table: sendobj.table },
        type: 'POST',
        success: function (text) {
            if (fn) fn.call(target, text);
            if (isNaN(text)) { //非数字
                if (/重复键/.test(text))
                    jgui.alert(" 不能输入重复的数据！");
                else
                    jgui.alert(text.split('|')[0]);
            }
            else {
                if (parseInt(text) < 0)
                    jgui.alert("操作失败！")
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            jgui.alert(textStatus + ":" + jqXHR.responseText);
        }
    });
}
