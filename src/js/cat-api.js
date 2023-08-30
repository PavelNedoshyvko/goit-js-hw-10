export { fetchBreeds, fetchCatByBreed };
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_QIXfZgakyBzPmpf00zAofx9sN1BiSwp08FlxzmLyXfj9mMVnB8Pillg6It6FjOB8";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";


	function fetchBreeds(){
	return axios.get(`/breeds`)
		.then(({data}) => data);
};

function fetchCatByBreed(breedId) {
	return axios(`/images/search?breed_ids=${breedId}`)
		.then(({data}) => data);
};