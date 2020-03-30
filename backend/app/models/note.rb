class Note < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: {maximum: 2048}
end
