-- tae seed

insert into users (first_name, last_name, gender, date_of_birth, email, phone, username, password, role) values 
('Khanatip', 'Nokhunthot', 'gay', '2006-04-28', 'tae.admin@tae.ac.th', '0670701008', 'Tae', 'tae123', 'admin'),
('Chawin', 'Chinpraditsuk', 'male', '2006-06-27', 'chawin.chin@tae.ac.th', '0670501012', 'Fin', 'fin123', 'user'),
('Norawit', 'Mahaprom', 'male', '2005-12-06', 'norawit.maha@tae.ac.th', '0670701026', 'Nam', 'nam123', 'user'),
('Chetsada', 'Kiatkamonwong', 'male', '2005-12-05', 'chetsada.kiat@tae.ac.th', '0670501080', 'Jerry', 'jerry123', 'user'),
('Supichaya', 'Limwatanasamut', 'female', '2005-12-03', 'supichaya.limw@tae.ac.th', '0670701087', 'Ping', 'ping123', 'user'),
('Pimchaya', 'Suprateravanit', 'female', '2000-01-01', 'pimchaya.supr@tae.ac.th', '0670505223', 'Mairoowa', '123', 'user'),
('Supattra', 'Kaikrut', 'female', '2000-01-01', 'supattra.kaik@tae.ac.th', '0670705228', 'Mairooar', '123', 'user'),
('Lalisa', 'Manotham', 'female', '1997-03-27', 'lalisa.m@tae.ac.th', '0670502001', 'Lisa', 'lisa123', 'user'),
('Bam', 'Kunpimak', 'male', '1997-05-02', 'bam.k@tae.ac.th', '0670502002', 'BamBam', 'bam123', 'user'),
('Jacksin', 'Wang', 'male', '1994-03-28', 'jackson.w@tae.ac.th', '0670502003', 'Jackson', 'jack123', 'user'),
('Davikayothin', 'Hoorne', 'female', '1992-05-16', 'davika.h@tae.ac.th', '0670502004', 'Mai', 'mai123', 'user'),
('Mario', 'Kart', 'male', '1988-12-04', 'mario.m@tae.ac.th', '0670502005', 'Mario', 'mario123', 'user'),
('Urus', 'Lamborghini', 'female', '1993-03-18', 'urassaya.s@tae.ac.th', '0670502006', 'Yaya', 'yaya123', 'user'),
('Dech', 'Kugimaikab', 'male', '1991-12-17', 'nadech.k@tae.ac.th', '0670502007', 'Nadech', 'barry123', 'user'),
('Krit', 'Amnuay', 'male', '1999-04-30', 'krit.a@tae.ac.th', '0670502008', 'PPKrit', 'pp123', 'user'),
('Putthipong', 'Assarahabucha', 'male', '1999-10-08', 'putthipong.a@tae.ac.th', '0670502009', 'Billkin', 'bk123', 'user'),
('Araya', 'Handsomeandcool', 'female', '1981-06-28', 'araya.h@tae.ac.th', '0670502010', 'Chompoo', 'chom123', 'user'),
('Pimchanok', 'Thungsuk', 'female', '1992-09-30', 'pimchanok.l@tae.ac.th', '0670502011', 'Baifern', 'fern123', 'user'),
('Sunny', 'Handsomeandcool', 'male', '1981-05-18', 'sunny.s@tae.ac.th', '0670502012', 'Sunny', 'sun123', 'user'),
('Ranee', 'Wine', 'female', '1989-12-24', 'ranee.c@tae.ac.th', '0670502013', 'Bella', 'bella123', 'user');

insert into genres (genre_name) values
('Rock'), ('Pop'), ('Hip-Hop'), ('Jazz'), ('R&B'), ('K-pop');

insert into artists (artist_name) values
('67hours'), ('NONT TANINT'), ('Ink Warunran'), ('Billding'), ('PP Kritone'), ('BowkyTiger'),
('Jeff Saturday'), ('Violette Water'), ('The CarToys'), ('Tomato'), ('Me-U'),
('Bodyslim'), ('Small Ass'), ('Cooktail'), ('Tilly Bat'), ('Four Women Up'),
('Taitosmile'), ('Slot Machine888'), ('hiso'), ('Safestar'), ('Sweet n Roll'),
('5EVE'), ('PigXY'), ('Kliptonnai'), ('Monodog'),
('Oldohmn'), ('F.SUPERHERO'), ('Blinkpack'), ('OldJeans');

insert into genre_artists (genre_id, artist_id) values
(1, 1), (1, 4), (1, 12), (1, 13), (1, 14), (1, 17), (1, 18), (1, 21), (1, 24), (1, 25),
(2, 2), (2, 3), (2, 5), (2, 6), (2, 8), (2, 9), (2, 10), (2, 11), (2, 15), (2, 16), (2, 20), (2, 26),
(3, 27), (5, 7), (5, 19), (6, 22), (6, 23), (6, 28), (6, 29);

insert into agents (agent_name, email, phone) values
('GNN Music', 'contact@gnngranny.com', '026699000'),
('Bigroom', 'info@bigroom.co.th', '022617560'),
('What The Buck', 'contact@whatthebuck.com', '026196099'),
('Coollight', 'contact@coollight.com', '027128605'),
('Chromosomelab', 'contact@chro.co.th', '020263592');

insert into venues (name, seat_capacity, province, latitude, longitude) values 
('Rachiangmaigala National Stadium', 726, 'Chiang Mai', 18.7883, 98.9853),
('Impact Korat', 100, 'Nakhon Ratchasima', 14.9750, 102.0971),
('King Mongkut''s Food Center', 100, 'Bangkok', 13.6515, 100.4965);

insert into events (event_id, title, img_path, sales_started_at, sales_ended_at, event_status) values
(1, '67hours', 'events/67hours.jpg', '2024-05-01', '2024-05-06', 'active'),
(2, 'NONT TANINT', 'events/nont_tanint.jpg', '2024-05-20', '2024-05-25', 'active'),
(3, 'Ink Warunran', 'events/ink_warunran.jpg', '2024-06-09', '2024-06-15', 'active'),
(4, 'Billding', 'events/billding.jpg', '2024-06-28', '2024-07-03', 'active'),
(5, 'PP Kritone', 'events/pp_kritone.jpg', '2024-07-17', '2024-07-24', 'active'),
(6, 'BowkyTiger', 'events/bowkytiger.jpg', '2024-08-05', '2024-08-10', 'active'),
(7, 'Jeff Saturday', 'events/jeff_saturday.jpg', '2024-08-24', '2024-08-31', 'active'),
(8, 'Violette Water', 'events/violette_water.jpg', '2024-09-12', '2024-09-17', 'active'),
(9, 'The CarToys', 'events/the_cartoys.jpg', '2024-10-01', '2024-10-08', 'active'),
(10, 'Tomato', 'events/tomato.jpg', '2024-10-20', '2024-10-25', 'active'),
(11, 'Me-U', 'events/me_u.jpg', '2024-11-08', '2024-11-15', 'active'),
(12, 'Bodyslim', 'events/bodyslim.jpg', '2024-11-27', '2024-12-02', 'active'),
(13, 'Small Ass', 'events/small_ass.jpg', '2024-12-16', '2024-12-23', 'active'),
(14, 'Cooktail', 'events/cooktail.jpg', '2025-01-04', '2025-01-09', 'active'),
(15, 'Tilly Bat', 'events/tilly_bat.jpg', '2025-01-23', '2025-01-30', 'active'),
(16, 'Four Women Up', 'events/four_women_up.jpg', '2025-02-11', '2025-02-16', 'active'),
(17, 'Taitosmile', 'events/taitosmile.jpg', '2025-03-02', '2025-03-09', 'active'),
(18, 'Slot Machine888', 'events/slot_machine888.jpg', '2025-03-21', '2025-03-26', 'active'),
(19, 'hiso', 'events/hiso.jpg', '2025-04-09', '2025-04-16', 'active'),
(20, 'Safestar', 'events/safestar.jpg', '2025-04-28', '2025-05-03', 'active'),
(21, 'Sweet n Roll', 'events/sweet_n_roll.jpg', '2025-05-17', '2025-05-24', 'active'),
(22, '5EVE', 'events/5eve.jpg', '2025-06-05', '2025-06-10', 'active'),
(23, 'PigXY', 'events/pigxy.jpg', '2025-06-24', '2025-07-01', 'active'),
(24, 'Kliptonnai', 'events/kliptonnai.jpg', '2025-07-13', '2025-07-18', 'active'),
(25, 'Monodog', 'events/monodog.jpg', '2025-08-01', '2025-08-08', 'active'),
(26, 'Oldohmn', 'events/oldohmn.jpg', '2025-08-20', '2025-08-25', 'active'),
(27, 'F.SUPERHERO', 'events/f_superhero.jpg', '2025-09-08', '2025-09-15', 'active'),
(28, 'Blinkpack', 'events/blinkpack.jpg', '2025-09-27', '2025-10-02', 'active'),
(29, 'OldJeans', 'events/oldjeans.jpg', '2025-10-16', '2025-10-23', 'active'),
(30, 'Cooktail 2025', 'events/cooktail_2025.jpg', '2025-11-04', '2025-11-09', 'active'),
(31, 'Tomato 2025', 'events/tomato_2025.jpg', '2025-11-23', '2025-11-30', 'active'),
(32, 'NONT TANINT 2025', 'events/nont_tanint_2025.jpg', '2025-12-12', '2025-12-17', 'active'),
(33, 'Bodyslim 2026', 'events/bodyslim_2026.jpg', '2025-12-31', '2026-01-07', 'active'),
(34, 'Slot Machine888 2026', 'events/slot_machine888_2026.jpg', '2026-01-19', '2026-01-24', 'active'),
(35, 'PigXY 2026', 'events/pigxy_2026.jpg', '2026-02-07', '2026-02-14', 'active'),
(36, 'Monodog 2026', 'events/monodog_2026.jpg', '2026-02-26', '2026-03-03', 'active'),
(37, 'Small Ass 2026', 'events/small_ass_2026.jpg', '2026-03-17', '2026-03-24', 'active'),
(38, 'The CarToys 2026', 'events/the_cartoys_2026.jpg', '2026-04-05', '2026-04-10', 'active'),
(39, 'BowkyTiger 2026', 'events/bowkytiger_2026.jpg', '2026-04-24', '2026-05-01', 'active'),
(40, '67hours 2026', 'events/67hours_2026.jpg', '2026-05-24', '2026-05-31', 'active');

update events set description = case
    when event_id = 1 then 'Experience the debut of the 67hours tour. A night filled with high-energy indie rock and mesmerizing visuals that will keep you dancing until the early morning hours. Get tickets now!'
    when event_id = 2 then 'NONT TANINT brings his soulful voice and chart-topping hits to the big stage. Join us for an intimate evening of melodic pop and heartfelt performances that you will never forget.'
    when event_id = 3 then 'The princess of synth-pop, Ink Waruntorn, returns with her signature sound. Prepare for a nostalgic journey through her greatest hits in a beautifully produced show designed for every dedicated fan.'
    when event_id = 4 then 'Billding captures the essence of the modern alternative scene. This concert features powerful vocals and experimental sounds that push the boundaries of live music. Do not miss this unique performance.'
    when event_id = 5 then 'PP Kritone takes the spotlight with a glamorous and high-fashion musical extravaganza. Expect stunning choreography, dazzling costumes, and a setlist that celebrates self-expression and modern pop at its very best.'
    when event_id = 6 then 'BowkyTiger delivers a fierce and emotional performance, blending soul-stirring ballads with upbeat anthems. Her unique style and powerful stage presence make this a must-see event for all Thai music lovers.'
    when event_id = 7 then 'Jeff Saturday invites you into his world of genre-bending music and cinematic storytelling. Experience his incredible vocal range and artistic vision in this highly anticipated solo concert tour this year.'
    when event_id = 8 then 'Violette Wautier brings her enchanting vocals and dreamy pop melodies to the stage. This concert offers a perfect blend of upbeat tracks and acoustic moments in a cozy, welcoming atmosphere.'
    when event_id = 9 then 'The CarToys are ready to rock the stadium with their signature alternative sound. Join the crowd for a night of high-octane energy, driving guitar riffs, and classic sing-along choruses today.'
    when event_id = 10 then 'Tomato brings a fresh and quirky vibe to the local indie scene. Enjoy a night of catchy hooks, fun lyrics, and a vibrant stage design that guarantees a good time.'
    when event_id = 11 then 'Mew Suppasit (Me-U) delivers a charismatic performance featuring his latest hits and fan favorites. This show promises a mix of upbeat dance numbers and emotional ballads for all his supporters.'
    when event_id = 12 then 'Bodyslim, the legendary rock icons, return for an epic night of stadium-sized anthems. Feel the power of Thai rock as they perform their greatest hits with unmatched energy and passion.'
    when event_id = 13 then 'Small Ass brings the heat with their legendary rock sound. Experience the raw power and emotion of one of Thailand’s most influential bands in a high-energy live environment.'
    when event_id = 14 then 'Cooktail presents a grand musical experience, blending rock with orchestral elements. Their storytelling lyrics and dramatic performances create a powerful atmosphere that resonates deeply with every single person present.'
    when event_id = 15 then 'Tilly Bat brings their unique alternative pop sound to the stage. Known for their emotional lyrics and creative arrangements, this concert is a journey through love, loss, and everything between.'
    when event_id = 16 then 'Four Women Up celebrates the power of female voices in the industry. Featuring four top artists, this collaborative concert showcases incredible talent, harmony, and a shared passion for great music.'
    when event_id = 17 then 'Taitosmile brings the spirit of modern Pheua Chiwit to the city. Their honest lyrics and energetic folk-rock sound provide a voice for the people in a truly unforgettable live show.'
    when event_id = 18 then 'Slot Machine888 takes you on an out-of-this-world musical journey with their signature rock sound and sci-fi visuals. Experience their high-energy performance and world-class production in this stunning concert event.'
    when event_id = 19 then 'HISO brings a sophisticated blend of jazz and pop to the stage. Enjoy a night of smooth melodies, expert musicianship, and a refined atmosphere perfect for a relaxing evening out.'
    when event_id = 20 then 'Safestar invites you to their indie-pop world of lush textures and catchy melodies. Get lost in their signature soundscapes and enjoy a night of effortlessly cool and relaxing music.'
    when event_id = 21 then 'Sweet n Roll delivers a heavy-hitting performance for all rock and metal fans. Expect high energy, aggressive riffs, and a mosh pit that never stops in this intense show.'
    when event_id = 22 then '5EVE brings the fire with their high-energy girl group performance. Featuring sharp choreography and catchy T-Pop hits, this concert is a celebration of talent, charm, and girl power.'
    when event_id = 23 then 'PigXY delivers a playful and energetic pop performance. Join the trio for a night of catchy tunes, adorable dance moves, and a bright, colorful stage show that inspires joy.'
    when event_id = 24 then 'Kliptonnai brings their emotional rock ballads to the stage. Join the band for a night of powerful vocals and relatable lyrics that have touched the hearts of many fans.'
    when event_id = 25 then 'Monodog, the pioneers of Thai alternative rock, return to the stage. Experience their experimental sound and legendary hits in a performance that celebrates decades of musical innovation and creativity.'
    when event_id = 26 then 'Oldohmn brings the laughs and the hits in this unique variety concert. Expect a night of soulful singing, hilarious banter, and unexpected surprises from Thailand’s favorite entertainer.'
    when event_id = 27 then 'F.SUPERHERO dominates the stage with his powerful rap and massive collaborations. This hip-hop extravaganza features heavy beats, clever wordplay, and some of the biggest names in the industry.'
    when event_id = 28 then 'Blinkpack style tribute or high-energy dance event. Join the party for a night of global hits, synchronized dancing, and a production that rivals the biggest pop shows on earth.'
    when event_id = 29 then 'OldJeans inspired pop event celebrating the latest trends in music. Enjoy a night of nostalgic yet fresh sounds, catchy choruses, and a youthful energy that defines a generation.'
    when event_id = 30 then 'Cooktail 2025 returns with an even bigger production and new arrangements. Experience their classic hits alongside new material in a show that blends rock, drama, and classical music seamlessly.'
    when event_id = 31 then 'Tomato 2025 brings more indie-pop fun to the stage. This updated tour features new songs and an expanded stage design, perfect for fans who love their unique and quirky style.'
    when event_id = 32 then 'NONT TANINT 2025 showcases the artist’s evolution with new hits and a more mature sound. Don’t miss this chance to see one of Thailand’s best vocalists in an all-new production.'
    when event_id = 33 then 'Bodyslim 2026 kicks off the year with a massive stadium tour. Expect the same legendary energy with a completely new setlist and stage technology that will blow your mind away.'
    when event_id = 34 then 'Slot Machine888 2026 continues their legacy of world-class rock performances. This tour features a new conceptual theme and futuristic visuals that complement their powerful and iconic alternative rock sound perfectly.'
    when event_id = 35 then 'PigXY 2026 returns with even more charm and talent. This new tour features updated choreography and their latest chart-topping hits in a show that is sure to delight every fan.'
    when event_id = 36 then 'Monodog 2026 celebrates the enduring legacy of alternative music. Join the band for a night of classic anthems and new explorations in sound, proving why they remain icons today.'
    when event_id = 37 then 'Small Ass 2026 brings the heavy rock energy into the new year. This tour is all about the fans, featuring a setlist voted on by the community and intense performances.'
    when event_id = 38 then 'The CarToys showcases the genius of his production and guitar skills. Experience his unique blend of pop, rap, and jazz in a visually stunning and minimalist show.'
    when event_id = 39 then 'BowkyTiger 2026 returns with her most ambitious tour yet. Experience her powerful vocals and artistic storytelling in a show that explores themes of love, strength, and personal growth.'
    when event_id = 40 then '67hours 2026 concludes our season with a bang. This special anniversary show features guest artists, extended jam sessions, and a celebration of the indie spirit that started it all.'
end where event_id between 1 and 40;

insert into event_artists (event_id, artist_id) values
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (15, 15),
(16, 16), (17, 17), (18, 18), (19, 19), (20, 20), (21, 21), (22, 22), (23, 23), (24, 24), (25, 25), (26, 26), (27, 27), (28, 28), (29, 29), (30, 14),
(31, 10), (32, 2), (33, 12), (34, 18), (35, 23), (36, 25), (37, 13), (38, 9), (39, 6), (40, 1);

insert into event_agents (event_id, agent_id) values
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1),
(9, 2), (10, 2), (11, 2), (12, 2), (13, 2), (14, 2), (15, 2), (16, 2),
(17, 3), (18, 3), (19, 3), (20, 3), (21, 3), (22, 3), (23, 3), (24, 3),
(25, 4), (26, 4), (27, 4), (28, 4), (29, 4), (30, 2), (31, 2), (32, 1),
(33, 2), (34, 3), (35, 3), (36, 4), (37, 2), (38, 2), (39, 1), (40, 1);

insert into zones (zone_id, venue_id, zone_name, img_path, color, x_pos, y_pos) values 
(1, 1, 'A1', '1a1.svg', '#abc875', 77, 264),
(2, 1, 'A2', '1a2.svg', '#abc875', 376, 264),
(3, 1, 'B1', '1b1.svg', '#596b37', 77, 481),
(4, 1, 'B2', '1b2.svg', '#596b37', 376, 481),
(5, 1, 'stage', '1stg.svg', '#1a2700', 77, 29);

insert into seats (zone_id, number, x_pos, y_pos) values
(1, 'A1-006', 302, 99), (1, 'A1-007', 347, 99), (1, 'A1-008', 392, 99), (1, 'A1-009', 437, 99), (1, 'A1-010', 482, 99), (1, 'A1-011', 527, 99), (1, 'A1-012', 572, 99), (1, 'A1-013', 617, 99), (1, 'A1-014', 662, 99), (1, 'A1-015', 707, 99), (1, 'A1-016', 752, 99), (1, 'A1-017', 797, 99),
(1, 'A1-022', 257, 144), (1, 'A1-023', 302, 144), (1, 'A1-024', 347, 144), (1, 'A1-025', 392, 144), (1, 'A1-026', 437, 144), (1, 'A1-027', 482, 144), (1, 'A1-028', 527, 144), (1, 'A1-029', 572, 144), (1, 'A1-030', 617, 144), (1, 'A1-031', 662, 144), (1, 'A1-032', 707, 144), (1, 'A1-033', 752, 144), (1, 'A1-034', 797, 144),
(1, 'A1-038', 212, 189), (1, 'A1-039', 257, 189), (1, 'A1-040', 302, 189), (1, 'A1-041', 347, 189), (1, 'A1-042', 392, 189), (1, 'A1-043', 437, 189), (1, 'A1-044', 482, 189), (1, 'A1-045', 527, 189), (1, 'A1-046', 572, 189), (1, 'A1-047', 617, 189), (1, 'A1-048', 662, 189), (1, 'A1-049', 707, 189), (1, 'A1-050', 752, 189), (1, 'A1-051', 797, 189),
(1, 'A1-054', 167, 234), (1, 'A1-055', 212, 234), (1, 'A1-056', 257, 234), (1, 'A1-057', 302, 234), (1, 'A1-058', 347, 234), (1, 'A1-059', 392, 234), (1, 'A1-060', 437, 234), (1, 'A1-061', 482, 234), (1, 'A1-062', 527, 234), (1, 'A1-063', 572, 234), (1, 'A1-064', 617, 234), (1, 'A1-065', 662, 234), (1, 'A1-066', 707, 234), (1, 'A1-067', 752, 234), (1, 'A1-068', 797, 234),
(1, 'A1-070', 122, 279), (1, 'A1-071', 167, 279), (1, 'A1-072', 212, 279), (1, 'A1-073', 257, 279), (1, 'A1-074', 302, 279), (1, 'A1-075', 347, 279), (1, 'A1-076', 392, 279), (1, 'A1-077', 437, 279), (1, 'A1-078', 482, 279), (1, 'A1-079', 527, 279), (1, 'A1-080', 572, 279), (1, 'A1-081', 617, 279), (1, 'A1-082', 662, 279), (1, 'A1-083', 707, 279), (1, 'A1-084', 752, 279), (1, 'A1-085', 797, 279),
(1, 'A1-086', 77, 324), (1, 'A1-087', 122, 324), (1, 'A1-088', 167, 324), (1, 'A1-089', 212, 324), (1, 'A1-090', 257, 324), (1, 'A1-091', 302, 324), (1, 'A1-092', 347, 324), (1, 'A1-093', 392, 324), (1, 'A1-094', 437, 324), (1, 'A1-095', 482, 324), (1, 'A1-096', 527, 324), (1, 'A1-097', 572, 324), (1, 'A1-098', 617, 324), (1, 'A1-099', 662, 324), (1, 'A1-100', 707, 324), (1, 'A1-101', 752, 324), (1, 'A1-102', 797, 324),
(1, 'A1-103', 77, 369), (1, 'A1-104', 122, 369), (1, 'A1-105', 167, 369), (1, 'A1-106', 212, 369), (1, 'A1-107', 257, 369), (1, 'A1-108', 302, 369), (1, 'A1-109', 347, 369), (1, 'A1-110', 392, 369), (1, 'A1-111', 437, 369), (1, 'A1-112', 482, 369), (1, 'A1-113', 527, 369), (1, 'A1-114', 572, 369), (1, 'A1-115', 617, 369), (1, 'A1-116', 662, 369), (1, 'A1-117', 707, 369), (1, 'A1-118', 752, 369), (1, 'A1-119', 797, 369),
(1, 'A1-120', 77, 414), (1, 'A1-121', 122, 414), (1, 'A1-122', 167, 414), (1, 'A1-123', 212, 414), (1, 'A1-124', 257, 414), (1, 'A1-125', 302, 414), (1, 'A1-126', 347, 414), (1, 'A1-127', 392, 414), (1, 'A1-128', 437, 414), (1, 'A1-129', 482, 414), (1, 'A1-130', 527, 414), (1, 'A1-131', 572, 414), (1, 'A1-132', 617, 414), (1, 'A1-133', 662, 414), (1, 'A1-134', 707, 414), (1, 'A1-135', 752, 414), (1, 'A1-136', 797, 414),
(1, 'A1-137', 77, 459), (1, 'A1-138', 122, 459), (1, 'A1-139', 167, 459), (1, 'A1-140', 212, 459), (1, 'A1-141', 257, 459), (1, 'A1-142', 302, 459), (1, 'A1-143', 347, 459), (1, 'A1-144', 392, 459), (1, 'A1-145', 437, 459), (1, 'A1-146', 482, 459), (1, 'A1-147', 527, 459), (1, 'A1-148', 572, 459), (1, 'A1-149', 617, 459), (1, 'A1-150', 662, 459), (1, 'A1-151', 707, 459), (1, 'A1-152', 752, 459), (1, 'A1-153', 797, 459),
(1, 'A1-154', 77, 504), (1, 'A1-155', 122, 504), (1, 'A1-156', 167, 504), (1, 'A1-157', 212, 504), (1, 'A1-158', 257, 504), (1, 'A1-159', 302, 504), (1, 'A1-160', 347, 504), (1, 'A1-161', 392, 504), (1, 'A1-162', 437, 504), (1, 'A1-163', 482, 504), (1, 'A1-164', 527, 504), (1, 'A1-165', 572, 504), (1, 'A1-166', 617, 504), (1, 'A1-167', 662, 504), (1, 'A1-168', 707, 504), (1, 'A1-169', 752, 504), (1, 'A1-170', 797, 504),
(1, 'A1-171', 77, 549), (1, 'A1-172', 122, 549), (1, 'A1-173', 167, 549), (1, 'A1-174', 212, 549), (1, 'A1-175', 257, 549), (1, 'A1-176', 302, 549), (1, 'A1-177', 347, 549), (1, 'A1-178', 392, 549), (1, 'A1-179', 437, 549), (1, 'A1-180', 482, 549), (1, 'A1-181', 527, 549), (1, 'A1-182', 572, 549), (1, 'A1-183', 617, 549), (1, 'A1-184', 662, 549), (1, 'A1-185', 707, 549), (1, 'A1-186', 752, 549), (1, 'A1-187', 797, 549),
(1, 'A1-188', 77, 594), (1, 'A1-189', 122, 594), (1, 'A1-190', 167, 594), (1, 'A1-191', 212, 594), (1, 'A1-192', 257, 594), (1, 'A1-193', 302, 594), (1, 'A1-194', 347, 594), (1, 'A1-195', 392, 594), (1, 'A1-196', 437, 594), (1, 'A1-197', 482, 594), (1, 'A1-198', 527, 594), (1, 'A1-199', 572, 594), (1, 'A1-200', 617, 594), (1, 'A1-201', 662, 594), (1, 'A1-202', 707, 594), (1, 'A1-203', 752, 594), (1, 'A1-204', 797, 594),

(2, 'A2-001', 77, 99), (2, 'A2-002', 122, 99), (2, 'A2-003', 167, 99), (2, 'A2-004', 212, 99), (2, 'A2-005', 257, 99), (2, 'A2-006', 302, 99), (2, 'A2-007', 347, 99), (2, 'A2-008', 392, 99), (2, 'A2-009', 437, 99), (2, 'A2-010', 482, 99), (2, 'A2-011', 527, 99), (2, 'A2-012', 572, 99),
(2, 'A2-018', 77, 144), (2, 'A2-019', 122, 144), (2, 'A2-020', 167, 144), (2, 'A2-021', 212, 144), (2, 'A2-022', 257, 144), (2, 'A2-023', 302, 144), (2, 'A2-024', 347, 144), (2, 'A2-025', 392, 144), (2, 'A2-026', 437, 144), (2, 'A2-027', 482, 144), (2, 'A2-028', 527, 144), (2, 'A2-029', 572, 144), (2, 'A2-030', 617, 144), 
(2, 'A2-035', 77, 189), (2, 'A2-036', 122, 189), (2, 'A2-037', 167, 189), (2, 'A2-038', 212, 189), (2, 'A2-039', 257, 189), (2, 'A2-040', 302, 189), (2, 'A2-041', 347, 189), (2, 'A2-042', 392, 189), (2, 'A2-043', 437, 189), (2, 'A2-044', 482, 189), (2, 'A2-045', 527, 189), (2, 'A2-046', 572, 189), (2, 'A2-047', 617, 189), (2, 'A2-048', 662, 189),
(2, 'A2-052', 77, 234), (2, 'A2-053', 122, 234), (2, 'A2-054', 167, 234), (2, 'A2-055', 212, 234), (2, 'A2-056', 257, 234), (2, 'A2-057', 302, 234), (2, 'A2-058', 347, 234), (2, 'A2-059', 392, 234), (2, 'A2-060', 437, 234), (2, 'A2-061', 482, 234), (2, 'A2-062', 527, 234), (2, 'A2-063', 572, 234), (2, 'A2-064', 617, 234), (2, 'A2-065', 662, 234), (2, 'A2-066', 707, 234),
(2, 'A2-069', 77, 279), (2, 'A2-070', 122, 279), (2, 'A2-071', 167, 279), (2, 'A2-072', 212, 279), (2, 'A2-073', 257, 279), (2, 'A2-074', 302, 279), (2, 'A2-075', 347, 279), (2, 'A2-076', 392, 279), (2, 'A2-077', 437, 279), (2, 'A2-078', 482, 279), (2, 'A2-079', 527, 279), (2, 'A2-080', 572, 279), (2, 'A2-081', 617, 279), (2, 'A2-082', 662, 279), (2, 'A2-083', 707, 279), (2, 'A2-084', 752, 279), 
(2, 'A2-086', 77, 324), (2, 'A2-087', 122, 324), (2, 'A2-088', 167, 324), (2, 'A2-089', 212, 324), (2, 'A2-090', 257, 324), (2, 'A2-091', 302, 324), (2, 'A2-092', 347, 324), (2, 'A2-093', 392, 324), (2, 'A2-094', 437, 324), (2, 'A2-095', 482, 324), (2, 'A2-096', 527, 324), (2, 'A2-097', 572, 324), (2, 'A2-098', 617, 324), (2, 'A2-099', 662, 324), (2, 'A2-100', 707, 324), (2, 'A2-101', 752, 324), (2, 'A2-102', 797, 324),
(2, 'A2-103', 77, 369), (2, 'A2-104', 122, 369), (2, 'A2-105', 167, 369), (2, 'A2-106', 212, 369), (2, 'A2-107', 257, 369), (2, 'A2-108', 302, 369), (2, 'A2-109', 347, 369), (2, 'A2-110', 392, 369), (2, 'A2-111', 437, 369), (2, 'A2-112', 482, 369), (2, 'A2-113', 527, 369), (2, 'A2-114', 572, 369), (2, 'A2-115', 617, 369), (2, 'A2-116', 662, 369), (2, 'A2-117', 707, 369), (2, 'A2-118', 752, 369), (2, 'A2-119', 797, 369),
(2, 'A2-120', 77, 414), (2, 'A2-121', 122, 414), (2, 'A2-122', 167, 414), (2, 'A2-123', 212, 414), (2, 'A2-124', 257, 414), (2, 'A2-125', 302, 414), (2, 'A2-126', 347, 414), (2, 'A2-127', 392, 414), (2, 'A2-128', 437, 414), (2, 'A2-129', 482, 414), (2, 'A2-130', 527, 414), (2, 'A2-131', 572, 414), (2, 'A2-132', 617, 414), (2, 'A2-133', 662, 414), (2, 'A2-134', 707, 414), (2, 'A2-135', 752, 414), (2, 'A2-136', 797, 414),
(2, 'A2-137', 77, 459), (2, 'A2-138', 122, 459), (2, 'A2-139', 167, 459), (2, 'A2-140', 212, 459), (2, 'A2-141', 257, 459), (2, 'A2-142', 302, 459), (2, 'A2-143', 347, 459), (2, 'A2-144', 392, 459), (2, 'A2-145', 437, 459), (2, 'A2-146', 482, 459), (2, 'A2-147', 527, 459), (2, 'A2-148', 572, 459), (2, 'A2-149', 617, 459), (2, 'A2-150', 662, 459), (2, 'A2-151', 707, 459), (2, 'A2-152', 752, 459), (2, 'A2-153', 797, 459),
(2, 'A2-154', 77, 504), (2, 'A2-155', 122, 504), (2, 'A2-156', 167, 504), (2, 'A2-157', 212, 504), (2, 'A2-158', 257, 504), (2, 'A2-159', 302, 504), (2, 'A2-160', 347, 504), (2, 'A2-161', 392, 504), (2, 'A2-162', 437, 504), (2, 'A2-163', 482, 504), (2, 'A2-164', 527, 504), (2, 'A2-165', 572, 504), (2, 'A2-166', 617, 504), (2, 'A2-167', 662, 504), (2, 'A2-168', 707, 504), (2, 'A2-169', 752, 504), (2, 'A2-170', 797, 504),
(2, 'A2-171', 77, 549), (2, 'A2-172', 122, 549), (2, 'A2-173', 167, 549), (2, 'A2-174', 212, 549), (2, 'A2-175', 257, 549), (2, 'A2-176', 302, 549), (2, 'A2-177', 347, 549), (2, 'A2-178', 392, 549), (2, 'A2-179', 437, 549), (2, 'A2-180', 482, 549), (2, 'A2-181', 527, 549), (2, 'A2-182', 572, 549), (2, 'A2-183', 617, 549), (2, 'A2-184', 662, 549), (2, 'A2-185', 707, 549), (2, 'A2-186', 752, 549), (2, 'A2-187', 797, 549),
(2, 'A2-188', 77, 594), (2, 'A2-189', 122, 594), (2, 'A2-190', 167, 594), (2, 'A2-191', 212, 594), (2, 'A2-192', 257, 594), (2, 'A2-193', 302, 594), (2, 'A2-194', 347, 594), (2, 'A2-195', 392, 594), (2, 'A2-196', 437, 594), (2, 'A2-197', 482, 594), (2, 'A2-198', 527, 594), (2, 'A2-199', 572, 594), (2, 'A2-200', 617, 594), (2, 'A2-201', 662, 594), (2, 'A2-202', 707, 594), (2, 'A2-203', 752, 594), (2, 'A2-204', 797, 594),

(3, 'B1-001', 77, 99), (3, 'B1-002', 122, 99), (3, 'B1-003', 167, 99), (3, 'B1-004', 212, 99), (3, 'B1-005', 257, 99), (3, 'B1-006', 302, 99), (3, 'B1-007', 347, 99), (3, 'B1-008', 392, 99), (3, 'B1-009', 437, 99), (3, 'B1-010', 482, 99), (3, 'B1-011', 527, 99), (3, 'B1-012', 572, 99), (3, 'B1-013', 617, 99), (3, 'B1-014', 662, 99), (3, 'B1-015', 707, 99), (3, 'B1-016', 752, 99), (3, 'B1-017', 797, 99),
(3, 'B1-018', 77, 144), (3, 'B1-019', 122, 144), (3, 'B1-020', 167, 144), (3, 'B1-021', 212, 144), (3, 'B1-022', 257, 144), (3, 'B1-023', 302, 144), (3, 'B1-024', 347, 144), (3, 'B1-025', 392, 144), (3, 'B1-026', 437, 144), (3, 'B1-027', 482, 144), (3, 'B1-028', 527, 144), (3, 'B1-029', 572, 144), (3, 'B1-030', 617, 144), (3, 'B1-031', 662, 144), (3, 'B1-032', 707, 144), (3, 'B1-033', 752, 144), (3, 'B1-034', 797, 144),
(3, 'B1-035', 77, 189), (3, 'B1-036', 122, 189), (3, 'B1-037', 167, 189), (3, 'B1-038', 212, 189), (3, 'B1-039', 257, 189), (3, 'B1-040', 302, 189), (3, 'B1-041', 347, 189), (3, 'B1-042', 392, 189), (3, 'B1-043', 437, 189), (3, 'B1-044', 482, 189), (3, 'B1-045', 527, 189), (3, 'B1-046', 572, 189), (3, 'B1-047', 617, 189), (3, 'B1-048', 662, 189), (3, 'B1-049', 707, 189), (3, 'B1-050', 752, 189), (3, 'B1-051', 797, 189),
(3, 'B1-052', 77, 234), (3, 'B1-053', 122, 234), (3, 'B1-054', 167, 234), (3, 'B1-055', 212, 234), (3, 'B1-056', 257, 234), (3, 'B1-057', 302, 234), (3, 'B1-058', 347, 234), (3, 'B1-059', 392, 234), (3, 'B1-060', 437, 234), (3, 'B1-061', 482, 234), (3, 'B1-062', 527, 234), (3, 'B1-063', 572, 234), (3, 'B1-064', 617, 234), (3, 'B1-065', 662, 234), (3, 'B1-066', 707, 234), (3, 'B1-067', 752, 234), (3, 'B1-068', 797, 234),
(3, 'B1-069', 77, 279), (3, 'B1-070', 122, 279), (3, 'B1-071', 167, 279), (3, 'B1-072', 212, 279), (3, 'B1-073', 257, 279), (3, 'B1-074', 302, 279), (3, 'B1-075', 347, 279), (3, 'B1-076', 392, 279), (3, 'B1-077', 437, 279), (3, 'B1-078', 482, 279), (3, 'B1-079', 527, 279), (3, 'B1-080', 572, 279), (3, 'B1-081', 617, 279), (3, 'B1-082', 662, 279), (3, 'B1-083', 707, 279), (3, 'B1-084', 752, 279), (3, 'B1-085', 797, 279),
(3, 'B1-086', 77, 324), (3, 'B1-087', 122, 324), (3, 'B1-088', 167, 324), (3, 'B1-089', 212, 324), (3, 'B1-090', 257, 324), (3, 'B1-091', 302, 324), (3, 'B1-092', 347, 324), (3, 'B1-093', 392, 324), (3, 'B1-094', 437, 324), (3, 'B1-095', 482, 324), (3, 'B1-096', 527, 324), (3, 'B1-097', 572, 324), (3, 'B1-098', 617, 324), (3, 'B1-099', 662, 324), (3, 'B1-100', 707, 324), (3, 'B1-101', 752, 324), (3, 'B1-102', 797, 324),
(3, 'B1-103', 77, 369), (3, 'B1-104', 122, 369), (3, 'B1-105', 167, 369), (3, 'B1-106', 212, 369), (3, 'B1-107', 257, 369), (3, 'B1-108', 302, 369), (3, 'B1-109', 347, 369), (3, 'B1-110', 392, 369), (3, 'B1-111', 437, 369), (3, 'B1-112', 482, 369), (3, 'B1-113', 527, 369), (3, 'B1-114', 572, 369), (3, 'B1-115', 617, 369), (3, 'B1-116', 662, 369), (3, 'B1-117', 707, 369), (3, 'B1-118', 752, 369), (3, 'B1-119', 797, 369),
(3, 'B1-120', 77, 414), (3, 'B1-121', 122, 414), (3, 'B1-122', 167, 414), (3, 'B1-123', 212, 414), (3, 'B1-124', 257, 414), (3, 'B1-125', 302, 414), (3, 'B1-126', 347, 414), (3, 'B1-127', 392, 414), (3, 'B1-128', 437, 414), (3, 'B1-129', 482, 414), (3, 'B1-130', 527, 414), (3, 'B1-131', 572, 414), (3, 'B1-132', 617, 414), (3, 'B1-133', 662, 414), (3, 'B1-134', 707, 414), (3, 'B1-135', 752, 414), (3, 'B1-136', 797, 414),
(3, 'B1-137', 77, 459), (3, 'B1-138', 122, 459), (3, 'B1-139', 167, 459), (3, 'B1-140', 212, 459), (3, 'B1-141', 257, 459), (3, 'B1-142', 302, 459), (3, 'B1-143', 347, 459), (3, 'B1-144', 392, 459), (3, 'B1-145', 437, 459), (3, 'B1-146', 482, 459), (3, 'B1-147', 527, 459), 
(3, 'B1-155', 122, 504), (3, 'B1-156', 167, 504), (3, 'B1-157', 212, 504), (3, 'B1-158', 257, 504), (3, 'B1-159', 302, 504), (3, 'B1-160', 347, 504), (3, 'B1-161', 392, 504), (3, 'B1-162', 437, 504), (3, 'B1-163', 482, 504), (3, 'B1-164', 527, 504), 
(3, 'B1-173', 167, 549), (3, 'B1-174', 212, 549), (3, 'B1-175', 257, 549), (3, 'B1-176', 302, 549), (3, 'B1-177', 347, 549), (3, 'B1-178', 392, 549), (3, 'B1-179', 437, 549), (3, 'B1-180', 482, 549), (3, 'B1-181', 527, 549),  
(3, 'B1-191', 212, 594), (3, 'B1-192', 257, 594), (3, 'B1-193', 302, 594), (3, 'B1-194', 347, 594), (3, 'B1-195', 392, 594), (3, 'B1-196', 437, 594), (3, 'B1-197', 482, 594), (3, 'B1-198', 527, 594), 

(4, 'B2-001', 77, 99), (4, 'B2-002', 122, 99), (4, 'B2-003', 167, 99), (4, 'B2-004', 212, 99), (4, 'B2-005', 257, 99), (4, 'B2-006', 302, 99), (4, 'B2-007', 347, 99), (4, 'B2-008', 392, 99), (4, 'B2-009', 437, 99), (4, 'B2-010', 482, 99), (4, 'B2-011', 527, 99), (4, 'B2-012', 572, 99), (4, 'B2-013', 617, 99), (4, 'B2-014', 662, 99), (4, 'B2-015', 707, 99), (4, 'B2-016', 752, 99), (4, 'B2-017', 797, 99),
(4, 'B2-018', 77, 144), (4, 'B2-019', 122, 144), (4, 'B2-020', 167, 144), (4, 'B2-021', 212, 144), (4, 'B2-022', 257, 144), (4, 'B2-023', 302, 144), (4, 'B2-024', 347, 144), (4, 'B2-025', 392, 144), (4, 'B2-026', 437, 144), (4, 'B2-027', 482, 144), (4, 'B2-028', 527, 144), (4, 'B2-029', 572, 144), (4, 'B2-030', 617, 144), (4, 'B2-031', 662, 144), (4, 'B2-032', 707, 144), (4, 'B2-033', 752, 144), (4, 'B2-034', 797, 144),
(4, 'B2-035', 77, 189), (4, 'B2-036', 122, 189), (4, 'B2-037', 167, 189), (4, 'B2-038', 212, 189), (4, 'B2-039', 257, 189), (4, 'B2-040', 302, 189), (4, 'B2-041', 347, 189), (4, 'B2-042', 392, 189), (4, 'B2-043', 437, 189), (4, 'B2-044', 482, 189), (4, 'B2-045', 527, 189), (4, 'B2-046', 572, 189), (4, 'B2-047', 617, 189), (4, 'B2-048', 662, 189), (4, 'B2-049', 707, 189), (4, 'B2-050', 752, 189), (4, 'B2-051', 797, 189),
(4, 'B2-052', 77, 234), (4, 'B2-053', 122, 234), (4, 'B2-054', 167, 234), (4, 'B2-055', 212, 234), (4, 'B2-056', 257, 234), (4, 'B2-057', 302, 234), (4, 'B2-058', 347, 234), (4, 'B2-059', 392, 234), (4, 'B2-060', 437, 234), (4, 'B2-061', 482, 234), (4, 'B2-062', 527, 234), (4, 'B2-063', 572, 234), (4, 'B2-064', 617, 234), (4, 'B2-065', 662, 234), (4, 'B2-066', 707, 234), (4, 'B2-067', 752, 234), (4, 'B2-068', 797, 234),
(4, 'B2-069', 77, 279), (4, 'B2-070', 122, 279), (4, 'B2-071', 167, 279), (4, 'B2-072', 212, 279), (4, 'B2-073', 257, 279), (4, 'B2-074', 302, 279), (4, 'B2-075', 347, 279), (4, 'B2-076', 392, 279), (4, 'B2-077', 437, 279), (4, 'B2-078', 482, 279), (4, 'B2-079', 527, 279), (4, 'B2-080', 572, 279), (4, 'B2-081', 617, 279), (4, 'B2-082', 662, 279), (4, 'B2-083', 707, 279), (4, 'B2-084', 752, 279), (4, 'B2-085', 797, 279),
(4, 'B2-086', 77, 324), (4, 'B2-087', 122, 324), (4, 'B2-088', 167, 324), (4, 'B2-089', 212, 324), (4, 'B2-090', 257, 324), (4, 'B2-091', 302, 324), (4, 'B2-092', 347, 324), (4, 'B2-093', 392, 324), (4, 'B2-094', 437, 324), (4, 'B2-095', 482, 324), (4, 'B2-096', 527, 324), (4, 'B2-097', 572, 324), (4, 'B2-098', 617, 324), (4, 'B2-099', 662, 324), (4, 'B2-100', 707, 324), (4, 'B2-101', 752, 324), (4, 'B2-102', 797, 324),
(4, 'B2-103', 77, 369), (4, 'B2-104', 122, 369), (4, 'B2-105', 167, 369), (4, 'B2-106', 212, 369), (4, 'B2-107', 257, 369), (4, 'B2-108', 302, 369), (4, 'B2-109', 347, 369), (4, 'B2-110', 392, 369), (4, 'B2-111', 437, 369), (4, 'B2-112', 482, 369), (4, 'B2-113', 527, 369), (4, 'B2-114', 572, 369), (4, 'B2-115', 617, 369), (4, 'B2-116', 662, 369), (4, 'B2-117', 707, 369), (4, 'B2-118', 752, 369), (4, 'B2-119', 797, 369),
(4, 'B2-120', 77, 414), (4, 'B2-121', 122, 414), (4, 'B2-122', 167, 414), (4, 'B2-123', 212, 414), (4, 'B2-124', 257, 414), (4, 'B2-125', 302, 414), (4, 'B2-126', 347, 414), (4, 'B2-127', 392, 414), (4, 'B2-128', 437, 414), (4, 'B2-129', 482, 414), (4, 'B2-130', 527, 414), (4, 'B2-131', 572, 414), (4, 'B2-132', 617, 414), (4, 'B2-133', 662, 414), (4, 'B2-134', 707, 414), (4, 'B2-135', 752, 414), (4, 'B2-136', 797, 414),
(4, 'B2-143', 347, 459), (4, 'B2-144', 392, 459), (4, 'B2-145', 437, 459), (4, 'B2-146', 482, 459), (4, 'B2-147', 527, 459), (4, 'B2-148', 572, 459), (4, 'B2-149', 617, 459), (4, 'B2-150', 662, 459), (4, 'B2-151', 707, 459), (4, 'B2-152', 752, 459), (4, 'B2-153', 797, 459),
(4, 'B2-160', 347, 504), (4, 'B2-161', 392, 504), (4, 'B2-162', 437, 504), (4, 'B2-163', 482, 504), (4, 'B2-164', 527, 504), (4, 'B2-165', 572, 504), (4, 'B2-166', 617, 504), (4, 'B2-167', 662, 504), (4, 'B2-168', 707, 504), (4, 'B2-169', 752, 504), 
(4, 'B2-177', 347, 549), (4, 'B2-178', 392, 549), (4, 'B2-179', 437, 549), (4, 'B2-180', 482, 549), (4, 'B2-181', 527, 549), (4, 'B2-182', 572, 549), (4, 'B2-183', 617, 549), (4, 'B2-184', 662, 549), (4, 'B2-185', 707, 549), 
(4, 'B2-194', 347, 594), (4, 'B2-195', 392, 594), (4, 'B2-196', 437, 594), (4, 'B2-197', 482, 594), (4, 'B2-198', 527, 594), (4, 'B2-199', 572, 594), (4, 'B2-200', 617, 594), (4, 'B2-201', 662, 594);

insert into event_zones (event_id, zone_id, price) values 
(3, 1, 3500.00), (3, 2, 3500.00), (3, 3, 1800.00), (3, 4, 1800.00),
(6, 1, 3200.00), (6, 2, 3200.00), (6, 3, 1500.00), (6, 4, 1500.00),
(9, 1, 2800.00), (9, 2, 2800.00), (9, 3, 1200.00), (9, 4, 1200.00),
(12, 1, 5500.00), (12, 2, 5500.00), (12, 3, 2500.00), (12, 4, 2500.00),
(15, 1, 3000.00), (15, 2, 3000.00), (15, 3, 1400.00), (15, 4, 1400.00),
(18, 1, 4000.00), (18, 2, 4000.00), (18, 3, 2000.00), (18, 4, 2000.00),
(21, 1, 2500.00), (21, 2, 2500.00), (21, 3, 1000.00), (21, 4, 1000.00),
(24, 1, 3500.00), (24, 2, 3500.00), (24, 3, 1800.00), (24, 4, 1800.00),
(27, 1, 4500.00), (27, 2, 4500.00), (27, 3, 2200.00), (27, 4, 2200.00),
(30, 1, 3800.00), (30, 2, 3800.00), (30, 3, 1900.00), (30, 4, 1900.00),
(33, 1, 5500.00), (33, 2, 5500.00), (33, 3, 2500.00), (33, 4, 2500.00),
(36, 1, 4000.00), (36, 2, 4000.00), (36, 3, 2000.00), (36, 4, 2000.00),
(37, 1, 3200.00), (37, 2, 3200.00), (37, 3, 1500.00), (37, 4, 1500.00),
(38, 1, 4000.00), (38, 2, 4000.00), (38, 3, 2000.00), (38, 4, 2000.00),
(39, 1, 3200.00), (39, 2, 3200.00), (39, 3, 1500.00), (39, 4, 1500.00),
(40, 1, 3200.00), (40, 2, 3200.00), (40, 3, 1500.00), (40, 4, 1500.00);

insert into showtimes (showtime_id, event_id, venue_id, show_at) values
(1, 1, 3, '2024-07-05 19:00:00'), (2, 1, 3, '2024-07-06 18:00:00'),
(3, 2, 2, '2024-07-20 19:00:00'), (4, 2, 2, '2024-07-21 18:00:00'),
(5, 3, 1, '2024-08-15 19:00:00'), (6, 3, 1, '2024-08-16 18:00:00'),
(7, 4, 3, '2024-09-01 19:00:00'), (8, 4, 3, '2024-09-02 18:00:00'),
(9, 5, 2, '2024-09-15 19:00:00'), (10, 5, 2, '2024-09-16 18:00:00'),
(11, 6, 1, '2024-10-10 19:00:00'), (12, 6, 1, '2024-10-11 18:00:00'),
(13, 7, 3, '2024-11-01 19:00:00'), (14, 7, 3, '2024-11-02 18:00:00'),
(15, 8, 2, '2024-11-15 19:00:00'), (16, 8, 2, '2024-11-16 18:00:00'),
(17, 9, 1, '2024-12-05 19:00:00'), (18, 9, 1, '2024-12-06 18:00:00'),
(19, 10, 3, '2024-12-20 19:00:00'), (20, 10, 3, '2024-12-21 18:00:00'),
(21, 11, 2, '2025-01-10 19:00:00'), (22, 11, 2, '2025-01-11 18:00:00'),
(23, 12, 1, '2025-01-25 19:00:00'), (24, 12, 1, '2025-01-26 18:00:00'),
(25, 13, 3, '2025-02-14 19:00:00'), (26, 13, 3, '2025-02-15 18:00:00'),
(27, 14, 2, '2025-03-01 19:00:00'), (28, 14, 2, '2025-03-02 18:00:00'),
(29, 15, 1, '2025-03-20 19:00:00'), (30, 15, 1, '2025-03-21 18:00:00'),
(31, 16, 3, '2025-04-10 19:00:00'), (32, 16, 3, '2025-04-11 18:00:00'),

(33, 17, 2, '2025-05-05 19:00:00'), (34, 18, 1, '2025-05-25 19:00:00'),
(35, 19, 3, '2025-06-10 19:00:00'), (36, 20, 2, '2025-07-01 19:00:00'),
(37, 21, 1, '2025-07-15 19:00:00'), (38, 22, 3, '2025-08-05 19:00:00'),
(39, 23, 2, '2025-08-25 19:00:00'), (40, 24, 1, '2025-09-10 19:00:00'),
(41, 25, 3, '2025-10-01 19:00:00'), (42, 26, 2, '2025-10-20 19:00:00'),
(43, 27, 1, '2025-11-10 19:00:00'), (44, 28, 3, '2025-11-28 19:00:00'),
(45, 29, 2, '2025-12-15 19:00:00'), (46, 30, 1, '2026-01-05 19:00:00'),
(47, 31, 3, '2026-01-25 19:00:00'), (48, 32, 2, '2026-02-14 19:00:00'),
(49, 33, 1, '2026-03-05 19:00:00'), (50, 34, 3, '2026-03-20 19:00:00'), 
(51, 34, 3, '2026-03-21 18:00:00'), (52, 35, 2, '2026-04-10 19:00:00'), 
(53, 35, 2, '2026-04-11 18:00:00'), (54, 36, 1, '2026-04-30 19:00:00'),
(55, 37, 1, '2026-05-15 19:00:00'), (56, 37, 1, '2026-05-16 18:00:00'),
(57, 38, 1, '2026-06-06 18:00:00'), (58, 39, 1, '2026-06-25 19:00:00'), 
(59, 39, 1, '2026-06-26 18:00:00'), (60, 40, 1, '2026-07-16 18:00:00');

insert into bookings (booking_id, user_id, booked_at, total_price) values 
(1, 1, now(), 1000.00);

insert into payments (booking_id, payment_method) values 
(1, 'credit_card');

insert into tickets (booking_id, showtime_id, seat_id, price) values 
(1, 5, 1, 250.00), (1, 5, 2, 250.00);

insert into tickets (booking_id, showtime_id, seat_id, price) values 
(1, 6, 1, 250.00), (1, 6, 2, 250.00);