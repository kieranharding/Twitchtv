var $all = {}
var backupLogoURL = "https://cloud.githubusercontent.com/assets/8678655/18235820/ba7b5fce-72dc-11e6-9445-816ca40f4a8c.png"

var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion",
  "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404",
  "brunofin", "test_channel"]

var apiUrl = "https://api.twitch.tv/kraken/"

function displayNoUser(message) {
  $all.bad.append('<div class="channel"><span>' + message + '</span></div>')
}

function displayStream(streamObject) {
  var streamHTML
  var isActive = streamObject.hasOwnProperty('channel')
  var channelObject = isActive ? streamObject.channel : streamObject
  var logoURL = channelObject.logo || backupLogoURL

  streamHTML = isActive ? '<div class="channel active">' : '<div class="channel">'
  streamHTML += '<div class="user-container">'
  + '<a class="user-link" href="' + channelObject.url + '">'
  + '<img class="user-logo" src="' + logoURL + '"/>'
  + '<div class="user-name">' + channelObject.name + '</div></a>'
  + '</div>'

    streamHTML += '<div class="game-container">'
  if (isActive) {
    streamHTML += '<div class="game-name">' + streamObject.game + '</div>'
      + '<div class="game-desc">' + channelObject.status + '</div>'
      + '</div>'
      + '<img class="game-preview" src="' + streamObject.preview.large + '"/>'
  } else {
    streamHTML += '<div class="game-name">Not currently streaming</div>'
      + '</div>'
  }

  streamHTML += '</div>'
  if (isActive) {
    $all.active.append(streamHTML)
  } else {
    $all.inactive.append(streamHTML)
  }
}

function getChannelData(url) {
  $.getJSON(url + '?callback=?', function(res) {
    displayStream(res)
  })
}

function getStreamData(user) {
  $.getJSON(apiUrl + 'streams/' + user + '?callback=?', function(res) {
    if (res.stream) {
      displayStream(res.stream)
    } else if (res.error) {
      displayNoUser(res.message)
    } else {
      getChannelData(res._links.channel)
    }
  })
}

$(document).ready(function() {
  $all.active = $('#active-streams')
  $all.inactive = $('#inactive-streams')
  $all.bad = $('#bad-accounts')
  channels.map(function (user) {
    getStreamData(user)
  })
})
