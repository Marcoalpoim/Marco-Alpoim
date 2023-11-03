var bringCardToFront;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

(function($) {

   /* workaround for jquery ui draggable inabilty to bring to front clicked elements */
   bringCardToFront = function(clickedCard){
      var highestDraggableZIndex = 0;
      $('.draggable-item').each(function(index) {
         var thisElemZIndex = $(this).zIndex();
         if(thisElemZIndex > highestDraggableZIndex){
            highestDraggableZIndex = thisElemZIndex;
         }
      });

      $(clickedCard).css( "z-index", highestDraggableZIndex + 1);
   };

   var randomiseDraggablesPositionAndSize = function(element){
      var windowHeight = $.windowHeight();
      var fullContainerScrollHeight = $('.full-container')[0].scrollHeight;

      var windowWidth = $(window).innerWidth();

      var randomElementWidth = 250 + (Math.floor(Math.random() * 50));
      var elementWidth = element.attr('data-card-width') || randomElementWidth;
      element.width(elementWidth);
      var elementHeight = element.outerHeight();
      var infoHeight = $('#info').height() + 35; /* adds up the padding */
      var availableWidth = windowWidth - elementWidth;
      var availableHeight = fullContainerScrollHeight - infoHeight - elementHeight;
      var leftPosition = (Math.floor(Math.random() * (availableWidth) ));
      var topPosition = (Math.floor(Math.random() * (availableHeight) ));


      element.css({
         'top': topPosition + infoHeight,
         'left': leftPosition
      });

      /* restore centered position */
      $(".contact-card").css({
         'top': '50%',
         'left': '50%',
      });

      setTimeout(function() {
         element.removeClass('random-card-loading');            
      }, 0);

   };


   var randomiseDraggables = function() {
       var parent = $("#full-container");
       var draggableElements = $('.draggable-random-card');
       var draggableElementsNum = $('.draggable-random-card').length;
       var firstRandomElementIndex;
       var secondRandomElementIndex;
       var pickedElementIndexesArray = [];


       for(var i=0; i < draggableElementsNum; i++){
          pickedElementIndexesArray.push(i);
       }

       if(pickedElementIndexesArray.length > 2){
         shuffle(pickedElementIndexesArray);
       }

       if(pickedElementIndexesArray.length > 0){
         firstRandomElementIndex = pickedElementIndexesArray[0];
       }

       if(pickedElementIndexesArray.length > 1){
         secondRandomElementIndex = pickedElementIndexesArray[1];
       }

       draggableElements.hide();

      /* pick the first N random draggable elements */
      var draggableImagesQuantity;
      if($('body').hasClass('page-template-about-page')){
         /* is about page */
         draggableImagesQuantity = aboutPageDraggableImagesQuantity;
      } else {
         /* is home page */
         draggableImagesQuantity = homePageDraggableImagesQuantity;            
      }

       shuffle(draggableElements).slice(0, draggableImagesQuantity).each(function(index) {
         randomiseDraggablesPositionAndSize($(this));
         $(this).show();            
      });
   };


   var onPageLoadActions = function(){         
      $('#full-container').imagesLoaded( {
        // options...
        },
        function() {
          // images have loaded
         randomiseDraggables();
        }
      );
   };
   onPageLoadActions();

   var resizeActions = function(){

      var windowHeight = $.windowHeight();

      var draggableRandomCard = $('.draggable-random-card');

       draggableRandomCard.each(function(index) {
          randomiseDraggablesPositionAndSize($(this));            
       });            

       $( ".draggable-item" ).height('auto');

       $( ".draggable-item" ).draggable({
          containment: "document",
          stack: ".draggable-random-card"
       });

   };
   resizeActions();

   // $(window).resize(resizeActions);

})(jQuery);