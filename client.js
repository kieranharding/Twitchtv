var $all = {}
var channelDivs = []
var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion",
  "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404",
  "brunofin"]

var apiUrl = "https://api.twitch.tv/kraken/"

function displayNoUser(message) {
  $all.sc.append('<div class="channel no-user"><span>' + message + '</span></div>')
}

function displayStream(streamObject) {
  var streamHTML
  var isActive = streamObject.hasOwnProperty('channel')
  var channelObject = isActive ? streamObject.channel : streamObject

  streamHTML = isActive ? '<div class="channel active">' : '<div class="channel">'
  streamHTML += '<div class="user-container">'
  + '<a class="user-link" href="' + channelObject.url + '">'
  + '<img class="user-logo" src="' + channelObject.logo + '"/>'
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
  // channelDivs.push(streamHTML)
  if (isActive) {
    $all.sc.prepend(streamHTML)
  } else {
    $all.sc.append(streamHTML)
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
  $all.sc = $('#stream-container')
  channels.map(function (user) {
    getStreamData(user)
  })

  $('body').click(function() {
    console.log(channelDivs)
  })
})
