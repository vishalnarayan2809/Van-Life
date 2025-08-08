import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    const navigate = useNavigate();
    
    console.error("Route Error:", error);

    const getErrorInfo = () => {
        if (isRouteErrorResponse(error)) {
            return {
                status: error.status,
                statusText: error.statusText,
                message: error.data?.message || getStatusMessage(error.status)
            };
        }
        
        if (error instanceof Error) {
            return {
                status: null,
                statusText: "Error",
                message: error.message
            };
        }
        
        return {
            status: null,
            statusText: "Unknown Error",
            message: "An unexpected error occurred"
        };
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 404: return "Page not found";
            case 401: return "Unauthorized access";
            case 403: return "Access forbidden";
            case 500: return "Internal server error";
            default: return "Something went wrong";
        }
    };

    const { status, statusText, message } = getErrorInfo();

    return (
        <div style={{ 
            margin: "auto", 
            textAlign: "center", 
            padding: "2rem",
            maxWidth: "600px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1 style={{ color: "#ff6b6b", marginBottom: "1rem" }}>
                {status ? `${status} Error` : "Oops!"}
            </h1>
            
            <h2 style={{ color: "#666", fontWeight: "normal" }}>
                {statusText}
            </h2>
            
            <p style={{ color: "#888", margin: "1rem 0" }}>
                {message}
            </p>
            
            <div style={{ marginTop: "2rem" }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        padding: "0.75rem 1.5rem",
                        margin: "0 0.5rem",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Go Back
                </button>
                
                <button 
                    onClick={() => navigate("/")}
                    style={{
                        padding: "0.75rem 1.5rem",
                        margin: "0 0.5rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Home
                </button>
            </div>
        </div>
    );
}