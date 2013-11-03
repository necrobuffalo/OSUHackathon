/* WEB OBJECT DEFINITION */

//Handles all of the nodes
function Web(rootArtistName) {
	this.root = new Node(rootArtistName, true);

}

//Renders the web
Web.prototype.render = function(){
  //To be determined... 
}
//Updates the state of the web
Web.prototype.update = function(){
  //To be determined
}

/* MAIN BODY */

//Artist name provided by the user
var rootName = ""; 
//Creates a Node object to represent the Web
var web = new Node(rootName); 
//Allows web to be rendered
web.isVisible = true;
//Finds similar artists for the selected artist and makes them visible, allowing them to be rendered
web.Expand();
//Renders the initial state of the web
render();

//Loops the application. Underdefined right now.
// while(true){
//   update();
//   render();
// }
