/*
 *
 *  Hi there, have a look at my source files here:
 *  https://github.com/stefanRitter/
 *
 */
var gEvents = [ "tap",
                "doubletap",
                "dragup", "dragdown", "dragleft", "dragright",
                "swipe", "swipeup", "swipedown", "swipeleft", "swiperight",
                "rotate",
                "pinchin", "pinchout"
              ];
(function() {
  jQuery(function($) {
    
    var canvas = $('canvas');

    canvas.hammer().on('tap' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>tap</p>');
    });

    canvas.hammer().on('doubletap' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>doubletap</p>');
    });

    canvas.on('dragup' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>dragup</p>');
    });

    canvas.hammer().on('swipe' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>swipe</p>');
    });

    canvas.hammer().on('pinchin' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>pinchin</p>');
    });

    canvas.on('rotate' , function(e) {
      e.preventDefault(); e.stopPropagation();
      $('.events').prepend('<p>rotate</p>');
    });
  });
}).call(this);