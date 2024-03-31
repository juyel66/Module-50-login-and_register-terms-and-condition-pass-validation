import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, password,accepted)

        // Reset error and success messages
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters long");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password must contain at least one uppercase letter');
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and condition!")
        }

        // Create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully');

                // update profile 
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>{
                    console.log('profile updated')
                })
                .catch(error =>{
                    console.log(error.message)

                })
                // send email verification 
                sendEmailVerification(result.user)
                .then(()=>{
                    alert("Please check your email and very your")
                })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            });
    };

    return (
        <div className="mx-auto mt-10 p-4 bg-gray-300 rounded-lg lg:w-1/3">
            <h1 className="text-3xl text-center">Please Register</h1>
            <form onSubmit={handleRegister} className="text-center space-y-4 mt-4">
                <input className="w-full h-12 rounded-full" type="email" name="email" placeholder="Enter your email" required />

                <input className="w-full h-12 rounded-full" type="text" name="name" placeholder="Enter your name" required />
                <br />
                <div className="relative">
                    <input
                        className="w-full h-12 rounded-full pr-12"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your Password"
                        required
                    />
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="mt-4" htmlFor="terms">Accept our <a href="">terms and condition</a></label>
                    <span onClick={() => setShowPassword(!showPassword)} className="password-toggle absolute top-1/2 right-4 transform -translate-y-1/2">
                        {showPassword ? <IoIosEyeOff /> : <IoEye />}
                    </span>
                </div>
                <br />
                <input className="w-full h-12 bg-blue-500 text-white rounded-full" type="submit" value="Register" />
            </form>
            <div className="text-center mt-12">
                {registerError && <p className="text-red-700">{registerError}</p>}
            </div>
            <div className="text-center mt-12">
                {success && <p className="text-green-500">{success}</p>}
            </div>
            <p>Already have an account <Link className="text-blue-500" to="/login">Login</Link></p>
        </div>
    );
};

export default Register;
