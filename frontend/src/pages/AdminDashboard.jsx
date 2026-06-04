import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";

const API_BASE = `${API_BASE_URL}/api`;

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("company");

  // Data States
  const [projects, setProjects] = useState([]);
  const [insights, setInsights] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [values, setValues] = useState([]);
  const [services, setServices] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [careers, setCareers] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [esgPillars, setEsgPillars] = useState([]);
  const [esgForm, setEsgForm] = useState({ id: null, title: "", icon: "", color: "#1D4ED8", itemsInput: "" });
  const [teamDivisions, setTeamDivisions] = useState([]);
  const [teamDivisionForm, setTeamDivisionForm] = useState({ id: null, title: "", description: "", bulletsInput: "", imageUrl: "" });
  const [vlogs, setVlogs] = useState([]);
  const [vlogForm, setVlogForm] = useState({ id: null, title: "", description: "", videoUrl: "", driveUrl: "", thumbnailUrl: "", category: "Construction", date: "" });
  const [aboutFounders, setAboutFounders] = useState([]);
  const [aboutFounderForm, setAboutFounderForm] = useState({ id: null, title: "", subtitle: "", content: "", founderName: "", founderRole: "", imageUrl: "" });

  // Form States (New / Edit)
  const [projectForm, setProjectForm] = useState({ id: null, title: "", category: "", description: "", image: "", location: "", status: "In Progress", progress: 0, completionDate: "" });
  const [insightForm, setInsightForm] = useState({ id: null, title: "", category: "", date: "", summary: "", content: "", imageUrl: "" });
  const [leadershipForm, setLeadershipForm] = useState({ id: null, name: "", role: "", initials: "" });
  const [valueForm, setValueForm] = useState({ id: null, title: "", description: "" });
  const [serviceForm, setServiceForm] = useState({ id: null, title: "", descText: "", img: "" });
  const [expertiseForm, setExpertiseForm] = useState({ id: null, name: "", description: "", imageUrl: "" });
  const [careerForm, setCareerForm] = useState({ id: null, icon: "💼", title: "", description: "" });
  const [benefitForm, setBenefitForm] = useState({ id: null, benefitText: "" });

  const getHeaders = () => {
    const token = localStorage.getItem("adminAuth");
    return {
      "Content-Type": "application/json",
      "Authorization": `Basic ${token}`
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("adminAuth");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const resProj = await fetch(`${API_BASE}/projects`);
      if (resProj.ok) setProjects(await resProj.json());

      const resIns = await fetch(`${API_BASE}/insights`);
      if (resIns.ok) setInsights(await resIns.json());

      const resLead = await fetch(`${API_BASE}/leadership`);
      if (resLead.ok) setLeadership(await resLead.json());

      const resVal = await fetch(`${API_BASE}/company-values`);
      if (resVal.ok) setValues(await resVal.json());

      const resServ = await fetch(`${API_BASE}/services`);
      if (resServ.ok) setServices(await resServ.json());

      const resExp = await fetch(`${API_BASE}/expertise`);
      if (resExp.ok) setExpertise(await resExp.json());

      const resCar = await fetch(`${API_BASE}/careers`);
      if (resCar.ok) setCareers(await resCar.json());

      const resBen = await fetch(`${API_BASE}/benefits`);
      if (resBen.ok) setBenefits(await resBen.json());

      const resInq = await fetch(`${API_BASE}/contact`, { headers: getHeaders() });
      if (resInq.ok) setInquiries(await resInq.json());

      const resEsg = await fetch(`${API_BASE}/esg`);
      if (resEsg.ok) setEsgPillars(await resEsg.json());

      const resTeam = await fetch(`${API_BASE}/team-divisions`);
      if (resTeam.ok) setTeamDivisions(await resTeam.json());

      const resVlogs = await fetch(`${API_BASE}/vlogs`);
      if (resVlogs.ok) setVlogs(await resVlogs.json());

      const resAboutFounder = await fetch(`${API_BASE}/about-founder`);
      if (resAboutFounder.ok) setAboutFounders(await resAboutFounder.json());

      fetchAssets();
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await fetch(`${API_BASE}/uploads`);
      if (res.ok) {
        setUploadedAssets(await res.json());
      }
    } catch (e) {
      console.error("Error fetching assets", e);
    }
  };

  const handleImageUpload = async (file, onUploadSuccess) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onUploadSuccess(data.url);
        fetchAssets();
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminAuth", data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (err) {
      setLoginError("Could not connect to backend server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  const handleSaveEsg = async (e) => {
    e.preventDefault();
    const isEdit = esgForm.id !== null;
    const url = isEdit ? `${API_BASE}/esg/${esgForm.id}` : `${API_BASE}/esg`;
    const method = isEdit ? "PUT" : "POST";
    const bodyData = {
      id: esgForm.id,
      title: esgForm.title,
      icon: esgForm.icon,
      color: esgForm.color,
      items: esgForm.itemsInput.split("\n").map(i => i.trim()).filter(i => i.length > 0)
    };
    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(bodyData)
      });
      if (res.ok) {
        setEsgForm({ id: null, title: "", icon: "", color: "#1D4ED8", itemsInput: "" });
        fetchData();
      } else {
        alert("Operation failed. Verify authorization.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditEsg = (pillar) => {
    setEsgForm({
      id: pillar.id,
      title: pillar.title,
      icon: pillar.icon,
      color: pillar.color,
      itemsInput: pillar.items ? pillar.items.join("\n") : ""
    });
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    const isEdit = teamDivisionForm.id !== null;
    const url = isEdit ? `${API_BASE}/team-divisions/${teamDivisionForm.id}` : `${API_BASE}/team-divisions`;
    const method = isEdit ? "PUT" : "POST";
    const bodyData = {
      id: teamDivisionForm.id,
      title: teamDivisionForm.title,
      description: teamDivisionForm.description,
      imageUrl: teamDivisionForm.imageUrl,
      bullets: teamDivisionForm.bulletsInput.split("\n").map(i => i.trim()).filter(i => i.length > 0)
    };
    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(bodyData)
      });
      if (res.ok) {
        setTeamDivisionForm({ id: null, title: "", description: "", bulletsInput: "", imageUrl: "" });
        fetchData();
      } else {
        alert("Operation failed. Verify authorization.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTeam = (td) => {
    setTeamDivisionForm({
      id: td.id,
      title: td.title,
      description: td.description,
      imageUrl: td.imageUrl || "",
      bulletsInput: td.bullets ? td.bullets.join("\n") : ""
    });
  };

  // CRUD Actions
  const handleSave = async (endpoint, form, setForm, resetForm, refetch) => {
    const isEdit = form.id !== null;
    const url = isEdit ? `${API_BASE}/${endpoint}/${form.id}` : `${API_BASE}/${endpoint}`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm(resetForm);
        fetchData();
      } else {
        alert("Operation failed. Verify authorization.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        fetchData();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: 420, margin: "100px auto", padding: "2.5rem", background: "white", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", borderRadius: 12, border: "1px solid #E5E7EB" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 6, textAlign: "center" }}>Admin Portal</h2>
        <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 28, textAlign: "center" }}>Sign in to manage application content</p>

        {loginError && <div style={{ color: "#EF4444", background: "#FEF2F2", padding: "10px 12px", fontSize: 13, borderRadius: 6, marginBottom: 20 }}>{loginError}</div>}

        <form onSubmit={handleLogin} style={{ display: "grid", gap: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#374151", marginBottom: 6 }}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 14 }} placeholder="e.g. admin" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#374151", marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 14 }} placeholder="••••••••" />
          </div>
          <button type="submit" style={{ background: "#1D4ED8", color: "white", border: "none", borderRadius: 6, padding: "14px", fontWeight: 700, cursor: "pointer", fontSize: 14, marginTop: 10, transition: "background 0.2s" }} onMouseEnter={e => e.target.style.background = "#1E40AF"} onMouseLeave={e => e.target.style.background = "#1D4ED8"}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: "40px auto", padding: "0 2rem 5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5E7EB", paddingBottom: 20, marginBottom: 30 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>Application Control Console</h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Real-time database content management (PostgreSQL)</p>
        </div>
        <button onClick={handleLogout} style={{ background: "#EF4444", color: "white", border: "none", cursor: "pointer", padding: "10px 20px", borderRadius: 6, fontSize: 13, fontWeight: 700 }}>
          Logout Control Panel
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30, background: "#F3F4F6", padding: 6, borderRadius: 8 }}>
        {[
          { key: "company", label: "🏢 Company" },
          { key: "services", label: "🔧 Services" },
          { key: "projects", label: "🏗 Projects" },
          { key: "news", label: "📰 News" },
          { key: "careers", label: "💼 Careers" },
          { key: "assets", label: "🖼 Assets" },
          { key: "inquiries", label: "📩 Inquiries" },
          { key: "esg", label: "🌿 ESG" },
          { key: "team", label: "👥 Team" },
          { key: "vlog", label: "📹 Vlog" },
          { key: "founder", label: "👤 Founder" },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{
            padding: "10px 16px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700,
            background: activeTab === key ? "white" : "transparent",
            color: activeTab === key ? "#1D4ED8" : "#4B5563",
            boxShadow: activeTab === key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Company values and Leadership Tab */}
      {activeTab === "company" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Section: Leadership */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Our Leadership</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("leadership", leadershipForm, setLeadershipForm, { id: null, name: "", role: "", initials: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{leadershipForm.id ? "Edit Member" : "Add Leader"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Name" value={leadershipForm.name} onChange={e => setLeadershipForm({ ...leadershipForm, name: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <input type="text" placeholder="Role" value={leadershipForm.role} onChange={e => setLeadershipForm({ ...leadershipForm, role: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <input type="text" placeholder="Initials (e.g. PD)" value={leadershipForm.initials} onChange={e => setLeadershipForm({ ...leadershipForm, initials: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 10, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                  {leadershipForm.id && <button type="button" onClick={() => setLeadershipForm({ id: null, name: "", role: "", initials: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div style={{ display: "grid", gap: 10 }}>
              {leadership.map(lm => (
                <div key={lm.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <div>
                    <strong style={{ display: "block" }}>{lm.name} ({lm.initials})</strong>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{lm.role}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setLeadershipForm(lm)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => handleDelete("leadership", lm.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Company Values */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Core Values</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("company-values", valueForm, setValueForm, { id: null, title: "", description: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{valueForm.id ? "Edit Value" : "Add Value"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Title" value={valueForm.title} onChange={e => setValueForm({ ...valueForm, title: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <textarea placeholder="Description" value={valueForm.description} onChange={e => setValueForm({ ...valueForm, description: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB", height: 80 }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 10, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                  {valueForm.id && <button type="button" onClick={() => setValueForm({ id: null, title: "", description: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div style={{ display: "grid", gap: 10 }}>
              {values.map(val => (
                <div key={val.id} style={{ padding: 14, border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <strong>{val.title}</strong>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setValueForm(val)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete("company-values", val.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services and Expertise Tab */}
      {activeTab === "services" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Section: Services */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Our Services</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("services", serviceForm, setServiceForm, { id: null, title: "", descText: "", img: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{serviceForm.id ? "Edit Service" : "Add Service"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Service Title" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <textarea placeholder="Description" value={serviceForm.descText} onChange={e => setServiceForm({ ...serviceForm, descText: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB", height: 80 }} />
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                  <input type="text" placeholder="Image URL" value={serviceForm.img} onChange={e => setServiceForm({ ...serviceForm, img: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                    <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setServiceForm({ ...serviceForm, img: url })); }} style={{ fontSize: 12 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 10, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                  {serviceForm.id && <button type="button" onClick={() => setServiceForm({ id: null, title: "", descText: "", img: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div style={{ display: "grid", gap: 12 }}>
              {services.map(serv => (
                <div key={serv.id} style={{ display: "flex", gap: 14, padding: 14, border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <img src={serv.img} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <strong style={{ fontSize: 15 }}>{serv.title}</strong>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setServiceForm(serv)} style={{ padding: "3px 6px", fontSize: 10, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => handleDelete("services", serv.id)} style={{ padding: "3px 6px", fontSize: 10, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{serv.descText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Expertise */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Expertise Areas</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("expertise", expertiseForm, setExpertiseForm, { id: null, name: "", description: "", imageUrl: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{expertiseForm.id ? "Edit Expertise" : "Add Expertise"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Expertise Name" value={expertiseForm.name} onChange={e => setExpertiseForm({ ...expertiseForm, name: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <textarea placeholder="Description" value={expertiseForm.description || ""} onChange={e => setExpertiseForm({ ...expertiseForm, description: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB", height: 80 }} />
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                  <input type="text" placeholder="Image URL" value={expertiseForm.imageUrl || ""} onChange={e => setExpertiseForm({ ...expertiseForm, imageUrl: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                    <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setExpertiseForm({ ...expertiseForm, imageUrl: url })); }} style={{ fontSize: 12 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 10, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                  {expertiseForm.id && <button type="button" onClick={() => setExpertiseForm({ id: null, name: "", description: "", imageUrl: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div style={{ display: "grid", gap: 12 }}>
              {expertise.map(exp => (
                <div key={exp.id} style={{ display: "flex", gap: 14, padding: 14, border: "1px solid #E5E7EB", borderRadius: 6, background: "white" }}>
                  {exp.imageUrl && <img src={exp.imageUrl} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <strong style={{ fontSize: 15 }}>{exp.name}</strong>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setExpertiseForm({ ...exp, description: exp.description || "", imageUrl: exp.imageUrl || "" })} style={{ padding: "3px 6px", fontSize: 10, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => handleDelete("expertise", exp.id)} style={{ padding: "3px 6px", fontSize: 10, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Project Portfolio</h2>

          <form onSubmit={e => { e.preventDefault(); handleSave("projects", projectForm, setProjectForm, { id: null, title: "", category: "", description: "", image: "", location: "", status: "In Progress", progress: 0, completionDate: "" }); }} style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, marginBottom: 30, border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{projectForm.id ? "Edit Project Details" : "Create New Project Entry"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <input type="text" placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <input type="text" placeholder="Category (e.g. Commercial, Sports)" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <input type="text" placeholder="Location" value={projectForm.location} onChange={e => setProjectForm({ ...projectForm, location: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                <input type="text" placeholder="Image URL" value={projectForm.image} onChange={e => setProjectForm({ ...projectForm, image: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", width: "100%" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                  <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setProjectForm({ ...projectForm, image: url })); }} style={{ fontSize: 12 }} />
                </div>
              </div>
              <input type="text" placeholder="Completion Date (e.g. Dec 2027)" value={projectForm.completionDate} onChange={e => setProjectForm({ ...projectForm, completionDate: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <div style={{ display: "flex", gap: 12 }}>
                <select value={projectForm.status} onChange={e => setProjectForm({ ...projectForm, status: e.target.value })} style={{ flex: 1, padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }}>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
                <input type="number" placeholder="Progress %" value={projectForm.progress} onChange={e => setProjectForm({ ...projectForm, progress: parseInt(e.target.value) || 0 })} required style={{ width: 100, padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              </div>
            </div>
            <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 100, marginBottom: 16 }} />

            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" style={{ padding: "12px 24px", background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save Project</button>
              {projectForm.id && <button type="button" onClick={() => setProjectForm({ id: null, title: "", category: "", description: "", image: "", location: "", status: "In Progress", progress: 0, completionDate: "" })} style={{ padding: "12px 24px", background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
            </div>
          </form>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ display: "flex", gap: 16, padding: 16, border: "1px solid #E5E7EB", borderRadius: 8 }}>
                <img src={proj.image} alt="" style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <strong style={{ fontSize: 16 }}>{proj.title}</strong>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setProjectForm(proj)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete("projects", proj.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{proj.category} | {proj.location} | {proj.status} ({proj.progress}%)</div>
                  <p style={{ fontSize: 13, color: "#4B5563", margin: 0, lineHeight: 1.5 }}>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News & Insights Tab */}
      {activeTab === "news" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>News & Insights Articles</h2>

          <form onSubmit={e => { e.preventDefault(); handleSave("insights", insightForm, setInsightForm, { id: null, title: "", category: "", date: "", summary: "", content: "", imageUrl: "" }); }} style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, marginBottom: 30, border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{insightForm.id ? "Edit News Post" : "Publish News & Insights"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <input type="text" placeholder="Article Title" value={insightForm.title} onChange={e => setInsightForm({ ...insightForm, title: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <input type="text" placeholder="Category (e.g. Press Release, Innovation)" value={insightForm.category} onChange={e => setInsightForm({ ...insightForm, category: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <input type="text" placeholder="Date (e.g. May 29, 2026)" value={insightForm.date} onChange={e => setInsightForm({ ...insightForm, date: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
              <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                <input type="text" placeholder="Image URL" value={insightForm.imageUrl || ""} onChange={e => setInsightForm({ ...insightForm, imageUrl: e.target.value })} style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", width: "100%", boxSizing: "border-box" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                  <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setInsightForm({ ...insightForm, imageUrl: url })); }} style={{ fontSize: 12 }} />
                </div>
              </div>
            </div>
            <textarea placeholder="Summary Excerpt" value={insightForm.summary} onChange={e => setInsightForm({ ...insightForm, summary: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 60, marginBottom: 16 }} />
            <textarea placeholder="Full Article Content" value={insightForm.content} onChange={e => setInsightForm({ ...insightForm, content: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 120, marginBottom: 16 }} />

            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" style={{ padding: "12px 24px", background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Publish Post</button>
              {insightForm.id && <button type="button" onClick={() => setInsightForm({ id: null, title: "", category: "", date: "", summary: "", content: "", imageUrl: "" })} style={{ padding: "12px 24px", background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
            </div>
          </form>

          <div style={{ display: "grid", gap: 16 }}>
            {insights.map(item => (
              <div key={item.id} style={{ padding: 16, border: "1px solid #E5E7EB", borderRadius: 8, background: "white" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {item.imageUrl && <img src={item.imageUrl} alt="" style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <strong style={{ fontSize: 17, color: "#111827" }}>{item.title}</strong>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setInsightForm({ ...item, imageUrl: item.imageUrl || "" })} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => handleDelete("insights", item.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{item.category} | {item.date}</div>
                    <p style={{ fontSize: 14, color: "#374151", fontWeight: 600, marginBottom: 6 }}>{item.summary}</p>
                    <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Careers & Benefits Tab */}
      {activeTab === "careers" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Section: Job opportunities */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Career Categories</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("careers", careerForm, setCareerForm, { id: null, icon: "💼", title: "", description: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{careerForm.id ? "Edit Career Entry" : "Create Career Category"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type="text" placeholder="Emoji Icon" value={careerForm.icon} onChange={e => setCareerForm({ ...careerForm, icon: e.target.value })} required style={{ width: 80, padding: 10, borderRadius: 4, border: "1px solid #D1D5DB", textAlign: "center" }} />
                  <input type="text" placeholder="Opportunity Category Name" value={careerForm.title} onChange={e => setCareerForm({ ...careerForm, title: e.target.value })} required style={{ flex: 1, padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                </div>
                <textarea placeholder="Description" value={careerForm.description} onChange={e => setCareerForm({ ...careerForm, description: e.target.value })} required style={{ padding: 10, borderRadius: 4, border: "1px solid #D1D5DB", height: 80 }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 10, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                  {careerForm.id && <button type="button" onClick={() => setCareerForm({ id: null, icon: "💼", title: "", description: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>

            <div style={{ display: "grid", gap: 10 }}>
              {careers.map(job => (
                <div key={job.id} style={{ display: "flex", gap: 12, padding: 14, border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <div style={{ fontSize: 32 }}>{job.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <strong>{job.title}</strong>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setCareerForm(job)} style={{ padding: "3px 6px", fontSize: 10, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => handleDelete("careers", job.id)} style={{ padding: "3px 6px", fontSize: 10, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Benefits */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Benefits Offerings</h2>

            <form onSubmit={e => { e.preventDefault(); handleSave("benefits", benefitForm, setBenefitForm, { id: null, benefitText: "" }); }} style={{ background: "#F9FAFB", padding: 20, borderRadius: 8, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{benefitForm.id ? "Edit Benefit" : "Add Benefit Description"}</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="text" placeholder="e.g. Competitive salary and performance bonus" value={benefitForm.benefitText} onChange={e => setBenefitForm({ ...benefitForm, benefitText: e.target.value })} required style={{ flex: 1, padding: 10, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <button type="submit" style={{ padding: "10px 20px", background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save</button>
                {benefitForm.id && <button type="button" onClick={() => setBenefitForm({ id: null, benefitText: "" })} style={{ padding: 10, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
              </div>
            </form>

            <div style={{ display: "grid", gap: 10 }}>
              {benefits.map(ben => (
                <div key={ben.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <span style={{ fontSize: 13 }}>✓ {ben.benefitText}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => setBenefitForm(ben)} style={{ padding: "2px 4px", fontSize: 9, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => handleDelete("benefits", ben.id)} style={{ padding: "2px 4px", fontSize: 9, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Assets & Media Tab */}
      {activeTab === "assets" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Assets & Media Manager</h2>

          <div style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, marginBottom: 30, border: "1px solid #E5E7EB", textAlign: "center" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Upload New Asset</h3>
            <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Select an image file from your device to upload it to the server</p>
            <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => alert("Uploaded successfully! URL: " + url)); }} style={{ padding: "10px 20px", border: "1px dashed #D1D5DB", borderRadius: 6, display: "inline-block", background: "white" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {uploadedAssets.map(asset => (
              <div key={asset.name} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 12, background: "white", display: "flex", flexDirection: "column", gap: 10 }}>
                <img src={asset.url} alt="" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4, background: "#F3F4F6" }} />
                <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, color: "#374151" }}>{asset.name}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => { navigator.clipboard.writeText(asset.url); alert("Copied URL to clipboard!"); }} style={{ flex: 1, padding: "6px 12px", fontSize: 11, background: "#1D4ED8", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>
                    Copy Link
                  </button>
                  <a href={asset.url} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 12px", fontSize: 11, background: "#E5E7EB", color: "#374151", border: "none", borderRadius: 4, textDecoration: "none", textAlign: "center", fontWeight: 600 }}>
                    Open
                  </a>
                </div>
              </div>
            ))}
            {uploadedAssets.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#9CA3AF", padding: "40px 0" }}>No assets uploaded yet.</div>
            )}
          </div>
        </div>
      )}
      {/* Contact Inquiries Tab */}
      {activeTab === "inquiries" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Contact Inquiries</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {inquiries.map(inq => (
              <div key={inq.id} style={{ padding: 24, border: "1px solid #E5E7EB", borderRadius: 8, background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{inq.name}</h3>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{inq.email} | {inq.phone || "No Phone"} | {inq.company || "No Company"}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase" }}>{inq.type}</span>
                    <button onClick={() => handleDelete("contact", inq.id)} style={{ background: "#FEE2E2", color: "#EF4444", border: "none", borderRadius: 4, cursor: "pointer", padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>
                      Delete
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, background: "#F9FAFB", padding: 16, borderRadius: 6, margin: 0 }}>{inq.message}</p>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 10, textAlign: "right" }}>
                  Submitted At: {inq.submittedAt ? new Date(inq.submittedAt).toLocaleString() : "Unknown"}
                </div>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div style={{ textAlign: "center", color: "#9CA3AF", padding: "40px 0" }}>No contact inquiries received yet.</div>
            )}
          </div>
        </div>
      )}
      {/* ESG Pillars Tab */}
      {activeTab === "esg" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Manage ESG Pillars</h2>
            <form onSubmit={handleSaveEsg} style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, border: "1px solid #E5E7EB", display: "grid", gap: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{esgForm.id ? "Edit ESG Pillar" : "Add New ESG Pillar"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Title (e.g. Environmental)" value={esgForm.title} onChange={e => setEsgForm({ ...esgForm, title: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                  <input type="text" placeholder="Icon / Image URL" value={esgForm.icon} onChange={e => setEsgForm({ ...esgForm, icon: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                    <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setEsgForm({ ...esgForm, icon: url })); }} style={{ fontSize: 12 }} />
                  </div>
                </div>
                <input type="text" placeholder="Color Hex (e.g. #16A34A)" value={esgForm.color} onChange={e => setEsgForm({ ...esgForm, color: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#4B5563", marginBottom: 4 }}>Pillar Items (One item per line)</label>
                  <textarea placeholder="Reduce construction material waste across all sites&#10;Promote responsible disposal and recycling practices" value={esgForm.itemsInput} onChange={e => setEsgForm({ ...esgForm, itemsInput: e.target.value })} required style={{ width: "100%", height: 120, padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 12, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save Pillar</button>
                  {esgForm.id && <button type="button" onClick={() => setEsgForm({ id: null, title: "", icon: "", color: "#1D4ED8", itemsInput: "" })} style={{ padding: 12, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>
          </div>

          {/* List */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Existing Pillars</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {esgPillars.map(pillar => (
                <div key={pillar.id} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, background: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {pillar.icon && pillar.icon.startsWith("http") ? (
                        <img src={pillar.icon} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} />
                      ) : (
                        <span style={{ fontSize: 24 }}>{pillar.icon}</span>
                      )}
                      <div>
                        <strong style={{ fontSize: 16, color: pillar.color }}>{pillar.title}</strong>
                        <span style={{ fontSize: 11, color: "#9CA3AF", display: "block" }}>Color: {pillar.color}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handleEditEsg(pillar)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete("esg", pillar.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 12, color: "#4B5563", lineHeight: 1.6 }}>
                    {pillar.items && pillar.items.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Team Divisions Tab */}
      {activeTab === "team" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Manage Team Divisions</h2>
            <form onSubmit={handleSaveTeam} style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, border: "1px solid #E5E7EB", display: "grid", gap: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{teamDivisionForm.id ? "Edit Team Division" : "Add New Team Division"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Title (e.g. Sales & Business Management)" value={teamDivisionForm.title} onChange={e => setTeamDivisionForm({ ...teamDivisionForm, title: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <textarea placeholder="Description" value={teamDivisionForm.description} onChange={e => setTeamDivisionForm({ ...teamDivisionForm, description: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 100 }} />
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                  <input type="text" placeholder="Image URL" value={teamDivisionForm.imageUrl} onChange={e => setTeamDivisionForm({ ...teamDivisionForm, imageUrl: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Or upload:</span>
                    <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setTeamDivisionForm({ ...teamDivisionForm, imageUrl: url })); }} style={{ fontSize: 12 }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#4B5563", marginBottom: 4 }}>Division Bullets / Services (One item per line)</label>
                  <textarea placeholder="Client Relationship Management&#10;Market Research & Analysis" value={teamDivisionForm.bulletsInput} onChange={e => setTeamDivisionForm({ ...teamDivisionForm, bulletsInput: e.target.value })} style={{ width: "100%", height: 100, padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 12, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save Division</button>
                  {teamDivisionForm.id && <button type="button" onClick={() => setTeamDivisionForm({ id: null, title: "", description: "", bulletsInput: "", imageUrl: "" })} style={{ padding: 12, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>
          </div>

          {/* List */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Existing Divisions</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {teamDivisions.map(td => (
                <div key={td.id} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, background: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {td.imageUrl && (
                        <img src={td.imageUrl} alt="" style={{ width: 60, height: 45, objectFit: "cover", borderRadius: 4 }} />
                      )}
                      <div>
                        <strong style={{ fontSize: 16, color: "#1D4ED8" }}>{td.title}</strong>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handleEditTeam(td)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete("team-divisions", td.id)} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, margin: "0 0 10px" }}>{td.description}</p>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                    {td.bullets && td.bullets.map((b, index) => <li key={index}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vlog Tab */}
      {activeTab === "vlog" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Manage Vlogs</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const isEdit = vlogForm.id !== null;
                const url = isEdit ? `${API_BASE}/vlogs/${vlogForm.id}` : `${API_BASE}/vlogs`;
                const method = isEdit ? "PUT" : "POST";
                const body = { title: vlogForm.title, description: vlogForm.description, videoUrl: vlogForm.videoUrl, driveUrl: vlogForm.driveUrl, thumbnailUrl: vlogForm.thumbnailUrl, category: vlogForm.category, date: vlogForm.date };
                const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(body) });
                if (res.ok) {
                  const fresh = await fetch(`${API_BASE}/vlogs`);
                  if (fresh.ok) setVlogs(await fresh.json());
                  setVlogForm({ id: null, title: "", description: "", videoUrl: "", driveUrl: "", thumbnailUrl: "", category: "Construction", date: "" });
                } else { alert("Failed to save vlog."); }
              }}
              style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, border: "1px solid #E5E7EB", display: "grid", gap: 16 }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{vlogForm.id ? "Edit Vlog" : "Add New Vlog"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Title" value={vlogForm.title} onChange={e => setVlogForm({ ...vlogForm, title: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <textarea placeholder="Description" value={vlogForm.description} onChange={e => setVlogForm({ ...vlogForm, description: e.target.value })} style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 80, fontFamily: "inherit" }} />
                {/* YouTube URL */}
                <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 6, padding: "10px 12px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#92400E", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>▶ YouTube URL (optional)</p>
                  <input type="text" placeholder="https://youtube.com/watch?v=... or youtu.be/..." value={vlogForm.videoUrl} onChange={e => setVlogForm({ ...vlogForm, videoUrl: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: "1px solid #FED7AA", fontSize: 13, boxSizing: "border-box" }} />
                  <p style={{ fontSize: 11, color: "#78350F", margin: "4px 0 0" }}>Any YouTube link format is supported — auto-converted to embed.</p>
                </div>
                {/* Google Drive URL */}
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, padding: "10px 12px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#1E3A8A", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>🗂 Google Drive URL (recommended — plays inside site)</p>
                  <input type="text" placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing" value={vlogForm.driveUrl} onChange={e => setVlogForm({ ...vlogForm, driveUrl: e.target.value })} style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: "1px solid #BFDBFE", fontSize: 13, boxSizing: "border-box" }} />
                  <p style={{ fontSize: 11, color: "#1D4ED8", margin: "4px 0 0" }}>Share → Copy link from Google Drive. Auto-converted to /preview embed — plays without leaving this site.</p>
                </div>
                <input type="text" placeholder="Thumbnail Image URL" value={vlogForm.thumbnailUrl} onChange={e => setVlogForm({ ...vlogForm, thumbnailUrl: e.target.value })} style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B7280" }}>
                  <span>Or upload thumbnail:</span>
                  <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setVlogForm({ ...vlogForm, thumbnailUrl: url })); }} style={{ fontSize: 12 }} />
                </div>
                <select value={vlogForm.category} onChange={e => setVlogForm({ ...vlogForm, category: e.target.value })} style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", background: "white" }}>
                  {["Construction", "Interior Design", "3D Visualization", "Site Tour", "Testimonial", "Tips & Tricks"].map(c => <option key={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Date (e.g. May 30, 2026)" value={vlogForm.date} onChange={e => setVlogForm({ ...vlogForm, date: e.target.value })} required style={{ padding: 12, borderRadius: 4, border: "1px solid #D1D5DB" }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 12, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save Vlog</button>
                  {vlogForm.id && <button type="button" onClick={() => setVlogForm({ id: null, title: "", description: "", videoUrl: "", thumbnailUrl: "", category: "Construction", date: "" })} style={{ padding: 12, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>}
                </div>
              </div>
            </form>
          </div>

          {/* List */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Existing Vlogs ({vlogs.length})</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {vlogs.map(v => (
                <div key={v.id} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, background: "white" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    {v.thumbnailUrl && <img src={v.thumbnailUrl} alt="" style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase" }}>{v.category}</span>
                          <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: "6px 0 2px", lineHeight: 1.3 }}>{v.title}</p>
                          <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{v.date}</p>
                        </div>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                          <button onClick={() => setVlogForm({ ...v, description: v.description || "", videoUrl: v.videoUrl || "", thumbnailUrl: v.thumbnailUrl || "" })} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                          <button onClick={async () => { if (window.confirm("Delete this vlog?")) { await fetch(`${API_BASE}/vlogs/${v.id}`, { method: "DELETE", headers: getHeaders() }); setVlogs(vlogs.filter(x => x.id !== v.id)); } }} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {vlogs.length === 0 && <p style={{ color: "#9CA3AF", fontSize: 14 }}>No vlogs added yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Founder Tab */}
      {activeTab === "founder" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <div style={{ padding: "10px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Manage Founder Section</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSave(
                  "about-founder",
                  aboutFounderForm,
                  setAboutFounderForm,
                  { id: null, title: "", subtitle: "", content: "", founderName: "", founderRole: "", imageUrl: "" },
                  fetchData
                );
                const fresh = await fetch(`${API_BASE}/about-founder`);
                if (fresh.ok) setAboutFounders(await fresh.json());
              }}
              style={{ background: "#F9FAFB", padding: 24, borderRadius: 8, border: "1px solid #E5E7EB", display: "grid", gap: 16 }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{aboutFounderForm.id ? "Edit Founder Info" : "Add Founder Info"}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Section Title</label>
                  <input type="text" placeholder="About Anu Building Constructions" value={aboutFounderForm.title} onChange={e => setAboutFounderForm({ ...aboutFounderForm, title: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Subtitle</label>
                  <input type="text" placeholder="Meet Our Founder & Managing Director" value={aboutFounderForm.subtitle} onChange={e => setAboutFounderForm({ ...aboutFounderForm, subtitle: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Content / Description</label>
                  <textarea placeholder="Write detail description about the company and founder leadership..." value={aboutFounderForm.content} onChange={e => setAboutFounderForm({ ...aboutFounderForm, content: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", height: 160, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Founder Name</label>
                  <input type="text" placeholder="Mr. P. Anbarasan" value={aboutFounderForm.founderName} onChange={e => setAboutFounderForm({ ...aboutFounderForm, founderName: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Founder Role</label>
                  <input type="text" placeholder="Founder & Managing Director" value={aboutFounderForm.founderRole} onChange={e => setAboutFounderForm({ ...aboutFounderForm, founderRole: e.target.value })} required style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6 }}>Founder Image URL</label>
                  <input type="text" placeholder="Image URL" value={aboutFounderForm.imageUrl} onChange={e => setAboutFounderForm({ ...aboutFounderForm, imageUrl: e.target.value })} style={{ width: "100%", padding: 12, borderRadius: 4, border: "1px solid #D1D5DB", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B7280" }}>
                  <span>Or upload photo:</span>
                  <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) handleImageUpload(e.target.files[0], url => setAboutFounderForm({ ...aboutFounderForm, imageUrl: url })); }} style={{ fontSize: 12 }} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button type="submit" style={{ flex: 1, padding: 12, background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Save Founder Info</button>
                  {aboutFounderForm.id && (
                    <button type="button" onClick={() => setAboutFounderForm({ id: null, title: "", subtitle: "", content: "", founderName: "", founderRole: "", imageUrl: "" })} style={{ padding: 12, background: "#6B7280", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* List */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Current Founder Info Section</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {aboutFounders.map(af => (
                <div key={af.id} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 20, background: "white" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {af.imageUrl && <img src={af.imageUrl} alt="" style={{ width: 100, height: 120, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: 16, color: "#111827", margin: "0 0 4px" }}>{af.title}</p>
                          <p style={{ fontWeight: 600, fontSize: 13, color: "#1D4ED8", margin: "0 0 10px" }}>{af.subtitle}</p>
                        </div>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                          <button onClick={() => setAboutFounderForm(af)} style={{ padding: "4px 8px", fontSize: 11, background: "#E5E7EB", border: "none", cursor: "pointer" }}>Edit</button>
                          <button onClick={async () => { if (window.confirm("Delete this founder section?")) { await handleDelete("about-founder", af.id); const fresh = await fetch(`${API_BASE}/about-founder`); if (fresh.ok) setAboutFounders(await fresh.json()); } }} style={{ padding: "4px 8px", fontSize: 11, background: "#FEE2E2", color: "#EF4444", border: "none", cursor: "pointer" }}>Delete</button>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6, margin: "0 0 12px" }}>{af.content}</p>
                      <div style={{ borderLeft: "3px solid #1D4ED8", paddingLeft: 12 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{af.founderName}</p>
                        <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>{af.founderRole}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {aboutFounders.length === 0 && <p style={{ color: "#9CA3AF", fontSize: 14 }}>No founder section added yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
