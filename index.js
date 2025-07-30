document.getElementById('button').addEventListener('click', () => {
  let inputValue = document.getElementById('inputName').value.trim();
  let detailsContainer = document.getElementById("details");
  detailsContainer.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      const items = document.getElementById("items");
      items.innerHTML = "";

      if (data.meals == null) {
        document.getElementById('msg').style.display = 'block';
      } else {
        document.getElementById('msg').style.display = 'none';
        data.meals.forEach(meal => {
          console.log(meal);
          let itemDiv = document.createElement("div");
          itemDiv.className = 'm-2 singleItem';
          itemDiv.setAttribute('onclick', `details(${meal.idMeal})`);

          let itemInfo = `
            <div class="card" style="width: 15rem;">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
              <div class="card-body text-center">
                <h5 class="card-text">${meal.strMeal}</h5>
              </div>
            </div>
          `;
          itemDiv.innerHTML = itemInfo;
          items.appendChild(itemDiv);
        });
      }
    });
});


function details(id) {
  console.log(id);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      let meal = data.meals[0];
      console.log(meal);

      let detailsContainer = document.getElementById("details");
      detailsContainer.innerHTML = "";

      // Dynamically collect ingredients and measures
      let ingredientsList = '';
      for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredientsList += `<li>${ingredient} - ${measure}</li>`;
        }
      }

      let detailsDiv = document.createElement("div");
      let detailsInfo = `
        <div class="card" style="width: 22rem;">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger mt-2">Watch on YouTube</a>
            <h6 class="mt-3">Category: ${meal.strCategory}</h6>
            <h6>Area: ${meal.strArea}</h6>
            <h6 class="mt-3">Ingredients:</h6>
            <ul>${ingredientsList}</ul>
          </div>
        </div>
      `;

      detailsDiv.innerHTML = detailsInfo;
      detailsContainer.appendChild(detailsDiv);
    });
}
    