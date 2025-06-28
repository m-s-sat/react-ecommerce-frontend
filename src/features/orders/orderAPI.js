// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders({ pagination }) {
  let querryString = "";
  for (let key in pagination) {
    querryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/orders?` + querryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
export function orderUpdate(order){
  return new Promise(async (resolve)=>{
    const response = await fetch("/orders/"+order.id,{
      method:"PATCH",
      body: JSON.stringify(order),
      headers: {"content-type" : "application/json"},
    });
    const data = await response.json();
    resolve({data});
  })
}
