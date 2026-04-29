let stressValue;
let painValue;
let fatigueValue;
let sleepValueNum;
let sleepValue;
let noteText;
let handPainValue;
let backPainValue;
let feetPainValue;
let legPainValue;
let hipPainValue;
let headPainValue;
let stomachPainValue;

window.onload = function() {
    document.getElementById("painGuide").style.display = "none";
    document.getElementById("painInput").style.display = "none";
    document.getElementById("stressGuide").style.display = "none";
    document.getElementById("stressInput").style.display = "none";
    document.getElementById("fatigueGuide").style.display = "none";
    document.getElementById("fatigueInput").style.display = "none";
    document.getElementById("sleepInput").style.display = "none";
    document.getElementById("noteInput").style.display = "none";
    document.getElementById("skipButton").style.display = "none";
    document.getElementById("painLocation").style.display = "none";
    document.getElementById("painLocationSubmit").style.display = "none";
    document.getElementById("garfSays").style.display = "block";

    timeCheck();
}

function stressAsk() {
    document.getElementById("skipButton").style.display = "none";
    document.getElementById("sleepInput").style.display = "none";
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
    document.getElementById("skipButton").style.display = "none";
    document.getElementById("garfSays").innerText = "Okay.";

    await sleep(1000);

    stressAsk();
}

async function timeCheck() {
    sleepValue = ' ';
    sleepValueNum = ' ';
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
    await sleep(1000);
    if(time === "morning") {
        sleepAsk();
        return;
    }
    stressAsk();
}

async function stressWrong(){
    document.getElementById("circle").style.display = "none";
    document.getElementById("garfSays").innerText = "Try again.";
    await sleep(1000);
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
    await sleep(1000);
    }
    else{
    stressValue = parseInt(document.getElementById("stress").value);
    document.getElementById("garfSays").innerText = "Let's take " + stress + " deep breaths.";   
    await sleep(1000);
    }
    document.getElementById("garfSays").innerText = "Ready?";
    await sleep(1000);

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
    await sleep(1000);
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
    await sleep(1000);
    painCheck();
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
    await sleep(1000);
    painLocationCheck();
    }
}

async function painLocationCheck() {
    document.getElementById("garfSays").innerText = "Where do you feel pain?";
    document.getElementById("painLocation").style.display = "block";
    document.getElementById("painSubmit").style.display = "block";
    // skip button
}

async function painLocationActivity(painWhere, btn) {
    if(painWhere === 'hand'){
        handPainValue = handPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'back'){
        backPainValue = backPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'feet'){
        feetPainValue = feetPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'leg'){
        legPainValue = legPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'hip'){
        hipPainValue = hipPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'head'){
        headPainValue = headPainValue === 'O' ? ' ' : 'O';
    }
    else if(painWhere === 'stomach'){
        stomachPainValue = stomachPainValue === 'O' ? ' ' : 'O';
    }
    else{
        return;
    }
    
    btn.classList.toggle("selected");
}

async function painSubmit(){
    document.getElementById("painLocation").style.display = "none";
    document.getElementById("painLocationSubmit").style.display = "none";

    fatigueCheck();
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
    await sleep(1000);
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
    await sendToSheet(sleepValue, sleepValueNum, stressValue, painValue, fatigueValue, noteText, handPainValue, backPainValue, feetPainValue, legPainValue, hipPainValue, headPainValue, stomachPainValue);
    document.getElementById("garfSays").innerText = "Data sent successfully! Take care.";
}

async function sendToSheet(sleep, sleepNum, stress, pain, fatigue, note, hand, back, feet, leg, hip, head, stomach) {
    const url = "https://script.google.com/macros/s/AKfycbyUkU0NXO7Y79xZvbbhIWKjRoCgd68Qy9BXTGraRkzyaQYPsn6U8zVzdqEvN_3nHGcWnQ/exec";

    const formData = new URLSearchParams();
    formData.append("sleep", sleep);
    formData.append("sleepNum", sleepNum);
    formData.append("stress", stress);
    formData.append("pain", pain);
    formData.append("fatigue", fatigue);
    formData.append("note", note);
    formData.append("hand", hand);
    formData.append("back", back);
    formData.append("feet", feet);
    formData.append("leg", leg);
    formData.append("hip", hip);
    formData.append("head", head);
    formData.append("stomach", stomach);

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