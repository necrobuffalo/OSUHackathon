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
	$("#viewport").attr("width",$(window).get(0).innerWidth);
    $("#viewport").attr("height",$(window).get(0).innerHeight);
	
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
	//clear data somehow?
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
	//sys.addNode(rootName, {'color':'red','shape':'dot','label':rootName});
	//data.nodes.window[rootName].data = {'color':'red','shape':'dot','label':rootName};
	var data = {
		nodes:{
			root:{'color':'red','shape':'dot','label':rootName},
			c1:{'color':'blue','shape':'dot','label':'c1'},
			c2:{'color':'blue','shape':'dot','label':'c2'},
			c3:{'color':'blue','shape':'dot','label':'c3'},
			c4:{'color':'blue','shape':'dot','label':'c4'},
			c5:{'color':'blue','shape':'dot','label':'c5'}
		},
		edges:{
			root:{c1:{},c2:{},c3:{},c4:{},c5:{}}
		}
	}

	//add children of root
	echonest.artist(rootName).similar(function(similarCollection){
		
		jQuery.each(similarCollection.getData(), function(count,item) {
			//alert(item.name);
			//sys.addNode(item.name, {'color':'blue','shape':'dot','label':item.name});
			data.nodes["c" + (count + 1)].label = item.name;
			//sys.addEdge(rootName, item.name);
		})
		
	}, {results: 5});

	sys.graft(data);

})

//Bind event handler for resizing

$(window).resize(function(){
	$("#viewport").attr("width",$(window).get(0).innerWidth);
    $("#viewport").attr("height",$(window).get(0).innerHeight);

    //should redraw after this
})