var musicPlaying = 0;
var nextMusic = 0;
var selectedVote = -1;
var songTimeLeft = 0;

function prepareMusicBox() {
    $("#votemusic").click(function () {
        $(this).hide();
        $("#box-games").hide();
        $("#box-music-vote-next").show();
        $("#music-vote-next-hide").show();
        updateMusicVoter();
    });

    $("#music-vote-next-hide").click(function () {
        $(this).hide();
        $("#box-music-vote-next").hide();
        $("#votemusic").show();
        $("#box-games").show();
    });

    for (let i = 0; i < SONGS.length; i++) {
        SONGS[i]._votes = Math.floor(Math.random() * 5);
        if (SONGS[i]._votes > SONGS[nextMusic]._votes)
            nextMusic = i;
    }

    playSong();
}

function updateMusicBox() {
    $("#cover").css("background-image", "url('" + SONGS[musicPlaying]._cover + "')");
    $("#playing-song-name").text(SONGS[musicPlaying]._name);
    $("#playing-artist-name").text(SONGS[musicPlaying]._artist);
}

function updateMusicVoter() {
    let musicHtml = "";
    for (let i = 0; i < SONGS.length; i++) {
        if (i === musicPlaying)
            continue;
        musicHtml += "<li class=\"box";
        if (i !== selectedVote)
            musicHtml += " btn";
        musicHtml += "\" id=\"music-vote-btn-";
        musicHtml += String(i);
        musicHtml += "\"><div class=\"background-li-box-music";
        if (i === selectedVote)
            musicHtml += " selected";
        musicHtml += "\"></div><div class=\"musictitle";
        if (i === selectedVote)
            musicHtml += " selectedColor";
        musicHtml += "\">";
        musicHtml += SONGS[i]._name;
        musicHtml += "</div><div class=\"musicartist";
        if (i === selectedVote)
            musicHtml += " selectedColor";
        musicHtml += "\">";
        musicHtml += SONGS[i]._artist;
        musicHtml += "</div><div class=\"votessong\">";
        musicHtml += SONGS[i]._votes;
        musicHtml += " votos</div><div class=\"box musiccover";
        if (i === selectedVote)
            musicHtml += " selectedBorderColor";
        musicHtml += "\" style=\"background-image: url('";
        musicHtml += SONGS[i]._cover;
        musicHtml += "')\"></div></li>";
    }
    $("#box-music-vote-next ul").html(musicHtml);

    for (let i = 0; i < SONGS.length; i++) {
        if (i === musicPlaying && i === selectedVote)
            continue;

        $("#music-vote-btn-" + i).click(function () {
            SONGS[i]._votes++;
            //$("#music-vote-next-hide").click();
            if (selectedVote >= 0)
                SONGS[selectedVote]._votes--;
            selectedVote = i;
            updateMusicVoter();
            evaluateNextSong();
        });
    }
}

function evaluateNextSong() {
    for (let i = 0; i < SONGS.length; i++) {
        if (i !== musicPlaying && SONGS[i]._votes > SONGS[nextMusic]._votes)
            nextMusic = i;
    }
}

function playSong() {
    musicPlaying = nextMusic;
    SONGS[musicPlaying]._votes = 0;
    evaluateNextSong();
    updateMusicBox();
    setTimeout(playingSong, 1000);
    songTimeLeft = SONGS[musicPlaying]._playtime;
    $("#progress-bar").width("0%");
    //$("#progress-bar").animate({width: "100%"}, 1000 * songTimeLeft, "linear");
    updateSongTimeLeft();
    selectedVote = -1;
}

function playingSong() {
    songTimeLeft--;
    var percentage = 100- Math.floor(songTimeLeft/SONGS[musicPlaying]._playtime*100);
    $("#progress-bar").width(String(percentage) + "%");
    if (songTimeLeft <= 0)
        setTimeout(playSong, 1000);
    else
        setTimeout(playingSong, 1000);
    updateSongTimeLeft();
}

function updateSongTimeLeft() {
    $(".musicTimeLeft").text("-" + formatTime(songTimeLeft));
}
