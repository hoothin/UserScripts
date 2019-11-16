var uids=[];[].forEach.call(document.querySelectorAll("td:first-child:not(.is-hidden)"), function(e){uids.push(e.innerText)});console.log(uids.join(","));

function Ajax(type, url, data, success, failed){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
    if(type.toUpperCase() == 'POST'){
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
        xhr.send(data);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}
var data={user_ids: [], tag_ids: [1]};
Ajax('post', '/customer/admin/userTag/batchAddUserTag', JSON.stringify(data), function(data){
    console.log(data);
}, function(error){
    console.log(error);
});