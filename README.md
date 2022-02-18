# Jest Another RPG (Role Player Game)
Richard Ay (September 2020, *updated February 2022*)


## Table of Contents
* [Installation Instructions](#installation-instructions)
* [Usage Instructions](#usage-instructions)
* [Application Walk Through](#application-walk-through)
* [Technologies Used](#technologies-used)
* [Deployment Link](#deployment-link)
* [Application Screen Shots](#application-screen-shots)

    
## Installation Instructions
    
     Make sure 'node.js' is installed on your computer. 
  
    
## Usage Instructions
    
    From the GitHub repository, navigate to the root directory and issue the command: 'node app'.  
    Game options can be selected by using the keyboard arrow keys followed by [Enter].  Note, this game runs in the console (command line).
  
## Application Walk Through

Once the game starts, the player is prompted for a name.  There are two options for the player: attack or use a potion.  If 'potion' is selected, there is a choice of three: health, strength, or agility. The player and the enemy take turns attacking each other.

A player/enemy health value is reduced following an attack.  The "damage" value is a function of the relative values of health, strength and agility.

Test Driven Development (TDD) tests can be run by issuing the command "npm run test" or "npm run test <object>".

## Technologies Used

* Node.js
* objects
* npm (inquirer, jest)
* Javascript( ..., map, promise)


## Deployment Link
Because this application runs from a machine (command line) and not a browser, it cannot be deployed to GitHub pages.  To run this application, clone it to your local machine and (assuming you have 'node.js' installed) run 'node app.js'.
The link to the GitHub repository is: https://CaptainRich.github.io/jest-another-rpg 
 


## Application Screen Shots

![Screenshot](screen-shot.jpg) Image of the application during play.  