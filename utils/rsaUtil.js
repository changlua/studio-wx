// import RSA from './wx_rsa';
// import { JSEncrypt } from "jsencrypt"
import WxmpRsa from 'wxmp-rsa'

const rsa = new WxmpRsa();

const publicKey = `
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoUa35BaU80JrXMZIOfPxKBIZqMzBe7dg7TFCp8Bn3epPMTxCeJszXwB74wc67JYED03KuMaK/KJPAql/uF487zKS/Hv3DltbVauViQSt2ti85Rf7Gj5nJbKwjQRV+2TfiRhbYVzkKP9LruWne5cKhUaHcw9GlxtrwBATO3RhtSiaXHYFErNWNVhqkWRp9I/ugJNRT6mkz2GUwY/GWRZzaFoaNVlQOYKzoq8xu1buupiB4vg5A4uTyPfCjQtsrMa4jULbQ9mqVbCmja40AX21jqN256BoXwvPSNWkRKvULs0ANQjK8ICySuE4WIo30dy7px2Thyef887KlO9cBA7wWwIDAQAB
`;

const privateKey = `
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChRrfkFpTzQmtcxkg58/EoEhmozMF7t2DtMUKnwGfd6k8xPEJ4mzNfAHvjBzrslgQPTcq4xor8ok8CqX+4XjzvMpL8e/cOW1tVq5WJBK3a2LzlF/saPmclsrCNBFX7ZN+JGFthXOQo/0uu5ad7lwqFRodzD0aXG2vAEBM7dGG1KJpcdgUSs1Y1WGqRZGn0j+6Ak1FPqaTPYZTBj8ZZFnNoWho1WVA5grOirzG7Vu66mIHi+DkDi5PI98KNC2ysxriNQttD2apVsKaNrjQBfbWOo3bnoGhfC89I1aREq9QuzQA1CMrwgLJK4ThYijfR3LunHZOHJ5/zzsqU71wEDvBbAgMBAAECggEAYuf73uX6czVIopz3rpLsUqbHFb586mKMDusm9boJ+Q65gnhyS4Ti/GBPmevVN0LJOpl6udcJZeYkjn1k1qz0sb1SZ4We/i8I1IFmM6Gq/YvuTJFoba/XkkcD/3epQ4OZk3pckFlnk7z9rUUqcaEv0oxuhSHZKNKoQiGZqdy2D2LcIra5iSsx4o8q+OkTG0D2fM8Xy0Ov4RZMKVusmncBt4NCbb/zweKg5XokOHUlV0ieE8Kqo26WzUtNwbaSsVGFDurq1LH8QnnW4e8JRIG/RQfImXNvlwkgRRAHVf0nlamSS8kzX0bu9NMibAz5aJ7xFjjVyN3Ib4+IjxZsPhWgAQKBgQDmA2ao2NLgYoRE5ibFBZ1mbaxNGnYu5PyxGl4PEisbLzO5joUEOqY1ufo3EmAHBZ7hGNwQ6pjPcoyF2BAMz3Nm7pFbTgWCtpbJJ4NU2WD5pOYsZk2tQ9zVsRTXbr6aIsU/M7PteZajUy84x0CAOGe3P6IeF6XC63tcrogrXEaXUQKBgQCzf0Iiv8HrIyCyqXuHjjVFpGVBL7oDio7+96dijM6hTYAZAH7iz9b4jtprqZ5Bt4kvsQkB8adjwJi4jDClUUXtimnLYHKeuhGM6p0k8Wr6PULpRj150QnvT7NE2SjCFHtFJkB9ALvndANg/91z/zZ76ak9/DkxVGcL3t5AbEE56wKBgHROlfOdKAykZEO+qS4JJ80qeezHC6msyoX3UkaGpltpo9sZUPORgIg8UWTVms8SLYOfIXBAYCLNxnbLiVog8DbFPaUQr8Kn91kh7MvT27CAjI847+BEJ3+6ulIxQpoIKPtLdpkHWX+eyYsJXfk4DGHiAGT9CimlD00PR/W9BEjxAoGBAJ/SMp/gH5ju6SFLWMsk6vf8XY/CIB0hFRuehPJxr1XePK2GTHRFXQJpp79vApM/CS5msj+B3GosRY8ke/fmup27vWExmj0MLa5MA+mt73OqclZkjT5Wy0LCszsdJHZSaEP0wDzNF4IJQSzwBU1QM0H3lhKz7nSm0y21niy8dwNLAoGARCxu8ataWhZPU5oFECqio4Lz5s13cl7rFPj44RHziYNXMOGdsNAYs4T2qJfIikJUIXu65N+1aJbCiFidxjS28dbXVbXJGblfq9p3fbihPTlp5j2j7QPWGXpNYg+jG4qarkO/1WgRBBYurnfBANlhdQ/0+GXRGK92rm/b3yCai+A=
`;

//加密
function encryt(txt) {
  rsa.setPublicKey(publicKey) // 设置公钥
  return rsa.encryptLong(txt, 'base64') // 对数据进行加密，采用base64编码
}

// 解密
function decrypt(txt) {
  rsa.setPrivateKey(privateKey) // 设置私钥
  return rsa.decrypt(txt, 'base64') // 对数据进行解密，采用base64编码
}

const rsaUtil = {
  encryt: encryt, //加密
  decrypt: decrypt //解密
}

module.exports = {
  ...rsaUtil
}