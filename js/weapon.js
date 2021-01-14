 class Weapon {

     constructor(weapon, damage) {
         this.weapon = weapon;
         this.damage = damage;
     }
 }

 //generating weapons
 let lion = new Weapon('lion', 40);
 let elephant = new Weapon('elephant', 30);
 let giraffe = new Weapon('giraffe', 20);
 let dog = new Weapon('dog', 10);
 let defaultWeapon = new Weapon('monkey', 10)


 //adding weapons
 let weaponsArray = [dog, elephant, giraffe, lion, defaultWeapon];


 function changePlayerWeapon(activePlayer) {
     for (let i = 0; i < weaponsArray.length; i++) {
         let newPlayerPosition = getId(getPosition(activePlayer.name));
         if (newPlayerPosition.hasClass(`${weaponsArray[i].weapon}`) && weaponsArray[i].weapon != activePlayer.weapon.weapon) {


             newPlayerPosition.addClass(`${activePlayer.weapon.weapon}`)

             activePlayer.weapon = weaponsArray.find((item) => {

                 return item == weaponsArray[i];
             })
             newPlayerPosition.removeClass(`${activePlayer.weapon.weapon}`);

             i = weaponsArray.length;

         }
     }
     $(`#${activePlayer.name}Weapon`).attr('src', `./images/${activePlayer.weapon.weapon}.jpg`)
     $(`#${activePlayer.name}WeaponDamage`).text(`Damage Points: ${activePlayer.weapon.damage}`);


 }