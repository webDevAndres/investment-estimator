"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

var formatFV = function(futureValue) {
    var deci = futureValue.indexOf(".");
    var cents = futureValue.substring(deci + 1, deci + 3);
    var hundreds = futureValue.substring(deci, deci - 3);
    var thousands = "";
    var millions = "";
    var futureValueFormatted = "";

    if(deci < 6) {
        thousands = futureValue.substring(0, deci -3);
        millions = "";
     } else {
         thousands = futureValue.substring(deci - 6, deci - 3);
         millions = futureValue.substring(0, deci - 6);
     }

     if (deci >= 7) {
         futureValueFormatted = "$" + millions + "," + thousands + "," + hundreds + "." + cents
     } else {
        futureValueFormatted = "$" + thousands +"," + hundreds + "." + cents;
     }

     return futureValueFormatted;
};

var calcFutureValue = function (investment, rate, years) {
    var futureValue = investment;
        for (var i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    };
    futureValue = parseFloat(futureValue).toFixed(2);
    futureValue = formatFV(futureValue);
    return futureValue;
};


var processEntries = function () {
    var investment = parseFloat($("investment").value);
    var rate = parseFloat($("rate").value);
    var years = parseFloat($("years").value);
    var isValid = true;

    if (isNaN(investment) || investment <= 0 || investment > 100000) {
        $("investment_error").firstChild.nodeValue = "Must be a number greater than 0 and less than or equal to 100,000.";
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

var getRandomNumber = function(max) {
    //get randomValues for investment, rate and years
    // maximum values should be 50000; 15 and 50.
    // use the random values to calculate future value
    var random;
    random = Math.random();
    random = Math.floor(random * max);
    random = random + 1;
    return random;
};

var processRandomNumber = function() {
    var investment = $("investment").value = getRandomNumber(50000);
    var rate = $("rate").value = getRandomNumber(15);
    var years = $("years").value = getRandomNumber(50);
    var futureValue = calcFutureValue(investment, rate, years)
    $("result").value = futureValue; 
};

var getDate = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date = date.getDate();
    date = (date < 10) ? "0" + date : date;
    month = (month < 10) ? "0" + month : date;
    var dateText = "Today is " + month + "/" + date + "/" + year

    return dateText;
};



window.onload = function () {
    $("calculate_value").onclick = processEntries;
    $("random_value").onclick = processRandomNumber;
    $("date").innerHTML = getDate();
    $("investment").focus();
};