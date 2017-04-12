var loggedIn = false;
var contas={}
var reg1ht = false;
var reg2ht = false;

function toggle_visibility(id) {
	var e = document.getElementById(id);
	if (e.style.visibility == 'visible') e.style.visibility = 'hidden';
	else e.style.visibility = 'visible';
}

function toggle_visible(id) {
	document.getElementById(id).style.visibility = 'visible';
}

function toggle_hidden(id){
	document.getElementById(id).style.visibility = 'hidden';
}

function toggle_inherit(id){
	document.getElementById(id).style.visibility = 'inherit';
}

function is_hidden(id) {
	return document.getElementById(id).style.visibility == 'hidden';
}

function check_text_field(id) {
	obj=document.getElementById(id);
	if (obj.type == "text") {
		console.log(this.value);
		if (obj.value == "")
			reg1ht = false;
		else
			reg1ht = true;
	} else {
		if (obj.value == "")
			reg2ht = false;
		else
			reg2ht = true;
	}
	console.log(reg1ht);
	console.log(reg2ht);
	if (reg1ht && reg2ht) {
		toggle_hidden("reg-submit-disabler");
	} else {
		toggle_visible("reg-submit-disabler");
	}
}
