class CreateJwtBlacklist < ActiveRecord::Migration[5.1]
  def change
    create_table :jwt_blacklist do |t|
      t.string :jti
      t.datetime :exp
    end
    add_index :jwt_blacklist, :jti
  end
end
