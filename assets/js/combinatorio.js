var count = 0;
var boxCount = 0;
var chooseCount = 0;
var checkCount = 0;
var chosenList = [];
var checks = [];

function choose(n, r) {
    var nr = 1;
    var rfact = 1;
    for (let i = n; i > n-r; i--)
        nr *= i;
    for (let j = r; j > 1; j--)
        rfact *= j;
    return nr / rfact;
}

function onstart() {
    count = 0;
    boxCount = Math.floor(Math.random()*6+7);
    checkCount = 0;
    chooseCount = Math.floor(Math.random()*(boxCount/2-2) + 2);
    chosenList = [];
    checks = [];
    document.getElementById("combinatorioLog").innerHTML = "";
    document.getElementById("combinatorioInfo").innerHTML = "Enter all ways to choose " + chooseCount + " out of " + boxCount + " check boxes - simply check " + chooseCount + " boxes, and your input will be registered.<br>Count: " + count + "/" + choose(boxCount, chooseCount);
    var foo = "";
    for (let i = 0; i < boxCount; i++) {
        foo += `<input type="checkbox" id="gamecheck${i}" onclick="oncheckbox(${i})">`;
    }
    foo += `<br><button onclick="onstart()">Reset</button>`;
    document.getElementById("combinatorioGame").innerHTML = foo;
    for (let i = 0; i < boxCount; i++) {
        checks.push(document.getElementById(`gamecheck${i}`));
    }
}
function validate(userin) {
    for (let i = 0; i < count; i++) {
        var flag = true; // flag is true if userin == chosenList[i]
        for (let j = 0; j < boxCount; j++) {
            if (chosenList[i][j] != userin[j])
                flag = false;
        }
        if (flag) return false;
    }
    return true;
}
function register(userin) {
    count++;
    chosenList.push(userin);
}

function win() {
    var nCr = choose(boxCount, chooseCount);
    document.getElementById("combinatorioInfo").innerHTML = `<span class="win">Congratulations, you have entered all the arrangements!</span><br>Count: ${nCr}/${nCr}`;
    document.getElementById("combinatorioGame").innerHTML = `<button id="starter" onclick=onstart()>Play again</button>`;
}

function oncheckbox(i) {
    if (checks[i].checked)
        checkCount++;
    else
        checkCount--;
    document.getElementById("combinatorioLog").innerHTML = "";
    if (checkCount == chooseCount) onenter();
}

function onenter() {
    var userin = [];
    var checkCount = 0;
    for (let i = 0; i < boxCount; i++) {
        userin.push(checks[i].checked);
        checkCount += userin[i];
    }
    var logger = document.getElementById("combinatorioLog");
    if (checkCount != chooseCount) {
        logger.innerHTML = `<span class="logFail">Invalid no. of checks</span>`;
        return;
    }
    if (!validate(userin)) {
        logger.innerHTML = `<span class="logFail">Duplicated arrangement</span>`;
        return;
    }
    register(userin);
    logger.innerHTML = `<span class="logSuccess">Successfully added</span>`;
    
    if (count == choose(boxCount, chooseCount)) {
        win();
        return;
    }
    
    document.getElementById("combinatorioInfo").innerHTML = "Enter all ways to choose " + chooseCount + " out of " + boxCount + " check boxes<br>Count: " + count + "/" + choose(boxCount, chooseCount);
}