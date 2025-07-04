import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import { EyeIcon, PencilIcon } from "@heroicons/react/16/solid";
import {
  fetchAllOrdersAsync,
  orderUpdateAsync,
  selectOrders,
  selectTotalOrders,
} from "../../orders/orderSlice";
import Pagination from "../../common/Pagination";

export default function AdminOrder() {
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const pagination = {
      _start: (page - 1) * ITEMS_PER_PAGE,
      _end: page * ITEMS_PER_PAGE,
    };
    dispatch(fetchAllOrdersAsync( pagination ));
  }, [dispatch, page]);
  const handleShow = ()=>{
    console.log("handleShow");
  }
  const handleEdit = (order)=>{
    setEditableOrderId(order.id);
  }
  const handleUpdate = (e,order)=>{
    const updateOrders = {...order, status:e.target.value};
    dispatch(orderUpdateAsync(updateOrders));
    setEditableOrderId(-1);
  }
  const chooseColor = (status)=>{
    switch(status){
      case 'pending':
        return 'bg-purple-200 text-gray-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  }
  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order#</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-left">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt="thumbnail"
                              />
                            </div>
                            <span>{item.product.title} - {item.quantity} - ${discountedPrice(item.product)}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex flex-col items-start justify-center">
                          <div><strong>{order.selectedAddress.fullName}</strong>,</div>{" "}
                          <div>{order.selectedAddress.city},</div>{" "}
                          <div>{order.selectedAddress.region},</div>{" "}
                          <div>{order.selectedAddress.pinCode},</div>{" "}
                          <div>{order.selectedAddress.number}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id===editableOrderId ?
                        (<select onChange={(e)=>handleUpdate(e,order)} value={order.status}>
                          <option value={"pending"}>Pending</option>
                          <option value={"dispatched"}>Dispatched</option>
                          <option value={"delivered"}>Delivered</option>
                          <option value={"cancelled"}>Cancelled</option>
                        </select>
                        ):(<span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                          {order.status}
                        </span>)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <EyeIcon className="w-8 h-8" onClick={(e)=>handleShow(order)}></EyeIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <PencilIcon className="w-8 h-8" onClick={(e)=>handleEdit(order)}></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
          sort={sort}
        ></Pagination> */}
      </div>
    </>
  );
}
