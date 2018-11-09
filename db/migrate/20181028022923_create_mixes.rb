class CreateMixes < ActiveRecord::Migration[5.2]
  def change
    create_table :mixes do |t|
      t.string :name
      t.integer :number, null: false
      t.integer :runtime, default: 0
      t.string :audio_file, null: false
      t.text :blurb
      t.string :art
      t.string :color
      t.integer :bpm, null: false

      t.belongs_to :vibe, null: false

      t.timestamps null: false
    end
  end
end
