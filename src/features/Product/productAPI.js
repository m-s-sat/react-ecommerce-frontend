// A mock function to mimic making an async request for data

import axios from "axios";

export function fetchAllProduct() {
  return new Promise(async(resolve)=>{
    const data = await axios.get('/products');
    resolve(data);
  });
}

export function fetchProductByFilters(filter,sort,pagination,admin){
  // TODO : on server we will support multi value
  // filter = {"category : ["smartphone","laptops"};
  // sort = {_sort:"price",_order:"asc"};
  // pagination = {_page:1,_limit:10}
  // TODO: Server will filetered the deleted product in case of non-admins 
  let querryString = '';
  for(let key in filter){
    const categoryValues  = filter[key];
    if(categoryValues.length>=1) {
      const lastCategoryValues = categoryValues[categoryValues.length-1];
      querryString += `${key}=${lastCategoryValues}&`;
    }
  }
  for(let key in sort){
    querryString += `${key}=${sort[key]}&`;
  }
  for(let key in pagination){
    querryString += `${key}=${pagination[key]}&`;
  }
  if(admin) querryString+='admin=true';
  return new Promise (async(resolve)=>{
    const response = await fetch(`/products?`+querryString)
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  })
}

export function fetchAllCategories(){
  return new Promise (async (resolve)=>{
    const data = await axios.get("/category")
    resolve(data);
  })
}

export function fetchAllBrands(){
  return new Promise(async (resolve)=>{
    const data = await axios.get("/brands");
    resolve(data);
  })
}

export function fetchProductById(id){
  return new Promise (async(resolve)=>{
    const response = await fetch('/products/'+id);
    const data = await response.json();
    resolve({data});
  })
}

export function createProduct(product){
  return new Promise (async(resolve)=>{
    const response = await fetch("/products/",{
      method:'POST',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json();
    resolve({data});
  })
}

export function updateProduct(product){
  return new Promise (async(resolve)=>{
    const response = await fetch("/products/"+product.id,{
      method:'PATCH',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'},
    })
    const data = await response.json();;
    resolve({data});
  })
}