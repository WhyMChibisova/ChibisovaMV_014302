Rails.application.routes.draw do
  get 'search/organizations'
  get 'search/students'
  get 'search/teachers'
  resources :documents
  resources :students
  resources :teachers
  resources :practices
  get 'sessions/create'
  resources :accounts
  resources :organizations
  resources :sessions, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
