class CreateVibes < ActiveRecord::Migration[5.2]
  def change
    create_table :vibes do |t|
      t.string :name, null: false
      t.string :art
      t.text :blurb
      t.integer :fire, default: 0
      t.integer :ice, default: 0

      t.belongs_to :collab
      t.belongs_to :manager, null: false
      t.belongs_to :user, null: false
      t.belongs_to :lineup

      t.timestamps null: false
    end
  end
end
