import * as ChartController from './chartController';
import * as DataLoader from './dataLoader';
import * as DOMInteract from './DOMInteract';

var repositories = [];
var selectedRepository;


(function listenSelect(){
    var repoSelect = document.getElementById("repoSelect");
    repoSelect.addEventListener('change',changeRepo);
})();

(function listenReadmeButton(){
    var readMeButton = document.getElementById('readMeButton');
    readMeButton.addEventListener('click',showReadMe);
})();

function showReadMe(){
    console.log('click');
    DataLoader.loadReadme(selectedRepository).then((response)=>{
        console.log(response);
        DOMInteract.showReadMe(response);
    })
}

DataLoader.loadRepos().then((responseRepos)=>{
    repositories = responseRepos;
    DOMInteract.pupulateRepoOptions(repositories);
    DataLoader.loadCommits(repositories).then(()=>{
        DOMInteract.loadComplete();
        changeRepo();
    });
});

function changeRepo(){
    DOMInteract.hideReadMe();
    var selectNode = document.getElementById("repoSelect");
    var id = selectNode.options[selectNode.selectedIndex].id;
    selectedRepository = repositories.find((element)=>{
        if(element.repoId.toString() == id){
            return element;
        }
    });
    DOMInteract.updateCounters(selectedRepository.stargazerzCount,selectedRepository.forksCount,selectedRepository.contributorsCount);
    if(selectedRepository.commitsAnalysis !== undefined){
        DOMInteract.showChart();
        ChartController.beginChart(selectedRepository);
    }
    else{
        DOMInteract.hideChart();
    }
}

