"use client";

import { useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// Types
interface Talk {
    title: string;
    speaker: string;
    duration: string;
    type?: string;
    code?: string;
    slides?: string;
    video?: string;
}

interface Session {
    name: string;
    chair?: string;
    talks: Talk[];
}

interface Slot {
    time: string;
    endTime: string;
    type: "common" | "session" | "break";
    title: string;
    subtitle?: string;
    chair?: string;
    location?: string;
    talks?: Talk[]; // For common slots
    sessions?: Session[]; // For parallel sessions
}

interface Day {
    id: string;
    date: string;
    title: string;
    slots: Slot[];
}

interface ProceedingsData {
    types: string[];
    days: Day[];
}

// Default Constants
const DEFAULT_TALK: Talk = { title: "New Talk", speaker: "", duration: "15 min", type: "Oral" };
const DEFAULT_SESSION: Session = { name: "New Session", talks: [] };
const DEFAULT_SLOT: Slot = { time: "09:00 AM", endTime: "10:00 AM", type: "common", title: "New Slot" };
const DEFAULT_DAY: Day = { id: "", date: "Dec 27, 2025", title: "New Day", slots: [] };

export default function AdminProceedingsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [data, setData] = useState<ProceedingsData | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // Type Manager State
    const [showTypeManager, setShowTypeManager] = useState(false);
    const [newType, setNewType] = useState("");

    // Unified Edit State
    // Type: 'day' | 'slot' | 'session' | 'talk'
    // Mode: 'edit' | 'add'
    interface EditState {
        type: 'day' | 'slot' | 'session' | 'talk';
        mode: 'edit' | 'add';
        path: number[]; // [dayIdx, slotIdx, sessionIdx, talkIdx] (use -1 for irrelevant levels)
        data: any;
    }

    const [editingItem, setEditingItem] = useState<EditState | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "plasma2025admin") {
            setIsAuthenticated(true);
            fetchProceedings();
        } else {
            alert("Incorrect password");
        }
    };

    const fetchProceedings = async () => {
        setStatus("loading");
        try {
            const res = await fetch("/api/proceedings");
            const json = await res.json();
            // Ensure types exists
            if (!json.types) json.types = ["Invited Talk", "Oral", "Poster", "Keynote", "Sponsor"];
            setData(json);
            setStatus("idle");
        } catch (err) {
            setStatus("error");
            setMessage("Failed to load proceedings data");
        }
    };

    const saveData = async (newData: ProceedingsData) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/proceedings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });

            if (res.ok) {
                setStatus("success");
                setMessage("Saved successfully!");
                setData(newData);
                setTimeout(() => setStatus("idle"), 2000);
            } else {
                throw new Error("Failed to save");
            }
        } catch (err) {
            setStatus("error");
            setMessage("Save failed.");
        }
    };

    // --- Type Management ---
    const handleAddType = () => {
        if (!newType.trim() || !data) return;
        const newData = { ...data, types: [...data.types, newType.trim()] };
        saveData(newData);
        setNewType("");
    };

    const handleDeleteType = (typeToDelete: string) => {
        if (!data || !confirm(`Delete talk type "${typeToDelete}"?`)) return;
        const newData = { ...data, types: data.types.filter(t => t !== typeToDelete) };
        saveData(newData);
    };

    // --- Actions ---

    const handleDelete = (type: 'day' | 'slot' | 'session' | 'talk', path: number[]) => {
        if (!data || !confirm("Are you sure you want to delete this item? This cannot be undone by 'Discard Changes' once saved.")) return;

        const newData = { ...data };
        const [dIdx, sIdx, sessIdx, tIdx] = path;

        if (type === 'day') {
            newData.days.splice(dIdx, 1);
        } else if (type === 'slot') {
            newData.days[dIdx].slots.splice(sIdx, 1);
        } else if (type === 'session') {
            newData.days[dIdx].slots[sIdx].sessions?.splice(sessIdx, 1);
        } else if (type === 'talk') {
            if (sessIdx !== -1) {
                newData.days[dIdx].slots[sIdx].sessions![sessIdx].talks.splice(tIdx, 1);
            } else {
                newData.days[dIdx].slots[sIdx].talks?.splice(tIdx, 1);
            }
        }

        saveData(newData);
    };

    const openAddModal = (type: 'day' | 'slot' | 'session' | 'talk', path: number[]) => {
        let defaultData: any;
        if (type === 'day') defaultData = { ...DEFAULT_DAY, id: uuidv4() };
        if (type === 'slot') defaultData = { ...DEFAULT_SLOT };
        if (type === 'session') defaultData = { ...DEFAULT_SESSION };
        if (type === 'talk') defaultData = { ...DEFAULT_TALK };

        setEditingItem({
            type,
            mode: 'add',
            path,
            data: defaultData
        });
    };

    const openEditModal = (type: 'day' | 'slot' | 'session' | 'talk', path: number[], currentData: any) => {
        setEditingItem({
            type,
            mode: 'edit',
            path,
            data: { ...currentData } // Clone
        });
    };

    const handleSaveItem = () => {
        if (!editingItem || !data) return;
        const { type, mode, path, data: itemData } = editingItem;
        const [dIdx, sIdx, sessIdx, tIdx] = path;
        const newData = { ...data };

        if (mode === 'add') {
            if (type === 'day') {
                newData.days.push(itemData);
            } else if (type === 'slot') {
                newData.days[dIdx].slots.push(itemData);
            } else if (type === 'session') {
                if (!newData.days[dIdx].slots[sIdx].sessions) newData.days[dIdx].slots[sIdx].sessions = [];
                newData.days[dIdx].slots[sIdx].sessions!.push(itemData);
            } else if (type === 'talk') {
                if (sessIdx !== -1) {
                    if (!newData.days[dIdx].slots[sIdx].sessions![sessIdx].talks) newData.days[dIdx].slots[sIdx].sessions![sessIdx].talks = [];
                    newData.days[dIdx].slots[sIdx].sessions![sessIdx].talks.push(itemData);
                } else {
                    if (!newData.days[dIdx].slots[sIdx].talks) newData.days[dIdx].slots[sIdx].talks = [];
                    newData.days[dIdx].slots[sIdx].talks!.push(itemData);
                }
            }
        } else {
            // Edit
            if (type === 'day') {
                newData.days[dIdx] = itemData;
            } else if (type === 'slot') {
                newData.days[dIdx].slots[sIdx] = itemData;
            } else if (type === 'session') {
                newData.days[dIdx].slots[sIdx].sessions![sessIdx] = itemData;
            } else if (type === 'talk') {
                if (sessIdx !== -1) {
                    newData.days[dIdx].slots[sIdx].sessions![sessIdx].talks[tIdx] = itemData;
                } else {
                    newData.days[dIdx].slots[sIdx].talks![tIdx] = itemData;
                }
            }
        }

        saveData(newData);
        setEditingItem(null);
    };

    const updateEditField = (field: string, value: any) => {
        if (!editingItem) return;
        setEditingItem({
            ...editingItem,
            data: { ...editingItem.data, [field]: value }
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h1 className="text-xl font-bold mb-4 text-center text-gray-900">Admin Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white"
                    />
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    if (!data) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                    </div>
                    <h1 className="font-bold text-gray-900 text-lg">Proceedings Editor</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={() => setShowTypeManager(true)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">category</span> Manage Types
                    </button>
                    {status === 'loading' && <span className="text-sm text-gray-500 animate-pulse">Saving...</span>}
                    {status === 'success' && <span className="text-sm text-green-600 font-bold">Saved!</span>}
                    <Link href="/proceedings" target="_blank" className="text-primary hover:underline text-sm flex items-center gap-1 font-bold">
                        View Live Page <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                    <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-red-500 text-sm font-medium">Logout</button>
                </div>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
                <div className="space-y-16">
                    {data.days.map((day, dayIdx) => (
                        <div key={day.id || dayIdx} className="relative group/day border-l-4 border-gray-300 pl-6">
                            {/* Day Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 font-display">{day.title}</h2>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{day.date}</span>
                                </div>
                                <div className="flex gap-2 opacity-100 transition-opacity">
                                    <button onClick={() => openEditModal('day', [dayIdx, -1, -1, -1], day)} className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg" title="Edit Day">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete('day', [dayIdx, -1, -1, -1])} className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg" title="Delete Day">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>

                            {/* Slots */}
                            <div className="space-y-8">
                                {day.slots.map((slot, slotIdx) => (
                                    <div key={slotIdx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative group/slot">
                                        {/* Slot Admin Controls */}
                                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                                            <button onClick={() => openEditModal('slot', [dayIdx, slotIdx, -1, -1], slot)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg bg-white/80 border border-gray-200" title="Edit Slot">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete('slot', [dayIdx, slotIdx, -1, -1])} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg bg-white/80 border border-gray-200" title="Delete Slot">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            {/* Slot Info */}
                                            <div className="mb-6 pr-20">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-primary font-bold">{slot.time} - {slot.endTime}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${slot.type === 'break' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {slot.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{slot.title}</h3>
                                                {slot.subtitle && <p className="text-gray-500 text-sm mt-1">{slot.subtitle}</p>}
                                                {slot.chair && <p className="text-sm text-primary font-medium mt-2"><span className="text-gray-400 font-normal">Session Chair:</span> {slot.chair}</p>}
                                            </div>

                                            {/* Slot Content */}
                                            {/* 1. Parallel Sessions */}
                                            {slot.type === 'session' && (
                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {slot.sessions?.map((session, sessionIdx) => (
                                                            <div key={sessionIdx} className="bg-gray-50 rounded-lg p-5 border border-gray-100 relative group/session">
                                                                <div className="absolute top-2 right-2 flex gap-1">
                                                                    <button onClick={() => openEditModal('session', [dayIdx, slotIdx, sessionIdx, -1], session)} className="p-1 text-gray-400 hover:text-primary" title="Edit Session"><span className="material-symbols-outlined text-sm">edit</span></button>
                                                                    <button onClick={() => handleDelete('session', [dayIdx, slotIdx, sessionIdx, -1])} className="p-1 text-gray-400 hover:text-red-500" title="Delete Session"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                                </div>
                                                                <h4 className="font-bold text-gray-900 mb-1 pr-16">{session.name}</h4>
                                                                <p className="text-xs text-gray-500 mb-4">{session.chair ? `Chair: ${session.chair}` : 'No Chair'}</p>

                                                                <div className="space-y-3">
                                                                    {session.talks.map((talk, talkIdx) => (
                                                                        <TalkCard
                                                                            key={talkIdx}
                                                                            talk={talk}
                                                                            onEdit={() => openEditModal('talk', [dayIdx, slotIdx, sessionIdx, talkIdx], talk)}
                                                                            onDelete={() => handleDelete('talk', [dayIdx, slotIdx, sessionIdx, talkIdx])}
                                                                        />
                                                                    ))}
                                                                    <button onClick={() => openAddModal('talk', [dayIdx, slotIdx, sessionIdx, -1])} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs font-bold hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-1">
                                                                        <span className="material-symbols-outlined text-sm">add</span> Add Talk
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <button onClick={() => openAddModal('session', [dayIdx, slotIdx, -1, -1])} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-1 transition-colors">
                                                            <span className="material-symbols-outlined text-sm">add</span> Add Session
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* 2. Common Talks */}
                                            {(slot.type === 'common') && (
                                                <div className="pt-4 border-t border-gray-100 space-y-3">
                                                    {slot.talks?.map((talk, talkIdx) => (
                                                        <TalkCard
                                                            key={talkIdx}
                                                            talk={talk}
                                                            onEdit={() => openEditModal('talk', [dayIdx, slotIdx, -1, talkIdx], talk)}
                                                            onDelete={() => handleDelete('talk', [dayIdx, slotIdx, -1, talkIdx])}
                                                        />
                                                    ))}
                                                    <button onClick={() => openAddModal('talk', [dayIdx, slotIdx, -1, -1])} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm font-bold hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                                        <span className="material-symbols-outlined">add</span> Add Common Talk
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => openAddModal('slot', [dayIdx, -1, -1, -1])} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 font-bold hover:border-primary hover:text-primary bg-gray-50/50 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">add_circle</span> Add Time Slot
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button onClick={() => openAddModal('day', [-1, -1, -1, -1])} className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto">
                        <span className="material-symbols-outlined">calendar_add_on</span> Add New Day
                    </button>
                </div>
            </main>

            {/* Type Manager Modal */}
            {showTypeManager && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900">Manage Talk Types</h3>
                            <button onClick={() => setShowTypeManager(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                    placeholder="Add new type (e.g. Sponsor)"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <button onClick={handleAddType} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark">Add</button>
                            </div>
                            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                                {data.types?.map((type) => (
                                    <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                                        <span className="font-medium text-gray-800">{type}</span>
                                        <button onClick={() => handleDeleteType(type)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                ))}
                                {(!data.types || data.types.length === 0) && <p className="text-center text-gray-400 text-sm">No types defined.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Generalized Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900 capitalize">
                                {editingItem.mode} {editingItem.type}
                            </h3>
                            <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

                            {/* DAY FIELDS */}
                            {editingItem.type === 'day' && (
                                <>
                                    <InputField label="Title" value={editingItem.data.title} onChange={(v) => updateEditField("title", v)} placeholder="e.g. Day 1 - Monday" />
                                    <InputField label="Date" value={editingItem.data.date} onChange={(v) => updateEditField("date", v)} placeholder="e.g. Dec 27, 2025" />
                                </>
                            )}

                            {/* SLOT FIELDS */}
                            {editingItem.type === 'slot' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Start Time" value={editingItem.data.time} onChange={(v) => updateEditField("time", v)} placeholder="09:00 AM" />
                                        <InputField label="End Time" value={editingItem.data.endTime} onChange={(v) => updateEditField("endTime", v)} placeholder="10:00 AM" />
                                    </div>
                                    <InputField label="Slot Title" value={editingItem.data.title} onChange={(v) => updateEditField("title", v)} placeholder="e.g. Keynote Session" />
                                    <InputField label="Subtitle" value={editingItem.data.subtitle || ""} onChange={(v) => updateEditField("subtitle", v)} placeholder="Optional description" />
                                    <InputField label="Chair" value={editingItem.data.chair || ""} onChange={(v) => updateEditField("chair", v)} placeholder="Optional" />
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white"
                                            value={editingItem.data.type}
                                            onChange={(e) => updateEditField("type", e.target.value)}
                                        >
                                            <option value="common">Common (Single Track)</option>
                                            <option value="session">Session (Multi Track)</option>
                                            <option value="break">Break</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* SESSION FIELDS */}
                            {editingItem.type === 'session' && (
                                <>
                                    <InputField label="Session Name" value={editingItem.data.name} onChange={(v) => updateEditField("name", v)} placeholder="e.g. Hall A: Plasma Physics" />
                                    <InputField label="Chair" value={editingItem.data.chair || ""} onChange={(v) => updateEditField("chair", v)} placeholder="Optional" />
                                </>
                            )}

                            {/* TALK FIELDS */}
                            {editingItem.type === 'talk' && (
                                <>
                                    <InputField label="Talk Title" value={editingItem.data.title} onChange={(v) => updateEditField("title", v)} placeholder="Talk Title" />
                                    <InputField label="Speaker" value={editingItem.data.speaker} onChange={(v) => updateEditField("speaker", v)} placeholder="Speaker Name" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Duration" value={editingItem.data.duration} onChange={(v) => updateEditField("duration", v)} placeholder="e.g. 15 min" />
                                        <InputField label="Code/ID" value={editingItem.data.code || ""} onChange={(v) => updateEditField("code", v)} placeholder="e.g. I-01" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                                        {/* Editable Type Input to allow custom types */}
                                        <div className="relative">
                                            <input
                                                list="talkTypes"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white"
                                                value={editingItem.data.type || ""}
                                                onChange={(e) => updateEditField("type", e.target.value)}
                                                placeholder="Select or Type..."
                                            />
                                            <datalist id="talkTypes">
                                                {/* Use managed types */}
                                                {data?.types?.sort().map(type => (
                                                    <option key={type} value={type} />
                                                ))}
                                            </datalist>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <InputField label="Slides URL" value={editingItem.data.slides || ""} onChange={(v) => updateEditField("slides", v)} placeholder="https://..." icon="link" />
                                    <InputField label="Video URL" value={editingItem.data.video || ""} onChange={(v) => updateEditField("video", v)} placeholder="https://..." icon="link" />
                                </>
                            )}

                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setEditingItem(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleSaveItem} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20">
                                {editingItem.mode === 'add' ? 'Create' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Components

interface InputFieldProps {
    label: string;
    value: any;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: string;
}

function InputField({ label, value, onChange, placeholder, icon }: InputFieldProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
                {label}
            </label>
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

function TalkCard({ talk, onEdit, onDelete }: { talk: Talk, onEdit: () => void, onDelete: () => void }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all shadow-sm group">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-600`}>
                        {talk.type || 'Talk'}
                    </span>
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {talk.duration}
                    </span>
                </div>
                <h5 className="font-bold text-gray-900 text-lg leading-snug mb-1">{talk.title}</h5>
                <p className="text-sm text-primary font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                    {talk.speaker}
                </p>
                <div className="flex gap-2 mt-2 opacity-50 text-[10px]">
                    {talk.slides && <span>Has Slides</span>}
                    {talk.video && <span>Has Video</span>}
                </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0 items-center justify-center">
                <button onClick={onEdit} className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg md:opacity-0 group-hover:opacity-100 transition-all">
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg md:opacity-0 group-hover:opacity-100 transition-all">
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    );
}
