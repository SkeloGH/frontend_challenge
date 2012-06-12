var galItem = {
	
	init: function(data, template, container){
		
		var textBuffer = "";

		// build buffer
		$.each(data, function(i, gallery){
			//buffer brings gallery names and thumbnail images
			textBuffer += template.replace("{{name}}", gallery.name)
								  .replace("{{album_thumb}}", gallery.album_thumb);
		});

		//fill the gallery
		container.html(textBuffer);
		console.log(textBuffer);
	}
}




$(document).ready(function(){
 	galItem.init(incomingData, $(".liTemp").text(), $(".galleries-container"));


});