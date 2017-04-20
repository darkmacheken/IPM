function callblock(zindex) {
    if(typeof zindex === "undefined") {
        zindex = '1';
    }
	$("#blocker").css("z-index", zindex).show();
}

function turnoffblock() {
    $("#blocker").css("z-index", '0').hide();
}

function openWindow(id, zindex) {
	callblock(zindex);
	$("#" + id).show();
}

function closeWindow(id) {
	$("#" + id).hide();
	turnoffblock();
}

function closeLoginWindow() {
	closeWindow("login-window");
	$("#invalid-data").hide();
    $("#login-form").trigger("reset");
}

function closeRegistarWindow() {
	closeWindow("reg-window");
    $("#reg-form").trigger("reset");
}

function confirmYesNo(text, yes, no) {
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
    openWindow("confirmYesNo", '19');
}

function confirmOk(text, ok) {
    $("#confirmOk .confirmText").html(text);
    $("#confirmOkbtn").off("click").click(function () {
        closeWindow("confirmOk");
        if(typeof ok === "function") {
            ok();
        }
    });
    /* zindex = 19 para colocar blocker à frente das janelas de login e registo */
    openWindow("confirmOk", '19');
}
