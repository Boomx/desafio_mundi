'use strict';
import {
    GitRepo
} from './classes';

var endpoint = "https://api.github.com";
export function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }else if(xmlHttp.status == 204){//No content
            callback(null)
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader("Authorization","Basic "+ btoa("boomx:tenispolar47"));
    //Authorization necessary to increase de request number per hour
    xmlHttp.send(null);
}


export function loadRepos() {
    return new Promise((resolve, reject) => {
        httpGetAsync(endpoint + "/users/mundipagg/repos", (response) => {
            let coutingContribs = JSON.parse(response).map((repository) => {
                return countContribs(repository);
            });
            Promise.all(coutingContribs).then((response)=>resolve(response));
        });
    });
}

function countContribs(element){
    return new Promise((resolve,reject)=>{

        httpGetAsync(element.contributors_url, (contributors) => {
            var contribsNumber = 0;
            if(contributors != null)  contribsNumber = JSON.parse(contributors).length;
            var repo = new GitRepo(element.name, element.description, element.commits_url, element.forks_url, element.forks_count, element.contributors_url, element.stargazers_count, element.stargazers_url, element.id, contribsNumber);
            resolve(repo);
        });
    });
}