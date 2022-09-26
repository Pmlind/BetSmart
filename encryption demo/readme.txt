yo I think I found a way to encrypt passwords using cryptographic hash function
I just learn from 465 (Cyber Defense) last thursday. So I used the function from 
the CryptoJS cource code to encrypt anything as you can test them in the demo.
My idea is before storing a user's password, we can encrypt them first; and when a user 
log in, we can just compare the encrypted password from user's input with the one
in the database. As I know so far the encrypted stuff with SHA-256 are impossible 
to decrypt or crack so if a user forgot their password just let them make another one
to replace the old one.
Nhat
FYI yall can learn more from here: https://cryptojs.gitbook.io/docs/