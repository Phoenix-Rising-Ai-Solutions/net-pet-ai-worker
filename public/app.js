const $ = (id) => document.getElementById(id);

const healthEl = $("health");
const onboardingOut = $("onboardingOut");
const modesOut = $("modesOut");
const feedbackOut = $("feedbackOut");
const petOut = $("petOut");
const petPills = $("petPills");
const classroomOut = $("classroomOut");

function show(el, value) {
  el.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

async function api(path, method = "GET", body) {
  const res = await fetch(path, {
    method,
    headers: { "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
}

function studentIdOrFallback() {
  return $("studentId").value.trim() || "student-001";
}

function classIdOrFallback() {
  return $("classId").value.trim() || "grade12-a";
}

function renderPetPills(state) {
  petPills.innerHTML = "";
  const pairs = [
    ["Streak", state.streak],
    ["XP", state.xp],
    ["Mood", state.mood],
    ["Sessions", state.totalSessions]
  ];
  for (const [k, v] of pairs) {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = `${k}: ${v}`;
    petPills.appendChild(span);
  }
}

async function loadHealth() {
  try {
    const data = await api("/api/health");
    healthEl.className = "status ok";
    healthEl.textContent = `API healthy: ${data.app} / Coach ${data.coach}`;
  } catch {
    healthEl.className = "status warn";
    healthEl.textContent = "API health check failed";
  }
}

$("submitOnboarding").addEventListener("click", async () => {
  try {
    const payload = {
      studentId: studentIdOrFallback(),
      fullName: $("fullName").value,
      currentCity: $("currentCity").value,
      birthplace: $("birthplace").value,
      englishLevel: $("englishLevel").value,
      goals: $("goals").value,
      confidenceAreas: $("confidenceAreas").value,
      occupation: $("occupation").value,
      fearTrigger: $("fearTrigger").value,
      learningHistory: $("learningHistory").value,
      motivationNow: $("motivationNow").value
    };
    const data = await api("/api/onboarding", "POST", payload);
    show(onboardingOut, data);
  } catch (err) {
    show(onboardingOut, `Onboarding failed: ${String(err)}`);
  }
});

$("runLesson").addEventListener("click", async () => {
  const data = await api("/api/lesson", "POST", {
    level: $("level").value,
    topic: $("topic").value
  });
  show(modesOut, data);
});

$("runPractice").addEventListener("click", async () => {
  const data = await api("/api/practice", "POST", {
    level: $("level").value,
    topic: $("topic").value
  });
  show(modesOut, data);
});

$("runFeedback").addEventListener("click", async () => {
  const data = await api("/api/feedback", "POST", {
    studentResponse: $("studentResponse").value
  });
  show(feedbackOut, data);
});

$("checkin").addEventListener("click", async () => {
  const data = await api("/api/netpet/checkin", "POST", {
    studentId: studentIdOrFallback(),
    minutes: Number($("minutes").value),
    confidence: Number($("confidence").value)
  });

  if (data.state) renderPetPills(data.state);
  show(petOut, data);
});

$("refreshPet").addEventListener("click", async () => {
  const studentId = encodeURIComponent(studentIdOrFallback());
  const data = await api(`/api/netpet/state?studentId=${studentId}`);
  if (data.state) renderPetPills(data.state);
  show(petOut, data);
});

$("startClassSession").addEventListener("click", async () => {
  try {
    const data = await api("/api/classroom/session/start", "POST", {
      classId: classIdOrFallback(),
      teacherId: $("teacherId").value.trim() || "obi",
      totalStudents: Number($("totalStudents").value) || 40
    });
    show(classroomOut, data);
  } catch (err) {
    show(classroomOut, `Start session failed: ${String(err)}`);
  }
});

$("logClassEvent").addEventListener("click", async () => {
  try {
    const data = await api("/api/classroom/event", "POST", {
      classId: classIdOrFallback(),
      studentId: $("eventStudentId").value.trim(),
      type: $("eventType").value,
      ruleStatus: $("ruleStatus").value,
      notes: $("eventNotes").value
    });
    show(classroomOut, data);
  } catch (err) {
    show(classroomOut, `Log event failed: ${String(err)}`);
  }
});

$("refreshClassSummary").addEventListener("click", async () => {
  try {
    const classId = encodeURIComponent(classIdOrFallback());
    const totalStudents = Number($("totalStudents").value) || 40;
    const data = await api(`/api/classroom/session?classId=${classId}&totalStudents=${totalStudents}`);
    show(classroomOut, data);
  } catch (err) {
    show(classroomOut, `Refresh summary failed: ${String(err)}`);
  }
});

$("generateClassReport").addEventListener("click", async () => {
  try {
    const classId = encodeURIComponent(classIdOrFallback());
    const totalStudents = Number($("totalStudents").value) || 40;
    const data = await api(`/api/classroom/report?classId=${classId}&totalStudents=${totalStudents}`);
    show(classroomOut, data.reportText || data);
  } catch (err) {
    show(classroomOut, `Generate report failed: ${String(err)}`);
  }
});

loadHealth();
