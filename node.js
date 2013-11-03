/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 //Creates echonest object
 var echonest = new EchoNest("9NQYW4WQCM3URUORT");

//Constructor for Node
function Node(name){
    //Properties
    this.name = name;
    this.similarArtists = [];
    this.childrenAreVisible = false;
}

//Expands the node. Gives it 5 similar artists and toggles visibility.
Node.prototype.expand = function(){

    //If similarArtists is not empty, no reason to populate it.
    if (this.similarArtists.length == 0) {
     
        var names = [];
        //Populates names with the names of similar artists
        echonest.artist("Muse").similar( function(similarCollection) {
            names = ${name};
        });
         
         var i = 0;
         while(i <= 5 && i < names.length ){
            this.similarArtists[i] = new Node(names[i]);
         }
    }

    //Toggle visibility on, regardless of what happens.
    this.childrenAreVisible = true;

}

//Collapse node, toggling visibility off.
Node.prototype.collapse = function() {
    //Not deleting similar artists, might want to later depending on resource usage?

    //Toggle visibility off.
    this.childrenAreVisible = false;
}
