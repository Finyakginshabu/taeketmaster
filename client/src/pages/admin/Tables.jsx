import { Link } from 'react-router-dom';
import './Tables.css';

const mockEvents = [
  { id: 1, title: 'Four Woman Up', artist: 'Pimchaya', agentPhone: '0670505223', agentEmail: 'chromosomelab@chro.a...' },
  { id: 2, title: 'Summer Festival 2025', artist: 'Various Artists', agentPhone: '0812345678', agentEmail: 'agent@festival.com' },
  { id: 3, title: 'Jazz Night Live', artist: 'Smooth Trio', agentPhone: '0899876543', agentEmail: 'booking@jazztrio.com' },
];

export default function Tables() {
  return (
    <div className="tb-page">
      <div className="tb-header">
        <h2 className="tb-title">Events</h2>
        <Link to="/admin/tables/events/add" className="tb-add">+ Add Event</Link>
      </div>
      <div className="tb-card">
        <table className="tb-table">
          <thead>
            <tr>
              <th>#</th><th>Title</th><th>Artist</th><th>Agent Phone</th><th>Agent Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((ev, i) => (
              <tr key={ev.id}>
                <td>{i + 1}</td>
                <td>{ev.title}</td>
                <td>{ev.artist}</td>
                <td>{ev.agentPhone}</td>
                <td>{ev.agentEmail}</td>
                <td><Link to="/admin/tables/events/edit" className="tb-edit">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
