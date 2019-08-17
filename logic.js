var firebaseConfig = {
    apiKey: "AIzaSyCgOWZd5nNeZLZrTaud8NmianmJ_QGyV0Y",
    authDomain: "simple-image-upload.firebaseapp.com",
    databaseURL: "https://simple-image-upload.firebaseio.com",
    projectId: "simple-image-upload",
    storageBucket: "simple-image-upload.appspot.com",
    messagingSenderId: "238340807008",
    appId: "1:238340807008:web:795684cb28e6e98c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storageService = firebase.storage();
  const storageRef = storageService.ref();

  var database = firebase.database;

  var temp = "";

  document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
  document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

  let selectedFile;
  function handleFileUploadChange(e) {
    selectedFile = e.target.files[0];
  }

  function handleFileUploadSubmit(e) {
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on('state_changed', (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
       // Do something once upload is complete
       temp = selectedFile.name;
       console.log(temp);
       console.log('success');
    });
  }



  $(".display-photo").on("click", function() {


    storageRef.child('images/' + temp).getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
        var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(url);

        $("#picture-display").html("<img src='" + url + "' width='200'>");
    
        // Or inserted into an <img> element:
        var img = document.getElementById('myimg');
        img.src = url;
    }).catch(function(error) {
        // Handle any errors
    });

  });



