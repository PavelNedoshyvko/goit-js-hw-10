export { fetchBreeds, fetchCatByBreed };


const API_KEY = "live_QIXfZgakyBzPmpf00zAofx9sN1BiSwp08FlxzmLyXfj9mMVnB8Pillg6It6FjOB8";
const BASE_URL = "https://api.thecatapi.com/v1/";
	
function fetchBreeds(){
	return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.message);
			}
			return response.json();
		});
};

function fetchCatByBreed(breedId) {
	return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.message);
			}
			return response.json();
		});
};
