class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  include Devise::JWT::RevocationStrategies::Whitelist
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  
  has_many :whitelisted_jwts

  def jwt_payload
    { email: email }
  end

  def on_jwt_dispatch(token, payload)
    WhitelistedJwt.where(user: self.id).where("exp < ?", Date.today).destroy_all
    super
  end
end
