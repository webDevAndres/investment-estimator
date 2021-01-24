"use strict";

var $ = function (id) {
    return document.getElementById(id);
};


var calcFutureValue = function (investment, rate, year) {
    var futureValue;
    futureValue = investment;
    var yearlyInterest;
    var html = "";
    for (var i = 1; i <= year; i++) {
        yearlyInterest = futureValue * (rate / 100);
        futureValue = futureValue + yearlyInterest;
        html +=" Year=" + i + " Interest=" + yearlyInterest.toFixed(2) + " Value=" + parseInt(futureValue) + "<br>";
    };
    $("main_container").style.backgroundColor = "white";
    $("main_container").innerHTML = html;
};

var getUserEntries = function () {
    var investment = parseFloat($("investment").value);
    var rate = parseFloat($("rate").value);
    var year = parseFloat($("years").value);
    calcFutureValue(investment, rate, year);
    
};


window.onload = function () {
    $("calculate_value").onclick = getUserEntries;
};