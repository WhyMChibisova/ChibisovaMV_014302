class Student < ApplicationRecord
  belongs_to :account, optional: true
  belongs_to :practice, optional: true
  belongs_to :teacher, optional: true
  belongs_to :organization, optional: true
  has_many :documents

  validates :last_name, :first_name, :group_number, presence: true
end
