var loadData = function (svgMap, svgTree, maxR) {
    var mapPromises = [
        d3.csv("data/arrivals_by_destination_nationality_2017.csv"),
        d3.json("data/us-states.json"),
        d3.json("data/states_titlecase.json"),
        d3.json("data/us-zip-code-latitude-and-longitude.json")
    ];
    Promise.all(mapPromises).then(function (data) {
        createMap(svgMap, data);
    }).catch(function (error) {
        console.log(error)
    });


    var treePromise = [d3.csv("data/survey_data_b.csv")];
    Promise.all(treePromise).then(function (data) {
        createTree(svgTree, data[0], maxR);
    }).catch(function (error) {
        console.log(error)
    });
};

var createViz = function () {
    //d["Year Of Entry"]
    //d["Country Of Birth"]
    var svgMap = d3.select("#map").append("svg")//.attr("viewbox","0 0 750 375")
        .attr("width", 750)
        .attr("height",500);

    var maxR = 50;
    //d["Year Of Entry"]
    //d["Country Of Birth"]
    //d[CriteriaToSee]
    var svgTree = d3.select("#tree").append("svg")
        .attr("width", maxR*(9)) 
        .attr("height", maxR*(10))
        .attr("id","treeSVG")

    loadData(svgMap, svgTree, maxR);
};

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);