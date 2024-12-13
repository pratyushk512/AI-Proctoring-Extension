import io from 'socket.io-client';

const socket = io('http://localhost:8000');
    console.log(socket)
    
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            console.log('Tab is now inactive.');
            socket.emit('tabVisibilityChanged', { state: 'inactive' });
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
        socket.emit('windowFocusChanged', { state: 'blur' });
    });

    
    document.addEventListener('copy', async (e) => {
        try {
            const copiedContent = await navigator.clipboard.readText();
            console.log('Copied content:', copiedContent);
            socket.emit('clipboardEvent', { action: 'copy', content: copiedContent });
        } catch (err) {
            console.error('Failed to read clipboard content on copy:', err);
        }
    });

    
    document.addEventListener('paste', async (e) => {
        try {
            const pastedContent = await navigator.clipboard.readText();
            console.log('Pasted content:', pastedContent);
            socket.emit('clipboardEvent', { action: 'paste', content: pastedContent });
        } catch (err) {
            console.error('Failed to read clipboard content on paste:', err);
        }
    });

    
    document.addEventListener('cut', async (e) => {
        try {
            const cutContent = await navigator.clipboard.readText();
            console.log('Cut content:', cutContent);
            socket.emit('clipboardEvent', { action: 'cut', content: cutContent });
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
            socket.emit('fullscreenChanged', { state: 'exited' });
        }
    });

    
    document.addEventListener("keydown", (event) => {
        if (event.key === "f" || event.key === "F") {
            if (document.fullscreenElement) {
                exitFullScreen();
                socket.emit('fullscreenChanged', { state: 'exited' });
            } else {
                goFullScreen();
                socket.emit('fullscreenChanged', { state: 'entered' });
            }
        }

        if (event.key === "Escape" && document.fullscreenElement) {
            exitFullScreen();
            socket.emit('fullscreenChanged', { state: 'exited' });
        }
    });
