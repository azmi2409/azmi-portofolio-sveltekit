import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	slug: text('slug').notNull().unique(),
	title: text('title').notNull(),
	excerpt: text('excerpt').notNull(),
	content: text('content').notNull(),
	featuredImage: text('featured_image'),
	author: text('author').notNull(),
	status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
	categories: text('categories').array().notNull().default([]),
	tags: text('tags').array().notNull().default([]),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	publishedAt: timestamp('published_at')
});

export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	email: text('email'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
