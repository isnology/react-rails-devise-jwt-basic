class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable, :timeoutable and :omniauthable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  def jwt_payload
    { email: email }
  end

  def on_jwt_dispatch(token, payload)
    JWTBlacklist.where("exp < ?", Date.today).destroy_all
  end
end
