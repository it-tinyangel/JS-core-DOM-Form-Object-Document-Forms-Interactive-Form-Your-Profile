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

	const { signOutButton } = elements;

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

	function isFormValid() {
		const { firstName, lastName, email, position, agreeCheckbox, signUpButton } = elements;
		const fieldsToCheck = [firstName, lastName, email];
		const isEmptyField = fieldsToCheck.some(field => field.value.trim() === '');

		if (isEmptyField) {
			displayErrorMessage('Please, fill in all fields of the form.');
			return false;
		}

		if (position.value === 'Choose') {
			displayErrorMessage('Please, choose one of the proposed options position.');
			return false;
		}

		if (!agreeCheckbox.checked) {
			displayErrorMessage('Please, fill in the form and agree to the terms and conditions.');
			return false;
		}

		signUpButton.disabled = !agreeCheckbox.checked;
		return true;
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
		form.reset();
	}

	function signOut() {
		const { profileSection } = elements;
		const isFormHidden = form.parentElement.classList.contains('hidden');

		if (isFormHidden) {
			form.parentElement.classList.remove('hidden');
			profileSection.classList.add('hidden');
			form.reset();
		}
	}

	form.addEventListener('submit', signUpFormSubmit);
	signOutButton.addEventListener('click', signOut);
});
