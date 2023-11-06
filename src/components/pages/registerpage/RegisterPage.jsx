import { useEffect, useState } from "react";
import classes from "./RegisterPage.module.css";
import { RxCross1 } from "react-icons/rx";
import { BsCheckLg, BsEyeSlash, BsEye } from "react-icons/bs";
import { auth, db } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [isPassWordVisible, setIsPassWordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [doesPasswordhaveSpecChar, setDoesPasswordhaveSpecChar] =
    useState(false);
  const [doesPasswordhaveCapitalLetter, setDoesPasswordhaveCapitalLetter] =
    useState(false);
  const [doesPasswordHaveANumber, setDoesPasswordHaveANumber] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      telephone === "" ||
      houseNo === "" ||
      street === "" ||
      country === "" ||
      city === "" ||
      zipCode === "" ||
      !isPasswordValid ||
      !isEmailValid
    ) {
      alert("PLease fill in all field correctly");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const myUserUid = auth.currentUser.uid;

          localStorage.setItem("user", myUserUid)

          setDoc(doc(db, "user-profiles", `${myUserUid}`), {
            firstName,
            lastName,
            email,
            telephone,
            houseNo,
            street,
            country,
            city,
            zipCode,
            numOfOrders: 0,
          });

          navigate("/");
        })
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            alert("There already is an account with this email address");
          } else {
            alert("Error registering user");
          }
        });
    }
  };

  function handleEmailInput(text) {
    setEmail(text);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(text)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function handlePasswordInput(text) {
    setPassword(text);

    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&?*])");
    const length = new RegExp("(?=.{8,})");

    if (upper.test(text)) {
      setDoesPasswordhaveCapitalLetter(true);
    } else {
      setDoesPasswordhaveCapitalLetter(false);
    }

    if (number.test(text)) {
      setDoesPasswordHaveANumber(true);
    } else {
      setDoesPasswordHaveANumber(false);
    }

    if (special.test(text)) {
      setDoesPasswordhaveSpecChar(true);
    } else {
      setDoesPasswordhaveSpecChar(false);
    }

    if (length.test(text)) {
      setIsPasswordLongEnough(true);
    } else {
      setIsPasswordLongEnough(false);
    }
  }

  useEffect(() => {
    if (
      doesPasswordHaveANumber &&
      doesPasswordhaveCapitalLetter &&
      doesPasswordhaveSpecChar &&
      isPasswordLongEnough
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  return (
    <main className={`${classes.container}`}>
      <h1 className="heading">Register an account</h1>

      <form onSubmit={handleSubmit} className={`${classes.form}`}>
        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="firstName">
              First name:
            </label>
          </div>
          <div>
            <input
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              id="firstName"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="lastName">
              Last name:
            </label>
          </div>
          <div>
            <input
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              type="text"
              id="lastName"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="telephone">
              Telephone NO:
            </label>
          </div>
          <div>
            <input
              onChange={e => setTelephone(e.target.value)}
              value={telephone}
              type="text"
              id="telephone"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="street">
              Street:
            </label>
          </div>
          <div>
            <input
              onChange={e => setStreet(e.target.value)}
              value={street}
              type="text"
              id="street"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="houseNO">
              House NO:
            </label>
          </div>
          <div>
            <input
              onChange={e => setHouseNo(e.target.value)}
              value={houseNo}
              type="text"
              id="houseNO"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="zipCode">
              Zipcode:
            </label>
          </div>
          <div>
            <input
              onChange={e => setZipCode(e.target.value)}
              value={zipCode}
              type="text"
              id="zipCode"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="city">
              City:
            </label>
          </div>
          <div>
            <input
              onChange={e => setCity(e.target.value)}
              value={city}
              type="text"
              id="city"
            />
          </div>
        </div>

        <div className={`${classes.formInput}`}>
          <div>
            <label className="defaultText" htmlFor="country">
              Country:
            </label>
          </div>
          <div>
            <input
              onChange={e => setCountry(e.target.value)}
              value={country}
              type="text"
              id="country"
            />
          </div>
        </div>

        <h2 className="subHeading textAlign">Your login data:</h2>

        <div className={`${classes.formInput} `}>
          <div>
            <label className="defaultText" htmlFor="email">
              Email:
            </label>
          </div>
          <div>
            <input
              onChange={e => handleEmailInput(e.target.value)}
              value={email}
              type="email"
              id="email"
            />
            {!isEmailValid ? (
              <p className={`${classes.error2}`}>
                Please enter a valid emailadress
              </p>
            ) : (
              <p className={`${classes.correct2}`}>Valid email address</p>
            )}
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
                onChange={e => handlePasswordInput(e.target.value)}
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
            <div className={`${classes.passwordsChecks}`}>
              {isPasswordLongEnough ? (
                <div className={`${classes.rowContainer}`}>
                  <BsCheckLg color="green" />
                  <p className={`${classes.correct}`}>
                    Password has 8 characters or more
                  </p>
                </div>
              ) : (
                <div className={`${classes.rowContainer}`}>
                  <RxCross1 color="red" />
                  <p className={`${classes.error}`}>
                    Password needs to be at least 8 characters long
                  </p>
                </div>
              )}

              {doesPasswordHaveANumber ? (
                <div className={`${classes.rowContainer}`}>
                  <BsCheckLg color="green" />
                  <p className={`${classes.correct}`}>
                    Password has a number in it
                  </p>
                </div>
              ) : (
                <div className={`${classes.rowContainer}`}>
                  <RxCross1 color="red" />
                  <p className={`${classes.error}`}>
                    Password needs to have at least one number
                  </p>
                </div>
              )}

              {doesPasswordhaveCapitalLetter ? (
                <div className={`${classes.rowContainer}`}>
                  <BsCheckLg color="green" />
                  <p className={`${classes.correct}`}>
                    Password has at least on capital letter
                  </p>
                </div>
              ) : (
                <div className={`${classes.rowContainer}`}>
                  <RxCross1 color="red" />
                  <p className={`${classes.error}`}>
                    Password needs at least on capital letter
                  </p>
                </div>
              )}

              {doesPasswordhaveSpecChar ? (
                <div className={`${classes.rowContainer}`}>
                  <BsCheckLg color="green" />
                  <p className={`${classes.correct}`}>
                    Password has a special character
                  </p>
                </div>
              ) : (
                <div className={`${classes.rowContainer}`}>
                  <RxCross1 color="red" />
                  <p className={`${classes.error}`}>
                    Password needs to have a special character
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="submit">Register</button>
        <div className="defaultText">Already have an account? Log in <Link to="/login">here</Link></div>
      </form>
    </main>
  );
};

export default RegisterPage;

//  <div className={`${classes.innerContainer}`}>
