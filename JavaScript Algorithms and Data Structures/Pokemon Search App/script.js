const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const searchPokemon = () => {
  const searchInput = document.getElementById("search-input").value
  const cleanSearchInput = cleanInput(searchInput)
  console.log(cleanSearchInput)
  fetchGeneralData(cleanSearchInput)
}
const searchSuggestion = (event) => {
  console.log(event)
  const searchInput = event.target.textContent
  const cleanSearchInput = cleanInput(searchInput)
  console.log(cleanSearchInput)
  fetchGeneralData(cleanSearchInput)
}

const cleanInput = (searchInput) => {
  var numberRegex = /^\d+$/
  if (numberRegex.test(searchInput)) {
    console.log(searchInput)
    return searchInput
  }

  //tout mettre en lower case
  searchInput = searchInput.toLowerCase()
  //transformer les espaces en tiret
  return searchInput
  //remplacer ♀ or ♂ par -f ou -m
}

const fetchGeneralData = async (input) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    findPokemon(input, data)
  } catch (err) {
    console.log(err)
  }
}

const fetchPokemonData = async (input) => {
  try {
    const res = await fetch(`${url}/${input}`)
    const data = await res.json()
    console.log(data)
    displayPokemonData(data)
  } catch (err) {
    console.log(err)
  }
}

const findPokemon = (input, data) => {
  const pokemons = data.results
  console.log(`l'input est de ${input}`)
  console.log("je cherche le nom")
  let pokemonData = pokemons.find(
    (pokemon) => input === pokemon.name || input == pokemon.id
  )

  pokemonData === undefined
    ? alert("Pokémon not found")
    : fetchPokemonData(input)
}

const displayPokemonData = (pokemonData) => {
  displayNameAndId(pokemonData)
  displayWeightAndHeight(pokemonData)
  displaySprite(pokemonData.sprites.front_default)
  displayTypes(pokemonData.types)
  displayStats(pokemonData.stats)
}

const displayNameAndId = (pokemonData) => {
  const name = document.getElementById("pokemon-name")
  name.textContent = pokemonData.name.toUpperCase()
  const idSpan = document.getElementById("pokemon-id")
  idSpan.textContent = pokemonData.id
}

const displayWeightAndHeight = (pokemonData) => {
  const weight = document.getElementById("weight")
  weight.textContent = `Weight: ${pokemonData.weight}`
  const height = document.getElementById("height")
  height.textContent = `Height: ${pokemonData.height}`
}

const displaySprite = (pokemonData) => {
  const spriteWrapper = document.getElementById("sprite-wrapper")
  spriteWrapper.innerHTML = ""
  const sprite = document.createElement("img")
  sprite.src = pokemonData
  sprite.id = "sprite"
  sprite.alt = ""
  spriteWrapper.appendChild(sprite)
}

const displayTypes = (pokemonData) => {
  const types = document.getElementById("types")
  types.innerHTML = ""
  pokemonData.forEach(({ type }) => {
    const statSpan = document.createElement("span")
    statSpan.textContent += type.name.toUpperCase()
    types.appendChild(statSpan)
  })
}

const displayStats = (pokemonData) => {
  pokemonData.forEach((stat) => {
    const statNumber = stat.base_stat
    const statName = stat.stat.name
    const statTd = document.getElementById(statName)
    statTd.textContent = statNumber
  })
}

// sugestions

const getSuggestions = () => {
  const searchInput = document.getElementById("search-input").value
  findSuggestionsInData(searchInput)
  console.log("entered getSuggestions")
}

const findSuggestionsInData = async (input) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    findSuggestions(input, data.results)
  } catch (err) {
    console.log(err)
  }
}

const findSuggestions = (input, data) => {
  // trouver les 5 premieres occurences de l'input avec un regex
  let result = data.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(input.toLowerCase()) ||
      pokemon.id.toString().includes(input)
  )
  if (result.length > 5) {
    result = result.slice(0, 5)
  }

  displaySuggestions(result)
}

const displaySuggestions = (suggestions) => {
  const suggestionsDiv = document.getElementById("suggestions")
  suggestionsDiv.innerHTML = ""
  suggestions.forEach((suggestion) => {
    const suggestionLink = document.createElement("button")
    suggestionLink.textContent = suggestion.name
    suggestionsDiv.appendChild(suggestionLink)
    suggestionLink.addEventListener("click", (event) => {
      searchSuggestion(event)
    })
    //ajouter un click event qui va affecter la suggestion sur la value de la recherche et faire la recherche ??
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-button")
  searchBtn.addEventListener("click", searchPokemon)
  const searchInput = document.getElementById("search-input")
  searchInput.addEventListener("input", (event) => {
    getSuggestions(event.target.value)
  })
})
