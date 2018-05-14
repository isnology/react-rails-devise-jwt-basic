# How To Set Up JWT
- in the application_controller.rb change to:-
```
protect_from_forgery unless: -> { request.format.json? }
respond_to :json
```
- in app/controllers/  create an Api controller 
```
class ApiController < ActionController::API
  include ::ActionController::Serialization
  respond_to :json
end
```
- add the following gem to the top of the jem file:-
```
gem 'dotenv-rails', groups: [:development, :test]
```
- create a .env file in the application root directory
- add gems:-
```
gem 'devise-jwt', '~> 0.5.5'
gem 'active_model_serializers', '~> 0.9.7'
```
- set up devise
- in app/config/initializers/devise.rb add:-
```
Devise.setup do |config|
  # ...
  config.jwt do |jwt|
    jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
    jwt.expiration_time = 604800
  end
end
```
- do one of the following two options:-
- in app/config/initializers/devise.rb change the following (add :params_auth) if you want sessions:-
```
config.skip_session_storage = [:http_auth, :params_auth]
```
- OR    to turn all sessions off  (prefered)
- create a file called app/config/initializers/sessions_store.rb
  and add to it
```
Rails.application.config.session_store :disabled
```
- generate a new key and add to the .env file as follows:-
```
bundle exec rake secret
```
- add the entry in the .env file (where xxxxx is the new generated key):-
```
DEVISE_JWT_SECRET_KEY=xxxxxx
```
- in app/config/environments/development.rb set the following:-
```
config.eager_load = true
config.consider_all_requests_local = false
```
- create a white listed jwt file and migrate:-
```
class CreateWhitelistedJwts < ActiveRecord::Migration[5.1]
  def change
    create_table :whitelisted_jwts do |t|
      t.string :jti, null: false
      t.string :aud
      t.datetime :exp, null: false
      t.references :user, foreign_key: true
    end
    add_index :whitelisted_jwts, :jti, unique: true
  end
end
```
- change the user model to:-
```
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  include Devise::JWT::RevocationStrategies::Whitelist
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
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
```
- add the following to routes.rb
```
devise_for :users, defaults: { format: :json }
```
- add node package jwt-decode
```
yarn add jwt-decode
```
