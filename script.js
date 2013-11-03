//Artist name provided by user
var rootName;
//Creates a new web/particle system
var sys;

//echonest object for api calls
var echonest;

$(document).ready(function() {
	init();
})

function init() {
	
	//Initialize stuff
	sys = arbor.ParticleSystem(1000,400,1);
	sys.parameters({gravity:true});
	sys.renderer = Renderer("#viewport");
	echonest = new EchoNest("9NQYW4WQCM3URUORT");
	

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

//Bind event handler for change in base artist
$("#navbar input[name=artistName]").change(function() {
	//Update root name
	rootName = $("#navbar input[name=artistName]").val();
		
	//clear old arbor data
	sys.prune(function(node, from, to) {
		return true;
	})

	//add root
	sys.addNode(rootName, {'color':'red','shape':'dot','label':rootName});
	//add children of root
	echonest.artist(rootName).similar(function(similarCollection){
		
		jQuery.each(similarCollection.getData(), function(count,item) {
			//alert(item.name);
			sys.addNode(item.name, {'color':'blue','shape':'dot','label':item.name});
			sys.addEdge(rootName, item.name);
		})
		
	}, {results: 5});

})