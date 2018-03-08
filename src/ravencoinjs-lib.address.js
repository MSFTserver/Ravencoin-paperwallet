//https://raw.github.com/bitcoinjs/bitcoinjs-lib/09e8c6e184d6501a0c2c59d73ca64db5c0d3eb95/src/address.js
Ravencoin.Address = function (bytes) {
	if ("string" == typeof bytes) {
		bytes = Ravencoin.Address.decodeString(bytes);
	}
	this.hash = bytes;
};

/**
* Serialize this object as a standard currency address.
*
* Returns the address as a base58-encoded string in the standardized format.
*/
Ravencoin.Address.prototype.toString = function () {
	// Get a copy of the hash
	var hash = this.hash.slice(0);

	// Version
	var networkVersion = janin.currency.networkVersion();
	if (networkVersion instanceof Array) {
		hash = networkVersion.concat(hash);
	} else {
		hash.unshift(networkVersion);
	}
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });
	var bytes = hash.concat(checksum.slice(0, 4));
	return Ravencoin.Base58.encode(bytes);
};

Ravencoin.Address.prototype.getHashBase64 = function () {
	return Crypto.util.bytesToBase64(this.hash);
};

/**
* Parse a Ravencoin address contained in a string.
*/
Ravencoin.Address.decodeString = function (string) {
	var bytes = Ravencoin.Base58.decode(string);
	var length = bytes.length;
	var hash = bytes.slice(0, length - 4);
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });

	if (checksum[0] != bytes[length - 4] ||
			checksum[1] != bytes[length - 3] ||
			checksum[2] != bytes[length - 2] ||
			checksum[3] != bytes[length - 1]) {
		throw "Checksum validation failed!";
	}

	return hash;
};
