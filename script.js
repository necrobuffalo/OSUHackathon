//Artist name provided by user
var rootName;
//Creates a new web
var web;

$(document).ready(function() {
	init();
})

function init() {
	
	//Initialize stuff
	web = new Web(rootName);
	web.root.expand();
	
	//Bind event handler for change in base artist
	$("#navbar input[name=artistName]").change(function() {
		//Update root name
		rootName = $("#navbar input[name=artistName]").val();
		
		//Update the web
		web = new Web(rootName);
		web.root.expand();
		
		//Render the web
		web.render();
	})


}

function draw() {
	web.render();
}
