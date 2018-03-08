ninja.wallets.singlewallet = {
	open: function () {
		if (document.getElementById("rvnaddress").innerHTML == "") {
			ninja.wallets.singlewallet.generateNewAddressAndKey();
		}
		document.getElementById("walletCommands").style.display = "block";
		document.getElementById("keyarea").style.display = "block";
		document.getElementById("currencyddl").style.display = "block";
		document.getElementById("singlearea").style.display = "block";
		document.getElementById("initBanner").style.display = "none";
	},

	close: function () {
		document.getElementById("singlearea").style.display = "none";
	},

	// generate ravencoin address and private key and update information in the HTML
	generateNewAddressAndKey: function () {
		try {
			var key = new Ravencoin.ECKey(false);
			var ravencoinAddress = key.getRavencoinAddress();
			var privateKeyWif = key.getRavencoinWalletImportFormat();
			document.getElementById("rvnaddress").innerHTML = ravencoinAddress;
			document.getElementById("rvnprivwif").innerHTML = privateKeyWif;
			var keyValuePair = {
				"qrcode_public": ravencoinAddress,
				"qrcode_private": privateKeyWif
			};
			ninja.qrCode.showQrCode(keyValuePair, 4);
		}
		catch (e) {
			// browser does not have sufficient JavaScript support to generate a ravencoin address
			alert(e);
			document.getElementById("rvnaddress").innerHTML = "error";
			document.getElementById("rvnprivwif").innerHTML = "error";
			document.getElementById("qrcode_public").innerHTML = "";
			document.getElementById("qrcode_private").innerHTML = "";
		}
	}
};
