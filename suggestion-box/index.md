---
layout: default
title: Suggestion Box
topdiv: container
---

# Suggestion Box

Have an idea for how to improve the DESCARTES Courses or its Course Sites? We use GitHub Issues to manage improvements to this service.

To make your suggestion, use the form below:

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY",
      });
   })();
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

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(function() {
        console.log('Suggestion sent');
        statMsg.style.display = 'block';
      }, function(error) {
        console.error('Failed to send', error);
        errorMsg.style.display = 'block';
      });
  });

form.addEventListener('reset', function(e) {
  e.preventDefault();
  statMsg.style.display = 'none';
  errorMsg.style.display = 'none';
});

</script>

An administrator will reply shortly, and you can check on the status of your suggestion through the associated issue.
