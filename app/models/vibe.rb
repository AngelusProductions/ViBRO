class Vibe < ApplicationRecord
  validates :name, presence: true

  mount_uploader :art, VibeArtUploader, presence: true

  belongs_to :user
  belongs_to :manager
  belongs_to :lineup

  has_many :collabs
  has_many :ideas
  has_many :mixes
end
