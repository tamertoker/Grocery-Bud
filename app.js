
// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = ''

// ****** EVENT LISTENERS **********

form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)
window.addEventListener('DOMContentLoaded', setupItems)
// ****** FUNCTIONS **********
function addItem(e){
	e.preventDefault();
	const value = grocery.value
	const id = new Date().getTime().toString()
	if(value !== "" && !editFlag){
						createListItem(id,value)
            container.classList.add('show-container')
            displayAlert('Ürün başarıyla eklendi.', 'success')
            addToLocalStorage(id,value);
            setBackToDefault();
	}
	else if(value !== "" && editFlag){
		editElement.innerHTML = value;
		displayAlert('Ürün başarıyla düzenlendi.', 'success')
		editLocalStorage(editID, value)
		setBackToDefault()
	}
	else{
		displayAlert('Boş değer girdiniz.', 'danger')
}
}

function clearItems(){
	const items = document.querySelectorAll('.grocery-item')
	if (items.length > 0){
		items.forEach(function(item){
			list.removeChild(item)
		})
	}
	else{
		displayAlert('Liste zaten boş.', "danger")
	}
		displayAlert('Liste başarıyla temizlendi.', "success")
		container.classList.remove('show-container')
		localStorage.removeItem('list')
}

// display alert

function displayAlert(text,action){
	if(alert.textContent !== ""){
		alert.textContent = ""
		alert.className = "alert"
	}
	alert.classList.add(`alert-${action}`)
	alert.textContent = text;
}

//edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = editElement.dataset.id;
  //
  submitBtn.textContent = "Düzenle";
}

//delete function

function deleteItem(e){
	const element = e.currentTarget.parentElement.parentElement;
  	const id = element.dataset.id;
	list.removeChild(element)
	if (list.children.length === 0){
		container.classList.remove('show-container')
	}
	displayAlert('Ürün listeden kaldırıldı', 'danger')
	setBackToDefault();
	removeFromLocalStorage(id)
}

//set back to default
function setBackToDefault(){
	console.log('setted back to default')
	grocery.value = ""
	editFlag = false;
	editID = ""
	submitBtn.textContent = "Ekle"
}
// ****** LOCAL STORAGE **********

function addToLocalStorage(id,value){
	const grocery = { id, value }; //{id:id, value:value}
	let items = getLocalStorage(); //get items from local storage
	items.push(grocery) // push one grocery to items
	localStorage.setItem('list', JSON.stringify(items)) // and push back updated items to local storage
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  console.log(items)
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
  console.log(items)
}

function removeFromLocalStorage(id){

	let items = getLocalStorage();
	items = items.filter(function(item){
		if(item.id !== id){
			return item
		}
	})
	localStorage.setItem('list', JSON.stringify(items)) // updating
}

function getLocalStorage() {
  	return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// ****** SETUP ITEMS **********

function setupItems(){
	let items = getLocalStorage()
	if (items.length > 0){
		items.forEach(function(item){
			createListItem(item.id, item.value)
		})
		container.classList.add('show-container')
	}
}

function createListItem(id,value){
	const element = document.createElement('article'); //creating element
		element.classList.add('grocery-item')
		let attr = document.createAttribute('data-id'); //id atama
		attr.value = id;
		element.setAttributeNode(attr);
		element.classList.add("grocery-item");
		element.innerHTML = `<p class ='title'>${value}</p>
            <div class = 'btn-container'>
              <button type = 'button' class='edit-btn'>
                <i class = "fas fa-edit"></i>
              </button>
              <button type = 'button' class='delete-btn'>
                <i class = "fas fa-trash"></i>
              </button>
            </div>`;
            
            // **** BUTON EKLEME ****

            const deleteBtn = element.querySelector(".delete-btn");
    		deleteBtn.addEventListener("click", deleteItem);
    		const editBtn = element.querySelector(".edit-btn");
    		editBtn.addEventListener("click", editItem);
            
            // **** LİSTEYE ALMA **** 

            list.appendChild(element) 
}

/*localStorage.setItem("orange", JSON.stringify(["item1", "item2"]));
const oranges = JSON.parse(localStorage.getItem('orange'))
console.log(oranges)
localStorage.removeItem("orange")*/