var converter = new showdown.Converter();

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
    var display = document.getElementById('starsCounter');
    slowChangeCounter(starsCount,display.innerText,display);
}

export function updateForks(forksCount){
    var display = document.getElementById('forksCounter');
    slowChangeCounter(forksCount,display.innerText,display);
    
}

export function updateContribs(contribsCount){
    var display = document.getElementById('contribsCounter');
    slowChangeCounter(contribsCount,display.innerText,display);
}

export function updateCounters(starsCount,forksCount,contribsCount){
    updateStars(starsCount);
    updateForks(forksCount);
    updateContribs(contribsCount);
}

export function loadComplete(){
    document.getElementById('repoSelect').children[0].selected = 'selected';
    document.getElementById('loadingPanel').classList.add('loadingDone');
}

export function hideChart(){
    document.getElementById('myChart').style.display = 'none';
    document.getElementById('emptyRepository').style.display = 'inline';
}

export function showChart(){
    document.getElementById('myChart').style.display = 'inline';
    document.getElementById('emptyRepository').style.display = 'none';
}

export function showReadMe(readme){
    document.getElementById('readmeDisplay').innerHTML = converter.makeHtml(readme);
    document.getElementById('readmeDisplay').style.display= 'block';
    document.getElementById('readMeButtonContainer').style.display= 'none';
}

export function hideReadMe(){
    document.getElementById('readMeButtonContainer').style.display= 'block';
    document.getElementById('readmeDisplay').style.display= 'none';
    document.getElementById('readmeDisplay').innerHTML= '';
}

function slowChangeCounter(future,current,display){
    var duration = 180/future;

    var iterator = setInterval(()=>{
        if(current>future) current--;
        else if(current<future)current++;
        else clearInterval(iterator);
        display.innerText = current;
    },duration)
}

