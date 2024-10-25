import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/register");
    };

    const handleSignIn = () => {
        navigate("/login");
    };
    const handleContinue = () => {
        navigate("/Products");
    };
    
  return (
    <div className="Front">
        <div className="overlay">
        <div className="text-overlay ">
        <h1 className="">
          TASTE<span className="itallic">N</span>SHOP
        </h1>
        <h3 className="">
          Your One Stop <br />
          Shop For All <br /> Shopping Items
        </h3>
      </div>
      <div className="Sign">
        <h1>Create An Account With Us</h1>
        <button onClick={handleSignUp} className="btn mb-2">Sign Up</button>

        <h1>Already Have An Account?</h1>
        <button onClick={handleSignIn} className="btn mb-2">Sign In</button>

        <h1>Continue Without An Account</h1>
        <button onClick={handleContinue} className="btn mb-2">continue</button>
      </div>
        </div>
    </div>
  );
}

export default Home;
