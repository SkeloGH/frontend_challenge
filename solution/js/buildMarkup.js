var galItem = {
	
	init: function(data, template, node){
		this.node = node;
		this.container = node.find('.galleries-container');
		var textBuffer = "";

		// build buffer
		$.each(data, function(i, gallery){
			var galleryItems = "";
			
			$.each(gallery.images, function(i, image){
				galleryItems += '<li><img src="img/'+image+'"></li>'
			});

			//buffer brings gallery names and thumbnail images
			textBuffer += template.replace("{{name}}", gallery.name)
								  .replace("{{album_thumb}}", gallery.album_thumb)
								  .replace("{{gallery_items}}", galleryItems);
		});

		//fill the gallery
		this.container.html(textBuffer);
		this.thumbWidth = this.container.children(':eq(0)').width();
		console.log(this.thumbWidth);

		this.binding();
	},

	binding: function(){
		var that = this;
		this.leftArrow = this.node.find('.leftArrow');
		this.rightArrow = this.node.find('.rightArrow');
		$('.leftArrow.active').live('click',function(){
			$(this).removeClass('active');
			var newLeft = parseInt(that.container.css('left'))-that.thumbWidth;
			that.container.animate({left:newLeft},function(){
				that.leftArrow.addClass('active');
			});
		});

		console.log(this.rightArrow);
	}
}




$(document).ready(function(){
 	galItem.init(incomingData, $(".liTemp").text(), $("#gallery"));


});