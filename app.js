/*
    Class to create a Dinosaur object with specifc methods 
    and properties from dino.json.
*/
class Dinosaur {
    static allDinosaurs = [];

    constructor(species, image, weight, height, diet, where, when, fact) {
        this.species = species;
        this.image = image;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.facts = [
            fact,
            `The ${this.species} has a ${this.diet} diet.`,
            `${this.where} is where the ${this.species} lived.`,
            `The ${this.species} existed during the ${this.when} period.`
        ];
    }

    // Set the primary fact for each Dinosaur object
    setPrimaryFact = () => {
        const facts = this.facts;
        const num = Math.floor(Math.random() * facts.length);
        this.primaryFact = facts[num];
    }

    // Find the Pigeon within the Dinosaur objects
    findPigeon = () => {
        if (this.species === 'Pigeon') {
            this.facts = ['All birds are dinosaurs.'];
            this.setPrimaryFact();
        }
    }

}


/* 
    Class to create a Human object with specifc methods 
    and properties supplied about the user.
*/
class Human {
    static user;

    constructor(name, feet, inches, weight, diet) {
        this.species = 'human';
        this.name = name;
        this.feet = feet;
        this.inches = inches;
        this.weight = weight;
        this.diet = diet;
        this.image = 'images/human.png';
    }
}


/* 
    Class comprised of different methods to 
    interacte with the human & dino objects.
*/
class Helpers {
    // Convert human height to inches
    heightConversion = (feet, inches) => {
        return ((feet * 12) + inches);
    }

    // Compare dino height to human height
    heightCompare = (human, dinos) => {
        for (const dino of dinos) {
            let heightDiff;
            if (dino.hasOwnProperty('height')) {
                if (human.height > dino.height) {
                    heightDiff = human.height - dino.height;
                    dino.facts.push(`You are ${heightDiff} inches taller than a ${dino.species}.`);
                } else {
                    heightDiff = dino.height - human.height;
                    dino.facts.push(`You are ${heightDiff} inches shorter than a ${dino.species}.`);
                }
            }
        }
    }
    
    // Compare dino weight to human weight
    weightCompare = (human, dinos) => {
        for (const dino of dinos) {
            let weightDiff;
            if (dino.hasOwnProperty('weight')) {
                if (human.weight > dino.weight) {
                    weightDiff = human.weight - dino.weight;
                    const weightConversion = weightDiff.toLocaleString('en-US');
                    dino.facts.push(`You weight ${weightConversion}lbs more than a ${dino.species}.`);
                } else {
                    weightDiff = dino.weight - human.weight;
                    const weightConversion = weightDiff.toLocaleString('en-US');
                    dino.facts.push(`You weight ${weightConversion}lbs less than a ${dino.species}.`);
                }
            }
        }
    }

    // Shortcut for height & weight comparisons
    compareDinoHuman = () => {
        this.heightCompare(Human.user, Dinosaur.allDinosaurs);
        this.weightCompare(Human.user, Dinosaur.allDinosaurs);
    }

    // Combine dino & human data
    static combineDinoHuman = () => {
        const dinoHumanData = Dinosaur.allDinosaurs.concat(Human.user);
        return dinoHumanData;
    }

    // Move position of human data
    static moveHuman = (dinoHumanData) => {
        const indexToMove = dinoHumanData.findIndex(obj => obj.species === 'human');
        if (indexToMove !== -1) {
            // Remove the object from its current position
            const objectToMove = dinoHumanData.splice(indexToMove, 1)[0];
            // Insert the object at position 4 in the array
            dinoHumanData.splice(4, 0, objectToMove);
        }
    }

    // Shuffle the index of the objects within the human/dino data
    shuffleArray = () => {
        for (let i = Dinosaur.allDinosaurs.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [Dinosaur.allDinosaurs[i], Dinosaur.allDinosaurs[j]] = [Dinosaur.allDinosaurs[j], Dinosaur.allDinosaurs[i]];
        }
    }
}


class UI {
    // Build data cards
    buildDataCards = (dinoHumanData) => {
        const dinoHumanCards = [];
        const bgColors = ['#009687f5', '#dc7657f5', '#4bb3c1fa', '#fac069f9', '#b94169fa', '#7f62b3fa', '#9fc376f9', '#677bcbfa'];

        for (let i=0; dinoHumanData.length > i; i++) {
            const createDiv = document.createElement('div');
            createDiv.className = 'data-card';

            if (dinoHumanData[i].species === 'human') {
                createDiv.dataset.bgcolor = 'bkgd-colors_human';
                createDiv.innerHTML = 
                    `<h3 class="data-card--title">${dinoHumanData[i].name}</h3>
                    <img src="${dinoHumanData[i].image}" alt="Image of ${dinoHumanData[i].name}" class="data-card--img">`
                ;
            } else {
                createDiv.dataset.bgcolor = `bkgd-colors_${i}`;
                createDiv.innerHTML =
                    `<h3 class="data-card--title">${dinoHumanData[i].species}</h3>
                    <img src="${dinoHumanData[i].image}" alt="Image of ${dinoHumanData[i].species}" class="data-card--img">
                    <p class="data-card--text">${dinoHumanData[i].primaryFact}</p>`
                ;
            }
            dinoHumanCards.push(createDiv);
        }
        return dinoHumanCards;
    }

    // Build grid to house data grid
    buildGrid = (dinoHumanData) => {
        const grid = document.querySelector('[data-grid="grid-element"]');
        const dinoHumanCards = this.buildDataCards(dinoHumanData);

        grid.innerHTML = '';
        for (let i=0; dinoHumanCards.length > i; i++) {
            grid.append(dinoHumanCards[i]);
        }
        this.hideShow('[data-button="reset"]', 'block');
        this.hideShow('[data-grid="grid-element"]', 'flex');
    }

    // Hide or show specified element
    hideShow = (ele, mode) => {
        const selectedEle = document.querySelector(ele);
        if (mode === 'hide') {
            selectedEle.style.display = 'none';
        } else {
            selectedEle.style.display = mode;
        }
    }

    // Shortcut for UI display methods
    displayDinoHuman = () => {
        const dinoHumanData = Helpers.combineDinoHuman();
        Helpers.moveHuman(dinoHumanData);
        this.hideShow('[data-form="user-form"]', 'hide');
        this.buildGrid(dinoHumanData);
    }
}




////////////////////////////////////////////////////////////////////////////////////////////////



// Request call to the server to read dino.json
const getDinos = () => {
    return fetch('http://localhost:8000/api/dinos')
        .then(res => res.json()) // Converts string into JSON
        .catch(err => {
            throw err; // Rethrow the error to be caught outside
        });
}


// Form submission event: extract user input, create Human & Dinosaur objects
document.querySelector('[data-button="submit"]').addEventListener('click', function(event) {
    event.preventDefault();

    // Extracted data from user input form
    const name = document.querySelector('[data-form-input="name"]').value;
    const feet = document.querySelector('[data-form-input="feet"]').value;
    const inches = parseFloat(document.querySelector('[data-form-input="inches"]').value);
    const weight = parseFloat(document.querySelector('[data-form-input="weight"]').value);
    const diet = document.querySelector('[data-form-input="diet"]').value;

    const ui = new UI();
    const helper = new Helpers();
    
    // Create Human obj
    const human = new Human(name, feet, inches, weight, diet);
    human.height = helper.heightConversion(human.feet, human.inches);
    Human.user = human;

    // Create Dinosaur objs
    getDinos().then(obj => {
        for (const dino of obj.Dinos) {
            let dinosaur = new Dinosaur(dino.species, dino.image_url, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact);
            dinosaur.setPrimaryFact();
            dinosaur.findPigeon();
            Dinosaur.allDinosaurs.push(dinosaur);
        }
        if (Dinosaur.allDinosaurs !== undefined && Dinosaur.allDinosaurs.length !== 0) {
            helper.compareDinoHuman();
            helper.shuffleArray();
            ui.displayDinoHuman();
        }
    });

});


// Reset button event: clear data, hide data grid, show user form
document.querySelector('[data-button="reset"]').addEventListener('click', function(event) {
    event.preventDefault();

    // Display and clear form
    const ui = new UI();
    const formInputs = document.querySelectorAll('[data-form-input]');
    ui.hideShow('[data-form="user-form"]', 'block');
    formInputs.forEach(input => {
        if (input.dataset.input !== 'diet') {
            input.value = '';
        }
    });
    document.querySelector('[data-form-input="diet"]').value = 'Herbavor';
    
    // Hide and clear grid
    const grid = document.querySelector('[data-grid="grid-element"]');
    Dinosaur.allDinosaurs = [];
    grid.innerHTML = '';
    ui.hideShow('[data-button="reset"]', 'hide');
    ui.hideShow('[data-grid="grid-element"]', 'hide');
});

