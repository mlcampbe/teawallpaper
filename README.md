# Tea Wallpaper
A Ubersicht widget to display a wallpaper with colors that correspond to the time of the day. The widget cycles through 8 images and blends
them together seemlessly so that there is a smooth transition between the images every 3 hours over a 24 hour period.

# Install
Edit the teawallpaper.js and review/modify the following items:
1) The "firstHourImage" variable on line 50. This is the time of day that the first image in the "images" array will be displayed. By default this is 6am.
2) The "imageDir" variable on line 51. This is the subdirectory that holds the 8 images to cycle through. The default is "hexagons" but the widget also includes "solids", "triangles", and "trianglify" to try out as well.

# Customization
A new set of images can be created to cycle through by creating 8 images with the names "sunrise.png", "day.png", "afternoon.png",
"sunset.png", "dusk.png", "night.png", "twilight.png", "morning.png". The widget will transition between the images every 3 hours over a
24 hour day.

Take a look at the live geopattern generator at http://btmills.github.io/geopattern to get started with some ideas.

# Screenshot
The below gif shows the color as a complete 24-hour cycle
from 6am to 6am. When loaded the progression between colors is updated every 10 minutes so that the transition between 2 images is hardly noticable other than the color will gradually change.


![Screenshot](/teawallpaper.gif?raw=true)

The other included images are:

Solids ![Solids](/solids.png?raw=true)

Triangles ![Triangles](/triangles.png?raw=true)

Trianglify ![Trianglify](/trianglify.png?raw=true)


# Credits
This code is based upon the original source code for Tea-Time-Lapse by gruppler at https://gruppler.deviantart.com/art/Tea-Time-Lapse-99395260

The geometry SVG patterns are created with the geopattern background generator at https://github.com/btmills/geopattern which is a JavaScript port of http://jasonlong.github.io/geo_pattern.
