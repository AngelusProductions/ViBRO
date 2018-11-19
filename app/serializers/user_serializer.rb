class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :bio, :pro_pic

  has_many :vibes
  has_many :lineups

  def fullname
    if object.last_name
      "#{object.user.first_name} #{object.user.last_name}"
    end
  end

end
