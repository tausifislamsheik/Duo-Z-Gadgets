const loadPhone = async (searchText = 'iphone', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
   if(!isShowAll){
     phones = phones.slice(0, 12);
   }
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
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-info text-white bg-blue-700 mt-4">Show Details</button>
        </div>
      </div>


        `
        phoneContainer.appendChild(phoneCard);

    });
    // Hide loading spinner

    toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) =>{
      console.log('clicked')
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
      const data = await res.json();
      const phone = data.data;
      showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    // const phoneName = document.getElementById('phone-name');
    // phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class="mx-auto" src="${phone.image}" alt="">
    <h3 id="phone-name" class="font-bold text-2xl text-center my-2">${phone.name}</h3>
    <div class="mx-10">
         <p><span class="font-bold">Storage : </span>${phone.mainFeatures.storage}</p>
         <p><span class="font-bold">Chip Set : </span>${phone.mainFeatures.chipSet}</p>
         <p><span class="font-bold">Display Size : </span>${phone.mainFeatures.displaySize}</p>
         <p><span class="font-bold">Slug : </span>${phone.slug}</p>
         <p><span class="font-bold">Gps : </span>${phone.others?.GPS || 'No gps avaiable'}</p>
    </div>
    `
    show_details_modal.showModal();
}


const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText)
    loadPhone(inputText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();