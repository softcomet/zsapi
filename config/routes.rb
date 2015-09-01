Rails.application.routes.draw do

  if Rails.env.development? || Rails.env.test?

    concern :datable do
      member do
        get 'dated/:start_date/(:end_date)', as: 'dated', constraints: {start_date: /\d{4}-\d{2}-\d{2}/, end_date: /\d{4}-\d{2}-\d{2}/}
      end
    end


    # Beacons
    get   '/beacon/:key',     to: 'beacons#new',      as: 'new_beacon'
    post  '/beacon/:key',     to: 'beacons#create',   as: 'beacons'
    get   '/beacon/success',  to: 'beacons#success',  as: 'beacon_success'

    # Businesses
    get '/business', to: 'businesses#edit', as: 'edit_business'
    resources :businesses, only: [:new, :create, :update]

    # Customers
    get  '/customers/:status/(:export)', to: 'customers#index',   as: 'customers',  constraints: {status: /(all|active|inactive)/}, defaults: {status: 'all'}
    post '/customers/import',            to: 'customers#import',  as: 'import_customers'

    # Greetings
    resources :greetings, except: [:show]


    # All Receipts
    resources :receipts, only: [:index, :show]

    # All Campaigns
    get '/campaigns/(:type)/(:status)', to: 'campaigns#index',  as: 'campaigns',    constraints: {status: /(all|featured|active|inactive|upcoming)/, type: /(all|coupon|reward|special)/}, defaults: {status: 'all', type: 'all'}
    get '/campaigns/new/:type',         to: 'campaigns#new',    as: 'new_campaign', constraints: {type: /(coupon|reward|special)/}, defaults: {type: 'coupon'}
    resources :campaigns, except: [:index, :new]

    # Locations and Locationable Routes
    resources :locations do
      get   '/payment/success', to: 'payments#success',   as: 'payment_success'
      get   '/payment/:id',     to: 'payments#show',      as: 'payment', constraints: { id: /[0-9]+/ }
      get   '/payment/new',     to: 'payments#new',       as: 'new_payment'
      post  '/payment/new',     to: 'payments#create',    as: 'payments'
      patch '/confirm',         to: 'locations#confirm',  as: 'confirm'

      # Locationable routes
      get '/campaigns/(:type)/(:status)', to: 'campaigns#index',  as: 'campaigns',    constraints: {status: /(all|featured|active|inactive|upcoming)/, type: /(all|coupon|reward|special)/}, defaults: {status: 'all', type: 'all'}
      resources :campaigns, only: :show
      resources :receipts, only: :index, concerns: :datable, action: :index
    end


    # Users
    devise_for :users, skip: [:sessions], controllers: {
      confirmations:  'users/confirmations',
      registrations:  'users/registrations',
      omniauth_callbacks: 'omniauth_callbacks'
    }

    devise_scope :user do
      get '/users/login'     => 'devise/sessions#new',     as: :new_user_session
      post '/users/login'    => 'devise/sessions#create',  as: :user_session
      delete '/users/logout' => 'devise/sessions#destroy', as: :destroy_user_session

      get '/users/auth/:provider/upgrade' => 'omniauth_callbacks#upgrade', as: :user_omniauth_upgrade
      get '/users/auth/:provider/setup'   => 'omniauth_callbacks#setup'
    end

    # Admins
    devise_for :admins

    namespace :admin do
      root 'pages#dashboard'
      resources :receipts, only: [:index, :update, :destroy]
    end

    # Root
    root 'pages#dashboard'
  end


  ## API
  namespace :api do
    api versions: 1, module: "v1" do
      post '/customers/sign_in',            to: 'customers#sign_in'
      post '/customers/sign_out',           to: 'customers#sign_out'
      post '/customers/notification_token', to: 'customers#notification_token'
      get '/customers/profile',             to: 'customers#show'
      get '/customers/feed',                to: 'customers#feed'

      get '/locations/:id',                     to: 'locations#show'
      # get '/locations/:id/campaigns',           to: 'locations#fetch_campaigns'
      get '/locations/near/:lat|:lon',          to: 'locations#fetch_nearby' # Fetch nearest 20 beacons. Similar to fetch map, but return top 20 by proximity
      get '/locations/map/:lat|:lon|:distance', to: 'locations#fetch_map'

      post '/receipts',           to: 'receipts#create'
      get  '/receipts/:status',   to: 'receipts#index'

      resources :redemptions, only: [:index, :create]
      resources :share_links, only: [:show, :create]

      # get '/locations/:location_id/campaigns', to: 'campaigns#index'

      # post '/campaigns/:id/redeem', to: 'campaigns#redeem'

    end
  end

end
