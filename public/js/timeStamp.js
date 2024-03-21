const dateDisplay = $('#display-time-detail');
const timeDisplay = $('#time-display');
const date = dateDisplay.text().slice(0,16);
const time = dateDisplay.text().slice(17,26)

dateDisplay.html(` ${date}`);
timeDisplay.html(time);


// This will target every timestamp class text and return it with the correct time to display
function fixTimestamp() {
    const timestamps = $('.timestamp');
    const hourDisplay = $('.timestamp2');
    
    for (let i = 0; i < timestamps.length; i++) {
        let text = timestamps[i].innerHTML.trim();
        let textArray = text.split(' ');
        let date = textArray[0]+" "+textArray[1]+" "+textArray[2] + " " + textArray[3];
        let time = textArray[4];
        
        timestamps[i].innerHTML = `Posted on ${ date} at ${fixTimeDisplay(time)}` ;
    }
}

fixTimestamp();


// This will take in the data string 12:32:00 and return 12:32 PM
function fixTimeDisplay(date){
    let dateArray = date.split(':');
    let am = "AM";
    let pm = "PM";
    let hour = dateArray[0];
    let minutes = dateArray[1]
    result = `${hour}:${minutes} ${am}`;
    let checkNum = parseInt(hour);
    if(hour > 11){
        hour = hour - 12;
        result = `${hour}:${minutes} ${pm}`;
        return result;
    }
    return result;
};