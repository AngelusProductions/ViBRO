class CreateLineups < ActiveRecord::Migration[5.2]
  def change
    create_table :lineups do |t|
      t.string :name, null: false
      t.text :blurb
      t.string :art
      t.integer :waves, default: 0

      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
