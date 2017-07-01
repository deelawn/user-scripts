// ==UserScript==
// @name         Coin Marketcap volume to market cap column
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add volume to market cap ratio
// @author       Dylan Boltz
// @match        https://coinmarketcap.com/
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    // Works fine, but haven't been able to get it to sort the new column.

    $(document).ready(function() {
        var ratioHdrDef = "<th id=\"th-ratio\" class=\"sortable text-right sorting\" tabindex=\"0\" " +
            "aria-controls=\"currencies\" rowspan=\"1\" colspan=\"1\" aria-label=\"% Volume Ratio: " +
            "activate to sort column descending\" style=\"width: 117px;\">% Volume Ratio</th>";

        $("th[id='th-volume']").after(ratioHdrDef);

        $("tbody").children("tr").each(function(){
            var marketCapUSD = $(":nth-child(3)", this).attr("data-usd");
            var dailyVolUSD = $(":nth-child(6) a", this).attr("data-usd");
            var ratioVal = ((dailyVolUSD / marketCapUSD) * 100).toFixed(2);
            var ratioCellDef = "<td class=\"no-wrap ratio text-right\" data-usd=\"" + ratioVal + "\">" + ratioVal + "%</td>";
            $(":nth-child(6)", this).after(ratioCellDef);
        });
    });
})();
