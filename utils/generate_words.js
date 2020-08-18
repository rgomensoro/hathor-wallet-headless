/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { wallet } from '@hathor/wallet-lib';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16
const ENCRYPTION_KEY = '01031978010319780103197801031978'
let iv = crypto.randomBytes(IV_LENGTH);

const words = wallet.generateWalletWords()
console.log(words);

var mykey = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY,iv);
var mystr = mykey.update(words)

mystr = Buffer.concat([mystr, mykey.final()]);

var mycriptstr = (iv.toString('hex') + ':' + mystr.toString('hex'));

console.log(mycriptstr);

let textParts = mycriptstr.split(':');
let div = Buffer.from(textParts.shift(), 'hex');
let encryptedText = Buffer.from(textParts.join(':'), 'hex');
let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), div);
let decrypted = decipher.update(encryptedText);

decrypted = Buffer.concat([decrypted, decipher.final()]);

console.log(decrypted.toString());


