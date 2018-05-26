  var db=firebase.firestore();

function fillForm(email,formName){
	var docRef=db.collection("users").doc(email).collection(formName+" summary").doc(email+" questions");
	console.log(docRef);
	docRef.get().then(function(doc){
		window.ids=Object.keys(doc.data());
		window.que=Object.values(doc.data());
		console.log(ids);
		console.log(que);

		window.i=0;
		window.idValue=new Array();

		for (i=1;i<ids.length;i++){
			document.getElementById('que'+i).innerHTML=que[i];
			idValue=ids[i];
			var idCheck=idValue.substring(1,5);
			if (idCheck=='anss'){
				document.getElementById('ans'+i).innerHTML= '<input type="text"  id=ans1'+i+' size="75" style="border-left: none;border-top: none;border-right: none;position:relative; left:15px;border-color:black;"> ';
			}
			if (idCheck=='ansl'){
				document.getElementById('ans'+i).innerHTML= '<input type="textarea"  id=ans1'+i+' size="75" style="border-left: none;border-top: none;border-right: none;position:relative; left:15px;border-color:black;"> ';
			}
			if (idCheck=='ansf'){
				document.getElementById('ans'+i).innerHTML= '<input type="file" value="upload" id=ans1'+i+'> ';
			}
				document.getElementById("prog").innerHTML='<progress value="0" max="100" id="uploader" style="width:70%; margin-left:100px;">0%</progress>';
try{
fileButton=document.getElementById('ans1'+i);
  fileButton.addEventListener('change',function(e){
  	file=e.target.files[0];
  	console.log(file);
  	storageRef=firebase.storage().ref('questions/'+email+'/'+que[i]+'/'+file.name);
  	task=storageRef.put(file);
  	task.on('state_changed',
  		function progress(snapshot){
  			var percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  			uploader.value=percentage;
  			console.log(snapshot);
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

	

	});
}

function submitForm(email,f){
	var formData=new Array();
	for (j=1;j<i;j++){
		formData[j-1]= document.getElementById('ans1'+j).value;
	}

	console.log(formData);
	console.log(que);

	window.docRef=[];
	window.docRefStore;
	window.docRef1;
	var index=0;
	
	for (i=0;i<formData.length;i++){
		questions=que[i+1];
		docRef1=db.collection("users").doc(email).collection(f+" summary").doc(questions);
		docRef[index]=docRef1;
		index+=1;
		continue;
	}

	for (i=0;i<docRef.length;i++){
		docRefStore=docRef[i];
		answers=formData[i];
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


	docRef2=db.collection("users").doc(email).collection(f+" individual").doc("counter");

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

		var docRef3=db.collection("users").doc(email).collection(f+" individual").doc(""+count1);

		for (i=0;i<formData.length;i++){
		questions=que[i+1];
		answers=formData[i];		
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