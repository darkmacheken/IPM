var log_req_fields = {};
var reg_req_fields = {};

function callblock() {
	toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '1';
}

function turnoffblock() {
	toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '0';
}

function openWindow(id) {
	callblock();
	toggle_visibility(id);
}

function closeWindow(id) {
	toggle_visibility(id);
	turnoffblock();
}

function closeLoginWindow() {
	closeWindow("login-window");
	toggle_hidden("invalid-data");
}

function closeRegistarWindow() {
	document.getElementById("reg-form").reset();
	//checkField(document.getElementById('reg-uname-txtbx'));
	//checkField(document.getElementById('reg-pword-txtbx'));
	closeWindow("reg-window");
	toggle_inherit("reg-submit-disabler");
}
