Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
  post '/auth/login', to: 'authentication#login'

  get '/current_user/index/:page', to: 'notes#index'
  post '/current_user/notes', to: 'notes#create'
  get '/current_user/notes/:note_id', to: 'notes#show'
  post '/current_user/notes/:note_id/update', to: 'notes#update'
  post '/current_user/notes/:note_id/delete', to: 'notes#delete'
  get '/*a', to: 'application#not_found'

end
