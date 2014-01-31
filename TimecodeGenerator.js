// Written by Garrett Parrish for MIT Media Lab "Opera of the Future"

desc: Adjustable Frequency Timecode Generator

slider1:18500.0<1,20000,50>milli encoding freq (Hz) 
slider2:500<1,20000,50>milli sweep width (0=narrow, 1=wide)'F Delta'
slider3:19500.0<1,20000,50>second encoding freq (Hz)
slider4:0.001<0,1,0.05>second encoding width (0=narrow, 1=wide)
slider5:30<0.5,60,0.5>fps 'Fm'

//slider6:120<120,120,50>frequency of a 'one' (Hz)
slider6:86.132812<2,240,.5>frequency1

//slider7:60<60,60,50>frequency of a 'zero' (Hz)
slider7:43.066406<1,120,.5>frequency2
srate = 44100.0;
@slider
@sample


p += slider6/srate;

//variables
buffercount = floor(p);
sample_count += 1;
pos = sample_count/srate;
m_on = (cos(2*$pi*slider5*pos)+1)/2;
m_fm = cos(2*$pi*slider5*pos);
osc_hi = cos((2.0*$pi*pos)*slider1);
osc_low = cos((2.0*$pi*pos)*slider3);
sweep_dif = slider3 - slider1;
sweep = ((m_on*sweep_dif)+slider1);
vol = 0.02; 


//sample bits
buffer = 900;
buffer[0] = 0;buffer[1] = 0;buffer[2] = 0;buffer[3] = 0;buffer[4] = 0;buffer[5] = 1;
buffer[6] = 1;buffer[7] = 0;buffer[8] = 1;buffer[9] = 1;buffer[10] = 0;
buffer[11] = 1;buffer[12] = 1;buffer[13] = 1;buffer[14] = 0;buffer[15] = 1;
buffer[16] = 1;buffer[17] = 0;buffer[18] = 1;buffer[19] = 1;buffer[20] = 0;
buffer[21] = 1;buffer[22] = 1;buffer[23] = 1;buffer[24] = 0;buffer[25] = 1;
buffer[26] = 1;buffer[27] = 0;buffer[28] = 1;buffer[29] = 1;buffer[30] = 0;
buffer[31] = 0;buffer[32] = 1;buffer[33] = 1;buffer[34] = 0;buffer[35] = 1;
buffer[36] = 1;buffer[37] = 0;buffer[38] = 1;buffer[39] = 1;buffer[40] = 0;
buffer[41] = 0;buffer[42] = 1;buffer[43] = 1;buffer[44] = 0;buffer[45] = 1;
buffer[46] = 1;buffer[47] = 0;buffer[48] = 1;buffer[49] = 1;buffer[50] = 0;
buffer[51] = 0;buffer[52] = 1;buffer[53] = 1;buffer[54] = 0;buffer[55] = 1;
buffer[56] = 1;buffer[57] = 0;buffer[58] = 1;buffer[59] = 1;buffer[60] = 0;
nsamp = 61; //size of bit sample


//////////////////////////////
///// TIMECODE GENERATOR /////
//////////////////////////////

// mantissa = [0,0,0,0,0,0,0,0] - 8
manBin = 1000; 
manBin[0] = 0;manBin[1] = 0;manBin[2] = 0;manBin[3] = 0;
manBin[4] = 0;manBin[5] = 0;manBin[6] = 0;manBin[7] = 0;

// seconds = [0,0,0,0,0,0,0] - 7
secBin = 1100;
secBin[0] = 0;secBin[1] = 0;secBin[2] = 0;secBin[3] = 0;
secBin[4] = 0;secBin[5] = 0;secBin[6] = 0;

// parity bit =[1] - 1
parityBit = 1200;
parityBit[0] = 1;

// minutes = [0,0,0,0,0,0,0] - 7
minBin = 1300;
minBin[0] = 0;minBin[1] = 0;minBin[2] = 0;minBin[3] = 0;
minBin[4] = 0;minBin[5] = 0;minBin[6] = 0;

// reserved bit = [0] - 1
reservedBit = 1400;
reservedBit[0] = 0;

// hours = [0,0,0,0,0,0] - 6
hourBin = 1500;
hourBin[0] = 0;hourBin[1] = 0;hourBin[2] = 0;
hourBin[3] = 0;hourBin[4] = 0;hourBin[5] = 0;

// sync word = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1] -16
syncWord = 1600;
syncWord[0] = 0;syncWord[1] = 0;syncWord[2] = 1;syncWord[3] = 1;syncWord[4] = 1;syncWord[5] = 1;
syncWord[6] = 1;syncWord[7] = 1;syncWord[8] = 1;syncWord[9] = 1;syncWord[10] = 1;syncWord[11] = 1;
syncWord[12] = 1;syncWord[13] = 1;syncWord[14] = 0; syncWord[15] = 1;

//timestamp - 46
timestamp = 1700;
timestamp[0] = manBin[0];timestamp[1] = manBin[1];timestamp[2] = manBin[2];timestamp[3] = manBin[3];
timestamp[4] = manBin[4];timestamp[5] = manBin[5];timestamp[6] = manBin[6];timestamp[7] = manBin[7];

timestamp[8] = secBin[0];timestamp[9] = secBin[1];timestamp[10] = secBin[2];timestamp[11] = secBin[3];
timestamp[12] = secBin[4];timestamp[13] = secBin[5];timestamp[14] = secBin[6];

timestamp[15] = parityBit[0];

timestamp[16] = minBin[0];timestamp[17] = minBin[1];timestamp[18] = minBin[2];timestamp[19] = minBin[3];
timestamp[20] = minBin[4];timestamp[21] = minBin[5];timestamp[22] = minBin[6];

timestamp[23] = reservedBit[0];

timestamp[24] = hourBin[0];timestamp[25] = hourBin[1];timestamp[26] = hourBin[2];
timestamp[27] = hourBin[3];timestamp[28] = hourBin[4];timestamp[29] = hourBin[5];

timestamp[30] = syncWord[0];timestamp[31] = syncWord[1];timestamp[32] = syncWord[2];timestamp[33] = syncWord[3];
timestamp[34] = syncWord[4];timestamp[35] = syncWord[5];timestamp[36] = syncWord[6];timestamp[37] = syncWord[7];
timestamp[38] = syncWord[8];timestamp[39] = syncWord[9];timestamp[40] = syncWord[10];timestamp[41] = syncWord[11];
timestamp[42] = syncWord[12];timestamp[43] = syncWord[13];timestamp[44] = syncWord[14];timestamp[45] = syncWord[15];

///// calculate when the timestamp will end and get that time /////

function initializeTimecode()
(
numBits = 46;
secPerBit = 1/(2*slider6); // bits per frame // 30 frames a second
secOfTimecode = (numBits*secPerBit);
);

///// convert to hours, seconds, minutes of file /////

function findTimeData(a)
(
seconds = sample_count/srate;
minutes = seconds/60;
hours = minutes/60;
decimalseconds = (seconds-(floor(seconds)));
mantissa = floor(decimalseconds*100);
);

function determineTimestampTime()
(
secondsTS = (floor(seconds + secOfTimecode)%60);
minutesTS = (floor(minutes + (secOfTimecode/60))%60);
hoursTS = (floor(hours + (secOfTimeCode/(60*60)))%60);
mantissaTS = floor(((seconds+secofTimecode)-floor(seconds+secOfTimeCode))*100);
);

///// convert integers to binary (decToBin) /////

function decToBinMantissa(decimal)
(
//[80,40,20,10,8,4,2,1]
manWeights = 1800;
manWeights[0] = 80;manWeights[1] = 40;manWeights[2] = 20;manWeights[3] = 10;
manWeights[4] = 8;manWeights[5] = 4;manWeights[6] = 2;manWeights[7] = 1;
iman=0;

while (
(decimal>=manWeights[i]) ? (decimal-=manWeights[i];manBin[8-i] = 1;) : (manBin[8-i] = 0);
iman+= 1;
iman < 8;
);
);

function decToBinHours(decimal)
(
//[20,10,8,4,2,1]
hourWeights = 1900;
hourWeights[1] = 20;hourWeights[2] = 10;hourWeights[3] = 8;
hourWeights[4] = 4;hourWeights[5] = 2;hourWeights[6] = 1;

ihr=0;
while (
(decimal>=hourWeights[i]) ? (decimal-=hourWeights[i];[6-i] = 1;) : (hourBin[6-i] = 0);
ihr+= 1;
ihr < 6;
);
);

function decToBinMins(decimal)
(
//[40,20,10,8,4,2,1]
minWeights = 2000;
minWeights[0] = 40;minWeights[1] = 20;minWeights[2] = 10;
minWeights[3] = 8;minWeights[4] = 4;minWeights[5] = 2;minWeights[6] = 1;
imin=0;

while (
(decimal>=minWeights[i]) ? (decimal-=minWeights[i];[7-i] = 1;) : (minBin[7-i] = 0);
imin+= 1;
imin < 7;
);
);

function decToBinSecs(decimal)
(
//[40,20,10,8,4,2,1]
secWeights = 2100;
secWeights[0] = 40;secWeights[1] = 20;secWeights[2] = 10;
secWeights[3] = 8;secWeights[4] = 4;secWeights[5] = 2;secWeights[6] = 1;
isec=0;

while (
(decimal>=secWeights[i]) ? (decimal-=secWeights[i];[7-i] = 1;) : (secBin[7-i] = 0);
isec+= 1;
isec < 7;
);
);

// set all determined time values to their respective places in their arrays
binMantissaTS = decToBinMantissa(mantissaTS);
binSecondsTS = decToBinSecs(secondsTS);
binMinutesTS = decToBinMins(minutesTS);
binHoursTS = decToBinHours(hoursTS);

// encode that out to the wave
findTimeData();
initializeTimecode();
determineTimestampTime();

freqswitch = (timestamp[buffercount%46] == 1) ? ((1.0/(2*slider6))*srate) : ((1.0/(2*slider7))*srate);
((sample_count%freqswitch == 0)&&(tracker == 1)) ? (tracker = 0) :(((sample_count%freqswitch == 0) && (tracker == 0)) ? tracker = 1);

spl0 = (osc_hi*tracker+osc_low*(1-tracker))*vol;
spl1 = spl0;

/////////////////////////////////////
///// END OF TIMECODE GENERATOR /////
/////////////////////////////////////


/* WORKING TEST OF FSK
sec = sample_count/(srate);

freqswitch = (buffer[buffercount%nsamp] == 1) ? (1.0/(2*slider6))*srate : (1.0/(2*slider7))*srate;
((sample_count%freqswitch == 0)&&(tracker == 1)) ? tracker = 0 :( ( (sample_count%freqswitch == 0) && (tracker == 0) ) ? tracker = 1 );


spl0 = (osc_hi*tracker+osc_low*(1-tracker))*vol;
spl1 = spl0;
*/

//spl0 = (osc_hi*m_on+osc_low*(1-m_on))*vol;
//spl0=osc_fm*vol;//osc_fm = (((sample_count%11025) == 0) && tracker == 0) ? osc_low;
//tracker = (((sample_count%11025) == 0) && tracker == 0) ? 0;
//osc_hi;
//osc_fm = sin(2*$pi*f*pos); 
//osc_fm = cos((2*$pi*pos*hifq)+((fdelta/fm)*m_fm));
//fm = slider5;//fdelta = slider2;
