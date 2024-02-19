/**
 * @fileOverview This JavaScript file is responsible for handling all inputs and JavaScript elements of madone-template.html.
 * @version 1.0.0
 * @author Dillan Victory <dillanrvictory@gmail.com>
 * This utilized mutliple code pieces from events and sensors https://devweb3000.cis.strath.ac.uk/~aes02112/317/eventsandsensors/
 * A part of the course work provided materials
 */

/*jshint esversion: 6 */
/* jshint node: true */
/**
 * Used for simple application of 'normal' and 'bold' text types.
 * @type {string}
 */
const bold = "font-weight: bold", normal = "font-weight: normal";
/**
 * timeV is used to access, and edit, the 'time' paragraph within madone-template.html
 * @type {HTMLElement}
 */
let timeV = document.getElementById('time');
/**
 * distanceV is used to access, and edit, the 'distance' paragraph within madone-template.html
 * @type {HTMLElement}
 */
let distanceV = document.getElementById('distance');
/**
 * paceV is used to access, and edit, the 'pace' paragraph within madone-template.html
 * @type {HTMLElement}
 */
let paceV = document.getElementById('pace');

/**
 * timeSelected is used to determine if the '|' indicator is required at the end of the 'time' paragraph.
 * @type {boolean}
 */
let timeSelected = false;
/**
 * distanceSelected is used to determine if the '|' indicator is required at the end of the 'distance' paragraph.
 * @type {boolean}
 */
let distanceSelected = true;
console.log("Loaded: %cmadone.js%c", bold, normal);

/**
 * @returns void
 * @description a setter that uses 'localStorage' to store persistent caches/cookies of the text contents of timeV, distanceV, and paceV.
 */
function cacheInput() {
    "use strict";
    localStorage.setItem('time', timeV.textContent);
    localStorage.setItem('distance', distanceV.textContent);
    localStorage.setItem('pace', paceV.textContent);
    console.log("Variables cached.");
}

/**
 * @returns void
 * @description a getter that retrieves previously stored text contents of timeV, distanceV, and paceV from 'localStorage'.
 */
function getCachedInput() {
    "use strict";
    const timeC = localStorage.getItem('time');
    const distanceC = localStorage.getItem('distance');
    const paceC = localStorage.getItem('pace');
    console.log("Time pulled from cache: " + timeC);
    console.log("Distance pulled from cache: " + distanceC);
    console.log("Pace pulled from cache: " + paceC);
    //These perform checks just incase the user has never accessed the site before.
    if (timeC !== null) {
        timeV.textContent = timeC;
    }
    if (distanceC !== null) {
        distanceV.textContent = distanceC;
    }
    if (paceC !== null) {
        paceV.textContent = paceC;
    }

    return {timeC, distanceC, paceC}
}

//performing the get just incase the user has visited before.
getCachedInput();

/**
 * @returns void
 * @param n - used to check which  calculator button was pressed.
 * @description determines which calculator button/action was pressed then executes a corresponding sub-function. Performs calculate() if conditions are met.
 */
function sortCalculatorInput(n) {
    "use strict";
    //Which button was pressed...
    console.log("sortCalculatorInput(" + n + ") has been called.");

    /**
     * @description a function to avoid code duplication.
     */
    function clearIndicator() {
        distanceV.textContent = distanceV.textContent.replace("|", "");
        timeV.textContent = timeV.textContent.replace("|", "");
        distanceV.style.color = "white";
        timeV.style.color = "white";
    }

    /**
     * @description performs an equation using 'time' and 'distance' to determine 'pace' in minutes/km.
     */
    function calculate() {
        //console.log("calculate() has been called.");
        clearIndicator();
        const kmTotal = distanceV.textContent / 1000;
        const mpk = timeV.textContent / kmTotal;

        paceV.textContent = mpk.toFixed(0) + " minutes/km";
        //checks which row the user has active...
        if (timeSelected) {
            timeSelect();
        } else if (distanceSelected) {
            distanceSelect();
        }
        //console.log("calculate() has finished.");
    }

    /**
     *@description adds '|' to the end of 'time' to indicate to the user that it is selected. Calls clearIndicator() to reframe from duplicate '|'.
     */
    function timeSelect() {
        clearIndicator();
        timeV.textContent += '|';
        timeV.style.color = "yellow";
    }

    /**
     * @description adds '|' to the end of 'distance' to indicate to the user that it is selected. Calls clearIndicator() to reframe from duplicate '|'.
     */
    function distanceSelect() {
        clearIndicator();
        distanceV.textContent += '|';
        distanceV.style.color = "yellow";
    }

    /**
     * @description is called if the user has selected the 'time' row.
     */
    function timeRow() {
        clearIndicator();
        if (timeV.textContent.length <= 2) {
            if (timeV.textContent === '0') {
                timeV.textContent = n;
            } else {
                timeV.textContent += n;
            }
        } else {
            console.log("The max character length of time is 3.");
        }
        timeSelect();

    }

    /**
     * @description is called if the user has selected the 'distance' row.
     */
    function distanceRow() {
        clearIndicator();

        if (distanceV.textContent.length <= 4) {
            if (distanceV.textContent === '0') {
                distanceV.textContent = n;
            } else {
                distanceV.textContent += n;
            }
        } else {
            console.log("The max character length of distance is 5.");
        }
        distanceSelect();
    }

    //A series of logic checkers which determine which button has been pressed by the user...
    if (n === 't') {
        console.log("Time row selected. Indicated by '|'");
        timeSelected = true;
        distanceSelected = false;
        timeSelect();
        distanceV.textContent = distanceV.textContent.replace("|", "");
    } else if (n === 'd') {
        console.log("Distance row selected. Indicated by '|'");
        distanceSelected = true;
        timeSelected = false;
        distanceSelect();
        timeV.textContent = timeV.textContent.replace("|", "");
        //'c' is a clear operator for the row selected.
    } else if (n === 'c') {
        if (timeSelected) {
            timeV.textContent = '0|';
            distanceV.textContent = '0';
        } else {
            distanceV.textContent = '0|';
            timeV.textContent = '0';
        }
        paceV.textContent = '--';
        //'b' is a backspace operator for the row selected.
    } else if (n === 'b') {
        distanceV.textContent = distanceV.textContent.replace("|", "");
        timeV.textContent = timeV.textContent.replace("|", "");

        if (timeSelected) {
            if (timeV.textContent.length > 1) {
                timeV.textContent.substring(0, length - 1);
                timeV.textContent = timeV.textContent.substring(0, timeV.textContent.length - 1);
                timeSelect();
            } else {
                timeV.textContent = '0|';
            }
        } else if (distanceSelected) {
            if (distanceV.textContent.length > 1) {
                distanceV.textContent.substring(0, length - 1);
                distanceV.textContent = distanceV.textContent.substring(0, distanceV.textContent.length - 1);
                distanceSelect();
            } else {
                distanceV.textContent = '0|';
            }
        }

    } else {
        if (timeSelected) {
            timeRow();
        } else if (distanceSelected) {
            distanceRow();
        }

    }

    if (parseInt(distanceV.textContent) >= 10 && parseInt(timeV.textContent) >= 5) {
        console.log("calculate() conditions met.");
        calculate();
    } else {
        paceV.textContent = '--';
        console.log("calculate() conditions not yet met:\n%c'time' (the top row) must be greater than or equal to 5.\n'distance' (the middle row) must be greater than or equal to 10.%c", normal, bold);
    }
    //Each time a button is pressed the cache is updated to reflect changes. Putting this inside calculate makes more sense but the project outline asked simply to retain the user's inputs across browser sessions.
    cacheInput();

    return {distanceSelect}

}


// Helper function to calculate distance between two points using the Haversine formula
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var R = 6371; // Earth radius in km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns distance in kilometers
}

let isTracking = false;
let startLocation = null;
let distanceTravelled = 0;
let startTime = null;
let trackingId = null;

document.getElementById('startStopButton').addEventListener('click', function() {
    if (!isTracking) {
        // Start tracking
        this.textContent = 'Stop';
        this.style.backgroundColor = 'red';
        document.getElementById('liveDistance').style.display = 'block';
        document.getElementById('averagePace').style.display = 'block';

        isTracking = true;
        distanceTravelled = 0;
        startTime = new Date();

        navigator.geolocation.getCurrentPosition(position => {
            startLocation = position;
            trackingId = navigator.geolocation.watchPosition(onPositionUpdate, onError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }, onError);
    } else {
        // Stop tracking
        this.textContent = 'Start';
        this.style.backgroundColor = 'green';
        isTracking = false;
        navigator.geolocation.clearWatch(trackingId);
        // Reset display values
        document.getElementById('liveDistance').style.display = 'none';
        //document.getElementById('liveDistance').textContent = 'Live Distance: 0 m';
        document.getElementById('averagePace').style.display = 'none';
        //document.getElementById('averagePace').textContent = 'Average Pace: -- mins/km';

    }
});

function onPositionUpdate(position) {
    if (startLocation) {
        let currentLocation = position;
        let distance = calculateHaversineDistance(startLocation.coords.latitude, startLocation.coords.longitude, currentLocation.coords.latitude, currentLocation.coords.longitude);

        // a threshold for movement (0.01 km or 10 meters)
        //if (distance > 0.01) {
        if (distance > 0.005) {
            distanceTravelled += distance;
            startLocation = currentLocation; // Update start location for next distance calculation
        }

        document.getElementById('liveDistance').textContent = `Live Distance: ${distanceTravelled.toFixed(2)} km`;

        let elapsedTime = (new Date() - startTime) / 60000; // convert ms to minutes
        let pace = elapsedTime / distanceTravelled; // minutes per km
        document.getElementById('averagePace').textContent = `Average Pace: ${pace.toFixed(2)} mins/km`;
    }
}

function onError(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}


/*
 Sample code for University of Strathclyde Mobile App Development.
 Developed by Mark Dunlop for in-class usage - no warranty or guarantees given.

 This work is licensed under the Creative Commons Attribution 4.0 International License.
 To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ .

 This code can be freely used so long as attribution is made to "Mark Dunlop University of Strathclyde"
 This code can also be included in submissions of coursework for CS317 without declaration.

 CC-BY 2021
 */
// Global variable to store the current Beta value Below is the incline code
let currentBeta = 0;
let isFirstOrientationEvent = true; // Flag to track the first orientation event

// Function to format the beta value
const r0f = x => {
    let f = Math.round(x);
    return (f >= 0 ? "+" : "-") + ("00" + Math.abs(f)).slice(-3);
};

// Function to handle device orientation event
const handleDeviceOrientation = function(event) {
    let b = event.beta; // Extracting the Beta value
    currentBeta = b; // Update the global Beta value

    if (isFirstOrientationEvent) {
        displayIncline(); // Display incline on the first event
        isFirstOrientationEvent = false; // Reset flag so this only happens once
    }
};

// Function to fetch the current beta value
function getCurrentBetaValue() {
    return currentBeta; // Return the most recent Beta value
}

function displayIncline() {
    const beta = getCurrentBetaValue(); // Fetch the current beta value dynamically

    const radians = beta * (Math.PI / 180); // Convert degrees to radians
    const gradient = Math.tan(radians) * 100; // Convert to percentage
    let inclineText = `◬ Incline: ${Math.abs(gradient).toFixed(2)}% `;
    inclineText += gradient > 0 ? "uphill" : "downhill";
    inclineText += ` (${beta.toFixed(2)}°) ◬`;

    document.getElementById('inclinePrompt').innerText = inclineText;

    setTimeout(() => {
        document.getElementById('inclinePrompt').innerText = "◬ Tap to show incline ◬";
    }, 30000); // Reset after 30 seconds
}

function requestOrientationPermissionAndDisplayIncline() {
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === "granted") {
                    isFirstOrientationEvent = true; // Reset flag to true as we're starting fresh
                    window.addEventListener("deviceorientation", handleDeviceOrientation);
                    // No need to call displayIncline here as it will be called on the first orientation event
                } else {
                    alert("Permission to access device orientation was denied.");
                }
            })
            .catch(console.error);
    } else {
        isFirstOrientationEvent = true; // Assume permission is granted automatically
        window.addEventListener("deviceorientation", handleDeviceOrientation);
        // No direct call to displayIncline, rely on first orientation event
    }
}

// Element to display the output
let p_o;

// Initialization function
const init = function() {
    p_o = document.getElementById("onscreenconsole"); // Get the element to display the output
    document.getElementById('inclinePrompt').onclick = requestOrientationPermissionAndDisplayIncline; // Bind action to inclinePrompt click
    //p_o.innerHTML = "Waiting..."; // Initial message
    //Since
    //timeV.style.color = "yellow";

    if (distanceSelected) {
        distanceV.style.color = "yellow";
        distanceV.style.backgroundColor = "grey";
        distanceV.textContent = distanceV.textContent.replace("|", "");
        timeV.textContent = timeV.textContent.replace("|", "");
        distanceV.textContent += '|';
        //sortCalculatorInput('').distanceSelect();
    }


};

// Call the init function when the page is loaded
window.addEventListener("DOMContentLoaded", init);
