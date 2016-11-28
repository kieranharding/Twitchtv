var $all = {}
var inactiveCount = 0
var backupLogoURL = "https://cloud.githubusercontent.com/assets/8678655/18235820/ba7b5fce-72dc-11e6-9445-816ca40f4a8c.png"

var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion",
  "storbeck",  "RobotCaleb","habathcx", "noobs2ninjas", "comster404",
  "brunofin", "test_channel"]

// var apiUrl = "https://api.twitch.tv/kraken/"
var apiUrl = "https://wind-bow.hyperdev.space/twitch-api/"

function displayNoUser(message) {
  $all.bad.append('<div>' + message + '</div>')
}

function displayStream(streamObject, isLast) {
  var isActive = streamObject && streamObject.hasOwnProperty('channel')
  var channelObject = isActive ? streamObject.channel : streamObject
  var logoURL = channelObject.logo || backupLogoURL

  if (isActive) {
    var streamHTML = '<div class="row"><div class="one-third column">'
      + '<a href="' + channelObject.url
      + '"><img class="u-max-full-width game-preview" src="'
      + streamObject.preview.medium + '"/>'
      + '</a></div><div class="two-thirds column">'
      + '<span class="game-name">' + streamObject.game + '</span>' + ': '
      + '<span class="game-desc">' + channelObject.status + '</span>'
      + '<div class="user-link">'
      + '<a href="' + channelObject.url + '">'
      + '<span class="user-name">' + channelObject.name + '</span>'
      + '<img class="user-logo" src="' + logoURL + '"/>'
      + '</a></div></div></div>'

    $all.active.append(streamHTML)
  } else {
    var streamHTML = '<div class="one-third column user-link">'
      + '<a href="' + channelObject.url + '">'
      + '<span class="user-name">' + channelObject.name + '</span>'
      + '<img class="user-logo" src="' + logoURL + '"/>'
      + '</a></div>'

    if ( inactiveCount % 3 === 0 ) {
      streamHTML = '<div class="row">' + streamHTML + '</div>'
      $all.inactive.append(streamHTML)
    } else {
      $all.inactive.find('.row:last-of-type').append(streamHTML)
    }
    inactiveCount++
  }
}

function getChannelData(url) {
  $.getJSON(url + '?callback=?', function(res) {
    console.log(res)
    displayStream(res)
  })
}

function getStreamData(user, idx) {
  $.getJSON(apiUrl + 'streams/' + user + '?callback=?', function(res) {
    if (res.stream) {
      console.log('Streaming:', res)
      displayStream(res.stream, (idx === channels.length - 1))
    } else if (res.error) {
      console.log('Does Not Exist:', res)
      displayNoUser(res.message)
    } else {
      console.log('Not Streaming:', res)
      getChannelData(apiUrl + 'channels/' + user)
    }
  })
}

$(document).ready(function() {
  $all.active = $('#active-streams')
  $all.inactive = $('#inactive-streams')
  $all.bad = $('#bad-accounts')
  channels.map(function (user, idx) {
    getStreamData(user, idx)
  })

})
