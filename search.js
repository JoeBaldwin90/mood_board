// Search form elements
const formEl = document.querySelector("form")
const inputEl = formEl.querySelector("input")
const resultsTag = document.querySelector("section.results")

// API details
const accessKey = "f1f7a17669caf3a009c49d955d4089fac120a5cc12b6c840bab42a460c981154"
const apiUrl = `https://api.unsplash.com/search/photos/?per_page=24&query=`

// Show related images to user's search term
const searchUnsplash = function(term) {

  return fetch(apiUrl + term, {
      // Headers
      method: "GET",
      headers: {
        "Authorization": "Client-ID " + accessKey
      }
    })
    .then(response => response.json())
    .then(data => {
      // Format data into a new array of new objects
      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular,
          imageAlt: result.alt_description
        }
      })
    })
}

// Add results to page
const addResults = function(results) {
  // Clear loading elements
  resultsTag.innerHTML = ""

  // Loop over the results and add to resultsTag
  results.forEach(result => {
    resultsTag.innerHTML = resultsTag.innerHTML + `
      <div class="result">
        <div class="image">
          <img src="${result.imageSrc}" alt="${result.imageAlt}">
        </div>
        <h2><span class="loading"></span></h2>
        <p><span class="loading"></span></p>
      </div>
      `
  })
}

// Get info from inputEl
formEl.addEventListener("submit", function(event) {
  // Get search term
  const searchTerm = inputEl.value
  // Pass in search term to and invoke searchUnsplash
  searchUnsplash(searchTerm)
    .then(results => {
      addResults(results)
    })

  event.preventDefault()
})
