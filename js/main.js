//listen for form submit

document.getElementById("myForm").addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
	
	
	var siteName=document.getElementById('siteName').value;
	
	var siteUrl=document.getElementById('siteUrl').value;

	var bookmark={  //js object
		name: siteName,
		url: siteUrl
	};

if(!validateForm(siteName,siteUrl)){
	return false;

}
	/*
	//local storage test

	localStorage.setItem('test','Hello world'); 
	//local storage only stores strings

        console.log(localStorage.getItem('test'));
      localStorage.removeItem('test');
      console.log(localStorage.getItem('test'));
	e.preventDefault();//prevents the form from submitting to itself
	//get form values
*/

if(localStorage.getItem('bookmarks')===null){
	//init array
	var bookmarks=[];

	//add to array
bookmarks.push(bookmark);

//set to localstorage
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 
}else{
	//get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//add bookmark we are submitting to this array

	bookmarks.push(bookmark);

	//Re-set back to the localstorage

	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
//clear the form

document.getElementById('myForm').reset();

//re-fetch bookmarks

fetchBookmarks();

e.preventDefault();
}

function deleteBookmark(url){

//get bookmark from localStorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//loop through bookmarks

for(var i=0;i<bookmarks.length;i++){
	if(bookmarks[i].url==url){

		//remove from array

		bookmarks.splice(i,1)  ;

	}
}

//re-set the localStorage after deleting
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

//re-fetch bookmarks

fetchBookmarks();


}

function fetchBookmarks(){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	//get output id

	var bookmarksResults= document.getElementById("bookmarksResults");

	//build output

	bookmarksResults.innerHTML="";

	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="card card-body" style="background-color: #D3D3D3;">'+
		'<h3>'+name+
		'<a class="btn btn-primary btn-sm" target="_blank" href="'+url+'">Visit</a>'+
		'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-primary btn-danger btn-sm" href="#">Remove</a>'+
		'</h3>'+
         '</div>' + '<br/>';
	}


}
function validateForm(siteName,siteUrl){

	if(!siteName || !siteUrl){
		alert("Please fill in the form");

		return false;
		

	}


	//use of regular expression to check validity of the url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("Please use a valid Url");

		return false;
	}

	

	return true;
}