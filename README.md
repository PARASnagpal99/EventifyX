# EVENTIFYX_BACKEND 

## TECH STACK 
* NodeJS 
* ExpressJS 
* MongoDB
* ReactJS
* Redis
* AWS S3

## Quick Setup 
1. Clone the repository: git clone https://github.com/yourusername/EventifyX-Backend.git 
2. Install dependencies: npm install
3. Configure MongoDB connection , Your OrganizationID ,  EVENTBRITE API TOKEN and AWS SECRET KEY in .env file.
4. Run the server: npm start

## Features of EventifyX 
1. User Can Select his interests like music , dance , literature etc and On based of his interests he can browse different Events Happening in his City (Filter on City and Interests).
2. User Can Register for an Event according to his preference and he will recieve a notification for that via mail .
3. User can see list of different other users attending that Event and Can add them to his friend list .
4. User can view their profiles and activities .
5. Only Admin Can Create a Event via CreateEventDashboard .
6. A Typical Event consists of Information of an Event like Event Title , its category , Venue , Image , Start Date and End Date , (Details of Person who created that event) .

## TODO 
[] Create a Job Which automatically deletes the Events that have already happened at the End of the day .
[] Improve UI and Use Latest State management and Querying Tools .
[] Improve Add Friend and browse Activity Functionality .
[] Add OTP verification for mail while logging in .
[] Add unit Tests . 


## High Level Design of Project 
![EventifyX - Page 2](https://github.com/PARASnagpal99/EventifyXBackend/assets/86076130/2f413464-51f2-49e4-92a7-6216060dcf45)

## ER model 
![diagram-export-24-01-2024-09_19_24](https://github.com/PARASnagpal99/EventifyXBackend/assets/86076130/76dd10cf-6185-4476-9e39-c979e6a62ec5)
