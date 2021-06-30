// Custom Canvas function
function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
          	}
          	else {
			line = testLine;
          	}
        }
        context.fillText(line.trim(), x, y);
	return y
      }

function drawCenteredImage(ctx, img, x, y, width, height)  {
	ctx.drawImage(img, x - 0.5 * width, y - 0.5 * height, width, height)
}

var colorOne = "blue"
var colorTwo = "green"

function saveImage(imageID) {
      download = document.getElementById(imageID).src
}

function loadSocialCanvasBackground(colorOne, colorTwo, backgroundImgId) {
      if (colorTwo !== undefined) {
            console.log(backgroundImgId)
            loadSocialCanvas(colorOne, colorTwo, backgroundImgId);

      }
      else {
            loadSocialCanvas(colorOne, colorOne, backgroundImgId)
      }

}

function loadSocialCanvas(colorOne, colorTwo, backgroundImgId) {
	c = document.getElementById("socialCanvas");
	ctx = c.getContext("2d");
	width = c.width;
	height = c.height;

	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowColor = "rgba(0,0,0,0.3)"

	midpointX = width * 0.5;
	midpointY = height * 0.5;
	ctx.textAlign = "center";

	// Create gradient
	var grd = ctx.createLinearGradient(0, 0, width, height);
	grd.addColorStop(0, colorOne);
	grd.addColorStop(1, colorTwo);

	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, width, height);

	if (backgroundImgId !== undefined) {
		backgroundImg = document.getElementById(backgroundImgId);
		ctx.drawImage(backgroundImg, 0, 0, width, height);
	}

	nowPlaying = $(".joan-now-playing h3").html()
	time = $(".joan-now-playing").children().eq(1).html();
	nowPlayingImg = document.getElementsByClassName("joan-image-thumbnail")[0]

	if (nowPlaying == undefined) {
		nowPlaying = "Dartmouth Radio"
		time = "live 24-7";
	}

	if (nowPlayingImg == undefined) {
		nowPlayingImg = document.getElementById("default");
	}

	ctx.shadowBlur = 6;
	ctx.fillStyle = "#ffffff";
	textY = midpointY + 420;
	ctx.font = "bold 55px Roboto Mono";
	playingY = wrapText(ctx, nowPlaying.trim(), midpointX, textY, width * 0.9, 60);

	ctx.font = "40px Roboto Mono";
	ctx.fillText(time, midpointX, playingY + 60);

	ctx.shadowColor = "rgba(0,0,0,0.3)"	
	ctx.shadowBlur = 20;
	drawCenteredImage(ctx, nowPlayingImg, midpointX, midpointY - 100, width * 0.8, width * 0.8);

	ctx.shadowBlur = 10;
	logoImg = document.getElementById("logo");
	drawCenteredImage(ctx, logoImg, midpointX, 300, 200, 200)

      	var dataURL = c.toDataURL();
      	document.getElementById('socialCanvasImg').src = dataURL;
}
