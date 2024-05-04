let elPokemonList = document.querySelector('.pokemon-list')
let elSearchInput = document.querySelector('.search-input')
let elCategorySelect = document.querySelector('.category-select')
let elNumFilterForm = document.querySelector('.year-filter-form')
let elFromNumInput = document.querySelector('.from-year')
let elToNumInput = document.querySelector('.to-year')
let elSortSelect = document.querySelector('.sort-select')
let elMoreBtn = document.querySelector('.more-btn')

const normalizePokemons = pokemons.map((pokemon, index) => {
    return {
        id: index++,
        num: pokemon.num,
        name: pokemon.name,
        img: pokemon.img,
        category : [
            pokemon.category[0],
            pokemon.category[1]
        ],
        height: pokemon.height,
        weight: pokemon.weight,
    }
})

function imgGenerator (num) {
    return `https://lorempokemon.fakerapi.it/pokemon/200/${num}`
}

let categories = []
let categoriesSet = new Set()

function renderCategories() {
	normalizePokemons.forEach(pokemon => {
		pokemon.category.forEach(category => {
			categoriesSet.add(category)
			// if (!categories.includes(category)) {
			// 	categories.push(category)
			// }
		})
	})

	categoriesSet.forEach(category => {
		let newOption = document.createElement('option')

		newOption.value = category
		newOption.textContent = category

		elCategorySelect.appendChild(newOption)
	})
}

renderCategories()

function renderPokemons(pokemons) {
    let result = ''
    pokemons.slice(0, 20).forEach(pokemon => {
        
        // <img class="w-full bg-transparent" src="${imgGenerator(pokemon.id)}" height="200" width="200" alt="Poster">
        result += `
        <li class="w-full rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-hidden">
            <img class="w-full bg-transparent" src="${pokemon.img}" height="200" width="200" alt="Poster">
            <div class="p-4 flex flex-col justify-between">
                <div>
                    <h3>${pokemon.name}</h3>
                    <p>Type: ${pokemon.category[0]}</p>
                    <p>Type: ${pokemon.category[1]? pokemon.category[1] : "NONE"}</p>
                    <p>Height: ${pokemon.height}</p>
                    <p>Weight: ${pokemon.weight}</p>
                    <p>Num: ${pokemon.num}</p>
                </div>
            
                <button class="more-btn${pokemon.name} bg-gray-900 block ms-auto py-1 px-4 text-white rounded-md btn-sm">More...</button>
            </div>
        </li> `
        
    })

    elPokemonList.innerHTML = result
}

// SEARCH AND UPDATE

elSearchInput.addEventListener('input', () => {
	let searchValue = elSearchInput.value.trim()

	let SEARCH_QUERY = new RegExp(searchValue, 'gi')

	if (searchValue) {
		let filterPokemons = normalizePokemons.filter(pokemon =>
			pokemon.name.match(SEARCH_QUERY)
		)
        console.log(filterPokemons);

		renderPokemons(filterPokemons)
	}
	
    renderPokemons(normalizePokemons)
})

elCategorySelect.addEventListener('change', () => {
	let selectedCategory = elCategorySelect.value

	let filterPokemonsByCategory = normalizePokemons.filter(pokemon =>
		pokemon.category.includes(selectedCategory)
	)

	if (filterPokemonsByCategory.length > 0) {
		renderPokemons(filterPokemonsByCategory)
	} else {
		renderPokemons(normalizePokemons)
	}
})

elNumFilterForm.addEventListener('submit', evt => {
	evt.preventDefault()

	let fromNum = Number(elFromNumInput.value.trim())
	let toNum = Number(elToNumInput.value.trim())

	if (fromNum && toNum) {
		let filteredPokemonsByNum = normalizePokemons.filter(pokemon => {
			return pokemon.num >= fromNum && pokemon.num <= toNum
		})

		if (filteredPokemonsByNum.length > 0) {
			renderPokemons(filteredPokemonsByNum)
		} else {
			elPokemonList.innerHTML =
				'<h1 class="text-xl font-bold text-gray-900">No pokemons found</h1>'
		}
	} else {
		renderPokemons(normalizePokemons)
	}
})

// SORT select

elSortSelect.addEventListener('change', () => {
	let selectedSort = elSortSelect.value

	if (selectedSort === 'a-z') {
		normalizePokemons.sort((a, b) => {
			if (a.name < b.name) {
				return -1
			} else if (a.name > b.name) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'z-a') {
		normalizePokemons.sort((a, b) => {
			if (a.name > b.name) {
				return -1
			} else if (a.name < b.name) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'oldest-latest') {
		normalizePokemons.sort((a, b) => {
			if (a.num < b.num) {
				return -1
			} else if (a.num > b.num) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'latest-oldest') {
		normalizePokemons.sort((a, b) => {
			if (a.num > b.num) {
				return -1
			} else if (a.num < b.num) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'rating-highest-lowest') {
		normalizePokemons.sort((a, b) => {
			if (a.height < b.height) {
				return -1
			} else if (a.height > b.height) {
				return 1
			} else {
				return 0
			}
		})
	} else if (selectedSort === 'rating-lowest-highest') {
		normalizePokemons.sort((a, b) => {
			if (a.height > b.height) {
				return -1
			} else if (a.height < b.height) {
				return 1
			} else {
				return 0
			}
		})
	}

	renderMovies(normalizePokemons)
})

renderPokemons(normalizePokemons)