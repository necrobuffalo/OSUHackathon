//Artist name provided by user
var rootName;
//Creates a new web/particle system
var sys;

$(document).ready(function() {
	init();
})

function init() {
	
	//Initialize stuff
	sys = arbor.ParticleSystem(1000,400,1);
	sys.parameters({gravity:true});
	sys.renderer = Renderer("#viewport");
	
	//Bind event handler for change in base artist
	$("#navbar input[name=artistName]").change(function() {
		//Update root name
		rootName = $("#navbar input[name=artistName]").val();
		

	})

	//Do some basic drawing as a test
	var data = {
				nodes:{
					animals:{'color':'red','shape':'dot','label':'Animals'},
					dog:{'color':'green','shape':'dot','label':'dog'},
					cat:{'color':'blue','shape':'dot','label':'cat'}
				},
				edges:{
					animals:{ dog:{}, cat:{} }
				}
			};
			sys.graft(data);

}
