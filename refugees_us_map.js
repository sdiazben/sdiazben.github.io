var ctx = {
    w: 1100,
    h: 500
};



var transformData = function (data, us_states_abb, us_coord) {
    var placements = {};
    for (var i = 0; i < data.length; i++) {
        var line = data[i];
        var nationality = line.Nationality;
        var state = line["Placement State"];
        var city = line["Placement City"];
        var value = parseInt(line["CY 2017"]);
        var state_abb = "";
        for (var j = 0; j < us_states_abb.length; j++) {
            var current = us_states_abb[j];
            if (current.name == state) {
                state_abb = current.abbreviation;
                break;
            }
        }

        var longitude = null;
        var latitude = null;

        for (var j = 0; j < us_coord.length; j++) {
            var current = us_coord[j];
            if (current.fields.state == state_abb) {
                if (current.fields.city == city) {
                    longitude = current.fields.longitude;
                    latitude = current.fields.latitude;
                    break;
                }
            }
        }

        if (!(nationality in placements))
            placements[nationality] = {};
        if (!(state in placements[nationality]))
            placements[nationality][state] = {};
        if (!(city in placements[nationality][state]))
            placements[nationality][state][city] = {};
        if (!("value" in placements[nationality][state][city]))
            placements[nationality][state][city]["value"] = 0;
        if (longitude != null) {
            if (!("longitude" in placements[nationality][state][city])) {
                placements[nationality][state][city]["longitude"] = longitude;
                placements[nationality][state][city]["latitude"] = latitude;
            }
        }
        placements[nationality][state][city]["value"] += value;
    }
    return placements;
};


var createMap = function (svg, data) {
    var nationality = "Bhutan"; // We will change that later
    var us_states = data[1];
    var us_states_abb = data[2];
    var us_coord = data[3];
    var arrivals = transformData(data[0], us_states_abb, us_coord);

    var min_arrivals = Number.MAX_VALUE;
    var max_arrivals = Number.MIN_VALUE;

    var cities = [];
    for (let state in arrivals[nationality]) {
        var value = 0;

        for (let city in arrivals[nationality][state]) {
            current = arrivals[nationality][state][city];
            value += current["value"];
            if ("longitude" in current) {
                cities.push({
                    "name": city,
                    "lon": current.longitude,
                    "lat": current.latitude,
                    "value": current.value
                });
            }
        }
        if (value > max_arrivals) {
            max_arrivals = value;
        }
        if (value < min_arrivals) {
            min_arrivals = value;
        }


        for (var j = 0; j < us_states.features.length; j++) {
            var state_name = us_states.features[j].properties.NAME;
            if (state_name == state) {
                us_states.features[j].properties.arrivals = value;
                break;
            }
        }
    }

    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
   
    var colorScale = d3.scaleQuantile()
        .domain(d3.range(min_arrivals, max_arrivals))
        .range(d3.schemeBlues[9]);
    
    var colorLegend = d3.legendColor()
        .labelFormat(d3.format(".0f"))
        .scale(colorScale)
        .shapePadding(5)
        .shapeWidth(50)
        .shapeHeight(20)
        .labelOffset(12)
        .title("Number of Arrivals");

    svg.append("g")
        .attr("transform", "translate(900, 200)")
        .call(colorLegend);

    var projection = d3.geoAlbersUsa();
    var path = d3.geoPath()
        .projection(projection);
    svg.selectAll('path')
        .data(us_states.features)
        .enter().append('path')
        .attr("class", "states")
        .attr("name", function (d) {
            return d.properties.NAME;
        })
        .attr("d", path)
        .style("fill", function (d) {

            // Get data value
            var value = d.properties.arrivals;
            if (value) {
                //If value exists…
                return colorScale(value);
            } else {
                //If value is undefined…
                return "rgb(213,222,217)";
            };

        }).on("mouseover", function (d) {
            if ("arrivals" in d.properties) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.text(d.properties.arrivals)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            }
        })

        // fade out tooltip on mouse out               
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0)
        });


    svg.selectAll("circle")
        .data(cities)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
        })
        .attr("r", function (d) {
            return Math.sqrt(d.value);
        })
        .style("fill", "rgb(217,91,67)")
        .style("opacity", 0.85)
        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.text(d.name + ": " + d.value)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })

        // fade out tooltip on mouse out               
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });


};



var createViz = function () {
    var svg = d3.select("#map").append("svg")
        .attr("width", ctx.w)
        .attr("height", ctx.h);
    loadData(svg);
};

var loadData = function (svg) {
    var promises = [
        d3.csv("data/arrivals_by_destination_nationality_2017.csv"),
        d3.json("data/us-states.json"),
        d3.json("data/states_titlecase.json"),
        d3.json("data/us-zip-code-latitude-and-longitude.json")
    ];
    Promise.all(promises).then(function (data) {
        createMap(svg, data);
    }).catch(function (error) {
        console.log(error)
    });
};