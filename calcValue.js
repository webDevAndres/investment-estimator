"use strict";

var $ = function (id) {
    return document.getElementById(id);
};


var calcFutureValue = function (investment, rate, year) {
    var futureValue = investment;
        for (var i = 1; i <= year; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    };
    futureValue = parseFloat(futureValue).toFixed(2);
    return futureValue;
};


var processEntries = function () {
    var investment = parseFloat($("investment").value);
    var rate = parseFloat($("rate").value);
    var years = parseFloat($("years").value);
    var isValid = true;

    if (isNaN(investment) || investment <= 0 || investment >= 100000) {
        $("investment_error").firstChild.nodeValue = "Must be a number greater than 0 and less than 100,000.";
        isValid = false;
    } else {
        $("investment_error").firstChild.nodeValue = "";
    }

    if (isNaN(rate) || rate <= 0 || rate > 15) {
        $("rate_error").firstChild.nodeValue = "Must be a number greater than 0 and less than or equal to 15.";
        isValid = false;
    } else {
        $("rate_error").firstChild.nodeValue = "";
    }

    if (isNaN(years) || years <= 0 || years > 50) {
        $("years_error").firstChild.nodeValue = "Must be a number greater than 0 and less than or equal to 50.";
        isValid = false;
    } else {
        $("years_error").firstChild.nodeValue = "";
    }

    if (isValid) {
        var futureValue = calcFutureValue(investment, rate, years);
        $("result").value = futureValue;
        $("investment").focus();
    }

};


window.onload = function () {
    $("calculate_value").onclick = processEntries;
    $("investment").focus();
};