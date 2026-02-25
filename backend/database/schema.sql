-- ── FOUNDER MATRIMONY - OPTIMIZED MYSQL SCHEMA ──
-- Focus: High-performance Discovery, Filtering, and Matching

CREATE DATABASE IF NOT EXISTS founder_matrimony;
USE founder_matrimony;

-- 1. Authentication Layer
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'suspended', 'deactivated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_status (status)
) ENGINE=InnoDB;

-- 2. Professional Profiles
CREATE TABLE profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role_preference ENUM('Tech', 'Business', 'Design', 'Operations', 'Other') NOT NULL,
    location VARCHAR(255),
    years_experience TINYINT UNSIGNED DEFAULT 0,
    education VARCHAR(255),
    bio TEXT,
    startup_vision TEXT,
    commitment_level ENUM('Full-time', 'Part-time', 'Founder-at-large') DEFAULT 'Full-time',
    is_visible BOOLEAN DEFAULT TRUE,
    is_pro BOOLEAN DEFAULT FALSE, -- Premium status
    photo_url VARCHAR(512),
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Optimized Indexes for Selective Filtering
    INDEX idx_filter_role_loc (role_preference, location),
    INDEX idx_filter_experience (years_experience),
    INDEX idx_visibility (is_visible, last_active),
    FULLTEXT INDEX idx_bio_search (bio, startup_vision) -- For keyword-based discovery
) ENGINE=InnoDB;

-- 3. Skills & Knowledge Base (Normalized for Global Filtering)
CREATE TABLE skills (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE domains (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- Junction Tables for Many-to-Many
CREATE TABLE profile_skills (
    profile_id INT UNSIGNED NOT NULL,
    skill_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (profile_id, skill_id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    INDEX idx_skill_lookup (skill_id)
) ENGINE=InnoDB;

CREATE TABLE profile_domains (
    profile_id INT UNSIGNED NOT NULL,
    domain_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (profile_id, domain_id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
    INDEX idx_domain_lookup (domain_id)
) ENGINE=InnoDB;

-- 4. Matching Logic Engine
CREATE TABLE swipes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    swiper_id INT UNSIGNED NOT NULL,
    swiped_id INT UNSIGNED NOT NULL,
    direction ENUM('pass', 'connect') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (swiper_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (swiped_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Critical Index for identifying mutual matches instantly
    INDEX idx_match_lookup (swiper_id, swiped_id, direction),
    -- Index for preventing duplicate swipes and performance
    UNIQUE KEY uniq_swipe_pair (swiper_id, swiped_id)
) ENGINE=InnoDB;

CREATE TABLE matches (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_1_id INT UNSIGNED NOT NULL,
    user_2_id INT UNSIGNED NOT NULL,
    status ENUM('active', 'blocked', 'expired') DEFAULT 'active',
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_2_id) REFERENCES users(id) ON DELETE CASCADE,
    
    UNIQUE KEY uniq_match_pair (user_1_id, user_2_id),
    INDEX idx_active_matches (user_1_id, status)
) ENGINE=InnoDB;

-- 5. Communication Tier
CREATE TABLE chats (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    match_id INT UNSIGNED UNIQUE NOT NULL,
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    INDEX idx_recency (last_message_at DESC)
) ENGINE=InnoDB;

CREATE TABLE messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    chat_id INT UNSIGNED NOT NULL,
    sender_id INT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    msg_type ENUM('text', 'image', 'call_invite', 'intro_prompt') DEFAULT 'text',
    status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_chat_history (chat_id, created_at)
) ENGINE=InnoDB;

-- Initialization Data (Optional)
INSERT INTO skills (name) VALUES ('React'), ('Node.js'), ('Python'), ('GTM'), ('FinTech');
INSERT INTO domains (name) VALUES ('FinTech'), ('SaaS'), ('AI'), ('HealthTech');
