document.onload = LOAD();
var arr = [];
var i = 0, j = 1, Score=0, count=0;
var question;
var radio1, label, button;
function LOAD() {   
    var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arr = JSON.parse(this.responseText);
        }
    }
    xhttp.open("GET", "question.json", true);
    xhttp.send();
}

function Test() {

    var property = document.getElementById("StartTest");
    if (count == 0) {
        property.style.backgroundColor = "#E6D1F0";
        count = 1;
    }
    else {
        property.style.backgroundColor = "#F2BEE2";
        count = 0;
    }


    button = document.getElementById("StartTest");
    if(i != 9)
        button.innerHTML = "NEXT";
    else
        button.innerHTML = "SUBMIT";
    if (i >= j) {  
        check();
        question.parentNode.removeChild(question);
        var delradio = document.getElementsByTagName("input");
        var dellabel = document.getElementsByTagName("label");  
        var delbr = document.getElementsByTagName("br");      
        let k = 0, l = 0;
        while (l < 4) {
            delradio[k].parentNode.removeChild(delradio[k]);
            dellabel[k].parentNode.removeChild(dellabel[k]);
            delbr[k].parentNode.removeChild(delbr[k]);
            l++;
        }     
        j++;
    }   
    if (i != 10) {
        question = document.createElement("p");
        question.setAttribute("id", "pid");
        question.innerHTML = arr.results[i].question;
        div2.appendChild(question);
        for (let k = 0; k < 4; k++) {
            var br = document.createElement("br");
            radio1 = document.createElement("input");
            label = document.createElement("label");
            radio1.setAttribute("type", "radio");
            radio1.setAttribute("name", "key1");
            radio1.setAttribute("value", arr.results[i].incorrect_answers[k]);
            label.innerHTML = arr.results[i].incorrect_answers[k];
            div2.appendChild(radio1);
            div2.appendChild(label);
            div2.appendChild(br);
        }
        i++;
    }

    else if (i == 10) {
        var br = document.createElement("br");
        var printScore = document.createElement("label");
        var print = document.createElement("label");
        printScore.innerHTML = Score;
        print.innerHTML = "Your Score:";
        div2.appendChild(br);
        div2.appendChild(print);
        div2.appendChild(printScore);       
        button.parentNode.removeChild(button);
        i++;
    }       
}

function check() {
    var chkradio = document.getElementsByTagName("input");
    for (let k = 0; k < 4; k++) {
        if (chkradio[k].checked == true) {
            if (arr.results[i-1].correct_answer == chkradio[k].value) {               
                Score++; 
                console.log(Score);
            }
        }
    }
}