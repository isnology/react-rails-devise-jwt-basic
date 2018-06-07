Rails.application.routes.draw do
  root 'init#index'

  devise_for :users, defaults: { format: :json }

  namespace :api, defaults: { format: :json } do
    #resources :instruments, only: [:index, :show, :create, :update]
  
    #resources :panels, only: [:index, :show, :create, :update, :destroy]
  end

  get '*path', to: 'init#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
