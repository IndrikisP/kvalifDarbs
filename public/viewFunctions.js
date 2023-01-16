// Function for fetching the country data
async function start(region){
    const response = await fetch('http://localhost:3000/api/'+String(region));
    const data = await response.json();
    return data;
}
// 
async function startTest(testName){
    const response = await fetch('http://localhost:3000/tests/'+testName);
    const data = await response.json();
    return data;
}
// Function to split a mm:ss string and get the seconds in return
function getSeconds(time) {
    // Split the time string into minutes and seconds
    const parts = time.split(":");
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    // Return the total number of seconds
    return minutes * 60 + seconds;
}
// Function to get a random integer between two passed integers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
// Function to shuffle the indexes
function generateIndexes(min, max, excl){
    var indexes = [];
    indexes[0] = getRandomInt(min, max);
    while(indexes[0] == excl){
        indexes[0] = getRandomInt(min, max);
    }
    indexes[1] = getRandomInt(min, max);
    while(indexes[1] == excl || indexes[1] == indexes[0]){
        indexes[1] = getRandomInt(min, max);
    }
    indexes[2] = getRandomInt(min, max);
    while(indexes[2] == excl || indexes[2] == indexes[1] || indexes[2] == indexes[0]){
        indexes[2] = getRandomInt(min, max);
    }
    return indexes;
}
// Get index of correct answer
function randomizeCorrectAnswerPlace(){
    return getRandomInt(1, 5);
}
// Function to post the results of a quiz
async function submitQuizResults(score, maxScore, allTime, timeLeft, testType){
    timeLeft = getSeconds(timeLeft);
    allTime = getSeconds(allTime);
    var time = allTime - (allTime - timeLeft);
    await fetch('http://localhost:3000/testPost', {
        method: 'POST',
        headers : {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "score="+String(score)+"&time="+String(allTime)+"&timeLeft="+String(time)+"&maxScore="+String(maxScore)+"&testName="+String(testType)
    });
}
// Function that resets checkboxes after an answered question
function uncheckCheckboxes(){
    document.getElementById('question1').checked = false;
    document.getElementById('question2').checked = false;
    document.getElementById('question3').checked = false;
    document.getElementById('question4').checked = false;
}
// Function to check if user has logged in
function userLoginCheck(userName){
    var logOut = document.getElementById('logOut');
    var logIn = document.getElementById('logIn');
    var register = document.getElementById('register');
    if(userName) {
      logOut.style.display = "inline-block";
      logIn.style.display = "none";
      register.style.display = "none";
    }
    else{
      logOut.style.display = "none";
      logIn.style.display = "inline-block";
      register.style.display = "inline-block";
    }
  }
// Function for generating the multiple answer choices on the form
function updateQuestionsForm(obj, index){
    document.getElementById('questionLabel').innerHTML = obj["QUESTION"];
    document.getElementById('questionLabel1').innerHTML = obj["INCORRECT_ANSW1"];
    document.getElementById('questionLabel2').innerHTML = obj["INCORRECT_ANSW2"];
    document.getElementById('questionLabel3').innerHTML = obj["INCORRECT_ANSW3"];
    document.getElementById('questionLabel4').innerHTML = obj["ANSWER"];
    if(index != 4){
        document.getElementById('questionLabel'+String(index)).innerHTML = obj["ANSWER"];
        document.getElementById('questionLabel4').innerHTML = obj["INCORRECT_ANSW"+String(index)];
    }
    return index;
}
// Function for generating the multiple answer choices on the form
function updateFlagsForm(obj, index){
    document.getElementById('questionLabel1').innerHTML = obj["NAME"];
    document.getElementById('questionLabel2').innerHTML = obj["name2"];
    document.getElementById('questionLabel3').innerHTML = obj["name3"];
    document.getElementById('questionLabel4').innerHTML = obj["name4"];
    if(index != 1){
        document.getElementById('questionLabel'+String(index)).innerHTML = obj["NAME"];
        document.getElementById('questionLabel1').innerHTML = obj["name"+String(index)];
    }
    return index;
}
// Function for generating the multiple answer choices on the form
function updateCapitalsForm(obj, index){
    document.getElementById('questionLabel').innerHTML = "What is the capital of "+obj["NAME"];
    document.getElementById('questionLabel1').innerHTML = obj["CAPITAL"];
    document.getElementById('questionLabel2').innerHTML = obj["capital2"];
    document.getElementById('questionLabel3').innerHTML = obj["capital3"];
    document.getElementById('questionLabel4').innerHTML = obj["capital4"];
    if(index != 1){
        document.getElementById('questionLabel'+String(index)).innerHTML = obj["CAPITAL"];
        document.getElementById('questionLabel1').innerHTML = obj["capital"+String(index)];
    }
    return index;
}
function endQuizStyling(inputId, disableButtons){
    document.getElementById(inputId).disabled = true;
    document.getElementById(inputId).value = "";
    document.getElementById('timer').style = "color:green;";
    if(disableButtons == true){
        document.getElementById('previousButton').disabled = true;
        document.getElementById('nextButton').disabled = true;
    }
}
function endQuizStylingMultiple(){
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    document.getElementById('timer').style = "color:green;";
}
