import { useState } from 'react';
import { Filter } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer,
} from 'recharts';
import './Comparison.css';

/* mock data */
const barData = [
  { name: 'Jan', a1: 400, a2: 240, a3: 180 },
  { name: 'Feb', a1: 300, a2: 139, a3: 221 },
  { name: 'Mar', a1: 520, a2: 380, a3: 290 },
  { name: 'Apr', a1: 278, a2: 390, a3: 200 },
  { name: 'May', a1: 189, a2: 480, a3: 310 },
  { name: 'Jun', a1: 390, a2: 380, a3: 250 },
];
const lineData = [
  { m: 'Jan', b: 650 }, { m: 'Feb', b: 590 }, { m: 'Mar', b: 800 },
  { m: 'Apr', b: 810 }, { m: 'May', b: 560 }, { m: 'Jun', b: 550 },
  { m: 'Jul', b: 700 }, { m: 'Aug', b: 620 }, { m: 'Sep', b: 750 },
  { m: 'Oct', b: 680 },
];

export default function Comparison() {
  const [from, setFrom] = useState('');
  const [to, setTo]     = useState('');
  const [isFiltered, setFiltered] = useState(false);
  const [dFrom, setDFrom] = useState('');
  const [dTo, setDTo]     = useState('');

  const apply = () => {
    if (from && to) {
      setDFrom(fmt(from));
      setDTo(fmt(to));
      setFiltered(true);
    }
  };
  const reset = () => {
    setFrom(''); setTo('');
    setFiltered(false); setDFrom(''); setDTo('');
  };

  return (
    <div className="cp-page">
      {/* Filter */}
      <div className="cp-filter">
        <div className="cp-filter-top">
          <div className="cp-range">
            <span className="cp-range-label">Date Range</span>
            <div className="cp-range-inputs">
              <input type="date" className="cp-date" value={from} onChange={e => setFrom(e.target.value)} />
              <span className="cp-to">to</span>
              <input type="date" className="cp-date" value={to} onChange={e => setTo(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="cp-filter-btns">
          <button className="cp-btn cp-btn--reset" onClick={reset}>Reset</button>
          <button className="cp-btn cp-btn--apply" onClick={apply}>
            <Filter size={14} /> Apply Filters
          </button>
        </div>
      </div>

      {/* Empty */}
      {!isFiltered && (
        <div className="cp-empty">
          <Filter size={56} strokeWidth={1.2} className="cp-empty-icon" />
          <p className="cp-empty-h">Select your filters</p>
          <p className="cp-empty-p">
            Choose filter options above and click<br />'Apply Filters' to generate the report.
          </p>
        </div>
      )}

      {/* Active */}
      {isFiltered && (
        <div className="cp-results">
          <div className="cp-charts">
            <div className="cp-card">
              <h3 className="cp-card-h">Period Over Period -Split by Artist</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#c8c8c0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="a1" fill="#C0392B" name="Artist 1" />
                  <Bar dataKey="a2" fill="#E67E22" name="Artist 2" />
                  <Bar dataKey="a3" fill="#F1C40F" name="Artist 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="cp-card">
              <h3 className="cp-card-h">Monthly Ticket Bookings</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#c8c8c0" />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="b" stroke="#6B7E54" strokeWidth={2} dot={{ r: 3, fill: '#6B7E54' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="cp-dates">
            <div className="cp-date-card"><span className="cp-date-big">{dFrom}</span></div>
            <div className="cp-date-card"><span className="cp-date-big">{dTo}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function fmt(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}
