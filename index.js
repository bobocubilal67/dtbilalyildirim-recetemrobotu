module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const { semptom } = req.query;

  if (!semptom) {
    return res.status(400).json({ error: "Lutfen bir semptom belirtin. Orn: ?semptom=apse" });
  }

  const vakaVeritabani = {
    "apse": {
      tanim: "Periapikal Apse / Akut Pulpit Kaynakli Enfeksiyon",
      icd10: "K04.7 - Sinussuz periapikal apse",
      recete: [
        { ilac: "Amoksisilin + Klavulanik Asit 1000 mg Tablet", doz: "2x1", sure: "7 Gun", aciklama: "Tok karnina, 12 saatte bir." },
        { ilac: "Flurbiprofen 100 mg Tablet", doz: "2x1", sure: "5 Gun", aciklama: "Tok karnina, agri durumunda." },
        { ilac: "Klorheksidin + Benzidamin Agiz Calkalama Solusyonu", doz: "3x1", sure: "7 Gun", aciklama: "Yemeklerden sonra gargara yapilacak." }
      ],
      notlar: "Hasta penisilin alerjisi belirtirse Klindamisin (600mg 2x1) veya Makrolid grubu tercih edilmelidir."
    },
    "gomulu": {
      tanim: "Gomulu Dis Operasyonu Sonrasi Profilaksi ve Analjezi",
      icd10: "K01.1 - Gomulu disler",
      recete: [
        { ilac: "Dexketoprofen 25 mg Tablet", doz: "3x1", sure: "5 Gun", aciklama: "Agri basladiginda, tok karnina." },
        { ilac: "Klorheksidin %0.12 Sprey / Gargara", doz: "3x1", sure: "7 Gun", aciklama: "Operasyon gununden sonraki gun baslanacak." },
        { ilac: "Parasetamol 500 mg Tablet", doz: "3x1", sure: "3 Gun", aciklama: "Gerekirse, deksketoprofene ek olarak (Ates/Hafif agri)." }
      ],
      notlar: "Operasyon cok komplike veya kemik turlanmasi yogun ise apse recetesindeki antibiyotik sablonu eklenebilir."
    },
    "alveolit": {
      tanim: "Alveolit (Kuru Soket) - Cekim Sonrasi Komplikasyon",
      icd10: "K10.3 - Alveolit (Cekim soketi iltihabi)",
      recete: [
        { ilac: "Flurbiprofen 100 mg veya Dexketoprofen 25 mg", doz: "2x1", sure: "5 Gun", aciklama: "Siddetli agri periyodu icin." },
        { ilac: "Benzidamin HCl %0.15 Sprey", doz: "4x1", sure: "5 Gun", aciklama: "Bolgesel analjezi saglamak icin soket cevresine." }
      ],
      notlar: "Lokal olarak soket ici yikanmali ve Alveogyl/iyodoformlu gaz yerlestirilmelidir. Sistemik antibiyotik genellikle akut enfeksiyon yoksa endike degildir."
    },
    "gingivitis": {
      tanim: "Akut Marjinal Gingivitis / Periodontal Hassasiyet",
      icd10: "K05.0 - Akut gingivitis",
      recete: [
        { ilac: "Klorheksidin + Benzidamin Gargara", doz: "3x1", sure: "7 Gun", aciklama: "Dis fircalamadan 30 dk sonra." },
        { ilac: "Parasetamol 500 mg Tablet", doz: "2x1", sure: "3 Gun", aciklama: "Hafif agri/hassasiyet durumunda." }
      ],
      notlar: "Detertraj ve oral hijyen egitimi asil tedadir. Recete destekleyicidir."
    }
  };

  const anahtar = semptom.toLowerCase().trim();
  const sonuc = vakaVeritabani[anahtar];

  if (sonuc) {
    return res.status(200).json({ status: "success", vaka: anahtar, ...sonuc });
  } else {
    return res.status(404).json({ 
      status: "error", 
      message: "Semptom bulunamadi.", 
      MevcutSemptomlar: Object.keys(vakaVeritabani) 
    });
  }
};
