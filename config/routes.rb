Rails.application.routes.draw do
  root 'vibes#index'
  devise_for :users
  resources :users
  resources :vibes

  namespace :api do
    namespace :v1 do
      resources :users
      resources :vibes
    end
  end
end
