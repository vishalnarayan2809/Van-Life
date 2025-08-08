import { Mosaic } from "react-loading-indicators"
import { memo } from "react"

 function LoadingUI() {
    console.log("LoadingUI component rendered")
    return (
        <div style={{
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
            margin: "auto"
        }}>
            <Mosaic color="#FF8C38" size="medium" text="Loading..." textColor="" />
        </div>
    )
}

export default memo(LoadingUI)