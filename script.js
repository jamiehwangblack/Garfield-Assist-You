let stressValue;
let painValue;
let fatigueValue;
let sleepValueNum;
let sleepValue;
let noteText;

window.onload = function() {
    document.getElementById("painGuide").style.display = "none";
    document.getElementById("painInput").style.display = "none";
    document.getElementById("stressGuide").style.display = "none";
    document.getElementById("stressInput").style.display = "none";
    document.getElementById("fatigueGuide").style.display = "none";
    document.getElementById("fatigueInput").style.display = "none";
    document.getElementById("sleepInput").style.display = "none";
    document.getElementById("noteInput").style.display = "none";
    //document.getElementById("skipButton").style.display = "none";
    document.getElementById("garfSays").style.display = "block";

    timeCheck();
}

function stressAsk() {
    document.getElementById("garfSays").innerText = "What is your current stress level from 1 to 10?";
    document.getElementById("stressInput").style.display = "block"; 
    document.getElementById("stressGuide").style.display = "block";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepAsk() {
    document.getElementById("garfSays").innerText = "How did you sleep?";
    document.getElementById("sleepInput").style.display = "block";
    document.getElementById("skipButton").style.display = "block";
}

async function sleepActivity(sleepQualityNum, sleepQuality) {
    sleepValueNum = sleepQualityNum;
    sleepValue = sleepQuality;
    document.getElementById("sleepInput").style.display = "none";
    document.getElementById("garfSays").innerText = "Okay.";

    await sleep(2000);

    stressAsk();
}

async function timeCheck() {
    const hour = new Date().getHours();
    let time;
    if(hour >= 5 && hour < 12){
        time = "morning";
    } else if(hour >= 12 && hour < 17){
        time = "afternoon";
    } else if(hour >= 17 && hour < 20){
        time = "evening";
    } else {time = "night";}

    let greeting = "";
    if(time === "morning") {
        greeting = "Good morning.";
    } else if(time === "afternoon") {
        greeting = "Good afternoon.";
    } else if(time === "evening") {
        greeting = "Good evening.";
    } else {
        greeting = "It's late.";
    }
    document.getElementById("garfSays").innerText = greeting;
    await sleep(2000);
    if(time === "morning") {
        sleepAsk();
        return;
    }
    stressAsk();
}

async function stressWrong(){
    document.getElementById("circle").style.display = "none";
    document.getElementById("garfSays").innerText = "Try again.";
    await sleep(2000);
    document.getElementById("garfSays").innerText = "What is your current stress level from 1 to 10?";
    document.getElementById("stressInput").style.display = "block";
    document.getElementById("stressGuide").style.display = "block";
}

async function stressActivity() {
    const circle = document.getElementById("circle");

    document.getElementById("stressGuide").style.display = "none";
    document.getElementById("stressInput").style.display = "none";
    document.getElementById("circle").style.display = "block";

    let stress = document.getElementById("stress").value;

    if(stress<0 || stress>10) {
        await stressWrong();
        return;
    }
    else if(stress==0) {
    stressValue = parseInt(document.getElementById("stress").value);
    document.getElementById("circle").style.display = "none";
    painCheck();
    return;
    }
    else if(stress==1) {
    stressValue = parseInt(document.getElementById("stress").value);
    document.getElementById("garfSays").innerText = "Let's take " + stress + " deep breath.";   
    await sleep(2000);
    }
    else{
    stressValue = parseInt(document.getElementById("stress").value);
    document.getElementById("garfSays").innerText = "Let's take " + stress + " deep breaths.";   
    await sleep(2000);
    }
    document.getElementById("garfSays").innerText = "Ready?";
    await sleep(1500);

    for(let i = 0; i < stress; i++) {
        document.getElementById("garfSays").innerText = "Inhale...";
        document.getElementById("circle").style.transform = "scale(3)";
        circle.offsetHeight;
        await sleep(4000);
        document.getElementById("garfSays").innerText = "Exhale...";
        document.getElementById("circle").style.transform = "scale(1)";
        circle.offsetHeight;
        await sleep(4000);
    }
    
    document.getElementById("circle").style.display = "none";
    document.getElementById("garfSays").innerText = "Good Job!";
    await sleep(1500);
    painCheck();
}

async function painCheck() {
    document.getElementById("garfSays").innerText = "What is your current pain level from 1 to 10?";
    document.getElementById("painInput").style.display = "block";
    document.getElementById("painGuide").style.display = "block";
}

async function painWrong(){
    document.getElementById("painInput").style.display = "none";
    document.getElementById("painGuide").style.display = "none";
    document.getElementById("garfSays").innerText = "Try again.";
    await sleep(2000);
    document.getElementById("garfSays").innerText = "What is your current pain level from 1 to 10?";
    document.getElementById("painInput").style.display = "block";
    document.getElementById("painGuide").style.display = "block";
}

async function painActivity(){
    document.getElementById("painInput").style.display = "none";
    document.getElementById("painGuide").style.display = "none";
    document.getElementById("garfSays").innerText = "I see.";
    let pain = document.getElementById("pain").value;
    if(pain<1 || pain>10) {
        await painWrong();
        return;
    }
    else{
    painValue = parseInt(document.getElementById("pain").value);
    await sleep(2000);
    fatigueCheck();
    }
}

async function fatigueCheck(){
    document.getElementById("garfSays").innerText = "What is your current fatigue level from 1 to 10?";
    document.getElementById("fatigueGuide").style.display = "block";
    document.getElementById("fatigueInput").style.display = "block";
}

async function fatigueWrong(){
    document.getElementById("fatigueInput").style.display = "none";
    document.getElementById("fatigueGuide").style.display = "none";
    document.getElementById("garfSays").innerText = "Try again.";
    await sleep(2000);
    document.getElementById("garfSays").innerText = "What is your current fatigue level from 1 to 10?";
    document.getElementById("fatigueInput").style.display = "block";
    document.getElementById("fatigueGuide").style.display = "block";
}

async function fatigueActivity(){
    document.getElementById("fatigueGuide").style.display = "none";
    document.getElementById("fatigueInput").style.display = "none";
    let fatigue = document.getElementById("fatigue").value;
    if(fatigue<1 || fatigue>10) {
        await fatigueWrong();
        return;
    }
    else{
        fatigueValue = parseInt(document.getElementById("fatigue").value);
        document.getElementById("garfSays").innerText = "Ok.";
        noteCheck();
    }
}

async function noteCheck(){
    document.getElementById("garfSays").innerText = "Any notes?";
    document.getElementById("noteInput").style.display = "block";
}

async function noteActivity(){
    noteText = document.getElementById("note").value;
    document.getElementById("noteInput").style.display = "none";
    document.getElementById("garfSays").innerText = "Got it.";
    await sendToSheet(sleepValue, sleepValueNum, stressValue, painValue, fatigueValue, noteText);
    document.getElementById("garfSays").innerText = "Data sent successfully! Take care.";
}

async function sendToSheet(sleep, sleepNum, stress, pain, fatigue, note) {
    const url = "https://script.google.com/macros/s/AKfycbxn7sVXly9QVZPKQa6oXBdEyQK3jzwboZrH6feUtEc_y9u8FC95qR2ddMRdBIbtJBeN/exec";

    const formData = new URLSearchParams();
    formData.append("sleep", sleep);
    formData.append("sleepNum", sleepNum);
    formData.append("stress", stress);
    formData.append("pain", pain);
    formData.append("fatigue", fatigue);
    formData.append("note", note);

    try {
        await fetch(url, {
            method: "POST",
            body: formData,
            mode: "no-cors" 
        });

        console.log("Sent!");
    } catch (error) {
        console.error("Error:", error);
    }
}

// select pain area - hand, back, feet, etc
// work on mobile UI