
var addContactBtn = document.getElementById("addContactBtn");
var modal = document.getElementById("contactModal");
var closeModalBtn = document.querySelector(".btn-close");
var fullName = document.getElementById('fullName');
var phone = document.getElementById('phonenumber');
var email = document.getElementById('emailaddress');
var address = document.getElementById('address');
var category = document.getElementById('sgroup');
var notes = document.getElementById('notes');
var checkOption = document.getElementById('option');
var cancelBtn = document.getElementById('cancelBtn');
var addnewCon = document.getElementById('addnewcontact');
var rowData = document.getElementById('rowData');
var fileInput = document.getElementById('fileInput');
var uploadBtn = document.getElementById('uploadBtn');
var updateBtn = document.getElementById('updateBtn');

var contacts = [];

addContactBtn.onclick = function () {
    modal.style.display = "flex";
    modal.classList.remove("d-none");
    
};

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

cancelBtn.onclick = function(){
    modal.style.display = "none";
}

function closeForm() {
    modal.style.display = "none";
}

function uploadImage(){
  fileInput.click();
}



var contactList = JSON.parse(localStorage.getItem('contact')) || [];

displayAllContacts();
updateCounters();
checkNoContacts();

function addnewContact() {
  if(validateName() && validatePhoneNumber() && validateMailAddress()){
    var newContact = {
    name :  fullName.value,
    mobile : phonenumber.value,
    mail : emailaddress.value,
    add :  address.value,
    catg : sgroup.value,
    desc : notes.value,
    opt : option.value,
  }

    }

    contactList.push(newContact);

    localStorage.setItem('contact', JSON.stringify(contactList));

    updateCounters();
    checkNoContacts();

    clearAllContactForm();

    displayAllContacts();
    Swal.fire({
  title: "Added!",
  text: "Contact has been added Successfully.",
  icon: "success",
  draggable: true
});

    console.log(contactList)
}


function clearAllContactForm() {
    fullName.value = "" ;
    phonenumber.value = "" ;
    emailaddress.value = "" ;
    address.value = "" ;
    sgroup.value = "" ;
    notes.value = "" ;
    option.value = "" ;

    fullName.classList.remove('is-valid')
}


function displayAllContacts() {
    var box = "" ;
    for(i = 0 ; i< contactList.length ; i++){
    box += `
    <div class="col-md-6">
    <div class="contact-card">
  <div class="name-con d-flex align-items-center my-1">
    <div class="name-icon my-1">
    <span></span>
    </div>
    <div class="name-text mx-2">
  <h6>${contactList[i].name}</h6>
      <div class=" call-con d-flex">
      <div class="call-icon my-1">
      <span><i class="fa-solid fa-phone"></i></span>
    </div>
    <div class="call-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].mobile}</p>
    </div>
  </div>
  </div>
  </div>
  <div class="mail-con d-flex align-items-center my-1">
    <div class="mail-icon my-1">
      <span><i class="fa-solid fa-envelope"></i></span>
    </div>
    <div class="mail-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].mail}</p>
    </div>
  </div>
  <div class="loc-con d-flex  my-1">
    <div class="loc-icon my-1">
      <span><i class="fa-solid fa-location-dot"></i></span>
    </div>
    <div class="loc-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].desc}</p>
    </div>
  </div>
  <div class="group-con my-3">
    <span class ="fs-6">${contactList[i].catg}</span>
  </div>
  <div class="contact-card-footer d-flex justify-content-between my-4">
    <div class="left d-flex my-2">
      <div class="mail-icon mx-1">
        <span><i class="fa-solid fa-envelope"></i></span>
      </div>
      <div class="call-icon mx-1">
        <span><i class="fa-solid fa-phone"></i></span>
      </div>
    </div>
    <div class="right my-2">
      <span class="favv mx-1"><i class="fa-regular fa-star"></i></span>
      <span class="emerg mx-1"><i class="fa-regular fa-heart"></i></span>
      <span class="edit mx-1" onclick="updateContact(${i})" id="updateBtn"><i class="fa-solid fa-pen"></i></span>
      <span class="mx-1 del" onclick="deleteContact(${i})"><i class="fa-solid fa-trash"></i></span>
    </div>
  </div>
</div>
    </div>`
    }
    rowData.innerHTML = box;
}


function deleteContact(index){
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    contactList.splice(index , 1);
    localStorage.setItem('contact', JSON.stringify(contactList));
    displayAllContacts();
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}

var globalIndex;

function updateContact(index){

  globalIndex = index;
  fullName.value = contactList[index].name;
  phonenumber.value = contactList[index].mobile;
  emailaddress.value = contactList[index].mail;
  address.value = contactList[index].add;
  sgroup.value = contactList[index].catg;
  notes.value = contactList[index].desc;
  option.value = contactList[index].opt;
  

}

function updateThisItem(){
    var updateThisContact = {
    name :  fullName.value,
    mobile : phonenumber.value,
    mail : emailaddress.value,
    add :  address.value,
    catg : sgroup.value,
    desc : notes.value,
    opt : option.value,
};

contactList[globalIndex] = updateThisContact;


    localStorage.setItem('contact', JSON.stringify(contactList));

    clearAllContactForm();

    displayAllContacts();
}

function searchContact(element){

  var box = ``;
  for(var i = 0 ; i < contactList.length ; i++ ){
    if(contactList[i].name.toLowerCase().includes(element.value.toLowerCase())){

      box += `  <div class="col-md-6">
    <div class="contact-card">
  <div class="name-con d-flex align-items-center my-1">
    <div class="name-icon my-1">
    <span></span>
    </div>
    <div class="name-text mx-2">
  <h6>${contactList[i].name}</h6>
      <div class=" call-con d-flex">
      <div class="call-icon my-1">
      <span><i class="fa-solid fa-phone"></i></span>
    </div>
    <div class="call-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].mobile}</p>
    </div>
  </div>
  </div>
  </div>
  <div class="mail-con d-flex align-items-center my-1">
    <div class="mail-icon my-1">
      <span><i class="fa-solid fa-envelope"></i></span>
    </div>
    <div class="mail-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].mail}</p>
    </div>
  </div>
  <div class="loc-con d-flex  my-1">
    <div class="loc-icon my-1">
      <span><i class="fa-solid fa-location-dot"></i></span>
    </div>
    <div class="loc-txt mx-1 mt-2">
      <p class ="fs-6">${contactList[i].desc}</p>
    </div>
  </div>
  <div class="group-con my-3">
    <span class ="fs-6">${contactList[i].catg}</span>
  </div>
  <div class="contact-card-footer d-flex justify-content-between my-4">
    <div class="left d-flex my-2">
      <div class="mail-icon mx-1">
        <span><i class="fa-solid fa-envelope"></i></span>
      </div>
      <div class="call-icon mx-1">
        <span><i class="fa-solid fa-phone"></i></span>
      </div>
    </div>
    <div class="right my-2">
      <span class="favv mx-1"><i class="fa-regular fa-star"></i></span>
      <span class="emerg mx-1"><i class="fa-regular fa-heart"></i></span>
      <span class="edit mx-1" onclick="updateContact(${i})" id="updateBtn"><i class="fa-solid fa-pen"></i></span>
      <span class="mx-1 del" onclick="deleteContact(${i})"><i class="fa-solid fa-trash"></i></span>
    </div>
  </div>
</div>
    </div> `
    }

    rowData.innerHTML = box;
  }
}

function validateName(){
  var text = fullName.value;
  var errorName = document.getElementById('errorName');
  var regex = /^[A-Za-z][A-Za-z ]{3,12}$/;

  if(regex.test(text)){
    fullName.classList.add('is-valid');
    fullName.classList.remove('is-invalid');
    errorName.classList.add('d-none');
    return true;
  } else{
    fullName.classList.add('is-invalid');
    fullName.classList.remove('is-valid');
    errorName.classList.remove('d-none');
    return false;
  }
}

function validatePhoneNumber(){
  var text = phonenumber.value;
  var errorNum = document.getElementById('errorNum');
  var regex = /^01[0-2,5][0-9]{8}$/;

  if(regex.test(text)){
    phonenumber.classList.add('is-valid');
    phonenumber.classList.remove('is-invalid');
    errorNum.classList.add('d-none');
    return true;
  } else{
    phonenumber.classList.add('is-invalid');
    phonenumber.classList.remove('is-valid');
    errorNum.classList.remove('d-none');
    return false;
  }
}


function validateMailAddress(){
  var text = emailaddress.value;
  var errorMail = document.getElementById('errorMail');
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(regex.test(text)){
    emailaddress.classList.add('is-valid');
    emailaddress.classList.remove('is-invalid');
    errorMail.classList.add('d-none');
    return true;
  } else{
    emailaddress.classList.add('is-invalid');
    emailaddress.classList.remove('is-valid');
    errorMail.classList.remove('d-none');
    return false;
  }
}

function updateCounters(){
  document.getElementById('totalContacts').innerText = contactList.length;
    document.getElementById('totalCount').innerText = contactList.length;
}


function checkNoContacts(){
  var boxx = document.getElementById('noAnyContact');
  if(contactList.length === 0) {
    boxx.style.display = "block";
  } else {
    boxx.style.display = "none";
  }
}


























