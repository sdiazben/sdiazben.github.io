

function preload(){
//code here is executed before setup
table_arrivals = loadTable ("data/arrivals_by_destination_nationality_2017.csv","csv","header");
table_entry_attributes = loadTable ("data/Refugee_entry_info_2017.csv","csv","header");
table_survey_data = loadTable ("data/survey_data_b.csv","csv","header");
}

function setup() {
  // put setup code here
  //createCanvas(w,h);
  //background(210);
  //console.log(table.getRowCount()+" total rows in table");
  //console.log(table.getColumnCount()+" total columns in table");

  datarows = table.findRows("2018","Title","Year","Conference");

  //yearCol = table.getColumn("Year"); //When using every year

  //console.log("2018 paper count: "+datarows.length);
		
}

function draw() {


  for (var i = 0; i < datarows.length; i++)
  {
  	//currentYear = datarows[i].get("Year");
  	//conf =  datarows[i].get("Conference");
  
  }
}


function testMouseOver (x,y,circleRadius)
{

}