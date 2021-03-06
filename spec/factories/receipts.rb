FactoryGirl.define do

  factory :receipt do
    redemption
		amount 					15
		purchased_on 		{ 2.days.ago }
		image 					{ fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'receipt.jpg'), 'image/jpeg') }
		status					'untouched'


		factory :receipt_approved do
			status 'approved'
		end


		factory :receipt_rejected do
			status 'rejected'
			reject_reason "You are so mean"
		end


		factory :receipt_with_location do
			before(:build) do |receipt|
				receipt.location = create(:location)
			end
		end

		factory :invalid_receipt do
			amount 					nil
			purchased_on 		nil
			image 					nil
		end
  end

end