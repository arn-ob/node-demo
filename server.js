// Core library 
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var cors = require('cors');
const mysql = require('mysql2');
var log_data = require('./log');


// App init
var app = express();

app.use(cors());     // For enable all cros support.. Without it,it will not work good

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist'))); // For deploy the project



// Sign-up 1st phase 
var doctor = require('./routes/signup/doctor-signup');
var nurse = require('./routes/signup/nurse-signup');
var patients = require('./routes/signup/patients-signup');

// Sign-up 2nd phase
var finalize_doctor = require('./routes/signup-finalize/doctor-finalize');
var finalize_nurse = require('./routes/signup-finalize/nurse-finalize');
var finalize_patients = require('./routes/signup-finalize/patients-finalize');

// Existing user added on previous ID
var existing_doctor_nurse = require('./routes/existing-user-signup/existing-doctor-nurse');
var existing_patients = require('./routes/existing-user-signup/existing-patients');

// Dashboard
// -- Here all the variable decleare for dashboad system
// --
// _____________________________________________________
// This Section will use for Patients
var user_detail = require('./routes/dashboard/patients/user-details/checkup-details');
var request_function = require('./routes/dashboard/patients/request/request');
var submit = require('./routes/dashboard/patients/admission_request/new_admission_request');
var checkup_request = require('./routes/dashboard/patients/checkup_request/checkup_request');

// _________________________
// End of patients dashboard

// This section will use for Doctor
var dashboard_doctor_patients_list = require('./routes/dashboard/doctor/patients_list/patients_list');
var dashboard_doctor_patients_details = require('./routes/dashboard/doctor/patients_details/patients_details');
var dashboard_doctor_patients_checkup_details = require('./routes/dashboard/doctor/patients_checkup_details/patients_checkup_details');
var dashboard_doctor_patients_checkup_info = require('./routes/dashboard/doctor/patients_checkup_info/patients_checkup_info');
var dashboard_doctor_info = require('./routes/dashboard/doctor/doctor_info/doctor_info');
var dashboard_doctor_info_update = require('./routes/dashboard/doctor/doctor_info/update_doctor_info');

// _______________________
// End of doctor Dashboard

// This section will use for Admin

// Get Request
var dashboard_admin_doctor_list = require('./routes/dashboard/admin/get-active-doctor-list/get-active-doctor-list');
var dashboard_admin_patients_list = require('./routes/dashboard/admin/get-active-patients-list/get-active-patients-list');
var dashboard_admin_doctor_req_list = require('./routes/dashboard/admin/get-request-doctor-list/get-request-doctor-list');
var dashboard_admin_patients_req_list = require('./routes/dashboard/admin/get-request-patients-list/get-request_patients_list');
var dashboard_admin_hospital_list = require('./routes/dashboard/admin/get-hospital-list/get-hospital-list');

// Post request
var dashboard_admin_request = require('./routes/dashboard/admin/accept-deny-request/accept-deny-request');



// Email
var email = require('./routes/email-varification/email-verification');

// Login
var log = require('./routes/login/login'); 

// API System
var ecg_api = require('./routes/api/ecg-api');


// ECG Data Section
var ecg_data_sending = require('./routes/ecg-data-send/ecg-data-sending');
var prev_ecg_data_sending = require('./routes/ecg-data-send/prev-ecg-data-sending');

// ###############################################
// Routing


// App nav request
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
})


log_data.logs("Program Start");

////////////////////////////////////////
// login and signup system
////////////////////////////////////////
app.post('/insert-doctor', doctor.insert_Doctor);
app.post('/insert-nurse', nurse.insert_nurse);
app.post('/insert-patient', patients.insert_patient);
app.post('/insert-doctor-finalize', finalize_doctor.finalize_Doctor);
app.post('/insert-nurse-finalize', finalize_nurse.finalize_Nurse);
app.post('/insert-Patients-finalize', finalize_patients.finalize_Patients);
app.post('/existing-doctor-nurse', existing_doctor_nurse.existing_doctor_nurse_entry);
app.post('/existing-patients', existing_patients.existing_patients_entry);

/// End of login 
/// _________________________________

/////////////////////////////////////////
// Patients data managing system
/////////////////////////////////////////
// Post Request
app.post('/send-new-admission-request', submit.new_admission_request);
app.post('/send-checkup-details', user_detail.checkup_details);
app.post('/send-new-checkup-request', checkup_request.new_checkup_request);

// Get Request
app.get('/send-hospital-list', request_function.send_hospital_list);
app.get('/send-doctor-list', request_function.send_doctor_list);
app.get('/send-nurse-list', request_function.send_nurse_list);

// Send requested data 
app.get('/send-patients-list', user_detail.send_request_patients_data);

// End of Patients Data
// _____________________________________

///////////////////////////////////////
// Doctor Data managing System
///////////////////////////////////////

// Post Request
app.post('/get-patients-list-this-doctor', dashboard_doctor_patients_list.send_patients_list);
app.post('/get-patients-and-admission-details', dashboard_doctor_patients_details.send_patients_details);
app.post('/get-patients-and-checkup-details', dashboard_doctor_patients_checkup_details.send_patients_checkup_details);
app.post('/get-patients-checkup-info', dashboard_doctor_patients_checkup_info.send_patients_checkup_info);
app.post('/get-doctor-details', dashboard_doctor_info.send_doctor_info);
app.post('/update-doctor-details', dashboard_doctor_info_update.update_doctor_info);

// End of doctor Data
// ___________________________

////////////////////////////////
// Admin Section
////////////////////////////////

// Get Request
app.get('/get-active-doctor-list', dashboard_admin_doctor_list.send_active_doctor_list);
app.get('/get-active-patients-list', dashboard_admin_patients_list.send_active_patients_list);
app.get('/get-request-doctor-list', dashboard_admin_doctor_req_list.send_requested_doctor_list);
app.get('/get-request-patients-list', dashboard_admin_patients_req_list.send_requested_patients_list);
app.get('/get-hospital-list', dashboard_admin_hospital_list.send_hospital_list);

// Post request
app.post('/request-accept', dashboard_admin_request.new_request_accept);
app.post('/request-deny', dashboard_admin_request.new_request_deny);


////////////////////////////////
// Login data
////////////////////////////////
app.post('/login', log.in);


//////////////////////////////
// API Data Working
//////////////////////////////
app.post('/ecg-data', ecg_api.insert_ecg_data);

//////////////////////////////
// ECG Data
//////////////////////////////
app.post('/ecg-data-sending', ecg_data_sending.send_ecg);
app.post('/prev-ecg-data-sending', prev_ecg_data_sending.prev_send_ecg);

// Email varification link
//app.use('/email', email.sendMail);

// not found link
app.use(function(req, res){
    console.log('Page not Found 404');
    res.type('text/html');
    res.status(404);
    res.render("404");
});


// run server
//app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
