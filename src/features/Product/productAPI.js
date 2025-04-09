// A mock function to mimic making an async request for data

import axios from "axios";

export function fetchAllProduct() {
  return new Promise(async(resolve)=>{
    const data = await axios.get('http://localhost:8080/products');
    resolve(data);
  });
}

export function fetchProductByFilters(filter,sort){
  // TODO : on server we will support multi value
  // filter = {"category : ["smartphone","laptops"};
  // sort = {_sort:"price",_order:"asc"};
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
  return new Promise (async(resolve)=>{
    const data = await axios.get(`http://localhost:8080/products?`+querryString)
    resolve(data);
  })
}