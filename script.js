//Artist name provided by user
var rootName;
//Creates a new web/particle system
var sys;

var DEEZER_DEMO_API_KEY='9NQYW4WQCM3URUORT';

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
	
	playMusic(getParameterByName("artistName"));

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

function playMusic(rootArtist){
	var audio
	jQuery.ajaxSettings.traditional = true;
	
	var artist = getParameterByName("artistName");
	
	fetchMusic(artist);
	
	
}

function fetchMusic(artist) {
    $("#song").empty();
    var url = 'http://developer.echonest.com/api/v4/playlist/static?callback=?'
    jQuery.getJSON(url, 
        {   artist:artist, 
            type:'artist-radio', 
            format:'jsonp', 
            bucket: ['id:deezer', 'tracks'],
            limit: true,
            'api_key' : DEEZER_DEMO_API_KEY
        },
        function(data) {
            if (data.response.status.code == 0) {
                var songs = data.response.songs;
                addSong(songs);
            } else {
            }
        }
    );
}

function addSong(songs) {
    var div = $("#playlist");
    fetchDeezerTrack(songs[0], div);
}

function fetchDeezerTrack(song, div) {
    if (song.tracks.length > 0) {
        var tid = song.tracks[0].foreign_id.split(':')[2];
        var url = 'http://api.deezer.com/2.0/track/' + tid + '?callback=?'

        jQuery.getJSON(url, { output:'jsonp'},
            function(data) {
                var link = $("<a target='deezer'>").attr('href', data.link);
                var cover = $("<img class='timg'>").attr('src', data.album.cover).attr("style", "float:left");
                link.append(cover);
                div.append(link);

                var tdiv = $("<div class='tdiv'>");
                tdiv.append( $("<div class='title'>").text(data.title));
                tdiv.append( $("<div>").text(data.album.title));
                tdiv.append( $("<div>").text(data.artist.name));
                
                div.append(createPlayer(data.preview));
				
				//div.append(tdiv);
                //div.append($('<br clear="left">'));
            }
        );
    }
}

function createPlayer(audio) {
    var player = $("<audio class='player' preload='none' controls='controls'>").attr("src", audio);
    return player;
}

function createPlayButton(audio) {
    var button = $("<button>").text("preview");
    button.click( 
        function()  {
            alert("Playing " + audio);
        }
    );
    return button;
}
