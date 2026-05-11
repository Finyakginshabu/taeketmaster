import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime, REPORT_CONFIG } from "../../utils.js"; 
import ReportFilters from "./ReportFilters.jsx";
import PaginationFilter from "./PaginationFilter.jsx";
import ReportTable from "../../components/ReportTable.jsx";
import { getReportData } from "../../api/dashboard.api.js";
import "./Reports.css";

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export default function Reports({ type = "todays-booking" }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [filters, setFilters] = React.useState({});
  const [appliedFilters, setAppliedFilters] = React.useState({});
  const [hasApplied, setHasApplied] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  const [sortKey, setSortKey] = React.useState(null);
  const [sortDir, setSortDir] = React.useState("asc");

  const config = REPORT_CONFIG[type] || REPORT_CONFIG["todays-booking"];

  const fetchData = React.useCallback(
    (currentPage = page, currentLimit = limit, currentSortKey = sortKey, currentSortDir = sortDir) => {
      setLoading(true);
      setErr("");
      
      const params = {
        page: currentPage,
        limit: currentLimit,
        sortBy: currentSortKey || undefined,
        sortDir: currentSortDir || undefined,
        // ส่ง filter วันที่ไปด้วย
        date_from: appliedFilters.dateFrom || undefined,
        date_to: appliedFilters.dateTo || undefined,
      };

      // 3. เปลี่ยนจาก setTimeout เป็นการเรียก API จริง
      getReportData(type, params)
        .then((res) => {
          let rawData = res.data || [];

          /* จุดสำคัญ: แปลงข้อมูลจาก Object เป็น Array (ถ้า Backend ส่งมาเป็น Object สำหรับกราฟ)
             เช่น ถ้าเป็น popular-event ที่ส่งมาเป็น { "Event A": 10, "Event B": 20 }
          */
          if (!Array.isArray(rawData) && typeof rawData === 'object') {
            // ตัวอย่างการแปลงสำหรับ popular_events หรือ monthly_revenue
            rawData = Object.entries(rawData).map(([key, value]) => ({
              // ตั้งชื่อ key ให้ตรงกับที่เขียนไว้ใน REPORT_CONFIG ใน utils.js
              event_name: key, 
              remaining_tickets: value,
              month_name: key,
              revenue: value
            }));
          }

          setData(rawData);
          setTotal(res.total ?? rawData.length);
          setTotalPages(res.totalPages ?? 1);
        })
        .catch((e) => {
          setErr(e.message || "Failed to fetch data");
        })
        .finally(() => setLoading(false));
    },
    [type, appliedFilters, page, limit, sortKey, sortDir]
  );

  React.useEffect(() => {
    setFilters({});
    setAppliedFilters({});
    setData([]);
    setHasApplied(false);
    setPage(1);
    setTotal(0);
    setTotalPages(0);
    setSortKey(null);
    setSortDir("asc");
  }, [type]);

  React.useEffect(() => {
    if (!hasApplied) return;
    fetchData(1, limit);
  }, [hasApplied, appliedFilters, fetchData, limit]);

  const handleApply = () => {
    setAppliedFilters({ ...filters });
    setHasApplied(true);
    setPage(1);
    setSortKey(null);
    setSortDir("asc");
  };

  const handleSort = (key, dir) => {
    setSortKey(key);
    setSortDir(dir);
    setPage(1);
    fetchData(1, limit, key, dir);
  };

  const handleReset = () => {
    setFilters({});
    setAppliedFilters({});
    setData([]);
    setHasApplied(false);
    setPage(1);
    setTotal(0);
    setTotalPages(0);
  };

  const handlePaginationChange = (changes) => {
    const newPage = changes.page ?? page;
    const newLimit = changes.limit ?? limit;
    setPage(newPage);
    setLimit(newLimit);
    fetchData(newPage, newLimit, sortKey, sortDir);
  };

  return (
    <div>
      {/* ── Page header (Breadcrumb style) ── */}
      <div style={{ marginBottom: "24px", fontSize: "1.05rem", color: "var(--text-muted)" }}>
        <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</Link>
        {" > "}
        <Link to="/reports" style={{ color: "inherit", textDecoration: "none" }}>Reports</Link>
        {" > "}
        <strong style={{ color: "var(--text-main)" }}>{config.title}</strong>
      </div>

      {/* ── Error ── */}
      {err && <div className="alert alert-error">{err}</div>}

      {/* ── Filter card ── */}
      <div className="card" style={{ marginBottom: 20 }}>
        <ReportFilters
          type={type}
          filters={filters}
          onChange={setFilters}
          onApply={handleApply}
          onReset={handleReset}
        />
      </div>

      {/* ── Results card / Empty State ── */}
      <div className="card" style={{ minHeight: "350px", display: "flex", flexDirection: "column" }}>
        {!hasApplied ? (
          <div className="empty-state" style={{ margin: "auto", padding: "40px 0" }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--border-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <h4 style={{ fontWeight: 700, color: "#000", marginBottom: "8px", fontSize: "1.1rem" }}>Select your filters</h4>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
              Choose filter options above and click<br />"Apply Filters" to generate the report.
            </p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <ReportTable
                columns={config.getColumns()}
                data={data}
                emptyMessage={config.emptyMessage}
                filters={appliedFilters}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                loading={loading}
              />
            </div>

            {total > 0 && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-muted)" }}>
                <PaginationFilter
                  page={page}
                  limit={limit}
                  total={total}
                  totalPages={totalPages}
                  onChange={handlePaginationChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}