import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteCartItemAsync, selectCart, updateCartAsync } from "./cartSlice";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const products = useSelector(selectCart);
  const totalAmount = Math.ceil(products.reduce((amount, item)=>item.product.price*item.quantity+amount,0));
  const totalItems = products.reduce((total,item)=>item.quantity+total,0)
  const dispatch = useDispatch();
  const handleQuantity = (e,product)=>{
    dispatch(updateCartAsync({id:products.id,quantity:+e.target.value}));
  }
  const handleDelete = (e,product)=>{
    dispatch(deleteCartItemAsync(product));
  }
  return (
    <>
      {!products.length && <Navigate to={'/'} replace={true}></Navigate>}
      <div className="mx-auto mt-12 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mt-8">
        <h2 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Cart</h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.product.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.product.title}
                      src={product.product.thumbnail}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.product.href}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">${product.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">Qty</label>
                      <select onChange={(e)=>handleQuantity(e,product)} value={product.quantity}>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                      </select>

                      <div className="flex">
                        <button
                          onClick={(e)=>handleDelete(e,product)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total items in Cart : </p>
            {totalItems>1?(<p>{totalItems} items</p>):<p>{totalItems} item</p>}
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link to={"/checkout"}
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to={"/"}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
