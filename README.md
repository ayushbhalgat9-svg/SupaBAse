Google-Sheets-to-Supabase-Sync
Automated data synchronization system integrating Google Sheets with Supabase via REST APIs, enabling real-time database updates, secure data transfer, and scalable cloud-based storage.

1.Project Description

This project implements an automated data synchronization solution between Google Sheets and a Supabase database table using RESTful API communication. Whenever a new row is added or modified in Google Sheets, the system captures the change and securely transmits the structured data to Supabase, ensuring real-time updates and consistent cloud-based storage.

2.Project Overview

What the System Does

Automatically synchronizes data from Google Sheets to a Supabase PostgreSQL database.

Updates the database in real time whenever a row is added or modified in the spreadsheet.

Ensures structured and consistent cloud-based data storage.

How It Works (High-Level)

Detects changes made in Google Sheets.

Converts spreadsheet rows into structured JSON format.

Sends the formatted data securely to Supabase using REST API calls.

Inserts or updates records in the PostgreSQL database.

Use Cases

Lead and customer data management

Form submission data storage

Student or employee record management

Inventory and stock tracking

3.Tech Stack

A.Frontend / Data Source

Google Sheets

Used as the primary data input interface for users.

Acts as a lightweight frontend where users can add, edit, or update records.

B.Backend Automation

Serverless Runtime

Handles automation logic

Executes on-edit triggers

Sends HTTP requests to Supabase

Acts as middleware between Google Sheets and database

C.API Layer

Supabase REST API

Automatically generated REST endpoints

Handles secure data insertion

Accepts JSON payloads from Apps Script

D.Database

PostgreSQL (via Supabase)

Structured relational database

Stores sheet data

Supports indexing & constraints

Auto-generated id and created_at fields

4.Features

Real-time data synchronization

Automated change detection

Secure REST API communication

Structured JSON data transformation

Scalable cloud-based storage

5.Data Synchronization Workflow

Stage 1: Sheet → Database (Push Flow)

This process transfers newly added or updated spreadsheet records into Supabase.

Steps Involved:

Retrieve data from the active sheet (excluding header row)

Extract only relevant columns (e.g., ID, Name, Dept, Salary, etc.)

Perform field validation (avoid null/empty required values)

Match records using a primary identifier (e.g., email or id)

Perform upsert operation (insert new / update existing)

Stage 2: Database → Sheet (Pull Flow)

This process ensures the spreadsheet reflects the latest database records.

Steps Involved:

Fetch complete dataset from Supabase table

Convert JSON response into row format

Clear existing sheet data (excluding column headers)

Repopulate sheet with latest records

6.System Security Framework

Access & Authentication

Google Service Account with OAuth 2.0 for Sheets access

Supabase JWT-based API authentication

Role-based credentials for controlled database operations

Permission Control

PostgreSQL Row-Level Security (RLS) enabled

Direct table writes restricted

Updates handled through secured backend logic

Data Protection

HTTPS (TLS) for all data transfers

Encrypted storage in Supabase

8.Conclusion

This project delivers a secure and efficient two-way synchronization between Google Sheets and Supabase, ensuring real-time data consistency and preventing duplicates through controlled upsert logic.By leveraging automation triggers and secure API communication, it provides a scalable solution that reduces manual effort, improves data accuracy, and strengthens integration between cloud-based tools and modern database systems.
