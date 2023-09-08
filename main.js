Webcam.set({
    width :350,
    heigth:300,
    image_format :'png',
    png_quality:90
});

camera=document.getElementById("camera")
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_ury){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_ury+'"/>';

    });

}

classifier=ml5.image.Classifier('https://teachablemachine.withgoogle.com/models/W_0nSIBVC/',modelLoaded);
function modelLoaded(){
    console.log('modelo cargado');

}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);

}
function gotResult(){
    if(error){
        console.error(error);

    }
    else{
        console.log(result);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
        percent=results[0].confidence.tofixed(3)*100;
        console.log(percent);
        document.getElementById("result_object_accuracy").innerHTML=percent +"%";
        object=results[0].label;
        speak();

    }
}
function speak (){
    var synth=window.speechSynthesis;
    speak_data="estoy"+percent+"%seguro que el objeto es"+object;
    var utterThis =SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    
    
}