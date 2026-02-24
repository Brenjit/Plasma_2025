"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// Types
interface GalleryImage {
    id: string;
    url: string;
    previewUrl?: string | null;
    tags: string[];
}

interface Event {
    id: string;
    name: string;
    folderId: string;
    thumbnail?: string;
    description: string;
    images: GalleryImage[];
}

interface GalleryData {
    events: Event[];
}

// Default Constants
const DEFAULT_EVENT: Event = {
    id: "",
    name: "New Event",
    folderId: "",
    description: "",
    images: []
};

export default function AdminGalleryPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [data, setData] = useState<GalleryData | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // Edit State
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isNewEvent, setIsNewEvent] = useState(false);

    // Image Tagging State
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchGallery();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "plasma2025admin") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const fetchGallery = async () => {
        setStatus("loading");
        try {
            // For now, we import the JSON directly or fetch from an API endpoint if we created one.
            // Since we updated data/gallery.json, let's assume we have an API or just use the JSON content.
            // Real implementation would fetch from /api/gallery
            const res = await fetch("/api/gallery"); // We need to create this route!
            // Wait, we haven't created the API route yet.
            // I will implement the UI assuming the API exists, and then create the API.
            // Or I can just mock it for now with the data I just wrote.
            const json = await res.json();
            setData(json);
            setStatus("idle");
        } catch (err) {
            console.error(err);
            setStatus("error");
            setMessage("Failed to load gallery data");
        }
    };

    const saveData = async (newData: GalleryData) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });

            if (res.ok) {
                setStatus("success");
                setMessage("Saved successfully!");
                setData(newData);
                setTimeout(() => {
                    setStatus("idle");
                    setMessage("");
                }, 2000);
            } else {
                throw new Error("Failed to save");
            }
        } catch (err) {
            setStatus("error");
            setMessage("Save failed.");
            throw err; // Re-throw to let callers know
        }
    };

    // --- Actions ---

    const handleDeleteEvent = (eventId: string) => {
        if (!data || !confirm("Delete this event?")) return;
        const newData = {
            events: data.events.filter(e => e.id !== eventId)
        };
        saveData(newData);
    };

    const openAddEventModal = () => {
        setEditingEvent({ ...DEFAULT_EVENT, id: uuidv4() });
        setIsNewEvent(true);
    };

    const openEditEventModal = (event: Event) => {
        setEditingEvent({ ...event });
        setIsNewEvent(false);
    };

    const handleSaveEvent = () => {
        if (!editingEvent) return;

        // Verify required fields
        if (!editingEvent.name.trim()) {
            alert("Please enter an event name");
            return;
        }

        const currentEvents = data?.events || [];
        let newEvents = [...currentEvents];

        if (isNewEvent) {
            newEvents.push(editingEvent);
        } else {
            newEvents = newEvents.map(e => e.id === editingEvent.id ? editingEvent : e);
        }

        saveData({ events: newEvents });
        setEditingEvent(null);
    };

    const updateEventField = (field: keyof Event, value: any) => {
        if (!editingEvent) return;
        setEditingEvent({ ...editingEvent, [field]: value });
    };

    // Sync Function
    const handleSync = async (eventId: string) => {
        console.log("Starting sync for event:", eventId); // Debug log
        const event = data?.events.find(e => e.id === eventId);
        if (!event || !event.folderId) {
            alert("Please add a Google Drive Folder ID to this event first.");
            return;
        }

        if (!confirm(`Sync images for "${event.name}" from Google Drive? This might take a few seconds.`)) return;

        setStatus("loading");
        try {
            console.log("Sending sync request..."); // Debug log
            const res = await fetch("/api/gallery/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folderId: event.folderId }),
            });

            console.log("Sync response status:", res.status); // Debug log
            const result = await res.json();
            console.log("Sync result:", result); // Debug log

            if (!res.ok) {
                throw new Error(result.error || "Sync failed");
            }

            // Merge new images, keeping existing tags if ID matches
            const currentImages = event.images || [];
            const newImages = result.images.map((newImg: GalleryImage) => {
                const existing = currentImages.find(img => img.id === newImg.id);
                return existing ? { ...newImg, tags: existing.tags } : newImg;
            });

            // Update event thumbnail if not set
            const updatedEvent = {
                ...event,
                images: newImages,
                thumbnail: event.thumbnail || (newImages.length > 0 ? newImages[0].url : event.thumbnail)
            };

            // Update Data
            if (!data) return;
            const updatedEvents = data.events.map(e => e.id === eventId ? updatedEvent : e);

            await saveData({ events: updatedEvents });
            setStatus("success");
            setTimeout(() => setStatus("idle"), 2000);
            alert(`Synced ${newImages.length} images successfully!`);

        } catch (err: any) {
            console.error("Sync Error:", err);
            setStatus("error");
            alert(`Sync Failed: ${err.message}`);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h1 className="text-xl font-bold mb-4 text-center text-gray-900">Gallery Admin</h1>
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

    if (!data && status === 'loading') return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-lg">photo_library</span>
                    </div>
                    <h1 className="font-bold text-gray-900 text-lg">Gallery Manager</h1>
                </div>
                <div className="flex gap-4 items-center">
                    {status === 'loading' && <span className="text-sm text-gray-500 animate-pulse">Saving...</span>}
                    {status === 'success' && <span className="text-sm text-green-600 font-bold">Saved!</span>}
                    {status === 'error' && <span className="text-sm text-red-500 font-bold">{message || "Error"}</span>}
                    <Link href="/gallery" target="_blank" className="text-primary hover:underline text-sm flex items-center gap-1 font-bold">
                        View Live Gallery <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                    <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-red-500 text-sm font-medium">Logout</button>
                </div>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.events.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
                            <div className="relative h-48 bg-gray-100">
                                {event.thumbnail ? (
                                    <img src={event.thumbnail} alt={event.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined text-4xl">image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEditEventModal(event)} className="p-2 bg-white/90 rounded-lg text-gray-600 hover:text-primary shadow-sm">
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button onClick={() => handleDeleteEvent(event.id)} className="p-2 bg-white/90 rounded-lg text-gray-600 hover:text-red-500 shadow-sm">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{event.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{event.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {event.images.length} Images
                                    </span>
                                    <button onClick={() => handleSync(event.id)} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                        <span className="material-symbols-outlined text-sm">sync</span> Sync Drive
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    <button onClick={openAddEventModal} className="h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-gray-50 transition-all gap-2 bg-transparent">
                        <span className="material-symbols-outlined text-4xl">add_circle</span>
                        <span className="font-bold">Add New Event Folder</span>
                    </button>
                </div>
            </main>

            {/* Edit Modal */}
            {editingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900">
                                {isNewEvent ? 'Create Event' : 'Edit Event'}
                            </h3>
                            <button onClick={() => setEditingEvent(null)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Event Name</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white"
                                    value={editingEvent.name}
                                    onChange={(e) => updateEventField("name", e.target.value)}
                                    placeholder="e.g. Inauguration"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white h-24"
                                    value={editingEvent.description}
                                    onChange={(e) => updateEventField("description", e.target.value)}
                                    placeholder="Event description..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">folder</span> Google Drive Folder ID
                                </label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white font-mono text-sm"
                                    value={editingEvent.folderId}
                                    onChange={(e) => updateEventField("folderId", e.target.value)}
                                    placeholder="Paste Folder ID here"
                                />
                                <p className="text-xs text-gray-400 mt-1">Found in the Drive folder URL after 'folders/'</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setEditingEvent(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleSaveEvent} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20">
                                Save Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

