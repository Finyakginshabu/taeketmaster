\set on_error_stop on

create type user_role as enum ('admin', 'user');
create type event_status as enum ('draft', 'active', 'canceled', 'completed');
create type payment_method as enum ('promptpay', 'mobile_banking', 'credit_card');

create table if not exists users (
  user_id serial primary key,
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  gender varchar(10),
  date_of_birth date,
  email varchar(255) unique not null,
  phone varchar(20) unique,
  username varchar(50) unique not null,
  password varchar(255) not null,
  registered_at timestamp default current_timestamp,
  role user_role not null default 'user'
);

create index if not exists idx_users_email on users(email);
create index if not exists idx_users_username on users(username);

create table if not exists addresses (
  address_id serial primary key,
  user_id int not null references users(user_id) on delete cascade,
  house_no varchar(50) not null,
  street_name varchar(50),
  sub_district varchar(50) not null,
  district varchar(50) not null,
  province varchar(50) not null,
  postal_code char(5) not null
);

create index if not exists idx_addresses_user_id on addresses(user_id);

create table if not exists genres (
  genre_id serial primary key,
  genre_name varchar(50) not null unique
);

create table if not exists artists (
  artist_id serial primary key,
  artist_name varchar(255) not null
);

create table if not exists genre_artists (
  genre_id int references genres(genre_id) on delete cascade,
  artist_id int references artists(artist_id) on delete cascade,
  primary key (genre_id, artist_id)
);

create index if not exists idx_genre_artists_genre on genre_artists(genre_id);
create index if not exists idx_genre_artists_artist on genre_artists(artist_id);

create table if not exists agents (
  agent_id serial primary key,
  agent_name varchar(255) not null,
  email varchar(255),
  phone varchar(20)
);

create table if not exists venues (
  venue_id serial primary key,
  name varchar(255) not null,
  email varchar(255),
  phone varchar(20),
  seat_capacity int not null,
  address varchar(255),
  province varchar(100),
  latitude decimal(9,6) not null,
  longitude decimal(9,6) not null
);

create index if not exists idx_venues_province on venues(province);

create table if not exists zones (
  zone_id serial primary key,
  venue_id int not null references venues(venue_id) on delete cascade,
  zone_name varchar(50) not null
);

create index if not exists idx_zones_venue_id on zones(venue_id);
create unique index if not exists idx_zones_venue_name on zones(venue_id, zone_name);

create table if not exists seats (
  seat_id serial primary key,
  zone_id int not null references zones(zone_id) on delete cascade,
  number varchar(10) not null,
  constraint unique_zone_number unique (zone_id, number)
);

create index if not exists idx_seats_zone_id on seats(zone_id);

create table if not exists events (
  event_id serial primary key,
  title varchar(255) not null,
  description text,
  event_status event_status not null default 'draft',
  sales_started_at timestamp not null,
  sales_ended_at timestamp not null,
);

create index if not exists idx_events_status on events(event_status);
create index if not exists idx_events_sales_window on events(sales_started_at, sales_ended_at);

create table if not exists event_artists (
  event_id int references events(event_id) on delete cascade,
  artist_id int references artists(artist_id) on delete cascade,
  primary key (event_id, artist_id)
);

create index if not exists idx_event_artists_event on event_artists(event_id);
create index if not exists idx_event_artists_artist on event_artists(artist_id);

create table if not exists event_agents (
  event_id int references events(event_id) on delete cascade,
  agent_id int references agents(agent_id) on delete cascade,
  primary key (event_id, agent_id)
);

create index if not exists idx_event_agents_event on event_agents(event_id);
create index if not exists idx_event_agents_agent on event_agents(agent_id);

create table if not exists event_zones (
  event_id int references events(event_id) on delete cascade,
  zone_id int references zones(zone_id) on delete cascade,
  price decimal(10,2) not null,
  primary key (event_id, zone_id)
);

create index if not exists idx_event_zones_event on event_zones(event_id);
create index if not exists idx_event_zones_zone on event_zones(zone_id);

create table if not exists showtimes (
  showtime_id serial primary key,
  event_id int not null references events(event_id) on delete cascade,
  venue_id int not null references venues(venue_id),
  show_at timestamp not null
);

create index if not exists idx_showtimes_event on showtimes(event_id);
create index if not exists idx_showtimes_venue on showtimes(venue_id);
create index if not exists idx_showtimes_show_at on showtimes(show_at);

create table if not exists bookings (
  booking_id serial primary key,
  user_id int not null references users(user_id),
  booked_at timestamp default current_timestamp,
  total_price decimal(10,2),
  status varchar(50) default 'confirmed'
);

create index if not exists idx_bookings_user on bookings(user_id);
create index if not exists idx_bookings_status on bookings(status);

create table if not exists tickets (
  ticket_id serial primary key,
  booking_id int references bookings(booking_id) on delete cascade,
  showtime_id int not null references showtimes(showtime_id),
  seat_id int not null references seats(seat_id),
  price decimal(10,2) not null,
  is_used boolean default false,
  constraint unique_seat_per_show unique (showtime_id, seat_id)
);

create index if not exists idx_tickets_booking on tickets(booking_id);
create index if not exists idx_tickets_showtime on tickets(showtime_id);
create index if not exists idx_tickets_seat on tickets(seat_id);

create table if not exists payments (
  payment_id serial primary key,
  booking_id int unique not null references bookings(booking_id) on delete cascade,
  payment_method payment_method not null,
  paid_at timestamp default current_timestamp
);

create index if not exists idx_payments_booking on payments(booking_id);