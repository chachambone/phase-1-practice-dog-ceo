const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", () => {
  const dogImageContainer = document.getElementById("dog-image-container");
  const dogBreedsList = document.getElementById("dog-breeds");
  const breedDropdown = document.getElementById("breed-dropdown");

  let allBreeds = []; 

  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      data.message.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Dog Image";
        dogImageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching dog images:", error);
    });


    fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      allBreeds = Object.keys(data.message); 

      displayBreeds(allBreeds);

      breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        filterBreeds(selectedLetter);
      });
    })
    .catch((error) => {
      console.error("Error fetching dog breeds:", error);
    });

  
  function displayBreeds(breeds) {
    dogBreedsList.innerHTML = ""; 
    breeds.forEach((breed) => {
      const liElement = document.createElement("li");
      liElement.textContent = breed; 
      liElement.addEventListener("click", () => {
        liElement.style.color = "red"; 
      });

      dogBreedsList.appendChild(liElement); 
    });
  }

  
  function filterBreeds(letter) {
    if (letter === "all") {
      displayBreeds(allBreeds); 
    } else {
      const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letter));
      displayBreeds(filteredBreeds); 
    }
  }
});