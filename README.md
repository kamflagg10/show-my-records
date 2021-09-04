# Show My Records

This is a small web application I created to display my record collection. It obtains my collection data from Discogs, a popular website for buying, selling, and learning about vinyl records and other types of media.

## Demos

![](https://github.com/kamflagg10/my-gifs/blob/master/demo-1.gif)
![](https://github.com/kamflagg10/my-gifs/blob/master/demo-2-mobile.gif)

## Current Features

- Display records based on folders created on Discogs.

Once 'Load Folders' is clicked, the server grabs each folder created by the user (as well as the 'All' and 'Uncategorized' folders created by Discogs).
Then, in a dropdown, you can pick any folder of your choice to be displayed in a grid below.

## Future Features (In Progress)

- Add a 'play' button to each item, which when pressed will call Spotify's API and play a 30 second snippet.
- Allow sorting for the items (by year, artist, title, etc.)
- Allow other Discogs users to sign in and try for themselves.
- Deploy the project using Heroku.
