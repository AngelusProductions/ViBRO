class MixSerializer < ActiveModel::Serializer
  attributes :id, :name, :number, :runtime, :audio_file, :blurb, :color, :bpm, :ideas

  belongs_to :vibe

  has_many :ideas
end
