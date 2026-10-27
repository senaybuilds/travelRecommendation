let travelData = {};

fetch("./travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    travelData = data;
    console.log(travelData);
  })
  .catch((error) => {
    console.error("Error fetching travel data:", error);
  });

function displayRecommendations(recommendations) {
  const results = document.getElementById("results");

  results.innerHTML = "";

  recommendations.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;

    results.appendChild(card);
  });
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value.toLowerCase().trim();

  let recommendations = [];

  if (keyword === "beach" || keyword === "beaches") {
    recommendations = travelData.beaches;
  } else if (keyword === "temple" || keyword === "temples") {
    recommendations = travelData.temples;
  } else if (keyword === "country" || keyword === "countries") {
    recommendations = travelData.countries.flatMap((country) => country.cities);
  } else {
    const country = travelData.countries.find(
      (country) => country.name.toLowerCase() === keyword,
    );

    if (country) {
      recommendations = country.cities;
    }
  }

  displayRecommendations(recommendations);
});

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  document.getElementById("results").innerHTML = "";
});
