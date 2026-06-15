export default function handler(req, res) {
  // CORS ayarları (Telefondan veya herhangi bir arayüzden kolayca çağırmak için)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // URL'den gelen semptom parametresini alıyoruz (Küçük harfe çeviriyoruz)
  const { semptom } = req.query;

  if (!semptom) {
    return res.status(400).json({ error: "Lütfen bir semptom belirtin. Örn: ?semptom=apse" });
  }

  // Kamu diş hekimliğinde en sık karşılaşılan vaka veri tabanı
  const vakaVeritabani = {
    "apse": {
      tanim: "Periapikal Apse / Akut Pulpit Kaynaklı Enfeksiyon",
      icd10: "K04.7 - Sinüssüz periapikal apse",
      recete: [
        { ilac: "Amoksisilin + Klavulanik Asit 1000 mg Tablet", doz: "2x1", sure: "7 Gün", aciklama: "Tok karnına, 12 saatte bir." },
        { ilac: "Flurbiprofen 100 mg Tablet", doz: "2x1", sure: "5 Gün", aciklama: "Tok karnına, ağrı durumunda." },
        { ilac: "Klorheksidin + Benzidamin Ağız Çalkalama Solüsyonu", doz: "3x1", sure: "7 Gün", aciklama: "Yemeklerden sonra gargara yapılacak." }
      ],
      notlar: "Hasta penisilin alerjisi belirtirse Klindamisin (600mg 2x1) veya Makrolid grubu tercih edilmelidir."
    },
    "gomulu": {
      tanim: "Gömülü Diş Operasyonu Sonrası Profilaksi ve Analjezi",
      icd10: "K01.1 - Gömülü dişler",
      recete: [
        { ilac: "Dexketoprofen 25 mg Tablet", doz: "3x1", sure: "5 Gün", aciklama: "Ağrı başladığında, tok karnına." },
        { ilac: "Klorheksidin %0.12 Sprey / Gargara", doz: "3x1", sure: "7 Gün", aciklama: "Operasyon gününden sonraki gün başlanacak." },
        { ilac: "Parasetamol 500 mg Tablet", doz: "3x1", sure: "3 Gün", aciklama: "Gerekirse, deksketoprofene ek olarak (Ateş/Hafif ağrı)." }
      ],
      notlar: "Operasyon çok komplike veya kemik turlanması yoğun ise apse reçetesindeki antibiyotik şablonu eklenebilir."
    },
    "alveolit": {
      tanim: "Alveolit (Kuru Soket) - Çekim Sonrası Komplikasyon",
      icd10: "K10.3 - Alveolit (Çekim soketi iltihabı)",
      recete: [
        { ilac: "Flurbiprofen 100 mg veya Dexketoprofen 25 mg", doz: "2x1", sure: "5 Gün", aciklama: "Şiddetli ağrı periyodu için." },
        { ilac: "Benzidamin HCl %0.15 Sprey", doz: "4x1", sure: "5 Gün", aciklama: "Bölgesel analjezi sağlamak için soket çevresine." }
      ],
      notlar: "Lokal olarak soket içi yıkanmalı ve Alveogyl/iyodoformlu gaz yerleştirilmelidir. Sistemik antibiyotik genellikle akut enfeksiyon yoksa endike değildir."
    },
    "gingivitis": {
      tanim: "Akut Marjinal Gingivitis / Periodontal Hassasiyet",
      icd10: "K05.0 - Akut gingivitis",
      recete: [
        { ilac: "Klorheksidin + Benzidamin Gargara", doz: "3x1", sure: "7 Gün", aciklama: "Diş fırçalamadan 30 dk sonra." },
        { ilac: "Parasetamol 500 mg Tablet", doz: "2x1", sure: "3 Gün", aciklama: "Hafif ağrı/hassasiyet durumunda." }
      ],
      notlar: "Detertraj ve oral hijyen eğitimi asıl tedavidir. Reçete destekleyicidir."
    }
  };

  // Gelen inputu temizleyip veritabanında arıyoruz
  const anahtar = semptom.toLowerCase().trim();
  const sonuc = vakaVeritabani[anahtar];

  if (sonuc) {
    return res.status(200).json({ status: "success", vaka: anahtar, ...sonuc });
  } else {
    return res.status(404).json({ 
      status: "error", 
      message: "Semptom bulunamadı.", 
      MevcutSemptomlar: Object.keys(vakaVeritabani) 
    });
  }
}
