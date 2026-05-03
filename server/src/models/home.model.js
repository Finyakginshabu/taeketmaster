import pool from "../config/db.js";

// 0: Coming Soon -> time now < sales_started_at
// 1: Buy Now -> else (not 0 and not 2)
// 2: Sold Out -> all tickets >= all available seat in every showtimes
export const getEventFeedService = async (filters) => {
    const { province, startDate, endDate, search } = filters;
    let queryParams = [];
    let queryConditions = [];
    // Filter by Province
    if(province){
        queryParams.push(province);
        queryConditions.push(`v.province = $${queryParams.length}`);
    }
    // Filter by Date Range
    if(startDate && endDate){
        queryParams.push(startDate, endDate);
        queryConditions.push(`s.show_at::date between $${queryParams.length - 1} and $${queryParams.length}`);
    } else if (startDate) {
        queryParams.push(startDate);
        queryConditions.push(`s.show_at::date >= $${queryParams.length}`);
    }
    if(search){
        queryParams.push(`%${search}%`);
        const sIdx = queryParams.length;
        queryConditions.push(`(
            e.title ilike $${sIdx} or 
            v.name ilike $${sIdx} or 
            e.description ilike $${sIdx} or 
            art.artist_name ilike $${sIdx}
        )`);
    }
    const whereClause = queryConditions.length > 0 
        ? `where ${queryConditions.join(' and ')}` 
        : '';
    const result = await pool.query(`
        select distinct
            e.event_id, e.title, e.jpg_path, min(s.show_at) as first_show,
            case 
                when min(s.show_at)::date = max(s.show_at)::date 
                then to_char(min(s.show_at), 'dd mon yyyy')
                else to_char(min(s.show_at), 'dd mon yyyy') || ' - ' || to_char(max(s.show_at), 'dd mon yyyy')
            end as showdate,
            case
                when now() < e.sales_started_at then 0
                when (
                    select count(t.ticket_id) 
                    from tickets t 
                    join showtimes st on t.showtime_id = st.showtime_id 
                    where st.event_id = e.event_id
                ) >= (
                    select count(se.seat_id) * count(distinct st.showtime_id)
                    from showtimes st
                    join zones z on st.venue_id = z.venue_id
                    join seats se on z.zone_id = se.zone_id
                    where st.event_id = e.event_id
                ) then 2
                else 1 end as status
        from events e
        join showtimes s on e.event_id = s.event_id
        join venues v on s.venue_id = v.venue_id
        left join event_artists ea on e.event_id = ea.event_id
        left join artists art on ea.artist_id = art.artist_id
        ${whereClause}
        group by e.event_id, e.title, e.jpg_path, e.sales_started_at
        order by first_show asc;
    `, queryParams);
    return result.rows;
};
