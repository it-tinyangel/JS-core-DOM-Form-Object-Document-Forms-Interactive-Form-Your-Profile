document.addEventListener('DOMContentLoaded', () => {
	const form = document.forms.signUpForm;

	const elements = {
		firstName: form.firstName,
		lastName: form.lastName,
		email: form.email,
		position: form.postionChoose,
		profileImage: document.querySelector('.user-profile-image'),
		emailErrorMessage: document.getElementById('emailErrorMessage'),
		agreeCheckbox: document.getElementById('confirmAgree'),
		signUpButton: document.getElementById('signUpBtn'),
		profileSection: document.querySelector('.user-profile-section'),
		signOutButton: document.getElementById('signOutBtn'),
	};

	const { signUpButton, signOutButton } = elements;

	function updateProfile() {
		const { firstName, lastName, email, position, profileImage } = elements;
		const userName = `${firstName.value} ${lastName.value}`;
		const userEmail = email.value;
		const userPosition = position.value;
		const gender = form.querySelector('input[name="gender"]:checked').value;

		document.getElementById('userName').textContent = userName;
		document.getElementById('userEmail').textContent = userEmail;
		document.getElementById('userPosition').textContent = userPosition;

		profileImage.classList.toggle('user-profile-image--male', gender === 'Male');
		profileImage.classList.toggle('user-profile-image--female', gender === 'Female');

		profileImage.alt = gender === 'Male'
			? 'The man in the picture'
			: 'The woman in the picture';

		profileImage.setAttribute('aria-label', gender === 'Male'
			? 'The man in the picture'
			: 'The woman in the picture');
	}

	function signUpFormSubmit(event) {
		const { position, profileSection } = elements;
		event.preventDefault();

		if (position.value === 'Choose') {
			alert('Please, choose one of the proposed options position.');
			return;
		}

		updateProfile();
		form.parentElement.classList.add('hidden');
		profileSection.classList.remove('hidden');
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

	signUpButton.addEventListener('click', (event) => {
		if (!elements.agreeCheckbox.checked) {
			alert('Please, fill in the form and agree to the terms and conditions.');
			event.preventDefault();
		} else {
			signUpFormSubmit();
		}
	});

	// function handleAgreeCheckboxChange() {
	// 	elements.signUpButton.disabled = !elements.agreeCheckbox.checked;
	// }

	form.addEventListener('submit', signUpFormSubmit);
	// elements.agreeCheckbox.addEventListener('change', handleAgreeCheckboxChange);
	signOutButton.addEventListener('click', signOut);
});
