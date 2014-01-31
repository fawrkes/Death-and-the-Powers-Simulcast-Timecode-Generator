Death-and-the-Powers-Simulcast-Timecode-Generator
=================================================

A timecode generator for the Death and the Powers Robotic Opera.

In the Opera of the Future group at the MIT Media Lab, I worked on a project with the aim of reducing the lag time of live-streaming down to a few microseconds. I am trying to address the current issue that live-stream and sync devices do not have a synced time clock and therefore have difficulty synchronizing actions across multiple devices without delay.
﻿
This project is meant to be used in the live-stream global interactive simulcast of the Death and the Powers opera. Multiple thousands of audience members will be watching a simulcast performance. In order for the interaction data to be processed in real time, all the remote sites must operate on the same time clock. 

I tried different methods of using FFTs, FIRs, and other data-embedding protocols. In the end, I wrote a frequency-shift-keying algorithm that embeds the timecode (46 individual bits) into the high-range frequencies of the audio stream.
 
Currently, we're working on tweaking the decoding of the signal for the show in February.
