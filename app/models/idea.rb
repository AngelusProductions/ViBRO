class Idea < ApplicationRecord
  validates :name, presence: true
  validates :type, presence: true

  belongs_to :vibe
  belongs_to :user
end
