class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.string :kind, null: false

      t.belongs_to :user, null: false
      t.belongs_to :vibe, null: false

      t.timestamps null: false
    end
  end
end
