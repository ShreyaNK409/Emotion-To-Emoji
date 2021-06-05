Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#camera');

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        // display results in page
        document.getElementById('result').innerHTML = '<img  id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZxvQY1jXD/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded!")
}

prediction_1="";
prediction_2="";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predict()
{
    image=document.getElementById("captured_image");
    classifier.classify(image,gotResult);
}

 function gotResult(error,results)
{
  if (error) {
      console.log(error);
  } else {
    console.log(results) ;
    document.getElementById("emotion_1").innerHTML= results[0].label;
    document.getElementById("emotion_2"). innerHTML= results[1].label; 

prediction_1=results[0].label;
prediction_2=results[1].label;
speak();

    if (results[0].label=="Happy") {
        document.getElementById("emoji_1").innerHTML="&#128522;";
    }

    if (results[0].label=="Sad") {
        document.getElementById("emoji_1").innerHTML="&#128532;";
    }

    if (results[0].label=="Angry") {
        document.getElementById("emoji_1").innerHTML="&#128545;";
    }

    if (results[0].label=="Surprised") {
        document.getElementById("emoji_1").innerHTML="😯";
    }

    if (results[1].label=="Happy") {
        document.getElementById("emoji_2").innerHTML="&#128522;";
    }

    if (results[1].label=="Sad") {
        document.getElementById("emoji_2").innerHTML="&#128532;";
    }

    if (results[1].label=="Angry") {
        document.getElementById("emoji_2").innerHTML="&#128545;";
    }

    if (results[1].label=="Surprised") {
        document.getElementById("emoji_2").innerHTML="😯";
    }
  }
}