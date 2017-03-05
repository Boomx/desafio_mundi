import * as chartController from './chartController';
import * as dataLoader from './dataLoader';
import {GitRepo} from './classes'

chartController.beginChart();

dataLoader.httpGetAsync("https://api.github.com/users/mundipagg/repos", (response) => {
    // document.getElementsByTagName('body')[0].innerHTML+=response;
    // console.log(response);
    let objectResponse = JSON.parse(response);
    // console.log(objectResponse);
    let repos = objectResponse.map((element)=>{
        // console.log(element.name);
        return new GitRepo(element.name,element.description,element.commits_url,element.forks_url,element.forks_count,element.contributors_url,element.stargazers_count,element.stargazers_url);
    })
    console.log(repos);
})