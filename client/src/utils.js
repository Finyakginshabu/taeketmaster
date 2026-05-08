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

export const INITIAL_DATA = {
  User: [
    { 
      id: '1008', name: 'Khanatip Nokhunthot', email: 'khanatip.nokh@tae.ac.th', phone: '0670701008', 
      houseNo: '123/45', streetName: 'Sukhumvit 71', subDistrict: 'Phra Khanong Nuea', district: 'Watthana', province: 'Bangkok', postalCode: '10110' 
    },
    { 
      id: '1012', name: 'Chawin Chinpraditsuk', email: 'chawin.chin@tae.ac.th', phone: '0670501012', 
      houseNo: '9/8', streetName: 'Nimmanahaeminda', subDistrict: 'Suthep', district: 'Mueang Chiang Mai', province: 'Chiang Mai', postalCode: '50200' 
    },
    { 
      id: '1026', name: 'Norawit Mahaprom', email: 'norawit.maha@tae.ac.th', phone: '0670701026', 
      houseNo: '55', streetName: 'Khon Kaen Road', subDistrict: 'Nai Mueang', district: 'Mueang Khon Kaen', province: 'Khon Kaen', postalCode: '40000' 
    },
    { 
      id: '1080', name: 'Chetsada Kiatkamonwong', email: 'chetsada.kiat@tae.ac.th', phone: '0670501080', 
      houseNo: '789/1', streetName: 'Phetkasem', subDistrict: 'Hua Hin', district: 'Hua Hin', province: 'Prachuap Khiri Khan', postalCode: '77110' 
    },
    { 
      id: '1087', name: 'Supichaya Limwatanasamut', email: 'supichaya.limw@tae.ac.th', phone: '0670701087', 
      houseNo: '42', streetName: 'Phahon Yothin', subDistrict: 'Chatuchak', district: 'Chatuchak', province: 'Bangkok', postalCode: '10900' 
    },
  ],
  Event: [
    { id: '5001', title: 'Neon Bloom Festival',   artist: 'Milli',          agentEmail: 'booking@millitae.com'       },
    { id: '5002', title: 'Acoustic Sunday',        artist: 'Jeff Satur',     agentEmail: 'jeff.agent@waymaker.th'     },
    { id: '5003', title: 'Bass Drop Bangkok',      artist: 'Youngohm',       agentEmail: 'contact@yohmagency.com'     },
    { id: '5004', title: 'Four Women Up',          artist: 'Pimchaya',       agentEmail: 'chromosomelab@chro.ac.th'   },
    { id: '5005', title: 'Youngampere Live',       artist: 'Supattra',       agentEmail: 'allreadylife@gmail.com'     },
    { id: '5006', title: 'Green Season Concert',   artist: 'Tilly Birds',    agentEmail: 'tilly@birdsnest.agency'     },
    { id: '5007', title: 'Midnight Garden Gala',   artist: 'Phum Viphurit',  agentEmail: 'phum@wonderfruit.co'        },
    { id: '5008', title: 'Electric Rain',          artist: 'Jannine W',      agentEmail: 'jan.booking@gmm.co.th'     },
  ],

  Venue: [
    { id: 'V01', name: 'Impact Arena',            location: 'Muang Thong Thani, Nonthaburi', capacity: '12000' },
    { id: 'V02', name: 'Thunder Dome',            location: 'Muang Thong Thani, Nonthaburi', capacity: '8000'  },
    { id: 'V03', name: 'Royal Paragon Hall',      location: 'Siam Paragon, Bangkok',         capacity: '5000'  },
    { id: 'V04', name: 'Maya Hall',               location: 'Maya Mall, Chiang Mai',         capacity: '2000'  },
    { id: 'V05', name: 'CentralWorld Live Stage', location: 'CentralWorld, Bangkok',         capacity: '3500'  },
    { id: 'V06', name: 'Rajamangala Stadium',     location: 'Bang Kapi, Bangkok',            capacity: '49722' },
    { id: 'V07', name: 'Nimman Music Hall',       location: 'Nimmanahaeminda, Chiang Mai',   capacity: '1200'  },
    { id: 'V08', name: 'Hua Hin Night Stage',     location: 'Hua Hin, Prachuap Khiri Khan',  capacity: '1500'  },
  ],
};

export const MOCK_BOOKINGS = {
  '1008': [
    { ticket: 'B001', date: '2025-03-14', title: 'Jazz Night Vol.3',   artist: 'Miles Quartet',      venue: 'Blue Note Bangkok',        seat: 'A12, A13',       price: '฿1,200', status: 'Confirmed' },
    { ticket: 'B002', date: '2025-04-01', title: 'Rock Festival 2025', artist: 'Bodyslam & Friends', venue: 'Impact Arena',             seat: 'Standing A',     price: '฿2,500', status: 'Confirmed' },
    { ticket: 'B003', date: '2025-04-20', title: 'Acoustic Evening',   artist: 'Tilly Birds',        venue: 'Lido Connect',             seat: 'B05',            price: '฿800',  status: 'Cancelled' },
    { ticket: 'B004', date: '2025-05-10', title: 'EDM Night',          artist: 'DJ Snake',           venue: 'Bitec Bangna',             seat: 'VIP Table 3',    price: '฿1,800', status: 'Confirmed' },
    { ticket: 'B005', date: '2025-05-25', title: 'Piano Recital',      artist: 'Yiruma',             venue: 'Thailand Cultural Centre', seat: 'C22',            price: '฿600',  status: 'Pending'   },
    { ticket: 'B006', date: '2025-06-08', title: 'Jazz Night Vol.4',   artist: 'Miles Quartet',      venue: 'Blue Note Bangkok',        seat: 'D01, D02',       price: '฿1,200', status: 'Confirmed' },
    { ticket: 'B007', date: '2025-07-12', title: 'Summer Music Fest',  artist: 'Various Artists',    venue: 'Rajamangala Stadium',      seat: 'E14, E15, E16',  price: '฿3,000', status: 'Confirmed' },
    { ticket: 'B008', date: '2025-07-28', title: 'Indie Live Session', artist: 'Phum Viphurit',      venue: 'Voice Space',              seat: 'F10',            price: '฿950',  status: 'Pending'   },
    { ticket: 'B009', date: '2025-08-03', title: 'Classical Night',    artist: 'Bangkok Symphony',   venue: 'Mahidol Sitthakarn',       seat: 'VVIP 1',         price: '฿1,500', status: 'Confirmed' },
    { ticket: 'B010', date: '2025-08-20', title: 'Hip Hop Showcase',   artist: 'Joey Boy',           venue: 'GMM Live House',           seat: 'Standing',       price: '฿2,200', status: 'Cancelled' },
  ],
  '1012': [
    { ticket: 'B011', date: '2025-04-01', title: 'Rock Festival 2025', artist: 'Bodyslam & Friends', venue: 'Impact Arena',             seat: 'Standing B',     price: '฿2,500', status: 'Confirmed' },
    { ticket: 'B012', date: '2025-03-14', title: 'Jazz Night Vol.3',   artist: 'Miles Quartet',      venue: 'Blue Note Bangkok',        seat: 'B01, B02',       price: '฿1,200', status: 'Confirmed' },
    { ticket: 'B013', date: '2025-05-18', title: 'Sunset Beats',       artist: 'Palmy',              venue: 'Maya Beach Club',          seat: 'Cabana 2',       price: '฿700',  status: 'Pending'   },
    { ticket: 'B014', date: '2025-04-20', title: 'Acoustic Evening',   artist: 'Tilly Birds',        venue: 'Lido Connect',             seat: 'C11, C12',       price: '฿800',  status: 'Confirmed' },
  ],
  '1026': [
    { ticket: 'B015', date: '2025-05-10', title: 'EDM Night',          artist: 'DJ Snake',           venue: 'Bitec Bangna',             seat: 'GA 102',         price: '฿1,800', status: 'Confirmed' },
    { ticket: 'B016', date: '2025-07-12', title: 'Summer Music Fest',  artist: 'Various Artists',    venue: 'Rajamangala Stadium',      seat: 'W1, W2',         price: '฿3,000', status: 'Confirmed' },
  ],
  '1080': [],
  '1087': [
    { ticket: 'B017', date: '2025-05-25', title: 'Piano Recital',      artist: 'Yiruma',             venue: 'Thailand Cultural Centre', seat: 'C23',            price: '฿600',  status: 'Confirmed' },
    { ticket: 'B018', date: '2025-08-03', title: 'Classical Night',    artist: 'Bangkok Symphony',   venue: 'Mahidol Sitthakarn',       seat: 'A02',            price: '฿1,500', status: 'Confirmed' },
    { ticket: 'B019', date: '2025-06-08', title: 'Jazz Night Vol.4',   artist: 'Miles Quartet',      venue: 'Blue Note Bangkok',        seat: 'D03',            price: '฿1,200', status: 'Cancelled' },
  ],
};
