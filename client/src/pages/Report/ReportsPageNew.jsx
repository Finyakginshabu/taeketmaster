import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTicketsSoldReport,
  getSellingArtistsReport,
  getTicketSpendersReport,
  getRevenueReport,
  getPopularEventsReport,
} from "../../api/reports.api.js";
import DateRangeFilter from "./DateRangeFilter.jsx";
import "./Reports.css";

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const REPORT_CONFIG = {
  "tickets-sold": {
    title: "Tickets Sold Report",
    columns: [
      { key: "date", label: "Date" },
      { key: "tickets_sold", label: "Tickets Sold" },
      { key: "total_revenue", label: "Total Revenue (THB)" },
    ],
    fetch: getTicketsSoldReport,
    filters: ["dateRange", "groupBy"],
  },
  "selling-artists": {
    title: "Selling Artists Report",
    columns: [
      { key: "artist_id", label: "Artist ID" },
      { key: "artist_name", label: "Artist Name" },
      { key: "tickets_sold", label: "Tickets Sold" },
      { key: "total_revenue", label: "Total Revenue (THB)" },
    ],
    fetch: getSellingArtistsReport,
    filters: [],
  },
  "ticket-spenders": {
    title: "Ticket Spenders Report",
    columns: [
      { key: "customer_name", label: "Customer Name" },
      { key: "total_tickets", label: "Total Tickets" },
      { key: "total_spent", label: "Total Spent (THB)" },
    ],
    fetch: getTicketSpendersReport,
    filters: ["period", "sortBy"],
  },
  revenue: {
    title: "Revenue Report",
    columns: [
      { key: "date", label: "Date" },
      { key: "revenue", label: "Revenue (THB)" },
    ],
    fetch: getRevenueReport,
    filters: ["dateRange", "groupBy"],
  },
  "popular-events": {
    title: "Popular Events Report",
    columns: [
      { key: "event_id", label: "Event ID" },
      { key: "event_name", label: "Event Name" },
      { key: "tickets_sold", label: "Tickets Sold" },
      { key: "total_revenue", label: "Total Revenue (THB)" },
    ],
    fetch: getPopularEventsReport,
    filters: ["dateRange"],
  },
};

export default function ReportsPage({ type = "tickets-sold" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  // Filter states
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [groupBy, setGroupBy] = useState("daily");
  const [period, setPeriod] = useState("this_year");
  const [sortBy, setSortBy] = useState("total_spent");

  const config = REPORT_CONFIG[type] || REPORT_CONFIG["tickets-sold"];

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let result = [];

      const options = {};

      // Add date range if applicable and provided
      if (config.filters.includes("dateRange")) {
        if (dateFrom) options.start_date = dateFrom;
        if (dateTo) options.end_date = dateTo;
      }

      // Add groupBy if applicable
      if (config.filters.includes("groupBy")) {
        options.group_by = groupBy;
      }

      // Add period if applicable
      if (config.filters.includes("period")) {
        options.period = period;
        if (period === "custom" && dateFrom && dateTo) {
          options.start_date = dateFrom;
          options.end_date = dateTo;
        }
      }

      // Add sortBy if applicable
      if (config.filters.includes("sortBy")) {
        options.sort_by = sortBy;
      }

      result = await config.fetch(options);
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message || "Failed to fetch report data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [config, dateFrom, dateTo, groupBy, period, sortBy, type]);

  const handleApply = () => {
    setHasApplied(true);
    fetchData();
  };

  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    setGroupBy("daily");
    setPeriod("this_year");
    setSortBy("total_spent");
    setData([]);
    setHasApplied(false);
    setError("");
  };

  const handleRefresh = () => {
    if (hasApplied) {
      fetchData();
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "0.00";
    return parseFloat(value).toLocaleString("en-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px", fontSize: "1.05rem", color: "var(--text-muted)" }}>
        <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
          Dashboard
        </Link>
        {" > "}
        <Link to="/reports" style={{ color: "inherit", textDecoration: "none" }}>
          Reports
        </Link>
        {" > "}
        <strong style={{ color: "var(--text-main)" }}>{config.title}</strong>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "20px",
        }}>
          {error}
        </div>
      )}

      {/* Filters Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1rem", fontWeight: 600 }}>
          Filters
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
          {/* Date Range Filter */}
          {config.filters.includes("dateRange") && (
            <>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                  From Date
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                  To Date
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </>
          )}

          {/* Group By Filter */}
          {config.filters.includes("groupBy") && (
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                Group By
              </label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                {type === "revenue" && <option value="quarterly">Quarterly</option>}
              </select>
            </div>
          )}

          {/* Period Filter */}
          {config.filters.includes("period") && (
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="this_year">This Year</option>
                <option value="this_month">This Month</option>
                <option value="this_quarter">This Quarter</option>
                <option value="all_time">All Time</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          )}

          {/* Sort By Filter */}
          {config.filters.includes("sortBy") && (
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: 500 }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="total_spent">Total Spent</option>
                <option value="total_tickets">Total Tickets</option>
              </select>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleApply}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#596b37",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              fontWeight: 500,
            }}
          >
            {loading ? "Loading..." : "Apply Filters"}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#596b37",
              border: "1px solid #596b37",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Reset
          </button>
          {hasApplied && (
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#666",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RefreshIcon /> Refresh
            </button>
          )}
        </div>
      </div>

      {/* Results Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        minHeight: "300px",
      }}>
        {!hasApplied ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
          }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: "16px", opacity: 0.5 }}>
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "#666" }}>
              Select your filters
            </h4>
            <p>Choose filter options above and click "Apply Filters" to generate the report.</p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
            <div style={{ fontSize: "1rem", marginBottom: "16px" }}>Loading report data...</div>
            <div style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "3px solid #e0e0e0",
              borderTop: "3px solid #596b37",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : data.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
          }}>
            <p>No data available for the selected filters.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
            }}>
              <thead>
                <tr style={{ backgroundColor: "#F2EFDB", borderBottom: "1px solid #e5e7eb" }}>
                  {config.columns.map((col) => (
                    <th
                      key={col.key}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "#374151",
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor: "#F2EFDB",
                    }}
                  >
                    {config.columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          padding: "12px",
                          fontSize: "0.9rem",
                          color: "#1f2937",
                        }}
                      >
                        {col.key.includes("revenue") || col.key.includes("spent")
                          ? formatCurrency(row[col.key])
                          : row[col.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
