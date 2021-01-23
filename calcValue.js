"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

var createNodes = function(futureValue) {
    var inputNode = document.createElement("input");
    var labelNode = document.createElement("label");
    //set up the properties and attributes of elements
    inputNode.type = "text";
    inputNode.id = "result";
    inputNode.setAttribute("disabled", true);
    inputNode.value = futureValue;
    labelNode.textContent = "Future Value";
    labelNode.setAttribute("for", "result");
    //attach the nodes to the end of the section
    var parentLabelDiv = document.getElementById("display_result_label");
    var parentResultDiv = document.getElementById("display_result");
    parentLabelDiv.appendChild(labelNode);
    parentResultDiv.appendChild(inputNode);
};

var displayResult = function (futureValue) {
    var resultElement = $("result");
    var newValue = futureValue;
    if(resultElement) {
        var currentValue = resultElement.value;
        if(currentValue !== newValue) {
            resultElement.value = newValue;
        } 
    } else {
        if(!isNaN(newValue)) {
            createNodes(newValue);
        }
    }
};

var calcFutureValue = function (investment, rate, years) {
    var futureValue;
    futureValue = investment;
    for (var i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    }
    futureValue = parseFloat(futureValue).toFixed(2);
    return futureValue;
};

var getUserEntries = function () {
    var investment = parseFloat($("investment").value);
    var rate = parseFloat($("rate").value);
    var year = parseFloat($("years").value);
    var result = calcFutureValue(investment, rate, year);
    displayResult(result);
};


window.onload = function () {
    $("calculate_value").onclick = getUserEntries;
};