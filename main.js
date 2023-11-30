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


 


})(jQuery);