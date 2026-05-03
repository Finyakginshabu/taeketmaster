-- test seed

insert into users (first_name, last_name, email, username, password) values 
('customer', 'one', 'customer@test.com', 'buyer1', 'pass');

insert into venues (name, seat_capacity, latitude, longitude) values 
('micro theater', 2, 13.7, 100.5);

insert into zones (venue_id, zone_name) values (1, 'main zone');

insert into seats (zone_id, number) values (1, 's1'), (1, 's2');

insert into events (event_id, title, img_path, sales_started_at, sales_ended_at, event_status) values
(1, 'future festival 1', '/img/f1.jpg', '2026-10-01', '2026-11-01', 'active'),
(2, 'future festival 2', '/img/f2.jpg', '2026-11-01', '2026-12-01', 'active'),
(3, 'current concert 1', '/img/c1.jpg', '2026-01-01', '2026-06-01', 'active'),
(4, 'current concert 2', '/img/c2.jpg', '2026-01-01', '2026-06-01', 'active'),
(5, 'sold out show 1', '/img/s1.jpg', '2026-01-01', '2026-06-01', 'active'),
(6, 'sold out show 2', '/img/s2.jpg', '2026-01-01', '2026-06-01', 'active');

insert into showtimes (showtime_id, event_id, venue_id, show_at) values
(1, 1, 1, '2026-12-01 19:00'), (2, 2, 1, '2026-12-02 19:00'),
(3, 3, 1, '2026-07-01 19:00'), (4, 4, 1, '2026-07-02 19:00'),
(5, 5, 1, '2026-07-03 19:00'), (6, 6, 1, '2026-07-04 19:00');

insert into bookings (booking_id, user_id, booked_at, total_price) values 
(1, 1, now(), 1000.00);

insert into payments (booking_id, payment_method) values (1, 'credit_card');

insert into tickets (booking_id, showtime_id, seat_id, price) values 
(1, 5, 1, 250.00), (1, 5, 2, 250.00);

insert into tickets (booking_id, showtime_id, seat_id, price) values 
(1, 6, 1, 250.00), (1, 6, 2, 250.00);


