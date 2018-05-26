function login(){
	function newLogInHappened(user){
		if (user){
			window.location.href="formLogin.html";
			console.log(user.email);
		}
		else{
			var provider=new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
	firebase.auth().onAuthStateChanged(newLogInHappened);
}
