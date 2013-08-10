/*
 *
 *  Hi there, have a look at my source files here:
 *  https://github.com/stefanRitter/
 *
 */


// global Hammer.js touch events
var gEvents = [ "tap", "hold",
                "doubletap",
                "dragup", "dragdown", "dragleft", "dragright",
                "swipe", "swipeup", "swipedown", "swipeleft", "swiperight",
                "rotate",
                "pinchin", "pinchout"
              ];


(function() {
  jQuery(function($) {
    
    var canvas = document.getElementsByTagName('canvas')[0],
        $canvas = $('canvas'),
        context = canvas.getContext('2d'),
        objects = [];
        
    function Circle() {
      this.x = 0;
      this.y = 0;
      this.color = 0.0;
      this.life = 100;
      this.render = function() {
        if (this.life >= 0) {
          if( this.life <= 50) {
            context.fillStyle = this.color + this.life/50.0 + ")";
          } else {
            context.fillStyle = this.color + 1 + ")";
          }
          context.beginPath();
          context.arc(this.x, this.y, 25, 0, Math.PI*2, true);
          context.closePath();
          context.fill();
          this.life--;
        }
      };
    }
    

    function randomColor() {
      var r = Math.floor((Math.random()*255)+1),
          g = Math.floor((Math.random()*50)+1),
          b = Math.floor((Math.random()*100)+1);
      return "rgba(" + r + "," + g + "," + b + ",";
    }


    // setup canvas
    canvas.width = document.width;
    canvas.height = document.height;
    

    // touch event handlers
    function initEvent(e) {
      e.preventDefault(); e.stopPropagation();
      //$('.events').prepend('<p>doubletap</p>');
    }
    $canvas.hammer().on('drag' , function(e) {
      initEvent(e);
      var object = new Circle();
      object.x = e.gesture.center.pageX-25;
      object.y = e.gesture.center.pageY-25;
      object.color = randomColor();
      objects.push(object);
    });

    $canvas.hammer().on('doubletap' , function(e) {
      initEvent(e);
    });

    canvas.on('dragup' , function(e) {
      initEvent(e);
    });

    canvas.hammer().on('swipe' , function(e) {
      initEvent(e);
    });

    canvas.hammer().on('pinchin' , function(e) {
      initEvent(e);
    });

    canvas.on('rotate' , function(e) {
      initEvent(e);
    });




    function render() {
      context.clearRect(0,0,canvas.width,canvas.height);
      for (var i = 0; i < objects.length; i++) {
        objects[i].render();
      }
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  });
}).call(this);