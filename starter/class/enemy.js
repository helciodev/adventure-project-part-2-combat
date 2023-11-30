const { Character } = require("./character");
const { Player } = require("./player");
class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    const connectedRooms = Object.keys(this.currentRoom.exits);

    const randomRoom =
      connectedRooms[Math.floor(Math.random() * connectedRooms.length)];

    const nextRoom = this.currentRoom.getRoomInDirection(randomRoom);

    if (nextRoom) {
      this.cooldown += 3000;

      this.currentRoom = nextRoom;
      console.log(this.cooldown);
    }
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    this.attackTarget.health -= this.strength;
    this.scratchNose();
  }

  applyDamage(amount) {
    this.health -= amount;
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
      this.die();
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }

  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
