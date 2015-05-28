/*heroes and dragons

Fight a dragon; you will mostly lose

*/

var hero = {
    firstName: "Hero",
    hp: 10,
    wins: 0,
    deaths: 0
};

// invoke to create a dragon
function dragon(name, colour, hp) {
    this.firstName = name;
    this.colour = colour;
    this.hp = hp;
    this.defending = false;
}

// invoke each time the hero dies, until they win or quit
function heroDeath() {
  hero.deaths++;
  console.log("YOU DIED");
  var keepPlaying = window.confirm("Resurrect?");
  if (keepPlaying) {
    hero.hp = 10;
    gameInPlay = true;
  }
  else {
    combat = false;
  }
}

function randomDamage(modifier, base) {
  return Math.floor(Math.random()*modifier + base);
}

// higher modifiers increase the chance of success
function gameOfChance(modifier) {
  return Math.floor(Math.random()*modifier);
}

// fill an array with dragons, Faerun seems to be full of them...
var dragonList = [
  new dragon("Gnawbone", "black", 15),
  new dragon("Iceclaws", "white", 20),
  new dragon("Venomfang", "green", 25),
  new dragon("Stormwing", "blue", 30),
  new dragon("Inferno", "red", 35)
];

// the game begins!

  confirm("Heroes and Dragons!");

  hero.firstName = prompt("What is your name?");

  // randomly select a dragon from the dragonList, and notify the player
  var dragon = dragonList[Math.floor(Math.random() * dragonList.length)];
  console.log(hero.firstName + " is now fighting a " + dragon.colour + " dragon!");

  // combat begins

  var combat = true;
  var totalDamage = 0;

  while (combat) {

      // hero action
      var heroAction = prompt("attack, defend or flee?");
      switch (heroAction) {
          case 'attack':
              console.log("You attack the dragon!");
              var checkHit = gameOfChance(4); // approx 1/4 chance of missing
              if (checkHit) {
                  var damageThisRound = randomDamage(10, 1);
                  console.log("The attack does " + damageThisRound + " damage!");
                  totalDamage += damageThisRound;
                  if (totalDamage >= dragon.hp) {
                      console.log("You killed the dragon!");
                      hero.wins++;
                      combat = false;
                  }
              } else {
                  console.log("The attack missed...");
              }
              break;
          case 'defend':
              console.log("You raise your shield and ready yourself...");
              hero.defending = true;
              break;
          case 'flee':
              console.log("You attempt to run away!");
              var runSuccess = gameOfChance(2); // approx 1/2 chance of failure
              if (runSuccess) {
                  console.log("You escape safely!");
                  combat = false;
              } else {
                  console.log("You are too slow; the dragon eats you.");
                  heroDeath();
              }
              break;
          default:
              console.log("You hesitate; the dragon eats you.");
              heroDeath();
      } // end of heroAction

      // add dragon turn
      var dragonAction = gameOfChance(10);
      if (dragonAction >7) {
        console.log("The dragon spits " + dragon.colour + " flames at you...");
        if (hero.defending) {
          console.log("You evade the attack!");
          hero.defending = false;
        }
        else {
          var damageThisRound = randomDamage(10, 10);
          console.log("The attack does " + damageThisRound + " damage!");
          hero.hp -= damageThisRound;
          if (hero.hp < 1) {
            heroDeath();
          }
        }
      }
      else if (dragonAction <5) {
        console.log("The dragon strikes with it's claws!");
        var checkHit = gameOfChance(4); // approx 1/4 chance of missing
        if (checkHit && hero.defending) {
          console.log("You evade the attack!");
          hero.defending = false;
        }
        else if (checkHit) {
          var damageThisRound = randomDamage(8, 2);
          console.log("The attack does " + damageThisRound + " damage!");
          hero.hp -= damageThisRound;
          if (hero.hp < 1) {
            heroDeath();
          }
        }
        else {
          console.log("The attack missed...");
        }
      }
      else {
        console.log("The dragon hisses and moves to flank you...");
      }
      // end of dragonAction
  }

  // add a switch for win lose draw?
