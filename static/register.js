$(document).ready(function () {
    // Single Show/Hide Password Toggle
    $('#show-password-toggle').on('change', function () {
        let type = $(this).is(':checked') ? 'text' : 'password';
        $('#master_pass, #confirm_master_pass').attr('type', type); // Toggle both fields
    });



    // Password Strength Meter
    $('#master_pass').on('input', function () {
        let val = $(this).val();
        let strength = getPasswordStrength(val);

        // Update the strength bar
        updateMeter(strength.score);

        // Update the text indicator
        let strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
        let cappedScore = Math.min(strength.score, strengthLevels.length - 1); // Cap the score for levels
        $('#master-pass-strength-text').text("Strength: " + strengthLevels[cappedScore]);
    });

    function getPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^\w\s]/.test(password)) score++; // Special characters
        if (password.length >= 12) score++; // Extra score for length
        return { score: score };
    }

    function updateMeter(score) {
        const colors = ['red', 'orange', 'yellow', 'green', 'darkgreen'];
        const widths = ['20%', '40%', '60%', '80%', '100%'];

        score = Math.min(score, colors.length - 1);

        $('#master-pass-strength-meter').css({
            'background-color': colors[score],
            'width': widths[score]
        });
    }

// Password Generator Function
function generatePassword() {
    const length = 12; // Desired password length
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const allChars = lowerCase + upperCase + digits + specialChars;

    // Ensure at least one character from each required set
    let password = "";
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    // Fill the remaining characters randomly
    for (let i = 4; i < length; ++i) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the password to randomize character positions
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password;
}

// Suggest Password for Master Password
$('#suggest-master-pass').on('click', function () {
    const password = generatePassword();
    $('#master_pass').val(password).trigger('input'); // Trigger input for validation, if any
    $('#confirm_master_pass').val(password);

});
});
