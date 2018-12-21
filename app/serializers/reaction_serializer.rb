class ReactionSerializer < ActiveModel::Serializer
  attributes :id, :kind, :user_id, :vibe_id

  belongs_to :vibe
  belongs_to :user
end
