'use strict'
window.onload = function() {
    const piano = document.querySelector('.piano'),
        pianoKeys = document.querySelectorAll('.piano-key'),
        btnContainer = document.querySelector('.btn-container'),
        btnNotes = document.querySelector('.btn-notes'),
        btnLetters = document.querySelector('.btn-letters'),
        fullscreen = document.querySelector('.fullscreen');
    function playAudio(src) {
        const sound = new Audio();
        sound.src = src;
        sound.currentTime = 0;
        sound.play();
    }
    function clickPiano(event) {
        if (event.target.classList.contains('piano-key')) {
            const note = event.target.dataset.note,
                asset = `assets/audio/${note}.mp3`;
            playAudio(asset);
            event.target.classList.add('piano-key-active')
            event.target.classList.add('piano-key-active-pseudo')
        }
    }
    function removeActiveMouse(event) {
        if (event.target.classList.contains('piano-key-active')) {
            event.target.classList.remove('piano-key-active');
            event.target.classList.remove('piano-key-active-pseudo');
        }
    }
    function keybordPiano(event) {
        if (event.repeat) {
            return;
        }
        pianoKeys.forEach((e)=> {
            const key = event.code.slice(3);
            if (e.classList.contains('piano-key-active')) {
                return;
            }
            if (e.dataset.letter == key) {
                e.classList.add('piano-key-active')
                const note = e.dataset.note;
                const asset = `assets/audio/${note}.mp3`;
                playAudio(asset);
            }
        });
    }
    function removeActiveKey(event) {
        pianoKeys.forEach((e)=> {
            const key = event.code.slice(3);
            if (e.dataset.letter == key && e.classList.contains('piano-key-active')) {
                e.classList.remove('piano-key-active');
            }
        });
    }
    function switchNoteLatter(event) {
        if (event.target.classList.contains('btn-notes')) {
            btnLetters.classList.remove('btn-active');
            btnNotes.classList.add('btn-active');
            pianoKeys.forEach((e)=> {
                e.classList.remove('letter')
            });
        }
        if (event.target.classList.contains('btn-letters')) {
            btnNotes.classList.remove('btn-active');
            btnLetters.classList.add('btn-active');
            pianoKeys.forEach((e)=> {
                e.classList.add('letter')
            });
        }
    }
    function fullscreenToggle() {
        if (!document.fullscreenElement) {
            document.querySelector('.fullscreen').classList.add('openedfullscreen');
            document.documentElement.requestFullscreen();
          } else {
              document.querySelector('.fullscreen').classList.remove('openedfullscreen');
              document.exitFullscreen();
          }
    }
    
    piano.addEventListener('mousedown', clickPiano);

    piano.addEventListener('mousedown', (event)=> {
        if (event.target.classList.contains('piano-key')) {
            piano.addEventListener('mouseover', clickPiano)
        }
    });

    window.addEventListener('mouseup', (event)=> {
        removeActiveMouse(event);
        piano.removeEventListener('mouseover', clickPiano);
    });

    piano.addEventListener('mouseout', removeActiveMouse);

    window.addEventListener('keydown', keybordPiano);

    window.addEventListener('keyup', removeActiveKey);

    btnContainer.addEventListener('click', switchNoteLatter)

    fullscreen.addEventListener('click', fullscreenToggle);

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          document.querySelector('.fullscreen').classList.add('openedfullscreen');
        } else {
            document.querySelector('.fullscreen').classList.remove('openedfullscreen');
        }
      });
}