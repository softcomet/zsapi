require 'rails_helper'

RSpec.describe Api::V1::CustomersController, type: :controller do
  before(:each) { controller.stub(:api_key_valid?).and_return(true) }

  # POST /sign_in
  describe 'POST #sign_in' do
    context '[Customer email exists]' do
      before :each do
        @customer = FactoryGirl.create(:inactive_customer)
        post :sign_in, version: 1, customer: FactoryGirl.attributes_for(:facebook_customer, email: @customer.email, social_friends: [1,2,3])
      end
      
      it 'finds the customer and updates the information' do
        @customer.reload
        expect(@customer.active?).to be_truthy
      end

      it 'saved the friend IDs' do
        @customer.reload
        expect(@customer.social_friends).to eq ["1","2","3"]
      end

      it 'returns 200 ok' do
        expect(response.status).to eq 200
      end

      it 'returns the customer object' do
        expect(response).to be_singular_resource
      end
    end

    context '[Customer email does not exist]' do
      before :each do
        post :sign_in, version: 1, customer: FactoryGirl.attributes_for(:facebook_customer, email: 'doesnt@exist.com')
      end

      it 'creates a new customer' do
        expect(Customer.all.count).to eq 1
      end

      it 'returns 200 ok' do
        expect(response.status).to eq 200
      end
    end
  end


  # POST /sign_out
  describe 'POST #sign_out' do
    context '[Customer token exists]' do
      before :each do
        @customer = FactoryGirl.create(:facebook_customer)
        controller.stub(:current_customer).and_return(@customer)
        post :sign_out, version: 1
      end
      
      it 'finds the customer and removes the token' do
        @customer.reload
        expect(@customer.social_token).to be_nil
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Customer token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_customer, social_token: nil)
        controller.stub(:current_customer).and_return(@customer)
        post :sign_out, version: 1
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end


  # POST /notification_token
  describe 'POST #notification_token' do
    context '[Customer social token exists]' do
      before :each do
        @customer = FactoryGirl.create(:facebook_customer, ios_token: 'AAA')
        controller.stub(:current_customer).and_return(@customer)
        post :notification_token, version: 1, notification_token: 'BBB', device_type: 'ios'
      end
      
      it 'finds the customer and replaces the token' do
        @customer.reload
        expect(@customer.ios_token).to eq 'BBB'
      end

      it 'returns true' do
        expect(response.status).to eq 200
      end
    end

    context '[Customer social token does not exist]' do
      before :each do
        FactoryGirl.create(:facebook_customer, social_token: nil)
        post :notification_token, version: 1, notification_token: 'BBB', device_type: 'ios'
      end

      it 'returns an error' do
        expect(response).to be_api_error
      end
    end
  end


  # POST /customers/check_in
  describe 'POST #check_in' do
    it "returns the JSON data" do
      customer = FactoryGirl.create(:facebook_customer)
      controller.stub(:current_customer).and_return(customer)
      business = FactoryGirl.create(:business, :with_location)
      location = business.locations.first

      post :check_in, version: 1, location_id: location.id

      expect(response).to be_singular_resource
    end
  end


  # POST /customers/check_out
  # Receive: [location_id]
  # Return: [
  #   welcome_message,
  #   points_earned,
  #   special_campaign
  # ]
  describe 'POST #check_out' do
    it "returns the JSON data" do
      customer = FactoryGirl.create(:facebook_customer)
      controller.stub(:current_customer).and_return(customer)
      business = FactoryGirl.create(:business, :with_location)
      location = business.locations.first

      post :check_out, version: 1, location_id: location.id

      expect(response).to be_singular_resource
    end
  end


  # GET /profile
  # Receive: -
  # Return: JSON [customer_data]
  describe 'GET #show' do
    context '[Customer social token exists]' do
      it 'returns the customer object' do
        @customer = FactoryGirl.create(:facebook_customer)
        controller.stub(:current_customer).and_return(@customer)
        get :show, version: 1
        expect(response).to be_singular_resource
      end
    end

    context '[Customer social token does not exist]' do
      it 'returns an error' do
        @customer = FactoryGirl.create(:facebook_customer, social_token: nil)
        controller.stub(:current_customer).and_return(nil)
        get :show, version: 1
        expect(response).to be_api_error
      end
    end
  end


  # GET /visits
  # Receive: -
  # Return: JSON [customer.friends.redemption_data]
  describe 'GET #visits' do
    context '[Customer social token exists]' do
      it 'returns the customers locations visited' do
        business = FactoryGirl.create(:business, :with_image)
        business2 = FactoryGirl.create(:business)

        customer = FactoryGirl.create(:facebook_customer)
        customer2 = FactoryGirl.create(:facebook_customer)

        FactoryGirl.create(:membership, business: business, customer: customer, points: 500)
        FactoryGirl.create(:membership, business: business2, customer: customer, points: 1500)

        FactoryGirl.create(:membership, business: business, customer: customer2, points: 700)
        FactoryGirl.create(:membership, business: business2, customer: customer2, points: 1700)
        
        location_with_2_visits = FactoryGirl.create(:location, business: business)
        location_with_3_visits = FactoryGirl.create(:location, business: business)
        
        location2_with_3_visits = FactoryGirl.create(:location, business: business2)
        
        2.times { customer.check_in_to!(location_with_2_visits) }
        3.times { customer.check_in_to!(location_with_3_visits) }
        
        3.times { customer.check_in_to!(location2_with_3_visits) }
        
        3.times { customer2.check_in_to!(location2_with_3_visits) }

        controller.stub(:current_customer).and_return(customer2)

        
        get :visits, version: 1
        expect(response).to be_collection_resource
      end
    end
  end


end