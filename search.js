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
          src: result.urls.regular,
          alt: result.alt_description,
          title: (result.description || "Untitled"),
          name: result.user.name,
          location: (result.user.location || "Planet Earth"),
          userLink: (result.user.portfolio_url || "https://bit.ly/2Z3y4xS"),
          colour: (result.color || "#cccccc") + "40" // Transparency
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
        <div class="image" style="background-color: ${result.colour}">
          <img src="${result.src}" alt="${result.alt}">
        </div>
        <p>Shot by: <a href="${result.userLink}" target="_blank">${result.name}</a> from ${result.location}</p>
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
