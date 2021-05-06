(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBz4VogQKw_veYg7Y-L1yNjW-lRR4w4uTg",
        authDomain: "cityscoot-d6c37.firebaseapp.com",
        databaseURL: "https://cityscoot-d6c37-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "cityscoot-d6c37",
        storageBucket: "cityscoot-d6c37.appspot.com",
        messagingSenderId: "904398518570",
        appId: "1:904398518570:web:73dd8513aae401be89c653",
        measurementId: "G-13X5KQNQ6N"
      };
      firebase.initializeApp(firebaseConfig);
     


const guideRef = firebase.database().ref().child("guides");
guideRef.orderByChild("lastName").on("child_added",snap => {

 
let guideLastName = snap.child("lastName").val();
let guideFirstName = snap.child("firstName").val();
let guideAge = snap.child("age").val();
let guideBlueBadge = snap.child("blueBadge?").val();
let guideOccupation = snap.child("occupation").val();
let guideTours= snap.child("tours").val();

  $("#insertpoint").append(
    "<tr><td>" + guideFirstName + "</td>" + 
    "<td>" + guideLastName + "</td>" +
    "<td>" + guideBlueBadge+ "</td>" +
    "<td>" + guideAge + "</td>" +
    "<td>" + guideOccupation + "</td>" +
    "<td>" + guideTours + "</td></tr>");
  });
  }()); 





// let getJSON = function(url, callback) {

//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://cityscoot-d6c37-default-rtdb.europe-west1.firebasedatabase.app/guides', true);
//   xhr.send();
//   xhr.readyState= displayGuides;
  
//   xhr.onload = function() {
  
//       var status = xhr.status;
      
//       if (status == 200) {
//           callback(null, xhr.response);
//       } else {
//           callback(status);
//       }
//   };
  
  
// };

