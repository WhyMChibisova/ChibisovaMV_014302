class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :last_name
      t.string :first_name
      t.string :patronymic
      t.string :group_number
      t.string :status
      t.references :account, null: false, foreign_key: true
      t.references :practice, foreign_key: true
      t.references :teacher, foreign_key: true
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
