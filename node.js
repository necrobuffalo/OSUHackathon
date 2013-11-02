/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Name of the artist
var name;
//Array of the nodes for similar artists
var similarArtists;
//Boolean which determines whether this will be rendered
var isVisible;

//Constructor for Node
function Node(name){
    this = new Object();
    this.name = name;
    this.similarArtists = new Array();
    this.isVisible = false;
}

//Expands the node. Gives it 5 similar artists.
function Expand(){
    for(i = 0; i < 5; i++){
        iName = ""; //Insert echonest code here
        iNode = new Node(iName); //I'm not sure if this is how it works in js
        iNode.isVisible = true;
        this.similarArtist[i] = iNode;
    }
}

/*
 * I think that we should write and interpreter that collectively renders the nodes 
 * by accessing their data parameters, rather than trying to render them recursively 
 * with this method.
 */
function Render(){
}
