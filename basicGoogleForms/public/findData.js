function login(){
	function newLogInHappened(user){
		if (user){
			emailValue=user.email;
			console.log(user.email);
		}
		else{
			var provider=new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
	firebase.auth().onAuthStateChanged(newLogInHappened);
}

function getData(){
	window.arrQue=new Array();
	window.arrAns=new Array();
	window.arrAns1=new Array();
	var j=1;
	var f=document.getElementById("formNameOnLogin").value;
	console.log(f);
	var docRef = db.collection("users").doc(emailValue).collection(f+" summary").doc(emailValue+" questions");
	docRef.get().then(function(doc) {
		window.c1=Object.values(doc.data())[0];
	    if (doc.exists) {
	        // console.log("Document data:", doc.data());
	        arrQue=(Object.values(doc.data()));
	        var i;
			for (i=1;i<=c1;i++){
				console.log(arrQue[i]);
				document.getElementById('que'+i).innerHTML='<p id=que'+i+'>Question'+i+': '+arrQue[i]+'<p>';

				var queRef1=db.collection("users").doc(emailValue).collection(f+" summary").doc(arrQue[i]);
				queRef1.get().then(function(doc){

						arrAns=Object.values(doc.data());
						console.log(arrAns);
						document.getElementById('ans'+j).innerHTML='<p id=ans'+j+'>Ans'+j+': '+arrAns+'<p>';
						console.log(document.getElementById('ans'+j));
						j+=1;
				})
			}

	        console.log(arrQue);
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});

	
}


window.onload=login();