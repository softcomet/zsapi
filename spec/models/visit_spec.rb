require 'rails_helper'

RSpec.describe Visit, type: :model do

  describe "Validations" do
  	  before :each do
  			@visit = FactoryGirl.build(:visit)
  		end

  		it "has a valid factory" do
  			expect( FactoryGirl.build(:visit) ).to be_valid
  		end

  	# Presence
  	%w(total).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@visit.send("#{attr}=", nil)
	  		expect(@visit).not_to be_valid
		  end
	 	end
	end


	describe "Associations" do
		it { should belong_to(:customer) }
		it { should belong_to(:location) }
	end


	describe 'Methods' do
		describe '#first_visit?' do
			it 'returns true if it is the first visit' do
				v = FactoryGirl.create(:visit, total: 1)
				expect(v.first_visit?).to be truthy
			end

			it 'returns false if it is NOT the first visit' do
				v = FactoryGirl.create(:visit, total: 46)
				expect(v.first_visit?).to be falsey
			end
		end


		describe '.check_in!' do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@greeting = FactoryGirl.create(:greeting, 
					welcome_message: "Hey", 
					welcome_reward: 100, 
					welcome_wait_time: 'day'
				)
				@location = FactoryGirl.create(:location, business: @business, greeting: @greeting)
			end

			context '[Customer is new. Never exited]' do
				before :each do
					@membership = FactoryGirl.create(:membership,
						business: @business,
						customer: @customer,
						campaign: nil,
						welcome_reward_valid_at: nil,
						points: 0
					)
				end
				
				it 'returns the welcome message' do
					result = @customer.check_in_to!(@location)
					expect(result[:welcome_message]).to eq "Hey"
				end

				it 'returns the points earned (100)' do
					result = @customer.check_in_to!(@location)
					expect(result[:points_earned]).to eq 100
				end

				it 'returns a nil campaign' do
					result = @customer.check_in_to!(@location)
					expect(result[:campaign]).to be_nil
				end

				it 'adds points earned to customer' do
					result = @customer.check_in_to!(@location)
					@membership.reload
					expect(@membership.points).to eq 100
				end

				it 'does not add the points to the customer twice' do
					result = @customer.check_in_to!(@location)
					result = @customer.check_in_to!(@location)
					@membership.reload
					expect(@membership.points).to eq 100
				end
			end


			context '[Customer returned after exit]' do
				before :each do
					@business = FactoryGirl.create(:business)
					@customer = FactoryGirl.create(:customer)
					@campaign = FactoryGirl.create(:coupon)
					@greeting = FactoryGirl.create(:greeting, 
						welcome_message: "Hey", 
						welcome_reward: 100, 
						welcome_wait_time: 'day',
						campaign: @campaign
					)
					@location = FactoryGirl.create(:location, business: @business, greeting: @greeting)
					@membership = FactoryGirl.create(:membership,
						business: @business,
						customer: @customer)

					@customer.check_in_to!(@location)
					@customer.check_out_from!(@location)
				end
				
				it 'returns the exit campaign' do
					result = @customer.check_in_to!(@location)
					expect(result[:campaign]).to eq @campaign
				end

				context '[Before welcome_freq has expired]' do
					it 'does not award points' do
						@membership.welcome_reward_valid_at = DateTime.tomorrow
						@membership.save

						result = @customer.check_in_to!(@location)

						expect(result[:points_earned]).to eq 0
					end
				end

				context '[AFTER welcome_freq has expired]' do
					it 'awards 100 points' do
						@membership.welcome_reward_valid_at = Date.yesterday
						@membership.save

						result = @customer.check_in_to!(@location)

						expect(result[:points_earned]).to eq 100
					end
				end

			end
		end


		describe '.check_out!' do
			before :each do
				@business = FactoryGirl.create(:business)
				@customer = FactoryGirl.create(:customer)
				@greeting = FactoryGirl.create(:greeting, 
					welcome_message: "Hey", 
					welcome_reward: 100, 
					welcome_wait_time: 'day'
				)
				@location = FactoryGirl.create(:location, business: @business, greeting: @greeting)
				@membership = FactoryGirl.create(:membership,
					business: @business,
					customer: @customer
				)
			end

			it 'returns the exit message' do
				result = @customer.check_out_from!(@location)
				expect(result[:exit_message]).to eq "Goodbye"
			end

			it 'assigns the exit campaign' do
				result = @customer.check_out_from!(@location)

				@membership.reload
				
				expect(@membership.campaign).not_to be_nil
			end

			it 'sets the campaign expiration date' do
				result = @customer.check_out_from!(@location)

				@membership.reload

				expect(@membership.exit_campaign_expires_at.to_date).to eq 3.days.from_now.to_date
			end

			it 'returns the campaign wait time' do
				result = @customer.check_out_from!(@location)

				expect(result[:wait_time]).to eq 3.days.to_i
			end

			it 'returns the new exit campaign' do
				result = @customer.check_out_from!(@location)
				
				expect(result[:campaign]).to be_a Campaign
			end

		end

	end

end