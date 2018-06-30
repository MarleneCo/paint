var canvas, ctx,
	brush = {
		x: 0,
		y: 0,
		color: '#000000',
		size: 10,
		down: false,
	},

	strokes = [],
	currentStroke = null,
	linemode = false;

function redraw(){
	ctx.clearRect(0, 0, canvas.width(), canvas.height());
	ctx.lineCap = 'round';

	for(var i =0; i < strokes.length; i++){
		var s = strokes[i];
		ctx.strokeStyle = s.color;
		ctx.lineWidth = s.size;
		ctx.beginPath();
		ctx.moveTo(s.points[0].x, s.points[0].y);
		for (var j = 0;j < s.points.length; j++) {
			var p = s.points[j];
			ctx.lineTo(p.x, p.y);
		}
		ctx.stroke();
}
}


function init(){
 	canvas = $('#draw');
 	canvas.attr({
 		width: window.innerWidth,
 		height: window.innerHeight,
 	});
 	ctx = canvas[0].getContext('2d');

 	function mouseEvent (e) {
 		brush.x = e.pageX;
 		brush.y = e.pageY;

 		currentStroke.points.push({
 			x: brush.x,
 			y: brush.y,
 		});

 		redraw();

 	}

 	canvas.mousedown(function (e) {
 		if (linemode == true){

 			currentStroke = {
	 			color: brush.color,
	 			size: brush.size,
	 			points:[],
	 		};
	 		strokes.push(currentStroke);

	 		brush.x = e.pageX;
	 		brush.y = e.pageY;

	 		currentStroke.points.push({
	 			x: brush.x,
	 			y: brush.y,
	 		});

	 		ctx.beginPath();
	 		ctx.moveTo(e.pageX, e.pageY);
	 		
 		} else {

	 		brush.down = true;

	 		currentStroke = {
	 			color: brush.color,
	 			size: brush.size,
	 			points:[],
	 		};
	 		strokes.push(currentStroke);
	 		mouseEvent(e);
 		}

 	}).mouseup(function (e) {
 		if (linemode == true){
 			ctx.lineTo(e.pageX, e.pageY);
 			ctx.stroke();

 			mouseEvent(e);
 		} else {
 			brush.down = false;

	 		mouseEvent(e);

			currentStroke = null;
		}
 	}).mousemove(function (e){
 		console.log('MOVE');
 		if (brush.down)
 			mouseEvent(e);
 	});


 	$('#save-btn').click(function (){
 		window.open(canvas[0].toDataURL());
 	});

 	$('#undo-btn').click(function (){
 		strokes.pop();
 		redraw();
 	});

 	$('#clear-btn').click(function (){
 		strokes = [];
 		redraw();
 	});

 	$('#colorpicker').on('input', function (){
 		brush.color = this.value;
 		
 	});

 	$('#brush-size').on('input', function (){
 		brush.size = this.value;
 	});

 	$('#eraser').click(function (){
 		brush.color = 'white'; 
 	});

 	$('#pencil').click(function () {
 		brush.color = $("#colorpicker").val();
 	});

 	$('#line').click(function () {

 		if(linemode == true)
 			linemode = false;
 		else
 			linemode = true;
 	});
}

 $(init);
