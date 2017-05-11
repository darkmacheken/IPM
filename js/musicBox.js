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
}

function updateMusicVoter() {
    let musicHtml = "";
    for (let i = 0; i < SONGS.length; i++) {
        musicHtml += "<li class=\"box btn\" id=\"music-vote-btn-";
        musicHtml += String(i);
        musicHtml += "\"><div class=\"background-li-box-music\"></div><div class=\"musictitle\">";
        musicHtml += SONGS[i]._name;
        musicHtml += "</div><div class=\"musicartist\">";
        musicHtml += SONGS[i]._artist;
        musicHtml += "</div><div class=\"votessong\">";
        musicHtml += SONGS[i]._votes;
        musicHtml += " votos</div><div class=\"box musiccover\" style=\"background-image: url('";
        musicHtml += SONGS[i]._cover;
        musicHtml += "')\"></div></li>";
    }
    $("#box-music-vote-next ul").html(musicHtml);

    for (let i = 0; i < SONGS.length; i++) {
        $("#music-vote-btn-" + i).click(function () {
            ;
        });
    }
}
