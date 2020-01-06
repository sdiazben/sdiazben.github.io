function drawTree()
{
// -----------------------------------------
//VARIABLES
// -----------------------------------------
var target = "#tree" //HTML target ID in which to create the SVG
var source = "data/survey_data_b.csv" //data source
var numParentMale;
var numParentFemale;
var numinlawMale;
var numSelf;
var numRows;
var numPartner;
var numChildren;
//var y = "2015 or later" //year
//r c = "Bhutan" //country

//FORMAT VARIABLES
var sw = 5 //stroke width
var fontF = "roboto" //font family
var maxR = 50; //maximum radius
var minR = 15; //minimum radius
var paddingX = maxR/5
var paddingY = maxR/2

//DATA VARIABLES 
var total = d3.csv(source, function(d){
      return d
  ;}).then(function(d) {

  // Total rows
  numRows = d.length;
  
    //Male parent
    var parentMale = d3.csv(source, function(d) {
      if(d["Relationship"] == "Parent/Guardian" &&
        d["Gender"] == "Male"){
          return d
          };
      }).then(function(data) {

      //amount of entries
      numParentMale = data.length;
      console.log("nr "+numRows);
      console.log("npm "+numParentMale);  

      cx = maxR;
      cy = maxR + paddingY;

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numParentMale/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")   
      //.style("opacity", 0.7)

      //Legend

      svgContainer.append("text")
      .attr("x", maxR*9.5)
      .attr("y", paddingY - 9)
      .text("Education - English level")
      .style("font-family",fontF)

      var pie_legend = svgContainer.selectAll(".legend")
      .data(entries)
      .enter().append("g")
      .attr("transform", function(d,i){
        return "translate(" + (maxR*9.5) + "," + ((i+1) * 15 + 20) + ")";
      })
      .attr("class", "legend");  

      pie_legend.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function(d, i) {
        return color(i);
      });

      pie_legend.append("text")
      .text(function(d){
        return d.data.key; 
      })
      .style("font-family",fontF)
      .style("font-size", 12)
      .attr("y", 10)
      .attr("x", 11);
  
    });

    //FEMALE PARENT
    var parentFemale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Parent/Guardian" && 
        d["Gender"] == "Female"){
          return d
          };
      }).then(function(data) {

      numParentFemale = data.length;
      console.log("nr "+numRows);
      console.log("npf "+numParentFemale);

      cx = maxR*3 + paddingX;
      cy = maxR + paddingY;

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numParentFemale/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")   
    });  

    //MALE IN-LAW
    var inlawmale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "In-law" && 
        d["Gender"] == "Male"){
          return d
          };
      }).then(function(data) {

      numinlawMale = data.length;
      console.log("nr "+numRows);
      console.log("nim "+numinlawMale);

      cx = maxR;
      cx += maxR*2 + paddingX;
      cx += maxR*2 + paddingX*3
      cy = maxR + paddingY;

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numinlawMale/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
    }); 

    //FEMALE IN-LAW
    var inlawfemale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "In-law" && 
        d["Gender"] == "Female"){
          return d
          };
      }).then(function(data) {

      numinlawFemale = data.length;
      console.log("nr "+numRows);
      console.log("nif "+numinlawFemale );

      cx = maxR;
      cx += maxR*2 + paddingX;
      cx += maxR*2 + paddingX*3;
      cx += maxR*2 + paddingX;
      cy = maxR + paddingY;

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numinlawFemale/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
    }); 

    //APPLICANT
    var self = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Self"){
          return d
          };
      }).then(function(data) {

      numSelf = data.length;
      console.log("nr "+numRows);
      console.log("s "+numSelf);

      cx = maxR*2 + paddingX/2
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2 

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numSelf/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
    }); 

    //PARTNER
    var partner = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Spouse"){
          return d
          };
      }).then(function(data) {

      numPartner = data.length;
      console.log("nr "+numRows);
      console.log("np "+numPartner);

      cx = maxR*2 + paddingX/2;
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2;
      cx += maxR*4 + paddingX*3.5;

      //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numPartner/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
    });

    //CHILDREN
    var children = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Children"){
          return d
          };
      }).then(function(data) {

      numChildren = data.length;
      console.log("nr "+numRows);
      console.log("nc "+numChildren);

      cx = maxR*4 + paddingX*2.5;
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2;
      cy += maxR*2 + paddingY*2;

     //group and count per attribute (example: english level)
      var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                            .rollup(function(v) { return v.length; })
                            .object(data);

      console.log(JSON.stringify(count));

      //pie chart
      var color = d3.scaleOrdinal().domain(count).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
      var pie = d3.pie()
      .value(function(d) {return d.value; })
      var entries = pie(d3.entries(count))

      

      var pie = svgContainer.append("svg")
                .attr("width", cx*2)
                .attr("height", cy*2)
                .append("g")
                .attr("transform", "translate(" + cx + "," + cy + ")");

      pie.selectAll('whatever')
      .data(entries)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(maxR*3*(numChildren/numRows)))
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")

    });
});

//["Year Of Entry"]
//["Country Of Birth"]
//["Relationship To Head Of Household"]
var maxD = 100;
var minD = 5;

// -----------------------------------------
//WE CREATE THE SVG
// -----------------------------------------
var svgContainer = d3.select(target)
  .append("svg")
  .attr("width", maxR*8 + paddingX*25)
  .attr("height", maxR*7 + paddingY*5);

//WE DRAW THE LINES
//Applicant's parents
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR)
    .attr("y1", maxR+ paddingY)
    .attr("x2", maxR)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*3 + paddingX)
    .attr("y1", maxR + paddingY)
    .attr("x2", maxR*3 + paddingX)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR)
    .attr("y1", maxR*2 + paddingY*2)
    .attr("x2", maxR*3 + paddingX)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*2 + paddingX*.5)
    .attr("y1", maxR*2 + paddingY*2)
    .attr("x2", maxR*2 + paddingX*.5)
    .attr("y2", maxR*3 + paddingY*3);

//Partner's parents (+4+4)
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*5 + paddingX*4)
    .attr("y1", maxR + paddingY)
    .attr("x2", maxR*5 + paddingX*4)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*7 + paddingX*5)
    .attr("y1", maxR + paddingY)
    .attr("x2", maxR*7 + paddingX*5)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*5 + paddingX*4)
    .attr("y1", maxR*2 + paddingY*2)
    .attr("x2", maxR*7 + paddingX*5)
    .attr("y2", maxR*2 + paddingY*2);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*6 + paddingX*4.5)
    .attr("y1", maxR*2 + paddingY*2)
    .attr("x2", maxR*6 + paddingX*4.5)
    .attr("y2", maxR*3 + paddingY*3);

//Applicant's children
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*2 + paddingX*.5)
    .attr("y1", maxR*3 + paddingY*3)
    .attr("x2", maxR*6 + paddingX*4.5)
    .attr("y2", maxR*3 + paddingY*3);
svgContainer.append("line")
    .style("stroke", "black")
    .style("stroke-width", sw)
    .style("stroke-linecap", "round")
    .attr("x1", maxR*4 + paddingX*2.5)
    .attr("y1", maxR*3 + paddingY*3)
    .attr("x2", maxR*4 + paddingX*2.5)
    .attr("y2", maxR*5 + paddingY*5);

// -----------------------------------------
//WE DRAW THE LABELS
svgContainer.append("text")
  .attr("x", maxR*2 + paddingX*.5 - 35)
  .attr("y", paddingY - 9)
  .text("PARENTS")
  .style("font-family",fontF)

svgContainer.append("text")
  .attr("x", maxR*6 + paddingX*4.5 - 33)
  .attr("y", paddingY - 9)
  .text("IN-LAWS")
  .style("font-family",fontF)

svgContainer.append("text")
  .attr("x", maxR*2 + paddingX*.5 - 44)
  .attr("y", maxR*4 + paddingY*4 - 9)
  .text("APPLICANT")
  .style("font-family",fontF)

svgContainer.append("text")
  .attr("x", maxR*6 + paddingX*4.5 - 37.5)
  .attr("y", maxR*4 + paddingY*4 - 9)
  .text("PARTNER")
  .style("font-family",fontF)

svgContainer.append("text")
  .attr("x", maxR*4 + paddingX*2.5 - 40)
  .attr("y", maxR*6.5 + paddingY*5 - 9)
  .text("CHILDREN")
  .style("font-family",fontF)

// -----------------------------------------
//WE DRAW THE CIRCLES
//Parents
//cx = maxR;
//cy = maxR + paddingY;


//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR*(parentMale/total))
  //.style("fill","blue")
  //.attr('transform', "translate(150,50)");

//cx += maxR*2 + paddingX

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

//cx += maxR*2 + paddingX*3

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

//cx += maxR*2 + paddingX

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

//Applicant and partner
//cx = maxR*2 + paddingX/2
//cy += maxR*2 + paddingY*2 

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

//cx += maxR*4 + paddingX*3.5

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

//children
//cx = maxR*4 + paddingX*2.5
//cy += maxR*2 + paddingY

//svgContainer.append("circle")
  //.attr("cx", cx)
  //.attr("cy", cy)
  //.attr("r", maxR)
  //.style("fill","blue");

// -----------------------------------------
// WE DRAW THE LEGEND
//circles
svgContainer.append("circle")
  .attr("cx", maxR)
  .attr("cy", maxR*6 + paddingY*5)
  .attr("r", maxR)
  .style("fill","none")
  .style("stroke","black")
  .style("stroke-dasharray", ("3, 3"));
svgContainer.append("circle")
  .attr("cx", maxR)
  .attr("cy", maxR*7 + paddingY*5 - minR)
  .attr("r", minR)
  .style("fill","none")
  .style("stroke","black")
  .style("stroke-dasharray", ("3, 3"));

//lables
svgContainer.append("text")
  .attr("x", maxR - 9)
  .attr("y", maxR*6 + paddingY*5)
  .text(maxD)
  .style("font-family",fontF)
  .style("font-size",10)
svgContainer.append("text")
  .attr("x", maxR - 9)
  .attr("y", maxR*7 + paddingY*5 - minR)
  .text("<="+minD)
  .style("font-family",fontF)
  .style("font-size",10)
}



