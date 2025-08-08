import { Outlet,useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LoadingUI from "./LoadingUI";
export default function Layout(){

     const navigation = useNavigation()

     const isLoading = navigation.state === "loading"
    return <>
            <Header/>
               {isLoading ? <LoadingUI/>: <main>
                 <Outlet/>
            </main>}
            <Footer/>
           </>
}