import { menu, nonPersonalizedComments } from './menu';
import moment from 'moment';


let previousComment = '';

const getRandomComment = () => {
  let randomIndex = Math.floor(Math.random() * nonPersonalizedComments.length);
  let randomComment = nonPersonalizedComments[randomIndex];

  if (randomComment === previousComment) {
    randomIndex = (randomIndex + 1) % nonPersonalizedComments.length;
  }
  
  previousComment = randomComment;
  return randomComment;
}

let total = 0;
let chosenType;

const getMealTime = () => {
  const currentTime = moment().format('HH:mm');

  if (moment(currentTime, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment('12:00', 'HH:mm'))) {
      return 'breakfast';
  } else if (moment(currentTime, 'HH:mm').isBetween(moment('12:00', 'HH:mm'), moment('18:00', 'HH:mm'))) {
      return 'lunch';
  } else {
      return 'dinner';
  }
}

const userInput = prompt(`Welcome to our menu! Please choose a category:\n${Object.keys(menu.mainMenu).map(key => `• ${key}`).join('\n')}`, `${getMealTime()}`);

if(userInput.toLowerCase() === "breakfast" || userInput.toLowerCase() === "lunch" || userInput.toLowerCase() === "dinner"){
  const subMenu = menu.mainMenu[userInput.toLowerCase()];

  const entree = prompt(`This is our ${userInput.toLowerCase()} menu.\nEntrees:\n${Object.keys(subMenu).map(key => `• ${key} - $${subMenu[key].price}`).join('\n')}\nSide dishes:\n${Object.keys(menu.sidesMenu).map(key => `• ${key} - $${menu.sidesMenu[key].price}`).join('\n')}\n\nTo start your order, please choose an entree for your ${userInput}.`);

  if(entree.toLowerCase() && subMenu[entree.toLowerCase()]){
    const selectedEntree = subMenu[entree.toLowerCase()];

    if (selectedEntree) {
      if (selectedEntree.type) {
        const type = selectedEntree.type;
        chosenType = prompt(`Please choose a type of your ${entree.toLowerCase()}:\n${Object.keys(type).map(key => `• ${key} - added cost: $${type[key]}`).join('\n')}\nIf you do not want to add any type - skip this step`);
        
        if (chosenType.toLowerCase() && !type[chosenType.toLowerCase()]) {
          alert("The type you specified is not recognized. Make sure you enter the type without spelling mistakes.\nSkipping type selection.");
          chosenType = '';
        } else if (chosenType.toLowerCase()) {
          const priceOfType = type[chosenType.toLowerCase()];
          alert(`You have selected ${entree} with a price of: $${selectedEntree.price} and the type chosen is: ${chosenType.toLowerCase()} with an added cost of: $${priceOfType}\n${selectedEntree.comment}\n${getRandomComment()}`);
          total += selectedEntree.price + priceOfType;
        } else {
          alert(`You have selected ${entree} with price: $${selectedEntree.price}\n${selectedEntree.comment}\n${getRandomComment()}`);

          total += selectedEntree.price;
        }
      } else {
        alert(`You have selected ${entree} with price: $${selectedEntree.price}\n${selectedEntree.comment}\n${getRandomComment()}`);
        chosenType = '';

        total += selectedEntree.price;
      }
    } 
    
    const firstSide = prompt(`Please choose a First side dish:\n${Object.keys(menu.sidesMenu).map(key => `• ${key} - $${menu.sidesMenu[key].price}`).join('\n')}`);

    if(firstSide.toLowerCase() && menu.sidesMenu[firstSide.toLowerCase()]){
      const selectedFirstSide = menu.sidesMenu[firstSide.toLowerCase()];
      alert(`You have selected ${firstSide.toLowerCase()} with price: $${selectedFirstSide.price}\n${selectedFirstSide.comment}\n${getRandomComment()}`);

      total += selectedFirstSide.price;

      const secondSide = prompt(`Please choose a Second side dish:\n${Object.keys(menu.sidesMenu).map(key => `• ${key} - $${menu.sidesMenu[key].price}`).join('\n')}`);

      if(secondSide.toLowerCase() && menu.sidesMenu[secondSide.toLowerCase()]){
        const selectedSecondSide = menu.sidesMenu[secondSide.toLowerCase()];

        alert(`You have selected ${secondSide.toLowerCase()} with price: $${selectedSecondSide.price}\n${selectedSecondSide.comment}\n${getRandomComment()}`);

        total += selectedSecondSide.price;
        alert(`Total price for your order: ${entree.toLowerCase()} ${chosenType.toLowerCase()}, ${firstSide.toLowerCase()}, ${secondSide.toLowerCase()} - $${total}`);

      }else{
        alert("Invalid selection of second side dish. The specified name of the dish is not on the menu. Make sure you enter the name without spelling mistakes. Please try again.");
      }
    }else{
      alert("Invalid selection of first side dish. The specified name of the dish is not on the menu. Make sure you enter the name without spelling mistakes. Please try again.");
    }  
  }else{
    alert("Invalid selection of entree. The specified name of the dish is not on the menu. Make sure you enter the name without spelling mistakes. Please try again.");
  }
}else{
  alert("Invalid category selected. Make sure you enter the name without spelling mistakes. Please try again.");
}