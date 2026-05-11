import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'taeketmaster_db'
});

async function test() {
  try {
    console.log('Testing query...');
    const result = await pool.query(`
        select  e.title, e.img_path, json_agg(json_build_object('showtime_id', s.showtime_id, 'show_at', to_char(s.show_at, 'Dy fmdd Mon yyyy hh24:mi')) order by s.show_at) as showtimes, json_object_agg(z.zone_name, ez.price) as ticket_prices
        from events e
        join showtimes s on e.event_id = s.event_id
        join venues v on s.venue_id = v.venue_id
        join event_zones ez on e.event_id = ez.event_id
        join zones z on ez.zone_id = z.zone_id
        where e.event_id = $1
        group by e.event_id, e.title, e.img_path;
    `, [30]);
    
    console.log('Result:', JSON.stringify(result.rows[0], null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

test();
