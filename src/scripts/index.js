let synth = new Tone.Synth({oscillator: {type: "sine"}}).toDestination();
const keys = Array.from(document.getElementsByClassName("key"));
const octaveKeys = Array.from(document.getElementsByClassName("octave"));
const waveKeys = Array.from(document.getElementsByClassName("waves"));
const keyPressed = {};

//synth.volume.value = 0;

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
    keys.forEach((key) => {
        if (key.classList.contains("active")) {
            key.classList.remove("active");
            synth.triggerRelease();
        }
    });
});

// Synth keys with keyboard
document.addEventListener("keydown", (e) => {
    let octave = Number(document.getElementById("octave-value").textContent);

    keys.forEach((key) => {
        if (key.dataset.key == e.key && !keyPressed[key.dataset.key]) {
            if (key.classList.contains("octave-key")) {
                synth.triggerAttack(key.dataset.note + String(octave + 1));
            } else {
                synth.triggerAttack(key.dataset.note + String(octave));
            }
            key.classList.add("active");
            keyPressed[key.dataset.key] = true;
        }
    });
});
document.addEventListener("keyup", (e) => {
    keys.forEach((key) => {
        if (key.dataset.key === e.key) {
            if (key.classList.contains("active")) {
                key.classList.remove("active");
                synth.triggerRelease();
                keyPressed[key.dataset.key] = false;
            }
        }
    });
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
    octaveKeys.forEach((key) => {
        if(key.classList.contains("active")) {
            key.classList.remove("active");
        }
    });
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

document.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("waves")) {
        synth = new Tone.Synth({oscillator: {type: e.target.dataset.wave}}).toDestination();
        if (!e.target.classList.contains("active")) {
            waveKeys.forEach((key) => key.classList.remove("active"));
            e.target.classList.add("active");
        }
    }
});