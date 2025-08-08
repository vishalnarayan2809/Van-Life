import { useLocation, Link, redirect, useActionData, Form, useNavigation } from "react-router-dom";
import { login } from "../utils/api";
import LoadingUI from "../utils/LoadingUI";
import { motion } from "framer-motion";

export async function LoginAction({ request }) {
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/host";
    
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        await login({ email, password });
        return redirect(redirectTo);
    } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error.code
            ? `Authentication failed: ${error.code.replace('auth/', '')}`
            : error.message || "Login failed";
        
        return { error: errorMessage };
    }
}

export default function Login() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    
    const error = actionData?.error;
    const url = new URL(window.location.href);
    const message = url.searchParams.get("message");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.15
            }
        }
    }
    
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 24 
            }
        }
    }

    const errorVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 20
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isSubmitting ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <LoadingUI/>
                </motion.div>
            ) : (
                <motion.div 
                    className="login"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {error && (
                        <motion.div 
                            style={{ 
                                color: "red", 
                                backgroundColor: "#ffeeee",
                                textAlign: "center",
                                padding: "1rem",
                                borderRadius: "4px",
                                marginBottom: "1rem"
                            }}
                            variants={errorVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {error}
                        </motion.div>
                    )}
                    {message && (
                        <motion.div 
                            style={{ 
                                color: "red",
                                textAlign: "center",
                                marginBottom: "1rem"
                            }}
                            variants={errorVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {message}
                        </motion.div>
                    )}
                    
                    <motion.h3 variants={itemVariants}>
                        Sign in to your account
                    </motion.h3>
                    
                    <Form method="post">
                        <motion.div variants={itemVariants}>
                            <motion.input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                disabled={isSubmitting}
                                required
                                whileFocus={{ 
                                    scale: 1.02, 
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)"
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <motion.input
                                type="password"
                                name="password"
                                placeholder="Password"
                                disabled={isSubmitting}
                                required
                                whileFocus={{ 
                                    scale: 1.02, 
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)"
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                        <motion.button 
                            type="submit" 
                            disabled={isSubmitting}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "#e76f05" 
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </motion.button>
                    </Form>
                    
                    <motion.p
                        variants={itemVariants}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Don't have an account? {" "}
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link to="/register" style={{ color: "orange" }}>
                                Create one now
                            </Link>
                        </motion.span>
                    </motion.p>
                </motion.div>
            )}
        </motion.div>
    );
}