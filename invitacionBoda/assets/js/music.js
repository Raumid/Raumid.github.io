const btnAudio = document.getElementById('btn-audio');
const musicPlayer = document.getElementById('musicPlayer');
const icon = document.getElementById('iconMusicPlayer');

btnAudio.addEventListener('click', () => {
    handlerMusicPlayer();
});

musicPlayer.addEventListener('ended', () => {
    musicPlayer.currentTime = 0;
    musicPlayer.play();
});

function handlerMusicPlayer() {
    icon.className = '';
    if(musicPlayer.paused) 
    {
        musicPlayer.play();
        icon.classList.add('fa', 'fa-pause')    
    }
    else 
    {
        musicPlayer.pause();
        icon.classList.add('fa', 'fa-play')
    }
}

