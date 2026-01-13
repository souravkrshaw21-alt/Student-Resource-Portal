/* js/login.js */

/* =========================================
   1. MOCK DATABASES
   ========================================= */

/* --- STUDENTS --- 
   Format: "RegistrationNumber": { name: "FULL NAME", dob: "DDMMYYYY" }
*/
const studentDB = {
    // CIVIL ENGG
    "24032430001": { name: "ABHISHEK YADAV", dob: "01012007" },
    "24032430002": { name: "AMAN KUMAR TURI", dob: "15032005" },
    "24032430003": { name: "BIRENDRA KUMAR", dob: "01012006" },
    "24032430004": { name: "DEVASHISH SAMDARSHI", dob: "16122006" },
    "24032430005": { name: "MD NAZIR ANSARI", dob: "01012005" },
    "24032430006": { name: "SAGAR SHARMA", dob: "13022003" },
    "24032430007": { name: "SURAJ KUMAR KODA", dob: "17032003" },

    // CSE
    "24032440001": { name: "ABHISHEK PRASAD", dob: "08032005" },
    "24032440002": { name: "AKASH KUMAR", dob: "02082006" },
    "24032440003": { name: "ANITA KUMARI", dob: "08052006" },
    "24032440004": { name: "ANKIT DODRAY", dob: "06112007" },
    "24032440005": { name: "ANKIT KUMAR", dob: "07092006" },
    "24032440006": { name: "ASIF AHMAD", dob: "01012006" },
    "24032440007": { name: "AYUSH KUMAR SRIVASTAVA", dob: "04082005" },
    "24032440008": { name: "AYUSH RAJ", dob: "27122005" },
    "24032440009": { name: "BUDHADEV DAS", dob: "16062005" },
    "24032440010": { name: "DHAMANT KUMAR", dob: "29042005" },
    "24032440011": { name: "DHRUV YADAV", dob: "10112006" },
    "24032440012": { name: "ENAMUL HAQUE", dob: "20051984" },
    "24032440013": { name: "GAURAV SACHDEVA", dob: "10062006" },
    "24032440014": { name: "HARSH KUMAR", dob: "22122005" },
    "24032440015": { name: "HAZRA PARWEEN", dob: "01012006" },
    "24032440016": { name: "JAVED AKHTAR ANSARI", dob: "01062006" },
    "24032440017": { name: "KAMAKSHI GUPTA", dob: "24082005" },
    "24032440018": { name: "KARAN KUMAR MAHATO", dob: "01012007" },
    "24032440019": { name: "KUMAR SHIVKANT", dob: "19062005" },
    "24032440020": { name: "MANTOSH KUMAR SINGH", dob: "08072005" },
    "24032440021": { name: "MD ARMAN", dob: "22062006" },
    "24032440022": { name: "MD NAZISH ANSARI", dob: "02012005" },
    "24032440023": { name: "MD REHAN KHAN", dob: "31122005" },
    "24032440024": { name: "MD TOUSHIF", dob: "20092005" },
    "24032440025": { name: "MISHA KUMARI", dob: "03122006" },
    "24032440026": { name: "NAVEEN CHOUHAN", dob: "12032004" },
    "24032440027": { name: "NITESH GOPE", dob: "02012006" },
    "24032440028": { name: "NITESH KUMAR", dob: "07032006" },
    "24032440029": { name: "PARMEET SINGH SALUJA", dob: "08062006" },
    "24032440030": { name: "PARTHO NAG", dob: "15062005" },
    "24032440031": { name: "RAHUL KUMAR", dob: "01082005" },
    "24032440032": { name: "RAHUL KUMAR DAS", dob: "05032004" },
    "24032440033": { name: "RAJU KUMAR GUPTA", dob: "17092004" },
    "24032440034": { name: "RANDHIR KUMAR MAHATO", dob: "23112004" },
    "24032440035": { name: "ROSHAN KUMAR SHARMA", dob: "08092006" },
    "24032440036": { name: "SACHIN KUMAR DEV", dob: "07052007" },
    "24032440037": { name: "SAGAR KUMAR DAS", dob: "05042007" },
    "24032440038": { name: "SALU KUMARI", dob: "07092005" },
    "24032440039": { name: "SHRAVAN KUMAR", dob: "07112005" },
    "24032440040": { name: "SITANSHU JEE", dob: "04012007" },
    "24032440041": { name: "SONU KUMAR DAS", dob: "22052006" },
    "24032440042": { name: "SOURAV KUMAR", dob: "10092004" },
    "24032440043": { name: "SOURAV KUMAR SHAW", dob: "21092005" },
    "24032440044": { name: "SUMANTO SEN", dob: "08112006" },
    "24032440045": { name: "SUMIT KUMAR PANDIT", dob: "02102006" },
    "24032440046": { name: "SUMIT KUMAR PANDIT", dob: "02062006" },
    "24032440047": { name: "SUMIT KUMAR VISHWAKARMA", dob: "18082004" },
    "24032440048": { name: "SUNNY KUMAR SINHA", dob: "26102006" },

    // ELECTRICAL
    "24032450001": { name: "ADARSH KUMAR", dob: "12112006" },
    "24032450002": { name: "AMIT KUMAR MAHATHA", dob: "12062005" },
    "24032450003": { name: "KAMAL MANDAL", dob: "01012006" },
    "24032450004": { name: "KRISH KUMAR SINHA", dob: "14022006" },
    "24032450005": { name: "KUNAL KISHOR", dob: "15062004" },
    "24032450006": { name: "NIMAI DAN", dob: "17112005" },
    "24032450007": { name: "RABIYA BASREE", dob: "01042005" },
    "24032450008": { name: "RAHUL GORAIN", dob: "15122005" },

    // MECHANICAL
    "24032490001": { name: "HIRALAL SOREN", dob: "02012006" },
    "24032490002": { name: "KOUSHIK MANDAL", dob: "03062006" },
    "24032490003": { name: "KRISH KUMAR PASWAN", dob: "20092006" },
    "24032490004": { name: "MANBODH MAHATO", dob: "22062006" },
    "24032490005": { name: "NILESH BHANDARI", dob: "29122006" },
    "24032490006": { name: "PRASENJIT DUTTA", dob: "02042006" },
    "24032490007": { name: "RAVI RANJAN SHARMA", dob: "15102005" },
    "24032490008": { name: "SHIT PRASAD", dob: "02082005" },
    "24032490009": { name: "SIDDHARTH SHANKAR JHA", dob: "06072006" },
    "24032490010": { name: "SUBHASH KUMAR MAHTO", dob: "09022007" },

    // MINING
    "24032510001": { name: "BABU KUMAR BAURI", dob: "22022004" },
    "24032510002": { name: "BIKASH KUMAR MONDAL", dob: "02072003" },
    "24032510003": { name: "GUDDU KUMAR GORAI", dob: "04062006" },
    "24032510004": { name: "HARISH CHANDRA TUDU", dob: "07022006" },
    "24032510005": { name: "JITENDRA KUMAR", dob: "16021985" },
    "24032510006": { name: "KRISHNA KUMAR SAW", dob: "31082006" },
    "24032510007": { name: "MAHESH RAKSHIT", dob: "27052006" },
    "24032510008": { name: "MANJEET KUMAR MAHATO", dob: "20101998" },
    "24032510009": { name: "RAHUL KUMAR MAHATO", dob: "25122005" },
    "24032510010": { name: "RAHUL KUMAR MAHTO", dob: "26012006" },
    "24032510011": { name: "RAHUL RAJ", dob: "15072006" },
    "24032510012": { name: "RAVI KUMAR", dob: "07041994" },
    "24032510013": { name: "SHIVAM KUMAR CHOUDHARY", dob: "18072006" },
    "24032510014": { name: "SUBHASH KUMAR SAW", dob: "10011991" },
    "24032510015": { name: "SURANJEET MARANDI", dob: "14032006" },
    "24032510016": { name: "VIKRAM KUMAR MAHTO", dob: "05052003" },
    "24032510017": { name: "VISHAL KUMAR", dob: "13032006" }
};

/* --- TEACHERS --- 
   Format: "EmployeeNameID": "Password"
*/
const teacherDB = {
    "Narendra Prasad Singh": "BSC302",
    "Rajnish Kumar": "CSE301",
    "Pratik Dey": "CSE302",
    "Ajay Kumar": "CSE303",
    "Shikha Singh": "CSE304",
    "Pragya Singh": "AUC301"
};

/* --- ADMINS --- 
   Format: "Username": "Password"
*/
const adminDB = {
    "Naveen Chauhan": "Naveen@Admin",
    "Sourav Kumar Shaw": "Sourav@Admin",
    "Rahul Kumar": "Rahul@Admin",
    "Nitesh Kumar": "Nitesh@Admin",
    "Ayush Srivastava": "Ayush@Admin",
    "Dhruv Yadav": "Dhruv@Admin"
};


/* =========================================
   2. STATE & HELPER FUNCTIONS
   ========================================= */

let userRole = 'student'; // Default State

// Convert ALL CAPS to Title Case (e.g. "ABHISHEK" -> "Abhishek")
function toTitleCase(str) {
    if(!str) return "";
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}


/* =========================================
   3. UI INTERACTION (Tabs, Toggles)
   ========================================= */

// Switch between Student, Teacher, and Admin views
function switchTab(role) {
    userRole = role;
    
    // Elements
    const tabStudent = document.getElementById('tabStudent');
    const tabTeacher = document.getElementById('tabTeacher');
    const tabsContainer = document.getElementById('standardTabs');
    const loginTitle = document.getElementById('loginTitle');
    const loginSubText = document.getElementById('loginSubText');
    const userInput = document.getElementById('usernameInput');
    const passInput = document.getElementById('passwordInput');
    const adminBtn = document.getElementById('adminToggleBtn');

    // Reset Input Fields
    userInput.value = "";
    passInput.value = "";

    // Default Visibility
    tabsContainer.classList.remove('hidden');
    adminBtn.innerText = "Admin? Log in here";

    if (role === 'student') {
        tabStudent.classList.add('active');
        tabTeacher.classList.remove('active');
        loginTitle.innerText = "Student Login";
        loginSubText.innerText = "Enter Reg No. & DOB (DDMMYYYY)";
        userInput.placeholder = "Registration Number";
        passInput.placeholder = "Date of Birth (e.g. 21092005)";
    } 
    else if (role === 'teacher') {
        tabTeacher.classList.add('active');
        tabStudent.classList.remove('active');
        loginTitle.innerText = "Teacher Login";
        loginSubText.innerText = "Enter Name/ID & Subject Code";
        userInput.placeholder = "Teacher Name (ID)";
        passInput.placeholder = "Subject Code (Password)";
    } 
    else if (role === 'admin') {
        tabsContainer.classList.add('hidden'); // Hide tabs in admin mode
        loginTitle.innerText = "Admin Access";
        loginSubText.innerText = "System Administrator Only";
        userInput.placeholder = "Admin Username";
        passInput.placeholder = "Admin Password";
        adminBtn.innerText = "Back to Student/Teacher Login";
    }
}

// Event Listener for Admin Toggle Button
document.getElementById('adminToggleBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (userRole === 'admin') {
        switchTab('student');
    } else {
        switchTab('admin');
    }
});

// Event Listener for Eye Icon (Show/Hide Password)
document.getElementById('togglePassword').addEventListener('click', function() {
    const input = document.getElementById('passwordInput');
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});


/* =========================================
   4. LOGIN AUTHENTICATION LOGIC
   ========================================= */

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get trimmed values
    const user = document.getElementById('usernameInput').value.trim();
    const pass = document.getElementById('passwordInput').value.trim();
    
    let isValid = false;
    let loggedInName = "";

    // --- CHECK STUDENT ---
    if (userRole === 'student') {
        // user = RegNo, pass = DOB
        if (studentDB[user] && studentDB[user].dob === pass) {
            isValid = true;
            // Format name nicely
            loggedInName = toTitleCase(studentDB[user].name);
        }
    } 
    // --- CHECK TEACHER ---
    else if (userRole === 'teacher') {
        // user = Teacher Name, pass = Subject Code
        // Direct string match
        if (teacherDB[user] && teacherDB[user] === pass) {
            isValid = true;
            loggedInName = "Prof. " + user;
        }
    } 
    // --- CHECK ADMIN ---
    else if (userRole === 'admin') {
        // user = Username, pass = Password
        if (adminDB[user] && adminDB[user] === pass) {
            isValid = true;
            loggedInName = user.split(' ')[0] + " (Admin)";
        }
    }

    // --- RESULT ---
    if (isValid) {
        // Store session data (for the dashboard to use later)
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userRole", userRole);
        sessionStorage.setItem("userName", loggedInName);
        sessionStorage.setItem("userID", user);

        alert("Login Successful! Welcome " + loggedInName);
        
        // Redirect logic (Based on file structure)
        if (userRole === 'student') {
            window.location.href = "pages/dashboard/student.html";
        } else if (userRole === 'teacher') {
            window.location.href = "pages/dashboard/teacher.html";
        } else {
            window.location.href = "pages/dashboard/admin.html";
        }

    } else {
        alert("❌ Invalid Credentials. Please check details again.");
    }
});
