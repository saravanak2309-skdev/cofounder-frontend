# Founder Matrimony - System Specification

## STEP 1 — SYSTEM ARCHITECTURE

### Tech Stack Selection
- **Frontend**: React 19 (Vite), TypeScript, Tailwind CSS, Framer Motion (Animations), MUI Icons, React Router 7.
- **Backend**: FastAPI (Python), SQLAlchemy (ORM), Pydantic (Validation).
- **Database**: PostgreSQL (Persistent Storage), Redis (Caching & WebSockets).
- **Auth**: JWT (JSON Web Tokens) with Secure HTTP-only Cookies.
- **Real-time**: WebSockets for real-time messaging.
- **File Storage**: AWS S3 or Supabase Storage for profile photos and pitch decks.
- **Deployment**: Dockerized services, Vercel (Frontend), AWS ECS or RailWay (Backend).

### Scalable Architecture
- **Stateless Backend**: API nodes can scale horizontally behind a load balancer.
- **Database Indexing**: Optimized queries for geospatial (location) and tag-based (skills) searches.
- **Async Workers**: Celery/Redis for background matching score calculations and email notifications.
- **CDN**: CloudFront for serving static assets and profile media.

---

## STEP 2 — DATABASE SCHEMA (PostgreSQL)

### Tables & Relationships

#### 1. `users`
- `id` (UUID, PK)
- `email` (String, Unique, Index)
- `hashed_password` (String)
- `is_active` (Boolean)
- `created_at` (Timestamp)

#### 2. `profiles`
- `id` (UUID, PK)
- `user_id` (UUID, FK, Unique)
- `name` (String, Index)
- `role` (Enum: Tech, Business, Design, Operations)
- `location` (String, Index)
- `education` (String)
- `years_of_experience` (Integer)
- `bio` (Text)
- `startup_vision` (Text)
- `commitment` (Enum: Full-time, Part-time)
- `is_visible` (Boolean, Default: True)
- `photo_url` (String)
- `skills` (JSONB, GIN Index)
- `domains` (JSONB, GIN Index)
- `looking_for` (JSONB)
- `match_scoring_data` (JSONB) -- Precalculated weights for faster filtering

#### 3. `swipes`
- `id` (BigInt, PK)
- `swiper_id` (UUID, FK)
- `swiped_id` (UUID, FK)
- `direction` (Enum: left, right)
- `created_at` (Timestamp)

#### 4. `matches`
- `id` (UUID, PK)
- `user_1_id` (UUID, FK)
- `user_2_id` (UUID, FK)
- `created_at` (Timestamp)
- `synergy_score` (Float)

#### 5. `chats` & `messages`
- `chat_id` (UUID, PK)
- `match_id` (UUID, FK)
- `sender_id` (UUID, FK)
- `content` (Text)
- `read_at` (Timestamp, Nullable)
- `created_at` (Timestamp)

#### 6. `notifications`
- `id` (UUID, PK)
- `user_id` (UUID, FK)
- `type` (Enum: match, message, system)
- `metadata` (JSONB)
- `is_read` (Boolean)

#### 7. `saved_filters`
- `id` (UUID, PK)
- `user_id` (UUID, FK)
- `filter_name` (String)
- `config` (JSONB)

---

## STEP 4 — MATCHING ENGINE LOGIC

### Match Score Formula (The "Synergy Index")
`Score = (RoleComp * 0.4) + (DomainOverlap * 0.2) + (VisionAlign * 0.2) + (ExperienceBalance * 0.1) + (CommitmentSync * 0.1)`

1. **Role Complementarity (`RoleComp`)**:
   - CEO (Business) + CTO (Tech) = 1.0
   - Designer + Developer = 0.9
   - Same Roles = 0.3 (lower priority unless specified)
2. **Domain Overlap**: Calculated using Jaccard similarity on industry sectors.
3. **Experience Balance**: Higher synergy score if total experience > 10 years and roles are distinct.
4. **Vision Alignment**: Semantic similarity between `startup_vision` fields using NLP embeddings.

### Swipe Ranking logic
- Active users first.
- Users within 50km radius boosted.
- Users who already swiped "Right" on the current user (Hidden Match) are prioritized.

---

## STEP 7 — DEPLOYMENT INSTRUCTIONS

1. **Containerization**: Use `docker-compose` to spin up PostgreSQL, Redis, and the FastAPI backend.
2. **Frontend Build**: `npm run build` and deploy to Vercel/Netlify.
3. **Database Migration**: Use `alembic` for schema evolution.
4. **Environment Config**: Use `.env` files for secrets and API keys.
5. **CI/CD**: GitHub Actions for automated testing and deployment to AWS ECS.
