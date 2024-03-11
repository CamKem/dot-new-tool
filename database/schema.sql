CREATE TABLE IF NOT EXISTS `records` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL UNIQUE,
	`user` text NOT NULL UNIQUE,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
