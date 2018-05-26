
  var db=firebase.firestore();

  window.email;


function signup(){
  function newLogInHappened(user){
      if (user){
        var docRef = db.collection('users').doc(user.email).collection('collaborators').doc('data');
         email=user.email;
         document.getElementById('user').innerHTML='<h1 id=user>'+email+'</h1>';
         console.log(email);

var getDoc = docRef.get()
    .then(doc => {
      console.log(doc);
        if (!doc.exists) {
            console.log('No such document!');
            var emailRef=db.collection('users').doc(email).collection('collaborators').doc('data');
            emailRef.set({
              user:email
            }).then(function(){
              console.log("user email saved");
            }).catch(function(error){
              console.log("error occured");
            });
            console.log("created");
            window.location.href = "form.html";

        } else {
            console.log('Document data:', doc.data());
            window.location.href = "form.html";
            
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

      }
      else{

    var provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

  }

  }
  firebase.auth().onAuthStateChanged(newLogInHappened);
}


