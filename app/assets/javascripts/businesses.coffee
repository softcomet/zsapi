#= require minicolors/jquery.minicolors
#= require color-thief/color-thief
#= require shared/cropbox_setup

### TRANSFORM RGB TO HEX ###
hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f')

# Convert RGB to Regex
rgb2hex = (rgb) ->
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])

# Return a hex value?
hex = (x) ->
  if isNaN(x) then '00' else hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16]


detectColors = (image) ->
  colorThief = new ColorThief
  colors = Array()
  colors = colorThief.getPalette(image, 5)
  $('.paleteColors').empty()
  i = colors.length - 1
  while i >= 0
    hex = rgb2hex('rgb(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ')')
    $('.paleteColors').append '<div class="color" val="' + hex + '" style="background-color: rgb(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ');"></div>'
    i--
  return

(($) ->
	# COLOR PICKER
	if $('#colorPicker1').length
    $('#colorPicker1').minicolors
      control:  'wheel',
      position: 'right'

	if $('#colorPicker2'.length)
    $('#colorPicker2').minicolors
      control:  'wheel',
      position: 'right'
  return


  $('#btnSaveClose').on 'click', ->
    img = new Image()
    img.src = window.cropper.getDataURL()
    detectColors(img)


  $('.paleteColors .color').click ->
    if $('.lastActive').length
      $('.lastActive input').val $(this).attr('val')
      if $('.lastActive #colorPicker1').length
        $('#colorPicker1').minicolors 'value', $(this).attr('val')
      if $('.lastActive #colorPicker2').length
        $('#colorPicker2').minicolors 'value', $(this).attr('val')
    return
  return


  # Update the business preview
  updatePreview = ->
    $('.previewHeader').css 'background-color', $('#colorPicker1').val()
    $('.content, .socialFooter').css 'background-color', $('#colorPicker2').val()
    $('.previewHeader img').attr 'src', $('.theImage').val()
    $('.content h1').html $('.businessName').val()
    text = $('.address').val() + ' ' + $('.address2').val() + ' ' + $('.city').val() + ' ' + $('.state').val() + ' ' + $('.zipCode').val()
    $('.content p').html text
    return

) jQuery