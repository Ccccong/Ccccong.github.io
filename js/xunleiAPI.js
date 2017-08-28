/**
 * Created by congcong on 2017/8/27.
 */
/*调用迅雷下载，亲测解决了安卓，IOS，电脑的的问题*/

function xunlei(url) {
    var thunder_url = url;
    var thunder_pid = "57029";
    var restitle = "爱白菜鱼";
    document.write('<a href="#" thunderHref="' + ThunderEncode(thunder_url) + '" thunderPid="' + thunder_pid + '" thunderResTitle="' + restitle + '" onClick="return OnDownloadClick_Simple(this,2,4)" oncontextmenu="ThunderNetwork_SetHref(this)">迅雷专用高速下载</a> ');
}


/*

<!--<a oncontextmenu=ThunderNetwork_SetHref(this)
class=aThunder
onclick="return OnDownloadClick_Simple(this)"
href="magnet:?xt=urn:btih:22A42D74AD0CEF13CD9F1AF7E32DB3DFA8E3370C"
thunderResTitle="迅雷下载"
thunderType="04"
thunderPid="00008"
thunderHref="magnet:?xt=urn:btih:22A42D74AD0CEF13CD9F1AF7E32DB3DFA8E3370C">第一个小片片哦，记得安装迅雷</a>-->



<!--<script language="javascript">
var thunder_url = "magnet:?xt=urn:btih:22A42D74AD0CEF13CD9F1AF7E32DB3DFA8E3370C";
var thunder_pid = "57029";
var restitle = "爱白菜鱼";
document.write('<a href="#" thunderHref="' + ThunderEncode(thunder_url) + '" thunderPid="' + thunder_pid + '" thunderResTitle="' + restitle + '" onClick="return OnDownloadClick_Simple(this,2,4)" oncontextmenu="ThunderNetwork_SetHref(this)">迅雷专用高速下载</a> ');
</script>-->*/
