import AdminProductList from "../features/admin/componenets/AdminProductList";
import Navbar from "../features/navbar/Navbar";
function AdminHomePage(){
    return (
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
    );
}
export default AdminHomePage;