In your index.html, uncomment all the cards. You should now have a total of 18 cards displayed on the page.
Make sure that you add the needed background images and to all of the child divs as you did in the previous feature sets
Also, make sure that you have two of each instructor!
In your script.js, begin by introducing the following variables into the same global space as the previous variables you declared:

attempts
games_played

Modify your existing handleCardClick function.
attempts should be incremented by 1 every time the player attempts to match 2 cards
When the player wins the game, increment the value of the games_played variable by 1
Declare a new function in the global space calculateAccuracy
This function will be used to calculate the players accuracy using the global attempts and matches variables you declared earlier
This function will be called from the next function you create, displayStats
Now, declare another new function in the global space, displayStats.
This function will select the appropriate child elements inside of the <aside> and change the text to reflect the values inside of the our stats variables:
attempts
accuracy
games_played
To correctly update accuracy
Declare a variable in the displayStats function and store the result of calling calculateAccuracy function you created in the previous step
Use the value returned from the calculateAccuracy function to update the text in the proper aside child element