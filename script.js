var canvas;
var context;

$(document).ready(function() {
	init();

	draw();
})

$(window).resize(resizeCanvas);

function resizeCanvas() {
	canvas.attr("width",$(window).get(0).innerWidth);
	canvas.attr("height",$(window).get(0).innerHeight);

	draw();
}


function init() {
	canvas = document.getElementById("window");
	context = canvas.getContext("2d");
}

function draw() {

}