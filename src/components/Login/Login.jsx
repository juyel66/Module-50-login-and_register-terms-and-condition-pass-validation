import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef(null);
  const handleLogin = e => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)

    // reset error and success
    setRegisterError('');
    setSuccess('');

    // add validation 
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        if(result.emailVerified){
          setSuccess('User Login successfully');
        }
        else{
          alert('Please verify your email address')
        }
      })
      .catch(error => {
        console.error(error);
        setRegisterError(error.message)
      })

  }
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
      
      console.log('Please provide an email',emailRef.current.value)
      return;
    }
    else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log('please type a valid email')
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('Please check your email')
    })
    .catch(error =>{
      console.log(error
        )
    })
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                ref={emailRef}
                name="email"
                className="input input-bordered"
                required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center mt-12">
            {registerError && <p className="text-red-700">{registerError}</p>}
          </div>
          <div className="text-center mt-12">
            {success && <p className="text-green-500">{success}</p>}
          </div>
          <div className="mb-16 p-5">
            <p>new to this website please <Link className="text-blue-500" to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;