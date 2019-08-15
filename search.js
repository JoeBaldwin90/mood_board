// Search form elements
const formEl = document.querySelector("form")
const inputEl = formEl.querySelector("input")

// Show related images to user's search term
const searchUnsplash = function (term) {
  // Do something...
}

// Get info from inputEl
formEl.addEventListener("submit", function(event) {
  // Get search term
  const searchTerm = inputEl.value
  // Pass in search term to and invoke searchUnsplash
  searchUnsplash(searchTerm)

  event.preventDefault()
})
