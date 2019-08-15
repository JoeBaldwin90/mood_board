# Mood Board
This application allows creative users to type their "mood" into the search form (e.g. summer, festival, city). The app returns related images befitting the search term from the public [Unsplash API](https://unsplash.com/documentation). [Here's what the site looks like](https://bit.ly/2KBoFth)

## Intention
Integrate with an API which required authorisation headers.

##### Timeframe
1 day

## Process
I started by building the app with static HMTL/CSS. After creating an account and registering a new app via Unsplash's developer portal I saved my access keys and set about coding the dynamic elements of the app.

I had to figure out a way to grab and store the user's search term from the input field first. I did this by adding an event listener to the form element and saving the value as a variable. This allowed me to pass the user's search term into my main function for handling the JSON data from the API.

The API needed public use authentication to work. The options to do this were via the HTTP Authorization header or by passing an access key value into the `client_id` query parameter. Since I've got experience with the latter already, I wanted to work with headers instead.

Postman (the app) came in very handy here as it allowed me to test my API endpoint and authorisation before writing my code:
```
return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Authorization": "Client-ID " + accessKey
    }
  })
```
To work with the massive amount of data available via the API I needed to reduce it into a more manageable array of objects. I did this by parsing the data into JSON, then returning my own, new object using `.map()`:

```
.then(response => response.json())
.then(data => {
  return data.results.map(result => {
    return {
      src: result.urls.regular,
      title: (result.description || "Untitled"),
      name: result.user.name,
    }
  })
})
```
In order to use the data in this new array to add elements and build API-driven content into my app, two things were required:
  - Handle the promise returned by `searchUnsplash(searchTerm)` using `.then()`.
  - Pass the results of the search function into a new function call `addResults()`, where the HTML structure could be handled.

This was the hardest part. It felt good to get the user's search term, AJAX function and DOM manipulation function hooked up.

The query variable on the `apiUrl` was set by the `searchTerm`, which was passed into the `searchUnsplash()` function as an argument. This worked because the API url I used ended `...&query=`. Using `fetch(apiUrl + term...` modified the endpoint URL to `...&query=search+term`. Every time the input form is submitted, the function runs again, with a new search query, generating new images on the page.

I used keyframes to make the site feel more dynamic before the user entered a search term and I played around with the different key/value pairs I wanted to include in objects returned by my `searchUnsplash` function to see which info worked best when displayed.

## Technologies
- HTML / CSS
- Javascript
- AJAX
- [Postman](https://www.getpostman.com/) (API development tool)

## Challenges
I'm still getting to grips with the way `.then()` works and how to handle promises correctly. I know it's my weak point at the moment, so I'm going to drill it until I get it.

## Lessons learned
Working with authorisation headers is much easier than I expected.

The piped "or" logical operator is a sleek way to handle "null" results from an API request.

## Future development
- Stagger fade-in delay based on object index. e.g. `animation-delay: index * 100ms;`
- Add pre-defined categories to the search tool.
