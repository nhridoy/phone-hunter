const inputText = document.getElementById("inputText");
const inputBtn = document.getElementById("inputBtn");
const loader = document.getElementById("loader");
const phones = document.getElementById("list");

// Toggle Loader
const toggleLoader = () => {
  loader.classList.toggle("hidden");
};

// Fething Data From API
inputBtn.addEventListener("click", () => {
  toggleLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputText.value}`
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
  inputText.value = "";
});

// Displaying Data in a List
const displayPhones = (phone) => {
  //   console.log(phone);
  phones.innerHTML = "";
  if (phone.length <= 0) {
    phones.innerHTML = `<div class="text-center text-2xl font-bold">No Results Found</div>`;
  } else {
    for (let i = 0; i < phone.length; i++) {
      if (i == 20) {
        break;
      } else {
        phones.innerHTML += `
        <div
        class="max-w-sm rounded shadow-lg flex flex-col items-center"
      >
        <img
          class="w-1/2"
          src="${phone[i].image}"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${phone[i].brand} ${phone[i].phone_name}</div>
          <p class="text-gray-700 text-base">${phone[i].brand}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <button
          id="detailsBtn" data-micromodal-trigger="modal-1" onclick="loadDetails('${phone[i].slug}')"
            class="bg-blue-500 rounded p-3 font-semibold text-white mr-2 mb-2"
          >
            Details
          </button>
        </div>
      </div>
        `;
      }
    }
    if (phone.length > 20) {
      phones.innerHTML += `<div class="flex flex-col gap-3 text-2xl font-bold">Showing 20 of ${phone.length} Results</div>`;
    }
  }
  toggleLoader();
};

// Load Details
const loadDetails = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// Displaying Modal
const displayDetails = (data) => {
  MicroModal.init({
    awaitCloseAnimation: true,
  });
  document.getElementById("modal-1-title").innerText = data.name;
  document.getElementById("modal-1-content").innerHTML = `
  <div class="grid grid-cols-3">
    <div class="col-span-1">
      <img src="${data.image}" class="w-1/2" />
    </div>
    <div class="col-span-2">
      <div class="font-bold text-xl mb-2"><span class="font-bold">Name: </span>${data.name}</div>
      <p class="text-gray-700 text-base"><span class="font-bold">Brand: </span>${data.brand}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Chip Set: </span>${data.mainFeatures.chipSet}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Display: </span>${data.mainFeatures.displaySize}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Memory: </span>${data.mainFeatures.memory}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Storage: </span>${data.mainFeatures.storage}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Sensors: </span>${data.mainFeatures.sensors}</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Release Date: </span>${data.releaseDate}</p>
    </div>
  </div>
  `;
};
