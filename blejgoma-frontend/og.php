<?php
	$actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$slug = basename($actual_link);
	$url = "https://management.blejgoma.com/product/$slug/?generate=wpseo_opengraph";
	if($slug != "blejgoma.com"):
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $data = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if($httpCode == 200):
            $og_tags = str_replace('<meta property="og:url" content="https://management.blejgoma.com', '<meta property="og:url" content="https://blejgoma.com', $data);
            echo trim(preg_replace('/\s+/', ' ', $og_tags));
        endif;
    else:
?><meta property="og:title" content="Blej Goma"/><meta property="og:description" content="Blejgoma.com është platforma e parë e shitjes online të të gjitha llojeve dhe brendeve të gomave."/><meta property="og:image" content="https://management.blejgoma.com/wp-content/uploads/2021/09/blejgoma_fb.jpeg"/><meta property="og:type" content="website"/><meta property="og:url" content="https://blejgoma.com/"><link rel="manifest" href="/manifest.json"/><?php endif; ?><title>Blej Goma</title>