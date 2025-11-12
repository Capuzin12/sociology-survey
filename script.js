document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quiz-form');
  const submitButton = form.querySelector('.submit-btn');

  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfHiB-mlLYl1dHlalGfDlWF-RIuYs6_3YKfsCB5h4hWfr0msQ/formResponse';

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'ВІДПРАВКА...';

    const formData = new FormData(form);


    fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
      .then(() => {
        // 5. Показуємо подяку
        const container = document.querySelector('.container');
        container.innerHTML = `
                <h1 style="text-align: center; margin-top: 50px;">ДЯКУЄМО!</h1>
                <p class="description" style="text-align: center;">ВАШІ ВІДПОВІДІ ЗБЕРЕЖЕНО.</p>
            `;

        document.body.style.display = 'flex';
        document.body.style.minHeight = '100vh';
        document.body.style.alignItems = 'center';
        document.body.style.justifyContent = 'center';
      })
      .catch(error => {
        console.error('Помилка відправки:', error);
        alert('Сталася помилка. Будь ласка, спробуйте ще раз.');
        submitButton.disabled = false;
        submitButton.textContent = 'Завершити опитування';
      });
  });
});