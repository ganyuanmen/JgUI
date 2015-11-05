<%@ WebHandler Language="C#" Class="jguiapp" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using System.Web.Mvc;

public class jguiapp : IHttpHandler {


    public void ProcessRequest(HttpContext context)
    {
        string result = "";
        string falg = "";
        try
        {
            falg = context.Request["http_gfalg"].ToString().Split(',')[0];
        }
        catch { };
        
        switch (falg)
        {
            case "0":
                result = savefile(HttpContext.Current.Server.MapPath("~/data/") + HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request["f"].ToString())); break;
            case "1":
                result = saveslip(); break;
            default:
                toexcel();break;
        }
        context.Response.ContentType = "text/plain";
        context.Response.Write(result);
    }
    private string savefile(string path) //单个文件保存
    {
        string result = "ok";
        using (Stream stream = HttpContext.Current.Request.InputStream)
        {
            try
            {
                BinaryReader br = new BinaryReader(stream);
                FileStream fs = new FileStream(path, FileMode.Create);
                BinaryWriter bw = new BinaryWriter(fs);
                bw.Write(br.ReadBytes((int)stream.Length));
                br.Close();
                bw.Close();
                fs.Close();
            }
            catch (Exception e) { result = e.Message; }
        }
        return result;
    }
    private string saveslip() //分片文件保存
    {
        string result = "";

        string path = HttpContext.Current.Server.MapPath("~/data/") + HttpContext.Current.Request["guid"]; ;
        FileStream addFile = new FileStream(path, FileMode.Append, FileAccess.Write);
        BinaryWriter AddWriter = new BinaryWriter(addFile);
        Stream stream = HttpContext.Current.Request.InputStream;
        BinaryReader TempReader = new BinaryReader(stream);
        AddWriter.Write(TempReader.ReadBytes((int)stream.Length));
        TempReader.Close();
        stream.Close();
        AddWriter.Close();
        addFile.Close();
        string[] falg = HttpContext.Current.Request["http_gfalg"].ToString().Split(',');
        if (falg[1] == falg[2]) //最后一个分片改名
        {
            FileInfo fileinfo = new FileInfo(path);
            fileinfo.MoveTo(HttpContext.Current.Server.MapPath("~/data/") + HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request["f"].ToString()));
            result = "ok";
        }
        return result;
    }

    private void toexcel()
    {
        StringBuilder cqw = new StringBuilder();
        cqw.Append("<html><head><meta http-equiv=Content-Type content=\"text/html;charset=GB2312\"><title>gxtd</title></head><body><form  runat=server id=b1><table cellspacing=\"0\" cellpadding=\"5\" rules=\"all\" border=\"1\"><tr>");
        cqw.Append(HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request["dou"].ToString()) + "</tr>"); 
        string[] sds =HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request["sd"].ToString()).Split(','); 
        var re = HttpContext.Current.Request;
        var un = HttpContext.Current.Server;
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>字段:{0}</td>",str); } cqw.Append("</tr>");
        cqw.Append("<tr>");  foreach (string str in sds) { cqw.AppendFormat("<td>ID:{0}</td>", re["id"]);  }  cqw.Append("</tr>");
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>排序字段:{0}</td>", re["sf"]); } cqw.Append("</tr>");
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>排序方式:{0}</td>", re["so"]); } cqw.Append("</tr>");
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>数据源:{0}</td>",un.UrlDecode(re["url"])); } cqw.Append("</tr>");
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>过滤条件:{0}</td>", un.UrlDecode(re["w"])); } cqw.Append("</tr>");
        cqw.Append("<tr>"); foreach (string str in sds) { cqw.AppendFormat("<td>测试，根据需要自行组织后台代码</td>", str); } cqw.Append("</tr>");
        cqw.Append("</table></body></html>");
        var Response = HttpContext.Current.Response;
        Response.Clear();
        Response.Buffer = true;
        Response.Charset = "utf-8";
        Response.AppendHeader("Content-Disposition", "attachment;filename=A" + System.DateTime.Now.ToString("_yyMMdd_hhmm") + ".xls");
        Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
        Response.ContentType = "application/ms-excel";
        Response.Write(cqw.ToString());
        Response.End();
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}