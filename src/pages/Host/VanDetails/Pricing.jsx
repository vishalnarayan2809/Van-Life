import { useOutletContext } from "react-router-dom"

export default function Pricing(){
    const{vanObj} = useOutletContext()
    console.log(vanObj)
    return <p id="price">${vanObj.price}/day</p>
}