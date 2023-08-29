import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "live_QIXfZgakyBzPmpf00zAofx9sN1BiSwp08FlxzmLyXfj9mMVnB8Pillg6It6FjOB8";



const refs = {
	select: document.querySelector('.breed-select'),
	loader: document.querySelector('.loader'),
	error: document.querySelector('.error'),
	catInfo: document.querySelector('.cat-info'),
}

refs.select.addEventListener('change', onChangeSelect);

getBreeds()


function onChangeSelect(evt) {
	refs.catInfo.classList.add('is-hidden');
	refs.loader.classList.remove('is-hidden');
	const breedId = evt.currentTarget.value;
	fetchCatByBreed(breedId)
		.then(breed => {
			refs.catInfo.innerHTML = createMarkupCat(breed);
			refs.loader.classList.add('is-hidden');
			refs.catInfo.classList.remove('is-hidden');
		})
		.catch(error => {
			console.log(error);
			Notify.warning("Oops! Something went wrong! Try reloading the page!", {
				warning: {
    			background: '#ff5e1a',
    			textColor: '#000',
    			notiflixIconColor: '#000',
  				},
				width: '700px',
				fontSize: '26px',
				position: 'center-center',
			});
			refs.loader.classList.add('is-hidden');
		});
};

function getBreeds() {
	refs.select.classList.add('is-hidden')
	refs.error.classList.add('is-hidden')
	fetchBreeds()
		.then(breeds => {
			refs.select.insertAdjacentHTML("beforeend", createSelectBreeds(breeds));
			refs.select.classList.remove('is-hidden');
			refs.loader.classList.add('is-hidden');
			new SlimSelect({
				select: '.breed-select-js',
			})
		})
		.catch(error => {
			console.log(error);
			Notify.warning("Oops! Something went wrong! Try reloading the page!", {
				warning: {
    			background: '#ff5e1a',
    			textColor: '#000',
    			notiflixIconColor: '#000',
  				},
				width: '700px',
				fontSize: '26px',
				position: 'center-center',
			});
			refs.loader.classList.add('is-hidden');
		});
};

function createSelectBreeds(breeds) {
	return breeds.map(({ id, name }) =>
				`<option value=${id}>${name}</option>`
	).join('');
	
}

function createMarkupCat(breed) {
	const [{ url, breeds: [{ name, description, temperament }] }] = breed;
	return `<img class="cat-img" src="${url}" alt="" width="600"/>
			<div class="wrap-descr">
			<h2 class="title">${name}</h2>
      <p class="descr">${description}</p>
      <p class="temperament-txt">
			<span class="temperament">Temperament:</span>
			${temperament}</p>
			</div>`;
}

