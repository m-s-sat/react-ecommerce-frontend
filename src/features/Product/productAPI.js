// A mock function to mimic making an async request for data

import axios from "axios";

export function fetchAllProduct() {
  return new Promise(async(resolve)=>{
    const data = await axios.get('http://localhost:8080/products');
    resolve(data);
  });
}

export function fetchProductByFilters(filter){
  // TODO : on server we will support multi value
  let querryString = '';
  for(let key in filter){
    querryString+=`${key}=${filter[key]}&`
  }
  return new Promise (async(resolve)=>{
    const data = await axios.get(`http://localhost:8080/products?`+querryString)
    resolve(data);
  })
}