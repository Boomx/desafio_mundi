import {
    commitsAnalysis
} from './classes';


export function analyzeCommits(repository,resolve) {
    //Gives the repository the necessary information to fill the graph
    
    //Stops the function if there is no commits in repository
    if (repository.commits.length == 0)
        return;
    //Store commits dates and reverses commits array to be ascendant
    let dates = repository.commits.reverse().map((commit) => {
        return commit.date;
    });

    let firstCommit = moment.min(dates);
    let lastCommit = moment.max(dates);

    let intervalSize = "month";
    let intervalsCount = lastCommit.diff(firstCommit, 'month');

    //Ensures that the graph has a minimum of 10 intervals when its possible, be months or weeks if necessary
    if (intervalsCount < 10) {
        intervalSize = "week";
        intervalsCount = lastCommit.diff(firstCommit, 'week');
    }

    //Create intervals array to be the x-axis of the graph
    let intervals = [];
    let last = firstCommit.clone();
    for (let i = 0; i < intervalsCount + 1; i++) {
        last = last.clone().add(1, intervalSize);
        intervals.push(last);
    }

    //Create a array of commits per interval to be in y-axis
    var currentInterval = 0;
    let commitsPerInterval = [0];
    dates.forEach((element) => {
        if (element.diff(intervals[currentInterval], 'seconds', true) > 0) {
            let intervalDiff = element.diff(intervals[currentInterval], intervalSize);
            //Measures and jump the empty intervals when the commit date is too forward from the last passed interval
            if (intervalDiff > 1) {
                for (var i = 0; i < intervalDiff - 1; i++) {
                    commitsPerInterval.push(0);
                    currentInterval += 1;
                }
            }
            currentInterval++;
            commitsPerInterval.push(1);
        } else {
            commitsPerInterval[commitsPerInterval.length - 1]++;
        }
    });

    //Parse Dates to string formats according to Interval Size
    var intervalInString = intervals.map((element)=>{
        if(intervalSize == 'month')
            return element.format("DD/MMM/YYYY");
        return element.format("DD/MM/YYYY,") +' week ' + element.format('w');
    });
    resolve();
    return new commitsAnalysis(intervalSize,intervalInString,firstCommit,lastCommit,commitsPerInterval);
}