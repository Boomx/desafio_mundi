import * as ChartController from './chartController';
import * as DataLoader from './dataLoader';
import * as DOMInteract from './DOMInteract';

var repos = [];

(function listenSelect(){
    var repoSelect = document.getElementById("repoSelect");
    repoSelect.addEventListener('change',changeRepo);
})();

DataLoader.loadRepos().then((responseRepos)=>{
    repos = responseRepos;
    DOMInteract.pupulateRepoOptions(repos);
    DataLoader.loadCommits(repos).then(()=>{
        document.getElementById('loadingPanel').classList.add('loadingDone');
        DOMInteract.loadComplete();
        changeRepo();
    });
});

function changeRepo(){
    var selectNode = document.getElementById("repoSelect");
    var id = selectNode.options[selectNode.selectedIndex].id;
    let repo = repos.find((element)=>{
        if(element.repoId.toString() == id){
            return element;
        }
    });
    DOMInteract.updateCounters(repo.stargazerzCount,repo.forksCount,repo.contributorsCount);
    console.log(repo);
    if(repo.commitsAnalysis !== undefined){
        console.log('show');
        DOMInteract.showChart();
        ChartController.beginChart(repo);
    }
    else{
        DOMInteract.hideChart();
    }
}

