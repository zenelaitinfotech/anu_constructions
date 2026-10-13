import React, { useState } from "react";
import { getImageUrl } from "../../config/api";

export default function ImageField({
  label,
  value,
  onChange,
  onUpload,
  uploadedAssets = [],
  placeholder = "Enter image URL or browse file..."
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");
    try {
      await onUpload(file, (newUrl) => {
        onChange(newUrl);
      });
    } catch (err) {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const filteredAssets = uploadedAssets?.filter((a) =>
    !searchTerm || a.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "6px 0" }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}

      {/* URL Input & Clear */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ flex: 1, padding: "10px 12px", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 13, background: "white" }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear image"
            style={{ padding: "8px 12px", background: "#FEE2E2", color: "#DC2626", border: "1px solid #FCA5A5", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Action Row: Browse & Upload Button + Media Library */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: isUploading ? "#93C5FD" : "#1D4ED8",
            color: "white",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            cursor: isUploading ? "wait" : "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            userSelect: "none"
          }}
        >
          <span>📁 {isUploading ? "Uploading..." : "Browse & Upload Image"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {uploadedAssets && uploadedAssets.length > 0 && (
          <button
            type="button"
            onClick={() => setShowMediaModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "#F3F4F6",
              color: "#374151",
              border: "1px solid #D1D5DB",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            🖼 Choose from Library ({uploadedAssets.length})
          </button>
        )}
      </div>

      {uploadError && (
        <span style={{ fontSize: 12, color: "#DC2626" }}>{uploadError}</span>
      )}

      {/* Live Preview Card */}
      {value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 10,
            background: "#F8FAFC",
            borderRadius: 8,
            border: "1px solid #E2E8F0"
          }}
        >
          <div style={{ width: 84, height: 64, borderRadius: 6, overflow: "hidden", background: "#E2E8F0", flexShrink: 0 }}>
            <img
              src={getImageUrl(value)}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                e.target.onerror = null;
                // If API_BASE URL failed, try direct relative path
                if (value.startsWith("/uploads/")) {
                  e.target.src = value;
                } else {
                  e.target.src = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&q=80";
                }
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ color: "#16A34A", fontSize: 12 }}>●</span>
              <strong style={{ fontSize: 12, color: "#16A34A" }}>Image Ready & Linked</strong>
            </div>
            <span
              style={{
                fontSize: 11,
                color: "#64748B",
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
              title={value}
            >
              {value}
            </span>
          </div>
        </div>
      )}

      {/* Media Library Picker Modal */}
      {showMediaModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
          onClick={() => setShowMediaModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 12,
              maxWidth: 720,
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              overflow: "hidden"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#F9FAFB"
              }}
            >
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>Media Library</h3>
                <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>Click an image to select it</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                style={{
                  background: "#E5E7EB",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* Search filter */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #F3F4F6" }}>
              <input
                type="text"
                placeholder="Search images by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 13 }}
              />
            </div>

            {/* Grid */}
            <div
              style={{
                padding: 20,
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: 14
              }}
            >
              {filteredAssets.map((asset) => {
                const isSelected = value === asset.url;
                return (
                  <div
                    key={asset.name}
                    onClick={() => {
                      onChange(asset.url);
                      setShowMediaModal(false);
                    }}
                    style={{
                      border: isSelected ? "3px solid #2563EB" : "1px solid #E5E7EB",
                      borderRadius: 8,
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#F9FAFB",
                      transition: "transform 0.15s, border-color 0.15s",
                      boxShadow: isSelected ? "0 0 0 2px #93C5FD" : "none"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <div style={{ width: "100%", height: 95, background: "#E5E7EB" }}>
                      <img
                        src={getImageUrl(asset.url)}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = asset.url;
                        }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "6px 8px",
                        fontSize: 10,
                        color: "#4B5563",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                      title={asset.name}
                    >
                      {asset.name}
                    </div>
                  </div>
                );
              })}
              {filteredAssets.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#9CA3AF", padding: "30px 0" }}>
                  No matching images found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
