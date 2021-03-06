require 'rails_helper'

RSpec.describe Campaign, type: :model do

  describe "Validations" do
    before :each do
  		@campaign = FactoryGirl.build(:campaign)
  	end

  	it "has a valid factory" do
  		expect( FactoryGirl.build(:campaign) ).to be_valid
  	end

  	# Presence
  	%w(type_of title discount_amount discount_type start_at).each do |attr|
	  	it "validates presence of #{attr}" do
	  		@campaign.send("#{attr}=", nil)
	  		expect(@campaign).not_to be_valid
		  end
	 	end

	 	it 'requires reward_cost to be greater than 0 if type_of is reward' do
	 		coupon_without_cost = FactoryGirl.build(:coupon, reward_cost: 0)
	 		reward_without_cost = FactoryGirl.build(:reward, reward_cost: 0)

	 		expect(coupon_without_cost).to be_valid
	 		expect(reward_without_cost).not_to be_valid
		end
	end


	describe 'Associations' do
		it { should have_and_belong_to_many :locations }
		it { should belong_to :schedule }
		# it { should have_many :redemptions }
	end


	describe 'Methods' do
		describe '#locations_string' do
			it 'returns the list of location separated by comma' do
				campaign = FactoryGirl.create(:campaign)
				FactoryGirl.create(:location, title: 'Grass', campaigns: [campaign])
				FactoryGirl.create(:location, title: 'Ball', campaigns: [campaign])
				FactoryGirl.create(:location, title: 'Fit', campaigns: [campaign])
				FactoryGirl.create(:location, title: 'No Campaign')

				campaign.reload

				expect(campaign.locations_string).to eq "Ball, Fit, Grass"
			end

			it 'return None if applicable' do
				campaign = FactoryGirl.create(:campaign)

				campaign.reload

				expect(campaign.locations_string).to eq "None"
			end
		end


		describe 'most_popular_location' do
			context '[has redemptions for location]' do
				it 'returns the most popular location' do
					customer = FactoryGirl.create(:customer)
					campaign = FactoryGirl.create(:campaign)
					most_popular_location = FactoryGirl.create(:location, campaigns: [campaign])
					other_location = FactoryGirl.create(:location, campaigns: [campaign])
					FactoryGirl.create_list(:redemption, 2, customer: customer, campaign: campaign, location: other_location)
					FactoryGirl.create_list(:redemption, 5, customer: customer, campaign: campaign, location: most_popular_location)

					expect(campaign.most_popular_location.title).to eq most_popular_location.title
				end
			end

			context '[does not have a redemption for location]' do
				it 'returns nil' do
					customer = FactoryGirl.create(:customer)
					campaign = FactoryGirl.create(:campaign)
					most_popular_location = FactoryGirl.create(:location, campaigns: [campaign])
					other_location = FactoryGirl.create(:location, campaigns: [campaign])

					expect(campaign.most_popular_location).to be_nil
				end
			end
		end
	end


	describe 'Scopes' do
		it '#active' do
			FactoryGirl.create(:active_campaign)
			FactoryGirl.create(:inactive_campaign)
			expect(Campaign.active.size).to eq 1
		end

		it '#inactive' do
			FactoryGirl.create(:active_campaign)
			FactoryGirl.create(:inactive_campaign)
			expect(Campaign.inactive.size).to eq 1
		end

		it '#featured' do
			FactoryGirl.create(:featured_campaign)
			FactoryGirl.create(:active_campaign)
			expect(Campaign.featured.size).to eq 1
		end


		describe 'Campaign.[type]' do
			before :each do
				FactoryGirl.create(:coupon)
				FactoryGirl.create(:reward)
				FactoryGirl.create(:special)
			end
			
			it '.coupons' do
				expect(Campaign.coupon.size).to eq 1
			end

			it '.reward' do
				expect(Campaign.reward.size).to eq 1
			end

			it '.special' do
				expect(Campaign.special.size).to eq 1
			end
		end
	end



	describe 'Schedule Scopes' do

		describe '.valid_for(date)' do
			before :each do
				# Create a default schedule that will stay in the DB
				# FactoryGirl.create(:schedule)
				@campaign = FactoryGirl.build(:active_campaign, start_at: "2015-01-01".to_date)
			end

			context '[Every monday]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_every_monday)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-15".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-22".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-23".to_date).size).to eq 0
				end
			end

			context '[every other monday]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_every_other_monday)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-15".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-08".to_date).size).to eq 0
				end
			end

			context '[every tue and thur]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_every_tue_and_thur)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-09".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-18".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-19".to_date).size).to eq 0
				end
			end

			context '[always]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_always)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-03".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-05".to_date).size).to eq 1
				end
			end

			context '[first day of month]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_first_day_of_month)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-08-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-09-02".to_date).size).to eq 0
				end
			end

			context '[Last day of the month]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_last_day_of_month)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-30".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-07-31".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-08-29".to_date).size).to eq 0
				end
			end

			context '[every day except sunday]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_every_day_except_sunday)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-05".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-07".to_date).size).to eq 0
				end
			end

			context '[months with 5 weeks]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_months_with_5_weeks)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-06-29".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-07-30".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-03-28".to_date).size).to eq 0
				end
			end

			context '[when tue is first day of month]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_when_tue_is_first_day_of_month)
					@campaign.update_attribute(:schedule, sched)
					expect(Campaign.valid_for("2015-09-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-12-01".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-06-01".to_date).size).to eq 0
				end
			end

			context '[may 6th through 8th]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_always)
					FactoryGirl.create(:active_campaign, schedule: sched, start_at: "2015-05-06".to_date, end_at: "2015-05-08".to_date)
					expect(Campaign.valid_for("2015-05-06".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-05-07".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-05-08".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-05-09".to_date).size).to eq 0
				end
			end

			context '[may 5th only]' do
				it 'is valid' do
					sched = FactoryGirl.create(:sched_always)
					FactoryGirl.create(:active_campaign, schedule: sched, start_at: "2015-05-05".to_date, end_at: "2015-05-05".to_date )
					expect(Campaign.valid_for("2015-05-05".to_date).size).to eq 1
					expect(Campaign.valid_for("2015-05-04".to_date).size).to eq 0
					expect(Campaign.valid_for("2015-05-06".to_date).size).to eq 0
				end
			end
		end
	end

end