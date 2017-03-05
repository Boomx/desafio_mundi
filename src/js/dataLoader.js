'use strict';
import {GitRepo} from './classes';

var endpoint = "https://api.github.com";
export function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}


export function loadRepos() {
    return new Promise((resolve,reject)=>{
        httpGetAsync(endpoint+"/users/mundipagg/repos", (response) => {
            let repos = JSON.parse(response).map((element) => {
                return new GitRepo(element.name, element.description, element.commits_url, element.forks_url, element.forks_count, element.contributors_url, element.stargazers_count, element.stargazers_url, element.id);
            })
            resolve(repos);
        });
    })
}