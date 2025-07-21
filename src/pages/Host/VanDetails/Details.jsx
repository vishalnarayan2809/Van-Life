import { useOutletContext } from "react-router-dom"

export default function Details(){
    const {vanObj} = useOutletContext()
    
    return (
        <div className="details">
            <div className="detail-item">
                <strong>Name:</strong> {vanObj.name}
            </div>
            <div className="detail-item">
                <strong>Category:</strong> {vanObj.type}
            </div>
            <div className="detail-item">
                <strong>Description:</strong> {vanObj.description}
            </div>
            <div className="detail-item">
                <strong>Visibility:</strong> Public
            </div>
        </div>
    )
}