document.addEventListener('DOMContentLoaded', () => {
	const form = document.forms.signUpForm;

	const elements = {
		firstName: form.firstName,
		lastName: form.lastName,
		email: form.email,
		position: form.positionChoose,
		profileImage: document.querySelector('.user-profile-image'),
		emailErrorMessage: document.getElementById('emailErrorMessage'),
		agreeCheckbox: document.getElementById('confirmAgree'),
		signUpButton: document.getElementById('signUpBtn'),
		profileSection: document.querySelector('.user-profile-section'),
		signOutButton: document.getElementById('signOutBtn'),
	};

	const { emailErrorMessage, email, signOutButton } = elements;

	function updateProfile() {
		const { firstName, lastName, email, position, profileImage } = elements;
		const userName = `${firstName.value} ${lastName.value}`;
		const userEmail = email.value;
		const userPosition = position.value;
		const gender = form.querySelector('input[name="gender"]:checked').value;
		const altText = `The ${gender.toLowerCase()} in the picture`;

		document.getElementById('userName').textContent = userName;
		document.getElementById('userEmail').textContent = userEmail;
		document.getElementById('userPosition').textContent = userPosition;

		profileImage.classList.toggle('user-profile-image--male', gender === 'Male');
		profileImage.classList.toggle('user-profile-image--female', gender === 'Female');

		profileImage.alt = altText;
		profileImage.setAttribute('aria-label', altText);
	}

	function displayErrorMessage(message) {
		alert(message);
	}

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

	function clearForm() {
		form.reset();
		hideInvalidEmailMessage();
	};

	function isFieldNotEmpty(field) {
		return field.value.trim() !== '';
	}

	function isFormValid() {
		const { firstName, lastName, email, position, agreeCheckbox, signUpButton } = elements;

		const fieldsToCheck = [firstName, lastName, email];
		const isAnyFieldEmpty = fieldsToCheck.some((field) => !isFieldNotEmpty(field));

		const gender = form.querySelector('input[name="gender"]:checked');

		if (isAnyFieldEmpty) {
			displayErrorMessage('Please, fill out all fields of the form.');
			return false;
		}

		if (!gender) {
			displayErrorMessage('Please, select a gender.');
			return false;
		}

		if (position.value === 'Choose') {
			displayErrorMessage('Please, select one of the options.');
			return false;
		}

		if (!agreeCheckbox.checked) {
			displayErrorMessage('Please, check agree to the terms and conditions.');
			return false;
		}

		signUpButton.disabled = !agreeCheckbox.checked;
		return true;
	}

	email.addEventListener('blur', checkAndShowEmail);
	form.addEventListener('submit', signUpFormSubmit);
	signOutButton.addEventListener('click', signOut);

	function checkAndShowEmail() {
		const emailValue = elements.email.value.trim();

		if (emailValue !== '') {
			isValidEmail(emailValue) ? hideInvalidEmailMessage() : showInvalidEmailMessage();
		}
	}

	function signUpFormSubmit(event) {
		const { profileSection } = elements;
		event.preventDefault();

		if (!isFormValid()) {
			return;
		}

		updateProfile();
		form.parentElement.classList.add('hidden');
		profileSection.classList.remove('hidden');
		clearForm();
	}

	function signOut() {
		const { profileSection } = elements;
		const isFormHidden = form.parentElement.classList.contains('hidden');

		if (isFormHidden) {
			form.parentElement.classList.remove('hidden');
			profileSection.classList.add('hidden');
			clearForm();
		}
	}
});
