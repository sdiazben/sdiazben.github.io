function drawTree(){
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

  // TOTAL ROWS
  numRows = d.length;
  
    //MALE PARENT
    var parentMale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Parent/Guardian" && //"Parent / Stepparent / foster parent / guardian" && //NECESITAMOS CAMBIARLO A "PARENT" "IN-LAW" "APPLICANT" "PARTNER" "CHILDREN" Y "OTHER"
        d["Gender"] == "Male"){
          return d
          };
      }).then(function(d) {

      numParentMale = d.length;
      console.log("nr "+numRows);
      console.log("npm "+numParentMale);

      cx = maxR;
      cy = maxR + paddingY;

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numParentMale/numRows))
      .style("fill","blue")
    });

    //FEMALE PARENT
    var parentFemale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Parent/Guardian" && 
        d["Gender"] == "Female"){
          return d
          };
      }).then(function(d) {

      numParentFemale = d.length;
      console.log("nr "+numRows);
      console.log("npf "+numParentFemale);

      cx = maxR;
      cx += maxR*2 + paddingX;
      cy = maxR + paddingY;

      svgContainer.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", maxR*2*(numParentFemale/numRows))
        .style("fill","blue");
    });  

    //MALE IN-LAW
    var inlawmale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "In-law" && 
        d["Gender"] == "Male"){
          return d
          };
      }).then(function(d) {

      numinlawMale = d.length;
      console.log("nr "+numRows);
      console.log("nim "+numinlawMale);

      cx = maxR;
      cx += maxR*2 + paddingX;
      cx += maxR*2 + paddingX*3
      cy = maxR + paddingY;

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numinlawMale/numRows))
      .style("fill","blue");
    }); 

    //FEMALE IN-LAW
    var inlawfemale = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "In-law" && 
        d["Gender"] == "Female"){
          return d
          };
      }).then(function(d) {

      numinlawFemale = d.length;
      console.log("nr "+numRows);
      console.log("nif "+numinlawFemale );

      cx = maxR;
      cx += maxR*2 + paddingX;
      cx += maxR*2 + paddingX*3;
      cx += maxR*2 + paddingX;
      cy = maxR + paddingY;

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numinlawFemale/numRows))
      .style("fill","blue");
    }); 

    //APPLICANT
    var self = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Self"){
          return d
          };
      }).then(function(d) {

      numSelf = d.length;
      console.log("nr "+numRows);
      console.log("s "+numSelf);

      cx = maxR*2 + paddingX/2
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2 

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numSelf/numRows))
      .style("fill","blue");
    }); 

    //PARTNER
    var partner = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Spouse"){
          return d
          };
      }).then(function(d) {

      numPartner = d.length;
      console.log("nr "+numRows);
      console.log("np "+numPartner);

      cx = maxR*2 + paddingX/2;
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2;
      cx += maxR*4 + paddingX*3.5;

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numPartner/numRows))
      .style("fill","blue");
    });

    //CHILDREN
    var children = d3.csv(source, function(d) {
      if(//d["Year Of Entry"]== y &&
        //d["Country Of Birth"] == c && 
        d["Relationship"] == "Children"){
          return d
          };
      }).then(function(d) {

      numChildren = d.length;
      console.log("nr "+numRows);
      console.log("nc "+numChildren);

      cx = maxR*4 + paddingX*2.5;
      cy = maxR + paddingY;
      cy += maxR*2 + paddingY*2;
      cy += maxR*2 + paddingY*2;

      svgContainer.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", maxR*2*(numChildren/numRows))
      .style("fill","blue");

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
  .attr("width", maxR*8 + paddingX*5)
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
  .attr("y", maxR*6 + paddingY*5 - 9)
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



