function createTree(svgContainer, data, maxR)
{
  // -----------------------------------------
  // CRITERIA
  // -----------------------------------------
  var treeTitle = "Education - English level"
  var refugeeCriteria = "Speak English Now"
  var userSelections={"Country":"Bhutan","Year":"2011"};

  // -----------------------------------------
  //VARIABLES
  // -----------------------------------------
  //var maxR = 50; //maximum radius -> passed as param
  var minR = 15; //minimum radius
  var paddingX = maxR/5
  var paddingY = maxR/2
  var relation = ["Parent/Guardian","In-law","Self","Spouse","Children"]
  var gender = ["Male","Female"]

  var numRows = data.length;
  var numParentMale = data.map(x=>{if(x["Relationship"]==relation[0]&&x["Gender"]==gender[0]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numParentFemale = data.map(x=>{if(x["Relationship"]==relation[0]&&x["Gender"]==gender[1]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numinlawMale = data.map(x=>{if(x["Relationship"]==relation[1]&&x["Gender"]==gender[0]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numinlawFemale = data.map(x=>{if(x["Relationship"]==relation[1]&&x["Gender"]==gender[1]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numSelf = data.map(x=>{if(x["Relationship"]==relation[2]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numPartner = data.map(x=>{if(x["Relationship"]==relation[3]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var numChildren = data.map(x=>{if(x["Relationship"]==relation[4]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
  var criteriaOptions = Array.from(new Set(data.map(x=>x[refugeeCriteria])))

  var totals = [numParentMale,numParentFemale,numinlawMale,numinlawFemale,numSelf,numPartner,numChildren]

  var maxD = Math.max.apply(null,totals); //maximum number of "applicants" for legend
  var minD = Math.min.apply(null,totals.filter(x=>{if(x!=0){return x}})); //minimum number of "applicants" for legend

  var color = d3.scaleOrdinal().domain(criteriaOptions).range(d3.schemeGreens[9])
  var newScale = d3.scaleLinear().domain([minD, maxD]).range([minR, maxR]);

  // -----------------------------------------
  // DATA PROCESSING
  // -----------------------------------------
  var pieData = {}
  for(var i=0; i<relation.length;i++){
    if(relation[i]=="Parent/Guardian"||relation[i]=="In-law"){
      for(var j=0; j<gender.length;j++){
        var tempData={}
        for(var k=0;k<criteriaOptions.length;k++){
          tempData[criteriaOptions[k]] = data.map(x=>{if(x["Relationship"]==relation[i]&&x["Gender"]==gender[j]&&x[refugeeCriteria]==criteriaOptions[k]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
        }
        pieData[relation[i]+gender[j]]=tempData
      }
    }else{
      var tempData={}
      for(var k=0;k<criteriaOptions.length;k++){
        tempData[criteriaOptions[k]] = data.map(x=>{if(x["Relationship"]==relation[i]&&x[refugeeCriteria]==criteriaOptions[k]){return 1}else{return 0}}).reduce((x,y)=>{return x+y});
      }
      pieData[relation[i]]=tempData
    }
  }

  // -----------------------------------------
  // DRAW THE LINES
  // -----------------------------------------
  //Applicant's parents
  svgContainer.append("line")
      .attr("x1", maxR)
      .attr("y1", maxR+ paddingY)
      .attr("x2", maxR)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*3 + paddingX)
      .attr("y1", maxR + paddingY)
      .attr("x2", maxR*3 + paddingX)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR)
      .attr("y1", maxR*2 + paddingY*2)
      .attr("x2", maxR*3 + paddingX)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*2 + paddingX*.5)
      .attr("y1", maxR*2 + paddingY*2)
      .attr("x2", maxR*2 + paddingX*.5)
      .attr("y2", maxR*3 + paddingY*3)
      .attr("class", "connectingLine");

  //Partner's parents (+4+4)
  svgContainer.append("line")
      .attr("x1", maxR*5 + paddingX*4)
      .attr("y1", maxR + paddingY)
      .attr("x2", maxR*5 + paddingX*4)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*7 + paddingX*5)
      .attr("y1", maxR + paddingY)
      .attr("x2", maxR*7 + paddingX*5)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*5 + paddingX*4)
      .attr("y1", maxR*2 + paddingY*2)
      .attr("x2", maxR*7 + paddingX*5)
      .attr("y2", maxR*2 + paddingY*2)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*6 + paddingX*4.5)
      .attr("y1", maxR*2 + paddingY*2)
      .attr("x2", maxR*6 + paddingX*4.5)
      .attr("y2", maxR*3 + paddingY*3)
      .attr("class", "connectingLine");

  //Applicant's children
  svgContainer.append("line")
      .attr("x1", maxR*2 + paddingX*.5)
      .attr("y1", maxR*3 + paddingY*3)
      .attr("x2", maxR*6 + paddingX*4.5)
      .attr("y2", maxR*3 + paddingY*3)
      .attr("class", "connectingLine");
  svgContainer.append("line")
      .attr("x1", maxR*4 + paddingX*2.5)
      .attr("y1", maxR*3 + paddingY*3)
      .attr("x2", maxR*4 + paddingX*2.5)
      .attr("y2", maxR*5 + paddingY*5)
      .attr("class", "connectingLine");

  // -----------------------------------------
  // DRAW THE LABELS
  // -----------------------------------------
  svgContainer.append("text")
    .attr("x", maxR*2 + paddingX*.5 - 35)
    .attr("y", paddingY - 9)
    .text("PARENTS")

  svgContainer.append("text")
    .attr("x", maxR*6 + paddingX*4.5 - 33)
    .attr("y", paddingY - 9)
    .text("IN-LAWS")

  svgContainer.append("text")
    .attr("x", maxR*2 + paddingX*.5 - 44)
    .attr("y", maxR*4 + paddingY*4 - 9)
    .text("APPLICANT")

  svgContainer.append("text")
    .attr("x", maxR*6 + paddingX*4.5 - 37.5)
    .attr("y", maxR*4 + paddingY*4 - 9)
    .text("PARTNER")

  svgContainer.append("text")
    .attr("x", maxR*4 + paddingX*2.5 - 40)
    .attr("y", maxR*6.5 + paddingY*5 - 9)
    .text("CHILDREN")

  // -----------------------------------------
  // DRAW THE LEGENDS
  // -----------------------------------------
  //circles
  svgContainer.append("circle")
    .attr("cx", maxR)
    .attr("cy", maxR*6 + paddingY*5)
    .attr("r", maxR)
    .attr("class","legendCircle")
  svgContainer.append("circle")
    .attr("cx", maxR)
    .attr("cy", maxR*7 + paddingY*5 - minR)
    .attr("r", minR)
    .attr("class","legendCircle")

  //lables
  svgContainer.append("text")
    .attr("x", maxR - 9)
    .attr("y", maxR*6 + paddingY*5)
    .text(maxD)
    .attr("class","legendText")
  svgContainer.append("text")
    .attr("x", maxR - 9)
    .attr("y", maxR*7 + paddingY*5 - minR)
    .text(minD)
    .attr("class","legendText")


  // -----------------------------------------
  // DRAW THE PIE CHARTS
  // -----------------------------------------
  var locations = {
    "Parent/GuardianMale":[maxR, maxR + paddingY],
    "Parent/GuardianFemale":[maxR*3 + paddingX, maxR + paddingY],
    "In-lawMale":[maxR*5 + paddingX*4, maxR + paddingY],
    "In-lawFemale":[maxR*7 + paddingX*5, maxR + paddingY],
    "Self":[maxR*2 + paddingX*.5, maxR*3 + paddingY*3],
    "Spouse":[maxR*6 + paddingX*4, maxR*3 + paddingY*3],
    "Children":[maxR*4 + paddingX*2.5, maxR*5 + paddingY*4]
  }
  totals = {
    "Parent/GuardianMale":numParentMale,
    "Parent/GuardianFemale":numParentFemale,
    "In-lawMale":numinlawMale,
    "In-lawFemale":numinlawFemale,
    "Self":numSelf,
    "Spouse":numPartner,
    "Children":numChildren
  }

  var keys = Object.keys(pieData)
  for(var i=0; i<keys.length;i++){
    newRadius= newScale(totals[keys[i]])
    drawPie(svgContainer,locations[keys[i]][0],locations[keys[i]][1],newRadius,pieData[keys[i]],color)
  }
  }

  function drawPie(svgContainer,cx,cy,radius,data,colorScheme){

    var pie = d3.pie().value(function(d) {return d.value; })
    var slices = pie(d3.entries(data))

    var pie = svgContainer.append("svg")
              .attr("width", cx*2)
              .attr("height", cy*2)
              .append("g")
              .attr("transform", "translate(" + cx + "," + cy + ")");

    pie.selectAll('whatever')
    .data(slices)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius))
    .attr('fill', function(d){return colorScheme(d.data.key)} )
    .attr("stroke", "black")
    .style("stroke-width", "2px")   
    //.style("opacity", 0.7)  
}
/*/DATA VARIABLES 
var total = d3.csv(source, function(d){
      console.log(d);
  ;}).then(function(d) {

  
  // Total rows
  numRows = d.length;

  //TEST
  console.log("RR:" + total)
  
  //TEST


  
    //Male parent
    

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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
      var color = d3.scaleOrdinal().domain(count).range(colorScheme)
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
    
    //Legend
    var legends = d3.csv(source, function(d) {return d;})
    .then(function(data) {
          var count = d3.nest().key(function(d) { return d["Speak English Now"]; })
                                  .rollup(function(v) { return v.length; })
                                  .object(data);

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
});*/



//
// -----------------------------------------
//WE DRAW THE CIRCLES
/*Parents
cx = maxR;
cy = maxR + paddingY;
svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue")

cx += maxR*2 + paddingX

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");

cx += maxR*2 + paddingX*3

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");

cx += maxR*2 + paddingX

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");

//Applicant and partner
cx = maxR*2 + paddingX/2
cy += maxR*2 + paddingY*2 

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");

cx += maxR*4 + paddingX*3.5

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");

//children
cx = maxR*4 + paddingX*2.5
cy += maxR*2 + paddingY

svgContainer.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", maxR)
  .style("fill","blue");
*/

