import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  return (
    <div>
      <div className="mx-auto mt-12 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h2 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Name : {user.name ? user.name : "Guest"}
          </h2>
          <h3 className="text-1xl my-5 font-bold tracking-tight text-red-900">
            Email Address : {user.email}
          </h3>
          <div className="flow-root"></div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">Addresses :</p>
          {user.addresses.map((address) => (
            <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {address.fullName}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {address.streetAddress}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {address.region}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  {address.number}
                </p>
                <p className="text-sm/6 text-gray-500">
                  {address.pinCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
