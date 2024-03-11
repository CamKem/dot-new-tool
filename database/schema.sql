CREATE TABLE `records` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`user` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `records_slug_unique` ON `records` (`slug`);