/* js/dashboard.js */

// 1. IMPORT FIREBASE (Using generic CDN links for simplicity)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// YOUR CONFIG (Replace with your actual config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCm__tUZQ306quXAW6vbN7PsGGtYuttLik",
  authDomain: "bccl-ems-1826f.firebaseapp.com",
  projectId: "bccl-ems-1826f",
  storageBucket: "bccl-ems-1826f.firebasestorage.app",
  messagingSenderId: "863769805844",
  appId: "1:863769805844:web:cb2fb02b61c9d0c46e9301"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/* --- STATE --- */
const userRole = sessionStorage.getItem("userRole");
const userName = sessionStorage.getItem("userName");
const userID = sessionStorage.getItem("userID");

// Data Store (for searching)
let allUploads = [];

/* --- INIT --- */
window.onload = function() {
    // 1. Security Check
    if (!sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "../../login.html"; // Go back to login
        return;
    }

    // 2. Load Profile
    document.getElementById('profileName').innerText = userName;
    document.getElementById('profileID').innerText = "ID: " + userID;
    
    // Set Avatar based on role
    let avatarUrl = "https://ui-avatars.com/api/?background=0a4d2e&color=fff&name=" + userName;
    document.getElementById('profileImg').src = avatarUrl;

    // 3. Listen for Data
    fetchData();
};

/* --- LOGIC: FETCH DATA --- */
function fetchData() {
    const q = query(collection(db, "uploads"), orderBy("timestamp", "desc"));
    
    onSnapshot(q, (snapshot) => {
        allUploads = [];
        // Clear Mini Windows
        document.getElementById('mini_notes').innerHTML = '';
        document.getElementById('mini_ebooks').innerHTML = '';
        document.getElementById('mini_pyqs').innerHTML = '';
        document.getElementById('mini_notices').innerHTML = '';

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            data.id = docSnap.id; // Save Firestore ID for deletion
            allUploads.push(data);

            // Render to Mini Window (Only top 3 per category)
            const miniContainer = document.getElementById(`mini_${data.category}s`); // e.g. mini_notes
            if (miniContainer && miniContainer.children.length < 3) {
                const item = document.createElement('div');
                item.className = 'list_item';
                item.innerHTML = `
                    <h4>${data.title}</h4>
                    <span>By ${data.author} • ${new Date(data.timestamp?.toDate()).toLocaleDateString()}</span>
                `;
                miniContainer.appendChild(item);
            }
        });
    });
}

/* --- LOGIC: MODALS --- */
window.openModal = function(category) {
    const modal = document.getElementById('viewModal');
    const title = document.getElementById('modalTitle');
    const tableBody = document.getElementById('modalTableBody');
    
    modal.classList.add('active');
    title.innerText = category.toUpperCase() + " - Full List";
    tableBody.innerHTML = "";

    // Filter data for this category
    const filtered = allUploads.filter(item => item.category === category);

    filtered.forEach(item => {
        const row = document.createElement('tr');
        
        let deleteButton = "";
        // Show Delete button ONLY if Admin or if Teacher owns it (Optional logic)
        // Per your request: "Admins can delete any info"
        if (userRole === 'admin') {
            deleteButton = `<button class="delete_btn" onclick="deleteItem('${item.id}', '${item.fileRef}')"><i class="fa-solid fa-trash"></i></button>`;
        }

        row.innerHTML = `
            <td>
                <strong>${item.title}</strong><br>
                <small>${item.desc || ""}</small>
            </td>
            <td>${item.author}</td>
            <td>${new Date(item.timestamp?.toDate()).toLocaleDateString()}</td>
            <td>
                <a href="${item.url}" target="_blank" class="action_btn_dl">Download</a>
                ${deleteButton}
            </td>
        `;
        tableBody.appendChild(row);
    });
};

window.closeModal = function() {
    document.getElementById('viewModal').classList.remove('active');
    document.getElementById('uploadModal').classList.remove('active');
};

/* --- LOGIC: UPLOAD (Teachers/Admins Only) --- */
window.openUploadModal = function() {
    document.getElementById('uploadModal').classList.add('active');
};

document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Uploading...";
    btn.disabled = true;

    const title = document.getElementById('upTitle').value;
    const category = document.getElementById('upCategory').value; // note, ebook, pyq, notice
    const desc = document.getElementById('upDesc').value;
    const file = document.getElementById('upFile').files[0];

    try {
        let downloadURL = "";
        let fileRefPath = "";

        // If file exists, upload to Storage
        if (file) {
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytesResumable(storageRef, file);
            downloadURL = await getDownloadURL(snapshot.ref);
            fileRefPath = snapshot.ref.fullPath;
        }

        // Save Metadata to Firestore
        await addDoc(collection(db, "uploads"), {
            title, category, desc, 
            url: downloadURL,
            fileRef: fileRefPath,
            author: userName,
            timestamp: serverTimestamp()
        });

        alert("Upload Successful!");
        closeModal();
        e.target.reset();

    } catch (error) {
        console.error(error);
        alert("Error uploading: " + error.message);
    }
    btn.innerText = "Upload";
    btn.disabled = false;
});

/* --- LOGIC: DELETE (Admins Only) --- */
window.deleteItem = async function(docId, fileRefPath) {
    if(!confirm("Are you sure you want to delete this? This cannot be undone.")) return;

    try {
        // 1. Delete from Firestore
        await deleteDoc(doc(db, "uploads", docId));

        // 2. Delete file from Storage (if it exists)
        if (fileRefPath) {
            const fileRef = ref(storage, fileRefPath);
            await deleteObject(fileRef);
        }
        
        alert("Deleted Successfully");
        // Re-render modal current view (simple way is to close it for now)
        closeModal(); 

    } catch (error) {
        console.error(error);
        alert("Error deleting: " + error.message);
    }
};

/* --- LOGIC: LOGOUT --- */
window.handleLogout = function() {
    sessionStorage.clear();
    window.location.href = "../../index.html";
};
