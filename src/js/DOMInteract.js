export function pupulateRepoOptions(repos){
    repos.forEach((element)=>{
        var option = document.createElement('option');
        option.id = element.repoId.toString();
        option.value = element.name;
        option.text = element.name;
        document.getElementById("repoSelect").appendChild(option);
    });
}

export function updateStars(starsCount){
    document.getElementById('starsCounter').innerText = starsCount; 
}

export function updateForks(forksCount){
    document.getElementById('forksCounter').innerText = forksCount;
}

export function updateContribs(contribsCount){
    document.getElementById('contribsCounter').innerText = contribsCount;
}

export function updateCounters(starsCount,forksCount,contribsCount){
    updateStars(starsCount);
    updateForks(forksCount);
    updateContribs(contribsCount);
}

export function loadComplete(){
    document.getElementById('loading').remove();
    document.getElementById('repoSelect').children[0].selected = 'selected';
}

export function hideChart(){
    document.getElementById('myChart').style.display = 'none';
    document.getElementById('empty_repository').style.display = 'inline';
}

export function showChart(){
    document.getElementById('myChart').style.display = 'inline';
    document.getElementById('empty_repository').style.display = 'none';
}