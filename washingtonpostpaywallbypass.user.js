// ==UserScript==
// @name         Washinton Post Paywall Bypass
// @namespace    https://github.com/deelawn/user-scripts
// @version      0.3
// @description  Removes the Washington Post paywall
// @author       deelawn
// @include      /^http(s?)://((www\.)?)washingtonpost\.com/(.+)?/\d\d\d\d/(.+)$/
// @grant        none
// ==/UserScript==

var lastDiv = "";
var elemId = "";
var myTimer = setInterval(
  function () {
    'use strict';

    if (document.getElementById("pb-root") != null){
      elemId = "pb-root";
    }else if (document.getElementById("pg-content") != null){
      elemId = "pg-content";
    }else{
      return;
    }

    var articleDiv = document.getElementById(elemId).outerHTML;

    if (articleDiv.length > lastDiv.length){
      lastDiv = articleDiv;
      return;
    }

    articleDiv = lastDiv;

    if (document.getElementById("wp_Signin").outerHTML == null){
      return;
    }else if (document.querySelector(".wp_signin") == null){
      return;
    }

    document.getElementById("wp_Signin").outerHTML="";
    document.querySelector(".wp_signin").outerHTML="";
    $("body").css({"overflow":"visible"});
    document.getElementById(elemId).outerHTML=articleDiv;
    clearInterval(myTimer);
  }, 100);
