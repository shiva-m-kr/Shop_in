import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { UserDataContext } from "../context/UserContext.jsx";
import AuthHeader from "../component/auth/AuthHeader";
import GoogleAuthButton from "../component/auth/GoogleAuthButton";

function Login() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    let { serverUrl } = React.useContext(AuthDataContext);
    let { getCurrentUser } = React.useContext(UserDataContext);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );

            console.log(result.data);
            await getCurrentUser();
            navigate("/");
        } catch (err) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        }
    };

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            let user = response.user;
            let userName = user.displayName;
            let userEmail = user.email;

            const result = await axios.post(
                serverUrl + "/api/auth/googlelogin",
                { name: userName, email: userEmail },
                { withCredentials: true }
            );

            console.log(result.data);
            await getCurrentUser();
            navigate("/");
        } catch (error) {
            console.log("CODE:", error.code);
            console.log("MESSAGE:", error.message);
            console.log("ERROR:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex flex-col justify-between">
            <AuthHeader />

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full flex flex-col items-center justify-center gap-1.5 mb-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500">
                        Login to your ShopIn account to continue shopping
                    </p>
                </div>

                {/* Login Card */}
                <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 sm:p-8">
                    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleLogin}>
                        <GoogleAuthButton onClick={googleSignup} text="Sign in with Google" />

                        {/* Inputs */}
                        <div className="w-full flex flex-col gap-3.5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-full h-11 border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 rounded-xl bg-slate-50/70 focus:bg-white placeholder:text-slate-400 px-4 text-sm font-medium text-slate-900 outline-none transition-all shadow-2xs"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Password
                                </label>
                                <div className="w-full relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full h-11 border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 rounded-xl bg-slate-50/70 focus:bg-white placeholder:text-slate-400 px-4 pr-12 text-sm font-medium text-slate-900 outline-none transition-all shadow-2xs"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <span
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-11 mt-2 bg-[#0c7c86] hover:bg-[#096068] rounded-xl text-white font-bold cursor-pointer transition shadow-md shadow-[#0c7c86]/25 text-sm active:scale-[0.99]"
                            >
                                Login
                            </button>
                        </div>

                        {/* Registration Link */}
                        <p className="text-slate-500 text-xs mt-2">
                            Don't have an account?
                            <span
                                className="ml-1 text-[#0c7c86] hover:text-[#096068] cursor-pointer font-bold"
                                onClick={() => navigate("/registration")}
                            >
                                Register
                            </span>
                        </p>
                    </form>
                </div>
            </div>

            {/* Bottom spacer */}
            <div className="py-4 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} ShopIn Inc. All rights reserved.
            </div>
        </div>
    );
}

export default Login;
