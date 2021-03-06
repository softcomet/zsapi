class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable,
         :omniauthable, :omniauth_providers => [:facebook, :twitter, :mailchimp, :constantcontact]

  has_one :business
  accepts_nested_attributes_for :business
  has_many :locations, through: :business
  has_many :identities

  validates_presence_of :email, :encrypted_password, :first_name, :last_name
  validates_uniqueness_of :email


  after_create :create_default_business

  serialize :meta
  after_initialize { self.meta ||= {} }


 	def name
 		[first_name, last_name].join(' ')
 	end


  def find_or_create_stripe_customer(opts={})
    if stripe_id.blank?
      opts.reverse_merge!(
        email: email
      )
      stripe_customer = Stripe::Customer.create opts
      update_attribute(:stripe_id, stripe_customer.id)
    else
      stripe_customer = Stripe::Customer.retrieve stripe_id
      if opts[:source]
        stripe_customer.source = opts[:source]
        stripe_customer.save
      end
    end

    stripe_customer
  end


 	## TWITTER
 	def twitter
    @twitter ||= identities.where(provider: "twitter").first
    @twitter
  end

  def twitter_client
  	if twitter
	    @twitter_client ||= Twitter::REST::Client.new do |config|
	      config.consumer_key        = ENV['TWITTER_APP_ID']
	      config.consumer_secret     = ENV['TWITTER_APP_SECRET']
	      config.access_token        = twitter.access_token
	      config.access_token_secret = twitter.secret_token
	    end

	    @twitter_client
	  end
  end


  ## FACEBOOK
  # The facebook identity
  def facebook
    @facebook ||= identities.where(provider: "facebook").where('expires_at >= ? OR expires_at IS NULL', Time.now).first
    @facebook
  end

  # The facebook API client via Koala
  def facebook_client
    @facebook_client ||= Koala::Facebook::API.new(facebook.access_token) if facebook.access_token
    @facebook_client
  end

  # Gets the list of facebook pages
  def facebook_pages
  	begin
      @facebook_pages ||= facebook_client.get_connections('me', 'accounts') if facebook_client
      @facebook_pages
    rescue Exception => e
      facebook.destroy if facebook
    end
  end

  # Sets up a facebook page client for page posting to pages
  def facebook_page_client
  	@facebook_page_client ||= Koala::Facebook::API.new(facebook.page_token) if facebook.page_token
    @facebook_page_client
  end

  # Returns the chosen facebook page object
  def facebook_page
  	@facebook_page ||= facebook_page_client.get_object("me") if facebook_page_client
    @facebook_page
  end

  # Saves the facebook page token to the identity via page_id
  def set_facebook_page(page_id)
  	if facebook_client
  		page_access_token = facebook_client.get_page_access_token(page_id)

  		if page_access_token
	  		facebook.update_attribute(:other_token, page_access_token)
	  		facebook.update_attribute(:name, facebook_page['name'])
	  	end
	  end
  end


  ## MAILCHIMP
  def mailchimp
    @mailchimp ||= identities.where(provider: "mailchimp").where('expires_at >= ? OR expires_at IS NULL', Time.now).first
    @mailchimp
  end

  def mailchimp_client
    @mailchimp_client ||= Gibbon::API.new( mailchimp.access_token ) if mailchimp
    @mailchimp_client
  end

  def mailchimp_lists
  	@mailchimp_lists ||= mailchimp_client.lists.list(start: 0, limit: 5) if mailchimp_client
    @mailchimp_lists
  end



  ## CONSTANT CONTACT
  def constantcontact
    @constantcontact ||= identities.where(provider: "constantcontact").where('expires_at >= ? OR expires_at IS NULL', Time.now).first
    @constantcontact
  end

  def constantcontact_client
    @constantcontact_client ||= ConstantContact::Api.new( ENV['CONSTANTCONTACT_APP_ID'], constantcontact.access_token ) if constantcontact
    @constantcontact_client
  end

  def constantcontact_lists
  	@constantcontact_lists ||= constantcontact_client.get_lists if constantcontact_client
    @constantcontact_lists
  end



  def tweet(message)
    twitter_client.update(message) if twitter
  end

  def tweet_with_image(message, image)
    twitter_client.update_with_media(message, File.new(image_path)) if twitter
  end

  def post_to_facebook_page(message)
    facebook_page_client.put_wall_post(message) if facebook_page_client
  end

  def post_to_facebook_page_with_image(message, image_url)
    facebook_page_client.put_wall_post(message, picture: image_url) if facebook_page_client
  end

  def publish_to_all_social_connections(message)
    tweet(message)
    post_to_facebook_page(message)
  end


  private

    def create_default_business
      if business.blank?
        self.build_business(name: "Your ZS Business")
      end
    end

end