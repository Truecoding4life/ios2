const dateDisplay = $('#display-time-detail');
const timeDisplay = $('#time-display');
const date = dateDisplay.text().slice(0,16);
const time = dateDisplay.text().slice(17,26)

dateDisplay.html(` ${date}`);
timeDisplay.html(time);

function fixTimestamp() {
    const timestamps = $('.timestamp');
    const hourDisplay = $('.timestamp2');
    
    for (let i = 0; i < timestamps.length; i++) {
        let text = timestamps[i].innerHTML.trim();
        let textArray = text.split(' ');
        let date = textArray[0]+" "+textArray[1]+" "+textArray[2] + " " + textArray[3];
        let time = textArray[4];
        timestamps[i].innerHTML = `Posted on ${ date} at ${time.slice(0,5)}` ;
    }
}

fixTimestamp();