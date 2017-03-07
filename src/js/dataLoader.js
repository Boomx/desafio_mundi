'use strict';
import {
    GitRepo,
    Commit,
    commitsAnalysis
} from './classes';

import * as DataAnalysis from './dataAnalysis';

var endpoint = "https://api.github.com";
export function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else if (xmlHttp.status == 204) { //No content
            callback(null);
        } else if (xmlHttp.status == 409) { //Empty Repo
            callback(null);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa("boomx:tenispolar47"));
    //Authorization necessary to increase de request number per hour
    xmlHttp.send(null);
}


export function loadRepos() {
    return new Promise((resolve, reject) => {
        httpGetAsync(endpoint + "/users/mundipagg/repos", (response) => {
            // console.log(response);
            let countContribsPromisesArray = JSON.parse(response).map((repository) => {
                return countContribs(repository);
            });
            Promise.all(countContribsPromisesArray).then((response) => resolve(response));
        });
    });
}

function countContribs(element) {
    return new Promise((resolve, reject) => {
        httpGetAsync(element.contributors_url, (contributors) => {
            let contribsNumber = 0;
            if (contributors != null) contribsNumber = JSON.parse(contributors).length;
            var repo = new GitRepo(element.name, element.description, element.commits_url, element.forks_url, element.forks_count, element.contributors_url, element.stargazers_count, element.stargazers_url, element.id, contribsNumber);
            resolve(repo);
        });
    });
}

export function loadCommits(repos) {
    return new Promise((resolve, reject) => {

        var promisesArray = repos.map((repo) => {

            return new Promise((resolveInside, reject) => {
                httpGetAsync(repo.commitsUrl + "?per_page=100", (commits) => {
                    if (commits == null) resolveInside();
                    else {
                        JSON.parse(commits).forEach((commit) => {
                            //TODO: RESOLVER PROBLEMAS COM 409, SEM COMMITS
                            let htmlUrl = "Unknown";
                            if (commit.author != null) {
                                htmlUrl = commit.author.html_url;
                            }
                            repo.commits.push(new Commit(commit.commit.author.name, htmlUrl, commit.commit.author.date, commit.html_url));
                        });
                        repo.commitsAnalysis = DataAnalysis.analyzeCommits(repo,resolveInside);
                    }
                });
            });

        });
        Promise.all(promisesArray).then(()=>resolve());
    });
}