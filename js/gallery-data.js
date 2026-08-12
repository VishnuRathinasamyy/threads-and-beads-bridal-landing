/* =========================================================================
   THREADS & BEADS — GALLERY DATA
   The only file you edit. Nothing else needs touching.
   =========================================================================

   ONE LINE PER IMAGE
   ------------------
        "filename.webp | your full alt text"

   The alt text is used EXACTLY as you type it. Nothing is added to the
   front or the back. What you write is what ends up in the HTML, and it is
   also what shows in the hover caption and in the lightbox.

   WHICH TAB DOES AN IMAGE GO IN?
   ------------------------------
   Whichever block you paste the line into. That is the whole system —
   put a kurti line in the `kurtis` block and it appears under Kurtis.

   TO ADD A NEW TAB LATER
   ----------------------
   Copy any block below, give it a new `id` and `label`, fill in images.
   The tab button, its count, the filter and the animations appear on
   their own. There is no limit on how many tabs you can have.

   FILE PATHS
   ----------
   A bare filename is looked up inside IMAGE_FOLDER below.
   A name containing a slash is used exactly as written, so photos already
   sitting in /images/ still work:  "images/Bridal lehenga 01.webp | ..."
   ========================================================================= */

const IMAGE_FOLDER = "images/gallery/";

/* Show an "All Designs" tab first? Set to false to hide it. */
const SHOW_ALL_TAB = true;

/* Icons come from Bootstrap Icons — https://icons.getbootstrap.com
   Swap any `icon` for a different name from that site, or delete the
   line entirely if you would rather have a text-only tab.            */

const GALLERY = [

  /* ================== 1. BRIDAL LEHENGAS ================== */
  {
    id: "bridal-lehenga",
    label: "Bridal Lehengas",
    icon: "bi-gem",
    images: [
      "images/Bridal lehenga 01.webp | Luxurious bridal lehenga showcasing zardozi embroidery and flowing lehenga skirt",
      "images/Bridal lehenga 05.jpg | Ivory silk bridal lehenga choli featuring intricate floral jaal work and low waistline",
      "images/Bridal lehenga 06.webp | Elegant red bridal lehenga with heavy zari embroidery and flared dupatta for wedding day",
      "images/Bridal Lehenga 09.webp | Georgette lehenga with stone embellishments, perfect for sangeet ceremonies",
      "images/Bridal Lehenga 10.webp | Embroidered bridal lehenga in chiffon fabric with matching potli bag accessory",
      "images/Braidal lehenga 07.webp | Traditional bridal lehenga with temple border and gold thread work",
      "images/Bridal Lehenga 08.webp | Deep red bridal lehenga with royal mirror and sequin detailing",
      "images/Bridal lehenga 001.webp | Rich red bridal lehenga with delicate floral hand embroidery",
      "images/Bridal lehenga 002.webp | Raw silk bridal lehenga with kundan work and scoop neck choli"

      // your new lehenga lines go here
    ]
  },

  /* ================== 2. BRIDAL BLOUSES ================== */
  {
    id: "bridal-blouse",
    label: "Bridal Blouses",
    icon: "bi-stars",
    images: [
      "images/Bridal Blouse 01.webp | Boat neck bridal blouse with zardozi work and quarter sleeves for traditional weddings",
      "images/Bridal Blouse 03.webp | Boat neck bridal blouse with zardozi work and quarter sleeves for traditional weddings",
      "images/Bridal Blouse 05.jpg | Halter neck bridal blouse in brocade fabric adorned with pearls, ideal for modern brides",
      "images/Bridal saree 3.webp | Sweetheart neckline bridal blouse with gotta patti and mirror accents for fusion bridal wear",
      "images/Bridal saree 1.webp | Bateau neck bridal blouse featuring nakshi work and back cut-out design"

      // your new bridal blouse lines go here
    ]
  },

  /* ================== 3. BLOUSES ================== */
  {
    id: "blouse",
    label: "Blouses",
    icon: "bi-scissors",
    images: [
      "blue-embroidered-blouse-with-plaid-skirt-coimbatore.webp | A designer blouse with hand embroidery in royal blue paired with a colorful plaid skirt on a mannequin.",
      "royal-blue-blouse-back-neck-embroidery-coimbatore.webp | A royal blue designer blouse with hand embroidery along the deep back neckline, featuring gold and blue tassels.",
      "blue-designer-blouse-hand-embroidery-neckline-coimbatore.webp | A close-up of a royal blue designer blouse with hand embroidery featuring intricate beadwork and colorful thread details.",
      "silk-pleated-skirt-waistband-detail-coimbatore.webp | Close-up of a vibrant pleated silk skirt in a colorful check pattern, paired with a designer blouse with hand embroidery.",
      "hand-embroidered-beige-blouse-neckline-coimbatore.webp | A beige designer blouse with hand embroidery featuring red beads and pearls around the neckline on a mannequin.",
      "hand-embroidered-blouse-sleeve-detail-coimbatore.webp | Close-up of a designer blouse with hand embroidery featuring red sequins and white pearl beads on a grey fabric.",
      "black-hand-embroidered-designer-blouse-coimbatore.webp | A black designer blouse with hand embroidery on a mannequin, showcasing intricate gold work.",
      "black-designer-blouse-hand-embroidery-coimbatore.webp | A black designer blouse with hand embroidery featuring diagonal lines and floral motifs on a mannequin.",
      "black-designer-blouse-hand-embroidery-detail-coimbatore.webp | Close-up of a black designer blouse with hand embroidery featuring intricate gold and beadwork along the neckline.",
      "red-silk-designer-blouse-hand-embroidery-coimbatore.webp | A red silk designer blouse with hand embroidery on the neckline and sleeves, displayed on a mannequin.",
      "terracotta-designer-blouse-back-design-coimbatore.webp | Terracotta colored designer blouse with hand embroidery on the sleeves and lower back, featuring a teardrop cutout.",
      "red-silk-blouse-back-neck-embroidery-coimbatore.webp | Intricate gold and silver zardosi work on a red designer blouse with hand embroidery.",
      "red-blouse-sleeve-hand-embroidery-coimbatore.webp | Intricate gold and silver zardosi work on a red designer blouse with hand embroidery.",
      "purple-designer-blouse-with-hand-embroidery-coimbatore.webp | A purple designer blouse with hand embroidery on the neckline and sleeves, displayed on a mannequin.",
      "purple-silk-blouse-sleeve-embroidery-detail-coimbatore.webp | A close-up of a designer blouse with hand embroidery featuring red, green, and gold floral patterns on a purple sleeve.",
      "purple-silk-blouse-hand-embroidery-neckline-coimbatore.webp | A close-up of a purple silk designer blouse with hand embroidery featuring red and green floral motifs around the neckline.",
      "white-khadi-designer-blouse-mannequin-coimbatore.webp | A white khadi designer blouse with hand embroidery on the sleeves is displayed on a mannequin.",
      "white-blouse-neckline-embroidery-detail-coimbatore.webp | Close-up of a white designer blouse with hand embroidery featuring a delicate green and gold trim along the neckline.",
      "white-hand-embroidered-birds-blouse-back-coimbatore.webp | Back view of a white designer blouse with hand embroidery featuring colorful birds perched on a branch.",
      "brown-embroidered-silk-blouse-back-design-coimbatore.webp | Back view of a dark brown designer blouse with hand embroidery along the deep square neckline, displayed on a mannequin.",
      "purple-silk-blouse-gold-embroidery-coimbatore.webp | A designer blouse with hand embroidery on the sleeve and shoulder, displayed on a mannequin.",
      "hand-embroidered-purple-blouse-neckline-coimbatore.webp | Intricate gold beadwork on a designer blouse with hand embroidery in deep purple fabric.",
      "purple-embroidered-silk-blouse-on-mannequin-coimbatore.webp | A purple silk designer blouse with hand embroidery on the neckline and sleeves is displayed on a mannequin.",
      "beige-embroidered-blouse-back-view-coimbatore.webp | Back view of a beige designer blouse with hand embroidery depicting birds sitting on a wire.",
      "embroidered-birds-beige-blouse-back-coimbatore.webp | A close-up of a beige designer blouse with hand embroidery featuring grey birds on a wire and a flying red bird.",
      "beige-hand-embroidered-cotton-blouse-coimbatore.webp | A beige designer blouse with hand embroidery featuring two small birds on the shoulder, displayed on a mannequin.",
      "embroidered-birds-designer-blouse-back-coimbatore.webp | A close-up of a beige designer blouse with hand embroidery featuring two grey birds perched on a wire.",
      "turquoise-designer-blouse-hand-embroidery-coimbatore.webp | A turquoise designer blouse with hand embroidery featuring red floral motifs on the neckline and sleeves.",
      "turquoise-silk-blouse-neckline-embroidery-coimbatore.webp | A close-up of a turquoise silk designer blouse with hand embroidery featuring red bullion rose motifs and gold beadwork.",
      "turquoise-silk-blouse-back-neck-embroidery-coimbatore.webp | A turquoise designer blouse with hand embroidery featuring red bullion knot roses and gold beadwork along the back neck.",
      "turquoise-silk-blouse-sleeve-embroidery-coimbatore.webp | Close-up of a designer blouse with hand embroidery featuring red floral motifs on a turquoise silk sleeve.",
      "hand-embroidered-sleeve-detail-lavender-blouse-coimbatore.webp | A close-up of a designer blouse with hand embroidery on a lavender sleeve featuring gold and purple floral details.",
      "purple-and-gold-hand-embroidered-sleeve-border-coimbatore.webp | A close-up of a designer blouse with hand embroidery featuring purple flowers, gold beads, and sequins on a metallic fabric.",
      "hand-embroidery-neckline-detail-on-purple-blouse-coimbatore.webp | Intricate beadwork and floral patterns on a designer blouse with hand embroidery.",
      "hand-embroidered-purple-blouse-sleeve-detail-coimbatore.webp | Intricate gold and silver beadwork on a designer blouse with hand embroidery.",
      "purple-silk-blouse-hand-embroidery-detail-coimbatore.webp | Close-up of a designer blouse with hand embroidery featuring intricate gold beadwork and purple floral motifs.",
      "pink-silk-blouse-back-neck-embroidery-coimbatore.webp | A pink silk designer blouse with hand embroidery featuring intricate gold and purple beadwork around a scalloped back neck.",
      "purple-flower-hand-embroidery-blouse-neckline-coimbatore.webp | Close-up of a designer blouse with hand embroidery featuring purple flowers and gold beadwork along the neckline.",
      "lavender-silk-designer-blouse-back-design-coimbatore.webp | A lavender silk designer blouse with hand embroidery around a scalloped back cutout, displayed on a mannequin.",
      "pink-gold-designer-blouse-back-neck-embroidery-coimbatore.webp | A pink and gold designer blouse with hand embroidery around a scalloped keyhole back neck design.",
      "hand-embroidered-designer-blouse-fabric-detail-coimbatore.webp | A close-up view of a designer blouse with hand embroidery featuring intricate gold and turquoise beadwork.",
      "embroidered-designer-blouse-back-neckline-coimbatore.webp | A designer blouse with hand embroidery featuring a scalloped back cutout and intricate gold beadwork.",
      "hand-embroidered-designer-blouse-detail-coimbatore.webp | Close-up of a designer blouse with hand embroidery in gold and turquoise beads on shimmering green fabric.",
      "mint-green-designer-blouse-hand-embroidery-coimbatore.webp | A mint green designer blouse with hand embroidery in gold thread and beads is held up for display.",
      "greenish-gold-designer-blouse-hand-embroidery-coimbatore.webp | A greenish gold designer blouse with hand embroidery on the sleeves and neckline, displayed on a wooden hanger.",
      "teal-silk-designer-blouse-hand-embroidery-coimbatore.webp | A teal silk designer blouse with hand embroidery floral motifs displayed on a wooden hanger.",
      "pink-embroidered-blouse-back-design-coimbatore.webp | A pink designer blouse with hand embroidery featuring a keyhole back design and delicate hanging tassels.",
      "pink-lotus-tassels-hand-embroidery-coimbatore.webp | Intricate lotus-shaped tassels on a pink designer blouse with hand embroidery.",
      "hand-embroidered-shoulder-detail-on-blouse-coimbatore.webp | Intricate beadwork and metallic thread on a designer blouse with hand embroidery at the shoulder.",
      "hand-embroidered-neckline-on-brown-blouse-coimbatore.webp | Intricate beadwork and sequins adorn the neckline of this designer blouse with hand embroidery.",
      "beige-hand-embroidered-blouse-mannequin-coimbatore.webp | A beige designer blouse with hand embroidery featuring red beads and pearls displayed on a mannequin.",
      "hand-embroidered-neckline-and-pendant-motif-coimbatore.webp | A beige silk designer blouse with hand embroidery featuring intricate red beads and pearls along the neckline.",
      "hand-embroidery-detail-on-designer-blouse-coimbatore.webp | Intricate hand embroidery on a designer blouse featuring red beads, sequins, and pearls in a floral motif.",
      "blue-silk-blouse-pink-saree-coimbatore.webp | A royal blue designer blouse with hand embroidery paired with a pink linen saree.",
      "blue-embroidered-blouse-pink-saree-coimbatore.webp | A designer blouse with hand embroidery in blue paired with a pink saree on a mannequin.",
      "blue-embroidered-saree-blouse-coimbatore.webp | A close-up of a royal blue designer blouse with hand embroidery featuring floral patterns and beaded details.",
      "blue-blouse-pink-saree-mannequin-coimbatore.webp | A designer blouse with hand embroidery featuring floral motifs and a keyhole neckline paired with a pink saree.",
      "dark-green-embroidered-silk-blouse-coimbatore.webp | A dark green designer blouse with hand embroidery hanging on a wooden hanger.",
      "black-sleeve-with-floral-embroidery-coimbatore.webp | A close-up view of a black designer blouse with hand embroidery featuring pink roses and leaves on the sleeve cuff.",
      "hand-embroidered-floral-blouse-detail-coimbatore.webp | A close-up of a designer blouse with hand embroidery featuring pink roses and peach leaves on black fabric.",
      "hand-embroidered-floral-blouse-fabric-coimbatore.webp | Close-up of a designer blouse with hand embroidery featuring orange and red floral patterns on gold silk.",
      "pink-fabric-with-beaded-embroidery-coimbatore.webp | A close-up of a designer blouse with hand embroidery featuring vertical beaded lines on pink fabric.",
      "pink-silk-embroidered-blouse-coimbatore.webp | A hand holds a bright pink designer blouse with hand embroidery on the sleeves against a wooden background.",
      "pink-butterfly-embroidered-blouse-coimbatore.webp | A pink designer blouse with hand embroidery featuring a large butterfly motif on the back."
    ]
  },

  /* ================== 4. KURTIS ================== */
  {
    id: "kurtis",
    label: "Kurtis",
    icon: "bi-flower1",
    images: [
      "cream-designer-kurti-with-embroidery-coimbatore.webp | An elegant cream-colored designer kurti featuring delicate floral embroidery along the neckline and sleeves.",
      "beaded-embroidery-on-designer-kurti-neckline-coimbatore.webp | Intricate floral embroidery with beads and metallic threads on a beige designer kurti neckline.",
      "designer-kurti-beadwork-embroidery-detail-coimbatore.webp | Intricate floral embroidery and beadwork on a beige designer kurti neckline.",
      "beige-embroidered-designer-kurti-on-hanger-coimbatore.webp | A beige designer kurti with delicate hand embroidery around the neckline and sleeves hangs on a wooden wardrobe door.",
      "blue-designer-kurti-neckline-embroidery-coimbatore.webp | Intricate white bead and blue thread embroidery details the neckline of a blue designer kurti.",
      "lime-green-designer-kurti-neckline-embroidery-coimbatore.webp | A lime green designer kurti with intricate white and gold floral beadwork along the round neckline.",
      "pink-silk-kurti-with-mirror-work-coimbatore.webp | A vibrant pink designer kurti made of silk fabric featuring intricate circular mirror work around the neckline.",
      "blue-designer-kurti-with-beadwork-neckline-coimbatore.webp | A blue designer kurti with intricate white and gold beadwork around the neckline is folded on a woven chair.",
      "blue-designer-kurti-with-embroidery-coimbatore.webp | A flat lay of a blue designer kurti with delicate white and blue hand embroidery around the neckline.",
      "black-designer-kurti-neckline-embroidery-coimbatore.webp | A black designer kurti featuring delicate pink rose and gold leaf embroidery along the round neckline.",
      "beaded-neckline-black-designer-kurti-coimbatore.webp | Close-up of a designer kurti featuring a V-shaped neckline embellished with metallic and white beads.",
      "green-designer-kurti-with-beaded-neckline-coimbatore.webp | A vibrant green designer kurti featuring intricate silver beadwork and gold trim along the V-neckline.",
      "red-green-designer-kurtis-hangers-coimbatore.webp | A red and a green designer kurti with embroidered V-necklines displayed on hangers.",
      "red-green-designer-kurtis-hangers-coimbatore-2.webp | A red designer kurti with pink floral embroidery on the neckline hanging next to a green one.",
      "black-handloom-cotton-fabric-stripes-coimbatore.webp | A folded black handloom cotton fabric with red and white vertical stripes, suitable for a designer kurti."
    ]
  },

  /* ================== 5. ACCESSORIES ================== */
  {
    id: "accessories",
    label: "Accessories",
    icon: "bi-bag-heart",
    images: [
      "beaded-flower-hair-band-packaged-coimbatore.webp | A black elastic hair band featuring an intricate beaded flower design with pearls and sequins, packaged in clear plastic.",
      "beaded-flower-elastic-hair-band-coimbatore.webp | A black elastic hair band featuring a hand-beaded flower ornament in gold and peach tones, packaged in plastic.",
      "beaded-flower-hair-band-packaging-coimbatore.webp | A handmade yellow beaded flower hair band packaged in a clear plastic sleeve.",
      "beaded-hair-band-plastic-packaging-coimbatore.webp | A black elastic hair band featuring a circular beaded ornament with a central pearl, sealed in clear packaging.",
      "beaded-hair-bands-in-pink-basket-coimbatore.webp | A collection of individually packaged hair band accessories with intricate beadwork displayed in a pink basket.",
      "embroidered-beaded-indian-bangles-coimbatore.webp | A close-up display of colorful bangles decorated with intricate embroidery, beads, and small mirrors.",
      "traditional-indian-bangles-on-display-stand-coimbatore.webp | A black multi-tier display stand filled with colorful, ornate Indian bangles featuring intricate beadwork and stones.",
      "traditional-indian-bangles-on-display-stand-coimbatore-2.webp | A multi-tiered black display stand filled with colorful, ornate bangles in various patterns and designs.",
      "handcrafted-indian-bangles-on-display-stand-coimbatore.webp | A hand holds a display stand filled with colorful, embroidered bangles featuring intricate beadwork and stone embellishments.",
      "traditional-indian-bangles-on-display-stand-coimbatore-3.webp | A black display stand filled with rows of colorful, ornate traditional Indian bangles decorated with beads and stones.",
      "black-banana-hair-clip-with-rhinestones-coimbatore.webp | A black banana hair clip adorned with gold-rimmed rhinestones in a leaf pattern.",
      "beaded-hair-clips-in-basket-coimbatore.webp | A collection of beaded hair clips on display cards inside a yellow woven basket."
    ]
  },

  /* ================== 6. BLAZERS ================== */
  {
    id: "blazers",
    label: "Blazers",
    icon: "bi-person-vcard",
    images: [
      "grey-custom-blazer-beadwork-coimbatore.webp | A grey custom blazer with intricate beadwork on the collar and sleeves hangs on a wooden hanger.",
      "beaded-embroidery-on-custom-blazer-lapel-coimbatore.webp | A close-up view of intricate bronze beadwork and embroidery on the lapel of a custom blazer.",
      "beaded-embroidery-grey-blazer-fabric-coimbatore.webp | A close-up view of a custom blazer in grey textured fabric featuring intricate white and metallic beaded stripes.",
      "beaded-sleeve-detail-grey-blazer-coimbatore.webp | Close-up of a custom blazer sleeve in grey textured fabric featuring vertical white stripes and intricate beadwork.",
      "grey-custom-blazer-with-beaded-lapels-coimbatore.webp | A grey custom blazer with detailed beadwork on the lapels and sleeves is displayed on a wooden hanger.",
      "embroidered-custom-blazer-hanger-coimbatore.webp | An elegant custom blazer with intricate yellow and silver embroidery hangs against a wooden wardrobe.",
      "beaded-embroidery-on-white-fabric-coimbatore.webp | Close-up of intricate silver beadwork and yellow-accented pearls on a custom blazer.",
      "beaded-embroidery-detail-fabric-coimbatore.webp | A close-up of intricate silver beadwork and yellow embroidered circles with pearls on a custom blazer fabric.",
      "beaded-sleeve-detail-white-fabric-coimbatore.webp | A close-up of a custom blazer sleeve featuring wavy silver beadwork and yellow embroidered dots with pearl centers.",
      "pink-embroidered-custom-blazer-hanger-coimbatore.webp | A pink custom blazer with intricate silver and coral bead embroidery hangs against a wooden background."
    ]
  },

  /* ================== 7. EMBROIDERIES ================== */
  {
    id: "embroideries",
    label: "Embroideries",
    icon: "bi-brush",
    images: [
      // "images/customized stitches 02.jpeg | Custom-sized bridal lehenga with zardozi embroidery and multi-layered flared skirt",
      // "images/customized stitches 03.jpeg | Custom-fit bridal lehenga with gota patti borders and draped veil accessory",
      "intricate-hand-embroidery-on-dark-fabric-coimbatore.webp | A close-up of detailed hand embroidery work featuring a split circular design in gold, blue, and pink on dark fabric.",
      "red-blouse-back-neck-embroidery-coimbatore.webp | A close-up of a red silk blouse featuring a teardrop back cutout and intricate hand embroidery work at the base.",
      "hand-embroidery-samples-display-board-coimbatore.webp | A white framed display board showcasing various colorful hand embroidery work samples on fabric swatches.",
      "beaded-hand-embroidery-sampler-patterns-coimbatore.webp | A detailed sampler displaying intricate hand embroidery work with beads, pearls, and metallic threads on fabric.",
      "gold-pink-hand-embroidery-sample-coimbatore.webp | Intricate hand embroidery work featuring a pink sequined flower surrounded by golden corded swirls on black fabric.",
      "beaded-border-hand-embroidery-work-coimbatore.webp | A close-up of intricate hand embroidery work featuring sequins, beads, and a floral motif on cream fabric.",
      "detailed-hand-embroidery-samples-on-black-fabric-coimbatore.webp | Close-up of intricate hand embroidery work featuring gold beads, green leaf patterns, and white geometric stitching.",
      "detailed-hand-embroidery-border-samples-coimbatore.webp | Close-up of intricate hand embroidery work featuring gold beads, red threads, and small mirrors on black fabric.",
      "hand-embroidery-stitch-samples-coimbatore.webp | A close-up view of various hand embroidery work samples featuring colorful threads, beads, and metallic borders on dark fabric.",
      "beaded-fringe-hand-embroidery-detail-coimbatore.webp | Close-up of hand embroidery work featuring vertical strands of glass bugle beads and faux pearls.",
      "paisley-hand-embroidery-work-detail-coimbatore.webp | A close-up of intricate hand embroidery work featuring a paisley motif with gold beads and metallic threads.",
      "yellow-silk-blouse-hand-embroidery-work-coimbatore.webp | A close-up view of a yellow silk blouse featuring intricate hand embroidery work with gold beads and sequins.",
      "gold-fabric-aari-embroidery-details-coimbatore.webp | A close-up of intricate hand embroidery work with beads, sequins, and pearls on a golden yellow fabric."
    ]
  }

  /* =====================================================================
     A NEW TAB — copy this shape when you need another one

  ,{
    id: "reception",
    label: "Reception Gowns",
    icon: "bi-star",
    images: [
      "gown-01.webp | Champagne gold reception gown with a sequin trail and a sheer cape"
    ]
  }

     ===================================================================== */
];
