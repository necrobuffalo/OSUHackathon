//Handles all of the nodes
function Web(rootArtistName) {
	this.root = new Node(rootArtistName, true);

}

Web.prototype.displayWeb = new function() {

}

//Code that I wrote at the same time:

//Renders the web
function render(){
  //To be determined... 
}
//Updates the state of the web
function update(){
  //To be determined
}
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
while(true){
  update();
  render();
}
