var songSearch = $('#songSearch');
var songName = $('#songName');
var songList = $('#songList');
var resultTemplate = `<li class="result-item"><div class="cover-bg" style="background-image:url(\'ARTWORK_URL\');"></div><img src="ARTWORK_URL" alt="TRACK_NAME album artwork" title="TRACK_NAME by ARTIST_NAME" /><h2>TRACK_NAME</h2><h3>ARTIST_NAME</h3><audio src="PREVIEW_URL" controls="controls" preload="none"></audio></li>`;

function populateResults(data) {
  songList.removeClass('loading');
  if (data.results.length) {
    $(data.results).each(function() {
      var resultContent = resultTemplate
      .replace(/ARTWORK_URL/g, this.artworkUrl100)
      .replace(/TRACK_NAME/g, this.trackName)
      .replace(/ARTIST_NAME/g, this.artistName)
      .replace(/PREVIEW_URL/g, this.previewUrl);
      songList.append(resultContent);
    });
  } else {
    songList.addClass('no-results');
  }
}
function findSongsByTitle(){
  songList.empty();
  songList.removeClass('no-results');
  songList.addClass('loading');
  var searchTerm = encodeURIComponent(songName.val());
  var searchURL = 'https://itunes.apple.com/search?entity=song&attribute=songTerm&term=' + searchTerm + '&limit=64&callback=?';
  $.getJSON(searchURL, populateResults);
}
$(document).ready(function(){
  songSearch.submit(function(e){
    e.preventDefault();
    findSongsByTitle();
    return false;
  });
});