<?php 
$title = "";
$menuActive = "dash";
include('header.php'); ?>


	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color4">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Your Dashboard</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->

	<!-- PROFILE PROGRESS start -->
	<div class="profile-progress">
		<div class="container">
			<div class="profile-progress-head text-center">
				<span><img src="img/ico_finger.png" alt=""/></span>
				<em>Let's Get Started!</em>
			</div>
	
			<div class="profile-progress-bar hidden-xs">
				<h5>25% Done</h5>
				<span>
					<em></em>
				</span>
			</div>

			<div class="profile-progress-list">
				<ul>
					<li class="active">Update Your Profile</li>
					<li>Create a Campaign</li>
					<li>Confirm Locations</li>
					<li>Update Notifications</li>
					<li>Publish Account</li>
				</ul>
			</div>

		</div>
	</div>
	<!-- PROFILE PROGRESS end -->

	<div class="container">

		<!-- CAMPAIGN HEADER start -->
		<div class="row content-head">
			<div class="col-md-4 col-sm-12">
				<h4>Today's Campaigns</h4>
			</div>
			<div class="col-md-4 col-sm-6 newCampaignContainer"> 
				<a href="#new-campaign-popup" data-effect="mfp-zoom-in" class="new-cap open-popup-link">New Campaign</a>
			</div>
			<div class="col-md-4 col-sm-6">

				<select class="fullWidth" >
		          <option value="Trenton RD">Trenton RD</option>
		          <option value="Texas">Texas</option>
		          <option value="Alaska">Alaska</option>
		          <option value="Newyork">Newyork</option>
		        </select>
				
			</div>
		</div>
		<!-- CAMPAIGN HEADER end -->

		<!-- CAMPAIGN CONTENT start -->
		<div class="campaign-wrap">
			<div class="grid">
				<div class="grid-item">
					<div class="cw-wrap">
						<div class="badge bg-color2">Coupon</div>
						<img src="img/camp/1.jpg" class="img-responsive" alt=""/>
						<div class="cw-info text-center">
							<h3>50% OFF Coffee</h3>
							<p><span>2</span> uses today</p>
							<a href="newCoupon.php"></a>
						</div>
					</div>
				</div>
				<div class="grid-item">
					<div class="cw-wrap">
						<div class="badge bg-color3">Featured</div>
						<img src="img/camp/2.jpg" class="img-responsive" alt=""/>
						<div class="cw-info text-center">
							<h3>Free Coffee<br>& Donuts</h3>
							<p><span>2</span> uses today</p>
							<a href="newCampaign.php"></a>
						</div>
					</div>
				</div>
				<div class="grid-item">
					<div class="cw-wrap">
						<div class="badge bg-color4">Reward</div>
						<img src="img/camp/3.jpg" class="img-responsive" alt=""/>
						<div class="cw-info text-center">
							<h3>Military Discount</h3>
							<p><span>2</span> uses today</p>
							<a href="newCampaign.php"></a>
						</div>
					</div>
				</div>
				<div class="grid-item">
					<div class="cw-wrap">
						<img src="img/camp/4.jpg" class="img-responsive" alt=""/>
						<div class="cw-info text-center">
							<h3>Buy 2 for 1</h3>
							<p><span>2</span> uses today</p>
							<a href="newCampaign.php"></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row content-head">
			<div class="col-md-12">
				<a href="campaigns.php" class="more-cap pull-right">View All Campaigns</a>
			</div>
		</div>
		<!-- CAMPAIGN CONTENT End -->
	</div>

	<!-- GRAPH / CHART Start -->
	<div class="graph-wrap">
		<div class="container">

			<!-- ACTIVITY Start -->
			<div class="row content-head">
				<div class="col-md-4">
					<h4>Today's Activity</h4>
				</div>
				<div class="col-md-8">
					<ul class="camp-stats">
						<li class="active"><span>25</span> Active Campaigns</li>
						<li class="redemptions"><span>15</span> Redemptions</li>
						<li class="visits"><span>108</span> Visits</li>
					</ul>
				</div>
			</div>
			<!-- ACTIVITY End -->

			<!-- ANALYSIS Start -->
			<div class="row">
				<div class="col-md-12">
					<div class="campaign-analysis">
						<ul>
							<li class="ups campaigns"><span>+111</span> New Campaigns</li>
							<li class="downs visitors"><span>100%</span> New Visitors</li>
							<li class="ups redemptions"><span>+999</span> New Redemptions</li>
							<li class="downs sales"><span>100%</span> New Sales</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- ANALYSIS End -->

			<div class="row chart-wrap">

				<!-- AREA CHART Start -->
				<div class="col-md-7">
					<div id="area-chart"></div>
				</div>
				<!-- AREA CHART End -->

				<!-- PIE/DONUT CHART Start -->
				<div class="col-md-5">
					<div id="pie-chart" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
				</div>
				<!-- PIE/DONUT CHART End -->
			</div>
		</div>

		<!-- NEW CAMPAIGNS POPUP! -->

		<div id="new-campaign-popup" class="white-popup mfp-hide new-campaign ro">
			<span class="title">Select a Campaign</span>

		  	<div>
		  		<a href="newCoupon.php">
		  			<img class="percent" src="img/percent.png">
		  			<h4>New Coupon</h4>
		  			<span>Ex: Get 10% Off an Item</span>
		  		</a>
		  	</div>

		  	<div>
		  		<a href="newCampaign.php">
		  			<img class="cup" src="img/cup.png">
		  			<h4>New Reward</h4>
		  			<span>Ex: Redeem your points</span>
		  		</a>
		  	</div>

		  	<div class="last">
		  		<a href="newCoupon.php">
		  			<img class="star" src="img/star.png">
		  			<h4>New Special</h4>
		  			<span>Ex: Half-Price Wednesdays</span>
		  		</a>
		  	</div>
		</div>
		<!-- NEW CAMPAIGNS POPUP end -->
	</div>
	<!-- GRAPH / CHART End -->
<?php include('footer.php');?>
