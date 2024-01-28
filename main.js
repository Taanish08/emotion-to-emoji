prediction1 = "" ;
prediction2 = "" ;

Webcam.set({
    width: 350,
    height: 350,
    img_format:'png',
    png_quality: 90

});
camera=document.getElementById("camera")
Webcam.attach('#camera')

function take_snapshot() {
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
});
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/avRjq1zyq/model.json',modelloaded);

function modelloaded() {
    console.log("Model has loaded");
}

function check() {
    img=document.getElementById("captured_img");
    classifier.classify(img, gotresult);
}
 
function speak() {
    var synth = window.speechSynthesis;
    speak1data = "The first prediction is"+prediction1;
    speak2data = "The second prediction is"+prediction2;
     var utterThis = new SpeechSynthesisUtterance(speak1data+speak2data);
     synth.speak(utterThis);
}

function gotresult(error, result ) {
if(error) {
    console.error(error);
    
}
else  {
console.log(result);
document.getElementById("result_emotion_name").innerHTML=result[0].label;
document.getElementById("result_emotion_name2").innerHTML=result[1].label;

prediction1=result[0].label;
prediction2=result[1].label;
speak();

if(result[0].label=="Happy") {
    document.getElementById("update_emoji").innerHTML="&#128522";
}

if(result[0].label=="Sad") {
    document.getElementById("update_emoji").innerHTML="&#128532";
}

if(result[0].label=="Normal") {
    document.getElementById("update_emoji").innerHTML="&#128548";
}

if(result[1].label=="Happy") {
    document.getElementById("update_emoji2").innerHTML="&#128522";
}

if(result[1].label=="Sad") {
    document.getElementById("update_emoji2").innerHTML="&#128532";
}

if(result[1].label=="Normal") {
    document.getElementById("update_emoji2").innerHTML="&#128548";
}

}
}

