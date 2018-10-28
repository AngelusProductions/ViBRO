class CreateMixes < ActiveRecord::Migration[5.2]
  def change
    create_table :mixes do |t|
      t.string :name
      t.integer :number, null: false
      t.string :audio_file, null: false
      t.text :blurb
      t.string :art
      t.string :color
      t.integer :fire, default: 0
      t.integer :ice, default: 0

      t.belongs_to :vibe, null: false

      t.timestamps null: false
    end
  end
end
