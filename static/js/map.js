$(document).ready(function(){

	var levelNum = 0;
	var levelCanvasNum = new Array(0,0,0); // 
	var displayRatio = new Array([1,1],[0.7,0.3],[0.6,0.2],[0.55,0.15],[0.6,0.1]);

	var curLevel = 0;
	var curIndex = 0;
	var centerHeight = 0.6;
	var winwidth=window.innerWidth;
	var winheight=window.innerHeight;

	init();

	function init(){
		newCanvas(0);

	}
/*
	$(".canvas").live('dblclick', function() {
		var temp = $(this).parent().attr("id").split("-");
		if( ++temp[1] > 2 )
			showTip("Sorry, no more than three levels ");
		else if(levelCanvasNum[temp[1]]== 5) //maximum 5 canvas per level
			showTip("Sorry, no more than five children per level ");
		else
			newCanvas(temp[1]);
	});
	*/
	/*
	$(".canvas").live('click', function(e) {
		var temp = $(this).parent().attr("id").split("-");
		console.log(e.pageX, e.pageY);
		toggleZoomCanvas(temp[1],temp[2]);
	});
/*
	$(".canvas").click(function(){

		var temp = $(this).parent().attr("id").split("-");
		console.log(temp[1]);
		newCanvas(++temp[1]);
	});*/
	var zoomedNum = 0;
	var zoomedSizeBig = 60;
	var zoomedSizeSmall = 20;
	var scaledSizeBig=0.6;
	var scaledSizeSmall=0.2;
	function toggleZoomCanvas(level, index){
		if($("#level-"+level+" #level-"+level+"-"+index+".canvasBox").hasClass("bigger")){
			// already bigger, be smaller!
			$("#level-"+level+" #level-"+level+"-"+index+".canvasBox").removeClass("bigger");
			zoomedNum --;
			
			resetStyle();
		}
		else{
			// make it bigger
			$("#level-"+level+" .canvasBox").removeClass("bigger");
			$("#level-"+level+" #level-"+level+"-"+index+".canvasBox").addClass("bigger");
			zoomedNum ++;

			if(levelCanvasNum[level] == 2 && levelNum == 2 ){
				zoomedSizeBig = 80;
				zoomedSizeSmall = 20;
				 scaledSizeBig=0.8;
				 scaledSizeSmall=0.2;
			}
			else if(levelCanvasNum[level] == 4){
				zoomedSizeBig = 40;
				zoomedSizeSmall = 20;
				scaledSizeBig=0.4;
				 scaledSizeSmall=0.2;
			}
			else if(levelCanvasNum[level] == 5){
				zoomedSizeBig = 40;
				zoomedSizeSmall = 15;
				scaledSizeBig=0.4;
				scaledSizeSmall= 0.15;
			}
			else{
				zoomedSizeBig = 60;
				zoomedSizeSmall = 20;
				scaledSizeBig=0.6;
				scaledSizeSmall=0.2;
			}

			for(var i = 0; i< levelNum; i++){
				if (i == level || $("#level-"+i).children().hasClass("bigger")) {
					$("#level-"+i).css("height", zoomedSizeBig + "%");
				}
				else
					$("#level-"+i).css("height", zoomedSizeSmall + "%");
			}
			//$(".canvasBox").css("zoom", zoomedSizeSmall+"%");
			//$(".bigger").css("zoom", zoomedSizeBig+"%");

		}
	}


	function newCanvas(level){

		// google map 
		var mapOptions = {
			scrollwheel: false,
		    mapTypeControl: false,
		    scaleControl: false,
			center: new google.maps.LatLng(40,-30),
			zoom: 3,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		
		var tempHTML; // html of a new level
		curLevel = level;
	
		levelCanvasNum[level] ++; // canvas numbers for each level from 1, 2, 3, 4, 5. 

		curIndex = levelCanvasNum[level]-1; // index from 0, 1, 2, ...

		if(levelCanvasNum[level] == 1){ // create a new level
			
			tempHTML = "<div id='level-"+curLevel+"' class='clear levelBox'></div>\
				          	<div id='level-"+curLevel+"-"+curIndex+"' class='canvasBox' style='width:"+(winwidth-12)+"px;height:"+(winheight-12)+"px'>\
				            	<div class='canvas' id='map-"+curLevel+"-"+curIndex+"' ></div>\
				          	</div>"
			$("#page-2").append(tempHTML);
			levelNum ++;
		}
		else{ // add a new canvas to an existed level

			tempHTML = "<div id='level-"+curLevel+"-"+curIndex+"' class='canvasBox' style='width:"+(winwidth-12)+"px;height:"+(winheight-12)+"px'>\
				            <div class='canvas' id='map-"+curLevel+"-"+curIndex+"' ></div>\
				        </div>"
			$("#level-"+curLevel).after(tempHTML);

		}

/*
		if(levelCanvasNum[level] == 1){ // create a new level
			
			tempHTML = "<div id='level-"+curLevel+"' class='levelBox'>\
				          	<div id='level-"+curLevel+"-"+curIndex+"' class='canvasBox' style='width:"+(winwidth-12)+"px;height:"+(winheight-12)+"px'>\
				            	<div class='canvas' id='map-"+curLevel+"-"+curIndex+"' ></div>\
				          	</div>\
				        </div>"
			$("#page-2").append(tempHTML);
			levelNum ++;
		}
		else{ // add a new canvas to an existed level

			tempHTML = "<div id='level-"+curLevel+"-"+curIndex+"' class='canvasBox' style='width:"+(winwidth-12)+"px;height:"+(winheight-12)+"px'>\
				            <div class='canvas' id='map-"+curLevel+"-"+curIndex+"' ></div>\
				        </div>"
			$("#level-"+curLevel).append(tempHTML);

		}
*/
		// create a google map object
		var map = new google.maps.Map(document.getElementById("map-"+curLevel+"-"+curIndex),
			mapOptions);


		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.Rectangle,
			drawingControl: false,
			drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: [
				google.maps.drawing.OverlayType.RECTANGLE
			]},
		});
		if(curLevel == 0){
			drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
			drawingManager.setMap(map);	
		}
		


		// draw a rectangle and create a new map
		google.maps.event.addListener(drawingManager, 'rectanglecomplete', function() {
    	/*
			$("#map_outer").animate({ 
				height: "80%",
				width: "90%",
				left: "5%"
			});
		     	 
			$("body").append('<div id="map_outer_test" style="left: 400px; top: 540px;width:20%; border-width: 5px;  border-color:#ff9900;  border-style:solid;height:20%; position: absolute"><div id="map_new_canvas" style="width:100%; height:100%"></div></div>')
				var map = new google.maps.Map(document.getElementById("map_new_canvas"),
				mapOptions);
*/

			var temp = drawingManager.getMap().getDiv().id.split("-");
			if( ++temp[1] > 2 )
				showTip("Sorry, no more than three levels ");
			else if(levelCanvasNum[temp[1]]== 5) //maximum 5 canvas per level
				showTip("Sorry, no more than five children per level ");
			else
			newCanvas(temp[1]);
			
	  	});

		resetStyle();

	}

	function resetStyle(){

		var defaultHeight = 100/levelNum; 
		var levelHeight = new Array(0,0,0); 
        var transform = [];
		for(var i = levelNum - 1; i > 0; i--){
			levelHeight[i] = 100/levelCanvasNum[i];
 
			if(levelHeight[i]>defaultHeight){
				levelHeight[i] = defaultHeight;
			}

			//$("#level-"+i).css("height", levelHeight[i] + "%");

			for(var j = 0; j<levelCanvasNum[i]; j++){
                transform = ['scale(' + levelHeight[i]/100 + ')'];
				$("#level-"+i+"-"+j+".canvasBox").css('-moz-transform', transform.join(' '));
				//$("#level-"+i+"-"+j+".canvasBox").css("zoom", levelHeight[i]+"%");
			
				{$("#map-"+i+"-"+j).css("zoom", "100%");}
/*
				$("#level-"+i+"-"+j+".canvasBox").css("height", levelHeight[i]+"%");
				$("#level-"+i+"-"+j+".canvasBox").css("width", levelHeight[i]+"%");
				*/
			}

		}
		// for level 0
		levelHeight[0] = 100 - levelHeight[1] - levelHeight[2];
		//$("#level-0").css("height", levelHeight[0] + "%");
		transform = ['scale(' + levelHeight[0]+ ')'];
		$("#level-0-0.canvasBox").css('-moz-transform', transform.join(' '));
		//$("#level-0-0.canvasBox").css("zoom", levelHeight[0]+"%");
/*
		$("#level-0-0.canvasBox").css("height", levelHeight[0]+"%");
		$("#level-0-0.canvasBox").css("width", levelHeight[0]+"%");
*/

	}

	function showTip(tip){


	}

});