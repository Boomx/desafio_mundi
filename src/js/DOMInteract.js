export function pupulateRepoOptions(repos){
    repos.forEach((element)=>{
        var option = document.createElement('option');
        option.id = element.repoId.toString();
        option.value = element.name;
        option.text = element.name;
        document.getElementById("repoSelect").appendChild(option);
    });
}