document.addEventListener("DOMContentLoaded", function() {
    // Function to update the visibility of metric and imperial input fields
    window.updateUnitSystem = function() {
        const unitSystem = document.getElementById('unitSystem').value;
        document.getElementById('metricSystem').style.display = unitSystem === 'metric' ? 'block' : 'none';
        document.getElementById('imperialSystem').style.display = unitSystem === 'imperial' ? 'block' : 'none';
    };

    // Function to calculate the recommended daily calories
    window.calculateCalories = function() {
        const unitSystem = document.getElementById('unitSystem').value;
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const goal = document.getElementById('goal').value;
        let weight;
        let height;

        // Get the weight and height based on the unit system
        if (unitSystem === 'metric') {
            weight = parseFloat(document.getElementById('weightMetric').value);
            height = parseFloat(document.getElementById('heightMetric').value);
        } else {
            // Convert feet and inches to centimeters
            const feet = parseFloat(document.getElementById('heightFeet').value);
            const inches = parseFloat(document.getElementById('heightInches').value);
            height = feet * 30.48 + inches * 2.54;
            // Convert pounds to kilograms
            weight = parseFloat(document.getElementById('weightImperial').value) * 0.453592;
        }

        // Calculate BMR based on gender
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Assuming moderate activity level with a multiplier of 1.55
        let tdee = bmr * 1.55;

        // Adjust TDEE based on the user's goal
        if (goal === 'lose') {
            tdee -= 500; // Subtract 500 calories for weight loss
        } else if (goal === 'gain') {
            tdee += 500; // Add 500 calories for weight gain
        }

        document.getElementById('recommendedCalories').textContent = 'Recommended Daily Calories: ' + Math.round(tdee);
    };

    // Initial call to set the default unit system
    updateUnitSystem();
});
