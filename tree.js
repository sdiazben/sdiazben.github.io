var allCriteria = ["Ethnic Origin","Speak English Now","num_months__health_costs_covered_organism_past_12mo","Earnings_per_person_last_12_months","type_aid","Employment Before Entry","Work Status"]
var selectedCriteria = "";

function createTree(svgContainer, data, maxR, refugeeCriteria)
{
  // -----------------------------------------
  // CRITERIA
  // -----------------------------------------
  var treeTitle = "Education - English level"
  selectedCriteria =  refugeeCriteria
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

  var color = d3.scaleOrdinal().domain(criteriaOptions).range(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"])
  var newScale = d3.scaleLinear().domain([minD, maxD]).range([minR, maxR]);

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
  .attr("x1", maxR*6 + paddingX*4)
  .attr("y1", maxR*2 + paddingY*2)
  .attr("x2", maxR*6 + paddingX*4)
  .attr("y2", maxR*3 + paddingY*3)
  .attr("class", "connectingLine");

  //Applicant's children
  svgContainer.append("line")
  .attr("x1", maxR*2 + paddingX*.5)
  .attr("y1", maxR*3 + paddingY*3)
  .attr("x2", maxR*6 + paddingX*4)
  .attr("y2", maxR*3 + paddingY*3)
  .attr("class", "connectingLine");
  svgContainer.append("line")
  .attr("x1", maxR*4 + paddingX*2.5)
  .attr("y1", maxR*3 + paddingY*3)
  .attr("x2", maxR*4 + paddingX*2.5)
  .attr("y2", locations["Children"][1])
  .attr("class", "connectingLine");
  
  // -----------------------------------------
  // DRAW THE ARROWS TO CHANGE ON CLICK
  // -----------------------------------------
  
  var previous = function(){
  	var index = allCriteria.findIndex(function(d){return d == refugeeCriteria})
  	if(index==0){index=allCriteria.length}
	svgContainer.remove()
  	var svgTree = d3.select("#tree").append("svg")
        .attr("width", maxR*(9)) 
        .attr("height", maxR*(10))
        .attr("id","treeSVG")
  	createTree(svgTree, data, maxR, allCriteria[(index-1)])
  }
  var next = function(){
  	var index = allCriteria.findIndex(function(d){return d == refugeeCriteria})
  	if(index==allCriteria.length-1){index=-1}
	svgContainer.remove()
  	var svgTree = d3.select("#tree").append("svg")
        .attr("width", maxR*(9)) 
        .attr("height", maxR*(10))
        .attr("id","treeSVG")
  	createTree(svgTree, data, maxR, allCriteria[(index+1)])
  }

  svgContainer.append("line")
  .attr("x1", maxR)
  .attr("y1",5)
  .attr("x2", maxR-9)
  .attr("y2",10)
  .attr("class", "connectingLine")
  .on("click",previous);
  svgContainer.append("line")
  .attr("x1", maxR)
  .attr("y1",15)
  .attr("x2", maxR-9)
  .attr("y2",10)
  .attr("class", "connectingLine")
  .on("click",previous);
  svgContainer.append("line")
  .attr("x1", maxR)
  .attr("y1",5)
  .attr("x2", maxR)
  .attr("y2",15)
  .attr("class", "connectingLine")
  .on("click",previous);

  svgContainer.append("line")
  .attr("x1", maxR*8)
  .attr("y1",5)
  .attr("x2", maxR*8+9)
  .attr("y2",10)
  .attr("class", "connectingLine")
  .on("click",next);
  svgContainer.append("line")
  .attr("x1", maxR*8+9)
  .attr("y1",10)
  .attr("x2", maxR*8)
  .attr("y2",15)
  .attr("class", "connectingLine")
  .on("click",next);
  svgContainer.append("line")
  .attr("x1", maxR*8)
  .attr("y1",5)
  .attr("x2", maxR*8)
  .attr("y2",15)
  .attr("class", "connectingLine")
  .on("click",next);

  // -----------------------------------------
  // DRAW THE LABELS
  // -----------------------------------------
  svgContainer.append("text")
  .attr("x", (locations["Parent/GuardianMale"][0]+locations["Parent/GuardianFemale"][0])/2 - 35)
  .attr("y", paddingY - 9)
  .text("PARENTS")

  svgContainer.append("text")
  .attr("x", (locations["In-lawMale"][0]+locations["In-lawFemale"][0])/2 - 33)
  .attr("y", paddingY - 9)
  .text("IN-LAWS")

  svgContainer.append("text")
  .attr("x", locations["Self"][0] - 44)
  .attr("y", locations["Self"][1] + maxR+paddingY)
  .text("APPLICANT")

  svgContainer.append("text")
  .attr("x", locations["Spouse"][0] - 37.5)
  .attr("y", locations["Spouse"][1] + maxR+paddingY)
  .text("PARTNER")

  svgContainer.append("text")
  .attr("x", locations["Children"][0] - 40)
  .attr("y", locations["Children"][1] + maxR+paddingY)
  .text("CHILDREN")

  // -----------------------------------------
  // DRAW THE LEGENDS
  // -----------------------------------------
  //circles
  svgContainer.append("circle")
  .attr("cx", maxR+paddingX)
  .attr("cy", maxR*6 + paddingY*3)
  .attr("r", maxR)
  .attr("class","legendCircle")
  svgContainer.append("circle")
  .attr("cx", maxR+paddingX)
  .attr("cy", maxR*7 + paddingY*3 - minR)
  .attr("r", minR)
  .attr("class","legendCircle")

  //lables
  svgContainer.append("text")
  .attr("x", maxR+paddingX - 9)
  .attr("y", maxR*6 + paddingY*3)
  .text(maxD)
  .attr("class","legendText")
  svgContainer.append("text")
  .attr("x", maxR+paddingX - 9)
  .attr("y", maxR*7 + paddingY*3 - minR)
  .text(minD)
  .attr("class","legendText")

  //squares
  var lx = paddingX
  var ly = maxR*10 - 55
  var legendPadding = maxR/10
  for(var i=0; i<criteriaOptions.length;i++){
  	if(lx+20+legendPadding+textSize(criteriaOptions[i])["width"] > maxR*9){
  		lx = paddingX
  		ly += 25
  	}
  	svgContainer.append("rect")
  	.attr("width", 20)
  	.attr("height", 20)
  	.attr("fill", color(criteriaOptions[i]))
  	.attr("x", lx)
  	.attr("y", ly);

  	lx += legendPadding + 20

  	svgContainer.append("text")
  	.text(criteriaOptions[i])
  	.attr("class","legendText")
  	.attr("x", lx)
  	.attr("y", ly+14);

  	lx+= textSize(criteriaOptions[i])["width"] + legendPadding  
  }


  // -----------------------------------------
  // DRAW THE PIE CHARTS
  // -----------------------------------------
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

	var div = d3.select("body")
	.append("div")
	.attr("class", "tooltip2")
	.style("opacity", 0);

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
	.on("mouseover", function(d){
		div.transition().duration(200).style("opacity", .9);
		div.text(d.value)
		.style("left", (d3.event.pageX+10) + "px")
		.style("top", (d3.event.pageY) + "px");
	})
	.on("mouseout", function(d){
		div.transition().duration(500).style("opacity", 0);
	})
	.on("click", function() {
		div.transition().duration(500).style("opacity", 0);
	});   

}

function textSize(text) {
	var container = d3.select('#conclusions').append("svg")
	container.append('text').attr("x",-99999).attr("y",-99999).text(text);
	var size = container.node().getBBox();
	container.remove();
	return { width: size.width, height: size.height };
}

/*
// -----------------------------------------
// SCROLLING INTERACTION
// -----------------------------------------
// Initial state
var scrollPos = 0;
// adding scroll event

window.addEventListener('scroll', function(){
  // detects new state and compares it with the new one
  if ((document.body.getBoundingClientRect()).top > scrollPos)
    console.log("UP");
  else
    console.log("DOWN");
  // saves the new position for iteration.
  scrollPos = (document.body.getBoundingClientRect()).top;
});
*/
