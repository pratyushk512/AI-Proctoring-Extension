document.addEventListener('visibilitychange', () => {

    if (document.visibilityState === 'hidden') {
        console.log('Tab is now inactive.');

    } else if (document.visibilityState === 'visible') {
        console.log('Tab is now active.');
    }
    
});


window.addEventListener('focus', () => {
    console.log('Window is in focus.');
});

window.addEventListener('blur', () => {
    console.log('Window lost focus.');
});


document.addEventListener('copy', async (e) => {
    
    try {
        const copiedContent = await navigator.clipboard.readText();
        console.log('Copied content from clipboard:', copiedContent);
    } catch (err) {
        console.error('Failed to read clipboard content on copy:', err);
    }
});


document.addEventListener('paste', async (e) => {
    
    try {
        const pastedContent = await navigator.clipboard.readText();
        console.log('Pasted content from clipboard:', pastedContent);

        e.target.value = pastedContent; 
    } catch (err) {
        console.error('Failed to read clipboard content on paste:', err);
    }
});



document.addEventListener('cut', async (e) => {
    try {
        
        const cutContent = await navigator.clipboard.readText();
        console.log('Cut content from clipboard:', cutContent);

        
        const modifiedContent = cutContent.toUpperCase(); 
        await navigator.clipboard.writeText(modifiedContent);  

        console.log('Modified content has been written to clipboard');
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
    } else {
        console.log("Exited fullscreen mode");
    }
});


document.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
        if (document.fullscreenElement) {
            exitFullScreen();  
        } else {
            goFullScreen();   
        }
    }

    
    if (event.key === "Escape" && document.fullscreenElement) {
        exitFullScreen();
    }
});

