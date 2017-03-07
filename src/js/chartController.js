export function beginChart(repository) {
    Chart.defaults.global.maintainAspectRatio = false;
    var ctx = document.getElementById("myChart");
    var data = {
        labels: repository.commitsAnalysis.intervals,
        datasets: [{
                label: "Commits",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(0, 120, 193,0.4)",
                borderColor: "rgba(0, 120, 193,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0, 120, 193,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(0, 120, 193,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 20,
                data: repository.commitsAnalysis.commitsPerInterval,
                spanGaps: true,
            }
        ],

    };

    let myChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
}