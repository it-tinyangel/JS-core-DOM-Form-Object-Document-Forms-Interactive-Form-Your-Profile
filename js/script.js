document.addEventListener('DOMContentLoaded', () => {
	const signUpForm = document.forms.signUpForm;
	const emailInput = document.getElementById('email');
	const emailErrorMessage = document.getElementById('emailErrorMessage');
	const agreeCheckbox = document.getElementById('confirmAgree');
	const signUpButton = document.getElementById('signUpBtn');
	const profileSection = document.querySelector('.user-profile-section');
	const signOutButton = document.getElementById('signOutBtn');

	function updateProfile() {
		const userName = `${signUpForm.firstName.value} ${signUpForm.lastName.value}`;
		const userEmail = signUpForm.email.value;
		const userPosition = signUpForm.postionChoose.value;
		const gender = document.querySelector('input[name="gender"]:checked').value;

		document.getElementById('userName').textContent = userName;
		document.getElementById('userEmail').textContent = userEmail;
		document.getElementById('userPosition').textContent = userPosition;

		// Show the appropriate profile image based on gender
		const profileImage = document.querySelector('.user-profile-image');
		profileImage.classList.toggle('user-profile-image--male', gender === 'Male');
		profileImage.classList.toggle('user-profile-image--female', gender === 'Female');

		profileImage.alt = gender === 'Male' ? 'The man in the picture' : 'The woman in the picture';

		profileImage.setAttribute('aria-label', gender === 'Male' ? 'The man in the picture' : 'The woman in the picture');
	}

	function signUpFormSubmit() {
		const firstName = signUpForm.firstName.value;
		const lastName = signUpForm.lastName.value;
		const email = signUpForm.email.value;
		const genderChecked = document.querySelector('input[name="gender"]:checked');
		const positionChoose = signUpForm.postionChoose.value;

		// Check if the form is empty
		const isFormEmpty = !firstName && !lastName && !email && !genderChecked && positionChoose === 'Choose' && !agreeCheckbox.checked;

		if (isFormEmpty) {
			alert('Fill in the form.');
			return;
		}

		// Check for empty fields
		if (!firstName || !lastName || !email || !genderChecked || positionChoose === 'Choose') {
			alert('Fill in all fields of the form.');
			return;
		}

		// Check if agreement is enabled
		if (!agreeCheckbox.checked) {
			alert('Please, agree to the confirm.');
			return;
		}

		// Display information about the user in the profile
		updateProfile();
		signUpForm.parentElement.classList.add('hidden');
		profileSection.classList.remove('hidden');
	}

	// Function to handle sign-out button click
	function signOut() {
		if (signUpForm.parentElement.classList.contains('hidden')) {
			signUpForm.parentElement.classList.remove('hidden');
			profileSection.classList.add('hidden');
			signUpForm.reset();

			hideInvalidEmailMessage();
		}
	}

	agreeCheckbox.addEventListener('change', () => {
		// Enable/disable the sign-up button based on the agreement checkbox
		signUpButton.disabled = !agreeCheckbox.checked;
	});

	// Event listener for the sign-up button click
	signUpButton.addEventListener('click', () => {
		signUpFormSubmit();
	});

	// Event listener for the sign-out button click
	signOutButton.addEventListener('click', () => {
		signOut();
	});

	// Function to check email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function showInvalidEmailMessage() {
		emailErrorMessage.textContent = 'Please enter a valid email address';
		emailErrorMessage.style.display = 'block';
	}

	function hideInvalidEmailMessage() {
		emailErrorMessage.textContent = '';
		emailErrorMessage.style.display = 'none';
	}

	// Checking the email format when has lost focus
	emailInput.addEventListener('blur', function () {
		const emailValue = this.value.trim();

		if (emailValue === '') {
			return;
		}

		const isValid = isValidEmail(emailValue);

		if (isValid) {
			hideInvalidEmailMessage();
		} else {
			showInvalidEmailMessage();
		}
	});
});
