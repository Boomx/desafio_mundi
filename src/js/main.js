import * as ChartController from './chartController';
import * as DataLoader from './dataLoader';
import * as DOMInteract from './DOMInteract';

var repos = [];
ChartController.beginChart();

(function listenSelect(){
    var repoSelect = document.getElementById("repoSelect");
    repoSelect.addEventListener('change',changeRepo);
})();

DataLoader.loadRepos().then((responseRepos)=>{
    repos = responseRepos;
    DOMInteract.pupulateRepoOptions(repos);
    DataLoader.loadCommits(repos);
});

function changeRepo(ev){
    var selectNode = document.getElementById("repoSelect");
    var id = selectNode.options[selectNode.selectedIndex].id;
    let repo = repos.find((element)=>{
        if(element.repoId.toString() == id){
            return element;
        }
    });
    if(repo == undefined){
        console.error("REPO NOT FOUND");
    }
    DOMInteract.updateCounters(repo.stargazerzCount,repo.forksCount,repo.contributorsCount);
    ChartController.beginChart(repo.commits);
}

