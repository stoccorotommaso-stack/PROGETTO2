const API_URL = "http://localhost:3000";

let teachersMap = {};

// Caricamento dei professori
async function loadTeachers() {
    const res = await fetch(API_URL + "/teachers");
    const teachers = await res.json();
    
    // Mappa per comodità visiva
    teachers.forEach(t => {
        teachersMap[t.id] = `${t.name} (${t.subject})`;
    });

    const gradeTeacherSelect = document.getElementById("gradeTeacher");
    const noteTeacherSelect = document.getElementById("noteTeacher");

    gradeTeacherSelect.innerHTML = `<option value="">Seleziona prof</option>`;
    noteTeacherSelect.innerHTML = `<option value="">Seleziona prof</option>`;

    teachers.forEach(t => {
        gradeTeacherSelect.innerHTML += `<option value="${t.id}">${t.name} (${t.subject})</option>`;
        noteTeacherSelect.innerHTML += `<option value="${t.id}">${t.name} (${t.subject})</option>`;
    });

    // Finito di caricare prof, carichiamo i dati delle liste dipendenti dai prof
    loadNotes();
    loadGrades();
}

// ---- LOGICA NOTE ----
async function loadNotes() {
    const res = await fetch(API_URL + "/notes");
    const notes = await res.json();
    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");
        const teacherName = teachersMap[note.teacherId] || "Sconosciuto";
        li.innerHTML = `
            <div class="item-details">
                <span class="item-badge">Prof: ${teacherName}</span>
                <span>"${note.text}"</span>
            </div>
            <button class="btn-danger" onclick="deleteNote(${note.id})">Rimuovi</button>
        `;
        list.appendChild(li);
    });
}

async function addNote() {
    const text = document.getElementById("noteText").value;
    const teacherId = document.getElementById("noteTeacher").value;

    if (!text || !teacherId) return alert("Inserisci testo e professore.");

    await fetch(API_URL + "/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, teacherId: parseInt(teacherId) })
    });

    document.getElementById("noteText").value = "";
    loadNotes();
}

async function deleteNote(id) {
    await fetch(API_URL + "/notes/" + id, { method: "DELETE" });
    loadNotes();
}

// ---- LOGICA VOTI ----
async function loadGrades() {
    const res = await fetch(API_URL + "/grades");
    const grades = await res.json();
    const list = document.getElementById("gradesList");
    list.innerHTML = "";

    grades.forEach(grade => {
        const li = document.createElement("li");
        const teacherName = teachersMap[grade.teacherId] || "Sconosciuto";
        li.innerHTML = `
            <div class="item-details">
                <span class="item-badge" style="background-color: ${grade.grade >= 6 ? 'var(--success)' : 'var(--danger)'}">Voto: ${grade.grade}</span>
                <span style="font-size: 13px;">${grade.type.toUpperCase()} | ${teacherName}</span>
            </div>
            <button class="btn-danger" onclick="deleteGrade(${grade.id})">Rimuovi</button>
        `;
        list.appendChild(li);
    });
}

async function addGrade() {
    const grade = document.getElementById("gradeValue").value;
    const type = document.getElementById("gradeType").value;
    const teacherId = document.getElementById("gradeTeacher").value;

    if (!grade || !teacherId) return alert("Inserisci voto e professore.");

    await fetch(API_URL + "/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade: parseFloat(grade), type, teacherId: parseInt(teacherId) })
    });

    document.getElementById("gradeValue").value = "";
    loadGrades();
}

async function deleteGrade(id) {
    await fetch(API_URL + "/grades/" + id, { method: "DELETE" });
    loadGrades();
}

// Inizializza
loadTeachers();
