class Account < ApplicationRecord
  has_one :teacher, dependent: :destroy
  has_one :student, dependent: :destroy
  has_secure_password

  has_one_attached :photo

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, length: { minimum: 4 }

  enum role: %i[student teacher admin teacher_report]
end
