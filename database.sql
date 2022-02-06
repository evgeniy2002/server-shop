create table type(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	type_name VARCHAR(255) NOT NULL,
	img VARCHAR,
	rating INTEGER DEFAULT 0,
  UNIQUE(type_name)
);
create table brand(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	brands_name VARCHAR(255) NOT NULL,
	img VARCHAR,
	type_id INTEGER,
	FOREIGN KEY(type_id) REFERENCES type(id),
  UNIQUE(brands_name)
);

create table device (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	device_name VARCHAR(100) NOT NULL,
	price INTEGER NOT NULL,
  img VARCHAR,
	rating INTEGER DEFAULT 0,
	create_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  description VARCHAR,
	-- type_id INTEGER,
  -- FOREIGN KEY (type_id) REFERENCES type(id),
	-- service_id INTEGER,
  -- FOREIGN KEY (service_id) REFERENCES service(id),
	-- info_id INTEGER,
	-- FOREIGN KEY (info_id) REFERENCES device_info(id),
	brand_id INTEGER,
	FOREIGN KEY(brand_id) REFERENCES brand(id),
	UNIQUE(device_name)
);


create table admin_user (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
)

create table admin_user (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(100),
	rating INTEGER DEFAULT 0,
)