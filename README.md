# hospital_api

Hospital_api project developed in node it provides data of patients through apis. Registered Doctor can create reports of registered patients. There are four type of status available are :-

'negative','travelled-quarantine','symptoms-quarantine','positive-admit'


 Passport JWT Authentication Library is used for authentication.


Features :- 

1. New Doctor can register through by adding their information.
2. After Registration a doctor can login with thier username and password.
3. Regisitered Doctor Can register new patients and create their covid report.
4. If patient already exist then patient info is display to doctor and then doctor can generate their reoport.
5. A Patient can have multiple reports by different doctors.
6. Doctor can view all reports of a particular patient.
7. Anyone can view all reports of patients and filter by their status
8. Doctor can also view the all patients information.


Routes :-

'/api/v1/doctor/register' POST Route for Register the new doctor. Required Parameters are 'name','email','username' and 'password' should passed in body. Where 'username' and 'email' are unique.

'/api/v1/docotr/login' POST Route for login the Registered Doctor. Required Parameters are 'username' and 'password' should be passed in body.

'/api/v1/reports/:status' GET Route for getting all the reports of all users. User can filter the reports by their status
where 'status' is the one of report status as mentione above.


Authorize Routes :-

'/api/v1/patient/register' POST Route for Register the new patient by the registered Doctor. Required Parameters are 'name','phone','gender','age'. Where phone should be unique and gender should be either 'male' or 'female'.

'/api/v1/patient/:id/create_report' POST Route for Generate the report by doctor where 'id' is unique ID of patient and 'status' is passed by the doctor in form body.

'/api/v1/patient/all' GET Route for getting the list of all patient registered in application. Only Registerd Doctor can view this information.

'/api/v1/patient/:id/all_reports' GET Route for getting the list of all reports of a particular patient and where 'id' is unique ID of the registered patient.


Steps to Setup to Local :

1. First download the code zip from repo.
2. Extract the zip.
3. Your System should has installed node and mongo db.
4. Open terminal and go to the directory where project is located.
5. Run the command "npm install".
6. After that Run command "npm start".
7. You have installed 'Postman' on your system to call apis.
