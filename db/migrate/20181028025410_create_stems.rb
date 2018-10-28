class CreateStems < ActiveRecord::Migration[5.2]
  def change
    create_table :stems do |t|
      t.string :name, null: false
      t.string :audio_file, null: false

      t.belongs_to :vibe, null: false
      t.belongs_to :tree, null: false

      t.timestamps null: false
    end
  end
end
