$.get("/bracu/failcase/queries", function(data){
        makeCloud(data);
        makeBar(data);
});

function makeCloud(w) {
    let filtered = w.filter(function (d) {return d.size > 2;})
        .sort(function(a, b){return d3.descending(a.size, b.size)});

    let margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 950,
        height = 700;

    let svg = d3.select("#wordCloud").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    let layout = d3.layout.cloud()
        .size([width, height])
        .words(filtered.map(function(d) { return {text: d.word, size:d.size}; }))
        .padding(10)        //space between words
        .fontSize(function(d) { return d.size; })      // font size of words
        .on("end", draw);

    layout.start();

    function draw(words) {
        svg.append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size+5; })
            .style("fill", "rgb(108, 151, 248)")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }

}

function makeBar(d){
    d.sort(function(a, b){
        return b.size-a.size;
    });
    let readyData = [];
    for(let i = 0; i < d.length; i++){
        readyData.push({
            y: d[i].size,
            lebel: d[i].word
        });
    }
    console.log(readyData);
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light1",
        title:{
            text: "Fail Case Analysis"
        },
        axisY: {
            title: "Frequency"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "Words",
            dataPoints: readyData
        }]
    });
    chart.render();

}
