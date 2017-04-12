function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
	if (h < 10)
    	document.getElementById('clock').innerHTML =
    "0" + h + ":" + m + ":" + s;
	else
	 	document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function callblock() {
	toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '1';
}

function turnoffblock() {
	toggle_visibility('blocker');
	document.getElementById('blocker').zIndex = '0';
}

function openWindow(id){
	callblock();
	toggle_visibility(id);
}
function closeWindow(id){
	toggle_visibility(id);
	turnoffblock();
}

function closeLoginWindow(){
	closeWindow("login-window");
	toggle_hidden("invalid-data");
}
function checkLogin(){
	var username = document.getElementById("email-txtbx").value;
	var password = document.getElementById("password-txtbx").value;
	if (contas[username] == password) {
	} else {
		toggle_visible("invalid-data");
	}
}

function closeRegistarWindow(){
	document.getElementById("reg-form").reset();
	check_text_field('reg-email-txtbx');
	check_text_field('reg-password-txtbx');
	closeWindow("reg-window");
	toggle_inherit("reg-submit-disabler");
}

function registar(){
	var username = document.getElementById("reg-email-txtbx").value;
	var password = document.getElementById("reg-password-txtbx").value;
	var vegetarian = document.getElementById("reg-ra-veg").checked;
	var intlact = document.getElementById("reg-ra-intlact").checked;
	var intglut = document.getElementById("reg-ra-gluten").checked;
	if (is_hidden("reg-submit-disabler")) {
		console.log(is_hidden("reg-submit-disabler"));
		contas[username] = password;
		closeRegistarWindow();
	}
}
