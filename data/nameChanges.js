var namechanges = [
	"Bank/building society",
	"Electoral roll",
	"GP surgery",
	"Specialist medical services (e.g. GICs)",
	"Employer/educational institution",
	"DWP",
	"HMRC",
	"Local council",
	"Electricity, gas, water, phone suppliers",
	"Internet service provider",
	"Website hosting / DNS provider",
	"Pension provider",
	"Insurance provider (home, car, health, life)",
	"Mortgage provider",
	"Mobile phone network",
	"Landlord/letting agent",
	"Other people's emergency contact information",
	"Driving licence",
	"Passport",
	"Social media profiles",
	"Email accounts",
	"Instant message accounts"
];

function initNameChanges ()
{
	for (var i in namechanges)
	{
		var changeEl = $("<li></li>");
		changeEl.append($("<input type='checkbox' id='c" + i + "' />"));
      	changeEl.append($("<label for='c" + i + "'>" + namechanges[i] + "</label>"));
		$('#nameChanges').append(changeEl);
	}
}

initScripts.push(initNameChanges);