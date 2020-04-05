Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
  post '/api/login', to: 'authentication#login'
  post '/api/register', to: 'users#create'

  get 'api/current_user/index/:page', to: 'notes#index'
  post 'api/current_user/notes', to: 'notes#create'
  get 'api/current_user/notes/:note_id', to: 'notes#show'
  put 'api/current_user/notes/:note_id', to: 'notes#update'
  delete 'api/current_user/notes/:note_id', to: 'notes#delete'
  get '/*a', to: 'application#not_found'

end
