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

//Loops the application. Underdefined right now.
// while(true){
//   update();
//   render();
// }
