window.addEventListener("DOMContentLoaded", () => {

	let searchWord = 'random',
		page = 1;

	const gallery = document.querySelector('.gallery'),
		galleryImages = gallery.querySelector('.gallery__images'),
		galleryBtn = gallery.querySelector('.gallery__btn-load'),
		galleryTextErr = gallery.querySelector('.gallery__text-err'),

		formSearch = document.querySelector('.search-form'),
		formInput = formSearch.querySelector('.search-form__input'),

		keyApi = 'bBVqytXYSeRE68wQCsiFrEiDb_Lc11VtACnsElUmBCg';

	// ==========================================================================================================================================

	async function getData() {

		const urlApi = `https://api.unsplash.com/search/photos?page=${page}&query=${searchWord}&client_id=${keyApi}&orientation=landscape&per_page=9&tag_mode=all`;

		const res = await fetch(urlApi);

		if (!res.ok) {
			throw new Error(`Could not fetch ${urlApi}, status: ${res.status}`);
		}

		const data = await res.json();

		if (page === 1) {
			galleryImages.innerHTML = '';
		}

		const images = data.results;

		if (images.length == 0) {

			galleryTextErr.style.display = 'block';
			galleryBtn.style.display = 'none';
		} else {
			galleryTextErr.style.display = 'none';
			images.map((item) => {
				const element = document.createElement('a');
				element.classList.add('gallery__item');
				element.style.backgroundImage = `url('${item.urls.regular}')`;
				element.href = item.links.html;
				element.target = '_blank';
				galleryImages.append(element);
			})

			galleryBtn.style.display = 'block';
		}
	}
	getData();

	formSearch.addEventListener('submit', (e) => {
		e.preventDefault();
		searchWord = formInput.value;
		page = 1;
		getData();

	});

	galleryBtn.addEventListener('click', () => {
		page++;
		getData();
	})
});
