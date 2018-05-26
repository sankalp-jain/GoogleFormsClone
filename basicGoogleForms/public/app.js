function login(){
	function newLogInHappened(user){
		if (user){
			window.emailValue=user.email;
		}
		else{
			var provider=new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
	firebase.auth().onAuthStateChanged(newLogInHappened);
}
window.emailValue;

var db=firebase.firestore();
 
var fo=document.getElementById('formName');
window.f=document.getElementById('formName').value;
fo.addEventListener('change',function(e){
	f=document.getElementById('formName').value;
	console.log(f);
})

var h=0;
var d=0;
window.k=new Array();
window.ids=new Array();
window.c=1;
window.docRef=[];
window.count=new Array();
var index=0;
var docRef1;
window.docRefStore;
var fileButton,file, storageRef,task;
function times(){
	c+=1;
	addQuestion(c);
}


function addQuestion(c){
	var e=document.getElementById('bord');
	document.getElementById('demo'+c).innerHTML='<div id='+c+'><input type="text" name="" onclick="this.select();" value="Question" size="25%" style="border-left: none;border-top: none;border-right: none;margin-left: 20px;margin-bottom: 20px;	margin-right: 20px;font-size: 25px;" id='+'que'+c+'><select onchange="changeField(this);" style="	border-left: none;border-top: none;	border-right: none;width: 200px;padding-left: 15px;" id='+'selectq'+c+'><option></option><option>Long Text</option><option>Short Text</option><option>File Upload</option></div>';
}


function changeField(elem){
	var e=elem.id;
	var character=e.charAt(e.length-1);
	var sq1=document.getElementById(e).value;
	if (sq1==''){
		document.getElementById('demoa'+character).innerHTML= '<p></p>';
	}
	if (sq1=='Short Text'){
		document.getElementById('demoa'+character).innerHTML= '<input type="text"  id=anssh'+character+' size="75" style="border-left: none;border-top: none;border-right: none;position:relative; left:15px;border-color:black;"> ';
		k[character]="anssh"+character;
	}
	if (sq1=='Long Text'){
		document.getElementById('demoa'+character).innerHTML= '<input type="textarea"  id=anslo'+character+' size="75" style="border-left: none;border-top: none;border-right: none;position:relative; left:15px;border-color:black;"> ';
		k[character]="anslo"+character;
	}
	if (sq1=='File Upload'){
		document.getElementById('demoa'+character).innerHTML= '<input type="file" value="upload" id=ansfil'+character+'> ';
		k[character]="ansfil"+character;
	}
	console.log(k);
document.getElementById("prog").innerHTML='<progress value="0" max="100" id="uploader" style="width:70%; margin-left:100px;">0%</progress>';
try{
fileButton=document.getElementById('ansfil'+character);
  fileButton.addEventListener('change',function(e){
  	file=e.target.files[0];
  	storageRef=firebase.storage().ref('questions/'+emailValue+'/'+file.name);
  	console.log(storageRef);
  	task=storageRef.put(file);
  	console.log(task);
  	task.on('state_changed',
  		function progress(snapshot){
  			var percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  			uploader.value=percentage;
  		},

  		function error(err){

  		},

  		function complete(){
  			
  		})
  });
}
catch(err){
	}
}

function getAnswers(){
	var i=0;
	var ids1=[];
	var j=0;
	var num=0;
	var questions;
	var answers;
	for (i=1;i<k.length;i++){
		console.log(document.getElementById('que'+i).value);
		console.log(document.getElementById(k[i]).value);
		var q=document.getElementById('que'+i).value;
		var q1=document.getElementById(k[i]).value;
		ids1=[q,q1,k[i]];
		ids[j]=ids1;
		j+=1;
	}

	// kRef=db.collection("users").doc(emailValue).collection(f).doc("inputIds");
	// for(i=0;i<k.length;k++){
	// 	idValue="id"+i;
	// 	kRef.set({
	// 		[idValue]:
	// 	})
	// }

	quesRef=db.collection("users").doc(emailValue).collection(f+" summary").doc(emailValue+" questions");
	quesRef.set({
		c:c
	},{merge:true}).then(function(){
		console.log("Status saved");
	}).catch(function(error){
		console.log("error occured");
	});
	for (i=0;i<ids.length;i++){
		questions=ids[i][0];
		idValue="v"+ids[i][2];
		quesRef.set({
			[idValue]:questions
		},{merge:true}).then(function(){
			console.log("Status saved");
		}).catch(function(err){
			console.log("error occured");
		});
	}
	

	for (i=0;i<ids.length;i++){
		questions=ids[i][0];
		docRef1=db.collection("users").doc(emailValue).collection(f+" summary").doc(questions);
		docRef[index]=docRef1;
		index+=1;
		continue;
	}
	console.log(docRef);

	var docRef2;
	var docRefIndi;

	for (i=0;i<docRef.length;i++){
		docRefStore=docRef[i];
		answers=ids[i][1];
		var randomNumber = Math.floor(Math.random() * 25000000000);
		var values="value"+randomNumber;
		docRefStore.set({
			[values]:answers
		},{merge:true}).then(function(){
			console.log("Status Saved");
		}).catch(function(error){
			console.log("Error occured",error);
		});
	}
	

	docRef2=db.collection("users").doc(emailValue).collection(f+" individual").doc("counter");

	var getDoc=docRef2.get()
	.then(doc => {
		if (!doc.exists){
			console.log("No such document!");
			docRef2.set({
				count:0
			},{merge:true});
		}
		else{
		docRef2.get().then(function(doc){
		console.log(doc.data());
		count=Object.values(doc.data());
		var count1=count[0];
		count1+=1;
		console.log(count1);

		var docRef3=db.collection("users").doc(emailValue).collection(f+" individual").doc(""+count1);

		for (i=0;i<ids.length;i++){
		questions=ids[i][0];
		answers=ids[i][1];
		var randomNumber = Math.floor(Math.random() * 25000000000);		
		docRef3.set({
			[questions]:answers
		},{merge:true}).then(function(){
			console.log("Status saved");
		}).catch(function(error){
			console.log("Error occured",error);
		})
	}


		docRef2.set({
			count:count1
			});
		})
		}
	});


	

	

}

window.onload=login();


