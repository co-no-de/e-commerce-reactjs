import { db, auth } from "../../../../firebase";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Order from "./Order";
import classes from "./AccountPage.module.css";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { orderPlaced } = useSelector(state => state.cart);
  let userID = auth.currentUser?.uid;

  if (!userID) {
    userID = localStorage.getItem("user");
  }

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("Loading your data...");
  const [lastName, setLastName] = useState("Loading your data...");
  const [email, setEmail] = useState("Loading your data...");
  const [telephone, setTelephone] = useState("Loading your data...");
  const [houseNo, setHouseNo] = useState("Loading your data...");
  const [street, setStreet] = useState("Loading your data...");
  const [country, setCountry] = useState("Loading your data...");
  const [city, setCity] = useState("Loading your data...");
  const [zipCode, setZipCode] = useState("Loading your data...");
  const [orders, setOrders] = useState([]);

  const [firstNameBU, setFirstNameBU] = useState("Loading your data...");
  const [lastNameBU, setLastNameBU] = useState("Loading your data...");
  const [emailBU, setEmailBU] = useState("Loading your data...");
  const [telephoneBU, setTelephoneBU] = useState("Loading your data...");
  const [houseNoBU, setHouseNoBU] = useState("Loading your data...");
  const [streetBU, setStreetBU] = useState("Loading your data...");
  const [countryBU, setCountryBU] = useState("Loading your data...");
  const [cityBU, setCityBU] = useState("Loading your data...");
  const [zipCodeBU, setZipCodeBU] = useState("Loading your data...");

  const [numOfOrders, setNumberOfOrders] = useState(0);

  const [isEditAble, setIsEditAble] = useState(false);

  const [profileDataShown, setProfileDataShown] = useState(true);

  function editProfile() {
    setIsEditAble(true);
  }

  async function saveProfile() {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        telephone,
        houseNo,
        street,
        city,
        country,
        zipCode,
      };

      await updateDoc(doc(db, "user-profiles", userID), userData, {
        merge: true,
      });

      setIsEditAble(false);
      getUserData();
      alert("Profile data succesfully updated");
    } catch (error) {
      console.log("Error updating user in profile screen", error);
    }
  }

  function toggleData(whatToShow) {
    if (!profileDataShown) {
      if (whatToShow === "profile") {
        setProfileDataShown(true);
      }
    } else {
      if (whatToShow === "orders") {
        setProfileDataShown(false);
      }
    }
  }

  useEffect(() => {
    if (userID) {
      getUserData();
    }
  }, []);

  useEffect(() => {
   
    if (userID) {
      async function getUserOrderData() {
        const userDocRef = doc(db, "user-profiles", userID);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const { numOfOrders } = docSnap.data();

          setNumberOfOrders(numOfOrders);

       
            const orderDocRef = collection(db, "orders");
            const q = query(
              orderDocRef,
              orderBy("orderNumber", "desc"),
              where("userId", "==", userID),
              limit(numOfOrders)
            );

            const querySnapshot = await getDocs(q);

            let ordersArray = [];

            querySnapshot.forEach(doc => {
              ordersArray.push(doc.data());
            });

            setOrders(ordersArray);     
        } else {
          console.log("No such document!");
        }
      }

      getUserOrderData();
    }
  }, [orderPlaced]);

  function cancelEdit() {
    setFirstName(firstNameBU);
    setLastName(lastNameBU);
    setEmail(emailBU);
    setTelephone(telephoneBU);
    setHouseNo(houseNoBU);
    setStreet(streetBU);
    setCountry(countryBU);
    setCity(cityBU);
    setZipCode(zipCodeBU);

    setIsEditAble(false);
  }

  async function getUserData() {
    const userDocRef = doc(db, "user-profiles", userID);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const {
        city,
        country,
        email,
        firstName,
        houseNo,
        lastName,
        orders,
        street,
        telephone,
        zipCode,
      } = docSnap.data();

      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setOrders(orders);
      setTelephone(telephone);
      setHouseNo(houseNo);
      setStreet(street);
      setCountry(country);
      setCity(city);
      setZipCode(zipCode);

      setFirstNameBU(firstName);
      setLastNameBU(lastName);
      setEmailBU(email);
      setTelephoneBU(telephone);
      setHouseNoBU(houseNo);
      setStreetBU(street);
      setCountryBU(country);
      setCityBU(city);
      setZipCodeBU(zipCode);
    } else {    
      console.log("No such document!");
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      alert("Log out succesful");
      navigate("/");
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }

  return (
    <main className={`${classes.container}`}>
      <div className={`${classes.innerContainer}`}>
        {userID ? (
          <div className={`${classes.noLogInContainer}`}>
            <div
              className={`${classes.btn}`}
              onClick={() => toggleData("profile")}
            >
              <p>Profile data</p>
            </div>

            <div
              className={`${classes.btn}`}
              onClick={() => toggleData("orders")}
            >
              <p>Order history</p>
            </div>

            <div className={`${classes.btn}`} onClick={() => logOut()}>
              <p>Log out</p>
            </div>
          </div>
        ) : (
          <div className={`${classes.noLogInContainer}`}>
            <div
              className={`${classes.btn}`}
              onClick={() => navigate("/login")}
            >
              <p>Log in</p>
            </div>

            <div
              className={`${classes.btn}`}
              onClick={() => navigate("/register")}
            >
              <p>Register</p>
            </div>
          </div>
        )}

        {!userID && (
          <div>
            <p className="heading">
              Register an account or log in to view your personal profile page
            </p>
          </div>
        )}

        {profileDataShown && userID && (
          <div>
            <h2 className="heading">Your profile data</h2>
            <div className={`${classes.form}`}>
              <div className={`${classes.formInput}`}>
                <div>
                  <label className="defaultText" htmlFor="firstName">
                    First name:
                  </label>
                </div>
                <div>
                  <input
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
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
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    id="lastName"
                  />
                </div>
              </div>

              <div className={`${classes.formInput}`}>
                <div>
                  <label className="defaultText" htmlFor="email">
                    Email:
                  </label>
                </div>
                <div>
                  <input
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    id="email"
                  />
                </div>
              </div>

              <div className={`${classes.formInput}`}>
                <div>
                  <label className="defaultText" htmlFor="telepohone">
                    Telephone NO:
                  </label>
                </div>
                <div>
                  <input
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setTelephone(e.target.value)}
                    value={telephone}
                    type="text"
                    id="telepohone"
                  />
                </div>
              </div>

              <div className={`${classes.formInput}`}>
                <div>
                  <label className="defaultText" htmlFor="houseNo">
                    House NO:
                  </label>
                </div>
                <div>
                  <input
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setHouseNo(e.target.value)}
                    value={houseNo}
                    type="text"
                    id="houseNo"
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
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setStreet(e.target.value)}
                    value={street}
                    type="text"
                    id="street"
                  />
                </div>
              </div>

              <div className={`${classes.formInput}`}>
                <div>
                  <label className="defaultText" htmlFor="zipcode">
                    Zipcode:
                  </label>
                </div>
                <div>
                  <input
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setZipCode(e.target.value)}
                    value={zipCode}
                    type="text"
                    id="zipcode"
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
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
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
                    style={{ backgroundColor: isEditAble && "#FFFF9E" }}
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    type="text"
                    id="country"
                  />
                </div>
              </div>
            </div>
            <div className={`${classes.loggedInContainer}`}>
              {!isEditAble ? (
                <div className={`${classes.btn}`} onClick={editProfile}>
                  <p>Edit profile</p>
                </div>
              ) : (
                <div className={`${classes.loggedInContainer}`}>
                  <div className={`${classes.btn}`} onClick={saveProfile}>
                    <p>Save profile</p>
                  </div>
                  <div
                    className={`${classes.btn}`}
                    onClick={() => cancelEdit()}
                  >
                    <p>Cancel</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!profileDataShown && userID && (
          <div>
            <h2 className="heading">Your orders</h2>

            {orders && orders.length === 0 && (
              <div>
                <p className="subHeading">No orders yet</p>
              </div>
            )}

            {orders && orders.length === numOfOrders ? (
              <div>
                {orders.map(
                  (order, index) => (
                    <Order key={index} order={order} />
                  )
                )}
              </div>
            ) : (
              <div>
                <p>No orders yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountPage;
