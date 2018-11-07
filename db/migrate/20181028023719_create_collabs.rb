class CreateCollabs < ActiveRecord::Migration[5.2]
  def change
    create_table :collabs do |t|
      t.integer :stake, default: 0

      t.belongs_to :vibe, null: false
      t.belongs_to :user, null: false
      t.belongs_to :manager, null: false

      t.timestamps null: false
    end
  end
end
