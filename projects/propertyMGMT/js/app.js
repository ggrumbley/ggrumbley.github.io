var comments = [{
  name: "Vito Corleone",
  comment: "I'm gonna make him an offer he can't refuse.",
  timestamp: 69379200
}, {
  name: "Terry Benedict",
  comment: "Congratulations... You're a dead man!",
  timestamp: 1007683200
}, {
  name: "Jessica Rabbit",
  comment: "I'm not bad. I'm just drawn that way.",
  timestamp: 583113600
}, {
  name: "Martin Brody",
  comment: "You're gonna need a bigger boat.",
  timestamp: 172281600
}, {
  name: "Jack Dawson",
  comment: "I'm the king of the world!",
  timestamp: 882489600
}, {
  name: "The Terminator",
  comment: "Hasta la vista, baby.",
  timestamp: 678326400
}, {
  name: "The Joker",
  comment: "Why so serious..?",
  timestamp: 1215993600
}];


// UNIX Timestamp Formatting
var formatTime = function(unixTimestamp) {
    var dt = new Date(unixTimestamp * 1000),
    day = dt.getDate(),
    month = dt.getMonth(),
    year = dt.getFullYear();

    month += 1;
    day += 1;

    return month + "/" + day + "/" + year;
};


// Comments Data Formatting
comments = _.sortBy(comments, 'timestamp');
comments = _.map(comments, function(comment) {
  comment.date = formatTime(comment.timestamp);
  if (comment.name.slice(0,4) === "The ") {
    comment.name = comment.name.split(' ')[1];
    return comment;
  } else {
    comment.name = comment.name.split(' ')[0];
    return comment;
  }
});


// Underscore Templating
var template = _.template( $( "#comment-template" ).html() );

_.each(comments, function(comment) {
  $("#comments").append(template(comment));
});


//Slideshow
$(function() {
  setInterval(function() {
    $('#slideshow').each(function() {
      var displayed = $(this).find('.display').removeClass('display');
      var next = displayed.next().length?displayed.next():$(this).children().eq(0);
      next.addClass('display');
    });
  }, 8000);
});
