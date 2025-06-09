import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { useEffect } from "react";

function Pagination({ handlePage, page, setPage, totalItems = 30, sort }) {
  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e)=>handlePage(e,page>1?page-1:page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Previous
        </div>
        <div
          onClick={(e)=>handlePage(e,page<totalPages?page+1:page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <div
              onClick={(e)=>handlePage(e,page>1?page-1:page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map(
              (el, index) => (
                <div
                  onClick={(e) => handlePage(e, index + 1)}
                  className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:bg-gray-50"
                  } cursor-pointer focus:z-20 focus:outline-offset-0 md:inline-flex`}
                >
                  {index + 1}
                </div>
              )
            )}
            <div
              onClick={(e)=>handlePage(e,page<totalPages?page+1:page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Pagination;