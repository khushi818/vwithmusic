import {allmusic} from './music-list.js'

const container = document.querySelector('.container'),
musicimg = container.querySelector('.img-area img'),
musicName = container.querySelector('.song-details .name'),
musicArtist = container.querySelector('.song-details .artist'),
musicAudio = container.querySelector('#main-audio'),
playPauseBtn = container.querySelector('.play-pause'),
nextBtn = container.querySelector('#next'),
prevBtn = container.querySelector("#prev"),
progressarea = container.querySelector('.progress-area'),
progressBar = container.querySelector('.progress-bar'),
musicList = container.querySelector('.music-list'),
moreMusicBtn = container.querySelector('#more-music'),
closeMusicBtn = container.querySelector('.fa-close')


moreMusicBtn.addEventListener('click',() =>
{
 musicList.classList.toggle('show'); 
})

closeMusicBtn.addEventListener('click',() =>
{
musicList.classList.remove('show')
})

let musicIndex = 1;

window.addEventListener("load" , () =>
{
    loadMusic(musicIndex)
})

//load music function

function loadMusic(indexNumb)
{
    musicName.textContent = allmusic[indexNumb-1].name;
    musicArtist.textContent = allmusic[indexNumb - 1].artist;
    musicimg.textContent = allmusic[indexNumb - 1];
    musicAudio.src = `audio/${allmusic[indexNumb-1].src}.mp3`;
}

function playAudio() {
  if(container.classList.contains("paused"))
  { 
  container.classList.remove('paused'); 
  musicAudio.play();
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
  }
  else
  {
    container.classList.add('paused');
    musicAudio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; 
  }
}

function playit()
{
   container.classList.remove('paused'); 
  musicAudio.play();
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'   
}

function nextMusic()
{
    musicIndex === allmusic.length ? musicIndex = 1 : musicIndex++;
    musicIndex++;
    loadMusic(musicIndex)
    playit();
}

function prevMusic()
{
    musicIndex === 1 ? musicIndex = allmusic.length :musicIndex--;
    loadMusic(musicIndex)
    playit();
}

playPauseBtn.addEventListener('click',()=>
{
  playAudio();
})

nextBtn.addEventListener('click', () =>
{
    nextMusic();
})

prevBtn.addEventListener('click' ,() =>
{
    prevMusic();
})

//update progres bar

musicAudio.addEventListener('timeupdate',(e) =>
{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth  = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`
     
    let musicCurrentTime = container.querySelector('.current-time'),
    musicDuration = container.querySelector('.max-duration');

     musicAudio.addEventListener('loadeddata',()=>
    {
        //update song total duration
        
   
        let mainDuration = musicAudio.duration;
        let totalMin = Math.floor(mainDuration/60);
        let totalSec =  Math.floor(mainDuration % 60);
        if(totalSec < 10)
        {
            totalSec = `0${totalSec}`;
        }

        musicDuration.textContent = `${totalMin} : ${totalSec}`;
    })

     //current duration of song


        let CurrentMin = Math.floor(currentTime/60);
        let CurrentSec =  Math.floor(currentTime % 60);
        if(CurrentSec < 10)
        {
            CurrentSec = `0${CurrentSec}`;
        }

        musicCurrentTime.textContent = `${CurrentMin} : ${CurrentSec}`;

})


//update playing song current width on according to the progress bar

progressarea.addEventListener("click" ,(e) =>
{
    let progressWidth = progressarea.clientWidth;//getting width of the progressbar
    let clickOffSetX = e.offsetX;//getting offset X value
    let songDuration = musicAudio.duration; // getting song total duration

    musicAudio.currentTime = (clickOffSetX / progressWidth) * songDuration;
    playit();
 })

//change loop , shuffle , repeat icon onclick

const repeatBtn = container.querySelector("#repeat-plist");

repeatBtn.addEventListener('click',() =>
{
    if(repeatBtn.classList.contains('fa-repeat'))
    {
        repeatBtn.classList.remove('fa-repeat')   
        repeatBtn.classList.add('fa-shuffle')
    }
    else if(repeatBtn.classList.contains('fa-shuffle'))
    {
        repeatBtn.classList.remove('fa-shuffle')   
        repeatBtn.classList.add('fa-repeat')
    }   
        // <i class="fa-solid fa-shuffle"></i>

     musicAudio.addEventListener("ended",() =>
    {
    if(repeatBtn.classList.contains('fa-repeat'))
    {
        nextMusic();
    }
    else if(repeatBtn.classList.contains('fa-shuffle'))
    {
        let randIndex = Math.floor((Math.random() * allmusic.length) + 1)
        do{
            randIndex = Math.floor((Math.random() * allmusic.length) + 1)
        }while(musicIndex == randIndex);
        repeatBtn.classList.add('fa-repeat')
        repeatBtn.classList.remove('fa-shuffle')
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playit();
    }   
})   
})


// array list of music
const ulTags = container.querySelector("ul");

for(let i = 0 ; i < allmusic.length ; i++)
{
  let liTags = `<li>
                    <div class="row">
                        <span>${allmusic[i].name}</span>
                        <p>${allmusic[i].artist}</p>
                    </div>
                    <audio class ="${allmusic[i].src}" src="audio/${allmusic[i].src}.mp3"></audio>
                    <span id = "${allmusic[i].src}" class="audio-duration">1:45</span>
                </li>`;

   ulTags.insertAdjacentHTML('beforeend',liTags)
   


let  audioDurationTags = ulTags.querySelector(`#${allmusic[i].src}`);
let liAudioTag = ulTags.querySelector(`.${allmusic[i].src}`)

  liAudioTag.addEventListener('loadeddata' ,() =>
 {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);

    if(totalSec < 10)
    {
        totalSec = `0${totalSec}`;
    }

    audioDurationTags.textContent = `${totalMin} :${totalSec}`;
  })
}

// const allliTags = ulTags.querySelectorAll("li")

// function clicked(element)
// {
//     musicIndex = element.
//     loadMusic(musicIndex);
//     playit();
// }


