export class GitRepo{
    constructor(name,description,commitsUrl,forksUrl,forksCount,contributorsUrl,stargazerzCount,stargazersUrl,repoId,contributorsCount){
        this.name = name;
        this.description = description;
        this.commitsUrl = commitsUrl.replace("{/sha}",'');
        this.commits = [];
        this.forksUrl = forksUrl;
        this.forksCount = forksCount;
        this.contributorsUrl = contributorsUrl;
        this.contributorsCount = contributorsCount;
        this.stargazersUrl = stargazersUrl;
        this.stargazerzCount = stargazerzCount;
        this.repoId = repoId;
    }
}

export class Commit{
    constructor(author,authorUrl,date,commitUrl){
        this.author = author;
        this.authorUrl = authorUrl;
        this.date = new Date(date);
        this.commitUrl = commitUrl;
    }
}