import { useOutletContext } from "react-router-dom"


export default function Photos(){
    const{vanObj} = useOutletContext()
    return <img src={vanObj.imageUrl} alt="van image" style={{width: "80px"}}></img>
}