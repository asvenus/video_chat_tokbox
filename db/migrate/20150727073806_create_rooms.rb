class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :session_id
      t.boolean :public, default: true
      t.integer :member_count

      t.timestamps null: false
    end
  end
end
