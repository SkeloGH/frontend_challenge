// fills the markup and controls the lightbox gallery
var galItem = {
	/*	when this method is ised, it will fill the template and start the
		slider engine, parameters are:
	  	         from,   to,   container, lightbox */
	init: function(data, template, node, lightbox){
		// give some context references
		this.node = node;
		this.lightbox = lightbox;
		/* re-arrange each gallery -NODE- to be the first on the 
		   galleries list, because of the container´s css position */
		// copy last item to the first position
		data.unshift(data[data.length-1]);
		// take out the first copied item
		data.pop();

		/* re-arrange each gallery -ITEM- to be the first on the 
		   items list, because of the container´s css position */
		$.each(data, function(i, gallery){
			// says images equals to the "images" index on incomingData
			var images = gallery.images;
			// copy last item to the first position
			images.unshift(images[images.length-1]);
			// take out the first copied item
			images.pop();
		});

		// declare the var outside for further use, right before receiving data
		var textBuffer = "";

		// explore the main data nodes
		$.each(data, function(i, gallery){
			// receives the results of the function below
			var galleryItems = "";
			/* explore each "images" sub-node (gallery.tems) and appends the 
			   file name of each of the items (image) to the list item areray (</>) */
			$.each(gallery.images, function(i, image){
				// increments so it doesn't overwrite the var value each time the function runs
				galleryItems += '<li><img src="img/'+image+'"></li>'
			});

			// fill textBuffer with the information received each time thu function runs
			textBuffer += template.replace("{{name}}", gallery.name)
								  .replace("{{album_thumb}}", gallery.album_thumb)
								  .replace("{{gallery_items}}", galleryItems);
		});

		//write the output to both main and lightbox containers
		this.node.find('.galleries-container').html(textBuffer);
		this.lightbox.find('.galleries-container').html(textBuffer);
		
		// use the "bring" method that's living on our context and not inside this function
		this.binding();

	},
	// Scrolling parameters, ligthbox display engine and behaviors connection
	binding: function(){
	/* since we're going to use data from incomingData, 
		we'll find a short name to call it inside a function */
		var that = this;

		/* EVENT HANDLER for scrollers */
		// make an event listener, and for when the following selectors are clicked
		$('.rightArrow.active, .lb-rightArrow.active, .goRight.active').live('click',function(){
			// pass the following information to the SCROLLING ENGINE
			// selector.method(context, container, direction));
			that.scroll(this, $(this).parent().find(".galleries-container"), "r");
		});
		// for the the below selectors                                         event   function
		$('.leftArrow.active, .lb-leftArrow.active, .goLeft.active').live('click',function(){
			// pass the following information to the SCROLLING ENGINE
			// selector.method(context, container, direction));
			that.scroll(this, $(this).parent().find(".galleries-container"), "l");
		});

		/* lightbox display engine and template filler */
		// start the lightbox and fill the stage with the selected image set
		this.node.find(".gal-thumb").click(function(){
			// fill "images" var with the current image set, taken from the current gallery
			var images = $(this).find("ul li");
			// Make the lightbox appear,
			that.lightbox.fadeIn()
						// find where is going to place the images,
						 .find("#stage ul")
						 // fill the stage with them.
						 .html(images.clone());			
		});
		// lightbox is active
		// now do the same while lightbox is active, when clicking an item:
		this.lightbox.find(".gal-thumb").click(function(){
			// Take its children items, which is the images set
			var images = $(this).find("ul li");
			// find where to put the new set of images
			that.lightbox.find("#stage ul")
						 // fill the stage with them with a fade effect.
						 .html(images.clone().fadeIn());	
		});
		// each time you click outside the lightbox, it'll dissapear
		$(".close").click(function(){
			$("#lightbox").fadeOut();
		});
	},
	/* SCROLLING ENGINE, receives values from: -EVENT HANDLER for scroller */
	scroll: function(context, container, direction){
		// remove binding from button to prevent multiple clicks that break the flow
		$(context).removeClass('active');
		// take the container's initial position value
		var oldLeft = container.css('left');
		// take the thumbnail's total width
		var thumbWidth = container.children().outerWidth(true);
		// compare if the "direction" parameter received is left ("l")
		// used later to know wich way to go
		//              variablename=(condition)?value1:value2 
		var direction = direction === "l" ? -1 : 1;
		// do some math to calculate displacement amount
		var newPos = (parseInt(container.css('left'))+(thumbWidth*direction));
		// -Animation setup
		container.animate({left: newPos},function(){
			// just to not get confused
			var container = $(this);
			// if the comparison is true
			if (direction === 1) {
				// take the last children to the begining
				container.children(':last').prependTo(container);
			}else{
				// take the first children to the end
				container.children(':first').appendTo(container);
			}
			// then reset the container's original position
			$(this).css('left',oldLeft);
			// and re-assign the active state
			$(context).addClass('active');
		});
	}
}




$(document).ready(function(){
	//             data,          template,           node,         lightbox
 	galItem.init(incomingData, $(".liTemp").text(), $("#gallery"), $("#lightbox"));
});