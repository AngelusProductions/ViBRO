# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_28_221459) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collabs", force: :cascade do |t|
    t.integer "stake", default: 0
    t.bigint "vibe_id", null: false
    t.bigint "user_id", null: false
    t.bigint "manager_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["manager_id"], name: "index_collabs_on_manager_id"
    t.index ["user_id"], name: "index_collabs_on_user_id"
    t.index ["vibe_id"], name: "index_collabs_on_vibe_id"
  end

  create_table "ideas", force: :cascade do |t|
    t.string "name", null: false
    t.string "type", null: false
    t.string "audio_file"
    t.integer "fire"
    t.integer "ice"
    t.boolean "accepted", default: false
    t.bigint "user_id", null: false
    t.bigint "vibe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_ideas_on_user_id"
    t.index ["vibe_id"], name: "index_ideas_on_vibe_id"
  end

  create_table "lineups", force: :cascade do |t|
    t.string "name", null: false
    t.text "blurb"
    t.string "art"
    t.integer "waves", default: 0
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lineups_on_user_id"
  end

  create_table "managers", force: :cascade do |t|
    t.integer "stake", default: 100
    t.bigint "vibe_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_managers_on_user_id"
    t.index ["vibe_id"], name: "index_managers_on_vibe_id"
  end

  create_table "mixes", force: :cascade do |t|
    t.string "name"
    t.integer "number", null: false
    t.string "audio_file", null: false
    t.text "blurb"
    t.string "art"
    t.string "color"
    t.integer "bpm", null: false
    t.bigint "vibe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["vibe_id"], name: "index_mixes_on_vibe_id"
  end

  create_table "stems", force: :cascade do |t|
    t.string "name", null: false
    t.string "audio_file", null: false
    t.bigint "vibe_id", null: false
    t.bigint "tree_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tree_id"], name: "index_stems_on_tree_id"
    t.index ["vibe_id"], name: "index_stems_on_vibe_id"
  end

  create_table "trees", force: :cascade do |t|
    t.bigint "vibe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["vibe_id"], name: "index_trees_on_vibe_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name"
    t.string "username", null: false
    t.string "pro_pic"
    t.text "bio"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "vibes", force: :cascade do |t|
    t.string "name", null: false
    t.integer "runtime", null: false
    t.string "art"
    t.text "blurb"
    t.integer "waves", default: 0
    t.integer "fire", default: 0
    t.integer "ice", default: 0
    t.bigint "collab_id"
    t.bigint "manager_id", null: false
    t.bigint "user_id", null: false
    t.bigint "lineup_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["collab_id"], name: "index_vibes_on_collab_id"
    t.index ["lineup_id"], name: "index_vibes_on_lineup_id"
    t.index ["manager_id"], name: "index_vibes_on_manager_id"
    t.index ["user_id"], name: "index_vibes_on_user_id"
  end

end
