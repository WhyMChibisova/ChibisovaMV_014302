class Document < ApplicationRecord
  belongs_to :student

  has_one_attached :document
end
