/* Global variables - bwah ha ha! */
var raceTimeRadio;
var raceLapsRadio;
var formationLapCheckbox;
var cooldownLapCheckbox;
var raceTimeInput;
var raceTimeOutput;
var raceLapsInput;
var raceLapsOutput;
var averageLapTimeInput;
var averageLapTimeOutput;
var fuelPerLapInput;
var fuelPerLapOutput;
var totalFuelOutput;
var pitStopTimeInput;
var pitStopTimeOutput;
var pitStopCountInput;
var pitStopCountOutput;
var pitStopCountOutput2;
var maxRaceTimeInput;
var maxAverageLapTimeInput;
var maxFuelPerLapInput;

var vibrateTime = 50;

function calculateTotalFuel() {
    var laps = raceLapsInput.value;
    if (formationLapCheckbox.checked == true)
        laps ++;
    if (cooldownLapCheckbox.checked == true)
        laps ++;
    var fuelPerLap = fuelPerLapInput.value / 100;
    totalFuelOutput.innerHTML = `${(laps * fuelPerLap).toFixed(2)} litres`;
}

function calculateRaceLaps() {
    if (raceTimeRadio.checked == true) {      
        var raceTime = (raceTimeInput.value * 60);
        var pitStopTime = (pitStopTimeInput.value * pitStopCountInput.value);
        var laps = Math.ceil((raceTime - pitStopTime) / averageLapTimeInput.value);

        if (raceLapsRadio.checked == false) {
            // Set the max to 200 normally, but if necessary whatever it needs to go up to.
            if (laps > raceLapsInput.max || laps > 200)
                raceLapsInput.max = laps;
        }

        raceLapsInput.value = laps;
        setFormattedRaceLaps();
    }
}

function calculateRaceTime() {
    if (raceLapsRadio.checked == true) {      
        var time = Math.ceil((raceLapsInput.value * averageLapTimeInput.value) / 60);

        raceTimeInput.value = time;
        setFormattedRaceTime();
    }
}

function updateRaceTimeMax() {
    if (raceTimeRadio.checked == false) {
        // Set the max to 180 normally, but if necessary up to 24 hours.
        if (time > raceLapsInput.max || time > 180)
            raceLapsInput.max = time;
        if (time <= 180)
            raceLapsInput.max = 180;
    }
}

function setFormattedRaceLaps() {
    var laps = raceLapsInput.value;
    raceLapsOutput.innerHTML = `${laps} laps`;
    if (raceLapsRadio.checked == true) {
        if (laps> 200)
            raceLapsInput.max = laps; 
        else
            raceLapsInput.max = 200;
    }
    setRangeProgress(raceLapsInput);
}

function setFormattedRaceTime() {
    let hours = Math.floor(raceTimeInput.value / 60);
    let minutes = raceTimeInput.value % 60;
    
    raceTimeOutput.innerHTML = `${hours}h ${minutes}m`;
    setRangeProgress(raceTimeInput);
}

function setFormatedAverageLapTime() {
    let minutes = Math.floor(averageLapTimeInput.value / 60);
    let seconds = averageLapTimeInput.value % 60;
    
    averageLapTimeOutput.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setRangeProgress(averageLapTimeInput);
}

function setFormattedPitStopTime() {
    let minutes = Math.floor(pitStopTimeInput.value / 60);
    let seconds = pitStopTimeInput.value % 60;
    
    pitStopTimeOutput.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    setPitStopStyling();
    setRangeProgress(pitStopTimeInput);
}

function setFormattedPitStopCount() {
    pitStopCountOutput.innerHTML = `${pitStopCountInput.value} stops`;
    pitStopCountOutput2.innerHTML = `${pitStopCountInput.value} stops`;
    
    setRangeProgress(pitStopCountInput);
    setPitStopStyling();
}

function setPitStopStyling() {
    if (pitStopCountInput.value > 0) {
        pitStopCountOutput.classList.add("text-primary");
        pitStopCountOutput.classList.remove("text-secondary");
        pitStopCountOutput2.classList.add("text-primary");
        pitStopCountOutput2.classList.remove("text-secondary");
        pitStopTimeOutput.classList.add("text-primary");
        pitStopTimeOutput.classList.remove("text-secondary");
    }
    else {
        pitStopCountOutput.classList.add("text-secondary");
        pitStopCountOutput.classList.remove("text-primary");
        pitStopCountOutput2.classList.add("text-secondary");
        pitStopCountOutput2.classList.remove("text-primary");
        pitStopTimeOutput.classList.add("text-secondary");
        pitStopTimeOutput.classList.remove("text-primary");
    }
}

function setFormattedFuel() {
    fuelPerLapOutput.innerHTML = `${(fuelPerLapInput.value / 100).toFixed(2)} litres`;
    setRangeProgress(fuelPerLapInput);
}

function setRangeProgress(input) {
    var min = Number(input.min);
    var max = Number(input.max);
    var value = Number(input.value);
    var progress = ((value - min) / (max - min)) * 100;

    input.style.background = `linear-gradient(to right, ${input.disabled ? "rgb(136 131 131)" : "rgb(133 64 64)"} ${progress}%, rgb(52, 58, 64) ${progress}%)`;
}

function onMaxRaceTimeToggleSwitchClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    var max = (maxRaceTimeInput.checked == true ? 1440 : 180);
    raceTimeInput.max = max;
    if (raceTimeInput.value > max)
        raceTimeInput.value = max;
    setRangeProgress(raceTimeInput);
    setFormattedRaceTime();
    calculateRaceLaps();
    calculateTotalFuel();
}

function onMaxAverageLapTimeToggleSwitchClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    var max = (maxAverageLapTimeInput.checked == true ? 600 : 300);
    averageLapTimeInput.max = max;
    if (averageLapTimeInput.value > max)
        averageLapTimeInput.value = max;
    setRangeProgress(averageLapTimeInput);
    setFormatedAverageLapTime();
    calculateRaceLaps();
    calculateRaceTime();
    calculateTotalFuel();
}

function onMaxFuelPerLapToggleSwitchClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    var max = (maxFuelPerLapInput.checked == true ? 2500 : 500);
    fuelPerLapInput.max = max;
    if (fuelPerLapInput.value > max)
        fuelPerLapInput.value = max;
    setRangeProgress(fuelPerLapInput);
    setFormattedFuel();
    calculateTotalFuel();
}

function onFormationLapToggleSwitchClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    calculateTotalFuel();
}

function onCooldownLapToggleSwitchClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    calculateTotalFuel();
}

function onRaceTypeClicked() {
    if (navigator.vibrate)
        navigator.vibrate(vibrateTime);

    raceTimeInput.disabled = raceLapsRadio.checked;
    raceTimeOutput.disabled = raceLapsRadio.checked;
    raceLapsInput.disabled = raceTimeRadio.checked;
    raceLapsOutput.disabled = raceTimeRadio.checked;
    
    calculateRaceLaps();
    calculateRaceTime();

    setFormattedRaceLaps();
    setFormattedRaceTime();
}

function initialise() {
    // Get all the global variables from the markup.
    raceTimeRadio = document.getElementById("race-time");
    raceLapsRadio = document.getElementById("race-laps");
    formationLapCheckbox = document.getElementById("formation-lap");
    cooldownLapCheckbox = document.getElementById("cooldown-lap");
    raceTimeInput = document.getElementById("race-time-input");
    raceTimeOutput = document.getElementById("race-time-output");
    raceLapsInput = document.getElementById("race-laps-input");
    raceLapsOutput = document.getElementById("race-laps-output");
    fuelPerLapInput = document.getElementById("fuel-per-lap-input");
    fuelPerLapOutput = document.getElementById("fuel-per-lap-output");
    averageLapTimeInput = document.getElementById("average-lap-time-input");
    averageLapTimeOutput = document.getElementById("average-lap-time-output");
    totalFuelOutput = document.getElementById("total-fuel-output");
    pitStopTimeInput = document.getElementById("pit-stop-time-input");
    pitStopTimeOutput = document.getElementById("pit-stop-time-output");
    pitStopCountInput = document.getElementById("pit-stop-count-input");
    pitStopCountOutput = document.getElementById("pit-stop-count-output");
    pitStopCountOutput2 = document.getElementById("pit-stop-count-output2");
    maxRaceTimeInput = document.getElementById("max-race-time");
    maxAverageLapTimeInput = document.getElementById("max-average-lap-time"); 
    maxFuelPerLapInput = document.getElementById("max-fuel-per-lap");

    initialiseInputChanges();
    
    // Reload on update available "reload" clicked.
    document.getElementById('reload').addEventListener('click', function() {
        newWorker.postMessage({ action: 'skipWaiting' });
    });
}

function initialiseInputChanges() {
    let myEvents = "change input".split(" ");

    myEvents.forEach(event => {
        raceLapsInput.addEventListener(event, (e) => { 
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
        
            setFormattedRaceLaps(); 
            calculateRaceTime();
            calculateTotalFuel();
        }, false);
    });
    myEvents.forEach(event => {
        raceTimeInput.addEventListener(event, (e) => { 
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
        
            setFormattedRaceTime(); 
            calculateRaceLaps();
            calculateTotalFuel();
        }, false);
    });
    myEvents.forEach(event => {
        averageLapTimeInput.addEventListener(event, (e) => {
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
         
            setFormatedAverageLapTime(); 
            calculateRaceLaps();
            calculateRaceTime();
            calculateTotalFuel();
        }, false);
    });
    myEvents.forEach(event => {
        fuelPerLapInput.addEventListener(event, (e) => { 
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
        
            setFormattedFuel(); 
            calculateTotalFuel();
        }, false);
    });
    myEvents.forEach(event => {
        pitStopTimeInput.addEventListener(event, (e) => { 
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
        
            setFormattedPitStopTime(); 
            calculateRaceLaps();
            calculateTotalFuel();
        }, false);
    });
    myEvents.forEach(event => {
        pitStopCountInput.addEventListener(event, (e) => { 
            if (navigator.vibrate)
                navigator.vibrate(vibrateTime);
        
            setFormattedPitStopCount(); 
            calculateRaceLaps();
            calculateTotalFuel();
        }, false);
    });

    onRaceTypeClicked();

    setFormattedRaceLaps();
    setFormattedRaceTime();
    setFormattedFuel();
    setFormatedAverageLapTime();
    setFormattedPitStopCount();
    setFormattedPitStopTime();
    calculateRaceLaps();
    calculateRaceTime();
    calculateTotalFuel();
}

function showUpdateAvailable() {
    var updateAvailable = document.getElementById("update-available");
    var dataInput = document.getElementById("data-input");
    var dataOutput = document.getElementById("data-output");

    updateAvailable.classList.remove("display-none");
    dataInput.classList.add("display-none");
    dataOutput.classList.add("display-none");
}