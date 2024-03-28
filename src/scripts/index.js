const synth = new Tone.Synth({oscillator: {type: "sawtooth"}}).toDestination();
const keys = document.getElementsByClassName("key");
const octaveKeys = document.getElementsByClassName("octave");


// =====================================================================

// Synth keys with mouse
document.addEventListener("mousedown", (e) => {
    let octave = Number(document.getElementById("octave-value").textContent);

    if (!e.target.classList.contains("key")) {
        return;
    } else if(e.target.classList.contains("octave-key")) {
        synth.triggerAttack(e.target.dataset.note+String(octave+1));
    } else {
        synth.triggerAttack(e.target.dataset.note+String(octave));
    }
    e.target.classList.add("active");
});
document.addEventListener("mouseup", (e) => {
    for (let i = 0; i < keys.length; i++) {
        if(keys[i].classList.contains("active")) {
            keys[i].classList.remove("active");
            synth.triggerRelease();
        }
    }
});

// Synth keys with keyboard
document.addEventListener("keydown", (e) => {
    let octave = Number(document.getElementById("octave-value").textContent);

    for (let i = 0; i < keys.length; i++) {
        if (keys[i].dataset.key === e.key) {
            if (keys[i].classList.contains("octave-key")) {
                synth.triggerAttack(keys[i].dataset.note+String(octave+1));
            } else {
                synth.triggerAttack(keys[i].dataset.note+String(octave));
            }
            keys[i].classList.add("active");
        }
    }
});
document.addEventListener("keyup", (e) => {
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].dataset.key === e.key) {
            if (keys[i].classList.contains("active")) {
                keys[i].classList.remove("active");
                synth.triggerRelease();
            }
        }
    }
});

// =====================================================================

// Octave keys with mouse
document.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("octave")){
        if (e.target.id == "octave-up") {
            octaveUp();
        } else if (e.target.id == "octave-down") {
            octaveDown();
        }
    }
});
document.addEventListener("mouseup", (e) => {
    for (let i = 0; i < octaveKeys.length; i++) {
        if(octaveKeys[i].classList.contains("active")) {
            octaveKeys[i].classList.remove("active");
        }
    }
});

// Octave keys with keyboard
document.addEventListener("keydown", (e) => {
    if (e.key == "x") {
        octaveUp();
    } else if (e.key == "z") {
        octaveDown();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "x") {
        document.getElementById("octave-up").classList.remove("active");
    } else if (e.key == "z") {
        document.getElementById("octave-down").classList.remove("active");
    }
});

function octaveUp() {
    let octaveValue = document.getElementById("octave-value");
    octaveValue.innerText = String(Number(octaveValue.textContent)+1);
    document.getElementById("octave-up").classList.add("active");
}

function octaveDown() {
    let octaveValue = document.getElementById("octave-value");
    octaveValue.innerText = String(Number(octaveValue.textContent)-1);
    document.getElementById("octave-down").classList.add("active");
}

// =====================================================================


