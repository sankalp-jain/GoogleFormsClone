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

function getNumber(){
	var f=document.getElementById('formNameOnLogin').value;
	console.log(f);
	var docRef2=db.collection("users").doc(emailValue).collection(f+" individual").doc("counter");
	console.log(docRef2);
	docRef2.get().then(function(doc){
	document.getElementById('response').innerHTML=(Object.values(doc.data())[0]);
	})
}

function getIndi(){

	var f=document.getElementById('formNameOnLogin').value;
	var res=document.getElementById('responseNumber').value;
	var docRef=db.collection("users").doc(emailValue).collection(f+" individual").doc(""+res);
	docRef.get().then(function(doc) {
		console.log(doc.data());
		var que=Object.keys(doc.data());
		var ans=Object.values(doc.data());
		var i=1;
		for (i=1;i<=que.length;i++){
			console.log(que[i-1]);
			document.getElementById('quee'+i).innerHTML='Question'+i+': '+que[i-1];
			document.getElementById('anss'+i).innerHTML='Answer'+i+': '+ans[i-1];
		}
	})

}


window.onload=login();