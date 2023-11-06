import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../../firebase";
import classes from "./LoginPage.module.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassWordVisible, setIsPassWordVisible] = useState(false);
  
  const navigate = useNavigate();

  function handleSubmit(e) {

    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {

        

        const userFirebaseID = userCredential.user.uid  

       

       localStorage.setItem("user", userFirebaseID)

        alert("Logged in succesfully");
        
        navigate(-1);
      })
      .catch(error => {
        console.log("Error logging in: ", error);
      });
  }

  return (
    <main className={`${classes.container}`}>
      <h1 className="heading">Log in to your account</h1>

      <form onSubmit={handleSubmit} className={`${classes.form}`}>    

        <div className={`${classes.formInput} `}>
          <div>
            <label className="defaultText" htmlFor="email">
              Email:
            </label>
          </div>
          <div>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
            />
          </div>
        </div>

        <div className={`${classes.passwordContainer}`}>
          <div className={`${classes.passwordLabelContainer}`}>
            <label className="defaultText" htmlFor="password">
              Password:
            </label>
          </div>
          <div className={`${classes.passwordInnerContainer}`}>
            <div className={`${classes.passwordInputContainer}`}>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type={isPassWordVisible ? "text" : "password"}
                id="password"
               
              />

              {isPassWordVisible ? (
                <BsEye
                  onClick={() => setIsPassWordVisible(!isPassWordVisible)}
                  size={20}
                />
              ) : (
                <BsEyeSlash
                  onClick={() => setIsPassWordVisible(!isPassWordVisible)}
                  size={20}
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit">Log in</button>
        <div className="defaultText">Don't have an account? <Link to="/register">Register here</Link> .</div>
      </form>
    </main>
  );
};

export default LoginPage;
