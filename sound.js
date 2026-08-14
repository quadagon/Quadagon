/**
 * Quadagon Audio Engine & Focus BGM Manager
 * High Quality Audio for Chess Actions & Deep Concentration Background Music
 */

const QuadagonAudio = (function() {
    // Audio assets from standard chess CDNs
    const SOUND_URLS = {
        move: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/move-self.mp3',
        capture: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/capture.mp3',
        check: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/move-check.mp3',
        gameStart: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/game-start.mp3',
        gameEnd: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/game-end.mp3',
        correct: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/notify.mp3',
        wrong: 'https://images.chesscomfiles.com/chess-themes/sounds/standard/illegal.mp3',
        // Pleasant Ambient Focus Track
        bgm: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
    };

    const audioCache = {};
    let bgmAudio = null;
    let isMuted = false;
    let isBgmPlaying = false;

    // Preload sound effects
    function init() {
        for (const [key, url] of Object.entries(SOUND_URLS)) {
            if (key === 'bgm') continue; // Handle BGM separately
            const audio = new Audio(url);
            audio.preload = 'auto';
            audioCache[key] = audio;
        }

        // Initialize Focus BGM
        bgmAudio = new Audio(SOUND_URLS.bgm);
        bgmAudio.loop = true;
        bgmAudio.volume = 0.25; // Soft background volume for deep focus
    }

    function playSound(type) {
        if (isMuted) return;
        if (audioCache[type]) {
            const sound = audioCache[type].cloneNode(); // Allows rapid overlapping sounds
            sound.volume = 0.85;
            sound.play().catch(e => console.log("Audio play blocked by browser:", e));
        }
    }

    function toggleBGM() {
        if (!bgmAudio) return false;
        if (isBgmPlaying) {
            bgmAudio.pause();
            isBgmPlaying = false;
        } else {
            bgmAudio.play().then(() => {
                isBgmPlaying = true;
            }).catch(e => {
                console.log("BGM play user interaction required:", e);
                isBgmPlaying = false;
            });
        }
        return isBgmPlaying;
    }

    function setBgmVolume(val) {
        if (bgmAudio) {
            bgmAudio.volume = Math.max(0, Math.min(1, val));
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted && bgmAudio) {
            bgmAudio.pause();
            isBgmPlaying = false;
        }
        return isMuted;
    }

    // Initialize on script load
    init();

    return {
        playMove: () => playSound('move'),
        playCapture: () => playSound('capture'),
        playCheck: () => playSound('check'),
        playGameStart: () => playSound('gameStart'),
        playGameEnd: () => playSound('gameEnd'),
        playCorrect: () => playSound('correct'),
        playWrong: () => playSound('wrong'),
        toggleBGM: toggleBGM,
        setBgmVolume: setBgmVolume,
        toggleMute: toggleMute,
        isBgmPlaying: () => isBgmPlaying
    };
})();
