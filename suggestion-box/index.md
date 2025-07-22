---
layout: default
title: Suggestion Box
topdiv: container
---

# Suggestion Box

Have an idea for how to improve the DESCARTES Courses or its Course Sites? We use GitHub Issues to manage improvements to this service.

To make your suggestion, use the form below:
<!-- Load Google reCAPTCHA -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<script type="text/javascript">
const GITHUB_TOKEN = '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';
const REPO_OWNER = 'uhm-descartes';
const REPO_NAME = 'descartes-modules';
</script>

<div id="statusMessage" class="text-success" style="display:none;">Suggestion sent successfully.</div>
<div id="errorMessage" class="text-danger" style="display:none;">Suggestion sending failed.</div>

<form id="suggestionForm">
  <label for="name">Name:</label><span class="text-danger">*</span><br>
  <input type="text" id="name" name="user_name" required><br><br>

  <label for="email">Email:</label><span class="text-danger">*</span><br>
  <input type="email" id="email" name="user_email" required><br><br>

  <input type="checkbox" id="anonymous" name="anonymous">
  <label for="anonymous">Submit anonymously</label><br><br>

  <label for="suggestion">Your Suggestion:</label><span class="text-danger">*</span><br>
  <textarea id="suggestion" name="message" required rows="5" cols="40"></textarea><br><br>

  <!-- Google reCAPTCHA widget -->
  <div class="g-recaptcha" data-sitekey="6LcH3YsrAAAAAIYeuWJzR2ThDEw8-OJ2aZMAaiKJ"></div><br>


  <input type="submit" value="Submit">

  <input type="reset" value="Clear">
</form>

<script>
  const statMsg = document.getElementById('statusMessage');
  const errorMsg = document.getElementById('errorMessage');
  const form = document.getElementById('suggestionForm');
  const anon = document.getElementById('anonymous');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const suggestionField = document.getElementById('suggestion');

  async function createGitHubIssue(form) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
    // Issue details
    const issueData = {
      title: 'Suggestion',
      body: `${suggestionField.value}/n/n${nameField.value}/n${emailField.value}`,
      labels: ['suggestion'], // Optional: Add labels
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xhr.setRequestHeader("Authorization", `Bearer ${GITHUB_TOKEN}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Response:", xhr.responseText);
      } else {
        console.error('Failed to create issue:', xhr.status, xhr.responseText);
      }
    };

    const data = JSON.stringify(issueData);
    xhr.send(data);
  }

  anon.addEventListener('change', function () {
    if (this.checked) {
      nameField.value = 'Anonymous';
      emailField.value = 'anonymous@example.com';
      nameField.disabled = true;
      emailField.disabled = true;
    } else {
      nameField.value = '';
      emailField.value = '';
      nameField.disabled = false;
      emailField.disabled = false;
    }
  });

  // Function to hide status and error messages after 10 seconds
  function hideMessagesAfterDelay() {
    setTimeout(() => {
      statMsg.style.display = 'none';
      errorMsg.style.display = 'none';
    }, 10000); // 10 seconds
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Check if CAPTCHA was completed
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      errorMsg.textContent = 'Please complete the CAPTCHA.';
      errorMsg.style.display = 'block';
      return;
    }
    createGitHubIssue(this)
      .then(function() {
        console.log('Suggestion sent');
        statMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        grecaptcha.reset();
        hideMessagesAfterDelay(); // Hide success message after 10s
      }, function(error) {
        console.error('Failed to send', error);
        errorMsg.style.display = 'block';
        hideMessagesAfterDelay(); // Hide error message after 10s
      });
  });

form.addEventListener('reset', function(e) {
  e.preventDefault();
  statMsg.style.display = 'none';
  errorMsg.style.display = 'none';
  grecaptcha.reset(); // Reset CAPTCHA on form reset

});

</script>

An administrator will reply shortly, and you can check on the status of your suggestion through the associated issue.
