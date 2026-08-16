CREATE TABLE `guestbook_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`message` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guestbook_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(64) NOT NULL,
	`user_id` varchar(64) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(64) NOT NULL,
	`username` varchar(255) NOT NULL,
	`avatar_url` varchar(2048),
	`profile_url` varchar(2048) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
