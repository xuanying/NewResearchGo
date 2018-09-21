//设置cookie
function setCookie(name,value,exdays){
    let nowDate = new Date()
    nowDate.setTime(nowDate.getTime + 24*60*60*1000*exdays);
    window.document.cookie =name+ "=" +value+ ";expires="+nowDate.toGMTString();
}
//获取Cookie
function getCookie(name){
    // console.log('所有的Cookie:' + document.cookie)
    let arr = document.cookie.split(';');
    let nvarr;
    for(let i=0;i<arr.length;i++){
        nvarr = arr[i].split('=');
        if(nvarr[0] == name){
            return nvarr[1];
        }
    }
}
//删除Cookie
function delCookie(name){
    document.cookie =name+ "=" +'value'+ ";expires=" + new Date( 0).toGMTString();
    // console.log('删除' + name + '后的Cookie:' + document.cookie)
}
//清除所有Cookie
function delAllCookie(){
    let keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
    for (var i = keys.length; i--;)
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
    }
    // console.log('删除所有的ｃｏｏｋｉｅ' + document.cookie)
} 
export {setCookie,getCookie,delCookie,delAllCookie}