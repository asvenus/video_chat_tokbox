// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .


// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
// Initialize an OpenTok Session object

var apiKey = '45281572';
var sessionId = '<%= @session_id %>';
var token = '<%= @tok_token %>';
var session = TB.initSession(sessionId);

// Initialize a Publisher, and place it into the element with id="publisher"
var publisher = TB.initPublisher(apiKey, 'publisher');

// Attach event handlers
session.on({

  // This function runs when session.connect() asynchronously completes
  sessionConnected: function(event) {
    // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
    // clients)
    session.publish(publisher);
  },

  // This function runs when another client publishes a stream (eg. session.publish())
  streamCreated: function(event) {
    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"
    var subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild(subContainer);

    // Subscribe to the stream that caused this event, put it inside the container we just made
    session.subscribe(event.stream, subContainer);
  }

});

// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(apiKey, token);
    // $(document).ready(function(){
    //   $("#link").attr('value',document.URL);
    // })
  // TB.addEventListener("exception", exceptionHandler);
  // var session = TB.initSession("<%= @room.sessionId %>"); // Replace with your own session ID. See https://dashboard.tokbox.com/projects
  // session.addEventListener("sessionConnected", sessionConnectedHandler);
  // session.addEventListener("streamCreated", streamCreatedHandler);
  // session.connect(45281572, "<%= @tok_token %>"); // Replace with your API key and token. See https://dashboard.tokbox.com/projects
  // function sessionConnectedHandler(event) {
  //    subscribeToStreams(event.streams);
  //    session.publish();
  // }

  // function streamCreatedHandler(event) {
  //   subscribeToStreams(event.streams);
  // }

  // function subscribeToStreams(streams) {
  //   for (var i = 0; i < streams.length; i++) {
  //   // Make sure we don't subscribe to ourself
  //     if (streams[i].connection.connectionId == session.connection.connectionId) {
  //       return;
  //     }

  //     // Create the div to put the subscriber element in to
  //     var div = document.createElement('div');
  //     div.setAttribute('id', 'stream' + streams[i].streamId);
  //     document.body.appendChild(div);

  //     // Subscribe to the stream
  //     session.subscribe(streams[i], div.id);
  //   }
  //   // for (var i = 0; i < streams.length; i++) {
  //   //   var stream = streams[i];
  //   //   console.log(stream.connection.connectionId+"&"+session.connection.connectionId);
  //   //   if (stream.connection.connectionId != session.connection.connectionId) {
  //   //     session.subscribe(stream);
  //   //   }
  //   // }
  // }

  // function exceptionHandler(event) {
  //   alert(event.message);
  // }
