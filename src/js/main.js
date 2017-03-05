import * as chartController from './chartController';
import * as dataLoader from './dataLoader';
import * as DOMInteract from './DOMInteract';

var repos = [];
chartController.beginChart();

(function listenSelect(){
    var repoSelect = document.getElementById("repoSelect");
    repoSelect.addEventListener('change',escuta);
})();

dataLoader.loadRepos().then((responseRepos)=>{
    repos = responseRepos;
    DOMInteract.pupulateRepoOptions(repos);
});

function escuta(ev){
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
}

