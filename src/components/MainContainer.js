
import { Outlet } from "react-router-dom";
import Body from "./Body";
import HeaderComp from "./HeaderComp";
const MainContainer=()=>{
   return(
    <div>
    <HeaderComp/>
     <Outlet/>
    </div>
   )
}

export default MainContainer;