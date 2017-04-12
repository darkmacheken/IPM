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
