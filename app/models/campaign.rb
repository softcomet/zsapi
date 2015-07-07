class Campaign < ActiveRecord::Base
	CT_COUPON = 0
	CT_REWARD = 1
	CT_SPECIAL = 2
	DT_AMOUNT = 0
	DT_PERCENT = 1

  belongs_to :schedule
  has_and_belongs_to_many :locations

  validates_presence_of :type_of, :title, :discount_amount, :discount_type, :start_at

  has_attached_file :image, :styles => { :medium => "500x500" }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  scope :active, 		-> { where(status: true) }
  scope :inactive, 	-> { where(status: false) }
  scope :featured, 	-> { where(featured: true) }
  scope :coupons,   -> { where(type_of: Campaign::CT_COUPON) }
  scope :rewards,   -> { where(type_of: Campaign::CT_REWARD) }
  scope :specials,  -> { where(type_of: Campaign::CT_SPECIAL) }
  scope :valid_for, ->(date) {
  	# Add '99' (the last day criteria) to the query if 'date.day' is equal to the last day of the month
  	add_last_day = (date.day == date.end_of_month.day) ? Schedule::LAST_DAY : nil

		includes(:schedule).where("
			( start_at <= ? AND (end_at IS NULL OR end_at >= ? ) )
			AND schedules.days_of_week && '{0, ?}'::INT[]
			AND schedules.weeks_of_month && '{0, ?}'::INT[]
			AND schedules.day_numbers && ?::INT[]",
			date,
			date,
			date.wday + 1,
			date.week_of_month,
			'{' + [0, date.day, add_last_day].compact.join(',') + '}'
		).references(:schedule)
  }


  def locations_string
    if locations.size > 0
      locations.order('title ASC').map(&:title).join(', ')
    else
      "None"
    end
  end

end
