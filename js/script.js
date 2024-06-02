const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones);
}


const displayPhones = phones =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone =>{
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
          <button class="btn btn-info text-white bg-blue-700 mt-4">Show Details</button>
        </div>
      </div>


        `
        phoneContainer.appendChild(phoneCard);
    })
}


const handleSearch = () =>{
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText)
    loadPhone(inputText);
}

loadPhone();