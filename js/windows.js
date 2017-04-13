var log_req_fields = {};
var reg_req_fields = {};

function callblock() {
	$("#blocker").css("z-index", '1').show();
    /*toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '1';*/
}

function turnoffblock() {
    $("#blocker").css("z-index", '0').hide();
	/*toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '0';*/
}

function openWindow(id) {
	callblock();
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
	//checkField(document.getElementById('reg-uname-txtbx'));
	//checkField(document.getElementById('reg-pword-txtbx'));
	closeWindow("reg-window");
    $("#reg-form").trigger("reset");
	//toggle_inherit("reg-submit-disabler");
}
