// ==UserScript==
// @name         New York Times Paywall Bypass
// @namespace    https://github.com/deelawn/user-scripts
// @version      0.1
// @description  Removes the New York Times paywall
// @author       deelawn
// @include      /^http(s?)://((www\.)?)nytimes\.com(.*)?/\d\d\d\d/(.+)$/
// @grant        none
// ==/UserScript==

var lastDiv = "";
var myTimer = setInterval(
  function () {
    'use strict';

    var articleDiv = document.getElementById("main");
    if (articleDiv == null){
      return;
    }else{
      articleDiv = articleDiv.outerHTML;
    }

    if (articleDiv.length > lastDiv.length){
      lastDiv = articleDiv;
      return;
    }

    articleDiv = lastDiv;

    if (document.getElementById("gatewayCreative").outerHTML == null){
      return;
    }

    for(i=0;i<999;i++){clearInterval(i);}
    document.getElementById("gatewayCreative").outerHTML="";
    $("body").css({"overflow":"visible"});
    $("html").css({"overflow":"visible"});
    document.getElementById("main").outerHTML=articleDiv;
  }, 100);
