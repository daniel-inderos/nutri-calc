document.addEventListener("DOMContentLoaded", function() {
    const foodDatabase = {
        "Apple": 95,
        "Banana": 105,
        "Carrot": 25,
        "Donut": 195,
        "Egg": 78,
        "Fish": 206,
        "Grapes": 62,
        "Hamburger": 354,
    };

    // Ensure calculateCalories is defined in the global scope
    window.calculateCalories = function() {
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        const gender = document.getElementById('gender').value;
        const goal = document.getElementById('goal').value;

        let bmr;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        let tdee = bmr * 1.55; // Assuming moderate activity level

        switch (goal) {
            case "lose":
                tdee -= 500; // create a deficit for weight loss
                break;
            case "gain":
                tdee += 500; // create a surplus for weight gain
                break;
            // No adjustment for maintenance
        }

        document.getElementById('recommendedCalories').textContent = `Recommended Daily Calories: ${Math.round(tdee)}`;
    };

    window.addFood = function() {
        const foodInput = document.getElementById('food');
        const caloriesInput = document.getElementById('calories');
        const foodList = document.getElementById('foodList');

        const food = foodInput.value;
        const calories = caloriesInput.value;

        if (food && calories) {
            const listItem = document.createElement('li');
            listItem.textContent = `${food}: ${calories} calories`;
            foodList.appendChild(listItem);

            foodInput.value = '';
            caloriesInput.value = '';
        } else {
            alert('Please fill in both fields or select a food from the list.');
        }
    };

    function autocompleteFoodInput() {
        const foodInput = document.getElementById('food');
        const autocompleteList = document.getElementById('autocomplete-list');

        foodInput.addEventListener('input', function() {
            const inputValue = this.value.toLowerCase();
            autocompleteList.innerHTML = '';
            if (!inputValue) return;

            Object.keys(foodDatabase).forEach(food => {
                if (food.toLowerCase().startsWith(inputValue)) {
                    const suggestion = document.createElement('div');
                    suggestion.innerHTML = food;
                    suggestion.addEventListener('click', function() {
                        foodInput.value = this.innerText;
                        document.getElementById('calories').value = foodDatabase[food];
                        autocompleteList.innerHTML = '';
                    });
                    autocompleteList.appendChild(suggestion);
                }
            });
        });
    }

    autocompleteFoodInput();
});
