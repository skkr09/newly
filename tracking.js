// 1️⃣ Insert Google Tag Manager script inside <head>
(function() {
    var gtmScript = document.createElement("script");
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NTRJ5KHX');`;
    document.head.appendChild(gtmScript);
})();

(function() {
    // Insert Google tag (gtag.js) script inside <head>
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-ZSL212KDM1";
    document.head.appendChild(gtagScript);

    var gtagInlineScript = document.createElement("script");
    gtagInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZSL212KDM1');
    `;
    document.head.appendChild(gtagInlineScript);
})();

// 2️⃣ Insert Google Tag Manager noscript inside <body>
document.addEventListener("DOMContentLoaded", function() {
    var gtmNoScript = document.createElement("noscript");
    gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NTRJ5KHX"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(gtmNoScript, document.body.firstChild);
});
