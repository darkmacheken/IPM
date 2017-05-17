var musicPlaying = 0;
var nextMusic = 0;
var selectedVote = -1;

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
    let aux_sort = [];
    for (let i = 0; i < SONGS.length; i++)
        aux_sort.push(i);
    aux_sort.sort(function (a, b) { return SONGS[b]._votes - SONGS[a]._votes; });

    let musicHtml = "";
    for (let i = 0; i < aux_sort.length; i++) {
        if (aux_sort[i] === musicPlaying)
            continue;
        musicHtml += "<li class=\"box";
        if (aux_sort[i] !== selectedVote)
            musicHtml += " btn";
        musicHtml += "\" id=\"music-vote-btn-";
        musicHtml += String(aux_sort[i]);
        musicHtml += "\"><div class=\"background-li-box-music";
        if (aux_sort[i] === selectedVote)
            musicHtml += " selected";
        musicHtml += "\"></div><div class=\"musictitle";
        if (aux_sort[i] === selectedVote)
            musicHtml += " ";//FIXME
        musicHtml += "\">";
        musicHtml += SONGS[aux_sort[i]]._name;
        musicHtml += "</div><div class=\"musicartist\">";
        musicHtml += SONGS[aux_sort[i]]._artist;
        musicHtml += "</div><div class=\"votessong\">";
        musicHtml += SONGS[aux_sort[i]]._votes;
        musicHtml += " votos</div><div class=\"box musiccover\" style=\"background-image: url('";
        musicHtml += SONGS[aux_sort[i]]._cover;
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
    setTimeout(playSong, 1000 * SONGS[musicPlaying]._playtime);
    selectedVote = -1;
}
