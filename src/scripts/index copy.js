let synth = new Tone.PolySynth().toDestination();
synth.set({oscillator: {type: "sine"}});

// =====================================================================

const keys = Array.from(document.getElementsByClassName("key"));
const keyPressed = {};

// Synth keys with mouse
document.addEventListener("mousedown", (e) => {
    const octave = getOctave();

    if (e.target.classList.contains("key")) {
        if(e.target.classList.contains("octave-key")) {
            synth.triggerAttack(e.target.dataset.note+String(octave + 1));
        } else {
            synth.triggerAttack(e.target.dataset.note+String(octave));
        }
        e.target.classList.add("active");
    }
});
document.addEventListener("mouseup", (e) => {
    const octave = getOctave();

    keys.forEach((key) => {
        if (key.classList.contains("active")) {
            key.classList.remove("active");
            if (key.classList.contains("octave-key")) {
                synth.triggerRelease(key.dataset.note + String(octave + 1));
            } else {
                synth.triggerRelease(key.dataset.note + String(octave));
            }
        }
    });
});

// Synth keys with keyboard
document.addEventListener("keydown", (e) => {
    const octave = getOctave();

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
    const octave = getOctave();
    
    keys.forEach((key) => {
        if (key.dataset.key === e.key) {
            if (key.classList.contains("active")) {
                key.classList.remove("active");
                keyPressed[key.dataset.key] = false;
                if (key.classList.contains("octave-key")) {
                    synth.triggerRelease(key.dataset.note + String(octave + 1));
                } else {
                    synth.triggerRelease(key.dataset.note + String(octave));
                }
            }
        }
    });
});

function getOctave() {
    return Number(document.getElementById("octave-value").textContent);
}

// =====================================================================

const octaveKeys = Array.from(document.getElementsByClassName("octave"));

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

// Select wave type

const waveKeys = Array.from(document.getElementsByClassName("waves"));

document.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("waves")) {
        synth.set({oscillator: {type: e.target.dataset.wave}});
        if (!e.target.classList.contains("active")) {
            waveKeys.forEach((key) => key.classList.remove("active"));
            e.target.classList.add("active");
            setVolume();
        }
    }
});

// =====================================================================

// Volume slider

const slider = document.getElementById("volume-slider");
const volumeValue = document.getElementById("volume-value");
volumeValue.textContent = slider.value;

slider.oninput = () => {
    volumeValue.textContent = slider.value;
    setVolume();
};

function setVolume() {
    let db = 50*Math.log10(slider.value/100);
    synth.volume.value = db;
}