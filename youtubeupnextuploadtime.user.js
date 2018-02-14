// ==UserScript==
// @name         Youtube Up Next Time Since Upload
// @namespace    https://github.com/deelawn/user-scripts
// @version      0.2
// @description  In the up next queue on Youtube, include the time since upload as part of the displayed metadata
// @author       deelawn
// @include      /^http(s?)://((www\.)?)youtube\.com/watch(.*)$/
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Check every second for upcoming videos with no uploaded time metadata displayed
var myTimer = setInterval(
  function () {
    'use strict';

    $("ytd-watch-next-secondary-results-renderer.ytd-watch > div[id='items']").children().each(function() {
      var nextObj;

      // The video up next is structured a bit differently, so check for that
      if($(" > div[id='head']", this).length){
        nextObj = $(" > ytd-compact-video-renderer", this);
      }else{
        nextObj = this;
      }

      if(!($(" > div[id='dismissable']", nextObj).length)){
        return;
      }

      nextObj = $(" > div[id='dismissable']", nextObj);

      // Don't add the time span if it's already there
      if($(" > a > ytd-video-meta-block > div[id='metadata'] > div[id='metadata-line'] > span[id='time-since-upload']", nextObj).length){
        return;
      }

      var rawLabel = $(" > a > h3 > span", nextObj).attr("aria-label");
      var regEx = /.*?\sby\s.*?\s(\d\s((year(s?))|(month(s?))|(day(s?))|(hour(s?))|(minute(s?))|(second(s?)))\sago)/;
      var timeSinceUpload = regEx.exec(rawLabel)[1];
      var timeSpan = "<span id=\"time-since-upload\" class=\"style-scope ytd-video-meta-block\">".concat(timeSinceUpload.concat("</span>"));

      $(" > a > ytd-video-meta-block > div[id='metadata'] > div[id='metadata-line'] > span", nextObj).after(timeSpan);
    });
  }, 3000);
