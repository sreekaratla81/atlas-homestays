SELECT * FROM bookings;

INSERT INTO properties (
    name,
    address,
    type,
    owner_name,
    contact_phone,
    commission_percent,
    status
)
VALUES (
    'Atlas Homes – KPHB',
    'Plot 165, 7th Phase, KPHB, Kukatpally, Hyderabad, Telangana 500072',
    'owned',
    'Sreekar Atla',
    '7032493290',
    NULL,
    'active'
);

DROP TABLE payments;
DROP TABLE incidents;
DROP TABLE messages_log;
DROP TABLE bookings;
DROP TABLE guests;
DROP TABLE listings;
DROP TABLE properties;
DROP TABLE users;
DROP TABLE __EFMigrationsHistory;

SELECT name FROM sys.tables;
