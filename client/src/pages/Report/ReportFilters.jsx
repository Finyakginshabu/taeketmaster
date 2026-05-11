import React, { useState, useRef, useEffect } from "react";
// สมมติ Path ของคุณ
import CalendarPicker from "../../components/CalendarPicker.jsx"; 
import { Calendar } from "../../components/Icons.jsx"; 
import "./Reports.css";

// ── Component ย่อยสำหรับจัดการการกาง/หุบ Calendar Picker ──
const DateDropdown = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // ระบบเช็คว่าคลิกพื้นที่อื่นนอกกล่องหรือไม่ (ถ้าคลิกที่อื่นให้ปิด Calendar)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (val) => {
    // ส่งค่ากลับไป (สมมติว่า val ที่ส่งกลับมาคือค่าที่เราต้องการ หรือ val.target.value)
    const selectedValue = val?.target?.value ?? val; 
    onChange(selectedValue);
    setIsOpen(false); // เลือกวันที่เสร็จแล้วให้ปิดปฏิทิน
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "160px" }}>
      {/* ── กล่อง Input หลอก (กดเพื่อเปิดปฏิทิน) ── */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: "8px 36px 8px 12px", 
          borderRadius: "6px", 
          border: "1px solid var(--border)", 
          width: "100%", 
          boxSizing: "border-box",
          cursor: "pointer",
          backgroundColor: "var(--bg-surface, #fff)",
          minHeight: "38px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span style={{ color: value ? "var(--text-main)" : "var(--text-muted)", fontSize: "0.9rem" }}>
          {value || placeholder}
        </span>
        
        {/* ไอคอนของคุณ */}
        <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-main)", display: "flex" }}>
          <Calendar width={18} height={18} />
        </span>
      </div>

      {/* ── ตัวโมดูลปฏิทินของคุณ (จะโชว์ก็ต่อเมื่อ isOpen = true) ── */}
      {isOpen && (
        <div style={{ 
          position: "absolute", 
          top: "100%", 
          left: 0, 
          marginTop: "6px", 
          zIndex: 100, 
          backgroundColor: "white", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", 
          borderRadius: "8px",
          border: "1px solid var(--border-muted)"
        }}>
          <CalendarPicker value={value} onChange={handleDateSelect} />
        </div>
      )}
    </div>
  );
};


export default function ReportFilters({ filters, onChange, onApply, onReset }) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="report-filters">
      {/* ── กล่องเลือกวันที่ (Date Range) ── */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "8px" }}>
          Date Range
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          <DateDropdown 
            value={filters.dateFrom || ""} 
            onChange={(val) => handleChange("dateFrom", val)} 
            placeholder="dd/mm/yyyy" 
          />

          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>to</span>

          <DateDropdown 
            value={filters.dateTo || ""} 
            onChange={(val) => handleChange("dateTo", val)} 
            placeholder="dd/mm/yyyy" 
          />

        </div>
      </div>

      {/* ── เส้นคั่น ── */}
      <div style={{ height: "1px", backgroundColor: "var(--border-muted)", opacity: 0.3, marginBottom: "16px" }}></div>

      {/* ── ปุ่มกด (Actions) ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button type="button" className="btn btn-outline" onClick={onReset}>
          Reset
        </button>
        <button type="button" className="btn btn-primary" onClick={onApply}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  );
}