var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n === 0) {
        document.getElementById("back").style.visibility = "hidden";
        document.getElementById("next").innerHTML = "Apply";
    } else {
        document.getElementById("back").style.visibility = "visible";
        document.getElementById("next").innerHTML = "Next";
    }
    if (n === (x.length - 2)) {
        document.getElementById("next").innerHTML = "View";
    }
    stepIndicator(n);

}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab === x.length - 1) {
        document.getElementById("next").style.visibility = "hidden";
        answers();
    } else {
        document.getElementById("next").style.visibility = "visible";
    }
    showTab(currentTab);
}

function stepIndicator(n) {
    var i, indicator = document.getElementsByClassName("step");
    for (i = n; i < indicator.length; i++) {
        indicator[i].className = indicator[i].className.replace(" active", "");
    }
    indicator[n].className += " active";
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByClassName("form-field");
    var radio = x[currentTab].getElementsByClassName("radio");
    var check = x[currentTab].getElementsByClassName("checkbox");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className = y[i].className.replace(" invalid-number", "");
            y[i].className = y[i].className.replace(" invalid", "");
            y[i].className += " invalid";
            valid = false;
        } else if (currentTab === 2) {
            if (i === 0 && !radio[i].checked && !radio[i + 1].checked) {
                radio[i].className += " invalid";
                radio[i + 1].className += " invalid";
                valid = false;
            }
        } else if (currentTab === 4) {
            var number = y[i].value;
            if (isNaN(number)) {
                y[i].className = y[i].className.replace(" invalid-number", "");
                y[i].className = y[i].className.replace(" invalid", "");
                y[i].className += " invalid-number";
                valid = false;
            }
        } else if (currentTab === 5) {
            if (i === 0 && !check[i].checked) {
                check[i].className += " invalid";
                valid = false;
            }
        } else {
            y[i].className = y[i].className.replace(" invalid", "");
            y[i].className = y[i].className.replace(" invalid-number", "");
        }
    }

    return valid;
}

function answers() {
    var i, input = document.getElementById("main-form");
    var summary = document.getElementsByClassName("field-value");
    var list = document.getElementById("result-list").getElementsByTagName("li");
    for (i = 0; i <= 5; i++) {
        if (input[i].type === "radio" && !input[i].checked) {
            list[i].style.display = "none";
            continue;
        }
        if (input[i].type === "checkbox" && input[i].checked) {
            summary[i].innerHTML = "Confirmed";
        } else {
            summary[i].innerHTML = input[i].value;
        }
    }

}