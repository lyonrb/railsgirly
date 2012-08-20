String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
    return url.link(url);
  });
};

String.prototype.parseUsername = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    return u.link("http://twitter.com/"+username);
  });
};

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t.replace("#","%23")
    return t.link("http://search.twitter.com/search?q="+tag);
  });
};

$(document).ready(function () {
  $.getJSON('http://api.twitter.com/1/statuses/user_timeline/rulu.json?count=1&include_rts=1&callback=?',function(tweet){
     tweet = tweet[0].text.parseURL().parseHashtag().parseUsername();
     $("#tweet").append(tweet);
  });
});
