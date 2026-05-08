// tableConfigs.js — แหล่งข้อมูลกลาง

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
  Event: [],
  Venue: [],
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