const inputText = document.getElementById("inputText");
const inputBtn = document.getElementById("inputBtn");
const loader = document.getElementById("loader");
const phones = document.getElementById("list");
const more = document.getElementById("more");
let search;

// Toggle Loader
const toggleLoader = () => {
  loader.classList.toggle("hidden");
};

// Fething Data From API
inputBtn.addEventListener("click", () => {
  search = inputText.value;
  toggleLoader();
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, false));
  inputText.value = "";
});

// Displaying Data in a List
const displayPhones = (phone, isMore) => {
  phones.innerHTML = "";
  more.innerHTML = "";
  if (isMore) {
    for (let i = 0; i < phone.length; i++) {
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
    more.innerHTML += `<div class="flex flex-col items-center m-6 gap-3">
        <p class=" text-2xl font-bold">Showing ${phone.length} of ${phone.length} Results</p>
        </div>`;
  } else {
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
      more.innerHTML += `<div class="flex flex-col items-center m-6 gap-3">
        <p class=" text-2xl font-bold">Showing 20 of ${phone.length} Results</p>
        <button class="bg-blue-500 rounded p-3 font-semibold text-white mr-2 mb-2" onclick="loadMore()">
          Load More
          </button>
        </div>`;
    }
  }

  toggleLoader();
};

// Load More
const loadMore = () => {
  toggleLoader();
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, true));
};

// Load Details
const loadDetails = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// Displaying Modal
const displayDetails = (data) => {
  MicroModal.show("modal-1", {
    awaitCloseAnimation: true,
  });
  document.getElementById("modal-1-title").innerText = data.name;
  document.getElementById("modal-1-content").innerHTML = `
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="col-span-1">
      <img src="${data.image}" class="w-1/2" />
    </div>
    <div class="col-span-2">
      <div class="font-bold text-xl mb-2"><span class="font-bold">Name: </span>${
        data.name
      }</div>
      <p class="text-gray-700 text-base"><span class="font-bold">Brand: </span>${
        data.brand
      }</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Chip Set: </span>${
        data.mainFeatures.chipSet
      }</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Display: </span>${
        data.mainFeatures.displaySize
      }</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Memory: </span>${
        data.mainFeatures.memory
      }</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Storage: </span>${
        data.mainFeatures.storage
      }</p>
      <p class="text-gray-700 text-base"><span class="font-bold">Sensors: </span><ul>${sensorsHandler(
        data.mainFeatures.sensors
      )}</ul></p>
      <p class="text-gray-700 text-base"><span class="font-bold">Release Date: </span>${
        data.releaseDate ? data.releaseDate : "No Date Found"
      }</p>
      <p class="text-gray-700 text-base">${
        data.others
          ? `<span class="font-bold">Other Features: </span> <br>
          <span class="font-bold">Bluetooth: </span> ${data.others.Bluetooth} <br>
          <span class="font-bold">GPS: </span> ${data.others.GPS} <br>
          <span class="font-bold">NFC: </span> ${data.others.NFC} <br>
          <span class="font-bold">Radio: </span> ${data.others.Radio} <br>
          <span class="font-bold">USB: </span> ${data.others.USB} <br>
          <span class="font-bold">WLAN: </span> ${data.others.WLAN} <br>
          `
          : ``
      }</p>
    </div>
  </div>
  `;
};

// Sensors Handler
const sensorsHandler = (sensors) => {
  let sensorsList = "";
  if (Array.isArray(sensors)) {
    for (let i = 0; i < sensors.length; i++) {
      sensorsList += `<li>${i + 1}. ${sensors[i]}</li>`;
    }
  } else {
    sensorsList = `<li>${sensors}</li>`;
  }
  return sensorsList;
};
