class CreateTeachers < ActiveRecord::Migration[7.0]
  def change
    create_table :teachers do |t|
      t.string :last_name
      t.string :first_name
      t.string :patronymic
      t.float :quantity_of_hours
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
