class CreateManagers < ActiveRecord::Migration[5.2]
  def change
    create_table :managers do |t|
      t.integer :stake, default: 100

      t.belongs_to :vibe
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
