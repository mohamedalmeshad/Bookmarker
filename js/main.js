// Selectors
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var validationBox = document.getElementById("validationBox");
var dataRow = document.getElementById("row");

// Local storage setup
if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmarkList();
} else {
  bookmarkList = [];
}

// Add bookmark
function addBookmark() {
  var bookmark = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  if (isValidName(bookmark.name) && isValidUrl(bookmark.url)) {
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmarkList();
    clear();
  } else {
    validationBox.classList.remove("d-none");
  }
}

// Close validation box
function closeValidationBox() {
  validationBox.classList.add("d-none");
}

// Display bookmarks
function displayBookmarkList() {
  var box = ``;
  for (var i = 0; i < bookmarkList.length; i++) {
    let url = bookmarkList[i].url;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    box += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>
        <td>
          <a href="${url}" class="btn btn-visit" target="_blank">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit
          </a>
        </td>
        <td>
          <button class="btn btn-delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>
    `;
  }
  dataRow.innerHTML = box;
}

// Delete bookmark
function deleteBookmark(deleteIndex) {
  bookmarkList.splice(deleteIndex, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmarkList();
}

// Clear inputs
function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
}

// Validation
function isValidName(name) {
  var nameRegex = /^[A-Za-z]{3,}$/;
  return nameRegex.test(name);
}

function isValidUrl(url) {
  var urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
  return urlRegex.test(url);
}

// Toggle validation classes
function toggleValidation(input, validator) {
  if (validator(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

// Inputs validation
function changeNameShadow() {
  toggleValidation(siteNameInput, isValidName);
}

function changeUrlShadow() {
  toggleValidation(siteUrlInput, isValidUrl);
}
