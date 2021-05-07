
 
const  firebaseConfig = {
apiKey: "AIzaSyBz4VogQKw_veYg7Y-L1yNjW-lRR4w4uTg",
authDomain: "cityscoot-d6c37.firebaseapp.com",
databaseURL: "https://cityscoot-d6c37-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "cityscoot-d6c37",
storageBucket: "cityscoot-d6c37.appspot.com",
messagingSenderId: "904398518570",
appId: "1:904398518570:web:73dd8513aae401be89c653",
measurementId: "G-13X5KQNQ6N"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


const txtEmail = document.getElementById("txtemail");
const txtPassword = document.getElementById("txtpassword");
const btnLogin = document.getElementById("btnlogin");
const btnSignup = document.getElementById("btnsignup");
const btnLogout = document.getElementById("btnlogout");
const loginStatus = document.getElementById("loginstatus");
const txtEmailLabel = document.getElementById("txtemaillabel");
const txtPasswordLabel = document.getElementById("txtpasswordlabel");

btnLogin.addEventListener("click", e => {
const enteredEmail = txtEmail.value;
const enteredPassword = txtPassword.value;
const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword(enteredEmail, enteredPassword);
document.cookie="validSession=true";
promise.catch(e => alert("Could not log you in at this time. \n" + e.message)); 
});
		
btnSignup.addEventListener("click", e => {
const enteredEmail = txtEmail.value;
const enteredPassword = txtPassword.value;
const auth = firebase.auth();
const promise = auth.createUserWithEmailAndPassword(enteredEmail, enteredPassword);
promise.catch(e => alert(" We could process your transaction at this time. \n" + e.message)); 
});

btnLogout.addEventListener("click", e => {
	firebase.auth().signOut();
	document.cookie="validSession=false";
});
		
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
document.cookie = "validSession=true";
console.log("Logged in");
btnLogout.style.display = "block";
btnSignup.style.display = "none";
txtEmail.style.display = "none";
btnLogin.style.display = "none";
txtPassword.style.display = "none";
txtEmailLabel.style.display = "none";
txtPasswordLabel.style.display = "none";
loginStatus.innerHTML = "You are currently logged in.";
	} else {
document.cookie = "validSession=false";
console.log("Not logged in");
btnLogout.style.display = "none";
btnSignup.style.display = "block";
txtEmail.style.display = "block";
btnLogin.style.display = "block";
txtPassword.style.display = "block";
txtEmailLabel.style.display = "block";
txtPasswordLabel.style.display = "block";
loginStatus.innerHTML = "You are not currently logged in. Please log in.";
	}
});
