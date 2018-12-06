class Mix < ApplicationRecord
  validates :number, presence: true, numericality: true
  validates :audio_file, presence: true
  validates :bpm, presence: true, numericality: true

  mount_uploader :audio_file, AudioFileUploader, presence: true

  belongs_to :vibe
  has_many :ideas
end
