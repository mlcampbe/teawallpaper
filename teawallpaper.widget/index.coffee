debug = 0

command: ''

refreshFrequency: '10m'

style: """
  left: 0px
  top: 0px
  height: 100%
  width: 100%
  position: absolute
  div.bottomLayerContainer
    z-index: -10000
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background-size: cover
  div.topLayerContainer
    z-index: -9999
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background-size: cover
"""

render: -> """
  <div class="bottomLayerContainer"></div><div class="topLayerContainer"></div>
"""

afterRender: (domEl) ->
  @currIndex = -1

update: (output, domEl) ->
  images = [
    'sunrise.png'
    'day.png'
    'afternoon.png'
    'sunset.png'
    'dusk.png'
    'night.png'
    'twilight.png'
    'morning.png'
  ]
  firstImageHour = 6
  imageDir = 'hexagons'
  anHour = 60 * 60 * 1000
  imageCount = images.length
  interval = 24 / imageCount
  intervalMS = interval * anHour
  offsetMS = firstImageHour * anHour
  time = new Date
  timestamp = time % 60000 + time.getHours() * anHour + time.getMinutes() * 60000
  index = (imageCount + Math.floor(((new Date).getHours() - firstImageHour) / interval)) % imageCount
  opacity = Math.abs(timestamp - (offsetMS % intervalMS)) % intervalMS / intervalMS
  $domEl = $(domEl)
  bottomLayer = new Image
  topLayer = new Image

  # bottom layer
  bottomLayer.onload = ->
    if debug
      console.log time + ' bottom layer=' + bottomLayer.src
    $domEl.find('.bottomLayerContainer').addClass 'old'
    $div = $('<div class="bottomLayerContainer" />')
    $div.css 'background-image', 'url("' + bottomLayer.src + '")'
    $div.css 'display', 'none'
    $div.fadeIn 'slow', ->
      $domEl.find('.old').remove()
      return
    $domEl.append $div
    return

  # top layer
  topLayer.onload = ->
    if debug
      console.log time + ' top layer=' + topLayer.src + ' opacity=' + opacity
    $domEl.find('.topLayerContainer').addClass 'old'
    $div = $('<div class="topLayerContainer" />')
    $div.css 'background-image', 'url("' + topLayer.src + '")'
    $div.css 'opacity', opacity
    $div.css 'display', 'none'
    $div.fadeIn 10, ->
      $domEl.find('.old').remove()
      return
    $domEl.append $div
    return

  topLayer.src = 'teawallpaper.widget/' + imageDir + '/' + images[(index + 1) % imageCount]
  if @currIndex != index
    @currIndex = index
    bottomLayer.src = 'teawallpaper.widget/' + imageDir + '/' + images[index]
  return
