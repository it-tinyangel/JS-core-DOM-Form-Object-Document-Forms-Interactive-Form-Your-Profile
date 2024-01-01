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

	function updateProfile() {
		const userName = `${elements.firstName.value} ${elements.lastName.value}`;
		const userEmail = elements.email.value;
		const userPosition = elements.position.value;
		const gender = form.querySelector('input[name="gender"]:checked').value;

		document.getElementById('userName').textContent = userName;
		document.getElementById('userEmail').textContent = userEmail;
		document.getElementById('userPosition').textContent = userPosition;

		elements.profileImage.classList.toggle('user-profile-image--male', gender === 'Male');
		elements.profileImage.classList.toggle('user-profile-image--female', gender === 'Female');

		elements.profileImage.alt = gender === 'Male'
			? 'The man in the picture'
			: 'The woman in the picture';

		elements.profileImage.setAttribute('aria-label', gender === 'Male'
			? 'The man in the picture'
			: 'The woman in the picture');
	}

	function signUpFormSubmit(event) {
		event.preventDefault();

		form.parentElement.classList.add('hidden');
		elements.profileSection.classList.remove('hidden');

		updateProfile();
	}

	function signOut() {
		const isFormHidden = form.parentElement.classList.contains('hidden');

		if (!isFormHidden) {
			form.parentElement.classList.add('hidden');
			elements.profileSection.classList.add('hidden');
			form.reset();
		}
	}

	function handleAgreeCheckboxChange() {
		elements.signUpButton.disabled = !elements.agreeCheckbox.checked;
	}

	form.addEventListener('submit', signUpFormSubmit);
	elements.agreeCheckbox.addEventListener('change', handleAgreeCheckboxChange);
	elements.signOutButton.addEventListener('click', signOut);
});
