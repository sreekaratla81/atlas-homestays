-- Table: properties (buildings)
CREATE TABLE properties (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    address NVARCHAR(255),
    type NVARCHAR(50), -- owned, leased, branded
    owner_name NVARCHAR(100),
    contact_phone NVARCHAR(20),
    commission_percent DECIMAL(5,2) NULL,
    status NVARCHAR(20) -- active, inactive
);

-- Table: listings (units within properties)
CREATE TABLE listings (
    id INT PRIMARY KEY IDENTITY(1,1),
    property_id INT FOREIGN KEY REFERENCES properties(id),
    name NVARCHAR(100) NOT NULL,
    floor INT,
    type NVARCHAR(50),
    status NVARCHAR(20),
    wifi_name NVARCHAR(100),
    wifi_password NVARCHAR(100),
    max_guests INT
);

-- Table: guests
CREATE TABLE guests (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100),
    phone NVARCHAR(15),
    email NVARCHAR(100),
    id_proof_url NVARCHAR(255)
);

-- Table: bookings
CREATE TABLE bookings (
    id INT PRIMARY KEY IDENTITY(1,1),
    listing_id INT FOREIGN KEY REFERENCES listings(id),
    guest_id INT FOREIGN KEY REFERENCES guests(id),
    checkin_date DATE,
    checkout_date DATE,
    planned_checkin_time TIME,
    actual_checkin_time TIME,
    planned_checkout_time TIME,
    actual_checkout_time TIME,
    booking_source NVARCHAR(50), -- Airbnb, Booking.com, Walk-in, etc.
    payment_status NVARCHAR(20), -- paid / partial / unpaid / refunded
    amount_received DECIMAL(10, 2),
    notes NVARCHAR(500)
);

-- Table: messages_log
CREATE TABLE messages_log (
    id INT PRIMARY KEY IDENTITY(1,1),
    booking_id INT FOREIGN KEY REFERENCES bookings(id),
    message_type NVARCHAR(50),
    sent_on DATETIME,
    status NVARCHAR(20)
);

-- Table: incidents
CREATE TABLE incidents (
    id INT PRIMARY KEY IDENTITY(1,1),
    listing_id INT FOREIGN KEY REFERENCES listings(id),
    booking_id INT FOREIGN KEY REFERENCES bookings(id),
    description NVARCHAR(MAX),
    action_taken NVARCHAR(MAX),
    status NVARCHAR(20),
    created_by NVARCHAR(100),
    created_on DATETIME DEFAULT GETDATE()
);

-- Table: users
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100),
    phone NVARCHAR(15),
    email NVARCHAR(100),
    password_hash NVARCHAR(255),
    role NVARCHAR(20) -- admin, staff, manager
);

-- Table: payments
CREATE TABLE payments (
    id INT PRIMARY KEY IDENTITY(1,1),
    booking_id INT FOREIGN KEY REFERENCES bookings(id),
    amount DECIMAL(10, 2),
    method NVARCHAR(50), -- cash, UPI, card
    type NVARCHAR(20),   -- payment or refund
    received_on DATETIME,
    note NVARCHAR(255)
);
