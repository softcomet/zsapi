require 'csv'

class Customer < ActiveRecord::Base
	enum status: [:inactive, :active]
	has_many :memberships
	has_many :visits
	has_many :locations, through: :visits
	has_many :redemptions
	has_many :receipts, through: :redemptions

	validates_presence_of :first_name, :last_name, :email
	validates_uniqueness_of :email

	serialize :social_friends, Array

	def self.to_csv(options = {})
		CSV.generate(options) do |csv|
			csv << ["First Name","Last Name", "Email", "Points", "Status"]
			all.each do |customer|
				csv << [customer.first_name, customer.last_name, customer.email, customer.membership_for(current_user.business).points, customer.status]
			end
		end
	end


	def self.import(file, opts)
		newly_imported_customers = []

	  SmarterCSV.process(file, chunk_size: 100, key_mapping: {first: :first_name, last: :last_name}) do |chunk_row|
	  	chunk_row.each do |row|
	  		customer, is_new_to_business = Customer.find_or_create_with_membership(row.merge({business: opts[:business]}))
	  		if customer
	  			newly_imported_customers.push(customer) if is_new_to_business
	  		end
	  	end
  	end

  	newly_imported_customers
	end


	def self.find_or_create_with_membership(opts)
		# Find or create the customer
		customer = Customer.create_with(
			first_name: opts[:first_name], 
			last_name:  opts[:last_name]
		).find_or_create_by(email: opts[:email])

		# Find or create the membership
		if customer.valid?
			is_new_to_business = false

			membership = Membership.create_with(points: 0).find_or_create_by(customer: customer, business: opts[:business]) do |w|
				# The block of "find_or_create_by" only gets executed if the object is new
				# So, we set this to true so we know that it had already existed
				is_new_to_business = true
			end
			membership.increment!(:points, opts[:points]) if opts[:points] > 0

			[customer, is_new_to_business]
		else
			[false, false]
		end
	end


	def name
		[first_name, last_name].join(' ')
	end

	def name_reversed
		[last_name, first_name].join(', ')
	end

	def membership_for(business_obj)
		memberships.where(business: business_obj).first
	end

	def check_in_to!(location)
		Visit.check_in!(customer: self, location: location)
	end

	def check_out_from!(location)
		Visit.check_out!(customer: self, location: location)
	end

	def visits_for(location)
		visits.where(location: location)
	end

	def total_visits_for(location)
		visits_for(location).first.total rescue 0
	end

	def friends
		Customer.where(status: 'active', social_id: social_friends).where.not(id: id).all
	end

	def friend_feed
		Redemption.where(customer: friends.map(&:id)).to_a
	end


	private

		def self.open_csv(file)
		  if File.extname(file.original_filename) == '.csv'
		  	return CSV.read(file)
		  else
		  	raise "Unknown file type: #{file.original_filename}"
		  end
		end

end
