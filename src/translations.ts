export interface Translations {
  title: string;
  subtitle: string;
  langSelect: string;
  tabs: {
    explorer: string;
    descriptive: string;
    correlation: string;
    prediction: string;
  };
  indicators: {
    gdp: string;
    lifeExp: string;
    literacy: string;
    femaleLabor: string;
    urban: string;
    co2: string;
  };
  indicatorUnits: {
    gdp: string;
    lifeExp: string;
    literacy: string;
    femaleLabor: string;
    urban: string;
    co2: string;
  };
  countries: {
    TUR: string;
    IRN: string;
    AZE: string;
    SAU: string;
    EGY: string;
    ARE: string;
  };
  labels: {
    country: string;
    year: string;
    indicator: string;
    metric: string;
    value: string;
    allCountries: string;
    singleCountry: string;
    selectYear: string;
    selectIndicator: string;
    selectCountry: string;
    gdpWarning: string;
    statisticsProcess: string;
    formulaUsed: string;
    calculationDetails: string;
    resultInterpretation: string;
    mean: string;
    median: string;
    stdDev: string;
    variance: string;
    min: string;
    max: string;
    range: string;
    pearsonR: string;
    rSquared: string;
    regressionEq: string;
    slope: string;
    intercept: string;
    predictionTitle: string;
    targetYearPredict: string;
    predictedValue: string;
    stepByStep: string;
    correlationStrength: string;
    interpretationText: string;
    noData: string;
    details: string;
    nUnits: string;
    sum: string;
    sumOfSquares: string;
    sumOfProducts: string;
  };
  strengths: {
    strongPositive: string;
    moderatePositive: string;
    weakPositive: string;
    none: string;
    weakNegative: string;
    moderateNegative: string;
    strongNegative: string;
  };
  interpretations: {
    gdpLifeExp: string;
    gdpLiteracy: string;
    gdpCo2: string;
    femaleLaborUrban: string;
    generalPositive: string;
    generalNegative: string;
    generalNone: string;
  };
}

export const translations: Record<'en' | 'fa' | 'tr' | 'az', Translations> = {
  en: {
    title: "Middle East Socio-Economic Analyst",
    subtitle: "Explore, visualize, and mathematically model social and economic development indicators with interactive statistical analysis and forecasting.",
    langSelect: "Language",
    tabs: {
      explorer: "Data Explorer",
      descriptive: "Descriptive Statistics",
      correlation: "Correlation Matrix",
      prediction: "Predictive Regressions",
    },
    indicators: {
      gdp: "GDP per Capita (Constant 2015 USD)",
      lifeExp: "Life Expectancy at Birth",
      literacy: "Literacy Rate (Ages 15+)",
      femaleLabor: "Female Labor Force Participation",
      urban: "Urbanization Rate",
      co2: "CO2 Emissions per Capita",
    },
    indicatorUnits: {
      gdp: "USD",
      lifeExp: "Years",
      literacy: "%",
      femaleLabor: "%",
      urban: "% of total",
      co2: "metric tons",
    },
    countries: {
      TUR: "Turkey",
      IRN: "Iran",
      AZE: "Azerbaijan",
      SAU: "Saudi Arabia",
      EGY: "Egypt",
      ARE: "United Arab Emirates",
    },
    labels: {
      country: "Country",
      year: "Year",
      indicator: "Indicator",
      metric: "Metric",
      value: "Value",
      allCountries: "All Countries",
      singleCountry: "Single Country Focus",
      selectYear: "Select Year",
      selectIndicator: "Select Indicator",
      selectCountry: "Select Country",
      gdpWarning: "*GDP constant values adjusted to international 2015 USD rates.",
      statisticsProcess: "Statistical Calculation Process",
      formulaUsed: "Mathematical Formula",
      calculationDetails: "Step-by-Step Execution",
      resultInterpretation: "Economic Interpretation",
      mean: "Mean (\u03bc)",
      median: "Median",
      stdDev: "Standard Deviation (\u03c3)",
      variance: "Variance (\u03c3\u00b2)",
      min: "Minimum",
      max: "Maximum",
      range: "Range",
      pearsonR: "Pearson Correlation Coefficient (r)",
      rSquared: "Coefficient of Determination (R\u00b2)",
      regressionEq: "Regression Line Equation",
      slope: "Slope (\u03b2\u2081)",
      intercept: "Y-Intercept (\u03b2\u2080)",
      predictionTitle: "Trend Forecasting (Future Projection)",
      targetYearPredict: "Select Target Year to Predict",
      predictedValue: "Predicted Value",
      stepByStep: "Interactive Step-by-Step Solution",
      correlationStrength: "Correlation Strength",
      interpretationText: "Analysis Dashboard",
      noData: "No data available with specified configuration.",
      details: "Detail Level",
      nUnits: "Number of data points (N)",
      sum: "Sum (\u03a3x)",
      sumOfSquares: "Sum of Squared Deviations (\u03a3(x - \u03bcx)\u00b2)",
      sumOfProducts: "Sum of Products of Deviations (\u03a3(x - \u03bcx)(y - \u03bcy))",
    },
    strengths: {
      strongPositive: "Very Strong Positive Correlation (\u2265 0.70)",
      moderatePositive: "Moderate Positive Correlation (0.30 to 0.69)",
      weakPositive: "Weak Positive Correlation (0.01 to 0.29)",
      none: "No Correlation (0.00)",
      weakNegative: "Weak Negative Correlation (-0.01 to -0.29)",
      moderateNegative: "Moderate Negative Correlation (-0.30 to -0.69)",
      strongNegative: "Very Strong Negative Correlation (\u2264 -0.70)",
    },
    interpretations: {
      gdpLifeExp: "A strong positive connection between purchasing power (GDP per capita) and life expectancy suggests that economic success drives healthcare infrastructure investments, sanitation, and nutrition.",
      gdpLiteracy: "Higher wealth correlates heavily with literacy. In developing regimes, early capital is channeled into basic literacy, raising productivity and feeding a virtuous cycle.",
      gdpCo2: "Increased industrialization and energy production historically trigger high CO2 emissions per capita. Transitioning to clean tech is required to decouplize this relationship.",
      femaleLaborUrban: "Urbanization alters social structures. It provides specialized jobs for women, though regional cultural norms and childcare options play a major role in transition speeds.",
      generalPositive: "The selected indicators demonstrate a synchronous positive evolution. Growth in one dimension mutually reinforces progression in the other.",
      generalNegative: "An inverse relationship is shown. As one indicator grows, the other decreases; representing potential socio-economic trade-offs, transitions, or structural reforms.",
      generalNone: "A flat or chaotic scatter plot indicates low mutual linearity. These developmental metrics evolve under disparate geopolitical or market forces and do not directly map together.",
    },
  },
  fa: {
    title: "تحلیلگر شاخص‌های توسعه اجتماعی-اقتصادی خاورمیانه",
    subtitle: "کاوش، بصری‌سازی و مدل‌سازی ریاضی شاخص‌های توسعه همراه با محاسبات آماری و پیش‌بینی آینده به روش‌های تعاملی.",
    langSelect: "زبان",
    tabs: {
      explorer: "مرورگر داده‌ها",
      descriptive: "آمار توصیفی",
      correlation: "ماتریس همبستگی",
      prediction: "رگرسیون و پیش‌بینی",
    },
    indicators: {
      gdp: "تولید ناخالص داخلی سرانه (دلار ثابت ۲۰۱۵)",
      lifeExp: "امید به زندگی در بدو تولد",
      literacy: "نرخ باسوادی (سنین ۱۵ سال به بالا)",
      femaleLabor: "مشارکت زنان در نیروی کار",
      urban: "نرخ شهرنشینی",
      co2: "تولید گاز دی‌اکسید کربن سرانه",
    },
    indicatorUnits: {
      gdp: "دلار",
      lifeExp: "سال",
      literacy: "درصد",
      femaleLabor: "درصد",
      urban: "درصد از کل",
      co2: "تن متریک",
    },
    countries: {
      TUR: "ترکیه",
      IRN: "ایران",
      AZE: "آذربایجان",
      SAU: "عربستان سعودی",
      EGY: "مصر",
      ARE: "امارات متحده عربی",
    },
    labels: {
      country: "کشور",
      year: "سال",
      indicator: "شاخص",
      metric: "معیار آماری",
      value: "مقدار",
      allCountries: "همه کشورها",
      singleCountry: "تمرکز روی یک کشور",
      selectYear: "انتخاب سال",
      selectIndicator: "انتخاب شاخص",
      selectCountry: "انتخاب کشور",
      gdpWarning: "*ارزش‌های تولید ناخالص بر اساس نرخ‌های ثابت بین‌المللی سال ۲۰۱۵ محاسبه شده‌اند.",
      statisticsProcess: "روند محاسبات ریاضی و آماری",
      formulaUsed: "فرمول ریاضی استفاده شده",
      calculationDetails: "محاسبه گام‌به‌گام",
      resultInterpretation: "تفسیر اقتصادی-اجتماعی",
      mean: "میانگین (\u03b4 یا \u03bc)",
      median: "میانه",
      stdDev: "انحراف معیار (\u03c3)",
      variance: "واریانس (\u03c3\u00b2)",
      min: "حداقل",
      max: "حداکثر",
      range: "دامنه تغییرات",
      pearsonR: "ضریب همبستگی پیرسون (r)",
      rSquared: "ضریب تعیین (R\u00b2)",
      regressionEq: "معادله خط رگرسیون",
      slope: "شیب خط (\u03b2\u2081)",
      intercept: "عرض از مبدأ (\u03b2\u2080)",
      predictionTitle: "پیش‌بینی روندها (ترسیم سناریوهای آینده)",
      targetYearPredict: "سال هدف برای پیش‌بینی را انتخاب کنید",
      predictedValue: "مقدار پیش‌بینی شده",
      stepByStep: "مراحل گام‌به‌گام محاسبه",
      correlationStrength: "شدت همبستگی متغیرها",
      interpretationText: "داشبورد تحلیلی",
      noData: "داده‌ای با تنظیمات مشخص شده یافت نشد.",
      details: "سطح جزئیات",
      nUnits: "تعداد نقاط داده (N)",
      sum: "مجموع داده‌ها (\u03a3x)",
      sumOfSquares: "مجموع مجذور تفاوت‌ها (\u03a3(x - \u03bcx)\u00b2)",
      sumOfProducts: "مجموع ضرب تفاضل‌ها (\u03a3(x - \u03bcx)(y - \u03bcy))",
    },
    strengths: {
      strongPositive: "همبستگی مثبت بسیار قوی (بزرگتر مساوی ۰.۷۰)",
      moderatePositive: "همبستگی مثبت متوسط (بین ۰.۳۰ تا ۰.۶۹)",
      weakPositive: "همبستگی مثبت ضعیف (بین ۰.۰۱ تا ۰.۲۹)",
      none: "بدون همبستگی خطی (۰.۰۰)",
      weakNegative: "همبستگی منفی ضعیف (بین -۰.۰۱ تا -۰.۲۹)",
      moderateNegative: "همبستگی منفی متوسط (بین -۰.۳۰ تا -۰.۶۹)",
      strongNegative: "همبستگی منفی بسیار قوی (کوچکتر مساوی -۰.۷۰)",
    },
    interpretations: {
      gdpLifeExp: "ارتباط مثبت قوی میان قدرت خرید سرانه و امید به زندگی نشان می‌دهد افزایش درآمد باعث سرمایه‌گذاری بیشتر در زیرساخت‌های درمانی، تغذیه و بهداشت عمومی می‌شود.",
      gdpLiteracy: "افزایش ثروت با سواد جامعه ارتباط مستقیم دارد. در ساختارهای در حال توسعه، تخصیص بودجه به آموزش پایه باعث بالا رفتن بهره‌وری و ایجاد چرخه توسعه مثبت می‌شود.",
      gdpCo2: "صنعتی شدن و افزایش مصرف انرژی در مدل‌های سنتی به افزایش دی‌اکسید کربن سرانه منجر می‌شود. چرخش به فناوری‌های سبز راه حل گسست این ارتباط معکوس است.",
      femaleLaborUrban: "شهرنشینی ساختارهای سنتی را دگرگون می‌کند و فرصت‌های شغلی جدیدی برای زنان ایجاد می‌کند، هر چند هنجارهای فرهنگی و پشتیبانی از فرزندان بر سرعت توسعه اثرگذار است.",
      generalPositive: "شاخص‌های انتخاب شده یک مسیر تکاملی مثبت و هماهنگ را نشان می‌دهند. بهبود یکی باعث تقویت دیگری به صورت متقابل می‌شود.",
      generalNegative: "یک رابطه همبستگی معکوس و منفی را نشان می‌دهد. با رشد یک متغیر، متغیر دیگر کاهش می‌یابد که نشان دهنده مبادلات ساختاری یا اصلاحات در جامعه است.",
      generalNone: "پراکندگی نامنظم داده‌ها حاکی از عدم وجود یک رابطه خطی است. این شاخص‌ها مستقل از یکدیگر و تحت تاثیر فشارهای مختلف بازار یا ژئوپلیتیک تغییر می‌کنند.",
    },
  },
  tr: {
    title: "Orta Doğu Sosyo-Ekonomik Analiz Paneli",
    subtitle: "Orta Doğu ülkelerinin sosyal ve ekonomik kalkınma göstergelerini interaktif istatistiksel analizler, grafikler ve tahmin modelleri ile inceleyin.",
    langSelect: "Dil",
    tabs: {
      explorer: "Veri Gezgini",
      descriptive: "Betimsel İstatistik",
      correlation: "Korelasyon Matrisi",
      prediction: "Regresyon ve Öngörü",
    },
    indicators: {
      gdp: "Kişi Başına GSYİH (Sabit 2015 USD)",
      lifeExp: "Doğumda Beklenen Yaşam Süresi",
      literacy: "Okuryazarlık Oranı (15+ Yaş)",
      femaleLabor: "Kadın İşgücüne Katılım Oranı",
      urban: "Kentleşme Oranı",
      co2: "Kişi Başına CO2 Emisyonu",
    },
    indicatorUnits: {
      gdp: "USD",
      lifeExp: "Yıl",
      literacy: "%",
      femaleLabor: "%",
      urban: "% (toplam)",
      co2: "metrik ton",
    },
    countries: {
      TUR: "Türkiye",
      IRN: "İran",
      AZE: "Azerbaycan",
      SAU: "Suudi Arabistan",
      EGY: "Mısır",
      ARE: "Birleşik Arap Emirlikleri",
    },
    labels: {
      country: "Ülke",
      year: "Yıl",
      indicator: "Gösterge",
      metric: "Metrik",
      value: "Değer",
      allCountries: "Tüm Ülkeler",
      singleCountry: "Tek Ülke Odaklı",
      selectYear: "Yıl Seç",
      selectIndicator: "Gösterge Seç",
      selectCountry: "Ülke Seç",
      gdpWarning: "*GSYİH değerleri 2015 yılı sabit uluslararası USD bazına göre ayarlanmıştır.",
      statisticsProcess: "İstatistiksel Hesaplama Süreci",
      formulaUsed: "Matematiksel Formül",
      calculationDetails: "Adım Adım Hesaplama",
      resultInterpretation: "Ekonomik Değerlendirme",
      mean: "Ortalama (\u03bc)",
      median: "Medyan (Ortanca)",
      stdDev: "Standart Sapma (\u03c3)",
      variance: "Varyans (\u03c3\u00b2)",
      min: "Minimum",
      max: "Maksimum",
      range: "Genişlik (Ranj)",
      pearsonR: "Pearson Korelasyon Katsayısı (r)",
      rSquared: "Belirleme Katsayısı (R\u00b2)",
      regressionEq: "Regresyon Doğrusu Denklemi",
      slope: "Eğim (\u03b2\u2081)",
      intercept: "Y-Ekseni Kesim Noktası (\u03b2\u2080)",
      predictionTitle: "Eğilim Tahmini (Gelecek Projeksiyonu)",
      targetYearPredict: "Tahmin için Hedef Yıl Seçin",
      predictedValue: "Tahmin Edilen Değer",
      stepByStep: "Ayrıntılı Adım Adım Çözüm",
      correlationStrength: "Korelasyon Gücü",
      interpretationText: "Analiz Paneli",
      noData: "Belirtilen yapılandırmada veri mevcut değil.",
      details: "Detay Seviyesi",
      nUnits: "Veri noktası sayısı (N)",
      sum: "Toplam (\u03a3x)",
      sumOfSquares: "Kare Sapmalar Toplamı (\u03a3(x - \u03bcx)\u00b2)",
      sumOfProducts: "Sapmalar Çarpım Toplamı (\u03a3(x - \u03bcx)(y - \u03bcy))",
    },
    strengths: {
      strongPositive: "Çok Güçlü Pozitif Korelasyon (\u2265 0.70)",
      moderatePositive: "Orta Düzeyde Pozitif Korelasyon (0.30 - 0.69)",
      weakPositive: "Zayıf Pozitif Korelasyon (0.01 - 0.29)",
      none: "İlişki Yok (0.00)",
      weakNegative: "Zayıf Negatif Korelasyon (-0.01 - -0.29)",
      moderateNegative: "Orta Düzeyde Negatif Korelasyon (-0.30 - -0.69)",
      strongNegative: "Çok Güçlü Negatif Korelasyon (\u2264 -0.70)",
    },
    interpretations: {
      gdpLifeExp: "Satın alma gücü (kişi başı GSYİH) ve yaşam süresi arasındaki güçlü pozitif ilişki, ekonomik refahın sağlık altyapısına, temiz suya ve beslenmeye daha fazla yatırım sağladığını gösterir.",
      gdpLiteracy: "Yüksek zenginlik doğrudan okuryazarlık seviyesini olumlu etkiler. Gelişmekte olan ülkelerde ilk sermaye eğitime harcanarak üretkenliği ve kalkınmayı tetikler.",
      gdpCo2: "Tarihsel olarak sanayileşme ve yüksek enerji kullanımı, kişi başına düşen CO2 emisyonunu artırır. Bu döngüyü kırmak için yeşil teknolojilerin adaptasyonu gerekmektedir.",
      femaleLaborUrban: "Kentleşme geleneksel toplumsal yapıları değiştirir, kadınlara yeni iş olanakları sunar. Ancak bölgesel kültürel normlar ve kreş olanakları bu değişim hızını etkiler.",
      generalPositive: "Seçilen göstergeler eş zamanlı pozitif bir gelişim sergilemektedir. Bir alandaki iyileşme diğer boyutu da olumlu yönde desteklemektedir.",
      generalNegative: "Ters bir ilişki gözlenmektedir. Bir gösterge artarken diğeri azalmaktadır; bu durum yapısal değişimleri, ödünleşimleri veya radikal reformları yansıtabilir.",
      generalNone: "Düzensiz dağılım doğrusal bir ilişkinin olmadığını gösterir. Bu iki kalkınma metriği birbirlerinden bağımsız, farklı piyasa veya jeopolitik koşullar altında gelişmektedir.",
    },
  },
  az: {
    title: "Yaxın Şərq Sosial-İqtisadi Analiz Portalı",
    subtitle: "Yaxın Şərq regionuna dair sosial və iqtisadi göstəriciləri interaktiv statistik riyazi hesablamalar, qrafiklər və proqnoz modelləri ilə araşdırın.",
    langSelect: "Dil",
    tabs: {
      explorer: "Məlumat Bələdçisi",
      descriptive: "Təsviri Statistika",
      correlation: "Korrelasiya Matrisi",
      prediction: "Reqressiya və Proqnoz",
    },
    indicators: {
      gdp: "Adambaşına düşən ÜDM (Sabit 2015 USD)",
      lifeExp: "Doğulanda gözlənilən ömür uzunluğu",
      literacy: "Savadlılıq səviyyəsi (15+ yaş)",
      femaleLabor: "Qadın işçi qüvvəsinin iştirak dərəcəsi",
      urban: "Urbanizasiya (şəhərləşmə) səviyyəsi",
      co2: "Adambaşına düşən CO2 emissiyası",
    },
    indicatorUnits: {
      gdp: "USD",
      lifeExp: "İl",
      literacy: "%",
      femaleLabor: "%",
      urban: "% (ümumi)",
      co2: "metrik ton",
    },
    countries: {
      TUR: "Türkiyə",
      IRN: "İran",
      AZE: "Azərbaycan",
      SAU: "Səudiyyə Ərəbistanı",
      EGY: "Misir",
      ARE: "Birləşmiş Ərəb Əmirlikləri",
    },
    labels: {
      country: "Ölkə",
      year: "İl",
      indicator: "Göstərici",
      metric: "Statistik meyar",
      value: "Qiymət",
      allCountries: "Bütün Ölkələr",
      singleCountry: "Tək Ölkə Fokuslu",
      selectYear: "İl Seçin",
      selectIndicator: "Göstərici Seçin",
      selectCountry: "Ölkə Seçin",
      gdpWarning: "*ÜDM rəqəmləri 2015-ci ilin sabit beynəlxalq dollar məzənnələrinə uyğunlaşdırılmışdır.",
      statisticsProcess: "Statistik Hesablama Prosesi",
      formulaUsed: "Riyazi Formul",
      calculationDetails: "Addım-Addım Hesablama",
      resultInterpretation: "İqtisadi Şərh",
      mean: "Orta qiymət (\u03bc)",
      median: "Mediana",
      stdDev: "Standart meyl (\u03c3)",
      variance: "Dispersiya (\u03c3\u00b2)",
      min: "Minimum",
      max: "Maksimum",
      range: "Variasiya diapazonu (Ranc)",
      pearsonR: "Pirson Korrelasiya Əmsalı (r)",
      rSquared: "Determinasiya Əmsalı (R\u00b2)",
      regressionEq: "Reqressiya Xəttinin Tənliyi",
      slope: "Meyl (\u03b2\u2081)",
      intercept: "Y-oxunu kəsmə nöqtəsi (\u03b2\u2080)",
      predictionTitle: "Trendin Proqnozlaşdırılması (Gələcək layihə)",
      targetYearPredict: "Proqnoz üçün Hədəf İli Seçin",
      predictedValue: "Proqnozlaşdırılan Qiymət",
      stepByStep: "Ətraflı Addım-Addım Riyazi İzah",
      correlationStrength: "Korrelasiya gücü",
      interpretationText: "Analiz Paneli",
      noData: "Göstərilən konfiqurasiyaya uyğun məlumat yoxdur.",
      details: "Detallıq Səviyyəsi",
      nUnits: "Məlumat nöqtələrinin sayı (N)",
      sum: "Cəm (\u03a3x)",
      sumOfSquares: "Kvadrat uzaqlaşmaların cəmi (\u03a3(x - \u03bcx)\u00b2)",
      sumOfProducts: "Uzaqlaşmaların hasili cəmi (\u03a3(x - \u03bcx)(y - \u03bcy))",
    },
    strengths: {
      strongPositive: "Çox Güclü Müsbət Korrelasiya (\u2265 0.70)",
      moderatePositive: "Mütənasib Müsbət Korrelasiya (0.30 - 0.69)",
      weakPositive: "Zəif Müsbət Korrelasiya (0.01 - 0.29)",
      none: "Əlaqə yoxdur (0.00)",
      weakNegative: "Zəif Mənfi Korrelasiya (-0.01 - -0.29)",
      moderateNegative: "Mütənasib Mənfi Korrelasiya (-0.30 - -0.69)",
      strongNegative: "Çok Güclü Mənfi Korrelasiya (\u2264 -0.70)",
    },
    interpretations: {
      gdpLifeExp: "Alıcılıq qabiliyyəti (adambaşına düşən ÜDM) ilə ömür uzunluğu arasındakı güclü müsbət əlaqə göstərir ki, iqtisadi tərəqqi səhiyyə infrastrukturuna, sanitar və qida təhlükəsizliyinə investisiyaları artırır.",
      gdpLiteracy: "Yüksək rifah savadlılıq səviyyəsinə birbaşa təsir edir. İnkişaf etməkdə olan ölkələrdə fəal kapital ilkin olaraq təhsilə yatırılaraq məhsuldarlığı artırır.",
      gdpCo2: "Sənayeləşmə və yüksək enerji istifadəsi adambaşına düşən CO2 emissiyasını kəskin artırır. Bu əlaqəni aradan qaldırmaq üçün yaşıl texnologiyalara keçid vacibdir.",
      femaleLaborUrban: "Şəhərləşmə sosial mühiti dəyişir və qadınlar üçün yeni iş imkanları açır, lakin regional mədəniyyət və bağça xidmətləri bu prosesin sürətinə təsir edir.",
      generalPositive: "Seçilmiş göstəricilər paralel olaraq müsbət inkişaf nümayiş etdirir. Bir sahədəki irəliləyiş digər sahədə də təkamülü dəstəkləyir.",
      generalNegative: "Tərs əlaqə müşahidə olunur. Bir göstərici artdıqca digəri azalır, bu da struktur islahatlarını yaxud regional seçim prioritetlərini əks etdirə bilər.",
      generalNone: "Qeyri-bərabər paylanma xətti əlaqənin olmadığını göstərir. Bu inkişaf göstəriciləri bir-birindən asılı olmayaraq müxtəlif bazar və geosiyasi şərtlər altında formalaşır.",
    },
  },
};
