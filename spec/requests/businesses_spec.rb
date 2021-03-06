require 'rails_helper'

RSpec.describe "Businesses", type: :feature do

  ## NO LOGGED IN
  context "when not logged in" do
    describe "GET /businesses/new" do
      it "shows the registration form" do 
        visit '/businesses/new'
        expect(page).to have_http_status(200)
        expect(page).to have_content "sign in"
      end
    end
  end
  ## END NO LOGGED IN


  context "when logged in" do
    # Login before each test
    before :each do
    	@user = FactoryGirl.create(:user)
      login_as @user, scope: :user
    end

    describe "GET /businesses/new" do
      context "[business already exists]" do
        before :each do
          @business = FactoryGirl.create(:business, user: @user)
        end

	      it "redirects to the dashboard" do 
	        visit '/businesses/new'
	        expect(page).to have_content "DASHBOARD"
	        expect(page).to have_content "You have already"
	      end
	    end

      context "[business does not exist]" do
        it "shows the form" do 
          visit '/businesses/new'
          expect(page).to have_content "Business details"
        end

        it "creates the business and location on submit" do
        	visit '/businesses/new'
      		fill_in "Name", with: "Business"
      		fill_in "Website", with: "twitter.com"
      		click_button "Submit"
        	expect(Business.last.name).to eq "Business"
        end
      end
    end


    describe "GET /business/edit" do
      before :each do
        @business = FactoryGirl.create(:business, user: @user)
        visit '/business/edit'
      end

      context '[not connected to twitter]' do
        it 'asks to connect to twitter' do
          expect(page).to have_content "Connect to twitter"
        end
      end
    end

  end

end
