# CES pair programming exercise
This session will last for 1h following the schedule:
1. Introduction (10min)
2. Pair programming (40min)
3. Final questions (10min)

## Coding exercise
You will build a simple, responsive website to display movies.
You don't need to finish all the features. We want to evaluate the way you approach the problem, how you structure the code, the choices you make and the reason for those choices.
You are allow to Google at any time.
AI tools are not allowed.

The core functionality we want is:
- Show the list of movies. Fetch the details and images
- Filter by year and/or genre
- 20 items per page, pagination
- When you click on a movie, it takes you to its description page with more details

Pay close attention to:
- Responsive design
- Data fetching strategies
- Code structure and good practices

### How to use the movies APIs
We'll use the API https://www.themoviedb.org to fetch the list and details of the movies.

How to fetch movies with some filter
```bash
# use the provided apiKey and the query param to find the list of movies
curl --request GET --url https://api.themoviedb.org/3/discover/movie?api_key=xxxx&release_date.gte=1991-01-01&sort_by=popularity.desc --header 'accept: application/json'
```

Use the docs to find out how to add filters for year, genre and anything else you think can be useful, and how to retrieve extended details for a specific movie
[4:07 PM] Kebin Joy
https://developer.themoviedb.org/reference/discover-movie
[4:45 PM] Kebin Joy
https://image.tmdb.org/t/p/w500/t7bhjraXuN4hd3yZVBVVhP3BdX0.jpg

API Key:
9fb3bc9c879d32261412661fde3cc5dc
has context menu