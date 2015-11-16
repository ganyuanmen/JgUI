/*
* jQuery JgUI 1.0
*
* Date : 2015-11-05
* 
* Author : GanYuanMen [393909065@qq.com]
*
*/

var gmessage = {
    valid_empty: "\u5fc5\u987b\u8f93\u5165\u5185\u5bb9",//必须输入内容
    valid_int: "\u5fc5\u987b\u662f\u6574\u6570\uff01",//必须是整数！
    valid_number: "\u5fc5\u987b\u662f\u6570\u503c\uff01",//必须是数值！
    alert_ok: '\u786e\u5b9a',//确定
    alert_title: '\u63d0\u793a',//提示
    confirm_ok: '\u786e\u8ba4',//确认
    confirm_cancel: '\u8fd4\u56de',//返回
    confirm_title: '\u8bf7\u786e\u8ba4',//请确认
    file_read: "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u672c\u5730\u6587\u4ef6\u8bfb\u5199\uff01",//浏览器不支持本地文件读写！
    file_upload: '\u4e0a\u4f20\u6587\u4ef6',//上传文件
    file_del: '\u5220\u9664',//删除
    file_noup: '\u672a\u4e0a\u4f20',//未上传
    search_item: '\u67e5\u627e\u9879\u76ee',//查找项目
    search_item1: '\u6761\u4ef6\u0031',//条件1
    search_item2: '\u6761\u4ef6\u0032',//条件2
    search_context: '\u67e5\u627e\u5185\u5bb9',//查找内容
    search_allok: '\u5168\u90e8\u6ee1\u8db3\u6761\u4ef6',//全部满足条件
    search_equal: '\u7b49\u4e8e',//等于
    search_gt: '\u5927\u4e8e',//大于
    search_lt: '\u5c0f\u4e8e',//小于
    search_gte: '\u5927\u4e8e\u7b49\u4e8e',//大于等于
    search_lte: '\u5c0f\u4e8e\u7b49\u4e8e',//小于等于
    search_noequal: '\u4e0d\u7b49\u4e8e',//不等于
    search_include: '\u5305\u542b',//包含
    search_noinclude: '\u4e0d\u5305\u542b',//不包含
    search_windowtitle: '\u8868\u683c\u8fc7\u6ee4\u7a97\u53e3',//表格过滤窗口
    search_error: '\u6570\u636e\u5217\u7684\u67e5\u627e\u503c\u975e\u6cd5\uff01',//数据列的查找值非法！
    search_numbererror: '\u8be5\u5217\u53ea\u80fd\u662f\u6570\u503c\u3002', //该列只能是数值。
    search_dateerror: '\u6570\u636e\u5217\u4e2d\u65e5\u671f\u5217\u4e0d\u80fd\u5305\u542b\u67e5\u627e\uff01',//数据列中日期列不能包含查找！
    search_boolerror: '\u8be5\u5217\u53ea\u80fd\u662f\u0030\u6216\u0031\u3002',//该列只能是0或1。
    search_onlydate: '\u8be5\u5217\u53ea\u80fd\u662f\u65e5\u671f\u3002',//该列只能是日期。
    refresh_text: '\u6b63\u5728\u52a0\u8f7d\u6570\u636e\u002e\u002e\u002e',//正在加载数据...
    tabs_title: '\u6807\u9898',//标题
    date_taday: '\u4eca\u5929', //今天
    date_close: '\u5173\u95ed',  //关闭
    pager_page: '\u6bcf\u9875\u003a',//每页:
    pager_pageitem: '\u6761\u002f\u5171',//条/共
    pager_totalitem: '\u6761'//条
};

function jguiproto() {
    this.version = '1.0';
    this.uid = 0;
    this.author = 'ganyuanmen';

};
jguiproto.prototype = {
    ajax: function (o) {
        var obj=$.extend({
            type:'POST',
            data: null,
            responeType:'text',
            timeout:10000
        },o);
        var _da = new FormData();
        if ((typeof (obj.data)).toLowerCase() == 'object')
        {
            for (var _ in obj.data) {
                _da.append(_, obj.data[_]);
            }
        }
         var xhr = new XMLHttpRequest();
         xhr.open(obj.type, obj.url, true);
         xhr.responseType = obj.responeType;
         xhr.onreadystatechange = function (e) {
             if (xhr.readyState == 4 && xhr.status == 200) {
                 if (obj.success && $.isFunction(obj.success)) obj.success.call(this, (xhr.responeType == 'text' ? xhr.responseText : xhr.response));
             }
         };
          xhr.send(_da);
    },
    post: function (url, data, fn) {
        this.ajax({
            url: url,
            data: data,
            success: fn
        });
    },
    get: function () {
        this.ajax({
            type:'GET',
            url: url,
            data: data,
            success: fn
        });
    },
    //JSON字符串转JSON对象
    parseJSON: function (jstr) { if (typeof jstr == 'string') return eval('(' + jstr + ')'); else return jstr; },
    //获唯一数字编号
    getuid: function () { return ++this.uid; },
    //以窗口的方式打开src所在的网页
    open: function (obj) {
        var r = $('<div></div>').appendTo('body'); r.gwindow($.extend(obj, { close: { click: function () { r[0].destroy(); } } }));
        var iframe = $('iframe', r)[0].contentWindow || $('iframe', r)[0].contentDocument; if (obj.onstart && $.isFunction(obj.onstart)) iframe.onload = function () { obj.onstart.call(iframe); };
        if (obj.onclose && $.isFunction(obj.onclose)) $(iframe).on("unload", function () { obj.onclose.call(iframe, iframe.closeok); });
        return r;
    },
    //JSON对象转为JSON字符串
    join: function (o, f, fa) {
        if (typeof (o) != 'object') return o; if (this.isemptyobj(o)) return ""; var r = (!fa ? "{" : ""); for (var a in o) {
            r += ((f ? '"' : '') + a + (f ? '"' : '') + ':' + (f ? '"' : '')
                + (o[a] + '').replace(/,/g, "\uff0c").replace(/:/g, "\uff1a") + (f ? '"' : '') + ",");
        }  return r.substr(0, r.length - 1) + (!fa ? '}' : "");
    },
    //JSON数组转为以;分隔的JSON串（不带比引号）
    joinUrl: function (a) {
        if (!$.isArray(a)) a = $.makeArray(a); var r = "";
        a.forEach(function (v, i) {
            if (typeof (v) == 'object') {
                for (var a in v) {
                    if (typeof (v[a]) == 'string') r += a + ':' + v[a].replace(/,/,"\uff0c").replace(/:/, "\uff1a").replace(/;/, "\uff1b") + ",";
                    else r += a + ':' + v[a] + ",";
                } r = r.substr(0, r.length - 1) + ';';
            }
        });
        r = r.substr(0, r.length - 1);
        return encodeURIComponent(r);
    },
    //通过getid 或getname 获DON对象
    get: function (o, p) { p = p ? p : document; if (typeof o === 'string') { if (/#/.test(o)) return this.getid(o, p); else return this.getname(o, p); } else if (typeof o === 'object') return $(o)[0]; else if ($.isFunction(o)) return get(o.call(this), p); else if (o instanceof jQuery) return o[0]; else return undefined; },
    //通过ID 获DOM对象
    getid: function (s, p) { var _0 = $(s, p); if (_0.length) return _0[0]; else return undefined; },
    //通过name 获DOM对象
    getname: function (s, p) { var _0 = $('[name="' + s + '"]', p); if (_0.length) return _0[0]; else return this.getid('#' + s, p); },
    //计算alert,prompt参数
    _geneops: function (t, w) { var ops = { mask: true, close: false, closed: false, isHeightFit: true }; if (t) ops.header = t; if (w && parseInt(w) > 30) ops.width = w; else if (w == -1) ops.fit = true; return ops; },
    //创建FileReader
    _newreader: function () { var reader; if (typeof FileReader === 'undefined') jgui.alert(gmessage.file_read); else reader = new FileReader(); return reader; },
    //数据验证
    _valid: function (_this, valid, type,tiptarget,ex) {
        var lok = true, tiptarget = tiptarget ? tiptarget : _this, _v =ex&&ex.value?ex.value:(_this.getValue?_this.getValue():(_this.value?_this.value:(_this.innerText||_this.textContent)));
        if ($(_this).attr('required') && !_v) {
            _this.validMessage = gmessage.valid_empty;
            lok = false;
        } else {
            if (type === 'int') lok = /^\d+$/.test(_v);
            if (lok) {
                if (type == 'number') lok = !isNaN(_v);
                if (lok)
                { if (valid)  lok = valid.call(_this, _v);  }
                else   _this.validMessage = gmessage.valid_number;
            } else _this.validMessage = gmessage.valid_int;
        }
        if (!lok) {
            $(_this).css('border-color', 'red');
            $(tiptarget).gtip({ shadow: true, text: _this.validMessage });
        } else {
            if (tiptarget.removeTip) tiptarget.removeTip();
            if (ex && ex.value) $(_this).css('border-color','rgba(0,0,0,0)' );
        }
        return lok;

    },
    alert: function (s, w) {
        var o = $('<div></div>').appendTo('body'); $('<div class="g_nei"></div>').html(s).css('padding', '10px').appendTo(o);
        var b = $('<a></a>').html(gmessage.alert_ok).gbutton({ icon: 'ok', click: function () { o[0].destroy(); } });
        $('<div></div>').gtoolbar().css({ textAlign: 'center' }).append(b).appendTo(o);
        o.gwindow(this._geneops(gmessage.alert_title, w)); $('.gpanel-content', o).css('height', '');
    },
    confirm: function (s, f, w) {
        var o = $('<div></div>').appendTo('body'); $('<div class="g_nei"></div>').html(s).css('padding', '10px').appendTo(o);
        var b = $('<a></a>').html(gmessage.confirm_ok).css('margin-right', '20px').gbutton({ icon: 'ok', click: function () { if (f) f.call(this, true); o[0].destroy(); } });
        var a = $('<a></a>').html(gmessage.confirm_cancel).gbutton({ icon: 'undo', click: function () { if (f) f.call(this, false); o[0].destroy(); } });
        $('<div></div>').gtoolbar().css({ textAlign: 'center' }).append(b).append(a).appendTo(o); o.gwindow(this._geneops(gmessage.confirm_title, w)); $('.gpanel-content', o).css('height', '');
    },
    prompt: function (t, f, v, w) {
        var o;
        if (document.gprompt) {
            o = document.gprompt; $('td:first', o).html(t); $('input', o).val(''); o.click = f; if (w) o.css({ width: w }); var a = o.data('options'); if (a.maskobj) a.maskobj.show(); o.show();
        }
        else {
            document.gprompt = o = $('<div></div>').appendTo('body');
            $('<div></div>').css("textAlign", "center").append('<input class="pinput" type="text" ' + (v ? 'value="' + v + '"' : '') + ' />').css('padding', '10px').appendTo(o);
            var b = $('<a></a>').html(gmessage.confirm_ok).css('margin-right', '20px').gbutton({ icon: 'ok', click: function () { if (o.click) o.click.call(this, $('input', o).val()); o[0].close(); } });
            var c = $('<a></a>').html(gmessage.confirm_cancel).gbutton({ icon: 'undo', click: function () { o[0].close(); } });
            var c = $('<div></div>').gtoolbar().css({ textAlign: 'center' }).append(b).append(c).appendTo(o);
            o.gwindow(this._geneops(t, w));
            o.click = f;
            $('.gpanel-content', o).css('height', '');
        }
    },
    //显示手状鼠标
    pointerCursor: function (o) { o.on('mouseover', function () { $(this).css('cursor', 'pointer') }).on('mouseout', function () { $(this).css('cursor', ''); }); },
    //获对象父层内部高度
    geth: function (o) { //fit 时递归取外层高度
        if (o[0].tagName.toUpperCase() == 'BODY' || o[0].tagName.toUpperCase() == 'HTML') {
            var b = $('body');
            return $(document).height() - (parseInt(b.css('margin-top')) + parseInt(b.css('margin-bottom')) + parseInt(b.css('padding-top')) + parseInt(b.css('padding-bottom')));
        }
        else
            if (/%/.test(o[0].style.height)) {
                return geth(o.parent()) * parseInt(o[0].style.height) / 100;
            }
            else return o.height();
    },
    //获对象父层内部宽度
    getw: function (o) {
        if (o[0].tagName.toUpperCase() == 'BODY' || o[0].tagName.toUpperCase() == 'HTML') {
            var b = $('body');
            return $(document).width() - (parseInt(b.css('margin-left')) + parseInt(b.css('margin-right')) + parseInt(b.css('padding-left')) + parseInt(b.css('padding-right')));
        }
        else
            if (/%/.test(o[0].style.width)) {
                return getw(o.parent()) * parseInt(o[0].style.width) / 100;
            }
            else return o.width();
    },
    //获对象父层内部剩余高度（不包含本对象）
    getsh: function (o) {
        var ah = 0, ba = [];
        o.siblings(':not(:hidden)').each(function (i, v) {
            var $v = $(v);
            if (checkdiv(v))
                if (v.tagName.toUpperCase() != 'DIV') {
                    $v.wrap('<div></div>');//外包一层div 才能准确计算高度
                    ba.push($v);
                }
        });
        o.siblings('div:not(:hidden)').each(function (i, v) {
            if (checkdiv(v))
                ah += $(v).outerHeight(true);
        });
        ba.forEach(function (v, i) {
            $(v).unwrap();
        });
        return ah;
        function checkdiv(v) {
            var $v = $(v);
            return ($v.css('position').toUpperCase() != 'ABSOLUTE' && v.tagName.toUpperCase() != 'SCRIPT' && v.tagName.toUpperCase() != 'STYLE' && (!$v.hasClass('gwindow')));
        }
    },
    // 对象自适应最大高度
    seth: function (o) {
        if (!o) return;
        var a = [];
        var _0 = o.parent();
        while (true)   //布置前先要把隐藏的全都显示出来，否则布置会乱
        {
            if (!_0.length || _0[0].tagName.toLowerCase() == 'body') break;
            if (_0[0].style.display.toLowerCase() == 'none') a.push(_0);
            _0 = _0.parent();
        }
        a.forEach(function (v, i) {
            $(v).show();
        });
        var h = this.geth(o.parent()) - this.getsh(o);
        if (h > 5) o.outerHeight(h, true);
        a.forEach(function (v, i) {
            $(v).hide();
        });
        return false;
    },
    //设置本层宽度 ：o 本层对象
    setw: function (o) {
        o.outerWidth(this.getw(o.parent()), true);
        return false;
    },
    sethw: function (o) {  //设置本层宽度高度
        this.seth(o);
        this.setw(o);
        return false;
    },
    //设边框
    setborder: function (o, b) {
        o.css({
            borderTopWidth: b[0],
            borderRightWidth: b[1],
            borderBottomWidth: b[2],
            borderLeftWidth: b[3]
        });
    },
    todate: function (str) {
        if (!str) return undefined;
        if(str instanceof Date) return str;
        
        if ((typeof (str)).toLowerCase() == 'string') {
            if (/^\/Date\(/.test(str)) return new Date(parseInt(/\d+/.exec(str)[0]));
            var cd = new Date(Date.parse(str));
            try {
                if (isNaN(cd)) {
                    var arys = str.split('-');
                    cd = new Date(arys[0], --arys[1], arys[2]);
                    if (cd.toString().indexOf('Invalid') > -1) {
                        var arys = str.split(',');
                        cd = new Date(arys[0], --arys[1], arys[2]);
                        if (cd.toString().indexOf('Invalid') > -1) {
                            cd = undefined;
                        }
                    }
                }
            } catch (e) {
                cd = undefined;
            }
        }
        return cd;
    },
    //字符变数字，用|分隔-----------------------------------------------------
    strtonum: function (str) {
        var cstr = "";
        for (var i = 0; i < str.length; i++) {
            var k = str.charCodeAt(i);
            cstr += k + '|';
        }
        return cstr.substr(0, cstr.length - 1);
    },
    //用|分隔的数字变字符-------------------------------------------------
    numtostr: function (str) {
        var a = str.split('|');
        var cstr = '';
        for (var i = 0; i < a.length - 1; i++) {
            cstr += String.fromCharCode(a[i]);
        }
        return cstr;
    },
    //模仿C#stringFormat--------------------------------------------
    strformat: function () {
        if (arguments.length == 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    },
    //数字小数固定位--------------------------------------------------------
    genenumber: function (obj) {
        var options = $.extend({
            number: 0,
            bit: 2,
            zerotoempty: true,
            thousands: true
        }, obj);

        if (!options.number) {//0 or null
            return (options.zerotoempty ? '0' : '');
        }
        if (isNaN(options.number)) return options.number;
        var _a = new String(Math.abs(parseFloat(options.number)));
        var _b = _a.split('.');
        var _c = g0(options.bit);
        //以下操作目的是把后面的0留下
        if (_b[1]) {
            var _e = _b[1].substr(0, options.bit);
            var _re = new RegExp("0{" + _e.length + "}");
            _c = _c.replace(_re, _e);
        }
        return (options.number < 0 ? '<span style="color:red;">-' : '') + (options.thousands ? gene(_b[0]) : _b[0]) + (options.bit > 0 ? ('.' + _c) : '') + (options.number < 0 ? '</span>' : '');

        function gene(a) {
            var _r = a.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('');
            if (_r.indexOf(',') == 0) _r = _r.substr(1);
            return _r;
        }
        function g0(bit) {
            var _r = '';
            for (var i = 0; i < bit; i++) {
                _r += '0';
            }
            return _r;
        }
    },
    //数字变人民币-------------------------------------------
    genermb: function (number) {
        if (isNaN(number)) return '';
        var a = ['\u96f6', '\u58f9', '\u8d30', '\u53c1', '\u8086', '\u4f0d', '\u9646', '\u67d2', '\u634c', '\u7396'];
        var b = ['\u5143', '\u62fe', '\u4f70', '\u4edf'];
        var _a = new String(Math.abs(parseFloat(number))).split('.');
        var _b = _a[0].split('').reverse().join('').match(/(\d{1,4})/g);
        var cqw = ger(_b[0], b, a);
        if (cqw.indexOf('\u5143') != 0) cqw = cqw.replace(/\u96f6/, '\u5143');
        if (_b[1]) {
            var c1 = ger(_b[1], b, a);
            cqw += c1.length > 1 ? '\u4e07' + c1.substr(1) : '\u96f6';
        }
        if (_b[2]) {
            var c2 = ger(_b[2], b, a);
            cqw = cqw + '\u4ebf' + c2.substr(1);
        }
        cqw = cqw.replace(/\u96f6{2,}/, '\u96f6').split('').reverse().join('');
        if (_a[1])
            return cqw + a[_a[1][0]] + '\u89d2' + (_a[1][1] ? a[_a[1][1]] : '\u96f6') + '\u5206';
        else
            return cqw + '\u6574';
        function ger(str, rmb, nstr) {
            var re = '';
            for (var i = 0, l = str.length; i < l; i++) {
                re += str[i] == '0' ? "0" : rmb[i] + nstr[str[i]];
            }
            re = re.replace(/0{1,4}/g, '\u96f6');
            return re;
        }
    },
    //下载文件-----------------------------------------
    download: function (url) {
        var iframe = document.getElementById("y_iframename");
        if (!iframe) {
            iframe = $('<iframe id="myiframe" style="display:none"></iframe>').appendTo(document.body)[0];
        }
        iframe.src = url;
    },
    //检测字段是否已修改oldsource 源数据 newsource目标数据 except 排姙外的数据-----------------
    checkfield: function (options) {
        var _0 = options.oldsource, _1 = options.newsource, _2 = options.except;
        if (!options || !_0 || !_1) return;
        for (var a in _1) {
            if (checkun(a)) continue;
            if (_0[a] == _1[a]) delete _1[a];
        }
        return _1;
        function checkun(f)  //检查是否排除该字段
        {
            if (!_2 || !_2.length || _2.length == 0) return false;
            var lok = false;
            for (var a in _2) {
                if (f == _2[a]) { lok = true; break; }
            }
            return lok;
        }
    },
    //检测对象是否为空---------------------------------
    isemptyobj: function (obj) { for (var name in obj) { return false; } return true; },
    //对象的长度---------------------------------
    getobjlength: function (obj) { var i = 0; for (var name in obj) { i++; } return i; },
    //日期相减---------------------------------
    datediff: function (startdt, enddt, v) {
        if (typeof startdt == 'string')
            startdt = jgui.todate(startdt);
        if (typeof enddt == 'string')
            enddt = jgui.todate(enddt);
        switch (v) {
            case 's': return Math.round((enddt - startdt) / 1000);
            case 'n': return Math.round((enddt - startdt) / 60000);
            case 'h': return Math.round((enddt - startdt) / 3600000);
            case 'd': return Math.round((enddt - startdt) / 86400000);
            case 'w': return Math.round((enddt - startdt) / (86400000 * 7));
            case 'm': return (enddt.getMonth() + 1) + ((enddt.getFullYear() - startdt.getFullYear()) * 12) - (startdt.getMonth() + 1);
            case 'y': return enddt.getFullYear() - startdt.getFullYear();
        }
    },
    //执行js代码---------------------------------
    exec: function (code) {
        if (window.execScript)	// for IE
            window.execScript(code);
        else window.eval(code);
    }

};
var jgui = new jguiproto();
//-----------------------------------------------------------------------------------
Date.prototype.maxday = function () { 
    var date1 = (new Date(this.getFullYear(), this.getMonth(), 1));
    var date2 = date1.add('m', 1);
    var result = jgui.datediff(date1, date2, 'd');
    return result;
};
Date.prototype.tostr = function () {
    var y = this.getFullYear(), m = this.getMonth() + 1, d = this.getDate();
    m = m < 10 ? "0" + m : m; d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
};
Date.prototype.format = function (f) {
    var y = this.getFullYear(), m = this.getMonth() + 1, d = this.getDate(), h = this.getHours(), t = this.getMinutes(), s = this.getMinutes();
    return f.replace(/yyyy/, y).replace(/MM/, m > 9 ? m : '0' + m).replace(/dd/, d > 9 ? d : '0' + d).replace(/hh/, h > 9 ? h : '0' + h).replace(/mm/, t > 9 ? t : '0' + t).replace(/ss/, s > 9 ? s : '0' + s);
};

Date.prototype.add = function (v, n) {
    switch (v) {
        case 's': return new Date(Date.parse(this) + (1000 * n));
        case 'n': return new Date(Date.parse(this) + (60000 * n));
        case 'h': return new Date(Date.parse(this) + (3600000 * n));
        case 'd': return new Date(Date.parse(this) + (86400000 * n));
        case 'w': return new Date(Date.parse(this) + ((86400000 * 7) * n));
        case 'q': return new Date(this.getFullYear(), (this.getMonth() + n * 3), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
        case 'm': return new Date(this.getFullYear(), (this.getMonth() + n), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
        case 'y': return new Date((this.getFullYear() + n), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
    }
};
//------------------------------------------------------------------------------------------

(function ($) {
    //layout
    $.fn.glayout = function (options) {
        return this.each(function () {
            var olayout = $(this);
            var op = $.extend({
                fit: true,
                width: 400,
                height: 300,
                splitSize: 2
            }, jgui.parseJSON(olayout.data('options')), options);
            this.refresh = function () {
                if (op.fit) { 
                    jgui.seth(olayout);
                    olayout.outerHeight(olayout.height());
                }
                else {
                    olayout.height(op.height);
                    olayout.width(op.width);
                }
                if (op.topobj) {
                    jgui.seth(op.topobj1);
                    op.topobj.css('height', '');
                    if (!op.topobj.data('options').hidden)
                        op.topobj1.css('overflow', 'auto');
                }
                if (op.bottomobj) {
                    jgui.seth(op.bottomobj1);
                    if (!op.bottomobj.data('options').hidden)
                        op.bottomobj1.css('overflow', 'auto');
                    op.bottomobj.css('height', '');
                }
                jgui.seth(op.tcenter); 
                if (op.leftobj) {
                    op.leftobj.outerHeight(op.leftobj.parent().height(), true);
                    var _0 = op.leftobj.children(':first');
                    _0.outerHeight(_0.parent().height(), true); 
                    jgui.seth(op.leftobj1);
                    _0.css('height', '');
                    op.leftobj.css('height', '');
                    op.leftobj1.css('overflow', 'auto');
                }
                if (op.rightobj) {
                    op.rightobj.outerHeight(op.rightobj.parent().height(), true);//table-cell层
                    var _0 = op.rightobj.children(':first');
                    _0.outerHeight(_0.parent().height(), true); 
                    jgui.seth(op.rightobj1);
                    _0.css('height', '');
                    op.rightobj.css('height', '');
                    op.rightobj1.css('overflow', 'auto');
                }
                jgui.seth(op.centerobj); 
                jgui.seth(op.centerobj.children('div').eq(0));
                jgui.seth(op.centerobj1); 
                op.centerobj1.css('overflow', 'auto');
                op.centerobj.children('div').eq(0).css('height', '');
                op.centerobj.css('height', '');
                op.tcenter.css('height', '');
                olayout.css('height', '');
                return false;
            };
            this.reseth = function (h) {
                op.centerobj1.outerHeight(op.centerobj1.outerHeight() + h, true);
                if (op.leftobj) op.leftobj1.outerHeight(op.leftobj1.outerHeight() + h, true);
                if (op.rightobj) op.rightobj1.outerHeight(op.rightobj1.outerHeight() + h, true);
                if (op.leftobj1.is(':hidden'))
                    op.leftobj1.siblings(':first').outerHeight(op.centerobj1.outerHeight(), true);
                if (op.rightobj1.is(':hidden'))
                    op.rightobj1.siblings(':first').outerHeight(op.centerobj1.outerHeight(), true);
            };
            var c = $('<div style="display:table;width:100%;table-layout:fixed;" ></div>');
            olayout.children('div').each(function (i, v) {
                var $v = $(v), ops = $.extend({ region: null, close: null, collapse: null, title: null, headerIcon: null, height: 80, width: 120, hidden: false }, jgui.parseJSON($(v).data('options')));
                if (ops.region && 'top,left,center,bottom,right'.indexOf(ops.region.toLowerCase()) > -1) {
                    $v.css({ border: '0px solid #d2d2d2' }).wrapInner('<div style="height:10px;overflow:hidden;margin:0;padding:0;"></div>');
                    op[ops.region + 'obj1'] = $v.children('div').eq(0);
                    if (ops.border) jgui.setborder($v, ops.border);
                    op[ops.region + 'obj'] = $v;
                    if (ops.title) {
                        var o = { header: ops.title, close: ops.close, max: null, collapse: ops.collapse, headerIcon: ops.headerIcon, gcontent: $v.children(':first') }; //gcontent用于collapse      
                        if ((ops.region == 'left' || ops.region == 'right') && o.collapse) {
                            $.extend(o, { close: false, collapse: false, collapse1: true }); 
                        }
                        if (o.close) o.close = {
                            click: function () {
                                if (ops.region == 'top' || ops.region == 'bottom') {
                                    olayout[0].reseth(this.outerHeight());
                                }
                                $v.remove();
                            },
                            obj: $v
                        };
                        if (o.collapse) o.collapse = {
                            click: function () {
                                var _0 = this.outerHeight();
                                olayout[0].reseth(this.css('display') == 'none' ? _0 : 0 - _0);
                            },
                            obj: o.gcontent
                        };
                        if (o.collapse1) o.collapse1 = {  
                            click: function (fa) {
                                var b = this.siblings().eq(0);
                                if (fa) {
                                    this.hide();
                                    this.parent().parent().outerWidth(36);
                                    b.outerHeight(this.outerHeight() + b.outerHeight(), true);
                                }
                                else {
                                    this.parent().parent().outerWidth(ops.width);
                                    b.outerHeight(ops.douheight, true);
                                    this.show();
                                }
                            },
                            obj: o.gcontent
                        };
                        if (ops.region == 'center') {  //center不允许有 close collapse 
                            $.extend(o, { close: false, collapse: false });
                        }
                        var t = $('<div></div>').gtitlebar(o);
                        $v.prepend(t);
                        ops.douheight = t.outerHeight();
                    } else {
                    }
                    if (ops.region === 'top') { $v.data('options', ops); $v.outerHeight(ops.height, true); $v.css({ marginBottom: op.splitSize }); }
                    if (ops.region === 'bottom') { $v.data('options', ops); $v.outerHeight(ops.height, true); $v.css({ marginTop: op.splitSize }); }
                    if (ops.region === 'left') {
                        $v.wrap('<div class="gtcell" ></div>');
                        op.leftobj = $v.css({ marginRight: op.splitSize }).parent();
                        c.append(op.leftobj.outerWidth(ops.width, true));
                        op.leftobj.data('options', ops);
                    }
                    if (ops.region === 'right') {
                        $v.wrap('<div class="gtcell" ></div>'); 
                        op.rightobj = $v.css({ marginLeft: op.splitSize }).parent();
                        c.append(op.rightobj.outerWidth(ops.width, true));
                        op.rightobj.data('options', ops);
                    }
                    if (ops.region === 'center') {
                        $v.wrap('<div class="gtcell" style="width:100%;" ></div>');
                        $v.css('margin', 0);
                        op.centerobj = $v.parent();
                    }
                    $v.removeAttr('data-options');
                } else $v.remove();
            });
            if (op.leftobj) c.prepend(op.leftobj);
            c.append(op.centerobj);
            if (op.rightobj) c.append(op.rightobj);
            op.tcenter = c;
            olayout.append(c);
            if (op.topobj) olayout.prepend(op.topobj);
            if (op.bottomobj) olayout.append(op.bottomobj);
            this.refresh();
            olayout.data('options', op);
        });
    };
    //menu
    $.fn.gmenu = function (options) {
        return this.each(function () {
            var isin = false;
            var omenu = $(this);
            var op = $.extend({
                click: null,
                poupuid: '' 
            }, jgui.parseJSON(omenu.data('options')), options);
            omenu.html(omenu.html() + '&nbsp;<span style="background-position-y:3px; width:18px; display:inline-block;" class="g-collapse">&nbsp;</span>');
            op.img = omenu.children('span');
            omenu.wrap('<div style="position:relative;"></div>');
            omenu.gbutton();
            omenu.on('click', function () {
                $(".gmenu").each(function (i, v) {
                    if (!$(v).is(omenu)) {
                        var o = $(v).data('options');
                        if (!o.poupuobj.is(':hidden')) o.poupuobj.hide();
                    }
                });
                if (op.poupuobj.is(':hidden')) {
                    op.poupuobj.show();
                    op.img.removeClass('g-collapse').addClass('g-expand');
                    $(document).on('click', function () {
                        op.poupuobj.hide();
                        op.img.removeClass('g-expand').addClass('g-collapse');
                    });
                } else {
                    op.poupuobj.hide();
                    op.img.removeClass('g-expand').addClass('g-collapse');
                    $(document).off('click');
                }
                return false;
            }
            );
            if (op.poupuid) {
                op.poupuobj = $(op.poupuid).addClass("gcombo-poupu").css({ width: $(op.poupuid).outerWidth() + 24, top:23, left: 0, display: 'none' }).appendTo(omenu.parent());
                op.poupuobj.children('div').each(function (i, v) {
                    var a = jgui.parseJSON($(v).data('options')).icon;
                    $(v).addClass('.gcombo-poupu-combo').prepend('<span style="background-position-y:3px; width:22px; display:inline-block;"' + (a ? 'class="g-' + a + '"' : "") + '>&nbsp;</span>');
                });
                var _0 = 'gcombo-poupu-move';
                op.poupuobj.delegate('div', 'mouseover', function (e) {
                    if (!$(this).hasClass(_0)) $(this).addClass(_0);
                }).delegate('div', 'mouseout', function () {
                    if ($(this).hasClass(_0)) $(this).removeClass(_0);
                }).delegate('div', 'click', function () {
                    op.poupuobj.hide();
                    if (op.itemClick) op.itemClick.call(this, jgui.parseJSON($(this).data('options')));
                    op.img.removeClass('g-expand').addClass('g-collapse');
                    return false;
                });
            }
            omenu.data('options', op);
        });
    };
    //buton
    $.fn.gbutton = function (options) {
        return this.each(function () {
            var obutton = $(this);
            var op = $.extend({
                click: null,
                icon: null,
                para: null,
                target:undefined
            }, jgui.parseJSON(obutton.data('options')), options);
            obutton.data('options', op);
            obutton.attr('href', '#');
            this.set = function (attr,v) { op[attr] = v };
            if (!obutton.hasClass('gbutton')) obutton.addClass('gbutton');
            if (op.icon)
                obutton.addClass('g-' + op.icon).css({ paddingLeft: 24, backgroundPosition: '5px center',backgroundColor:'#DDEAF7' });
            if (op.click) {
                obutton.on('click',function(){ op.click.call(op.target,op.para)});
            }
            obutton.on("mouseover", function (e) { this.style.backgroundColor = '#aae5f7'; }).on("mouseleave", function () { this.style.backgroundColor = '#DDEAF7'; });

        });
    };
    //file
    $.fn.gfile = function (options) {
        function _uploadblob(file, div, action) {
            div.children("span:first").html(file.name);
            var _a = div.children("span").eq(1).children("progress");
            if (_a.length) _a.val(0); else _a = $('<progress class="gpro"></progress>').attr('max', 100).attr("value", 0).appendTo(div.children("span").eq(1));
            var _0 = 0, _1 = 2 * 1024 * 1024, _2 = Math.ceil(file.size / _1), _3 = 0, _4 = (new Date()).getTime();
            var reader = jgui._newreader();
            reader.onprogress = function (e) { _0 += e.loaded; _a[0].value = Math.round((_0 / file.size) * 100); };
            reader.onload = function (e) {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('load', function (e) {
                    if (++_3 <= _2) {
                        blob = file.slice((_3) * _1, Math.min(file.size, (_3 + 1) * _1));
                        reader.readAsArrayBuffer(blob);
                    }
                    if (_3 == _2) { div.children("span:last").html('ok'); _a[0].value = 100; }
                }, false);
                xhr.open("POST", action + "?f=" +encodeURIComponent(file.name) + "&guid=g_" + _4 + "&c=" + (new Date()).getTime());
                xhr.setRequestHeader("gfalg", "1,"+_2+','+_3);
                xhr.send(e.target.result);
            };
            var blob = file.slice(0, _1);
            reader.readAsArrayBuffer(blob);
        }
        function _click(e) {
            if (!this.files.length) return;
            var file = this.files.shift(), action = this.action;
            up.call(this, file);
            function up(file) {
                var _this = this, p = file.divobj, pro = p.children('span').eq(1).children("progress")[0], but = p.children("span:last");
                var xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function (e) { pro.value = Math.round(e.loaded / e.total * 100);};
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            but.html(xhr.responseText);
                            if (_this.files.length) {
                                up.call(_this, _this.files.shift());
                            }
                        } else {
                           jgui.alert(xhr.responseText,-1);
                            but.html('<span style="color:red;">'+gmessage.file_noup+'</span>');
                            if (_this.files.length) 
                                up.call(_this, _this.files.shift());
                        }
                    }
                };
                xhr.open("POST", this.action+ "?f=" +encodeURIComponent(file.name) , true);
                xhr.setRequestHeader("gfalg", "0");
                xhr.send(file);
            }
        };
        function _remove(e)
        {
            var j = -1;
            for (var i = 0; i < this.arr.length; i++)
            {
                if (this.arr[i].divobj.is(this.obj)) { j = i; break;}
            }
            if (j > -1)
                this.arr.splice(j, 1);
            this.obj.remove();
        }
        return this.each(function () {
            var ofile = $(this);
            var op = $.extend({
                fileChange: function () { return true;},
                icon: null,
                multiple: false,
                height: 200,
                action: "",
                timeout:120,
                fileLoad: null,
               uploadBlob:false
            }, jgui.parseJSON(ofile.data('options')), options);
            ofile.gbutton({icon:op.icon});
            var _0 = jgui.getuid();
             op.fileobj=$('<input type="file" />').attr('name', "$file" + _0).attr('id', "$file" + _0).appendTo(ofile);
             ofile.on('mousemove', function (e) {
                 op.fileobj.offset({ top: e.clientY - 15, left: e.clientX - 20 });
            });
            this.getValue = function () {
                return op.fileobj[0].files[0];
            };
            if (op.multiple) { 
                op.files = [];
                ofile.wrap("<div></div>").wrap("<div></div>");
                op.okbutton = $("<a></a>").html(gmessage.file_upload).gbutton({ icon: 'upload', click: _click, target: op }).css({ textAlign: 'right' }).appendTo(ofile.parent().css('background', 'linear-gradient(to bottom,#EFFDFF,#9DB8D4)'));
                op.okbutton.wrap('<div style="float:right" ></div>');
                op.gparant = ofile.parent().parent();
                op.gparant.css({ border: "1px solid #d2d2d2", width: (op.width ? op.width : '') });
                op.gdiv = $('<div></div>').height(op.height).css({ overflow: 'auto', padding: '2px 5px' }).appendTo(op.gparant);
            } else {
                if (op.uploadBlob) 
                {
                    ofile.wrap("<div></div>");
                    op.gdiv = $('<div></div>').addClass('filediv').html('<span></span><span></span><span></span>').appendTo(ofile.parent());
                }
            }
            if (op.fileChange && $.isFunction(op.fileChange))
            {
                ofile.children("input:first").on("change", function () {
                    var file=this.files[0];
                    var _0 = op.fileChange.call(null,file);
                    if (!op.multiple) {
                        if (_0 && op.fileLoad && $.isFunction(op.fileLoad) && !op.uploadBlob) {
                            var reader = jgui._newreader(); reader.readAsDataURL(file);
                            reader.onload = function () { op.fileLoad.call(null, this.result) };
                        } else if (op.uploadBlob) _uploadblob(file, op.gdiv,op.action);
                    } else { 
                        if (_0) {
                            op.files.push(file);
                            op.files[op.files.length - 1]['divobj'] = _0 = $('<div></div>').addClass('filediv').attr("index", op.files.length - 1).appendTo(op.gdiv);
                            _0.html('<span></span><span></span><span></span><span></span>');
                            _0.children("span:first").html(file.name);
                            $('<progress class="gpro"></progress>').attr('max', 100).attr("value", 0).appendTo(_0.children("span").eq(1));
                            $("<a></a>").html(gmessage.file_del).gbutton({ icon: 'remove', click: _remove, target: { arr: op.files, obj: _0 } }).appendTo(_0.children("span").eq(2));
                        }
                    }
                });
            }
        });
    };
    //combo
    $.fn.gcombo = function (options) {
        function genefilter(e, obj)
        {
            var a = e.text, b = e.text.length;
            for (var i = b; i > 0; i--) {
                genestr(a.substr(b - i, i),e.id);
            }

            function genestr(str,id) { 
                for (var j = 0; j < str.length; j++) {
                    var c ='g'+ str.substr(0, j + 1);
                    if (obj[c]) {
                        var lok = true;
                        for (var k = 0; k < obj[c].length; k++)
                        {
                            if (obj[c][k].id == id) { lok = false; break;}
                        }
                        if(lok) obj[c].push(e);
                    }
                    else obj[c] = [e];
                }
            }
        }
        function _set(i, op, ocombo) {
            if (ocombo.data('index') != i && op.onChange && $.isFunction(op.onChange)) {
                op.onChange.call(ocombo[0], op.data[i]);
            }
            op.textobj.val(op.data[i][op.text]);
            ocombo.data('index', i);
            op.textobj.trigger("change").trigger("blur");
        };
        function init(ocombo, op) {
            var _0 = ocombo.outerHeight();
            op.poupuobj = $('<div class="gcombo-poupu"></div>').css({ height: op.poupuHeight, width: op.poupuWidth-4, top: _0, left: 0, display: 'none' }).appendTo(ocombo);
            op.poupuobj.on('click', function () { return false; });
            jgui.pointerCursor(op.imgobj);
            op.imgobj.on('click', function (e) {
                if (op._isdisable) return false;
                $(".gcombo").each(function (i, v) {
                    if (!$(v).is(ocombo)) {
                        var o = $(v).data('options');
                        if (o.poupuobj)
                            if (!o.poupuobj.is(':hidden')) o.poupuobj.hide();
                    }
                });
                if (op.poupuobj) {
                    if (op.poupuobj.is(':hidden')) {
                        op.poupuobj.show();
                        $(document).on('click', function () {
                            op.poupuobj.hide();
                            $(this).off('click');
                        });
                        return false;
                    }
                    else {
                        if (arguments.length > 1) return false;
                        op.poupuobj.hide();
                        $(document).off('click');
                        return false;
                    }
                }
                return false;
            });
            if (!op.edit) {
                op.textobj.on('keydown', function () { return false; })
                          .on('click', function () {
                              op.imgobj.triggerHandler('click');
                              return false;
                          });
                jgui.pointerCursor(op.textobj);
            } else {
                if (op.isFilter)
                {
                    op.tvalue = '';
                    op.textobj.on('keyup', function () {
                        var v ='g'+ $.trim(op.textobj.val());
                        if (op.tvalue == v) return false;
                        ocombo[0].setData(v == 'g' ? op.sdata : (op.filterdata[v] ? op.filterdata[v] : []),true);
                        op.imgobj.triggerHandler('click', true);
                        op.tvalue = $.trim(op.textobj.val());
                        return false;
                    });
                }
            }
            if (op._iscombo) {
                var _0 = 'gcombo-poupu-move';
                if (!op.islockheight) op.poupuobj.css('height', '');
                jgui.pointerCursor(op.poupuobj);
                if (op.data) {
                    if ($.isArray(op.data))
                        ocombo[0].setData(op.data);
                    else {
                        if ($.isFunction(op.data)) {
                            var a = op.data.call(this);
                            ocombo[0].setData(a);
                        }
                    }
                } else {
                    if (op.url) {
                        ocombo[0].setUrl(op.url);
                    }
                }
                op.poupuobj.delegate('div', 'mouseover', function (e) {
                    if (!$(this).hasClass(_0)) $(this).addClass(_0);
                }).delegate('div', 'mouseout', function () {
                    if ($(this).hasClass(_0)) $(this).removeClass(_0);
                }).delegate('div', 'click', function () {
                    op.poupuobj.hide();
                    _set($(this).data('index'), op, ocombo);
                    return false;
                });
            } else {
                if (op._type=='date') op.poupuobj.css('width', '').css('height', '');
            }
        };
        return this.each(function () {
            var ocombo = $(this);
            var op = $.extend({
                name: null,
                width: 200,
                img: 'gcombo-img',
                data: null,
                url: null,
                id: 'id', 
                text: 'text',  
                edit: false,
                value: false,
                poupuobj: null,  
                poupuHeight: 200,
                poupuWidth:undefined,
                islockheight: false,
                isup: false,
                valid: null,
                valueId:'id',
                _vresult: true,
                isleft: false,
                _iscombo: true,  
                _isdisable: false,  
                _type: 'combo',   
                isFiter:false 
            }, jgui.parseJSON($(this).data('options')), options);
            if (!op.poupuWidth) 
                op.poupuWidth = op.width;
            ocombo.wrap('<div style="position:relative;"></div>');
            if (!ocombo.hasClass('gcombo')) ocombo.addClass('gcombo ');
            ocombo.append('<div></div>');
            ocombo.children('div:first').append('<table><tr><td></td><td></td></tr></table>');
            op.textobj = $('<input class="gcombo-text"></input>').css({ width: op.width-23, height: 18 }).appendTo($('td:first', ocombo));
            op.imgobj = $('<div class="' + op.img + '"></div>').css({ width: 18,height:18 }).appendTo($('td:last', ocombo));
            op.sdata = op.data; 
            ocombo.css({ width: op.width  });
            if (op.name) ocombo.attr('name', op.name);
            op.textobj.on('focus', function () {
                ocombo.css({ borderColor: 'blue', boxShadow: '0 -1px 0 #e0e0e0 inset, 0 1px 2px rgba(0, 0, 0, 0.23) inset' });
            }).on('blur', function () {
                ocombo.css({ boxShadow: '', borderColor: (op._vresult ? '#d2d2d2' : 'red') });
            }).on("change", function () {
                if (ocombo[0].valid() && op.textobj.removeTip) op.textobj.removeTip();
            });
            this.get = function (a) {return op[a] };
            this.setIndex = function (i) {
                if (op.data)
                    if (op.data[i]) _set(i, op, ocombo);
            };
            this.clear = function () { op.textobj.val(''); ocombo.data('index', -1); };
            this.setValue = function (cid) {
                if (op.data) {
                    var lok = true;
                    for (var i = 0; i < op.data.length; i++) {
                        if (op.data[i][op.id] == cid) {
                            _set(i, op, ocombo);
                            lok = false;
                            break;
                        }
                    }
                    if (lok) {
                        eval('op.data.push({' + op.id + ":'" + cid + "'," + op.text + ':"' + cid + '"})');
                        _set(op.data.length - 1, op, ocombo);
                    }
                }
                return false;
            };
            this.getValue = function () {
                var r = '';
                switch (op._type) {
                    case 'combo':
                        var _0=ocombo.data('index');
                        r = (_0 > -1 ? op.data[_0][op.valueId] : '');
                        break;
                    case 'treeselect':
                        r = op.tree_id; break;
                    case 'date':
                        r = op.date;
                }
                return r;
            };
            this.getText = function () {
                return op.textobj.val();
            };
            this.getRecord = function () {
                var _0 = ocombo.data('index');
                if (_0 > -1) return op.data[_0];
            };
            this.disable = function (fa) {
                op.textobj.prop('disabled', fa);
                op._isdisable = fa;
            };
            this.setData = function (data,bz) { //bz isfilter的refresh
                op.data = data;
                op.poupuobj.empty();
                if (!bz) op.textobj.val('');
                ocombo.data('index', -1);
                if (op.edit && op.isFilter && !op.filterdata)
                {
                    op.filterdata = {};
                    for (var i = 0; i < op.data.length; i++)
                    {
                        genefilter(op.data[i], op.filterdata);
                    }
                }
                $.each(op.data, function (i, v) {
                    op.poupuobj.append($('<div class="gcombo-poupu-combo">' + v[op.text] + '</div>').data('index', i));
                    if (i > 20) return false;
                });
                if (op.isup) {
                    op.poupuobj.css('top', op.poupuobj.offset().top - op.poupuobj.outerHeight());
                }
                if (op.isleft) {
                    op.poupuobj.css('left', op.poupuobj.offset().left - op.poupuobj.outerWidth());
                }
                if (op.value !== false) 
                    this.setValue(op.value);
                if (data.length == 0) op.poupuobj.height(10); else op.poupuobj.css('height','');
                if (op.poupuobj.height() > op.poupuHeight) op.poupuobj.height(op.poupuHeight);
            };
            this.setUrl = function (url) {
                $.get(url, op.para).done(function (obj) {
                    if (typeof (obj) === 'string') {
                        obj = jgui.parseJSON(obj);
                    }
                    if ($.isArray(obj)) {
                        op.sdata = obj;
                        ocombo[0].setData(obj);
                        op.url = url;
                    }
                }).fail(function (e, r) {
                    alert(e.statusText + '[' + e.status + ']');
                });
            };
            this.getIndexFromId = function (cid) {
                for (var i = 0; i < op.data.length; i++) {
                    if (op.data[i][op.id] === cid) {
                        break;
                    }
                }
                return i;
            };
            this.valid = function () { op._vresult = jgui._valid(this, op.valid,null,op.textobj); return op._vresult; };
            init(ocombo, op);
            ocombo.data('options', op);
        });
    };
    //date
    $.fn.gdate = function (options) {
        function showdate(cda, op) {
            var row = op.row;
            cleardate(row);
            var a = jgui.todate(cda), c;
            var b = a.maxday() + 1;
            var k = 0; 
            for (var i = 1; i < b; i++) {
                c = new Date(a.getFullYear(), a.getMonth(), i);
                var d = c.getDay();
                var ocell = $('<div class="gdate-cel"></div>').html(i).on('mouseover', function () {
                    if (!$(this).hasClass('gdate-cursor'))
                        $(this).addClass('gdate-cursor');
                }).on('mouseout', function () {
                    if ($(this).hasClass('gdate-cursor'))
                        $(this).removeClass('gdate-cursor');
                }).on('click', function () {
                    op.date = new Date(op.date.getFullYear(), op.date.getMonth(), $(this).text());
                    op.textobj.val(op.date.tostr());
                    op.textobj.trigger('change').trigger('blur'); 
                    op.poupuobj.hide();
                });
                row.eq(k).children().eq(d).append(ocell);
                if (d == 6) k++;
            }
            op.textobj.val(a.tostr());
            op.date = a;
            op.poupuobj.children('div:first').children('div:eq(2)').html(op.date.getFullYear() + '\u5e74' + (op.date.getMonth() + 1) + '\u6708');
        }
        function cleardate(row) {
            row.each(function (i, v) {
                $(v).children().each(function (j, k) {
                    $(k).html('');
                });
            });
        };
        function setmonth(n, op) {
            var _0 = op.date.getMonth();
            _1 = op.date.getFullYear();
            if (n > 0)
                if (_0 == 11) {
                    _0 = 0; _1++;
                } else _0++;
            else
                if (_0 == 0) {
                    _0 = 11; _1--;
                } else _0--;
            showdate(new Date(_1, _0, op.date.getDate()), op);
        };
        function setyear(n, op) {
            var _0 = op.date.getFullYear();
            _0 += n;
            showdate(new Date(_0, op.date.getMonth(), op.date.getDate()), op);
        };
        function init(odate, op) {
            var _0 = op.poupuobj.children('div.gdate-poupu');
            if (_0) {
                for (var i = 0; i < 7; i++) {
                    var myc = $('<div style="display:table-row"></div>').appendTo(_0);
                    for (j = 0; j < 7; j++) {
                        $('<div class="gdate-cell"' + ((j == 0 || j == 6) ? 'style="color:red;"' : "") + '></div>').appendTo(myc);
                    }
                }
                var arr = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
                _0.children('div:first').children('div').each(function (i, v) {
                    $(v).html('<div style="width:28px;' + ((i == 0 || i == 6) ? "color:red;" : "") + '">' + arr[i] + '</div>');
                });
                op.row = _0.children('div:gt(0)');
                _0 = op.poupuobj.children('div').eq(0);
                $('<div class="g-collapse1 gdate-img" ></div>').width(20).on('click', function () { setyear(-1, op); }).appendTo(_0);
                $('<div class="g-left1 gdate-img" ></div>').width(20).on('click', function () { setmonth(-1, op); }).appendTo(_0);
                $('<div class="gdate-img" style="width:146px; text-align:center;" ></div>').appendTo(_0);
                $('<div class="g-right1 gdate-img"></div>').width(20).on('click', function () { setmonth(1, op); }).appendTo(_0);
                $('<div class="g-expand1 gdate-img"  ></div>').width(20).on('click', function () { setyear(1, op); }).appendTo(_0);
                $('<div></div>').addClass('gdate-button').appendTo(op.poupuobj);
                $('<a></a>').html(gmessage.date_taday).gbutton({ icon: 'ok', para: { o: odate, p: op.poupuobj }, click: function (obj) { obj.o[0].setValue(new Date()); obj.p.hide(); }}).appendTo(op.poupuobj.children("div:last"));
                $('<a></a>').html(gmessage.date_close).gbutton({ icon: 'exit', para: op.poupuobj, click: function (obj) { obj.hide(); } }).appendTo(op.poupuobj.children("div:last"));
                showdate(op.date, op); 
            }
        }
        return this.each(function () {
            var odate = $(this);
            var op = $.extend({
                date: new Date(),
                img: 'g-date'
            }, jgui.parseJSON($(this).data('options')), options);
            odate.gcombo($.extend(op,{ img: 'g-date', _iscombo: false,_type:'date' }));
            op = odate.data('options');
            op.date = jgui.todate(op.date);
            op.poupuobj.append('<div style="width:100%;display:table;"></div>');
            op.poupuobj.append('<div class="gdate-poupu"></div>');
            init(odate, op);
            odate.data('options', op);
            this.getFormatValue = function () {
                return op.date.tostr();
            };
            this.setValue = function (cda) {
                op.date = jgui.todate(cda);
                showdate(op.date, op);
            };
            this.setIndex = null, this.getRecord = null, this.setData = null, this.getIndexFromId = null, this.setUrl = null;
        });
    };
    //treeselect
    $.fn.gtreeselect = function (options) {
        function _click(e, op) {
            if (op.leafNode) {
                if (this.children('span').find('.gtree-leaf').length) {
                    settree(op,e);
                }
            } else settree(op,e);
        }
        function settree(op,e) {
            op.tree_id = e.id;
            op.textobj.val(e.text);
            op.textobj.trigger('change').trigger('blur');
            op.poupuobj.hide();
            if (op.onChange && $.isFunction(op.onChange)) op.onChange.call(this, op.tree_id);
        }
        return this.each(function () {
            var otreeselect = $(this);
            var op = $.extend({
                leafNode: false,
                onChange:null
            }, jgui.parseJSON($(this).data('options')), options);
            otreeselect.gcombo($.extend(op,{ _iscombo: false,_type:'treeselect',islockheight: true }));
            op = otreeselect.data('options');
            op.tree_id = '';
            op.treeobj = $('<div></div>').appendTo('body').gtree({ url: op.url, fit: false, click: _click, clickTarget: op, checkboxNode: false, expandOnClickItem: true });
            op.treeobj.unwrap();
            op.poupuobj.append(op.treeobj);
            otreeselect.data('options', op);
            this.setValue = function (cid) {
                op.treeobj[0].geach(function (e) {
                    if (e.id == cid) {
                        settree(op, e); return false;
                    }
                    else return true;
                });
            };
            this.clear = function () {
                op.tree_id = -1;
                op.textobj.val('');
            };
            this.setUrl = function (url) { 
                    op.tree_id = undefined;
                    op.textobj.val('');
                    op.url = url;
                op.treeobj[0].load(url);
            };
            this.setData = function (data) { op.treeobj[0].setData(data); };
            this.setIndex = null, this.getRecord = null, this.getIndexFromId = null;
            });
    };
    //text
    $.fn.gtext = function (options) {
        return this.each(function () {
            var otext = $(this);
            var op = $.extend({
                name: null,
                value: '',
                width: null,
                valid: null,
                typeValid: null,
                _vresult: true  
            }, jgui.parseJSON($(this).data('options')), options);
            if (!otext.hasClass('gtext')) otext.addClass('gtext');
            if (op.fitWidth) {
                otext.outerWidth(window.getComputedStyle(otext.parent()[0]).length);
            }
            otext.on('focus', function () {
                $(this).css({ borderColor: 'blue', boxShadow: '0 -1px 0 #e0e0e0 inset, 0 1px 2px rgba(0, 0, 0, 0.23) inset' });
            }).on('blur', function () {
                $(this).css({ boxShadow: '', borderColor: (op._vresult ? '#d2d2d2' : 'red') });
            }).on("change", function () {
                if (this.valid() && this.removeTip) this.removeTip();
            });
            if (op.name) otext.attr('name', op.name);
            if(op.width)
                otext.width(op.width);
            otext.val(op.value);
            this.setValue = function (v) { if (v != undefined && v != null) $(this).val(v); $(this).trigger("change").trigger("blur"); };
            this.getValue = function () { return $(this).val(); };
            this.valid = function () { op._vresult = jgui._valid(this, op.valid, op.typeValid); return op._vresult; };
        });
    };
    //radio
    $.fn.gradio = function (options) {
        return this.each(function () {
            var oradio = $(this);
            var op = $.extend({
                name: null,
                value: '',
                width: 100,
                data: [],
                align:'left'
            }, jgui.parseJSON($(this).data('options')), options);
            if (!oradio.hasClass('gradio')) oradio.addClass('gradio');
            if (op.name) oradio.attr('name', op.name);
            oradio.css({ width: op.width-4, textAlign: op.align });
            op.data.forEach(function (v, i) {
                oradio.append('<label for="$gradio_' + i + '">' + v.text + '</label><input id="$gradio_' + i + '" type="radio" name="$gradio_" />');
            });
            this.setValue = function (v) {
                if (v!==undefined) {
                    for (var i=0;i < op.data.length; i++)
                    {
                        if (op.data[i].id == v) { oradio.children('input').eq(i).prop('checked', true); break; }
                    }
                }
            };
            this.getValue = function () {
                var r;
                oradio.children('input').each(function (i, v) {
                    if($(v).prop('checked'))
                    { r = op.data[i].id;return false}
                });
                return r;
            };
            if (op.value) oradio[0].setValue(op.value); else oradio.children("input:first").prop('checked', true);
        });
    };
    //grid
    $.fn.ggrid = function (options) {
        function refreshcell(obody) {
            if (obody.selectcell) {
                obody.selectcell.find('td').removeClass('row-select');
                obody.selectcell = undefined;
            }
            if (obody.selectcell) {
                obody.selectcell.children('div').css({ backgroundColor: '' });
                obody.selectrow = undefined;
            }
        };
        function getformat(v, f) {
            var o = { number: v, zerotoempty: /0/.test(f), bit: 0, thousands: /,/.test(f) };
            var bit = /[123456789]/.exec(f);
            if (bit && bit[0]) o.bit = bit[0];
            return jgui.genenumber(o);
        };
        function genecell(v, row,vv) {
            var vv = vv!==undefined ? vv : row[v.field];
            if (v.dateFormat && /^\/Date\(/.test(vv)) {
                var a = /\d+/.exec(vv);
                var riqi = new Date(parseInt(a[0]));
                vv = riqi.format(v.dateFormat);
            } else {
                if (v.render) vv = v.render.call(this, { record: row, value: vv });
                if (v.format) vv = getformat(vv, v.format);
            }
            return vv 
        };
         function maskcell(v,j,op)
        {
             var row = op.data[j];
             var _ = $('<div></div>').html(genecell(v, row));
            if (v.edit)
            {
                _.prop('contenteditable', true)
                    .on('keyup', function (e) {
                        if (e.keyCode == 9) {
                            var _0 = $(this).parent().parent().children('td');
                            if (e.shiftKey)
                                for (var j = $(this).parent().data('options').col - 1 ; j > -1; j--) {
                                    if ($(_0[j]).children('div').attr('contenteditable')) {
                                        set(); break;
                                    }
                                }
                            else
                                for (var j = $(this).parent().data('options').col + 1, l = _0.length; j < l; j++) {
                                    if ($(_0[j]).children('div').attr('contenteditable')) {
                                        set(); break;
                                    }
                                }
                            return false;
                        }
                            function set()
                            {
                                    $(_0[j]).trigger('click');
                                    $(this).trigger("blur");
                                    $(_0[j]).children("div").trigger('focus');
                                }
                    })
                    .on('keydown', function (e) {
                        switch (e.keyCode)
                        {
                            case 13:
                            case 40:
                            case 38:
                                var j = $(this).parent().data('options').col;
                                var _0=$(this).parent().parent();
                                var _tr = e.keyCode == 38 ? _0.prev('tr') : _0.next('tr');
                                if (_tr.length && _tr.children("td").eq(j).children("div").attr('contenteditable')) {
                                    _tr.trigger('click');
                                    _tr.children("td").eq(j).trigger('click');
                                    $(this).trigger("blur");
                                    _tr.children("td").eq(j).children("div").trigger('focus');
                                }
                                return false;
                                break;
                            case 9:
                                return false;
                                break;
                        }
                    })
                    .on('blur', function () {
                        var _v = this.innerText || this.textContent, t = $(this);
                        _v = (v.dataType == 'N' || v.dataType == 'I') ? _v.replace(/,/g, '') : _v;
                        if (_v != op.data[j][v.field] || t.parent().hasClass('g-_edit')) {
                            var i = 0;
                            if (!t.parent().hasClass('g-_edit')) t.parent().addClass("g-_edit");
                            for (; i < op.editdata.length; i++) {
                                if (op.editdata[i]._index == j) break;
                            }
                            if (i < op.editdata.length)
                                op.editdata[i][v.field] = _v;
                            else {
                                op.editdata.push({ _index: j});
                                i = op.editdata.length - 1;
                                op.editdata[i][v.field] = _v;
                            }

                            if (v.dataType == 'N' || v.dataType == 'I') 
                                op.editdata[i]['_' + v.field] = jgui._valid(this, null, v.dataType == 'N' ? 'number' : 'int', this, { value: _v });
                            if (v.editValid && $.isFunction(v.editValid)) 
                                op.editdata[i]['_' + v.field] = jgui._valid(this, v.editValid, null, this, { value: _v });
                            this.innerHTML = genecell(v, row, _v);
                        }
                    });
            }
            return _;
        }

        function settitle(ogrid, osum, op, obody) {
            var tr = ogrid.children('thead').children('tr'); 
            var trs = tr.length;
            var otd = tr.eq(trs - 1).children('td').get();
            for (var k = trs - 2; k > -1; k--) {
                tr.eq(k).children('td').each(function (i, v) {
                    if (parseInt($(v).attr('rowspan')) == trs - k) {
                        otd.push(v)
                    }
                });
            };
            var ftr1 = $('<tr></tr>').height(0).prependTo(ogrid.children('thead')); 
            var ftr2 = $('<tr></tr>').height(0).prependTo(obody.children('tbody')); 
            if (op.sumobj) {
                var ftr3 = $('<tr></tr>').height(0).prependTo(osum.children('tbody'));
                var ftr4 = $('<tr></tr>').appendTo(osum.children('tbody'));
                op.sumtd = [];
            } 
            ogrid.op.otd = [];
            tdsort(otd).forEach(function (v, i) { 
                var a = $.extend({ field: null, width: 90, sortable: true, align: 'left', type: null, format: '', edit: '', render: '', searchable: true, dataType: 'S', jQrender: null }, jgui.parseJSON($(v).data('options')), { header: $(v).html() });
                ogrid.op.otd.push(a);
                var drag = $('<div></div>').html(i).on('mousedown', dragevent);//拖动区域
                $(v).wrapInner('<div></div>').append(drag).wrapInner('<div style="position:relative; padding:0;"></div>');
                $.data(v, 'op', $.extend({ sh: i, ohead: settdth(ftr1, a.width), obody: settdth(ftr2, a.width), osum: (op.sumobj ? settdth(ftr3, a.width) : undefined), osort: $(v).children('div').children('div:first') }, a));
                if (op.sumAble) {
                    op.sumtd[a.field] = $('<td></td>').appendTo(ftr4);
                    op.sumtd[a.field].sh = i;
                }
            });
            ogrid.delegate('td', 'click', function () {
                if (!op.url) return false;
                var a = $.data(this, 'op');
                if (!a || !a.sortable || op.issort) return;  
                op.issort = true;
                var o = a.osort;
                op.sortField = a.field;
                var _s = o.children('span');
                if (_s.length) { 
                    if (_s.hasClass('g-asc')) { _s.removeClass('g-asc').addClass('g-desc'); op.sortOrder = 'desc'; }
                    else { _s.removeClass('g-desc').addClass('g-asc'); op.sortOrder = 'asc'; }
                }
                else { 
                    if (ogrid.op.sortobj) { ogrid.op.sortobj.remove(); }
                    ogrid.op.sortobj = $('<span class="order g-asc">&nbsp&nbsp&nbsp&nbsp</span>').appendTo(o);
                    op.sortOrder = 'asc';
                }
                getdata(ogrid, obody, op, false);
                op.issort = false;
                return false;
            });
            tr.each(function (i, v) {
                if (i == tr.length - 1)
                    $('<td style="width:20px;border-top-width:0px;border-right-width:0px;border-bottom-width:1px ;"></td>').appendTo($(v));
                else
                    $('<td style="width:20px;border:0;"></td>').appendTo($(v));
            });
            $('<td style="width:20px;border:0;"></td>').appendTo(ftr1);
            if (op.sumAble) {
                $('<td style="width:20px;border:0;height:0"></td>').appendTo(ftr3);
                $('<td style="width:20px;border:0;"></td>').appendTo(ftr4);
            }
            function settdth(jq, w) 
            {
                return $('<td></td>').css({ padding: 0, border: 0, margin: 0, height: 0, width: w }).appendTo(jq);
            }
            function tdsort(otd) {//按offset.left排序
                var _r = [];
                while (otd.length > 1) {
                    var o = otd[0];
                    var ij = 0;
                    for (var i = 1, l = otd.length; i < l; i++) {
                        if ($(otd[i]).position().left < $(o).position().left) { o = otd[i]; ij = i; }
                    }
                    _r.push(o);
                    otd.splice(ij, 1);  
                }
                _r.push(otd[0]);  
                ogrid.css({ tableLayout: 'fixed', display: 'table' });//排序后才能把表格fixed 否则position().left永远是0(因不设宽度)，无法排序
                return _r
            }
            function dragevent() {
                var jq = $(this);
                jq.ismove = true;
                document.movejq = jq;
                document.onselectstart = function (e) { return false };  
                $(document).off('mousemove').on('mousemove', function (e) {
                    var jq = document.movejq;
                    if (jq) {
                        if (jq.ismove) {
                            var jqo = jq.parent().parent();
                            var x = jqo.offset().left;
                            if (e.pageX > (x + 4)) {
                                var _0 = $.data(jqo[0], 'op'), _1 = e.pageX - x;
                                _0.ohead.width(_1);
                                _0.obody.width(_1);
                                if (_0.osum) { _0.osum.width(_1); };
                            }
                        }
                    }
                    return false;
                }).off('mouseup').on('mouseup', function (e) {
                    if (document.movejq) {

                        document.movejq = null;
                        delete document.movejq;
                        document.onselectstart = function (e) { return true };
                        $(document).off('mousemove').off('mouseup');
                    }
                    return false;
                });
                return false;
            }
        };
        function getdata(ogrid, obody, op, lok) {  //lok 是否启用缓存 
            refreshcell(obody);
            if (!op.url) return false;
            if (op.pagerobj.pageIndex.val() != op.pageIndex)
                op.pagerobj.pageIndex.val(op.pageIndex);
            if (op.loadding)
                op.back[0].show();
            $.get(op.url, $.extend({ pi: op.pageIndex, ps: op.pageSize, sf: op.sortField, so: op.sortOrder }, op.para, (!lok ? { _r: (new Date()).getTime() } : {})))
                .done(function (obj) {
                    if (obj) {
                        if (typeof (obj) == 'string') obj = jgui.parseJSON(obj);
                        if (obj.footer) { op.footer = obj.footer[0]; ogrid.footer = obj.footer; }
                        op.recordTotal = ogrid.recordTotal =parseInt(obj.total);
                        setbody(ogrid, obody, op, obj.rows);
                        op.pagerobj[0].setData(false);
                        if (op.sumAble && obj.footer && obj.footer.length) {
                            ogrid[0].setSum(obj.footer[0]);
                        }
                    }
                    op.back[0].hide();
                })
                .fail(function (x) {
                    op.back[0].hide();
                    alert(x.statusText + ':' + x.status + '/n' + x.responseText);
                });
        };
        function setbody(ogrid, obody, op, obj) {
            ogrid.op.data = obj = jgui.parseJSON(obj);
            ogrid.op.editdata = [];
            obody.children('tbody').children('tr:gt(0)').remove();
            for (var j = 0, l = obj.length; j < l; j++) {
                var tr = $('<tr></tr>').data('index', j);
                ogrid.op.otd.forEach(function (v, i) {
                    var _td = $('<td></td>').data('options', { row: j, col: i }).appendTo(tr);
                    if (v && v.type == "indexCol") _td.html(1 + j + (op.pageIndex - 1) * op.pageSize).css('text-align', 'center');
                    else if (v && v.field && obj[j][v.field] !== undefined) 
                        _td.css("text-align", (v.align && 'right,left,center'.indexOf(v.align) > -1) ? v.align : '').append(maskcell(v, j,ogrid.op));
                    else if (v.render)
                        _td.html(v.render.call(this, { record: obj[j], value: undefined }));
                    else
                        if (v.jQrender) v.jQrender.call(this, { jq: _td, record: obj[j], index: j });
                    if (op.onCellDraw && $.isFunction(op.onCellDraw)) { op.onCellDraw.call(_td, ((v && v.field) ? obj[j][v.field] : undefined), v.field, obj[j]) }
                });
                if (op.onRowDraw&& $.isFunction(op.onRowDraw)) op.onRowDraw.call(tr, obj[j]);
                obody.append(tr);
            }
            if (op.onload && $.isFunction(op.onload)) op.onload.call(this,ogrid[0]);
        };
        function setxy(obody, op) {
            obody.css({ overflow: 'hidden', display: 'none' });
            if (op.fit)
                jgui.seth(obody.parent().parent());
            else
            {
                if (op.width < 0) jgui.setw(obody.parent().parent()); else obody.parent().parent().width(op.width);
                if (op.height < 0) jgui.seth(obody.parent().parent()); else obody.parent().parent().height(op.height);
            }
            jgui.seth(obody.parent()); 
            obody.css({ display: 'table' });
        }
        function setpager(ogrid, obody, op, oparent) {
            op.pagerobj = $('<div class="gpager table"></div>').appendTo(oparent);
            var a = $('<div class="td" ></div>').appendTo(op.pagerobj);
            op.pagerobj.pageSize = $('<div></div>').appendTo(a).gcombo({
                onChange: function (e) {
                    op.pageSize = e.id;
                    op.pagerobj[0].setData(false);
                    getdata(ogrid, obody, op, false);
                }, isup: true, islockheight: false, width: 40, poupuWidth: 40
            });
            if (op.dataList) {
                op.pagerobj.pageSize[0].setData(op.dataList);
            }
            $('<div class="td" ></div>').append($('<div class="gpager-img g-first"></div>').on('click', function () { op.pageIndex = 1; getdata(ogrid, obody, op, true) })).appendTo(op.pagerobj);
            $('<div class="td" ></div>').append($('<div class="gpager-img g-prev"></div>').on('click', function () { if (op.pageIndex > 1) { op.pageIndex--; getdata(ogrid, obody, op, true); } })).appendTo(op.pagerobj);
            var b = $('<div class="td" ></div>').appendTo(op.pagerobj);
            op.pagerobj.pageIndex = $('<input style="width:26px;text-align:center;" onkeypress="this.onp(event);" ></input>').appendTo(b);
            var c = $('<div class="td" ></div>').appendTo(op.pagerobj);
            op.pagerobj.pageTotal = $('<div style="width:26px;text-align:center;" ></div>').appendTo(c);
            $('<div class="td" ></div>').append($('<div class="gpager-img g-next"></div>').on('click', function () { if (op.pageIndex < op.pageTotal) { op.pageIndex++; getdata(ogrid, obody, op, true); } })).appendTo(op.pagerobj);
            $('<div class="td" ></div>').append($('<div class="gpager-img g-last"></div>').on('click', function () { op.pageIndex = op.pageTotal; getdata(ogrid, obody, op, true); })).appendTo(op.pagerobj);
            $('<div class="td" ></div>').append($('<div class="gpager-img g-reload"></div>').on('click', function () { getdata(ogrid, obody, op, true); })).appendTo(op.pagerobj);
            $('<div class="td" style="width:100%;" ></div>').appendTo(op.pagerobj);
            var d = $('<div class="td" style="white-space:nowrap;" ></div>').appendTo(op.pagerobj);
            op.pagerobj.recordTotal = $('<div>22</div>').appendTo(d);
            op.pagerobj.pageIndex.on('focus', function () {
                op.oldvalue = $(this).val();
                $(this).select();
            });
            op.pagerobj.pageIndex[0].onp = function (e) {
                if (e.which == 13) {
                    var i = parseInt($(this).val());
                    if (i > op.pageTotal || i < 1) {
                        $(this).val(op.oldvalue);
                    }
                    else {
                        if (i != op.pageIndex)
                            op.pageIndex = i;
                        getdata(ogrid, obody, op, true);
                    }
                }
            };
            op.pagerobj[0].setData = function (fa) {
                ogrid.pageTotal=op.pageTotal = Math.ceil(op.recordTotal / op.pageSize);
                var _0 = op.pagerobj;
                if (fa)
                    _0.pageSize[0].setValue(op.pageSize);
                _0.pageIndex.val(op.pageIndex);
                _0.pageTotal.html(op.pageTotal);
                _0.recordTotal.html(gmessage.pager_page + op.pageSize + gmessage.pager_pageitem + op.recordTotal + gmessage.pager_totalitem);
            };
            op.pageIndex = 1;
            op.recordTotal = 0;
            op.pagerobj.pageSize.data('index', op.pagerobj.pageSize[0].getIndexFromId(op.pageSize)); 
            op.pagerobj[0].setData(true);
            if (!op.pager) op.pagerobj.hide();
        }
        function init(ogrid, obody, op) {
            op.back = $('<div></div>').grefresh({ obj: ogrid.parent().parent() });
            if (op.url) {
                getdata(ogrid, obody, op, false);
            }
            obody.delegate('tr', 'mouseover', function (e) { $(this).find('td').addClass('row-move'); })
                   .delegate('tr', 'mouseout', function (e) { $(this).find('td').removeClass('row-move'); })
                   .delegate('tr', 'click', function (e) {
                       var _a = obody.selectrow;
                       if (_a) {
                           if (_a.data('index') === $(this).data('index')) return false; 
                           _a.find('td').removeClass('row-select');
                       }
                       $(this).find('td').addClass('row-select');
                       obody.selectrow = $(this);
                       return false;
                   }).delegate('td', 'click', function () {
                       if (op.cellSelect) {
                           var b = $(this).data('options');
                           var _b = obody.selectcell; 
                           if (_b) {
                               if (b.row === _b.data('options').row && b.col === _b.data('options').col) return false; 
                               obody.selectcell.children('div').css({ backgroundColor: '' });
                           }
                           obody.selectcell = $(this);
                           var a = obody.selectcell.children('div');
                           a.css({ backgroundColor: '#EAF2FF' });
                       }
                   });
        };
        return this.each(function () {
            var ogrid, obody, oparent, op, osum;
            ogrid = $(this).show(); 
            obody = $('<table class="gbody"></table>').append('<tbody></tbody>'); 
            ogrid.wrap('<div class="grid-wrap"></div>').wrap('<div class="head-wrap"></div>');
            oparent = ogrid.parent().parent();
            op = $.extend({
                fit: true,
                width: 400,
                height: 200,
                url: null,
                para: { w: '' },
                toolBar: null,
                pager: true,
                dataList: [{ id: 20, text: '20' }, { id: 30, text: '30' }, { id: 40, text: '40' }, { id: 80, text: '80' }, { id: 120, text: '120' }],
                pageSize: 20,
                pageIndex: 1,
                dataKey:'id',
                sortField: 'id',
                onload: null,
                sortOrder: 'asc',
                loadding: true,
                sumAble: false,
                cellSelect: true
            }, jgui.parseJSON(ogrid.data('options')), options);
            ogrid.op = op;
            ogrid.parent().append('<div class="thdou"></div>');
            if (op.border) jgui.setborder(oparent, op.border);
            if (op.toolBar) { oparent.prepend($(op.toolBar).show()); }
            oparent.append($('<div class="body-wrap"></div>').on('scroll', function () {
                ogrid.parent().scrollLeft($(this).scrollLeft());
                if (op.sumobj) op.sumobj.scrollLeft($(this).scrollLeft());
                return false;
            }).append(obody));
            if (op.sumAble) {
                osum = $('<table class="ggrid-sum" ></table>').append('<tbody></tbody>');
                op.sumobj = $('<div class="head-wrap"></div>').append(osum).append('<div class="thdou"></div>').appendTo(oparent);
            }
            setpager(ogrid, obody, op, oparent);
            settitle(ogrid, osum, op, obody);  
            setxy(obody, op); 
            init(ogrid, obody, op);
            ogrid.data('options', op);
            this.load = function (url, lok) { if (url) this.set('url', url); getdata(ogrid, obody, op, lok); };
            this.reload = function (lok) { getdata(ogrid, obody, op, (lok ? true : false)); };
            this.set = function (name, value) { op[name] = value; };
            this.get = function (name) {
                if (typeof(name) == 'number') return op.data[name]; 
                else
                return op[name]
            };
            this.getSelect = function () { if (obody.selectrow) return ogrid.op.data[obody.selectrow.data('index')]; };
            this.selectRow = function (i) {
                var l = ogrid.op.data.length;
                if (i < 1 || i > l - 1) return;
                var tr = obody.children('tbody').children('tr:eq(' + i + ')');
                if (tr.length) tr.trigger('click');
            };
            this.getData = function () { return ogrid.op.data; };
            this.getEditData = function () {
                return $.grep($.map(ogrid.op.editdata, function (v, i) {
                    var _ = {}, j = v._index, s = ogrid.op.data[j];
                    _[op.dataKey] = s[op.dataKey];
                    for (var a in v) {
                        if (a.indexOf('_') < 0 && s[a] != v[a]) _[a] = v[a];
                    }
                    return _;
                }), function (v, i) {
                    return jgui.getobjlength(v) > 1;
                });
            };
            this.valid = function () {
                var _0 = true;
                for (var i = 0; i < ogrid.op.editdata.length; i++)
                {
                    var _1 = true, v = ogrid.op.editdata[i];
                    for (var a in v) {
                        if (a.indexOf('_') > -1 && a != '_index' && !v[a]) { _1 = false; break; }
                    }
                    if (!_1) { _0 = false; break;}
                }
                return _0;
            };
            this.setData = function (obj) {
                if (obj) {
                    op.recordTotal = obj.length;
                    setbody(ogrid, obody, op, obj);
                    op.pagerobj[0].setData(false);
                }
            };
            this.getCell = function (i, j) {
                if (!i && !j)
                    if (op.cellSelect && obody.selectcell) {
                        var a = obody.selectcell.data('options');
                        return ogrid.op.data[a.row][ogrid.op.otd[a.col].field];
                    }
                    else if (!isNaN(i) && !isNaN(j)) {
                        var l = ogrid.op.data.length, k = ogrid.op.otd.length;
                        if (i < 1 || i > l - 1 || j < 0 || j > k - 1) return;
                        return ogrid.op.data[i - 1][ogrid.op.otd[j - 1].field];
                    }
            };
            this.setCell = function (i, j) {
                if (op.cellSelect) {
                    var l = op.data.length, k = ogrid.op.otd.length;
                    if (i < 1 || i > l - 1 || j < 0 || j > k - 1) return false;
                    obody.children('tbody').children('tr:eq(' + i + ')').children('td:eq(' + (j - 1) + ')').trigger('click');
                }
            };
            this.setSum = function (obj) {
                $.each(obj, function (v, i) {
                    op.sumtd[v].html('<div>' + getformat(i, op.otd[op.sumtd[v].sh].format) + '</div>');
                });
            };
            this.search = function (w, f) {
                if (op.searchobj) op.searchobj[0].open();
                else {
                    var sdobj = $.map(ogrid.op.otd, function (v, i) {
                        if (v.searchable && v.header && v.field) return { id: v.field, text: v.header, type: v.dataType };
                    });
                    var tid = 'search_id_' + jgui.getuid(),
                        ck1 = "search_ck" + jgui.getuid(),
                        ck2 = "search_ck" + jgui.getuid(),
                        ck3 = "search_ck" + jgui.getuid(),
                        c1 = "search_c" + jgui.getuid(),  
                        c2 = "search_c" + jgui.getuid(), 
                        c3 = "search_c" + jgui.getuid(),
                        c4 = "search_c" + jgui.getuid(),
                        i1 = "search_i" + jgui.getuid(),
                        i2 = "search_i" + jgui.getuid();
                    var bodyHtml = '<table id="' + tid + '" style="margin:10px;"><tr style="text-align:center" ><td></td><td>' + gmessage.search_item + '</td><td></td><td>' + gmessage.search_context + '</td></tr>'
                        + '<tr><td>' + gmessage.search_item1 + '<input type="checkbox" id="' + ck1 + '" checked="checked" disabled="disabled"/></td><td><div id="' + c1 + '"></div></td><td><div id="' + c3 + '"></div></td><td><input id="' + i1 + '"/></td></tr>'
                        + '<tr><td>' + gmessage.search_item2 + '<input type="checkbox" id="' + ck2 + '"  /></td><td><div id="' + c2 + '"></div></td><td><div id="' + c4 + '"></div></td><td><input id="' + i2 + '"/></td></tr>'
                        + '<tr><td colspan="4">' + gmessage.search_allok + '<input type="checkbox" id="' + ck3 + '" checked="checked"/></td></tr>'
                        + '</table>';
                    op.searchobj = $('<div></div>').html(bodyHtml).appendTo('body').gwindow({ mask: true, isHeightFit: true, width: 480, isOverflow: false, headerIcon: 'find', header: gmessage.search_windowtitle, closed: false });
                    var table = $('#' + tid, op.searchobj);
                    var sear = [{ id: '=', text: gmessage.search_equal }, { id: '>', text: gmessage.search_gt }, { id: '>=', text: gmessage.search_gte }, { id: '<', text: gmessage.search_lt }, { id: '<=', text: gmessage.search_lte }, { id: '<>', text: gmessage.search_noequal }, { id: ' like ', text: gmessage.search_include }, { id: ' not like ', text: gmessage.search_noinclude }];
                    var g_c1 = $('#' + c1, table).gcombo({ width: 90, poupuWidth: 90, data: sdobj, islockheight: true }); if (sdobj.length) g_c1[0].setIndex(0);
                    var g_c2 = $('#' + c2, table).gcombo({ width: 90, poupuWidth: 90, data: sdobj, islockheight: true }); if (sdobj.length) g_c2[0].setIndex(0); g_c2[0].disable(true);
                    var g_c3 = $('#' + c3, table).gcombo({ width: 60, poupuWidth: 60, data: sear }); g_c3[0].setIndex(0);
                    var g_c4 = $('#' + c4, table).gcombo({ width: 60, poupuWidth: 60, data: sear }); g_c4[0].setIndex(0); g_c4[0].disable(true);
                    var g_i1 = $('#' + i1, table).gtext({ width: 140 });
                    var g_i2 = $('#' + i2, table).gtext({ width: 140 }).prop('disabled', true);
                    var g_ck1 = $('#' + ck1, table), g_ck3 = $('#' + ck3, table);
                    var g_ck2 = $('#' + ck2, table).on("change", function () { var lok = !$(this).prop('checked'); g_c2[0].disable(lok); g_c4[0].disable(lok); g_i2.prop('disabled', lok); });
                    table.children('tbody').children('tr').children('td').css({ paddingLeft: 10 });
                    var b = $('<a></a>').html(gmessage.confirm_ok).css('margin-right', '20px').gbutton({
                        icon: 'ok', click: function () {
                            var _s1 = g_c1[0].getValue(), _x1 = g_c3[0].getValue(), _v1 = g_i1[0].getValue();
                            var _s2 = g_c2[0].getValue(), _x2 = g_c4[0].getValue(), _v2 = g_i2[0].getValue();
                            var _k1 = g_ck1.prop('checked'), _k2 = g_ck2.prop('checked'), _k3 = g_ck3.prop('checked');  //ceheckbox
                            var _t1 = g_c1[0].getRecord().type, _t2 = g_c2[0].getRecord().type; 
                            if (_t1 == 'D' && _v1) {
                                var r = jgui.todate(_v1);
                                _v1 = (r ? r.format('yyyy-MM-dd hh:mm:ss') : '');
                            }
                            if (_t2 == 'D' && k2 && _v2) {
                                var r = jgui.todate(_v2);
                                _v2 = (r ? r.format('yyyy-MM-dd hh:mm:ss') : '');
                            }
                            if (((_t1 == 'N' || _t1 == 'D') && (_x1.indexOf('like') > -1)) || (_k2 && (_t2 == 'N' || _t2 == 'D') && (_x2.indexOf('like') > -1))) { jgui.alert(gmessage.search_dateerror); return; }
                            if ((_t1 == 'N' && isNaN(_v1)) || (_k2 && _t2 == 'N' && isNaN(_v2))) { jgui.alert(gmessage.search_error+gmessage.search_numbererror); return; }
                            if ((_t1 == 'B' && !(_v1 == '0' || _v1 == '1')) || (_k2 && _t2 == 'B' && !(_v2 == '0' || _v2 == '1'))) { jgui.alert(gmessage.search_error + gmessage.search_boolerror); return; }
                            if ((_t1 == 'D' && !_v1) || (_k2 && _t2 == 'D' && !_v2)) { jgui.alert(gmessage.search_error + gmessage.search_onlydate); return; }
                            if ((_t1 == 'I' && !/^\d+$/.test(_v1)) || (_k2 && _t2 == 'D' && !/^\d+$/.test(_v2))) { jgui.alert(gmessage.search_error + gmessage.search_onlydate); return; }
                            var _w = _s1 + _x1 + "'" + genevalue(_v1, _x1) + "'";
                            if (_k2)
                                _w += ((_k3 ? ' and ' : ' or ') + (_s2 + _x2 + "'" + genevalue(_v2, _x2) + "'"));
                            op.searchobj[0].close();
                            _w = (w ? (w + ' and ') : '') + '(' + _w + ')';
                            op.para = { w: encodeURIComponent(_w) };
                            op.pageIndex = 1;
                            ogrid[0].reload();
                            if (f) f.call(this, _w);
                            function genevalue(v, x) {
                                v = v.replace(/'/, '').replace('%', '');
                                return ((x.indexOf('like') > -1) ? "%" + v + '%' : v);
                            };
                        }
                    });
                    var a = $('<a></a>').html(gmessage.confirm_cancel).gbutton({ icon: 'exit', click: function () { op.searchobj[0].close(); } });
                    $('<div></div>').gtoolbar().css({ textAlign: 'center', height: 24 }).append(b).append(a).appendTo(table.parent());
                }
            };
            this.toExcel = function (action,f) {
                var dou = '<th>', sd = '';
                ogrid.op.otd.forEach(function (v, i) {
                    if (v.field && v.header) {
                        dou += (v.header + '</th><th>');
                        sd += (v.field + ',');
                    }
                });
                if (dou.length > 5) { dou = dou.substr(0, dou.length - 4); sd = sd.substr(0, sd.length - 1); } else return;
                var form = gene_form(action);
                var inputs = form.childNodes;
                var u =(op.url? op.url.split('/'):null);
                var dd =(u? u[u.length - 1].split('?')[0]:"");
                if (f) {
                    var _0 = '\u6807\u9898\uff1a' + dou.replace(/<\/th>/g, ",").replace(/<th>/g, '') + '<br/>' + '\u5b57\u6bb5\uff1a' + sd + '<br/>' + '\u6392\u5e8f\u5b57\u6bb5\uff1a' + op.sortField + '<br/>' + '\u6392\u5e8f\u65b9\u5f0f\u003a' + op.sortOrder + '<br/>\u67e5\u8be2\u6761\u4ef6\uff1a' + op.para.w + '<br/>\u6570\u636e\u6e90\uff1a' + op.url;
                    f.call(this, _0);
                }
                $("input[name='id']", form).val(dd);
                $("input[name='sf']", form).val(encodeURIComponent(op.sortField));
                $("input[name='so']", form).val(encodeURIComponent(op.sortOrder));
                $("input[name='w']", form).val(encodeURIComponent(op.para.w));
                $("input[name='dou']", form).val(encodeURIComponent(dou));
                $("input[name='sd']", form).val(encodeURIComponent(sd));
                $("input[name='url']", form).val(encodeURIComponent(op.url));
                form.submit();
                function gene_form(action) {
                    var form = document.getElementById("y_iframename");
                    if (!form) {
                        var form = document.createElement('form');
                        form.id = "y_iframename";
                        form.action = action;
                        form.method = "post";
                        form.encoding = "multipart/form-data";
                        document.body.appendChild(form);
                        ['id', 'sf', 'so', 'w', 'dou', 'sd','url'].forEach(function (v, i) { gene_input(v, form) });
                    }
                    return form;
                }
                function gene_input(s, form) {
                    var input1 = document.createElement("input");
                    input1.name = s; input1.type = "hidden";
                    form.appendChild(input1);
                }
            };
        });
    };
    //panel
    $.fn.gpanel = function (options) {
        function init(opanel, op)
        {
            var ops = { fit: op.fit, header: op.header, close: op.close, max: op.max, collapse: op.collapse, headerIcon: op.headericon, gcontent: op.gcontent }; //gcontent用于collapse
            if (op.close) ops.close = {
                click: (op.close.click ? op.close.click : (function () { opanel.remove(); }))
            };
            if (op.max) ops.max = {
                click: (op.max.click ? op.max.click : (function (fit) {
                    opanel[0].seth(fit);
                    var a = op.gcontent.children()[0];
                    if (a && a.tagName.toLowerCase() == 'iframe') {
                        jgui.sethw($(a));
                    }
                }))
            };
            op.gheader.gtitlebar(ops);
            op = $.extend(op, op.gheader.data('options'));
            opanel[0].seth(op.fit);
            if (op.src) {
                $("<iframe src='" + op.src + "' frameborder='0' border='0'></iframe>").outerHeight(op.gcontent.height(), true).css({ width: "100%" }).appendTo(op.gcontent);
                op.gcontent.css("overflow", "hidden");
            }
        }
        return this.each(function () {
            var opanel = $(this);
            this.seth = function (fit) {
                op.fit = fit;
                if (fit) {  
                    jgui.seth(opanel);
                    jgui.setw(opanel);
                    opanel.css('display', 'block'); 
                    jgui.seth(op.gcontent); 
                    opanel.css('width', '');
                }
                else {  
                    opanel.height(op.height);
                    opanel.width(op.width);
                    opanel.css('display', 'block'); 
                    jgui.seth(op.gcontent); 
                }
                opanel.css('height', '');
                return false;
            };
            opanel.wrapInner('<div class="gpanel-content"></div>').prepend('<div class="gtitlebar"></div>');
            var op = $.extend({
                header: '',
                headerIcon: '',
                fit: false,
                width: 300,
                height: 200,
                close: true,
                isOverflow: true,
                collapse: true,
                max: true
            }, jgui.parseJSON(opanel.data('options')), options,
            { gheader: opanel.children().eq(0), gcontent: opanel.children().eq(1) }
            );
            if (op.isOverflow) opanel.children("div.gpanel-content").css('overflow', 'auto');
            init(opanel, op);
            opanel.data('options', op);
        });
    };
    //tabs
    $.fn.gtabs = function (options) {
        function init(otabs, op) 
        {
            op.divs.each(function (i, o) {
                $(o).height(12).css({ overflow: 'hidden', display: 'none' });
            });
            if (op.fit)
                jgui.seth(otabs); 
            else { 
                otabs.outerHeight(op.height, true).outerWidth(op.width, true);
            }
            jgui.seth(op.div); 
            op.divs.each(function (i, o) {
                jgui.seth($(o).css('overflow', 'auto')); 
            });

            otabs[0].selectindex(0);
        }
        return this.each(function () {
            var otabs = $(this);
            this.selectindex = function (i) {
                op.lis.eq(i).removeClass().addClass('gtab-nav-action').siblings().removeClass().addClass('gtab-nav');
                op.divs.eq(i).show().siblings().hide();
                op.index = i;
            };
            this.isintab = function (header) {
                var lok = false;
                op.lis.each(function (i, v) {
                    if ($(v).data('header') === header) {
                        lok = true; return false;
                    }
                });
                return lok;
            };

            this.select = function (h) {
                var j = -1;
                op.lis.each(function (i, v) {
                    if ($(v).data('header') === h) {
                        j = i; return false;
                    }
                });
                if (j > -1) otabs[0].selectindex(j);
            };
            this.delete = function (i) {
                op.lis.eq(i).remove();
                op.divs.eq(i).remove();
                op.lis = op.li.children('li');
                op.divs = op.div.children('div');

                if (i == op.index) {
                    if (op.lis.length > i)
                        otabs[0].selectindex(i);
                    else
                        otabs[0].selectindex(i - 1);
                }
            };
            this.add = function (options) {
                var o = $.extend({
                    header:gmessage.tabs_title,
                    src: null,
                    contend: '',
                    close: true
                }, options);
                var a = $('<li>' + o.header + '</li>').data('header', o.header).addClass('gtab-nav');
                if (o.close)
                    a.append('<span></span>');
                a.appendTo(op.li);
                if (o.src) {
                    var iframe = $("<iframe src='" + o.src + "'></iframe>").outerHeight(op.div.height() + 4, true);
                    $("<div></div>").append(iframe).appendTo(op.div.css("overflow", "hidden"));
                }
                else
                    $("<div></div>").html(o.contend).appendTo(op.div);
                op.divs = op.div.children('div'); op.lis = op.li.children('li');
                this.selectindex(op.lis.length - 1);
            };
            var gui = $('<ul></ul>');
            otabs.children('div').each(function (i, v) {
                var $v = $(v), ops = $.extend({ header: gmessage.tabs_title, close: true, src: null, content: null }, jgui.parseJSON($v.data('options')));
                var a = $('<li></li>').addClass('gtab-nav').html(ops.header);
                if (ops.close)
                    a.append('<span></span>');
                a.appendTo(gui);  
            }).wrapAll('<div name="gbody"></div>');
            otabs.prepend('<div style="clear:both;"></div>').prepend(gui);
            var op = $.extend({
                width: 300,
                height: 200,
                fit: true
            }, jgui.parseJSON(otabs.data('options')), options,
            { div: otabs.children('div:last'), divs: otabs.children('div:last').children('div'), lis: otabs.children('ul').children('li'), li: otabs.children('ul'), index: 0 }
            );
            otabs.data('options', op);
            init(otabs, op);
            otabs.delegate('li', 'click', function () { otabs[0].selectindex($(this).index()); })
            .delegate('span', 'click', function () { otabs[0].delete($(this).parent('li').index()); return false; });
        });
    };
    //titlrbar
    $.fn.gtitlebar = function (options) {
        return this.each(function () {
            var otitlebar = $(this);
            var op = $.extend({
                max: false,
                collapse: false, 
                collapse1: false,
                close: true,
                border: null,
                header: null,
                fit: false, 
                headerIcon: null,
                gcontent: null 
            }, jgui.parseJSON($(this).data('options')), options);
            var io = 0;
            if (!otitlebar.hasClass('gtitlebar')) otitlebar.addClass('gtitlebar');
            otitlebar.html('<table border="0" cellspacing="0" cellpadding="0" style="width:100%;table-layout: fixed;"><tr><td style="width:100%;overflow:hidden;white-space:nowrap;word-break:keep-all;"></td><td style="width:20px;text-align:right;padding-left:10px; "></td></tr></table>');
            var head = otitlebar.find('td');
            op.dragobj = head.eq(0); 
            if (op.header) { head.eq(0).html(op.header) }
            if (op.headerIcon) $('<span  class="gtitlebar-img"></span>').addClass('g-' + op.headerIcon).prependTo(head.eq(0));

            if (op.collapse) {
                io++;
                op.collapseobj = $('<span  class="gtitlebar-img"></span>').addClass('g-expand').on('click', function () {
                    document.onselectstart = function () { return false; }; //兼容IE ,否则IE下不会立即显示改变的class
                    var $v = $(this);
                    if ($v.hasClass('g-expand')) {
                        $v.removeClass('g-expand').addClass('g-collapse');
                        if (op.gcontent) op.gcontent.hide();
                    } else {
                        $v.removeClass('g-collapse').addClass('g-expand');
                        if (op.gcontent) op.gcontent.show();
                    }
                    if (op.collapse.click) op.collapse.click.call(op.collapse.obj);
                    document.onselectstart = function () { return true; };
                    return false;
                }).appendTo(head.eq(1));
            }
            if (op.collapse1) { 
                io++;
                op.collapseobj1 = $('<span  class="gtitlebar-img"></span>').addClass('g-collapse1').on('click', function () {
                    document.onselectstart = function () { return false; }; //兼容IE ,否则IE下不会立即显示改变的class
                    var fa, $v = $(this);
                    if ($v.hasClass('g-collapse1')) {
                        $v.removeClass('g-collapse1').addClass('g-expand1');
                        fa = true;
                    } else {
                        $v.removeClass('g-expand1').addClass('g-collapse1');
                        fa = false;
                    }
                    if (op.collapse1.click) op.collapse1.click.call(op.collapse1.obj, fa);  //fa true->收  false->开
                    document.onselectstart = function () { return true; };
                    return false;
                }).appendTo(head.eq(1));

            }
            if (op.max) {
                io++;
                op.maxobj = $('<span class="gtitlebar-img"></span>').addClass(op.fit ? "g-restore" : 'g-max').on('click', function () {
                    document.onselectstart = function () { return false; };
                    var $v = $(this);
                    if ($v.hasClass('g-max')) {
                        $v.removeClass('g-max').addClass('g-restore');
                        op.fit = true;
                    } else {
                        $v.removeClass('g-restore').addClass('g-max');
                        op.fit = false;
                    }
                    if (op.collapseobj && op.collapseobj.hasClass('g-collapse'))
                        op.collapseobj.removeClass('g-collapse').addClass('g-expand').show();
                    if (op.max.click) op.max.click.call(this, op.fit);
                    document.onselectstart = function () { return true; };
                    return false;
                }).appendTo(head.eq(1));
            }
            if (op.close) {
                io++;
                op.closeobj = $('<span class="gtitlebar-img"></span>').addClass('g-close').on('click', function () {
                    if (op.close.click)
                        op.close.click.call(op.close.obj);
                    else { 
                        otitlebar.parent().remove();
                    }
                    return false;
                }).appendTo(head.eq(1));
            };
            head.eq(1).width(io * 20);
            if (op.border) jgui.setborder(otitlebar, op.border);
            otitlebar.data('options', op);
        });
    };
    //toolbar
    $.fn.gtoolbar = function (options) {
        return this.each(function () {
            var otoolbar = $(this);
            var op = $.extend({
                border: null
            }, jgui.parseJSON($(this).data('options')), options);
            if (!otoolbar.hasClass('gtoolbar')) otoolbar.addClass('gtoolbar');
            if (op.border)
                jgui.setborder($(this), op.border);
        });
    };
    //tree
    $.fn.gtree = function (options) {
        function setdata(otree, op, data) {
            genetree(otree, data, op);
            if (!op._reload) init(otree, op);
        }
        function getdata(otree, op) {
            if (op.url) {
                $.get(op.url, $.extend({}, op.para)).done(function (obj) {
                    if (obj) {
                        obj = jgui.parseJSON(obj);
                        if (!$.isArray(obj))
                            obj = $.makeArray(obj);
                        genetree(otree, obj,op);
                        if (!op._reload) init(otree, op);
                    }
                }).fail(function (x) {
                    alert(x.staus+x.responseText);
                });
            }
        };
        function init(otree, op) {
            otree.delegate("div", 'click', function (e) {
                var jq = $(this);
                if (e.target.className.substr(0, 10) == 'gtree-coex') {
                    exconode(jq.parent());
                    return false;
                }
                if (e.target.tagName.toLowerCase()== 'input') {
                    setbox($(e.target).parent().parent(),e.target.checked);
                }
                if (op.click && $.isFunction(op.click))
                    op.click.call(jq,jgui.parseJSON(jq.data('options')),op.clickTarget); //传options
                jq.children("span").filter('.gtree-node').addClass('gtree-on');
                if (op.oldobj && !jq.is(op.oldobj)) op.oldobj.children("span").filter('.gtree-node').removeClass('gtree-on');
                op.oldobj = jq;
                if (op.expandOnClickItem && jq.next('ul').length) exconode(jq.parent())
            });
            op._reload = true;
        };
        function setbox(obj,bz)
        {
            if (obj.next('ul'))
            {
                obj.next('ul').find('input').each(function (i, v) {
                    $(v).prop('checked', bz);
                });
            }
        }
        function exconode(jqp) {
            if (jqp.hasClass('gtree-expand'))
                jqp.removeClass('gtree-expand').addClass('gtree-collapse');
            else {
                if (jqp.hasClass('gtree-collapse'))
                    jqp.removeClass('gtree-collapse').addClass('gtree-expand');
            }
        }
        function genetree(otree, arr,op) {
            var treebody = otree.empty();
            for (var i = 0; i < arr.length; i++) {
                var node = $('#gtree_' + arr[i].pid, treebody);
                if (node.length) {
                    checknode(node);
                    node.children('ul').append(h(arr[i],op));
                }
                else treebody.append(h(arr[i],op));
            }
            treebody.children('li').each(function (i, o) {
                if (!$(o).is(':has(ul)')) {
                    var _0 = $('#' + $(o).attr('pid'), treebody);
                    if (_0.length > 0) {
                        checknode(_0);
                        _0.children('ul').append(o);
                    }
                }
            });
            treebody.children("li").each(function (i, v) {
                var $v = $(v), libody = $v.children('div').eq(0), f = $v.prev().length, l = $v.next().length;
                geneline($v, f, l, libody, true);
                addline($(v).children('ul'), 1, [l]);
            });
            function geneline($v, f, l, libody, bz) 
            {
                if ($v.children('ul').length)
                {
                    $('<span></span>').addClass('gtree-coex' + (f == 0 && l == 0 && bz ? '' : (l == 0 ? 'l' : 'n'))).html('&nbsp;').prependTo(libody);
                }
                else {

                    libody.children("span").filter('.gtree-node').children('span:first').removeClass('gtree-iconfolder').addClass('gtree-leaf');
                    $('<span></span>').addClass('gtree-line').addClass('gtree-tl' + (l == 0 ? 'l' : 'n')).html('&nbsp;').prependTo(libody);
                }
            }
            function addline(obj, lv, ar) {
                obj.children("li").each(function (i, v) {
                    var $v = $(v), libody = $v.children('div').eq(0), f = $v.prev().length, l = $v.next().length;
                    if (i === 0) ar.push(l); else ar[lv] = l;
                    geneline($v, f, l, libody, false);
                    for (var i = lv - 1; i > -1; i--) {
                        $('<span></span>').addClass('gtree-line').addClass(ar[i] ? 'gtree-tl' : '').html('&nbsp;').prependTo(libody);
                    }
                    addline($(v).children('ul'), lv + 1, ar);
                });
            }
            function checknode(node) {  
                if (node.children('ul').length === 0) $('<ul></ul>').appendTo(node);
            }
            function h(obj,op) {
                return '<li id="gtree_' + obj.id + '" pid="gtree_' + obj.pid + '" class="gtree-' + (obj.expand ? 'expand' : 'collapse') + '"><div data-options="{' + g(obj) + '}"' + '><span class="gtree-node"><span class="gtree-iconfolder">&nbsp;</span>' + (op.checkboxNode ? '<input type="checkbox" />' : '') + '<span class="gtree-nodetext">' + obj.text + '</span></span></div></li>';
            }
            function g(a) {
                var r = '';
                for (var b in a) {
                    r += ("," + b + ":'" + a[b] + "'");
                }
                return r.substr(1);
            };
        };
        return this.each(function () {
            var otree = $(this);
            var op = $.extend({
                click: null,
                clickTarget:null,
                para: {}, 
                url: null,
                width: 200,
                height: 300,
                fit: true,
                checkboxNode:false,
                expandOnClickItem: false
            }, jgui.parseJSON(otree.data('options')), options);
            otree.data('options', op);
            getdata(otree, op);
            otree.css({ backgroundColor: 'white', whiteSpace: 'nowrap', wordBreak: 'keep-all' }).wrap("<div></div>");
            otree.parent().css({ overflow: 'auto', backgroundColor: 'white' });
            if (op.fit) jgui.sethw(otree.parent()); else otree.parent().outerHeight(op.height, true).outerWidth(op.width, true);
            this.setData = function (data) {if (data && $.isArray(data)) setdata(otree, op, data); };
            this.load = function (url) { if (url) this.set('url', url); getdata(otree, op); };
            this.geach = function (e) {
                eachnode(otree);
                function eachnode(node) {
                    node.children('li').each(function (i, v) {
                        if (each($(v), jgui.parseJSON($(v).children('div:first').data('options')))) {
                            if ($(v).children('ul').length > 0)
                                eachnode($(v).children('ul'));
                        }
                        else
                            return false;
                    });
                };
                function each(target,obj) {
                    if (e && $.isFunction(e)) {
                        return e.call(target, obj);
                    }
                }
            };
            this.expand = function (id) {
                $('#gtree_' + id, otree).removeClass('gtree-collapse').addClass('gtree-expand');

            };
            this.collapse = function (id) {
                $('#gtree_' + id, otree).removeClass('gtree-expand').addClass('gtree-collapse');
            };
            this.getSelect = function () {
                if (!op.oldobj) return undefined;
                else return jgui.parseJSON(op.oldobj.data('options'))
            };
            this.set = function (name, value) { op[name] = value; };
            this.get = function (name) { return op[name] };
            this.getCheckSelect = function (bz) {
                var r = [];
                eachnode(otree);
                function eachnode(node) {
                    node.children('li').each(function (i, v) {
                        var k = jgui.parseJSON($(v).children('div:first').data('options'));
                        if ($(v).children('div:first').find('input').eq(0).prop('checked') === bz)
                            r.push(k.id);
                        if ($(v).children('ul').length) {
                            eachnode($(v).children('ul'));
                        }
                    });
                };
                return r;
            };
        });
    };
    //form
    $.fn.gform = function (options) {
        var op = {};
        function _getdata(fa, oform) {
            var r = {};
            $('*[name]', oform).each(function (i, o) {
                var name = $(o).attr('name');
                var v = _genevalue(name, o);
                if (!(v === undefined) && (fa || v != op[name] || $(o).attr('type') == 'hidden')) r[name] = v;
            });
            return r;
         };
        function _genevalue(name, obj) {
             var v = undefined;
             if (name && !/^[\$]\.*/.test(name)) { 
                 if (obj.getValue) {
                     v = obj.getValue();
                     if ($(obj).hasClass('gdate')) v = v.tostr(); 
                 }
                 else {
                     if (typeof (obj.value) == 'string') 
                         v = obj.value;
                 }
             }
             return v;
         };
         return this.each(function () {
            var oform = $(this);
            this.setData = function (o) {
                if (typeof (o) != 'object') return;
                this.saveData();
                for (var _ in o) {
                    if (o[_] === null || o[_] === undefined) op[_] = '';
                    else
                        if (o[_] instanceof Date) op[_] = o[_].tostr();
                        else
                            if (/^\/Date\(/.test(o[_]) && typeof (o[_]) == 'string') op[_] = jgui.todate(o[_]).tostr();
                            else op[_] = o[_];

                    var b = jgui.getname(_, oform);
                    if (b) {
                        if (b.setValue)  
                            b.setValue(op[_]);
                        else {
                            if (typeof (b.value) == 'string') 
                                b.value = op[_];
                            if (b.tagName.toLowerCase() == 'input')
                                $(b).trigger("change").trigger("blur");
                        }
                    }
                }
            };
            this.getData = function () {
                return _getdata(true, oform);
            };
            this.getEditData = function () {
                return _getdata(false,oform);
            };
            this.saveData = function () {
                $.extend(op, this.getData());
            };
            this.valid = function () {
                var lok = true;
                var r = $('*[name]', oform);
                for (var i = 0, l = r.length; i < l; i++) {
                    var name = $(r[i]).attr('name');
                    if (name && !/^[\$]\.*/.test(name)) {
                        if (r[i].valid) {
                            var _0 = r[i].valid();
                            if (!_0) lok = false;
                        }
                    }
                }
                return lok;
            };
        });
    };
    //window
    $.fn.gwindow = function (options) {
        function init(owindow, op) 
        {
            if (op.mask && !op.maskobj) {
                op.maskobj = $('<div id="mask' + jgui.getuid() + '" style="background: #000;display: none;left: 0;position: absolute;top: 0;width: 100%;z-index:' + (jgui.getuid() + 9500) + ';"></div>').css({ 'opacity': 0.3, 'height': $(window).outerHeight() }).appendTo('body');
                owindow.css({ zIndex: jgui.getuid() + 9500 });
            }
            if (op.shadowable) {
                owindow.css('box-shadow', '10px 10px 5px #888888');
            }
            if (op.resizeable && !op.collapse) {
                owindow.css('padding-bottom', '12px');
                owindow.gresize({
                    applydrag: function () {
                        var w = op.gcontent.width(), h = op.gcontent.height();
                        op.gcontent.height(h + this.y);
                    }
                });
            }
            if (op.drageable) {
                owindow[0].drag();
            }
            owindow[0].seth(op.fit);
            if (!op.closed) owindow[0].open(op.fit); else owindow.hide();
        }
        return this.each(function () {
            var owindow = $(this);
            var op = $.extend({
                header: '',
                headerIcon: '',
                fit: false,
                width: 300,
                height: 200,
                close: { click: function () { owindow.hide(); if (op.maskobj) op.maskobj.hide(); } },
                closed: true,
                drageable: true,
                resizeable: false,
                collapse: false,
                shadowable: true,
                mask: true,
                isHeightFit: false,   
                max: false
            }, jgui.parseJSON(owindow.data('options')), options);
            op.realheight = owindow.outerHeight();  //窗口实际高度,用于alert和confirm
            if (!owindow.hasClass('gwindow')) owindow.addClass('gwindow');
            owindow.gpanel(op);
            op = $.extend(op, owindow.data('options'));
            this.destroy = function () {
                owindow.remove();
                if (op.maskobj) op.maskobj.remove();
            };
            this.seth = function (fit) { 
                op.fit = fit;
                op.dragobj.data('nodragable', fit);
                owindow.data('noresizeable', fit);
                if (fit) {  
                    owindow.css({ top: 0, left: 0 }).outerHeight($(window).height(), true).outerWidth($(window).width(), true);
                    jgui.seth(op.gcontent);
                    var _0 = op.gcontent.children('iframe');
                    if (_0.length) {
                        _0.outerHeight(op.gcontent.height(), true);
                    }
                    
                    owindow.css('width', '');
                }
                else {
                    var h = ($(window).height() - (op.isHeightFit ? op.realheight : op.height)) / 2, w = ($(document).width() - op.width) / 2;
                    h = (h > 0 ? h : 0); w = (w > 0 ? w : 0);
                    owindow.css({ top: h, left: w });
                    owindow.width(op.width);
                    if (!op.isHeightFit) {
                        owindow.height(op.height);
                        jgui.seth(op.gcontent);
                    } else {
                        op.gcontent.css('height', '');
                    }
                }
                owindow.css('height', '');
                return false;
            };
            this.drag = function () {
                op.gheader.find('td').eq(0).gdraggle({ title: function () { return owindow; }, xy: 'xy' });
            };
            this.open = function (fit) {
                if (op.maskobj) op.maskobj.show();
                if (op.maxobj) {
                    op.maxobj.removeClass('g-restore').addClass('g-max');
                    this.seth(fit);
                }
                owindow.show();
            };
            this.close = function () {
                owindow.hide();
                if (op.maskobj) op.maskobj.hide();
            };
            init(owindow, op);
            owindow.data('options', op);
        });
    };
    //draggle
    $.fn.gdraggle = function (options) {
        return this.each(function () {
            var o;
            if (typeof options.title === 'string')
                o = $('#' + options.title);
            else
                o = options.title.call(this);
            o.css('position', 'absolute');
            $(this).data('move', false).data('_x', 0).data('_y', 0).data('w', $(document).width()).data('h', $(document).height()).css('cursor', 'move');
            var _this = this;
            $(this).off('mousedown').on('mousedown', function (e) {
                var o1 = o.offset();
                $(this).data('move', true)
                    .data('_x', e.pageX - o1.left)
                    .data('_y', e.pageY - o1.top);
                $(document).off('.gym');
                if ($(this).data('nodragable')) return false;  //不允许动，
                $(document).on('mousedown.gym', function (e) {
                    document.onselectstart = function (e) { return false };
                })
            .on('mousemove.gym', function (e) {
                if ($(_this).data('move')) {
                    if (options.xy.indexOf('x') > -1)
                        o.css("left", getx());
                    if (options.xy.indexOf('y') > -1)
                        o.css("top", gety());
                }
                return false;
                function getx() {
                    var x = e.pageX - $(_this).data('_x'), w = $(_this).data('w');
                    return (x < 0 ? 0 : (x > (w - 20) ? (w - 20) : x));
                }
                function gety() {
                    var y = e.pageY - $(_this).data('_y'), h = $(_this).data('h');
                    return (y < 0 ? 0 : (y > (h - 20) ? (h - 20) : y));
                }
            })
                .on('mouseup.gym', function () {
                    document.onselectstart = function (e) { return true };
                    $(_this).data('move', false);
                    $(document).off('.gym');
                    return false;
                });
                return false;
            });
        });
    };
    //resize
    $.fn.gresize = function (options) {
        return this.each(function () {
            var jq = $(this);
            if (!jq.hasClass('gresize')) jq.addClass('gresize');
            jq.off('mousemove').on('mousemove', function (e) {
                var w = jq.offset().left + jq.outerWidth(), h = jq.offset().top + jq.outerHeight();
                if ((e.pageY < h && e.pageX < w) && (h - e.pageY < 10 && w - e.pageX < 10))
                    jq.css('cursor', 'se-resize');
                else
                    jq.css('cursor', '');
            })
            .off('mouseleave').on('mouseleave', function () { jq.css('cursor', ''); })
            .off('mousedown').on('mousedown', function (e) {
                var w = jq.offset().left + jq.outerWidth(), h = jq.offset().top + jq.outerHeight();
                if (!(e.pageY < h && e.pageX < w && h - e.pageY < 10 && w - e.pageX < 10)) return;
                $(document).off('.gym');
                if ($(this).data('noresizeable')) return false;
                $(document).on('mousedown.gym', function (e) {
                    jq.h = jq.height(); jq.children().hide();
                    document.onselectstart = function (e) { return false };
                    $.fn.gresize.iszing = true;
                    jq.css('cursor', '');
                    $('body').css('cursor', 'se-resize');
                    return false;
                })
                           .on('mousemove.gym', { w: jq.offset().left, h: jq.offset().top }, function (e) {
                               var w = e.data.w, h = e.data.h;
                               if (e.pageX - w > 20) jq.width(e.pageX - w);
                               if (e.pageY - h > 20) jq.height(e.pageY - h);

                               return false;
                           })
                           .on('mouseup.gym', function (e) {
                               $.fn.gresize.iszing = false;
                               if (options.applydrag)
                                   options.applydrag.call({ y: jq.height() - jq.h });
                               jq.children().show();
                               document.onselectstart = function (e) { return true };
                               $(document).off('.gym');
                               $('body').css('cursor', '');
                               return false;
                           });
            });
        });
    };
    //提示
    $.fn.gtip = function (options) {
        return this.each(function () {
            var jq = $(this);
            var op = $.extend({
                shadow: false,
                text: ''
            }, jgui.parseJSON($(this).data('options')), options);
            if (jq.data('gtip')) { jq.data('gtip').otext.html(op.text); return; }
            var otip = $('<div class="gtip"></div>').hide();
            $('<div class="gtip1"></div>').appendTo(otip);
            $('<div class="gtip2"></div>').appendTo(otip);
            var b = $('<div class="gtiptext">' + op.text + '</div>').appendTo(otip);
            if (op.shadow) b.css('box-shadow', '0px 0px 40px #FF7700');
            otip.appendTo('body');
            jq.data('gtip', { otip: otip, otext: b });
            jq.data('otip', otip);
            this.showTip = function () {
                if (!jq.data('over')) {
                    var _0 = jq.offset();
                    otip.css({
                        top: _0.top + jq.outerHeight() - 12,
                        left: _0.left + 10
                    }).show();
                    jq.data('over', true);
                };
            };
            this.removeTip = function () {
                var jq = $(this);
                jq.off('mouseover').off('mouseout');
                if (jq.data('gtip')) {
                    jq.data('gtip').otip.remove();
                    jq.data('gtip', null);
                }
            };
            jq.off('mouseover').on('mouseover', function (e) {
                jq[0].showTip();
            })
            .off('mouseleave').on('mouseleave', function (e) { jq.data('over', false); otip.hide(); });

        });
    };
    //refresh
    $.fn.grefresh = function (options) {
        return this.each(function () {
            var orefresh = $(this);
            var op = $.extend({
                img: 'grefresh-img',
                text: gmessage.refresh_text,
                obj: null
            }, jgui.parseJSON(orefresh.data('options')), options);
            orefresh.data('options', op);
            if (!orefresh.hasClass('grefresh')) orefresh.addClass('grefresh');
            $('<div class="' + op.img + '"></div>').appendTo(orefresh);
            $('<div class="grefresh-text"></div>').html(op.text).appendTo(orefresh);
            op.back = $('<div class="grefresh-back"></div>');
            orefresh.data('options', op);
            op.back.appendTo('body');
            orefresh.appendTo('body');
            this.show = function () {
                if (op.obj) o = op.obj; else return;
                var w = o.outerWidth(), h = o.outerHeight(), x = o.offset().left, y = o.offset().top, _w = $(this).outerWidth(), _h = $(this).outerHeight();
                op.back.css({ top: y, left: x, width: w, height: h }).show();
                $(this).css({ left: Math.round((w - _w) / 2 + x), top: Math.round((h - _h) / 2 + y) }).show();
            };
            this.hide = function () {
                if (!op.obj) return;
                $(this).hide();
                op.back.hide();
            };
            this.destroy = function () {
                if (!op.obj) return;
                op.back.remove();
                $(this).remove();
            };
        });
    };
})(jQuery);


(function ($) {
    $.parse = function (p) {
        ['gmenu', 'gtext', 'gcombo', 'gdate', 'gtreeselect', 'gtoolbar', 'glayout', 'gtabs', 'gwindow', 'ggrid', 'gbutton','gfile','gradio', 'gtree', 'gpanel', 'gform'].forEach(function (v, i) {
            var jg = $('.' + v, p);
            if (jg.length)
                if (jg[v])
                    try {
                        jg[v]();
                    }
            catch (e) { alert(v+";"+e.toString()); };
        });
    };
    $(function () { $.parse(); });
})(jQuery);
