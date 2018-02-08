command: '',

refreshFrequency: '10m',

style: '\n\
  left: 0px;\n\
  top: 0px;\n\
  height: 100%;\n\
  width: 100%;\n\
  position: absolute;\n\
  div.bottomLayerContainer {\n\
    z-index: -10000;\n\
    position: absolute;\n\
    top: 0px;\n\
    left: 0px;\n\
    width: 100%;\n\
    height: 100%;\n\
    background-size: cover;\n\
  };\n\
  div.topLayerContainer {\n\
    z-index: -9999;\n\
    position: absolute;\n\
    top: 0px;\n\
    left: 0px;\n\
    width: 100%;\n\
    height: 100%;\n\
    background-size: cover;\n\
  }\n\
',

render: function(_) {
  return '<div class="bottomLayerContainer"></div><div class="topLayerContainer"></div>';
},

afterRender: function(domEl) {
  this.currIndex = -1;
},

update: function(output, domEl) {
  var images = [
    "sunrise.png",
    "day.png",
    "afternoon.png",
    "sunset.png",
    "dusk.png",
    "night.png",
    "twilight.png",
    "morning.png"
  ];
  var firstImageHour = 6;
  var imageDir = "hexagons";
  var anHour = 60 * 60 * 1000;
  var imageCount = images.length;
  var interval = 24 / imageCount;
  var intervalMS = interval * anHour;
  var offsetMS = firstImageHour * anHour;
  var time = new Date();
  var timestamp = time % (60000) + time.getHours() * anHour + time.getMinutes() * 60000;
  var index = (imageCount + Math.floor((new Date().getHours() - firstImageHour) / interval)) % imageCount;
  var opacity = (Math.abs(timestamp - offsetMS % intervalMS) % intervalMS) / intervalMS;

  var $domEl = $(domEl);
  var bottomLayer = new Image();
  var topLayer = new Image();
  // bottom layer
  bottomLayer.onload = function() {
    console.log(time + " bottom layer=" + bottomLayer.src);
    $domEl.find('.bottomLayerContainer').addClass('old');
    var $div = $('<div class="bottomLayerContainer" />');
    $div.css('background-image', 'url("' + bottomLayer.src + '")');;
	$div.css('display', 'none');
    $div.fadeIn('slow', function () {
      $domEl.find('.old').remove();
    });
    $domEl.append($div);
  };
  // top layer
  topLayer.onload = function() {
    console.log(time + " top layer=" + topLayer.src + " opacity=" + opacity);
    $domEl.find('.topLayerContainer').addClass('old');
    var $div = $('<div class="topLayerContainer" />');
    $div.css('background-image', 'url("' + topLayer.src + '")');
    $div.css('opacity', opacity);
	$div.css('display', 'none');
    $div.fadeIn(10, function () {
      $domEl.find('.old').remove();
    });
    $domEl.append($div);
  };
  topLayer.src = "teawallpaper.widget/" + imageDir + "/" + images[(index + 1) % imageCount];
  if (this.currIndex != index) {
    this.currIndex = index;
    bottomLayer.src = "teawallpaper.widget/" + imageDir + "/" + images[index];
  }
}

