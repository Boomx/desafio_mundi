import * as counter from './counter';


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync("https://api.github.com/users/mundipagg/repos",(response)=>{
    // document.getElementsByTagName('body')[0].innerHTML+=response;
    // window.console.log(response);
})


console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2