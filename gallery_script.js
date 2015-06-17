(function($) {

	$.fn.IdGallery = function(setOptions) {
		
		var options = {};
	
		if (typeof setOptions != 'object') {
			options.selectedColor = 'white';
			options.notSelected = 'bisque';
			options.scrollDelay = 500;
			options.commentsSource = null;
		} else {
			if (typeof setOptions.selectedColor === 'string') {
				options.selectedColor = setOptions.selectedColor;
			} else {
				options.selectedColor = 'white';
			}
			if (typeof setOptions.notSelected === 'string') {
				options.notSelected = setOptions.notSelected;
			} else {
				options.notSelected = 'bisque';
			}
			if (typeof setOptions.scrollDelay === 'number') {
				options.scrollDelay = setOptions.scrollDelay;
			} else {
				options.scrollDelay = 500;
			}
			if (typeof setOptions.commentsSource === 'string') {
				options.commentsSource = setOptions.commentsSource;
			} else {
				options.commentsSource = null;
			}
			passedParams = Object.keys(setOptions);
			for (optionKey of passedParams) {
				if ((optionKey != "selectedColor") && (optionKey != "notSelected") && (optionKey != "scrollDelay") && (optionKey != "commentsSource")) {
					console.log("GalleryScript has encountered a nonfatal error. " + optionKey + " is not a valid option. Please consult the documentation for the gallery application for valid configuration options.");
				}
			}
		}
	
		var pointer = 1;
		var totalPics;
		var totalScroll = 0;
		var maxScroll = 0;
		
		function commentDisplay() {
			$('#commentsArea').html('');
			var requestURL = options.commentsSource + '?id=' + $('#'+pointer).attr('src');;
			$.getJSON(requestURL,function(data) {
				var commentArray = [];
				commentArray = data.concat();
				if (commentArray.length == 0) {
					$('#commentsArea').html('<h3 class="alert alert-info text-center">No Comments Available</h3>');
				}
				else {
					for (i=0;i<commentArray.length;i++) {
						var newComment = "<div class='list-group-item'><b>Comment #" + (i+1).toString() + ':</b> ' + commentArray[i].photoComment + "</div>";
						$('#commentsArea').append(newComment);
					}
				}
			});	
		};		
			
		$('.galleryIDPhoto').append("<div class='container-fluid imageContainer'></div><div id='galleryContainer' style='height: 100px; border-width: 1px; width: 95%; border-style: solid; border-color:" + options.notSelected + "; border-radius: 5px; margin-right: auto; margin-left: auto; overflow: hidden;' class='shadow-normal'>");
		$('.imageContainer').append("<div class='text-center thumbnail'><img id='galleryPic' src='' alt='Gallery Picture' class='img-responsive shadow-normal' style='max-height: 600px;'><div class='caption'></div></div><ul class='pager'><li class='previous'><a role='button' class='shadow-normal'>Previous</a></li><li class='next'><a role='button' class='shadow-normal' style='cursor: pointer;'>Next</a></li></ul>");
		$('#galleryContainer').append("<div id='selectorContainer' style='overflow: visible;'><div id='picSelector' style='position: relative; white-space: nowrap;'></div></div></div>");
		if (options.commentsSource) {
			$('.galleryIDPhoto').append("<div id='commentsArea' style='margin-top: 10px;' class='list-group'></div>");
		}

		
		$(this).children("a").each(function( index ) {
			$(this).attr('id',index + 1);
			$('#picSelector').append("<img src='" + $(this).attr('href') + "' id='" + $(this).attr('id') + "' class='img-rounded img-responsive img-thumbnail' alt='Gallery Image' style='height: 80px; margin: 3px; display: inline; background-color: " + options.notSelected + ";'>");
		});
		
		$('#GalleryArea').css('display','block');
		$('#loadingMessage').css('display','none');
		totalPics = $('#picSelector > img:last').attr('id');
		var imgSrc = $('#1').attr('src');
		var imgCaption = "Picture 1" + " of " + totalPics.toString();
		$('#galleryPic').attr("src",imgSrc);
		$('#image_name').val($('#galleryPic').attr("src"));
		$('.caption').text(imgCaption);
		$('#1').css({'box-shadow':'5px 5px 2px #888888','background-color':options.selectedColor,'height':'84px'});
		$('.previous').addClass('disabled');
		$('.previous').css('cursor','not-allowed');
		if (options.commentsSource) { commentDisplay(); }
		
		previous = '.previous > a';
		next = '.next > a';
		thumbImages = '#picSelector > img';
		
		$(previous).click(function() {
			if (pointer > 1) {
				$('#galleryPic').fadeOut('slow', function () {
					var prevSelectedImgID = "#" + pointer.toString();
					$(prevSelectedImgID).css({'box-shadow':'none','background-color':options.notSelected});
					pointer = pointer - 1;
					if ($('.next').hasClass('disabled')) {
						$('.next').removeClass('disabled');
						$('.next').css('cursor','pointer');
					}
					if (pointer == 1) {
						$('.previous').addClass('disabled');
						$('.previous').css('cursor','not-allowed');
					}	
					else $('.previous').removeClass('disabled');
					var selectedImg = "#" + pointer.toString();
					var imgSrc = $(selectedImg).attr('src');
					$('#galleryPic').attr("src",imgSrc);
					$('#image_name').val($('#galleryPic').attr("src"));
					var imgCaption = "Picture " + pointer.toString() + " of " + totalPics.toString();
					$('.caption').text(imgCaption);
					$('#galleryPic').fadeIn('slow');
					$(selectedImg).css({'box-shadow':'5px 5px 2px #888888','background-color':options.selectedColor})
					var scrollAmount = $(prevSelectedImgID).position().left - $(selectedImg).position().left;
					var tempScrollTotal = totalScroll + scrollAmount;
					if (tempScrollTotal <= 0) {
						$('#picSelector').animate({left: '+=' + scrollAmount.toString()},options.scrollDelay);
						totalScroll = tempScrollTotal;
					}
					if (options.commentsSource) { commentDisplay(); }
				});
			}
		});

		$(next).click(function() {
			if (pointer < totalPics)
			{
				$('#galleryPic').fadeOut('slow', function () {
					var prevSelectedImgID = "#" + pointer.toString();
					$(prevSelectedImgID).css({'box-shadow':'none','background-color':options.notSelected});
					pointer = pointer + 1;
					if (pointer == totalPics) {
						$('.next').addClass('disabled');
						$('.next').css('cursor','not-allowed');
					}
					if ($('.previous').hasClass('disabled')) {
						$('.previous').removeClass('disabled');
						$('.previous').css('cursor','pointer');
					}
					var selectedImg = "#" + pointer.toString();
					var imgSrc = $(selectedImg).attr('src');
					$('#galleryPic').attr("src",imgSrc);
					$('#image_name').val($('#galleryPic').attr("src"));
					var imgCaption = "Picture " + pointer.toString() + " of " + totalPics.toString();
					$('.caption').text(imgCaption);
					$('#galleryPic').fadeIn('slow');
					$(selectedImg).css({'box-shadow':'5px 5px 2px #888888','background-color':options.selectedColor})
					var scrollAmount = $(prevSelectedImgID).position().left - $(selectedImg).position().left;
					var tempScrollTotal = totalScroll + scrollAmount;
					$('#picSelector').animate({left: '+=' + scrollAmount.toString()},options.scrollDelay);
					totalScroll = tempScrollTotal;
					if (options.commentsSource) { commentDisplay(); }
				});
			}
		});	
		
		$(thumbImages).click(function() {
			selectedImg = this;
			$('#galleryPic').fadeOut('slow', function() {
				var prevSelectedImgID = "#" + pointer.toString();
				$(prevSelectedImgID).css({'box-shadow':'none','background-color':options.notSelected});
				var currentPicNum = $(selectedImg).attr("id");
				currentPicNum = parseInt(currentPicNum);
				pointer = currentPicNum;
				if ($('.next').hasClass('disabled')) {
					$('.next').removeClass('disabled');
					$(next).css('cursor','pointer');
				}
				if ($('.previous').hasClass('disabled')) {
					$('.previous').removeClass('disabled');
					$(previous).css('cursor','pointer');
				}
				if (pointer == 1) {
					$('.previous').addClass('disabled');
					$(previous).css('cursor','not-allowed');
				}	
				if (pointer == totalPics) {
					$('.next').addClass('disabled');
					$(next).css('cursor','not-allowed');
				}
				var newSrc = $(selectedImg).attr("src");
				$('#galleryPic').attr("src",newSrc);
				$('#image_name').val($('#galleryPic').attr("src"));
				var imgCaption = "Picture " + pointer.toString() + " of " + totalPics.toString();
				$('.caption').text(imgCaption);
				$('#galleryPic').fadeIn('slow');
				$(selectedImg).css({'box-shadow':'5px 5px 2px #888888','background-color':options.selectedColor})
				if (options.commentsSource) { commentDisplay(); }
			});
		});	
		
		
		return this;
	
	}	
}(jQuery));		
