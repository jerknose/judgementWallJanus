## Judgement Wall Janus - 2015  
#### by [Travis Bennett](https://travisbennett.com)  
___  
\
&nbsp;  
![Image of Judgement Wall Janus](https://github.com/jerknose/judgementWallJanus/blob/master/public/janus.gif?raw=true)  
  
This project was originally built for an in-person event at the California Academy of Sciences [NightLife](https://www.calacademy.org/nightlife), curated by [Codame](https://codame.com/events/body-scan-asset-jam) in 2015.

During the event, people would be scanned with Codame's [ModBod 3d scanner](https://codame.com/projects/modbod). Those scans were then placed on the Judgement Wall for all to see.  
  
When someone walked in front of the Judgement Wall, our digital patrons would turn and watch.  
  
3d Scans created using Microsoft Kinect v1. People tracking using Microsoft Kinect v1. Visuals built in three.js and node.js.  
\
&nbsp;  
___  
[Demo](https://reckless.technology/archive/judgement-wall-janus/) • [More Info](https://www.travisbennett.com/all/judgement-wall-janus) • [Event](https://codame.com/events/body-scan-asset-jam)  
___  
\
&nbsp;  
## Build and run with Docker  
___  
\
&nbsp;  
Build Docker project  
  
`docker build -t jerknose/judgementwalljanus:1.0 .`  
  
Run / deploy instance  
  
`docker run -d -p 8080:8080 --name judgementwalljanus jerknose/judgementwalljanus:1.0`  
\
&nbsp;  
## Local Build Instructions
___  
\
&nbsp;  
Install Dependancies  
  
`yarn install`  
  
Run  
  
`node server.js`
