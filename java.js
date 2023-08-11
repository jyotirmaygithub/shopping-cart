let sectionbox = document.getElementById("section");

todisplay();

// i made this function to display the product at the screen by using array
function todisplay() {
  let dataarray = "";
  let data = shoppingdata;

  data.forEach((item, index) => {
    let { id, name, price, desc, img } = item;

    let avaiabledata = avaliabledatalocal()
    let solving;
    avaiabledata.find((x)=>{
      if(x.id == id){
      solving = x.item
      }
  })
    
    dataarray += ` <div class="entity-box" id="product-id-${id}">
        <img class="box-image" src="${img}" alt="${name}" />
        <h2>${name}</h2>
        <p>
          ${desc}
        </p>
        <div class="universal">
          <h2>Rs ${price}</h2>
          <div>
            <span class="down" onclick="subtraction(${id})">-</span> 
            <span id="${id}">${solving ?? 0}</span>
            <span class="up" onclick="adding(${id})">+</span>
          </div>
        </div>
      </div>`;
  });

  sectionbox.innerHTML = dataarray;
  carttotal()
}

// in the making of this function chatgpt helped me
function subtraction(zero_line) {
  let selectedproduct = avaliabledatalocal();
  let zero_line_coming = zero_line;

  // Find the index of the entity with the matching ID
  let index = selectedproduct.findIndex((x) => {
    return x.id === zero_line_coming.id;
  });
  
  console.log("this is the index value =", index)
  // If no matching entity is found, or if the entity's item count is already zero, return
  if (index === -1 || selectedproduct[index].item === 0) {
    return;
  } else {
    // Decrement the item count of the entity
    selectedproduct[index].item -= 1;

    // If the quantity becomes zero, remove the entity from the array
    if (selectedproduct[index].item === 0) {
      selectedproduct.splice(index, 1);
    }
  }

  // Update local storage with the modified selectedproduct array
  localStorage.setItem("entity", JSON.stringify(selectedproduct));

  // Call functions to update the display and cart total
  todisplay();
  carttotal();
}

// it is for adding products into the localstorage and on the screen 
function adding(zero_line) {

  let selectedproduct = avaliabledatalocal()
  let zero_line_coming = zero_line
  let searching = selectedproduct.find((x) => {
    return x.id === zero_line_coming.id
  }) 

  if(searching === undefined){
    selectedproduct.push({
      id : zero_line_coming.id,
      item : 1,
    })
  }
  else{
    searching.item += 1;
  }
  localStorage.setItem("entity",JSON.stringify(selectedproduct))
  todisplay()
  carttotal()
}

// at the top there is a total quantity of product which we selected, this function is responsible in showing it appropriately
function carttotal(){
  let sum  = 0
  let cartvalue = avaliabledatalocal()
  cartvalue.forEach((element) => {
     sum  += element.item
     console.log(sum)
  });
  document.getElementById("top-zero").innerHTML = sum
}

// this is to access local storage for the concerned
function avaliabledatalocal(){
  let inserted_data 

  if(localStorage.getItem("entity") === null){
    inserted_data = []
  }
  else{
    inserted_data = JSON.parse(localStorage.getItem("entity"))
  }
  return inserted_data
}
