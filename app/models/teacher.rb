class Teacher < ApplicationRecord
  belongs_to :account
  has_many :students
end
