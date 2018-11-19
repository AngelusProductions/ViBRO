class Idea < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :time, presence: true

  belongs_to :user
  belongs_to :vibe
  belongs_to :mix
end
