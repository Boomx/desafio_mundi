export class GitRepo{
    constructor(name,description,commitsUrl,forksUrl,forksCount,contributorsUrl,stargazerzCount,stargazersUrl,repoId,contributorsCount){
        this.name = name;
        this.description = description;
        this.commitsUrl = commitsUrl.replace("{/sha}",'');
        this.commits = [];
        this.commitsAnalysis;
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
        this.date = moment(date);
        this.commitUrl = commitUrl;
    }
}

export class CommitAnalysis{
    constructor(intervalSize,intervals,firstCommit,lastCommit,commitsPerInterval){
        this.intervalSize = intervalSize; //WEEK,MONTH
        this.intervals = intervals;
        this.firstCommit = firstCommit;
        this.lastCommit = lastCommit;
        this.commitsPerInterval = commitsPerInterval;
    }
}