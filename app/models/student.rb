class Student < ApplicationRecord
  belongs_to :account
  belongs_to :practice
  belongs_to :teacher
  belongs_to :organization
end
