import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import {
  fetchLoggedInUserOrderAsync,
  selectLoggedInUserOrder,
  selectUserInfo,
} from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectLoggedInUserOrder);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch]);
  return (
    <div>
      {orders.map((order) => (
        <div className="mx-auto mt-12 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mt-8">
            <h2 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Orders Id : #{order.id}
            </h2>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">${product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty : {product.quantity}
                        </label>
                        <div className="flex"></div>
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
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Orders : </p>
              {order.totalItems > 1 ? (
                <p>{order.totalItems} items</p>
              ) : (
                <p>{order.totalItems} item</p>
              )}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Address : 
            </p>
            <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {order.selectedAddress.fullName}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {order.selectedAddress.streetAddress}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {order.selectedAddress.region}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">{order.selectedAddress.number}</p>
                <p className="text-sm/6 text-gray-500">{order.selectedAddress.pinCode}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
