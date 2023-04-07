import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import Badge from 'react-bootstrap/Badge'
import { Badge } from 'react-bootstrap';
import Modal from '../modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';



export default function Navbar() {
  let data = useCart();
const [cartView,setCartView]=useState(false)
  const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem("authToken")
  navigate("/")

}

  return (
    <div>
        <nav  className="navbar navbar-expand-lg navbar-dark bg-warning " >
      <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" style={{color:"black"}} to="/">FoodMan</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" style={{color:"black"}} to="/">Home</Link>
        </li>

        {(localStorage.getItem("authToken"))?
          <Link className="nav-link active fs-5" aria-current="page" style={{color:"black"}} to="/myOrder">My Orders</Link>:""
        }
       
      </ul>
      {(!localStorage.getItem("authToken"))?
      
      <div className='d-flex'>
     
          <Link className="btn bg-white text-success mx-1" to="/loginuser" style={{color:"black"}}>Login</Link>
       
      
          <Link className="btn bg-white text-success mx-1" to="/createuser" style={{color:"black"}}>SignUp</Link>
       
        </div>:
        <div>
        <div style={{color:"black"}} className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart {" "}
        <Badge pill className="bg-danger text-white" >{data.length}</Badge>
        </div>
        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
        <div style={{color:"black"}} className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
        </div>
}
    </div>
  </div>
</nav>
    </div>
  )
}
