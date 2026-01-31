-- SQLite Schema for Cloudflare D1

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  auth_provider TEXT DEFAULT 'local',
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  dietary_restrictions TEXT, -- JSON Array
  health_goals TEXT, -- JSON Array
  allergens TEXT, -- JSON Array
  daily_calorie_target INTEGER,
  protein_target INTEGER,
  carbs_target INTEGER,
  fats_target INTEGER,
  cuisine_preferences TEXT, -- JSON Array
  spice_level TEXT, 
  disliked_ingredients TEXT, -- JSON Array
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch()),
  UNIQUE(user_id)
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  prep_time INTEGER, -- minutes
  cook_time INTEGER, -- minutes
  total_time INTEGER, -- minutes
  servings INTEGER DEFAULT 1,
  difficulty TEXT, 
  cuisine_type TEXT,
  meal_type TEXT, 
  dietary_tags TEXT, -- JSON Array
  calories INTEGER,
  protein REAL,
  carbs REAL,
  fats REAL,
  fiber REAL,
  sodium REAL,
  sugar REAL,
  created_by TEXT REFERENCES users(id),
  is_verified INTEGER DEFAULT 0, -- 0 or 1
  view_count INTEGER DEFAULT 0,
  average_rating REAL,
  rating_count INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON recipes(total_time);
CREATE INDEX IF NOT EXISTS idx_recipes_calories ON recipes(calories);

-- Ingredients Table
CREATE TABLE IF NOT EXISTS ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT, 
  calories_per_100g REAL,
  protein_per_100g REAL,
  carbs_per_100g REAL,
  fats_per_100g REAL,
  fiber_per_100g REAL,
  common_allergen INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Recipe Ingredients Junction
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id TEXT PRIMARY KEY,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id TEXT REFERENCES ingredients(id),
  quantity REAL,
  unit TEXT, 
  display_text TEXT, 
  is_optional INTEGER DEFAULT 0,
  order_index INTEGER,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);

-- Recipe Instructions Table
CREATE TABLE IF NOT EXISTS recipe_instructions (
  id TEXT PRIMARY KEY,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  image_url TEXT,
  timer_seconds INTEGER, 
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_recipe_instructions_recipe ON recipe_instructions(recipe_id);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE CASCADE,
  created_at INTEGER DEFAULT (unixepoch()),
  UNIQUE(user_id, recipe_id)
);
