class VibeSerializer < ActiveModel::Serializer
  attributes :id, :name, :blurb, :art, :mixes

  belongs_to :user
  belongs_to :manager
  belongs_to :lineup

  has_many :collabs
  has_many :ideas
  has_many :mixes

end
