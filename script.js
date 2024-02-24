document.addEventListener("DOMContentLoaded", function() {
    // Mini food database for calorie lookup
    const foodDatabase = {
        "Apple": 95,
        "Banana": 105,
        "Carrot": 25,
        "Donut": 195,
        "Egg": 78,
        "Fish": 206, // Average calories for 100g of cooked salmon
        "Grapes": 62, // Calories per 100g
        "Hamburger": 254 // Average calories for a basic hamburger
    };

    // Load food diary from Local Storage
    loadFoodDataFromLocalStorage();

    // Attach event listener to the unit system selector
    document.getElementById('unitSystem').addEventListener('change', updateUnitSystem);

    // Attach event listener to the "Calculate Calories" button
    document.getElementById('calculateCaloriesBtn').addEventListener('click', calculateCalories);

    // Attach event listener to the "Add Food" button
    document.getElementById('addFoodBtn').addEventListener('click', function() {
        const foodName = document.getElementById('foodName').value;
        // Use the food database for calorie lookup; fallback to manual input if not found
        const calories = foodDatabase[foodName] ? foodDatabase[foodName] : parseInt(document.getElementById('calories').value);

        if (foodName && calories) {
            addFoodToLocalStorage(foodName, calories);
            addFoodToUI(foodName, calories);
            document.getElementById('foodName').value = ''; // Clear the food name input
            document.getElementById('calories').value = ''; // Clear the calories input
        } else {
            alert("Please enter both a food name and its calories.");
        }
    });

    // Initialize the unit system based on user selection
    updateUnitSystem();
});

function updateUnitSystem() {
    const unitSystem = document.getElementById('unitSystem').value;
    document.getElementById('metricSystem').style.display = unitSystem === 'metric' ? 'block' : 'none';
    document.getElementById('imperialSystem').style.display = unitSystem === 'imperial' ? 'block' : 'none';
}

function calculateCalories() {
    // Implementation remains the same as provided earlier
}

function addFoodToLocalStorage(foodName, calories) {
    let foodData = JSON.parse(localStorage.getItem('foodData')) || [];
    foodData.push({ name: foodName, calories });
    localStorage.setItem('foodData', JSON.stringify(foodData));
}

function loadFoodDataFromLocalStorage() {
    const foodData = JSON.parse(localStorage.getItem('foodData')) || [];
    foodData.forEach(item => {
        addFoodToUI(item.name, item.calories);
    });
}

function addFoodToUI(name, calories) {
    const list = document.getElementById('foodList');
    const entry = document.createElement('li');
    entry.textContent = `${name}: ${calories} calories`;
    list.appendChild(entry);
}
