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
	populate();
}

//Bind event handler for change in base artist
/*
$("#navbar input[name=artistName]").change(function() {
	//Update root name
	rootName = $("#navbar input[name=artistName]").val();
		
	//clear old arbor data
	sys.prune(function(node, from, to) {
		return true;
	})

	populate();

})
*/

//Bind event handler for resizing

$(window).resize(function(){
	$("#viewport").attr("width",$(window).get(0).innerWidth);
    $("#viewport").attr("height",$(window).get(0).innerHeight);

    //should redraw after this
})

function populate() {
	//add root
	var data = {
		nodes:{
			root:{'color':'red','shape':'dot','label':getParameterByName("artistName")},
			c1:{'color':'blue','label':'c1', 'link':'placeholder'},
			c2:{'color':'blue','label':'c2', 'link':'placeholder'},
			c3:{'color':'blue','label':'c3', 'link':'placeholder'},
			c4:{'color':'blue','label':'c4', 'link':'placeholder'},
			c5:{'color':'blue','label':'c5', 'link':'placeholder'}
		},
		edges:{
			root:{c1:{},c2:{},c3:{},c4:{},c5:{}}
		}
	}

	//add children of root
	echonest.artist(getParameterByName("artistName")).similar(function(similarCollection){
		
		jQuery.each(similarCollection.getData(), function(count,item) {
			//alert(item.name);
			//sys.addNode(item.name, {'color':'blue','shape':'dot','label':item.name});
			data.nodes["c" + (count + 1)].label = item.name;
			data.nodes["c" + (count + 1)].link = "index.html?artistName=" + item.name.split(' ').join('+');
			//sys.addEdge(rootName, item.name);
		})
		
	}, {results: 5});

	sys.graft(data);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}