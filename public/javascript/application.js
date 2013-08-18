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
      this.size = 25;
      this.color = 0.0;
      this.life = 200;
      this.render = function() {
        if (this.life >= 0) {
          if( this.life <= 100) {
            context.fillStyle = this.color + this.life/100.0 + ")";
          } else {
            context.fillStyle = this.color + 1 + ")";
          }
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
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

    function randomSize() {
      return Math.floor((Math.random()*100)+1);
    }


    // setup canvas
    function resize() {
      canvas.width = $(window).width();
      canvas.height = $(window).height();
    }
    $(window).resize(resize);
    resize();
    

    // touch event handlers
    function initEvent(e) {
      //e.preventDefault(); e.stopPropagation();
      //console.log(e.type);
    }
    
    var skip = false;
    $canvas.hammer().bind('touchmove' , function(e) {
      initEvent(e);
      if (skip) {
        skip = false;
      } else {
        for(var i = 0; i < e.originalEvent.touches.length; i++) {
          var object = new Circle();
          object.x = e.originalEvent.touches[i].pageX;
          object.y = e.originalEvent.touches[i].pageY;
          if (i < 5) {
            object.color = randomColor();
          } else {
            object.color = "rgba(0,0,0,";
          }
          object.size = randomSize();
          objects.push(object);
        }
        skip = true;
      }
    });

    $canvas.hammer().on('doubletap' , function(e) {
      initEvent(e);
    });

    $canvas.on('dragup' , function(e) {
      initEvent(e);
    });

    $canvas.hammer().on('swipe' , function(e) {
      initEvent(e);
    });

    $canvas.hammer().on('pinchin' , function(e) {
      initEvent(e);
    });

    $canvas.on('rotate' , function(e) {
      initEvent(e);
    });


    // render all objects to canvas at max FPS
    function render() {
      context.clearRect(0,0,canvas.width,canvas.height);
      for (var i = 0; i < objects.length; i++) {
        objects[i].render();
      }
      if (objects[0] && objects[0].life <= 0) {
        objects.shift();
      }
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  });
}).call(this);