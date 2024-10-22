
	// Get modal element
	const modal = document.getElementById("myModal");

	// Get button that opens the modal
	const openModalBtn = document.getElementById("openModalBtn");

	// Get the <span> element that closes the modal
	const closeBtn = document.getElementsByClassName("close")[0];

	// Open modal when button is clicked
	openModalBtn.onclick = function() {
		modal.style.display = "block";
	}

	// Close the modal when <span> (x) is clicked
	closeBtn.onclick = function() {
		modal.style.display = "none";
	}

	// Close the modal when clicking outside of the modal content
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
