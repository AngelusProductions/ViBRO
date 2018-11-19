Rails.application.routes.draw do
  root 'vibes#index'

  devise_for :users
  resources :users

  resources :vibes do
    resources :mixes
  end

  namespace :api do
    namespace :v1 do
      resources :current_user, only: [:index]
      resources :users
      resources :vibes do
        resources :mixes do
          resources :ideas
        end
      end
    end
  end
end
