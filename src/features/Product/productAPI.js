// A mock function to mimic making an async request for data

import axios from "axios";

export function fetchAllProduct() {
  return new Promise(async(resolve)=>{
    const data = await axios.get('http://localhost:8080/products');
    resolve(data);
  });
}

export function fetchProductByFilters(filter,sort,pagination){
  // TODO : on server we will support multi value
  // filter = {"category : ["smartphone","laptops"};
  // sort = {_sort:"price",_order:"asc"};
  // pagination = {_page:1,_limit:10}
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
  return new Promise (async(resolve)=>{
    const response = await fetch(`http://localhost:8080/products?`+querryString)
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  })
}