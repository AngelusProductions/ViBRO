Rails.application.routes.draw do
  root 'vibes#index'

  devise_for :users
  resources :users, only: [:show]

  resources :vibes, only: [:index, :show, :new]

  namespace :api do
    namespace :v1 do
      post 'vibes/search', to: 'vibes#search'
      post 'users/search', to: 'users#search'
      resources :current_user, only: [:index]
      resources :users
      resources :vibes do
        resources :reactions
        resources :mixes do
          resources :ideas
        end
      end
    end
  end
end
