console.log("welcome")
var index = 0;
var Currsong = new Audio();
var songs;
document.querySelector(".sidebar").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
    document.querySelector(".cross").style.opacity = "1";
    document.querySelector(".right").style.zIndex = "-1";
    document.querySelector(".left").style.width = "45%";

})
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
    // document.querySelector(".left").style.zindex= 4;
    document.querySelector(".cross").style.opacity = "0";
    document.querySelector(".right").style.zIndex = "0";
    document.querySelector(".left").style.width = "25%";
})

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds)) {
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let formattedMinutes = String(minutes);
    let formattedSeconds = String(remainingSeconds);
    while (formattedMinutes.length < 2) {
        formattedMinutes = "0" + formattedMinutes;
    }
    while (formattedSeconds.length < 2) {
        formattedSeconds = "0" + formattedSeconds;
    }
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function PlayMusic(songs, i) {
    // console.log("playing music")
    // console.log(songs)
    Currsong.src = songs[i];
    await Currsong.play();
    play.src = "/svg/pause.svg";
    let ele = songs[i]
    let q = 0;
    for (let j = 0; j < ele.length; j++) {
        if (ele[j] === "/") q = j;
    }
    ele = ele.substring(q + 1);
    ele = ele.replaceAll(".mp3", "");
    ele = ele.replaceAll("-", " ")
    ele = ele.replaceAll("%20", "")
    ele = ele.replaceAll("Copy", "")
    console.log(ele)
    document.querySelector(".songplaying").innerHTML = ele;
    document.getElementsByClassName("songplaying")[1].innerHTML =
        `${secondsToMinutesSeconds(Currsong.currentTime)}/${secondsToMinutesSeconds(Currsong.duration)}`;
    let volumebutton = document.querySelector(".volumecircle").getBoundingClientRect();
    console.log(volumebutton * 100)
    // Currsong.volume=
}
async function getSongs(folder) {
    // console.log("getting songs")
    let a = await fetch(`${folder}`)
    let p = await a.text();
    // console.log(p)
    let div = document.createElement("div")
    div.innerHTML = p;
    // console.log(div)
    let xx = div.getElementsByTagName("a")
    // console.log(xx)
    let songs = []
    for (let i = 0; i < xx.length; i++) {
        let ele = xx[i]
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href)
        }
    }
    let dinesh = document.querySelector(".s1");
    dinesh.innerHTML = ""
    for (let i = 0; i < songs.length; i++) {
        let ele = songs[i]
        let div = document.createElement("div");
        let q = 0;
        for (let j = 0; j < ele.length; j++) {
            if (ele[j] === "/") q = j;
        }
        ele = ele.substring(q + 1);
        ele = ele.replaceAll(".mp3", "");
        ele = ele.replaceAll("-", " ")
        ele = ele.replaceAll("%20", "")
        ele = ele.replaceAll("Copy", "")
        dinesh.innerHTML += `<div class="songlist" data="${songs[i]}">
        <div class="music"><img src="svg/music.svg" alt="music"></div>
        <div class="songname">${ele}</div>
        <div class="playsong"><img src="svg/playcopy.svg" alt=""></div>
    </div>
        `
    }
    // console.log(dinesh.innerHTML)
    // Currsong.src=songs[0];
    let ap= document.querySelector(".s1").children
    console.log(ap)
    for (let i = 0; i < ap.length; i++) {
        ap[i].addEventListener("click", () => {
            console.log(ap[i])
            Currsong.src = ap[i].getAttribute("data")
            for (let i = 0; i < songs.length; i++) {
                if (songs[i] == Currsong.src) {
                    index = i;
                    break;
                }
            }
            PlayMusic(songs, index)
        })
    }
    return songs
}

async function displayAlbums() {
    // console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    // console.log(div)
    let anchors = div.getElementsByTagName("a")
    // console.log(anchors)
    let cardContainer = document.querySelector(".cards")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        let e = array[index];
        e = e.href
        if (e.includes("/songs")) {
            // console.log(e)
            e = e.substring(e.indexOf("/songs") + 7)
            if (e.length <= 0) continue;
            let a = await fetch(`/songs/${e}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML += `<div class="x" data="${e}">
            <div class="card" data="${e}">
                <div class="cardimg" data="${e}">
                    <img src="/songs/${e}/cover.jpg" data="${e}"alt="cover">
                    <div class="play"data="${e}">
                        <div><img src="svg/play.svg" data="${e}" alt=""></div>
                    </div>
                </div>
                <div class="textcard">
                    <div>${response.title}</div>
                    <div class="extra3">${response.description}</div>
                </div>
            </div>
        </div>`

        }
    }
    // Load the playlist whenever card is clicked
    let cards = document.getElementsByClassName("x")
    for (let j = 0; j < cards.length; j++) {
        cards[j].addEventListener("click", async (e) => {
            let folder = e.target.getAttribute("data")
            let st = "/songs/" + folder + "/"
            console.log(st)
            songs = await getSongs(st)
            console.log(songs)
            PlayMusic(songs, 0)
        })
    }

}

async function main() {
    // await getSongs("/songs/shahjahan")
    await displayAlbums()
    // var songs= await getSongs("/songs/shahjahan");   
    
    previous.addEventListener("click", () => {
        Currsong.pause()
        console.log("Previous clicked")
        index = index - 1;
        if (index >= 0) {
            PlayMusic(songs, index);
        }
        if (index < -1) index = -1;
    })
    next.addEventListener("click", () => {
        Currsong.pause()
        console.log("next clicked")
        index = index + 1;
        if ((index) < songs.length) {
            PlayMusic(songs, index);
        }
        if (index > songs.length) index = songs.length;
    })
    play.addEventListener("click", () => {
        if (Currsong.paused) {
            PlayMusic(songs, index)
        }
        else {
            Currsong.pause();
            play.src = "/svg/playcopy.svg";
        }
    })
    // Add an event listener to seekbar
    document.querySelector(".line").addEventListener("click", e => {
        let width = document.querySelector(".control").offsetWidth
        let percent = (e.offsetX / width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".anotherline").style.width = (percent + 1) + "%";
        Currsong.currentTime = (percent / 100) * Currsong.duration
        // currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    // Time update
    Currsong.addEventListener("timeupdate", () => {
        // console.log(secondsToMinutesSeconds(Currsong.currentTime))
        // // console.log(Currsong.duration)
        let percent = (Currsong.currentTime / Currsong.duration) * 100;
        document.querySelector(".circle").style.left = (percent - 0.5) + "%";
        document.querySelector(".anotherline").style.width = percent + "%";
        document.getElementsByClassName("songplaying")[1].innerHTML =
            `${secondsToMinutesSeconds(Currsong.currentTime)}/${secondsToMinutesSeconds(Currsong.duration)}`
        if (Currsong.currentTime === Currsong.duration) {
            index = index + 1;
            PlayMusic(songs, index);
        }
    })
    //volume change
    document.querySelector(".volumerange").addEventListener("click", e => {
        let width = document.querySelector(".volumerange").offsetWidth
        let percent = parseInt((e.offsetX / width) * 100)
        document.querySelector(".volumecircle").style.left = percent + "%";
        document.querySelector(".volumeanotherline").style.width = (percent + 3) + "%";
        console.log("completed")
        Currsong.volume = (percent / 100)
    })
    // Add event listener to mute the track
    document.querySelector(".volumebutton>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            Currsong.volume = 0;
            document.querySelector(".volumecircle").style.left = 0 + "%";
            document.querySelector(".volumeanotherline").style.width = (0) + "%";
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            Currsong.volume = 1;
            document.querySelector(".volumecircle").style.left = 93 + "%";
            document.querySelector(".volumeanotherline").style.width = (100) + "%";
        }

    })
}
main()