class AddGroupNumberStartDateEndDateToPractices < ActiveRecord::Migration[7.0]
  def change
    add_column :practices, :group_number, :string
    add_column :practices, :start_date, :date
    add_column :practices, :end_date, :date
  end
end
