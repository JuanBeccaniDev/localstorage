class Pet {
  constructor(
    petId,
    petName,
    petSize,
    petWeight,
    petAge,
    petDangerousToHumans,
    petDangerousToPets,
    petSick,
    petInSpecialTreatment
  ) {
    this.petId = Number(petId);
    this.petName =
      petName.slice(0, 1).toUpperCase() + petName.slice(1).toLowerCase();
    this.petSize = petSize.toLowerCase();
    this.petWeight = petWeight.toLowerCase();
    this.petAge = Number(petAge);
    this.petDangerousToHumans = petDangerousToHumans.toLowerCase();
    this.petDangerousToPets = petDangerousToPets.toLowerCase();
    this.petSick = petSick.toLowerCase();
    this.petInSpecialTreatment = petInSpecialTreatment.toLowerCase();
  }
  petRoom = 0;
  details() {
    return `<li>Nombre: ${this.petName}</li>
      <li>Tamaño: ${this.petSize}</li>
      <li>Peso: ${this.petWeight}</li>
      <li>Edad en años: ${this.petAge}</li>
      <li>Peligroso para los humanos: ${this.petDangerousToHumans}</li>
      <li>Peligroso para las demás mascotas: ${this.petDangerousToPets}</li>
      <li>Se encuentra enferma: ${this.petSick}</li>
      <li>Requiere tratamiento especial: ${this.petInSpecialTreatment}</li>
      <li>Número de habitación: ${this.petRoom}</li>`;
  }
}

class PetsRoom {
  constructor(petsCapacity, roomNumber) {
    this.petsCapacity = petsCapacity;
    this.roomNumber = roomNumber;
    this.pets = [];
    this.petsInside = this.pets.length;
  }
  addPet(pet) {
    if (this.petsInside < this.petsCapacity) {
      this.pets.push(pet.petName);
      this.petsInside += 1;
      pet.petRoom = this.roomNumber;
      return `Se a agregado a ${pet.petName} a la habitación ${this.roomNumber}.`;
    } else {
      return `No se pueden agregar más mascotas en la habitación ${this.roomNumber}`;
    }
  }
  removePet(pet) {
    if (this.pets.indexOf(pet.petName) > -1) {
      this.pets.splice(this.pets.indexOf(pet.petName), 1);
      pet.petRoom = 0;
      return `Se a removido a ${pet.petName} de la habitación ${this.roomNumber}`;
    } else {
      return `${pet.petName} no se encuentra en la habitación ${this.roomNumber}`;
    }
  }
}

let dogsRooms = [
  new PetsRoom(3, 1),
  new PetsRoom(3, 2),
  new PetsRoom(2, 3),
  new PetsRoom(5, 4),
  new PetsRoom(3, 5),
  new PetsRoom(2, 6),
  new PetsRoom(2, 7),
  new PetsRoom(1, 8),
  new PetsRoom(1, 9),
  new PetsRoom(1, 10),
];

let dogsInShelter = [
  new Pet(1, "lola", "pequeño", "sobrepeso", 2, "no", "no", "si", "no"),
  new Pet(2, "paco", "grande", "desnutrido", 5, "no", "no", "no", "si"),
  new Pet(3, "simon", "gigante", "ideal", 2, "si", "no", "no", "no"),
  new Pet(4, "pico", "mini", "delgado", 2, "no", "no", "no", "si"),
  new Pet(5, "tomas", "mediano", "obeso", 2, "no", "si", "no", "no"),
  new Pet(6, "lucas", "grande", "ideal", 2, "no", "no", "no", "no"),
  new Pet(7, "sofia", "pequeño", "delgado", 2, "no", "no", "si", "no"),
];

let lastPetAdded = JSON.parse(localStorage.getItem("newDogs"));

dogsInShelter.push(lastPetAdded);

dogsRooms[0].addPet(dogsInShelter[0]);
dogsRooms[2].addPet(dogsInShelter[1]);
dogsRooms[2].addPet(dogsInShelter[2]);
dogsRooms[3].addPet(dogsInShelter[3]);
dogsRooms[3].addPet(dogsInShelter[4]);

let listDogs = document.querySelector(".lists__pets");

updateHTML(dogsInShelter);

let incomeForm = document.querySelector(".income__form");

incomeForm.addEventListener("submit", addPet);

listDogs.childNodes.forEach((dogDetails) => {
  dogDetails.addEventListener("click", (dogInList) => {
    let dogToShow = document.querySelector(".lists__petDetails");
    dogToShow.innerHTML = dogsInShelter
      .find(
        (dogInShelter) => dogInShelter.petId == dogInList.target.id.slice(-1)
      )
      .details();
  });
});

function addPet(event) {
  event.preventDefault();

  let incomeForm = document.querySelector(".income__form");
  let newId = dogsInShelter[dogsInShelter.length - 1].petId + 1;
  let isDangerousForHumans = "no";
  let isDangerousForOtherPets = "no";
  let isSick = "no";
  let needSpecialTreatment = "no";

  if (incomeForm[4].checked) {
    isDangerousForHumans = "si";
  }
  if (incomeForm[5].checked) {
    isDangerousForOtherPets = "si";
  }
  if (incomeForm[6].checked) {
    isSick = "si";
  }
  if (incomeForm[7].checked) {
    needSpecialTreatment = "si";
  }
  const newDog = new Pet(
    newId,
    incomeForm[0].value,
    incomeForm[1].value,
    incomeForm[2].value,
    incomeForm[3].value,
    isDangerousForHumans,
    isDangerousForOtherPets,
    isSick,
    needSpecialTreatment
  );
  dogsInShelter.push(newDog);
  localStorage.setItem("newDogs", JSON.stringify(newDog));
  listDogs.innerHTML = "";
  updateHTML(dogsInShelter);
  incomeForm.reset();
}

function updateHTML(dogsToShow) {
  for (let i = 0; i < dogsToShow.length; ++i) {
    listDogs.appendChild(createDogsList(i, "li"));
  }
}

function createDogsList(i, container) {
  let dog = document.createElement(container);
  dog.innerText = dogsInShelter[i].petName;
  dog.id = "pet" + dogsInShelter[i].petId;
  dog.className += "dog";
  return dog;
}
