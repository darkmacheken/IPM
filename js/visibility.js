function toggle_visibility(id) {
	var e = document.getElementById(id);
	if (e.style.visibility == 'visible')
        e.style.visibility = 'hidden';
	else
        e.style.visibility = 'visible';
}

function toggle_visible(id) {
	document.getElementById(id).style.visibility = 'visible';
}

function toggle_hidden(id) {
	document.getElementById(id).style.visibility = 'hidden';
}

function toggle_inherit(id) {
	document.getElementById(id).style.visibility = 'inherit';
}

function is_hidden(id) {
	return document.getElementById(id).style.visibility == 'hidden';
}
