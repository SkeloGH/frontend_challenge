var galItem = {
	
	init: function(data, template, node, lightbox){
		this.node = node;
		this.lightbox = lightbox;
		var textBuffer = "";

		/* re-arrange the items to show the first on the list*/
		data.unshift(data[data.length-1]);
		data.pop()

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
		this.node.find('.galleries-container').html(textBuffer);
		this.lightbox.find('.galleries-container').html(textBuffer);
		

		this.binding();
	},

	binding: function(){

		var that = this;

		$('.rightArrow.active, .lb-rightArrow.active, .goRight.active').live('click',function(){
			 that.scroll(this, $(this).parent().find("ul"), "r");
		});
		$('.leftArrow.active, .lb-leftArrow.active, .goLeft.active').live('click',function(){
			 that.scroll(this, $(this).parent().find("ul"), "l");
		});

		this.node.find(".gal-thumb").click(function(){
			console.log($(this).css("background-image"));
			that.lightbox.fadeIn();

		});



		// console.log(this.rightArrow);
	},

	scroll: function(context, container, direction){
		
		var oldLeft = container.css('left');
		var thumbWidth = container.children().outerWidth(true);
		var direction = direction === "l" ? -1 : 1;
		console.log(direction);

		var newPos = (parseInt(container.css('left'))+(thumbWidth*direction));
		console.log(newPos);

		container.animate({left: newPos},function(){
			container = $(this);

			if (direction === 1) {
				container.children(':last').prependTo(container);
			}else{
				container.children(':first').appendTo(container);
			}

			container.css('left',oldLeft);				
			$(context).addClass('active');
		});
	}

}




$(document).ready(function(){
 	galItem.init(incomingData, $(".liTemp").text(), $("#gallery"), $("#lightbox"));
});