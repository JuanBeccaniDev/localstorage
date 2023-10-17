  // Obtiene la lista de mascotas desde el almacenamiento local
  function getPetList() {
    const petList = localStorage.getItem('petList');
    return petList ? JSON.parse(petList) : [];
  }

  // Actualiza la lista de mascotas en el almacenamiento local
  function updatePetList(newPetList) {
    localStorage.setItem('petList', JSON.stringify(newPetList));
  }

  // Renderiza la lista de mascotas en el DOM
  function renderPetList() {
    const petList = getPetList();
    const petListContainer = document.getElementById('petList');
    petListContainer.innerHTML = '';

    petList.forEach((pet, index) => {
      const petItem = document.createElement('div');
      petItem.innerHTML = `<p>${pet.name} - Precio: $${pet.price}</p>`;
      petListContainer.appendChild(petItem);

      // Agrega un botón para eliminar la mascota
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => {
        petList.splice(index, 1);
        updatePetList(petList);
        renderPetList();
      });

      petItem.appendChild(deleteButton);
    });
  }

  // Agrega una nueva mascota a la lista
  function addPet() {
    const petNameInput = document.getElementById('petName');
    const petPriceInput = document.getElementById('petPrice');
    const name = petNameInput.value;
    const price = parseFloat(petPriceInput.value);

    if (name && !isNaN(price)) {
      const petList = getPetList();
      petList.push({ name, price });
      updatePetList(petList);
      renderPetList();
      petNameInput.value = '';
      petPriceInput.value = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderPetList();

    const addPetButton = document.getElementById('addPet');
    addPetButton.addEventListener('click', addPet);
  });








