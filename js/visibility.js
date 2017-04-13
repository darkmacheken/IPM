function toggle_visibility(id) {
    window.alert("A USAR TOGGLE ANTIGO");
	var e = document.getElementById(id);
	if (e.style.visibility == 'visible')
        e.style.visibility = 'hidden';
	else
        e.style.visibility = 'visible';
}

function toggle_visible(id) {
    window.alert("A USAR TOGGLE VISIBLE ANTIGO");
	document.getElementById(id).style.visibility = 'visible';
}

function toggle_hidden(id) {
    window.alert("A USAR TOGGLE HIDDEN ANTIGO");
	document.getElementById(id).style.visibility = 'hidden';
}

function toggle_inherit(id) {
    window.alert("A USAR TOGGLE INHERIT ANTIGO");
	document.getElementById(id).style.visibility = 'inherit';
}

function is_hidden(id) {
    window.alert("A USAR IS HIDDEN ANTIGO");
	return document.getElementById(id).style.visibility == 'hidden';
}
