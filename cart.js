let cartcontainer = document.getElementById("section2");
let clearcart = document.getElementById("clear_cart");
let totalbill = document.getElementById("total_bill")

// showingdata is responsible to get the data from data.js
let orginaldata = shoppingdata;
cartdisplay();

// this is one of the main function to show selected items to our user which they selected from the orginal screen 
function cartdisplay() {
  let getdatalocal = JSON.parse(localStorage.getItem("entity"));
  let cartarray = "";
  let accumulating = 0;
  tochangeinterface()

  getdatalocal.forEach((entity) => {
    let data = orginaldata.find((x) => x.id === entity.id);

    let { id, name, price, img } = data;

    accumulating += entity.item * price

    cartarray += ` <div class="entity_container">
   <img src="${img}"  alt="">
<div class="details universal2">
   <h3>${name}</h3>
   <p>${price}</p>
   <div>
   <span id="${id}" onclick="subtraction(this.id)" >-</span>
   <span >${entity.item}</span>             
   <span id="${id}" onclick="adding(this.id)">+</span>
   </div>
   <p>Rs : ${price * entity.item}</p>
</div>
<div class="delete">
    <span class="material-symbols-outlined" id="${id}" onclick="remove(this.id)">
        delete
    </span>
</div>

</div>`;
  });
  totalbill.innerHTML = accumulating
  cartcontainer.innerHTML = cartarray;
}

function subtraction(id) {
  let selectedproduct = avaliabledatalocal();
  let index = selectedproduct.findIndex((x) => {
    return x.id === id;
  });

  if (index === -1 || selectedproduct[index].item === 0) return;
  else {
    selectedproduct[index].item -= 1;
  }

  if (selectedproduct[index].item === 0) {
    selectedproduct.splice(index, 1);
  }

  localStorage.setItem("entity", JSON.stringify(selectedproduct));
  cartdisplay();
}

function adding(id) {
  console.log(id);
  let selectedproduct = avaliabledatalocal();
  let searching = selectedproduct.find((x) => {
    return x.id === id;
  });
  searching.item += 1;

  localStorage.setItem("entity", JSON.stringify(selectedproduct));
  cartdisplay();
}

function avaliabledatalocal() {
  let inserted_data;

  if (localStorage.getItem("entity") === null) {
    inserted_data = [];
  } else {
    inserted_data = JSON.parse(localStorage.getItem("entity"));
  }
  return inserted_data;
}

// this function is used here to remove the data by clicking at delete option
function remove(id) {
  let cartdata = avaliabledatalocal();
  let index = cartdata.findIndex((x) => {
    return x.id === id;
  });
  cartdata.splice(index, 1);
  localStorage.setItem("entity", JSON.stringify(cartdata));
  cartdisplay();
}

// by clicking i am making my localstorage empty
clearcart.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// to change user interface i made this function 
function tochangeinterface(){
  let localStoragedata = avaliabledatalocal()
  let billbox = document.getElementById("bill_box")
  let empty = document.getElementById("emptycart")
  let backtohome = document.getElementById("backtohome")
  if(localStoragedata.length == 0){
    billbox.style.display = "none"
    backtohome.style.display = "block"
    empty.innerHTML = "Cart is empty"
  }
}
