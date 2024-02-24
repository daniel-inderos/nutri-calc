document.addEventListener("DOMContentLoaded", function() {
    const foodDatabase = {
        "Apple": 95,
        "Banana": 105,
        "Carrot": 25,
        "Donut": 195,
        "Egg": 78,
        "Fish": 206, // Assuming 3 oz of cooked salmon
        "Grapes": 62, // Per 100g
        "Hamburger": 354 // Average for a plain hamburger
    };

    function updateUnitSystem() {
        const unitSystem = document.getElementById('unitSystem').value;
        document.getElementById('metricSystem').style.display = unitSystem === 'metric' ? 'block' : 'none';
        document.getElementById('imperialSystem').style.display = unitSystem === 'imperial' ? 'block' : 'none';
    }

    function calculateCalories() {
        const unitSystem = document.getElementById('unitSystem').value;
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const goal = document.getElementById('goal').value;
        let weight, height;

        if (unitSystem === 'metric') {
            weight = parseFloat(document.getElementById('weightMetric').value);
            height = parseFloat(document.getElementById('heightMetric').value);
        } else {
            const feet = parseFloat(document.getElementById('heightFeet').value);
            const inches = parseFloat(document.getElementById('heightInches').value);
            height = feet * 30.48 + inches * 2.54;
            weight = parseFloat(document.getElementById('weightImperial').value) * 0.453592;
        }

        let bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
        let tdee = bmr * 1.55; // Assuming moderate activity level

        if (goal === 'lose') tdee -= 500;
        else if (goal === 'gain') tdee += 500;

        document.getElementById('recommendedCalories').textContent = `Recommended Daily Calories: ${Math.round(tdee)}`;
    }

    function addFoodToLocalStorage(foodName, calories) {
        let foodData = JSON.parse(localStorage.getItem('foodData')) || [];
        foodData.push({ name: foodName, calories });
        localStorage.setItem('foodData', JSON.stringify(foodData));
    }

    function loadFoodDataFromLocalStorage() {
        const foodData = JSON.parse(localStorage.getItem('foodData')) || [];
        foodData.forEach(item => addFoodToUI(item.name, item.calories));
    }

    function addFoodToUI(name, calories) {
        const list = document.getElementById('foodList');
        const entry = document.createElement('li');
        entry.textContent = `${name}: ${calories} calories`;
        list.appendChild(entry);
    }

    function autocompleteFoodInput() {
        const inputField = document.getElementById('foodName');
        const autocompleteList = document.getElementById('autocompleteList'); // Ensure this is in your HTML
        autocompleteList.innerHTML = ''; // Clear previous suggestions

        const input = inputField.value.toLowerCase();
        Object.keys(foodDatabase).forEach(food => {
            if (food.toLowerCase().includes(input) && input !== '') {
                const option = document.createElement('div');
                option.innerText = food;
                option.onclick = function() {
                    inputField.value = food;
                    document.getElementById('calories').value = foodDatabase[food];
                    autocompleteList.innerHTML = '';
                };
                autocompleteList.appendChild(option);
            }
        });
    }

    // Event Listeners
    document.getElementById('unitSystem').addEventListener('change', updateUnitSystem);
    document.getElementById('calculateCaloriesBtn').addEventListener('click', calculateCalories);
    document.getElementById('foodName').addEventListener('input', autocompleteFoodInput);
    document.getElementById('addFoodBtn').addEventListener('click', function() {
        const foodName = document.getElementById('foodName').value;
        const calories = document.getElementById('calories').value;
        if (foodName && calories) {
            addFoodToLocalStorage(foodName, parseInt(calories));
            addFoodToUI(foodName, parseInt(calories));
            document.getElementById('foodName').value = ''; // Clear the input after adding
            document.getElementById('calories').value = '';
        } else {
            alert("Please enter both a food name and its calories.");
        }
    });

    loadFoodDataFromLocalStorage(); // Load food diary entries from local storage
    updateUnitSystem(); // Set initial unit system view
});
