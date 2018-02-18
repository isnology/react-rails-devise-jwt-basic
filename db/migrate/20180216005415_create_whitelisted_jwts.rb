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
