function AJAX (){
    //实例ajax连接
    var http = function (url, content, method,callback,header) {
        var http_request ;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!http_request) {
            console.log('xhr实例不成功')
            return false;
        }
        //装饰方法,返回带callback的改变状态方法
        var stateChangeHandler = function(fun) {
            return function(){
                 if (http_request.readyState == 4) {
                    if (http_request.status == 200) {
                        if (!fun) return;
                        fun(http_request.responseText);
                    } else {
                        alert('There was a problem with the request.');
                    }
                }
            }  
        }
        http_request.onreadystatechange = stateChangeHandler(callback);//绑定状态改变方法
        http_request.open(method, url, true);//建立连接，定义方法，url，是否异步
        if (header) {
            for (var i in header) {
                http_request.setRequestHeader(i,header[i]);
            }  
        }
        http_request.send(content);//发送内容
    } 
    return {
        //post 方法,传输键值,但对非json
        post:function(url,data,callback){
            try{
                if(typeof data!="object")    throw "not object";
                var urlcode = "";
                for (var i in data) {
                    urlcode = urlcode + i + "=" + data[i] + "&";
                }
                urlcode = urlcode.substring(0,urlcode.length-1);
                var header = {"Content-Type":"application/x-www-form-urlencoded"};
                return new http(url,urlcode,"post",callback,header);
            }
            catch(err){
                console.log(err)
            }            
        },
        //get 方法
        get:function(url,callback){
            return new http(url,"","get",callback);
        },
        //post方法传送json
        json:function(url,data,callback){
            var header = {'Content-Type':'application/json'};
            return new http(url,JSON.stringify(data),"post",callback,header);
        },
        //可以设置header的ajax方法,默认所有数据不做处理
        ajax:function(url,header,data,method,callback){
            return new http(url,data,method,callback,header);
        }
    }
}

export default new AJAX()