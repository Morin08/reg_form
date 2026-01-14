document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    //  SECTION A: REGISTRATION PAGE LOGIC
    // ==========================================
    const regForm = document.getElementById("registrationForm");

    // Only run this code if we are on the Registration Page
    if (regForm) {
        // Safely get elements (returns null if not found)
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const phone = document.getElementById("phone");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const email = document.querySelector('input[type="email"]');
        
        const firstNameError = document.getElementById("firstNameError");
        const lastNameError = document.getElementById("lastNameError");
        const phoneError = document.getElementById("phoneError");
        const passError = document.getElementById("passError");

        // Helper: Validate Name (Only runs if element exists)
        function setupNameValidation(input, errorMsg) {
            if (input && errorMsg) {
                input.addEventListener("input", () => {
                    const lettersOnly = /^[A-Za-z\s]*$/;
                    if (!lettersOnly.test(input.value)) {
                        input.classList.add("invalid");
                        errorMsg.style.display = "block";
                    } else {
                        input.classList.remove("invalid");
                        errorMsg.style.display = "none";
                    }
                });
            }
        }

        // Apply Validations safely
        setupNameValidation(firstName, firstNameError);
        setupNameValidation(lastName, lastNameError);

        // Phone Validation
        if (phone && phoneError) {
            phone.addEventListener("input", () => {
                if (phone.value.length > 11) phone.value = phone.value.slice(0, 11);
                
                if (phone.value.length > 0 && phone.value.length !== 11) {
                    phone.classList.add("invalid");
                    phoneError.style.display = "block";
                } else {
                    phone.classList.remove("invalid");
                    phoneError.style.display = "none";
                }
            });
        }

        // Submit Logic
        regForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            // Check Passwords
            if (password && confirmPassword && passError) {
                if (password.value !== confirmPassword.value) {
                    isValid = false;
                    confirmPassword.classList.add("invalid");
                    passError.style.display = "block";
                    alert("Passwords do not match");
                } else {
                    confirmPassword.classList.remove("invalid");
                    passError.style.display = "none";
                }
            }

            // Check Phone length
            if (phone && phone.value.length !== 11) {
                isValid = false;
                alert("Phone must be 11 digits");
            }

            if (isValid) {
                // Save to Local Storage
                if(email && password && firstName) {
                    const userData = {
                        email: email.value,
                        password: password.value,
                        name: firstName.value
                    };
                    localStorage.setItem("user", JSON.stringify(userData));
                    alert("Registration Successful! Redirecting...");
                    window.location.href = "index.html";
                } else {
                    alert("Error: Some fields are missing in the HTML.");
                }
            }
        });
    }

    // ==========================================
    //  SECTION B: LOGIN PAGE LOGIC
    // ==========================================
    const loginForm = document.getElementById("loginForm");

    // Only run this code if we are on the Login Page
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const loginEmailInput = document.getElementById("loginEmail");
            const loginPassInput = document.getElementById("loginPassword");

            if (loginEmailInput && loginPassInput) {
                const loginEmail = loginEmailInput.value;
                const loginPass = loginPassInput.value;
                
                // Retrieve User
                const storedUser = JSON.parse(localStorage.getItem("user"));

                if (storedUser && loginEmail === storedUser.email && loginPass === storedUser.password) {
                    alert("Login Successful! Welcome " + storedUser.name);
                } else {
                    alert("Invalid Email or Password. Please Register first.");
                }
            } else {
                console.error("Login inputs not found in HTML");
            }
        });
    }

});
