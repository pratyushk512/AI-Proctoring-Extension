import io from 'socket.io-client';

let tabVisibilityCount = 0;
let windowFocusCount = 0;
let copyCount = 0;
let pasteCount = 0;
let cutCount = 0;
let fullscreenCount = 0;

const socket = io('http://localhost:8000');
console.log(socket);


let typingStartTime = 0;
let typingCharacterCount = 0;
let typingInterval;

const calculateTypingSpeed = () => {
    const typingTimeInMinutes = (Date.now() - typingStartTime) / 60000; 
    const wordsTyped = typingCharacterCount / 5; 
    const typingSpeed = Math.round(wordsTyped / typingTimeInMinutes);

    console.log(`Typing Speed: ${typingSpeed} words per minute`);
    socket.emit('typeSpeed', { speed: typingSpeed, ID: socket.id });
    
    typingStartTime = Date.now();
    typingCharacterCount = 0;
};


const startTypingSpeedTracker = () => {
    typingStartTime = Date.now();
    typingCharacterCount = 0;

    typingInterval = setInterval(() => {
        calculateTypingSpeed();
    }, 20000); 
};

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        console.log('Tab is now inactive.');
        tabVisibilityCount++;
        socket.emit('tabVisibilityChanged', { state: 'inactive', count: tabVisibilityCount, ID: socket.id });
    } else if (document.visibilityState === 'visible') {
        console.log('Tab is now active.');
        socket.emit('tabVisibilityChanged', { state: 'active' });
    }
});

window.addEventListener('focus', () => {
    console.log('Window is in focus.');
    socket.emit('windowFocusChanged', { state: 'focus' });
});

window.addEventListener('blur', () => {
    console.log('Window lost focus.');
    windowFocusCount++;
    socket.emit('windowFocusChanged', { state: 'blur', count: windowFocusCount, ID: socket.id });
});

document.addEventListener('copy', async (e) => {
    try {
        const copiedContent = await navigator.clipboard.readText();
        console.log('Copied content:', copiedContent);
        copyCount++;
        socket.emit('copyEvent', { action: 'copy', content: copiedContent, count: copyCount, ID: socket.id });
    } catch (err) {
        console.error('Failed to read clipboard content on copy:', err);
    }
});

document.addEventListener('paste', async (e) => {
    try {
        const pastedContent = await navigator.clipboard.readText();
        console.log('Pasted content:', pastedContent);
        pasteCount++;
        socket.emit('pasteEvent', { action: 'paste', content: pastedContent, count: pasteCount, ID: socket.id });
    } catch (err) {
        console.error('Failed to read clipboard content on paste:', err);
    }
});

document.addEventListener('cut', async (e) => {
    try {
        const cutContent = await navigator.clipboard.readText();
        console.log('Cut content:', cutContent);
        cutCount++;
        socket.emit('cutEvent', { action: 'cut', content: cutContent, count: cutCount, ID: socket.id });
    } catch (err) {
        console.error('Failed to read clipboard content on cut:', err);
    }
});

function goFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        console.log("Entered fullscreen mode");
        socket.emit('fullscreenChanged', { state: 'entered' });
    } else {
        console.log("Exited fullscreen mode");
        fullscreenCount++;
        socket.emit('fullscreenChanged', { state: 'exited', count: fullscreenCount, ID: socket.id });
    }
});

document.addEventListener("keydown", (event) => {
    
    typingCharacterCount++; 

    if (typingStartTime === 0) {
        startTypingSpeedTracker(); 
    }

    if (event.key === "F") {
        if (document.fullscreenElement) {
            exitFullScreen();
            socket.emit('fullscreenChanged', { state: 'exited' });
        } else {
            goFullScreen();
            fullscreenCount++;
            socket.emit('fullscreenChanged', { state: 'exited', count: fullscreenCount, ID: socket.id });
        }
    }

    if (event.key === "Escape" && document.fullscreenElement) {
        exitFullScreen();
        fullscreenCount++;
        socket.emit('fullscreenChanged', { state: 'exited', count: fullscreenCount, ID: socket.id });
    }
});
