/*
 *
 *  Hi there, have a look at my source files here:
 *  https://github.com/stefanRitter/
 *
 */

(function() {
  jQuery(function($) {
    
    var events = [
                  "tap",
                  "doubletap",
                  "dragup", "dragdown", "dragleft", "dragright",
                  "swipe", "swipeup", "swipedown", "swipeleft", "swiperight",
                  "rotate",
                  "pinchin", "pinchout"
                 ],
        canvas = $('canvas');

    for (var i = 0; i < events.length; i++) {
      canvas.hammer().on( events[i] , function(e) {
        e.preventDefault(); e.stopPropagation();
        $('.events').text(events[i]);
      });
    }
  });
}).call(this);