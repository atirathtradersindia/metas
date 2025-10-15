import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import rice_packing from "../assets/rice_packing.jpg";
import rice_varities from "../assets/rice_varities.jpg";
import sella_diff from "../assets/sella_diff.jpg";
import rice_mills from "../assets/rice_mills.jpg";
import light_dark from "../assets/light_dark.jpg";
import diff_raw_steam from "../assets/diff_raw_steam.jpg";
import mill from "../assets/mill.jpg";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      title: "Indian Rice Varieties for Export: From Premium Basmati to Mass-Market Rice",
      excerpt: "India is the world’s leading exporter of rice, offering premium basmati and affordable non-basmati varieties. Learn about the best options for retail, wholesale, and catering.",
      content: (
        <>
          <p>India is the world’s leading exporter of rice, supplying both premium basmati rice and affordable non-basmati rice to global markets. Whether you are importing rice for retail, wholesale, restaurants, or institutional supply, choosing the right variety is crucial. Each type of rice has unique qualities that make it suitable for different customers.</p>
          <p>In this guide, we break down the most popular Indian rice varieties for export, categorized into Premium, Mid-Segment, and Mass-Market options.</p>
          <h2>Premium Basmati Varieties</h2>
          <h3>1. 1121 Basmati Rice</h3>
          <ul>
            <li>Average grain length: 8.30–8.40 mm (before cooking)</li>
            <li>Elongation ratio: 2.0–2.5x after cooking</li>
            <li>Known as the longest grain basmati rice in the world</li>
            <li>Exceptional elongation after cooking, rich aroma, and delicate taste</li>
            <li>Preferred by luxury retail brands, five-star hotels, and fine dining restaurants</li>
          </ul>
          <h3>2. 1718 Basmati Rice</h3>
          <ul>
            <li>Average grain length: 8.30–8.40 mm (before cooking)</li>
            <li>Elongation ratio: 1.8–2.0x after cooking</li>
            <li>Closely matches 1121 in aroma and cooking style</li>
            <li>Slightly shorter in grain but more economical</li>
            <li>Gaining popularity in both retail packs and wholesale export markets</li>
          </ul>
          <h3>3. 1401 Basmati Rice</h3>
          <ul>
            <li>Average grain length: 7.60–7.80 mm</li>
            <li>Elongation ratio: 2.0–2.4x after cooking</li>
            <li>Moderate grain length and aroma</li>
            <li>Well-suited for bulk exports, catering, and everyday retail packs</li>
          </ul>
          <h2>Mid-Segment Basmati Varieties</h2>
          <h3>1. 1509 Basmati Rice</h3>
          <ul>
            <li>Average grain length: 8.30–8.40 mm (before cooking)</li>
            <li>Elongation ratio: 2.2–2.7x after cooking</li>
            <li>Lighter grain than 1121 but still aromatic</li>
            <li>Widely exported due to its balance of price and quality</li>
            <li>Popular among restaurants, catering services, and mid-value retailers</li>
          </ul>
          <h3>2. PUSA Basmati</h3>
          <ul>
            <li>Average grain length: 7.40–7.50 mm (before cooking)</li>
            <li>Elongation ratio: 2.0–2.4x after cooking</li>
            <li>Earlier developed variety of basmati</li>
            <li>Offers good aroma and cooking performance at a lower price point</li>
            <li>Used by economy retail brands and mid-range restaurants</li>
          </ul>
          <h2>Mass-Market / Economy Rice Varieties</h2>
          <h3>1. Sugandha Rice</h3>
          <ul>
            <li>Average grain length: 7.80–8.00 mm</li>
            <li>Elongation ratio: 1.7–2.2x after cooking</li>
            <li>Aromatic non-basmati rice, often marketed as a basmati alternative</li>
            <li>Very popular in bulk supply, mid-tier restaurants, and catering businesses</li>
          </ul>
          <h3>2. Taj Rice</h3>
          <ul>
            <li>Average grain length: 8.00–8.10 mm</li>
            <li>Elongation ratio: 1.8–2.0x after cooking</li>
            <li>Budget-friendly non-basmati variety</li>
            <li>Commonly used in household consumption, small retailers, and catering</li>
          </ul>
          <h3>3. RH10 Rice</h3>
          <ul>
            <li>Average grain length: 7.30–7.50 mm</li>
            <li>Elongation ratio: 1.8–2.0x after cooking</li>
            <li>Low-cost non-basmati rice</li>
            <li>Primarily exported for institutional catering, foodservice, and wholesale</li>
          </ul>
          <h3>4. Sharbati Rice</h3>
          <ul>
            <li>Average grain length: 7.00–7.10 mm</li>
            <li>Elongation ratio: 1.8–2.0x after cooking</li>
            <li>Non-basmati, long-grain rice with mild aroma</li>
            <li>Affordable choice for households, retail brands, and foodservice</li>
          </ul>
          <h3>5. PR 11/14 Rice</h3>
          <ul>
            <li>Average grain length: 6.70–6.90 mm</li>
            <li>Elongation ratio: 1.7–1.9x after cooking</li>
            <li>Non-basmati, medium-quality grains</li>
            <li>Used in canteens, mid-budget catering, and wholesale supply</li>
          </ul>
          <h3>6. PR 106/47 Rice</h3>
          <ul>
            <li>Average grain length: 6.30–6.50 mm</li>
            <li>Elongation ratio: 1.7–1.9x after cooking</li>
            <li>Entry-level budget rice variety</li>
            <li>Primarily used in labor camps, institutional catering, and mass meal programs</li>
          </ul>
          <h2>Why Buyers Choose Indian Rice?</h2>
          <ul>
            <li><strong>Quality & Aroma:</strong> Indian basmati rice is globally recognized for its aroma and long grains.</li>
            <li><strong>Wide Range:</strong> From luxury basmati to budget non-basmati, there’s a variety for every market.</li>
            <li><strong>Strong Export Network:</strong> India has a well-established supply chain ensuring timely delivery worldwide.</li>
          </ul>
          <h2>Conclusion</h2>
          <p>If you are planning to import rice from India, understanding the differences between rice varieties can help you select the right type for your target customers. While 1121, 1718, and 1401 Basmati serve the premium market, 1509 and PUSA Basmati cater to mid-segment buyers, and Sugandha, Taj, RH10, Sharbati, PR 11/14, and PR 106/47 provide cost-effective solutions for the mass market.</p>
          <p>By sourcing the right variety, importers and distributors can maximize customer satisfaction while staying competitive in price and quality.</p>
        </>
      ),
      image: rice_varities,
      thumbnail: `${rice_varities}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "Rice Packaging Buyer Guide",
      excerpt: "Choosing the right packaging for rice exports is key to quality and branding. Explore options like PP woven, non-woven, jute, BOPP laminated, and LDPE pouches.",
      content: (
        <>
          <h2>1. PP (Polypropylene Woven Bags)</h2>
          <ul>
            <li><strong>Structure:</strong> Made of woven polypropylene tapes.</li>
            <li><strong>Strength:</strong> High tensile strength, tear resistant, good for heavy loads (5–50 kg).</li>
            <li><strong>Moisture Resistance:</strong> Moderate, can allow some air exchange unless laminated.</li>
            <li><strong>Printing:</strong> Flexographic printing possible, but limited graphics.</li>
            <li><strong>Recyclability:</strong> Fully recyclable.</li>
            <li><strong>Common Use:</strong> Standard bulk rice packaging (25/50 kg).</li>
          </ul>
          <h2>2. Non-Woven Bags</h2>
          <ul>
            <li><strong>Structure:</strong> Fabric made from spun-bonded polypropylene fibers (not woven).</li>
            <li><strong>Strength:</strong> Lighter weight, less tensile strength compared to woven PP.</li>
            <li><strong>Moisture Resistance:</strong> Better than jute, but lower than laminated BOPP/LDPE.</li>
            <li><strong>Printing:</strong> High-quality multicolor printing possible.</li>
            <li><strong>Recyclability:</strong> Recyclable, considered more eco-friendly than plastic film bags.</li>
            <li><strong>Common Use:</strong> Retail packs (5–10 kg), promotional packs.</li>
          </ul>
          <h2>3. Jute Bags</h2>
          <ul>
            <li><strong>Structure:</strong> Natural fiber from jute plant, woven into fabric.</li>
            <li><strong>Strength:</strong> Very strong, breathable, good for large capacities.</li>
            <li><strong>Moisture Resistance:</strong> Poor against water, absorbs moisture.</li>
            <li><strong>Printing:</strong> Limited to simple stenciling or basic ink printing.</li>
            <li><strong>Recyclability:</strong> 100% biodegradable and compostable.</li>
            <li><strong>Common Use:</strong> Traditional bulk packaging, premium or export branding where sustainability is emphasized.</li>
          </ul>
          <h2>4. BOPP (Biaxially Oriented Polypropylene) Laminated Bags</h2>
          <ul>
            <li><strong>Structure:</strong> PP woven bag laminated with a printed BOPP film layer.</li>
            <li><strong>Strength:</strong> Combines strength of PP woven + barrier of BOPP film.</li>
            <li><strong>Moisture Resistance:</strong> Excellent, protects against humidity and spillage.</li>
            <li><strong>Printing:</strong> High-definition rotogravure printing (multicolor, photographic).</li>
            <li><strong>Recyclability:</strong> Technically recyclable, though multilayer separation is a challenge.</li>
            <li><strong>Common Use:</strong> Branded rice packaging (5–25 kg), retail and export markets.</li>
          </ul>
          <h2>5. LDPE (Low Density Polyethylene) Pouches</h2>
          <ul>
            <li><strong>Structure:</strong> Film-based pouches made from LDPE, can be mono-layer or multi-layer.</li>
            <li><strong>Strength:</strong> Flexible, but weaker mechanical strength compared to woven bags. Suited for smaller packs.</li>
            <li><strong>Moisture Resistance:</strong> Excellent barrier to moisture and dust.</li>
            <li><strong>Printing:</strong> High-quality multicolor printing possible.</li>
            <li><strong>Recyclability:</strong> Recyclable depending on mono/multi-layer structure.</li>
            <li><strong>Common Use:</strong> Retail packs (1–5 kg), vacuum packing, stand-up pouches.</li>
          </ul>
          <h2>Recommended Packaging by Pack Size</h2>
          <h3>1–5 kg (Retail / Premium Packs):</h3>
          <ul>
            <li><strong>Best Options:</strong> LDPE Pouches / Stand-up Pouches, BOPP Laminated Bags</li>
            <li><strong>Why:</strong> Excellent moisture barrier, strong shelf appeal, high-quality printing. Suitable for supermarkets and branded retail.</li>
            <li><strong>Notes:</strong> LDPE allows zipper/vacuum options. BOPP gives premium look with strength.</li>
          </ul>
          <h3>5–25 kg (Retail / Semi-Bulk Packs):</h3>
          <ul>
            <li><strong>Best Options:</strong> BOPP Laminated Bags, Non-Woven Bags</li>
            <li><strong>Why:</strong> Good balance between strength and branding. BOPP for premium retail/export, non-woven for cost-effective mid-market.</li>
            <li><strong>Notes:</strong> This range is the fastest-growing in modern trade.</li>
          </ul>
          <h3>25–50 kg (Bulk / Wholesale Packs):</h3>
          <ul>
            <li><strong>Best Options:</strong> PP Woven Bags, Jute Bags</li>
            <li><strong>Why:</strong> High strength, cost-effective, practical for bulk handling. Jute is eco-premium and used in select export markets, while PP is standard for global bulk movement.</li>
            <li><strong>Notes:</strong> Branding is limited here, focus is on durability and cost.</li>
          </ul>
          <h2>Summary</h2>
          <ul>
            <li><strong>PP woven:</strong> Best for bulk, economical.</li>
            <li><strong>Non-woven:</strong> Mid-range, light, attractive.</li>
            <li><strong>Jute:</strong> Eco-friendly, premium image.</li>
            <li><strong>BOPP laminated:</strong> Strong + best print quality, retail branding.</li>
            <li><strong>LDPE pouch:</strong> Small retail packs, strong moisture barrier.</li>
          </ul>
          <h2>Summary with Cost Logic</h2>
          <ul>
            <li><strong>Lowest cost:</strong> PP woven (bulk commodity packs).</li>
            <li><strong>Mid cost:</strong> Non-woven & LDPE (retail focus).</li>
            <li><strong>Premium:</strong> BOPP laminated (best branding) and Jute (eco-premium image).</li>
          </ul>
        </>
      ),
      image: rice_packing,
      thumbnail: `${rice_packing}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "White Sella vs. Creamy Sella Basmati Rice: What’s the Difference?",
      excerpt: "Discover the differences between White Sella and Creamy Sella Basmati Rice, from processing to market preferences, to choose the right variant for your needs.",
      content: (
        <>
          <p>In the world of premium long-grain rice, Basmati holds a distinctive position for its unique aroma, extra-long grains, and non-sticky post-cooking texture. Among its many variants, Sella Basmati Rice—also known as parboiled Basmati—comes in two popular forms: White Sella and Creamy Sella.</p>
          <p>Though both are produced using the same parboiling process, they differ in appearance, processing, and market preferences. Here’s a comprehensive breakdown to help you choose the right variant for your market or kitchen.</p>
          <h2>What Is Sella (Parboiled) Basmati Rice?</h2>
          <p>Sella Basmati Rice is made by parboiling paddy rice (in husk) before milling. This process:</p>
          <ul>
            <li>Hardens the grain</li>
            <li>Retains more nutrients</li>
            <li>Enhances shelf life</li>
            <li>Improves elongation during cooking</li>
            <li>Depending on the steam intensity and drying method, the rice takes on a white or creamy/golden color.</li>
          </ul>
          <h2>Which One Should You Choose?</h2>
          <h3>Choose White Sella Basmati Rice if:</h3>
          <ul>
            <li>You need rice for branded packaging or private labels</li>
            <li>Your market prefers bright, white grains with polished finish</li>
            <li>You’re targeting modern retailers and fine dining</li>
          </ul>
          <h3>Choose Creamy Sella Basmati Rice if:</h3>
          <ul>
            <li>You cater to traditional cuisines like biryani, pulao, or mandi</li>
            <li>You’re exporting to Gulf, East Africa, or Central Asia</li>
            <li>You want a richer, authentic appearance and aroma</li>
          </ul>
          <h2>From the Exporter’s Desk</h2>
          <p>At Shree Krishna Rice Mills, we supply both White Sella and Creamy Sella Basmati Rice with:</p>
          <ul>
            <li>Consistent extra-long grain size</li>
            <li>Double sorting & polishing</li>
            <li>Certified quality</li>
            <li>Custom packing (1kg to 50kg)</li>
          </ul>
          <p>We understand that even small differences in grain appearance or cooking behaviour matter greatly to regional markets — and we help our buyers match the right variety to their customer expectations.</p>
          <h2>Final Thoughts</h2>
          <p>Both White Sella and Creamy Sella Basmati offer exceptional quality, aroma, and grain length. The right choice depends on your target market, cooking application, and branding requirements.</p>
          <p>Work with an experienced supplier who understands the nuances of international rice preferences — and can deliver consistency, batch after batch.</p>
        </>
      ),
      image: sella_diff,
      thumbnail: `${sella_diff}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "Rice Mills – EU Certified Basmati Rice Exporter from India",
      excerpt: "Learn how Shree Krishna Rice Mills ensures EU-compliant Basmati rice exports with top quality, certifications, and reliable supply for European markets.",
      content: (
        <>
          <p>When it comes to importing Basmati rice into European Union (EU) countries, buyers are expected to comply with some of the strictest food safety and quality regulations in the world. As an EU-certified Basmati rice exporter from India, Shree Krishna Rice Mills (SKRM) meets and exceeds those standards — delivering premium long-grain Basmati rice to buyers across Europe with full regulatory compliance.</p>
          <p>Whether you are a food importer, distributor, retail brand, or private-label business in the EU, partnering with SKRM ensures quality assurance, legal compliance, and commercial reliability.</p>
          <h2>About SIEA Rice Mills</h2>
          <p>Shree Krishna Rice Mills (SKRM) is a leading manufacturer and exporter of premium-grade Indian Basmati rice, located in Karnal, Haryana — the heartland of India’s Basmati cultivation.</p>
          <p>With over 25 years of experience in milling and exporting rice, we specialize in:</p>
          <ul>
            <li>1121 Basmati Rice (White Sella, Creamy Sella, Steam, Raw)</li>
            <li>1509, 1718, Sugandha, and Sharbati rice varieties</li>
            <li>Custom packaging solutions for retail, wholesale, and foodservice</li>
            <li>Private label manufacturing for international brands</li>
            <li>EU Certification & Compliance</li>
          </ul>
          <h2>What makes SKRM EU-compliant?</h2>
          <p>To export food products into the EU, suppliers must meet comprehensive requirements around food safety, traceability, packaging, and pesticide residue limits (MRLs). At SKRM, we strictly comply with:</p>
          <ul>
            <li>European Commission food safety regulations</li>
            <li>Maximum Residue Limits (MRL) set by EFSA (European Food Safety Authority)</li>
            <li>EU traceability and labeling norms</li>
            <li>GMP & HACCP-certified processing</li>
            <li>ISO 22000-certified food safety management system</li>
            <li>Regular batch testing for pesticides, heavy metals, and aflatoxins by NABL-accredited labs</li>
          </ul>
          <p>We also ensure all exports are accompanied by:</p>
          <ul>
            <li>Phytosanitary certificates</li>
            <li>EU-compliant test reports</li>
            <li>Full batch traceability</li>
            <li>Non-GMO declarations</li>
            <li>Custom packaging & labeling per EU country requirements</li>
          </ul>
          <h2>What Sets SKRM Apart?</h2>
          <h3>1. Infrastructure & Processing</h3>
          <ul>
            <li>In-house parboiling, steaming, drying, polishing & packaging units</li>
            <li>Fully automated Sortex & Grader lines</li>
            <li>Clean-room packaging systems for retail & export</li>
            <li>Separate EU-dedicated rice storage zones</li>
            <li>In-house lab for moisture, broken %, elongation, purity & aging verification</li>
          </ul>
          <h3>2. Export Experience</h3>
          <ul>
            <li>100+ containers shipped annually to Germany, Netherlands, France, UK, Italy, Spain, Poland, and Czech Republic</li>
            <li>Direct export support from Nhava Sheva and Mundra ports</li>
            <li>Familiarity with EU customs documentation and sanitary requirements</li>
          </ul>
          <h2>Trusted by European Importers & Brands</h2>
          <p>SKRM is a preferred supplier for:</p>
          <ul>
            <li>German food wholesalers and ethnic grocery stores</li>
            <li>French supermarkets and Halal food distributors</li>
            <li>UK private-label Basmati rice brands</li>
            <li>Dutch and Belgian cash-and-carry stores</li>
            <li>Central and Eastern Europe food traders</li>
          </ul>
          <p>We support our partners with:</p>
          <ul>
            <li>Flexible MOQ & container loads</li>
            <li>Long-term pricing and contract supply</li>
            <li>EU-specific packaging design</li>
            <li>Quality certifications for retail registration</li>
          </ul>
          <h2>Partner With a Trusted EU-Certified Exporter</h2>
          <p>If you’re looking for a reliable EU-approved Basmati rice supplier from India, SIEA Rice Mills offers:</p>
          <ul>
            <li>World-class rice</li>
            <li>Compliant documentation</li>
            <li>Timely dispatch</li>
            <li>Transparent communication</li>
          </ul>
        </>
      ),
      image: rice_mills,
      thumbnail: `${rice_mills}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "Light Steam vs. Dark Steam Basmati Rice: What’s the Real Difference?",
      excerpt: "Understand the differences between Light Steam and Dark Steam Basmati Rice, including color, texture, and ideal use cases for various markets.",
      content: (
        <>
          <p>When sourcing premium Basmati rice, you may come across terms like Light Steam and Dark Steam — common variants, especially in the export of 1121, 1718, 1509, 1401 & PUSA Basmati Rice.</p>
          <p>Although both undergo steaming (parboiling) before milling, the difference lies in the degree of steaming, which significantly affects the rice’s color, aroma, grain texture, and cooking performance.</p>
          <p>In this article, we break down the key differences between Light Steam and Dark Steam Basmati to help you choose the right variety based on your market preferences and application needs.</p>
          <h2>What Is Steamed Basmati Rice?</h2>
          <p>Steamed Basmati rice is produced by partially boiling the paddy (un-milled rice) with steam before de-husking and milling. This process helps:</p>
          <ul>
            <li>Retain more nutrients</li>
            <li>Strengthen the grain structure</li>
            <li>Improve shelf life and aroma</li>
          </ul>
          <p>The intensity and duration of steaming determines whether the rice becomes Light Steam or Dark Steam.</p>
          <h2>Market Insights</h2>
          <ul>
            <li>In Saudi Arabia, Yemen, and other Gulf and African regions, Dark Steam Basmati is preferred for its robustness and traditional color.</li>
            <li>In North America and Europe, Light Steam (also known as White Steam) is favored for its clean appearance and suitability in retail and modern trade.</li>
          </ul>
          <h2>When to Choose Which?</h2>
          <h3>Choose Light Steam Basmati if:</h3>
          <ul>
            <li>You target modern retail, supermarkets, or private labels</li>
            <li>Your buyers prefer whiter rice with polished grain</li>
            <li>You focus on ready-to-cook products or shorter cooking time</li>
          </ul>
          <h3>Choose Dark Steam Basmati if:</h3>
          <ul>
            <li>You supply to bulk buyers, restaurants, or catering services</li>
            <li>Your customers value strong aroma, firm grain, and traditional appearance</li>
            <li>You need rice that holds well on buffets and long cooking</li>
          </ul>
          <h2>Packaging Insight</h2>
          <ul>
            <li><strong>Light Steam:</strong> Often packed in retail bags (1kg, 5kg, 10kg)</li>
            <li><strong>Dark Steam:</strong> Mostly supplied in bulk sacks (25kg, 50kg PP or jute bags)</li>
          </ul>
          <p>At Shree Krishna Rice Mills, we supply both variants with:</p>
          <ul>
            <li>Customized branding</li>
            <li>Quality certifications</li>
            <li>On-time container loading & global logistics</li>
          </ul>
          <h2>Final Thoughts</h2>
          <p>Whether you choose Light Steam or Dark Steam Basmati Rice, both are high-quality options offering long grain length, post-cooking elongation, and superior flavor. The difference lies in processing depth and regional preferences. Understanding your market’s needs is key to selecting the right variety — and the right supplier.</p>
        </>
      ),
      image: light_dark,
      thumbnail: `${light_dark}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "Difference Between Raw, Steam, White/Creamy Sella & Golden Sella Basmati Rice",
      excerpt: "Explore the key differences between Raw, Steam, White/Creamy Sella, and Golden Sella Basmati Rice to select the best type for your culinary or export needs.",
      content: (
        <>
          <h2>1. Raw Basmati Rice</h2>
          <ul>
            <li><strong>Processing:</strong> Milled directly after drying the harvested paddy; no steaming or parboiling.</li>
            <li><strong>Color:</strong> Bright white.</li>
            <li><strong>Grain Texture:</strong> Softer and more fragile.</li>
            <li><strong>Aroma:</strong> Strong natural basmati aroma.</li>
            <li><strong>Cooking Result:</strong> Fluffy, separate grains; softer texture.</li>
            <li><strong>Usage:</strong> Preferred for daily meals and traditional Indian cooking.</li>
            <li><strong>Shelf Life:</strong> Shorter compared to processed types.</li>
          </ul>
          <h2>2. Steam Basmati Rice</h2>
          <ul>
            <li><strong>Processing:</strong> Paddy is steamed before milling, but not parboiled.</li>
            <li><strong>Color:</strong> Off-white to greyish tint.</li>
            <li><strong>Grain Texture:</strong> Stronger than raw rice; less breakage.</li>
            <li><strong>Aroma:</strong> Mild natural aroma (less than raw).</li>
            <li><strong>Cooking Result:</strong> Long, separate, and firmer grains after cooking.</li>
            <li><strong>Usage:</strong> Used in hotels, restaurants for biryani and pulao.</li>
            <li><strong>Shelf Life:</strong> Longer than raw rice.</li>
          </ul>
          <h2>3. White Sella Basmati Rice</h2>
          <ul>
            <li><strong>Processing:</strong> Parboiled (partially boiled in husk) and then milled; white color retained.</li>
            <li><strong>Color:</strong> Creamy white.</li>
            <li><strong>Grain Texture:</strong> Harder; minimal breakage.</li>
            <li><strong>Aroma:</strong> Mild; aroma reduced during parboiling.</li>
            <li><strong>Cooking Result:</strong> Non-sticky, firmer and longer grains.</li>
            <li><strong>Usage:</strong> Popular in Middle Eastern and export markets; good for catering.</li>
            <li><strong>Shelf Life:</strong> Long; resistant to pests and moisture.</li>
          </ul>
          <h2>4. Golden Sella Basmati Rice</h2>
          <ul>
            <li><strong>Processing:</strong> Parboiled like white sella but dried in a way that gives a golden hue.</li>
            <li><strong>Color:</strong> Golden yellow.</li>
            <li><strong>Grain Texture:</strong> Very hard and robust.</li>
            <li><strong>Aroma:</strong> Subtle aroma due to heavy processing.</li>
            <li><strong>Cooking Result:</strong> Long, fluffy, and firm grains; doesn’t break easily.</li>
            <li><strong>Usage:</strong> Widely used in commercial kitchens, biryanis, and export to Gulf countries.</li>
            <li><strong>Shelf Life:</strong> Very long; excellent storage stability.</li>
          </ul>
        </>
      ),
      image: diff_raw_steam,
      thumbnail: `${diff_raw_steam}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
    {
      title: "Inside the World of Basmati Rice Milling in Haryana",
      excerpt: "Dive into the challenges faced by Basmati rice millers in Haryana, from uncertain yields to export pressures, and explore solutions to sustain this heritage crop.",
      content: (
        <>
          <p>As a Basmati rice miller, I’ve spent years watching each grain pass through my machines—listening to the stories they tell. From the lush green paddy fields of Punjab and Haryana to the polished, aromatic grains packed for kitchens across the globe, every grain carries a journey of pride and pain. And while Basmati rice continues to be celebrated for its exquisite aroma and texture, the path from field to fork is becoming increasingly difficult.</p>
          <p>Here’s a ground-level view of the challenges we face today:</p>
          <h2>The Burden of Uncertain Yields</h2>
          <p>Many don’t realize this, but Basmati is a delicate crop. It needs time, water, and care. Farmers often choose it over high-yielding hybrid rice because of its export potential. But low yield, high input costs, and unpredictable weather make the decision risky. When yields fall short, it affects us millers directly. Low supply drives up raw paddy prices and squeezes our margins.</p>
          <h2>Water Woes and Climate Stress</h2>
          <p>Basmati thrives in water-rich conditions, but groundwater levels in our region are depleting rapidly. Climate change has only made things worse—unseasonal rains or early frost can damage an entire harvest. As millers, we can’t process what doesn’t arrive. The uncertainty makes it harder to plan procurement, storage, and exports.</p>
          <h2>Export Market Pressures</h2>
          <p>Most of our Basmati rice is meant for international markets—Middle East, Europe, and North America. But we’ve seen consignments returned or rejected due to pesticide residue levels, especially in the EU. It’s frustrating because smallholder farmers don’t always have access to the right training or safe agri-chemicals. One mistake in the field can ruin an entire shipment at the port.</p>
          <h2>Cost of Compliance</h2>
          <p>Meeting export standards is getting harder and more expensive. Residue testing, certifications, fumigation, packaging, labelling—all add to our operational costs. And yet, international buyers constantly push for lower prices. We’re caught between rising production costs and falling selling prices.</p>
          <h2>Lack of Reliable Varieties</h2>
          <p>There’s an increasing problem with spurious seeds and inconsistent grain quality. Sometimes, paddy looks like Basmati but doesn’t meet aromatic or elongation standards after milling. As millers, we spend extra time and effort sorting and grading, and still face quality complaints from buyers. The lack of a standardized seed system is hurting the entire value chain.</p>
          <h2>Stubble Burning & Legal Scrutiny</h2>
          <p>While farmers face penalties for stubble burning, we too bear indirect consequences. Delays in harvesting due to shifting weather and legal action over environmental violations can impact the entire supply timeline. A few years ago, delayed harvests meant we couldn’t fulfil orders on time during the Diwali and New Year export windows.</p>
          <h2>Infrastructure Bottlenecks</h2>
          <p>Post-harvest losses are high. Many farmers still transport paddy in open trollies, exposing it to dust and moisture. Warehousing is limited, and even state-run procurement lacks coordination. We’ve invested heavily in modern milling machinery, but without a cold chain or proper drying infrastructure upstream, much of that quality gets lost before the grain even enters our gate.</p>
          <h2>What Can Be Done?</h2>
          <ul>
            <li><strong>Better Extension Services:</strong> Educate farmers on safe pesticide use, optimal irrigation, and residue compliance.</li>
            <li><strong>Support for Milling Units:</strong> Subsidies for upgrading technology and meeting export regulations.</li>
            <li><strong>Seed Standardization:</strong> Ensure farmers have access to certified, high-quality Basmati seed varieties.</li>
            <li><strong>Price Stability Mechanisms:</strong> Reduce volatility through minimum support price (MSP) assurance or buffer stocking.</li>
            <li><strong>Export Facilitation:</strong> Streamline documentation, customs, and residue testing labs at ports.</li>
          </ul>
          <h2>Final Thoughts</h2>
          <p>Every time you enjoy a plate of fragrant Basmati rice, remember the journey it took—from a farmer’s field to our mill to your plate. Behind that grain lies a community fighting to keep a tradition alive amidst mounting challenges. Let’s hope policy, industry, and consumers come together to protect what we millers hold so dear.</p>
        </>
      ),
      image: mill,
      thumbnail: `${mill}?auto=format&fit=crop&w=200&h=100&q=80`,
    },
  ];

  return (
    <section className="blog-section">
      <div className="blog-container">
        <h1 className="blog-title">Blog</h1>
        {selectedPost === null ? (
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <div key={index} className="blog-card">
                <div>
                  <img
                    src={post.thumbnail}
                    alt={`${post.title} thumbnail`}
                    className="blog-card-image"
                  />
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                </div>
                <button
                  onClick={() => setSelectedPost(index)}
                  className="blog-read-more"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="blog-post full-screen">
            <button
              onClick={() => setSelectedPost(null)}
              className="blog-back-btn"
              aria-label="Back to Blog"
            >
              <ArrowLeftIcon />
            </button>
            <h2 className="blog-post-title">{blogPosts[selectedPost].title}</h2>
            <img
              src={blogPosts[selectedPost].image}
              alt={blogPosts[selectedPost].title}
              className="blog-post-image"
            />
            <div className="blog-prose">
              {blogPosts[selectedPost].content}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;