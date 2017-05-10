windowPosition = {
    DEFAULT : -1,
    TOP_LEFT : 100,
    TOP_RIGHT : 200,
    BOTTOM_LEFT : 300,
    BOTTOM_RIGHT : 400,
    MIDDLE : 500,
}

function callblock(zindex) {
    if(typeof zindex === "undefined") {
        zindex = '1';
    }
	$("#blocker").css("z-index", zindex).show();
}

function turnoffblock() {
    $("#blocker").css("z-index", '0').hide();
}

function openWindow(id, pos, zindex) {
    callblock(zindex);
    if (currScreen === 3) {
        let totalWidth = $("#blocker").width();
        let totalHeight = $("#blocker").height();
        let wWidth = $("#" + id).width();
        let wHeight = $("#" + id).height();
        switch (pos) {
            case windowPosition.DEFAULT:
                break;
            case windowPosition.TOP_LEFT:
                $("#" + id).css("left","30px").css("top","30px");
                break;
            case windowPosition.TOP_RIGHT:
                $("#" + id).css("left", totalWidth - wWidth - 30 + "px").css("top","30px");
                break;
            case windowPosition.BOTTOM_LEFT:
                $("#" + id).css("left","30px").css("top", totalHeight - wHeight - 30 + "px");
                break;
            case windowPosition.BOTTOM_RIGHT:
                $("#" + id).css("left", totalWidth - wWidth - 30 + "px").css("top", totalHeight - wHeight - 30 + "px");
                break;
            case windowPosition.MIDDLE:
                $("#" + id).css("left", ((totalWidth - wWidth) / 2) + "px").css("top", ((totalHeight - wHeight) / 2) + "px");
                break;
            default:
                console.log("Erro ao definir posição da janela.");
        }
    }
	$("#" + id).show();
}

function closeWindow(id) {
	$("#" + id).hide();
	turnoffblock();
}

function closeLoginWindow() {
    if (currScreen === 3) {
        closeWindow("login-window-thirdScreen");
    	$("#invalid-data-thirdScreen").hide();
        $("#login-form-thirdScreen").trigger("reset");
    }
    else {
        closeWindow("login-window");
    	$("#invalid-data").hide();
        $("#login-form").trigger("reset");
    }
}

function closeRegistarWindow() {
    if (currScreen === 3) {
        closeWindow("reg-window-thirdScreen");
        $("#reg-form-thirdScreen").trigger("reset");
    }
    else {
        closeWindow("reg-window");
        $("#reg-form").trigger("reset");
    }
}

function confirmYesNo(text, pos, yes, no) {
    $("#confirmYesNo .confirmText").html(text);
    $("#confirmYesbtn").off("click").click(function () {
        closeWindow("confirmYesNo");
        if(typeof yes === "function") {
            yes();
        }
    });
    $("#confirmNobtn").off("click").click(function () {
        closeWindow("confirmYesNo");
        if(typeof no === "function") {
            no();
        }
    });
    /* zindex = 19 para colocar blocker à frente das janelas de login e registo */
    openWindow("confirmYesNo", pos, '19');
}

function confirmOk(text, pos, ok) {
    $("#confirmOk .confirmText").html(text);
    $("#confirmOkbtn").off("click").click(function () {
        closeWindow("confirmOk");
        if(typeof ok === "function") {
            ok();
        }
    });
    /* zindex = 19 para colocar blocker à frente das janelas de login e registo */
    openWindow("confirmOk", pos, '19');
}
