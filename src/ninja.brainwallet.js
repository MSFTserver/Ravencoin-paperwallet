ninja.wallets.brainwallet = {
	open: function () {
		document.getElementById("brainarea").style.display = "block";
		document.getElementById("brainpassphrase").focus();
		document.getElementById("brainwarning").innerHTML = ninja.translator.get("brainalertpassphrasewarning");
	},

	close: function () {
		document.getElementById("brainarea").style.display = "none";
	},

	minPassphraseLength: 15,

	view: function () {
        document.getElementById("brainerror").innerHTML = "";

		var key = document.getElementById("brainpassphrase").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
		document.getElementById("brainpassphrase").value = key;
		var keyConfirm = document.getElementById("brainpassphraseconfirm").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
		document.getElementById("brainpassphraseconfirm").value = keyConfirm;

		if (key == keyConfirm || document.getElementById("brainpassphraseshow").checked) {
			// enforce a minimum passphrase length
			if (key.length >= ninja.wallets.brainwallet.minPassphraseLength) {
				var bytes = Crypto.SHA256(key, { asBytes: true });
				var rvnKey = new Ravencoin.ECKey(bytes);
				var ravencoinAddress = rvnKey.getRavencoinAddress();
				var privWif = rvnKey.getRavencoinWalletImportFormat();
				document.getElementById("brainrvnaddress").innerHTML = ravencoinAddress;
				document.getElementById("brainrvnprivwif").innerHTML = privWif;
				ninja.qrCode.showQrCode({
					"brainqrcodepublic": ravencoinAddress,
					"brainqrcodeprivate": privWif
				});
				document.getElementById("brainkeyarea").style.visibility = "visible";
			}
			else {
                document.getElementById("brainerror").innerHTML = ninja.translator.get("brainalertpassphrasetooshort");
				ninja.wallets.brainwallet.clear();
			}
		}
		else {
			document.getElementById("brainerror").innerHTML = ninja.translator.get("brainalertpassphrasedoesnotmatch");
			ninja.wallets.brainwallet.clear();
		}
	},

	clear: function () {
		document.getElementById("brainkeyarea").style.visibility = "hidden";
	},

	showToggle: function (element) {
		if (element.checked) {
			document.getElementById("brainpassphrase").setAttribute("type", "text");
			document.getElementById("brainpassphraseconfirm").style.visibility = "hidden";
			document.getElementById("brainlabelconfirm").style.visibility = "hidden";
		}
		else {
			document.getElementById("brainpassphrase").setAttribute("type", "password");
			document.getElementById("brainpassphraseconfirm").style.visibility = "visible";
			document.getElementById("brainlabelconfirm").style.visibility = "visible";
		}
	}
};
