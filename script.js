document.addEventListener("DOMContentLoaded", function() {
    // Load existing food data from Local Storage when the page loads
    loadFoodDataFromLocalStorage();

    // Event listener for the "Add Food" button
    document.getElementById('addFoodButton').addEventListener('click', function() {
        const foodName = document.getElementById('foodNameInput').value;
        const calories = document.getElementById('caloriesInput').value;

        // Add the food item to the UI and local storage
        if (foodName && calories) {
            addFoodToUI(foodName, calories);
            addFoodToLocalStorage(foodName, calories);
        } else {
            alert('Please fill in both food name and calories.');
        }
    });
});

// Add a food item to Local Storage
function addFoodToLocalStorage(foodName, calories) {
    let foodData = JSON.parse(localStorage.getItem('foodData')) || [];
    foodData.push({ name: foodName, calories: calories });
    localStorage.setItem('foodData', JSON.stringify(foodData));
}

// Load food data from Local Storage and display it in the UI
function loadFoodDataFromLocalStorage() {
    const foodData = JSON.parse(localStorage.getItem('foodData')) || [];
    foodData.forEach(foodItem => {
        addFoodToUI(foodItem.name, foodItem.calories);
    });
}

// Function to add a food item to the UI
function addFoodToUI(foodName, calories) {
    const listElement = document.createElement('li');
    listElement.textContent = `${foodName}: ${calories} calories`;
    document.getElementById('foodList').appendChild(listElement);

    // Clear input fields after adding
    document.getElementById('foodNameInput').value = '';
    document.getElementById('caloriesInput').value = '';
}
