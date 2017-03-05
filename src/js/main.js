import * as chartController from './chartController';
import * as dataLoader from './dataLoader';
import * as DOMInteract from './DOMInteract';
import {GitRepo} from './classes';


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
    var e = document.getElementById("repoSelect");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;
    console.log(value,text);
};