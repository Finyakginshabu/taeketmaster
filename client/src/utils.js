export const provinces = [
"Bangkok", "Krabi", "Kanchanaburi", "Kalasin", "Kamphaeng Phet",
"Khon Kaen", "Chanthaburi", "Chachoengsao", "Chon Buri", "Chai Nat",
"Chaiyaphum", "Chumphon", "Chiang Rai", "Chiang Mai", "Trang",
"Trat", "Tak", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom",
"Nakhon Ratchasima", "Nakhon Si Thammarat", "Nakhon Sawan", "Nonthaburi", "Narathiwat",
"Nan", "Bueng Kan", "Buri Ram", "Pathum Thani", "Prachuap Khiri Khan",
"Prachin Buri", "Pattani", "Phra Nakhon Si Ayutthaya", "Phayao", "Phang Nga",
"Phatthalung", "Phichit", "Phitsanulok", "Phetchaburi", "Phetchabun",
"Phrae", "Phuket", "Maha Sarakham", "Mukdahan", "Mae Hong Son",
"Yasothon", "Yala", "Roi Et", "Ranong", "Rayong",
"Ratchaburi", "Lop Buri", "Lampang", "Lamphun", "Loei",
"Si Sa Ket", "Sakon Nakhon", "Songkhla", "Satun", "Samut Prakan",
"Samut Songkhram", "Samut Sakhon", "Sa Kaeo", "Saraburi", "Sing Buri",
"Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Nong Khai",
"Nong Bua Lam Phu", "Ang Thong", "Amnat Charoen", "Udon Thani",
"Uttaradit", "Uthai Thani", "Ubon Ratchathani"
];

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const monthNamesFull = {
  'Jan': 'January',   'Feb': 'February', 'Mar': 'March',    'Apr': 'April',
  'May': 'May',       'Jun': 'June',     'Jul': 'July',     'Aug': 'August',
  'Sep': 'September', 'Oct': 'October',  'Nov': 'November', 'Dec': 'December'
};

export const TABLE_CONFIGS = {
  User: {
    columns: [
      { key: 'id',    label: 'ID'    },
      { key: 'name',  label: 'Name'  },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
    ],
    searchKeys: ['id', 'name', 'email'],
    clickable:  true,
    editable:   false,
  },
  Event: {
    columns: [
      { key: 'id',         label: 'ID'          },
      { key: 'title',      label: 'Title'       },
      { key: 'artist',     label: 'Artist'      },
      { key: 'agentEmail', label: 'Agent Email' },
    ],
    searchKeys: ['id', 'title', 'artist'],
    clickable:  false,
    editable:   true,
    newRowTemplate: { title: '', artist: '', agentEmail: '' },
  },
  Venue: {
    columns: [
      { key: 'id',       label: 'ID'       },
      { key: 'name',     label: 'Name'     },
      { key: 'location', label: 'Location' },
      { key: 'capacity', label: 'Capacity' },
    ],
    searchKeys: ['id', 'name', 'location'],
    clickable:  false,
    editable:   true,
    newRowTemplate: { name: '', location: '', capacity: '' },
  },
};

export function formatDateTime(dateString, showTime) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    const year = date.getFullYear();

    let formattedDate = `${day} ${month} ${year}`;

    if (showTime) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        formattedDate += ` ${hours}:${minutes}`;
    }

    return formattedDate;
}

export const REPORT_CONFIG = {
  "todays-booking": {
    title: "Today's Booking",
    subtitle: "Daily booking transactions and status",
    emptyMessage: "No bookings found for today.",
    getColumns: () => [
      { key: "booking_id", label: "Booking ID", sortable: true },
      { key: "customer_name", label: "Customer", sortable: true },
      { key: "title", label: "Event", sortable: true },
      { key: "total_price", label: "Total Price", align: "right", render: (v) => `${Number(v || 0).toLocaleString()} THB` },
      { key: "booked_at", label: "Booked Time", render: (v) => v ? new Date(v).toLocaleTimeString() : "-" }
    ]
  },
  "todays-revenue": {
    title: "Today's Revenue",
    subtitle: "Summary of income generated today",
    emptyMessage: "No revenue data found for today.",
    getColumns: () => [
      { key: "paid_at", label: "Time", sortable: true, render: (v) => v ? new Date(v).toLocaleTimeString() : "-" },
      { key: "payment_id", label: "Payment ID" },
      { key: "total_price", label: "Amount", align: "right", style: { fontWeight: "bold" }, render: (v) => `${Number(v || 0).toLocaleString()} THB` }
    ]
  },
  "top-artist": {
    title: "Top Selling Artists",
    subtitle: "Artists ranked by total tickets sold",
    emptyMessage: "No artist records found.",
    getColumns: () => [
      { key: "rank", label: "Rank", render: (_, __, ___, index) => index + 1 },
      { key: "artist_name", label: "Artist Name", sortable: true, style: { fontWeight: "bold" } },
      { key: "tickets_sold", label: "Tickets Sold", align: "right", sortable: true, render: (v) => Number(v || 0).toLocaleString() }
    ]
  },
  "top-spender": {
    title: "Top Ticket Spenders (Quarterly)",
    subtitle: "Highest spending customers this quarter",
    emptyMessage: "No records found for this quarter.",
    getColumns: () => [
      { key: "rank", label: "Rank", render: (_, __, ___, index) => index + 1 },
      { key: "name", label: "Customer Name", sortable: true },
      { key: "money_spent", label: "Total Spent", align: "right", style: { fontWeight: "bold" }, render: (v) => `${Number(v || 0).toLocaleString()} THB` }
    ]
  },
  "monthly-revenue": {
    title: "Monthly Revenue",
    subtitle: "Monthly financial performance overview",
    getColumns: () => [
      { key: "month_name", label: "Month", sortable: true },
      { key: "revenue", label: "Total Revenue", align: "right", render: (v) => `${Number(v || 0).toLocaleString()} THB` }
    ]
  },
  "quarterly-revenue": {
    title: "Quarterly Revenue",
    subtitle: "Revenue breakdown per quarter",
    getColumns: () => [
      { key: "quarter_label", label: "Quarter", sortable: true, render: (_, row) => `${row.year}-Q${row.quarter}` }, 
      { key: "revenue", label: "Total Revenue", align: "right", render: (v) => `${Number(v || 0).toLocaleString()} THB` }
    ]
  },
  "popular-event": {
    title: "Most Popular Event",
    subtitle: "Events with the highest ticket demand",
    getColumns: () => [
      { key: "rank", label: "Rank", render: (_, __, ___, index) => index + 1 },
      { key: "event_name", label: "Event Name", sortable: true },
      { key: "remaining_tickets", label: "Remaining Tickets", align: "right", render: (v) => Number(v || 0).toLocaleString() }
    ]
  },
  "alltime-topspender": {
    title: "Top Spender (All-time)",
    subtitle: "Lifetime highest spending customers",
    getColumns: () => [
      { key: "rank", label: "Rank", render: (_, __, ___, index) => index + 1 },
      { key: "name", label: "Customer Name", sortable: true },
      { key: "money_spent", label: "All-time Spend", align: "right", render: (v) => `${Number(v || 0).toLocaleString()} THB` }
    ]
  }
};