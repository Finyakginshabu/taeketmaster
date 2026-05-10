import { User, Calendar, MapPin } from '../components/Icons.jsx';

export const mockEvents = [
    {
        event_id: 1,
        title: "SpongeBob Concert",
        showdate: ["2026-05-30 18:00", "2026-05-31 18:00"],
        startDate: "2026-05-01T09:00:00",
        endDate: "2026-05-09T23:59:59",
        isAvailable: true,
        province: "Bangkok",
        img_path: "/src/assets/Poster.png",
        description: "เตรียมตัวให้พร้อมสำหรับคืนที่สนุกที่สุดใต้ท้องทะเล! SpongeBob SquarePants และเพื่อนๆ จาก Bikini Bottom กลับมาพร้อมโชว์สุดอลังการที่เต็มไปด้วยดนตรี สีสัน และความสุขไม่รู้จบ เหมาะสำหรับทุกวัยที่อยากสัมผัสประสบการณ์คอนเสิร์ตสุดพิเศษ"
    },
    {
        event_id: 2,
        title: "Patrick Star Live",
        showdate: "2026-07-20",
        startDate: "2026-07-01T09:00:00",
        endDate: "2026-07-19T23:59:59",
        isAvailable: true,
        province: "Chiang Mai",
        img_path: "/src/assets/Linux.png",
        description: "Patrick Star มาคนเดียวครั้งแรก! ไม่มีสคริปต์ ไม่มีแผน มีแค่ความสนุกและเซอร์ไพรส์ที่แม้แต่ Patrick เองก็ยังไม่รู้ว่าจะเกิดอะไรขึ้น คืนนี้ทุกอย่างเป็นไปได้บนเวที เชียงใหม่"
    },
    {
        event_id: 3,
        title: "Sandy Cheeks Show",
        showdate: "2026-08-15",
        startDate: "2026-08-01T09:00:00",
        endDate: "2026-08-14T23:59:59",
        isAvailable: true,
        province: "Chon Buri",
        img_path: "/src/assets/Dino.jpg",
        description: "นักวิทยาศาสตร์และคาวเกิร์ลจากเท็กซัส Sandy Cheeks นำเสนอโชว์ที่ผสมผสานระหว่างวิทยาศาสตร์สุดล้ำและดนตรีคันทรี่ ชมการทดลองสดบนเวทีและร้องเพลงไปพร้อมกับ Sandy ริมทะเลชลบุรี"
    },
    {
        event_id: 4,
        title: "Squidward Orchestra",
        showdate: "2026-09-01",
        startDate: "2026-05-01T09:00:00",
        endDate: "2026-05-30T23:59:59",
        isAvailable: false,
        province: "Bangkok",
        img_path: "/src/assets/Poster.png",
        description: "Squidward Tentacles ขอพิสูจน์ให้โลกรู้ว่าเขาคือนักดนตรีที่ยิ่งใหญ่ที่สุด! คืนนี้เขานำวงออเคสตราสุดอลังการมาสร้างประวัติศาสตร์ดนตรีคลาสสิกแห่งกรุงเทพฯ ตั๋วหมดแล้ว เพราะทุกคนอยากมาพิสูจน์ว่าจริงหรือเปล่า"
    },
    {
        event_id: 5,
        title: "Mr. Krabs Money Show",
        showdate: "2026-09-01",
        startDate: "2026-08-15T09:00:00",
        endDate: "2026-08-31T23:59:59",
        isAvailable: true,
        province: "Phuket",
        img_path: "/src/assets/Linux.png",
        description: "Mr. Krabs เปิดโชว์สุดพิเศษที่ภูเก็ต เต็มไปด้วยเคล็ดลับการทำเงิน เกมชิงรางวัล และเมนูพิเศษจาก Krusty Krab ที่จะมาเสิร์ฟถึงที่ โชว์นี้การันตีว่าคุ้มค่าทุกบาท หรือ Mr. Krabs คืนเงินให้เลย (ซึ่งจะไม่มีวันเกิดขึ้น)"
    },
];

// mockTickets.js

export const mockTickets = [
    // ---------------------------------------------------------
    // Event 1: SpongeBob Concert (มี 2 รอบการแสดง)
    // ---------------------------------------------------------
    // รอบที่ 1: "2026-05-30 18:00" (สมมติให้ showtime_id = 1)
    { ticket_id: 1001, event_id: 1, showtime_id: 1, zone_name: "A1", seat_id: "A1", price: 5900, status: "booked" },
    { ticket_id: 1002, event_id: 1, showtime_id: 1, zone_name: "A1", seat_id: "A2", price: 5900, status: "booked" },
    { ticket_id: 1003, event_id: 1, showtime_id: 1, zone_name: "A1", seat_id: "B5", price: 5900, status: "booked" },
    { ticket_id: 1004, event_id: 1, showtime_id: 1, zone_name: "A2", seat_id: "C12", price: 5900, status: "booked" },
    { ticket_id: 1005, event_id: 1, showtime_id: 1, zone_name: "A2", seat_id: "C13", price: 5900, status: "booked" },
    { ticket_id: 1006, event_id: 1, showtime_id: 1, zone_name: "B1", seat_id: "F1", price: 3500, status: "booked" },
    { ticket_id: 1007, event_id: 1, showtime_id: 1, zone_name: "B2", seat_id: "G10", price: 3500, status: "booked" },

    // รอบที่ 2: "2026-05-31 18:00" (สมมติให้ showtime_id = 2)
    { ticket_id: 1008, event_id: 1, showtime_id: 2, zone_name: "A1", seat_id: "D8", price: 5900, status: "booked" },
    { ticket_id: 1009, event_id: 1, showtime_id: 2, zone_name: "B2", seat_id: "H20", price: 3500, status: "booked" },

    // ---------------------------------------------------------
    // Event 2: Patrick Star Live
    // ---------------------------------------------------------
    // รอบเดียว: "2026-07-20" (สมมติให้ showtime_id = 3)
    { ticket_id: 1010, event_id: 2, showtime_id: 3, zone_name: "A1", seat_id: "A10", price: 5900, status: "booked" },
    { ticket_id: 1011, event_id: 2, showtime_id: 3, zone_name: "A1", seat_id: "A11", price: 5900, status: "booked" },

    // ---------------------------------------------------------
    // Event 4: Squidward Orchestra (isAvailable: false = Sold Out)
    // ---------------------------------------------------------
    // สมมติว่าขายหมดแล้วทุกที่นั่ง (สามารถเขียนลูปเพื่อเจาะจงว่าเต็มหมดได้)
    { ticket_id: 1012, event_id: 4, showtime_id: 4, zone_name: "A1", seat_id: "ALL", price: 5900, status: "sold_out" },
];

export const getBookedSeatsFromMock = (eventId, showtimeId, zoneName) => {
    const bookedTickets = mockTickets.filter(ticket => 
        String(ticket.event_id) === String(eventId) &&
        String(ticket.showtime_id) === String(showtimeId) &&
        ticket.zone_name === zoneName
    );
    return bookedTickets.map(ticket => ticket.seat_id);
};

export const mockTables = [
    {
        id: 1,
        title: "User",
        isManageable: false
    },
    {
        id: 2,
        title: "Event",
        isManageable: true
    },
    {
        id: 3,
        title: "Agent",
        isManageable: true
    },
    {
        id: 4,
        title: "Artist",
        isManageable: true
    },
    {
        id: 7,
        title: "Venue",
        isManageable: true
    },
    {
        id: 8,
        title: "Zone",
        isManageable: true
    },
    {
        id: 9,
        title: "Seat",
        isManageable: false
    },
    {
        id: 10,
        title: "Booking",
        isManageable: false
    },
    {
        id: 11,
        title: "Showtime",
        isManageable: true
    },
    {
        id: 12,
        title: "Ticket",
        isManageable: false
    },
    {
        id: 13,
        title: "Payment",
        isManageable: false
    }
];

export const initialMockUsers = [
  { id: '1008', name: 'Khanatip Nokhuthot', email: 'khanatip.nokh@tae.ac.th', phone: '0670701008' },
  { id: '1012', name: 'Chawin Chinpraditsuk', email: 'chawin.chin@tae.ac.th', phone: '0670501012' },
  { id: '1026', name: 'Norawit Mahaprom', email: 'norawit.maha@tae.ac.th', phone: '0670701026' },
  { id: '1080', name: 'Chetsada Kiatkamonwong', email: 'chetsada.kiat@tae.ac.th', phone: '0670501080' },
  { id: '1087', name: 'Supichaya Limwatanasamut', email: 'supichaya.limw@tae.ac.th', phone: '0670701087' },
];

export const initialMockEvents = [
  { id: '5223', title: 'Four Woman Up', artist: 'Pimchaya', agentEmail: 'chromosomelab@chro.ac.th' },
  { id: '5228', title: 'Youngampere', artist: 'Supattra', agentEmail: 'allreadylife@gmail.com' },
];

export const mockData = {
    stats: {
      todayBooking: '23k',
      todayBookingGrowth: '+10%',
      todayPayment: '1.2m',
      todayPaymentGrowth: '+25%',
      topPaymentMethod: 'Credit card',
      topArtists: ['Four Woman Up', 'Tattoo Grayscale', 'Bodyslim'],
    },
    topSpenders: [
      { rank: 1, name: 'Khanatip Nokhunthot', tickets: 21 },
      { rank: 2, name: 'Norawit Mahaprom', tickets: 15 },
      { rank: 3, name: 'Supichaya Limwatanasamut', tickets: 14 },
      { rank: 4, name: 'Pimchaya Suprateravanit', tickets: 12 },
      { rank: 5, name: 'Supattra Kaikrut', tickets: 11 },
    ],
    monthlyBookings: [
      { month: 'Jan', revenue: 400000 },
      { month: 'Feb', revenue: 200000 },
    ],
    quarterlySales: [
      { quarter: '2025-Q1', sales: 70000 },
      { quarter: '2025-Q2', sales: 55000 },
    ]
};

export const monthlyRevenueData = [
  { month: 'Jan', revenue: 380000 },
  { month: 'Feb', revenue: 230000 },
  { month: 'Mar', revenue: 235000 },
  { month: 'Apr', revenue: 200000 },
  { month: 'May', revenue: 480000 },
  { month: 'Jun', revenue: 310000 },
  { month: 'Jul', revenue: 180000 },
  { month: 'Aug', revenue: 110000 },
  { month: 'Sep', revenue: 60000 },
  { month: 'Oct', revenue: 105000 },
  { month: 'Nov', revenue: 160000 },
  { month: 'Dec', revenue: 130000 },
];

// ตัวอย่าง Mock Data เอาไว้ทดสอบดูก่อนต่อ API จริง
export const quarterlySalesData = [
  { quarter: '2025-Q1', revenue: 70000 },
  { quarter: '2025-Q2', revenue: 54000 },
  { quarter: '2025-Q3', revenue: 68000 },
  { quarter: '2025-Q4', revenue: 78000 },
  { quarter: '2026-Q1', revenue: 95000 },
  { quarter: '2026-Q2', revenue: 95000 },
];